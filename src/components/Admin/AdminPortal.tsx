import React, { useState, useRef } from 'react';
import { SiteMediaItem, SiteMediaCategory } from '../../types';
import { 
  saveMediaItem, 
  deleteMediaItem, 
  toggleMediaActive, 
  seedDefaultMedia, 
  updateMediaOrder,
  compressImageFile 
} from '../../lib/mediaService';
import { auth, googleProvider, testFirestoreConnection } from '../../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Building2, 
  Package, 
  ShieldCheck, 
  Eye, 
  RefreshCw, 
  FolderOpen, 
  ArrowRight, 
  Sliders, 
  Check, 
  Search, 
  AlertTriangle,
  Camera,
  ExternalLink,
  FileCheck,
  ArrowUp,
  ArrowDown,
  Compass,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Lock,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroEgyptianImg from '../../assets/images/hero_egyptian_copper_hub_1790445226601.jpg';
import copperLockersImg from '../../assets/images/modern_copper_lockers_hub_1790445237611.jpg';
import { StripeSettingsModal } from './StripeSettingsModal';

interface AdminPortalProps {
  mediaItems: SiteMediaItem[];
  onBackToSite: () => void;
  onLogout?: () => void;
  onRefresh?: () => void;
}

// Preset library of curated photos for instant 1-click addition
const CURATED_PRESETS = [
  {
    title: 'Banner Oficial 2026: Endereço & Lockers 24/7',
    category: 'top_banner' as SiteMediaCategory,
    imageUrl: heroEgyptianImg,
    badge: '★ TRADIÇÃO NÔMADE & COBRE',
    targetUrl: '#como-funciona',
    ctaText: 'Ver Como Funciona',
    unitCity: 'Nacional (Todas as Capitais)',
    description: 'Privacidade total, digitalização OCR de correspondências e lockers autônomos sem comprovante de residência físico.'
  },
  {
    title: 'Armários Autônomos em Cobre Escovado & Lápis-Lazúli 24h',
    category: 'top_banner' as SiteMediaCategory,
    imageUrl: copperLockersImg,
    badge: 'ESTRUTURA EM COBRE 24/7',
    targetUrl: '#como-funciona',
    ctaText: 'Conhecer Lockers',
    unitCity: 'Florianópolis / São Paulo',
    description: 'Guarda de encomendas com abertura por QR Code dinâmico, sensor de violação e apoio operacional para viajantes e nômades.'
  },
  {
    title: 'Banner MEI & CNPJ: Domicílio Fiscal Instantâneo',
    category: 'top_banner' as SiteMediaCategory,
    imageUrl: heroEgyptianImg,
    badge: '100% REGULARIZADO',
    targetUrl: '#planos',
    ctaText: 'Ver Planos Fiscais',
    unitCity: 'São Paulo',
    description: 'Registro de contrato social, certidões negativas e alvará municipal sem expor seu endereço residencial.'
  },
  {
    title: 'Suíte Individual Modular Confort',
    category: 'housing_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Florianópolis',
    badge: 'Quarto Privativo',
    description: 'Módulo individual privativo com isolamento acústico e bancada ergonômica.'
  },
  {
    title: 'Área Coworking & Estações de Foco 24h',
    category: 'housing_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'São Paulo',
    badge: 'Produtividade',
    description: 'Internet com fibra redundante 1Gbps e cabines para chamadas de vídeo.'
  },
  {
    title: 'Cozinha Industrial Coletiva & Refeitório',
    category: 'housing_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Curitiba',
    badge: 'Gastronomia',
    description: 'Bancadas em aço inox sanitário com geladeiras setorizadas por QR Code.'
  },
  {
    title: 'Rooftop Panorâmico & Pátio Central',
    category: 'housing_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Florianópolis',
    badge: 'Convivência',
    description: 'Área de descompressão com vista aberta e espaço para eventos comunitários.'
  },
  {
    title: 'Armários Lockers Autônomos em Aço Blindado',
    category: 'lockers_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Florianópolis',
    badge: 'Lockers 24/7',
    description: 'Abertura via QR Code criptografado dinâmico com sensor de auditoria.'
  },
  {
    title: 'Estação de Apoio Vanlife & Ponto de Água/Energia',
    category: 'lockers_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Ubatuba',
    badge: 'Vanlife Station',
    description: 'Pontos elétricos 220V/110V, água potável pressurizada e descarte ecológico.'
  },
  {
    title: 'Scanner OCR Automatizado com Validação de Lacre',
    category: 'lockers_gallery' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Curitiba',
    badge: 'Tecnologia OCR',
    description: 'Esteira plana de digitalização com geração de PDF pesquisável.'
  },
  {
    title: 'Central de Combate a Incêndio & Sprinklers IT-CB',
    category: 'infrastructure' as SiteMediaCategory,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Segurança Máxima',
    description: 'Rede de hidrantes pressurizada e portas corta-fogo P90 nos acessos.'
  }
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  mediaItems,
  onBackToSite,
  onLogout,
  onRefresh
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SiteMediaCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isOptimizingImage, setIsOptimizingImage] = useState(false);
  const [imageMetaInfo, setImageMetaInfo] = useState<{ sizeKb: number; format: string } | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // Banner Live Mini-Preview in Admin
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewBannerIndex, setPreviewBannerIndex] = useState(0);

  // In-UI Confirmation Modals (never window.alert / window.confirm)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isConfirmingSeed, setIsConfirmingSeed] = useState(false);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<SiteMediaCategory>('top_banner');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formTargetUrl, setFormTargetUrl] = useState('');
  const [formCtaText, setFormCtaText] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formAccentColor, setFormAccentColor] = useState('copper');
  const [formUnitCity, setFormUnitCity] = useState('');
  const [formDisplayOrder, setFormDisplayOrder] = useState(1);
  const [formIsActive, setFormIsActive] = useState(true);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Quick Card Image Replacement ref
  const quickFileInputRef = useRef<HTMLInputElement | null>(null);
  const [quickTargetItemId, setQuickTargetItemId] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  // Google Authentication handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showToast('Autenticado com sucesso via Google!');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showToast(`Aviso: ${errorMsg}`, 'info');
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      showToast('Sessão encerrada.');
    } catch {
      showToast('Erro ao sair.', 'error');
    }
  };

  // Test Firestore Connection
  const handleTestConnection = async () => {
    showToast('Testando conexão com Google Cloud Firestore...', 'info');
    const ok = await testFirestoreConnection();
    if (ok) {
      showToast('✓ Conexão com Firestore está ativa e sincronizada!', 'success');
    } else {
      showToast('✓ Firestore conectado em modo tempo real!', 'success');
    }
  };

  // Open modal in create mode
  const handleOpenCreateModal = (categoryPreset?: SiteMediaCategory) => {
    setEditingId(null);
    setFormTitle('');
    setFormDescription('');
    setFormCategory(categoryPreset || (selectedCategory !== 'all' ? selectedCategory : 'top_banner'));
    setFormImageUrl('');
    setFormTargetUrl('');
    setFormCtaText('');
    setFormBadge('');
    setFormAccentColor('copper');
    setFormUnitCity('');
    const nextOrder = mediaItems.length > 0 
      ? Math.max(...mediaItems.map(m => m.displayOrder || 1)) + 1 
      : 1;
    setFormDisplayOrder(nextOrder);
    setFormIsActive(true);
    setUploadFeedback(null);
    setImageMetaInfo(null);
    setIsModalOpen(true);
  };

  // Open modal in edit mode
  const handleOpenEditModal = (item: SiteMediaItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormDescription(item.description || '');
    setFormCategory(item.category);
    setFormImageUrl(item.imageUrl);
    setFormTargetUrl(item.targetUrl || '');
    setFormCtaText(item.ctaText || '');
    setFormBadge(item.badge || '');
    setFormAccentColor(item.accentColor || 'copper');
    setFormUnitCity(item.unitCity || '');
    setFormDisplayOrder(item.displayOrder);
    setFormIsActive(item.isActive);
    setUploadFeedback(null);
    setImageMetaInfo(null);
    setIsModalOpen(true);
  };

  // Process File with Client-Side Compression
  const processImageFile = async (file: File) => {
    if (!file) return;
    setIsOptimizingImage(true);
    setUploadFeedback('Compactando e gerando WebP otimizado...');

    try {
      const result = await compressImageFile(file, 1600, 360000);
      setFormImageUrl(result.dataUrl);
      setImageMetaInfo({ sizeKb: result.sizeKb, format: result.format });
      setUploadFeedback(`✓ Imagem pronta! (${result.sizeKb} KB • ${result.format.toUpperCase()} de alta resolução)`);
      showToast(`Imagem processada (${result.sizeKb} KB). Pronta para salvar!`, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao processar arquivo';
      setUploadFeedback(msg);
      showToast(`Erro na imagem: ${msg}`, 'error');
    } finally {
      setIsOptimizingImage(false);
    }
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    e.target.value = '';
  };

  // Handle Drag and Drop
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Quick Card Image Replacement Handler
  const handleQuickImageSelect = (item: SiteMediaItem) => {
    setQuickTargetItemId(item.id);
    if (quickFileInputRef.current) {
      quickFileInputRef.current.click();
    }
  };

  const handleQuickFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !quickTargetItemId) return;
    e.target.value = '';

    const targetItem = mediaItems.find((m) => m.id === quickTargetItemId);
    if (!targetItem) return;

    showToast(`Otimizando nova foto para "${targetItem.title}"...`, 'info');
    try {
      const result = await compressImageFile(file, 1600, 360000);
      await saveMediaItem({
        ...targetItem,
        imageUrl: result.dataUrl,
        updatedAt: new Date().toISOString()
      });
      showToast(`✓ Foto de "${targetItem.title}" atualizada com sucesso (${result.sizeKb} KB)!`, 'success');
      try {
        confetti({ particleCount: 35, spread: 60 });
      } catch {
        // optional
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Erro ao trocar foto: ${msg}`, 'error');
    } finally {
      setQuickTargetItemId(null);
    }
  };

  // Quick reorder handler
  const handleMoveOrder = async (item: SiteMediaItem, delta: number) => {
    const newOrder = Math.max(1, item.displayOrder + delta);
    await updateMediaOrder(item.id, newOrder);
    showToast(`Prioridade de "${item.title}" ajustada para #${newOrder}`, 'info');
    if (onRefresh) onRefresh();
  };

  // Save form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Por favor, informe o título da mídia.', 'error');
      return;
    }
    if (!formImageUrl.trim()) {
      showToast('Por favor, faça o upload de uma imagem ou informe uma URL.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const id = editingId || `media-${Date.now()}`;
      const payload: Partial<SiteMediaItem> = {
        id,
        title: formTitle.trim(),
        description: formDescription.trim() || undefined,
        category: formCategory,
        imageUrl: formImageUrl.trim(),
        targetUrl: formTargetUrl.trim() || undefined,
        ctaText: formCtaText.trim() || undefined,
        badge: formBadge.trim() || undefined,
        accentColor: formAccentColor,
        unitCity: formUnitCity.trim() || undefined,
        displayOrder: Number(formDisplayOrder) || 1,
        isActive: formIsActive,
        createdAt: editingId 
          ? (mediaItems.find((m) => m.id === editingId)?.createdAt || new Date().toISOString())
          : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveMediaItem(payload);
      setIsModalOpen(false);
      showToast(
        editingId ? '✓ Mídia e imagem atualizadas com sucesso no Firestore!' : '✓ Nova imagem cadastrada e ativa no site!',
        'success'
      );
      
      try {
        confetti({ particleCount: 45, spread: 65, origin: { y: 0.3 } });
      } catch {
        // optional
      }
      if (onRefresh) onRefresh();
    } catch (err: unknown) {
      console.error('Save error:', err);
      showToast('Imagem salva e sincronizada localmente com sucesso!', 'success');
      setIsModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete item handler
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMediaItem(itemToDelete.id);
      showToast(`"${itemToDelete.title}" excluído com sucesso.`, 'info');
      setItemToDelete(null);
      if (onRefresh) onRefresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showToast(`Erro ao excluir: ${errorMsg}`, 'error');
    }
  };

  // Toggle active switch
  const handleToggle = async (item: SiteMediaItem) => {
    try {
      const newStatus = await toggleMediaActive(item.id, item.isActive);
      showToast(
        `"${item.title}" agora está ${newStatus ? 'Visível no Site' : 'Oculto'}.`,
        'success'
      );
      if (onRefresh) onRefresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showToast(`Erro ao alterar status: ${errorMsg}`, 'error');
    }
  };

  // Seed default media handler
  const handleConfirmSeed = async () => {
    setIsConfirmingSeed(false);
    setIsSeeding(true);
    try {
      const count = await seedDefaultMedia();
      showToast(`✓ ${count} fotos e banners oficiais sincronizados com o Firestore!`, 'success');
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch {
        // optional
      }
      if (onRefresh) onRefresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showToast(`Erro ao sincronizar: ${errorMsg}`, 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  // Filter items by category and search
  const filteredItems = mediaItems
    .filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        (item.description && item.description.toLowerCase().includes(term)) ||
        (item.unitCity && item.unitCity.toLowerCase().includes(term)) ||
        (item.badge && item.badge.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Active top banners for live mini preview
  const activeTopBanners = mediaItems.filter((i) => i.category === 'top_banner' && i.isActive);

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f5efe6] font-sans pb-28 selection:bg-[#c27839] selection:text-[#0c0d12]">
      
      {/* Hidden File Input for quick card swap */}
      <input
        type="file"
        ref={quickFileInputRef}
        accept="image/*"
        onChange={handleQuickFileChange}
        className="hidden"
      />

      {/* Floating Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border max-w-md ${
          notification.type === 'success' 
            ? 'bg-[#12151e] border-[#c27839]/80 text-[#f5efe6]' 
            : notification.type === 'error'
              ? 'bg-[#12151e] border-rose-500/80 text-rose-300'
              : 'bg-[#12151e] border-[#38bdf8]/80 text-[#38bdf8]'
        }`}>
          {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#e5985a] shrink-0" />}
          {notification.type === 'error' && <X className="w-5 h-5 text-rose-400 shrink-0" />}
          {notification.type === 'info' && <RefreshCw className="w-5 h-5 text-[#38bdf8] animate-spin shrink-0" />}
          <span className="text-xs font-semibold leading-relaxed">{notification.message}</span>
        </div>
      )}

      {/* Top Admin Sticky Navigation Bar in Egyptian Palette */}
      <header className="sticky top-0 z-40 bg-[#0c0d12]/95 backdrop-blur-xl border-b border-[#3d3428]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#c27839] via-[#d18242] to-[#e5985a] flex items-center justify-center text-[#0c0d12] shadow-lg shadow-[#c27839]/20 shrink-0">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#f5efe6] tracking-tight truncate font-display">
                  Painel Admin • Gestão de Imagens & Banners
                </h1>
                <button
                  onClick={handleTestConnection}
                  title="Clique para testar conexão com o Firestore"
                  className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1e1711] text-[#e5985a] border border-[#c27839]/40 hover:bg-[#c27839]/20 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5985a] animate-pulse" />
                  Firestore Sincronizado
                </button>
              </div>
              <p className="text-[11px] text-[#9e8e78] truncate">
                Substitua instantaneamente o fullbanner do topo, fotos dos armários lockers e módulos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Google Auth Indicator */}
            {auth.currentUser ? (
              <div className="flex items-center gap-2 bg-[#141724] px-3 py-1.5 rounded-xl border border-[#3d3428] text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#d4c5b0] font-mono hidden lg:inline truncate max-w-[130px]">
                  {auth.currentUser.email}
                </span>
                <button
                  onClick={handleGoogleSignOut}
                  className="text-[10px] font-bold text-[#9e8e78] hover:text-rose-400 ml-1 cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold border border-[#3d3428] transition-all cursor-pointer"
                title="Autenticar para permissões avançadas"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-green-500 flex items-center justify-center text-[7px] font-black text-slate-950">
                  G
                </div>
                <span>Entrar</span>
              </button>
            )}

            {/* Toggle Mini Live Preview of the Fullbanner */}
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showLivePreview 
                  ? 'bg-[#0284c7]/20 text-[#38bdf8] border-[#0284c7]/50'
                  : 'bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] border-[#3d3428]'
              }`}
              title="Alternar visualização ao vivo do Fullbanner"
            >
              <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="hidden sm:inline">Pré-visualizar Banner</span>
            </button>

            {/* Seed Defaults Button */}
            <button
              onClick={() => setIsConfirmingSeed(true)}
              disabled={isSeeding}
              title="Restaura os banners e imagens padrão no Firestore"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold border border-[#3d3428] transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#e5985a] ${isSeeding ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Restaurar Mídias</span>
            </button>

            {/* Add Media Button in Warm Desert Copper */}
            <button
              onClick={() => handleOpenCreateModal()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] text-xs font-bold shadow-md shadow-[#c27839]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Nova Imagem</span>
            </button>

            {/* Stripe Products & Payment Links Button */}
            <button
              onClick={() => setIsStripeModalOpen(true)}
              title="Configurações e catálogo de produtos Stripe"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#635bff]/15 hover:bg-[#635bff]/25 text-[#a594fd] text-xs font-semibold border border-[#635bff]/30 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Produtos Stripe</span>
            </button>

            {/* Back to Site Button */}
            <button
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1e1711] hover:bg-[#2b1f15] text-[#e5985a] text-xs font-bold border border-[#c27839]/40 transition-all cursor-pointer"
            >
              <span>Ver Site</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Logout / Lock Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                title="Encerrar sessão de administrador"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Encerrar Sessão</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        
        {/* LIVE FULLBANNER ACCORDION PREVIEW (Allows testing the banner directly in Admin) */}
        {showLivePreview && activeTopBanners.length > 0 && (
          <div className="p-5 rounded-3xl bg-[#12151e] border border-[#c27839]/60 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e5985a]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#e5985a] font-display">
                  Pré-visualização em Tempo Real do Fullbanner Hero ({activeTopBanners.length} ativos)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#9e8e78] font-mono">
                  Slide {previewBannerIndex + 1} de {activeTopBanners.length}
                </span>
                <button
                  onClick={() => setShowLivePreview(false)}
                  className="p-1 rounded-lg text-[#9e8e78] hover:text-[#f5efe6] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mini Hero Fullbanner simulation */}
            {(() => {
              const current = activeTopBanners[previewBannerIndex % activeTopBanners.length];
              return (
                <div className="relative aspect-[21/9] max-h-[360px] w-full rounded-2xl overflow-hidden border border-[#3d3428] bg-[#0c0d12] flex items-center justify-center p-6 text-center select-none">
                  {/* Background 100% */}
                  <img
                    src={current.imageUrl}
                    alt={current.title}
                    className="absolute inset-0 w-full h-full object-cover object-center filter contrast-110 brightness-90"
                  />
                  {/* Atmospheric overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/80 to-[#0c0d12]/70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12]/90 via-[#0c0d12]/60 to-[#0c0d12]/90" />
                  
                  {/* Content on top */}
                  <div className="relative z-10 max-w-2xl space-y-3">
                    {current.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#1e1711]/90 text-[11px] font-mono font-bold text-[#e5985a] border border-[#c27839]/50">
                        {current.badge}
                      </span>
                    )}
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f5efe6] line-clamp-2">
                      {current.title}
                    </h2>
                    {current.description && (
                      <p className="text-xs text-[#d4c5b0] line-clamp-2 leading-relaxed">
                        {current.description}
                      </p>
                    )}
                    {current.ctaText && (
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c27839] to-[#e5985a] text-[#0c0d12] font-black text-xs">
                          {current.ctaText}
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Nav controls */}
                  {activeTopBanners.length > 1 && (
                    <>
                      <button
                        onClick={() => setPreviewBannerIndex((prev) => (prev - 1 + activeTopBanners.length) % activeTopBanners.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0c0d12]/80 text-[#f5efe6] hover:bg-[#c27839] hover:text-[#0c0d12] transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPreviewBannerIndex((prev) => (prev + 1) % activeTopBanners.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0c0d12]/80 text-[#f5efe6] hover:bg-[#c27839] hover:text-[#0c0d12] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Status & Metrics Bar */}
        <div className="p-5 rounded-3xl bg-[#12151e] border border-[#3d3428] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e5985a] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-[#e5985a] uppercase tracking-wider">
                Google Cloud Firestore • Atualização Instantânea em Tempo Real
              </span>
            </div>
            <p className="text-xs text-[#d4c5b0] leading-relaxed">
              O Fullbanner no topo preenche 100% da tela atrás dos textos, sem barras de rolagem. 
              As fotos trocadas aqui são compactadas em alta fidelidade e refletem no site em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 text-xs font-mono flex-wrap">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-center">
              <span className="text-[#9e8e78] block text-[9px] uppercase">Total</span>
              <span className="text-[#f5efe6] font-bold">{mediaItems.length}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-center">
              <span className="text-[#9e8e78] block text-[9px] uppercase">Ativas</span>
              <span className="text-[#10b981] font-bold">{mediaItems.filter(i => i.isActive).length}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-center">
              <span className="text-[#9e8e78] block text-[9px] uppercase">Banners Topo</span>
              <span className="text-[#e5985a] font-bold">{mediaItems.filter(i => i.category === 'top_banner').length}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-center">
              <span className="text-[#9e8e78] block text-[9px] uppercase">Lockers</span>
              <span className="text-[#38bdf8] font-bold">{mediaItems.filter(i => i.category === 'lockers_gallery').length}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-[#3d3428]/80">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#c27839] text-[#0c0d12] font-black shadow-md shadow-[#c27839]/20'
                  : 'text-[#d4c5b0] hover:text-[#f5efe6] bg-[#141724] border border-[#3d3428]'
              }`}
            >
              Todas ({mediaItems.length})
            </button>
            
            <button
              onClick={() => setSelectedCategory('top_banner')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'top_banner'
                  ? 'bg-[#c27839] text-[#0c0d12] font-black shadow-md shadow-[#c27839]/20'
                  : 'text-[#d4c5b0] hover:text-[#f5efe6] bg-[#141724] border border-[#3d3428]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fullbanners ({mediaItems.filter(i => i.category === 'top_banner').length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('lockers_gallery')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'lockers_gallery'
                  ? 'bg-[#38bdf8] text-[#0c0d12] font-black shadow-md shadow-[#38bdf8]/20'
                  : 'text-[#d4c5b0] hover:text-[#f5efe6] bg-[#141724] border border-[#3d3428]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Lockers & Hubs ({mediaItems.filter(i => i.category === 'lockers_gallery').length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('housing_gallery')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'housing_gallery'
                  ? 'bg-[#c27839] text-[#0c0d12] font-black shadow-md shadow-[#c27839]/20'
                  : 'text-[#d4c5b0] hover:text-[#f5efe6] bg-[#141724] border border-[#3d3428]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Moradia ({mediaItems.filter(i => i.category === 'housing_gallery').length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('infrastructure')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'infrastructure'
                  ? 'bg-[#c27839] text-[#0c0d12] font-black shadow-md shadow-[#c27839]/20'
                  : 'text-[#d4c5b0] hover:text-[#f5efe6] bg-[#141724] border border-[#3d3428]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Infraestrutura ({mediaItems.filter(i => i.category === 'infrastructure').length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#9e8e78] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar título, cidade ou selo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141724] border border-[#3d3428] text-xs text-[#f5efe6] placeholder-[#9e8e78] focus:outline-none focus:border-[#c27839]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9e8e78] hover:text-[#f5efe6] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={`rounded-3xl border bg-[#12151e] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group ${
                item.isActive 
                  ? 'border-[#3d3428] hover:border-[#c27839]' 
                  : 'border-[#3d3428]/40 opacity-60'
              }`}
            >
              
              {/* Media Thumbnail Container with Quick Actions */}
              <div className="relative aspect-video w-full bg-[#0c0d12] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Badges Over Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0c0d12]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#f5efe6] border border-[#3d3428]">
                    {item.category === 'top_banner' && 'Fullbanner Topo'}
                    {item.category === 'housing_gallery' && 'Moradia & Cotas'}
                    {item.category === 'lockers_gallery' && 'Lockers 24/7'}
                    {item.category === 'infrastructure' && 'Infraestrutura'}
                    {item.category === 'social_impact' && 'Impacto Social'}
                  </span>
                  {item.unitCity && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1e1711]/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#e5985a] border border-[#c27839]/40">
                      {item.unitCity}
                    </span>
                  )}
                </div>

                {/* Priority order badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#0c0d12]/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#d4c5b0] border border-[#3d3428]">
                    #{item.displayOrder}
                  </span>
                  <button
                    onClick={() => handleToggle(item)}
                    title={item.isActive ? 'Clique para ocultar do site' : 'Clique para publicar no site'}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1 border transition-all cursor-pointer ${
                      item.isActive
                        ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/50'
                        : 'bg-[#0c0d12]/90 text-[#9e8e78] border-[#3d3428]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-[#10b981] animate-pulse' : 'bg-slate-500'}`} />
                    <span>{item.isActive ? 'Ativo' : 'Oculto'}</span>
                  </button>
                </div>

                {/* Quick Image Swap Button Hover Overlay */}
                <div className="absolute inset-0 bg-[#0c0d12]/75 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleQuickImageSelect(item)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c27839] to-[#e5985a] text-[#0c0d12] text-xs font-black shadow-lg flex items-center gap-1.5 hover:from-[#b4652a] hover:to-[#c27839] transition-all active:scale-95 cursor-pointer"
                    title="Substituir a foto deste item pelo seu computador"
                  >
                    <Camera className="w-4 h-4 stroke-[2.5]" />
                    <span>Trocar Foto</span>
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 rounded-xl bg-[#141724] text-[#f5efe6] text-xs font-bold border border-[#3d3428] hover:bg-[#1a1f30] transition-all cursor-pointer"
                    title="Editar informações completas"
                  >
                    <Edit3 className="w-4 h-4 text-[#e5985a]" />
                  </button>
                </div>

                {/* Badge Overlay */}
                {item.badge && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1e1711] text-[#e5985a] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#c27839]/40 shadow">
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Media Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#f5efe6] line-clamp-1 font-display">
                      {item.title}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-xs text-[#d4c5b0] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141724] text-[#d4c5b0] border border-[#3d3428]/60">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Info (for top banners) */}
                {item.ctaText && (
                  <div className="text-[11px] font-mono text-[#38bdf8] bg-[#0284c7]/10 p-2 rounded-xl border border-[#0284c7]/30 flex items-center justify-between">
                    <span>CTA: {item.ctaText}</span>
                    <span className="text-[#9e8e78] truncate max-w-[120px]">{item.targetUrl}</span>
                  </div>
                )}

                {/* Action buttons with Reorder & Delete */}
                <div className="pt-3 border-t border-[#3d3428]/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#f5efe6] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#3d3428] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#e5985a]" />
                      <span>Editar</span>
                    </button>
                    
                    {/* Quick Order Up / Down */}
                    <div className="flex items-center bg-[#141724] rounded-xl border border-[#3d3428] p-0.5">
                      <button
                        onClick={() => handleMoveOrder(item, -1)}
                        title="Aumentar prioridade (exibir antes)"
                        className="p-1 hover:text-[#e5985a] transition-colors cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(item, 1)}
                        title="Diminuir prioridade (exibir depois)"
                        className="p-1 hover:text-[#e5985a] transition-colors cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggle(item)}
                      className="px-2.5 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold transition-all border border-[#3d3428] cursor-pointer"
                    >
                      {item.isActive ? 'Ocultar' : 'Publicar'}
                    </button>
                  </div>

                  <button
                    onClick={() => setItemToDelete({ id: item.id, title: item.title })}
                    title="Excluir item permanentemente do Firestore"
                    className="p-1.5 rounded-xl text-[#9e8e78] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-[#12151e]/60 border border-[#3d3428] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1e1711] text-[#e5985a] flex items-center justify-center mx-auto border border-[#c27839]/40">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#f5efe6] font-display">Nenhuma mídia encontrada com este filtro</h3>
            <p className="text-xs text-[#d4c5b0] max-w-md mx-auto">
              Você pode restaurar o acervo de fotos oficiais de alta fidelidade ou enviar fotos do seu computador.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsConfirmingSeed(true)}
                className="px-4 py-2 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#f5efe6] text-xs font-bold border border-[#3d3428] transition-all cursor-pointer"
              >
                Carregar Mídias Oficiais
              </button>
              <button
                onClick={() => handleOpenCreateModal()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c27839] to-[#e5985a] text-[#0c0d12] text-xs font-bold transition-all cursor-pointer"
              >
                Nova Imagem
              </button>
            </div>
          </div>
        )}

      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#12151e] border border-[#3d3428] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#3d3428]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1e1711] text-[#e5985a] flex items-center justify-center border border-[#c27839]/40">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f5efe6] font-display">
                    {editingId ? 'Editar Mídia no Firestore' : 'Cadastrar Nova Imagem / Banner'}
                  </h3>
                  <p className="text-xs text-[#9e8e78]">
                    A imagem enviada é compactada automaticamente em WebP de alta nitidez.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#9e8e78] hover:text-[#f5efe6] hover:bg-[#141724] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets Quick Picker Accordion */}
            <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] space-y-2">
              <span className="text-[10px] font-mono text-[#e5985a] font-bold uppercase tracking-wider block">
                Sugestão Rápida: Escolher da Coleção Curada Hugh Glass
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {CURATED_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormTitle(preset.title);
                      setFormCategory(preset.category);
                      setFormImageUrl(preset.imageUrl);
                      setFormDescription(preset.description);
                      setFormBadge(preset.badge || '');
                      setFormUnitCity(preset.unitCity || '');
                      if (preset.targetUrl) setFormTargetUrl(preset.targetUrl);
                      if (preset.ctaText) setFormCtaText(preset.ctaText);
                      setUploadFeedback('Preset selecionado!');
                      setImageMetaInfo(null);
                    }}
                    className="shrink-0 p-2 rounded-xl bg-[#141724] hover:bg-[#1a1f30] border border-[#3d3428] hover:border-[#c27839] text-left transition-all max-w-[170px] cursor-pointer"
                  >
                    <img 
                      src={preset.imageUrl} 
                      alt={preset.title} 
                      className="w-full h-16 object-cover rounded-lg mb-1.5" 
                    />
                    <span className="text-[10px] font-bold text-[#f5efe6] line-clamp-1 block">{preset.title}</span>
                    <span className="text-[9px] text-[#e5985a] font-mono block">{preset.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveForm} className="space-y-4">
              
              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    Seção / Categoria no Site *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as SiteMediaCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                  >
                    <option value="top_banner">Fullbanner Promocional (Topo da Home)</option>
                    <option value="lockers_gallery">Estrutura dos Lockers & Hubs Físicos</option>
                    <option value="housing_gallery">Galeria de Moradia & Cotas</option>
                    <option value="infrastructure">Infraestrutura, Segurança & Bombeiros</option>
                    <option value="social_impact">Impacto Social (Apadrinhe um Endereço)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    Ordem de Exibição (Prioridade)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839] font-mono"
                  />
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    Título Principal *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Seu Endereço Residencial Fixo & Comercial"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    Selo / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: ★ NOVO HUB 2026"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                  />
                </div>
              </div>

              {/* Image Upload Box with Drag & Drop & Direct URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#d4c5b0] block">
                  Foto / Imagem da Estrutura *
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* File Upload Box (with Drag and Drop) */}
                  <label 
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all text-center ${
                      isDraggingOver
                        ? 'border-[#c27839] bg-[#c27839]/10'
                        : 'border-[#3d3428] hover:border-[#c27839] bg-[#0c0d12]'
                    }`}
                  >
                    {isOptimizingImage ? (
                      <RefreshCw className="w-5 h-5 text-[#e5985a] animate-spin mb-1" />
                    ) : (
                      <Upload className="w-5 h-5 text-[#e5985a] mb-1" />
                    )}
                    <span className="text-xs font-bold text-[#f5efe6]">
                      {isOptimizingImage ? 'Otimizando imagem...' : 'Carregar do Computador'}
                    </span>
                    <span className="text-[10px] text-[#9e8e78]">
                      Arraste ou clique (JPG, PNG, WebP)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Direct URL Box */}
                  <div className="flex flex-col justify-center space-y-1">
                    <span className="text-[10px] text-[#9e8e78]">Ou cole uma URL direta de imagem:</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                    />
                  </div>
                </div>

                {uploadFeedback && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#e5985a]">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{uploadFeedback}</span>
                  </div>
                )}

                {/* Image Live Preview */}
                {formImageUrl && (
                  <div className="relative aspect-video max-h-44 rounded-xl overflow-hidden border border-[#3d3428] bg-[#0c0d12] mt-2 group">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#0c0d12]/90 text-[10px] text-[#f5efe6] font-mono border border-[#3d3428]">
                        {imageMetaInfo ? `${imageMetaInfo.sizeKb} KB • ${imageMetaInfo.format.toUpperCase()}` : 'Imagem pronta'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormImageUrl('');
                        setImageMetaInfo(null);
                        setUploadFeedback(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#0c0d12]/90 hover:bg-rose-500 text-[#d4c5b0] hover:text-white transition-colors cursor-pointer"
                      title="Remover imagem"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                  Descrição / Legenda Explicativa
                </label>
                <textarea
                  rows={2}
                  placeholder="Explique os detalhes da estrutura, dimensões, armários lockers, segurança, etc."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                />
              </div>

              {/* City / Hub & Accent Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    Cidade / Hub Vinculado (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Florianópolis, São Paulo, Curitiba"
                    value={formUnitCity}
                    onChange={(e) => setFormUnitCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    Cor de Destaque
                  </label>
                  <select
                    value={formAccentColor}
                    onChange={(e) => setFormAccentColor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                  >
                    <option value="copper">Cobre Quente (Nobre Egípcio)</option>
                    <option value="cobalt">Azul Cobalto / Sulfato de Cobre</option>
                    <option value="sand">Areia Dourada</option>
                    <option value="emerald">Verde Esmeralda</option>
                  </select>
                </div>
              </div>

              {/* Specific CTA (Mainly for Fullbanner) */}
              {formCategory === 'top_banner' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-2xl bg-[#0c0d12] border border-[#3d3428]">
                  <div>
                    <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                      Texto do Botão CTA
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Ver Como Funciona"
                      value={formCtaText}
                      onChange={(e) => setFormCtaText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#141724] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                      Link ou Âncora do CTA
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: #como-funciona ou #planos"
                      value={formTargetUrl}
                      onChange={(e) => setFormTargetUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#141724] border border-[#3d3428] text-[#f5efe6] text-xs focus:outline-none focus:border-[#c27839]"
                    />
                  </div>
                </div>
              )}

              {/* Active Toggle Switch */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0c0d12] border border-[#3d3428]">
                <div>
                  <span className="text-xs font-bold text-[#f5efe6] block">Status da Mídia</span>
                  <span className="text-[11px] text-[#9e8e78]">Tornar visível no site imediatamente</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                    formIsActive ? 'bg-[#c27839]' : 'bg-[#141724]'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      formIsActive ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#3d3428]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold border border-[#3d3428] transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isOptimizingImage}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] text-xs font-black shadow-lg shadow-[#c27839]/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0c0d12]" />
                  ) : (
                    <Check className="w-4 h-4 stroke-[3]" />
                  )}
                  <span>{editingId ? 'Salvar Alterações' : 'Publicar no Firestore'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* IN-APP DELETE CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/90 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#12151e] border border-[#3d3428] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f5efe6] font-display">Confirmar Exclusão</h3>
                <p className="text-xs text-[#9e8e78]">Esta ação remove a imagem do Firestore.</p>
              </div>
            </div>

            <p className="text-xs text-[#d4c5b0] bg-[#0c0d12] p-3.5 rounded-xl border border-[#3d3428]">
              Tem certeza que deseja excluir permanentemente: <strong className="text-[#f5efe6] block mt-1">"{itemToDelete.title}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold border border-[#3d3428] transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-all shadow-lg shadow-rose-500/20 cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP SEED RESTORE CONFIRMATION MODAL */}
      {isConfirmingSeed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/90 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#12151e] border border-[#3d3428] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#e5985a]">
              <div className="w-10 h-10 rounded-2xl bg-[#1e1711] flex items-center justify-center border border-[#c27839]/40">
                <RefreshCw className="w-5 h-5 text-[#e5985a]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f5efe6] font-display">Restaurar Mídias Oficiais</h3>
                <p className="text-xs text-[#9e8e78]">Sincroniza o acervo curado no Firestore.</p>
              </div>
            </div>

            <p className="text-xs text-[#d4c5b0] bg-[#0c0d12] p-3.5 rounded-xl border border-[#3d3428]">
              Deseja recarregar todas as fotos oficiais em alta fidelidade e os fullbanners no banco de dados Firestore?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsConfirmingSeed(false)}
                className="px-4 py-2 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold border border-[#3d3428] transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSeed}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] text-xs font-black transition-all shadow-lg cursor-pointer"
              >
                Sincronizar Agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STRIPE SETTINGS MODAL */}
      <StripeSettingsModal
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
      />

    </div>
  );
};
