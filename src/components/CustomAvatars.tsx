import React from 'react';

interface CustomAvatarProps {
  className?: string;
}

// 1. Simple Capybara - Authentic, cute, chill capybara (no beaver teeth or tail)
export const CapybaraAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Ear */}
    <ellipse cx="25" cy="27" rx="8" ry="10" transform="rotate(-18 25 27)" fill="#8D5524" />
    <ellipse cx="25" cy="27" rx="4.5" ry="6.5" transform="rotate(-18 25 27)" fill="#5C3310" />

    {/* Right Ear */}
    <ellipse cx="75" cy="27" rx="8" ry="10" transform="rotate(18 75 27)" fill="#8D5524" />
    <ellipse cx="75" cy="27" rx="4.5" ry="6.5" transform="rotate(18 75 27)" fill="#5C3310" />

    {/* Head & Body - Authentic blocky capybara silhouette */}
    <path
      d="M 30 24 Q 50 22 70 24 C 83 25 89 39 89 57 C 89 76 80 90 50 90 C 20 90 11 76 11 57 C 11 39 17 25 30 24 Z"
      fill="#B47B48"
    />

    {/* Muzzle */}
    <ellipse cx="50" cy="65" rx="27" ry="20" fill="#DEB07E" />

    {/* Cheeks Blush */}
    <circle cx="21" cy="62" r="7" fill="#F87171" opacity="0.35" />
    <circle cx="79" cy="62" r="7" fill="#F87171" opacity="0.35" />

    {/* Nose Pad */}
    <path
      d="M 39 52 Q 50 49 61 52 C 63 57 61 63 50 64 C 39 63 37 57 39 52 Z"
      fill="#3D2111"
    />
    <ellipse cx="44" cy="57" rx="2" ry="2.8" fill="#200F06" />
    <ellipse cx="56" cy="57" rx="2" ry="2.8" fill="#200F06" />

    {/* Mouth */}
    <path
      d="M 50 64 L 50 71 M 43 71 Q 50 75 57 71"
      stroke="#3D2111"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Eyes - Peaceful & Calm */}
    <path
      d="M 26 44 Q 32 40 38 44"
      stroke="#200F06"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 62 44 Q 68 40 74 44"
      stroke="#200F06"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// 2. Simple Pineapple - Joyful cute pineapple
export const PineappleAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Crown Leaves */}
    <path d="M 50 5 C 44 16 43 27 50 37 C 57 27 56 16 50 5 Z" fill="#15803D" />
    <path d="M 44 12 C 34 19 35 28 45 37 C 48 29 49 20 44 12 Z" fill="#22C55E" />
    <path d="M 56 12 C 66 19 65 28 55 37 C 52 29 51 20 56 12 Z" fill="#22C55E" />
    <path d="M 37 20 C 27 26 30 33 41 38 C 41 31 39 25 37 20 Z" fill="#16A34A" />
    <path d="M 63 20 C 73 26 70 33 59 38 C 59 31 61 25 63 20 Z" fill="#16A34A" />

    {/* Pineapple Body */}
    <ellipse cx="50" cy="62" rx="31" ry="33" fill="#F59E0B" />

    {/* Texture Diamond Lines */}
    <path
      d="M 30 50 L 70 74 M 23 62 L 65 87 M 40 40 L 77 62"
      stroke="#D97706"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.65"
    />
    <path
      d="M 70 50 L 30 74 M 77 62 L 35 87 M 60 40 L 23 62"
      stroke="#D97706"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.65"
    />

    {/* Cheeks Blush */}
    <ellipse cx="30" cy="66" rx="5.5" ry="4" fill="#F87171" opacity="0.4" />
    <ellipse cx="70" cy="66" rx="5.5" ry="4" fill="#F87171" opacity="0.4" />

    {/* Eyes */}
    <ellipse cx="38" cy="57" rx="4.5" ry="6" fill="#1E293B" />
    <circle cx="36.5" cy="55" r="1.8" fill="white" />
    <ellipse cx="62" cy="57" rx="4.5" ry="6" fill="#1E293B" />
    <circle cx="60.5" cy="55" r="1.8" fill="white" />

    {/* Smile */}
    <path
      d="M 42 66 Q 50 74 58 66"
      stroke="#B45309"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="#EF4444"
    />
  </svg>
);

// 3. Gamer Capybara - With stylish neon gaming headset
export const GamerCapybaraAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Capybara */}
    <CapybaraAvatar className="w-full h-full" />

    {/* Headset Headband */}
    <path
      d="M 17 48 C 17 13 83 13 83 48"
      stroke="#2563EB"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 23 45 C 23 18 77 18 77 45"
      stroke="#60A5FA"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Left Earcup */}
    <rect x="9" y="38" width="13" height="24" rx="6" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5" />
    <circle cx="15.5" cy="50" r="4.5" fill="#38BDF8" />

    {/* Right Earcup */}
    <rect x="78" y="38" width="13" height="24" rx="6" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5" />
    <circle cx="84.5" cy="50" r="4.5" fill="#38BDF8" />

    {/* Boom Mic */}
    <path
      d="M 18 55 Q 24 74 41 72"
      stroke="#0F172A"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <ellipse cx="42" cy="72" rx="4" ry="3" fill="#EF4444" />
  </svg>
);

