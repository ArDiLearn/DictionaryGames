import React, { useId } from 'react';

export type FlagCountry = 'gb' | 'en' | 'lv' | 'ru';

interface FlagIconProps {
  country: FlagCountry;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const FlagIcon: React.FC<FlagIconProps> = ({
  country,
  className = '',
  size = 'md',
}) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  const normalized = country === 'en' ? 'gb' : country;

  const sizeClasses = {
    xs: 'w-4 h-2.5',
    sm: 'w-5 h-3.5',
    md: 'w-6 h-4',
    lg: 'w-7 h-5',
    xl: 'w-8 h-5.5 sm:w-9 sm:h-6',
  }[size];

  if (normalized === 'lv') {
    return (
      <svg
        viewBox="0 0 600 360"
        className={`inline-block shrink-0 rounded-[3px] shadow-sm border border-black/15 overflow-hidden align-middle ${sizeClasses} ${className}`}
        aria-label="Latvia"
      >
        <rect width="600" height="360" fill="#9E3039" />
        <rect width="600" height="72" y="144" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized === 'gb') {
    const clipS = `clip-s-${id}`;
    const clipT = `clip-t-${id}`;
    return (
      <svg
        viewBox="0 0 60 30"
        className={`inline-block shrink-0 rounded-[3px] shadow-sm border border-black/15 overflow-hidden align-middle ${sizeClasses} ${className}`}
        aria-label="United Kingdom"
      >
        <clipPath id={clipS}>
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id={clipT}>
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath={`url(#${clipS})`}>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clipT})`} stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  if (normalized === 'ru') {
    return (
      <svg
        viewBox="0 0 900 600"
        className={`inline-block shrink-0 rounded-[3px] shadow-sm border border-black/15 overflow-hidden align-middle ${sizeClasses} ${className}`}
        aria-label="Russia"
      >
        <rect width="900" height="200" y="0" fill="#FFFFFF" />
        <rect width="900" height="200" y="200" fill="#0039A6" />
        <rect width="900" height="200" y="400" fill="#D52B1E" />
      </svg>
    );
  }

  return null;
};
