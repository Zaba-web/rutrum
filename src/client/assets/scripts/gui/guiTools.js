$(document).ready(function(){
    // tools description
    $(".rut-toolbar-item-expandable").on("click",function(){
        $(".rut-sub-toolbar-submenu").hide();
        $(this).children(".rut-sub-toolbar-submenu").fadeToggle(100);
        $(".rut-toolbar-item-hint").hide();
    });
    
    $(".rut-toolbar-item-expandable").on("mouseleave",function(){
        $(".rut-toolbar-item-hint").show();
    });
    
    $(".rut-tool").click(function(e){
        changeTool(this);
        if($(this).parent().hasClass("rut-sub-toolbar-submenu")){
            e.stopPropagation();
            $(this).parent().hide();
        }
    });
    
    $("div").on("click",".rut-dynamic",function(e){
        if(window.workStatus == "editing"){
            e.stopPropagation(); // disable DOM recursive select
            useTool(this,$("#rut-tool-name").data("tool-name"));
            logger.log(this);
        }
        return false; // disable default html element actions
        if($(this).prop("tagName") == "A"){
            alert("Вы не можете переходить по ссылкам при работе в Rutrum.");
        }
    });
    
    $("div").on("mouseover",".rut-dynamic",function(e){
        if(window.workStatus == "editing"){
            if(!$(this).hasClass("rut-workspace-container")){
                e.stopPropagation();
                getElementInfo(this);
            }
        }
    });
    
    $("div").on("mouseleave",".rut-dynamic",function(e){
        $(".rut-element-type-container").fadeOut(10);
    });
    
    
    
});