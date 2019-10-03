var operationsList = {
    delete: function(el){
        $(el).remove();
        clearAllProp();
        $(".rut-item-opertaions-container").hide();
        $(".rut-item-text-editor-container").hide();
        window.toolList.tool_pointer.selected = null;
    },
    edit: function(el){
        $(el).attr("contenteditable",true);
        getItemTextEditor(el);
    }
}