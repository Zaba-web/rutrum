var win = nw.Window.get();
win.setMinimumSize(1170, 512);

win.resizeTo(1366,768);

var mediaContainer = {
    images : [],
    videos : [],
    fonts  : [],
    styles : {
        classes : {},
        id      : {},
        media   : {
            classes : {},
            id      : {}
        }
    }
};

var fontList = ["Arial","Calibri","Courier","Cursive","Fantasy","Georgia","Helvetica","Impact","Monospace","Open Sans","Times","Verdana"];
