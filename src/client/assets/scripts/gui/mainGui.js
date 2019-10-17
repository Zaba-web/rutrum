$(document).ready(function(){
    
    /*hidding tool list on click on empty place*/
    jQuery(function($){
        $(document).mouseup(function (e){ 
            var div = $(".rut-sub-toolbar-submenu"); 
            if (!div.is(e.target) 
                && div.has(e.target).length === 0) { 
                div.hide(); 
            }
        });
    });
    
    
    $(window).on('mousewheel', function(event) 
    {
        if(event.ctrlKey == true)
        {
            resizeWorkspace(event);
        }
    });
    
    
    $(".rut-item-operation").on("click",function(){
        doElementOperation(window.toolList.tool_pointer.selected,$(this).data("op"));
    });
    
    $(document).on("change",".rut-new-class-prop-change",function(e){
        TemponaryClassController.addTempClassProp(this);
    });
    
    $("#rut-new-class-name").change(function(){
        window.temponaryClass.name = $(this).val();
    });

    $("#rut-edit-class-add-prop").on("click",function(){
        let writer = new PropertyListContentWriter("#rut-edit-class-props option:selected");
        writer.write("#rut-edit-class-props option:selected",".rut-class-properties-container");
    });
    
    $("#rut-new-class-add-prop").on("click",function(){
        let writer = new PropertyListContentWriter("#rut-add-class-list option:selected");
        writer.write("#rut-add-class-list option:selected",".rut-class-properties-container");
       
    });
    
    $("#rut-new-class-save").click(function(){
        if($("#rut-new-class-name").val().length != 0){ // if class name not empty
            if(!$("#rut-new-class-name").val().includes("rut-")){ // and don't use system prefix
                let classManager = new CSSClassesManager();
                
                if(classManager.addClass()){ // create new class
                    
                    $("#rut-new-class-name").val("");
                    $("#rut-new-class-pseudo").val("");
                    $("[data-prop-name]").remove();
                    $("#rut-new-class-status").text("Класс создан");
                    
                    updateCountDataInfo();
                    
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
        TemponaryClassController.propertyRemove($(this).data("target"));
        $("[data-prop-name='"+$(this).data("target")+"']").remove();
        updateCountDataInfo();
    });
    

    
    $(".rut-class-window-close").click(function(){
        $(".rut-window-wrapper").fadeOut(150);
        $(".rut-status").text("");
        $(".rut-class-properties-container").html("");
        TemponaryClassController.clearTempClass();
    });
    
    $(document).on("click",".rut-class-list-item-delete",function(){
        CSSClassesManager.removeCSSClass($(this).data("class-name"));
        updateCountDataInfo();
    });
    
    $(document).on("click",".rut-page-list-item-delete",function(){
        PageController.removePage($(this).data("page-name"));
        updateCountDataInfo();
    });
    

    
    $("#rut-edit-class-save").click(function(){
        let classManager = new CSSClassesManager();
        if(classManager.addClass()){
            $("#rut-edit-class-status").text("Класс обновлен");
            updateCountDataInfo();
        }else{
            $("#rut-edit-class-status").text("Не удалось обновить класс");
        }
    });
    
    $("#rut-new-page-save").click(function(){
        if($("#rut-new-page-name").val() != ""){
            if(PageController.saveNewPage($("#rut-new-page-name").val(),$("#rut-new-page-title").val())){
                $("#rut-new-page-status").text("Страница созданна");
                updateCountDataInfo();
            }else{
                $("#rut-new-page-status").text("Не удалось создать страницу");
            }
        }else{
            $("#rut-new-page-status").text("Введите название страницы");
        }
        
    });
    
    $("#rut-edit-page-save").click(function(){
        if(PageController.savePageChanges($("#rut-page-edit-name").val())){
            $("#rut-edit-page-status").text("Страница сохранена");
            updateCountDataInfo();
        }else{
            $("#rut-edit-page-status").text("Не удалось сохранить страницу");
        }
    });
    

    
    $("#rut-add-class-to-el").click(function(){
        
        $(window.toolList.tool_pointer.selected).addClass($(".rut-class-list").val());
        
        PropertyController.showElementClassesList(window.toolList.tool_pointer.selected);
        
    });
    
    $(document).on("click",".rut-element-class-delete",function(){
        $(window.toolList.tool_pointer.selected).removeClass($(this).data("class"));
        
        PropertyController.showElementClassesList(window.toolList.tool_pointer.selected);
    });
    
    $(document).on("click",".rut-font-list-item-delete",function(){
        FontController.deleteFont($(this).data("font-name"));
    });
    
    $(document).on("click",".rut-select-page",function(){
        PageController.saveActivePage();
        PageController.selectActivePage($(this).text());
    });
    
    $(".rut-gui-switch").click(function(){
        $(".rut-toolbar-container").fadeToggle(150);
        $(".rut-dockers-container").fadeToggle(150);
    });
    
    $(".rut-display-mode-preview").click(function(){
        $(".rut-display-mode-editing").removeClass("rut-display-mode-active");
        $(".rut-display-mode-preview").addClass("rut-display-mode-active");
        $(".rut-preview").html($(".rut-workspace-container").html());
        $(".rut-preview-wrapper").fadeIn(100);
        $(".rut-display-mode-container").addClass("rut-display-mode-inv");
        window.workStatus = "preview";
    });
    
    $(".rut-display-mode-editing").click(function(){
        $(".rut-display-mode").removeClass("rut-display-mode-active");
        $(".rut-display-mode-editing").addClass("rut-display-mode-active");
        $(".rut-preview").html("");
        $(".rut-preview-wrapper").fadeOut(100);
        $(".rut-display-mode-container").removeClass("rut-display-mode-inv");
        window.workStatus = "editing";
    });
    
    $("#rut-new-project-name-input").change(function(){
        $("#rut-new-project-name-displayer").text($(this).val());
    });

    $("#rut-new-project-input").change(function(){
        $("#rut-new-project-path-displayer").text($(this).val()+"\\");
    });
    
    $("#rut-project-create").click(function(){
        let projCreator = new ProjectCreator();
        if(projCreator.createProject($("#rut-new-project-path-displayer").text(),$("#rut-new-project-name-displayer").text())){
            $("#rut-project-create-status").text("Проект создан");
        }else{
            $("#rut-project-create-status").text("Не удалось создать проект");
        }
    });
    
    $(".rut-sub-menu>li").click(function(){
        pulseEffect(this);
    });
    
    $("#rut-menu-save-project").click(function(){
        ProjectSaver.save();
    });
    
    $("#rut-open-project-input").change(function(){
        let projLoader = new ProjectLoader();
        projLoader.open($(this).val());
    });
    
    $("#rut-menu-close-project").click(function(){
        ProjectClose.close();
        $(".rut-workspace-container").fadeOut(150);
    });
    
    
    $("#rut-add-font").click(function(){
        if($("#rut-add-font-name").val().length > 0){
            var fontFile = document.getElementById("rut-select-font");
            if(FontController.addFont(fontFile.files,$("#rut-add-font-name").val())){
                $("#rut-new-font-status").text("Шрифт добавлен");
            }else{
                $("#rut-new-font-status").text("Не удалось добавить шрифт");
            }
        }else{
            $("#rut-new-font-status").text("Введите имя шрифта");
        }
    });
    
});

