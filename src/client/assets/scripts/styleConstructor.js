var temponaryClass = {
    name:"",
    properties:{
        
    }
};

var propertiesCollection = {
    width:{
        name:"[S] Ширина",
        value:"width",
        hint:"[число][ед. измерения]"
    },
    height:{
        name:"[S] Высота",
        value:"height",
        hint:"[число][ед. измерения]"
    },
        max_height:{
        name:"[S] Макс. высота",
        value:"max-height",
        hint:"[число][ед. измерения]"
    },
    max_width:{
        name:"[S] Макс. ширина",
        value:"max-width",
        hint:"[число][ед. измерения]"
    },
    min_height:{
        name:"[S] Мин. высота",
        value:"min-height",
        hint:"[число][ед. измерения]"
    },
    min_width:{
        name:"[S] Мин. ширина",
        value:"min-width",
        hint:"[число][ед. измерения]"
    },
    resize:{
        name:"[S] Масштабирования текст. поля",
        value:"resize",
        hint:"[none | both | horizontal | vertical]"
    },
    table_layout:{
        name:"[S] Расчет размера ячеек",
        value:"table-layout",
        hint:"[auto | fixed]"
    },
    border:{
        name:"[B] Рамка",
        value:"border",
        hint:"[ширина] [тип] [цвет]"
    },
    border_bottom:{
        name:"[B] Нижняя рамка",
        value:"border-bottom",
        hint:"[ширина] [тип] [цвет]"
    },
    border_left:{
        name:"[B] Левая рамка",
        value:"border-left",
        hint:"[ширина] [тип] [цвет]"
    },
    border_right:{
        name:"[B] Правая рамка",
        value:"border-right",
        hint:"[ширина] [тип] [цвет]"
    },
    border_top:{
        name:"[B] Верхняя рамка",
        value:"border-top",
        hint:"[ширина] [тип] [цвет]"
    },
    border_color:{
        name:"[B] Цвет рамки",
        value:"border-color",
        hint:"[цвет | transparent]"
    },
    border_image:{
        name:"[B] Рамка из изображения",
        value:"border-image",
        hint:"url(путь)"
    },
    border_radius:{
        name:"[B] Скругление рамки",
        value:"border-radius",
        hint:"[радиус]"
    },
    border_style:{
        name:"[B] Стиль рамки",
        value:"border-style",
        hint:"[none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset]"
    },
    border_width:{
        name:"[B] Ширина рамки",
        value:"border-width",
        hint:"[размер]"
    },
    border_spacing:{
        name:"[T] Расстояние между ячейками",
        value:"border-spacing",
        hint:"[размер]"
    },
    caption_side:{
        name:"[T] Положение заголовока таблицы",
        value:"caption-side",
        hint:"[top | bottom]"
    },
        backface_visibility:{
        name:"[T] Видимость обратной стороны",
        value:"backface-visibility",
        hint:"[visible | hidden]"
    },
    perspective:{
        name:"[T] Перспектива",
        value:"perspective",
        hint:"[число][ед. измерения]"
    },
    perspective_origin:{
        name:"[T] Точка перспективы",
        value:"perspective-origin",
        hint:"[ проценты | размер | left | center | right | top | bottom] |[[ проценты | размер | left | center | right ] && [ проценты | размер | top | center | bottom ]]"
    },
    transform:{
        name:"[T] Трансформация элемента",
        value:"transform",
        hint:"[функция]"
    },
    transform_origin:{
        name:"[T] Точка центра транформации",
        value:"transform-origin",
        hint:"[x][y][z]"
    },
    transform_style:{
        name:"[T] Перспектива трансформации",
        value:"transform-style",
        hint:"[flat | preserve-3d]"
    },
    transition:{
        name:"[T] Время перехода",
        value:"transition",
        hint:"[время]"
    },
    transition_delay:{
        name:"[T] Задержка перед переходом",
        value:"transition-delay",
        hint:"[время]"
    },
    transition_duration:{
        name:"[T] Продолжительность перехода",
        value:"transition-delay",
        hint:"[время]"
    },
    transition_property:{
        name:"[T] Свойства перехода",
        value:"transition-property",
        hint:"[none | all | свойство]"
    },
    transition_timing_function:{
        name:"[T] Временная функция перехода",
        value:"transition-timing-function",
        hint:"[ease | ease-in | ease-out | ease-in-out | linear | step-start | step-end | steps | cubic-bezier]"
    },
    color:{
        name:"[TX] Цвет текста",
        value:"color",
        hint:"[цвет]"
    },
    column_count:{
        name:"[TX] Кол-во колонок для текста",
        value:"column-count",
        hint:"[число | auto]"
    },
    column_fill:{
        name:"[TX] Заполнение колонок текста",
        value:"column-fill",
        hint:"[auto | balance | balance-all]"
    },
    column_gap:{
        name:"[TX] Расстояние между колонками",
        value:"column-gap",
        hint:"[разменр | normal]"
    },
    column_rule:{
        name:"[TX] Линия между колонками",
        value:"column-rule",
        hint:"[ширина || тип || цвет]"
    },
    column_rule_color:{
        name:"[TX] Цвет меж. кол. линии",
        value:"column-rule-color",
        hint:"[цвет]"
    },
    column_rule_style:{
        name:"[TX] Тип меж. кол. линии",
        value:"column-rule-style",
        hint:"[none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset]"
    },
    column_rule_width:{
        name:"[TX] Ширина меж. кол. линии",
        value:"column-rule-width",
        hint:"[размер | thin | medium | thick]"
    },
    column_span:{
        name:"[TX] Расширение колонки текста",
        value:"column-span",
        hint:"[none | all]"
    },
    column_width:{
        name:"[TX] Ширина колонки текста",
        value:"column-width",
        hint:"[размер | auto]"
    },
    columns:{
        name:"[TX] Ширина и кол-во колонок текста",
        value:"columns",
        hint:"[Ширина колонок || Количество колонок]"
    },
    direction:{
        name:"[TX] Направление текста",
        value:"direction",
        hint:"[ltr | rtl]"
    },
    font:{
        name:"[TX] Параметры текста",
        value:"font",
        hint:"[Начертание || Модификация символов || Толщина символов || Обрезка текста || Шрифт]"
    },
    font_family:{
        name:"[TX] Шрифт",
        value:"font-family",
        hint:"[название]"
    },
    font_kerning:{
        name:"[TX] Кернинг шрифта",
        value:"font-kerning",
        hint:"[auto | normal | none]"
    },
    font_size:{
        name:"[TX] Размер шрифта",
        value:"font-size",
        hint:"[число][ед.измерения]"
    },
    font_stretch:{
        name:"[TX] Ширина начертания",
        value:"font-stretch",
        hint:"[ultra-condensed | extra-condensed | condensed | semi-condensed | normal | semi-expanded | expanded | extra-expanded | ultra-expanded]"
    },
    font_style:{
        name:"[TX] Начертание",
        value:"font-style",
        hint:"[normal | italic | oblique]"
    },
    font_variant:{
        name:"[TX] Представление строч. букв",
        value:"font-variant",
        hint:"[normal | small-caps]"
    },
    font_weight:{
        name:"[TX] Толщина символов",
        value:"font-weight",
        hint:"[число 100-900]"
    },
    hyphens:{
        name:"[TX] Переносы в тексте",
        value:"hyphens",
        hint:"[none | manual | auto]"
    },
    letter_spacing:{
        name:"[TX] Межсимвольный интервал",
        value:"letter-spacing",
        hint:"[размер]"
    },
    line_height:{
        name:"[TX] Междустрочный интервал",
        value:"line-height",
        hint:"[размер]"
    },
    tab_size:{
        name:"[TX] Размер ширины табуляции",
        value:"tab-size",
        hint:"[число]"
    },
    text_align:{
        name:"[TX] Выравнивание текста",
        value:"text-align",
        hint:"[center | justify | left | right | start | end]"
    },
    text_align_last:{
        name:"[TX] Выравнивание последней строки",
        value:"text-align-last",
        hint:"[auto | start | end | left | right | center | justify]"
    },
    text_decoration:{
        name:"[TX] Оформление текста линией",
        value:"text-decoration",
        hint:"[line-through | overline | underline | none]"
    },
    text_decoration_color:{
        name:"[TX] Цвет линии оформления",
        value:"text-decoration-color",
        hint:"[цвет]"
    },
    text_decoration_line:{
        name:"[TX] Тип линии оформления",
        value:"text-decoration-line",
        hint:"[line-through || overline || underline]"
    },
    text_decoration_style:{
        name:"[TX] Стиль линии оформления",
        value:"text-decoration-style",
        hint:"[solid | double | dotted | dashed | wavy]"
    },
    text_indent:{
        name:"[TX] Отступ первой строки",
        value:"text-indent",
        hint:"[размер]"
    },
    text_overflow:{
        name:"[TX] Переполнение элемента текстом",
        value:"text-overflow",
        hint:"[clip | ellipsis]"
    },
    text_shadow:{
        name:"[TX] Тень для текста",
        value:"text-shadow",
        hint:"[none | тень]"
    },
    text_transform:{
        name:"[TX] Преобразование текста",
        value:"text-transform",
        hint:"[capitalize | lowercase | uppercase | none]"
    },
        white_space:{
        name:"[TX] Отображение пробелов",
        value:"white-space",
        hint:"[normal | nowrap | pre | pre-line | pre-wrap]"
    },
    word_break:{
        name:"[TX] Перенос строк внутри слов",
        value:"word-break",
        hint:"[normal | break-all | keep-all]"
    },
    word_spacing:{
        name:"[TX] Интервал между словами",
        value:"word-spacing",
        hint:"[размер]"
    },
    word_wrap:{
        name:"[TX] Перенос длинных слов",
        value:"word-wrap",
        hint:"[normal | break-word]"
    },
    clear:{
        name:"[D] Отмена float",
        value:"clear",
        hint:"[none | left | right | both]"
    },
    clip:{
        name:"[D] Обрезка содержимого",
        value:"clip",
        hint:"[rect(Y1, X2, Y2, X1) | auto]"
    },
    box_shadow:{
        name:"[D] Тень",
        value:"box-shadow",
        hint:"[сдвиг по x сдвиг по y размытие растяжение цвет]"
    },
    box_sizing:{
        name:"[D] Алгоритм расчета размеров",
        value:"box-sizing",
        hint:"[content-box | border-box]"
    },
    backdrop_filter:{
        name:"[D] Фильтр для заднего элемента",
        value:"backdrop-filter",
        hint:"[фильтр]"
    },
    all:{
        name:"[D] Сброс стилей",
        value:"all",
        hint:"[initial | inherit | unset]"
    },
    cursor:{
        name:"[D] Вид указателя мыши",
        value:"cursor",
        hint:"[url('адрес') | курсор]"
    },
    display:{
        name:"[D] Режим отображения",
        value:"display",
        hint:"[block | inline | inline-block | inline-table |inline-flex | flex | list-item | none | run-in | table | table-caption | table-cell | table-column-group | table-column | table-footer-group | table-header-group | table-row | table-row-group]"
    },
    empty_cells:{
        name:"[D] Отображение пустых ячеек",
        value:"empty-cells",
        hint:"[show | hide]"
    },
    filter:{
        name:"[D] Художественный фильтр",
        value:"filter",
        hint:"[фильтр]"
    },
    float:{
        name:"[D] Обтекание элемента",
        value:"float",
        hint:"[left | right | none]"
    },
    image_rendering:{
        name:"[D] Алгоритм интерполяции",
        value:"image-rendering",
        hint:"[auto | crisp-edges | pixelated]"
    },
    list_style:{
        name:"[D] Параметры маркера списка",
        value:"list-style",
        hint:"[Стиль маркера || Позиция маркера || Изображение маркера]"
    },
    list_style_image:{
        name:"[D] Изображение маркера списка",
        value:"list-style-image",
        hint:"[none | url(адрес)]"
    },
    list_style_position:{
        name:"[D] Позиция маркера списка",
        value:"list-style-position",
        hint:"[inside | outside]"
    },
    list_style_type:{
        name:"[D] Стиль маркера",
        value:"list-style-type",
        hint:"[circle | disc | square | armenian | decimal | decimal-leading-zero | georgian | lower-alpha | lower-greek | lower-latin | lower-roman | upper-alpha | upper-latin | upper-roman | none]"
    },
    mix_blend_mode:{
        name:"[D] Режим наложения цвета",
        value:"mix-blend-mode",
        hint:"[normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity]"
    },
    object_fit:{
        name:"[D] Соотношение сторон медиа",
        value:"object-fit",
        hint:"[fill | contain | cover | none]"
    },
    opacity:{
        name:"[D] Непрозрачность",
        value:"opacity",
        hint:"[число 0 - 1]"
    },
    order:{
        name:"[D] Порядок вывода флексов",
        value:"order",
        hint:"[число]"
    },
    outline:{
        name:"[D] Обводка",
        value:"outline",
        hint:"[цвет] [тип] [ширина]"
    },
    outline_color:{
        name:"[D] Цвет обводки",
        value:"outline-color",
        hint:"[цвет]"
    },
    outline_offset:{
        name:"[D] Расст. между рамкой и обводкой",
        value:"outline-offset",
        hint:"[размер]"
    },
    outline_style:{
        name:"[D] Тип обводки",
        value:"outline-style",
        hint:"[none | dotted | dashed | solid | double | groove | ridge | inset | outset]"
    },
    outline_width:{
        name:"[D] Толщина обводки",
        value:"outline-width",
        hint:"[thin | medium | thick | размер]"
    },
    overflow:{
        name:"[D] Переполнение элемента",
        value:"overflow",
        hint:"[auto | hidden | scroll | visible]"
    },
    overflow_x:{
        name:"[D] Переполнение элемента по Х",
        value:"overflow-x",
        hint:"[auto | hidden | scroll | visible]"
    },
    overflow_y:{
        name:"[D] Переполнение элемента по Y",
        value:"overflow-y",
        hint:"[auto | hidden | scroll | visible]"
    },
    quotes:{
        name:"[D] Тип кавычек",
        value:"quotes",
        hint:"[Строка Строка | none]"
    },
    visibility:{
        name:"[D] Видимость элемента",
        value:"visibility",
        hint:"[visible | hidden | collapse]"
    },
    z_index:{
        name:"[D] Перекрытие по оси z",
        value:"z-index",
        hint:"[число]"
    },
    zoom:{
        name:"[D] Масштаб элемента",
        value:"zoom",
        hint:"[число]"
    },
    background:{
        name:"[BG] Фон",
        value:"background",
        hint:"[параметры фона...]"
    },
    background_attachment:{
        name:"[BG] Прокрутка фона",
        value:"background-attachment",
        hint:"[fixed | scroll | inherit]"
    },
    background_blend_mode:{
        name:"[BG] Режим наложения фона",
        value:"background-blend-mode",
        hint:"[normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity]"
    },
    background_clip:{
        name:"[BG] Вывод фона под границами",
        value:"background-clip",
        hint:"[padding-box | border-box | content-box | text]"
    },
    background_color:{
        name:"[BG] Цвет фона",
        value:"background-color",
        hint:"[цвет | transparent]"
    },
    background_image:{
        name:"[BG] Фоновое изображение",
        value:"background-image",
        hint:"[url(адрес)]"
    },
    background_origin:{
        name:"[BG] Метод позиц-ния фона",
        value:"background-origin",
        hint:"[padding-box | border-box | content-box]"
    },
    background_position:{
        name:"[BG] Позиционирование фона",
        value:"background-position",
        hint:"[[left | center | right | проценты | размер] || [top | center | bottom | проценты | размер]]"
    },
    background_position_x:{
        name:"[BG] Позиция фона по Х",
        value:"background-position-x",
        hint:"[left | center | right | проценты | размер]"
    },
    background_position_y:{
        name:"[BG] Позиция фона по Y",
        value:"background-position-y",
        hint:"[top | center | bottom | проценты | размер]"
    },
    background_repeat:{
        name:"[BG] Повторение фона",
        value:"background-repeat",
        hint:"[repeat-x | repeat-y | no-repeat]"
    },
    background_size:{
        name:"[BG] Размер фона",
        value:"background-size",
        hint:"[ размер | проценты | auto | cover | contain]"
    },
    align_items:{
        name:"[F] Выравн. элементов",
        value:"align-items",
        hint:"[flex-start | flex-end | center | baseline | stretch]"
    },
    align_self:{
        name:"[F] Самовыравнивание",
        value:"align-self",
        hint:"[auto | flex-start | flex-end | center | baseline | stretch]"
    },
    flex:{
        name:"[F] Заполнения контейнера",
        value:"flex",
        hint:"[flex-grow flex-shrink || flex-basis]"
    },
    flex_basis:{
        name:"[F] Начальный размер элемента",
        value:"flex-basis",
        hint:"[auto | размер]"
    },
    flex_direction:{
        name:"[F] Положение флексов в конт.",
        value:"flex-direction",
        hint:"[row | row-reverse | column | column-reverse]"
    },
    flex_flow:{
        name:"[F] Положение и расположение",
        value:"flex-direction",
        hint:"[Положение флексов в контейнере || Расположени е в строке]"
    },
    flex_grow:{
        name:"[F] Макс. размер флекс элемента",
        value:"flex-grow",
        hint:"[число]"
    },
    flex_shrink:{
        name:"[F] Коэффициент сжатия флексов",
        value:"flex-shrink",
        hint:"[число]"
    },
    flex_wrap:{
        name:"[F] Расположение в строке",
        value:"flex-wrap",
        hint:"[nowrap | wrap | wrap-reverse]"
    },
    justify_content:{
        name:"[F] Распределение пространства",
        value:"justify-content",
        hint:"[flex-start | flex-end | center | space-between | space-around | space-evenly]"
    },
    animation:{
        name:"[A] Анимация",
        value:"animation",
        hint:"[Имя || Продолжительность || Временная функция || Количество выполнений || Кадр после выполнения || Задержка || Направление || Состояние анимации ]"
    },
    animation_delay:{
      name:"[A] Задержка анимации",
      value:"animation-delay",
      hint:"[число][ед. измерения времени]"
    },
    animation_direction:{
      name:"[A] Направление анимации",
      value:"animation-direction",
      hint:"[normal | alternate | reverse | alternate-reverse]"
    },
    animation_duration:{
      name:"[A] Продолжительность аним.",
      value:"animation-duration",
      hint:"[число][ед. измерения времени]"
    },
    animation_iteration_count:{
      name:"[A] Кол-во повторений аним.",
      value:"animation-iteration-count",
      hint:"[infinite | число]"
    },
    animation_fill_mode:{
      name:"[A] Конечное состояние аним.",
      value:"animation-fill-mode",
      hint:"[none | forwards | backwards | both]"
    },
    animation_name:{
      name:"[A] Имя анимации",
      value:"animation-name",
      hint:"[название]"
    },
    animation_play_state:{
      name:"[A] Состояние анимации",
      value:"animation-play-state",
      hint:"[running | paused]"
    },
    animation_timing_function:{
      name:"[A] Временная функция",
      value:"animation-timing-function",
      hint:"[ease | ease-in | ease-out | ease-in-out | linear | step-start | step-end | steps | cubic-bezier]"
    },
    margin:{
        name:"[P] Отступ от края",
        value:"margin",
        hint:"[число][ед. измерения]"
    },
    margin_bottom:{
        name:"[P] Отступ снизу от края",
        value:"margin-bottom",
        hint:"[число][ед. измерения]"
    },
    margin_left:{
        name:"[P] Отступ слева от края",
        value:"margin-left",
        hint:"[число][ед. измерения]"
    },
    margin_right:{
        name:"[P] Отступ справа от края",
        value:"margin-right",
        hint:"[число][ед. измерения]"
    },
    margin_top:{
        name:"[P] Отступ сверху от края",
        value:"margin-top",
        hint:"[число][ед. измерения]"
    },
    padding:{
        name:"[P] Поля внутри элемента",
        value:"padding",
        hint:"[число][ед. измерения]"
    },
    padding_bottom:{
        name:"[P] Поля внутри элемента снизу",
        value:"padding-bottom",
        hint:"[число][ед. измерения]"
    },
    padding_left:{
        name:"[P] Поля внутри элемента слева",
        value:"padding-left",
        hint:"[число][ед. измерения]"
    },
    padding_right:{
        name:"[P] Поля внутри элемента справа",
        value:"padding-right",
        hint:"[число][ед. измерения]"
    },
    padding_top:{
        name:"[P] Поля внутри элемента сверху",
        value:"padding-top",
        hint:"[число][ед. измерения]"
    },
    position:{
        name:"[P] Способ позиционирования",
        value:"position",
        hint:"[absolute | fixed | relative | static | sticky]"
    },
    left:{
        name:"[P] Позиционирование слева",
        value:"left",
        hint:"[число][ед. измерения]"
    },
    right:{
        name:"[P] Позиционирование справа",
        value:"right",
        hint:"[число][ед. измерения]"
    },
    top:{
        name:"[P] Позиционирование сверху",
        value:"top",
        hint:"[число][ед. измерения]"
    },
    bottom:{
        name:"[P] Позиционирование снизу",
        value:"bottom",
        hint:"[число][ед. измерения]"
    },
    vertical_align:{
        name:"[P] Вертикальное выраванивание",
        value:"vertical-align",
        hint:"[baseline | bottom | middle | sub | super | text-bottom | text-top | top]"
    },
    content:{
        name:"[-] Контент",
        value:"content",
        hint:"[строка | attr(<атрибут>) | open-quote | close-quote | no-open-quote | no-close-quote | url | counter | normal | none]"
    },
    counter_increment:{
        name:"[-] Увеличить счетчик приращений",
        value:"counter-increment",
        hint:"[переменная | число]"
    },
    counter_reset:{
        name:"[-] Установить счетчик приращений",
        value:"counter-reset",
        hint:"[переменная | число]"
    },
    pointer_events:{
        name:"[-] Реакция на сенсорный экран",
        value:"pointer-events",
        hint:"[auto | none]"
    },
    scroll_behavior:{
        name:"[-] Поведение прокрутки",
        value:"scroll-behavior",
        hint:"[auto | smooth]"
    },
    user_select:{
        name:"[-] Поведение выделения текста",
        value:"user-select",
        hint:"[auto | none | text | all | contain]"
    },
}