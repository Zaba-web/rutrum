$(document).ready(function(){
    
    changeTool($("#rut-tool-pointer"));
    
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
        
        $("#rut-elem-prop-background-image").val(files[0].path);
        
        var target = $("#rut-elem-prop-background-image");
        
        setProp(target);
        
    });
    
    $("#rut-elem-prop-attr-src-selector").on("change",function(){
        var openFileDialog = document.getElementById('rut-elem-prop-attr-src-selector');
        var files = openFileDialog.files;
        
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
    
});

