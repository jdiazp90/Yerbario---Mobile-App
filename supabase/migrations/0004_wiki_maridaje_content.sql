-- Yerbario — real Wiki/Maridaje content (Sprint 1.75, research-informed)
-- Replaces the bracketed "[Ejemplo]" placeholder rows from 0003 with
-- original, researched editorial copy (mate types, bombilla guide, cebado
-- technique, maridaje). Written as UPDATEs keyed on the old placeholder
-- titles, so this applies cleanly whether or not 0003's inserts have
-- already run in this database — run 0003 then 0004 if starting fresh,
-- or just 0004 if 0003 already ran.

-- ── mate_type ─────────────────────────────────────────────────────────

update public.wiki_entry set
  title = 'Mate calabaza',
  body = 'El mate calabaza es el recipiente hecho a partir del fruto seco y vaciado de la Lagenaria siceraria — la forma más asociada a la imagen clásica del mate en Argentina, Uruguay y Paraguay, y la base sobre la que se construyen la mayoría de los otros formatos (torpedo, camionero e imperial son, en el fondo, calabazas con distinto corte y terminación).' || chr(10) || chr(10) ||
    'Al ser un material natural y poroso, una calabaza nueva necesita curarse antes de su primer uso: el proceso alisa las paredes internas, evita que se acumulen hojas de yerba entre las grietas, y deja que los taninos naturales formen de a poco una capa protectora que sella el interior.' || chr(10) || chr(10) ||
    'Una vez curada, una buena calabaza mejora con el uso — absorbe parte del carácter de las yerbas que pasan por ella con el tiempo, algo que los materos con años de rodaje notan y cuidan.'
where title = '[Ejemplo] Mate calabaza';

update public.wiki_entry set
  title = 'Mate imperial',
  body = 'El mate imperial se distingue por la calidad de sus materiales antes que por su forma: calabazas seleccionadas de mayor grosor, cuero también más grueso, y una virola trabajada a mano en alpaca o plata con detalles tallados — un nivel de terminación más alto que el de un torpedo o camionero estándar.' || chr(10) || chr(10) ||
    'No es, estrictamente, una silueta distinta sino una categoría de calidad: un mate imperial puede tener forma de torpedo o de camionero, pero con componentes superiores.' || chr(10) || chr(10) ||
    'Por el trabajo manual en la virola y la selección de materiales, suelen costar más y pensarse como piezas para regalar o coleccionar, más que como el mate de uso diario.'
where title = '[Ejemplo] Mate imperial';

insert into public.wiki_entry (category, title, body, order_index) values
(
  'mate_type',
  'Mate torpedo',
  'El mate torpedo — también llamado ''mate bala'' en Argentina — es la forma más tradicional y difundida: un cuerpo cilíndrico, curvado y bajo, con una boca de apertura media, diseñado para encajar cómodo en la mano durante sesiones largas.' || chr(10) || chr(10) ||
    'Su nombre viene, justamente, de su parecido con un torpedo o proyectil. Suele llevar virola de acero inoxidable quirúrgico, tanto por resistencia como por higiene.' || chr(10) || chr(10) ||
    'Al tener una boca más angosta que el camionero, retiene mejor el calor entre cebada y cebada — a cambio de que hay que recebar con más frecuencia.',
  3
),
(
  'mate_type',
  'Mate camionero',
  'El camionero debe su nombre a que se popularizó entre los camioneros en viajes largos: una boca ancha y una base angosta, muchas veces con tres o cuatro patas para asentarse solo sobre una mesada o el tablero de un camión.' || chr(10) || chr(10) ||
    'La apertura más ancha que la del torpedo tiene una ventaja concreta: es menos probable que el agua rebalse al cebar, y cada cebada rinde más agua — por eso es una elección habitual para tomar mate solo, en sesiones largas, sin tener que recebar cada dos minutos.' || chr(10) || chr(10) ||
    'Es, junto al torpedo, uno de los formatos más usados hoy en Argentina y Uruguay — la elección entre uno y otro es, sobre todo, una cuestión de costumbre.',
  4
);

