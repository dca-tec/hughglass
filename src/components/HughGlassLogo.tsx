import React from 'react';

interface HughGlassLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const HughGlassLogo: React.FC<HughGlassLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  showTagline = true
}) => {
  // Size mapping for mark
  const markDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 44, height: 44 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 }
  }[size];

  // The HG Monogram with architectural perspective lines (matching the official logo)
  const MonogramSvg = ({ w = 48, h = 48 }: { w?: number; h?: number }) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm select-none"
    >
      <defs>
        {/* Rich Brushed Gold / Bronze Metallic Gradient */}
        <linearGradient id="hgGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#875722" />
          <stop offset="22%" stopColor="#c49348" />
          <stop offset="48%" stopColor="#f3d489" />
          <stop offset="68%" stopColor="#deb060" />
          <stop offset="85%" stopColor="#9e6d2c" />
          <stop offset="100%" stopColor="#694014" />
        </linearGradient>

        <linearGradient id="hgGoldLight" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#a37330" />
          <stop offset="50%" stopColor="#edd088" />
          <stop offset="100%" stopColor="#8a5c24" />
        </linearGradient>

        <linearGradient id="hgGoldSheen" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#dcb065" />
          <stop offset="50%" stopColor="#faeec5" />
          <stop offset="100%" stopColor="#966627" />
        </linearGradient>

        <filter id="hgDropShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#hgDropShadow)">
        {/* LEFT LEG OF H (Classic Roman Serif Column) */}
        <path
          d="M 40 40 
             L 86 40 
             C 80 46 76 56 76 68 
             L 76 172 
             C 76 184 80 194 86 200 
             L 40 200 
             C 46 194 50 184 50 172 
             L 50 68 
             C 50 56 46 46 40 40 Z"
          fill="url(#hgGoldGrad)"
          stroke="#4e2e0a"
          strokeWidth="0.8"
        />

        {/* ARCHITECTURAL PERSPECTIVE BUILDING FACADE (CENTER STRUCTURE) */}
        {/* Diagonal Perspective Top Roofbeam */}
        <path
          d="M 76 110 L 132 75 L 132 82 L 76 117 Z"
          fill="url(#hgGoldSheen)"
        />
        
        {/* Architectural Pillars / Glass Mullions */}
        {/* Pillar 1 */}
        <path
          d="M 86 104 L 92 100 L 92 188 L 86 188 Z"
          fill="url(#hgGoldLight)"
        />
        {/* Pillar 2 (Taller, angled cut) */}
        <path
          d="M 106 91 L 112 87 L 112 188 L 106 188 Z"
          fill="url(#hgGoldGrad)"
        />
        {/* Central Architectural Monolith Column */}
        <path
          d="M 124 80 L 132 75 L 132 188 L 124 188 Z"
          fill="url(#hgGoldLight)"
        />
        {/* Angled Perspective Base Frame */}
        <path
          d="M 86 188 L 132 188 L 132 194 L 86 194 Z"
          fill="url(#hgGoldSheen)"
        />

        {/* RIGHT LEG OF H & MAJESTIC G INTEGRATION */}
        {/* Right column of H curving down into G */}
        <path
          d="M 132 40 
             C 144 40 152 46 156 58 
             L 156 160 
             C 156 180 148 196 130 205 
             C 142 208 158 206 172 198 
             C 188 188 198 170 198 145 
             L 198 126 
             L 164 126 
             L 164 134 
             L 188 134 
             C 188 158 178 184 158 193 
             C 150 188 146 176 146 160 
             L 146 68 
             C 146 56 142 46 132 40 Z"
          fill="url(#hgGoldGrad)"
          stroke="#4e2e0a"
          strokeWidth="0.8"
        />

        {/* Golden Base Arc connecting H and G underneath */}
        <path
          d="M 76 172 
             C 100 206 148 214 182 195 
             C 178 192 174 188 172 185 
             C 144 202 104 196 82 168 Z"
          fill="url(#hgGoldSheen)"
        />
      </g>
    </svg>
  );

  // Variant 1: Just Mark
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <MonogramSvg w={markDimensions.width} h={markDimensions.height} />
      </div>
    );
  }

  // Variant 2: Full Badge (Stacked vertically: Monogram, HUGH GLASS, Tagline)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <MonogramSvg w={size === 'xl' ? 120 : size === 'lg' ? 90 : 70} h={size === 'xl' ? 120 : size === 'lg' ? 90 : 70} />
        
        <div className="mt-3">
          <span 
            className="font-serif block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a87834] via-[#f7d98b] to-[#b3813a] tracking-[0.25em] text-2xl sm:text-3xl drop-shadow-sm uppercase"
            style={{ fontFamily: "'Cinzel', 'Cinzel Decorative', 'Times New Roman', serif" }}
          >
            Hugh Glass
          </span>
          {showTagline && (
            <p className="mt-1 text-[10px] sm:text-[11px] font-sans font-medium text-[#c49b55] tracking-[0.35em] uppercase opacity-90">
              Conexão &bull; Visão &bull; Território
            </p>
          )}
        </div>
      </div>
    );
  }

  // Variant 3: Compact
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <MonogramSvg w={36} h={36} />
        <span 
          className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a87834] via-[#f7d98b] to-[#b3813a] tracking-[0.18em] text-lg uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Hugh Glass
        </span>
      </div>
    );
  }

  // Variant 4: Horizontal (Default - Ideal for Navbar & Footers)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <MonogramSvg w={markDimensions.width} h={markDimensions.height} />
      <div className="flex flex-col justify-center">
        <span 
          className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b3823c] via-[#f7d88c] to-[#c29148] tracking-[0.22em] text-lg sm:text-xl uppercase drop-shadow-sm leading-none"
          style={{ fontFamily: "'Cinzel', 'Times New Roman', serif" }}
        >
          Hugh Glass
        </span>
        {showTagline && (
          <span className="text-[8px] sm:text-[9px] font-sans font-medium text-[#c49b55] tracking-[0.3em] uppercase opacity-85 mt-1">
            Conexão &bull; Visão &bull; Território
          </span>
        )}
      </div>
    </div>
  );
};
