import React from 'react';
import { Word } from '../types';
import { getWordImage } from '../utils/wordImages';

interface WordIllustrationProps {
  word?: Word | null;
  fallbackEmoji?: string;
  className?: string;
}

/**
 * High-quality, kid-friendly vector SVG illustrations for words where standard emojis
 * fail to represent the actual object (desk, sharpener, glue, doll, root, cushion, plums, etc.)
 */
const WORD_SVGS: Record<string, React.ReactNode> = {
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

  // tail (хвост / aste - prominent brightly highlighted wagging fluffy tail with focus ring, wag arcs, sparkles and indicator arrow)
  'tail': (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
      <defs>
        {/* Soft radial glow behind the tail */}
        <radialGradient id="tailFocusGlow" cx="68%" cy="46%" r="35%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#fef08a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
        {/* Tail vibrant gradient */}
        <linearGradient id="tailGrad" x1="0%" y1="100%" x2="60%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="46" cy="88" rx="34" ry="6" fill="#cbd5e1" opacity="0.45" />

      {/* Focus Glow Spotlight on Tail */}
      <circle cx="68" cy="46" r="28" fill="url(#tailFocusGlow)" />
      {/* Dashed focus highlight ring around the tail */}
      <ellipse
        cx="68"
        cy="46"
        rx="26"
        ry="25"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeDasharray="4 3"
        opacity="0.9"
      />

      {/* Playful wagging motion arcs */}
      <path d="M 88 34 C 94 40 94 50 88 56" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 93 28 C 100 37 100 58 93 64" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />

      {/* Sparkles near the tail */}
      <path d="M 84 22 L 86 16 L 88 22 L 94 24 L 88 26 L 86 32 L 84 26 L 78 24 Z" fill="#f59e0b" />
      <circle cx="86" cy="24" r="1.5" fill="#ffffff" />
      <circle cx="56" cy="18" r="1.5" fill="#fbbf24" />

      {/* Body of the puppy (calm soft warm gray/beige so tail pops out) */}
      {/* Back foot & leg */}
      <ellipse cx="44" cy="80" rx="9" ry="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      <ellipse cx="28" cy="80" rx="9" ry="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Torso */}
      <path
        d="M 28 66 C 26 78 48 84 52 72 C 55 62 48 54 36 54 C 30 54 28 60 28 66 Z"
        fill="#cbd5e1"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />
      {/* Front chest */}
      <path
        d="M 24 58 C 20 66 22 76 28 80 C 32 80 34 74 34 66 Z"
        fill="#f1f5f9"
      />

      {/* Puppy Head looking back happily toward its tail */}
      <circle cx="32" cy="44" r="13" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Floppy ear */}
      <path
        d="M 24 38 C 18 42 18 52 24 52 C 27 52 28 44 26 38 Z"
        fill="#94a3b8"
      />
      {/* Cute face */}
      {/* Happy eye */}
      <path d="M 33 42 Q 36 39 39 42" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <ellipse cx="38" cy="46" rx="2.5" ry="2" fill="#334155" />
      {/* Smile */}
      <path d="M 36 49 Q 39 52 41 49" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Rosy cheek */}
      <circle cx="33" cy="48" r="2.5" fill="#f43f5e" opacity="0.3" />

      {/* THE PROMINENT, VIBRANT FLUFFY TAIL (The Centerpiece!) */}
      {/* Tail Main Fluffy Shape */}
      <path
        d="M 48 68 C 56 68 64 64 68 56 C 74 46 76 34 72 24 C 70 19 64 19 62 25 C 59 33 60 44 54 52 C 50 58 45 62 48 68 Z"
        fill="url(#tailGrad)"
        stroke="#c2410c"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Fluffy Tail Tip (Bright White with jagged fluffy border) */}
      <path
        d="M 68 34 C 72 31 74 27 72 24 C 70 19 64 19 62 25 C 60 29 60 33 63 35 L 65 32 L 66 35 Z"
        fill="#ffffff"
        stroke="#c2410c"
        strokeWidth="2"
      />

      {/* Fur tufts / texture on tail */}
      <path d="M 68 45 C 72 44 76 46 74 49" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
      <path d="M 64 54 C 68 53 71 55 69 58" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />

      {/* Glossy highlight along tail curve */}
      <path
        d="M 53 58 C 58 52 64 42 66 32"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Bright pointing arrow directly to the tail */}
      <g transform="translate(68, 76) rotate(-70)">
        <line x1="0" y1="0" x2="16" y2="0" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="12,-5 20,0 12,5" fill="#ea580c" />
        <circle cx="-1" cy="0" r="3" fill="#f59e0b" />
      </g>
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
};

const RU_ALIASES: Record<string, string> = {
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
};

export const WordIllustration: React.FC<WordIllustrationProps> = ({
  word,
  fallbackEmoji,
  className = '',
}) => {
  if (!word) {
    return <span className={`select-none ${className}`}>{fallbackEmoji || '✨'}</span>;
  }

  const enKey = (word.en || '').toLowerCase().trim();
  const ruKey = (word.ru || '').toLowerCase().trim();
  const ruKeyNormalized = ruKey.replace(/ё/g, 'е');

  const targetKey =
    (WORD_SVGS[enKey] && enKey) ||
    RU_ALIASES[ruKey] ||
    RU_ALIASES[ruKeyNormalized] ||
    enKey;

  const customSvg = WORD_SVGS[targetKey];
  const hasCustomSize = /\b(w-|h-)/.test(className);
  const sizeClasses = hasCustomSize ? '' : 'w-16 h-16 sm:w-20 sm:h-20';
  const textClasses = /\btext-/.test(className) ? '' : 'text-5xl sm:text-6xl';

  if (customSvg) {
    return (
      <div className={`flex items-center justify-center select-none ${sizeClasses} ${className}`}>
        {customSvg}
      </div>
    );
  }

  // Fallback to emoji
  const emoji = getWordImage(word, fallbackEmoji);
  return (
    <span className={`select-none flex items-center justify-center leading-none ${textClasses} ${className}`}>
      {emoji}
    </span>
  );
};

