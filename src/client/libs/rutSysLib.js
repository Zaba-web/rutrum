var specialClasses = { // used to change the bootstrap elements values
    cols:["col","col-1","col-2","col-3","col-4","col-5","col-6","col-7","col-8","col-9","col-10","col-11","col-12"],
    valign:["align-items-start","align-items-center","align-items-end"],
    halign:["justify-content-start","justify-content-center","justify-content-end","justify-content-around","justify-content-between"]
}

var logger = {
    debug: true,
    log:function(data){
        if(this.debug){
            console.log(data);
        }
    }
}

/*props*/

class PropertyController {
    constructor(el){
        this.element = el;
        this.metaDataLenght = 14;
        this.propertyList = window.propList;
    }
    
    changeElement(el){
        this.element = el;
    }
    
    getAllProperties(element = this.element){
        for(let i = 0; i < this.propertyList.length; i++ ){
            let property = Property.getInstance(element,this.propertyList[i]);
            property.get(element,this.propertyList[i]);
        }
    }
    
    clearAllProperties(){
        $(".rut-elem-prop-change").val("");
        $(".rut-elem-prop-change").removeAttr("readonly");
        $("#rut-elem-prop-col-spec").html("");
    }
    
    setProp(callback){
        let value = $(this.element).val();
        let property = Property.getInstance(this.element, this.getPurePropName($(this.element).attr("id")));
        let activeTool = window.toolList.tool_pointer.selected;
        
        property.set(activeTool,this.getPurePropName($(this.element).attr("id")),value);
        
        this.updateAllProps();
        
    }
    
    changeProp(classListRow){
        let oldData = $(this.element).val();
        let newData = $(this.element).text();
        
        window.specialClasses[classListRow].forEach(function(item){
            $(window.toolList.tool_pointer.selected).removeClass(item);
        });
        
        $(window.toolList.tool_pointer.selected).addClass(newData);
        
        this.updateAllProps();
        
        logger.log("Old value: "+oldData +"; New value: "+ newData);
    }
    
    static getClassList(el){
        
        let classList = $(el).attr("class").split(" ");
    
        for(let i = 0;i < classList.length;i++){
            if(classList[i].includes("rut-") || classList[i].includes("ui-resizable")){
                classList.splice(i,1);
                i--;
            }
            logger.log(classList[i]);
        }
    
        return classList;
    }
    
    static showElementClassesList(el){
        
        let array = PropertyController.getClassList(el);
        
        $(".rut-element-class-list-container").html("");
        array.forEach(function(item){
            $(".rut-element-class-list-container").append("<li><span class='rut-element-class-delete' data-class='"+item+"'>[x] </span>"+item+"</li>");
        });
        
    }
    
    getPurePropName(fullName){
        return fullName.slice(this.metaDataLenght);
    }
    
    updateAllProps(){
        this.clearAllProperties();
        this.getAllProperties(window.toolList.tool_pointer.selected);
    }
}

class SpecialClassesFinder{
    
    static findSpecialClass(element,specialClass){
        let presentClass = false;
        window.specialClasses[specialClass].forEach(function(cssClass){
            if($(element).hasClass(cssClass)){
                presentClass = cssClass;   
            }
        });
        return presentClass;
    }
    
}

/*---*/

class FontController{
    
    static loadFonts(){
        $(".rut-font-container").html("");
        
        let optionWriter = new OptionListWriter(".rut-font-container");
        optionWriter.write(window.fontList,window.fontList.length);

    }
    
    static includeFonts(){
        var fontStyle = "";
        for(let key in mediaContainer.fonts){
            fontStyle += "@font-face{font-family:"+key+";src:url("+mediaContainer.fonts[key].path+")}";
            if(window.fontList.indexOf(key) === -1){
                window.fontList.push(key);
            }
        }
        return fontStyle;
    }
    
    static addFont(files,name){
        
        let path = File.copy(files,"fonts");
        window.mediaContainer.fonts[name] = {};
        window.mediaContainer.fonts[name].name = name;
        window.mediaContainer.fonts[name].path = path;

        let fontList = new ViewerListWriter("#rut-font-list",window.mediaContainer.fonts,"шрифт",false,"font");

        fontList.write();

        CSSClassesManager.updateCSS();

        return true;
        
    }
    
