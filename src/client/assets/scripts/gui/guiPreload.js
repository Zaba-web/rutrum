$(document).ready(function(){
        
    
    
    
    // loading separate parts 
    loadPart("propertyBar","#rut-dockers-item-inner-container-properties");
    loadPart("viewerBar","#rut-dockers-item-inner-container-viewer");
    loadPart("textEditBar",".rut-item-text-editor-container");
    loadPart("newClassWindow","#rut-class-window");
    loadPart("editClassWindow","#rut-class-edit-window");
    loadPart("addClassWindow","#rut-elem-classes-window");
    loadPart("addPageWindow","#rut-page-add-window");
    loadPart("editPageWindow","#rut-page-edit-window");
    loadPart("createNewProject","#rut-create-new-project");
    loadPart("addNewFont","#rut-add-font-window");
    
    
    
    changeTool($("#rut-tool-pointer")); // set Pointer tool as default
    
    // loading default fonts
    FontController.loadFonts();
    
    // loading all viewer lists
    let classList = new ViewerListWriter("#rut-class-list",window.mediaContainer.styles.classes,"класс",true,"class");
    
    let pageList = new ViewerListWriter("#rut-page-list",window.mediaContainer.pages,"страницу",true,"page","rut-select-page");
    
    let fontList = new ViewerListWriter("#rut-font-list",window.mediaContainer.fonts,"шрифт",false,"font");
    
    classList.write();
    pageList.write();
    fontList.write();

    // rendering css code
    CSSClassesManager.updateCSS();
    
    let editCssWriter = new AllCSSPropertiesWriter("#rut-edit-class-props");
    editCssWriter.write();
    let addCssWriter = new AllCSSPropertiesWriter("#rut-add-class-list");
    addCssWriter.write();
    
    $(".rut-select").chosen(); // selecting default tool
    
    calcPreviewHeight(); // preview window height - header height
    
    $(".rut-workspace-width").val($(".rut-workspace-container").width()); // getting default workspace width
    
    $(".rut-workspace-width").change(function(){ // updating workspace width
        $(".rut-workspace-container").width($(this).val());
    })
    
    updateCountDataInfo();
    
    // window controls
    
	$(".rut-app-minimaze").click(function(){
		win.minimize();
	});

	$(".rut-app-change-mode").click(function(){
		screen.width > win.width ? win.maximize() : win.unmaximize();
        calcPreviewHeight();
	});

	$(".rut-app-close").click(function(){
		nw.App.quit();
	});
	
    
    $(window).resize(function(){
        calcPreviewHeight();
    });
    
    $(".rut-window-wrapper").hide(); // hidding all dialog windows
});