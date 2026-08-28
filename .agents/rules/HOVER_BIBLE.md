# 📖 La Bible du Hover — HoverLab

> Document de référence exhaustif pour la création, le maintien et l'intégration de tout nouvel effet hover dans HoverLab.

---

## 1. Architecture Globale

### Arborescence des fichiers concernés

```
src/
├── data/
│   ├── hoverEffects.js          # Catalogue des effets (id, name, className, cssCode…)
│   └── translations.js          # Traductions EN / FR / ES / DE par effet
├── styles/
│   ├── hovers.css               # Agrégateur @import de chaque fichier d'effet
│   └── effects/
│       ├── effect-01-fill-sweep.css
│       ├── effect-02-icon-push.css
│       └── effect-XX-slug.css   # Un fichier CSS par effet
├── components/
│   ├── HoverCard.jsx            # Card de la grille principale (rendu du bouton)
│   ├── FocusSandbox.jsx         # Mode Studio (preview isolée + contrôles live)
│   ├── ControlsBar.jsx          # Barre de réglages globale
│   └── CodeModal.jsx            # Modal d'export multi-format
├── utils/
│   └── exportUtils.js           # Générateurs Vanilla CSS, Tailwind, Framer, Tokens
├── index.css                    # Styles de base (.specimen-btn, tailles, canvas)
├── App.jsx                      # Config state, catégories, pagination, hash scroll
└── App.css                      # Layout de l'app (grille, header, main-content)
```

---

## 2. Le Bouton de Base (`.specimen-btn`)

### HTML de base (rendu React)

```html
<button class="specimen-btn font-satoshi btn-size-md btn-hover-XXXX"
        style="border-radius: 9999px; --btn-color: #e6332a;">
  <span>Filters</span>
  <svg class="btn-icon btn-icon-right"><!-- Phosphor Icon --></svg>
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
> Le bouton est toujours **transparent avec un outline** par défaut. Chaque effet vient modifier le comportement au `:hover` sans altérer l'état de repos (sauf cas spéciaux documentés).

### Tailles (`.btn-size-*`)

| Classe | Padding | Font-size |
|---|---|---|
| `.btn-size-sm` | `8px 20px` | `0.8125rem` (13px) |
| `.btn-size-md` | `12px 28px` | `0.9375rem` (15px) |
| `.btn-size-lg` | `16px 36px` | `1.0625rem` (17px) |

### Typographies (`.font-*`)

| Classe | Police |
|---|---|
| `.font-satoshi` | Satoshi (Fontshare) |
| `.font-inter` | Inter (Google) |
| `.font-space` | Space Grotesk (Google) |
| `.font-instrument` | Instrument Sans (Google) |
| `.font-mono` | JetBrains Mono (Google) |

---

## 3. Variables CSS Dynamiques

### Variables du bouton

| Variable | Rôle | Default Light | Default Dark |
|---|---|---|---|
| `--btn-color` | Couleur principale du bouton (texte + bordure) | `#18181b` | `#FFFFFF` |
| `--btn-bg` | Couleur du fond du canvas (pour inverser les couleurs au hover) | `#EFECE6` | `#0E0E10` |

> [!WARNING]
> Ces variables sont injectées en **inline style** sur le bouton (`--btn-color`) ET via les classes `.canvas-light` / `.canvas-dark` sur le container parent (`.specimen-canvas`). Tout effet CSS DOIT utiliser ces variables au lieu de couleurs en dur.

### Thèmes de canvas

```css
.canvas-light {
  background-color: #EFECE6;
  --btn-color: #18181B;
  --btn-bg: #EFECE6;
}

.canvas-dark {
  background-color: #0E0E10;
  --btn-color: #FFFFFF;
  --btn-bg: #0E0E10;
}
```

### Border-radius

Appliqué en **inline style** sur le `<button>` via `radiusStyle` dans `HoverCard.jsx` :

