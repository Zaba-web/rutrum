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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function clearPathes(string){
    return string.replaceAll(window.projectDir,"");
}

function resizeWorkspace(event){
    var transformValue = $(".rut-workspace-container").css("transform");
            
    var values = transformValue.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
            
    var a = values[0];
    var b = values[1];

    var scale = Math.sqrt(a*a + b*b);
            
    if(event.originalEvent.wheelDelta > 0) {
        if(scale < 1){
            scale += 0.1;
        }
    }else {
        if(scale > 0.1){
            scale -= 0.1;
        }
    }
            
    $(".rut-workspace-container").css("transform","scale("+scale+")");
}

function notify(text){
    
    $(".rut-notification-text").text(text);
    $(".rut-notification-container").fadeIn(100);
    setTimeout(function(){$(".rut-notification-container").fadeOut(100);},3000)
}