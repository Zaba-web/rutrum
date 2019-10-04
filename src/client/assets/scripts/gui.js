$(document).ready(function(){
    
    
    changeTool($("#rut-tool-pointer")); // set Pointer tool as default
    
    // loading default fonts
    loadFonts();
    
    // loading separate parts 
    loadPart("propertyBar","#rut-dockers-item-inner-container-properties");
    
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
    })
    
    $("#rut-elem-prop-attr-src-selector").on("change",function(){
        var openFileDialog = document.getElementById('rut-elem-prop-attr-src-selector');
        var files = openFileDialog.files;
        
        window.mediaContainer.images.push(files[0].path);
        
        $("#rut-elem-prop-attr-src").val(files[0].path);
        
        var target = $("#rut-elem-prop-attr-src");
        
        setProp(target);
        
    });
    
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
});