    static deleteFont(font){
        delete window.mediaContainer.fonts[font];
        window.fontList.splice(window.fontList.indexOf(font),1);

        let fontList = new ViewerListWriter("#rut-font-list",window.mediaContainer.fonts,"шрифт",false,"font");

        fontList.write();

        CSSClassesManager.updateCSS();
    }
    
}

/*--------*/

class TemponaryClassController{
    
    static addTempClassProp(el){
        
        let propValue = $(el).val();
        let propName = $(el).data("prop");
        let endl = "";

        if(!propValue.includes(";")){
            endl = ";";
        }

        window.temponaryClass.properties[propName] = propValue + endl;
        logger.log(window.temponaryClass);
        
    }
    
    static clearTempClass(){
        
        window.temponaryClass.name = "";
        window.temponaryClass.properties =  {};
        
    }
    
    static propertyRemove(propName){
        delete window.temponaryClass.properties[propName];
    }
    
}

class CSSClassesManager{
    
    addClass(){
        
        CSSClassesManager.scanURLProps();
        
        window.temponaryClass.name += $("#rut-new-class-pseudo").val();
        window.mediaContainer.styles.classes[window.temponaryClass.name] = jQuery.extend(true, {}, window.temponaryClass);
        
        CSSClassesManager.updateCSS();
        return true;
        
    }
    
    static scanURLProps(){
        
        for(let key in window.temponaryClass.properties){
            if (window.temponaryClass.properties[key].includes("url")){
                if(!window.temponaryClass.properties[key].includes(window.projectDir)){
                    let tmp = window.temponaryClass.properties[key].split("(");
                    tmp[1] = window.projectDir+"/img/"+tmp[1];
                    window.temponaryClass.properties[key] = tmp.join("(");
                }
            }
        }
        
    }
    
    static updateCSS(full = false){
        
        let CSSPrep = new CSSPreprocessor(window.mediaContainer.styles.classes);
        
        let css;
        if(full){
            css = CSSPrep.render() + "\n" + FontController.includeFonts() + "\n" + MediaQuery.renderMediaCode();
        }else{
            css = CSSPrep.render() + "\n" + FontController.includeFonts();
        }
        
        $("style").html(css);
        
        let classList = new ViewerListWriter("#rut-class-list",window.mediaContainer.styles.classes,"класс",true,"class");
        
        classList.write();

        FontController.loadFonts();
        
    }
    
    static removeCSSClass(data){
        
        delete window.mediaContainer.styles.classes[data];
        $("#"+data).remove();
        
    }

}

class WindowContentWriter{
    constructor(){
        
    }
    write(){
        
    }
}

class PropertyListContentWriter extends WindowContentWriter{
    
    constructor(from){
        super();
        this.propTitle = $(from).data("name");
        this.propName = $(from).data("val");
        this.propHint = $(from).data("hint");
    }
    
    write(from,where){
        $(where).append("<div class='rut-class-window-item' style='width:60%;' data-prop-name='"+this.propName+"'><h4 class='rut-h4'><span class='rut-class-remove-prop' data-target='"+this.propName+"'>[x]</span> "+this.propTitle+":</h4></div><div class='rut-class-window-item' style='width:40%' data-prop-name='"+this.propName+"'><input data-prop='"+this.propName+"' placeholder='"+this.propHint+"' title='"+this.propHint+"' class='rut-inner-controls rut-new-class-prop-change' type='text'></div>");
    }
    
}

class PropertyClassContentWriter extends WindowContentWriter{
    
    constructor(){
        super();
    }
    
    write(){
        $(".rut-class-properties-container").html("");
        for(let key in window.temponaryClass.properties){
            
            if(key.includes("-")){
                key = key.split("-");
                key = key.join("_");
            }

            $(".rut-class-properties-container").append("<div class='rut-class-window-item' style='width:60%;' data-prop-name='"+window.propertiesCollection[key].value+"'><h4 class='rut-h4'><span class='rut-class-remove-prop' data-target='"+window.propertiesCollection[key].value+"'>[x]</span> "+window.propertiesCollection[key].name+":</h4></div><div class='rut-class-window-item' style='width:40%' data-prop-name='"+window.propertiesCollection[key].value+"'><input data-prop='"+window.propertiesCollection[key].value+"' value = '"+window.temponaryClass.properties[window.propertiesCollection[key].value]+"' placeholder='"+window.propertiesCollection[key].hint+"' class='rut-inner-controls rut-new-class-prop-change' type='text'></div>");

        }
    }
}

