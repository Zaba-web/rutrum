
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
        
        callback();
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
        window.temponaryClass.properties =  "";
        
    }
    
    static propertyRemove(propName){
        delete window.temponaryClass.properties[propName];
    }
    
}

class CSSClassesManager{
    
    addClass(){
        
        this.scanURLProps();
        
        window.temponaryClass.name += $("#rut-new-class-pseudo").val();
        window.mediaContainer.styles.classes[window.temponaryClass.name] = jQuery.extend(true, {}, window.temponaryClass);

        CSSClassesManager.updateCSS();
        return true;
        
    }
    
    scanURLProps(){
        
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
    
    static updateCSS(){
        
        let CSSPrep = new CSSPreprocessor();
        let css = CSSPrep.render() + "\n" + FontController.includeFonts();
        $("style").html(css);
        getClassList("#rut-class-list");
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
        for(key in window.temponaryClass.properties){
            
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
    }
    
    write(obj,count){
        for(let i = 0; i<count; i++){
            $(this.target).append("<option value='"+obj[i]+"'>"+obj[i]+"</option>");
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
    }
    
    write(){
        for(key in window.mediaContainer.styles.classes){
            $(this.target).append("<option value='"+window.mediaContainer.styles.classes[key].name+"'>"+window.mediaContainer.styles.classes[key].name+"</option>");
        }
    }
}

class CSSPreprocessor{
    
    constructor(){
        this.style = " ";
        this.count  = Object.keys(window.mediaContainer.styles.classes).length;
    }
    
    render(){
        
        for(let i = 0; i<this.count; i++){
            
            let currentItemName = Object.keys(window.mediaContainer.styles.classes)[i];
            let currentItemPropCount = Object.keys(window.mediaContainer.styles.classes[currentItemName].properties).length;
            
            this.style += "."+currentItemName+"{";
            
            for(let j = 0; j<currentItemPropCount; j++){
                
                let currentPropertyName = Object.keys(window.mediaContainer.styles.classes[currentItemName].properties)[j];
                
                let currentPropertyValue = window.mediaContainer.styles.classes[currentItemName].properties[currentPropertyName];
                
                this.style += currentPropertyName + ":" + currentPropertyValue;
                
            }
            this.style += "}";
        }
        
        logger.log(this.style);
        return this.style;
    }
}


/*-------*/


function getClassList(target){
    $(target).html("");
    for(key in window.mediaContainer.styles.classes){
        $(target).append("<li class='rut-class-list-item' id='"+window.mediaContainer.styles.classes[key].name+"'>"+window.mediaContainer.styles.classes[key].name+"<div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' title='Удалить класс' data-class-name='"+window.mediaContainer.styles.classes[key].name+"' class='rut-class-list-item-delete' style='margin-right:10px'><img src='assets/images/classEdit.svg' title='Изменить класс' data-class-name='"+window.mediaContainer.styles.classes[key].name+"' class='rut-class-list-item-edit'></div></li>");
    }
}

function GetElementCSSClasses(el){
    var classList = $(el).attr("class").split(" ");
    
    for(i = 0;i < classList.length;i++){
        if(classList[i].includes("rut-")){
            classList.splice(i,1);
            i--;
        }
        console.log(classList[i]);
    }
    
    return classList;
}

function showElementClassesList(array){
    $(".rut-element-class-list-container").html("");
    array.forEach(function(item){
        $(".rut-element-class-list-container").append("<li><span class='rut-element-class-delete' data-class='"+item+"'>[x] </span>"+item+"</li>");
    });
}

/*-------------------*/

function selectActivePage(name){
    window.activePage = name;
    $(".rut-workspace-container").html(window.mediaContainer.pages[name].value);
}

function saveActivePage(){
    window.mediaContainer.pages[window.activePage].value = $(".rut-workspace-container").html();
}

function getPageList(target){
    $(target).html("");
    for(key in window.mediaContainer.pages){
        $(target).append("<li class='rut-class-list-item' id='"+key+"'><span data-page-name='"+key+"' class='rut-select-page'>"+key+"</span><div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' title='Удалить страницу' data-page-name='"+key+"' class='rut-page-list-item-delete' style='margin-right:10px'><img src='assets/images/classEdit.svg' title='Изменить страницу' data-page-name='"+key+"' class='rut-page-list-item-edit'></div></li>");
    }
}

function getFontList(target){
    $(target).html("");
    for(key in window.mediaContainer.fonts){
        $(target).append("<li class='rut-class-list-item' id='"+key+"'><span data-page-name='"+key+"' class='rut-select-page'>"+key+"</span><div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' title='Удалить шрифт' data-font-name='"+key+"' class='rut-font-list-item-delete' style='margin-right:10px'></div></li>");
    }
}

function removePage(id){
    delete window.mediaContainer.pages[id];
    $("[data-page-name='"+id+"']").parent().parent().remove();
}

function saveNewPage(pName,pTitle){
    var newPage = {
        name:pName,
        title:pTitle,
        value:null
    }
    if(window.mediaContainer.pages[newPage.name] = jQuery.extend(true, {}, newPage)){
        getPageList("#rut-page-list");
        return true;
    }else{
        return false;
    }
}

function getPageToEdit(el){
    $("#rut-edit-page-name").val(window.mediaContainer.pages[el].name);
    $("#rut-edit-page-title").val(window.mediaContainer.pages[el].title);
    $("#rut-page-edit-name").val(el);
}

function savePageChanges(page){
    var newPage = {
        name:$("#rut-edit-page-name").val(),
        title:$("#rut-edit-page-title").val(),
        value:window.mediaContainer.pages[page].value
    }
    if(window.mediaContainer.pages[page] = jQuery.extend(true, {}, newPage)){
        getPageList("#rut-page-list");
        return true;
    }else{
        return false;
    }
}
/*-------------------*/

function enableWorkspace(){
    $(".rut-workspace-container").fadeIn(150);
}

function createProject(path,name){
    clearProjectData();
    fs = require('fs');
    var dir = path+name;
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        fs.mkdirSync(dir+"\\img");
        fs.mkdirSync(dir+"\\fonts");
    }
    
    fs.writeFileSync(dir+"\\pages.json", '{}');
    fs.writeFileSync(dir+"\\styles.json", '{}');
    fs.writeFileSync(dir+"\\scripts.json", '{}');
    fs.writeFileSync(dir+"\\fonts.json", '{}');
    
    window.projectDir = dir.replace(/\\/g,"/");
    
    enableWorkspace();
    updateCountDataInfo();
    
    saveNewPage("index","Главная страница");
    selectActivePage("index");
    
    return true;
}

function saveProject(){
    saveActivePage();
    fs = require('fs');
    
    fs.writeFileSync(window.projectDir+"\\pages.json", JSON.stringify(window.mediaContainer.pages));
    
    fs.writeFileSync(window.projectDir+"\\styles.json", JSON.stringify(window.mediaContainer.styles));
    
    fs.writeFileSync(window.projectDir+"\\scripts.json", JSON.stringify(window.mediaContainer.scripts));
    
    fs.writeFileSync(window.projectDir+"\\fonts.json", JSON.stringify(window.mediaContainer.fonts));
}

function openProject(path){
    fs = require('fs');
    window.mediaContainer.pages = JSON.parse(fs.readFileSync(path+"/pages.json"));
    window.mediaContainer.styles = JSON.parse(fs.readFileSync(path+"/styles.json"));
    window.mediaContainer.scripts = JSON.parse(fs.readFileSync(path+"/scripts.json"));
    window.mediaContainer.fonts = JSON.parse(fs.readFileSync(path+"/fonts.json"));
    
    window.projectDir = path.replace(/\\/g,"/");
    
    enableWorkspace();
    updateCountDataInfo();
    
    CSSClassesManager.updateCSS();
    FontController.loadFonts();
    
    getClassList("#rut-class-list");
    getPageList("#rut-page-list");
    getFontList("#rut-font-list");
    
    selectActivePage(window.mediaContainer.pages[Object.keys(window.mediaContainer.pages)[0]].name);
    
    $("#rut-open-project-input").val("");
}

function clearProjectData(){
    
    window.mediaContainer.pages = {};
    window.mediaContainer.scripts = {};
    window.mediaContainer.styles.classes = {};
    window.mediaContainer.styles.media.classes = {};
    window.mediaContainer.fonts = {};
    window.projectDir = null;
    
    getClassList("#rut-class-list");
    getPageList("#rut-page-list");
    getFontList("#rut-font-list");
    updateCountDataInfo();
}

/*------------------*/
function pulseEffect(selector){
    $(selector).css("animation","0.3s rut-op-active");
    setTimeout(function(){
        $(selector).css("animation","");
    },300);
}

function calcPreviewHeight(){
    $(".rut-preview").css("height",window.innerHeight-28);
}

function getCount(obj){
    if(obj != undefined){
        return Object.keys(obj).length;
    }
}

function updateCountDataInfo(){
    $(".rut-page-count").text(getCount(window.mediaContainer.pages));
    $(".rut-scripts-count").text(getCount(window.mediaContainer.scripts));
    $(".rut-class-count").text(getCount(window.mediaContainer.styles.classes));
    
    if(window.projectDir != undefined){
        var projectName = window.projectDir.split("/");
        $(".rut-project-name").text(projectName[projectName.length-1]);
    }else{
        $(".rut-project-name").text("");
    }
}

function copyFile(files,dest){
    fs = require('fs');
    var fileName = files[0].path.split("\\");
    fileName = fileName[fileName.length-1];
        
    fs.copyFile(files[0].path, window.projectDir+"\\"+dest+"\\"+fileName, (err) => {
        if (err) throw err;
    });
    
    fileName = window.projectDir+"\\"+dest+"\\"+fileName;
    
    return fileName.replace(/\\/g,"/");
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function clearPathes(string){
    return string.replaceAll(window.projectDir,"");
}

function addFont(files,name){
    var path = copyFile(files,"fonts");
    window.mediaContainer.fonts[name] = {};
    window.mediaContainer.fonts[name].name = name;
    window.mediaContainer.fonts[name].path = path;
    
    getFontList("#rut-font-list");
    CSSClassesManager.updateCSS();
    
    return true;
}

function deleteFont(font){
    delete window.mediaContainer.fonts[font];
    window.fontList.splice(window.fontList.indexOf(font),1);
    getFontList("#rut-font-list");
    CSSClassesManager.updateCSS();
}