```js
const radiusStyle = {
  borderRadius: config.borderRadiusValue === 999
    ? `${Math.round(maxPillRadius)}px`   // Pill = demi-hauteur
    : `${config.borderRadiusValue}px`,   // 0, 8, 16, ou custom
  ...(config.buttonColor ? { '--btn-color': config.buttonColor } : {})
};
```

| Preset | Valeur |
|---|---|
| Carré | `0px` |
| Arrondi léger | `8px` |
| Arrondi marqué | `16px` |
| Pill | `999` → calculé dynamiquement (`height / 2`) |

> [!IMPORTANT]
> `border-radius` n'est **PAS** une propriété CSS héritée par défaut. Si votre effet utilise des éléments enfants (`.card-inner`, `.card-front`, etc.), vous DEVEZ ajouter `border-radius: inherit` sur **chaque nœud** intermédiaire pour que la chaîne fonctionne.

---

## 4. Panneau de Réglages (ControlsBar)

Tous les réglages listés ci-dessous sont connectés au bouton. Chaque effet doit les respecter.

### 4.1 — Button Text (`config.buttonText`)
- **Input** : Champ texte libre
- **Default** : `"Filters"` (traduit par langue : FR = `"Filtres"`, etc.)
- **Rendu** : `<span>{config.buttonText || 'Filtres'}</span>` dans le bouton
- **Connexion** : Le texte apparaît dans les `<span>` internes du bouton

### 4.2 — Category (`config.filterCategory`)
- **Options** : `all`, `fills`, `borders`, `motion`, `fx`
- **Mapping** : Défini dans `EFFECT_CATEGORY_MAP` dans `App.jsx` (id → catégorie)
- **Impact** : Filtre la grille. Chaque nouvel effet doit être ajouté à `EFFECT_CATEGORY_MAP`.

### 4.3 — Typography (`config.fontFamily`)
- **Options** : `font-satoshi`, `font-inter`, `font-space`, `font-instrument`, `font-mono`
- **Rendu** : Ajouté comme classe sur le `<button>` via `fullClassName`
- **Impact** : Change la police du texte du bouton

### 4.4 — Phosphor Icon (`config.iconName`)
- **Options** : 15 icônes Phosphor (`ArrowRight`, `Sparkle`, `Lightning`, `Compass`, `Plus`, `ShoppingBag`, `Heart`, `PaperPlane`, `Lock`, `Code`, `Star`, `Globe`, `Download`, `Check`, `Cursor`)
- **Rendu** : `<SelectedIconComp className="btn-icon" size={17} weight={config.iconWeight} />`
- **Impact** : Change l'icône dans le bouton. Accessible via `.btn-icon` en CSS.

### 4.5 — Icon Position (`config.iconPosition`)

| Valeur | Comportement |
|---|---|
| `left` | Icône à gauche du texte (`.btn-icon-left`) |
| `right` | Icône à droite du texte (`.btn-icon-right`) |
| `only` | Icône seule, pas de texte |
| `none` | Pas d'icône |

### 4.6 — Border Radius (`config.borderRadiusValue`)
- **Presets** : `0px`, `8px`, `16px`, `Pill` (999)
- **Input** : Champ numérique libre + presets segmented button
- **Rendu** : Inline style `borderRadius` sur le `<button>`
- **Impact** : Change la forme du bouton. Effets avec éléments enfants → `border-radius: inherit`

### 4.7 — Button Fill Color (`config.buttonColor`)
- **Presets** : 🔴 `#e6332a` (défaut), 🟡 `#f6e81d`, ⚫ `#18181b`, 🔵 `#2563eb`, 🟢 `#10b981`, 🟣 `#8b5cf6`, 🟠 `#f97316`
- **Input** : Color picker custom (hex, eyedropper)
- **Rendu** : Injecté en inline style `--btn-color: #XXXXXX`
- **Impact** : Change la couleur du contour, du texte, et de tous les éléments CSS utilisant `var(--btn-color)`

