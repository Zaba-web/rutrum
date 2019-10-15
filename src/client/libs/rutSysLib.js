
var specialClasses = { // used to change the bootstrap elements values
    cols:["col","col-1","col-2","col-3","col-4","col-5","col-6","col-7","col-8","col-9","col-10","col-11","col-12"],
    valign:["align-items-start","align-items-center","align-items-end"],
    halign:["justify-content-start","justify-content-center","justify-content-end","justify-content-around","justify-content-between"]
}

function getAllProp(el){
    for(i = 0; i < propList.length; i++ ){
        var prop = Property.getInstance(el,propList[i]);
        prop.get(el,propList[i]);
    }
}

function clearAllProp(){
    $(".rut-elem-prop-change").val("");
    $(".rut-elem-prop-change").removeAttr("readonly");
    $("#rut-elem-prop-col-spec").html("");
}

function setProp(el){
    saveActivePage();
    var value = $(el).val();
    var prop = Property.getInstance(el, getPurePropName($(el).attr("id")));
    var activeTool = window.toolList.tool_pointer.selected;
    prop.set(activeTool,getPurePropName($(el).attr("id")),value);
    updateAllProps(window.toolList.tool_pointer.selected);
}

function changeProp(el,db){
    var oldData = $(el).val();
    var newData = $(el).text();
    
    window.specialClasses[db].forEach(function(item){
        $(window.toolList.tool_pointer.selected).removeClass(item);
    });
    
    $(window.toolList.tool_pointer.selected).addClass(newData);
    console.log("Old value: "+oldData +"; New value: "+ newData);
    
    updateAllProps(window.toolList.tool_pointer.selected);
}

function getPurePropName(string){
    return string.slice(14);
}

function findSpecialClass(el,cols){
    var presentClass = false;
    window.specialClasses[cols].forEach(function(cssClass){
        if($(el).hasClass(cssClass)){
            presentClass = cssClass;   
        }
    });
    return presentClass;
}

function updateAllProps(el){
    clearAllProp();
    getAllProp(el);
}

function doElementOperation(el,opCode){
    saveActivePage();
    window.operationsList[opCode](el);
}

function loadFonts(){
    $("#rut-elem-prop-font-family").html("");
    $("#rut-input-font-family-link").html("");
    
    for(i = 0; i<window.fontList.length;i++){
        $("#rut-elem-prop-font-family").append("<option value='"+window.fontList[i]+"'>"+window.fontList[i]+"</option>");
        
        $("#rut-input-font-family-link").append("<option value='"+window.fontList[i]+"'>"+window.fontList[i]+"</option>");
        
    }
}

/*--------*/

function addTempClassProp(el){
    var propValue = $(el).val();
    var propName = $(el).data("prop");
    var endl = "";
    
    if(!propValue.includes(";")){
        endl = ";";
    }
    
    window.temponaryClass.properties[propName] = propValue + endl;
    console.log(window.temponaryClass);
}

function getPropertyFromList(from,where){
    var propTitle = $(from).data("name");
    var propName = $(from).data("val");
    var propHint = $(from).data("hint");
    
    $(where).append("<div class='rut-class-window-item' style='width:60%;' data-prop-name='"+propName+"'><h4 class='rut-h4'><span class='rut-class-remove-prop' data-target='"+propName+"'>[x]</span> "+propTitle+":</h4></div><div class='rut-class-window-item' style='width:40%' data-prop-name='"+propName+"'><input data-prop='"+propName+"' placeholder='"+propHint+"' title='"+propHint+"' class='rut-inner-controls rut-new-class-prop-change' type='text'></div>");
}

function getPropertyFromClass(){
    $(".rut-class-properties-container").html("");
    for(key in window.temponaryClass.properties){
        if(key.includes("-")){
            key = key.split("-");
            key = key.join("_");
        }

        
        $(".rut-class-properties-container").append("<div class='rut-class-window-item' style='width:60%;' data-prop-name='"+window.propertiesCollection[key].value+"'><h4 class='rut-h4'><span class='rut-class-remove-prop' data-target='"+window.propertiesCollection[key].value+"'>[x]</span> "+window.propertiesCollection[key].name+":</h4></div><div class='rut-class-window-item' style='width:40%' data-prop-name='"+window.propertiesCollection[key].value+"'><input data-prop='"+window.propertiesCollection[key].value+"' value = '"+window.temponaryClass.properties[window.propertiesCollection[key].value]+"' placeholder='"+window.propertiesCollection[key].hint+"' class='rut-inner-controls rut-new-class-prop-change' type='text'></div>");
        
    }
}