class OptionListWriter{
    
    constructor(target){
        this.target = target;
        $(this.target).html("");
    }
    
    write(obj,count,nullObj=false){
        if(nullObj){
            $(this.target).append("<option value='none'>Нет</option>");
        }
        for(let i = 0; i<count; i++){
            $(this.target).append("<option value='"+obj[i]+"'>"+obj[i]+"</option>");
        }
    }
}

class OptionListKeyWriter extends OptionListWriter{
    
    constructor(target){
        super(target);
    }
    
    write(obj,nullObj=false){
        if(nullObj){
            $(this.target).append("<option value='none'>Нет</option>");
        }
        for(let key in obj){
            $(this.target).append("<option value='"+obj[key]+"'>"+obj[key]+"</option>");
        }
    }
    
}

class AllCSSPropertiesWriter extends OptionListWriter{
    
    constructor(target){
        super(target);
        this.count = Object.keys(window.propertiesCollection).length;
    }
    
    write(){
        for(let i = 0; i <this.count ; i++){
            let currentItem = window.propertiesCollection[Object.keys(window.propertiesCollection)[i]];
        
            $(this.target).append("<option data-hint = '"+currentItem.hint+"' data-val='"+currentItem.value+"' data-name='"+currentItem.name+"' title='"+currentItem.value+"'>"+currentItem.name+"</option>");
        } 
    }
}

class ClassListWriter extends OptionListWriter{
    constructor(target){
        super(target);
        this.bootstrapClasses = [
            "col-1","col-2","col-3","col-4","col-5","col-6","col-7","col-8","col-9","col-10","col-11","col-12",
            "col-sm-1","col-sm-2","col-sm-3","col-sm-4","col-sm-5","col-sm-6","col-sm-7","col-sm-8","col-sm-9","col-sm-10","col-sm-11","col-sm-12",
            "col-md-1","col-md-2","col-md-3","col-md-4","col-md-5","col-md-6","col-md-7","col-md-8","col-md-9","col-md-10","col-md-11","col-md-12",
            "col-lg-1","col-lg-2","col-lg-3","col-lg-4","col-lg-5","col-lg-6","col-lg-7","col-lg-8","col-lg-9","col-lg-10","col-lg-11","col-lg-12",
            "col-xl-1","col-xl-2","col-xl-3","col-xl-4","col-xl-5","col-xl-6","col-xl-7","col-xl-8","col-xl-9","col-xl-10","col-xl-11","col-xl-12"];
    }
    
    write(){
        $(this.target).append("<option disabled>---------</option><option disabled>Ваши классы: </option><option disabled>---------</option>");
        for(let key in window.mediaContainer.styles.classes){
            $(this.target).append("<option value='"+window.mediaContainer.styles.classes[key].name+"'>"+window.mediaContainer.styles.classes[key].name+"</option>");
        }
        $(this.target).append("<option disabled>---------</option><option disabled>Классы Bootstrap: </option><option disabled>---------</option>");
        for(let i = this.bootstrapClasses.length-1; i >= 0; i--){
            $(this.target).append("<option value='"+this.bootstrapClasses[i]+"'>"+this.bootstrapClasses[i]+"</option>");
        }
    }
    
}

class CSSPreprocessor{
    
    constructor(object){
        this.style = " ";
        this.object = object;
        this.count  = Object.keys(object).length;
    }
    
    render(){
        
        for(let i = 0; i<this.count; i++){
            
            let currentItemName = Object.keys(this.object)[i];
            let currentItemPropCount = Object.keys(this.object[currentItemName].properties).length;
            
            this.style += "."+currentItemName+"{";
            
            for(let j = 0; j<currentItemPropCount; j++){
                
                let currentPropertyName = Object.keys(this.object[currentItemName].properties)[j];
                
                let currentPropertyValue = this.object[currentItemName].properties[currentPropertyName];
                
                this.style += currentPropertyName + ":" + currentPropertyValue;
                
            }
            this.style += "}";
        }
        
        logger.log(this.style);
        return this.style;
    }
}

class ViewerListWriter{
    
    constructor(target,object,titleName,editable,type,classes = null){
        
        this.target = target;
        this.name = titleName;
        this.object = object;
        this.type = type;
        this.classes = classes;
        
        if(!editable){
            this.editable = "style='display:none'";
        }
        
    }
    
