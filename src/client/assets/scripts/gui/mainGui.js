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
                if($("#rut-new-class-media").val() == "none"){
                    if(classManager.addClass()){ // create new class

                        $("#rut-new-class-name").val("");
                        $("#rut-new-class-pseudo").val("");
                        $("[data-prop-name]").remove();
                        notify("Класс создан");

                        updateCountDataInfo();
                        TemponaryClassController.clearTempClass();
                    }else{
                        notify("Не удалось создать класс");
                    }
                }else{
                    if(MediaQuery.addClass($("#rut-new-class-media").val())){ // create new class

                        $("#rut-new-class-name").val("");
                        $("#rut-new-class-pseudo").val("");
                        $("[data-prop-name]").remove();
                        notify("Класс создан");

                        updateCountDataInfo();
                        TemponaryClassController.clearTempClass();
                    }else{
                        notify("Не удалось создать класс");
                    }
                }
            }else{
                notify("Вы не можете использовать системный префикс rut-");
            }
        }else{
            notify("Укажите имя класса");
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
        Updater.updateAllProjectData();
    });
    
    $(document).on("click",".rut-page-list-item-delete",function(){
        PageController.removePage($(this).data("page-name"));
        Updater.updateAllProjectData();
    });
    
    $(document).on("click",".rut-script-list-item-delete",function(){
        ScriptLoader.delete($(this).data("script-name"));
        $(this).parent().remove();
        Updater.updateAllProjectData();
    });
    
    $(document).on("click",".rut-media-list-item-delete",function(){
        MediaQuery.delete($(this).data("media-name"));
        $(this).parent().remove();
        Updater.updateAllProjectData();
    });
    
    $(document).on("click",".rut-media-class-list-item-delete",function(){
        
        let mediaQuery = $(this).data("parent");
        let className = $(this).data("media-class-name");
        
        delete window.mediaContainer.styles.media[mediaQuery].classes[className];
        
        $(this).parent().remove();
        Updater.updateAllProjectData();
    });
    
    /*Cloud system events*/
    
    $(document).on("click",".rut-cloud-delete",function(){
        let cloudProjectName = $(this).data("name");
        removeCloudProject(window.user.login,window.user.password,cloudProjectName);
        $(this).parent().parent().remove();
    });
    
    $(document).on("click",".rut-cloud-download",function(){
        let cloudProjectName = $(this).data("name");
        downloadCloudProject(window.user.login, window.user.password, cloudProjectName);
        $(".rut-window-wrapper").fadeOut();
        $(".rut-cloud-project-selected").removeClass("rut-cloud-project-selected");
        $("[data-name="+cloudProjectName+"]").parent().parent().addClass("rut-cloud-project-selected");
    });
    
    $(document).on("click",".rut-cloud-upload",function(){
        let cloudProjectName = $(this).data("name");
        
        let projectName = window.projectDir.split("/");
        projectName = projectName[projectName.length-1];
        
        if(cloudProjectName == projectName){
            ProjectSaver.save();
            $(".rut-upload-project-to-cloud").click();
            notify("Проект сохранен.");
        }else{
            notify("Вы не можете загрузить текущий проект на место другого.");
        }
        
    });
    
    $(document).on("click",".rut-cloud-local-save",function(){
        window.tempName = $(this).data("name");
        
        $("#rut-project-save-cloud-file").click();
        
    });
    
    $("#rut-project-save-cloud-file").change(function(){
        let saveLocalPath = $(this).val()+"/";
        saveLocalPath = saveLocalPath.replace(/\\/g,"/");
        $(this).val("");
        
        downloadCloudProject(window.user.login, window.user.password, window.tempName, saveLocalPath);
    });
    
    /**/
    
    $("#rut-edit-class-save").click(function(){
        let classManager = new CSSClassesManager();
        if(classManager.addClass()){
            notify("Класс обновлен");
            Updater.updateAllProjectData();
        }else{
            notify("Не удалось обновить класс");
        }
    });
    
    $("#rut-edit-media-class-save").click(function(){
        if(MediaQuery.addClass($(this).data("parent"))){
            notify("Класс обновлен");
            Updater.updateAllProjectData();
            
        }else{
            notify("Не удалось обновить класс");
        }
    });
    
    $("#rut-new-page-save").click(function(){
        if($("#rut-new-page-name").val() != ""){
            if(PageController.saveNewPage($("#rut-new-page-name").val(),$("#rut-new-page-title").val())){
                notify("Страница созданна");
                updateCountDataInfo();
            }else{
                notify("Не удалось создать страницу");
            }
        }else{
            notify("Введите название страницы");
        }
        
    });
    
    $("#rut-edit-page-save").click(function(){
        if(PageController.savePageChanges($("#rut-page-edit-name").val())){
            notify("Страница сохранена");
            updateCountDataInfo();
        }else{
            notify("Не удалось сохранить страницу");
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
        CSSClassesManager.updateCSS(true);
        $(".rut-display-mode-editing").removeClass("rut-display-mode-active");
        $(".rut-display-mode-preview").addClass("rut-display-mode-active");
        $(".rut-preview").html($(".rut-workspace-container").html());
        $(".rut-preview-wrapper").fadeIn(100);
        $(".rut-display-mode-container").addClass("rut-display-mode-inv");
        window.workStatus = "preview";
        win.setMinimumSize(100, 100);
    });
    
    $(".rut-display-mode-editing").click(function(){
        CSSClassesManager.updateCSS();
        $(".rut-display-mode").removeClass("rut-display-mode-active");
        $(".rut-display-mode-editing").addClass("rut-display-mode-active");
        $(".rut-preview").html("");
        $(".rut-preview-wrapper").fadeOut(100);
        $(".rut-display-mode-container").removeClass("rut-display-mode-inv");
        window.workStatus = "editing";
        win.setMinimumSize(1170, 512);
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
            notify("Проект создан");
            $(".rut-window-wrapper").fadeOut(50);
        }else{
            notify("Не удалось создать проект");
        }
    });
    
    $(".rut-sub-menu>li").click(function(){
        pulseEffect(this);
    });
    
    $("#rut-menu-save-project").click(function(){
        ProjectSaver.save();
        notify("Проект сохранен");
    });
    
    $("#rut-open-project-input").change(function(){
        let projLoader = new ProjectLoader();
        projLoader.open($(this).val());
    });
    
    $("#rut-menu-close-project").click(function(){
        ProjectClose.close();
        $(".rut-workspace-container").fadeOut(150);
    });
    
    $(".rut-menu-open-cloud-project").click(function(){
        $(".rut-window-wrapper").fadeOut(150);
        getProjectList(window.user.login,window.user.password,"min");
        $("#rut-cloud-project-open-window ").fadeIn(150);
    });
    
    $("#rut-menu-export-project").click(function(){
        let exporter = new Exporter();
        exporter.export();
        notify("Проект экспортирован");
    });
    
    $("#rut-add-font").click(function(){
        if($("#rut-add-font-name").val().length > 0){
            var fontFile = document.getElementById("rut-select-font");
            if(FontController.addFont(fontFile.files,$("#rut-add-font-name").val())){
                
                notify("Шрифт добавлен");
                
                $("#rut-add-font-name").val("");
                $("#rut-select-font").val("");
                
            }else{
                notify("Не удалось добавить шрифт");
            }
        }else{
            notify("Введите имя шрифта");
        }
    });    
    
    $("#rut-select-script").change(function(){
        
        let openFileDialog = document.getElementById("rut-select-script");
        let file = openFileDialog.files;
        
        $(".rut-script-path").text(file[0].path);
        
    });
    
    $("#rut-add-script").click(function(){
        if($("#rut-add-script-name").val().length > 0){
            
            let sl = new ScriptLoader("rut-select-script",$("#rut-add-script-name").val());
            
            if(sl.load()){
                notify("Скрипт подключен");
            }
            
            $("#rut-add-script-name").val("");
            $("#rut-select-script").val("");
            $(".rut-script-path").text("");
            
        }else{
            notify("Введите имя скрипта");
        }
    });
    
    $("#rut-add-media-submit").click(function(){
        
        let queryName = $("#rut-add-media-name").val();
        let queryStatement = $("#rut-add-media-statement").val();
        
        if(queryName.length>0){
            if(MediaQuery.add(queryName,queryStatement)){
                notify("Медиа запрос сохранен");
                $("#rut-add-media-statement").val("");
                $("#rut-add-media-name").val("");
            }else{
                notify("Не удалось сохранить медиа запрос");
            }
        }else{
            notify("Введите имя запроса");
        }
        
    });
    
    $('a[target=_blank]').on('click', function(){
       require('nw.gui').Shell.openExternal( this.href );
       return false;
    });

    $(".rut-open-tutorial").click(function(){
        let gui = require('nw.gui');
        let path  = process.cwd();
        gui.Shell.openItem(path+"/rutrum.chm");
    });
    
    $("#rut-create-account-submit").click(function(){
        
        let login = $("#rut-create-account-login").val();
        let password = $("#rut-create-account-password").val();
        let password_re = $("#rut-create-account-password_re").val();
        let email = $("#rut-create-account-email").val();
        let first_name = $("#rut-create-account-name").val();
        let second_name = $("#rut-create-account-surname").val();
        
        registerAccount(login,password,password_re,email,first_name,second_name);
        
    });
    
    $("#rut-login-account-submit").click(function(){
        
        let login = $("#rut-login-account-login").val();
        let password = $("#rut-login-account-password").val();
        let remember = $("#rut-login-account-remember:checked").val();
        
        loginToAccount(login,password,remember);
        
    });
    
    $(".rut-upload-project-to-cloud").click(function(){
        showLoading();
        uploadProject();
    });
    
    $('#rut-project-upload-submit').on('click', function() {
        
        
        var file_data = $('#rut-project-upload-file').prop('files')[0];
        var form_data = new FormData(); 

        form_data.append('file', file_data);
        form_data.append("login", window.user.login);
        form_data.append("password", window.user.password);

        $.ajax({
            url: 'http://api.rutrum.tech/api/Controllers/FileUploader.php',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(response){
                
                hideLoading();
                
                notify(response);
                getProjectList(window.user.login,window.user.password);
                
                let projectName = window.projectDir.split("/");
                projectName = projectName[projectName.length-1];
                
                let fs = require('fs');
                fs.unlinkSync(window.projectDir+"/"+projectName+".zip");
                
            }
         });
    });
    
    $(".rut-user-exit").click(function(){
        accountLogout();
    });
    
    $(".rut-theme-change").click(function(){
        let themeName = $(this).data("theme");
        loadTheme(themeName);
    });
    
});

