var win = nw.Window.get();
win.setMinimumSize(1170, 512);

win.resizeTo(1300,768);

var elBuffer;
var styleBuffer;
var activePage;
var workStatus = "editing";

var mediaContainer = {
    images : [],
    videos : [],
    fonts  : [],
    scripts:{
        
    },
    pages  : {
        index : {
            name:"Index",
            title:"Главная",
            value:"<h1 class='rut-display rut-dynamic' data-text='true'>Hello world</h1>"
        },
        test : {
            name:"test",
            title:"test",
            value:"<h1 class='rut-display rut-dynamic' data-text='true'>test</h1>"
        }
    },
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
