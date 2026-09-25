import React from 'react';

interface MakersLogoProps {
  variant?: 'dark' | 'light' | 'original' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTaglines?: boolean;
  className?: string;
  horizontal?: boolean;
}

export const MakersLogo: React.FC<MakersLogoProps> = ({
  variant = 'original',
  size = 'md',
  showTaglines = true,
  className = '',
  horizontal = true
}) => {
  // Color configuration
  const isLight = variant === 'light'; // on dark background
  const bronzePrimary = isLight ? '#E5C49F' : '#8A5D33';
  const bronzeDark = isLight ? '#C59E75' : '#6A431F';
  const textTitleColor = isLight ? 'text-[#F3E5D4]' : 'text-[#7A5029]';
  const textSubColor = isLight ? 'text-[#D2BBA0]' : 'text-[#875F38]';
  const textFooterColor = isLight ? 'text-[#BAA38A]' : 'text-[#96714E]';

  // Sizing definitions
  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.25em]',
    md: 'text-xl tracking-[0.28em]',
    lg: 'text-2xl tracking-[0.3em]',
    xl: 'text-4xl tracking-[0.32em]'
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-[0.16em]',
    md: 'text-[10px] tracking-[0.2em]',
    lg: 'text-xs tracking-[0.22em]',
    xl: 'text-sm tracking-[0.25em]'
  };

  const footerSizes = {
    sm: 'text-[7px] tracking-[0.18em]',
    md: 'text-[8.5px] tracking-[0.22em]',
    lg: 'text-[10px] tracking-[0.25em]',
    xl: 'text-xs tracking-[0.28em]'
  };

  const EmblemSVG = (
    <div className={`relative ${emblemSizes[size]} shrink-0 flex items-center justify-center`}>
      <svg 
        viewBox="0 0 200 170" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          <linearGradient id="makersBronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DEB887" />
            <stop offset="25%" stopColor="#C49A68" />
            <stop offset="55%" stopColor="#8C5E33" />
            <stop offset="85%" stopColor="#6E4420" />
            <stop offset="100%" stopColor="#543114" />
          </linearGradient>

          <linearGradient id="makersGoldStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#9C6B3A" />
          </linearGradient>
        </defs>

        {/* 4 Sparkling Stars at the Apex */}
        {/* Main Central 4-point Star */}
        <path 
          d="M100 4 L103 19 L118 22 L103 25 L100 40 L97 25 L82 22 L97 19 Z" 
          fill="url(#makersGoldStar)" 
        />
        {/* Left Small Star */}
        <path 
          d="M78 30 L80 37 L87 38.5 L80 40 L78 47 L76 40 L69 38.5 L76 37 Z" 
          fill="url(#makersGoldStar)" 
        />
        {/* Right Small Star */}
        <path 
          d="M122 30 L124 37 L131 38.5 L124 40 L122 47 L120 40 L113 38.5 L120 37 Z" 
          fill="url(#makersGoldStar)" 
        />
        {/* Top-Right Ambient Star */}
        <path 
          d="M136 17 L137.5 22 L142.5 23 L137.5 24 L136 29 L134.5 24 L129.5 23 L134.5 22 Z" 
          fill="url(#makersGoldStar)" 
        />

        {/* Left Figure */}
        {/* Head */}
        <circle cx="68" cy="52" r="7" fill="url(#makersBronzeGradient)" />
        {/* Raised Arm to Star */}
        <path 
          d="M72 58 Q88 40 98 25 Q96 34 83 58 Z" 
          fill="url(#makersBronzeGradient)" 
        />
        {/* Elegant Body & Flowing Left Dress Trail */}
        <path 
          d="M66 61 Q56 80 61 106 Q64 125 45 136 Q22 143 6 147 Q45 142 66 122 Q75 106 72 82 Q76 68 66 61 Z" 
          fill="url(#makersBronzeGradient)" 
        />

        {/* Center Figure */}
        {/* Head */}
        <circle cx="94" cy="58" r="6" fill="url(#makersBronzeGradient)" />
        {/* Raised Arm */}
        <path 
          d="M96 64 Q98 48 100 24 Q102 48 104 64 Z" 
          fill="url(#makersBronzeGradient)" 
        />
        {/* Torso & Base Curve */}
        <path 
          d="M93 67 Q90 85 97 106 Q103 124 92 147 Q98 147 106 130 Q111 108 102 85 Q99 71 93 67 Z" 
          fill="url(#makersBronzeGradient)" 
        />

        {/* Right Figure */}
        {/* Head */}
        <circle cx="132" cy="52" r="7" fill="url(#makersBronzeGradient)" />
        {/* Raised Arm to Star */}
        <path 
          d="M128 58 Q112 40 102 25 Q104 34 117 58 Z" 
          fill="url(#makersBronzeGradient)" 
        />
        {/* Elegant Body & Flowing Right Dress Trail */}
        <path 
          d="M134 61 Q144 80 139 106 Q136 125 155 136 Q178 143 194 147 Q155 142 134 122 Q125 106 128 82 Q124 68 134 61 Z" 
          fill="url(#makersBronzeGradient)" 
        />

        {/* Flowing Lower Ribbon Swirl Baseline */}
        <path 
          d="M88 147 Q130 148 168 138 Q188 144 195 147 Q160 146 122 149 Z" 
          fill="url(#makersBronzeGradient)" 
        />
      </svg>
    </div>
  );

  if (!horizontal) {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {EmblemSVG}
        <div className="mt-1 flex flex-col items-center">
          <span className={`font-serif font-bold ${titleSizes[size]} ${textTitleColor} tracking-[0.3em] uppercase leading-tight pl-1`}>
            MAKERS
          </span>
          {showTaglines && (
            <p className={`font-sans font-semibold uppercase ${taglineSizes[size]} ${textSubColor} leading-none mt-1`}>
              FIND PEOPLE WHO MAKE IT HAPPEN
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {EmblemSVG}
      <div className="flex flex-col justify-center">
        <span className={`font-serif font-extrabold ${titleSizes[size]} ${textTitleColor} tracking-[0.26em] uppercase leading-none pl-0.5`}>
          MAKERS
        </span>
        {showTaglines && (
          <p className={`font-sans font-semibold uppercase ${taglineSizes[size]} ${textSubColor} leading-none mt-1`}>
            FIND PEOPLE WHO MAKE IT HAPPEN
          </p>
        )}
      </div>
    </div>
  );
};
