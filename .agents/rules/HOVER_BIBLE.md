# 📖 La Bible du Hover — HoverLab

> **Document de référence exhaustif pour la création, le maintien et l'intégration de tout effet hover dans HoverLab.**

---

## 1. Architecture Globale

```
src/
├── data/
│   ├── hoverEffects.js          # Catalogue officiel des effets (id, name, category, className, description, cssCode)
│   └── translations.js          # Traductions EN / FR / ES / DE (métadonnées, réglages, noms & descriptions des effets)
├── styles/
│   ├── hovers.css               # Agrégateur global (@import de chaque fichier d'effet modulaire)
│   └── effects/
│       ├── effect-01-fill-sweep.css
│       ├── effect-02-icon-push.css
│       └── effect-XX-slug.css   # Un fichier CSS dédié par effet (actuellement 30 effets)
├── components/
│   ├── HoverCard.jsx            # Carte individuelle de la grille (rendu interactif, partage, deep-linking)
│   ├── FocusSandbox.jsx         # Mode Studio Pro (preview isolée, réglages, éditeur CSS grand format, sauvegarde)
│   ├── ControlsBar.jsx          # Barre de personnalisation globale (texte, icône, taille, arrondi, couleur, fond)
│   ├── AutoPlayControl.jsx      # Contrôle 2-états de la démo automatique (OFF / ON)
│   ├── CustomColorPicker.jsx    # Sélecteur de couleur avancé (presets, pipette écran, dégradé, hex)
│   └── CodeModal.jsx            # Modale d'exportation multi-format (CSS, Tailwind, React, Tokens) avec scroll fluide
├── utils/
│   └── exportUtils.js           # Moteur de génération de code (Vanilla CSS, Tailwind, Framer Motion, Tokens JSON)
├── index.css                    # Styles de base du système de design (.specimen-btn, polices, thèmes de canvas)
├── App.jsx                      # État global, pagination réactive, filtrage par catégorie, deep-linking URL
└── App.css                      # Layout de l'application (en-tête, grille adaptative, modales, studio)
```

---

## 2. Le Bouton de Base (`.specimen-btn`)

### Structure HTML de référence (Rendu React standard)

```html
<button class="specimen-btn font-satoshi btn-size-md btn-hover-XXXX"
        style="border-radius: 9999px; --btn-color: #e6332a;">
  <span>HoverLab</span>
  <svg class="btn-icon btn-icon-right"><!-- Icon SVG --></svg>
</button>
```

### CSS de base (`index.css`)

```css
.specimen-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  color: var(--btn-color, #18181b);
  border: 1.5px solid var(--btn-color, #18181b);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
```

> [!IMPORTANT]
> Par défaut, le bouton est **transparent avec une bordure de 1.5px**. Chaque effet vient styliser le comportement au `:hover` (et `.is-auto-hovered`) sans dégrader l'état de repos.

### Tailles supportées (`.btn-size-*`)

| Classe | Padding | Taille de police | Taille d'icône |
|---|---|---|---|
| `.btn-size-sm` | `8px 20px` | `0.8125rem` (13px) | `14px` |
| `.btn-size-md` | `12px 28px` | `0.9375rem` (15px) | `17px` *(Défaut)* |
| `.btn-size-lg` | `16px 36px` | `1.0625rem` (17px) | `20px` |

### Typographies disponibles (`.font-*`)

* `.font-satoshi` : Satoshi (Moderne & géométrique - *Défaut*)
* `.font-inter` : Inter (Épuré & standard UI)
* `.font-space` : Space Grotesk (Tech & expressif)
* `.font-instrument` : Instrument Sans (Élégant & éditorial)
* `.font-mono` : JetBrains Mono (Monospace technique)

---

## 3. Variables CSS Dynamiques & Thèmes

### Variables fondamentales

