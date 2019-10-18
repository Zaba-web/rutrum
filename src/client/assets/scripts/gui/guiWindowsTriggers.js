$(document).ready(function(){
    
    $(".rut-create-class-trigger").click(function(){
        $(".rut-window-wrapper").fadeOut();
        
        let writer = new OptionListKeyWriter("#rut-new-class-media");
        
        writer.write(Object.keys(window.mediaContainer.styles.media),true);
        
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
        
        $("#rut-edit-class-save").show();
        $("#rut-edit-media-class-save").hide();
        
        $("#rut-edit-class-name").text($(this).data("class-name"));
        $("#rut-class-edit-window").fadeIn(150);
        
    });
    
    $(document).on("click",".rut-media-class-list-item-edit",function(){
        
        let mediaQuery = $(this).data("parent");
        let className = $(this).data("media-class-name");
        
        $(".rut-window-wrapper").fadeOut();
        window.temponaryClass = jQuery.extend(true, {}, window.mediaContainer.styles.media[mediaQuery].classes[className]);
        
        let writer = new PropertyClassContentWriter();
        writer.write();
        
        $("#rut-edit-class-save").hide();
        $("#rut-edit-media-class-save").show();
        
        $("#rut-edit-media-class-save").data("parent",mediaQuery);
        
        $("#rut-edit-class-name").text($(this).data("media-class-name"));
        $("#rut-class-edit-window").fadeIn(150);
        
        Updater.updateAllProjectData();
        
    });
    
    $(document).on("click",".rut-page-list-item-edit",function(){
        $(".rut-window-wrapper").fadeOut();
        $("#rut-page-edit-window").fadeIn(150);
        PageController.getPageToEdit($(this).data("page-name"));
    });

    $(document).on("click",".rut-media-list-item-edit",function(){
        
        let name = $(this).data("media-name");
        $(".rut-window-wrapper").fadeOut();
        $("#rut-add-media-window").fadeIn(150);
        
        $("#rut-add-media-name").val(name);
        $("#rut-add-media-statement").val(window.mediaContainer.styles.media[name].statement);
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
    
    $(".rut-add-new-script-trigger").click(function(){
         $(".rut-window-wrapper").fadeOut();
         $("#rut-add-script-window").fadeIn(150);
    });
    
    $(".rut-add-media-trigger").click(function(){
         $(".rut-window-wrapper").fadeOut();
         $("#rut-add-media-window").fadeIn(150);
    });
    
});   
    