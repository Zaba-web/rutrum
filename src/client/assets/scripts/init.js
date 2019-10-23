function centerWindow(win){
    setTimeout(function(){
        win.setPosition("center");
    },10);
}

var win = nw.Window.get();

win.resizeTo(200,200);

setTimeout(function(){
    centerWindow(win);
},200);

setTimeout(
    function(){
        $("body").fadeOut(100,function(){
            win.setMinimumSize(1170, 512);
            win.resizeTo(window.screen.width-1,window.screen.height);
            $(".rut-loading").hide();
            setTimeout(function(){
                $("body").fadeIn(900);
            },1)
            
        });

    },2000)

var elBuffer;
var styleBuffer;
var activePage;
var workStatus = "editing";
var projectDir;

var projectMaintenance = {};

var mediaContainer = {
    scripts:{
        
    },
    fonts:{
        
    },
    pages  : {

    },
    styles : {
        classes : {

        },
        media   : {
            
        }
    }
};

var fontList = ["Arial","Calibri","Courier","Cursive","Fantasy","Georgia","Helvetica","Impact","Monospace","Open Sans","Times","Verdana"];
