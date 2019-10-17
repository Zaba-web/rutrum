$(document).ready(function(){
    // tools description
    $(".rut-toolbar-item-expandable").on("click",function(){
        $(this).children(".rut-sub-toolbar-submenu").fadeToggle(100);
        $(".rut-toolbar-item-hint").hide();
    });
    
    $(".rut-toolbar-item-expandable").on("mouseleave",function(){
        $(".rut-toolbar-item-hint").show();
    });
    
    $(".rut-tool").click(function(){
        changeTool(this);
    });
    
    $("div").on("click",".rut-dynamic",function(e){
        if(window.workStatus == "editing"){
            e.stopPropagation(); // disable DOM recursive select
            useTool(this,$("#rut-tool-name").data("tool-name"));
            logger.log(this);
            return false; // disable default html element actions
        }
    });
    
});