-- ── bombilla ──────────────────────────────────────────────────────────

update public.wiki_entry set
  title = 'Materiales de bombilla: acero, alpaca y bambú',
  body = 'El acero inoxidable es, hoy, el material más elegido para el uso diario: no altera el sabor de la yerba, resiste bien los golpes y es el más fácil de limpiar — con el cuidado adecuado prácticamente no se degrada con los años.' || chr(10) || chr(10) ||
    'La alpaca (una aleación tradicional de cobre, zinc y níquel) fue durante mucho tiempo el material de referencia en Argentina y sigue siendo, junto al acero, la opción con mejor relación entre calidad y precio para quien busca algo más que lo puramente funcional.' || chr(10) || chr(10) ||
    'El bambú es la opción más artesanal: se usa tanto para el cuerpo como para parte del filtro, aprovechando que sus tallos delgados y huecos son naturalmente aptos para el paso del agua. Pide más cuidado que el metal, pero es una elección apreciada por quienes valoran lo natural sobre lo práctico.'
where title = '[Ejemplo] Bombilla recta vs. con resorte';

insert into public.wiki_entry (category, title, body, order_index) values
(
  'bombilla',
  'Bombilla recta y tipos de filtro',
  'La forma más simple es la bombilla recta: un tubo derecho, sin curvas, que combina bien con calabazas o mates de acero de silueta también recta. Es, además, la más fácil de limpiar por dentro, justamente por no tener recovecos.' || chr(10) || chr(10) ||
    'El filtro es lo que realmente cambia la experiencia de cebado. El filtro plano (perforaciones simples en la punta) es el más común y el que mejor ayuda a formar el ''pozo'' — el hueco que se forma en la yerba con el uso y que concentra el sabor.' || chr(10) || chr(10) ||
    'El filtro de resorte agrega un resorte enrollado sobre el filtro plano, funcionando como un segundo filtrado. Se recomienda especialmente para yerbas de corte más grueso (como las de tipo ''Canarias''), porque retiene mejor las partículas grandes, y suele venir acompañado de una virola difusora que reparte el calor del agua de forma más pareja.',
  2
);

-- ── technique ─────────────────────────────────────────────────────────

update public.wiki_entry set
  title = 'Cómo cebar correctamente',
  body = 'Llená el mate hasta unas tres cuartas partes con yerba — como referencia visual, un poco más de la mitad del mate debería quedar cubierta. Tapá la boca con la palma de la mano, invertí el mate y agitalo suavemente durante unos 15 segundos: esto asienta el polvo fino en las paredes en vez de dejarlo en la superficie, donde tapa la bombilla.' || chr(10) || chr(10) ||
    'Sin sacar la mano, inclinalo para que la yerba se acumule hacia un costado, y volvé a una posición casi vertical con el mate a 45°: tiene que quedar un canal libre de yerba de un lado. Si la yerba queda pareja y plana, el mate se lava rápido y pierde sabor enseguida.' || chr(10) || chr(10) ||
    'La primera cebada va con agua tibia, cerca de los 40°C, servida en ese canal — recién ahí se acomoda la bombilla en ese mismo lugar. Nunca hay que arrancar con agua caliente de golpe: quema la yerba y saca el amargor de entrada, antes de que el mate tenga chance de asentarse. De ahí en más, las cebadas siguientes sí van con agua entre 70°C y 80°C — nunca hirviendo — servida sobre el borde, evitando el centro de la yerba.'
where title = '[Ejemplo] Cómo cebar correctamente';

