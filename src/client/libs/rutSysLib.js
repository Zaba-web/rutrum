
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
    
    $(where).append("<div class='rut-class-window-item' style='width:35%;' data-prop-name='"+propName+"'><h4 class='rut-h4'><span class='rut-class-remove-prop' data-target='"+propName+"'>[x]</span> "+propTitle+":</h4></div><div class='rut-class-window-item' style='width:65%' data-prop-name='"+propName+"'><input data-prop='"+propName+"' placeholder='"+propHint+"' class='rut-inner-controls rut-new-class-prop-change' type='text'></div>");
}

function getAllCSSProperties(target){
    for(i = 0; i < Object.keys(window.propertiesCollection).length; i++){
      var currentItem = window.propertiesCollection[Object.keys(window.propertiesCollection)[i]];
        
      $(target).append("<option data-hint = '"+currentItem.hint+"' data-val='"+currentItem.value+"' data-name='"+currentItem.name+"'>"+currentItem.name+"</option>");
    } 
}

function saveNewCSSClass(){
    window.mediaContainer.styles.classes[window.temponaryClass.name] = window.temponaryClass;
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
}

function propertyRemove(propName){
    console.log(propName);
    delete window.temponaryClass.properties[propName];
}


/*-------------------*/

function pulseEffect(selector){
    $(selector).css("animation","0.3s rut-op-active");
    setTimeout(function(){
        $(selector).css("animation","");
    },300);
}