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

};