insert into public.wiki_entry (category, title, body, order_index) values
(
  'technique',
  'Cómo curar un mate de calabaza nuevo',
  'La calabaza es un material natural y poroso, así que un mate nuevo necesita un curado antes de su primer uso: alisa las paredes internas, evita que queden hojas de yerba atrapadas en las grietas, y deja que los taninos naturales formen una capa protectora con el tiempo.' || chr(10) || chr(10) ||
    'El método más simple es con yerba ya usada: llenar el mate con yerba cebada (no nueva), agregar agua tibia — nunca hirviendo, puede dañar la calabaza — y dejarlo reposar un día entero. Durante ese tiempo la yerba absorbe impurezas y sabores fuertes del material nuevo. Después, raspar suavemente las paredes con una cucharita para sacar los residuos y enjuagar con agua caliente.' || chr(10) || chr(10) ||
    'Algunos materos prefieren, en cambio, cubrir el interior con una capa fina de manteca y dejarlo reposar 24 horas para sellar los poros. Cualquiera sea el método, terminá escurriendo el mate boca abajo unos cinco minutos y después dejalo secar boca arriba, al aire.',
  2
);

-- ── maridaje (pairing_entry) ──────────────────────────────────────────

update public.pairing_entry set
  title = 'Medialunas y mate',
  linked_yerba_type = 'compuesta',
  description = 'Las medialunas — sobre todo las de manteca — son, probablemente, el acompañamiento más clásico del mate en cualquier bar o casa de Argentina y Uruguay. Su dulzor suave y su textura esponjosa hacen de contrapeso a las notas herbales de una yerba compuesta o suave, sin competir en intensidad.' || chr(10) || chr(10) ||
    'Es la combinación de entrada para cualquiera que recién empieza a tomar mate: nada agresivo de ningún lado de la mesa.'
where title = '[Ejemplo] Facturas y mate dulce';

update public.pairing_entry set
  title = 'Dulce de leche y mate intenso',
  linked_yerba_type = 'tradicional',
  description = 'Con una yerba tradicional, de corte más amargo e intenso, el dulce de leche funciona como contraste directo — el amargor limpia el paladar entre cucharada y cucharada, de forma parecida a como un vino tinto seco corta la grasa de una comida. Un pan con manteca y dulce de leche, o unas galletas simples, cumplen la misma función.' || chr(10) || chr(10) ||
    'Los quesos untables y el pan integral o de salvado van en la misma línea: acompañan bien la intensidad sin sumarle más peso dulce.'
where title = '[Ejemplo] Queso y mate amargo';

insert into public.pairing_entry (title, linked_yerba_type, description, order_index) values
(
  'Alfajores y mate suave',
  'compuesta',
  'El relleno dulce y denso de un alfajor de maicena o de chocolate contrasta con la astringencia natural de la yerba — por eso funciona mejor con una compuesta, más suave, que con un tradicional muy amargo, donde el contraste termina siendo demasiado.' || chr(10) || chr(10) ||
    'Es, además, la combinación de sobremesa por excelencia: mate y alfajor después de almorzar es casi un ritual aparte dentro del ritual del mate.',
  3
),
(
  'Quesos semiblandos y notas cítricas',
  'compuesta',
  'Una yerba suave y dulzona, con acidez media-alta, combina bien con quesos semiblandos como el gouda o el pategrás, y con budines o panes con notas cítricas — la acidez de la yerba y la de la fruta se acompañan en vez de pelearse.' || chr(10) || chr(10) ||
    'Es una combinación menos habitual en la mesa de todos los días, pero vale la pena probarla con una compuesta bien aromática.',
  4
),
(
  'Tortas fritas, el clásico de la lluvia',
  null,
  'En los días de lluvia, las tortas fritas son, sin discusión, el acompañamiento más elegido en gran parte de Argentina y Uruguay — la masa simple, frita y tibia, funciona con cualquier tipo de yerba, y es tanto o más una cuestión de clima y ocasión que de maridaje técnico.' || chr(10) || chr(10) ||
    'Si hay una sola regla no escrita del maridaje matero, es esta: mate + lluvia + torta frita, sin importar qué yerba haya en el mate ese día.',
  5
);
