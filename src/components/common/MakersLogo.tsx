import React, { useId } from 'react';

interface MakersLogoProps {
  variant?: 'dark' | 'light' | 'original' | 'monochrome';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
  const uniqueId = useId().replace(/:/g, '');

  // Color configuration
  const isLight = variant === 'light'; // on dark background
  const textTitleColor = isLight ? 'text-[#F3E5D4]' : 'text-[#7A5029]';
  const textSubColor = isLight ? 'text-[#D2BBA0]' : 'text-[#875F38]';

  // Sizing definitions for Mobile-First responsiveness
  const emblemSizes = {
    xs: 'w-7 h-7 sm:w-8 sm:h-8',
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-10 h-10 sm:w-13 sm:h-13',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-22 h-22 sm:w-28 sm:h-28'
  };

  const titleSizes = {
    xs: 'text-xs sm:text-sm tracking-[0.22em]',
    sm: 'text-sm sm:text-base tracking-[0.24em]',
    md: 'text-base sm:text-xl tracking-[0.26em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.3em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.32em]'
  };

  const taglineSizes = {
    xs: 'text-[6.5px] sm:text-[7.5px] tracking-[0.14em]',
    sm: 'text-[7px] sm:text-[8.5px] tracking-[0.16em]',
    md: 'text-[7.5px] sm:text-[10px] tracking-[0.18em]',
    lg: 'text-[10px] sm:text-xs tracking-[0.22em]',
    xl: 'text-xs sm:text-sm tracking-[0.25em]'
  };

  const bronzeGradientId = `makersBronzeGrad_${uniqueId}`;
  const goldStarGradientId = `makersGoldStarGrad_${uniqueId}`;

  const EmblemSVG = (
    <div className={`relative ${emblemSizes[size]} shrink-0 flex items-center justify-center`}>
      <svg 
        viewBox="0 0 200 170" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          <linearGradient id={bronzeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DEB887" />
            <stop offset="25%" stopColor="#C49A68" />
            <stop offset="55%" stopColor="#8C5E33" />
            <stop offset="85%" stopColor="#6E4420" />
            <stop offset="100%" stopColor="#543114" />
          </linearGradient>

          <linearGradient id={goldStarGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#9C6B3A" />
          </linearGradient>
        </defs>

        {/* 4 Sparkling Stars at the Apex */}
        {/* Main Central 4-point Star */}
        <path 
          d="M100 4 L103 19 L118 22 L103 25 L100 40 L97 25 L82 22 L97 19 Z" 
          fill={`url(#${goldStarGradientId})`} 
        />
        {/* Left Small Star */}
        <path 
          d="M78 30 L80 37 L87 38.5 L80 40 L78 47 L76 40 L69 38.5 L76 37 Z" 
          fill={`url(#${goldStarGradientId})`} 
        />
        {/* Right Small Star */}
        <path 
          d="M122 30 L124 37 L131 38.5 L124 40 L122 47 L120 40 L113 38.5 L120 37 Z" 
          fill={`url(#${goldStarGradientId})`} 
        />
        {/* Top-Right Ambient Star */}
        <path 
          d="M136 17 L137.5 22 L142.5 23 L137.5 24 L136 29 L134.5 24 L129.5 23 L134.5 22 Z" 
          fill={`url(#${goldStarGradientId})`} 
        />

        {/* Left Figure */}
        {/* Head */}
        <circle cx="68" cy="52" r="7" fill={`url(#${bronzeGradientId})`} />
        {/* Raised Arm to Star */}
        <path 
          d="M72 58 Q88 40 98 25 Q96 34 83 58 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />
        {/* Elegant Body & Flowing Left Dress Trail */}
        <path 
          d="M66 61 Q56 80 61 106 Q64 125 45 136 Q22 143 6 147 Q45 142 66 122 Q75 106 72 82 Q76 68 66 61 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />

        {/* Center Figure */}
        {/* Head */}
        <circle cx="94" cy="58" r="6" fill={`url(#${bronzeGradientId})`} />
        {/* Raised Arm */}
        <path 
          d="M96 64 Q98 48 100 24 Q102 48 104 64 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />
        {/* Torso & Base Curve */}
        <path 
          d="M93 67 Q90 85 97 106 Q103 124 92 147 Q98 147 106 130 Q111 108 102 85 Q99 71 93 67 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />

        {/* Right Figure */}
        {/* Head */}
        <circle cx="132" cy="52" r="7" fill={`url(#${bronzeGradientId})`} />
        {/* Raised Arm to Star */}
        <path 
          d="M128 58 Q112 40 102 25 Q104 34 117 58 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />
        {/* Elegant Body & Flowing Right Dress Trail */}
        <path 
          d="M134 61 Q144 80 139 106 Q136 125 155 136 Q178 143 194 147 Q155 142 134 122 Q125 106 128 82 Q124 68 134 61 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />

        {/* Flowing Lower Ribbon Swirl Baseline */}
        <path 
          d="M88 147 Q130 148 168 138 Q188 144 195 147 Q160 146 122 149 Z" 
          fill={`url(#${bronzeGradientId})`} 
        />
      </svg>
    </div>
  );

  if (!horizontal) {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {EmblemSVG}
        <div className="mt-1 flex flex-col items-center">
          <span className={`font-serif font-extrabold ${titleSizes[size]} ${textTitleColor} tracking-[0.28em] uppercase leading-tight pl-0.5`}>
            MAKERS
          </span>
          {showTaglines && (
            <p className={`font-sans font-bold uppercase ${taglineSizes[size]} ${textSubColor} leading-none mt-1 whitespace-nowrap`}>
              FIND PEOPLE WHO MAKE IT HAPPEN
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {EmblemSVG}
      <div className="flex flex-col justify-center min-w-0">
        <span className={`font-serif font-extrabold ${titleSizes[size]} ${textTitleColor} tracking-[0.24em] sm:tracking-[0.26em] uppercase leading-none pl-0.5`}>
          MAKERS
        </span>
        {showTaglines && (
          <p className={`font-sans font-bold uppercase ${taglineSizes[size]} ${textSubColor} leading-none mt-1 whitespace-nowrap`}>
            FIND PEOPLE WHO MAKE IT HAPPEN
          </p>
        )}
      </div>
    </div>
  );
};
