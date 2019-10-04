
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

function rgbToHex(rgb) {
  var a = rgb.split("(")[1].split(")")[0].split(",");
  return "#" + a.map(function(x) {
    x = parseInt(x).toString(16);
    return (x.length == 1) ? "0"+x : x;
  }).join("");
}