function getAllCSSProperties(target){
    for(i = 0; i < Object.keys(window.propertiesCollection).length; i++){
      var currentItem = window.propertiesCollection[Object.keys(window.propertiesCollection)[i]];
        
      $(target).append("<option data-hint = '"+currentItem.hint+"' data-val='"+currentItem.value+"' data-name='"+currentItem.name+"' title='"+currentItem.value+"'>"+currentItem.name+"</option>");
    } 
}

function saveNewCSSClass(){
    for(key in window.temponaryClass.properties){
        if (window.temponaryClass.properties[key].includes("url")){
            if(!window.temponaryClass.properties[key].includes(window.projectDir)){
                var tmp = window.temponaryClass.properties[key].split("(");
                tmp[1] = window.projectDir+"/img/"+tmp[1];
                window.temponaryClass.properties[key] = tmp.join("(");
            }
        }
    }
    window.temponaryClass.name += $("#rut-new-class-pseudo").val();
    window.mediaContainer.styles.classes[window.temponaryClass.name] = jQuery.extend(true, {}, window.temponaryClass);

    updateCSS();
    return true;
}

function renderCSS(){
    var style = " ";
    var count = Object.keys(window.mediaContainer.styles.classes).length;
    for(var i = 0; i<count; i++){
        var currentItemName = Object.keys(window.mediaContainer.styles.classes)[i];
        var currentItemPropCount = Object.keys(window.mediaContainer.styles.classes[currentItemName].properties).length;
        style += "."+currentItemName+"{";
        for(var j = 0; j<currentItemPropCount; j++){
            var currentPropertyName = Object.keys(window.mediaContainer.styles.classes[currentItemName].properties)[j];
            var currentPropertyValue = window.mediaContainer.styles.classes[currentItemName].properties[currentPropertyName];
            style += currentPropertyName + ":" + currentPropertyValue;
        }
        style += "}";
        
    }
    console.log(style);
    return style;
}

function includeFonts(){
    var fontStyle = "";
    for(key in mediaContainer.fonts){
        fontStyle += "@font-face{font-family:"+key+";src:url("+mediaContainer.fonts[key].path+")}";
        if(window.fontList.indexOf(key) === -1){
            window.fontList.push(key);
        }
    }
    return fontStyle;
}

function updateCSS(){
    var css = renderCSS() + "\n" + includeFonts();
    $("style").html(css);
    getClassList("#rut-class-list");
    loadFonts();
}

function propertyRemove(propName){
    console.log(propName);
    delete window.temponaryClass.properties[propName];
}

function getClassList(target){
    $(target).html("");
    for(key in window.mediaContainer.styles.classes){
        $(target).append("<li class='rut-class-list-item' id='"+window.mediaContainer.styles.classes[key].name+"'>"+window.mediaContainer.styles.classes[key].name+"<div class='rut-class-list-item-operation-container'><img src='assets/images/classDelete.svg' title='Удалить класс' data-class-name='"+window.mediaContainer.styles.classes[key].name+"' class='rut-class-list-item-delete' style='margin-right:10px'><img src='assets/images/classEdit.svg' title='Изменить класс' data-class-name='"+window.mediaContainer.styles.classes[key].name+"' class='rut-class-list-item-edit'></div></li>");
    }
}

function getClassListForElements(target){
    for(key in window.mediaContainer.styles.classes)
    $(target).append("<option value='"+window.mediaContainer.styles.classes[key].name+"'>"+window.mediaContainer.styles.classes[key].name+"</option>");
}

function removeCSSClass(data){
    delete window.mediaContainer.styles.classes[data];
    $("#"+data).remove();
}

function clearTempClass(){
    window.temponaryClass.name = "";
    window.temponaryClass.properties =  "";
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
    
    updateCSS();
    loadFonts();
    
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
    updateCSS();
    
    return true;
}

function deleteFont(font){
    delete window.mediaContainer.fonts[font];
    window.fontList.splice(window.fontList.indexOf(font),1);
    getFontList("#rut-font-list");
    updateCSS();
}