### 4.8 — Card Background (`config.cardBgColor`)
- **Presets** : Clair `#eeeeee`, Sombre `#111111`
- **Input** : Color picker custom
- **Rendu** : Background du `.specimen-canvas` + définition de `--btn-bg`
- **Impact** : Inversion automatique de `--btn-color` si fond sombre + couleur foncée

---

## 5. Classes CSS Essentielles

```
.specimen-btn         → Bouton de base (outline, padding, flexbox)
.btn-size-sm/md/lg    → Taille du bouton
.font-*               → Typographie
.btn-hover-XXXX       → Classe CSS de l'effet (ajoutée sur le <button>)
.is-auto-hovered      → Classe toggle pour l'animation automatique de la grille
.canvas-light         → Container clair (--btn-color: #18181B)
.canvas-dark          → Container sombre (--btn-color: #FFFFFF)
.btn-icon             → Icône Phosphor dans le bouton
.btn-icon-left        → Position gauche
.btn-icon-right       → Position droite
```

---

## 6. Règles CSS pour un Effet Standard

### Template minimal

```css
/* XX. Nom de l'Effet (Nom Anglais) */
.btn-hover-mon-effet {
  position: relative;
  overflow: hidden;              /* Si nécessaire */
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hover-mon-effet:hover,
.btn-hover-mon-effet.is-auto-hovered {
  transform: translateY(-2px);   /* Exemple : légère élévation */
}
```

### ⚠️ Règles impératives

| Règle | Explication |
|---|---|
| **Toujours supporter `.is-auto-hovered`** | L'animation automatique de la grille ajoute cette classe. Dupliquer chaque sélecteur `:hover` avec `.is-auto-hovered`. |
| **Utiliser `var(--btn-color, #18181b)`** | Couleur par défaut. Jamais de couleur en dur sauf effets cosmétiques (ombres rgba). |
| **Utiliser `var(--btn-bg, #ffffff)`** | Pour les inversions de couleur au hover. |
| **Fallback = `#18181b`** (pas `#e6332a`) | Le fallback CSS dans les `var()` doit être `#18181b` (le noir du thème light). `#e6332a` est injecté à runtime, pas un fallback. |
| **`border-radius: inherit`** | Sur tout pseudo-element ou enfant pour respecter la forme pill/arrondie. |
| **Ne PAS écraser le padding/border/bg** du bouton (sauf cas spécial documenté) | L'apparence de base du bouton doit rester cohérente. |
| **Easing signature** | `cubic-bezier(0.16, 1, 0.3, 1)` — l'easing standard de HoverLab. |
| **Pas de `!important` sauf nécessité absolue** | Uniquement sur `color` lors d'une inversion (pour contrer la spécificité inline) et `overflow: hidden !important` quand critique. |

---

## 7. Effets avec DOM Spécial (Custom Markup)

Certains effets nécessitent un markup HTML spécial à l'intérieur du `<button>`. Ce markup est conditionnel dans `HoverCard.jsx` et `FocusSandbox.jsx`.

### 7.1 — Texte Elevator (effet 11)

```html
<button class="specimen-btn btn-hover-text-elevator">
  <div class="btn-content-wrap">
    <span>Filtres</span>
    <svg class="btn-icon">…</svg>
  </div>
  <div class="btn-content-duplicate">
    <span>Filtres</span>
    <svg class="btn-icon">…</svg>
  </div>
</button>
```
- **Détection** : `effect.className.includes('hover-text-elevator')`
- **Principe** : `btn-content-wrap` monte, `btn-content-duplicate` glisse depuis le bas

### 7.2 — Rolling Magic (effet 21)