    write(parent = null){
        
        $(this.target).html("");
        
        for(let key in this.object){
            
            $(this.target).append("<li class='rut-class-list-item' id='"+key+"'><span class='"+this.classes+"'>"+key+"</span><div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' title='Удалить "+this.name+"' data-parent='"+parent+"' data-"+this.type+"-name='"+key+"' class='rut-"+this.type+"-list-item-delete' style='margin-right:10px'><img src='assets/images/classEdit.svg' "+this.editable+" title='Изменить "+this.name+"' data-parent='"+parent+"' data-"+this.type+"-name='"+key+"' class='rut-"+this.type+"-list-item-edit'></div></li>");
        
        }
        
    }
}

class CloudProjectsListWriter{
    
    constructor(object, target){
        
        this.object = object;
        this.target = target;
        
    }
    
    write(){

        $(this.target).html("");

        for(let i = 0; i<this.object.length;i++){

            $(this.target).append("<li class='rut-class-list-item'>"+this.object[i]+"<div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' class='rut-cloud-delete' data-name='"+this.object[i]+"' title='Удалить проект' style='margin-right:10px'><img src='assets/images/downloadIcon.svg' class='rut-cloud-download' data-name='"+this.object[i]+"' title='Открыть проект с облака' style='margin-right:10px'><img src='assets/images/uploadIcon.svg' class='rut-cloud-upload' data-name='"+this.object[i]+"' title='Сохранить проект на облако' style='margin-right:10px'><img src='assets/images/localSaveIcon.svg' class='rut-cloud-local-save' data-name='"+this.object[i]+"' title='Создать локальную копию проекта' style='margin-right:10px'></div></li>");
        
        }
        
    }
}

class CloudProjectsListWriterMinified extends CloudProjectsListWriter{
    
    constructor(object, target){
        super(object,target)
    }
    
    write(){
        
        $(this.target).html("");
        
        for(let i = 0; i<this.object.length;i++){
            
            $(this.target).append("<div class='rut-class-window-item'> <h4 class='rut-h4'> "+this.object[i]+"</h4> </div> <div class='rut-class-window-item'> <input id='rut-create-account-login' class='rut-cloud-download rut-inner-controls' data-name='"+this.object[i]+"' type='button' value='Открыть'> </div>");
        
        }
        
    }
    
}

class ViewerListWriterMedia extends ViewerListWriter{
    
    constructor(target,object,titleName,editable,type,classes = null){
        
        super(target,object,titleName,editable,type,classes = null);
        
    }
    
    write(){
        
        $(this.target).html("");
        
        for(let key in this.object){
            
            $(this.target).append("<li class='rut-class-list-item' id='"+key+"'><span class='"+this.classes+"'>"+key+"</span><div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' title='Удалить "+this.name+"' data-"+this.type+"-name='"+key+"' class='rut-"+this.type+"-list-item-delete' style='margin-right:10px'><img src='assets/images/classEdit.svg' "+this.editable+" title='Изменить "+this.name+"' data-"+this.type+"-name='"+key+"' class='rut-"+this.type+"-list-item-edit'></div><ul id='rut-sublist-"+key+"'></ul></li>");
            
            let mediaClassListWriter = new ViewerListWriter("#rut-sublist-"+key,this.object[key].classes, "класс", true, "media-class");
            
            logger.log(this.object[key].classes);
            
            mediaClassListWriter.write(key);
            
        }
        
    }
    
}

class PageController{
    
    static saveNewPage(pName,pTitle){
        
        let newPage = {
            name:pName,
            title:pTitle,
            value:null
        }
        
        if(window.mediaContainer.pages[newPage.name] = jQuery.extend(true, {}, newPage)){
            
            let pageList = new ViewerListWriter("#rut-page-list",window.mediaContainer.pages,"страницу",true,"page","rut-select-page");
            
            pageList.write();

            return true;
            
        }else{
            return false;
        }
        
    }
    
    static selectActivePage(name){
        window.activePage = name;
        $(".rut-workspace-container").html(window.mediaContainer.pages[name].value);
    }
    
    static saveActivePage(){
        
        window.mediaContainer.pages[window.activePage].value = $(".rut-workspace-container").html();
        
    }
    
    static removePage(id){
        delete window.mediaContainer.pages[id];
        $("[data-page-name='"+id+"']").parent().parent().remove();
    }
    
