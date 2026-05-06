import { useState } from 'react';
import { Search, BookOpen, Info, X, ChevronDown, ExternalLink, Palette, Film, Monitor, Layers, Theater, Grid3X3 } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import * as Dialog from '@radix-ui/react-dialog';

const categoryIcons: Record<string, any> = {
  'All Categories': Grid3X3,
  'Visual Arts': Palette,
  'Film & Media': Film,
  'Digital Art': Monitor,
  'Design': Layers,
  'Performing Arts': Theater,
};

const categories = [
  'All Categories',
  'Visual Arts',
  'Film & Media',
  'Digital Art',
  'Design',
  'Performing Arts',
];

const artTerms = [
  {
    id: 1,
    term: 'Chiaroscuro',
    translation: 'Кіароскуро',
    category: 'Visual Arts',
    definition: 'The treatment of light and shade in drawing and painting, creating strong contrasts between light and dark areas.',
    example: 'Caravaggio mastered the chiaroscuro technique to create dramatic tension in his paintings.',
    keywords: ['light', 'shadow', 'contrast', 'painting', 'renaissance', 'baroque'],
  },
  {
    id: 2,
    term: 'Mise-en-scène',
    translation: 'Мізансцена',
    category: 'Film & Media',
    definition: 'The arrangement of everything that appears in the framing – actors, lighting, décor, props, costume.',
    example: 'The mise-en-scène in Wes Anderson films is meticulously crafted with symmetrical compositions.',
    keywords: ['film', 'composition', 'staging', 'framing', 'cinema', 'visual'],
  },
  {
    id: 3,
    term: 'Rasterization',
    translation: 'Растеризація',
    category: 'Digital Art',
    definition: 'The process of converting vector graphics into a raster image (pixels) for display or printing.',
    example: 'Before printing, the logo was rasterized at 300 DPI to ensure quality.',
    keywords: ['vector', 'pixel', 'conversion', 'digital', 'graphics', 'bitmap'],
  },
  {
    id: 4,
    term: 'Kerning',
    translation: 'Кернінг',
    category: 'Design',
    definition: 'The adjustment of space between individual letter pairs to achieve visually pleasing typography.',
    example: 'Proper kerning between "A" and "V" prevents awkward gaps in headlines.',
    keywords: ['typography', 'spacing', 'letters', 'font', 'type', 'design'],
  },
  {
    id: 5,
    term: 'Improvisation',
    translation: 'Імпровізація',
    category: 'Performing Arts',
    definition: 'The spontaneous creation of movement, dialogue, or music without prior planning or script.',
    example: 'Jazz musicians rely heavily on improvisation during live performances.',
    keywords: ['spontaneous', 'performance', 'jazz', 'theater', 'dance', 'music'],
  },
  {
    id: 6,
    term: 'Palette Knife',
    translation: 'Мастихін',
    category: 'Visual Arts',
    definition: 'A blunt tool used to mix or apply paint, creating thick, textured strokes on canvas.',
    example: 'Impressionist painters often used a palette knife to create bold, expressive textures.',
    keywords: ['painting', 'tool', 'texture', 'impasto', 'oil', 'technique'],
  },
  {
    id: 7,
    term: 'Jump Cut',
    translation: 'Стрибковий монтаж',
    category: 'Film & Media',
    definition: 'An abrupt transition between shots that creates a jarring effect, often used stylistically.',
    example: 'Godard\'s "Breathless" popularized the jump cut as a narrative device.',
    keywords: ['editing', 'montage', 'transition', 'film', 'cinema', 'technique'],
  },
  {
    id: 8,
    term: 'Pixel Art',
    translation: 'Піксельна графіка',
    category: 'Digital Art',
    definition: 'Digital artwork created by placing individual pixels to form images, often in a retro style.',
    example: 'Classic video games like Super Mario Bros featured iconic pixel art characters.',
    keywords: ['digital', 'retro', 'pixel', 'games', 'graphics', 'sprite'],
  },
  {
    id: 9,
    term: 'Golden Ratio',
    translation: 'Золотий перетин',
    category: 'Design',
    definition: 'A mathematical ratio (approximately 1:1.618) found in nature and used to create aesthetically pleasing compositions.',
    example: 'The Parthenon\'s facade incorporates the golden ratio in its proportions.',
    keywords: ['proportion', 'mathematics', 'composition', 'harmony', 'fibonacci', 'aesthetic'],
  },
  {
    id: 10,
    term: 'Tenebrism',
    translation: 'Тенебризм',
    category: 'Visual Arts',
    definition: 'An extreme form of chiaroscuro with violent contrasts of light and dark, dramatic shadows.',
    example: 'Tenebrism is prominent in Spanish Baroque paintings by artists like Ribera.',
    keywords: ['shadow', 'dark', 'light', 'baroque', 'contrast', 'dramatic'],
  },
  {
    id: 11,
    term: 'Montage',
    translation: 'Монтаж',
    category: 'Film & Media',
    definition: 'The technique of selecting, editing, and piecing together film footage to form a continuous whole.',
    example: 'Eisenstein\'s montage theory revolutionized film editing in the early 20th century.',
    keywords: ['editing', 'film', 'sequence', 'cutting', 'narrative', 'eisenstein'],
  },
  {
    id: 12,
    term: 'Vectorization',
    translation: 'Векторизація',
    category: 'Digital Art',
    definition: 'The process of converting a raster image into vector graphics using mathematical curves and paths.',
    example: 'Logo designers often vectorize sketches to create scalable brand marks.',
    keywords: ['vector', 'conversion', 'scalable', 'path', 'illustration', 'svg'],
  },
  {
    id: 13,
    term: 'Typography',
    translation: 'Типографіка',
    category: 'Design',
    definition: 'The art and technique of arranging type to make written language legible and appealing.',
    example: 'Good typography enhances readability and establishes visual hierarchy.',
    keywords: ['font', 'letters', 'type', 'layout', 'text', 'design'],
  },
  {
    id: 14,
    term: 'Choreography',
    translation: 'Хореографія',
    category: 'Performing Arts',
    definition: 'The art of designing sequences of movements in which motion, form, or both are specified.',
    example: 'Pina Bausch\'s choreography blended dance with theatrical elements.',
    keywords: ['dance', 'movement', 'performance', 'ballet', 'composition', 'staging'],
  },
  {
    id: 15,
    term: 'Sfumato',
    translation: 'Сфумато',
    category: 'Visual Arts',
    definition: 'A painting technique of soft, imperceptible transitions between colors and tones.',
    example: 'Leonardo da Vinci used sfumato to create the enigmatic smile of Mona Lisa.',
    keywords: ['painting', 'renaissance', 'leonardo', 'blending', 'technique', 'soft'],
  },
  {
    id: 16,
    term: 'Depth of Field',
    translation: 'Глибина різкості',
    category: 'Film & Media',
    definition: 'The range of distance within which objects appear acceptably sharp in a photograph or film.',
    example: 'Shallow depth of field creates a blurred background, isolating the subject.',
    keywords: ['photography', 'focus', 'camera', 'lens', 'cinematography', 'bokeh'],
  },
  {
    id: 17,
    term: '3D Rendering',
    translation: '3D-рендеринг',
    category: 'Digital Art',
    definition: 'The process of generating a 2D image from a 3D model using computer software.',
    example: 'Pixar films showcase advanced 3D rendering techniques for realistic animation.',
    keywords: ['3d', 'computer', 'modeling', 'animation', 'cgi', 'visualization'],
  },
  {
    id: 18,
    term: 'Grid System',
    translation: 'Модульна сітка',
    category: 'Design',
    definition: 'A structure of intersecting vertical and horizontal lines used to organize content in design.',
    example: 'Web designers use grid systems to create consistent, balanced layouts.',
    keywords: ['layout', 'structure', 'web', 'alignment', 'organization', 'columns'],
  },
  {
    id: 19,
    term: 'Method Acting',
    translation: 'Метод Станіславського',
    category: 'Performing Arts',
    definition: 'An acting technique where performers draw on their own emotions and experiences to portray characters.',
    example: 'Method acting requires deep psychological preparation and emotional authenticity.',
    keywords: ['acting', 'theater', 'stanislavski', 'emotion', 'performance', 'character'],
  },
  {
    id: 20,
    term: 'Impasto',
    translation: 'Імпасто',
    category: 'Visual Arts',
    definition: 'A technique of applying paint thickly so that brush or palette knife strokes are visible.',
    example: 'Van Gogh\'s thick impasto creates a tactile, three-dimensional surface.',
    keywords: ['painting', 'texture', 'thick', 'oil', 'palette knife', 'dimensional'],
  },
  {
    id: 21,
    term: 'Cinematography',
    translation: 'Кінематографія',
    category: 'Film & Media',
    definition: 'The art of motion picture photography, including camera work and lighting.',
    example: 'Roger Deakins is renowned for his masterful cinematography in films like Blade Runner 2049.',
    keywords: ['camera', 'photography', 'film', 'lighting', 'visual', 'director'],
  },
  {
    id: 22,
    term: 'UV Mapping',
    translation: 'UV-мапінг',
    category: 'Digital Art',
    definition: 'The process of projecting a 2D texture onto a 3D model surface.',
    example: 'Proper UV mapping ensures textures wrap correctly around 3D characters.',
    keywords: ['3d', 'texture', 'modeling', 'unwrapping', 'mapping', 'surface'],
  },
  {
    id: 23,
    term: 'Whitespace',
    translation: 'Білий простір',
    category: 'Design',
    definition: 'Empty space around design elements used to create balance and focus attention.',
    example: 'Apple\'s website design uses abundant whitespace for a clean, modern aesthetic.',
    keywords: ['negative space', 'balance', 'minimalism', 'layout', 'breathing room', 'clean'],
  },
  {
    id: 24,
    term: 'Blocking',
    translation: 'Мізансценування',
    category: 'Performing Arts',
    definition: 'The precise staging of actors to facilitate the performance of a play or scene.',
    example: 'The director spent hours on blocking to ensure smooth actor movement on stage.',
    keywords: ['theater', 'staging', 'movement', 'director', 'position', 'choreography'],
  },
  {
    id: 25,
    term: 'Grisaille',
    translation: 'Грізайль',
    category: 'Visual Arts',
    definition: 'A painting executed entirely in shades of gray or another neutral color.',
    example: 'Medieval artists used grisaille to create the illusion of sculptural relief.',
    keywords: ['monochrome', 'grayscale', 'painting', 'neutral', 'tonal', 'technique'],
  },
  {
    id: 26,
    term: 'Dutch Angle',
    translation: 'Голландський кут',
    category: 'Film & Media',
    definition: 'A camera shot where the camera is tilted on its roll axis, creating a slanted horizon.',
    example: 'Dutch angles in horror films create unease and psychological tension.',
    keywords: ['camera', 'angle', 'tilt', 'cinematography', 'composition', 'dynamic'],
  },
  {
    id: 27,
    term: 'Normal Map',
    translation: 'Карта нормалей',
    category: 'Digital Art',
    definition: 'A texture that simulates surface details and bumps without adding geometry.',
    example: 'Normal maps allow game artists to create detailed surfaces with minimal polygon count.',
    keywords: ['texture', '3d', 'detail', 'surface', 'lighting', 'bump'],
  },
  {
    id: 28,
    term: 'Hierarchy',
    translation: 'Ієрархія',
    category: 'Design',
    definition: 'The organization of design elements in order of importance to guide viewer attention.',
    example: 'Visual hierarchy uses size, color, and position to direct the eye through a composition.',
    keywords: ['visual', 'importance', 'layout', 'priority', 'organization', 'flow'],
  },
  {
    id: 29,
    term: 'Subtext',
    translation: 'Підтекст',
    category: 'Performing Arts',
    definition: 'The underlying meaning or emotion beneath the spoken words in a performance.',
    example: 'Great actors convey subtext through gesture, tone, and expression.',
    keywords: ['acting', 'meaning', 'emotion', 'implication', 'theater', 'intention'],
  },
  {
    id: 30,
    term: 'Perspective',
    translation: 'Перспектива',
    category: 'Visual Arts',
    definition: 'A technique for representing three-dimensional objects on a two-dimensional surface.',
    example: 'Renaissance artists developed linear perspective to create realistic depth.',
    keywords: ['depth', 'dimension', 'vanishing point', 'drawing', 'renaissance', 'spatial'],
  },
  {
    id: 31,
    term: 'B-Roll',
    translation: 'Допоміжні кадри',
    category: 'Film & Media',
    definition: 'Supplemental footage used to provide context or cover cuts in the main footage.',
    example: 'Documentaries use B-roll to illustrate interviews and add visual interest.',
    keywords: ['footage', 'editing', 'supplemental', 'documentary', 'cutaway', 'secondary'],
  },
  {
    id: 32,
    term: 'Rigging',
    translation: 'Рігінг',
    category: 'Digital Art',
    definition: 'The process of creating a skeleton for a 3D model to enable animation.',
    example: 'Character rigging involves creating bones and joints for realistic movement.',
    keywords: ['3d', 'animation', 'skeleton', 'bones', 'character', 'movement'],
  },
  {
    id: 33,
    term: 'Contrast',
    translation: 'Контраст',
    category: 'Design',
    definition: 'The difference between design elements, especially colors, values, or sizes.',
    example: 'High contrast between text and background improves readability.',
    keywords: ['difference', 'color', 'visual', 'distinction', 'emphasis', 'accessibility'],
  },
  {
    id: 34,
    term: 'Upstaging',
    translation: 'Перетягування уваги',
    category: 'Performing Arts',
    definition: 'When an actor draws attention away from another performer, often unintentionally.',
    example: 'Moving during another actor\'s monologue is considered upstaging.',
    keywords: ['theater', 'attention', 'stage', 'etiquette', 'performance', 'focus'],
  },
  {
    id: 35,
    term: 'Atmospheric Perspective',
    translation: 'Повітряна перспектива',
    category: 'Visual Arts',
    definition: 'Creating depth by making distant objects lighter, bluer, and less detailed.',
    example: 'Landscape painters use atmospheric perspective to suggest vast distances.',
    keywords: ['depth', 'landscape', 'distance', 'haze', 'color', 'aerial'],
  },
  {
    id: 36,
    term: 'Tracking Shot',
    translation: 'Трекінг',
    category: 'Film & Media',
    definition: 'A camera movement where the camera follows a subject through space.',
    example: 'The famous tracking shot in Goodfellas follows characters through the Copacabana.',
    keywords: ['camera', 'movement', 'following', 'dolly', 'cinematography', 'dynamic'],
  },
  {
    id: 37,
    term: 'Procedural Generation',
    translation: 'Процедурна генерація',
    category: 'Digital Art',
    definition: 'Creating content algorithmically rather than manually, often used in games.',
    example: 'Minecraft uses procedural generation to create infinite unique worlds.',
    keywords: ['algorithm', 'automatic', 'random', 'generation', 'games', 'infinite'],
  },
  {
    id: 38,
    term: 'Color Theory',
    translation: 'Теорія кольору',
    category: 'Design',
    definition: 'The study of how colors interact, mix, and affect human perception and emotion.',
    example: 'Designers use color theory to create harmonious palettes and evoke specific moods.',
    keywords: ['color', 'palette', 'harmony', 'psychology', 'hue', 'emotion'],
  },
  {
    id: 39,
    term: 'Beat',
    translation: 'Біт (пауза)',
    category: 'Performing Arts',
    definition: 'A brief pause in dialogue or action, often used for dramatic effect or timing.',
    example: 'The actor held a beat before delivering the punchline for maximum impact.',
    keywords: ['pause', 'timing', 'rhythm', 'drama', 'pacing', 'silence'],
  },
  {
    id: 40,
    term: 'Glazing',
    translation: 'Глазур (лесування)',
    category: 'Visual Arts',
    definition: 'Applying thin, transparent layers of paint over dried paint to modify color.',
    example: 'Oil painters use glazing to create luminous, jewel-like colors.',
    keywords: ['painting', 'transparent', 'layering', 'oil', 'technique', 'color'],
  },
  {
    id: 41,
    term: 'Diegetic Sound',
    translation: 'Діегетичний звук',
    category: 'Film & Media',
    definition: 'Sound that characters in the film can hear, originating from the story world.',
    example: 'A radio playing in the background is diegetic sound.',
    keywords: ['sound', 'audio', 'source', 'film', 'music', 'realistic'],
  },
  {
    id: 42,
    term: 'Anti-Aliasing',
    translation: 'Згладжування',
    category: 'Digital Art',
    definition: 'A technique to reduce jagged edges in digital images and 3D graphics.',
    example: 'Modern games use various anti-aliasing methods to smooth diagonal lines.',
    keywords: ['smooth', 'edges', 'graphics', 'rendering', 'quality', 'pixels'],
  },
  {
    id: 43,
    term: 'Gestalt Principles',
    translation: 'Принципи гештальту',
    category: 'Design',
    definition: 'Psychological principles describing how humans perceive visual elements as unified wholes.',
    example: 'The principle of proximity suggests that close objects are perceived as groups.',
    keywords: ['psychology', 'perception', 'grouping', 'visual', 'pattern', 'unity'],
  },
  {
    id: 44,
    term: 'Fourth Wall',
    translation: 'Четверта стіна',
    category: 'Performing Arts',
    definition: 'The imaginary barrier between performers and audience in theater and film.',
    example: 'Ferris Bueller breaks the fourth wall by speaking directly to the camera.',
    keywords: ['theater', 'audience', 'barrier', 'illusion', 'direct address', 'meta'],
  },
  {
    id: 45,
    term: 'Composition',
    translation: 'Композиція',
    category: 'Visual Arts',
    definition: 'The arrangement of visual elements within a work of art.',
    example: 'Strong composition guides the viewer\'s eye through the painting.',
    keywords: ['arrangement', 'balance', 'structure', 'layout', 'elements', 'design'],
  },
  {
    id: 46,
    term: 'Foley',
    translation: 'Фолі',
    category: 'Film & Media',
    definition: 'The reproduction of everyday sound effects added to films in post-production.',
    example: 'Foley artists create footstep sounds by walking on various surfaces.',
    keywords: ['sound', 'effects', 'audio', 'post-production', 'realistic', 'recording'],
  },
  {
    id: 47,
    term: 'Shader',
    translation: 'Шейдер',
    category: 'Digital Art',
    definition: 'A program that calculates how surfaces should be rendered in 3D graphics.',
    example: 'Custom shaders can create unique visual effects like stylized water or glowing materials.',
    keywords: ['rendering', '3d', 'material', 'graphics', 'programming', 'visual'],
  },
  {
    id: 48,
    term: 'Alignment',
    translation: 'Вирівнювання',
    category: 'Design',
    definition: 'Positioning elements along common edges or axes to create visual order.',
    example: 'Left-aligned text creates a clean, readable edge for body copy.',
    keywords: ['positioning', 'order', 'grid', 'layout', 'organization', 'precision'],
  },
  {
    id: 49,
    term: 'Ensemble',
    translation: 'Ансамбль',
    category: 'Performing Arts',
    definition: 'A group of performers working together as a cohesive unit.',
    example: 'The ensemble cast collaborated to create a unified performance.',
    keywords: ['group', 'collaboration', 'theater', 'music', 'teamwork', 'collective'],
  },
  {
    id: 50,
    term: 'Underpainting',
    translation: 'Підмальовок',
    category: 'Visual Arts',
    definition: 'An initial layer of paint serving as a base for subsequent layers.',
    example: 'A monochromatic underpainting establishes values before adding color.',
    keywords: ['painting', 'foundation', 'layer', 'technique', 'preparatory', 'base'],
  },
  {
    id: 51,
    term: 'Aspect Ratio',
    translation: 'Співвідношення сторін',
    category: 'Film & Media',
    definition: 'The proportional relationship between width and height of a frame.',
    example: 'Widescreen films typically use a 2.39:1 aspect ratio for cinematic effect.',
    keywords: ['format', 'screen', 'dimensions', 'proportion', 'cinematography', 'frame'],
  },
  {
    id: 52,
    term: 'Particle System',
    translation: 'Система частинок',
    category: 'Digital Art',
    definition: 'A technique for simulating fuzzy phenomena like fire, smoke, or rain.',
    example: 'Game engines use particle systems to create realistic explosions and weather.',
    keywords: ['simulation', 'effects', 'animation', 'fire', 'smoke', 'dynamics'],
  },
  {
    id: 53,
    term: 'Proximity',
    translation: 'Близькість',
    category: 'Design',
    definition: 'The principle that objects close together are perceived as related.',
    example: 'Grouping related items through proximity improves interface usability.',
    keywords: ['grouping', 'relationship', 'gestalt', 'spacing', 'organization', 'perception'],
  },
  {
    id: 54,
    term: 'Motivation',
    translation: 'Мотивація персонажа',
    category: 'Performing Arts',
    definition: 'The reason or drive behind a character\'s actions and decisions.',
    example: 'Understanding character motivation helps actors make authentic choices.',
    keywords: ['character', 'reason', 'intention', 'acting', 'psychology', 'objective'],
  },
  {
    id: 55,
    term: 'Triptych',
    translation: 'Триптих',
    category: 'Visual Arts',
    definition: 'A work of art divided into three sections or panels.',
    example: 'Bosch\'s Garden of Earthly Delights is a famous triptych altarpiece.',
    keywords: ['panels', 'three', 'composition', 'altar', 'medieval', 'structure'],
  },
  {
    id: 56,
    term: 'Establishing Shot',
    translation: 'Загальний план',
    category: 'Film & Media',
    definition: 'A wide shot showing the setting and spatial relationships in a scene.',
    example: 'Films often open with an establishing shot to orient the audience.',
    keywords: ['wide', 'setting', 'location', 'context', 'scene', 'orientation'],
  },
  {
    id: 57,
    term: 'Level of Detail',
    translation: 'Рівень деталізації',
    category: 'Digital Art',
    definition: 'The complexity of a 3D model, often reduced for distant objects to optimize performance.',
    example: 'LOD systems swap high-poly models with simpler versions based on camera distance.',
    keywords: ['optimization', '3d', 'performance', 'polygon', 'distance', 'efficiency'],
  },
  {
    id: 58,
    term: 'Responsive Design',
    translation: 'Адаптивний дизайн',
    category: 'Design',
    definition: 'Design approach ensuring websites work well on various devices and screen sizes.',
    example: 'Responsive design uses flexible grids and media queries for cross-device compatibility.',
    keywords: ['web', 'mobile', 'adaptive', 'flexible', 'device', 'screen'],
  },
  {
    id: 59,
    term: 'Tableau',
    translation: 'Tableau (жива картина)',
    category: 'Performing Arts',
    definition: 'A static scene or pose created by actors, often for dramatic effect.',
    example: 'The play ended with a powerful tableau of the characters frozen in position.',
    keywords: ['pose', 'static', 'freeze', 'composition', 'theater', 'visual'],
  },
  {
    id: 60,
    term: 'Saturation',
    translation: 'Насиченість',
    category: 'Visual Arts',
    definition: 'The intensity or purity of a color, from dull gray to vivid and intense.',
    example: 'Decreasing saturation creates a more muted, sophisticated color palette.',
    keywords: ['color', 'intensity', 'vibrancy', 'chroma', 'hue', 'purity'],
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [selectedTerm, setSelectedTerm] = useState<typeof artTerms[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTerms = artTerms
    .map((term) => {
      if (!searchQuery) {
        const matchesCategory =
          activeCategory === 'All Categories' || term.category === activeCategory;
        return matchesCategory ? { term, relevance: 'category', matchedKeywords: [] } : null;
      }

      const query = searchQuery.toLowerCase();

      // Exact matches in term, translation, or definition
      const exactMatch =
        term.term.toLowerCase().includes(query) ||
        term.translation.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query);

      // Find matched keywords
      const matchedKeywords = term.keywords.filter(
        (keyword) =>
          keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
      );

      const keywordMatch = matchedKeywords.length > 0;

      const matchesSearch = exactMatch || keywordMatch;
      const matchesCategory =
        activeCategory === 'All Categories' || term.category === activeCategory;

      if (matchesSearch && matchesCategory) {
        return {
          term,
          relevance: exactMatch ? 'exact' : 'semantic',
          matchedKeywords,
        };
      }

      return null;
    })
    .filter((item): item is { term: typeof artTerms[0]; relevance: string; matchedKeywords: string[] } => item !== null)
    .sort((a, b) => {
      // Exact matches first
      if (a.relevance === 'exact' && b.relevance !== 'exact') return -1;
      if (a.relevance !== 'exact' && b.relevance === 'exact') return 1;
      // Then by number of matched keywords
      return b.matchedKeywords.length - a.matchedKeywords.length;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111111]">
                  Art Terminology Dictionary
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Interactive English–Ukrainian art glossary
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600 mr-2">
                <div className="text-center px-3 py-1 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-[#3B82F6]">{artTerms.length}</div>
                  <div className="text-xs text-gray-500">terms</div>
                </div>
                <div className="text-center px-3 py-1 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-[#3B82F6]">{categories.length - 1}</div>
                  <div className="text-xs text-gray-500">categories</div>
                </div>
              </div>
              <Select.Root value={activeCategory} onValueChange={setActiveCategory}>
                <Select.Trigger className="inline-flex items-center justify-between gap-3 px-4 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-xl text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white hover:border-[#3B82F6] transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6] min-w-[200px] shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = categoryIcons[activeCategory];
                      return Icon ? <Icon className="w-4 h-4" /> : null;
                    })()}
                    <Select.Value />
                  </div>
                  <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-xl shadow-2xl border-2 border-[#E5E7EB] overflow-hidden z-50 animate-slideDown">
                    <Select.Viewport className="p-2">
                      {categories.map((category) => {
                        const Icon = categoryIcons[category];
                        return (
                          <Select.Item
                            key={category}
                            value={category}
                            className="relative flex items-center gap-3 px-4 py-3 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-[#3B82F6] focus:bg-blue-50 focus:text-[#3B82F6] outline-none transition-all group"
                          >
                            {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                            <Select.ItemText className="font-medium">{category}</Select.ItemText>
                          </Select.Item>
                        );
                      })}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search art term..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-12 py-4 text-lg border-2 border-[#E5E7EB] rounded-2xl bg-white shadow-sm hover:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 hover:scale-110 hover:rotate-90 transition-all duration-200 group"
              title="Clear search"
            >
              <div className="p-1 rounded-full group-hover:bg-red-50">
                <X className="w-5 h-5" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Dictionary Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {searchQuery && (
          <div className="mb-6 inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="p-1.5 bg-[#3B82F6] rounded-lg">
              <Info className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Found <span className="font-bold text-[#3B82F6] text-lg">{filteredTerms.length}</span>{' '}
              {filteredTerms.length === 1 ? 'term' : 'terms'}
              <span className="text-gray-500 ml-1">(including semantically related)</span>
            </p>
          </div>
        )}
        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map(({ term, relevance, matchedKeywords }, index) => (
              <div
                key={term.id}
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                }}
                className={`group bg-white rounded-2xl p-6 shadow-md border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  relevance === 'exact'
                    ? 'border-[#3B82F6] bg-gradient-to-br from-white to-blue-50/30'
                    : 'border-[#E5E7EB] hover:border-[#3B82F6]/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#3B82F6] transition-colors">
                    {term.term}
                  </h3>
                  <span className="text-xs bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                    {term.category}
                  </span>
                </div>
                <p className="text-base font-medium text-gray-600 mb-3">{term.translation}</p>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  {term.definition}
                </p>
                {searchQuery && matchedKeywords.length > 0 && relevance === 'semantic' && (
                  <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-[#E5E7EB]">
                    <span className="text-xs text-gray-500">Related:</span>
                    {matchedKeywords.slice(0, 4).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-[#3B82F6] px-2 py-0.5 rounded-md font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => {
                    setSelectedTerm(term);
                    setIsModalOpen(true);
                  }}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              No terms found matching your search.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try using different keywords or clear your filters
            </p>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 w-[90vw] max-w-3xl max-h-[85vh] overflow-hidden animate-scaleIn">
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-8 py-6 border-b border-blue-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Dialog.Title className="text-3xl font-bold text-white mb-2">
                      {selectedTerm?.term}
                    </Dialog.Title>
                    <p className="text-xl text-blue-100 font-medium">
                      {selectedTerm?.translation}
                    </p>
                  </div>
                  <Dialog.Close className="p-2 hover:bg-white/20 rounded-xl transition-all hover:scale-110">
                    <X className="w-6 h-6 text-white" />
                  </Dialog.Close>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                    {selectedTerm?.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(85vh-180px)]">
                {/* English Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#3B82F6] to-[#2563EB] rounded-full"></div>
                    <h3 className="text-xl font-bold text-[#111111]">English</h3>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Definition
                    </h4>
                    <p className="text-base text-gray-800 leading-relaxed mb-4">
                      {selectedTerm?.definition}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Example
                    </h4>
                    <p className="text-base text-gray-700 italic leading-relaxed border-l-4 border-[#3B82F6] pl-4 py-2 bg-white/50 rounded-r-lg">
                      {selectedTerm?.example}
                    </p>
                  </div>
                </div>

                {/* Ukrainian Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] rounded-full"></div>
                    <h3 className="text-xl font-bold text-[#111111]">Українська</h3>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Визначення
                    </h4>
                    <p className="text-base text-gray-800 leading-relaxed mb-4">
                      {selectedTerm?.definition}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Приклад
                    </h4>
                    <p className="text-base text-gray-700 italic leading-relaxed border-l-4 border-[#2563EB] pl-4 py-2 bg-white/50 rounded-r-lg">
                      {selectedTerm?.example}
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                {selectedTerm?.keywords && selectedTerm.keywords.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"></div>
                      <h3 className="text-xl font-bold text-[#111111]">Related Keywords</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all cursor-default"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
