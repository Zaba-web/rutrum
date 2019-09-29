var propList = ["width","height","margin","margin-top","margin-bottom","margin-left","margin-right","padding","padding-top","padding-bottom","padding-right","padding-left","background-color","background-image","background-repeat","attr-title","attr-src","background-position","color","font-size","font-family"];

class Property{
    static getInstance(el, name){

        if($(el).hasClass(findSpecialClass(el,"cols")) && name == "width"){
            return new ColWidth();
        }else if(name == "background-image"){
            return new BgImage();
        }else if(name.includes("attr-")){
            return new Attr();
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
                $("#rut-elem-prop-width").prop("readonly",true);
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
        $(el).css(name,"url("+val.replace(/\\/g,'/')+")");
        console.log("alive");
    }
}

class Attr{
    get(el,name){
        var realName = name.slice(5);
        $("#rut-elem-prop-"+name).val($(el).attr(realName));
    }
    
    set(el,name,val){
        var realName = name.slice(5);
        $(el).attr(realName,val);
    }
}