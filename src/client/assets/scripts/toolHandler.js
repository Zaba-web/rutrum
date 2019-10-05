var insertableTypes = ["block","inline-block","flex","list-item","table-cell","table","table-row"];

function selectTool(el){
    var tool = $(el).attr("id");
    tool = tool.slice(4,tool.length);
    return tool;
}

function useTool(el,currentTool){
    currentTool = handleToolName(currentTool);
    console.log("You used tool - "+currentTool);
    toolList[currentTool].execute(el);
}

function handleToolName(toolName){
    if(toolName.includes("-")){
        toolName = toolName.split("-");
        toolName = toolName.join("_");
    }
    return toolName;
}

function getToolTitle(currentTool){
    currentTool = handleToolName(currentTool);
    return toolList[currentTool].title;
}

function appendElement(targetElement,template){
    var appendElementType = $(targetElement).css("display");
    if(insertableTypes.indexOf(appendElementType) != -1){
        $(targetElement).append(template);
    }
}

function getItemOperations(target){
    $(".rut-item-opertaions-container").show();
    var position = $(target).offset();
    $(".rut-item-opertaions-container").css({"left":position.left-$(".rut-item-opertaions-container").width()-12,"top":position.top});
}

function getItemTextEditor(target){
    $(".rut-item-text-editor-container").show();
    var position = $(target).offset();
    $(".rut-item-text-editor-container").css({"left":position.left,"top":position.top-$(".rut-item-text-editor-container").height()*1.2});
}

function changeTool(el){
    var currentTool = selectTool(el);
    $("#rut-tool-name").data("tool-name",currentTool);
    $("#rut-tool-name").text(getToolTitle($("#rut-tool-name").data("tool-name")));
    $(".rut-toolbar-item-active").removeClass("rut-toolbar-item-active");
    $("#rut-tool-"+$(el).data("rut-tool-category")).addClass("rut-toolbar-item-active");
}