| Variable | Rôle | Fallback Clair | Fallback Sombre |
|---|---|---|---|
| `--btn-color` | Couleur d'accentuation (texte, bordure, remplissages animés) | `#18181b` | `#FFFFFF` |
| `--btn-bg` | Couleur du fond de scène (utilisée pour contraster lors des inversions) | `#EEEEEE` | `#111111` |
| `--anim-speed` | Vitesse d'animation dynamique en Mode Studio | `0.35s` | `0.35s` |

> [!WARNING]
> Ces variables sont injectées en **inline styles** ou via les classes de thème parentes `.canvas-light` et `.canvas-dark`. **Ne jamais coder de couleurs en dur dans un effet** sans utiliser `var(--btn-color, #18181b)`.

### Border-Radius & Formes

Le border-radius est appliqué dynamiquement via `radiusStyle` sur le bouton :
* `0px` : Carré brut (Brutalism)
* `6px` : Arrondi subtil
* `12px` : Arrondi moderne (*Défaut*)
* `999` (Pill) : Calculé dynamiquement à la demi-hauteur (`height / 2`, ex: `24px` ou `9999px`)

> [!IMPORTANT]
> `border-radius` n'étant pas une propriété héritée par défaut en CSS, tout pseudo-élément (`::before`, `::after`) ou conteneur interne (`.card-inner`, `.btn-content-wrap`) **DOIT obligatoirement inclure `border-radius: inherit;`**.

---

## 4. Panneau de Réglages Global (ControlsBar)

Tous les réglages de la barre supérieure pilotent instantanément tous les hovers de la grille :

1. **Texte du Bouton (`config.buttonText`)** :
   * **Défaut** : `"HoverLab"`
   * S'affiche dynamiquement dans les `<span>` internes du bouton.
2. **Catégorie (`config.filterCategory`)** :
   * Filtre la grille selon les 5 catégories officielles.
3. **Typographie (`config.fontFamily`)** :
   * Applique la classe `.font-*` sur le bouton.
4. **Icône (`config.iconName`)** :
   * 15 icônes vectorielles disponibles (ArrowRight, Sparkle, Lightning, Compass, Plus, ShoppingBag, Heart, PaperPlane, Lock, Code, Star, Globe, Download, Check, Cursor).
5. **Position de l'icône (`config.iconPosition`)** :
   * `none` : Pas d'icône.
   * `left` : Icône à gauche du texte (`.btn-icon-left`).
   * `right` : Icône à droite du texte (`.btn-icon-right` - *Défaut*).
   * `only` : Icône seule sans texte (`.btn-icon-only`). **Le bouton adopte impérativement un ratio 1:1** (`aspect-ratio: 1/1`, padding neutre `padding: 0`) pour former un cercle parfait en mode Pill (`9999px` / `50%`) ou un carré proportionné.
6. **Arrondi des angles (`config.borderRadiusValue`)** :
   * Segmented button (0, 6, 12, Pill) + champ numérique de précision.
7. **Couleur du bouton (`config.buttonColor`)** :
   * Définit `--btn-color` (défaut : `#e6332a`).
8. **Fond des Cards (`config.cardBgColor`)** :
   * Définit `--btn-bg` et le fond de scène (Clair `#eeeeee` / Sombre `#111111` / Custom).

---

## 5. Mode AutoPlay (Démo Automatique)

Le contrôle en haut à droite permet d'animer automatiquement les boutons sans interaction de la souris :
* **OFF** : Animations déclenchées uniquement au survol réel de l'utilisateur.
* **ON** : Défilement séquentiel aléatoire appliquant la classe `.is-auto-hovered` sur les cartes visibles.

> [!IMPORTANT]
> **Règle absolue** : Tout effet CSS **DOIT obligatoirement dupliquer ses sélecteurs `:hover` avec `.is-auto-hovered`** :
> ```css
> .btn-hover-mon-effet:hover,
> .btn-hover-mon-effet.is-auto-hovered {
>   /* Styles d'animation */
> }
> ```

