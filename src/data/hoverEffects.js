export const HOVER_EFFECTS = [
  {
    id: 1,
    name: '01. Inversion Fluide',
    category: 'Monochrome B&W',
    className: 'btn-hover-fill-sweep',
    description: 'Remplissage fluide du fond de droite à gauche avec inversion des couleurs.',
    cssCode: `.btn-hover-fill-sweep {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-hover-fill-sweep::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--btn-color, #18181b);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
  border-radius: inherit;
}

.btn-hover-fill-sweep:hover::before {
  transform: scaleX(1);
  transform-origin: left center;
}

.btn-hover-fill-sweep:hover {
  color: var(--btn-bg, #ffffff) !important;
}`
  },
  {
    id: 2,
    name: '02. Glissement Icône',
    category: 'Monochrome B&W',
    className: 'btn-hover-icon-push',
    description: 'Élévation subtile du bouton avec glissement dynamique de l’icône vers la droite.',
    cssCode: `.btn-hover-icon-push {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

.btn-hover-icon-push .btn-icon {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-icon-push:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.btn-hover-icon-push:hover .btn-icon-right {
  transform: translateX(6px);
}`
  },
  {
    id: 3,
    name: '03. Balayage Laser Ultra-Juicy',
    category: 'Monochrome B&W',
    className: 'btn-hover-shimmer',
    description: 'Un faisceau laser ultra-brillant balaie la surface avec un élan ressort dynamique, accompagnant une surélévation tactile du bouton et une impulsion de l’icône.',
    cssCode: `.btn-hover-shimmer {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              background-color 0.3s ease,
              box-shadow 0.3s ease;
}

.btn-hover-shimmer::before {
  content: '';
  position: absolute;
  top: -60%;
  left: -80%;
  width: 260%;
  height: 220%;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 255, 255, 0.9) 50%,
    transparent 80%
  );
  transform: translateX(-120%) rotate(25deg);
  transition: transform 1.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.btn-hover-shimmer:hover::before {
  transform: translateX(120%) rotate(25deg);
}

.btn-hover-shimmer:hover {
  transform: translateY(-2.5px) scale(1.02);
  box-shadow: 0 6px 20px rgba(24, 24, 27, 0.08);
}

.btn-hover-shimmer:hover .btn-icon {
  transform: translateX(4px) scale(1.15);
}`
  },
  {
    id: 4,
    name: '04. Bloc 3D Pressé',
    category: 'Monochrome B&W',
    className: 'btn-hover-3d-press',
    description: 'Effet bloc solide 3D avec ombre nette qui s’enfonce lors du survol et clic.',
    cssCode: `.btn-hover-3d-press {
  position: relative;
  box-shadow: 4px 4px 0px var(--btn-color, #18181b);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-hover-3d-press:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--btn-color, #18181b);
}`
  },
  {
    id: 5,
    name: '05. Métamorphose Rectangle',
    category: 'Monochrome B&W',
    className: 'btn-hover-corner-brackets',
    description: 'Au survol, le contour du bouton se métamorphose de sa forme d’origine vers un rectangle structuré (border-radius: 4px).',
    cssCode: `.btn-hover-corner-brackets {
  position: relative;
  transition: border-radius 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 0.25s ease,
              background-color 0.3s ease;
}

.btn-hover-corner-brackets:hover {
  border-radius: 4px !important;
  transform: translateY(-2px);
  background-color: rgba(24, 24, 27, 0.05);
}`
  },
  {
    id: 6,
    name: '06. Halo Lumineux',
    category: 'Monochrome B&W',
    className: 'btn-hover-glow-pulse',
    description: 'Halo lumineux monochrome qui se déploie avec un léger grossissement.',
    cssCode: `.btn-hover-glow-pulse {
  transition: box-shadow 0.35s ease, transform 0.25s ease;
}

.btn-hover-glow-pulse:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(24, 24, 27, 0.2), 0 0 40px rgba(24, 24, 27, 0.1);
}`
  },
  {
    id: 7,
    name: '07. Expansion Radiale',
    category: 'Monochrome B&W',
    className: 'btn-hover-ripple',
    description: 'Vague circulaire s’agrandissant depuis le centre du bouton.',
    cssCode: `.btn-hover-ripple {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-hover-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background-color: var(--btn-color, #18181b);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.45s ease-out, height 0.45s ease-out;
  z-index: -1;
}

.btn-hover-ripple:hover::before {
  width: 340px;
  height: 340px;
}

.btn-hover-ripple:hover {
  color: var(--btn-bg, #ffffff) !important;
}`
  },
  {
    id: 8,
    name: '08. Soulignement Intégré',
    category: 'Monochrome B&W',
    className: 'btn-hover-underline',
    description: 'Une ligne de soulignement fine et visible s’étend proprement à l’intérieur du bouton.',
    cssCode: `.btn-hover-underline {
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.25s ease;
}

.btn-hover-underline::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--btn-color, #18181b);
  transform: translateX(-50%);
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
  z-index: 2;
  pointer-events: none;
}

.btn-hover-underline:hover::after {
  width: calc(100% - 24px);
}

.btn-hover-underline:hover {
  transform: translateY(-2px);
}`
  },
  {
    id: 9,
    name: '09. Rotation Magnétique',
    category: 'Monochrome B&W',
    className: 'btn-hover-magnetic',
    description: 'Flottement vers le haut avec rotation fluide de 45° de l’icône.',
    cssCode: `.btn-hover-magnetic {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.btn-hover-magnetic .btn-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-magnetic:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.12);
}

.btn-hover-magnetic:hover .btn-icon {
  transform: rotate(45deg) scale(1.15);
}`
  },
  {
    id: 10,
    name: '10. Loupe Contrastée',
    category: 'Monochrome B&W',
    className: 'btn-hover-lens',
    description: 'Effet loupe/objectif avec expansion du centre et inversion nette du contraste.',
    cssCode: `.btn-hover-lens {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-lens::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: var(--btn-color, #18181b);
  border-radius: inherit;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-lens:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.btn-hover-lens:hover {
  color: var(--btn-bg, #ffffff) !important;
  transform: scale(1.03);
}`
  },
  {
    id: 11,
    name: '11. Ascenseur Texte',
    category: 'Monochrome B&W',
    className: 'btn-hover-text-elevator',
    description: 'Le texte monte hors du bouton avec un masquage strict pour éviter tout débordement.',
    cssCode: `.btn-hover-text-elevator {
  position: relative;
  overflow: hidden !important;
}

.btn-hover-text-elevator .btn-content-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  width: 100%;
}

.btn-hover-text-elevator:hover .btn-content-wrap {
  transform: translateY(-160%);
}

.btn-hover-text-elevator .btn-content-duplicate {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transform: translateY(160%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  width: 100%;
}

.btn-hover-text-elevator:hover .btn-content-duplicate {
  transform: translateY(0);
}`
  },
  {
    id: 12,
    name: '12. Vert Acide Néon',
    category: 'Accent Couleur',
    className: 'btn-hover-color-acid',
    description: 'Remplissage dynamique en vert acide néon (#CCFF00) haute intensité.',
    cssCode: `.btn-hover-color-acid {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-hover-color-acid::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: #CCFF00;
  transform: scaleY(0);
  transform-origin: bottom center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
  border-radius: inherit;
}

.btn-hover-color-acid:hover::before {
  transform: scaleY(1);
}

.btn-hover-color-acid:hover {
  color: #000000 !important;
  border-color: #CCFF00 !important;
  box-shadow: 0 0 20px rgba(204, 255, 0, 0.4);
}`
  },
  {
    id: 13,
    name: '13. Épaississement Bordure',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-weight',
    description: 'La bordure s’épaissit de 1.5px à 3px avec une légère expansion du bouton.',
    cssCode: `.btn-hover-outline-weight {
  transition: border-width 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.btn-hover-outline-weight:hover {
  border-width: 3px;
  transform: scale(1.02);
  box-shadow: inset 0 0 0 1px var(--btn-color, #18181b);
}`
  },
  {
    id: 14,
    name: '14. Bordure Pointillée',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-dashed',
    description: 'La bordure continue se transforme en contour pointillé dynamique.',
    cssCode: `.btn-hover-outline-dashed {
  transition: border-style 0.3s ease, border-color 0.3s ease, transform 0.25s ease;
}

.btn-hover-outline-dashed:hover {
  border-style: dashed;
  border-width: 1.5px;
  transform: scale(1.02);
  background-color: rgba(24, 24, 27, 0.04);
}`
  },
  {
    id: 15,
    name: '15. Double Anneau',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-double-ring',
    description: 'Un second anneau concentrique intérieur se rétracte et se colle au contour.',
    cssCode: `.btn-hover-outline-double-ring {
  position: relative;
  z-index: 1;
}

.btn-hover-outline-double-ring::before {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid var(--btn-color, #18181b);
  border-radius: inherit;
  opacity: 0;
  transform: scale(1.15);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.btn-hover-outline-double-ring:hover::before {
  opacity: 1;
  transform: scale(1);
}`
  },
  {
    id: 16,
    name: '16. Encoches d’Angles',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-notches',
    description: 'Quatre crochets d’angles géométriques (cadre d’angles) viennent encadrer le bouton au survol.',
    cssCode: `.btn-hover-outline-notches {
  position: relative;
  transition: transform 0.25s ease, background-color 0.3s ease;
}

.btn-hover-outline-notches::before,
.btn-hover-outline-notches::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid var(--btn-color, #18181b);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.btn-hover-outline-notches::before {
  top: -4px; left: -4px;
  border-right: none; border-bottom: none;
  transform: translate(-4px, -4px);
}

.btn-hover-outline-notches::after {
  bottom: -4px; right: -4px;
  border-left: none; border-top: none;
  transform: translate(4px, 4px);
}

.btn-hover-outline-notches:hover::before,
.btn-hover-outline-notches:hover::after {
  opacity: 1;
  transform: translate(0, 0);
}`
  },
  {
    id: 17,
    name: '17. Tracé Outline SVG (Loop & Close)',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-revolving',
    description: 'Au survol, une ouverture s’évide progressivement au point d’origine, fait un tour complet à 360° en glissant le long du contour, puis la fin du tracé la rattrape pour la sceller à 100%.',
    cssCode: `.btn-hover-outline-revolving {
  position: relative;
  border: none !important;
  background-color: transparent !important;
  transition: transform 0.25s ease;
}

.btn-hover-outline-revolving .btn-svg-rect {
  fill: transparent;
  stroke: var(--btn-color, #18181b);
  stroke-width: 1.5;
  pathLength: 100;
  stroke-dasharray: 0 0 100 0;
  stroke-dashoffset: 0;
  transition: fill 0.3s ease, stroke-dasharray 0.35s ease, stroke-dashoffset 0.35s ease;
}

@keyframes svgBorderCircuitComplete {
  0% {
    stroke-dasharray: 0 0 100 0;
    stroke-dashoffset: 0;
  }
  18% {
    stroke-dasharray: 0 20 80 0;
    stroke-dashoffset: 0;
  }
  82% {
    stroke-dasharray: 0 20 80 0;
    stroke-dashoffset: -80;
  }
  100% {
    stroke-dasharray: 0 0 100 0;
    stroke-dashoffset: -100;
  }
}

.btn-hover-outline-revolving:hover .btn-svg-rect {
  fill: rgba(24, 24, 27, 0.05);
  animation: svgBorderCircuitComplete 0.95s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.btn-hover-outline-revolving:hover {
  transform: translateY(-2px);
}`
  },
  {
    id: 18,
    name: '18. Éjection Confettis Pétillants',
    category: 'Effets Spéciaux',
    className: 'btn-hover-confetti-burst',
    description: 'Inspiré de votre snippet btn-187 : projection explosive de bulles confettis aux couleurs hyper pétillantes (Rose Néon, Vert Acide, Cyan, Jaune Vif).',
    cssCode: `.btn-hover-confetti-burst::before {
  background-image: 
    radial-gradient(circle, #FF007F 22%, transparent 22%),
    radial-gradient(circle, #00FF66 22%, transparent 22%),
    radial-gradient(circle, #B026FF 22%, transparent 22%),
    radial-gradient(circle, #CCFF00 22%, transparent 22%),
    radial-gradient(circle, #00F0FF 22%, transparent 22%),
    radial-gradient(circle, #FFE600 22%, transparent 22%);
  animation: animate_top_confetti 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards 1;
}`
  },
  {
    id: 19,
    name: '19. Permutation Icône & Mot',
    category: 'Effets Spéciaux',
    className: 'btn-hover-icon-swap-morph',
    description: 'Au survol, le mot et le picto permutent exactement leurs positions tout en conservant le même border-radius qu’à l’entrée avec un remplissage expansif.',
    cssCode: `.btn-hover-icon-swap-morph {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  --swap-text-x: -25px;
  --swap-icon-x: 56px;
  transition: transform 0.25s ease,
              background-color 0.3s ease,
              color 0.3s ease;
}

.btn-hover-icon-swap-morph::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 100%;
  height: 100%;
  min-width: 260px;
  min-height: 260px;
  background-color: var(--btn-color, #18181b);
  border-radius: 50%;
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: -1;
}

.btn-hover-icon-swap-morph:hover::before {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.btn-hover-icon-swap-morph .btn-content-wrap,
.btn-hover-icon-swap-morph .btn-icon-swap-left {
  transition: transform 0.55s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn-hover-icon-swap-morph:hover .btn-content-wrap {
  transform: translateX(var(--swap-text-x));
}

.btn-hover-icon-swap-morph:hover .btn-icon-swap-left {
  transform: translateX(var(--swap-icon-x));
}

.btn-hover-icon-swap-morph:hover {
  color: var(--btn-bg, #ffffff) !important;
  border-color: var(--btn-color, #18181b) !important;
}`
  },
  {
    id: 20,
    name: '20. Vagues en Cascades Staggered',
    category: 'Effets Spéciaux',
    className: 'btn-hover-stagger-liquid',
    description: 'Inspiré de votre snippet btn-74 : 4 colonnes circulaires s’élèvent en cascades décalées (stagger) pour remplir le fond.',
    cssCode: `.btn-hover-stagger-liquid .btn-stagger-drop {
  position: absolute;
  width: 25.5%;
  height: 100%;
  background-color: var(--btn-color, #18181b);
  transform: translateY(150%);
  border-radius: 50%;
  left: calc((var(--delay) - 1) * 25%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc((var(--delay) - 1) * 0.08s);
}

.btn-hover-stagger-liquid:hover .btn-stagger-drop {
  transform: translateY(0) scale(2.2);
}`
  },
  {
    id: 21,
    name: '21. Typographie Rolling & Picto Magique',
    category: 'Effets Spéciaux',
    className: 'btn-hover-rolling-magic',
    description: 'Au survol, les lettres s’enchaînent en cascade 3D rouleaux et le picto réalise une révolution complète 360° lumineuse avec aura néon.',
    cssCode: `.btn-hover-rolling-magic {
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, background-color 0.3s ease;
}

.btn-hover-rolling-magic:hover {
  transform: translateY(-2px);
  background-color: rgba(24, 24, 27, 0.05);
}

.btn-hover-rolling-magic:hover .btn-icon {
  transform: translateX(4px) rotate(360deg) scale(1.25);
  filter: drop-shadow(0 0 8px var(--btn-color, #18181b));
}

.btn-hover-rolling-magic:hover .btn-rolling-line.original .btn-rolling-char {
  transform: translateY(-120%) rotateX(90deg);
  opacity: 0;
}

.btn-hover-rolling-magic:hover .btn-rolling-line.duplicate .btn-rolling-char {
  transform: translateY(0) rotateX(0);
  opacity: 1;
}`
  },
  {
    id: 22,
    name: '22. Double Tracé SVG Opposé (Colliding Circuits)',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-dual-pulse',
    description: 'Au survol, deux impulsions SVG s’élancent simultanément depuis des coins opposés (horaire & anti-horaire), se rencontrent avec un flash lumineux et scellent la bordure.',
    cssCode: `.btn-hover-outline-dual-pulse {
  position: relative;
  border: none !important;
  transition: transform 0.3s ease;
}

.btn-hover-outline-dual-pulse:hover .btn-svg-rect-pulse-1 {
  fill: rgba(24, 24, 27, 0.05);
  animation: svgDualPulseCW 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.btn-hover-outline-dual-pulse:hover .btn-svg-rect-pulse-2 {
  animation: svgDualPulseCCW 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.btn-hover-outline-dual-pulse:hover {
  transform: translateY(-2px);
}`
  },
  {
    id: 23,
    name: '23. Tracé SVG Circuit Monochromatique',
    category: 'Transformations Outline',
    className: 'btn-hover-outline-draw-glow',
    description: 'Le bouton possède son contour complet au repos. Au survol, une ouverture balaye le circuit à 360° avant de se refermer hermétiquement.',
    cssCode: `.btn-hover-outline-draw-glow {
  position: relative;
  border: none !important;
  transition: transform 0.25s ease;
}

.btn-hover-outline-draw-glow .btn-svg-rect-draw {
  stroke-dasharray: 100 0;
  transition: fill 0.3s ease;
}

@keyframes svgCleanCircuitSweep {
  0% { stroke-dasharray: 100 0; stroke-dashoffset: 0; }
  20% { stroke-dasharray: 25 75; stroke-dashoffset: -5; }
  80% { stroke-dasharray: 25 75; stroke-dashoffset: -75; }
  100% { stroke-dasharray: 100 0; stroke-dashoffset: -100; }
}

.btn-hover-outline-draw-glow:hover .btn-svg-rect-draw {
  fill: rgba(24, 24, 27, 0.05);
  animation: svgCleanCircuitSweep 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.btn-hover-outline-draw-glow:hover {
  transform: translateY(-2px);
}`
  },
  {
    id: 24,
    name: '24. Volet Diagonal Bicolore',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-diagonal-shutter',
    description: 'Deux volets diagonaux s’unissent depuis des angles opposés avec surélévation tactile.',
    cssCode: `.btn-hover-diagonal-shutter {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.btn-hover-diagonal-shutter::before,
.btn-hover-diagonal-shutter::after {
  content: '';
  position: absolute;
  width: 130%;
  height: 130%;
  background-color: var(--btn-color, #18181b);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
  pointer-events: none;
}

.btn-hover-diagonal-shutter::before {
  top: -130%;
  left: -130%;
  transform: rotate(25deg);
}

.btn-hover-diagonal-shutter::after {
  bottom: -130%;
  right: -130%;
  transform: rotate(25deg);
}

.btn-hover-diagonal-shutter:hover::before {
  transform: translate(65%, 65%) rotate(25deg);
}

.btn-hover-diagonal-shutter:hover::after {
  transform: translate(-65%, -65%) rotate(25deg);
}

.btn-hover-diagonal-shutter:hover {
  color: var(--btn-bg, #ffffff) !important;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 24px -4px rgba(24, 24, 27, 0.18);
}`
  },
  {
    id: 25,
    name: '25. Réfraction Holographique',
    category: 'Effets Spéciaux',
    className: 'btn-hover-holographic-glitch',
    description: 'Faisceau prismatique holographique avec balayage néon et inclinaison dynamique de l’icône.',
    cssCode: `.btn-hover-holographic-glitch {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.btn-hover-holographic-glitch::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -150%;
  width: 220%;
  height: 200%;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(0, 240, 255, 0.45) 38%,
    rgba(255, 0, 128, 0.45) 50%,
    rgba(204, 255, 0, 0.45) 62%,
    transparent 80%
  );
  transform: rotate(25deg);
  transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
  z-index: 1;
}

.btn-hover-holographic-glitch:hover::before {
  transform: translateX(180%) rotate(25deg);
}

.btn-hover-holographic-glitch:hover {
  transform: translateY(-3px) scale(1.025);
  box-shadow: 0 8px 24px rgba(0, 240, 255, 0.25), 0 2px 10px rgba(255, 0, 128, 0.2);
  border-color: rgba(0, 240, 255, 0.6) !important;
}

.btn-hover-holographic-glitch .btn-icon {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-holographic-glitch:hover .btn-icon {
  transform: scale(1.2) rotate(-12deg);
}`
  }
];

