
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
    window.operationsList[opCode](el);
}

function loadFonts(){
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

function updateCSS(){
    $("style").html(renderCSS());
    getClassList("#rut-class-list");
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

function pulseEffect(selector){
    $(selector).css("animation","0.3s rut-op-active");
    setTimeout(function(){
        $(selector).css("animation","");
    },300);
}