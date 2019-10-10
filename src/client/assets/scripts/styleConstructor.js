var temponaryClass = {
    name:"",
    properties:{
        
    }
};

var propertiesCollection = {
    width:{
        name:"Ширина",
        value:"width",
        hint:"[число][ед. измерения]"
    },
    height:{
        name:"Высота",
        value:"height",
        hint:"[число][ед. измерения]"
    },
    border:{
        name:"[B] Рамка",
        value:"border",
        hint:"[ширина] [тип] [цвет]"
    },
    border_bottom:{
        name:"[B] Нижняя рамка",
        value:"border",
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
    bottom:{
        name:"[P] Позиционирование снизу",
        value:"bottom",
        hint:"[число][ед. измерения]"
    },
    box_shadow:{
        name:"Тень",
        value:"box-shadow",
        hint:"[сдвиг по x сдвиг по y размытие растяжение цвет]"
    },
    box_sizing:{
        name:"[-] Алгоритм расчета размеров",
        value:"box-sizing",
        hint:"[content-box | border-box]"
    },
    backdrop_filter:{
        name:"[-] Фильтр для заднего элемента",
        value:"backdrop-filter",
        hint:"[фильтр]"
    },
    backface_visibility:{
        name:"[T] Видимость обратной стороны",
        value:"backface-visibility",
        hint:"[visible | hidden]"
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
    all:{
        name:"[-] Сброс стилей",
        value:"all",
        hint:"[initial | inherit | unset]"
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
}