// 4. Gamer Pineapple - In cool gamer headphones
export const GamerPineappleAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Pineapple */}
    <PineappleAvatar className="w-full h-full" />

    {/* Headset Headband resting across crown base */}
    <path
      d="M 19 56 C 18 22 82 22 81 56"
      stroke="#7C3AED"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 25 54 C 25 28 75 28 75 54"
      stroke="#C084FC"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Left Earcup */}
    <rect x="11" y="46" width="13" height="24" rx="6" fill="#6D28D9" stroke="#E9D5FF" strokeWidth="1.5" />
    <circle cx="17.5" cy="58" r="4.5" fill="#F43F5E" />

    {/* Right Earcup */}
    <rect x="76" y="46" width="13" height="24" rx="6" fill="#6D28D9" stroke="#E9D5FF" strokeWidth="1.5" />
    <circle cx="82.5" cy="58" r="4.5" fill="#F43F5E" />

    {/* Mic */}
    <path
      d="M 20 62 Q 26 78 41 76"
      stroke="#0F172A"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <ellipse cx="42" cy="76" rx="4" ry="3" fill="#06B6D4" />
  </svg>
);

// 5. King Capybara - Crown worn DIRECTLY on head between ears!
export const KingCapybaraAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Capybara */}
    <CapybaraAvatar className="w-full h-full" />

    {/* Golden Royal Crown worn right on the head */}
    <g>
      {/* Crown base band */}
      <rect x="31" y="19" width="38" height="6" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />

      {/* Crown peaks */}
      <path
        d="M 31 20 L 33 8 L 42 15 L 50 5 L 58 15 L 67 8 L 69 20 Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Jewels on Crown Peaks */}
      <circle cx="33" cy="7" r="2.2" fill="#FEF08A" />
      <circle cx="50" cy="4.5" r="2.8" fill="#FEF08A" />
      <circle cx="67" cy="7" r="2.2" fill="#FEF08A" />

      {/* Center Ruby */}
      <circle cx="50" cy="15" r="3.2" fill="#EF4444" stroke="#991B1B" strokeWidth="0.8" />
      {/* Side Sapphires */}
      <circle cx="39" cy="17" r="2.4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="0.8" />
      <circle cx="61" cy="17" r="2.4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="0.8" />
    </g>
  </svg>
);

// 6. King Pineapple - Royal Crown worn DIRECTLY on leafy head!
export const KingPineappleAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Pineapple */}
    <PineappleAvatar className="w-full h-full" />

    {/* Golden Royal Crown worn on top of pineapple */}
    <g>
      <rect x="30" y="27" width="40" height="6" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      <path
        d="M 30 28 L 32 14 L 41 21 L 50 10 L 59 21 L 68 14 L 70 28 Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Crown Tip Pearls */}
      <circle cx="32" cy="13" r="2.2" fill="#FEF08A" />
      <circle cx="50" cy="9.5" r="2.8" fill="#FEF08A" />
      <circle cx="68" cy="13" r="2.2" fill="#FEF08A" />

      {/* Center Emerald */}
      <circle cx="50" cy="22" r="3.2" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      {/* Side Rubies */}
      <circle cx="39" cy="23" r="2.4" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.8" />
      <circle cx="61" cy="23" r="2.4" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.8" />
    </g>
  </svg>
);

// 7. Cool Capybara - Dark stylish sunglasses worn ON face
export const CoolCapybaraAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Capybara */}
    <CapybaraAvatar className="w-full h-full" />

    {/* Sunglasses Bridge */}
    <line x1="43" y1="46" x2="57" y2="46" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

    {/* Left Lens */}
    <rect x="20" y="40" width="25" height="17" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
    {/* Left Gloss Glare */}
    <path d="M 25 43 L 31 43 L 26 53 L 23 53 Z" fill="white" opacity="0.6" />
    <circle cx="35" cy="45" r="1.5" fill="white" opacity="0.6" />

    {/* Right Lens */}
    <rect x="55" y="40" width="25" height="17" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
    {/* Right Gloss Glare */}
    <path d="M 60 43 L 66 43 L 61 53 L 58 53 Z" fill="white" opacity="0.6" />
    <circle cx="70" cy="45" r="1.5" fill="white" opacity="0.6" />
  </svg>
);

