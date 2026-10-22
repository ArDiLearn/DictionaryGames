import React from 'react';

export const WORD_SVGS: Record<string, React.ReactNode> = {
  // 1. парта (desk - school desk with tilted wood top, pencil slot, notebook and chair)
  'desk': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Chair Back and Legs */}
      <rect x="22" y="32" width="6" height="38" rx="3" fill="#64748b" />
      <rect x="18" y="34" width="14" height="16" rx="4" fill="#b45309" />
      <rect x="18" y="56" width="18" height="6" rx="3" fill="#d97706" />
      <rect x="32" y="58" width="5" height="28" rx="2.5" fill="#475569" />
      <rect x="20" y="60" width="5" height="26" rx="2.5" fill="#64748b" />
      {/* Desk Frame & Legs */}
      <path d="M48 86 L56 46 L76 46 L82 86" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <line x1="53" y1="64" x2="79" y2="64" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
      {/* Book Basket Under Desk */}
      <rect x="52" y="50" width="26" height="10" rx="2" fill="#94a3b8" opacity="0.6" />
      {/* Slanted Wooden Desktop */}
      <polygon points="42,46 88,40 92,48 44,54" fill="#d97706" />
      <polygon points="42,43 88,37 92,41 44,47" fill="#f59e0b" />
      {/* Notebook on desk */}
      <polygon points="56,42 74,40 76,46 58,48" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      {/* Pencil in groove */}
      <line x1="78" y1="39" x2="88" y2="38" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  // 2. точилка (pencil sharpener - isometric blue wedge sharpener matching reference photo)
  'pencil sharpener': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow */}
      <ellipse cx="50" cy="88" rx="38" ry="7" fill="#94a3b8" opacity="0.4" />

      {/* Main Plastic Body - Isometric Wedge */}
      {/* Front Face (with pencil hole) */}
      <polygon points="14,38 40,56 40,86 14,68" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1" strokeLinejoin="round" />

      {/* Pencil Hole on Front Face */}
      <g transform="rotate(-15 27 62)">
        <ellipse cx="27" cy="62" rx="7.5" ry="11" fill="#0b1e42" />
        <ellipse cx="27" cy="62" rx="6.5" ry="9.5" fill="#08142c" />
        {/* Inner Hole Conical Depth Shading */}
        <path d="M22 62 C22 68 32 68 32 62 C32 58 22 58 22 62 Z" fill="#1e3a8a" opacity="0.6" />
      </g>

      {/* Right Side Wall (curved concave finger grip) */}
      <path d="M40 56 C56 61 72 49 88 30 L88 60 C72 79 56 91 40 86 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" strokeLinejoin="round" />

      {/* Vertical Grip Ridges along the concave side */}
      <line x1="50" y1="59" x2="50" y2="85" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="50.8" y1="59" x2="50.8" y2="85" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="54" y1="57" x2="54" y2="82" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="54.8" y1="57" x2="54.8" y2="82" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="58" y1="55" x2="58" y2="79" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="58.8" y1="55" x2="58.8" y2="79" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="62" y1="52" x2="62" y2="76" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="62.8" y1="52" x2="62.8" y2="76" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="66" y1="49" x2="66" y2="73" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="66.8" y1="49" x2="66.8" y2="73" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="70" y1="46" x2="70" y2="70" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="70.8" y1="46" x2="70.8" y2="70" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="74" y1="43" x2="74" y2="67" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="74.8" y1="43" x2="74.8" y2="67" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="78" y1="40" x2="78" y2="64" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="78.8" y1="40" x2="78.8" y2="64" stroke="#60a5fa" strokeWidth="0.8" />

      {/* Top Surface */}
      <polygon points="14,38 40,56 88,30 62,12" fill="#3b82f6" />

      {/* Raised Back-Left Stepped Wall with Grip Teeth */}
      <polygon points="50,19 62,12 88,30 84,33 60,17 50,22" fill="#1d4ed8" />
      <polygon points="50,19 50,22 60,17 60,14" fill="#60a5fa" />
      {/* Tiny grip teeth on top back ridge */}
      <line x1="66" y1="15" x2="68" y2="16.5" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="72" y1="19" x2="74" y2="20.5" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="78" y1="23" x2="80" y2="24.5" stroke="#93c5fd" strokeWidth="1.5" />

      {/* Blade Bed Recess */}
      <polygon points="28,48 76,22 84,27 36,53" fill="#1e40af" />
      {/* Shavings slot opening */}
      <polygon points="26,45 66,22 68,24 28,47" fill="#0f172a" />

      {/* Steel Blade */}
      <polygon points="32,49 76,24 82,28 38,53" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Metallic highlight on blade cutting edge */}
      <line x1="32" y1="49" x2="76" y2="24" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      {/* Blade bevel shadow */}
      <polygon points="37,53 82,28 80,30 35,55" fill="#94a3b8" />

      {/* Central Domed Screw */}
      <ellipse cx="57" cy="38" rx="5" ry="4.2" fill="#94a3b8" />
      <ellipse cx="56.6" cy="37.6" rx="4.5" ry="3.8" fill="#e2e8f0" />
      {/* Shiny Specular Highlight */}
      <circle cx="55.2" cy="36.5" r="1.2" fill="#ffffff" />
      {/* Screw Cross Slot */}
      <line x1="53.8" y1="37.6" x2="59.4" y2="37.6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="56.6" y1="35.2" x2="56.6" y2="40" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />

      {/* Top Edge Specular Lighting */}
      <line x1="14" y1="38" x2="40" y2="56" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="40" y1="56" x2="88" y2="30" stroke="#93c5fd" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),

  // 3. пенал (pencil case - zippered school case with colored pencils)
  'pencil case': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Pencils sticking out from open pouch */}
      <rect x="36" y="16" width="6" height="28" rx="2" fill="#ef4444" transform="rotate(-15 36 16)" />
      <polygon points="31,16 34,8 37,15" fill="#fcd34d" />
      <polygon points="33,11 34,8 35,11" fill="#ef4444" />

      <rect x="48" y="14" width="6" height="30" rx="2" fill="#22c55e" />
      <polygon points="48,14 51,6 54,14" fill="#fcd34d" />
      <polygon points="50,9 51,6 52,9" fill="#15803d" />

      <rect x="60" y="16" width="6" height="28" rx="2" fill="#f59e0b" transform="rotate(12 60 16)" />
      <polygon points="63,17 68,9 70,16" fill="#fcd34d" />
      <polygon points="67,12 68,9 69,12" fill="#b45309" />

      {/* Main Pencil Case Body */}
      <rect x="16" y="38" width="68" height="42" rx="14" fill="#7c3aed" />
      <rect x="18" y="40" width="64" height="38" rx="12" fill="#8b5cf6" />
      {/* Front pattern / stripes */}
      <path d="M22 62 C34 56 46 68 58 62 C70 56 78 62 80 62" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="50" r="2.5" fill="#fde047" />
      <circle cx="66" cy="50" r="2.5" fill="#fde047" />
      {/* Zipper strip at top */}
      <rect x="22" y="36" width="56" height="5" rx="2" fill="#e2e8f0" />
      <line x1="24" y1="38.5" x2="76" y2="38.5" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
      {/* Zipper Pull Tag */}
      <circle cx="74" cy="38.5" r="3" fill="#f59e0b" />
      <rect x="73" y="39" width="4" height="8" rx="2" fill="#f59e0b" />
    </svg>
  ),

  // 4. ластик (rubber - classic two-tone eraser with paper sleeve)
  'rubber': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Shadow */}
      <ellipse cx="50" cy="80" rx="36" ry="7" fill="#cbd5e1" opacity="0.6" />
      {/* Angled Eraser Block */}
      <g transform="rotate(-20 50 50)">
        {/* Pink / Red soft side */}
        <path d="M20 40 L46 40 L46 64 L20 64 L14 52 Z" fill="#f43f5e" />
        <path d="M20 38 L46 38 L46 42 L16 42 Z" fill="#fb7185" />
        {/* Blue / Firm side */}
        <path d="M46 40 L78 40 L84 52 L78 64 L46 64 Z" fill="#2563eb" />
        <path d="M46 38 L78 38 L84 48 L80 40 Z" fill="#60a5fa" />
        {/* White Cardboard Sleeve in Center */}
        <rect x="36" y="38" width="28" height="28" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        {/* Sleeve Brand Stripe */}
        <rect x="36" y="48" width="28" height="7" fill="#0284c7" />
        {/* Little eraser shavings / crumbs */}
        <circle cx="16" cy="70" r="1.5" fill="#f43f5e" />
        <circle cx="22" cy="74" r="2" fill="#f43f5e" />
        <circle cx="28" cy="71" r="1" fill="#f43f5e" />
      </g>
    </svg>
  ),

  // 5. клей (glue - bottle of school PVA glue with dispenser tip & label without text)
  'glue': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow */}
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="#cbd5e1" opacity="0.6" />
      {/* Glue Drop from tip */}
      <path d="M50 14 C50 14 47 19 47 21 C47 22.5 48.3 24 50 24 C51.7 24 53 22.5 53 21 C53 19 50 14 50 14 Z" fill="#38bdf8" />
      {/* Orange Nozzle Tip */}
      <polygon points="46,26 54,26 52,22 48,22" fill="#ea580c" />
      <rect x="45" y="26" width="10" height="6" rx="1.5" fill="#f97316" />
      {/* Cap Ring */}
      <rect x="42" y="32" width="16" height="5" rx="1.5" fill="#ea580c" />
      {/* Bottle Shoulder and Body */}
      <path d="M44 37 L56 37 C64 37 72 44 72 52 L72 78 C72 83 67 87 62 87 L38 87 C33 87 28 83 28 78 L28 52 C28 44 36 37 44 37 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {/* Body 3D shading */}
      <path d="M64 48 L64 78 C64 81 61 84 58 84 L42 84 C39 84 36 81 36 78 L36 48 Z" fill="#f1f5f9" opacity="0.7" />
      {/* Label on Bottle */}
      <rect x="34" y="52" width="32" height="24" rx="4" fill="#2563eb" />
      <rect x="36" y="54" width="28" height="20" rx="3" fill="#3b82f6" />
      {/* Decorative Droplet Emblem (No Text) */}
      <path d="M50 57 C50 57 45.5 63 45.5 65.5 C45.5 68 47.5 70 50 70 C52.5 70 54.5 68 54.5 65.5 C54.5 63 50 57 50 57 Z" fill="#ffffff" />
      <circle cx="48.5" cy="65.5" r="1.2" fill="#3b82f6" />
      {/* Decorative Wave Accent Lines */}
      <path d="M37 68 C41 66 45 70 50 70 C55 70 59 66 63 68" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M39 71 C43 69 47 72 50 72 C53 72 57 69 61 71" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 6. фишки (counters - colorful 3D circular tokens for counting / board games)
  'counters': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Bottom Left Red Chip */}
      <ellipse cx="36" cy="62" rx="20" ry="11" fill="#b91c1c" />
      <path d="M16 62 C16 70 56 70 56 62 L56 68 C56 76 16 76 16 68 Z" fill="#991b1b" />
      <ellipse cx="36" cy="61" rx="18" ry="9" fill="#ef4444" />
      <ellipse cx="36" cy="61" rx="12" ry="5.5" fill="#f87171" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 2" />

      {/* Right Blue Chip */}
      <ellipse cx="64" cy="58" rx="20" ry="11" fill="#1d4ed8" />
      <path d="M44 58 C44 66 84 66 84 58 L84 64 C84 72 44 72 44 64 Z" fill="#1e40af" />
      <ellipse cx="64" cy="57" rx="18" ry="9" fill="#3b82f6" />
      <ellipse cx="64" cy="57" rx="12" ry="5.5" fill="#60a5fa" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 2" />

      {/* Top Yellow / Gold Chip */}
      <ellipse cx="50" cy="40" rx="22" ry="12" fill="#d97706" />
      <path d="M28 40 C28 49 72 49 72 40 L72 46 C72 55 28 55 28 46 Z" fill="#b45309" />
      <ellipse cx="50" cy="39" rx="20" ry="10" fill="#f59e0b" />
      <ellipse cx="50" cy="39" rx="14" ry="6.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="50" cy="39" r="3" fill="#d97706" />
    </svg>
  ),

  // 7. кукла (doll - cute classic toy ragdoll with dress, yarn pigtails & smile)
  'doll': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Pigtails / Hair behind */}
      <circle cx="30" cy="34" r="9" fill="#d97706" />
      <circle cx="70" cy="34" r="9" fill="#d97706" />
      <path d="M24 38 C20 46 22 54 28 56" stroke="#b45309" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M76 38 C80 46 78 54 72 56" stroke="#b45309" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Bows on hair */}
      <circle cx="26" cy="37" r="4" fill="#ec4899" />
      <circle cx="74" cy="37" r="4" fill="#ec4899" />
      {/* Doll Body / Dress */}
      <path d="M40 50 L30 82 L70 82 L60 50 Z" fill="#ec4899" />
      <path d="M30 82 C40 85 60 85 70 82 L70 85 C60 88 40 88 30 85 Z" fill="#db2777" />
      {/* Polka dots on dress */}
      <circle cx="44" cy="62" r="2.5" fill="#ffffff" opacity="0.8" />
      <circle cx="56" cy="62" r="2.5" fill="#ffffff" opacity="0.8" />
      <circle cx="50" cy="72" r="2.5" fill="#ffffff" opacity="0.8" />
      {/* Little legs & shoes */}
      <rect x="42" y="82" width="5" height="10" rx="2" fill="#fed7aa" />
      <rect x="53" y="82" width="5" height="10" rx="2" fill="#fed7aa" />
      <ellipse cx="43.5" cy="92" rx="4" ry="2.5" fill="#be185d" />
      <ellipse cx="56.5" cy="92" rx="4" ry="2.5" fill="#be185d" />
      {/* Little Doll Arms */}
      <path d="M40 54 L26 66" stroke="#fed7aa" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M60 54 L74 66" stroke="#fed7aa" strokeWidth="4.5" strokeLinecap="round" />
      {/* Dress White Collar */}
      <path d="M42 50 C46 54 54 54 58 50 Z" fill="#f8fafc" />
      {/* Doll Head */}
      <circle cx="50" cy="32" r="16" fill="#fed7aa" />
      {/* Bangs */}
      <path d="M35 28 C42 22 58 22 65 28 C61 24 55 22 50 22 C45 22 39 24 35 28 Z" fill="#b45309" />
      {/* Face: button eyes, rosy cheeks, smile */}
      <circle cx="44" cy="31" r="2" fill="#1e293b" />
      <circle cx="56" cy="31" r="2" fill="#1e293b" />
      <circle cx="41" cy="36" r="3" fill="#fb7185" opacity="0.6" />
      <circle cx="59" cy="36" r="3" fill="#fb7185" opacity="0.6" />
      <path d="M47 37 C49 40 51 40 53 37" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 8. скакалка (skipping rope - realistic jump rope with wooden handles & curved rope)
  'skipping rope': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Shadow */}
      <ellipse cx="50" cy="86" rx="34" ry="5" fill="#cbd5e1" opacity="0.5" />
      {/* Left Handle */}
      <g transform="rotate(-30 24 30)">
        <rect x="20" y="16" width="9" height="24" rx="4" fill="#0284c7" />
        <rect x="22" y="18" width="5" height="20" rx="2" fill="#38bdf8" />
        <circle cx="24.5" cy="40" r="4" fill="#f59e0b" />
        <circle cx="24.5" cy="16" r="3" fill="#0369a1" />
      </g>
      {/* Right Handle */}
      <g transform="rotate(30 76 30)">
        <rect x="71" y="16" width="9" height="24" rx="4" fill="#0284c7" />
        <rect x="73" y="18" width="5" height="20" rx="2" fill="#38bdf8" />
        <circle cx="75.5" cy="40" r="4" fill="#f59e0b" />
        <circle cx="75.5" cy="16" r="3" fill="#0369a1" />
      </g>
      {/* Skipping Rope Cord Loop */}
      <path d="M26 36 C20 65 30 84 50 84 C70 84 80 65 74 36" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M26 36 C20 65 30 84 50 84 C70 84 80 65 74 36" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" fill="none" />
    </svg>
  ),

  // 9. свитер (sweater - cozy knitted woolen sweater with high collar & winter pattern)
  'sweater': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Sweater Body & Sleeves */}
      <path d="M34 22 L20 40 L10 58 L20 64 L30 52 L30 84 L70 84 L70 52 L80 64 L90 58 L80 40 L66 22 Z" fill="#0284c7" />
      {/* Ribbed High Collar */}
      <path d="M36 22 C36 17 64 17 64 22 L62 29 C62 33 38 33 38 29 Z" fill="#0369a1" />
      <line x1="43" y1="20" x2="43" y2="30" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="50" y1="20" x2="50" y2="30" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="57" y1="20" x2="57" y2="30" stroke="#38bdf8" strokeWidth="1.5" />
      {/* Winter Zig-Zag & Snowflake Knitted Band */}
      <rect x="30" y="44" width="40" height="14" fill="#075985" />
      <polyline points="32,51 36,46 40,51 44,46 48,51 52,46 56,51 60,46 64,51 68,46" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="32,56 36,51 40,56 44,51 48,56 52,51 56,56 60,51 64,56 68,51" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sleeve Cuffs */}
      <polygon points="10,58 20,64 17,68 7,62" fill="#0369a1" />
      <polygon points="90,58 80,64 83,68 93,62" fill="#0369a1" />
      {/* Bottom Hem Ribbing */}
      <rect x="30" y="80" width="40" height="6" rx="1" fill="#0369a1" />
      <line x1="38" y1="80" x2="38" y2="86" stroke="#38bdf8" strokeWidth="1.2" />
      <line x1="50" y1="80" x2="50" y2="86" stroke="#38bdf8" strokeWidth="1.2" />
      <line x1="62" y1="80" x2="62" y2="86" stroke="#38bdf8" strokeWidth="1.2" />
    </svg>
  ),

  // 10. рубашка (shirt - crisp button-down collared dress shirt with pocket)
  'shirt': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Shirt Body & Sleeves */}
      <path d="M34 24 L18 36 L12 50 L22 55 L28 46 L28 84 L72 84 L72 46 L78 55 L88 50 L82 36 L66 24 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      {/* Placket Down Center */}
      <line x1="50" y1="28" x2="50" y2="84" stroke="#0284c7" strokeWidth="3" />
      {/* Buttons */}
      <circle cx="50" cy="40" r="2" fill="#0369a1" />
      <circle cx="50" cy="52" r="2" fill="#0369a1" />
      <circle cx="50" cy="64" r="2" fill="#0369a1" />
      <circle cx="50" cy="76" r="2" fill="#0369a1" />
      {/* Chest Pocket on Left */}
      <path d="M57 44 L67 44 L67 56 L62 60 L57 56 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      {/* Crisp Left Collar */}
      <polygon points="50,28 32,24 40,36" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
      {/* Crisp Right Collar */}
      <polygon points="50,28 68,24 60,36" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
      {/* Tie Knot / Accent */}
      <circle cx="50" cy="30" r="2.5" fill="#0284c7" />
    </svg>
  ),

  // 11. куртка (jacket - warm hooded puffer winter jacket with zipper)
  'jacket': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Hood Behind Neck */}
      <path d="M34 26 C34 14 66 14 66 26 Z" fill="#c2410c" stroke="#9a3412" strokeWidth="2" />
      <path d="M40 26 C40 18 60 18 60 26 Z" fill="#7c2d12" />
      {/* Jacket Body & Sleeves (Puffer sections) */}
      <path d="M32 26 L16 38 L10 58 L22 62 L26 50 L26 84 L74 84 L74 50 L78 62 L90 58 L84 38 L68 26 Z" fill="#ea580c" />
      {/* Puffer Quilted Horizontal Lines */}
      <line x1="26" y1="42" x2="74" y2="42" stroke="#c2410c" strokeWidth="3" />
      <line x1="26" y1="56" x2="74" y2="56" stroke="#c2410c" strokeWidth="3" />
      <line x1="26" y1="70" x2="74" y2="70" stroke="#c2410c" strokeWidth="3" />
      {/* Sleeve Quilted Baffles */}
      <line x1="18" y1="42" x2="28" y2="46" stroke="#c2410c" strokeWidth="2.5" />
      <line x1="82" y1="42" x2="72" y2="46" stroke="#c2410c" strokeWidth="2.5" />
      {/* Central Metal Zipper */}
      <line x1="50" y1="26" x2="50" y2="84" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="3 1" />
      <circle cx="50" cy="34" r="2.5" fill="#f8fafc" />
      <rect x="49" y="34" width="2" height="6" fill="#f8fafc" />
      {/* Pockets with Zippers */}
      <line x1="32" y1="68" x2="42" y2="72" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="68" x2="58" y2="72" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  // 12. юбка (skirt - classic flared pleated school skirt with waistband)
  'skirt': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Waistband */}
      <rect x="32" y="24" width="36" height="8" rx="2" fill="#1e3a8a" />
      {/* Belt Button / Buckle */}
      <circle cx="50" cy="28" r="2" fill="#f59e0b" />
      {/* Flared Pleated Skirt Body */}
      <path d="M34 32 L16 80 C36 86 64 86 84 80 L66 32 Z" fill="#2563eb" />
      {/* Pleat Crease Lines & Shadows */}
      <path d="M40 32 L28 82" stroke="#1d4ed8" strokeWidth="3" />
      <path d="M46 32 L40 83" stroke="#1e40af" strokeWidth="2.5" />
      <path d="M52 32 L52 84" stroke="#1d4ed8" strokeWidth="3" />
      <path d="M58 32 L64 83" stroke="#1e40af" strokeWidth="2.5" />
      <path d="M62 32 L74 82" stroke="#1d4ed8" strokeWidth="3" />
      {/* Scalloped hem effect */}
      <path d="M16 80 C26 83 34 83 44 84 C54 84 64 84 84 80" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 13. кудрявые волосы (curly hair - head showcasing springy spiral curls)
  'curly hair': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Neck & Shoulders */}
      <path d="M44 68 L44 80 L30 88 L70 88 L56 80 L56 68 Z" fill="#fed7aa" />
      <path d="M30 88 C40 82 60 82 70 88 Z" fill="#f43f5e" />
      {/* Child Face Base */}
      <circle cx="50" cy="50" r="18" fill="#fed7aa" />
      {/* Cute Ears */}
      <circle cx="32" cy="52" r="4" fill="#fed7aa" />
      <circle cx="68" cy="52" r="4" fill="#fed7aa" />
      {/* Face features */}
      <circle cx="44" cy="50" r="2" fill="#1e293b" />
      <circle cx="56" cy="50" r="2" fill="#1e293b" />
      <circle cx="40" cy="54" r="2.5" fill="#fb7185" opacity="0.6" />
      <circle cx="60" cy="54" r="2.5" fill="#fb7185" opacity="0.6" />
      <path d="M47 56 C49 59 51 59 53 56" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Voluminous Curly Hair Puffs (Bouncy Ringlets) */}
      <g fill="#78350f" stroke="#451a03" strokeWidth="1.2">
        <circle cx="34" cy="38" r="8" />
        <circle cx="42" cy="28" r="9" />
        <circle cx="50" cy="24" r="9" />
        <circle cx="58" cy="28" r="9" />
        <circle cx="66" cy="38" r="8" />
        <circle cx="28" cy="48" r="7" />
        <circle cx="72" cy="48" r="7" />
        <circle cx="30" cy="58" r="6" />
        <circle cx="70" cy="58" r="6" />
      </g>
      {/* Spiral curl highlight lines */}
      <path d="M39 26 C43 23 45 28 43 31" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M48 22 C52 19 54 24 51 27" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M57 26 C61 23 63 28 60 31" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 14. темные волосы (dark hair - head with glossy black/dark brunette hair)
  'dark hair': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Neck & Shirt */}
      <path d="M44 68 L44 80 L30 88 L70 88 L56 80 L56 68 Z" fill="#fed7aa" />
      <path d="M30 88 C40 82 60 82 70 88 Z" fill="#0284c7" />
      {/* Face Base */}
      <circle cx="50" cy="52" r="18" fill="#fed7aa" />
      {/* Ears */}
      <circle cx="32" cy="54" r="4" fill="#fed7aa" />
      <circle cx="68" cy="54" r="4" fill="#fed7aa" />
      {/* Face details */}
      <circle cx="44" cy="52" r="2" fill="#1e293b" />
      <circle cx="56" cy="52" r="2" fill="#1e293b" />
      <path d="M47 58 C49 61 51 61 53 58" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Rich Jet-Black Hair Mass */}
      <path d="M28 50 C26 34 36 20 50 20 C64 20 74 34 72 50 C68 44 64 40 58 38 C48 36 40 44 28 50 Z" fill="#0f172a" />
      <path d="M28 48 C36 42 46 36 60 38 C68 40 70 46 72 50 L74 54 C74 42 70 26 50 24 C34 26 28 38 28 50 Z" fill="#1e293b" />
      {/* Glossy blue-gray hair shine highlight */}
      <path d="M38 26 C44 24 56 24 62 27" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 15. длинные волосы (long hair - girl with very long hair flowing well past shoulders)
  'long hair': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Very Long Hair Flowing in the Back (down to bottom) */}
      <path d="M30 40 C22 56 20 76 22 92 C28 92 36 92 36 80 L36 60" fill="#d97706" />
      <path d="M70 40 C78 56 80 76 78 92 C72 92 64 92 64 80 L64 60" fill="#d97706" />
      {/* Neck & Dress */}
      <path d="M44 66 L44 78 L32 88 L68 88 L56 78 L56 66 Z" fill="#fed7aa" />
      <path d="M32 88 C42 82 58 82 68 88 Z" fill="#ec4899" />
      {/* Face */}
      <circle cx="50" cy="46" r="17" fill="#fed7aa" />
      {/* Face features */}
      <circle cx="44" cy="46" r="2" fill="#1e293b" />
      <circle cx="56" cy="46" r="2" fill="#1e293b" />
      <circle cx="40" cy="50" r="2.5" fill="#fb7185" opacity="0.6" />
      <circle cx="60" cy="50" r="2.5" fill="#fb7185" opacity="0.6" />
      <path d="M47 52 C49 55 51 55 53 52" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Front Long Hair strands framing face */}
      <path d="M32 38 C32 20 68 20 68 38 C62 30 54 28 50 28 C46 28 38 30 32 38 Z" fill="#f59e0b" />
      <path d="M34 38 C30 52 30 72 32 86 C34 86 38 84 38 72 L38 46" fill="#f59e0b" />
      <path d="M66 38 C70 52 70 72 68 86 C66 86 62 84 62 72 L62 46" fill="#f59e0b" />
      {/* Hair Shine Lines */}
      <path d="M42 24 C48 22 52 22 58 24" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="34" y1="56" x2="34" y2="76" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="66" y1="56" x2="66" y2="76" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // 16. прямые волосы (straight hair - cute child portrait with sleek straight bangs and hair)
  'straight hair': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Straight Hair Mass in Back */}
      <path d="M24 38 L22 76 C24 78 32 78 34 76 L34 50 L66 50 L66 76 C68 78 76 78 78 76 L76 38 C72 20 28 20 24 38 Z" fill="#713f12" />

      {/* Neck */}
      <rect x="44" y="64" width="12" height="13" fill="#fed7aa" />

      {/* Shirt & Shoulders */}
      <path d="M26 88 C32 76 44 74 50 74 C56 74 68 76 74 88 Z" fill="#10b981" />
      {/* White Peter Pan Collar */}
      <path d="M42 74 C44 79 50 80 50 80 C50 80 56 79 58 74" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

      {/* Cute Symmetrical Ears */}
      <circle cx="29" cy="48" r="3.5" fill="#fed7aa" />
      <circle cx="71" cy="48" r="3.5" fill="#fed7aa" />

      {/* Cute, Naturally Proportioned Face Contour */}
      <path d="M31 40 C31 60 38 68 50 68 C62 68 69 60 69 40 C69 28 62 25 50 25 C38 25 31 28 31 40 Z" fill="#fed7aa" />

      {/* Delicate Eyebrows */}
      <path d="M39 42 C41 40.5 44 40.5 46 42" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M54 42 C56 40.5 59 40.5 61 42" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Expressive Eyes with Highlights */}
      <circle cx="42" cy="47" r="2.5" fill="#1e293b" />
      <circle cx="43" cy="46" r="0.8" fill="#ffffff" />
      <circle cx="58" cy="47" r="2.5" fill="#1e293b" />
      <circle cx="59" cy="46" r="0.8" fill="#ffffff" />

      {/* Rosy Cheeks */}
      <circle cx="37" cy="52" r="3" fill="#fb7185" opacity="0.5" />
      <circle cx="63" cy="52" r="3" fill="#fb7185" opacity="0.5" />

      {/* Sweet Smile */}
      <path d="M46 54 C48 57.5 52 57.5 54 54" stroke="#e11d48" strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Front Straight Bangs (Челка) - Clean Straight Horizontal Cut */}
      <path d="M30 38 C30 23 70 23 70 38 L70 40 L30 40 Z" fill="#854d0e" />
      <line x1="30" y1="40" x2="70" y2="40" stroke="#713f12" strokeWidth="1" />

      {/* Perfectly Straight Side Strands Framing Face */}
      <path d="M25 36 L23 72 C26 73 30 73 31 71 L32 40 Z" fill="#854d0e" />
      <path d="M75 36 L77 72 C74 73 70 73 69 71 L68 40 Z" fill="#854d0e" />

      {/* Silky Straight Vertical Shine Lines */}
      <line x1="26" y1="42" x2="26" y2="68" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="74" y1="42" x2="74" y2="68" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Crown Light Sheen */}
      <path d="M42 27 C46 25 54 25 58 27" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  ),

  // 17. шкаф для одежды (wardrobe - tall wooden closet with clothes hanging inside)
  'wardrobe': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Cabinet Base & Legs */}
      <rect x="22" y="80" width="56" height="8" rx="2" fill="#78350f" />
      <rect x="26" y="84" width="6" height="6" fill="#451a03" />
      <rect x="68" y="84" width="6" height="6" fill="#451a03" />
      {/* Main Wardrobe Box */}
      <rect x="22" y="16" width="56" height="66" rx="3" fill="#92400e" />
      {/* Crown Top Molding */}
      <polygon points="18,16 82,16 78,20 22,20" fill="#b45309" />
      {/* Inside Left Open Compartment */}
      <rect x="25" y="22" width="24" height="46" fill="#451a03" />
      {/* Hanging Rail */}
      <line x1="26" y1="26" x2="48" y2="26" stroke="#cbd5e1" strokeWidth="2" />
      {/* Hanging Clothes on Hangers */}
      <path d="M30 28 L34 26 L38 28 L40 46 L28 46 Z" fill="#ec4899" />
      <path d="M38 28 L42 26 L46 28 L48 52 L36 52 Z" fill="#38bdf8" />
      {/* Open Left Door (swung outward at perspective) */}
      <polygon points="25,22 14,26 14,70 25,68" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
      {/* Closed Right Door */}
      <rect x="49" y="22" width="26" height="46" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
      <rect x="53" y="26" width="18" height="38" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1" />
      {/* Brass Door Handles */}
      <circle cx="52" cy="46" r="2.5" fill="#f59e0b" />
      {/* Bottom Drawer */}
      <rect x="25" y="70" width="50" height="9" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      <rect x="44" y="73" width="12" height="3" rx="1.5" fill="#f59e0b" />
    </svg>
  ),

  // 18. книжный шкаф (bookcase - wooden bookshelf filled with colorful standing books)
  'bookcase': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Outer Wooden Bookcase Frame */}
      <rect x="22" y="14" width="56" height="74" rx="3" fill="#78350f" />
      <rect x="26" y="18" width="48" height="66" fill="#451a03" />
      {/* Top Molding */}
      <rect x="20" y="12" width="60" height="5" rx="1" fill="#92400e" />
      {/* Middle Shelf 1 */}
      <rect x="26" y="38" width="48" height="4" fill="#92400e" />
      {/* Middle Shelf 2 */}
      <rect x="26" y="62" width="48" height="4" fill="#92400e" />
      {/* Books on Top Shelf */}
      <rect x="29" y="22" width="5" height="16" fill="#ef4444" />
      <rect x="35" y="20" width="6" height="18" fill="#3b82f6" />
      <rect x="42" y="23" width="5" height="15" fill="#22c55e" />
      <rect x="48" y="21" width="7" height="17" fill="#f59e0b" />
      <rect x="56" y="24" width="6" height="14" fill="#8b5cf6" />
      <g transform="rotate(15 65 30)">
        <rect x="63" y="22" width="5" height="16" fill="#ec4899" />
      </g>
      {/* Books on Middle Shelf */}
      <rect x="29" y="44" width="6" height="18" fill="#06b6d4" />
      <rect x="36" y="46" width="5" height="16" fill="#f97316" />
      <rect x="42" y="43" width="7" height="19" fill="#eab308" />
      <rect x="50" y="45" width="6" height="17" fill="#ef4444" />
      <rect x="57" y="44" width="5" height="18" fill="#3b82f6" />
      <rect x="63" y="46" width="6" height="16" fill="#10b981" />
      {/* Books on Bottom Shelf */}
      <rect x="29" y="68" width="7" height="16" fill="#a855f7" />
      <rect x="37" y="67" width="6" height="17" fill="#3b82f6" />
      <rect x="44" y="69" width="6" height="15" fill="#f43f5e" />
      <rect x="51" y="67" width="5" height="17" fill="#22c55e" />
      <rect x="57" y="70" width="7" height="14" fill="#f59e0b" />
    </svg>
  ),

  // 19. стол (table - clean 4-legged wooden table in 3/4 perspective)
  'table': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Shadow */}
      <ellipse cx="50" cy="80" rx="36" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* 4 Wooden Legs */}
      {/* Back Left Leg */}
      <rect x="26" y="48" width="5" height="28" rx="2" fill="#92400e" />
      {/* Back Right Leg */}
      <rect x="70" y="48" width="5" height="28" rx="2" fill="#92400e" />
      {/* Table Apron/Frame */}
      <polygon points="24,46 76,46 74,53 26,53" fill="#b45309" />
      {/* Front Left Leg */}
      <rect x="20" y="50" width="6" height="32" rx="2" fill="#d97706" />
      {/* Front Right Leg */}
      <rect x="74" y="50" width="6" height="32" rx="2" fill="#d97706" />
      {/* Solid Wooden Tabletop */}
      <polygon points="20,48 80,48 84,42 16,42" fill="#b45309" />
      <polygon points="16,42 84,42 78,34 22,34" fill="#f59e0b" />
      {/* Wood grain highlights */}
      <line x1="28" y1="38" x2="72" y2="38" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // 20. диванная подушка (cushion - cozy plush sofa throw pillow with stitched piping & tassels)
  'cushion': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Pillow Shadow */}
      <ellipse cx="50" cy="85" rx="34" ry="7" fill="#cbd5e1" opacity="0.6" />

      {/* Main Pillow Cushion Body */}
      <path d="M22 26 C34 18 66 18 78 26 C86 42 86 64 78 80 C66 88 34 88 22 80 C14 64 14 42 22 26 Z" fill="#0f766e" />
      <path d="M24 28 C35 21 65 21 76 28 C83 42 83 62 76 78 C65 85 35 85 24 78 C17 62 17 42 24 28 Z" fill="#14b8a6" />

      {/* Tailored Piping / Seam Border */}
      <path d="M22 26 C34 18 66 18 78 26 C86 42 86 64 78 80 C66 88 34 88 22 80 C14 64 14 42 22 26 Z" stroke="#5eead4" strokeWidth="2" strokeLinejoin="round" fill="none" />

      {/* Corner Tassels */}
      {/* Top-Left Tassel */}
      <path d="M20 24 L14 18" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="25" r="3" fill="#f59e0b" />
      {/* Top-Right Tassel */}
      <path d="M80 24 L86 18" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="79" cy="25" r="3" fill="#f59e0b" />
      {/* Bottom-Left Tassel */}
      <path d="M20 82 L14 88" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="81" r="3" fill="#f59e0b" />
      {/* Bottom-Right Tassel */}
      <path d="M80 82 L86 88" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="79" cy="81" r="3" fill="#f59e0b" />

      {/* Soft Plush Folds & Indentations */}
      <path d="M28 32 C38 42 44 48 50 53" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M72 32 C62 42 56 48 50 53" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M28 74 C38 64 44 58 50 53" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M72 74 C62 64 56 58 50 53" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* Top Surface Light Highlight */}
      <path d="M30 32 C42 26 58 26 70 32" stroke="#99f6e4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

      {/* Center Tufting Button */}
      <circle cx="50" cy="53" r="5" fill="#0f766e" />
      <circle cx="49.5" cy="52.5" r="3.8" fill="#f59e0b" />
      <circle cx="48.5" cy="51.5" r="1.2" fill="#ffffff" />
      <line x1="48" y1="52.5" x2="51" y2="52.5" stroke="#b45309" strokeWidth="1" />
      <line x1="49.5" y1="51" x2="49.5" y2="54" stroke="#b45309" strokeWidth="1" />
    </svg>
  ),

  // 21. кухня (kitchen - cozy modern home kitchen with cabinets, sink, countertop, kettle & oven)
  'kitchen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Kitchen Back Wall with Subtle Frame */}
      <rect x="12" y="14" width="76" height="74" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Tiled Backsplash */}
      <rect x="12" y="32" width="76" height="17" fill="#f1f5f9" />
      <line x1="12" y1="37" x2="88" y2="37" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="12" y1="43" x2="88" y2="43" stroke="#e2e8f0" strokeWidth="0.8" />
      {/* Subtle Tile Vertical Grout Ticks */}
      <line x1="26" y1="32" x2="26" y2="37" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="50" y1="32" x2="50" y2="37" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="74" y1="32" x2="74" y2="37" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="38" y1="37" x2="38" y2="43" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="62" y1="37" x2="62" y2="43" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="26" y1="43" x2="26" y2="49" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="50" y1="43" x2="50" y2="49" stroke="#e2e8f0" strokeWidth="0.8" />
      <line x1="74" y1="43" x2="74" y2="49" stroke="#e2e8f0" strokeWidth="0.8" />

      {/* Upper Cabinets on Left */}
      <rect x="14" y="16" width="30" height="16" rx="2" fill="#0284c7" />
      <rect x="16" y="18" width="12" height="12" rx="1.5" fill="#38bdf8" />
      <rect x="30" y="18" width="12" height="12" rx="1.5" fill="#38bdf8" />
      {/* Cabinet Handles */}
      <line x1="26" y1="22" x2="26" y2="26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="22" x2="32" y2="26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

      {/* Floating Kitchen Shelf on Right */}
      <rect x="48" y="22" width="38" height="3" rx="1" fill="#b45309" />
      {/* Spice Jar on Shelf */}
      <rect x="52" y="15" width="6" height="7" rx="1.5" fill="#fef08a" stroke="#f59e0b" strokeWidth="0.8" />
      <rect x="53" y="13.5" width="4" height="2" rx="0.8" fill="#b45309" />
      {/* Pink Ceramic Mug on Shelf */}
      <rect x="62" y="16" width="7" height="6" rx="1.5" fill="#ec4899" />
      <path d="M69 17 C71 17 71 21 69 21" stroke="#db2777" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Potted Plant on Shelf */}
      <polygon points="74,18 80,18 79,22 75,22" fill="#ea580c" />
      <circle cx="77" cy="15.5" r="3" fill="#22c55e" />
      <circle cx="79" cy="14" r="2" fill="#16a34a" />

      {/* Warm Wooden Countertop */}
      <rect x="10" y="49" width="80" height="6" rx="1.5" fill="#d97706" />
      <rect x="10" y="49" width="80" height="3" fill="#f59e0b" />

      {/* Sink Basin on Left */}
      <rect x="16" y="50" width="22" height="3.5" rx="1" fill="#94a3b8" />
      {/* Modern Curved Gooseneck Faucet */}
      <path d="M26 49 L26 39 C26 35 32 35 32 40 L32 42" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="24" y1="44" x2="28" y2="44" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

      {/* Stove Cooktop on Right */}
      <rect x="47" y="48" width="24" height="3" rx="0.5" fill="#334155" />
      <ellipse cx="58" cy="49" rx="5.5" ry="1.5" fill="#64748b" />

      {/* Red Whistling Teapot / Kettle */}
      <path d="M53 49 C52 42 64 42 63 49 Z" fill="#ef4444" />
      <circle cx="58" cy="41" r="1.5" fill="#f59e0b" />
      {/* Kettle Spout */}
      <path d="M54 46 L49 42" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      {/* Kettle Handle */}
      <path d="M55 40 C55 36 61 36 61 40" stroke="#1e293b" strokeWidth="1.5" fill="none" />
      {/* Steam Puff from Kettle Spout */}
      <path d="M48 40 C47 38 50 37 49 35" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Lower Kitchen Base Cabinets */}
      <rect x="12" y="55" width="76" height="32" rx="2" fill="#0284c7" />

      {/* Left Cabinet Door */}
      <rect x="15" y="58" width="26" height="26" rx="2" fill="#0369a1" />
      <rect x="18" y="61" width="20" height="20" rx="1.5" fill="#0284c7" />
      {/* Door Handle */}
      <line x1="36" y1="67" x2="36" y2="73" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

      {/* Right Unit - Built-in Modern Oven */}
      {/* Oven Control Panel */}
      <rect x="44" y="58" width="41" height="6" rx="1" fill="#1e293b" />
      <circle cx="50" cy="61" r="1.5" fill="#94a3b8" />
      <circle cx="56" cy="61" r="1.5" fill="#94a3b8" />
      <circle cx="79" cy="61" r="1.5" fill="#94a3b8" />
      {/* Oven Window Door */}
      <rect x="44" y="65" width="41" height="19" rx="1.5" fill="#334155" />
      <rect x="48" y="68" width="33" height="13" rx="1" fill="#0f172a" />
      {/* Glowing Warm Light inside oven */}
      <line x1="51" y1="75" x2="78" y2="75" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
      {/* Oven Handle Bar */}
      <line x1="52" y1="66.5" x2="77" y2="66.5" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

      {/* Base Toe-Kick Plinth */}
      <rect x="12" y="87" width="76" height="3" fill="#0c4a6e" />
    </svg>
  ),

  // 22. столовая (dining room - dining table with chairs and pendant light)
  'dining room': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Pendant Lamp Hanging from Ceiling */}
      <line x1="50" y1="12" x2="50" y2="28" stroke="#475569" strokeWidth="2" />
      <polygon points="40,34 60,34 54,28 46,28" fill="#f59e0b" />
      {/* Warm Lamp Light Cone */}
      <polygon points="40,34 60,34 76,64 24,64" fill="#fef08a" opacity="0.3" />
      {/* Left Chair */}
      <rect x="22" y="44" width="5" height="24" rx="2" fill="#b45309" />
      <rect x="18" y="44" width="12" height="12" rx="3" fill="#d97706" />
      <rect x="18" y="58" width="14" height="4" fill="#b45309" />
      <rect x="20" y="62" width="3" height="18" fill="#78350f" />
      {/* Right Chair */}
      <rect x="73" y="44" width="5" height="24" rx="2" fill="#b45309" />
      <rect x="70" y="44" width="12" height="12" rx="3" fill="#d97706" />
      <rect x="68" y="58" width="14" height="4" fill="#b45309" />
      <rect x="77" y="62" width="3" height="18" fill="#78350f" />
      {/* Dining Table with Tablecloth */}
      <ellipse cx="50" cy="58" rx="28" ry="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <path d="M22 58 C22 68 78 68 78 58 L78 64 C78 72 22 72 22 64 Z" fill="#e2e8f0" />
      {/* Table Legs */}
      <rect x="32" y="68" width="4" height="16" fill="#78350f" />
      <rect x="64" y="68" width="4" height="16" fill="#78350f" />
      {/* Fruit Bowl on Table Center */}
      <ellipse cx="50" cy="57" rx="8" ry="3.5" fill="#f59e0b" />
      <circle cx="48" cy="55" r="2.5" fill="#ef4444" />
      <circle cx="52" cy="54" r="2.5" fill="#22c55e" />
    </svg>
  ),

  // 23. сад (garden - blooming apple tree, tulips, lush grass & wooden fence)
  'garden': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Sky */}
      <rect x="16" y="16" width="68" height="68" rx="12" fill="#e0f2fe" />
      {/* Sun */}
      <circle cx="72" cy="28" r="8" fill="#facc15" />
      {/* Green Garden Hill Lawn */}
      <path d="M16 64 C36 56 64 56 84 64 L84 84 L16 84 Z" fill="#22c55e" />
      {/* Tree Trunk */}
      <path d="M38 52 L36 74 L44 74 L42 52 Z" fill="#78350f" />
      {/* Lush Tree Foliage */}
      <circle cx="34" cy="40" r="12" fill="#15803d" />
      <circle cx="46" cy="38" r="13" fill="#16a34a" />
      <circle cx="40" cy="30" r="12" fill="#22c55e" />
      {/* Red Apples on Tree */}
      <circle cx="34" cy="36" r="2.5" fill="#ef4444" />
      <circle cx="44" cy="33" r="2.5" fill="#ef4444" />
      <circle cx="46" cy="42" r="2.5" fill="#ef4444" />
      {/* Wooden Fence in Garden */}
      <g fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1">
        <rect x="52" y="62" width="5" height="16" rx="1" />
        <polygon points="52,62 54.5,58 57,62" />
        <rect x="62" y="62" width="5" height="16" rx="1" />
        <polygon points="62,62 64.5,58 67,62" />
        <rect x="72" y="62" width="5" height="16" rx="1" />
        <polygon points="72,62 74.5,58 77,62" />
        <rect x="50" y="67" width="28" height="3" />
      </g>
      {/* Flowers in Grass */}
      <circle cx="26" cy="74" r="3" fill="#ec4899" />
      <circle cx="26" cy="74" r="1.5" fill="#facc15" />
      <circle cx="34" cy="76" r="3" fill="#f43f5e" />
      <circle cx="34" cy="76" r="1.5" fill="#facc15" />
    </svg>
  ),

  // 24. корень (root - plant with ground cutaway showing extensive underground roots)
  'root': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Sky Above Ground */}
      <rect x="16" y="16" width="68" height="30" fill="#e0f2fe" />
      {/* Green Plant Stem & Leaves Above Ground */}
      <path d="M50 46 L50 24" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 34 C40 30 38 22 46 22 C48 26 50 30 50 34 Z" fill="#22c55e" />
      <path d="M50 28 C60 24 62 16 54 16 C52 20 50 24 50 28 Z" fill="#22c55e" />
      {/* Ground Surface Line with Grass Sprigs */}
      <rect x="16" y="44" width="68" height="4" fill="#15803d" />
      {/* Underground Earth / Soil Cutaway */}
      <rect x="16" y="48" width="68" height="40" fill="#451a03" />
      {/* Soil Texture / Pebbles */}
      <circle cx="26" cy="60" r="2" fill="#78350f" />
      <circle cx="74" cy="56" r="2.5" fill="#78350f" />
      <circle cx="70" cy="76" r="2" fill="#78350f" />
      <circle cx="30" cy="78" r="1.5" fill="#78350f" />
      {/* Big Main Taproot */}
      <path d="M50 46 C50 56 48 68 50 82" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Branching Fibrous Lateral Roots */}
      <path d="M49 52 C38 56 30 64 26 72" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M36 58 C30 64 28 72 32 76" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M50 54 C62 58 68 64 74 74" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M62 60 C68 66 72 72 68 78" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M49 66 C42 72 38 78 40 84" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M50 68 C58 74 62 78 60 84" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 25. сливы (plums - two plump deep-purple plums with twig and green leaf)
  'plums': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Shadow */}
      <ellipse cx="50" cy="82" rx="32" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* Left Plum */}
      <ellipse cx="40" cy="56" rx="18" ry="22" fill="#581c87" />
      <ellipse cx="40" cy="56" rx="16" ry="20" fill="#7e22ce" />
      {/* Plum cleft groove */}
      <path d="M40 36 C36 46 36 64 40 76" stroke="#3b0764" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Glossy shine */}
      <path d="M30 46 C28 52 28 60 32 66" stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Right Plum (overlapping slightly) */}
      <ellipse cx="60" cy="60" rx="17" ry="20" fill="#581c87" />
      <ellipse cx="60" cy="60" rx="15" ry="18" fill="#9333ea" />
      {/* Plum cleft groove */}
      <path d="M60 42 C57 50 57 66 60 76" stroke="#3b0764" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Glossy shine */}
      <path d="M68 50 C70 56 70 64 68 70" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Brown Twig Stem Joining Plums */}
      <path d="M40 38 C44 32 48 28 50 20" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M60 44 C56 36 52 28 50 20" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Big Green Plum Leaf */}
      <path d="M50 22 C64 16 78 22 80 34 C68 38 56 32 50 22 Z" fill="#15803d" />
      <path d="M50 22 C64 18 74 24 78 32" stroke="#86efac" strokeWidth="1.5" fill="none" />
    </svg>
  ),

  // 26. треугольник (triangle - LARGE, bold, vibrant geometric figure filling the card)
  'triangle': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Large Triangle with rounded corners and rich gradient-style layers */}
      <polygon
        points="50,10 92,86 8,86"
        fill="#0284c7"
        stroke="#0369a1"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <polygon
        points="50,14 88,82 12,82"
        fill="#38bdf8"
        stroke="#0284c7"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Inner highlight for vibrant 3D look */}
      <polygon
        points="50,22 82,78 18,78"
        fill="#0ea5e9"
        opacity="0.4"
      />
      <polygon
        points="50,20 40,76 22,76"
        fill="#ffffff"
        opacity="0.3"
      />
    </svg>
  ),

  // 27. круг (circle - LARGE, bold, vibrant red 3D geometric sphere/circle filling the card)
  'circle': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Outer border / shadow base */}
      <circle cx="50" cy="50" r="42" fill="#dc2626" stroke="#b91c1c" strokeWidth="4" />
      {/* Vibrant main circle */}
      <circle cx="50" cy="50" r="38" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
      {/* Inner 3D gradient/glow depth */}
      <circle cx="50" cy="50" r="32" fill="#f87171" opacity="0.4" />
      {/* Glossy top-left highlight */}
      <ellipse cx="40" cy="32" rx="14" ry="7" fill="#ffffff" opacity="0.45" transform="rotate(-30 40 32)" />
      <circle cx="34" cy="27" r="3" fill="#ffffff" opacity="0.6" />
    </svg>
  ),

  // 28. квадрат (square - LARGE, bold, vibrant emerald green 3D geometric cube/square filling the card)
  'square': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Outer border / shadow base */}
      <rect x="10" y="10" width="80" height="80" rx="14" fill="#059669" stroke="#047857" strokeWidth="4" />
      {/* Vibrant main square */}
      <rect x="14" y="14" width="72" height="72" rx="12" fill="#10b981" stroke="#059669" strokeWidth="2" />
      {/* Inner 3D depth layer */}
      <rect x="20" y="20" width="60" height="60" rx="10" fill="#34d399" opacity="0.35" />
      {/* Top bevel highlight */}
      <path d="M18 18 L 82 18 L 74 26 L 26 26 Z" fill="#ffffff" opacity="0.35" />
      <circle cx="28" cy="28" r="3.5" fill="#ffffff" opacity="0.5" />
    </svg>
  ),

  // 29. прямоугольник (rectangle - LARGE, bold, vibrant amber-orange 3D geometric rectangle filling the card)
  'rectangle': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Outer border / shadow base */}
      <rect x="6" y="22" width="88" height="56" rx="12" fill="#d97706" stroke="#b45309" strokeWidth="4" />
      {/* Vibrant main rectangle */}
      <rect x="10" y="26" width="80" height="48" rx="10" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
      {/* Inner 3D depth layer */}
      <rect x="16" y="32" width="68" height="36" rx="8" fill="#fbbf24" opacity="0.4" />
      {/* Top bevel highlight */}
      <path d="M14 30 L 86 30 L 78 36 L 22 36 Z" fill="#ffffff" opacity="0.4" />
      <circle cx="24" cy="38" r="3" fill="#ffffff" opacity="0.5" />
    </svg>
  ),

  // 30. овал (oval - LARGE, bold, vibrant purple/violet 3D geometric oval filling the card)
  'oval': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Outer border / shadow base */}
      <ellipse cx="50" cy="50" rx="44" ry="30" fill="#7c3aed" stroke="#6d28d9" strokeWidth="4" />
      {/* Vibrant main ellipse */}
      <ellipse cx="50" cy="50" rx="40" ry="26" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2" />
      {/* Inner 3D depth layer */}
      <ellipse cx="50" cy="50" rx="34" ry="20" fill="#a78bfa" opacity="0.35" />
      {/* Glossy top-left highlight */}
      <ellipse cx="42" cy="36" rx="18" ry="6" fill="#ffffff" opacity="0.4" transform="rotate(-15 42 36)" />
      <circle cx="34" cy="33" r="2.5" fill="#ffffff" opacity="0.6" />
    </svg>
  ),

  // spring - cheerful blooming flower, fresh green leaves, warm sun and cute ladybug
  'spring': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Soft warm sun in top left */}
      <circle cx="20" cy="22" r="10" fill="#fde047" />
      <circle cx="20" cy="22" r="14" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
      {/* Little soft cloud */}
      <ellipse cx="80" cy="24" rx="12" ry="7" fill="#e0f2fe" />
      <circle cx="74" cy="21" r="7" fill="#e0f2fe" />
      <circle cx="85" cy="20" r="8" fill="#e0f2fe" />
      {/* Ground hill */}
      <path d="M0 90 Q 50 78 100 90 L 100 100 L 0 100 Z" fill="#86efac" />
      <path d="M0 94 Q 50 82 100 94 L 100 100 L 0 100 Z" fill="#4ade80" />
      {/* Flower stem */}
      <path d="M50 85 C 48 65 52 50 50 38" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
      {/* Leaves on stem */}
      <path d="M50 64 C 40 60 32 66 30 72 C 38 74 48 70 50 64 Z" fill="#16a34a" />
      <path d="M50 55 C 60 51 68 57 70 63 C 62 65 52 61 50 55 Z" fill="#22c55e" />
      {/* Blooming flower petals (pink & magenta) */}
      <circle cx="50" cy="26" r="8" fill="#f472b6" />
      <circle cx="50" cy="46" r="8" fill="#f472b6" />
      <circle cx="40" cy="36" r="8" fill="#ec4899" />
      <circle cx="60" cy="36" r="8" fill="#ec4899" />
      <circle cx="43" cy="29" r="8" fill="#fb7185" />
      <circle cx="57" cy="29" r="8" fill="#fb7185" />
      <circle cx="43" cy="43" r="8" fill="#fb7185" />
      <circle cx="57" cy="43" r="8" fill="#fb7185" />
      {/* Flower center */}
      <circle cx="50" cy="36" r="7.5" fill="#facc15" stroke="#eab308" strokeWidth="1" />
      <circle cx="48" cy="34" r="2" fill="#ffffff" opacity="0.6" />
      {/* Cute little ladybug on leaf */}
      <ellipse cx="33" cy="69" rx="4" ry="3.2" fill="#ef4444" />
      <circle cx="30" cy="68" r="1.8" fill="#1e293b" />
      <circle cx="34" cy="67.5" r="0.8" fill="#0f172a" />
      <circle cx="34" cy="70.5" r="0.8" fill="#0f172a" />
    </svg>
  ),

  // summer - radiant shining sun, blue sea waves, beach ball and sunglasses
  'summer': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Warm sky glow */}
      <circle cx="50" cy="40" r="32" fill="#fef9c3" opacity="0.5" />
      {/* Sun rays */}
      <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="6" x2="50" y2="12" />
        <line x1="50" y1="68" x2="50" y2="74" />
        <line x1="16" y1="40" x2="22" y2="40" />
        <line x1="78" y1="40" x2="84" y2="40" />
        <line x1="26" y1="16" x2="30" y2="20" />
        <line x1="74" y1="64" x2="70" y2="60" />
        <line x1="74" y1="16" x2="70" y2="20" />
        <line x1="26" y1="64" x2="30" y2="60" />
      </g>
      {/* Big golden shining sun */}
      <circle cx="50" cy="40" r="22" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
      {/* Cool sunglasses on the sun */}
      <rect x="36" y="34" width="11" height="8" rx="2.5" fill="#1e293b" />
      <rect x="53" y="34" width="11" height="8" rx="2.5" fill="#1e293b" />
      <line x1="47" y1="36" x2="53" y2="36" stroke="#1e293b" strokeWidth="2" />
      {/* Lens reflection shine */}
      <line x1="38" y1="36" x2="41" y2="40" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      <line x1="55" y1="36" x2="58" y2="40" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      {/* Big friendly smile */}
      <path d="M43 47 Q 50 53 57 47" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="38" cy="45" rx="2" ry="1.2" fill="#fb923c" opacity="0.6" />
      <ellipse cx="62" cy="45" rx="2" ry="1.2" fill="#fb923c" opacity="0.6" />
      {/* Beach Sand and Tropical Sea Wave */}
      <path d="M0 86 Q 25 80 50 86 T 100 86 L 100 100 L 0 100 Z" fill="#38bdf8" />
      <path d="M0 90 Q 25 84 50 90 T 100 90 L 100 100 L 0 100 Z" fill="#0284c7" />
      {/* Mini beach ball on bottom right */}
      <circle cx="78" cy="80" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
      <path d="M78 70 A 10 10 0 0 1 88 80 L 78 80 Z" fill="#3b82f6" />
      <path d="M78 80 L 78 90 A 10 10 0 0 1 68 80 Z" fill="#facc15" />
      <circle cx="78" cy="80" r="2.5" fill="#ffffff" />
    </svg>
  ),

  // autumn - vibrant golden maple leaf, falling foliage, breeze swirl and acorn
  'autumn': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Wind breeze swirl */}
      <path d="M12 25 Q 40 18 65 24 T 88 32" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M8 40 Q 30 35 55 42" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />
      {/* Little falling leaf top right */}
      <path d="M76 18 C 76 18 84 16 88 22 C 84 25 78 24 76 18 Z" fill="#f97316" transform="rotate(25 82 20)" />
      {/* Main Autumn Maple Leaf */}
      {/* Leaf stem */}
      <path d="M48 56 C 45 70 38 82 32 86" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      {/* Leaf body */}
      <path
        d="M50 14
           C 54 22 62 25 64 24
           C 66 28 72 30 76 28
           C 74 34 80 40 84 42
           C 78 46 76 52 74 58
           C 68 56 62 58 56 64
           C 54 60 46 60 44 64
           C 38 58 32 56 26 58
           C 24 52 22 46 16 42
           C 20 40 26 34 24 28
           C 28 30 34 28 36 24
           C 38 25 46 22 50 14 Z"
        fill="#ea580c"
        stroke="#c2410c"
        strokeWidth="1.5"
      />
      {/* Leaf inner shading */}
      <path
        d="M50 20
           C 53 26 59 28 61 27
           C 62 31 67 32 70 30
           C 68 35 73 40 76 42
           C 71 45 69 49 67 53
           C 62 51 58 53 53 58
           C 52 55 48 55 47 58
           C 42 53 38 51 33 53
           C 31 49 29 45 24 42
           C 27 40 32 35 30 30
           C 33 32 38 31 39 27
           C 41 28 47 26 50 20 Z"
        fill="#f97316"
      />
      {/* Central leaf veins */}
      <line x1="50" y1="20" x2="48" y2="58" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="49" y1="36" x2="68" y2="28" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="49" y1="36" x2="30" y2="28" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="48.5" y1="46" x2="68" y2="44" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="48.5" y1="46" x2="28" y2="44" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" />
      {/* Cute acorn bottom right */}
      <g transform="translate(62, 62)">
        <ellipse cx="14" cy="20" rx="9" ry="11" fill="#b45309" />
        {/* Acorn cap */}
        <path d="M3 16 C 3 9 25 9 25 16 Z" fill="#78350f" />
        <rect x="12" y="5" width="3" height="5" rx="1" fill="#78350f" />
        {/* Cap texture dots */}
        <circle cx="9" cy="13" r="1" fill="#92400e" />
        <circle cx="14" cy="12" r="1" fill="#92400e" />
        <circle cx="19" cy="13" r="1" fill="#92400e" />
        {/* Acorn highlight */}
        <ellipse cx="11" cy="22" rx="2" ry="4" fill="#d97706" opacity="0.6" />
      </g>
    </svg>
  ),

  // winter - cute smiling snowman with red scarf, winter beanie, carrot nose and snowflakes
  'winter': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Background snowy hill */}
      <path d="M0 88 Q 50 78 100 88 L 100 100 L 0 100 Z" fill="#e0f2fe" />
      <path d="M0 92 Q 50 84 100 92 L 100 100 L 0 100 Z" fill="#bae6fd" />
      {/* Snowflakes in air */}
      <g stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round">
        {/* Left snowflake */}
        <line x1="16" y1="25" x2="24" y2="25" />
        <line x1="20" y1="21" x2="20" y2="29" />
        <line x1="17" y1="22" x2="23" y2="28" />
        <line x1="17" y1="28" x2="23" y2="22" />
        {/* Right snowflake */}
        <line x1="76" y1="20" x2="84" y2="20" />
        <line x1="80" y1="16" x2="80" y2="24" />
        <line x1="77" y1="17" x2="83" y2="23" />
        <line x1="77" y1="23" x2="83" y2="17" />
        {/* Tiny snow dots */}
        <circle cx="28" cy="45" r="1.5" fill="#93c5fd" stroke="none" />
        <circle cx="72" cy="48" r="1.5" fill="#93c5fd" stroke="none" />
        <circle cx="86" cy="40" r="1.2" fill="#93c5fd" stroke="none" />
      </g>
      {/* Snowman bottom ball */}
      <circle cx="50" cy="74" r="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <ellipse cx="50" cy="78" rx="14" ry="7" fill="#e2e8f0" opacity="0.5" />
      {/* Coal buttons */}
      <circle cx="50" cy="68" r="2" fill="#1e293b" />
      <circle cx="50" cy="76" r="2" fill="#1e293b" />
      {/* Stick arms */}
      <path d="M31 62 L 18 54 M 22 56 L 20 50" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      <path d="M69 62 L 82 54 M 78 56 L 80 50" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      {/* Snowman head */}
      <circle cx="50" cy="42" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Coal Eyes */}
      <circle cx="45" cy="40" r="1.8" fill="#1e293b" />
      <circle cx="55" cy="40" r="1.8" fill="#1e293b" />
      {/* Carrot Nose */}
      <polygon points="49,43 49,46 36,45" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
      {/* Coal smile dots */}
      <circle cx="44" cy="48" r="1" fill="#334155" />
      <circle cx="47" cy="50" r="1" fill="#334155" />
      <circle cx="50" cy="50.5" r="1" fill="#334155" />
      <circle cx="53" cy="50" r="1" fill="#334155" />
      <circle cx="56" cy="48" r="1" fill="#334155" />
      {/* Cozy Winter Beanie Hat */}
      <path d="M38 34 C 38 20 62 20 62 34 Z" fill="#2563eb" />
      <rect x="36" y="32" width="28" height="5" rx="2" fill="#1d4ed8" />
      {/* Hat pompom */}
      <circle cx="50" cy="18" r="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {/* Red Scarf */}
      <rect x="40" y="52" width="20" height="6" rx="2.5" fill="#ef4444" />
      <path d="M54 55 L 56 70 L 62 70 L 60 55 Z" fill="#dc2626" />
      {/* Scarf fringes */}
      <line x1="57" y1="70" x2="57" y2="73" stroke="#b91c1c" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="59" y1="70" x2="59" y2="73" stroke="#b91c1c" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="61" y1="70" x2="61" y2="73" stroke="#b91c1c" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),

  // tail (хвост / aste - cute gray dog with a bright, vibrant ginger-orange wagging tail)
  'tail': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <defs>
        {/* Soft amber-orange attention glow behind the ginger tail */}
        <radialGradient id="dogTailGlow" cx="74%" cy="38%" r="42%">
          <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fed7aa" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
        </radialGradient>
        {/* Vibrant ginger-orange tail gradient */}
        <linearGradient id="dogTailGrad" x1="0%" y1="100%" x2="40%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="80%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="42" cy="88" rx="34" ry="5" fill="#94a3b8" opacity="0.4" />

      {/* Warm glow spotlight focusing on the ginger tail */}
      <circle cx="74" cy="38" r="28" fill="url(#dogTailGlow)" />

      {/* Wagging Motion Lines near the tail tip */}
      <path d="M 88 22 C 95 30 95 42 88 50" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 93 26 C 99 33 99 39 93 45" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

      {/* Sparkles around the ginger tail */}
      <path d="M 80 12 L 82 6 L 84 12 L 90 14 L 84 16 L 82 22 L 80 16 L 74 14 Z" fill="#f59e0b" />
      <circle cx="82" cy="14" r="1.5" fill="#ffffff" />
      <circle cx="56" cy="14" r="2" fill="#fbbf24" />

      {/* --- CUTE GRAY DOG (Head & Body in soft, clean shades of gray) --- */}

      {/* Behind Back Foot */}
      <ellipse cx="44" cy="85" rx="5" ry="3" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
      {/* Behind Front Leg */}
      <rect x="33" y="66" width="6" height="19" rx="3" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />

      {/* Dog Torso & Sitting Hind Leg (Soft Gray) */}
      <path
        d="M 26 48 C 22 56 22 72 23 85 C 24 87 29 87 30 85 C 31 75 32 64 34 58 C 40 64 45 78 46 84 C 47 87 53 88 56 86 C 60 82 62 70 58 64 C 52 56 44 54 38 48 Z"
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Lighter Gray Chest Patch */}
      <path
        d="M 26 48 C 23 55 24 66 28 68 C 31 66 31 55 34 52 Z"
        fill="#f1f5f9"
      />

      {/* Dog Head (Soft Gray) */}
      <path
        d="M 24 46 C 18 46 16 41 20 37 C 24 33 32 30 40 32 C 46 34 46 44 42 48 C 38 52 30 52 26 48 Z"
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Light Muzzle */}
      <path
        d="M 18 40 C 18 36 24 34 28 35 C 30 39 30 44 26 46 C 22 47 18 44 18 40 Z"
        fill="#f1f5f9"
      />

      {/* Floppy Dog Ear (Darker Gray) */}
      <path
        d="M 36 33 C 44 33 46 46 40 50 C 35 52 34 42 34 35 Z"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="1.5"
      />

      {/* Cute Face Details */}
      {/* Eye */}
      <circle cx="28" cy="37" r="2.5" fill="#1e293b" />
      <circle cx="29" cy="36" r="0.9" fill="#ffffff" />
      {/* Black Nose */}
      <ellipse cx="18" cy="39" rx="2.5" ry="2" fill="#1e293b" />
      {/* Happy Smile & Tongue */}
      <path d="M 20 42 Q 23 45 26 43" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 22 44 Q 24 48 26 44" fill="#f43f5e" />

      {/* --- THE VIBRANT GINGER TAIL (The Center of Attention!) --- */}
      {/* Main Fluffy Ginger Tail */}
      <path
        d="M 57 65 C 72 63 84 52 83 34 C 82 22 74 16 64 19 C 58 21 57 28 61 30 C 69 31 75 42 71 52 C 67 60 59 62 55 67 Z"
        fill="url(#dogTailGrad)"
        stroke="#c2410c"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Fluffy White Tail Tip */}
      <path
        d="M 70 17 C 66 17 61 19 58 22 C 57 26 58 29 61 30 C 65 30 68 28 71 26 C 70 23 72 22 69 20 C 72 19 72 17 70 17 Z"
        fill="#ffffff"
        stroke="#c2410c"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Subtle fur tufts along the ginger tail */}
      <path d="M 78 48 C 82 46 84 49 82 52" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
      <path d="M 81 36 C 85 34 86 37 84 40" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />

      {/* Glossy 3D Highlight along tail curve */}
      <path
        d="M 60 62 C 70 56 76 46 76 30 C 76 24 72 20 66 21"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),

  // beak (клюв / knābis - cute bird in profile with an enormous brightly highlighted golden-orange beak, focus ring, sparkles and indicator arrow)
  'beak': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <defs>
        {/* Soft radial glow behind the beak */}
        <radialGradient id="beakFocusGlow" cx="65%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#fde047" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
        </radialGradient>
        {/* Upper Beak Gradient */}
        <linearGradient id="beakUpperGrad" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        {/* Lower Beak Gradient */}
        <linearGradient id="beakLowerGrad" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Focus Glow Spotlight on Beak */}
      <circle cx="66" cy="50" r="28" fill="url(#beakFocusGlow)" />
      {/* Dashed focus highlight ring around the beak */}
      <ellipse
        cx="66"
        cy="50"
        rx="28"
        ry="24"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeDasharray="4 3"
        opacity="0.9"
      />

      {/* Sparkles and song lines around beak tip */}
      {/* Big sparkle */}
      <path d="M 88 28 L 90 22 L 92 28 L 98 30 L 92 32 L 90 38 L 88 32 L 82 30 Z" fill="#f59e0b" />
      <circle cx="90" cy="30" r="1.5" fill="#ffffff" />
      {/* Small sparkle */}
      <circle cx="92" cy="64" r="2" fill="#fbbf24" />
      {/* Sound / chirp waves from beak tip */}
      <path d="M 92 46 C 96 48 96 52 92 54" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 96 42 C 101 47 101 57 96 62" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

      {/* Bird Body & Head (Soft deep navy/slate blue so the bright beak stands out) */}
      {/* Bird Body */}
      <path
        d="M 12 84 C 10 65 24 55 36 55 C 38 68 32 82 24 86 C 18 88 14 86 12 84 Z"
        fill="#1e293b"
      />
      {/* Wing on body */}
      <path
        d="M 16 70 C 22 66 30 70 32 80 C 24 84 18 80 16 70 Z"
        fill="#0f172a"
      />

      {/* Bird Head */}
      <circle cx="34" cy="46" r="18" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />

      {/* Cheerful eye patch */}
      <circle cx="34" cy="44" r="8" fill="#38bdf8" opacity="0.25" />
      {/* Big Cartoon Eye */}
      <circle cx="34" cy="44" r="5.5" fill="#ffffff" />
      <circle cx="35.5" cy="44" r="3.5" fill="#0f172a" />
      <circle cx="37" cy="42.5" r="1.5" fill="#ffffff" />
      {/* Cute eyebrow */}
      <path d="M 31 36 Q 36 33 40 37" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Feather crest on head */}
      <path d="M 28 29 C 24 22 28 18 32 24 C 34 20 39 20 38 28 Z" fill="#0284c7" />

      {/* THE PROMINENT, GLORIOUS BEAK (Centerpiece!) */}
      {/* Upper Beak */}
      <path
        d="M 44 36 C 54 36 72 38 86 48 C 88 49 88 51 86 52 C 72 54 54 53 44 51 Z"
        fill="url(#beakUpperGrad)"
        stroke="#b45309"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Lower Beak */}
      <path
        d="M 44 51 C 56 53 72 54 86 52 C 78 60 62 62 44 58 Z"
        fill="url(#beakLowerGrad)"
        stroke="#b45309"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Mouth separator line */}
      <path d="M 44 51 L 86 52" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

      {/* Red accent at the tip of the beak (like a toucan/parrot) */}
      <path
        d="M 76 43 C 81 46 85 49 86 50 C 85 51 81 53 76 53 Z"
        fill="#ef4444"
        opacity="0.9"
      />

      {/* Nostril hole */}
      <ellipse cx="48" cy="42" rx="2" ry="1.2" fill="#78350f" transform="rotate(-10 48 42)" />

      {/* Glossy shine along the upper curve of the beak */}
      <path
        d="M 48 39 C 58 39 70 42 78 47"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Pointing arrow indicator directly at the beak */}
      <g transform="translate(66, 80) rotate(-90)">
        <line x1="0" y1="0" x2="16" y2="0" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="12,-5 20,0 12,5" fill="#ea580c" />
        <circle cx="-1" cy="0" r="3" fill="#f59e0b" />
      </g>
    </svg>
  ),

  // 1. between (между — фигурка человечка между двумя серыми блоками)
  'between': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="84" x2="94" y2="84" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Left Grey Block */}
      <g>
        <ellipse cx="20" cy="84" rx="12" ry="3.5" fill="#475569" opacity="0.2" />
        <polygon points="8,48 16,40 36,40 28,48" fill="#cbd5e1" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
        <polygon points="28,48 36,40 36,72 28,80" fill="#64748b" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="8" y="48" width="20" height="32" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.4" />
        <line x1="10" y1="50" x2="26" y2="50" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Right Grey Block */}
      <g>
        <ellipse cx="80" cy="84" rx="12" ry="3.5" fill="#475569" opacity="0.2" />
        <polygon points="68,48 76,40 96,40 88,48" fill="#cbd5e1" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
        <polygon points="88,48 96,40 96,72 88,80" fill="#64748b" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="68" y="48" width="20" height="32" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.4" />
        <line x1="70" y1="50" x2="86" y2="50" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Character Standing Between */}
      <g transform="translate(50, 46) scale(0.95)">
        <ellipse cx="0" cy="38" rx="9" ry="3" fill="#0f172a" opacity="0.16" />
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -14 0 -13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="-13" cy="-7" r="2.3" fill="#fed7aa" />
        <path d="M 7 6 Q 14 0 13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="-7" r="2.3" fill="#fed7aa" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
      <path d="M 33 80 L 37 80" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <path d="M 67 80 L 63 80" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // 2. next to (рядом с — фигурка рядом с серым блоком)
  'next to': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="84" x2="92" y2="84" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Grey Block on Left */}
      <g>
        <ellipse cx="34" cy="84" rx="18" ry="4.5" fill="#475569" opacity="0.2" />
        <polygon points="17,42 27,32 57,32 47,42" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="47,42 57,32 57,72 47,82" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="17" y="42" width="30" height="40" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <line x1="19" y1="44" x2="45" y2="44" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Colorful Person next to block */}
      <g transform="translate(73, 46) scale(0.95)">
        <ellipse cx="0" cy="38" rx="9" ry="3" fill="#0f172a" opacity="0.16" />
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -13 13 -10 20" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="-10" cy="20" r="2.3" fill="#fed7aa" />
        <path d="M 7 6 Q 14 0 13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="-7" r="2.3" fill="#fed7aa" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
      <path d="M 50 56 Q 58 50 64 56" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" fill="none" />
    </svg>
  ),

  // 3. in front of (перед — фигурка перед блоком)
  'in front of': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="10" y1="86" x2="90" y2="86" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Grey Block in BACKGROUND */}
      <g>
        <ellipse cx="53" cy="70" rx="24" ry="5" fill="#475569" opacity="0.2" />
        <polygon points="28,30 38,20 84,20 74,30" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="74,30 84,20 84,58 74,68" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="28" y="30" width="46" height="38" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <line x1="30" y1="32" x2="72" y2="32" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Colorful Person in FOREGROUND (overlapping block) */}
      <g transform="translate(50, 52) scale(0.95)">
        <ellipse cx="0" cy="38" rx="9" ry="3" fill="#0f172a" opacity="0.22" />
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -13 13 -10 20" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="-10" cy="20" r="2.3" fill="#fed7aa" />
        <path d="M 7 6 Q 14 0 13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="-7" r="2.3" fill="#fed7aa" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
      <path d="M 50 89 L 50 94 M 47 91 L 50 94 L 53 91" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // 4. behind (позади, за — фигурка за низким блоком)
  'behind': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="10" y1="84" x2="90" y2="84" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Character in BACKGROUND */}
      <g transform="translate(50, 44) scale(0.95)">
        <ellipse cx="0" cy="38" rx="9" ry="3" fill="#0f172a" opacity="0.16" />
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -13 13 -8 18" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 7 6 Q 13 13 8 18" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
      {/* Shorter Grey Block in FOREGROUND (lower height, covers legs/waist) */}
      <g>
        <ellipse cx="53" cy="84" rx="25" ry="4.5" fill="#475569" opacity="0.25" />
        <polygon points="26,56 36,46 84,46 74,56" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="74,56 84,46 84,72 74,82" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="26" y="56" width="48" height="26" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <line x1="28" y1="58" x2="72" y2="58" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Hands peeking over the top edge of the block */}
      <circle cx="37" cy="56" r="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
      <circle cx="63" cy="56" r="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
    </svg>
  ),

  // 5. opposite (напротив — две фигурки напротив друг друга)
  'opposite': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="84" x2="94" y2="84" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="50" y1="32" x2="50" y2="86" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
      <path d="M 42 50 L 58 50 M 54 46 L 58 50 L 54 54" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 58 58 L 42 58 M 46 54 L 42 58 L 46 62" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left Character facing right */}
      <g transform="translate(24, 46) scale(0.9)">
        <ellipse cx="0" cy="38" rx="9" ry="3" fill="#0f172a" opacity="0.16" />
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -13 13 -10 20" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="-10" cy="20" r="2.3" fill="#fed7aa" />
        <path d="M 7 6 Q 14 0 13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="-7" r="2.3" fill="#fed7aa" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
      {/* Right Character facing left */}
      <g transform="translate(76, 46) scale(-0.9, 0.9)">
        <ellipse cx="0" cy="38" rx="9" ry="3" fill="#0f172a" opacity="0.16" />
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#4f46e5" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#4f46e5" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#10b981" stroke="#059669" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -13 13 -10 20" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="-10" cy="20" r="2.3" fill="#fed7aa" />
        <path d="M 7 6 Q 14 0 13 -7" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="-7" r="2.3" fill="#fed7aa" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  ),

  // 6. above (над — фигурка парит над блоком)
  'above': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="12" y1="92" x2="88" y2="92" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Grey Block on Ground */}
      <g>
        <ellipse cx="53" cy="92" rx="25" ry="4.5" fill="#475569" opacity="0.2" />
        <polygon points="26,66 36,56 84,56 74,66" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="74,66 84,56 84,80 74,90" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="26" y="66" width="48" height="24" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <line x1="28" y1="68" x2="72" y2="68" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      <ellipse cx="50" cy="62" rx="13" ry="3.5" fill="#475569" opacity="0.25" />
      <path d="M 40 54 Q 50 51 60 54" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" fill="none" />
      <path d="M 50 51 L 50 45 M 47 48 L 50 45 L 53 48" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Floating Person ABOVE */}
      <g transform="translate(50, 16) scale(0.88)">
        <rect x="-6" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <rect x="1.5" y="17" width="4.5" height="18" rx="2" fill="#2563eb" />
        <ellipse cx="-3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <ellipse cx="3.8" cy="35" rx="4" ry="2.6" fill="#0f172a" />
        <path d="M -8 4 L 8 4 L 6.5 19 L -6.5 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
        <path d="M -3.5 4 Q 0 7.5 3.5 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M -7 6 Q -14 0 -13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="-13" cy="-7" r="2.3" fill="#fed7aa" />
        <path d="M 7 6 Q 14 0 13 -7" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="-7" r="2.3" fill="#fed7aa" />
        <rect x="-2.2" y="1" width="4.4" height="4" fill="#fed7aa" />
        <circle cx="0" cy="-7" r="9" fill="#fed7aa" stroke="#fba063" strokeWidth="0.6" />
        <path d="M -9.2 -8 C -8.5 -17 8.5 -17 9.2 -8 C 9.2 -4 6 -4 4 -6 C 2 -4 -2 -4 -4 -6 C -6 -4 -9.2 -4 -9.2 -8 Z" fill="#78350f" />
        <circle cx="-3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="3" cy="-7" r="1.1" fill="#0f172a" />
        <circle cx="-5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <circle cx="5.5" cy="-5" r="1.4" fill="#f87171" opacity="0.55" />
        <path d="M -2.5 -3.5 Q 0 -1.2 2.5 -3.5" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
      <text x="20" y="24" fontSize="9" fill="#f59e0b">✨</text>
      <text x="72" y="20" fontSize="9" fill="#f59e0b">✨</text>
    </svg>
  ),

  // classroom - 2 school desks with chairs, chalkboard in background, notebooks
  'classroom': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Chalkboard in background */}
      <rect x="14" y="10" width="72" height="24" rx="3" fill="#14532d" stroke="#b45309" strokeWidth="2.5" />
      <text x="50" y="24" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Comic Sans MS, sans-serif" fontWeight="bold">ABC  123</text>
      <rect x="40" y="31" width="20" height="2.5" rx="1" fill="#f8fafc" />

      {/* Desk 1 (Left desk & chair) */}
      <rect x="10" y="42" width="12" height="12" rx="3" fill="#b45309" />
      <line x1="16" y1="54" x2="16" y2="82" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <rect x="8" y="54" width="16" height="5" rx="2" fill="#d97706" />

      <path d="M22 86 L26 56 L44 56 L48 86" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="24" y1="70" x2="46" y2="70" stroke="#64748b" strokeWidth="2.5" />
      <polygon points="18,56 46,51 50,57 20,62" fill="#d97706" />
      <polygon points="18,54 46,49 50,53 20,58" fill="#f59e0b" />
      {/* Notebook & pencil left */}
      <polygon points="26,53 36,51 38,55 28,57" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
      <line x1="39" y1="50" x2="44" y2="49" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

      {/* Desk 2 (Right desk & chair) */}
      <rect x="58" y="42" width="12" height="12" rx="3" fill="#b45309" />
      <line x1="64" y1="54" x2="64" y2="82" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <rect x="56" y="54" width="16" height="5" rx="2" fill="#d97706" />

      <path d="M70 86 L74 56 L92 56 L96 86" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="72" y1="70" x2="94" y2="70" stroke="#64748b" strokeWidth="2.5" />
      <polygon points="66,56 94,51 98,57 68,62" fill="#d97706" />
      <polygon points="66,54 94,49 98,53 68,58" fill="#f59e0b" />
      {/* Notebook & pencil right */}
      <polygon points="74,53 84,51 86,55 76,57" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
      <line x1="87" y1="50" x2="92" y2="49" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // class - одноклассники (2 smiling kid figures sitting at a school desk with books)
  'class': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Student 1 (Boy on left) */}
      <path d="M19 56 C19 44 41 44 41 56 Z" fill="#3b82f6" />
      <path d="M28 46 L30 51 L32 46 Z" fill="#ffffff" />
      <rect x="27" y="38" width="6" height="6" fill="#fed7aa" rx="1" />
      <circle cx="30" cy="27" r="11" fill="#fed7aa" />
      <path d="M19 25 C19 16 41 16 41 25 C38 22 34 24 30 21 C26 24 22 22 19 25 Z" fill="#78350f" />
      <circle cx="26" cy="27" r="1.5" fill="#1e293b" />
      <circle cx="34" cy="27" r="1.5" fill="#1e293b" />
      <path d="M27 31 Q30 35 33 31" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="24" cy="29" rx="1.8" ry="1.2" fill="#fca5a5" opacity="0.7" />
      <ellipse cx="36" cy="29" rx="1.8" ry="1.2" fill="#fca5a5" opacity="0.7" />

      {/* Student 2 (Girl on right) */}
      <path d="M59 56 C59 44 81 44 81 56 Z" fill="#ec4899" />
      <path d="M68 46 L70 51 L72 46 Z" fill="#ffffff" />
      <rect x="67" y="38" width="6" height="6" fill="#fed7aa" rx="1" />
      <circle cx="70" cy="27" r="11" fill="#fed7aa" />
      <path d="M59 27 C59 16 81 16 81 27 C77 23 74 24 70 21 C66 24 63 23 59 27 Z" fill="#d97706" />
      {/* Pigtails */}
      <circle cx="57" cy="31" r="3.5" fill="#d97706" />
      <circle cx="83" cy="31" r="3.5" fill="#d97706" />
      <circle cx="58" cy="29" r="1.5" fill="#ec4899" />
      <circle cx="82" cy="29" r="1.5" fill="#ec4899" />
      <circle cx="66" cy="27" r="1.5" fill="#1e293b" />
      <circle cx="74" cy="27" r="1.5" fill="#1e293b" />
      <path d="M67 31 Q70 35 73 31" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="29" rx="1.8" ry="1.2" fill="#fca5a5" opacity="0.7" />
      <ellipse cx="76" cy="29" rx="1.8" ry="1.2" fill="#fca5a5" opacity="0.7" />

      {/* School Desk in front */}
      <polygon points="10,56 90,56 87,68 13,68" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
      <polygon points="10,54 90,54 90,58 10,58" fill="#f59e0b" />
      <line x1="18" y1="68" x2="16" y2="92" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="68" x2="84" y2="92" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <line x1="18" y1="80" x2="82" y2="80" stroke="#64748b" strokeWidth="3" />

      {/* Hands on desk */}
      <ellipse cx="23" cy="58" rx="3.5" ry="2.5" fill="#fed7aa" />
      <ellipse cx="37" cy="58" rx="3.5" ry="2.5" fill="#fed7aa" />
      <ellipse cx="63" cy="58" rx="3.5" ry="2.5" fill="#fed7aa" />
      <ellipse cx="77" cy="58" rx="3.5" ry="2.5" fill="#fed7aa" />

      {/* Open notebooks on desk */}
      <rect x="22" y="60" width="16" height="6" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
      <line x1="24" y1="62" x2="34" y2="62" stroke="#3b82f6" strokeWidth="0.8" />
      <rect x="62" y="60" width="16" height="6" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
      <line x1="64" y1="62" x2="74" y2="62" stroke="#ec4899" strokeWidth="0.8" />
      <line x1="44" y1="63" x2="56" y2="63" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // ruby - red sparkling faceted gemstone
  'ruby': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Ground soft shadow */}
      <ellipse cx="50" cy="88" rx="28" ry="5" fill="#991b1b" opacity="0.25" />

      {/* Pavilion (Bottom Cone) */}
      <polygon points="14,38 34,38 50,86" fill="#881337" />
      <polygon points="34,38 50,38 50,86" fill="#be123c" />
      <polygon points="50,38 66,38 50,86" fill="#e11d48" />
      <polygon points="66,38 86,38 50,86" fill="#9f1239" />

      {/* Crown (Top Facets) */}
      <polygon points="14,38 28,18 34,38" fill="#9f1239" />
      <polygon points="28,18 42,18 34,38" fill="#e11d48" />
      <polygon points="34,38 42,18 58,18 66,38 50,38" fill="#f43f5e" />
      <polygon points="58,18 72,18 66,38" fill="#fb7185" />
      <polygon points="72,18 86,38 66,38" fill="#e11d48" />

      {/* Top Flat Table */}
      <polygon points="30,18 70,18 64,30 36,30" fill="#fda4af" opacity="0.8" />
      <polygon points="36,20 64,20 60,28 40,28" fill="#fff1f2" opacity="0.6" />

      {/* Gem Facet Outlines / Shimmers */}
      <line x1="14" y1="38" x2="86" y2="38" stroke="#ffe4e6" strokeWidth="1" opacity="0.7" />
      <line x1="50" y1="38" x2="50" y2="86" stroke="#ffe4e6" strokeWidth="1" opacity="0.6" />
      <line x1="34" y1="38" x2="50" y2="86" stroke="#ffe4e6" strokeWidth="0.8" opacity="0.4" />
      <line x1="66" y1="38" x2="50" y2="86" stroke="#ffe4e6" strokeWidth="0.8" opacity="0.4" />

      {/* Sparkles / Star Glints */}
      <path d="M26 14 Q26 22 18 22 Q26 22 26 30 Q26 22 34 22 Q26 22 26 14 Z" fill="#ffffff" />
      <circle cx="26" cy="22" r="1.5" fill="#fff1f2" />
      <path d="M72 54 Q72 59 67 59 Q72 59 72 64 Q72 59 77 59 Q72 59 72 54 Z" fill="#ffffff" opacity="0.9" />
    </svg>
  ),

  // children - группа детей (several smiling kids standing together)
  'children': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground soft shadow */}
      <ellipse cx="50" cy="91" rx="42" ry="5" fill="#64748b" opacity="0.25" />

      {/* Child 1 (Boy on left - blue shirt, waving) */}
      <path d="M18 52 L11 36" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="10" cy="34" r="3" fill="#fed7aa" />
      <path d="M28 52 L36 58" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="20" y1="72" x2="19" y2="88" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" />
      <line x1="26" y1="72" x2="27" y2="88" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="18" cy="89" rx="3.5" ry="2" fill="#ef4444" />
      <ellipse cx="28" cy="89" rx="3.5" ry="2" fill="#ef4444" />
      <path d="M15 72 L16 50 C16 46 30 46 30 50 L31 72 Z" fill="#3b82f6" />
      <path d="M21 47 L23 52 L25 47 Z" fill="#ffffff" />
      <rect x="21" y="41" width="5" height="6" fill="#fed7aa" rx="1" />
      <circle cx="23.5" cy="33" r="9.5" fill="#fed7aa" />
      <path d="M14 31 C14 23 33 23 33 31 C30 28 27 30 23.5 27 C20 30 17 28 14 31 Z" fill="#78350f" />
      <circle cx="20.5" cy="33" r="1.3" fill="#1e293b" />
      <circle cx="26.5" cy="33" r="1.3" fill="#1e293b" />
      <path d="M21 37 Q23.5 40 26 37" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <ellipse cx="19" cy="35" rx="1.5" ry="1" fill="#fca5a5" opacity="0.6" />
      <ellipse cx="28" cy="35" rx="1.5" ry="1" fill="#fca5a5" opacity="0.6" />

      {/* Child 3 (Right child - green shirt, waving right) */}
      <path d="M82 52 L89 36" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="90" cy="34" r="3" fill="#fed7aa" />
      <path d="M72 52 L64 58" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="73" y1="72" x2="72" y2="88" stroke="#065f46" strokeWidth="4" strokeLinecap="round" />
      <line x1="79" y1="72" x2="80" y2="88" stroke="#065f46" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="71" cy="89" rx="3.5" ry="2" fill="#3b82f6" />
      <ellipse cx="81" cy="89" rx="3.5" ry="2" fill="#3b82f6" />
      <path d="M69 72 L70 50 C70 46 84 46 84 50 L85 72 Z" fill="#10b981" />
      <rect x="74" y="41" width="5" height="6" fill="#fed7aa" rx="1" />
      <circle cx="76.5" cy="33" r="9.5" fill="#fed7aa" />
      <path d="M67 33 C66 22 86 22 86 33 C84 27 80 25 76.5 27 C73 25 69 27 67 33 Z" fill="#b45309" />
      <circle cx="68" cy="27" r="3" fill="#b45309" />
      <circle cx="85" cy="27" r="3" fill="#b45309" />
      <circle cx="73.5" cy="33" r="1.3" fill="#1e293b" />
      <circle cx="79.5" cy="33" r="1.3" fill="#1e293b" />
      <path d="M74 37 Q76.5 40 79 37" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="35" rx="1.5" ry="1" fill="#fca5a5" opacity="0.6" />
      <ellipse cx="81" cy="35" rx="1.5" ry="1" fill="#fca5a5" opacity="0.6" />

      {/* Child 2 (Center Girl - foreground, cheerful yellow t-shirt with heart) */}
      <path d="M38 52 L30 58" stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="29" cy="59" r="2.8" fill="#fed7aa" />
      <path d="M62 52 L70 58" stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="71" cy="59" r="2.8" fill="#fed7aa" />
      <line x1="45" y1="74" x2="44" y2="89" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
      <line x1="55" y1="74" x2="56" y2="89" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="43" cy="90" rx="3.5" ry="2" fill="#8b5cf6" />
      <ellipse cx="57" cy="90" rx="3.5" ry="2" fill="#8b5cf6" />
      <path d="M38 72 L39 48 C39 43 61 43 61 48 L62 72 Z" fill="#fbbf24" />
      <path d="M50 56 C48 53 45 54 45 57 C45 60 50 63 50 63 C50 63 55 60 55 57 C55 54 52 53 50 56 Z" fill="#ef4444" />
      <rect x="47" y="38" width="6" height="6" fill="#fed7aa" rx="1" />
      <circle cx="50" cy="28" r="10.5" fill="#fed7aa" />
      <path d="M40 27 C40 16 60 16 60 27 C57 23 54 24 50 21 C46 24 43 23 40 27 Z" fill="#d97706" />
      <circle cx="38" cy="30" r="3.5" fill="#d97706" />
      <circle cx="62" cy="30" r="3.5" fill="#d97706" />
      <circle cx="39" cy="28" r="1.5" fill="#ec4899" />
      <circle cx="61" cy="28" r="1.5" fill="#ec4899" />
      <circle cx="46.5" cy="28" r="1.4" fill="#1e293b" />
      <circle cx="53.5" cy="28" r="1.4" fill="#1e293b" />
      <path d="M47 32 Q50 36 53 32" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="44" cy="30" rx="1.8" ry="1.2" fill="#fca5a5" opacity="0.7" />
      <ellipse cx="56" cy="30" rx="1.8" ry="1.2" fill="#fca5a5" opacity="0.7" />

      {/* Sparkles around */}
      <text x="18" y="20" fontSize="8" fill="#fbbf24">✨</text>
      <text x="76" y="20" fontSize="8" fill="#fbbf24">✨</text>
    </svg>
  ),

  // week - календарь недели (7 days of the week calendar strip)
  'week': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Calendar Base Card */}
      <rect x="10" y="16" width="80" height="70" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      {/* Calendar Header */}
      <path d="M10 24 C10 19.5 13.5 16 18 16 L82 16 C86.5 16 90 19.5 90 24 L90 34 L10 34 Z" fill="#ef4444" />
      <text x="50" y="28" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="Comic Sans MS, sans-serif" fontWeight="bold" letterSpacing="1">7 DAYS</text>

      {/* Spiral Binder Rings */}
      <rect x="24" y="12" width="5" height="9" rx="2.5" fill="#64748b" stroke="#ffffff" strokeWidth="1" />
      <rect x="42" y="12" width="5" height="9" rx="2.5" fill="#64748b" stroke="#ffffff" strokeWidth="1" />
      <rect x="58" y="12" width="5" height="9" rx="2.5" fill="#64748b" stroke="#ffffff" strokeWidth="1" />
      <rect x="72" y="12" width="5" height="9" rx="2.5" fill="#64748b" stroke="#ffffff" strokeWidth="1" />

      {/* 7 Columns for Days of the week */}
      <text x="19" y="44" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold">M</text>
      <text x="29" y="44" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold">T</text>
      <text x="39" y="44" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold">W</text>
      <text x="50" y="44" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold">T</text>
      <text x="61" y="44" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold">F</text>
      <text x="71" y="44" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontWeight="bold">S</text>
      <text x="81" y="44" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontWeight="bold">S</text>

      {/* Golden Highlight for the whole week row */}
      <rect x="13" y="49" width="74" height="15" rx="4" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
      <circle cx="19" cy="56.5" r="3.5" fill="#3b82f6" />
      <circle cx="29" cy="56.5" r="3.5" fill="#3b82f6" />
      <circle cx="39" cy="56.5" r="3.5" fill="#3b82f6" />
      <circle cx="50" cy="56.5" r="3.5" fill="#3b82f6" />
      <circle cx="61" cy="56.5" r="3.5" fill="#3b82f6" />
      <circle cx="71" cy="56.5" r="3.5" fill="#f59e0b" />
      <circle cx="81" cy="56.5" r="3.5" fill="#ef4444" />

      {/* Caption at bottom */}
      <rect x="30" y="69" width="40" height="12" rx="3" fill="#f1f5f9" />
      <text x="50" y="78" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" letterSpacing="1">WEEK</text>
    </svg>
  ),
  // water bottle (обычная бутылка воды с прозрачным голубым корпусом, крышкой-поилкой и уровнем воды)
  'water bottle': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="90" rx="20" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Bottle Base & Body */}
      <rect x="34" y="36" width="32" height="50" rx="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />
      {/* Water Fill Inside */}
      <path d="M35 52 C40 50, 45 54, 50 52 C55 50, 60 54, 65 52 L65 78 C65 82, 62 85, 58 85 L42 85 C38 85, 35 82, 35 78 Z" fill="#38bdf8" opacity="0.75" />
      {/* Highlights & Reflection */}
      <path d="M38 42 L38 80" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M42 44 L42 56" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Measurement ticks */}
      <line x1="60" y1="56" x2="63" y2="56" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="64" x2="63" y2="64" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="72" x2="63" y2="72" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cute Droplet Logo on bottle */}
      <path d="M50 62 C50 62, 45 68, 45 71 C45 73.8, 47.2 76, 50 76 C52.8 76, 55 73.8, 55 71 C55 68, 50 62, 50 62 Z" fill="#ffffff" opacity="0.9" />
      {/* Bottle Shoulder and Neck */}
      <path d="M36 38 C36 32, 42 28, 44 26 L56 26 C58 28, 64 32, 64 38 Z" fill="#bae6fd" stroke="#38bdf8" strokeWidth="2" />
      <rect x="44" y="22" width="12" height="6" rx="1.5" fill="#0284c7" />
      {/* Sports Cap with Flip Spout and Handle Loop */}
      <rect x="42" y="16" width="16" height="8" rx="3" fill="#0369a1" />
      <rect x="46" y="11" width="8" height="6" rx="2" fill="#0284c7" />
      {/* Handle loop */}
      <path d="M58 19 C66 19, 68 25, 68 28 C68 31, 65 33, 58 31" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cap highlight */}
      <line x1="44" y1="18" x2="56" y2="18" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // badge (яркий круглый металлический значок с золотой звездой, булавкой и бликами)
  'badge': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="#94a3b8" opacity="0.35" />
      {/* Pin back visible clasp */}
      <path d="M30 36 L24 28 C22 25, 27 22, 30 25 L38 34" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="25" cy="27" r="2.5" fill="#475569" />
      {/* Ribbon tails underneath badge */}
      <path d="M42 66 L34 86 L44 82 L48 68 Z" fill="#dc2626" />
      <path d="M58 66 L66 86 L56 82 L52 68 Z" fill="#b91c1c" />
      {/* Badge Outer Rim (Golden metallic border) */}
      <circle cx="50" cy="48" r="32" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
      {/* Badge Enamel Face (Bright Blue) */}
      <circle cx="50" cy="48" r="28" fill="#2563eb" />
      {/* Inner decorative dotted ring */}
      <circle cx="50" cy="48" r="25" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" />
      {/* Golden Star in Center */}
      <polygon points="50,28 55,39 67,40 58,48 61,60 50,53 39,60 42,48 33,40 45,39" fill="#fde047" stroke="#eab308" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="50,32 53,40 62,41 55,47 57,56 50,51 43,56 45,47 38,41 47,40" fill="#fef08a" />
      {/* Curved Glossy Highlight on Dome */}
      <path d="M26 44 C28 32, 40 24, 56 24 C64 24, 70 28, 72 32 C62 26, 42 28, 26 44 Z" fill="#ffffff" opacity="0.55" />
      <circle cx="34" cy="34" r="2" fill="#ffffff" opacity="0.8" />
    </svg>
  ),

  // puppet (кукла-марионетка на крестовине с нитями, деревянными суставами и одеждой)
  'puppet': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="94" rx="22" ry="3.5" fill="#94a3b8" opacity="0.3" />
      {/* Wooden Control Crossbar */}
      <line x1="28" y1="12" x2="72" y2="16" stroke="#854d0e" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="50" y1="6" x2="50" y2="22" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="14" r="3" fill="#ca8a04" />
      {/* Strings hanging to limbs and head */}
      <line x1="32" y1="13" x2="28" y2="52" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="68" y1="16" x2="72" y2="50" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="50" y1="14" x2="50" y2="28" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="38" y1="14" x2="36" y2="72" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 1" />
      <line x1="62" y1="15" x2="64" y2="72" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 1" />
      {/* Head */}
      <circle cx="50" cy="34" r="9" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
      {/* Hat */}
      <path d="M43 28 L50 19 L57 28 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      <circle cx="50" cy="19" r="2" fill="#fbbf24" />
      {/* Face: eyes, rosy cheeks, smile, wooden nose */}
      <circle cx="47" cy="33" r="1.2" fill="#1e293b" />
      <circle cx="53" cy="33" r="1.2" fill="#1e293b" />
      <circle cx="45" cy="37" r="1.5" fill="#f87171" opacity="0.6" />
      <circle cx="55" cy="37" r="1.5" fill="#f87171" opacity="0.6" />
      <line x1="50" y1="33" x2="50" y2="36" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M48 38 Q50 40 52 38" stroke="#b91c1c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Neck & Torso */}
      <line x1="50" y1="43" x2="50" y2="46" stroke="#d97706" strokeWidth="2.5" />
      <path d="M44 46 L56 46 L54 60 L46 60 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
      {/* Vest / Buttons */}
      <circle cx="50" cy="50" r="1.2" fill="#fbbf24" />
      <circle cx="50" cy="55" r="1.2" fill="#fbbf24" />
      <rect x="45" y="60" width="10" height="7" rx="1" fill="#dc2626" />
      {/* Left Arm & Wooden Hand */}
      <path d="M44 47 L34 52 L28 50" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="52" r="2" fill="#d97706" />
      <circle cx="27" cy="50" r="2.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
      {/* Right Arm & Wooden Hand */}
      <path d="M56 47 L66 49 L72 47" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="66" cy="49" r="2" fill="#d97706" />
      <circle cx="73" cy="47" r="2.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
      {/* Legs & Shoes with Joints */}
      <path d="M47 67 L44 76 L36 88" stroke="#fde68a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="76" r="2" fill="#d97706" />
      <ellipse cx="33" cy="89" rx="4.5" ry="2.5" fill="#78350f" />
      <path d="M53 67 L56 76 L64 88" stroke="#fde68a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="56" cy="76" r="2" fill="#d97706" />
      <ellipse cx="67" cy="89" rx="4.5" ry="2.5" fill="#78350f" />
    </svg>
  ),

  // colouring pens (яркая пачка/коробка с набором цветных карандашей разных цветов)
  'colouring pens': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="90" rx="30" ry="5" fill="#94a3b8" opacity="0.3" />
      {/* Standing Pencils in fan/row */}
      {/* 1. Red Pencil */}
      <rect x="23" y="24" width="7" height="38" fill="#ef4444" rx="1" />
      <polygon points="23,24 26.5,14 30,24" fill="#fde68a" />
      <polygon points="25.5,17 26.5,14 27.5,17" fill="#ef4444" />
      {/* 2. Orange Pencil */}
      <rect x="31" y="20" width="7" height="42" fill="#f97316" rx="1" />
      <polygon points="31,20 34.5,10 38,20" fill="#fde68a" />
      <polygon points="33.5,13 34.5,10 35.5,13" fill="#f97316" />
      {/* 3. Yellow Pencil */}
      <rect x="39" y="17" width="7" height="45" fill="#eab308" rx="1" />
      <polygon points="39,17 42.5,7 46,17" fill="#fde68a" />
      <polygon points="41.5,10 42.5,7 43.5,10" fill="#ca8a04" />
      {/* 4. Green Pencil */}
      <rect x="47" y="16" width="7" height="46" fill="#22c55e" rx="1" />
      <polygon points="47,16 50.5,6 54,16" fill="#fde68a" />
      <polygon points="49.5,9 50.5,6 51.5,9" fill="#15803d" />
      {/* 5. Cyan/Sky Pencil */}
      <rect x="55" y="18" width="7" height="44" fill="#06b6d4" rx="1" />
      <polygon points="55,18 58.5,8 62,18" fill="#fde68a" />
      <polygon points="57.5,11 58.5,8 59.5,11" fill="#0e7490" />
      {/* 6. Blue Pencil */}
      <rect x="63" y="21" width="7" height="41" fill="#3b82f6" rx="1" />
      <polygon points="63,21 66.5,11 70,21" fill="#fde68a" />
      <polygon points="65.5,14 66.5,11 67.5,14" fill="#1d4ed8" />
      {/* 7. Purple Pencil */}
      <rect x="71" y="25" width="7" height="37" fill="#a855f7" rx="1" />
      <polygon points="71,25 74.5,15 78,25" fill="#fde68a" />
      <polygon points="73.5,18 74.5,15 75.5,18" fill="#7e22ce" />

      {/* Pencil Box / Packaging */}
      <path d="M19 50 L19 86 C19 88, 21 90, 24 90 L76 90 C79 90, 81 88, 81 86 L81 50 C81 48, 79 46, 76 46 L62 46 C58 52, 42 52, 38 46 L24 46 C21 46, 19 48, 19 50 Z" fill="#4f46e5" stroke="#3730a3" strokeWidth="2" />
      {/* Window cut-out on box showing rainbow stripes */}
      <rect x="26" y="58" width="48" height="18" rx="4" fill="#312e81" />
      <path d="M29 60 L33 74" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M35 60 L39 74" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M41 60 L45 74" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M47 60 L51 74" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M53 60 L57 74" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M59 60 L63 74" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M65 60 L69 74" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      {/* Box brand badge / stars */}
      <text x="50" y="84" textAnchor="middle" fill="#fde047" fontSize="6" fontWeight="bold" letterSpacing="1">COLOR</text>
      {/* Box shine */}
      <path d="M22 52 L22 84" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // xylophone (детский металлофон/ксилофон с разноцветными металлическими пластинами и палочками с шариками)
  'xylophone': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="88" rx="36" ry="6" fill="#94a3b8" opacity="0.3" />
      {/* Wooden Trapezoid Frame */}
      <polygon points="12,72 88,72 82,34 18,34" fill="#d97706" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="16,68 84,68 79,38 21,38" fill="#f59e0b" />
      {/* Supporting Side Rails */}
      <rect x="18" y="32" width="64" height="6" rx="2" fill="#78350f" opacity="0.5" />
      <rect x="12" y="66" width="76" height="6" rx="2" fill="#78350f" opacity="0.5" />

      {/* Rainbow Metal Bars (from longest on left to shortest on right) */}
      {/* 1. Red Bar */}
      <rect x="16" y="24" width="8" height="56" rx="3" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      <circle cx="20" cy="30" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="20" cy="74" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* 2. Orange Bar */}
      <rect x="26" y="26" width="8" height="52" rx="3" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
      <circle cx="30" cy="31" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="30" cy="73" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* 3. Yellow Bar */}
      <rect x="36" y="28" width="8" height="48" rx="3" fill="#eab308" stroke="#a16207" strokeWidth="1" />
      <circle cx="40" cy="33" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="40" cy="71" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* 4. Green Bar */}
      <rect x="46" y="30" width="8" height="44" rx="3" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
      <circle cx="50" cy="35" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="50" cy="69" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* 5. Cyan Bar */}
      <rect x="56" y="32" width="8" height="40" rx="3" fill="#06b6d4" stroke="#0e7490" strokeWidth="1" />
      <circle cx="60" cy="37" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="60" cy="67" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* 6. Blue Bar */}
      <rect x="66" y="34" width="8" height="36" rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
      <circle cx="70" cy="39" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="70" cy="65" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* 7. Purple Bar */}
      <rect x="76" y="36" width="8" height="32" rx="3" fill="#a855f7" stroke="#7e22ce" strokeWidth="1" />
      <circle cx="80" cy="41" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="80" cy="63" r="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />

      {/* Two Crossed Mallets with Round Ball Tips */}
      {/* Mallet 1 (Left to Right) */}
      <line x1="22" y1="84" x2="62" y2="18" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="63" cy="17" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <circle cx="61.5" cy="15.5" r="1.5" fill="#fca5a5" />
      {/* Mallet 2 (Right to Left) */}
      <line x1="78" y1="84" x2="38" y2="18" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="37" cy="17" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <circle cx="35.5" cy="15.5" r="1.5" fill="#fca5a5" />
      {/* Sparkles / Musical Notes */}
      <path d="M84 18 Q88 12 92 16" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      <circle cx="84" cy="19" r="2" fill="#eab308" />
    </svg>
  ),

  // marbles (стеклянные шарики марблс со спиральным разноцветным рисунком внутри и глянцевым стеклянным блеском)
  'marbles': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Shadows */}
      <ellipse cx="44" cy="84" rx="20" ry="5" fill="#64748b" opacity="0.3" />
      <ellipse cx="72" cy="78" rx="14" ry="4" fill="#64748b" opacity="0.25" />
      <ellipse cx="26" cy="74" rx="12" ry="3.5" fill="#64748b" opacity="0.25" />

      {/* Marble 2 (Back Right - Green/Orange) */}
      <g>
        <circle cx="70" cy="62" r="18" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="70" cy="62" r="18" fill="#0284c7" opacity="0.15" />
        {/* Swirl inside */}
        <path d="M60 72 C62 55, 78 52, 78 68 C78 74, 68 76, 64 62" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M64 70 C65 58, 76 56, 76 66" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Glass reflection highlight */}
        <path d="M58 52 C62 48, 72 48, 78 54" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <circle cx="74" cy="52" r="1.5" fill="#ffffff" />
      </g>

      {/* Marble 3 (Back Left - Yellow/Purple) */}
      <g>
        <circle cx="28" cy="60" r="15" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="28" cy="60" r="15" fill="#a855f7" opacity="0.15" />
        {/* Swirl inside */}
        <path d="M20 68 C22 52, 34 50, 34 62 C34 68, 26 70, 24 58" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M22 66 C24 55, 32 54, 32 62" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Glass reflection highlight */}
        <path d="M19 52 C22 49, 30 49, 34 54" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        <circle cx="31" cy="51" r="1.2" fill="#ffffff" />
      </g>

      {/* Main Foreground Marble (Large, Blue/Red/Yellow Cat's-Eye Swirl) */}
      <g>
        <circle cx="46" cy="56" r="26" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
        <circle cx="46" cy="56" r="26" fill="#38bdf8" opacity="0.2" />
        {/* 3D Glass Inner Swirls */}
        <path d="M30 68 C34 42, 58 38, 62 60 C64 74, 46 80, 38 58 C34 48, 48 42, 54 48" stroke="#ef4444" strokeWidth="5.5" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M34 66 C37 46, 56 42, 60 58 C62 70, 48 76, 41 58" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
        <path d="M38 64 C40 50, 54 48, 57 58" stroke="#fde047" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Glass Crescent Specular Highlights */}
        <path d="M30 46 C35 36, 50 34, 60 40" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
        <path d="M36 68 C40 76, 54 78, 60 74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <circle cx="56" cy="40" r="2" fill="#ffffff" />
      </g>
    </svg>
  ),

  // blocks (деревянные кубики с цветными буквами A, B, C на гранях)
  'blocks': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="90" rx="34" ry="6" fill="#94a3b8" opacity="0.35" />
      {/* Bottom-Left Cube: Letter B (Blue border) */}
      <g>
        {/* Top Face */}
        <polygon points="12,58 34,46 56,58 34,70" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        {/* Left Face */}
        <polygon points="12,58 34,70 34,92 12,80" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        {/* Right Face */}
        <polygon points="34,70 56,58 56,80 34,92" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
        {/* Letter B on Right Face */}
        <path d="M39 68 L47 64 C50 62, 53 65, 51 68 C53 71, 50 75, 46 76 L39 79 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="42" y="69" width="3" height="3" fill="#d97706" />
        <rect x="42" y="73" width="3" height="3" fill="#d97706" />
      </g>

      {/* Bottom-Right Cube: Letter C (Green border) */}
      <g>
        {/* Top Face */}
        <polygon points="44,58 66,46 88,58 66,70" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        {/* Left Face */}
        <polygon points="44,58 66,70 66,92 44,80" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        {/* Right Face */}
        <polygon points="66,70 88,58 88,80 66,92" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
        {/* Letter C on Left Face */}
        <path d="M60 67 C54 66, 48 70, 50 78 C51 84, 57 85, 62 82" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Top Center Cube: Letter A (Red border) */}
      <g>
        {/* Top Face */}
        <polygon points="28,32 50,20 72,32 50,44" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        {/* Left Face */}
        <polygon points="28,32 50,44 50,66 28,54" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        {/* Right Face */}
        <polygon points="50,44 72,32 72,54 50,66" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        {/* Letter A on Left Face */}
        <path d="M43 40 L35 56 M43 40 L47 52 M36 50 L46 47" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Star on Right Face */}
        <polygon points="60,40 62,45 67,45 63,48 64,53 60,50 56,53 57,48 53,45 58,45" fill="#9333ea" />
      </g>
    </svg>
  ),

  // spinning top (классическая детская юла/волчок с полосатым куполом, остриём и ручкой-помпой)
  'spinning top': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="91" rx="14" ry="3" fill="#94a3b8" opacity="0.4" />
      {/* Motion Swirl Lines */}
      <path d="M16 68 C22 74, 34 76, 44 75" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M84 56 C78 50, 68 48, 58 49" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="82" cy="44" r="1.5" fill="#f59e0b" />
      <circle cx="18" cy="60" r="1.5" fill="#f59e0b" />

      {/* Bottom Spinning Metal Tip */}
      <polygon points="47,82 53,82 50,91" fill="#475569" stroke="#334155" strokeWidth="1" />
      <circle cx="50" cy="91" r="1.5" fill="#94a3b8" />

      {/* Lower Cone of Top */}
      <polygon points="20,62 80,62 50,83" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
      {/* Lower cone stripe */}
      <polygon points="28,68 72,68 50,83" fill="#38bdf8" />

      {/* Central Wide Saucer Rim */}
      <ellipse cx="50" cy="62" rx="34" ry="8" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
      <ellipse cx="50" cy="62" rx="31" ry="6.5" fill="#facc15" />

      {/* Upper Domed Section (Striped) */}
      <path d="M18 61 C18 42, 38 32, 50 32 C62 32, 82 42, 82 61 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
      {/* Dome Stripes (Yellow, Green, Blue) */}
      <path d="M26 55 C32 44, 42 38, 50 38 C58 38, 68 44, 74 55 Z" fill="#f59e0b" />
      <path d="M33 49 C38 42, 44 38, 50 38 C56 38, 62 42, 67 49 Z" fill="#22c55e" />
      <path d="M40 43 C43 38, 47 36, 50 36 C53 36, 57 38, 60 43 Z" fill="#3b82f6" />
      {/* Window peep holes with colored dots */}
      <circle cx="36" cy="56" r="3" fill="#ffffff" />
      <circle cx="36" cy="56" r="1.5" fill="#ec4899" />
      <circle cx="50" cy="57" r="3" fill="#ffffff" />
      <circle cx="50" cy="57" r="1.5" fill="#06b6d4" />
      <circle cx="64" cy="56" r="3" fill="#ffffff" />
      <circle cx="64" cy="56" r="1.5" fill="#8b5cf6" />

      {/* Glossy Curved Highlight on Dome */}
      <path d="M28 50 C34 40, 44 36, 50 36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />

      {/* Plunger / Handle on Top */}
      <rect x="48" y="16" width="4" height="17" fill="#94a3b8" stroke="#64748b" strokeWidth="1" rx="1" />
      {/* Spiral thread on shaft */}
      <path d="M48 20 L52 22 M48 25 L52 27 M48 30 L52 32" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
      {/* Big Round Knob on Top */}
      <circle cx="50" cy="14" r="6.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
      <circle cx="48" cy="12" r="2" fill="#fca5a5" />
    </svg>
  ),

  // rocking horse (деревянная детская лошадка-качалка с изогнутыми полозьями, гривой и седлом)
  'rocking horse': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="92" rx="34" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Curved Rocker Runners at Bottom */}
      <path d="M12 80 Q50 95 88 80" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M14 78 Q50 92 86 78" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Rocker Crossbars */}
      <line x1="28" y1="84" x2="34" y2="70" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="84" x2="66" y2="70" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
      {/* Footrest peg */}
      <circle cx="50" cy="74" r="3" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />

      {/* Horse Legs */}
      {/* Back Legs */}
      <path d="M38 58 L28 78 M42 58 L32 78" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" />
      {/* Front Legs */}
      <path d="M62 58 L72 78 M58 58 L68 78" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" />

      {/* Horse Body */}
      <ellipse cx="50" cy="56" rx="18" ry="11" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
      {/* Saddle */}
      <path d="M42 49 C42 46, 58 46, 58 49 C58 56, 42 56, 42 49 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
      <rect x="47" y="52" width="6" height="7" rx="1" fill="#fde047" />

      {/* Horse Neck & Head */}
      <path d="M58 54 L68 34 C70 30, 75 28, 80 32 C84 35, 82 42, 74 44 L66 58 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
      {/* Muzzle & Smile */}
      <circle cx="78" cy="36" r="1.2" fill="#78350f" />
      <path d="M76 40 Q74 42 72 40" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Eye */}
      <circle cx="72" cy="34" r="2.2" fill="#1e293b" />
      <circle cx="72.6" cy="33.4" r="0.8" fill="#ffffff" />
      {/* Ear */}
      <polygon points="68,26 73,32 66,32" fill="#d97706" stroke="#b45309" strokeWidth="1" />

      {/* Mane (Wood carved ridges) */}
      <path d="M64 29 C62 31, 60 34, 61 38 C59 40, 58 43, 60 46 C58 48, 57 52, 60 55" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Handle Peg for hands */}
      <circle cx="68" cy="38" r="3.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
      <line x1="68" y1="38" x2="68" y2="43" stroke="#b45309" strokeWidth="2" />

      {/* Bushy Tail */}
      <path d="M34 54 C26 56, 22 64, 25 72 C27 64, 30 60, 35 60 Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
    </svg>
  ),

  // pyramid (классическая детская пирамидка: колечки от большего к меньшему на стержне и верхушка-шарик)
  'pyramid': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="91" rx="30" ry="5" fill="#94a3b8" opacity="0.35" />
      {/* Base Stand & Vertical Post */}
      <ellipse cx="50" cy="87" rx="28" ry="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <rect x="47" y="18" width="6" height="70" rx="3" fill="#cbd5e1" />

      {/* Ring 1 (Bottom, Largest - Red) */}
      <g>
        <ellipse cx="50" cy="80" rx="26" ry="7.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
        <ellipse cx="50" cy="78" rx="26" ry="7" fill="#ef4444" />
        <path d="M28 77 C34 74, 66 74, 72 77" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      </g>

      {/* Ring 2 (Orange) */}
      <g>
        <ellipse cx="50" cy="69" rx="22" ry="6.8" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
        <ellipse cx="50" cy="67" rx="22" ry="6.3" fill="#f97316" />
        <path d="M32 66 C36 63, 64 63, 68 66" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      </g>

      {/* Ring 3 (Yellow) */}
      <g>
        <ellipse cx="50" cy="58" rx="18" ry="6" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
        <ellipse cx="50" cy="56" rx="18" ry="5.5" fill="#eab308" />
        <path d="M35 55 C39 52, 61 52, 65 55" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Ring 4 (Green) */}
      <g>
        <ellipse cx="50" cy="47" rx="14" ry="5.2" fill="#16a34a" stroke="#166534" strokeWidth="1.5" />
        <ellipse cx="50" cy="45" rx="14" ry="4.8" fill="#22c55e" />
        <path d="M39 44 C42 42, 58 42, 61 44" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Ring 5 (Blue) */}
      <g>
        <ellipse cx="50" cy="36" rx="10" ry="4.5" fill="#2563eb" stroke="#1e40af" strokeWidth="1.5" />
        <ellipse cx="50" cy="34" rx="10" ry="4.2" fill="#3b82f6" />
        <path d="M43 33 C45 32, 55 32, 57 33" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Top Cap Ball (Purple) */}
      <g>
        <circle cx="50" cy="20" r="7.5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
        <circle cx="48" cy="18" r="2" fill="#e9d5ff" />
      </g>
    </svg>
  ),

  // rubber duck (классическая жёлтая резиновая уточка для купания с оранжевым клювом и пузырьками)
  'rubber duck': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Water Ripples & Soap Bubbles */}
      <ellipse cx="48" cy="85" rx="34" ry="6" fill="#38bdf8" opacity="0.3" />
      <path d="M16 84 Q32 88 48 84 T80 84" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Soap bubbles */}
      <circle cx="18" cy="74" r="3.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
      <circle cx="82" cy="76" r="4.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
      <circle cx="78" cy="68" r="2.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />

      {/* Duck Body */}
      <path d="M26 78 C20 72, 22 56, 36 54 C40 54, 46 56, 52 56 C62 56, 72 58, 80 64 C84 68, 82 76, 76 80 C68 85, 36 86, 26 78 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
      {/* Perky Pointed Tail */}
      <path d="M22 64 C16 54, 26 50, 32 54 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

      {/* Wing */}
      <path d="M38 64 C42 60, 54 60, 58 65 C60 70, 52 74, 44 74 C38 74, 36 68, 38 64 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />

      {/* Duck Head & Neck */}
      <path d="M52 56 L54 44 C54 34, 62 26, 72 26 C82 26, 88 34, 86 44 C84 52, 76 56, 68 56 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      <circle cx="70" cy="38" r="14" fill="#facc15" />

      {/* Cartoon Friendly Eye */}
      <circle cx="76" cy="34" r="3.8" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
      <circle cx="77" cy="34" r="2" fill="#0f172a" />
      <circle cx="76.2" cy="33" r="0.8" fill="#ffffff" />
      <path d="M72 30 Q76 28 80 30" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />

      {/* Chubby Orange Duck Bill / Beak */}
      <path d="M82 38 C88 36, 94 37, 96 40 C96 43, 90 45, 84 45 C81 45, 80 42, 82 38 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
      <path d="M84 41 L94 40" stroke="#9a3412" strokeWidth="1" />

      {/* Cute Head Highlight */}
      <path d="M64 28 C68 26, 74 26, 78 28" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // tea set (игрушечный чайный сервиз: пузатый заварник с узором, две чашечки на блюдечках)
  'tea set': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="88" rx="38" ry="6" fill="#94a3b8" opacity="0.3" />
      {/* 1. Teacup and Saucer on Left */}
      <g>
        <ellipse cx="24" cy="82" rx="14" ry="4" fill="#ec4899" stroke="#be185d" strokeWidth="1.2" />
        <ellipse cx="24" cy="81" rx="12" ry="3" fill="#fbcfe8" />
        {/* Cup */}
        <path d="M16 72 L18 80 C18 82, 30 82, 30 80 L32 72 Z" fill="#f472b6" stroke="#be185d" strokeWidth="1.2" />
        <ellipse cx="24" cy="72" rx="8" ry="2.5" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
        <ellipse cx="24" cy="72" rx="6.5" ry="1.8" fill="#d97706" opacity="0.8" />
        {/* Handle */}
        <path d="M31 73 C35 73, 35 79, 30 80" stroke="#be185d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* 2. Main Cute Toy Teapot (Заварник) in Center */}
      <g>
        {/* Curved Teapot Handle on Left */}
        <path d="M42 46 C32 46, 30 64, 42 66" stroke="#ec4899" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M42 48 C35 48, 34 62, 42 64" stroke="#fbcfe8" strokeWidth="1.5" fill="none" />

        {/* Spout on Right */}
        <path d="M68 56 C74 54, 78 44, 82 42 C82 46, 76 60, 66 64 Z" fill="#f472b6" stroke="#be185d" strokeWidth="1.5" />
        <ellipse cx="81.5" cy="42.5" rx="2" ry="1.2" fill="#be185d" />

        {/* Teapot Foot/Base */}
        <ellipse cx="55" cy="76" rx="12" ry="3" fill="#db2777" />

        {/* Round Chubby Teapot Belly */}
        <circle cx="55" cy="58" r="18" fill="#f472b6" stroke="#be185d" strokeWidth="2" />
        <path d="M40 58 C40 68, 70 68, 70 58" fill="#fbcfe8" opacity="0.6" />

        {/* Cute Floral / Heart Pattern on Belly */}
        <circle cx="55" cy="58" r="4.5" fill="#ffffff" />
        <circle cx="55" cy="58" r="2.5" fill="#f59e0b" />
        <circle cx="55" cy="52" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="55" cy="64" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="49" cy="58" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="61" cy="58" r="2" fill="#ffffff" opacity="0.8" />

        {/* Teapot Rim & Domed Lid */}
        <ellipse cx="55" cy="42" rx="10" ry="3" fill="#db2777" stroke="#be185d" strokeWidth="1" />
        <path d="M47 42 C47 34, 63 34, 63 42 Z" fill="#f472b6" stroke="#be185d" strokeWidth="1.2" />
        {/* Lid Knob */}
        <circle cx="55" cy="33" r="3.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
        <circle cx="54" cy="32" r="1" fill="#ffffff" />
      </g>

      {/* 3. Teacup and Saucer on Right */}
      <g>
        <ellipse cx="78" cy="82" rx="13" ry="3.8" fill="#06b6d4" stroke="#0e7490" strokeWidth="1.2" />
        <ellipse cx="78" cy="81" rx="11" ry="2.8" fill="#cffafe" />
        {/* Cup */}
        <path d="M71 73 L73 80 C73 82, 83 82, 83 80 L85 73 Z" fill="#22d3ee" stroke="#0e7490" strokeWidth="1.2" />
        <ellipse cx="78" cy="73" rx="7" ry="2.2" fill="#cffafe" stroke="#0e7490" strokeWidth="1" />
        <ellipse cx="78" cy="73" rx="5.5" ry="1.5" fill="#d97706" opacity="0.8" />
        {/* Handle */}
        <path d="M84 74 C88 74, 88 79, 83 80" stroke="#0e7490" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  ),

  // bookshop (уютный книжный магазин: витрина с книгами, полосатый навес, вывеска BOOKS и дверь)
  'bookshop': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="94" rx="44" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Building Facade */}
      <rect x="12" y="16" width="76" height="76" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
      {/* Brick Texture Accent on Upper Wall */}
      <rect x="18" y="20" width="8" height="3" rx="1" fill="#cbd5e1" opacity="0.6" />
      <rect x="74" y="20" width="8" height="3" rx="1" fill="#cbd5e1" opacity="0.6" />

      {/* Signboard above awning */}
      <rect x="22" y="18" width="56" height="13" rx="3" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
      <text x="50" y="27.5" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="900" letterSpacing="1.5">BOOKS</text>

      {/* Striped Store Awning / Canopy */}
      <g>
        {/* Awning Slants */}
        <polygon points="10,36 18,36 15,48 7,48" fill="#ef4444" />
        <polygon points="18,36 28,36 26,48 15,48" fill="#ffffff" />
        <polygon points="28,36 38,36 37,48 26,48" fill="#ef4444" />
        <polygon points="38,36 48,36 48,48 37,48" fill="#ffffff" />
        <polygon points="48,36 58,36 59,48 48,48" fill="#ef4444" />
        <polygon points="58,36 68,36 70,48 59,48" fill="#ffffff" />
        <polygon points="68,36 78,36 81,48 70,48" fill="#ef4444" />
        <polygon points="78,36 86,36 90,48 81,48" fill="#ffffff" />
        <polygon points="86,36 90,36 93,48 90,48" fill="#ef4444" />
        {/* Awning valance scalloped edge */}
        <line x1="7" y1="48" x2="93" y2="48" stroke="#b91c1c" strokeWidth="1.5" />
      </g>

      {/* Display Window on Left with Books inside */}
      <rect x="16" y="52" width="40" height="34" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      {/* Window Shelf */}
      <rect x="18" y="70" width="36" height="3" fill="#b45309" />
      {/* Books on Top Shelf */}
      <rect x="20" y="58" width="5" height="12" rx="1" fill="#ef4444" />
      <rect x="26" y="56" width="6" height="14" rx="1" fill="#3b82f6" />
      <rect x="33" y="60" width="5" height="10" rx="1" fill="#22c55e" />
      <polygon points="39,70 47,62 49,63 42,70" fill="#f59e0b" />
      {/* Open Book on Bottom Shelf */}
      <path d="M22 81 Q28 78 34 81 L34 76 Q28 73 22 76 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      <path d="M34 81 Q40 78 46 81 L46 76 Q40 73 34 76 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
      {/* Window glass sheen */}
      <path d="M20 54 L36 54 L18 72 L18 64 Z" fill="#ffffff" opacity="0.5" />

      {/* Shop Entrance Door on Right */}
      <rect x="62" y="52" width="24" height="40" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
      {/* Glass Pane on Door */}
      <rect x="66" y="56" width="16" height="20" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
      {/* "OPEN" sign in door window */}
      <rect x="69" y="62" width="10" height="5" rx="1" fill="#22c55e" />
      <text x="74" y="66" textAnchor="middle" fill="#ffffff" fontSize="3" fontWeight="bold">OPEN</text>
      {/* Brass Door Knob */}
      <circle cx="66" cy="80" r="2" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
      {/* Welcome Mat */}
      <rect x="60" y="90" width="28" height="3" rx="1" fill="#475569" />
    </svg>
  ),

  // Numbers 11-20 (Single keycap badges matching standard keycap style 🔟)
  'eleven': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num11Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num11Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        11
      </text>
    </svg>
  ),

  'twelve': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num12Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num12Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        12
      </text>
    </svg>
  ),

  'thirteen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num13Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num13Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        13
      </text>
    </svg>
  ),

  'fourteen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num14Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num14Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        14
      </text>
    </svg>
  ),

  'fifteen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num15Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num15Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        15
      </text>
    </svg>
  ),

  'sixteen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num16Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num16Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        16
      </text>
    </svg>
  ),

  'seventeen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num17Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num17Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        17
      </text>
    </svg>
  ),

  'eighteen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num18Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num18Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        18
      </text>
    </svg>
  ),

  'nineteen': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num19Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num19Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        19
      </text>
    </svg>
  ),

  'twenty': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      <defs>
        <linearGradient id="num20Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#num20Grad)" stroke="#60a5fa" strokeWidth="3" />
      <rect x="10" y="10" width="80" height="40" rx="18" fill="#ffffff" opacity="0.16" />
      <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-2">
        20
      </text>
    </svg>
  ),

  // Blue boat (vivid royal blue sailboat with white sail)
  'boat': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      {/* Water Waves */}
      <path d="M8 82 Q25 77 42 82 T76 82 T96 82" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M16 88 Q35 84 54 88 T88 88" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Blue Boat Hull */}
      <path d="M14 62 L24 82 L76 82 L86 62 Z" fill="#2563eb" />
      <path d="M14 62 L24 82 L30 82 L20 62 Z" fill="#1d4ed8" />
      <path d="M14 62 L86 62 L84 66 L16 66 Z" fill="#60a5fa" />
      {/* Mast */}
      <rect x="47" y="16" width="5" height="48" rx="2" fill="#78350f" />
      {/* Main Sail (White) */}
      <path d="M54 20 L84 58 L54 58 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Front Jib Sail (White) */}
      <path d="M45 26 L20 58 L45 58 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Little Red Pennant Flag */}
      <path d="M52 16 L65 21 L52 26 Z" fill="#ef4444" />
      {/* White Lifebuoy on blue hull */}
      <circle cx="50" cy="72" r="5.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
      <circle cx="50" cy="72" r="2.2" fill="#2563eb" />
    </svg>
  ),

  // Orange kite (vivid orange diamond kite with bows on tail)
  'kite': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      {/* Kite Tail & Bows */}
      <path d="M50 76 C46 86 54 92 62 96" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" fill="none" />
      <polygon points="46,82 50,84 46,86 54,86 50,84 54,82" fill="#fbbf24" />
      <polygon points="52,89 56,91 52,93 60,93 56,91 60,89" fill="#ec4899" />
      {/* Vibrant Orange Diamond Kite Body */}
      <polygon points="50,8 18,42 50,76" fill="#f97316" />
      <polygon points="50,8 82,42 50,76" fill="#ea580c" />
      {/* Cross Spars */}
      <line x1="50" y1="8" x2="50" y2="76" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="42" x2="82" y2="42" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
      {/* Center Star Emblem */}
      <polygon points="50,34 52,40 58,42 52,44 50,50 48,44 42,42 48,40" fill="#fef08a" />
      {/* Corner Tassels */}
      <circle cx="18" cy="42" r="2.5" fill="#fbbf24" />
      <circle cx="82" cy="42" r="2.5" fill="#fbbf24" />
    </svg>
  ),

  // White and Grey Cats (two cute kittens side-by-side)
  'cats': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      {/* White Cat (Left) */}
      <g id="whiteCat">
        {/* Tail */}
        <path d="M15 76 C10 74 8 64 12 58" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Body */}
        <ellipse cx="28" cy="68" rx="15" ry="17" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {/* Head */}
        <circle cx="28" cy="42" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {/* Ears */}
        <polygon points="17,37 19,23 27,33" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <polygon points="19,34 20,26 25,32" fill="#fbcfe8" />
        <polygon points="39,37 37,23 29,33" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <polygon points="37,34 36,26 31,32" fill="#fbcfe8" />
        {/* Eyes & Face */}
        <circle cx="23" cy="41" r="2" fill="#1e293b" />
        <circle cx="33" cy="41" r="2" fill="#1e293b" />
        <circle cx="23.5" cy="40.5" r="0.7" fill="#ffffff" />
        <circle cx="33.5" cy="40.5" r="0.7" fill="#ffffff" />
        <polygon points="28,45 26.5,43 29.5,43" fill="#fb7185" />
        <path d="M26 47 Q28 49 30 47" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Whiskers */}
        <line x1="14" y1="44" x2="20" y2="44" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="47" x2="20" y2="46" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="42" y1="44" x2="36" y2="44" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="42" y1="47" x2="36" y2="46" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
        {/* Pink Collar */}
        <path d="M20 53 Q28 57 36 53" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="28" cy="56" r="2" fill="#fbbf24" />
        {/* Paws */}
        <ellipse cx="23" cy="83" rx="4" ry="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <ellipse cx="33" cy="83" rx="4" ry="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      </g>

      {/* Grey Cat (Right) */}
      <g id="greyCat">
        {/* Tail */}
        <path d="M85 76 C90 74 92 64 88 58" stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Body */}
        <ellipse cx="72" cy="68" rx="15" ry="17" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        {/* Head */}
        <circle cx="72" cy="42" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        {/* Ears */}
        <polygon points="61,37 63,23 71,33" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        <polygon points="63,34 64,26 69,32" fill="#fbcfe8" />
        <polygon points="83,37 81,23 73,33" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        <polygon points="81,34 80,26 75,32" fill="#fbcfe8" />
        {/* Forehead Stripes */}
        <path d="M72 30 L72 34 M68 31 L69 34 M76 31 L75 34" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        {/* Eyes & Face */}
        <circle cx="67" cy="41" r="2" fill="#1e293b" />
        <circle cx="77" cy="41" r="2" fill="#1e293b" />
        <circle cx="67.5" cy="40.5" r="0.7" fill="#ffffff" />
        <circle cx="77.5" cy="40.5" r="0.7" fill="#ffffff" />
        <polygon points="72,45 70.5,43 73.5,43" fill="#fb7185" />
        <path d="M70 47 Q72 49 74 47" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Whiskers */}
        <line x1="58" y1="44" x2="64" y2="44" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="58" y1="47" x2="64" y2="46" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="86" y1="44" x2="80" y2="44" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="86" y1="47" x2="80" y2="46" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        {/* Blue Collar */}
        <path d="M64 53 Q72 57 80 53" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="72" cy="56" r="2" fill="#fbbf24" />
        {/* Paws */}
        <ellipse cx="67" cy="83" rx="4" ry="2.5" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="77" cy="83" rx="4" ry="2.5" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      </g>
    </svg>
  ),

  // Red and Green Balls (two toy balls side-by-side)
  'balls': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      {/* Red Ball (Left) */}
      <g id="redBall">
        <circle cx="30" cy="54" r="22" fill="#ef4444" />
        {/* Yellow Wave Swirl */}
        <path d="M10 54 C16 42 44 42 50 54 C44 66 16 66 10 54 Z" fill="#fbbf24" />
        {/* White Star */}
        <polygon points="30,47 32,52 37,53 33,56 34,61 30,58 26,61 27,56 23,53 28,52" fill="#ffffff" />
        {/* Shine */}
        <ellipse cx="24" cy="42" rx="4" ry="2.5" fill="#ffffff" opacity="0.6" transform="rotate(-30 24 42)" />
      </g>

      {/* Green Ball (Right) */}
      <g id="greenBall">
        <circle cx="70" cy="54" r="22" fill="#22c55e" />
        {/* White Wave Swirl */}
        <path d="M50 54 C56 42 84 42 90 54 C84 66 56 66 50 54 Z" fill="#ffffff" />
        {/* Blue Inner Stripe */}
        <path d="M52 54 C57 46 83 46 88 54 C83 62 57 62 52 54 Z" fill="#3b82f6" />
        {/* Shine */}
        <ellipse cx="64" cy="42" rx="4" ry="2.5" fill="#ffffff" opacity="0.6" transform="rotate(-30 64 42)" />
      </g>
    </svg>
  ),

  // Blue and Yellow Birds (two sweet birds on a branch)
  'birds': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      {/* Branch */}
      <path d="M8 78 Q50 74 92 78" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 77 Q75 72 82 74" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="80" cy="72" rx="4" ry="2.5" fill="#22c55e" transform="rotate(-20 80 72)" />

      {/* Blue Bird (Left) */}
      <g id="blueBird">
        <line x1="30" y1="64" x2="30" y2="76" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="35" y1="64" x2="35" y2="76" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        {/* Crest */}
        <path d="M34 32 Q36 24 42 26 Q37 31 35 34" fill="#2563eb" />
        {/* Body */}
        <circle cx="32" cy="48" r="16" fill="#3b82f6" />
        {/* Wing */}
        <ellipse cx="26" cy="53" rx="10" ry="7" fill="#60a5fa" />
        {/* Eye */}
        <circle cx="28" cy="46" r="2.2" fill="#1e293b" />
        <circle cx="28.5" cy="45.5" r="0.8" fill="#ffffff" />
        {/* Orange Beak */}
        <polygon points="19,47 11,49 19,52" fill="#f97316" />
      </g>

      {/* Yellow Bird (Right) */}
      <g id="yellowBird">
        <line x1="65" y1="64" x2="65" y2="76" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="64" x2="70" y2="76" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        {/* Crest */}
        <path d="M66 32 Q64 24 58 26 Q63 31 65 34" fill="#ca8a04" />
        {/* Body */}
        <circle cx="68" cy="48" r="16" fill="#eab308" />
        {/* Wing */}
        <ellipse cx="74" cy="53" rx="10" ry="7" fill="#fde047" />
        {/* Eye */}
        <circle cx="72" cy="46" r="2.2" fill="#1e293b" />
        <circle cx="71.5" cy="45.5" r="0.8" fill="#ffffff" />
        {/* Orange Beak */}
        <polygon points="81,47 89,49 81,52" fill="#f97316" />
      </g>
    </svg>
  ),

  // Yellow and Red Pencils (two pencils side-by-side)
  'pencils': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
      {/* Yellow Pencil (Left) */}
      <g id="yellowPencil">
        {/* Body */}
        <rect x="22" y="32" width="16" height="52" rx="1" fill="#eab308" />
        <line x1="27" y1="32" x2="27" y2="84" stroke="#ca8a04" strokeWidth="1.5" />
        <line x1="33" y1="32" x2="33" y2="84" stroke="#fde047" strokeWidth="1.5" />
        {/* Wood Tip */}
        <polygon points="22,32 38,32 30,12" fill="#fed7aa" />
        {/* Graphite Tip */}
        <polygon points="27,18 33,18 30,12" fill="#334155" />
        {/* Ferrule */}
        <rect x="22" y="76" width="16" height="6" fill="#cbd5e1" />
        {/* Pink Eraser */}
        <rect x="22" y="82" width="16" height="6" rx="2" fill="#f43f5e" />
      </g>

      {/* Red Pencil (Right) */}
      <g id="redPencil">
        {/* Body */}
        <rect x="62" y="32" width="16" height="52" rx="1" fill="#ef4444" />
        <line x1="67" y1="32" x2="67" y2="84" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="73" y1="32" x2="73" y2="84" stroke="#f87171" strokeWidth="1.5" />
        {/* Wood Tip */}
        <polygon points="62,32 78,32 70,12" fill="#fed7aa" />
        {/* Red Tip */}
        <polygon points="67,18 73,18 70,12" fill="#991b1b" />
        {/* Ferrule */}
        <rect x="62" y="76" width="16" height="6" fill="#cbd5e1" />
        {/* White Eraser */}
        <rect x="62" y="82" width="16" height="6" rx="2" fill="#f1f5f9" />
      </g>
    </svg>
  ),
  // Preposition scenes & grammar illustrations
  'book on table': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="86" rx="36" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* 4 Wooden Legs */}
      <rect x="26" y="56" width="5" height="26" rx="2" fill="#92400e" />
      <rect x="70" y="56" width="5" height="26" rx="2" fill="#92400e" />
      {/* Apron */}
      <polygon points="24,54 76,54 74,60 26,60" fill="#b45309" />
      {/* Front Legs */}
      <rect x="20" y="58" width="6" height="28" rx="2" fill="#d97706" />
      <rect x="74" y="58" width="6" height="28" rx="2" fill="#d97706" />
      {/* Wooden Tabletop */}
      <polygon points="20,56 80,56 84,48 16,48" fill="#b45309" />
      <polygon points="16,48 84,48 78,40 22,40" fill="#f59e0b" />
      <line x1="28" y1="44" x2="72" y2="44" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      {/* Book on the table */}
      <g transform="translate(32, 24)">
        {/* Shadow under book */}
        <ellipse cx="18" cy="21" rx="16" ry="3" fill="#78350f" opacity="0.4" />
        {/* Book spine & cover */}
        <polygon points="2,18 16,21 34,16 20,13" fill="#1e40af" />
        <polygon points="2,16 16,19 34,14 20,11" fill="#2563eb" />
        <polygon points="2,14 16,17 34,12 20,9" fill="#3b82f6" />
        {/* Pages thickness */}
        <polygon points="2,16 2,18 16,21 16,19" fill="#f8fafc" />
        <polygon points="16,19 16,21 34,16 34,14" fill="#e2e8f0" />
        {/* Top cover details */}
        <polygon points="4,13 16,16 32,11 20,8" fill="#60a5fa" />
        {/* Gold star on cover */}
        <circle cx="18" cy="12" r="2.5" fill="#fef08a" />
        {/* Red bookmark ribbon */}
        <path d="M 16 18 Q 15 23 17 25 L 19 23 L 18 20" fill="#ef4444" />
      </g>
    </svg>
  ),

  'apple on table': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="86" rx="36" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* 4 Wooden Legs */}
      <rect x="26" y="56" width="5" height="26" rx="2" fill="#92400e" />
      <rect x="70" y="56" width="5" height="26" rx="2" fill="#92400e" />
      {/* Apron */}
      <polygon points="24,54 76,54 74,60 26,60" fill="#b45309" />
      {/* Front Legs */}
      <rect x="20" y="58" width="6" height="28" rx="2" fill="#d97706" />
      <rect x="74" y="58" width="6" height="28" rx="2" fill="#d97706" />
      {/* Wooden Tabletop Surface (top plane) */}
      <polygon points="16,48 84,48 78,36 22,36" fill="#f59e0b" />
      <line x1="26" y1="40" x2="74" y2="40" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="44" x2="78" y2="44" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      {/* Front edge skirt (thickness) */}
      <polygon points="16,48 84,48 80,56 20,56" fill="#b45309" />

      {/* Apple resting clearly ON the table surface (base at y=42, well above front edge y=48) */}
      <g transform="translate(50, 42)">
        {/* Apple cast shadow flat on table surface */}
        <ellipse cx="0" cy="0.5" rx="8.5" ry="2.6" fill="#78350f" opacity="0.45" />
        {/* Apple Body - bottom curves stay above y=0 */}
        <path
          d="M 0 -11 C -5 -16 -13 -13 -12 -2 C -11 5 -4 0.5 0 0 C 4 0.5 11 5 12 -2 C 13 -13 5 -16 0 -11 Z"
          fill="#dc2626"
        />
        {/* Apple Shading & Highlights */}
        <path
          d="M -1 -10 C -4 -14 -11 -11 -10 -2 C -9 4 -3 0.5 0 0 C 1 0 0 -2 0 -6 C 0 -9 0.5 -10 -1 -10 Z"
          fill="#ef4444"
        />
        <ellipse cx="-4" cy="-5" rx="2.5" ry="4" fill="#f87171" opacity="0.65" transform="rotate(-20 -4 -5)" />
        {/* Apple Stem */}
        <path d="M 0 -11 C 0.8 -15 3.5 -18 5 -19" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Green Leaf */}
        <path d="M 1 -14 C 4 -18 9 -17 11 -14 C 11 -11 6 -11 1 -14 Z" fill="#22c55e" />
      </g>
    </svg>
  ),

  'cat under chair': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Floor shadow */}
      <ellipse cx="50" cy="88" rx="34" ry="5" fill="#cbd5e1" opacity="0.6" />
      {/* Chair Backrest */}
      <rect x="28" y="14" width="5" height="42" rx="2.5" fill="#b45309" />
      <rect x="67" y="14" width="5" height="42" rx="2.5" fill="#b45309" />
      {/* Horizontal Slats */}
      <rect x="29" y="18" width="42" height="6" rx="2" fill="#d97706" />
      <rect x="29" y="28" width="42" height="5" rx="2" fill="#f59e0b" />
      <rect x="29" y="37" width="42" height="5" rx="2" fill="#d97706" />
      {/* Chair Seat */}
      <polygon points="22,54 78,54 84,48 16,48" fill="#b45309" />
      <polygon points="16,48 84,48 78,44 22,44" fill="#f59e0b" />
      {/* Back Legs */}
      <rect x="26" y="54" width="5" height="32" rx="2" fill="#92400e" />
      <rect x="69" y="54" width="5" height="32" rx="2" fill="#92400e" />
      {/* THE CAT SITTING UNDER THE CHAIR */}
      <g id="cuteCatUnder">
        {/* Cat shadow */}
        <ellipse cx="50" cy="87" rx="14" ry="3.5" fill="#475569" opacity="0.35" />
        {/* Tail */}
        <path d="M 60 84 Q 68 85 70 80 Q 72 74 67 72" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* Cat Body */}
        <ellipse cx="50" cy="78" rx="13" ry="9" fill="#f97316" />
        <ellipse cx="49" cy="79" rx="8" ry="6" fill="#fed7aa" />
        {/* Cat Head */}
        <circle cx="48" cy="67" r="9" fill="#f97316" />
        {/* Ears */}
        <polygon points="41,63 41,55 47,60" fill="#ea580c" />
        <polygon points="42,62 42,57 46,60" fill="#fecdd3" />
        <polygon points="55,63 55,55 49,60" fill="#ea580c" />
        <polygon points="54,62 54,57 50,60" fill="#fecdd3" />
        {/* Cheeks and Muzzle */}
        <ellipse cx="48" cy="70" rx="5" ry="3.5" fill="#ffffff" />
        {/* Eyes (smiling friendly curves) */}
        <path d="M 43 66 Q 45 64 47 66" stroke="#431407" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M 49 66 Q 51 64 53 66" stroke="#431407" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* Nose & Mouth */}
        <polygon points="47,69 49,69 48,70.5" fill="#f43f5e" />
        <path d="M 47 71 Q 48 72 49 71" stroke="#431407" strokeWidth="1" strokeLinecap="round" fill="none" />
        {/* Whiskers */}
        <line x1="39" y1="69" x2="44" y2="70" stroke="#78350f" strokeWidth="0.8" />
        <line x1="39" y1="72" x2="44" y2="71" stroke="#78350f" strokeWidth="0.8" />
        <line x1="52" y1="70" x2="57" y2="69" stroke="#78350f" strokeWidth="0.8" />
        <line x1="52" y1="71" x2="57" y2="72" stroke="#78350f" strokeWidth="0.8" />
        {/* Front Paws */}
        <ellipse cx="44" cy="85" rx="3.5" ry="2.5" fill="#fed7aa" />
        <ellipse cx="52" cy="85" rx="3.5" ry="2.5" fill="#fed7aa" />
      </g>
      {/* Front Legs of Chair (in front of cat) */}
      <rect x="20" y="54" width="5.5" height="34" rx="2" fill="#d97706" />
      <rect x="74" y="54" width="5.5" height="34" rx="2" fill="#d97706" />
      {/* Bottom Crossbar */}
      <rect x="22" y="74" width="56" height="3" rx="1" fill="#b45309" opacity="0.8" />
    </svg>
  ),

  'ball under bed': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow under bed */}
      <ellipse cx="50" cy="88" rx="44" ry="5" fill="#cbd5e1" opacity="0.6" />
      {/* Headboard (Left) */}
      <rect x="8" y="30" width="7" height="56" rx="3" fill="#b45309" />
      <circle cx="11.5" cy="28" r="4.5" fill="#d97706" />
      <rect x="14" y="36" width="3" height="36" rx="1.5" fill="#d97706" />
      {/* Footboard (Right) */}
      <rect x="85" y="44" width="7" height="42" rx="3" fill="#b45309" />
      <circle cx="88.5" cy="42" r="4" fill="#d97706" />
      {/* Bed Base / Frame */}
      <rect x="12" y="58" width="76" height="8" rx="2" fill="#92400e" />
      {/* Bed Legs */}
      <rect x="12" y="66" width="6" height="20" rx="2" fill="#78350f" />
      <rect x="82" y="66" width="6" height="20" rx="2" fill="#78350f" />
      {/* Mattress */}
      <rect x="14" y="52" width="72" height="8" rx="2" fill="#f8fafc" />
      {/* Fluffy Pillow */}
      <rect x="16" y="44" width="16" height="9" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Cozy Blue Blanket */}
      <path d="M 28 50 L 84 50 L 84 60 L 28 60 Z" fill="#3b82f6" />
      <path d="M 28 50 Q 56 52 84 50 L 84 56 Q 56 58 28 56 Z" fill="#60a5fa" />
      <line x1="28" y1="56" x2="84" y2="56" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* THE SOCCER BALL UNDER THE BED (UNDER THE FRAME!) */}
      <g transform="translate(48, 77)">
        {/* Ball Shadow on floor */}
        <ellipse cx="0" cy="8" rx="9" ry="2.5" fill="#64748b" opacity="0.5" />
        {/* Ball Body */}
        <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        {/* Classic Soccer Pentagons */}
        <polygon points="0,-2 -3,-1 -2,2 2,2 3,-1" fill="#0f172a" />
        <polygon points="0,-8 -2,-5 2,-5" fill="#0f172a" />
        <polygon points="-7,-4 -5,-2 -7,0" fill="#0f172a" />
        <polygon points="7,-4 5,-2 7,0" fill="#0f172a" />
        <polygon points="-5,5 -3,3 -5,7" fill="#0f172a" />
        <polygon points="5,5 3,3 5,7" fill="#0f172a" />
        <line x1="0" y1="-2" x2="0" y2="-5" stroke="#334155" strokeWidth="0.8" />
        <line x1="-3" y1="-1" x2="-5" y2="-2" stroke="#334155" strokeWidth="0.8" />
        <line x1="3" y1="-1" x2="5" y2="-2" stroke="#334155" strokeWidth="0.8" />
        <line x1="-2" y1="2" x2="-3" y2="3" stroke="#334155" strokeWidth="0.8" />
        <line x1="2" y1="2" x2="3" y2="3" stroke="#334155" strokeWidth="0.8" />
      </g>
    </svg>
  ),

  'pencil in pencil case': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow */}
      <ellipse cx="50" cy="85" rx="36" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* Back Wall of Pencil Case (Interior) */}
      <rect x="14" y="44" width="72" height="34" rx="10" fill="#0891b2" />
      <rect x="16" y="46" width="68" height="16" rx="6" fill="#155e75" />
      {/* PENCIL INSIDE AND PEEKING OUT OF THE CASE */}
      <g transform="translate(46, 42) rotate(-35)">
        {/* Shadow inside */}
        <rect x="-4" y="-8" width="8" height="42" fill="#0e7490" opacity="0.3" />
        {/* Yellow Pencil Body */}
        <rect x="-4" y="-12" width="8" height="42" fill="#f59e0b" />
        <line x1="-1.5" y1="-12" x2="-1.5" y2="30" stroke="#fbbf24" strokeWidth="1" />
        <line x1="1.5" y1="-12" x2="1.5" y2="30" stroke="#d97706" strokeWidth="1" />
        {/* Wood collar */}
        <polygon points="-4,-12 4,-12 0,-24" fill="#fed7aa" />
        {/* Graphite tip */}
        <polygon points="-1.5,-19 1.5,-19 0,-24" fill="#334155" />
        {/* Ferrule */}
        <rect x="-4" y="30" width="8" height="4" fill="#cbd5e1" />
        {/* Pink Eraser */}
        <rect x="-4" y="34" width="8" height="6" rx="2" fill="#f43f5e" />
      </g>
      {/* A second small blue crayon peeking next to it */}
      <g transform="translate(62, 46) rotate(-22)">
        <rect x="-3" y="-6" width="6" height="30" fill="#3b82f6" />
        <polygon points="-3,-6 3,-6 0,-14" fill="#fed7aa" />
        <polygon points="-1,-11 1,-11 0,-14" fill="#1d4ed8" />
      </g>
      {/* Front Wall of Pencil Case */}
      <path d="M 14 54 C 14 50 18 48 24 48 L 76 48 C 82 48 86 50 86 54 L 86 70 C 86 76 80 80 74 80 L 26 80 C 20 80 14 76 14 70 Z" fill="#06b6d4" />
      {/* Front Pocket / Stitching */}
      <path d="M 16 54 L 84 54" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Zipper Teeth Along Edge */}
      <line x1="16" y1="48" x2="84" y2="48" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="2 2" />
      {/* Zipper Pull Tab */}
      <circle cx="82" cy="48" r="3.5" fill="#f59e0b" />
      <rect x="80" y="48" width="4" height="8" rx="1.5" fill="#d97706" />
    </svg>
  ),

  'ruler in bag': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow */}
      <ellipse cx="50" cy="88" rx="34" ry="5" fill="#cbd5e1" opacity="0.6" />
      {/* Backpack Straps (Behind) */}
      <path d="M 32 38 C 22 42 16 64 22 76" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 68 38 C 78 42 84 64 78 76" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Backpack Top Loop */}
      <path d="M 42 32 C 42 22 58 22 58 32" stroke="#1e40af" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Backpack Main Body Interior Back */}
      <path d="M 24 46 C 24 34 34 30 50 30 C 66 30 76 34 76 46 L 76 80 C 76 86 70 88 50 88 C 30 88 24 86 24 80 Z" fill="#1e3a8a" />
      {/* RULER STICKING OUT OF THE OPEN BAG */}
      <g transform="translate(44, 12)">
        {/* Yellow Ruler Body */}
        <rect x="0" y="0" width="14" height="46" rx="2" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
        <rect x="2" y="2" width="10" height="42" fill="#fef08a" />
        {/* Centimeter Tick Marks */}
        <line x1="0" y1="4" x2="5" y2="4" stroke="#713f12" strokeWidth="1" />
        <line x1="0" y1="8" x2="3.5" y2="8" stroke="#713f12" strokeWidth="0.8" />
        <line x1="0" y1="12" x2="5" y2="12" stroke="#713f12" strokeWidth="1" />
        <line x1="0" y1="16" x2="3.5" y2="16" stroke="#713f12" strokeWidth="0.8" />
        <line x1="0" y1="20" x2="5" y2="20" stroke="#713f12" strokeWidth="1" />
        <line x1="0" y1="24" x2="3.5" y2="24" stroke="#713f12" strokeWidth="0.8" />
        <line x1="0" y1="28" x2="5" y2="28" stroke="#713f12" strokeWidth="1" />
        <line x1="0" y1="32" x2="3.5" y2="32" stroke="#713f12" strokeWidth="0.8" />
        <line x1="0" y1="36" x2="5" y2="36" stroke="#713f12" strokeWidth="1" />
        <line x1="0" y1="40" x2="3.5" y2="40" stroke="#713f12" strokeWidth="0.8" />
        {/* Numbers 1, 2, 3 */}
        <circle cx="9" cy="12" r="1.5" fill="#713f12" />
        <circle cx="9" cy="20" r="1.5" fill="#713f12" />
        <circle cx="9" cy="28" r="1.5" fill="#713f12" />
      </g>
      {/* Backpack Main Front Body */}
      <path d="M 24 50 C 24 42 34 38 50 38 C 66 38 76 42 76 50 L 76 80 C 76 86 70 88 50 88 C 30 88 24 86 24 80 Z" fill="#2563eb" />
      {/* Curved Zipper Edge */}
      <path d="M 24 50 C 32 44 68 44 76 50" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3 2" fill="none" />
      {/* Front Zippered Pocket */}
      <rect x="32" y="62" width="36" height="20" rx="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
      <line x1="36" y1="67" x2="64" y2="67" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="2 1.5" />
      <circle cx="62" cy="67" r="2.5" fill="#f59e0b" />
    </svg>
  ),

  'green eyes': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Background Soft Glow */}
      <ellipse cx="50" cy="50" rx="46" ry="32" fill="#ecfdf5" opacity="0.7" />
      {/* Left Eyebrow */}
      <path d="M 18 34 Q 30 26 42 33" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Right Eyebrow */}
      <path d="M 58 33 Q 70 26 82 34" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* LEFT EYE */}
      <g id="leftGreenEye">
        {/* Eye White (Sclera) */}
        <path d="M 14 54 C 18 40 40 40 44 54 C 40 68 18 68 14 54 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        {/* Vibrant Emerald Iris Outer Ring */}
        <circle cx="29" cy="54" r="11" fill="#047857" />
        {/* Bright Green Iris Body */}
        <circle cx="29" cy="54" r="9.5" fill="#10b981" />
        {/* Vivid Light Green Accent */}
        <circle cx="29" cy="54" r="7" fill="#34d399" />
        {/* Pupil */}
        <circle cx="29" cy="54" r="5" fill="#0f172a" />
        {/* Sparkling Catchlight / Highlights */}
        <circle cx="26" cy="50.5" r="3.2" fill="#ffffff" />
        <circle cx="32" cy="56.5" r="1.5" fill="#ffffff" />
        {/* Eyelid shadow */}
        <path d="M 16 50 C 22 42 36 42 42 50" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      </g>
      {/* RIGHT EYE */}
      <g id="rightGreenEye">
        {/* Eye White (Sclera) */}
        <path d="M 56 54 C 60 40 82 40 86 54 C 82 68 60 68 56 54 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        {/* Vibrant Emerald Iris Outer Ring */}
        <circle cx="71" cy="54" r="11" fill="#047857" />
        {/* Bright Green Iris Body */}
        <circle cx="71" cy="54" r="9.5" fill="#10b981" />
        {/* Vivid Light Green Accent */}
        <circle cx="71" cy="54" r="7" fill="#34d399" />
        {/* Pupil */}
        <circle cx="71" cy="54" r="5" fill="#0f172a" />
        {/* Sparkling Catchlight / Highlights */}
        <circle cx="68" cy="50.5" r="3.2" fill="#ffffff" />
        <circle cx="74" cy="56.5" r="1.5" fill="#ffffff" />
        {/* Eyelid shadow */}
        <path d="M 58 50 C 64 42 78 42 84 50" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      </g>
      {/* Subtle cute nose hint between eyes */}
      <path d="M 48 58 Q 50 61 52 58" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  'red car': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow */}
      <ellipse cx="50" cy="84" rx="38" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* Car Body (Lower) */}
      <path d="M 12 68 C 12 60 16 56 26 56 L 76 56 C 86 56 90 62 90 70 L 88 74 C 88 77 84 78 78 78 L 22 78 C 16 78 12 75 12 68 Z" fill="#dc2626" />
      {/* Gloss Highlight on side */}
      <path d="M 16 64 L 86 64 L 84 70 L 16 70 Z" fill="#ef4444" opacity="0.9" />
      {/* Cabin / Roof */}
      <path d="M 26 56 L 36 38 C 38 35 42 34 46 34 L 68 34 C 73 34 76 37 78 42 L 84 56 Z" fill="#ef4444" />
      {/* Windows */}
      {/* Front Windshield */}
      <polygon points="69,38 78,54 82,54 74,38" fill="#bae6fd" />
      {/* Front Door Window */}
      <polygon points="54,38 54,54 75,54 67,38" fill="#e0f2fe" />
      {/* Rear Door Window */}
      <polygon points="38,40 38,54 51,54 51,38 43,38" fill="#e0f2fe" />
      {/* Window Pillar */}
      <rect x="51" y="36" width="3" height="18" fill="#dc2626" />
      {/* Window shine glare */}
      <line x1="45" y1="40" x2="42" y2="52" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="40" x2="59" y2="52" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Front Headlight (Yellow Glow) */}
      <path d="M 86 64 C 89 64 91 66 91 69 L 85 70 Z" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
      {/* Rear Taillight */}
      <path d="M 12 64 C 11 66 11 68 12 70 L 14 70 Z" fill="#991b1b" />
      {/* Wheels */}
      {/* Left Wheel */}
      <circle cx="28" cy="76" r="10" fill="#1e293b" />
      <circle cx="28" cy="76" r="6" fill="#94a3b8" />
      <circle cx="28" cy="76" r="3" fill="#cbd5e1" />
      {/* Right Wheel */}
      <circle cx="74" cy="76" r="10" fill="#1e293b" />
      <circle cx="74" cy="76" r="6" fill="#94a3b8" />
      <circle cx="74" cy="76" r="3" fill="#cbd5e1" />
      {/* Door Handle */}
      <rect x="46" y="59" width="5" height="1.8" rx="0.9" fill="#94a3b8" />
    </svg>
  ),

  'car': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground Shadow */}
      <ellipse cx="50" cy="84" rx="38" ry="6" fill="#cbd5e1" opacity="0.6" />
      {/* Car Body (Lower) */}
      <path d="M 12 68 C 12 60 16 56 26 56 L 76 56 C 86 56 90 62 90 70 L 88 74 C 88 77 84 78 78 78 L 22 78 C 16 78 12 75 12 68 Z" fill="#dc2626" />
      {/* Gloss Highlight on side */}
      <path d="M 16 64 L 86 64 L 84 70 L 16 70 Z" fill="#ef4444" opacity="0.9" />
      {/* Cabin / Roof */}
      <path d="M 26 56 L 36 38 C 38 35 42 34 46 34 L 68 34 C 73 34 76 37 78 42 L 84 56 Z" fill="#ef4444" />
      {/* Windows */}
      {/* Front Windshield */}
      <polygon points="69,38 78,54 82,54 74,38" fill="#bae6fd" />
      {/* Front Door Window */}
      <polygon points="54,38 54,54 75,54 67,38" fill="#e0f2fe" />
      {/* Rear Door Window */}
      <polygon points="38,40 38,54 51,54 51,38 43,38" fill="#e0f2fe" />
      {/* Window Pillar */}
      <rect x="51" y="36" width="3" height="18" fill="#dc2626" />
      {/* Window shine glare */}
      <line x1="45" y1="40" x2="42" y2="52" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="40" x2="59" y2="52" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Front Headlight (Yellow Glow) */}
      <path d="M 86 64 C 89 64 91 66 91 69 L 85 70 Z" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
      {/* Rear Taillight */}
      <path d="M 12 64 C 11 66 11 68 12 70 L 14 70 Z" fill="#991b1b" />
      {/* Wheels */}
      {/* Left Wheel */}
      <circle cx="28" cy="76" r="10" fill="#1e293b" />
      <circle cx="28" cy="76" r="6" fill="#94a3b8" />
      <circle cx="28" cy="76" r="3" fill="#cbd5e1" />
      {/* Right Wheel */}
      <circle cx="74" cy="76" r="10" fill="#1e293b" />
      <circle cx="74" cy="76" r="6" fill="#94a3b8" />
      <circle cx="74" cy="76" r="3" fill="#cbd5e1" />
      {/* Door Handle */}
      <rect x="46" y="59" width="5" height="1.8" rx="0.9" fill="#94a3b8" />
    </svg>
  ),

  'pictures': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Wall Shadow under frames */}
      <rect x="8" y="24" width="38" height="48" rx="4" fill="#64748b" opacity="0.15" />
      <rect x="54" y="24" width="38" height="48" rx="4" fill="#64748b" opacity="0.15" />

      {/* Picture 1 (Left - Sunny hills landscape) */}
      <g id="pictureLeft">
        {/* Hanging string & nail */}
        <line x1="26" y1="14" x2="16" y2="22" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="26" y1="14" x2="36" y2="22" stroke="#94a3b8" strokeWidth="1.2" />
        <circle cx="26" cy="14" r="1.8" fill="#475569" />
        {/* Wooden Frame */}
        <rect x="8" y="22" width="36" height="46" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        <rect x="12" y="26" width="28" height="38" rx="1.5" fill="#fefce8" />
        {/* Landscape Painting Inside */}
        <g clipPath="url(#picClip1)">
          <defs>
            <clipPath id="picClip1">
              <rect x="12" y="26" width="28" height="38" rx="1.5" />
            </clipPath>
          </defs>
          {/* Sky */}
          <rect x="12" y="26" width="28" height="24" fill="#bae6fd" />
          {/* Sun */}
          <circle cx="32" cy="34" r="4.5" fill="#facc15" />
          {/* Rolling Green Hills */}
          <ellipse cx="18" cy="52" rx="14" ry="10" fill="#22c55e" />
          <ellipse cx="32" cy="54" rx="16" ry="11" fill="#16a34a" />
          {/* Cute Tree */}
          <rect x="23" y="44" width="2" height="6" fill="#78350f" />
          <circle cx="24" cy="42" r="4.5" fill="#15803d" />
        </g>
        {/* Inner frame bevel highlight */}
        <rect x="12" y="26" width="28" height="38" stroke="#d97706" strokeWidth="0.8" fill="none" opacity="0.4" />
      </g>

      {/* Picture 2 (Right - Sailboat on the sea) */}
      <g id="pictureRight">
        {/* Hanging string & nail */}
        <line x1="72" y1="14" x2="62" y2="22" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="72" y1="14" x2="82" y2="22" stroke="#94a3b8" strokeWidth="1.2" />
        <circle cx="72" cy="14" r="1.8" fill="#475569" />
        {/* Wooden Frame */}
        <rect x="54" y="22" width="36" height="46" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        <rect x="58" y="26" width="28" height="38" rx="1.5" fill="#fefce8" />
        {/* Seascape Painting Inside */}
        <g clipPath="url(#picClip2)">
          <defs>
            <clipPath id="picClip2">
              <rect x="58" y="26" width="28" height="38" rx="1.5" />
            </clipPath>
          </defs>
          {/* Sunset Sky */}
          <rect x="58" y="26" width="28" height="22" fill="#fed7aa" />
          <circle cx="66" cy="38" r="4" fill="#fb923c" />
          {/* Blue Sea */}
          <rect x="58" y="44" width="28" height="20" fill="#0284c7" />
          <path d="M 58 44 Q 65 42 72 44 Q 79 46 86 44 L 86 64 L 58 64 Z" fill="#0369a1" />
          {/* Sailboat */}
          <polygon points="69,45 77,45 75,48 71,48" fill="#ffffff" />
          <polygon points="73,38 73,44 77,44" fill="#ef4444" />
          <polygon points="73,39 73,44 70,44" fill="#ffffff" />
        </g>
        {/* Inner frame bevel highlight */}
        <rect x="58" y="26" width="28" height="38" stroke="#d97706" strokeWidth="0.8" fill="none" opacity="0.4" />
      </g>
    </svg>
  ),
  'shelf': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Wall Shelf with brackets */}
      {/* Wooden shelf board */}
      <rect x="12" y="52" width="76" height="10" rx="2" fill="#b45309" />
      <rect x="14" y="53" width="72" height="4" rx="1" fill="#d97706" opacity="0.8" />
      {/* Metal brackets underneath */}
      <path d="M 24 62 L 24 78 L 30 78 L 30 68 L 40 68 L 40 62 Z" fill="#475569" />
      <polygon points="28,68 28,74 34,68" fill="#334155" />
      <path d="M 70 62 L 70 78 L 76 78 L 76 68 L 86 68 L 86 62 Z" fill="#475569" />
      <polygon points="74,68 74,74 80,68" fill="#334155" />
      {/* Books on the shelf */}
      {/* Book 1 (blue) */}
      <rect x="22" y="28" width="9" height="24" rx="1.5" fill="#2563eb" />
      <rect x="24" y="30" width="5" height="20" fill="#3b82f6" />
      {/* Book 2 (red, leaning) */}
      <g transform="translate(35, 30) rotate(12)">
        <rect x="0" y="0" width="8" height="22" rx="1.5" fill="#ef4444" />
        <rect x="2" y="2" width="4" height="18" fill="#f87171" />
      </g>
      {/* Small potted plant */}
      <path d="M 64 42 L 74 42 L 72 52 L 66 52 Z" fill="#ea580c" />
      {/* Plant leaves */}
      <circle cx="69" cy="38" r="5" fill="#22c55e" />
      <circle cx="65" cy="35" r="4" fill="#16a34a" />
      <circle cx="73" cy="35" r="4" fill="#4ade80" />
    </svg>
  ),
  'shapes': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
      {/* Red Circle (top-left) */}
      <circle cx="32" cy="32" r="20" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
      <circle cx="28" cy="28" r="6" fill="#fca5a5" opacity="0.6" />

      {/* Blue Triangle (top-right) */}
      <polygon points="72,12 92,48 52,48" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
      <polygon points="72,20 84,44 60,44" fill="#93c5fd" opacity="0.5" />

      {/* Green Square (bottom-left) */}
      <rect x="14" y="56" width="34" height="34" rx="5" fill="#10b981" stroke="#047857" strokeWidth="2.5" />
      <rect x="18" y="60" width="12" height="12" rx="2" fill="#6ee7b7" opacity="0.6" />

      {/* Purple Star / Diamond (bottom-right) */}
      <polygon points="74,54 86,72 74,90 62,72" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2.5" />
      <polygon points="74,60 81,72 74,84 67,72" fill="#c4b5fd" opacity="0.6" />

      {/* Yellow Star in the center */}
      <polygon
        points="50,40 53,46 59,47 55,51 56,57 50,54 44,57 45,51 41,47 47,46"
        fill="#facc15"
        stroke="#ca8a04"
        strokeWidth="1.5"
      />
    </svg>
  ),
  'hug': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Heart background for warm friendly hug */}
      <path d="M 50 26 C 44 14, 26 14, 26 30 C 26 44, 42 56, 50 64 C 58 56, 74 44, 74 30 C 74 14, 56 14, 50 26 Z" fill="#fecdd3" opacity="0.6" />
      {/* Person Left (orange) */}
      <circle cx="38" cy="38" r="11" fill="#fb923c" />
      <path d="M 24 68 C 24 53, 34 50, 42 50 C 47 50, 52 52, 54 56 C 48 60, 44 68, 44 76 L 24 76 Z" fill="#f97316" />
      {/* Person Right (blue) hugging left */}
      <circle cx="62" cy="38" r="11" fill="#60a5fa" />
      <path d="M 76 68 C 76 53, 66 50, 58 50 C 53 50, 48 52, 46 56 C 52 60, 56 68, 56 76 L 76 76 Z" fill="#3b82f6" />
      {/* Arms wrapped around each other */}
      {/* Blue arm around orange body */}
      <path d="M 60 54 C 54 54, 38 56, 32 64 C 30 67, 33 70, 36 68 C 42 63, 50 60, 58 60 Z" fill="#2563eb" />
      {/* Orange arm around blue body */}
      <path d="M 40 54 C 46 54, 62 56, 68 64 C 70 67, 67 70, 64 68 C 58 63, 50 60, 42 60 Z" fill="#ea580c" />
      {/* Little warm smile sparkles */}
      <circle cx="50" cy="18" r="2" fill="#e11d48" />
    </svg>
  ),
  'friend': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Two best friends side by side with arm over shoulder */}
      {/* Friend 1 - Left (purple sweater) */}
      <circle cx="36" cy="32" r="12" fill="#fbcfe8" />
      {/* Hair 1 */}
      <path d="M 24 30 C 24 20, 48 20, 48 30 C 44 26, 28 26, 24 30 Z" fill="#78350f" />
      {/* Smile 1 */}
      <path d="M 33 36 Q 36 40 39 36" stroke="#9d174d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="32" r="1.5" fill="#475569" />
      <circle cx="40" cy="32" r="1.5" fill="#475569" />
      {/* Body 1 */}
      <rect x="23" y="46" width="26" height="32" rx="6" fill="#8b5cf6" />

      {/* Friend 2 - Right (teal sweater) */}
      <circle cx="64" cy="32" r="12" fill="#fed7aa" />
      {/* Hair 2 */}
      <path d="M 52 28 C 52 18, 76 18, 76 28 C 72 24, 56 24, 52 28 Z" fill="#b45309" />
      {/* Smile 2 */}
      <path d="M 61 36 Q 64 40 67 36" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="32" r="1.5" fill="#475569" />
      <circle cx="68" cy="32" r="1.5" fill="#475569" />
      {/* Body 2 */}
      <rect x="51" y="46" width="26" height="32" rx="6" fill="#06b6d4" />

      {/* Arm around shoulder connecting them */}
      <path d="M 46 50 C 49 46, 53 46, 56 50 L 53 58 C 51 55, 48 55, 46 56 Z" fill="#7c3aed" />
      {/* Friendly little heart between heads */}
      <path d="M 50 20 C 47 16, 42 17, 42 21 C 42 25, 50 29, 50 31 C 50 29, 58 25, 58 21 C 58 17, 53 16, 50 20 Z" fill="#ec4899" />
    </svg>
  ),
  'floor': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Wall at the top */}
      <rect x="10" y="10" width="80" height="25" fill="#f8fafc" />
      {/* Baseboard / skirting board */}
      <rect x="10" y="33" width="80" height="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="10" y="37" width="80" height="2" fill="#94a3b8" />
      {/* Wooden parquet floor with planks in perspective */}
      <rect x="10" y="39" width="80" height="51" fill="#d97706" rx="2" />
      {/* Floor planks with rich warm wood tones */}
      {/* Row 1 */}
      <rect x="10" y="39" width="28" height="12" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
      <rect x="38" y="39" width="34" height="12" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
      <rect x="72" y="39" width="18" height="12" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
      {/* Row 2 */}
      <rect x="10" y="51" width="46" height="13" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
      <rect x="56" y="51" width="34" height="13" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
      {/* Row 3 */}
      <rect x="10" y="64" width="22" height="13" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
      <rect x="32" y="64" width="42" height="13" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
      <rect x="74" y="64" width="16" height="13" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
      {/* Row 4 */}
      <rect x="10" y="77" width="50" height="13" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
      <rect x="60" y="77" width="30" height="13" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
      {/* Wood grain highlights */}
      <line x1="14" y1="45" x2="32" y2="45" stroke="#fef3c7" strokeWidth="0.6" opacity="0.4" />
      <line x1="42" y1="57" x2="80" y2="57" stroke="#fef3c7" strokeWidth="0.6" opacity="0.4" />
      <line x1="16" y1="70" x2="48" y2="70" stroke="#fef3c7" strokeWidth="0.6" opacity="0.4" />
    </svg>
  ),

  'roof': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Chimney on the roof */}
      <rect x="66" y="22" width="10" height="24" fill="#b91c1c" />
      <rect x="64" y="20" width="14" height="4" rx="1" fill="#7f1d1d" />
      <circle cx="71" cy="14" r="3" fill="#94a3b8" opacity="0.6" />
      <circle cx="75" cy="8" r="4" fill="#cbd5e1" opacity="0.4" />
      {/* Triangular tiled roof */}
      <polygon points="50,18 92,66 8,66" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
      {/* Roof tile layers */}
      <path d="M 24 50 Q 50 48 76 50" stroke="#b91c1c" strokeWidth="2.5" fill="none" />
      <path d="M 16 60 Q 50 58 84 60" stroke="#b91c1c" strokeWidth="2.5" fill="none" />
      <path d="M 32 40 Q 50 38 68 40" stroke="#b91c1c" strokeWidth="2.5" fill="none" />
      {/* Ridge cap at peak */}
      <polygon points="50,14 56,22 44,22" fill="#7f1d1d" />
      {/* Under roof attic wall & window */}
      <rect x="18" y="66" width="64" height="24" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
      {/* Attic round window */}
      <circle cx="50" cy="78" r="9" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      <line x1="50" y1="69" x2="50" y2="87" stroke="#0284c7" strokeWidth="1.2" />
      <line x1="41" y1="78" x2="59" y2="78" stroke="#0284c7" strokeWidth="1.2" />
    </svg>
  ),
  'fridge': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Refrigerator outer body */}
      <rect x="24" y="10" width="52" height="80" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
      {/* Top freezer door */}
      <rect x="27" y="13" width="46" height="26" rx="3" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
      {/* Top handle */}
      <rect x="31" y="24" width="3" height="12" rx="1.5" fill="#0369a1" />
      {/* Fridge magnet on freezer */}
      <circle cx="58" cy="22" r="3.5" fill="#ef4444" />
      <polygon points="46,20 48,25 43,22" fill="#eab308" />
      {/* Divider line between freezer and main fridge */}
      <line x1="25" y1="41" x2="75" y2="41" stroke="#0284c7" strokeWidth="2" />
      {/* Bottom main compartment door */}
      <rect x="27" y="43" width="46" height="44" rx="3" fill="#ffffff" stroke="#bae6fd" strokeWidth="1" />
      {/* Bottom handle */}
      <rect x="31" y="47" width="3" height="22" rx="1.5" fill="#0369a1" />
      {/* Colorful cute magnets on door */}
      <rect x="52" y="52" width="8" height="10" rx="1" fill="#8b5cf6" />
      <circle cx="66" cy="62" r="4" fill="#10b981" />
      {/* Fridge feet */}
      <rect x="28" y="90" width="8" height="4" rx="1" fill="#64748b" />
      <rect x="64" y="90" width="8" height="4" rx="1" fill="#64748b" />
    </svg>
  ),
  'claws': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Paw pad base */}
      <path d="M 32 54 C 24 54, 20 66, 26 76 C 32 86, 68 86, 74 76 C 80 66, 76 54, 68 54 C 60 54, 56 60, 50 60 C 44 60, 40 54, 32 54 Z" fill="#fb923c" stroke="#ea580c" strokeWidth="2" />
      {/* Center main pad */}
      <ellipse cx="50" cy="72" rx="15" ry="10" fill="#fed7aa" />
      {/* 4 Toe pads with extended sharp claws */}
      {/* Toe 1 (Left) */}
      <ellipse cx="26" cy="46" rx="7" ry="8" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
      <path d="M 23 40 Q 20 24 16 18 Q 25 24 28 38 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
      {/* Toe 2 (Center Left) */}
      <ellipse cx="42" cy="38" rx="7" ry="9" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
      <path d="M 39 30 Q 38 12 34 8 Q 44 14 45 28 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
      {/* Toe 3 (Center Right) */}
      <ellipse cx="58" cy="38" rx="7" ry="9" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
      <path d="M 61 30 Q 62 12 66 8 Q 56 14 55 28 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
      {/* Toe 4 (Right) */}
      <ellipse cx="74" cy="46" rx="7" ry="8" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
      <path d="M 77 40 Q 80 24 84 18 Q 75 24 72 38 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
    </svg>
  ),
  'fur': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Warm soft background */}
      <circle cx="50" cy="50" r="42" fill="#fef3c7" opacity="0.6" />
      {/* Ginger kitten / fox curled up displaying its lush fur coat */}
      <ellipse cx="50" cy="54" rx="34" ry="26" fill="#b45309" />
      <ellipse cx="50" cy="54" rx="32" ry="24" fill="#d97706" />
      {/* Dense layers of fluffy fur strands and tufts */}
      <path d="M 22 52 C 26 44, 38 42, 46 44 C 42 46, 30 48, 22 52 Z" fill="#f59e0b" />
      <path d="M 32 40 C 40 34, 56 34, 66 40 C 60 42, 44 42, 32 40 Z" fill="#fbbf24" />
      <path d="M 54 42 C 64 44, 76 46, 78 54 C 72 50, 60 48, 54 42 Z" fill="#f59e0b" />
      <path d="M 36 50 C 44 48, 52 48, 58 52 C 54 54, 46 54, 36 50 Z" fill="#fef3c7" />
      <path d="M 38 56 C 46 54, 56 54, 64 58 C 58 60, 48 60, 38 56 Z" fill="#fef3c7" />
      <path d="M 30 62 C 40 60, 52 60, 60 64 C 52 66, 40 66, 30 62 Z" fill="#fde68a" />
      {/* Individual fine silky fur hairs radiating out */}
      <path d="M 20 48 Q 14 44 12 40" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 22 42 Q 18 36 16 32" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 26 36 Q 24 28 24 22" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 78 48 Q 84 44 88 40" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 76 42 Q 82 36 84 32" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 72 36 Q 76 28 76 22" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      {/* Fluffy tail wrapping around */}
      <path d="M 24 64 C 20 72, 32 82, 48 82 C 64 82, 78 76, 80 66 C 72 74, 56 78, 44 76 C 34 74, 26 70, 24 64 Z" fill="#ea580c" stroke="#b45309" strokeWidth="1.2" />
      <path d="M 44 78 C 52 78, 62 76, 72 72" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Magnifying lens showing super-fluffy soft fur texture in zoom */}
      <g transform="translate(48, 14)">
        <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
        <clipPath id="furLensClip">
          <circle cx="20" cy="20" r="12.5" />
        </clipPath>
        <g clipPath="url(#furLensClip)">
          <rect x="6" y="6" width="28" height="28" fill="#f59e0b" />
          <path d="M 10 32 Q 16 18 20 10" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 14 34 Q 20 20 24 12" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 18 34 Q 24 22 28 14" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 22 34 Q 27 24 32 16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <line x1="30" y1="30" x2="42" y2="42" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  ),
  'christmas': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <circle cx="50" cy="50" r="44" fill="#f0fdf4" />
      <rect x="45" y="70" width="10" height="15" rx="2" fill="#78350f" />
      <polygon points="50,18 24,44 36,44 18,65 82,65 64,44 76,44" fill="#15803d" />
      <polygon points="50,18 27,42 38,42 22,63 78,63 62,42 73,42" fill="#16a34a" />
      <polygon points="50,22 34,40 42,40 28,58 72,58 58,40 66,40" fill="#22c55e" opacity="0.6" />
      <polygon points="50,10 52,15 58,16 54,20 55,26 50,23 45,26 46,20 42,16 48,15" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <path d="M 32 38 Q 44 44 56 36 Q 64 42 70 38" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="1.5 2" fill="none" />
      <path d="M 24 56 Q 40 64 60 54 Q 70 60 78 56" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="1.5 2" fill="none" />
      <circle cx="36" cy="36" r="3.5" fill="#ef4444" />
      <circle cx="35" cy="35" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="62" cy="34" r="3" fill="#3b82f6" />
      <circle cx="61" cy="33" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="30" cy="52" r="3.5" fill="#eab308" />
      <circle cx="50" cy="46" r="4" fill="#ef4444" />
      <circle cx="49" cy="45" r="1.2" fill="#ffffff" opacity="0.8" />
      <circle cx="68" cy="50" r="3.5" fill="#ec4899" />
      <circle cx="44" cy="60" r="3.5" fill="#3b82f6" />
      <rect x="22" y="70" width="18" height="18" rx="2" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      <rect x="29" y="70" width="4" height="18" fill="#facc15" />
      <rect x="22" y="77" width="18" height="4" fill="#facc15" />
      <path d="M 28 70 C 26 66 31 66 31 70 C 31 66 36 66 34 70" stroke="#facc15" strokeWidth="1.8" fill="none" />
      <rect x="60" y="68" width="20" height="20" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
      <rect x="68" y="68" width="4" height="20" fill="#4ade80" />
      <rect x="60" y="76" width="20" height="4" fill="#4ade80" />
      <path d="M 68 68 C 66 64 70 64 70 68 C 70 64 74 64 72 68" stroke="#4ade80" strokeWidth="1.8" fill="none" />
      <circle cx="16" cy="24" r="1.5" fill="#facc15" />
      <circle cx="84" cy="28" r="1.5" fill="#facc15" />
      <circle cx="80" cy="18" r="1" fill="#60a5fa" />
    </svg>
  ),
  'costume': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <path d="M 50 16 C 50 12, 56 12, 56 16 C 56 19, 50 20, 50 24" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 24 34 L 50 24 L 76 34" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      <path d="M 32 30 C 20 45, 14 68, 16 86 C 30 84, 40 85, 50 86 C 60 85, 70 84, 84 86 C 86 68, 80 45, 68 30 Z" fill="#7c3aed" stroke="#5b21b6" strokeWidth="1.5" />
      <path d="M 28 32 C 22 55, 20 72, 22 83" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" fill="none" />
      <path d="M 32 32 L 68 32 L 64 72 L 36 72 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
      <rect x="34" y="62" width="32" height="6" fill="#eab308" />
      <circle cx="50" cy="65" r="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <polygon points="50,40 52,44 57,45 53,48 54,53 50,50 46,53 47,48 43,45 48,44" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <path d="M 36 18 C 42 16, 46 22, 50 19 C 54 22, 58 16, 64 18 C 66 24, 60 28, 50 26 C 40 28, 34 24, 36 18 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" />
      <ellipse cx="43" cy="21" rx="3" ry="2" fill="#ffffff" />
      <ellipse cx="57" cy="21" rx="3" ry="2" fill="#ffffff" />
      <polygon points="82,22 84,26 88,27 85,30 86,34 82,32 78,34 79,30 76,27 80,26" fill="#facc15" />
      <polygon points="18,36 19,39 22,40 20,42 20,45 18,43 16,45 16,42 14,40 17,39" fill="#facc15" />
    </svg>
  ),
  'dress up': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="88" x2="92" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 3" />
      <rect x="62" y="16" width="28" height="68" rx="14" fill="#f1f5f9" stroke="#b45309" strokeWidth="2.5" />
      <rect x="65" y="19" width="22" height="62" rx="11" fill="#e0f2fe" />
      <line x1="68" y1="28" x2="84" y2="44" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="72" y1="26" x2="84" y2="38" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M 28 44 C 18 52, 16 68, 14 78 C 24 78, 32 76, 38 72 Z" fill="#ef4444" opacity="0.9" />
      <rect x="30" y="66" width="5" height="18" fill="#1e293b" />
      <rect x="38" y="66" width="5" height="18" fill="#1e293b" />
      <ellipse cx="31" cy="84" rx="4.5" ry="3" fill="#3b82f6" />
      <ellipse cx="42" cy="84" rx="4.5" ry="3" fill="#3b82f6" />
      <rect x="27" y="44" width="18" height="24" rx="3" fill="#3b82f6" />
      <rect x="27" y="58" width="18" height="4" fill="#facc15" />
      <circle cx="36" cy="34" r="9" fill="#fed7aa" />
      <circle cx="39" cy="33" r="1.2" fill="#0f172a" />
      <path d="M 38 37 Q 41 39 43 36" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 23 29 C 30 26, 42 26, 49 29 C 45 28, 43 14, 34 12 C 32 18, 27 28, 23 29 Z" fill="#7c3aed" stroke="#5b21b6" strokeWidth="1.2" />
      <polygon points="34,12 38,10 37,15" fill="#facc15" />
      <path d="M 38 48 L 52 40" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="42" x2="58" y2="34" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <polygon points="59,32 60,35 63,35 61,37 62,40 59,38 56,40 57,37 55,35 58,35" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="54" cy="24" r="1.5" fill="#facc15" />
      <circle cx="48" cy="18" r="1.2" fill="#38bdf8" />
    </svg>
  ),
  'clothes': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="88" x2="92" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 3" />
      <g>
        <path d="M 25 18 C 25 14, 30 14, 30 18 C 30 20, 25 21, 25 24" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M 14 30 L 25 24 L 36 30" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <path d="M 20 28 L 30 28 L 34 44 L 40 72 L 10 72 L 16 44 Z" fill="#ec4899" stroke="#be185d" strokeWidth="1.2" />
        <circle cx="25" cy="36" r="1.5" fill="#ffffff" />
        <circle cx="25" cy="44" r="1.5" fill="#ffffff" />
        <circle cx="18" cy="62" r="1.2" fill="#fbcfe8" />
        <circle cx="26" cy="58" r="1.2" fill="#fbcfe8" />
        <circle cx="33" cy="64" r="1.2" fill="#fbcfe8" />
      </g>
      <g transform="translate(44, 24)">
        <rect x="4" y="8" width="38" height="24" rx="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
        <path d="M 17 8 Q 23 14 29 8" stroke="#ca8a04" strokeWidth="1.5" fill="#fef08a" />
        <line x1="4" y1="14" x2="12" y2="14" stroke="#ca8a04" strokeWidth="1" />
        <line x1="34" y1="14" x2="42" y2="14" stroke="#ca8a04" strokeWidth="1" />
      </g>
      <g transform="translate(42, 54)">
        <rect x="4" y="0" width="44" height="26" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.2" />
        <line x1="4" y1="6" x2="48" y2="6" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 1" />
        <path d="M 12 6 Q 20 18 30 6" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 1" fill="none" />
        <rect x="24" y="2" width="3" height="4" fill="#1e40af" />
        <line x1="4" y1="18" x2="48" y2="18" stroke="#1d4ed8" strokeWidth="1.5" />
      </g>
      <g transform="translate(14, 76)">
        <path d="M 2 8 C 2 4, 8 4, 12 4 L 18 4 C 22 2, 28 2, 30 6 L 30 11 L 2 11 Z" fill="#10b981" />
        <rect x="0" y="10" width="32" height="3" rx="1.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
        <line x1="12" y1="4" x2="18" y2="8" stroke="#ffffff" strokeWidth="1.2" />
      </g>
    </svg>
  ),
  'pocket': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <rect x="10" y="10" width="80" height="80" rx="6" fill="#1e40af" />
      <line x1="12" y1="20" x2="88" y2="20" stroke="#1d4ed8" strokeWidth="0.8" />
      <line x1="12" y1="35" x2="88" y2="35" stroke="#1d4ed8" strokeWidth="0.8" />
      <line x1="12" y1="50" x2="88" y2="50" stroke="#1d4ed8" strokeWidth="0.8" />
      <line x1="12" y1="65" x2="88" y2="65" stroke="#1d4ed8" strokeWidth="0.8" />
      <rect x="52" y="16" width="8" height="24" rx="2" fill="#ef4444" transform="rotate(12 52 16)" />
      <rect x="52" y="22" width="8" height="4" fill="#ffffff" transform="rotate(12 52 16)" />
      <rect x="36" y="18" width="6" height="22" rx="1" fill="#facc15" transform="rotate(-8 36 18)" />
      <path d="M 22 34 L 78 34 L 78 64 C 78 78, 62 86, 50 88 C 38 86, 22 78, 22 64 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
      <path d="M 25 37 L 75 37 L 75 63 C 75 75, 60 82, 50 84 C 40 82, 25 75, 25 63 Z" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
      <path d="M 27 39 L 73 39 L 73 62 C 73 73, 59 79, 50 81 C 41 79, 27 73, 27 62 Z" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
      <path d="M 32 46 Q 42 54 50 49 Q 58 54 68 46" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="2.5 1.5" fill="none" />
      <circle cx="23" cy="35" r="2.5" fill="#d97706" stroke="#78350f" strokeWidth="0.6" />
      <circle cx="23" cy="35" r="1" fill="#fde68a" />
      <circle cx="77" cy="35" r="2.5" fill="#d97706" stroke="#78350f" strokeWidth="0.6" />
      <circle cx="77" cy="35" r="1" fill="#fde68a" />
    </svg>
  ),
  'button': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <circle cx="50" cy="53" r="38" fill="#0e7490" opacity="0.25" />
      <circle cx="50" cy="50" r="38" fill="#0891b2" stroke="#0e7490" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="34" fill="#06b6d4" />
      <path d="M 24 32 C 32 20, 68 20, 76 32" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <circle cx="50" cy="50" r="22" fill="#0891b2" stroke="#155e75" strokeWidth="1.8" />
      <circle cx="41" cy="41" r="4.5" fill="#164e63" />
      <circle cx="59" cy="41" r="4.5" fill="#164e63" />
      <circle cx="41" cy="59" r="4.5" fill="#164e63" />
      <circle cx="59" cy="59" r="4.5" fill="#164e63" />
      <circle cx="41" cy="41" r="3" fill="#0f172a" />
      <circle cx="59" cy="41" r="3" fill="#0f172a" />
      <circle cx="41" cy="59" r="3" fill="#0f172a" />
      <circle cx="59" cy="59" r="3" fill="#0f172a" />
      <line x1="41" y1="41" x2="59" y2="59" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
      <line x1="59" y1="41" x2="41" y2="59" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
      <line x1="41" y1="41" x2="59" y2="59" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'garage': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="90" x2="94" y2="90" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="18,90 82,90 76,78 24,78" fill="#94a3b8" opacity="0.4" />
      <rect x="14" y="32" width="72" height="52" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="2" />
      <polygon points="50,12 8,32 92,32" fill="#334155" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="50,16 16,32 84,32" fill="#475569" />
      <line x1="14" y1="46" x2="22" y2="46" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="14" y1="62" x2="22" y2="62" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="78" y1="46" x2="86" y2="46" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="78" y1="62" x2="86" y2="62" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="22" y="38" width="56" height="46" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
      <rect x="23" y="39" width="54" height="20" fill="#cbd5e1" />
      <line x1="23" y1="44" x2="77" y2="44" stroke="#64748b" strokeWidth="1.2" />
      <line x1="23" y1="49" x2="77" y2="49" stroke="#64748b" strokeWidth="1.2" />
      <line x1="23" y1="54" x2="77" y2="54" stroke="#64748b" strokeWidth="1.2" />
      <line x1="23" y1="59" x2="77" y2="59" stroke="#475569" strokeWidth="1.5" />
      <path d="M 33 64 L 67 64 L 63 56 L 37 56 Z" fill="#38bdf8" stroke="#1e40af" strokeWidth="1" />
      <rect x="28" y="64" width="44" height="16" rx="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
      <circle cx="34" cy="71" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="66" cy="71" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
      <rect x="42" y="69" width="16" height="5" rx="1" fill="#334155" />
      <rect x="30" y="78" width="40" height="4" rx="2" fill="#cbd5e1" />
      <rect x="27" y="76" width="5" height="8" rx="1" fill="#0f172a" />
      <rect x="68" y="76" width="5" height="8" rx="1" fill="#0f172a" />
    </svg>
  ),
  'balcony': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <rect x="12" y="10" width="76" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="28" y="16" width="44" height="48" rx="2" fill="#e0f2fe" stroke="#64748b" strokeWidth="1.8" />
      <line x1="50" y1="16" x2="50" y2="64" stroke="#64748b" strokeWidth="1.5" />
      <line x1="28" y1="36" x2="72" y2="36" stroke="#64748b" strokeWidth="1" />
      <line x1="32" y1="20" x2="44" y2="32" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="54" y1="20" x2="66" y2="32" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M 29 17 Q 35 34 31 52 L 29 52 Z" fill="#fca5a5" opacity="0.7" />
      <path d="M 71 17 Q 65 34 69 52 L 71 52 Z" fill="#fca5a5" opacity="0.7" />
      <rect x="18" y="64" width="64" height="7" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
      <rect x="20" y="48" width="60" height="16" fill="none" stroke="#334155" strokeWidth="1.8" rx="1" />
      <line x1="26" y1="48" x2="26" y2="64" stroke="#334155" strokeWidth="1.4" />
      <line x1="34" y1="48" x2="34" y2="64" stroke="#334155" strokeWidth="1.4" />
      <line x1="42" y1="48" x2="42" y2="64" stroke="#334155" strokeWidth="1.4" />
      <line x1="50" y1="48" x2="50" y2="64" stroke="#334155" strokeWidth="1.4" />
      <line x1="58" y1="48" x2="58" y2="64" stroke="#334155" strokeWidth="1.4" />
      <line x1="66" y1="48" x2="66" y2="64" stroke="#334155" strokeWidth="1.4" />
      <line x1="74" y1="48" x2="74" y2="64" stroke="#334155" strokeWidth="1.4" />
      <rect x="28" y="56" width="44" height="9" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      <circle cx="34" cy="54" r="3" fill="#15803d" />
      <circle cx="42" cy="54" r="3.5" fill="#ec4899" />
      <circle cx="50" cy="54" r="3" fill="#ef4444" />
      <circle cx="58" cy="54" r="3.5" fill="#facc15" />
      <circle cx="66" cy="54" r="3.5" fill="#ec4899" />
    </svg>
  ),
  'light': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="10" y1="10" x2="90" y2="10" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="50" y1="10" x2="50" y2="28" stroke="#334155" strokeWidth="2" />
      <path d="M 40 28 L 60 28 L 68 40 L 32 40 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      <circle cx="50" cy="42" r="5" fill="#fef08a" stroke="#f59e0b" strokeWidth="1.2" />
      <polygon points="46,43 54,43 88,88 12,88" fill="#fef08a" opacity="0.45" />
      <polygon points="48,43 52,43 76,88 24,88" fill="#fef9c3" opacity="0.5" />
      <line x1="50" y1="46" x2="50" y2="86" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <line x1="48" y1="46" x2="28" y2="86" stroke="#facc15" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
      <line x1="52" y1="46" x2="72" y2="86" stroke="#facc15" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
      <ellipse cx="50" cy="88" rx="36" ry="6" fill="#fef08a" opacity="0.7" />
      <line x1="8" y1="90" x2="92" y2="90" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <polygon points="50,56 51,59 54,60 51,61 50,64 49,61 46,60 49,59" fill="#f59e0b" />
      <polygon points="34,68 35,70 37,71 35,72 34,74 33,72 31,71 33,70" fill="#f59e0b" />
      <polygon points="66,66 67,68 69,69 67,70 66,72 65,70 63,69 65,68" fill="#f59e0b" />
    </svg>
  ),
  'messy': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <rect x="8" y="10" width="84" height="50" fill="#f8fafc" />
      <rect x="8" y="60" width="84" height="30" fill="#fde68a" opacity="0.5" />
      <line x1="8" y1="60" x2="92" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <g transform="rotate(-15 30 25)">
        <rect x="20" y="18" width="22" height="16" fill="#ffffff" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="31" cy="26" r="4" fill="#f59e0b" />
      </g>
      <g transform="translate(56, 32)">
        <rect x="6" y="8" width="4" height="28" fill="#b45309" />
        <rect x="22" y="8" width="4" height="28" fill="#b45309" />
        <rect x="4" y="24" width="24" height="4" fill="#d97706" />
        <path d="M 8 22 C 8 32, 2 36, 4 42" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 8 26 L 6 26" stroke="#ffffff" strokeWidth="1.2" />
        <path d="M 6 32 L 4 32" stroke="#ffffff" strokeWidth="1.2" />
        <path d="M 2 12 Q 14 6 26 14 Q 22 24 12 22 Z" fill="#7c3aed" opacity="0.9" />
      </g>
      <path d="M 16 68 Q 24 64 30 70 Q 28 78 20 76 Q 14 74 16 68 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      <polygon points="34,76 42,70 50,76 48,82 42,78 36,82" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
      <rect x="24" y="80" width="14" height="6" rx="2" fill="#3b82f6" transform="rotate(25 24 80)" />
      <rect x="58" y="74" width="8" height="8" rx="1" fill="#10b981" stroke="#047857" strokeWidth="0.8" />
      <rect x="68" y="78" width="7" height="7" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" transform="rotate(18 68 78)" />
      <circle cx="78" cy="68" r="6" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
      <path d="M 74 68 Q 78 64 82 68" stroke="#ffffff" strokeWidth="1.2" fill="none" />
      <path d="M 48 64 Q 54 62 56 68" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  ),
  'flat': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <rect x="8" y="10" width="84" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="8" y="82" width="84" height="8" fill="#d97706" />
      <line x1="8" y1="82" x2="92" y2="82" stroke="#b45309" strokeWidth="1.5" />
      <rect x="26" y="18" width="48" height="64" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />
      <rect x="28" y="20" width="44" height="62" rx="1" fill="#b45309" />
      <rect x="33" y="26" width="34" height="22" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1.2" />
      <rect x="33" y="52" width="34" height="26" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1.2" />
      <rect x="42" y="32" width="16" height="10" rx="2" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <text x="50" y="40" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350f" fontFamily="sans-serif">12</text>
      <circle cx="50" cy="29" r="1.8" fill="#facc15" stroke="#78350f" strokeWidth="0.8" />
      <rect x="64" y="55" width="2.5" height="7" rx="1" fill="#facc15" stroke="#ca8a04" strokeWidth="0.6" />
      <circle cx="65" cy="56" r="2.2" fill="#fde68a" stroke="#ca8a04" strokeWidth="0.8" />
      <line x1="65" y1="56" x2="59" y2="56" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      <rect x="76" y="44" width="7" height="10" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="79.5" cy="49" r="2" fill="#3b82f6" />
      <rect x="30" y="80" width="40" height="7" rx="2" fill="#0f172a" opacity="0.85" />
      <rect x="32" y="81" width="36" height="5" rx="1" fill="#334155" />
    </svg>
  ),
  'room': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <polygon points="10,12 50,24 50,68 10,64" fill="#f0f9ff" stroke="#e0f2fe" strokeWidth="1" />
      <polygon points="50,24 90,12 90,64 50,68" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1" />
      <polygon points="10,64 50,68 90,64 74,90 26,90" fill="#d97706" />
      <polygon points="10,64 50,68 90,64 74,90 26,90" fill="#f59e0b" opacity="0.3" />
      <polygon points="18,24 38,29 38,48 18,44" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
      <polygon points="18,34 38,39 38,40 18,35" fill="#ffffff" opacity="0.7" />
      <polygon points="28,26.5 28,46 29,46 29,26.5" fill="#ffffff" opacity="0.7" />
      <rect x="44" y="42" width="40" height="26" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      <rect x="42" y="48" width="42" height="18" rx="2" fill="#ffffff" />
      <ellipse cx="50" cy="47" rx="6" ry="3.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
      <rect x="54" y="48" width="30" height="18" rx="2" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
      <line x1="64" y1="48" x2="64" y2="66" stroke="#fbcfe8" strokeWidth="1.5" />
      <line x1="74" y1="48" x2="74" y2="66" stroke="#fbcfe8" strokeWidth="1.5" />
      <rect x="36" y="52" width="10" height="15" rx="1" fill="#78350f" />
      <rect x="37" y="54" width="8" height="4" fill="#92400e" />
      <polygon points="38,48 44,48 46,52 36,52" fill="#fef08a" stroke="#f59e0b" strokeWidth="0.8" />
      <ellipse cx="44" cy="78" rx="16" ry="6" fill="#3b82f6" opacity="0.8" />
      <ellipse cx="44" cy="78" rx="12" ry="4" fill="#60a5fa" />
    </svg>
  ),
  'fast': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="88" x2="94" y2="88" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="6" y1="28" x2="42" y2="28" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="38" x2="46" y2="38" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
      <line x1="4" y1="50" x2="36" y2="50" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="62" x2="44" y2="62" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="74" x2="38" y2="74" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="84" r="4.5" fill="#e2e8f0" opacity="0.8" />
      <circle cx="22" cy="82" r="3.5" fill="#e2e8f0" opacity="0.6" />
      <circle cx="16" cy="85" r="2.5" fill="#cbd5e1" opacity="0.5" />
      <g transform="translate(18, 2)">
        <path d="M 38 52 L 24 64 L 14 62" stroke="#2563eb" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx="12" cy="62" rx="4.5" ry="2.5" fill="#ef4444" transform="rotate(-15 12 62)" />
        <path d="M 44 52 L 56 66 L 50 82" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx="50" cy="84" rx="5" ry="3" fill="#ef4444" />
        <path d="M 34 52 L 48 34" stroke="#f97316" strokeWidth="10" strokeLinecap="round" />
        <line x1="36" y1="50" x2="48" y2="34" stroke="#ffffff" strokeWidth="2" />
        <path d="M 42 36 L 26 44 L 20 38" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 46 36 L 60 38 L 68 28" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="56" cy="24" r="8" fill="#fed7aa" />
        <path d="M 48 20 C 46 12, 58 14, 62 20 C 58 18, 52 18, 48 20 Z" fill="#b45309" />
        <path d="M 48 22 C 40 20, 42 16, 46 16" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <circle cx="59" cy="23" r="1.2" fill="#0f172a" />
        <path d="M 58 27 Q 61 28 63 26" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  ),
  'important': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <circle cx="50" cy="50" r="42" fill="#fef08a" opacity="0.4" />
      <path d="M 36 62 L 30 88 L 42 82 L 48 88 L 46 66" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1" />
      <path d="M 64 62 L 70 88 L 58 82 L 52 88 L 54 66" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1" />
      <line x1="33" y1="84" x2="43" y2="76" stroke="#facc15" strokeWidth="1.2" />
      <line x1="67" y1="84" x2="57" y2="76" stroke="#facc15" strokeWidth="1.2" />
      <path d="M 50 14 C 68 14, 82 20, 82 42 C 82 64, 62 76, 50 82 C 38 76, 18 64, 18 42 C 18 20, 32 14, 50 14 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
      <path d="M 50 18 C 65 18, 77 24, 77 42 C 77 61, 60 72, 50 77 C 40 72, 23 61, 23 42 C 23 24, 35 18, 50 18 Z" fill="#facc15" />
      <circle cx="50" cy="46" r="20" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
      <rect x="47" y="33" width="6" height="17" rx="3" fill="#ffffff" />
      <circle cx="50" cy="57" r="3.2" fill="#ffffff" />
      <polygon points="50,22 51,25 54,26 51,27 50,30 49,27 46,26 49,25" fill="#ca8a04" />
      <circle cx="28" cy="40" r="1.8" fill="#ca8a04" />
      <circle cx="72" cy="40" r="1.8" fill="#ca8a04" />
    </svg>
  ),
  'stick': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="84" x2="92" y2="84" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <ellipse cx="50" cy="80" rx="36" ry="3.5" fill="#0f172a" opacity="0.12" />
      <path d="M 46 62 Q 54 48 64 42" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 46 62 Q 54 48 64 42" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <path d="M 16 76 Q 36 68 56 64 Q 74 60 84 48" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
      <path d="M 16 76 Q 36 68 56 64 Q 74 60 84 48" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
      <path d="M 24 74 Q 38 68 52 64" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 58 63 Q 70 60 78 52" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 64 42 C 68 34, 76 34, 76 42 C 76 50, 68 50, 64 42 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
      <line x1="64" y1="42" x2="74" y2="42" stroke="#15803d" strokeWidth="0.8" />
      <path d="M 60 46 C 62 38, 54 34, 52 40 C 50 46, 56 48, 60 46 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="0.8" />
      <path d="M 84 48 C 88 40, 94 42, 92 50 C 90 56, 84 54, 84 48 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    </svg>
  ),
  'chips': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <path d="M 18 52 C 18 80, 82 80, 82 52 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
      <ellipse cx="50" cy="52" rx="32" ry="9" fill="#1e40af" />
      <ellipse cx="50" cy="52" rx="30" ry="7.5" fill="#f59e0b" />
      <ellipse cx="36" cy="50" rx="10" ry="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(-20 36 50)" />
      <ellipse cx="64" cy="50" rx="10" ry="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(25 64 50)" />
      <ellipse cx="50" cy="46" rx="12" ry="7" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1" />
      <path d="M 42 45 Q 50 43 58 45" stroke="#d97706" strokeWidth="1" fill="none" />
      <path d="M 43 48 Q 50 46 57 48" stroke="#d97706" strokeWidth="1" fill="none" />
      <path d="M 32 42 Q 42 36 52 40 Q 42 48 32 42 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
      <path d="M 48 38 Q 60 34 68 42 Q 58 46 48 38 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
      <g transform="translate(36, 16) rotate(15)">
        <path d="M 0 8 Q 12 0 24 6 Q 16 16 0 8 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
        <path d="M 4 8 Q 12 3 20 7" stroke="#d97706" strokeWidth="0.8" fill="none" />
        <path d="M 3 10 Q 11 6 18 10" stroke="#d97706" strokeWidth="0.8" fill="none" />
      </g>
      <polygon points="26,26 27,29 30,30 27,31 26,34 25,31 22,30 25,29" fill="#facc15" />
      <polygon points="76,24 77,26 80,27 77,28 76,30 75,28 72,27 75,26" fill="#facc15" />
      <circle cx="50" cy="22" r="1" fill="#ffffff" />
    </svg>
  ),
  'fork': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <g transform="translate(50, 50) rotate(-25) translate(-50, -50)">
        <rect x="51" y="44" width="4" height="46" rx="2" fill="#0f172a" opacity="0.12" />
        <path d="M 47 44 L 46 86 C 46 89, 54 89, 54 86 L 53 44 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="49" y1="46" x2="48" y2="85" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
        <path d="M 45 38 L 47 44 L 53 44 L 55 38 Z" fill="#94a3b8" />
        <path d="M 37 26 C 37 36, 63 36, 63 26 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 37 12 C 37 10, 40 10, 40 12 L 40 28 L 37 28 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 44 10 C 44 8, 47 8, 47 10 L 47 28 L 44 28 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 53 10 C 53 8, 56 8, 56 10 L 56 28 L 53 28 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 60 12 C 60 10, 63 10, 63 12 L 63 28 L 60 28 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <line x1="38" y1="20" x2="62" y2="20" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
      </g>
    </svg>
  ),
  'bottle': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="88" rx="18" ry="4" fill="#0f172a" opacity="0.14" />
      <path d="M 43 20 L 43 28 C 34 34, 32 44, 32 54 L 32 82 C 32 86, 36 88, 50 88 C 64 88, 68 86, 68 82 L 68 54 C 68 44, 66 34, 57 28 L 57 20 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.8" />
      <path d="M 33 46 C 38 48, 46 44, 50 46 C 54 48, 62 44, 67 46 L 67 82 C 67 85, 63 87, 50 87 C 37 87, 33 85, 33 82 Z" fill="#0ea5e9" opacity="0.75" />
      <rect x="32" y="52" width="36" height="18" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
      <path d="M 32 64 Q 41 60 50 64 Q 59 68 68 64" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
      <path d="M 50 56 C 47 60, 46 62, 46 64 C 46 66, 48 68, 50 68 C 52 68, 54 66, 54 64 C 54 62, 53 60, 50 56 Z" fill="#0284c7" />
      <circle cx="42" cy="74" r="1.5" fill="#ffffff" opacity="0.8" />
      <circle cx="56" cy="78" r="1.2" fill="#ffffff" opacity="0.8" />
      <circle cx="48" cy="82" r="1" fill="#ffffff" opacity="0.8" />
      <rect x="42" y="16" width="16" height="5" rx="1.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
      <line x1="42" y1="18" x2="58" y2="18" stroke="#38bdf8" strokeWidth="0.8" />
      <rect x="44" y="11" width="12" height="6" rx="1.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
      <line x1="47" y1="11" x2="47" y2="17" stroke="#38bdf8" strokeWidth="0.8" />
      <line x1="50" y1="11" x2="50" y2="17" stroke="#38bdf8" strokeWidth="0.8" />
      <line x1="53" y1="11" x2="53" y2="17" stroke="#38bdf8" strokeWidth="0.8" />
      <path d="M 36 34 L 36 82" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  'food': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="76" rx="42" ry="15" fill="#fef3c7" stroke="#fde68a" strokeWidth="1.5" />
      <g transform="translate(14, 36) rotate(-28)">
        <rect x="0" y="0" width="38" height="12" rx="6" fill="#d97706" stroke="#b45309" strokeWidth="1.2" />
        <line x1="8" y1="2" x2="12" y2="10" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="2" x2="20" y2="10" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="2" x2="28" y2="10" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g transform="translate(36, 52)">
        <polygon points="14,4 34,14 14,24 0,16" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
        <polygon points="14,24 34,14 34,22 14,32" fill="#eab308" stroke="#ca8a04" strokeWidth="1.2" />
        <polygon points="0,16 14,24 14,32 0,24" fill="#f59e0b" stroke="#ca8a04" strokeWidth="1.2" />
        <circle cx="10" cy="18" r="2" fill="#ca8a04" />
        <circle cx="22" cy="14" r="2.5" fill="#ca8a04" />
        <circle cx="24" cy="22" r="2" fill="#ca8a04" />
      </g>
      <g transform="translate(64, 46)">
        <circle cx="12" cy="16" r="11" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
        <path d="M 10 5 C 10 2, 13 0, 14 0" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M 14 1 C 18 0, 20 4, 17 6 Z" fill="#22c55e" />
        <circle cx="8" cy="12" r="2" fill="#fca5a5" opacity="0.8" />
      </g>
      <g transform="translate(22, 66)">
        <ellipse cx="14" cy="10" rx="14" ry="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="14" cy="9" r="4.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
        <circle cx="12" cy="7.5" r="1.2" fill="#ffffff" opacity="0.8" />
      </g>
    </svg>
  ),
  'vegetable': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="80" rx="40" ry="10" fill="#0f172a" opacity="0.1" />
      <g transform="translate(18, 32) rotate(-18)">
        <path d="M 14 12 C 10 24, 6 38, 14 48 C 22 56, 34 52, 34 40 C 34 28, 24 16, 18 12 Z" fill="#7c3aed" stroke="#5b21b6" strokeWidth="1.5" />
        <path d="M 14 12 L 18 4" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 10 14 C 14 14, 18 10, 22 14 C 18 18, 14 18, 10 14 Z" fill="#22c55e" />
        <path d="M 18 24 Q 22 36 22 44" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </g>
      <g transform="translate(56, 36)">
        <path d="M 12 28 L 10 44 C 10 46, 22 46, 22 44 L 20 28 Z" fill="#86efac" stroke="#16a34a" strokeWidth="1.2" />
        <circle cx="10" cy="24" r="8" fill="#15803d" />
        <circle cx="22" cy="24" r="8" fill="#15803d" />
        <circle cx="16" cy="16" r="9" fill="#16a34a" />
        <circle cx="16" cy="20" r="7" fill="#22c55e" opacity="0.7" />
      </g>
      <g transform="translate(38, 48)">
        <circle cx="14" cy="16" r="14" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
        <polygon points="14,4 16,1 17,5 21,3 19,6 23,7 19,9 21,12 17,10 15,14 13,10 9,12 11,9 7,7 11,6 9,3 13,5" fill="#22c55e" />
        <circle cx="9" cy="11" r="2.5" fill="#fca5a5" opacity="0.8" />
      </g>
      <g transform="translate(18, 58) rotate(32)">
        <path d="M 4 8 C -2 2, 2 -4, 4 4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 4 8 C 4 0, 10 -2, 6 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
        <polygon points="4,8 10,8 6,42" fill="#ea580c" stroke="#c2410c" strokeWidth="1.2" />
        <line x1="5" y1="14" x2="8" y2="14" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />
        <line x1="5" y1="22" x2="8" y2="22" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />
        <line x1="5" y1="30" x2="7" y2="30" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  ),
  'toddler': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Soft floor shadow under baby hands, knees, and feet */}
      <ellipse cx="27" cy="91" rx="8" ry="2.5" fill="#0f172a" opacity="0.12" />
      <ellipse cx="46" cy="91" rx="8" ry="2.5" fill="#0f172a" opacity="0.12" />
      <ellipse cx="68" cy="91" rx="14" ry="3" fill="#0f172a" opacity="0.12" />
      <ellipse cx="88" cy="89" rx="8" ry="2.5" fill="#0f172a" opacity="0.12" />

      {/* Far bent knee and leg (behind) */}
      <path
        d="M 52 74 C 52 82, 54 88, 60 88 C 65 88, 68 85, 68 80"
        fill="#fed7aa"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Far arm (left in image, baby's right arm) */}
      <path
        d="M 27 58 L 22 84 C 21 87, 16 88, 17 90 C 19 92, 28 92, 29 88 L 32 60 Z"
        fill="#fed7aa"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Far hand chubby fingers on ground */}
      <path
        d="M 17 90 C 16 88, 20 86, 24 87 C 27 87, 29 89, 29 90"
        stroke="#ea580c"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Baby Torso & Back */}
      <path
        d="M 44 48 C 52 52, 60 52, 64 54 C 68 56, 70 60, 66 70 C 60 74, 50 72, 42 66 C 36 60, 36 54, 44 48 Z"
        fill="#ffedd5"
      />
      {/* Back curve line */}
      <path
        d="M 46 48 C 54 52, 62 52, 68 56"
        stroke="#ea580c"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Puffy White Diaper */}
      <path
        d="M 58 55 C 64 53, 76 54, 80 62 C 84 70, 78 80, 68 80 C 60 80, 56 75, 54 68 C 53 62, 54 57, 58 55 Z"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.2"
      />
      {/* Diaper folds & waistband tabs */}
      <path d="M 68 54 C 74 54, 78 57, 80 62" stroke="#94a3b8" strokeWidth="1" fill="none" />
      <path d="M 56 68 C 60 74, 68 76, 74 74" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
      {/* Cute ruffled diaper gathering tab at back */}
      <path
        d="M 76 58 C 78 54, 82 54, 82 57 C 82 54, 86 55, 84 59"
        stroke="#94a3b8"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Near bent knee and leg (supporting body on floor, foot behind) */}
      <path
        d="M 66 66 C 74 65, 80 72, 78 80 C 76 86, 70 89, 66 89 C 62 89, 62 84, 66 78 C 68 74, 64 68, 66 66 Z"
        fill="#ffedd5"
      />
      <path
        d="M 72 74 C 78 76, 82 82, 86 82 C 90 82, 94 80, 93 84 C 92 88, 86 90, 80 89 C 74 88, 68 89, 66 89 C 62 89, 62 83, 66 78 C 70 72, 76 70, 78 78"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Foot sole & cute baby toes */}
      <path
        d="M 88 82 C 92 80, 95 82, 94 85 C 93 88, 89 89, 86 88"
        stroke="#ea580c"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="93" cy="85" r="1.2" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.6" />
      <circle cx="90.5" cy="86.5" r="1.1" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.6" />
      <circle cx="88" cy="87.5" r="1" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.6" />
      <path d="M 64 85 Q 67 86 70 84" stroke="#ea580c" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Near Arm (supporting torso on floor) */}
      <path
        d="M 38 52 C 40 60, 42 70, 42 80 C 42 86, 38 88, 40 90 C 42 92, 48 92, 49 88 C 50 82, 49 70, 48 58 Z"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 39 88 C 39 90, 43 91, 46 91 C 48 91, 49 89, 49 87"
        stroke="#ea580c"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="42" y1="88" x2="42" y2="90.5" stroke="#ea580c" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="45" y1="88" x2="45" y2="90.5" stroke="#ea580c" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="48" cy="72" r="1" fill="#fca5a5" />

      {/* Cute Big Baby Head */}
      <path
        d="M 28 14 C 42 12, 54 22, 53 38 C 52 46, 48 52, 42 54 C 36 56, 30 56, 24 52 C 16 48, 14 38, 16 28 C 18 18, 22 14, 28 14 Z"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 15 36 C 13 40, 14 46, 18 49 C 22 52, 26 53, 30 54"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="1.2"
      />

      {/* Cute C-shaped Ear on the right */}
      <path
        d="M 47 36 C 53 36, 54 44, 49 46 C 46 47, 45 44, 46 40"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M 48 39 Q 50 42 47 43" stroke="#ea580c" strokeWidth="0.9" fill="none" />

      {/* Big joyful eyes */}
      <ellipse cx="22" cy="38" rx="3.5" ry="4.5" fill="#451a03" />
      <circle cx="21" cy="36.5" r="1.5" fill="#ffffff" />
      <circle cx="23.2" cy="39.5" r="0.8" fill="#ffffff" />
      <ellipse cx="34" cy="37" rx="3.5" ry="4.5" fill="#451a03" />
      <circle cx="33" cy="35.5" r="1.5" fill="#ffffff" />
      <circle cx="35.2" cy="38.5" r="0.8" fill="#ffffff" />
      <path d="M 18 36 Q 22 32 26 36" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 30 35 Q 34 31 38 35" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 18 31 Q 22 28 26 30" stroke="#b45309" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M 31 30 Q 35 27 39 29" stroke="#b45309" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Button nose */}
      <path d="M 26 42 Q 28 43 29 41" stroke="#ea580c" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Wide happy open-mouth smile with tongue */}
      <path
        d="M 23 44 Q 28 44 33 43 C 33 48, 30 52, 27 52 C 24 52, 23 48, 23 44 Z"
        fill="#881337"
        stroke="#ea580c"
        strokeWidth="1.1"
      />
      <path d="M 25 49 Q 27 47 29 49 C 29 51, 26 52, 25 49 Z" fill="#f43f5e" />

      {/* Rosy blushing cheeks */}
      <circle cx="17" cy="43" r="3.5" fill="#fb7185" opacity="0.5" />
      <circle cx="38" cy="41" r="3.5" fill="#fb7185" opacity="0.4" />

      {/* Wispy curl / hair tuft on top */}
      <path
        d="M 28 14 C 27 8, 32 6, 33 10 C 34 7, 37 9, 35 14"
        stroke="#92400e"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  'on': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="88" x2="92" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <g>
        <ellipse cx="50" cy="88" rx="26" ry="5" fill="#475569" opacity="0.2" />
        <polygon points="26,52 38,42 74,42 62,52" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="62,52 74,42 74,74 62,84" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="26" y="52" width="36" height="32" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <line x1="28" y1="54" x2="60" y2="54" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
      <path d="M 50 14 L 50 28 M 46 24 L 50 28 L 54 24" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(50, 18) scale(0.9)">
        <ellipse cx="0" cy="31" rx="8" ry="2.5" fill="#475569" opacity="0.4" />
        <rect x="-5" y="14" width="4" height="16" rx="2" fill="#2563eb" />
        <rect x="1" y="14" width="4" height="16" rx="2" fill="#2563eb" />
        <ellipse cx="-3" cy="29" rx="3.5" ry="2" fill="#0f172a" />
        <ellipse cx="3" cy="29" rx="3.5" ry="2" fill="#0f172a" />
        <path d="M -7 2 L 7 2 L 6 15 L -6 15 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
        <path d="M -7 4 L -12 -2" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 7 4 L 12 -2" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="-6" r="7" fill="#fed7aa" />
        <path d="M -6 -8 C -4 -13, 4 -13, 6 -8 C 4 -10, -4 -10, -6 -8 Z" fill="#b45309" />
        <circle cx="-2" cy="-6" r="0.9" fill="#0f172a" />
        <circle cx="2" cy="-6" r="0.9" fill="#0f172a" />
        <path d="M -2 -3 Q 0 -1 2 -3" stroke="#c2410c" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  ),
  'under': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="88" x2="92" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <rect x="26" y="44" width="4" height="38" fill="#475569" />
      <rect x="70" y="36" width="4" height="42" fill="#334155" />
      <g transform="translate(48, 54) scale(0.9)">
        <ellipse cx="0" cy="30" rx="9" ry="3" fill="#0f172a" opacity="0.2" />
        <path d="M -8 26 Q 0 31 8 26" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" fill="none" />
        <ellipse cx="-8" cy="27" rx="3" ry="2" fill="#0f172a" />
        <ellipse cx="8" cy="27" rx="3" ry="2" fill="#0f172a" />
        <rect x="-6" y="11" width="12" height="14" rx="2" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
        <path d="M -6 14 L -9 20" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 6 14 L 9 20" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="3" r="7" fill="#fed7aa" />
        <path d="M -6 1 C -4 -4, 4 -4, 6 1 C 4 -2, -4 -2, -6 1 Z" fill="#b45309" />
        <circle cx="-2" cy="3" r="0.9" fill="#0f172a" />
        <circle cx="2" cy="3" r="0.9" fill="#0f172a" />
        <path d="M -2 6 Q 0 8 2 6" stroke="#c2410c" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </g>
      <polygon points="18,44 32,32 82,32 68,44" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="68,44 82,32 82,38 68,50" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="18" y="44" width="50" height="6" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <rect x="20" y="50" width="5" height="36" fill="#64748b" stroke="#475569" strokeWidth="1.2" />
      <rect x="63" y="50" width="5" height="36" fill="#475569" stroke="#334155" strokeWidth="1.2" />
      <path d="M 12 70 Q 24 74 34 72" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 30 68 L 35 72 L 31 76" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  'front': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="88" x2="92" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <g>
        <ellipse cx="50" cy="88" rx="26" ry="5" fill="#475569" opacity="0.2" />
        <polygon points="28,48 40,36 78,36 66,48" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="66,48 78,36 78,72 66,84" fill="#64748b" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="28" y="48" width="38" height="36" rx="2" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <rect x="31" y="51" width="32" height="30" rx="1" fill="#fef08a" opacity="0.6" stroke="#eab308" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="47" y="69" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontFamily="sans-serif">FRONT</text>
      </g>
      <path d="M 47 20 L 47 38 M 43 34 L 47 38 L 51 34" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(18, 54) scale(0.8)">
        <ellipse cx="0" cy="38" rx="7" ry="2.5" fill="#0f172a" opacity="0.16" />
        <rect x="-5" y="18" width="4" height="18" rx="2" fill="#2563eb" />
        <rect x="1" y="18" width="4" height="18" rx="2" fill="#2563eb" />
        <path d="M -7 4 L 7 4 L 6 19 L -6 19 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
        <path d="M 6 8 L 14 12" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="-4" r="6.5" fill="#fed7aa" />
        <path d="M -5 -6 C -3 -10, 3 -10, 5 -6 Z" fill="#b45309" />
      </g>
    </svg>
  ),
  'out': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="8" y1="88" x2="92" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <g transform="translate(18, 48)">
        <ellipse cx="20" cy="38" rx="18" ry="4" fill="#475569" opacity="0.2" />
        <polygon points="0,16 12,4 36,4 24,16" fill="#78350f" opacity="0.5" />
        <polygon points="0,16 12,4 6,0 -4,10" fill="#d97706" stroke="#b45309" strokeWidth="1" />
        <polygon points="36,4 24,16 30,22 42,8" fill="#d97706" stroke="#b45309" strokeWidth="1" />
        <rect x="0" y="16" width="24" height="22" rx="1" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
        <polygon points="24,16 36,4 36,26 24,38" fill="#92400e" stroke="#78350f" strokeWidth="1.2" />
      </g>
      <path d="M 34 54 Q 48 24 68 46" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
      <path d="M 64 42 L 68 46 L 69 40" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform="translate(74, 46) scale(0.95)">
        <ellipse cx="0" cy="40" rx="9" ry="3" fill="#0f172a" opacity="0.2" />
        <path d="M -6 18 L -8 36" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 2 18 L 6 36" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="-8" cy="37" rx="3.5" ry="2" fill="#0f172a" />
        <ellipse cx="6" cy="37" rx="3.5" ry="2" fill="#0f172a" />
        <rect x="-6" y="4" width="12" height="15" rx="2" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
        <path d="M -6 8 L -12 2" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 6 8 L 12 2" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="-4" r="7" fill="#fed7aa" />
        <path d="M -6 -6 C -4 -11, 4 -11, 6 -6 Z" fill="#b45309" />
        <circle cx="-2" cy="-4" r="0.9" fill="#0f172a" />
        <circle cx="2" cy="-4" r="0.9" fill="#0f172a" />
        <path d="M -2 -1 Q 0 1 2 -1" stroke="#c2410c" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  ),
  'over there': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="88" x2="94" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <g transform="translate(24, 48) scale(0.95)">
        <ellipse cx="0" cy="40" rx="8" ry="2.5" fill="#0f172a" opacity="0.16" />
        <rect x="-5" y="18" width="4" height="20" rx="2" fill="#2563eb" />
        <rect x="1" y="18" width="4" height="20" rx="2" fill="#2563eb" />
        <ellipse cx="-3" cy="38" rx="3.5" ry="2" fill="#0f172a" />
        <ellipse cx="3" cy="38" rx="3.5" ry="2" fill="#0f172a" />
        <rect x="-6" y="4" width="12" height="15" rx="2" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
        <path d="M 5 8 L 22 4" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="-4" r="7" fill="#fed7aa" />
        <path d="M -6 -6 C -4 -11, 4 -11, 6 -6 Z" fill="#b45309" />
        <circle cx="3" cy="-4" r="1" fill="#0f172a" />
        <path d="M 2 -1 Q 4 0 5 -2" stroke="#c2410c" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </g>
      <path d="M 46 50 Q 62 36 78 52" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none" />
      <path d="M 74 48 L 79 53 L 73 55" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform="translate(74, 52)">
        <ellipse cx="10" cy="34" rx="14" ry="4" fill="#cbd5e1" opacity="0.6" />
        <path d="M 0 34 Q 10 26 20 34 Z" fill="#10b981" />
        <line x1="10" y1="12" x2="10" y2="34" stroke="#475569" strokeWidth="1.8" />
        <polygon points="10,12 24,17 10,22" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8" />
      </g>
    </svg>
  ),
  'next': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="88" x2="94" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <g transform="translate(14, 58) scale(0.65)">
        <polygon points="0,20 16,6 44,6 28,20" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
        <polygon points="28,20 44,6 44,30 28,44" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
        <rect x="0" y="20" width="28" height="24" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
        <text x="14" y="36" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">1</text>
      </g>
      <g transform="translate(40, 52) scale(0.75)">
        <polygon points="0,20 16,6 44,6 28,20" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
        <polygon points="28,20 44,6 44,30 28,44" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
        <rect x="0" y="20" width="28" height="24" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <text x="14" y="36" textAnchor="middle" fontSize="12" fill="#1e293b" fontWeight="bold">2</text>
      </g>
      <path d="M 52 46 Q 64 28 74 44" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 68 42 L 74 45 L 75 38" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform="translate(68, 44) scale(0.85)">
        <polygon points="0,20 16,6 44,6 28,20" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <polygon points="28,20 44,6 44,30 28,44" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
        <rect x="0" y="20" width="28" height="24" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <text x="14" y="36" textAnchor="middle" fontSize="12" fill="#78350f" fontWeight="bold">3</text>
      </g>
      <polygon points="80,24 82,28 86,29 83,32 84,36 80,34 76,36 77,32 74,29 78,28" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
    </svg>
  ),
  'before': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <line x1="6" y1="88" x2="94" y2="88" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <g transform="translate(18, 46) scale(0.85)">
        <polygon points="0,20 16,6 44,6 28,20" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <polygon points="28,20 44,6 44,30 28,44" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
        <rect x="0" y="20" width="28" height="24" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <text x="14" y="36" textAnchor="middle" fontSize="11" fill="#78350f" fontWeight="bold">1</text>
      </g>
      <g transform="translate(56, 46) scale(0.85)">
        <polygon points="0,20 16,6 44,6 28,20" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
        <polygon points="28,20 44,6 44,30 28,44" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
        <rect x="0" y="20" width="28" height="24" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <text x="14" y="36" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="bold">2</text>
      </g>
      <path d="M 64 36 Q 48 20 34 34" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 40 32 L 34 35 L 36 28" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  'traffic lights': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="92" rx="14" ry="3" fill="#0f172a" opacity="0.14" />
      <rect x="47" y="78" width="6" height="14" fill="#334155" />
      <rect x="36" y="10" width="28" height="70" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <path d="M 38 24 C 38 18, 62 18, 62 24" stroke="#0f172a" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="24" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
      <circle cx="47" cy="22" r="2.2" fill="#fca5a5" opacity="0.8" />
      <path d="M 38 45 C 38 39, 62 39, 62 45" stroke="#0f172a" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="45" r="8" fill="#eab308" stroke="#ca8a04" strokeWidth="1.2" />
      <circle cx="47" cy="43" r="2.2" fill="#fef08a" opacity="0.8" />
      <path d="M 38 66 C 38 60, 62 60, 62 66" stroke="#0f172a" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="66" r="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.2" />
      <circle cx="47" cy="64" r="2.2" fill="#86efac" opacity="0.8" />
    </svg>
  ),
  'invitation': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <ellipse cx="50" cy="84" rx="36" ry="6" fill="#0f172a" opacity="0.12" />
      <path d="M 16 34 L 50 12 L 84 34 L 84 76 L 16 76 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="22" y="20" width="56" height="46" rx="3" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
      <rect x="25" y="23" width="50" height="40" rx="2" fill="#ffffff" />
      <polygon points="50,28 52,32 57,33 53,36 54,41 50,38 46,41 47,36 43,33 48,32" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <line x1="32" y1="46" x2="68" y2="46" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="52" x2="64" y2="52" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="57" x2="60" y2="57" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <polygon points="16,38 50,58 84,38 84,76 16,76" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="50" cy="58" r="4.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <path d="M 46 58 C 36 50, 36 66, 46 58 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
      <path d="M 54 58 C 64 50, 64 66, 54 58 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
      <polygon points="78,16 79,19 82,20 79,21 78,24 77,21 74,20 77,19" fill="#facc15" />
      <polygon points="20,18 21,20 23,21 21,22 20,24 19,22 17,21 19,20" fill="#facc15" />
    </svg>
  ),
  'uniform': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <path d="M 50 14 C 50 10, 56 10, 56 14 C 56 17, 50 18, 50 22" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 22 30 L 50 22 L 78 30" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 26 30 L 74 30 L 78 82 L 22 82 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.8" />
      <polygon points="44,30 50,42 38,30" fill="#ffffff" />
      <polygon points="56,30 50,42 62,30" fill="#ffffff" />
      <polygon points="48,36 52,36 54,64 50,68 46,64" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
      <rect x="20" y="30" width="14" height="6" rx="1.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <rect x="66" y="30" width="14" height="6" rx="1.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="50" cy="48" r="2.2" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="50" cy="56" r="2.2" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="50" cy="64" r="2.2" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="50" cy="72" r="2.2" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <rect x="28" y="46" width="12" height="14" rx="1.5" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1" />
      <polygon points="34,48 35,50 38,51 35,52 34,54 33,52 30,51 33,50" fill="#facc15" />
    </svg>
  ),
  'bridge': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <rect x="8" y="66" width="84" height="24" rx="2" fill="#38bdf8" />
      <path d="M 8 76 Q 28 72 50 76 Q 72 80 92 76" stroke="#0284c7" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 8 84 Q 30 80 50 84 Q 70 88 92 84" stroke="#0284c7" strokeWidth="1.5" fill="none" opacity="0.6" />
      <rect x="26" y="38" width="10" height="34" fill="#64748b" stroke="#334155" strokeWidth="1.2" />
      <rect x="64" y="38" width="10" height="34" fill="#64748b" stroke="#334155" strokeWidth="1.2" />
      <rect x="8" y="48" width="84" height="8" rx="1.5" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="8" y1="52" x2="92" y2="52" stroke="#facc15" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="8" y1="44" x2="92" y2="44" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="16" y1="44" x2="16" y2="48" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="36" y1="44" x2="36" y2="48" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="50" y1="44" x2="50" y2="48" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="64" y1="44" x2="64" y2="48" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="84" y1="44" x2="84" y2="48" stroke="#cbd5e1" strokeWidth="1" />
      <path d="M 8 36 Q 31 48 50 48 Q 69 48 92 36" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
      <polygon points="26,38 31,28 36,38" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
      <polygon points="64,38 69,28 74,38" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
    </svg>
  ),
  'medal': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <polygon points="34,10 50,38 40,38 24,10" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      <polygon points="66,10 50,38 60,38 76,10" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
      <polygon points="46,10 50,38 54,10" fill="#ffffff" />
      <circle cx="50" cy="58" r="26" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
      <circle cx="50" cy="58" r="22" fill="#facc15" />
      <circle cx="50" cy="58" r="18" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="50" y="65" textAnchor="middle" fontSize="18" fontWeight="black" fill="#854d0e" fontFamily="sans-serif">1</text>
      <polygon points="50,42 51,44 54,45 52,47 52,50 50,48 48,50 48,47 46,45 49,44" fill="#ca8a04" />
      <path d="M 34 46 C 42 36, 58 36, 66 46" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" fill="none" />
    </svg>
  ),
  'trophy': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <rect x="36" y="80" width="28" height="12" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
      <rect x="40" y="83" width="20" height="6" rx="1" fill="#facc15" />
      <rect x="46" y="68" width="8" height="12" fill="#ca8a04" />
      <path d="M 32 30 C 16 30, 16 52, 34 56" stroke="#ca8a04" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M 32 30 C 18 30, 18 52, 34 56" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 68 30 C 84 30, 84 52, 66 56" stroke="#ca8a04" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M 68 30 C 82 30, 82 52, 66 56" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 28 20 L 72 20 C 72 44, 62 68, 50 68 C 38 68, 28 44, 28 20 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
      <path d="M 32 22 L 68 22 C 68 42, 60 64, 50 64 C 40 64, 32 42, 32 22 Z" fill="#facc15" />
      <ellipse cx="50" cy="20" rx="22" ry="5" fill="#fde047" stroke="#ca8a04" strokeWidth="1.8" />
      <polygon points="50,34 52,38 57,39 53,42 54,47 50,44 46,47 47,42 43,39 48,38" fill="#ca8a04" />
      <polygon points="26,14 27,17 30,18 27,19 26,22 25,19 22,18 25,17" fill="#fde047" />
      <polygon points="74,14 75,16 78,17 75,18 74,20 73,18 70,17 73,16" fill="#fde047" />
    </svg>
  ),
  'pet shop': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="94" rx="44" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Storefront facade */}
      <rect x="12" y="14" width="76" height="78" rx="4" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      {/* Upper cornice */}
      <rect x="10" y="12" width="80" height="5" rx="2" fill="#047857" />
      {/* Signboard */}
      <rect x="16" y="19" width="68" height="15" rx="3" fill="#0d9488" stroke="#0f766e" strokeWidth="1.5" />
      {/* Paw emblem and text */}
      <circle cx="24" cy="26.5" r="3" fill="#fef08a" />
      <circle cx="21" cy="23" r="1.3" fill="#fef08a" />
      <circle cx="24" cy="21.5" r="1.3" fill="#fef08a" />
      <circle cx="27" cy="23" r="1.3" fill="#fef08a" />
      <text x="54" y="29.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="900" letterSpacing="1">PET SHOP</text>
      {/* Striped Awning */}
      <polygon points="10,36 18,36 15,48 7,48" fill="#10b981" />
      <polygon points="18,36 28,36 26,48 15,48" fill="#ffffff" />
      <polygon points="28,36 38,36 37,48 26,48" fill="#10b981" />
      <polygon points="38,36 48,36 48,48 37,48" fill="#ffffff" />
      <polygon points="48,36 58,36 59,48 48,48" fill="#10b981" />
      <polygon points="58,36 68,36 70,48 59,48" fill="#ffffff" />
      <polygon points="68,36 78,36 81,48 70,48" fill="#10b981" />
      <polygon points="78,36 86,36 90,48 81,48" fill="#ffffff" />
      <polygon points="86,36 90,36 93,48 90,48" fill="#10b981" />
      <line x1="7" y1="48" x2="93" y2="48" stroke="#047857" strokeWidth="1.5" />
      {/* Display Window */}
      <rect x="16" y="52" width="42" height="36" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
      {/* Puppy in window */}
      <circle cx="28" cy="73" r="8" fill="#f59e0b" />
      <ellipse cx="21" cy="70" rx="2.5" ry="5" fill="#d97706" transform="rotate(-15 21 70)" />
      <ellipse cx="35" cy="70" rx="2.5" ry="5" fill="#d97706" transform="rotate(15 35 70)" />
      <circle cx="25.5" cy="72" r="1.1" fill="#1e293b" />
      <circle cx="30.5" cy="72" r="1.1" fill="#1e293b" />
      <ellipse cx="28" cy="75" rx="2.2" ry="1.5" fill="#ffffff" />
      <polygon points="27,74 29,74 28,75.5" fill="#1e293b" />
      {/* Kitten next to puppy */}
      <circle cx="46" cy="75" r="6.5" fill="#94a3b8" />
      <polygon points="41,70 43,65 46,69" fill="#94a3b8" />
      <polygon points="46,69 49,65 51,70" fill="#94a3b8" />
      <circle cx="44" cy="74.5" r="0.9" fill="#1e293b" />
      <circle cx="48" cy="74.5" r="0.9" fill="#1e293b" />
      <polygon points="45.5,76 46.5,76 46,76.8" fill="#f43f5e" />
      {/* Fish bowl on upper shelf */}
      <rect x="18" y="61" width="38" height="2" fill="#bae6fd" />
      <circle cx="45" cy="57" r="4" fill="#38bdf8" opacity="0.7" stroke="#0284c7" strokeWidth="0.8" />
      <ellipse cx="45" cy="57" rx="2" ry="1" fill="#f97316" />
      {/* Door */}
      <rect x="64" y="52" width="22" height="40" rx="2" fill="#047857" stroke="#064e3b" strokeWidth="1.5" />
      <rect x="67" y="56" width="16" height="20" rx="1.5" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
      <rect x="70" y="62" width="10" height="5" rx="1" fill="#22c55e" />
      <circle cx="68" cy="76" r="1.5" fill="#facc15" />
    </svg>
  ),
  'toy shop': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="94" rx="44" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Storefront facade */}
      <rect x="12" y="14" width="76" height="78" rx="4" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      {/* Upper cornice */}
      <rect x="10" y="12" width="80" height="5" rx="2" fill="#d97706" />
      {/* Signboard with toy theme */}
      <rect x="16" y="19" width="68" height="15" rx="3" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
      {/* Toy rocket emblem */}
      <polygon points="21,29 25,21 29,29" fill="#facc15" />
      <rect x="23" y="27" width="4" height="3" fill="#3b82f6" />
      <text x="55" y="29.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900" letterSpacing="1.5">TOY SHOP</text>
      {/* Striped Awning (Red & Yellow) */}
      <polygon points="10,36 18,36 15,48 7,48" fill="#ef4444" />
      <polygon points="18,36 28,36 26,48 15,48" fill="#facc15" />
      <polygon points="28,36 38,36 37,48 26,48" fill="#ef4444" />
      <polygon points="38,36 48,36 48,48 37,48" fill="#facc15" />
      <polygon points="48,36 58,36 59,48 48,48" fill="#ef4444" />
      <polygon points="58,36 68,36 70,48 59,48" fill="#facc15" />
      <polygon points="68,36 78,36 81,48 70,48" fill="#ef4444" />
      <polygon points="78,36 86,36 90,48 81,48" fill="#facc15" />
      <polygon points="86,36 90,36 93,48 90,48" fill="#ef4444" />
      <line x1="7" y1="48" x2="93" y2="48" stroke="#b91c1c" strokeWidth="1.5" />
      {/* Display Window */}
      <rect x="16" y="52" width="42" height="36" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
      {/* Teddy Bear in window */}
      <circle cx="28" cy="73" r="8" fill="#b45309" />
      <circle cx="22" cy="66" r="3" fill="#92400e" />
      <circle cx="34" cy="66" r="3" fill="#92400e" />
      <circle cx="25.5" cy="71.5" r="1" fill="#1e293b" />
      <circle cx="30.5" cy="71.5" r="1" fill="#1e293b" />
      <ellipse cx="28" cy="75" rx="2.5" ry="1.8" fill="#fef3c7" />
      <polygon points="27,74.5 29,74.5 28,75.5" fill="#1e293b" />
      <polygon points="28,78 25,76 25,80" fill="#ef4444" />
      <polygon points="28,78 31,76 31,80" fill="#ef4444" />
      {/* Toy Rocket in window */}
      <path d="M 46 62 Q 49 55 50 54 Q 51 55 54 62 L 53 74 L 47 74 Z" fill="#3b82f6" />
      <polygon points="46,59 50,54 54,59" fill="#ef4444" />
      <polygon points="45,71 42,75 47,74" fill="#ef4444" />
      <polygon points="55,71 58,75 53,74" fill="#ef4444" />
      <circle cx="50" cy="63" r="1.8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="0.8" />
      {/* ABC blocks below */}
      <rect x="38" y="78" width="8" height="8" rx="1" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <text x="42" y="84" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#78350f">A</text>
      <rect x="47" y="80" width="8" height="8" rx="1" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
      <text x="51" y="86" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#ffffff">B</text>
      {/* Door */}
      <rect x="64" y="52" width="22" height="40" rx="2" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
      <rect x="67" y="56" width="16" height="20" rx="1.5" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
      <rect x="70" y="62" width="10" height="5" rx="1" fill="#22c55e" />
      <circle cx="68" cy="76" r="1.5" fill="#facc15" />
    </svg>
  ),
  'supermarket': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="94" rx="44" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Modern Supermarket Building in background */}
      <rect x="8" y="10" width="84" height="50" rx="3" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      {/* Roof trim */}
      <rect x="6" y="8" width="88" height="6" rx="2" fill="#16a34a" />
      {/* Big Signboard */}
      <rect x="14" y="16" width="72" height="14" rx="2.5" fill="#15803d" stroke="#166534" strokeWidth="1" />
      <text x="50" y="26" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="900" letterSpacing="1">SUPERMARKET</text>
      {/* Store Glass Windows with illuminated shelves inside */}
      <rect x="12" y="32" width="30" height="26" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
      {/* Shelves visible inside */}
      <line x1="14" y1="40" x2="40" y2="40" stroke="#93c5fd" strokeWidth="1" />
      <line x1="14" y1="48" x2="40" y2="48" stroke="#93c5fd" strokeWidth="1" />
      <rect x="16" y="36" width="4" height="4" fill="#ef4444" rx="0.5" />
      <rect x="22" y="36" width="4" height="4" fill="#facc15" rx="0.5" />
      <rect x="28" y="36" width="5" height="4" fill="#22c55e" rx="0.5" />
      <rect x="18" y="44" width="4" height="4" fill="#3b82f6" rx="0.5" />
      <rect x="24" y="44" width="5" height="4" fill="#f97316" rx="0.5" />
      <rect x="31" y="44" width="4" height="4" fill="#a855f7" rx="0.5" />
      {/* Automatic Glass Sliding Doors in center-right */}
      <rect x="46" y="32" width="42" height="26" rx="2" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="1" />
      <line x1="67" y1="32" x2="67" y2="58" stroke="#3b82f6" strokeWidth="1.2" />
      <rect x="63" y="42" width="2" height="8" rx="1" fill="#64748b" />
      <rect x="69" y="42" width="2" height="8" rx="1" fill="#64748b" />
      {/* Foreground: Shopping Cart full of groceries */}
      {/* Baguette & Veggies sticking out */}
      <path d="M 40 45 L 30 28 C 29 26 32 24 34 26 L 46 44 Z" fill="#d97706" stroke="#92400e" strokeWidth="0.8" />
      <line x1="33" y1="31" x2="35" y2="33" stroke="#fef3c7" strokeWidth="1" />
      <line x1="36" y1="36" x2="38" y2="38" stroke="#fef3c7" strokeWidth="1" />
      {/* Carrot with greens */}
      <polygon points="50,44 56,36 53,34" fill="#f97316" />
      <path d="M 54 35 Q 56 28 60 27 M 55 35 Q 59 31 63 32" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />
      {/* Milk carton */}
      <rect x="58" y="40" width="8" height="15" rx="1.5" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1" />
      <rect x="60" y="37" width="4" height="3" fill="#38bdf8" />
      {/* Red apple */}
      <circle cx="48" cy="50" r="4.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8" />
      {/* Shopping Cart Metal Wire Basket */}
      <polygon points="34,50 74,50 68,75 42,75" fill="#f8fafc" fillOpacity="0.4" stroke="#475569" strokeWidth="1.5" />
      {/* Grid lines on cart */}
      <line x1="36" y1="56" x2="72" y2="56" stroke="#64748b" strokeWidth="1" />
      <line x1="39" y1="63" x2="70" y2="63" stroke="#64748b" strokeWidth="1" />
      <line x1="41" y1="70" x2="69" y2="70" stroke="#64748b" strokeWidth="1" />
      <line x1="44" y1="50" x2="48" y2="75" stroke="#64748b" strokeWidth="1" />
      <line x1="54" y1="50" x2="55" y2="75" stroke="#64748b" strokeWidth="1" />
      <line x1="64" y1="50" x2="62" y2="75" stroke="#64748b" strokeWidth="1" />
      {/* Cart Handle */}
      <path d="M 34 50 L 26 48 L 24 53" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cart Chassis */}
      <path d="M 42 75 L 42 84 L 66 84 L 68 75" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="42" cy="87" r="4" fill="#334155" />
      <circle cx="42" cy="87" r="1.5" fill="#cbd5e1" />
      <circle cx="66" cy="87" r="4" fill="#334155" />
      <circle cx="66" cy="87" r="1.5" fill="#cbd5e1" />
    </svg>
  ),
  'markets': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="94" rx="44" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Festive bunting flags across top */}
      <path d="M 8 16 Q 50 26 92 16" stroke="#94a3b8" strokeWidth="1" fill="none" />
      <polygon points="16,18 22,28 28,20" fill="#ef4444" />
      <polygon points="32,21 38,31 44,23" fill="#facc15" />
      <polygon points="48,23 54,32 60,23" fill="#3b82f6" />
      <polygon points="64,22 70,31 76,20" fill="#10b981" />
      <polygon points="80,19 86,28 91,17" fill="#ec4899" />
      {/* LEFT STALL (Fruit) */}
      <polygon points="8,32 16,32 14,46 6,46" fill="#ef4444" />
      <polygon points="16,32 24,32 22,46 14,46" fill="#ffffff" />
      <polygon points="24,32 32,32 30,46 22,46" fill="#ef4444" />
      <polygon points="32,32 40,32 38,46 30,46" fill="#ffffff" />
      <polygon points="40,32 48,32 46,46 38,46" fill="#ef4444" />
      <line x1="6" y1="46" x2="46" y2="46" stroke="#b91c1c" strokeWidth="1.5" />
      <rect x="8" y="46" width="2.5" height="38" fill="#78350f" />
      <rect x="44" y="46" width="2.5" height="38" fill="#78350f" />
      {/* Merchant 1 */}
      <circle cx="26" cy="46" r="5" fill="#fcd34d" />
      <rect x="23" y="44" width="6" height="2" fill="#78350f" rx="0.5" />
      <path d="M 20 51 C 20 48 32 48 32 51 L 32 64 L 20 64 Z" fill="#0284c7" />
      <circle cx="34" cy="52" r="2" fill="#fcd34d" />
      {/* Counter */}
      <rect x="6" y="62" width="42" height="26" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
      <line x1="6" y1="70" x2="48" y2="70" stroke="#78350f" strokeWidth="1" />
      <line x1="6" y1="78" x2="48" y2="78" stroke="#78350f" strokeWidth="1" />
      {/* Fruit crates */}
      <rect x="8" y="60" width="16" height="10" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
      <circle cx="12" cy="62" r="2.5" fill="#ef4444" />
      <circle cx="16" cy="62" r="2.5" fill="#ef4444" />
      <circle cx="20" cy="62" r="2.5" fill="#ef4444" />
      <rect x="26" y="60" width="18" height="10" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
      <circle cx="30" cy="62" r="2.5" fill="#facc15" />
      <circle cx="35" cy="62" r="2.5" fill="#facc15" />
      <circle cx="40" cy="62" r="2.5" fill="#facc15" />
      {/* RIGHT STALL (Vegetables) */}
      <polygon points="52,32 60,32 58,46 50,46" fill="#16a34a" />
      <polygon points="60,32 68,32 66,46 58,46" fill="#ffffff" />
      <polygon points="68,32 76,32 74,46 66,46" fill="#16a34a" />
      <polygon points="76,32 84,32 82,46 74,46" fill="#ffffff" />
      <polygon points="84,32 92,32 90,46 82,46" fill="#16a34a" />
      <line x1="50" y1="46" x2="90" y2="46" stroke="#15803d" strokeWidth="1.5" />
      <rect x="52" y="46" width="2.5" height="38" fill="#78350f" />
      <rect x="88" y="46" width="2.5" height="38" fill="#78350f" />
      {/* Merchant 2 */}
      <circle cx="70" cy="46" r="5" fill="#fcd34d" />
      <path d="M 64 51 C 64 48 76 48 76 51 L 76 64 L 64 64 Z" fill="#ea580c" />
      {/* Counter */}
      <rect x="50" y="62" width="42" height="26" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1.2" />
      <line x1="50" y1="70" x2="92" y2="70" stroke="#78350f" strokeWidth="1" />
      <line x1="50" y1="78" x2="92" y2="78" stroke="#78350f" strokeWidth="1" />
      {/* Veggie crates */}
      <rect x="53" y="60" width="17" height="10" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
      <polygon points="56,64 59,58 61,58" fill="#f97316" />
      <polygon points="61,64 64,58 66,58" fill="#f97316" />
      <rect x="73" y="60" width="16" height="10" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
      <circle cx="77" cy="62" r="2.8" fill="#22c55e" />
      <circle cx="83" cy="62" r="2.8" fill="#7e22ce" />
    </svg>
  ),
  'transport': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Sky background */}
      <rect x="6" y="8" width="88" height="84" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
      {/* Fluffy clouds */}
      <path d="M 14 26 Q 18 20 25 22 Q 30 18 36 22 Q 42 22 44 26 Z" fill="#ffffff" opacity="0.9" />
      <path d="M 68 18 Q 72 14 78 15 Q 82 12 87 15 Q 92 16 92 20 Z" fill="#ffffff" opacity="0.9" />
      {/* Airplane soaring in sky */}
      <g>
        <path d="M 28 22 Q 44 20 54 18 Q 58 17 62 18 Q 66 19 62 21 Q 52 23 42 26 Z" fill="#f8fafc" stroke="#0284c7" strokeWidth="0.8" />
        <polygon points="42,21 34,10 40,10 48,20" fill="#0284c7" />
        <polygon points="40,24 35,32 39,32 46,23" fill="#0369a1" />
        <polygon points="30,22 26,14 30,14 34,22" fill="#ef4444" />
        <line x1="12" y1="24" x2="26" y2="22" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
      </g>
      {/* Train on railway in middle */}
      <rect x="6" y="44" width="88" height="3" fill="#94a3b8" />
      <path d="M 12 43 L 56 43 Q 66 43 72 40 L 70 34 Q 62 33 50 33 L 12 33 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
      <path d="M 12 38 L 52 38 Q 62 38 68 36 L 66 38" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <rect x="16" y="34" width="7" height="3" rx="0.5" fill="#bae6fd" />
      <rect x="26" y="34" width="7" height="3" rx="0.5" fill="#bae6fd" />
      <rect x="36" y="34" width="7" height="3" rx="0.5" fill="#bae6fd" />
      <polygon points="56,34 64,35 60,37 54,37" fill="#bae6fd" />
      <circle cx="20" cy="44" r="2.5" fill="#1e293b" />
      <circle cx="32" cy="44" r="2.5" fill="#1e293b" />
      <circle cx="48" cy="44" r="2.5" fill="#1e293b" />
      <circle cx="60" cy="44" r="2.5" fill="#1e293b" />
      {/* Road & City Bus / Car on bottom */}
      <rect x="6" y="52" width="88" height="40" fill="#334155" />
      <line x1="6" y1="72" x2="94" y2="72" stroke="#facc15" strokeWidth="1.5" strokeDasharray="6 4" />
      {/* City Bus */}
      <rect x="12" y="55" width="44" height="15" rx="2" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <rect x="16" y="57" width="7" height="5" rx="0.5" fill="#bae6fd" />
      <rect x="25" y="57" width="7" height="5" rx="0.5" fill="#bae6fd" />
      <rect x="34" y="57" width="7" height="5" rx="0.5" fill="#bae6fd" />
      <rect x="45" y="57" width="8" height="8" rx="0.5" fill="#bae6fd" />
      <circle cx="20" cy="70" r="3" fill="#1e293b" />
      <circle cx="20" cy="70" r="1.2" fill="#94a3b8" />
      <circle cx="46" cy="70" r="3" fill="#1e293b" />
      <circle cx="46" cy="70" r="1.2" fill="#94a3b8" />
      {/* Red Car */}
      <path d="M 52 82 C 52 79 55 77 60 77 L 84 77 C 88 77 91 80 91 83 L 90 85 C 90 87 88 88 84 88 L 56 88 C 53 88 52 86 52 82 Z" fill="#dc2626" />
      <path d="M 60 77 L 65 73 C 67 72 70 72 74 72 L 78 72 C 81 72 82 74 84 77 Z" fill="#ef4444" />
      <polygon points="65,74 71,74 71,77 62,77" fill="#e0f2fe" />
      <polygon points="73,74 78,74 81,77 73,77" fill="#e0f2fe" />
      <circle cx="60" cy="87" r="3.2" fill="#1e293b" />
      <circle cx="60" cy="87" r="1.2" fill="#cbd5e1" />
      <circle cx="82" cy="87" r="3.2" fill="#1e293b" />
      <circle cx="82" cy="87" r="1.2" fill="#cbd5e1" />
      <circle cx="89" cy="82" r="1.2" fill="#fef08a" />
    </svg>
  ),
  'cultures': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Background circle */}
      <circle cx="50" cy="50" r="46" fill="#fef9c3" stroke="#fde047" strokeWidth="1.5" />
      {/* Festive sparkles */}
      <polygon points="20,16 23,20 18,22" fill="#ef4444" />
      <polygon points="80,18 84,21 80,25" fill="#3b82f6" />
      <circle cx="50" cy="14" r="2" fill="#10b981" />
      <polygon points="32,12 34,16 38,15 35,18 36,22 32,20 29,22 30,18 27,15 31,16" fill="#f59e0b" />
      <polygon points="68,12 70,16 74,15 71,18 72,22 68,20 65,22 66,18 63,15 67,16" fill="#f59e0b" />
      {/* Ground arc */}
      <path d="M 6 82 Q 50 76 94 82 L 94 96 L 6 96 Z" fill="#fde68a" />
      {/* Person 1 (Sombrero & Serape) */}
      <g>
        <polygon points="10,64 26,64 30,90 8,90" fill="#dc2626" />
        <rect x="8" y="72" width="20" height="3" fill="#facc15" />
        <rect x="9" y="78" width="18" height="3" fill="#16a34a" />
        <line x1="8" y1="90" x2="30" y2="90" stroke="#facc15" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <circle cx="18" cy="52" r="6" fill="#d97706" />
        <circle cx="16" cy="52" r="0.8" fill="#1e293b" />
        <circle cx="20" cy="52" r="0.8" fill="#1e293b" />
        <path d="M 16 55 Q 18 57 20 55" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <ellipse cx="18" cy="46" rx="14" ry="4" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
        <path d="M 14 46 Q 18 36 22 46 Z" fill="#d97706" stroke="#b45309" strokeWidth="1" />
        <line x1="6" y1="46" x2="30" y2="46" stroke="#dc2626" strokeWidth="1" />
      </g>
      {/* Person 2 (East Asian Kimono) */}
      <g>
        <path d="M 32 64 L 48 64 L 50 92 L 30 92 Z" fill="#ec4899" />
        <polygon points="35,64 40,74 45,64" fill="#ffffff" />
        <rect x="31" y="74" width="18" height="6" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
        <circle cx="40" cy="52" r="6" fill="#fde68a" />
        <path d="M 33 50 C 33 43 47 43 47 50 C 47 53 33 53 33 50 Z" fill="#1e293b" />
        <circle cx="40" cy="42" r="3.5" fill="#1e293b" />
        <circle cx="45" cy="44" r="2" fill="#ef4444" />
        <path d="M 37 51 Q 39 51 40 52" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <path d="M 41 52 Q 42 51 44 51" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <path d="M 38 55 Q 40 57 42 55" stroke="#1e293b" strokeWidth="0.8" fill="none" />
      </g>
      {/* Person 3 (African Kente pattern) */}
      <g>
        <path d="M 52 64 L 68 64 L 70 92 L 50 92 Z" fill="#eab308" />
        <polygon points="53,68 57,64 61,68 65,64 67,68" fill="#16a34a" />
        <polygon points="51,76 55,80 59,76 63,80 67,76" fill="#dc2626" />
        <polygon points="51,84 55,88 59,84 63,88 67,84" fill="#1e293b" />
        <circle cx="60" cy="52" r="6" fill="#78350f" />
        <path d="M 53 49 C 53 43 67 43 67 49 Z" fill="#eab308" />
        <line x1="53" y1="48" x2="67" y2="48" stroke="#16a34a" strokeWidth="1" />
        <circle cx="58" cy="52" r="0.8" fill="#ffffff" />
        <circle cx="58" cy="52" r="0.5" fill="#000000" />
        <circle cx="62" cy="52" r="0.8" fill="#ffffff" />
        <circle cx="62" cy="52" r="0.5" fill="#000000" />
        <path d="M 58 55 Q 60 57 62 55" stroke="#ffffff" strokeWidth="0.8" fill="none" />
      </g>
      {/* Person 4 (European Folk Dress) */}
      <g>
        <path d="M 72 64 L 88 64 L 92 92 L 68 92 Z" fill="#2563eb" />
        <polygon points="76,64 80,72 84,64" fill="#ffffff" />
        <path d="M 78 66 L 82 66" stroke="#ef4444" strokeWidth="1" />
        <circle cx="80" cy="52" r="6" fill="#fed7aa" />
        <path d="M 73 50 C 73 44 87 44 87 50" fill="#fde047" stroke="#ca8a04" strokeWidth="0.5" />
        <path d="M 74 53 L 73 66" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
        <path d="M 86 53 L 87 66" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
        <circle cx="75" cy="46" r="1.8" fill="#ef4444" />
        <circle cx="78" cy="44.5" r="1.8" fill="#3b82f6" />
        <circle cx="82" cy="44.5" r="1.8" fill="#facc15" />
        <circle cx="85" cy="46" r="1.8" fill="#ef4444" />
        <circle cx="78" cy="52" r="0.8" fill="#1e293b" />
        <circle cx="82" cy="52" r="0.8" fill="#1e293b" />
        <path d="M 78 55 Q 80 57 82 55" stroke="#1e293b" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  ),
  'international': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Glow aura */}
      <circle cx="50" cy="52" r="44" fill="#f0f9ff" />
      {/* Rainbow bridge arc */}
      <path d="M 12 50 C 12 18, 88 18, 88 50" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      <path d="M 14 50 C 14 20, 86 20, 86 50" stroke="#facc15" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      <path d="M 16 50 C 16 22, 84 22, 84 50" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      {/* Central Globe */}
      <circle cx="50" cy="52" r="26" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
      <path d="M 40 38 Q 48 34 56 36 Q 64 40 62 46 Q 58 48 60 56 Q 56 64 50 68 Q 46 62 48 54 Q 42 50 40 44 Z" fill="#22c55e" />
      <path d="M 30 42 Q 36 40 38 46 Q 34 54 36 62 Q 32 60 30 52 Z" fill="#22c55e" />
      <ellipse cx="50" cy="52" rx="14" ry="26" stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.5" />
      <line x1="24" y1="52" x2="76" y2="52" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
      {/* Top Child */}
      <g>
        <circle cx="50" cy="18" r="4.5" fill="#fcd34d" />
        <path d="M 46 17 C 46 13 54 13 54 17 Z" fill="#78350f" />
        <circle cx="48.5" cy="18.5" r="0.6" fill="#1e293b" />
        <circle cx="51.5" cy="18.5" r="0.6" fill="#1e293b" />
        <path d="M 46 22.5 L 54 22.5 L 55 30 L 45 30 Z" fill="#ef4444" />
        <line x1="46" y1="24" x2="36" y2="28" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
        <line x1="54" y1="24" x2="64" y2="28" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Left Child */}
      <g>
        <circle cx="18" cy="46" r="4.5" fill="#fed7aa" />
        <path d="M 14 44 C 14 40 22 40 22 44 Z" fill="#facc15" />
        <circle cx="17" cy="46" r="0.6" fill="#1e293b" />
        <circle cx="19.5" cy="46" r="0.6" fill="#1e293b" />
        <path d="M 14 50.5 L 22 50.5 L 23 58 L 13 58 Z" fill="#2563eb" />
        <line x1="18" y1="36" x2="36" y2="28" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="58" x2="24" y2="70" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Right Child */}
      <g>
        <circle cx="82" cy="46" r="4.5" fill="#78350f" />
        <path d="M 78 44 C 78 40 86 40 86 44 Z" fill="#1e293b" />
        <circle cx="80.5" cy="46" r="0.6" fill="#ffffff" />
        <circle cx="83" cy="46" r="0.6" fill="#ffffff" />
        <path d="M 78 50.5 L 86 50.5 L 87 58 L 77 58 Z" fill="#10b981" />
        <line x1="82" y1="36" x2="64" y2="28" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        <line x1="82" y1="58" x2="76" y2="70" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Bottom Child */}
      <g>
        <circle cx="50" cy="85" r="4.5" fill="#d97706" />
        <path d="M 46 83 C 46 79 54 79 54 83 Z" fill="#1e293b" />
        <circle cx="48.5" cy="85.5" r="0.6" fill="#1e293b" />
        <circle cx="51.5" cy="85.5" r="0.6" fill="#1e293b" />
        <path d="M 46 89.5 L 54 89.5 L 55 96 L 45 96 Z" fill="#f59e0b" />
        <line x1="46" y1="91" x2="24" y2="70" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
        <line x1="54" y1="91" x2="76" y2="70" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Peace Sparkles */}
      <polygon points="50,4 51,7 54,8 51,9 50,12 49,9 46,8 49,7" fill="#facc15" />
      <polygon points="12,28 13,30 15,31 13,32 12,34 11,32 9,31 11,30" fill="#facc15" />
      <polygon points="88,28 89,30 91,31 89,32 88,34 87,32 85,31 87,30" fill="#facc15" />
    </svg>
  ),
  'driver': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      {/* Ground shadow */}
      <ellipse cx="50" cy="92" rx="44" ry="4" fill="#94a3b8" opacity="0.3" />
      {/* Road asphalt on bottom */}
      <rect x="6" y="86" width="88" height="8" rx="2" fill="#475569" />
      <line x1="6" y1="90" x2="94" y2="90" stroke="#facc15" strokeWidth="1" strokeDasharray="5 4" />
      {/* CAR on Right */}
      <g>
        <ellipse cx="64" cy="87" rx="28" ry="4" fill="#334155" opacity="0.5" />
        <path d="M 38 72 C 38 67 42 64 50 64 L 84 64 C 92 64 96 68 96 74 L 94 77 C 94 80 90 81 86 81 L 44 81 C 40 81 38 78 38 72 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.2" />
        <path d="M 48 64 L 56 50 C 58 47 62 46 66 46 L 78 46 C 82 46 85 49 87 53 L 91 64 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
        <polygon points="78,49 85,61 88,61 82,49" fill="#bae6fd" />
        <polygon points="66,49 66,61 81,61 76,49" fill="#e0f2fe" />
        <polygon points="56,51 56,61 64,61 64,49 60,49" fill="#e0f2fe" />
        <line x1="64" y1="48" x2="64" y2="62" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="72" y1="51" x2="70" y2="59" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M 93 69 C 95 69 96 71 96 73 L 92 74 Z" fill="#fef08a" stroke="#eab308" strokeWidth="0.8" />
        <rect x="62" y="67" width="4" height="1.5" rx="0.7" fill="#cbd5e1" />
        <circle cx="50" cy="80" r="7.5" fill="#1e293b" />
        <circle cx="50" cy="80" r="4.5" fill="#94a3b8" />
        <circle cx="50" cy="80" r="2" fill="#cbd5e1" />
        <circle cx="82" cy="80" r="7.5" fill="#1e293b" />
        <circle cx="82" cy="80" r="4.5" fill="#94a3b8" />
        <circle cx="82" cy="80" r="2" fill="#cbd5e1" />
      </g>
      {/* DRIVER PERSON Standing Proudly Next to Car on Left */}
      <g>
        <ellipse cx="19" cy="88" rx="3.5" ry="2" fill="#0f172a" />
        <ellipse cx="27" cy="88" rx="3.5" ry="2" fill="#0f172a" />
        <line x1="20" y1="72" x2="19" y2="87" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <line x1="26" y1="72" x2="27" y2="87" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <path d="M 15 48 C 15 44 31 44 31 48 L 30 73 L 16 73 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
        <polygon points="21,46 25,46 23,54" fill="#ffffff" />
        <polygon points="22.5,49 23.5,49 24,57 23,59 22,57" fill="#0f172a" />
        <circle cx="23" cy="62" r="1.1" fill="#facc15" />
        <circle cx="23" cy="67" r="1.1" fill="#facc15" />
        <path d="M 16 48 L 10 58 L 16 63" stroke="#1e3a8a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="16" cy="63" r="1.8" fill="#fcd34d" />
        <path d="M 30 48 L 36 44 L 38 38" stroke="#1e3a8a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="38" cy="36" r="2.2" fill="#fcd34d" />
        <circle cx="23" cy="36" r="6.5" fill="#fcd34d" />
        <circle cx="21" cy="36" r="0.8" fill="#1e293b" />
        <circle cx="25" cy="36" r="0.8" fill="#1e293b" />
        <path d="M 21.5 39.5 Q 23 41.5 24.5 39.5" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <path d="M 16 33 C 16 27 30 27 30 33 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
        <circle cx="23" cy="30" r="1.2" fill="#facc15" />
        <path d="M 16 33 Q 23 35 30 33 L 31 34 Q 23 37 15 34 Z" fill="#0f172a" />
      </g>
    </svg>
  ),
};

