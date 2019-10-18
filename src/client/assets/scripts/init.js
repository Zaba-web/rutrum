var win = nw.Window.get();
win.setMinimumSize(1170, 512);

win.resizeTo(1300,768);

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