```html
<button class="specimen-btn btn-hover-rolling-magic">
  <svg class="btn-icon btn-icon-left">…</svg>
  <span class="btn-rolling-text">
    <span class="btn-rolling-line original">
      <span class="btn-rolling-char" style="--char-i: 0">F</span>
      <span class="btn-rolling-char" style="--char-i: 1">i</span>
      …
    </span>
    <span class="btn-rolling-line duplicate">…</span>
  </span>
</button>
```
- **Détection** : `effect.className.includes('btn-hover-rolling-magic')`
- **Principe** : Chaque lettre tourne individuellement avec un délai staggered via `--char-i`

### 7.3 — Icon Swap Morph (effet 19)

```html
<button class="specimen-btn btn-hover-icon-swap-morph">
  <svg class="btn-icon btn-icon-swap-left">…</svg>
  <span class="btn-content-wrap">Filtres</span>
</button>
```
- **Détection** : `effect.className.includes('btn-hover-icon-swap-morph')`

### 7.4 — Stagger Liquid (effet 20)

```html
<button class="specimen-btn btn-hover-stagger-liquid">
  <span class="btn-stagger-drop" style="--delay: 1"></span>
  <span class="btn-stagger-drop" style="--delay: 2"></span>
  <span class="btn-stagger-drop" style="--delay: 3"></span>
  <span class="btn-stagger-drop" style="--delay: 4"></span>
  <span>Filtres</span>
  <svg class="btn-icon">…</svg>
</button>
```
- **Détection** : `effect.className.includes('btn-hover-stagger-liquid')`
- **Principe** : 4 gouttes décoratives avec délai staggered via `--delay`

### 7.5 — 3D Card Flip (effet 8)

```html
<button class="specimen-btn btn-hover-card-flip">
  <div class="card-inner">
    <div class="card-front">
      <span>Filtres</span>
      <svg class="btn-icon">…</svg>
    </div>
    <div class="card-back">
      <span>Filtres</span>
      <svg class="btn-icon">…</svg>
    </div>
  </div>
</button>
```
- **Détection** : `effect.className.includes('hover-card-flip')`
- **Principe** : Le bouton strip son propre border/padding/bg. `.card-front` est un élément **flow** qui donne la taille, `.card-back` est absolute. `.card-inner` gère la rotation 3D.
- **⚠️ Particularité** : Ce type d'effet doit dupliquer les paddings `btn-size-*` sur les faces, car le bouton a `padding: 0`.

### 7.6 — Effets SVG Outline (effets 17, 22, 23)

```html
<button class="specimen-btn btn-hover-outline-revolving">
  <svg class="btn-svg-border" width="100%" height="100%">
    <rect class="btn-svg-rect" x="0.75" y="0.75"
          width="…" height="…" rx="…" ry="…" pathLength="100" />
  </svg>
  <span>Filtres</span>
</button>
```
- **Détection** : `effect.className.includes('btn-hover-outline-revolving')` / `dual-pulse` / `draw-glow`
- **Principe** : Le SVG `<rect>` est superposé au bouton avec `pathLength="100"` pour animer `stroke-dasharray` / `stroke-dashoffset`
- **Dimensions** : Calculées par `ResizeObserver` dans le composant React

---

## 8. Ajouter un Nouvel Effet (Checklist)

### Étape 1 — Fichier CSS
Créer `src/styles/effects/effect-XX-slug.css` :
```css
/* XX. Nom FR (Nom EN) */
.btn-hover-slug {
  /* État de base : position, overflow, transition */
}

.btn-hover-slug:hover,
.btn-hover-slug.is-auto-hovered {
  /* Animation au survol */
}
```

### Étape 2 — Agrégateur CSS
Ajouter dans `src/styles/hovers.css` :
```css
@import './effects/effect-XX-slug.css';
```

### Étape 3 — Données de l'effet
Ajouter dans `src/data/hoverEffects.js` :
```js
{
  id: XX,
  name: 'XX. Nom Français',
  category: 'Monochrome B&W',
  className: 'btn-hover-slug',
  description: 'Description française courte.',
  cssCode: `/* Le CSS exact de l'effet, tel qu'exporté */`
}
```

