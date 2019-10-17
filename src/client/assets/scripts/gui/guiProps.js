$(document).ready(function(){
    
    $(".rut-elem-prop-change").on("change",function(){
        PropController = new PropertyController(this);
        PropController.setProp(PageController.saveActivePage);
    });
    
    $(".rut-elem-prop-spec-change").on("change",function(){
        PropController = new PropertyController($(this).children("option:selected"));
        PropController.changeProp($(this).data("list"));
    });
    
    $("#rut-add-image").on("change",function(){
        var openFileDialog = document.getElementById('rut-add-image');
        var files = openFileDialog.files;
        
        var copyResult = File.copy(files,"img");
        
        $("#rut-elem-prop-background-image").val(copyResult);
        
        var target = $("#rut-elem-prop-background-image");
        
        PropController = new PropertyController(target);
        PropController.setProp();
        
        $("#rut-add-image").val("");
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
        
        var copyResult = File.copy(files,"img");
        
        $("#rut-elem-prop-attr-src").val(copyResult);

        var target = $("#rut-elem-prop-attr-src");
        
        PropController = new PropertyController(target);
        PropController.setProp();
        
        $("#rut-elem-prop-attr-src-selector").val("");
    });
    
});    