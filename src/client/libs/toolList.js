var toolList = {
    tool_pointer:{
      title: "Выделение",
      selected: null,
      execute: function(el){
          $(".rut-element-selected").removeClass("rut-element-selected");
          this.selected = null;
          clearAllProp();
          $(".rut-default-hidden").fadeOut(200);
          $(".rut-item-opertaions-container").hide();
          
          if(!$(el).hasClass("rut-workspace-container")){
            this.selected = el;
            $(el).addClass("rut-element-selected");
            console.log("Result of pointer tool: "+this.selected);
            getAllProp(el);
            getItemOperations(this.selected);
          }
      }
    },
    container:{
        title:"Контейнер",
        template:"<div class='container rut-insertable rut-display rut-dynamic'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    container_fluid:{
        title:"Полонэкранный контейнер",
        template:"<div class='container-fluid rut-insertable rut-display rut-dynamic'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    row:{
        title:"Строка",
        template:"<div class='row rut-insertable rut-display rut-dynamic'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    col:{
        title:"Колонка",
        template:"<div class='col rut-insertable rut-display rut-dynamic'></div>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    tool_img:{
        title:"Изображение",
        template:"<img class='rut-display rut-dynamic' data-image-id='newImage'>",
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
        template:"<a class='rut-insertable rut-display rut-dynamic' href='' contenteditable='true'></a>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    span:{
        title:"Текстовое поле",
        template:"<span class='rut-display rut-dynamic rut-text-element' contenteditable='true'></span>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    p:{
        title:"Параграф",
        template:"<p class='rut-display rut-dynamic rut-text-element' contenteditable='true'></p>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h1:{
        title:"Заголовок 1",
        template:"<h1 class='rut-display rut-dynamic rut-text-element' contenteditable='true'></h1>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h2:{
        title:"Заголовок 2",
        template:"<h2 class='rut-display rut-dynamic rut-text-element' contenteditable='true'></h2>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h3:{
        title:"Заголовок 3",
        template:"<h3 class='rut-display rut-dynamic rut-text-element' contenteditable='true'></h3>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h4:{
        title:"Заголовок 4",
        template:"<h4 class='rut-display rut-dynamic rut-text-element' contenteditable='true'></h4>",
        execute: function(el){
            appendElement(el,this.template);
        }
    },
    h5:{
        title:"Заголовок 5",
        template:"<h5 class='rut-display rut-dynamic rut-text-element' contenteditable='true'></h5>",
        execute: function(el){
            appendElement(el,this.template);
        }
    }
}