---

## 6. Mode Studio Pro (FocusSandbox)

Le Studio est l'espace de prototypage avancé ouvert au clic sur **"Studio"** :

### Organisation par Onglets
1. 🎛️ **Onglet "Réglages"** :
   * **Vitesse d'animation** : Slider de 0.1s à 3.0s **+ saisie clavier directe** (flèches ↑/↓ et validation Entrée).
   * **Arrière-plan de scène (4 options)** *(initialisé automatiquement selon le fond choisi sur la page d'accueil : Clair, Sombre ou Personnalisé)* :
     * Haut-gauche : **Clair** (`#eeeeee`)
     * Haut-droite : **Sombre** (`#111111`)
     * Bas-gauche : **Wallpaper HD** (Image haute résolution)
     * Bas-droite : **Personnalisé (Custom)** avec pastille de couleur et sélecteur `CustomColorPicker` intégré (actif d'office si une couleur custom est sélectionnée sur l'accueil).
   * **Texte du Bouton en direct**.
   * **Couleur du Bouton en direct** avec pipette écran.
2. 💻 **Onglet "Éditeur CSS"** :
   * Espace de code **pleine hauteur (~500px+)**.
   * 🔍 **Recherche intégrée (`Cmd + F` / `Ctrl + F`)** : Barre de recherche avec comptage des occurrences (`1/X`), sélection/highlight dans le code, défilement automatique, et navigation au clavier (`Entrée` / `Shift+Entrée`).
   * **Synchronisation bidirectionnelle** : Modifier le slider ajuste la durée dans le CSS, et modifier la durée dans le code met à jour le slider en direct.
   * 💾 **Sauvegarder** : Mémorise le CSS personnalisé dans `localStorage` pour cet effet.
   * 🔄 **Réinitialiser** : Restaure le CSS officiel d'origine.
   * 📦 **Exportation** : Accessible exclusivement via le bouton principal "Exporter le code".

---

## 7. Système d'Exportation "Plug & Play" (HTML + CSS / Tailwind / React)

Pour permettre au développeur d'intégrer le hover en 4 clics dans son projet sans friction :
1. **Cellule 1 — Markup HTML** :
   * Fournit le code HTML exact (`<button class="hover-btn ...">`), incluant le balisage SVG de l'icône active et les balises internes si DOM spécial.
2. **Cellule 2 — Styles Autonomes** :
   * Fournit la feuille de style complète comprenant le bouton de base (`.hover-btn`), la gestion du mode icône seule (`.btn-icon-only`), et les règles de l'effet.
   * Les variables et valeurs configurées dans l'interface (`--btn-color`, `--btn-bg`, `border-radius`, `transition-duration`) sont injectées en dur et en fallback dans le code exporté.

---

## 8. Les 5 Catégories Officielles

Chaque effet appartient à l'une de ces 5 catégories :

| Catégorie FR / EN | Identifiant Map | Thématique |
|---|---|---|
| **Monochrome B&W** | `fills` | Inversions noir & blanc minimalistes et sweeps graphiques |
| **Accent Couleur** | `fills` / `motion` | Jeux de couleurs vives, gradients et dégradés néon |
| **Transformations Outline** | `borders` | SVG revolving borders, doubles anneaux, encoches et pointillés |
| **Effets Spéciaux** | `fx` | Glitch holographique, confetti burst, ripple, radar conique |
| **Remplissages & Dégradés** | `fills` | Volets diagonaux, rideaux verticaux, staggered drops liquides |

---

## 9. Effets avec DOM Spécial (Markup Dédié)

Si un effet nécessite une structure HTML interne spécifique, celle-ci doit être synchronisée dans `HoverCard.jsx`, `FocusSandbox.jsx` et `exportUtils.js` :

1. **Texte Elevator (#11)** :
   * Structure : `.btn-content-wrap` (monte) + `.btn-content-duplicate` (glisse depuis le bas).
2. **Rolling Magic (#21)** :
   * Structure : `.btn-rolling-line.original` + `.btn-rolling-line.duplicate` avec lettres découpées en `.btn-rolling-char` et index `--char-i`.
3. **Icon Swap Morph (#19)** :
   * Structure : `.btn-icon-swap-left` + transition de translation.
4. **Stagger Liquid (#20)** :
   * Structure : 4 gouttes `.btn-stagger-drop` avec délais échelonnés via `--delay: 1..4`.
5. **3D Card Flip (#8)** :
   * Structure : `.card-inner` contenant `.card-front` et `.card-back`.
6. **Effets SVG Outline (#17, #22, #23)** :
   * Structure : SVG `<rect>` avec `pathLength="100"` animé via `stroke-dasharray` / `stroke-dashoffset`.

---

## 10. Règle Géométrique des Coins & Clipping (Anti-trous)

> [!CAUTION]
> **Ne jamais cumuler `overflow: hidden` sur le conteneur ET `border-radius: inherit` sur un pseudo-élément de remplissage (`::before`/`::after`).**
> En CSS, le rayon interne $R_{interne} = R_{externe} - e_{bordure}$. L'application d'un rayon hérité $R_{externe}$ sur le pseudo-élément crée un écart géométrique (croissants / trous visibles aux 4 coins).
> - **Règle** : Si le bouton a `overflow: hidden`, laisser le conteneur gérer le découpage et appliquer `inset: -1px;` sur le pseudo-élément sans `border-radius`.

---

## 11. Checklist pour Ajouter ou Valider un Effet

- [ ] **1. Créer / Valider le fichier CSS modulaire** : `src/styles/effects/effect-XX-slug.css`
  * Utiliser `var(--btn-color, #18181b)`, `var(--btn-bg, #ffffff)` et `var(--anim-speed, 0.35s)`.
  * Dupliquer chaque règle `:hover` avec `.is-auto-hovered`.
  * Easing signature : `cubic-bezier(0.16, 1, 0.3, 1)`.
  * Absence de trous / artefacts aux 4 coins (règle de clipping respectée).
- [ ] **2. Importer dans l'agrégateur** : `@import './effects/effect-XX-slug.css';` dans `src/styles/hovers.css`.
- [ ] **3. Déclarer dans le catalogue** : Synchroniser `src/data/hoverEffects.js`.
- [ ] **4. Valider l'export Plug & Play** : Vérifier que le snippet HTML et le CSS autonome générés dans `exportUtils.js` fonctionnent sans dépendance externe.
- [ ] **5. Vérifier le build** : Exécuter `npm run build` pour valider l'absence d'erreurs.

---

## 12. Erreurs Fréquentes à Éviter Absolument

| ❌ Erreur | ✅ Bon réflexe |
|---|---|
| Écrire une couleur hex en dur dans le CSS de base | Toujours utiliser `var(--btn-color, #18181b)` avec fallback |
| Oublier `.is-auto-hovered` | Toujours lier `:hover` et `.is-auto-hovered` |
| `border-radius: inherit` à l'intérieur d'un bouton `overflow: hidden` | Utiliser `inset: -1px` sans rayon sur le pseudo-élément pour éviter les trous aux 4 coins |
| Bouton étiré en mode icône seule | Appliquer `.btn-icon-only` (`aspect-ratio: 1/1`) pour un rendu circulaire parfait |
| Exporter du CSS incomplet sans le bouton de base | Fournir le code HTML + CSS complet et autonome prêt à l'emploi |
| Oublier les traductions dans les 4 langues | Toujours renseigner FR, EN, ES, DE dans `translations.js` |
| Markup custom présent dans `HoverCard` mais pas dans `FocusSandbox` ou l'export | Toujours garder les composants et le générateur de code synchronisés |

---

> **HoverLab Source of Truth — Conserver ce document à jour lors de toute évolution structurelle.**

