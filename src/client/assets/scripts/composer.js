function loadPart(partName,container){
    
    var fs = require('fs');

    var part = fs.readFileSync('components/'+partName+'.rcomp', 'utf8');
    $(container).append(part);
}