    static getPageToEdit(el){
        $("#rut-edit-page-name").val(window.mediaContainer.pages[el].name);
        $("#rut-edit-page-title").val(window.mediaContainer.pages[el].title);
        $("#rut-page-edit-name").val(el);
    }

    static savePageChanges(page){
        
        var newPage = {
            name:$("#rut-edit-page-name").val(),
            title:$("#rut-edit-page-title").val(),
            value:window.mediaContainer.pages[page].value
        }
        
        if(window.mediaContainer.pages[page] = jQuery.extend(true, {}, newPage)){

            let pageList = new ViewerListWriter("#rut-page-list",window.mediaContainer.pages,"страницу",true,"page","rut-select-page");

            pageList.write();

            return true;
        }else{
            return false;
        }
    }
    
}

class Workspace{
    
    static enable(){
        $(".rut-workspace-container").fadeIn(150);
    }
    
}

/*-------------------*/

class ProjectCreator{
    
    createProject(path,name){
        
        ProjectClose.close();
        let dir = path+name;
        
        this.createTree(dir);
        
        window.projectDir = dir.replace(/\\/g,"/");
    
        Workspace.enable();
        updateCountDataInfo();

        PageController.saveNewPage("index","Главная страница");
        PageController.selectActivePage("index");
        $(".rut-start-window-wrapper").fadeOut(100);

        return true;
        
    }
    
    createTree(dir){
        
        let fs = require('fs');
        
        if (!fs.existsSync(dir)){
            
            fs.mkdirSync(dir);
            fs.mkdirSync(dir+"\\img");
            fs.mkdirSync(dir+"\\fonts");
            fs.mkdirSync(dir+"\\scripts");


            fs.writeFileSync(dir+"\\pages.json", '{}');
            fs.writeFileSync(dir+"\\styles.json", '{}');
            fs.writeFileSync(dir+"\\scripts.json", '{}');
            fs.writeFileSync(dir+"\\fonts.json", '{}');
            fs.writeFileSync(dir+"\\maintenance.json", '{}');
        
        }
    }
    
}

class ProjectSaver{
    
    static save(){
        
        $(".rut-element-selected").removeClass("rut-element-selected");
        
        $("[contenteditable='true']").attr("contenteditable","false");
        PageController.saveActivePage();
        let fs = require('fs');

        fs.writeFileSync(window.projectDir+"\\pages.json", JSON.stringify(window.mediaContainer.pages));

        fs.writeFileSync(window.projectDir+"\\styles.json", JSON.stringify(window.mediaContainer.styles));

        fs.writeFileSync(window.projectDir+"\\scripts.json", JSON.stringify(window.mediaContainer.scripts));

        fs.writeFileSync(window.projectDir+"\\fonts.json", JSON.stringify(window.mediaContainer.fonts));
        
        fs.writeFileSync(window.projectDir+"\\maintenance.json",'{"prefs":{"path":"'+window.projectDir+'"}}');
        
    }
    
}

class ProjectLoader{
    
    open(path){
        
        this.readData(path);
        window.projectDir = path.replace(/\\/g,"/");
        
        if(window.projectDir != window.projectMaintenance.prefs.path){
            this.fixProjectPath();
        }
        
        Workspace.enable();

        CSSClassesManager.updateCSS();
        FontController.loadFonts();

        Updater.updateAllProjectData();

        PageController.selectActivePage(window.mediaContainer.pages[Object.keys(window.mediaContainer.pages)[0]].name);
    
        $("#rut-open-project-input").val("");
        $(".rut-start-window-wrapper").fadeOut(100);
    }
    
    readData(path){
        
        let fs = require('fs');
        window.mediaContainer.pages = JSON.parse(fs.readFileSync(path+"/pages.json"));
        
        window.mediaContainer.styles = JSON.parse(fs.readFileSync(path+"/styles.json"));
        
        window.mediaContainer.scripts = JSON.parse(fs.readFileSync(path+"/scripts.json"));
        
        window.mediaContainer.fonts = JSON.parse(fs.readFileSync(path+"/fonts.json"));
        window.projectMaintenance = JSON.parse(fs.readFileSync(path+"/maintenance.json"));
        
    }
    
