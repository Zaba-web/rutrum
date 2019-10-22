var insertableTypes = ["block","inline-block","flex","list-item","table-cell","table","table-row"];

function selectTool(el){
    var tool = $(el).attr("id");
    tool = tool.slice(4,tool.length);
    return tool;
}

function useTool(el,currentTool){
    PageController.saveActivePage();
    currentTool = handleToolName(currentTool);
    logger.log("You used tool - "+currentTool);
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
    let appendElementType = $(targetElement).css("display");
    if(insertableTypes.indexOf(appendElementType) != -1){
        let element = template;
        $(targetElement).append(element);
    }
    
}

function getItemOperations(target){
    $(".rut-item-opertaions-container").show();
    
    let distance = $(window).height()-$(".rut-item-opertaions-container").position().top;
    
    let position = $(target).offset();
     
    if(distance<$(".rut-item-opertaions-container").height()){
        position.top -= $(".rut-item-opertaions-container").height();
    }
    
    $(".rut-item-opertaions-container").css({"left":position.left-$(".rut-item-opertaions-container").width()-7,"top":position.top});
}

function getItemTextEditor(target){
    $(".rut-item-text-editor-container").show();
    let position = $(target).offset();
    $(".rut-item-text-editor-container").css({"left":position.left,"top":position.top-$(".rut-item-text-editor-container").height()*1.4});
}

function changeTool(el){
    let currentTool = selectTool(el);
    $("#rut-tool-name").data("tool-name",currentTool);
    $("#rut-tool-name").text(getToolTitle($("#rut-tool-name").data("tool-name")));
    $(".rut-toolbar-item-active").removeClass("rut-toolbar-item-active");
    $("#rut-tool-"+$(el).data("rut-tool-category")).addClass("rut-toolbar-item-active");
}