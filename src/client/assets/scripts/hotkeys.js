$(document).ready(function(){
    
    var keyState = false;
    
    $(document).keydown(function(e){

           
        let key = e.keyCode;
        let ctrl = e.ctrlKey;
        let shift = e.shiftKey;
        let alt = e.altKey;
        
        let activeInput = false;
        if($("[contenteditable='true']").length>0 || $("input:focus").length>0){
            activeInput = true;
        }
        
        if(!keyState){
            
            if(ctrl && key == 79){
                $("#rut-open-project-input")[0].click();
            }

            if(ctrl && key == 78){
                $(".rut-menu-new-project")[0].click();
            }
            
            if(window.projectDir != null){
                
                /*Project pannel*/
                
                if(key == 112){
                    $(".rut-create-page-trigger")[0].click();
                }
                
                if(key == 113){
                    $(".rut-create-class-trigger")[0].click();
                }
                
                if(key == 114){
                    $(".rut-add-new-script-trigger")[0].click();
                }
                
                if(key == 115){
                    $(".rut-add-font-trigger")[0].click();
                }
                
                if(key == 116){
                    $(".rut-add-media-trigger")[0].click();
                }
                
                if(key == 117){
                    $(".rut-gui-switch")[0].click();
                }
                
                /*File*/
                
                if(ctrl && key == 83){
                    $("#rut-menu-save-project")[0].click();
                }
                
                if(ctrl && key == 87){
                    $("#rut-menu-close-project")[0].click();
                }
                
                if(ctrl && shift && key == 69){
                    $("#rut-menu-export-project")[0].click();
                }
                
                /*Operations*/
                
                if(key == 46 && !activeInput){
                    $(".rut-item-operation[data-op='delete']")[0].click();
                }
                    if(key == 46 && ctrl){
                        $(".rut-item-operation[data-op='delete']")[0].click();
                    }
                
                if(ctrl && key == 84){
                    $(".rut-item-operation[data-op='edit']")[0].click();
                }
                
                if(ctrl && alt && key == 67){
                    $(".rut-item-operation[data-op='copyEl']")[0].click();
                }
                
                if(ctrl && alt && key == 86){
                    $(".rut-item-operation[data-op='pasteEl']")[0].click();
                }
                
                if(ctrl && shift && key == 67){
                    $(".rut-item-operation[data-op='copyStyle']")[0].click();
                }
                
                if(ctrl && shift && key == 86){
                    $(".rut-item-operation[data-op='pasteStyle']")[0].click();
                }
                
                if(ctrl && alt && shift && key == 67){
                    $(".rut-item-operation[data-op='clearStyle']")[0].click();
                }
                
                if(ctrl && alt && shift && key == 67){
                    $(".rut-item-operation[data-op='clearStyle']")[0].click();
                }
                
                if(ctrl && key == 68){
                    $(".rut-elem-class")[0].click();
                }
                
                if(key == 38 && !activeInput){
                    $(".rut-item-operation[data-op='domElementUp']")[0].click();
                }
                    if(key == 38 && ctrl){
                        $(".rut-item-operation[data-op='domElementUp']")[0].click();
                    }
                
                if(key == 40 && !activeInput){
                    $(".rut-item-operation[data-op='domElementDown']")[0].click();
                }
                    if(key == 40 && ctrl){
                        $(".rut-item-operation[data-op='domElementDown']")[0].click();
                    }
                
                /* Tools */
                
                if(key == 80 && !activeInput){
                    $("#rut-tool-pointer")[0].click();
                }
                
                if(key == 73 && !activeInput){
                    $("#rut-tool-img")[0].click();
                }
                
                if(key == 65 && !activeInput){
                    $("#rut-tool-a")[0].click();
                }
                
                if(key == 66 && !activeInput){
                    $("#rut-tool-block")[0].click();
                }
                
                if(key == 88 && !activeInput){
                    $("#rut-tool-text")[0].click();
                }
                
                if(key == 76 && !activeInput){
                    $("#rut-tool-list")[0].click();
                }
                
                if(key == 84 && !activeInput){
                    $("#rut-tool-table")[0].click();
                }
                
                if(key == 70 && !activeInput){
                    $("#rut-tool-forms")[0].click();
                }
                
                /*Preview pannel*/
                
                if(ctrl && key == 80){
                    $(".rut-display-mode-preview")[0].click();
                }
                
                if(ctrl && key == 69){
                    $(".rut-display-mode-editing")[0].click();
                }
                
                /*Dockers*/
                
                if(alt && key == 80){
                    $("[data-container='rut-dockers-item-inner-container-properties']")[0].click();
                }
                
                if(alt && key == 86){
                    $("[data-container='rut-dockers-item-inner-container-viewer']")[0].click();
                }
                
                logger.log(key);
                
            }
            
            keyState = true;
            
            
        }
        
        setTimeout(function(){
            keyState = false;
        },40);
        
    });
    
});