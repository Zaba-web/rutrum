// list of supported css properties
var propList = ["width","height","margin","margin-top","margin-bottom","margin-left","margin-right","padding","padding-top","padding-bottom","padding-right","padding-left","background-color","background-image","background-repeat","attr-title","attr-src","background-position","color","font-size","font-family","font-weight","text-align","position","left","right","top","bottom","float","attr-id","valign","halign","attr-href","attr-target","border-color","border-width","border-style","box-sizing","border-radius","background-size"];

class Property{ // main class for inline styling
    static getInstance(el, name){

        if($(el).hasClass(findSpecialClass(el,"cols")) && name == "width"){
            return new ColWidth(); // bootstrap column uses different class for width
        }else if(name == "background-image"){
            return new BgImage(); // background-image also uses different class because it has specific syntaxis
        }else if(name.includes("attr-")){
            return new Attr(); // for html atributes
        }else if(name == "valign"){
            return new BootstrapVerticalAlign();
        }else if(name == "halign"){
            return new BootstrapHorizontalAlign();
        }else{
            return new Property();
        }
        
    }
    
    get(el,name){
        $("#rut-elem-prop-"+name).val($(el).css(name));
    }
    
    set(el,name,val){
        $(el).css(name,val);
        console.log("Propetry.set : " + name +"; " + val);
    }
}

class ColWidth extends Property{
        get(el){
            $("#rut-elem-prop-width").val($(el).css("width"));
            var specialClass = findSpecialClass(el,"cols");
            if(specialClass !== false){
                $("#rut-elem-prop-width").prop("readonly",true); // col can't be resized using width property
                $("#rut-elem-prop-col-spec").fadeIn(200);
                window.specialClasses.cols.forEach(function(item){
                   if(specialClass == item){
                       $("#rut-elem-prop-col-spec").append("<option selected value='"+specialClass+"'>"+item+"</option>");
                   }else{
                       $("#rut-elem-prop-col-spec").append("<option value='"+specialClass+"'>"+item+"</option>");
                   }
                });
            }
        }
    
        set(el,val){
            $(el).css("width",val);
        }
}

class BgImage extends Property{
    set(el,name,val){
        $(el).css(name,"url("+val.replace(/\\/g,'/')+")"); // replacing \ to /
        console.log("alive");
    }
}

class BootstrapVerticalAlign extends Property{ // vertical alignment in bootstrap rows
    get(el,name){
        for(let i = 0; i<window.specialClasses.valign.length; i++){
            if($(el).hasClass(window.specialClasses.valign[i])){
                $("#rut-elem-prop-valign").val(window.specialClasses.valign[i]);
            }
        }
    }
    set(el,name,val){
        $(el).removeClass("align-items-start align-items-center align-items-end").addClass(val);
    }
}

class BootstrapHorizontalAlign extends Property{
    get(el,name){
        for(let i = 0; i<window.specialClasses.halign.length; i++){
            if($(el).hasClass(window.specialClasses.halign[i])){
                $("#rut-elem-prop-halign").val(window.specialClasses.halign[i]);
            }
        }
    }
    set(el,name,val){
        $(el).removeClass("justify-content-start justify-content-center justify-content-end justify-content-around justify-content-between").addClass(val);
    }
}

class Attr{ // main class for html attributes
    
    get(el,name){
        var realName = name.slice(5);
        $("#rut-elem-prop-"+name).val($(el).attr(realName));
    }
    
    set(el,name,val){
        var realName = name.slice(5);
        $(el).attr(realName,val);
    }
}