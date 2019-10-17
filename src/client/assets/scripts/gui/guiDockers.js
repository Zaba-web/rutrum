$(document).ready(function(){
    
    $(".rut-prop-group-expander").click(function(){
        var group = $(this).data("group-id");
        $("#"+group).slideToggle(200);
    })
    
    $(".rut-dockers-item").on("click",function(){
        var containerId = $(this).data("container");
        if($("#"+containerId).css("display") == "none"){ 
            $(".rut-dockers-item-inner-container").hide();
            $("#"+containerId).show(100);
            $(".rut-dockets-item-active").removeClass("rut-dockets-item-active");
            $(this).addClass("rut-dockets-item-active");
        }
    });
    
    $(".rut-close-docker-pannel").click(function(){
        $(".rut-dockers-item-inner-container").hide();
        $(".rut-dockets-item-active").removeClass("rut-dockets-item-active");
    });
    
});