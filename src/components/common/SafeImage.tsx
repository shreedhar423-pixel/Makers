import React, { useState, useEffect } from 'react';

// Fallback high-resolution photos categorized by theme
export const FALLBACK_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  photography: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
  catering: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  decor: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
  makeup: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  fashion: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
  music: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
  planning: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  barber: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80'
};

/**
 * Normalizes an image URL so that relative source paths like `/src/assets/images/...`
 * are correctly transformed into public production URLs like `/images/...` on Vercel / Netlify / production.
 */
export function normalizeImageUrl(url?: string, categoryHint?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return getFallbackForCategory(categoryHint);
  }

  const trimmed = url.trim();

  // If path starts with /src/assets/images/ or src/assets/images/, convert to /images/
  if (trimmed.startsWith('/src/assets/images/')) {
    return trimmed.replace('/src/assets/images/', '/images/');
  }
  if (trimmed.startsWith('src/assets/images/')) {
    return trimmed.replace('src/assets/images/', '/images/');
  }
  if (trimmed.startsWith('/src/assets/')) {
    return trimmed.replace('/src/assets/', '/');
  }

  return trimmed;
}

export function getFallbackForCategory(category?: string): string {
  if (!category) return FALLBACK_IMAGES.default;
  const lower = category.toLowerCase();
  if (lower.includes('photo')) return FALLBACK_IMAGES.photography;
  if (lower.includes('cater') || lower.includes('din') || lower.includes('food')) return FALLBACK_IMAGES.catering;
  if (lower.includes('venue') || lower.includes('decor')) return FALLBACK_IMAGES.decor;
  if (lower.includes('makeup') || lower.includes('spa') || lower.includes('salon')) return FALLBACK_IMAGES.makeup;
  if (lower.includes('fashion') || lower.includes('couture') || lower.includes('saree')) return FALLBACK_IMAGES.fashion;
  if (lower.includes('dj') || lower.includes('music') || lower.includes('sound')) return FALLBACK_IMAGES.music;
  if (lower.includes('coordination') || lower.includes('plan')) return FALLBACK_IMAGES.planning;
  if (lower.includes('barber') || lower.includes('groom')) return FALLBACK_IMAGES.barber;
  return FALLBACK_IMAGES.wedding;
}

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  categoryHint?: string;
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  categoryHint,
  fallbackSrc,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => normalizeImageUrl(src, categoryHint));
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(normalizeImageUrl(src, categoryHint));
    setHasError(false);
  }, [src, categoryHint]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = fallbackSrc || getFallbackForCategory(categoryHint);
      // Only switch if different from current
      if (currentSrc !== fallback) {
        setCurrentSrc(fallback);
      }
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      className={className}
      {...props}
    />
  );
};
