function doElementOperation(el,opCode){
    PageController.saveActivePage();
    window.operationsList[opCode](el);
}

var operationsList = {
    delete: function(el){
        
        $(el).remove();
        
        PropController = new PropertyController(el);
        PropController.clearAllProperties();
        
        $(".rut-item-opertaions-container").hide();
        $(".rut-item-text-editor-container").hide();
        window.toolList.tool_pointer.selected = null;
        pulseEffect("[data-op='delete']");
    },
    edit: function(el){
        $(el).attr("contenteditable",true);
        getItemTextEditor(el);
        pulseEffect("[data-op='edit']");
    },
    copyEl: function(el){
        window.elBuffer = $(el)[0].outerHTML;
        pulseEffect("[data-op='copyEl']");
    },
    pasteEl: function(el){
        appendElement(el,window.elBuffer);
        pulseEffect("[data-op='pasteEl']");
    },
    copyStyle: function(el){
        window.styleBuffer = $(el).attr("style");
        pulseEffect("[data-op='copyStyle']");
    },
    pasteStyle: function(el){
        $(el).attr("style",window.styleBuffer);
        pulseEffect("[data-op='pasteStyle']");
    },
    clearStyle: function(el){
        $(el).attr("style","");
        pulseEffect("[data-op='clearStyle']");
    },
    domElementDown: function(el){
        
        let nextElement = $(el).next();
        
        if(nextElement.length == 0){
            
            if(!$(el).parent().hasClass("rut-workspace-container")){
                nextElement = $(el).parent();
            }
            
        }
        
        $(nextElement).after(el);
    },
    domElementUp: function(el){
        
        let nextElement = $(el).prev();
        
        if(nextElement.length == 0){
            
            if(!$(el).parent().hasClass("rut-workspace-container")){
                nextElement = $(el).parent();
            }
            
        }
        
        $(nextElement).before(el);
        
    }
}