### Étape 4 — Catégorie
Ajouter dans `App.jsx` → `EFFECT_CATEGORY_MAP` :
```js
XX: 'fills',  // ou 'borders', 'motion', 'fx'
```

| Catégorie | Description |
|---|---|
| `fills` | Remplissages et balayages de couleur |
| `borders` | Bordures, outlines, contours animés |
| `motion` | Mouvements, translations, rotations |
| `fx` | Effets spéciaux, particules, glitch |

### Étape 5 — Traductions
Ajouter dans `src/data/translations.js` pour les **4 langues** (EN, FR, ES, DE) :
```js
// Effect XX
effect_XX_name: 'XX. English Name',
effect_XX_desc: 'English description of the effect.',
effect_XX_cat: 'Monochrome B&W',
```

### Étape 6 — Markup spécial (si nécessaire)
Si l'effet nécessite un DOM custom (voir Section 7) :

1. **`HoverCard.jsx`** — Ajouter une branche conditionnelle dans le rendu du `<button>` :
   ```jsx
   ) : effect.className.includes('hover-slug') ? (
     <div className="custom-wrapper">…</div>
   ) : (
   ```

2. **`FocusSandbox.jsx`** — Idem pour le Mode Studio, même markup.

### Étape 7 — Build & Test
```bash
npm run build    # Vérifie compilation sans erreurs
npm run dev      # Teste visuellement le rendu
```

---

## 9. Mode Studio (FocusSandbox)

Le Mode Studio est une modal plein écran déclenchée par le bouton **"Studio"** de chaque card.

### Contrôles du Studio

| Contrôle | Variable | Effet |
|---|---|---|
| **Vitesse d'animation** | `animSpeed` (0.1s → 3.0s) | Override `transition-duration` et `animation-duration` sur l'effet et ses `::before`/`::after` |
| **Arrière-plan de scène** | `backdropId` | Clair, Sombre, Gradient Mesh, Wallpaper HD |
| **Texte du bouton** | `customButtonText` | Texte live éditable |
| **Couleur du bouton** | `studioButtonColor` | Color picker avec eyedropper |
| **Éditeur CSS en direct** | `customCssCode` | Textarea modifiable, injecté live via `<style>` dans `<head>` |

### Injection CSS live

Le Studio injecte dynamiquement un `<style id="sandbox-custom-live-css">` contenant :
```css
:root { --anim-speed: 0.35s; }
.btn-hover-XXXX {
  transition-duration: 0.35s !important;
  animation-duration: 0.35s !important;
}
.btn-hover-XXXX::before, .btn-hover-XXXX::after {
  transition-duration: 0.35s !important;
  animation-duration: 0.35s !important;
}
/* + le CSS édité par l'utilisateur */
```

### Export depuis le Studio

Le bouton **"Exporter le code"** ouvre `CodeModal` avec l'effet customisé (CSS modifié, couleur, vitesse). Les formats disponibles :
- **Vanilla CSS** : CSS pur avec variables `:root`
- **Tailwind CSS** : JSX + `tailwind.config.js` keyframes
- **React Framer Motion** : Composant React avec `motion.button`
- **Design Tokens** : JSON structuré

---

## 10. Animation Automatique de la Grille

### Modes

| Mode | Vitesse | Comportement |
|---|---|---|
| `off` | — | Aucune animation automatique |
| `slow` | 2500ms/2000ms | Hover aléatoire lent sur les cards visibles |
| `fast` | 1500ms/1200ms | Hover aléatoire rapide |

### Fonctionnement
- L'app ajoute la classe `.is-auto-hovered` aux boutons ciblés
- Si l'utilisateur survole manuellement un bouton (`onMouseEnter`), l'auto-hover est désactivé sur cette card
- Chaque effet DOIT supporter `.is-auto-hovered` en plus de `:hover`

---

## 11. Liens Directs & Partage

### Format
```
https://hoverlab.com/#effect-XX
https://hoverlab.com/#XX
```