    fixProjectPath(){ // changes old project path to the new one if project directory has been moved
        
        let oldPath = window.projectMaintenance.prefs.path;
        let newPath = window.projectDir;
        
        for(let key in window.mediaContainer.pages){
            
            window.mediaContainer.pages[key].value = window.mediaContainer.pages[key].value.replaceAll(oldPath,newPath);
            
        }
        
        for(let key in window.mediaContainer.fonts){
            
            window.mediaContainer.fonts[key].path = window.mediaContainer.fonts[key].path.replaceAll(oldPath,newPath);
            
        }
        
        for(let classKey in window.mediaContainer.styles.classes){
            
            let propList = window.mediaContainer.styles.classes[classKey].properties;
            
            for(let propKey in propList){
                
                window.mediaContainer.styles.classes[classKey].properties[propKey] = window.mediaContainer.styles.classes[classKey].properties[propKey].replaceAll(oldPath,newPath);
                
            }
            
        }
        
        for(let mediaKey in window.mediaContainer.styles.media){
            
            for(let classKey in window.mediaContainer.styles.media[mediaKey].classes){
            
                let propList = window.mediaContainer.styles.media[mediaKey].classes[classKey].properties;
            
                for(let propKey in propList){
                
                    window.mediaContainer.styles.media[mediaKey].classes[classKey].properties[propKey] = window.mediaContainer.styles.media[mediaKey].classes[classKey].properties[propKey].replaceAll(oldPath,newPath);
                
                }
            
            }
            
        }
        
    }
    
}

class ProjectClose{
    
    static close(){
        window.mediaContainer.pages = {};
        window.mediaContainer.scripts = {};
        window.mediaContainer.styles.classes = {};
        window.mediaContainer.styles.media = {};
        window.mediaContainer.fonts = {};
        window.projectDir = null;

        $("#rut-preview").html("");
        $(".rut-workspace-container").html("");
        
        Updater.updateAllProjectData();

    }
    
}

class File{
    
    static copy(files,dest){
        
        let fs = require('fs');
        let fileName = files[0].path.split("\\");
        
        fileName = fileName[fileName.length-1];

        fs.copyFile(files[0].path, window.projectDir+"\\"+dest+"\\"+fileName, (err) => {
            if (err) throw err;
        });

        fileName = window.projectDir+"\\"+dest+"\\"+fileName;

        return fileName.replace(/\\/g,"/");
        
    }
    
}

class ScriptLoader{
    
    constructor(id,name){
        this.openFileDialog = document.getElementById(id);
        this.scriptName = name;
    }
    
    load(){
        
        let files = this.openFileDialog.files;
            
        let filePath = File.copy(files,"scripts");
        let fileName = filePath.split("/");
        fileName = fileName[fileName.length-1];
            
        window.mediaContainer.scripts[this.scriptName] = {};
        window.mediaContainer.scripts[this.scriptName].name = this.scriptName;
        window.mediaContainer.scripts[this.scriptName].realName = fileName;
        
        updateCountDataInfo();
        
        return true;
    }
    
    static delete(name){
        delete window.mediaContainer.scripts[name];
    }
    
}

class Updater{
    
    static updateAllProjectData(){
        
        updateCountDataInfo();
        
        let classList = new ViewerListWriter("#rut-class-list",window.mediaContainer.styles.classes,"класс",true,"class");
        
        let pageList = new ViewerListWriter("#rut-page-list",window.mediaContainer.pages,"страницу",true,"page","rut-select-page");
        
        let fontList = new ViewerListWriter("#rut-font-list",window.mediaContainer.fonts,"шрифт",false,"font");
        
        let scriptList = new ViewerListWriter("#rut-script-list",window.mediaContainer.scripts,"скрипт",false,"script");
        
        let mediaList = new ViewerListWriterMedia("#rut-media-list",window.mediaContainer.styles.media,"скрипт",true,"media");
        
        classList.write();
        pageList.write();
        fontList.write();
        scriptList.write();
        mediaList.write();
        
    }
    
    static updateMetaData(){
        CSSClassesManager.updateCSS();
    }
}

class MediaQuery{
    
    static add(name,statement){
        
        window.mediaContainer.styles.media[name] = {};
        window.mediaContainer.styles.media[name].statement = statement;
        window.mediaContainer.styles.media[name].classes = {};
        
        Updater.updateAllProjectData();
        
        return true;
    }
    
    static delete(name){
        delete window.mediaContainer.styles.media[name];
    }
    