// 8. Cool Pineapple - Dark stylish sunglasses worn ON face
export const CoolPineappleAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Pineapple */}
    <PineappleAvatar className="w-full h-full" />

    {/* Sunglasses Bridge */}
    <line x1="43" y1="56" x2="57" y2="56" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

    {/* Left Lens */}
    <rect x="22" y="50" width="23" height="16" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
    {/* Left Glare */}
    <path d="M 26 53 L 32 53 L 27 62 L 24 62 Z" fill="white" opacity="0.6" />
    <circle cx="36" cy="55" r="1.5" fill="white" opacity="0.6" />

    {/* Right Lens */}
    <rect x="55" y="50" width="23" height="16" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
    {/* Right Glare */}
    <path d="M 59 53 L 65 53 L 60 62 L 57 62 Z" fill="white" opacity="0.6" />
    <circle cx="69" cy="55" r="1.5" fill="white" opacity="0.6" />
  </svg>
);

// 9. Cosmic Pineapple - Space astronaut helmet with stars
export const CosmicPineappleAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Glowing Cosmic Aura */}
    <circle cx="50" cy="54" r="44" fill="#F59E0B" opacity="0.2" />

    {/* Base Pineapple */}
    <PineappleAvatar className="w-full h-full" />

    {/* Transparent Astronaut Glass Bubble Helmet */}
    <ellipse cx="50" cy="58" rx="38" ry="36" fill="url(#cosmicGlassGrad)" stroke="#38BDF8" strokeWidth="2.5" opacity="0.85" />

    {/* Glass reflections */}
    <path
      d="M 22 45 C 26 32 38 27 50 27"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.75"
    />
    <circle cx="74" cy="40" r="2.5" fill="white" opacity="0.8" />
    <circle cx="70" cy="74" r="1.8" fill="white" opacity="0.6" />

    <defs>
      <linearGradient id="cosmicGlassGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" stopOpacity="0.25" />
        <stop offset="0.5" stopColor="#818CF8" stopOpacity="0.1" />
        <stop offset="1" stopColor="#C084FC" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

// 10. Zen Capybara - Serene meditation with golden lotus & glowing aura
export const ZenCapybaraAvatar: React.FC<CustomAvatarProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Zen Halo Aura */}
    <circle cx="50" cy="50" r="45" fill="url(#zenAuraGrad)" opacity="0.3" />

    {/* Base Capybara */}
    <CapybaraAvatar className="w-full h-full" />

    {/* Closed peaceful meditation smile eyes */}
    <path
      d="M 26 44 Q 32 49 38 44"
      stroke="#200F06"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 62 44 Q 68 49 74 44"
      stroke="#200F06"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Golden Lotus Flower on head */}
    <g transform="translate(50, 16) scale(0.8) translate(-50, -50)">
      <path d="M 50 26 C 42 36 43 45 50 50 C 57 45 58 36 50 26 Z" fill="#F472B6" />
      <path d="M 44 32 C 34 38 37 46 47 50 C 49 44 48 37 44 32 Z" fill="#FBCFE8" />
      <path d="M 56 32 C 66 38 63 46 53 50 C 51 44 52 37 56 32 Z" fill="#FBCFE8" />
      <circle cx="50" cy="44" r="3.5" fill="#FBBF24" />
    </g>

    {/* Forehead sacred golden dot */}
    <circle cx="50" cy="36" r="2.2" fill="#F59E0B" />

    <defs>
      <radialGradient id="zenAuraGrad" cx="50%" cy="50%" r="50%">
        <stop stopColor="#F59E0B" stopOpacity="0.8" />
        <stop offset="0.6" stopColor="#EC4899" stopOpacity="0.4" />
        <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const CUSTOM_AVATARS_MAP: Record<string, React.FC<CustomAvatarProps>> = {
  pineapple: PineappleAvatar,
  '🍍': PineappleAvatar,

  capybara: CapybaraAvatar,
  '🦫': CapybaraAvatar,

  gamer_pineapple: GamerPineappleAvatar,
  tropical_pineapple: GamerPineappleAvatar,
  '🍍🎧': GamerPineappleAvatar,
  '🍍🍹': GamerPineappleAvatar,

  gamer_capybara: GamerCapybaraAvatar,
  onsen_capybara: GamerCapybaraAvatar,
  '🦫🎧': GamerCapybaraAvatar,
  '🦫🍊': GamerCapybaraAvatar,

  king_pineapple: KingPineappleAvatar,
  '🍍👑': KingPineappleAvatar,

  king_capybara: KingCapybaraAvatar,
  '🦫👑': KingCapybaraAvatar,

  cool_pineapple: CoolPineappleAvatar,
  disco_pineapple: CoolPineappleAvatar,
  '🍍🕶️': CoolPineappleAvatar,
  '🍍🪩': CoolPineappleAvatar,

  cool_capybara: CoolCapybaraAvatar,
  '🦫🕶️': CoolCapybaraAvatar,

  cosmic_pineapple: CosmicPineappleAvatar,
  '🍍✨': CosmicPineappleAvatar,

  zen_capybara: ZenCapybaraAvatar,
  '🦫✨': ZenCapybaraAvatar,
};

export function getCustomAvatarComponent(avatarStr: string): React.FC<CustomAvatarProps> | undefined {
  if (!avatarStr) return undefined;
  return CUSTOM_AVATARS_MAP[avatarStr];
}
