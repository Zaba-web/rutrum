var win = nw.Window.get();
win.setMinimumSize(1170, 512);

win.resizeTo(1280,768);

var elBuffer;
var styleBuffer;

var mediaContainer = {
    images : [],
    videos : [],
    fonts  : [],
    styles : {
        classes : {
            myClass:{
                name:"myClass",
                properties:{
                    width:"100px;",
                    height:"90px;",
                    border:"1px solid red;"
                }
            }
        },
        media   : {
            classes : {},
        }
    }
};

var fontList = ["Arial","Calibri","Courier","Cursive","Fantasy","Georgia","Helvetica","Impact","Monospace","Open Sans","Times","Verdana"];