    static addClass(name){
        
        CSSClassesManager.scanURLProps();
        
        window.temponaryClass.name += $("#rut-new-class-pseudo").val();
        window.mediaContainer.styles.media[name].classes[window.temponaryClass.name] = jQuery.extend(true, {}, window.temponaryClass);
        
        Updater.updateAllProjectData();
        
        CSSClassesManager.updateCSS();
        return true;
    }
    
    static renderMediaCode(){
        
        let result = "";
        
        for(let key in window.mediaContainer.styles.media){
            
            result += "@media("+window.mediaContainer.styles.media[key].statement+"){";
            
            let cssPrep = new CSSPreprocessor(window.mediaContainer.styles.media[key].classes);
            
            result += cssPrep.render();
            result += "}";
            
        }
        return result;
        
    }
    
}

class Exporter{
    
    constructor(){
        this.fs = require("fs");
        this.exportPath = window.projectDir+"/"+"Website";
    }
    
    export(){
        
        $("[contenteditable='true']").attr("contenteditable","false");
        ProjectSaver.save();
        
        this.createTree();
        this.saveStyles();
        
        this.copyData();
        
        this.buildPages();
        
        let gui = require('nw.gui');
        gui.Shell.openItem(this.exportPath);
    }
    
    createTree(){
        if(!this.fs.existsSync(this.exportPath)){
            this.fs.mkdirSync(this.exportPath);
            this.fs.mkdirSync(this.exportPath+"/img");
            this.fs.mkdirSync(this.exportPath+"/styles");
            this.fs.mkdirSync(this.exportPath+"/scripts");
            this.fs.mkdirSync(this.exportPath+"/fonts");
            this.fs.mkdirSync(this.exportPath+"/pages");
        }
        
    }
    
    saveStyles(){
        
        let CSSPrep = new CSSPreprocessor(window.mediaContainer.styles.classes);
        
        let css = "*{margin:0;padding:0;}"+CSSPrep.render();
        let fonts = FontController.includeFonts();
        let media = MediaQuery.renderMediaCode();
        
        css = css.replaceAll(window.projectDir,"..");
        fonts = fonts.replaceAll(window.projectDir,"..");
        media = media.replaceAll(window.projectDir,"..");
        
        this.fs.writeFileSync(this.exportPath+"/styles/main.css",css);
        this.fs.writeFileSync(this.exportPath+"/styles/fonts.css",fonts);
        this.fs.writeFileSync(this.exportPath+"/styles/media.css",media);
        
        this.fs.copyFileSync("assets/styles/vendor/bootstrap-grid.min.css", this.exportPath+"/styles/bootstrap-grid.min.css");
    }
    
    copyData(){
        
        let dataList = {
            img: this.fs.readdirSync(window.projectDir+"/img"),
            fonts: this.fs.readdirSync(window.projectDir+"/fonts"),
            scripts: this.fs.readdirSync(window.projectDir+"/scripts")
        }
        
        console.log(dataList);
        
        for(let dataKey in dataList){
            for(let i = 0; i < dataList[dataKey].length; i++){
                let file = dataList[dataKey][i];
                this.fs.copyFileSync(window.projectDir+"/"+dataKey+"/"+file, this.exportPath+"/"+dataKey+"/"+file);
            }
        }
        
    }
    
    buildPages(){
        
        let delimiter = "";
        let path = "";
        
        for(let key in window.mediaContainer.pages){
            
            if(key == "index"){
                delimiter = "";
                path = "/";
            }else{
                delimiter = "../"
                path = "/pages/";
            }
            
            let scripts = "";
            
            for(let script in window.mediaContainer.scripts){
                scripts+= "<script src='"+delimiter+"scripts/"+window.mediaContainer.scripts[script].realName+"'></script>";
            }
            
            let pageContent = window.mediaContainer.pages[key].value.replaceAll(window.projectDir+"/",delimiter);
            
            let template = "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'> <title>"+window.mediaContainer.pages[key].title+"</title> <link rel='stylesheet' href='"+delimiter+"styles/bootstrap-grid.min.css'><link rel='stylesheet' href='"+delimiter+"styles/main.css'><link rel='stylesheet' href='"+delimiter+"styles/fonts.css'><link rel='stylesheet' href='"+delimiter+"styles/media.css'> "+scripts+" </head> <body>"+pageContent+"</body> </html>";
            
            this.fs.writeFileSync(this.exportPath+path+window.mediaContainer.pages[key].name+".html",template);
            
        }
        
    }
    
}