### Comportement
1. Parse le hash au chargement
2. Expand la pagination (`visibleCount`) pour inclure la card cible
3. Attend que le DOM soit prêt (`pendingScrollId` + listener)
4. Scroll smooth vers la card `#effect-XX`
5. Si la card fait partie des **3 dernières**, scroll jusqu'au bas de la page (`maxScrollY`)
6. La card ciblée reçoit la classe `.is-targeted-highlight` pour un flash visuel

---

## 12. Convention de Nommage

### Fichier CSS
```
effect-XX-slug-en-kebab.css
```

### Classe CSS
```
btn-hover-slug-en-kebab
```

### Données JS (`hoverEffects.js`)
```js
{
  id: XX,
  name: 'XX. Nom Français',        // Numéroté avec padding (01, 02… 25)
  category: 'Monochrome B&W',      // Toujours cette valeur pour l'instant
  className: 'btn-hover-slug',     // Doit matcher le fichier CSS
  description: 'Description FR.',
  cssCode: `...`                   // Le CSS exportable (sans .is-auto-hovered)
}
```

### Traductions
```js
effect_XX_name: '...',
effect_XX_desc: '...',
effect_XX_cat: 'Monochrome B&W',
```

---

## 13. Erreurs Courantes à Éviter

| ❌ Erreur | ✅ Correction |
|---|---|
| Couleur en dur `#e6332a` dans le CSS | Utiliser `var(--btn-color, #18181b)` |
| Fallback `var(--btn-color, #e6332a)` | Fallback = `#18181b` (le noir light) |
| Oublier `.is-auto-hovered` | Dupliquer chaque `:hover` avec `.is-auto-hovered` |
| `!important` partout | Seulement pour `color` sur inversion et `overflow` |
| `border: none !important` sur le bouton | Utiliser `border-color: transparent` ou déléguer aux faces |
| `padding: 0 !important` sur le bouton | Si strip nécessaire, dupliquer les paddings `btn-size-*` sur les enfants |
| `border-radius` qui ne se propage pas | Ajouter `border-radius: inherit` sur chaque nœud intermédiaire |
| Oublier d'ajouter l'effet dans `EFFECT_CATEGORY_MAP` | Le bouton ne sera pas filtrable par catégorie |
| Oublier les traductions dans les 4 langues | Ajouter EN, FR, ES, DE dans `translations.js` |
| Markup spécial dans `HoverCard.jsx` mais pas dans `FocusSandbox.jsx` | Toujours synchroniser les deux composants |

---

## 14. Résumé Visuel — Connexion Réglages → Bouton

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTROLS BAR (Réglages)                     │
├──────────────┬──────────────────────────────────────────────────┤
│ Button Text  │ → <span> dans le <button>                        │
│ Category     │ → Filtre la grille (EFFECT_CATEGORY_MAP)         │
│ Typography   │ → Classe .font-* sur le <button>                 │
│ Phosphor Icon│ → <svg class="btn-icon"> dans le <button>        │
│ Icon Position│ → left/right/only/none → position de l'icône     │
│ Border Radius│ → Inline style borderRadius sur le <button>      │
│ Button Color │ → Inline style --btn-color sur le <button>       │
│ Card BG      │ → Background du .specimen-canvas + --btn-bg      │
└──────────────┴──────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│               <button class="specimen-btn                       │
│                       font-satoshi                              │
│                       btn-size-md                               │
│                       btn-hover-XXXX                            │
│                       [is-auto-hovered]"                        │
│                style="border-radius: 9999px;                    │
│                       --btn-color: #e6332a;">                   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  [SVG Icon]  <span>Texte du bouton</span>  [SVG Icon]  │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

> [!TIP]
> Ce document doit être mis à jour à chaque ajout de nouveau réglage, nouveau type de markup spécial, ou changement d'architecture. C'est la source de vérité unique pour la création d'effets hover dans HoverLab.
