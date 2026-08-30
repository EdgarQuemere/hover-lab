export const HOVER_EFFECTS = [
  {
    id: 1,
    name: '01. Inversion Fluide',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-fill-sweep',
    description: 'Remplissage doux de gauche à droite avec inversion contrastée des couleurs.',
    cssCode: `.btn-hover-fill-sweep {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-hover-fill-sweep::before {
  content: '';
  position: absolute;
  inset: -1px;
  background-color: var(--btn-color, #18181b);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform var(--anim-speed, 0.38s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-fill-sweep:hover::before {
  transform: scaleX(1);
  transform-origin: left center;
}

.btn-hover-fill-sweep:hover {
  color: var(--btn-bg, #ffffff) !important;
  border-color: var(--btn-color, #18181b) !important;
}`
  },
  {
    id: 2,
    name: '02. Glissement Icône',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-icon-push',
    description: 'Surélévation subtile du bouton avec glissement dynamique du picto vers la droite.',
    cssCode: `.btn-hover-icon-push {
  transition: transform var(--anim-speed, 0.25s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.25s) ease,
              background-color var(--anim-speed, 0.25s) ease;
}

.btn-hover-icon-push .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-icon-push:hover {
  transform: translateY(-3px);
  background-color: #18181b0f;
  box-shadow: 0 8px 24px -4px #18181b2e;
}

.btn-hover-icon-push:hover .btn-icon,
.btn-hover-icon-push:hover .btn-icon-right {
  transform: translateX(6px);
}

.btn-hover-icon-push:hover .btn-icon-left {
  transform: translateX(-6px);
}

.btn-hover-icon-push.btn-icon-only:hover .btn-icon {
  transform: translateX(4px);
}`
  },
  {
    id: 3,
    name: '03. Reflet Éclat',
    category: 'Effets Spéciaux',
    className: 'btn-hover-shimmer',
    description: 'Faisceau de lumière diagonal qui balaie la surface avec un éclat fluide.',
    cssCode: `.btn-hover-shimmer {
  position: relative;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.25s ease,
              box-shadow 0.25s ease;
}

.btn-hover-shimmer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    115deg,
    transparent 30%,
    #ffffff00 40%,
    #ffffff4d 48%,
    #ffffffff 50%,
    #ffffff4d 52%,
    #ffffff00 60%,
    transparent 70%
  );
  transform: translateX(-100%) rotate(25deg);
  transition: transform 0s;
  pointer-events: none;
  z-index: 3;
}

.btn-hover-shimmer:hover::before,
.btn-hover-shimmer.is-auto-hovered::before {
  transform: translateX(100%) rotate(25deg);
  transition: transform var(--anim-speed, 1.5s) cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hover-shimmer:hover,
.btn-hover-shimmer.is-auto-hovered {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px #00000014;
}

.btn-hover-shimmer:active {
  transform: translateY(0);
}

.btn-hover-shimmer .btn-icon {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hover-shimmer:hover .btn-icon,
.btn-hover-shimmer.is-auto-hovered .btn-icon {
  transform: translateX(3px);
}`
  },
  {
    id: 4,
    name: '04. Bloc 3D Pressé',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-3d-press',
    description: 'Effet de relief extrudé 3D qui s’enfonce fermement sous le clic et le survol.',
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
    name: '05. Métamorphose Géométrique',
    category: 'Bordures & Contours',
    className: 'btn-hover-corner-brackets',
    description: 'Quatre crochets géométriques qui se resserrent pour cadrer les angles.',
    cssCode: `.btn-hover-corner-brackets {
  position: relative;
  transition: border-radius var(--anim-speed, 0.4s) cubic-bezier(0.34, 1.56, 0.64, 1),
              transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              background-color var(--anim-speed, 0.3s) ease,
              color var(--anim-speed, 0.3s) ease,
              box-shadow var(--anim-speed, 0.3s) ease;
}

.btn-hover-corner-brackets:hover,
.btn-hover-corner-brackets.is-auto-hovered {
  border-radius: 0px !important;
  transform: translateY(-2px) scale(1.02);
  background-color: var(--btn-color, #18181b);
  color: var(--btn-bg, #ffffff) !important;
  box-shadow: 0 8px 24px -4px #0000002e;
}

.btn-hover-corner-brackets[style*="border-radius: 0px"] {
  transition: border-radius var(--anim-speed, 0.45s) cubic-bezier(0.16, 1, 0.3, 1),
              transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              background-color var(--anim-speed, 0.3s) ease,
              color var(--anim-speed, 0.3s) ease,
              box-shadow var(--anim-speed, 0.3s) ease;
}

.btn-hover-corner-brackets[style*="border-radius: 0px"]:hover,
.btn-hover-corner-brackets[style*="border-radius: 0px"].is-auto-hovered {
  border-radius: 30px !important;
}

.btn-hover-corner-brackets:active {
  transform: translateY(0) scale(0.98);
}

.btn-hover-corner-brackets .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-corner-brackets:hover .btn-icon,
.btn-hover-corner-brackets.is-auto-hovered .btn-icon {
  transform: translateX(4px);
}`
  },
  {
    id: 6,
    name: '06. Halo Respirant',
    category: 'Effets Spéciaux',
    className: 'btn-hover-glow-pulse',
    description: 'Aura lumineuse diffuse avec apparition et extinction en fondu velouté.',
    cssCode: `@keyframes ambientAuraBreathing {
  0%, 100% {
    box-shadow: 0 0 16px var(--btn-color, #18181b),
                0 0 32px var(--btn-color, #18181b);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 28px var(--btn-color, #18181b),
                0 0 52px var(--btn-color, #18181b);
    transform: scale(1.02);
  }
}

.btn-hover-glow-pulse {
  position: relative;
  transition: transform var(--anim-speed, 0.4s) cubic-bezier(0.16, 1, 0.3, 1),
              background-color var(--anim-speed, 0.4s) ease;
}

.btn-hover-glow-pulse::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--anim-speed, 0.45s) ease;
  z-index: -1;
}

.btn-hover-glow-pulse:hover::before,
.btn-hover-glow-pulse.is-auto-hovered::before {
  opacity: 1;
  animation: ambientAuraBreathing 2.2s ease-in-out infinite;
}

.btn-hover-glow-pulse:hover,
.btn-hover-glow-pulse.is-auto-hovered {
  transform: translateY(-2px);
  background-color: #18181b0a;
}

.btn-hover-glow-pulse:active {
  transform: translateY(0) scale(0.99);
}

.btn-hover-glow-pulse .btn-icon {
  transition: transform var(--anim-speed, 0.4s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-glow-pulse:hover .btn-icon,
.btn-hover-glow-pulse.is-auto-hovered .btn-icon {
  transform: scale(1.15);
}`
  },
  {
    id: 7,
    name: '07. Expansion Radiale',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-ripple',
    description: 'Onde circulaire fluide qui grandit depuis le centre pour couvrir le bouton.',
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
    name: '08. Carte 3D Pivotante',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-card-flip',
    description: 'Rotation 3D spectaculaire à 180° dévoilant le verso contrasté.',
    cssCode: `.btn-hover-card-flip {
  perspective: 1000px;
  position: relative;
  overflow: visible;
  background: none;
  border: none;
  padding: 0;
}

.btn-hover-card-flip .card-inner {
  position: relative;
  display: inline-flex;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
}

.btn-hover-card-flip:hover .card-inner {
  transform: rotateY(180deg);
}

.btn-hover-card-flip .card-front,
.btn-hover-card-flip .card-back {
  backface-visibility: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1.5px solid var(--btn-color, #18181b);
  border-radius: inherit;
}

.btn-hover-card-flip .card-front {
  background-color: var(--btn-bg, transparent);
  color: var(--btn-color, #18181b);
  padding: 12px 28px;
}

.btn-hover-card-flip .card-back {
  position: absolute;
  inset: 0;
  background-color: var(--btn-color, #18181b);
  color: var(--btn-bg, #ffffff);
  transform: rotateY(180deg);
}`
  },
  {
    id: 9,
    name: '09. Rotation Magnétique',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-magnetic',
    description: 'Élévation flottante du bouton avec pivot dynamique de l’icône à 45°.',
    cssCode: `.btn-hover-magnetic {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.btn-hover-magnetic .btn-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-magnetic:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px -6px #0000001f;
  background-color: #18181b0a;
}

.btn-hover-magnetic:hover .btn-icon {
  transform: rotate(45deg) scale(1.15);
}`
  },
  {
    id: 10,
    name: '10. Double Volet Split',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-lens',
    description: 'Deux volets verticaux glissent depuis le haut et le bas pour sceller le centre.',
    cssCode: `.btn-hover-lens {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease;
}

.btn-hover-lens::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  height: 58%;
  background-color: var(--btn-color, #18181b);
  transform: translateY(-105%);
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-lens::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: -2px;
  right: -2px;
  height: 58%;
  background-color: var(--btn-color, #18181b);
  transform: translateY(105%);
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-lens:hover::before,
.btn-hover-lens.is-auto-hovered::before,
.btn-hover-lens:hover::after,
.btn-hover-lens.is-auto-hovered::after {
  transform: translateY(0);
}

.btn-hover-lens:hover,
.btn-hover-lens.is-auto-hovered {
  color: var(--btn-bg, #ffffff) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px #00000029;
}

.btn-hover-lens:active {
  transform: translateY(0);
}

.btn-hover-lens .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-lens:hover .btn-icon,
.btn-hover-lens.is-auto-hovered .btn-icon {
  transform: translateX(4px) scale(1.1);
}`
  },
  {
    id: 11,
    name: '11. Ascenseur Texte',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-text-elevator',
    description: 'Le texte monte et laisse place à son double par glissement vertical continu.',
    cssCode: `.btn-hover-text-elevator {
  position: relative;
  overflow: hidden !important;
}

.btn-hover-text-elevator .btn-content-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
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
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  width: 100%;
}

.btn-hover-text-elevator:hover .btn-content-duplicate {
  transform: translateY(0);
}`
  },
  {
    id: 12,
    name: '12. Néon',
    category: 'Effets Spéciaux',
    className: 'btn-hover-color-acid',
    description: 'Allumage électrique instantané avec étincelle d’ignition et halo haute tension.',
    cssCode: `@keyframes neonFlickerIgnition {
  0% {
    opacity: 0.8;
    box-shadow: 0 0 4px var(--btn-color, #ccff00);
  }
  15% {
    opacity: 0.4;
    box-shadow: none;
  }
  30% {
    opacity: 1;
    box-shadow: 0 0 15px var(--btn-color, #ccff00),
                0 0 35px var(--btn-color, #ccff00);
  }
  45% {
    opacity: 0.7;
    box-shadow: 0 0 6px var(--btn-color, #ccff00);
  }
  60% {
    opacity: 1;
    box-shadow: 0 0 20px var(--btn-color, #ccff00),
                0 0 45px var(--btn-color, #ccff00),
                inset 0 0 12px var(--btn-color, #ccff00);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 20px var(--btn-color, #ccff00),
                0 0 45px var(--btn-color, #ccff00),
                inset 0 0 12px var(--btn-color, #ccff00);
  }
}

.btn-hover-color-acid {
  position: relative;
  transition: color var(--anim-speed, 0.2s) ease,
              border-color var(--anim-speed, 0.2s) ease,
              transform var(--anim-speed, 0.25s) ease,
              box-shadow var(--anim-speed, 0.25s) ease,
              text-shadow var(--anim-speed, 0.25s) ease;
}

.btn-hover-color-acid:hover,
.btn-hover-color-acid.is-auto-hovered {
  animation: neonFlickerIgnition 0.4s ease-out forwards;
  color: var(--btn-color, #ccff00) !important;
  border-color: var(--btn-color, #ccff00) !important;
  text-shadow: 0 0 8px var(--btn-color, #ccff00),
               0 0 18px var(--btn-color, #ccff00);
  transform: translateY(-2px) scale(1.02);
  background-color: #00000033;
}

.btn-hover-color-acid:active {
  transform: translateY(0) scale(0.99);
}

.btn-hover-color-acid .btn-icon {
  transition: transform var(--anim-speed, 0.25s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-color-acid:hover .btn-icon,
.btn-hover-color-acid.is-auto-hovered .btn-icon {
  transform: scale(1.2);
}`
  },
  {
    id: 13,
    name: '13. Épaississement Bordure',
    category: 'Bordures & Contours',
    className: 'btn-hover-outline-weight',
    description: 'Le contour s’épaissit vers l’extérieur avec expansion tactile du bouton.',
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
    category: 'Bordures & Contours',
    className: 'btn-hover-outline-dashed',
    description: 'La bordure continue se transforme en pointillés dynamiques en rotation.',
    cssCode: `.btn-hover-outline-dashed {
  transition: border-style 0.3s ease, border-color 0.3s ease, transform 0.25s ease;
}

.btn-hover-outline-dashed:hover {
  border-style: dashed;
  border-width: 1.5px;
  transform: scale(1.02);
  background-color: #18181b0a;
}`
  },
  {
    id: 15,
    name: '15. Double Anneau',
    category: 'Bordures & Contours',
    className: 'btn-hover-outline-double-ring',
    description: 'Un second contour concentrique se rétracte et fusionne avec la bordure.',
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
    name: '16. Viseur Tech (Corner Brackets)',
    category: 'Bordures & Contours',
    className: 'btn-hover-outline-notches',
    description: 'Encoches géométriques qui viennent verrouiller les 4 coins du bouton.',
    cssCode: `.btn-hover-outline-notches {
  position: relative;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease,
              background-color var(--anim-speed, 0.3s) ease;
}

.btn-hover-outline-notches::before {
  content: '';
  position: absolute;
  inset: -6px;
  background:
    /* Top Left */
    linear-gradient(to right, var(--btn-color, #18181b) 2px, transparent 2px) top left / 10px 10px no-repeat,
    linear-gradient(to bottom, var(--btn-color, #18181b) 2px, transparent 2px) top left / 10px 10px no-repeat,
    /* Top Right */
    linear-gradient(to left, var(--btn-color, #18181b) 2px, transparent 2px) top right / 10px 10px no-repeat,
    linear-gradient(to bottom, var(--btn-color, #18181b) 2px, transparent 2px) top right / 10px 10px no-repeat,
    /* Bottom Left */
    linear-gradient(to right, var(--btn-color, #18181b) 2px, transparent 2px) bottom left / 10px 10px no-repeat,
    linear-gradient(to top, var(--btn-color, #18181b) 2px, transparent 2px) bottom left / 10px 10px no-repeat,
    /* Bottom Right */
    linear-gradient(to left, var(--btn-color, #18181b) 2px, transparent 2px) bottom right / 10px 10px no-repeat,
    linear-gradient(to top, var(--btn-color, #18181b) 2px, transparent 2px) bottom right / 10px 10px no-repeat;
  opacity: 0;
  transform: scale(1.22);
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1),
              opacity var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.btn-hover-outline-notches::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: var(--btn-color, #18181b);
  opacity: 0;
  transform: scale(0.96);
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              opacity var(--anim-speed, 0.3s) ease;
  pointer-events: none;
  z-index: -1;
}

.btn-hover-outline-notches:hover::before,
.btn-hover-outline-notches.is-auto-hovered::before {
  opacity: 1;
  transform: scale(1);
}

.btn-hover-outline-notches:hover::after,
.btn-hover-outline-notches.is-auto-hovered::after {
  opacity: 0.08;
  transform: scale(1);
}

.btn-hover-outline-notches:hover,
.btn-hover-outline-notches.is-auto-hovered {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px #0000001f;
}

.btn-hover-outline-notches:active {
  transform: translateY(0);
}

.btn-hover-outline-notches .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hover-outline-notches:hover .btn-icon,
.btn-hover-outline-notches.is-auto-hovered .btn-icon {
  transform: translateX(4px);
}`
  },
  {
    id: 17,
    name: '17. Tracé Outline SVG (Loop & Close)',
    category: 'Bordures & Contours',
    className: 'btn-hover-outline-revolving',
    description: 'Une ligne laser vectorielle parcourt le périmètre à 360° avant de se sceller.',
    cssCode: `.btn-hover-outline-revolving {
  position: relative;
  border: none !important;
  background-color: transparent !important;
  transition: transform var(--anim-speed, 0.25s) ease;
}

.btn-hover-outline-revolving .btn-svg-border {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  border-radius: inherit;
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
  fill: #18181b0d;
  animation: svgBorderCircuitComplete var(--anim-speed, 0.95s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
    description: 'Explosion festive de particules néon projetées tout autour du bouton.',
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
    name: '19. Permutation Icône & Texte',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-icon-swap-morph',
    description: 'L’icône et le mot échangent instantanément leur place avec glissement croisé.',
    cssCode: `.btn-hover-icon-swap-morph {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 1;
  --swap-text-x: -26px;
  --swap-icon-x: 76px;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              background-color var(--anim-speed, 0.3s) ease,
              border-color var(--anim-speed, 0.3s) ease,
              color var(--anim-speed, 0.3s) ease,
              box-shadow var(--anim-speed, 0.3s) ease;
}

.btn-size-sm.btn-hover-icon-swap-morph {
  --swap-text-x: -22px;
  --swap-icon-x: 66px;
}

.btn-size-lg.btn-hover-icon-swap-morph {
  --swap-text-x: -29px;
  --swap-icon-x: 87px;
}

.btn-hover-icon-swap-morph::before {
  content: '';
  position: absolute;
  inset: -1px;
  background-color: var(--btn-color, #18181b);
  transform: scale(0);
  border-radius: inherit;
  transition: transform var(--anim-speed, 0.4s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-icon-swap-morph:hover::before,
.btn-hover-icon-swap-morph.is-auto-hovered::before {
  transform: scale(1);
}

.btn-hover-icon-swap-morph .btn-content-wrap,
.btn-hover-icon-swap-morph .btn-icon-swap-left {
  position: relative;
  z-index: 1;
  transition: transform var(--anim-speed, 0.45s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-icon-swap-morph:hover .btn-content-wrap,
.btn-hover-icon-swap-morph.is-auto-hovered .btn-content-wrap {
  transform: translateX(var(--swap-text-x));
}

.btn-hover-icon-swap-morph:hover .btn-icon-swap-left,
.btn-hover-icon-swap-morph.is-auto-hovered .btn-icon-swap-left {
  transform: translateX(var(--swap-icon-x));
}

.btn-hover-icon-swap-morph:hover,
.btn-hover-icon-swap-morph.is-auto-hovered {
  color: var(--btn-bg, #ffffff) !important;
  border-color: var(--btn-color, #18181b) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px #00000029;
}

.btn-hover-icon-swap-morph:active {
  transform: translateY(0) scale(0.98);
}`
  },
  {
    id: 20,
    name: '20. Vagues en Cascades Staggered',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-stagger-liquid',
    description: 'Quatre colonnes liquides tombent en décalé pour remplir le fond.',
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
    category: 'Glissements & Mouvements',
    className: 'btn-hover-rolling-magic',
    description: 'Cascade de lettres en rouleaux 3D et révolution 360° lumineuse de l’icône.',
    cssCode: `.btn-hover-rolling-magic {
  position: relative;
  overflow: hidden;
  transition: transform var(--anim-speed, 0.25s) ease,
              background-color var(--anim-speed, 0.3s) ease,
              border-color var(--anim-speed, 0.3s) ease,
              box-shadow var(--anim-speed, 0.35s) ease;
}

.btn-hover-rolling-magic:hover {
  transform: translateY(-2px);
  background-color: #18181b0d;
}

.btn-hover-rolling-magic .btn-icon {
  position: relative;
  z-index: 2;
  transition: transform var(--anim-speed, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1), filter var(--anim-speed, 0.4s) ease;
}

.btn-hover-rolling-magic:hover .btn-icon {
  transform: translateX(4px) rotate(360deg) scale(1.25);
  filter: drop-shadow(0 0 8px var(--btn-color, #18181b));
}

.btn-hover-rolling-magic .btn-rolling-text {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1.2;
  vertical-align: middle;
}

.btn-hover-rolling-magic .btn-rolling-line {
  display: inline-flex;
  white-space: pre;
}

.btn-hover-rolling-magic .btn-rolling-line.duplicate {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.btn-hover-rolling-magic .btn-rolling-char {
  display: inline-block;
  transition: transform var(--anim-speed, 0.45s) cubic-bezier(0.34, 1.56, 0.64, 1), opacity var(--anim-speed, 0.3s) ease;
  transition-delay: calc(var(--char-i) * (var(--anim-speed, 0.35s) * 0.1));
  transform-origin: 50% 100%;
  backface-visibility: hidden;
}

.btn-hover-rolling-magic .btn-rolling-line.original .btn-rolling-char {
  transform: translateY(0) rotateX(0);
  opacity: 1;
}

.btn-hover-rolling-magic .btn-rolling-line.duplicate .btn-rolling-char {
  transform: translateY(120%) rotateX(-90deg);
  opacity: 0;
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
    name: '22. Double Onde Concentrique',
    category: 'Effets Spéciaux',
    className: 'btn-hover-outline-dual-pulse',
    description: 'Deux ondes de choc radar se propagent vers l’extérieur avec halo diffus.',
    cssCode: `@keyframes concentricWavePulse1 {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.35, 1.6);
    opacity: 0;
  }
}

@keyframes concentricWavePulse2 {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.6, 2.1);
    opacity: 0;
  }
}

.btn-hover-outline-dual-pulse {
  position: relative;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease,
              background-color var(--anim-speed, 0.3s) ease;
}

.btn-hover-outline-dual-pulse::before,
.btn-hover-outline-dual-pulse::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1.5px solid var(--btn-color, #18181b);
  pointer-events: none;
  opacity: 0;
  z-index: -1;
}

.btn-hover-outline-dual-pulse:hover::before,
.btn-hover-outline-dual-pulse.is-auto-hovered::before {
  animation: concentricWavePulse1 var(--anim-speed, 0.8s) cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.btn-hover-outline-dual-pulse:hover::after,
.btn-hover-outline-dual-pulse.is-auto-hovered::after {
  animation: concentricWavePulse2 var(--anim-speed, 0.8s) cubic-bezier(0.16, 1, 0.3, 1) infinite;
  animation-delay: 0.18s;
}

.btn-hover-outline-dual-pulse:hover,
.btn-hover-outline-dual-pulse.is-auto-hovered {
  transform: translateY(-2px) scale(1.02);
  background-color: #18181b0f;
  box-shadow: 0 0 20px var(--btn-color, #18181b);
}

.btn-hover-outline-dual-pulse:active {
  transform: translateY(0) scale(0.98);
}

.btn-hover-outline-dual-pulse .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-outline-dual-pulse:hover .btn-icon,
.btn-hover-outline-dual-pulse.is-auto-hovered .btn-icon {
  transform: scale(1.2);
}`
  },
  {
    id: 23,
    name: '23. Scanner Laser Holographique',
    category: 'Effets Spéciaux',
    className: 'btn-hover-outline-draw-glow',
    description: 'Faisceau laser vertical haute précision qui balaie le bouton de haut en bas.',
    cssCode: `@keyframes cyberLaserScan {
  0% {
    top: -20%;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    top: 120%;
    opacity: 0;
  }
}

.btn-hover-outline-draw-glow {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease,
              border-color var(--anim-speed, 0.3s) ease,
              color var(--anim-speed, 0.3s) ease;
}

.btn-hover-outline-draw-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--btn-color, #18181b) 50%,
    transparent 100%
  );
  opacity: 0;
  transform: translateY(-100%);
  transition: transform var(--anim-speed, 0.6s) ease, opacity var(--anim-speed, 0.3s) ease;
  z-index: -1;
}

.btn-hover-outline-draw-glow::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--btn-color, #18181b);
  box-shadow: 0 0 12px var(--btn-color, #18181b),
              0 0 24px var(--btn-color, #18181b);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
}

.btn-hover-outline-draw-glow:hover::before,
.btn-hover-outline-draw-glow.is-auto-hovered::before {
  opacity: 0.12;
  transform: translateY(0);
}

.btn-hover-outline-draw-glow:hover::after,
.btn-hover-outline-draw-glow.is-auto-hovered::after {
  animation: cyberLaserScan var(--anim-speed, 1s) cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.btn-hover-outline-draw-glow:hover,
.btn-hover-outline-draw-glow.is-auto-hovered {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px #00000029,
              0 0 15px var(--btn-color, #18181b);
}

.btn-hover-outline-draw-glow:active {
  transform: translateY(0);
}

.btn-hover-outline-draw-glow .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-outline-draw-glow:hover .btn-icon,
.btn-hover-outline-draw-glow.is-auto-hovered .btn-icon {
  transform: translateX(4px);
}`
  },
  {
    id: 24,
    name: '24. Volet Diagonal',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-diagonal-shutter',
    description: 'Deux lames biseautées à 30° glissent depuis les angles pour sceller le fond.',
    cssCode: `.btn-hover-diagonal-shutter {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease;
}

.btn-hover-diagonal-shutter::before {
  content: '';
  position: absolute;
  top: -4px;
  bottom: -4px;
  left: -25%;
  width: 80%;
  background-color: var(--btn-color, #18181b);
  transform: skewX(-30deg) translateX(-150%);
  transition: transform var(--anim-speed, 0.38s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-diagonal-shutter::after {
  content: '';
  position: absolute;
  top: -4px;
  bottom: -4px;
  right: -25%;
  width: 80%;
  background-color: var(--btn-color, #18181b);
  transform: skewX(-30deg) translateX(150%);
  transition: transform var(--anim-speed, 0.38s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-diagonal-shutter:hover::before,
.btn-hover-diagonal-shutter.is-auto-hovered::before,
.btn-hover-diagonal-shutter:hover::after,
.btn-hover-diagonal-shutter.is-auto-hovered::after {
  transform: skewX(-30deg) translateX(0);
}

.btn-hover-diagonal-shutter:hover,
.btn-hover-diagonal-shutter.is-auto-hovered {
  color: var(--btn-bg, #ffffff) !important;
  border-color: var(--btn-color, #18181b) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px #00000029;
}

.btn-hover-diagonal-shutter:active {
  transform: translateY(0);
}

.btn-hover-diagonal-shutter .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-diagonal-shutter:hover .btn-icon,
.btn-hover-diagonal-shutter.is-auto-hovered .btn-icon {
  transform: translateX(4px) scale(1.1);
}`
  },
  {
    id: 25,
    name: '25. Glitch Holographique',
    category: 'Effets Spéciaux',
    className: 'btn-hover-holographic-glitch',
    description: 'Aberration chromatique cyan/magenta avec scanlines CRT et décalage RGB.',
    cssCode: `@keyframes cyberChromaticJitter {
  0% {
    transform: translateX(0);
    text-shadow: -2px 0 #00ffff, 2px 0 #ff0055;
  }
  15% {
    transform: translateX(-2px) skewX(-2deg);
    text-shadow: 3px -1px #00ffff, -3px 1px #ff0055;
  }
  30% {
    transform: translateX(2px) skewX(2deg);
    text-shadow: -3px 1px #00ffff, 3px -1px #ff0055;
  }
  45% {
    transform: translateX(-1px);
    text-shadow: 2px 0 #00ffff, -2px 0 #ff0055;
  }
  60% {
    transform: translateX(1px);
    text-shadow: -1.5px 0 #00ffff, 1.5px 0 #ff0055;
  }
  75% {
    transform: translateX(0);
    text-shadow: 1px 0 #00ffff, -1px 0 #ff0055;
  }
  100% {
    transform: translateX(0);
    text-shadow: -1px 0 #00ffff, 1px 0 #ff0055;
  }
}

.btn-hover-holographic-glitch {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease,
              border-color var(--anim-speed, 0.3s) ease,
              color var(--anim-speed, 0.3s) ease,
              background-color var(--anim-speed, 0.3s) ease;
}

.btn-hover-holographic-glitch::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -100%;
  width: 60%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 255, 0.35) 40%,
    rgba(255, 0, 128, 0.4) 50%,
    rgba(0, 255, 255, 0.35) 60%,
    transparent 100%
  );
  transform: rotate(25deg);
  transition: transform 0s ease;
  pointer-events: none;
  z-index: -1;
}

.btn-hover-holographic-glitch::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 255, 255, 0.05) 0px,
    rgba(0, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 3px
  );
  opacity: 0;
  transition: opacity var(--anim-speed, 0.3s) ease;
  pointer-events: none;
  z-index: -1;
}

.btn-hover-holographic-glitch:hover::before,
.btn-hover-holographic-glitch.is-auto-hovered::before {
  transform: translateX(450%) rotate(25deg);
  transition: transform var(--anim-speed, 0.7s) cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hover-holographic-glitch:hover::after,
.btn-hover-holographic-glitch.is-auto-hovered::after {
  opacity: 1;
}

.btn-hover-holographic-glitch:hover,
.btn-hover-holographic-glitch.is-auto-hovered {
  border-color: #00ffff !important;
  color: #00ffff !important;
  background-color: rgba(0, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4),
              0 0 45px rgba(255, 0, 128, 0.25);
}

.btn-hover-holographic-glitch:active {
  transform: translateY(0);
}

.btn-hover-holographic-glitch span,
.btn-hover-holographic-glitch .btn-icon {
  display: inline-flex;
  align-items: center;
  position: relative;
  z-index: 2;
  transition: transform var(--anim-speed, 0.3s) ease, text-shadow var(--anim-speed, 0.3s) ease;
}

.btn-hover-holographic-glitch:hover span,
.btn-hover-holographic-glitch.is-auto-hovered span,
.btn-hover-holographic-glitch:hover .btn-icon,
.btn-hover-holographic-glitch.is-auto-hovered .btn-icon {
  animation: cyberChromaticJitter 0.45s ease-out;
}`
  },
  {
    id: 26,
    name: '26. Onde Sismique',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-seismic-pulse',
    description: 'Micro-tremblement sismique du bouton accompagné d’une onde concentrique.',
    cssCode: `.btn-hover-seismic-pulse {
  position: relative;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hover-seismic-pulse::before {
  content: '';
  position: absolute;
  inset: -4px;
  border: 1.5px solid var(--btn-color, #18181b);
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.btn-hover-seismic-pulse:hover {
  animation: seismicShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.btn-hover-seismic-pulse:hover::before {
  opacity: 0.6;
  transform: scale(1.12);
  animation: seismicRingExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes seismicShake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-3px) rotate(-0.5deg); }
  30% { transform: translateX(2px) rotate(0.3deg); }
  45% { transform: translateX(-2px) rotate(-0.2deg); }
  60% { transform: translateX(1.5px) rotate(0.1deg); }
  75% { transform: translateX(-1px); }
}

@keyframes seismicRingExpand {
  0% { opacity: 0; transform: scale(0.95); }
  40% { opacity: 0.6; transform: scale(1.08); }
  100% { opacity: 0; transform: scale(1.2); }
} `
  },
  {
    id: 27,
    name: '27. Rideau de Scène Horizontal',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-vertical-curtain',
    description: 'Deux volets latéraux se referment depuis les côtés pour se rejoindre au centre.',
    cssCode: `.btn-hover-vertical-curtain {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.3s) ease;
}

.btn-hover-vertical-curtain::before {
  content: '';
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  width: 56%;
  background-color: var(--btn-color, #18181b);
  transform: translateX(-105%);
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-vertical-curtain::after {
  content: '';
  position: absolute;
  top: -2px;
  bottom: -2px;
  right: -2px;
  width: 56%;
  background-color: var(--btn-color, #18181b);
  transform: translateX(105%);
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.btn-hover-vertical-curtain:hover::before,
.btn-hover-vertical-curtain.is-auto-hovered::before,
.btn-hover-vertical-curtain:hover::after,
.btn-hover-vertical-curtain.is-auto-hovered::after {
  transform: translateX(0);
}

.btn-hover-vertical-curtain:hover,
.btn-hover-vertical-curtain.is-auto-hovered {
  color: var(--btn-bg, #ffffff) !important;
  border-color: var(--btn-color, #18181b) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px #00000029;
}

.btn-hover-vertical-curtain:active {
  transform: translateY(0);
}

.btn-hover-vertical-curtain .btn-icon {
  transition: transform var(--anim-speed, 0.3s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-vertical-curtain:hover .btn-icon,
.btn-hover-vertical-curtain.is-auto-hovered .btn-icon {
  transform: translateX(4px) scale(1.1);
}`
  },
  {
    id: 28,
    name: '28. Rebond Élastique',
    category: 'Glissements & Mouvements',
    className: 'btn-hover-elastic-bounce',
    description: 'Déformation élastique squash & stretch avec rebond dynamique à l’arrivée.',
    cssCode: `.btn-hover-elastic-bounce {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.25s ease;
}

.btn-hover-elastic-bounce .btn-icon {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-elastic-bounce:hover {
  animation: elasticBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  box-shadow: 0 10px 28px -6px #00000026;
}

.btn-hover-elastic-bounce:hover .btn-icon {
  transform: translateY(-2px) scale(1.2);
}

@keyframes elasticBounce {
  0% { transform: scale(1) translateY(0); }
  20% { transform: scale(1.06, 0.92) translateY(2px); }
  45% { transform: scale(0.96, 1.08) translateY(-8px); }
  65% { transform: scale(1.02, 0.97) translateY(-3px); }
  80% { transform: scale(0.99, 1.01) translateY(-5px); }
  100% { transform: scale(1) translateY(-4px); }
}`
  },
  {
    id: 29,
    name: '29. Dégradé Fluide Lumineux',
    category: 'Remplissages & Dégradés',
    className: 'btn-hover-mist-fade',
    description: 'Dégradé velouté multi-tons avec transition ultra-douce et nappe fluide.',
    cssCode: `@keyframes smoothGradientDrift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.btn-hover-mist-fade {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform var(--anim-speed, 0.4s) cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow var(--anim-speed, 0.4s) ease,
              color var(--anim-speed, 0.35s) ease,
              border-color var(--anim-speed, 0.35s) ease;
}

.btn-hover-mist-fade::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    135deg,
    var(--btn-color, #18181b) 0%,
    rgba(99, 102, 241, 0.85) 35%,
    rgba(236, 72, 153, 0.85) 65%,
    var(--btn-color, #18181b) 100%
  );
  background-size: 250% 250%;
  background-position: 0% 50%;
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity var(--anim-speed, 0.4s) ease,
              transform var(--anim-speed, 0.4s) cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
  pointer-events: none;
}

.btn-hover-mist-fade:hover::before,
.btn-hover-mist-fade.is-auto-hovered::before {
  opacity: 1;
  transform: scale(1);
  animation: smoothGradientDrift 3.5s ease infinite alternate;
}

.btn-hover-mist-fade:hover,
.btn-hover-mist-fade.is-auto-hovered {
  color: #ffffff !important;
  border-color: transparent !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -4px rgba(99, 102, 241, 0.35),
              0 0 20px rgba(236, 72, 153, 0.25);
}

.btn-hover-mist-fade:active {
  transform: translateY(0) scale(0.98);
}

.btn-hover-mist-fade .btn-icon {
  transition: transform var(--anim-speed, 0.35s) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-mist-fade:hover .btn-icon,
.btn-hover-mist-fade.is-auto-hovered .btn-icon {
  transform: translateX(4px) scale(1.12);
}`
  },
  {
    id: 30,
    name: '30. Balayage Radar Conique',
    category: 'Effets Spéciaux',
    className: 'btn-hover-conic-radar',
    description: 'Faisceau radar conique rotatif à 360° avec révolution complète de l’icône.',
    cssCode: `.btn-hover-conic-radar {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease;
}

.btn-hover-conic-radar::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg,
    transparent 270deg,
    var(--btn-color, #18181b) 360deg
  );
  opacity: 0;
  transform: rotate(0deg);
  transition: opacity 0.35s ease;
  z-index: -1;
  pointer-events: none;
}

.btn-hover-conic-radar .btn-icon {
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-hover-conic-radar:hover::before {
  opacity: 0.18;
  animation: conicRadarSpin 1.2s linear infinite;
}

.btn-hover-conic-radar:hover {
  transform: translateY(-2.5px) scale(1.02);
  box-shadow: 0 10px 24px -4px #0000001f,
              0 0 16px -4px var(--btn-color, #18181b);
}

.btn-hover-conic-radar:hover .btn-icon {
  transform: rotate(360deg) scale(1.2);
}

@keyframes conicRadarSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
  }
];
