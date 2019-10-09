$(document).ready(function(){
    
    
    
    
    // loading separate parts 
    loadPart("propertyBar","#rut-dockers-item-inner-container-properties");
    loadPart("viewerBar","#rut-dockers-item-inner-container-viewer");
    loadPart("textEditBar",".rut-item-text-editor-container");
    loadPart("newClassWindow","#rut-class-window");
    loadPart("editClassWindow","#rut-class-edit-window");
    loadPart("addClassWindow","#rut-elem-classes-window");
    
    
    
    changeTool($("#rut-tool-pointer")); // set Pointer tool as default
    
    // loading default fonts
    loadFonts();
    
    getClassList("#rut-class-list");
    updateCSS();
    
    getAllCSSProperties("#rut-edit-class-props");
    getAllCSSProperties("#rut-add-class-list");
    
    $(".rut-workspace-width").val($(".rut-workspace-container").width()); // getting default workspace width
    
    $(".rut-workspace-width").change(function(){ // updating workspace width
        $(".rut-workspace-container").width($(this).val());
    })
    
    
    // window controls
    
	$("#rut-app-minimaze").click(function(){
		win.minimize();
	});

	$("#rut-app-change-mode").click(function(){
		screen.width > win.width ? win.maximize() : win.unmaximize();
	});

	$("#rut-app-close").click(function(){
		nw.App.quit();
	});
	
    /*--------------*/
    
    
    $(".rut-window-wrapper").hide();
    
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
        e.stopPropagation();
        useTool(this,$("#rut-tool-name").data("tool-name"));
        console.log(this);
        return false;
    });
    
    $(".rut-elem-prop-change").on("change",function(){
        setProp(this);
    });
    
    $(".rut-elem-prop-spec-change").on("change",function(){
        changeProp($(this).children("option:selected"),$(this).data("list"));
    });
    
    $("#rut-add-image").on("change",function(){
        var openFileDialog = document.getElementById('rut-add-image');
        var files = openFileDialog.files;
        
        window.mediaContainer.images.push(files[0].path);
        
        $("#rut-elem-prop-background-image").val(files[0].path);
        
        var target = $("#rut-elem-prop-background-image");
        
        setProp(target);
        
    });
    
    $(".rut-control-link").change(function(){
        var target = $(this).data("control-target");
        $("#"+target).val($(this).val());
        $("#"+target).change();
    });
    
    $(".rut-control-link-button").click(function(){
        var target = $(this).data("control-target");
        $("#"+target).val($(this).data("val"));
        $("#"+target).change();
        console.log($(this).data("val"));
    });
    
    $("#rut-elem-prop-attr-src-selector").on("change",function(){
        var openFileDialog = document.getElementById('rut-elem-prop-attr-src-selector');
        var files = openFileDialog.files;
        
        window.mediaContainer.images.push(files[0].path);
        
        $("#rut-elem-prop-attr-src").val(files[0].path);
        
        var target = $("#rut-elem-prop-attr-src");
        
        setProp(target);
        
    });
    
    $(".rut-prop-group-expander").click(function(){
        var group = $(this).data("group-id");
        $("#"+group).slideToggle(200);
    })
    
    
    jQuery(function($){
        $(document).mouseup(function (e){ 
            var div = $(".rut-sub-toolbar-submenu"); 
            if (!div.is(e.target) 
                && div.has(e.target).length === 0) { 
                div.hide(); 
            }
        });
    });
    
    $(".rut-item-operation").on("click",function(){
        doElementOperation(window.toolList.tool_pointer.selected,$(this).data("op"));
    });
    
    $(".rut-dockers-item").on("click",function(){
        var containerId = $(this).data("container");
        if($("#"+containerId).css("display") == "none"){ 
            $(".rut-dockers-item-inner-container").hide();
            $("#"+containerId).show(100);
            $(".rut-dockets-item-active").removeClass("rut-dockets-item-active");
            $(this).addClass("rut-dockets-item-active");
        }
    });
    
    $(".rut-close-docker-pannel").click(function(){
        $(".rut-dockers-item-inner-container").hide();
        $(".rut-dockets-item-active").removeClass("rut-dockets-item-active");
    });
    
    $(window).on('mousewheel', function(event) 
    {
        if(event.ctrlKey == true)
        {
            var transformValue = $(".rut-workspace-container").css("transform");
            
            var values = transformValue.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');
            
            var a = values[0];
            var b = values[1];

            var scale = Math.sqrt(a*a + b*b);
            
            if(event.originalEvent.wheelDelta > 0) {
                 if(scale < 1){
                     scale += 0.1;
                 }
             }else {
                 if(scale > 0.1){
                     scale -= 0.1;
                 }
             }
            
             $(".rut-workspace-container").css("transform","scale("+scale+")");
        }
    });
    
    $(document).on("change",".rut-new-class-prop-change",function(e){
        addTempClassProp(this);
    });
    
    $("#rut-new-class-name").change(function(){
        window.temponaryClass.name = $(this).val();
    });

    $("#rut-edit-class-add-prop").on("click",function(){
        getPropertyFromList("#rut-edit-class-props option:selected",".rut-class-properties-container");
    });
    
    $("#rut-new-class-add-prop").on("click",function(){
        getPropertyFromList("#rut-add-class-list option:selected",".rut-class-properties-container");
    });
    
    $("#rut-new-class-save").click(function(){
        if($("#rut-new-class-name").val().length != 0){
            if(!$("#rut-new-class-name").val().includes("rut-")){
                if(saveNewCSSClass()){
                    $("#rut-new-class-name").val("");
                    $("#rut-new-class-pseudo").val("");
                    $("[data-prop-name]").remove();
                    $("#rut-new-class-status").text("Класс создан");
                    clearTempClass();
                }else{
                    $("#rut-new-class-status").text("Не удалось создать класс");
                }
            }else{
                $("#rut-new-class-status").text("Вы не можете использовать системный префикс rut-");
            }
        }else{
            $("#rut-new-class-status").text("Укажите имя класса");
        }
    });
    
    $(document).on("click",".rut-class-remove-prop",function(){
        propertyRemove($(this).data("target"));
        $("[data-prop-name='"+$(this).data("target")+"']").remove();
    });
    
    $(".rut-create-class-trigger").click(function(){
        $(".rut-window-wrapper").fadeOut();
        $("#rut-class-window").fadeIn(150);
    });
    
    $(".rut-class-window-close").click(function(){
        $(".rut-window-wrapper").fadeOut(150);
        $(".rut-status").text("");
        $(".rut-class-properties-container").html("");
    });
    
    $(document).on("click",".rut-class-list-item-delete",function(){
        removeCSSClass($(this).data("class-name"));
    });
    
    $(document).on("click",".rut-class-list-item-edit",function(){ 
        $(".rut-window-wrapper").fadeOut();
        window.temponaryClass = jQuery.extend(true, {}, window.mediaContainer.styles.classes[$(this).data("class-name")]);
        getPropertyFromClass();
        $("#rut-edit-class-name").text($(this).data("class-name"));
        $("#rut-class-edit-window").fadeIn(150);
    });
    
    $("#rut-edit-class-save").click(function(){
        if(saveNewCSSClass()){
            $("#rut-edit-class-status").text("Класс обновлен");
        }else{
            $("#rut-edit-class-status").text("Не удалось обновить класс");
        }
    });
    
    $("#rut-elem-class").click(function(){
        $(".rut-class-list").html("");
        $(".rut-window-wrapper").fadeOut();
        getClassListForElements(".rut-class-list");
        $("#rut-elem-classes-window").fadeIn(150);
        showElementClassesList(GetElementCSSClasses(window.toolList.tool_pointer.selected));
    });
    
    $("#rut-add-class-to-el").click(function(){
        $(window.toolList.tool_pointer.selected).addClass($(".rut-class-list").val());
        showElementClassesList(GetElementCSSClasses(window.toolList.tool_pointer.selected));
    });
    
    $(document).on("click",".rut-element-class-delete",function(){
        $(window.toolList.tool_pointer.selected).removeClass($(this).data("class"));
        showElementClassesList(GetElementCSSClasses(window.toolList.tool_pointer.selected));
    });
});

