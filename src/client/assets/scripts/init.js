var systemSettings = readSettings();

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
            win.setMinimumSize(1170, 720);
            win.maximize();
            $(".rut-loading").hide();
            setTimeout(function(){
                $("body").fadeIn(900);
            },1)
            
        });
        autologin(systemSettings);
    },2000)

var elBuffer;
var styleBuffer;
var activePage;
var workStatus = "editing";
var projectDir;
var tempName;

var path = process.cwd();

var isLogin = false;
var user = {
    login: null,
    password: null,
    email: null,
    firstName: null,
    secondName: null
}

var cloudProjects;

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
