$(document).ready(function(){
    
    
    
    
    // loading separate parts 
    loadPart("propertyBar","#rut-dockers-item-inner-container-properties");
    loadPart("textEditBar",".rut-item-text-editor-container");
    loadPart("newClassWindow","#rut-class-window");
    
    changeTool($("#rut-tool-pointer")); // set Pointer tool as default
    
    // loading default fonts
    loadFonts();
    
    getAllCSSProperties("#rut-new-class-props-list");
    
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
    })
    
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
    
    $("#rut-new-class-add-prop").on("click",function(){
        getPropertyFromList("#rut-new-class-props-list option:selected","#rut-new-class-properties-container");
    });
    
    $("#rut-new-class-save").click(function(){
        if($("#rut-new-class-name").val().length != 0){
            if(saveNewCSSClass()){
                $("#rut-new-class-name").val("");
                $("[data-prop-name]").remove();
                $("#rut-new-class-status").text("Класс создан");
            }else{
                $("#rut-new-class-status").text("Не удалось создать класс");
            }
        }else{
            $("#rut-new-class-status").text("Укажите имя класса");
        }
    });
    
    $(document).on("click",".rut-class-remove-prop",function(){
        propertyRemove($(this).data("target"));
        $("[data-prop-name='"+$(this).data("target")+"']").remove();
    })
    
    $("#rut-create-class-trigger").click(function(){
        $("#rut-class-window").fadeIn(150);
    });
    
    $(".rut-class-window-close").click(function(){
        $(".rut-window-wrapper").fadeOut(150);
    });
    
});

