import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Stripe if secret key is present
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripeClient: Stripe | null = null;

if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
  try {
    stripeClient = new Stripe(stripeSecretKey);
    console.log('[Stripe Server] Stripe inicializado com sucesso (modo ' + (stripeSecretKey.startsWith('sk_test_') ? 'TESTE' : 'PRODUÇÃO') + ')');
  } catch (err) {
    console.error('[Stripe Server] Erro ao instanciar Stripe:', err);
  }
} else {
  console.log('[Stripe Server] STRIPE_SECRET_KEY não configurada. Executando em modo de simulação local.');
}

// Check Stripe Server status
app.get('/api/stripe-status', (req, res) => {
  res.json({
    configured: !!stripeClient,
    mode: stripeSecretKey?.startsWith('sk_test_') ? 'test' : stripeSecretKey?.startsWith('sk_live_') ? 'live' : 'unconfigured',
    message: stripeClient 
      ? 'Stripe conectado ao servidor! Cobranças serão registradas no painel da Stripe.' 
      : 'STRIPE_SECRET_KEY ainda não configurada no Secrets / Environment Variables.'
  });
});

// Process In-Screen Payment directly on Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { 
      amount, 
      currency = 'brl', 
      customerDetails = {},
      paymentMethod = 'stripe',
      billingCycle = 'monthly',
      installments = 1
    } = req.body;

    const {
      name = 'Cliente Hugh Glass',
      email = 'cliente@hughglass.com',
      documentId = '',
      phone = '',
      planId = 'residential',
      preferredCity = 'Florianópolis',
      origin = 'brazil'
    } = customerDetails;

    // If Stripe is configured with a real secret key:
    if (stripeClient) {
      try {
        // Convert to smallest currency unit (cents)
        const amountInCents = Math.round(Number(amount) * 100);

        // In test mode, attach test payment method and confirm immediately so it appears under 'Succeeded' in the dashboard!
        const isTestMode = stripeSecretKey?.startsWith('sk_test_');

        // Create a real Stripe Customer so the client's actual name appears in Stripe's "Customers" list and in the Payments table!
        let customerId: string | undefined;
        try {
          const customer = await stripeClient.customers.create({
            name: name,
            email: email,
            phone: phone,
            description: `Cliente Hugh Glass - Hub ${preferredCity} (${documentId})`,
            metadata: {
              documentId,
              origin,
              hub: preferredCity,
              planId,
              billingCycle,
              installments: String(installments || 1)
            }
          });
          customerId = customer.id;
          console.log(`[Stripe Server] Cliente criado com sucesso no Stripe: ${customer.id} (${customer.name})`);
        } catch (custErr: any) {
          console.warn('[Stripe Server] Aviso ao criar cliente Stripe:', custErr.message);
        }

        const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
          amount: amountInCents,
          currency: String(currency).toLowerCase(),
          description: `Hugh Glass - Plano ${planId.toUpperCase()} (${billingCycle === 'yearly' ? `ANUAL ${installments > 1 ? `${installments}x` : 'À vista'}` : 'MENSAL'}) - ${name}`,
          receipt_email: email,
          customer: customerId,
          shipping: {
            name: name,
            phone: phone,
            address: {
              city: preferredCity,
              country: origin === 'international' ? 'US' : 'BR',
              line1: `Hub Hugh Glass ${preferredCity}`
            }
          },
          metadata: {
            app: 'HughGlass',
            planId,
            billingCycle,
            installments: String(installments || 1),
            totalCharged: `${String(currency).toUpperCase()} ${amount}`,
            debitInfo: billingCycle === 'yearly' ? 'Valor integral anual debitado no limite do cartão' : 'Cobrança mensal',
            customerName: name,
            documentId,
            phone,
            origin,
            hub: preferredCity,
            timestamp: new Date().toISOString()
          }
        };

        // Enable installments for Brazilian cards if currency is BRL and installments > 1
        if (String(currency).toLowerCase() === 'brl' && Number(installments) > 1) {
          paymentIntentParams.payment_method_options = {
            card: {
              installments: {
                enabled: true
              }
            }
          };
        }

        if (isTestMode) {
          paymentIntentParams.payment_method = 'pm_card_visa';
          paymentIntentParams.confirm = true;
          paymentIntentParams.return_url = 'https://ais-dev-umjqftmu2cug3jsbjqgvky-445081076327.us-east1.run.app';
        } else {
          paymentIntentParams.payment_method_types = ['card'];
        }

        // Create PaymentIntent on Stripe
        const paymentIntent = await stripeClient.paymentIntents.create(paymentIntentParams);

        console.log(`[Stripe Server] PaymentIntent criado e confirmado na Stripe: ${paymentIntent.id} (Status: ${paymentIntent.status})`);

        return res.json({
          success: true,
          registeredInStripe: true,
          paymentIntentId: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
          status: paymentIntent.status,
          livemode: paymentIntent.livemode,
          message: 'Transação registrada com sucesso no painel da Stripe!'
        });
      } catch (stripeErr: any) {
        console.error('[Stripe Server] Erro da API da Stripe:', stripeErr.message);
        return res.status(400).json({
          success: false,
          error: stripeErr.message || 'Erro ao processar pagamento na Stripe'
        });
      }
    }

    // Fallback: If STRIPE_SECRET_KEY is not configured yet
    const mockTx = 'ch_stripe_sim_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    return res.json({
      success: true,
      registeredInStripe: false,
      paymentIntentId: mockTx,
      status: 'succeeded',
      message: 'Simulação concluída. Para aparecer no painel dashboard.stripe.com/payments, adicione a STRIPE_SECRET_KEY nas Environment Variables.'
    });

  } catch (error: any) {
    console.error('[Server] Erro interno:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro interno do servidor' });
  }
});

// Setup Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Server] Hugh Glass rodando na porta ${PORT}`);
  });
}

startServer();
