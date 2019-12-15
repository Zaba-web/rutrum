var toolList = {
    tool_pointer:{
      title: "Выделение",
      selected: null,
      execute: function(el){
          
          if(el != this.selected){
              $(this.selected).attr("contenteditable","false");
          }
          
          $(".ui-resizable").resizable({ disabled: true });
          $(".ui-resizable").resizable('destroy');
          
          let propertyControler = new PropertyController(el);
          
          $(".rut-element-selected").removeClass("rut-element-selected");
          this.selected = null;
          
          propertyControler.clearAllProperties();
          
          $(".rut-default-hidden").fadeOut(200);
          $(".rut-item-opertaions-container").hide();
          $(".rut-item-text-editor-container").hide();
          
          if(!$(el).hasClass("rut-workspace-container")){
              
            if($(el).data("text")){
                $(el).attr("contenteditable","true");
                getItemTextEditor(el);
            }else{
                if($(el).prop("tagName") != "IMG" & $(el).prop("tagName") != "INPUT" & $(el).prop("tagName") != "TEXTAREA" ){
                    $(el).resizable();
                }
            }  
              
            this.selected = el;
            $(el).addClass("rut-element-selected");
            console.log("Result of pointer tool: "+this.selected);
              
            propertyControler.getAllProperties();

            getItemOperations(this.selected);
          }
          
      }
    },
    container:{
        title:"Контейнер",
        template:"<div class='container rut-insertable rut-display rut-dynamic' data-el-name='Контейнер'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    container_fluid:{
        title:"Полонэкранный контейнер",
        template:"<div class='container-fluid rut-insertable rut-display rut-dynamic' data-el-name='Полноэкранный контейнер'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    row:{
        title:"Строка",
        template:"<div class='row rut-insertable rut-display rut-dynamic' data-el-name='Строка'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    col:{
        title:"Колонка",
        template:"<div class='col rut-insertable rut-display rut-dynamic' data-el-name='Колонка'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    div:{
        title:"Простой блок",
        template:"<div class='rut-insertable rut-display rut-dynamic' data-el-name='Простой блок'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    tool_img:{
        title:"Изображение",
        template:"<img class='rut-display rut-dynamic' data-image-id='newImage' alt='' data-el-name='Изображение'>",
        execute: function(el){
            appendElement(el,this.template);
            var newImage = $(el).children("[data-image-id='newImage']");
            toolList.tool_pointer.execute(newImage);
            $(newImage).removeAttr("data-image-id");
            $("#rut-elem-prop-attr-src-selector").click();
        }
    },
    tool_a:{
        title:"Ссылка",
        template:"<a class='rut-insertable rut-display rut-dynamic' href='' data-text='true' data-el-name='Ссылка'>Новая ссылка</a>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    span:{
        title:"Текстовое поле",
        template:"<span class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Текстовое поле'>Новое текстовое поле</span>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    p:{
        title:"Параграф",
        template:"<p class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Параграф'>Новый параграф</p>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    strong:{
        title:"Жирный текст",
        template:"<strong class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Жирный текст'>Новый жирный текст</strong>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    i:{
        title:"Курсив",
        template:"<i class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Курсив'>Новый курсив</i>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h1:{
        title:"Заголовок 1",
        template:"<h1 class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Заголовок 1'>Новый заголовок 1 уровня</h1>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h2:{
        title:"Заголовок 2",
        template:"<h2 class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Заголовок 2'>Новый заголовок 2 уровня</h2>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h3:{
        title:"Заголовок 3",
        template:"<h3 class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Заголовок 3'>Новый заголовок 3 уровня</h3>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h4:{
        title:"Заголовок 4",
        template:"<h4 class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Заголовок 4'>Новый заголовок 4 уровня</h4>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h5:{
        title:"Заголовок 5",
        template:"<h5 class='rut-display rut-dynamic rut-text-element' data-text='true' data-el-name='Заголовок 5'>Новый заголовок 5 уровня</h5>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    ul:{
        title:"Маркированный список",
        template:"<ul class='rut-display rut-insertable rut-dynamic' data-el-name='Маркированный список'></ul>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    ol:{
        title:"Нумерованный список",
        template:"<ol class='rut-display rut-insertable rut-dynamic' data-el-name='Нумерованный список'></ol>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    li:{
        title:"Элемент списка",
        template:"<li class='rut-display rut-insertable rut-dynamic rut-text-element' data-text='true' data-el-name='Элемент списка'></li>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    table:{
        title:"Таблица",
        template:"<table class='rut-display rut-insertable rut-dynamic' data-el-name='Таблица'></table>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    tr:{
        title:"Строка таблицы",
        template:"<tr class='rut-display rut-insertable rut-dynamic'><td class='rut-display rut-insertable rut-dynamic' data-text='true' data-el-name='Строка таблицы'></td></tr>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    th:{
        title:"Заглавная ячейка",
        template:"<th class='rut-display rut-insertable rut-dynamic' data-text='true' data-el-name='Заглавная ячейка'></th>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    td:{
        title:"Ячейка",
        template:"<td class='rut-display rut-insertable rut-dynamic' data-text='true' data-el-name='Ячейка'></td>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    form:{
        title:"Форма",
        template:"<form class='rut-display rut-insertable rut-dynamic' method='GET' action data-el-name='Форма'></form>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    label:{
        title:"Метка",
        template:"<label class='rut-display rut-insertable rut-dynamic' data-text='true' data-el-name='Метка'>Новая метка</label>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    input:{
        title:"Поле",
        template:"<input class='rut-display rut-insertable rut-dynamic' data-el-name='Поле'>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    textarea:{
        title:"Поле для ввода",
        template:"<textarea class='rut-display rut-dynamic' data-el-name='Поле для ввода'></textarea>",
        execute: function(el){
            appendElement(el,this.template);
        }
    }
}