export const RU_ALIASES: Record<string, string> = {
  'хвост': 'tail',
  'клюв': 'beak',
  'весна': 'spring',
  'лето': 'summer',
  'осень': 'autumn',
  'зима': 'winter',
  'парта': 'desk',
  'точилка': 'pencil sharpener',
  'пенал': 'pencil case',
  'ластик': 'rubber',
  'клей': 'glue',
  'фишки': 'counters',
  'кукла': 'doll',
  'скакалка': 'skipping rope',
  'свитер': 'sweater',
  'рубашка': 'shirt',
  'куртка': 'jacket',
  'юбка': 'skirt',
  'кудрявые волосы': 'curly hair',
  'темные волосы': 'dark hair',
  'тёмные волосы': 'dark hair',
  'длинные волосы': 'long hair',
  'прямые волосы': 'straight hair',
  'шкаф для одежды': 'wardrobe',
  'книжный шкаф': 'bookcase',
  'стол': 'table',
  'диванная подушка': 'cushion',
  'кухня': 'kitchen',
  'столовая': 'dining room',
  'сад': 'garden',
  'корень': 'root',
  'сливы': 'plums',
  'круг': 'circle',
  'квадрат': 'square',
  'треугольник': 'triangle',
  'прямоугольник': 'rectangle',
  'овал': 'oval',
  'между': 'between',
  'рядом с': 'next to',
  'перед': 'in front of',
  'позади, за': 'behind',
  'позади': 'behind',
  'за': 'behind',
  'напротив': 'opposite',
  'над': 'above',
  'классная комната': 'classroom',
  'одноклассники': 'class',
  'рубин': 'ruby',
  'дети': 'children',
  'неделя': 'week',
  'бутылка для воды': 'water bottle',
  'значок': 'badge',
  'кукла-марионетка': 'puppet',
  'марионетка': 'puppet',
  'фломастеры': 'colouring pens',
  'цветные карандаши': 'colouring pens',
  'ксилофон': 'xylophone',
  'шарики марблс': 'marbles',
  'марблс': 'marbles',
  'кубики': 'blocks',
  'юла': 'spinning top',
  'волчок': 'spinning top',
  'лошадка-качалка': 'rocking horse',
  'лошадка-качелька': 'rocking horse',
  'пирамидка': 'pyramid',
  'резиновая уточка': 'rubber duck',
  'резиновые желтые уточки': 'rubber duck',
  'чайный сервиз': 'tea set',
  'книжный магазин': 'bookshop',
  // Numbers 11-20 Russian
  'одиннадцать': 'eleven',
  'двенадцать': 'twelve',
  'тринадцать': 'thirteen',
  'четырнадцать': 'fourteen',
  'пятнадцать': 'fifteen',
  'шестнадцать': 'sixteen',
  'семнадцать': 'seventeen',
  'восемнадцать': 'eighteen',
  'девятнадцать': 'nineteen',
  'двадцать': 'twenty',
  // Numbers 11-20 Latvian
  'vienpadsmit': 'eleven',
  'divpadsmit': 'twelve',
  'trīspadsmit': 'thirteen',
  'četrpadsmit': 'fourteen',
  'piecpadsmit': 'fifteen',
  'sešpadsmit': 'sixteen',
  'septiņpadsmit': 'seventeen',
  'astoņpadsmit': 'eighteen',
  'deviņpadsmit': 'nineteen',
  'divdesmit': 'twenty',
  // Colors & items aliases
  'кораблик': 'boat',
  'лодка': 'boat',
  'воздушный змей': 'kite',
  'кошки': 'cats',
  'коты': 'cats',
  'мячи': 'balls',
  'птицы': 'birds',
  'птички': 'birds',
  'карандаши': 'pencils',
  'laiva': 'boat',
  'pūķis': 'kite',
  'kaķi': 'cats',
  'bumbas': 'balls',
  'putni': 'birds',
  'zīmuļi': 'pencils',
  // Prepositions & appearance
  'книга на столе': 'book on table',
  'яблоко на столе': 'apple on table',
  'кошка под стулом': 'cat under chair',
  'кот под стулом': 'cat under chair',
  'мяч под кроватью': 'ball under bed',
  'карандаш в пенале': 'pencil in pencil case',
  'линейка в рюкзаке': 'ruler in bag',
  'зеленые глаза': 'green eyes',
  'зелёные глаза': 'green eyes',
  'красная машина': 'red car',
  'красная машинка': 'red car',
  'машина': 'car',
  'машинка': 'car',
  'mašīna': 'car',
  'картины': 'pictures',
  'картинки': 'pictures',
  'attēli': 'pictures',
  // User-requested SVGs aliases
  'рождество': 'christmas',
  'ziemassvētki': 'christmas',
  'ziemassvetki': 'christmas',
  'костюм': 'costume',
  'tērps': 'costume',
  'terps': 'costume',
  'наряжаться': 'dress up',
  'pārģērbties': 'dress up',
  'pargerbties': 'dress up',
  'одежда': 'clothes',
  'drēbes': 'clothes',
  'drebes': 'clothes',
  'apģērbs': 'clothes',
  'apgerbs': 'clothes',
  'карман': 'pocket',
  'kabata': 'pocket',
  'пуговица': 'button',
  'poga': 'button',
  'гараж': 'garage',
  'garāža': 'garage',
  'garaza': 'garage',
  'балкон': 'balcony',
  'balkons': 'balcony',
  'свет': 'light',
  'gaisma': 'light',
  'неубранный': 'messy',
  'nekārtīgs': 'messy',
  'nekartigs': 'messy',
  'квартира': 'flat',
  'dzīvoklis': 'flat',
  'dzivoklis': 'flat',
  'комната': 'room',
  'istaba': 'room',
  'шерсть': 'fur',
  'мех': 'fur',
  'spalva': 'fur',
  'быстрый': 'fast',
  'ātrs': 'fast',
  'atrs': 'fast',
  'важный': 'important',
  'svarīgs': 'important',
  'svarigs': 'important',
  'палочка': 'stick',
  'веточка': 'stick',
  'nūjiņa': 'stick',
  'nujina': 'stick',
  'zariņš': 'stick',
  'zarins': 'stick',
  'чипсы': 'chips',
  'čipsi': 'chips',
  'cipsi': 'chips',
  'вилка': 'fork',
  'dakša': 'fork',
  'daksa': 'fork',
  'бутылка': 'bottle',
  'бутылка воды': 'bottle',
  'pudele': 'bottle',
  'еда': 'food',
  'ēdiens': 'food',
  'ediens': 'food',
  'овощ': 'vegetable',
  'dārzenis': 'vegetable',
  'darzenis': 'vegetable',
  'малыш': 'toddler',
  'mazulis': 'toddler',
  // Positions +
  'на': 'on',
  'uz': 'on',
  'под': 'under',
  'zem': 'under',
  'передняя сторона': 'front',
  'спереди': 'front',
  'priekšpuse': 'front',
  'priekspuse': 'front',
  'снаружи': 'out',
  'наружу': 'out',
  'ārā': 'out',
  'ara': 'out',
  'вон там': 'over there',
  'tur': 'over there',
  'следующий': 'next',
  'дальше': 'next',
  'nākamais': 'next',
  'nakamais': 'next',
  'до': 'before',
  'pirms': 'before',
  'светофор': 'traffic lights',
  'luksofors': 'traffic lights',
  'приглашение': 'invitation',
  'ielūgums': 'invitation',
  'ielugums': 'invitation',
  'форма': 'uniform',
  'formas tērps': 'uniform',
  'formas terps': 'uniform',
  'мост': 'bridge',
  'tilts': 'bridge',
  'медаль': 'medal',
  'medaļa': 'medal',
  'medala': 'medal',
  'кубок': 'trophy',
  'kauss': 'trophy',
  'зоомагазин': 'pet shop',
  'zooveikals': 'pet shop',
  'магазин игрушек': 'toy shop',
  'rotaļlietu veikals': 'toy shop',
  'rotallietu veikals': 'toy shop',
  'супермаркет': 'supermarket',
  'lielveikals': 'supermarket',
  'рынки, ярмарки': 'markets',
  'рынки': 'markets',
  'ярмарки': 'markets',
  'рынок': 'markets',
  'market': 'markets',
  'tirgi': 'markets',
  'tirgus': 'markets',
  'транспорт': 'transport',
  'transports': 'transport',
  'культуры, традиции': 'cultures',
  'культуры': 'cultures',
  'традиции': 'cultures',
  'culture': 'cultures',
  'kultūras': 'cultures',
  'kulturas': 'cultures',
  'международный': 'international',
  'starptautisks': 'international',
  'водитель': 'driver',
  'vadītājs': 'driver',
  'vaditajs': 'driver',
};
