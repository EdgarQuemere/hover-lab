export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const TRANSLATIONS = {
  en: {
    search_placeholder: 'Search an effect...',
    clear_search: 'Clear search',
    button_text_label: 'Button Text',
    default_button_text: 'Filters',
    category_label: 'Category',
    cat_all: 'All Categories',
    cat_fills: 'Fills & Sweeps',
    cat_borders: 'Borders & Outlines',
    cat_motion: 'Slide & Motion',
    cat_fx: 'Special FX & Particles',
    typography_label: 'Typography',
    icon_label: 'Phosphor Icon',
    icon_pos_label: 'Icon Position',
    pos_left: 'Left',
    pos_right: 'Right',
    pos_only: 'Only',
    pos_none: 'None',
    radius_label: 'Border Radius',
    radius_pill: 'Pill',
    button_fill_color_label: 'Button Fill Color',
    card_bg_label: 'Card Background',
    card_bg_light: 'Light Background (#EEEEEE)',
    card_bg_dark: 'Dark Background (#111111)',
    view_code: 'Code',
    code_tooltip: 'View CSS & JSX code',
    share_btn: 'Share',
    share_tooltip: 'Share direct link',
    link_copied: 'Copied!',
    no_results_title: 'No effect matches "{query}"',
    no_results_desc: 'Try another keyword or reset filters.',
    reset_search: 'Clear Search',
    code_modal_title: 'Ready-to-use Code',
    code_modal_subtitle: 'Copy-paste CSS & JSX code directly into your project',
    copied: 'Copied!',
    copy_css: 'Copy CSS',
    copy_jsx: 'Copy React JSX',
    icon_arrow_right: 'Right Arrow',
    icon_sparkle: 'Sparkle',
    icon_lightning: 'Lightning',
    icon_compass: 'Compass',
    icon_plus: 'Plus',
    icon_shopping_bag: 'Shopping Bag',
    icon_heart: 'Heart',
    icon_paper_plane: 'Paper Plane',
    icon_lock: 'Lock',
    icon_code: 'Code',
    icon_star: 'Star',
    icon_globe: 'Globe',
    icon_download: 'Download',
    icon_check: 'Check',
    icon_cursor: 'Cursor',

    // Effect 1
    effect_1_name: '01. Fluid Color Inversion',
    effect_1_desc: 'Smooth right-to-left background fill with color inversion.',
    effect_1_cat: 'Monochrome B&W',
    // Effect 2
    effect_2_name: '02. Icon Slide Push',
    effect_2_desc: 'Subtle button elevation with dynamic rightward icon slide.',
    effect_2_cat: 'Monochrome B&W',
    // Effect 3
    effect_3_name: '03. Ultra-Juicy Laser Sweep',
    effect_3_desc: 'An ultra-bright laser beam sweeps the surface with a dynamic spring bounce, tactile button lift, and icon pulse.',
    effect_3_cat: 'Monochrome B&W',
    // Effect 4
    effect_4_name: '04. 3D Pressed Block',
    effect_4_desc: 'Solid 3D extruded block effect with sharp shadow that depresses on hover and click.',
    effect_4_cat: 'Monochrome B&W',
    // Effect 5
    effect_5_name: '05. Rectangle Morph',
    effect_5_desc: 'On hover, the button border morphs smoothly from its original shape into a structured rectangle (border-radius: 4px).',
    effect_5_cat: 'Monochrome B&W',
    // Effect 6
    effect_6_name: '06. Luminous Ambient Glow',
    effect_6_desc: 'Monochrome luminous halo expanding outward with slight scaling.',
    effect_6_cat: 'Monochrome B&W',
    // Effect 7
    effect_7_name: '07. Radial Expansion Ripple',
    effect_7_desc: 'Circular wave expanding outward from the center of the button.',
    effect_7_cat: 'Monochrome B&W',
    // Effect 8
    effect_8_name: '08. Integrated Underline',
    effect_8_desc: 'A fine, visible underline smoothly extends inside the bottom edge of the button.',
    effect_8_cat: 'Monochrome B&W',
    // Effect 9
    effect_9_name: '09. Magnetic Rotation Float',
    effect_9_desc: 'Upward floating motion with a smooth 45° icon rotation.',
    effect_9_cat: 'Monochrome B&W',
    // Effect 10
    effect_10_name: '10. Contrast Lens Focus',
    effect_10_desc: 'Lens focus effect with central expansion and sharp contrast inversion.',
    effect_10_cat: 'Monochrome B&W',
    // Effect 11
    effect_11_name: '11. Text Elevator Roll',
    effect_11_desc: 'Text rolls upward out of the button with strict overflow masking.',
    effect_11_cat: 'Monochrome B&W',
    // Effect 12
    effect_12_name: '12. Neon Acid Lime Shift',
    effect_12_desc: 'Dynamic high-intensity neon acid green (#CCFF00) fill.',
    effect_12_cat: 'Accent Couleur',
    // Effect 13
    effect_13_name: '13. Outline Border Weight',
    effect_13_desc: 'Border thickens from 1.5px to 3px with slight button expansion.',
    effect_13_cat: 'Transformations Outline',
    // Effect 14
    effect_14_name: '14. Dashed Marching Border',
    effect_14_desc: 'Solid border morphs into a dynamic dashed outline.',
    effect_14_cat: 'Transformations Outline',
    // Effect 15
    effect_15_name: '15. Concentric Dual Ring',
    effect_15_desc: 'A second inner concentric ring collapses onto the outer border.',
    effect_15_cat: 'Transformations Outline',
    // Effect 16
    effect_16_name: '16. Corner Brackets Frame',
    effect_16_desc: 'Four geometric corner brackets frame the button on hover.',
    effect_16_cat: 'Transformations Outline',
    // Effect 17
    effect_17_name: '17. SVG Revolving Circuit',
    effect_17_desc: 'On hover, a gap travels 360° around the border loop before sealing completely.',
    effect_17_cat: 'Transformations Outline',
    // Effect 18
    effect_18_name: '18. Sparkling Confetti Burst',
    effect_18_desc: 'Explosive particle burst of vibrant neon confetti (Neon Pink, Acid Green, Cyan, Yellow).',
    effect_18_cat: 'Effets Spéciaux',
    // Effect 19
    effect_19_name: '19. Picto & Text Swap Morph',
    effect_19_desc: 'Word and icon cleanly swap positions while preserving border radius with radial fill.',
    effect_19_cat: 'Effets Spéciaux',
    // Effect 20
    effect_20_name: '20. Staggered Liquid Columns',
    effect_20_desc: 'Four circular columns rise in a staggered cascade to fill the background.',
    effect_20_cat: 'Effets Spéciaux',
    // Effect 21
    effect_21_name: '21. Rolling Text & Magic Picto',
    effect_21_desc: 'Letters cascade in 3D rolling motion while the icon performs a 360° revolution with neon aura glow.',
    effect_21_cat: 'Effets Spéciaux',
    // Effect 22
    effect_22_name: '22. Colliding Dual Circuits SVG',
    effect_22_desc: 'Two SVG pulses launch from opposite corners, collide with a glow flash, and seal the border.',
    effect_22_cat: 'Transformations Outline',
    // Effect 23
    effect_23_name: '23. Monochromatic Circuit',
    effect_23_desc: 'Full border at rest. On hover, a single opening sweeps 360° around the circuit before hermetically closing.',
    effect_23_cat: 'Transformations Outline',
  },
  fr: {
    search_placeholder: 'Rechercher un effet...',
    clear_search: 'Effacer la recherche',
    button_text_label: 'Texte du Bouton',
    default_button_text: 'Filtres',
    category_label: 'Catégorie',
    cat_all: 'Toutes les catégories',
    cat_fills: 'Remplissages & Dégradés',
    cat_borders: 'Bordures & Tracés SVG',
    cat_motion: 'Glissements & Mouvements',
    cat_fx: 'Effets Spéciaux & Particules',
    typography_label: 'Typographie',
    icon_label: 'Phosphor Icon',
    icon_pos_label: 'Position Picto',
    pos_left: 'Gauche',
    pos_right: 'Droite',
    pos_only: 'Seul',
    pos_none: 'Aucun',
    radius_label: 'Border Radius',
    radius_pill: 'Pill',
    button_fill_color_label: 'Couleur Fill Bouton',
    card_bg_label: 'Fond des Cards',
    card_bg_light: 'Fond Clair (#EEEEEE)',
    card_bg_dark: 'Fond Sombre (#111111)',
    view_code: 'Code',
    code_tooltip: 'Voir le code CSS & JSX',
    share_btn: 'Partager',
    share_tooltip: 'Partager le lien direct',
    link_copied: 'Copié !',
    no_results_title: 'Aucun effet ne correspond à "{query}"',
    no_results_desc: 'Essayez avec un autre mot-clé ou réinitialisez les filtres.',
    reset_search: 'Effacer la recherche',
    code_modal_title: 'Code prêt à l\'emploi',
    code_modal_subtitle: 'Copiez-collez le code CSS & JSX directement dans votre projet',
    copied: 'Copié !',
    copy_css: 'Copier CSS',
    copy_jsx: 'Copier React JSX',
    icon_arrow_right: 'Flèche Droite',
    icon_sparkle: 'Étincelle',
    icon_lightning: 'Éclair',
    icon_compass: 'Boussole',
    icon_plus: 'Plus',
    icon_shopping_bag: 'Panier',
    icon_heart: 'Cœur',
    icon_paper_plane: 'Avion',
    icon_lock: 'Cadenas',
    icon_code: 'Code',
    icon_star: 'Étoile',
    icon_globe: 'Globe',
    icon_download: 'Télécharger',
    icon_check: 'Valider',
    icon_cursor: 'Curseur',

    // Effect 1
    effect_1_name: '01. Inversion Fluide',
    effect_1_desc: 'Remplissage fluide du fond de droite à gauche avec inversion des couleurs.',
    effect_1_cat: 'Monochrome B&W',
    // Effect 2
    effect_2_name: '02. Glissement Icône',
    effect_2_desc: 'Élévation subtile du bouton avec glissement dynamique de l’icône vers la droite.',
    effect_2_cat: 'Monochrome B&W',
    // Effect 3
    effect_3_name: '03. Balayage Laser Ultra-Juicy',
    effect_3_desc: 'Un faisceau laser ultra-brillant balaie la surface avec un élan ressort dynamique, accompagnant une surélévation tactile du bouton et une impulsion de l’icône.',
    effect_3_cat: 'Monochrome B&W',
    // Effect 4
    effect_4_name: '04. Bloc 3D Pressé',
    effect_4_desc: 'Effet bloc solide 3D avec ombre nette qui s’enfonce lors du survol et clic.',
    effect_4_cat: 'Monochrome B&W',
    // Effect 5
    effect_5_name: '05. Métamorphose Rectangle',
    effect_5_desc: 'Au survol, le contour du bouton se métamorphose de sa forme d’origine vers un rectangle structuré (border-radius: 4px).',
    effect_5_cat: 'Monochrome B&W',
    // Effect 6
    effect_6_name: '06. Halo Lumineux',
    effect_6_desc: 'Halo lumineux monochrome qui se déploie avec un léger grossissement.',
    effect_6_cat: 'Monochrome B&W',
    // Effect 7
    effect_7_name: '07. Expansion Radiale',
    effect_7_desc: 'Vague circulaire s’agrandissant depuis le centre du bouton.',
    effect_7_cat: 'Monochrome B&W',
    // Effect 8
    effect_8_name: '08. Soulignement Intégré',
    effect_8_desc: 'Une ligne de soulignement fine et visible s’étend proprement à l’intérieur du bouton.',
    effect_8_cat: 'Monochrome B&W',
    // Effect 9
    effect_9_name: '09. Rotation Magnétique',
    effect_9_desc: 'Flottement vers le haut avec rotation fluide de 45° de l’icône.',
    effect_9_cat: 'Monochrome B&W',
    // Effect 10
    effect_10_name: '10. Loupe Contrastée',
    effect_10_desc: 'Effet loupe/objectif avec expansion du centre et inversion nette du contraste.',
    effect_10_cat: 'Monochrome B&W',
    // Effect 11
    effect_11_name: '11. Ascenseur Texte',
    effect_11_desc: 'Le texte monte hors du bouton avec un masquage strict pour éviter tout débordement.',
    effect_11_cat: 'Monochrome B&W',
    // Effect 12
    effect_12_name: '12. Vert Acide Néon',
    effect_12_desc: 'Remplissage dynamique en vert acide néon (#CCFF00) haute intensité.',
    effect_12_cat: 'Accent Couleur',
    // Effect 13
    effect_13_name: '13. Épaississement Bordure',
    effect_13_desc: 'La bordure s’épaissit de 1.5px à 3px avec une légère expansion du bouton.',
    effect_13_cat: 'Transformations Outline',
    // Effect 14
    effect_14_name: '14. Bordure Pointillée',
    effect_14_desc: 'La bordure continue se transforme en contour pointillé dynamique.',
    effect_14_cat: 'Transformations Outline',
    // Effect 15
    effect_15_name: '15. Double Anneau',
    effect_15_desc: 'Un second anneau concentrique intérieur se rétracte et se colle au contour.',
    effect_15_cat: 'Transformations Outline',
    // Effect 16
    effect_16_name: '16. Encoches d’Angles',
    effect_16_desc: 'Quatre crochets d’angles géométriques (cadre d’angles) viennent encadrer le bouton au survol.',
    effect_16_cat: 'Transformations Outline',
    // Effect 17
    effect_17_name: '17. Tracé Outline SVG (Loop & Close)',
    effect_17_desc: 'Au survol, une ouverture s’évide progressivement au point d’origine, fait un tour complet à 360° en glissant le long du contour, puis la fin du tracé la rattrape pour la sceller à 100%.',
    effect_17_cat: 'Transformations Outline',
    // Effect 18
    effect_18_name: '18. Éjection Confettis Pétillants',
    effect_18_desc: 'Projection explosive de bulles confettis aux couleurs hyper pétillantes (Rose Néon, Vert Acide, Cyan, Jaune Vif).',
    effect_18_cat: 'Effets Spéciaux',
    // Effect 19
    effect_19_name: '19. Permutation Icône & Mot',
    effect_19_desc: 'Au survol, le mot et le picto permutent exactement leurs positions tout en conservant le même border-radius qu’à l’entrée avec un remplissage expansif.',
    effect_19_cat: 'Effets Spéciaux',
    // Effect 20
    effect_20_name: '20. Vagues en Cascades Staggered',
    effect_20_desc: '4 colonnes circulaires s’élèvent en cascades décalées (stagger) pour remplir le fond.',
    effect_20_cat: 'Effets Spéciaux',
    // Effect 21
    effect_21_name: '21. Typographie Rolling & Picto Magique',
    effect_21_desc: 'Au survol, les lettres s’enchaînent en cascade 3D rouleaux et le picto réalise une révolution complète 360° lumineuse avec aura néon.',
    effect_21_cat: 'Effets Spéciaux',
    // Effect 22
    effect_22_name: '22. Double Tracé SVG Opposé (Colliding Circuits)',
    effect_22_desc: 'Au survol, deux impulsions SVG s’élancent simultanément depuis des coins opposés (horaire & anti-horaire), se rencontrent avec un flash lumineux et scellent la bordure.',
    effect_22_cat: 'Transformations Outline',
    // Effect 23
    effect_23_name: '23. Circuit Monochromatique',
    effect_23_desc: 'Le bouton possède son contour complet au repos. Au survol, une ouverture balaye le circuit à 360° avant de se refermer hermétiquement.',
    effect_23_cat: 'Transformations Outline',
  },
  es: {
    search_placeholder: 'Buscar un efecto...',
    clear_search: 'Borrar búsqueda',
    button_text_label: 'Texto del Botón',
    default_button_text: 'Filtros',
    category_label: 'Categoría / Efectos',
    cat_all: 'Todos',
    cat_bw: 'B&W',
    cat_outline: 'Props Outline',
    cat_acid: 'Efectos Especiales / Color',
    typography_label: 'Tipografía',
    icon_label: 'Icono Phosphor',
    icon_pos_label: 'Posición Icono',
    pos_left: 'Izquierda',
    pos_right: 'Derecha',
    pos_only: 'Solo',
    pos_none: 'Ninguno',
    radius_label: 'Radio de Borde',
    radius_pill: 'Pill',
    button_fill_color_label: 'Color de Relleno Botón',
    card_bg_label: 'Fondo de Tarjetas',
    card_bg_light: 'Fondo Claro (#EEEEEE)',
    card_bg_dark: 'Fondo Oscuro (#111111)',
    view_code: 'Código',
    code_tooltip: 'Ver código CSS y JSX',
    no_results_title: 'Ningún efecto coincide con "{query}"',
    no_results_desc: 'Prueba con otra palabra clave o reinicia los filtros.',
    reset_search: 'Limpiar Búsqueda',
    code_modal_title: 'Código Listo para Usar',
    code_modal_subtitle: 'Copia y pega el código CSS y JSX directamente en tu proyecto',
    copied: '¡Copiado!',
    copy_css: 'Copiar CSS',
    copy_jsx: 'Copiar React JSX',
    icon_arrow_right: 'Flecha Derecha',
    icon_sparkle: 'Chispa',
    icon_lightning: 'Rayo',
    icon_compass: 'Brújula',
    icon_plus: 'Más',
    icon_shopping_bag: 'Bolsa',
    icon_heart: 'Corazón',
    icon_paper_plane: 'Avión de Papel',
    icon_lock: 'Candado',
    icon_code: 'Código',
    icon_star: 'Estrella',
    icon_globe: 'Globo',
    icon_download: 'Descargar',
    icon_check: 'Validar',
    icon_cursor: 'Cursor',

    // Effect 1
    effect_1_name: '01. Inversión Fluida',
    effect_1_desc: 'Relleno suave de fondo de derecha a izquierda con inversión de color.',
    effect_1_cat: 'Monochrome B&W',
    // Effect 2
    effect_2_name: '02. Desplazamiento de Icono',
    effect_2_desc: 'Elevación sutil del botón con deslizamiento dinámico del icono a la derecha.',
    effect_2_cat: 'Monochrome B&W',
    // Effect 3
    effect_3_name: '03. Barrido Láser Ultra-Juicy',
    effect_3_desc: 'Un haz láser ultrabrillante barre la superficie con un rebote de resorte dinámico, elevación táctil e impulso del icono.',
    effect_3_cat: 'Monochrome B&W',
    // Effect 4
    effect_4_name: '04. Bloque 3D Presionado',
    effect_4_desc: 'Efecto de bloque 3D sólido con sombra nítida que se presiona al pasar el ratón y hacer clic.',
    effect_4_cat: 'Monochrome B&W',
    // Effect 5
    effect_5_name: '05. Metamorfosis Rectangular',
    effect_5_desc: 'Al pasar el ratón, el borde se transforma suavemente a un rectángulo estructurado (radio: 4px).',
    effect_5_cat: 'Monochrome B&W',
    // Effect 6
    effect_6_name: '06. Halo Luminoso',
    effect_6_desc: 'Halo luminoso monocromo que se despliega con un ligero aumento de tamaño.',
    effect_6_cat: 'Monochrome B&W',
    // Effect 7
    effect_7_name: '07. Expansión Radial',
    effect_7_desc: 'Onda circular que se expande desde el centro del botón.',
    effect_7_cat: 'Monochrome B&W',
    // Effect 8
    effect_8_name: '08. Subrayado Integrado',
    effect_8_desc: 'Una línea de subrayado fina y limpia se extiende dentro del botón.',
    effect_8_cat: 'Monochrome B&W',
    // Effect 9
    effect_9_name: '09. Rotación Magnética',
    effect_9_desc: 'Movimiento flotante hacia arriba con rotación suave de 45° del icono.',
    effect_9_cat: 'Monochrome B&W',
    // Effect 10
    effect_10_name: '10. Lente de Contraste',
    effect_10_desc: 'Efecto de lente con expansión central e inversión de contraste definida.',
    effect_10_cat: 'Monochrome B&W',
    // Effect 11
    effect_11_name: '11. Ascensor de Texto',
    effect_11_desc: 'El texto sube fuera del botón con enmascaramiento estricto para evitar desbordamiento.',
    effect_11_cat: 'Monochrome B&W',
    // Effect 12
    effect_12_name: '12. Verde Ácido Neón',
    effect_12_desc: 'Relleno dinámico en verde ácido neón (#CCFF00) de alta intensidad.',
    effect_12_cat: 'Accent Couleur',
    // Effect 13
    effect_13_name: '13. Grosor de Borde',
    effect_13_desc: 'El borde se engrosa de 1.5px a 3px con una ligera expansión del botón.',
    effect_13_cat: 'Transformations Outline',
    // Effect 14
    effect_14_name: '14. Borde Punteado',
    effect_14_desc: 'El borde continuo se transforma en un contorno punteado dinámico.',
    effect_14_cat: 'Transformations Outline',
    // Effect 15
    effect_15_name: '15. Doble Anillo Concentrico',
    effect_15_desc: 'Un segundo anillo concéntrico interior se contrae y se une al contorno.',
    effect_15_cat: 'Transformations Outline',
    // Effect 16
    effect_16_name: '16. Corchetes de Esquina',
    effect_16_desc: 'Cuatro corchetes geométricos de esquina enmarcan el botón al pasar el ratón.',
    effect_16_cat: 'Transformations Outline',
    // Effect 17
    effect_17_name: '17. Trazado SVG Circuito',
    effect_17_desc: 'Al pasar el ratón, una abertura recorre 360° el contorno antes de sellarse por completo.',
    effect_17_cat: 'Transformations Outline',
    // Effect 18
    effect_18_name: '18. Ráfaga de Confeti Neón',
    effect_18_desc: 'Proyección explosiva de confeti en colores neón hiper vibrantes (Rosa Neón, Verde Ácido, Cian, Amarillo).',
    effect_18_cat: 'Effets Spéciaux',
    // Effect 19
    effect_19_name: '19. Permutación de Icono y Texto',
    effect_19_desc: 'El texto y el icono intercambian posiciones limpiamente con un relleno expansivo.',
    effect_19_cat: 'Effets Spéciaux',
    // Effect 20
    effect_20_name: '20. Columnas Líquidas Escalonadas',
    effect_20_desc: 'Cuatro columnas circulares se elevan en cascada escalonada para llenar el fondo.',
    effect_20_cat: 'Effets Spéciaux',
    // Effect 21
    effect_21_name: '21. Texto En Roll y Icono Mágico',
    effect_21_desc: 'Las letras giran en cascada 3D y el icono da una revolución de 360° con aura neón.',
    effect_21_cat: 'Effets Spéciaux',
    // Effect 22
    effect_22_name: '22. Doble Circuito SVG Colisionante',
    effect_22_desc: 'Dos impulsos SVG salen desde esquinas opuestas, colisionan con un destello luminoso y sellan el borde.',
    effect_22_cat: 'Transformations Outline',
    // Effect 23
    effect_23_name: '23. Circuito Monocromático SVG',
    effect_23_desc: 'Contorno completo en reposo. Al pasar el ratón, una abertura barre el circuito 360° antes de cerrarse herméticamente.',
    effect_23_cat: 'Transformations Outline',
  },
  de: {
    search_placeholder: 'Effekt suchen...',
    clear_search: 'Suche löschen',
    button_text_label: 'Schaltflächentext',
    default_button_text: 'Filter',
    category_label: 'Kategorie / Effekte',
    cat_all: 'Alle',
    cat_bw: 'B&W',
    cat_outline: 'Props Outline',
    cat_acid: 'Spezialeffekte / Farbe',
    typography_label: 'Typografie',
    icon_label: 'Phosphor-Icon',
    icon_pos_label: 'Icon-Position',
    pos_left: 'Links',
    pos_right: 'Rechts',
    pos_only: 'Nur Icon',
    pos_none: 'Keine',
    radius_label: 'Eckenradius',
    radius_pill: 'Pille',
    button_fill_color_label: 'Schaltflächenfarbe',
    card_bg_label: 'Kartenhintergrund',
    card_bg_light: 'Heller Hintergrund (#EEEEEE)',
    card_bg_dark: 'Dunkler Hintergrund (#111111)',
    view_code: 'Code',
    code_tooltip: 'CSS- & JSX-Code anzeigen',
    no_results_title: 'Kein Effekt entspricht "{query}"',
    no_results_desc: 'Versuchen Sie ein anderes Suchwort oder setzen Sie die Filter zurück.',
    reset_search: 'Suche zurücksetzen',
    code_modal_title: 'Fertiger Code',
    code_modal_subtitle: 'Kopieren Sie den CSS- & JSX-Code direkt in Ihr Projekt',
    copied: 'Kopiert!',
    copy_css: 'CSS kopieren',
    copy_jsx: 'React JSX kopieren',
    icon_arrow_right: 'Pfeil Rechts',
    icon_sparkle: 'Funkeln',
    icon_lightning: 'Blitz',
    icon_compass: 'Kompass',
    icon_plus: 'Plus',
    icon_shopping_bag: 'Einkaufstasche',
    icon_heart: 'Herz',
    icon_paper_plane: 'Papierflieger',
    icon_lock: 'Schloss',
    icon_code: 'Code',
    icon_star: 'Stern',
    icon_globe: 'Globus',
    icon_download: 'Herunterladen',
    icon_check: 'Häkchen',
    icon_cursor: 'Cursor',

    // Effect 1
    effect_1_name: '01. Fließende Inversion',
    effect_1_desc: 'Fließende Hintergrundfüllung von rechts nach links mit Farbinversion.',
    effect_1_cat: 'Monochrome B&W',
    // Effect 2
    effect_2_name: '02. Icon-Gleiten',
    effect_2_desc: 'Subtile Anhebung der Schaltfläche mit dynamischem Gleiten des Icons nach rechts.',
    effect_2_cat: 'Monochrome B&W',
    // Effect 3
    effect_3_name: '03. Ultra-Juicy Laser-Sweep',
    effect_3_desc: 'Ein extrem heller Laserstrahl streift die Oberfläche mit dynamischem Federschwung, taktiler Anhebung und Icon-Impuls.',
    effect_3_cat: 'Monochrome B&W',
    // Effect 4
    effect_4_name: '04. Gepresster 3D-Block',
    effect_4_desc: 'Solider 3D-Block-Effekt mit scharfem Schatten, der beim Hovern und Klicken einsinkt.',
    effect_4_cat: 'Monochrome B&W',
    // Effect 5
    effect_5_name: '05. Rechteck-Morphing',
    effect_5_desc: 'Beim Hovern verwandelt sich die Kontur von der Ursprungsform in ein strukturiertes Rechteck (Eckenradius: 4px).',
    effect_5_cat: 'Monochrome B&W',
    // Effect 6
    effect_6_name: '06. Leuchtender Halo-Glow',
    effect_6_desc: 'Monochromer leuchtender Halo, der sich mit leichter Vergrößerung ausbreitet.',
    effect_6_cat: 'Monochrome B&W',
    // Effect 7
    effect_7_name: '07. Radiale Wellenexpansion',
    effect_7_desc: 'Kreisförmige Welle, die sich aus der Mitte der Schaltfläche ausbreitet.',
    effect_7_cat: 'Monochrome B&W',
    // Effect 8
    effect_8_name: '08. Integrierte Unterstreichung',
    effect_8_desc: 'Eine feine, sichtbare Unterstreichungslinie dehnt sich sauber im Inneren aus.',
    effect_8_cat: 'Monochrome B&W',
    // Effect 9
    effect_9_name: '09. Magnetische Schwebelocation',
    effect_9_desc: 'Schweben nach oben mit flüssiger 45°-Drehung des Icons.',
    effect_9_cat: 'Monochrome B&W',
    // Effect 10
    effect_10_name: '10. Kontrast-Linse',
    effect_10_desc: 'Linseneffekt mit zentraler Expansion und scharfer Kontrastinversion.',
    effect_10_cat: 'Monochrome B&W',
    // Effect 11
    effect_11_name: '11. Text-Aufzug',
    effect_11_desc: 'Der Text rollt mit strikter Maskierung nach oben aus der Schaltfläche heraus.',
    effect_11_cat: 'Monochrome B&W',
    // Effect 12
    effect_12_name: '12. Neon-Säure-Grün',
    effect_12_desc: 'Dynamische Füllung in hochintensivem Neon-Säure-Grün (#CCFF00).',
    effect_12_cat: 'Accent Couleur',
    // Effect 13
    effect_13_name: '13. Rahmenverstärkung',
    effect_13_desc: 'Der Rahmen verdickt sich von 1,5px auf 3px mit leichter Vergrößerung.',
    effect_13_cat: 'Transformations Outline',
    // Effect 14
    effect_14_name: '14. Gestrichelter Rahmen',
    effect_14_desc: 'Durchgehender Rahmen verwandelt sich in dynamisch gestrichelte Kontur.',
    effect_14_cat: 'Transformations Outline',
    // Effect 15
    effect_15_name: '15. Doppelter Ring',
    effect_15_desc: 'Ein zweiter innerer konzentrischer Ring zieht sich zusammen und schmiegt sich an den Rahmen.',
    effect_15_cat: 'Transformations Outline',
    // Effect 16
    effect_16_name: '16. Ecken-Klammern',
    effect_16_desc: 'Vier geometrische Eckklammern rahmen die Schaltfläche beim Hovern ein.',
    effect_16_cat: 'Transformations Outline',
    // Effect 17
    effect_17_name: '17. SVG-Umlaufender Rahmen',
    effect_17_desc: 'Beim Hovern wandert eine Öffnung 360° um die Kontur, bevor sie sich vollständig schließt.',
    effect_17_cat: 'Transformations Outline',
    // Effect 18
    effect_18_name: '18. Sprühende Konfetti-Explosion',
    effect_18_desc: 'Explosiver Partikelausstoß von leuchtenden Neon-Konfettis (Neon-Pink, Säuregrün, Cyan, Gelb).',
    effect_18_cat: 'Effets Spéciaux',
    // Effect 19
    effect_19_name: '19. Icon- & Text-Tausch-Morphing',
    effect_19_desc: 'Wort und Icon tauschen beim Hovern sauber die Positionen mit expansiver Füllung.',
    effect_19_cat: 'Effets Spéciaux',
    // Effect 20
    effect_20_name: '20. Gestaffelte Flüssig-Säulen',
    effect_20_desc: 'Vier kreisförmige Säulen steigen in gestaffelter Kaskade auf, um den Hintergrund zu füllen.',
    effect_20_cat: 'Effets Spéciaux',
    // Effect 21
    effect_21_name: '21. Rollender Text & Magisches Icon',
    effect_21_desc: 'Buchstaben rollen in 3D-Kaskade und das Icon macht eine 360°-Drehung mit Neon-Aura.',
    effect_21_cat: 'Effets Spéciaux',
    // Effect 22
    effect_22_name: '22. Kollidierende Doppel-SVG-Schaltkreise',
    effect_22_desc: 'Zwei SVG-Impulse starten aus entgegengesetzten Ecken, kollidieren mit einem Leuchtflash und versiegeln den Rahmen.',
    effect_22_cat: 'Transformations Outline',
    // Effect 23
    effect_23_name: '23. Monochromer SVG-Schaltkreis-Sweep',
    effect_23_desc: 'Vollständige Kontur im Ruhezustand. Beim Hovern streift eine Öffnung 360° um den Kreis und schließt sich hermetisch.',
    effect_23_cat: 'Transformations Outline',
  }
};

export function getTranslation(lang = 'en', key = '', params = {}) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  let text = dict[key] || TRANSLATIONS.en[key] || key;
  Object.keys(params).forEach((paramKey) => {
    text = text.replace(`{${paramKey}}`, params[paramKey]);
  });
  return text;
}

export function getTranslatedEffect(effect, lang = 'en') {
  if (!effect) return effect;
  const name = getTranslation(lang, `effect_${effect.id}_name`);
  const description = getTranslation(lang, `effect_${effect.id}_desc`);
  const category = getTranslation(lang, `effect_${effect.id}_cat`);
  return {
    ...effect,
    name: name !== `effect_${effect.id}_name` ? name : effect.name,
    description: description !== `effect_${effect.id}_desc` ? description : effect.description,
    category: category !== `effect_${effect.id}_cat` ? category : effect.category,
  };
}
