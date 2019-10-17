$(document).ready(function(){
    
    $(".rut-create-class-trigger").click(function(){
        $(".rut-window-wrapper").fadeOut();
        $("#rut-class-window").fadeIn(150);
    });
    
    $(".rut-create-page-trigger").click(function(){
        $(".rut-window-wrapper").fadeOut();
        $("#rut-page-add-window").fadeIn(150);
    });
    
    $(document).on("click",".rut-class-list-item-edit",function(){ 
        $(".rut-window-wrapper").fadeOut();
        window.temponaryClass = jQuery.extend(true, {}, window.mediaContainer.styles.classes[$(this).data("class-name")]);
        
        let writer = new PropertyClassContentWriter();
        writer.write();
        
        $("#rut-edit-class-name").text($(this).data("class-name"));
        $("#rut-class-edit-window").fadeIn(150);
    });
    
    $(document).on("click",".rut-page-list-item-edit",function(){
        $(".rut-window-wrapper").fadeOut();
        $("#rut-page-edit-window").fadeIn(150);
        PageController.getPageToEdit($(this).data("page-name"));
    });

    $(".rut-elem-class").click(function(){
        $(".rut-class-list").html("");
        $(".rut-window-wrapper").fadeOut();
        
        let classWirter = new ClassListWriter(".rut-class-list");
        classWirter.write();
        
        $("#rut-elem-classes-window").fadeIn(150);
        PropertyController.showElementClassesList(window.toolList.tool_pointer.selected);
    });

    $(".rut-add-font-trigger").click(function(){
        $(".rut-window-wrapper").fadeOut();
        $("#rut-add-font-window").fadeIn(150);
    });

    $("#rut-menu-new-project").click(function(){
         $(".rut-window-wrapper").fadeOut();
         $("#rut-create-new-project").fadeIn(150);
    });
    
});   
    