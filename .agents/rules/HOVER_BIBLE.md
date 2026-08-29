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
   * `only` : Icône seule (sans texte).
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
   * **Arrière-plan de scène (4 options)** :
     * Haut-gauche : **Clair** (`#eeeeee`)
     * Haut-droite : **Sombre** (`#111111`)
     * Bas-gauche : **Wallpaper HD** (Image haute résolution)
     * Bas-droite : **Personnalisé (Custom)** avec pastille de couleur et sélecteur `CustomColorPicker` intégré (prend par défaut la couleur des cartes d'accueil).
   * **Texte du Bouton en direct**.
   * **Couleur du Bouton en direct** avec pipette écran.
2. 💻 **Onglet "Éditeur CSS"** :
   * Espace de code **pleine hauteur (~500px+)**.
   * **Synchronisation bidirectionnelle** : Modifier le slider ajuste la durée dans le CSS, et modifier la durée dans le code met à jour le slider en direct.
   * 💾 **Sauvegarder** : Mémorise le CSS personnalisé dans `localStorage` pour cet effet.
   * 🔄 **Réinitialiser** : Restaure le CSS officiel d'origine.
   * 📋 **Copier** : Copie dans le presse-papier avec feedback visuel.

---

## 7. Les 5 Catégories Officielles

Chaque effet appartient à l'une de ces 5 catégories :

| Catégorie FR / EN | Identifiant Map | Thématique |
|---|---|---|
| **Monochrome B&W** | `fills` | Inversions noir & blanc minimalistes et sweeps graphiques |
| **Accent Couleur** | `fills` / `motion` | Jeux de couleurs vives, gradients et dégradés néon |
| **Transformations Outline** | `borders` | SVG revolving borders, doubles anneaux, encoches et pointillés |
| **Effets Spéciaux** | `fx` | Glitch holographique, confetti burst, ripple, radar conique |
| **Remplissages & Dégradés** | `fills` | Volets diagonaux, rideaux verticaux, staggered drops liquides |

---

## 8. Effets avec DOM Spécial (Markup Dédié)

Si un effet nécessite une structure HTML interne spécifique, celle-ci doit être synchronisée dans `HoverCard.jsx` ET dans `FocusSandbox.jsx` :

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

## 9. Checklist pour Ajouter un Nouvel Effet (ex: Effet #31)

- [ ] **1. Créer le fichier CSS modulaire** : `src/styles/effects/effect-31-slug.css`
  * Utiliser `var(--btn-color, #18181b)` et `var(--btn-bg, #ffffff)`.
  * Dupliquer chaque règle `:hover` avec `.is-auto-hovered`.
  * Easing signature : `cubic-bezier(0.16, 1, 0.3, 1)`.
- [ ] **2. Importer dans l'agrégateur** : Ajouter `@import './effects/effect-31-slug.css';` dans `src/styles/hovers.css`.
- [ ] **3. Déclarer dans le catalogue** : Ajouter l'objet dans `src/data/hoverEffects.js` (`id: 31`, `name`, `category`, `className`, `description`, `cssCode`).
- [ ] **4. Ajouter les traductions (4 langues)** :
  * Dans `src/data/translations.js`, ajouter `effect_31_name`, `effect_31_desc`, `effect_31_cat` pour **FR**, **EN**, **ES**, et **DE**.
- [ ] **5. Déclarer la catégorie** : Ajouter `31: 'categorie_id'` dans `EFFECT_CATEGORY_MAP` dans `src/App.jsx`.
- [ ] **6. DOM Spécial (si nécessaire)** : Si l'effet nécessite des balises supplémentaires, les ajouter dans `HoverCard.jsx` et `FocusSandbox.jsx`.
- [ ] **7. Vérifier le build** : Exécuter `npm run build` pour valider l'absence d'erreurs.

---

## 10. Liens de Partage & Deep-Linking

* Format de lien direct : `https://hoverlab.dev/#effect-XX` ou `#XX`.
* Lors de l'accès via un lien partagé :
  1. L'application réinitialise les filtres si l'effet était masqué.
  2. La pagination (`visibleCount`) est automatiquement étendue pour afficher la carte.
  3. Un défilement centré fluide (*smooth scroll*) amène l'écran sur la carte.
  4. L'effet ciblé déclenche une pulsation visuelle (`.is-targeted-highlight`).

---

## 11. Erreurs Fréquentes à Éviter Absolument

| ❌ Erreur | ✅ Bon réflexe |
|---|---|
| Écrire une couleur hex en dur dans le CSS | Toujours utiliser `var(--btn-color, #18181b)` |
| Oublier `.is-auto-hovered` | Toujours lier `:hover` et `.is-auto-hovered` |
| Oublier `border-radius: inherit` sur les enfants/pseudos | Assure la compatibilité avec le mode Pill (`999px`) |
| Oublier les traductions dans les 4 langues | Toujours renseigner FR, EN, ES, DE dans `translations.js` |
| Markup custom présent dans `HoverCard` mais pas dans `FocusSandbox` | Toujours garder les deux composants synchronisés |
| Bloquer le scroll dans l'export de code | S'assurer que le conteneur `<pre>` garde `overflow: auto` |

---

> **HoverLab Source of Truth — Conserver ce document à jour lors de toute évolution structurelle.**
