import React from 'react';
import { getAvatarShopItem } from '../data/avatars';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarBadgeProps {
  avatar: string;
  size?: AvatarSize;
  className?: string;
  showStars?: boolean;
  animate?: boolean;
}

const SIZE_MAP: Record<
  AvatarSize,
  {
    container: string;
    text: string;
    starTR: string;
    starBL: string;
    starTL: string;
    starBR: string;
  }
> = {
  xs: {
    container: 'w-8 h-8 rounded-xl',
    text: 'text-base',
    starTR: 'text-[9px] -top-1 -right-1',
    starBL: 'text-[8px] -bottom-1 -left-1',
    starTL: 'text-[7px] -top-0.5 -left-0.5',
    starBR: 'text-[8px] -bottom-0.5 -right-0.5',
  },
  sm: {
    container: 'w-10 h-10 rounded-2xl',
    text: 'text-xl',
    starTR: 'text-[11px] -top-1.5 -right-1.5',
    starBL: 'text-[9px] -bottom-1 -left-1',
    starTL: 'text-[8px] -top-1 -left-1',
    starBR: 'text-[9px] -bottom-1 -right-1',
  },
  md: {
    container: 'w-12 h-12 rounded-2xl',
    text: 'text-2xl sm:text-3xl',
    starTR: 'text-xs -top-1.5 -right-1.5',
    starBL: 'text-[10px] -bottom-1.5 -left-1.5',
    starTL: 'text-[9px] -top-1 -left-1',
    starBR: 'text-[10px] -bottom-1 -right-1',
  },
  lg: {
    container: 'w-14 h-14 rounded-2xl',
    text: 'text-3xl sm:text-4xl',
    starTR: 'text-sm -top-2 -right-2',
    starBL: 'text-xs -bottom-2 -left-2',
    starTL: 'text-[10px] -top-1.5 -left-1.5',
    starBR: 'text-xs -bottom-1.5 -right-1.5',
  },
  xl: {
    container: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl',
    text: 'text-4xl sm:text-5xl',
    starTR: 'text-base -top-2.5 -right-2.5',
    starBL: 'text-sm -bottom-2.5 -left-2.5',
    starTL: 'text-xs -top-2 -left-2',
    starBR: 'text-sm -bottom-2 -right-2',
  },
  '2xl': {
    container: 'w-24 h-24 rounded-3xl',
    text: 'text-6xl',
    starTR: 'text-lg -top-3 -right-3',
    starBL: 'text-base -bottom-3 -left-3',
    starTL: 'text-sm -top-2.5 -left-2.5',
    starBR: 'text-base -bottom-2.5 -right-2.5',
  },
};

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  avatar,
  size = 'md',
  className = '',
  showStars = true,
  animate = true,
}) => {
  const item = getAvatarShopItem(avatar || '🦁');
  const vfx = item?.vfx;
  const config = SIZE_MAP[size] || SIZE_MAP.md;

  // Clean emoji display: if mythic, strip trailing sparkle for centered character
  const displayEmoji = vfx
    ? (item?.emoji || avatar).replace(/✨$/, '')
    : avatar || '🦁';

  const isMultiGrapheme =
    typeof Intl !== 'undefined' && (Intl as unknown as { Segmenter?: unknown }).Segmenter
      ? [...new (Intl as unknown as { Segmenter: new () => { segment: (s: string) => Iterable<unknown> } }).Segmenter().segment(displayEmoji)].length > 1
      : [...displayEmoji].length > 2;
  const multiGraphemeStyle = isMultiGrapheme ? 'scale-[0.72] tracking-tighter' : '';

  if (vfx) {
    const sparkles = vfx.sparkles || ['✨', '⭐', '✨', '🌟'];

    return (
      <div
        className={`relative inline-flex items-center justify-center select-none shrink-0 border-2 ${config.container} ${vfx.bgGradient} ${vfx.borderClass} ${vfx.glowClass} ${animate ? 'animate-float' : ''} ${className}`}
      >
        {/* Floating Twinkling Stars */}
        {showStars && (
          <>
            <span
              className={`absolute pointer-events-none select-none z-10 ${config.starTR} ${
                animate ? 'animate-twinkle' : ''
              }`}
            >
              {sparkles[0] || '✨'}
            </span>
            <span
              className={`absolute pointer-events-none select-none z-10 ${config.starBL} ${
                animate ? 'animate-twinkle-delay' : ''
              }`}
            >
              {sparkles[1] || '⭐'}
            </span>
            <span
              className={`absolute pointer-events-none select-none z-10 ${config.starTL} ${
                animate ? 'animate-twinkle' : ''
              }`}
            >
              {sparkles[2] || '✨'}
            </span>
            <span
              className={`absolute pointer-events-none select-none z-10 ${config.starBR} ${
                animate ? 'animate-twinkle-delay' : ''
              }`}
            >
              {sparkles[3] || '🌟'}
            </span>
          </>
        )}

        {/* Center Character Emoji */}
        <span className={`${config.text} ${multiGraphemeStyle} inline-block drop-shadow-md z-0 leading-none transition-transform`}>
          {displayEmoji}
        </span>
      </div>
    );
  }

  // Standard non-mythic avatar
  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 bg-white border-2 border-amber-300 shadow-sm ${config.container} ${className}`}
    >
      <span className={`${config.text} ${multiGraphemeStyle} inline-block leading-none transition-transform`}>{displayEmoji}</span>
    </div>
  );
};
