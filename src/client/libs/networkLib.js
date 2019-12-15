function registerAccount(login,password,password_re,email,name,surname){
    
    $.ajax({
       type: "POST",
       url: "http://api.rutrum.tech/api/Controllers/UserController.php",
       data: {
           login:login,
           password: password,
           password_re: password_re,
           email: email,
           first_name: name,
           second_name: surname,
           code: "register"
        
       },
       dataType: "html",
       success:function(response){
           
           notify(response);
           
       }
    });
    
}

function updateLoginInfo(response){
    
    let userData = response.split(";");
    
    window.user.login = userData[1];
    window.user.password = userData[2];
    window.user.email = userData[3];
    window.user.firstName = userData[4];
    window.user.secondName = userData[5];
    
    window.isLogin = true;
    
    $(".rut-window-wrapper").fadeOut();
    $(".rut-cloud-guest").fadeOut();
    $(".cloud-projects").fadeIn();
    $(".rut-user-exit").fadeIn();
    $(".rut-menu-open-cloud-project").fadeIn();
    
    updateLoginMenu();
    notify("Добро пожаловать, "+window.user.firstName);
    
    $(".rut-user-name").text(window.user.firstName + " " + window.user.secondName);
    getProjectList(window.user.login, window.user.password);
    
}

function loginToAccount(login,password,remember = null){
    
    $.ajax({
       type: "POST",
       url: "http://api.rutrum.tech/api/Controllers/UserController.php",
       data: {
           login:login,
           password: password,
           code: "login"
        
       },
       dataType: "html",
       success:function(response){
           if(response == 0){
               notify("Не удалось войти в аккаунт.");
           }else{
               updateLoginInfo(response);
               if(remember == "remember"){
                   setSettings("remember",1);
                   setSettings("login",login);
                   setSettings("password",password);
               }
           }
       }
    });
    
}

function accountLogout(){
    
    window.user.login = null;
    window.user.password = null;
    window.user.email = null;
    window.user.firstName = null;
    window.user.secondName = null;
    
    setSettings("remember",0);
    setSettings("login","");
    setSettings("password","");
    
    window.isLogin = false;
    

    $(".rut-cloud-guest").fadeIn();
    $(".cloud-projects").fadeOut();
    $(".rut-user-exit").fadeOut();
    
    $(".rut-user-name").text("Вход не выполнен");
}

function archiveProject(){
    
    let projectName = window.projectDir.split("/");
    projectName = projectName[projectName.length-1];
    
    let fs = require('fs');
    
    if(fs.existsSync(window.projectDir+"/"+projectName+".zip")){
        fs.unlinkSync(window.projectDir+"/"+projectName+".zip");
    }
    
    var zipper = require('zip-local');
    
    zipper.zip(window.projectDir+"/", function(error, zipped) {
 
        if(!error) {
            zipped.compress(); 

            zipped.save(window.projectDir+"/"+projectName+".zip", function(error) {
                if(!error) {
                    openCloudLoader();
                }
            });
        }
    });
    
    
}

function uploadProject(){
    if(window.projectDir !== null){
        archiveProject();
    }else{
        notify("Не удалось определить открытый проект");
    }
    
}

function getProjectList(login,password,method = "full"){
    $.ajax({
        url: 'http://api.rutrum.tech/api/Controllers/ProjectLister.php',
        dataType: 'html',
        data:{
            login: login,
            password: password,
        },
        type: 'post',
        success: function(response){
            if(response != 0 && response != 1){
                
                window.cloudProjects = response.split(";");
                if(method == "full"){
                    let clw = new CloudProjectsListWriter(window.cloudProjects,"#rut-cloud-projects-list");
                    clw.write();   
                }else if(method == "min"){
                    let clw = new CloudProjectsListWriterMinified(window.cloudProjects,"#rut-cloud-list-minified");
                    clw.write();   
                }

            }else if(response == 1){
                /* --- */
            }else{
                console.log(response);
                notify("Не удалось проверить подлинность соеденения.");
            }
        }
    });
}

function removeCloudProject(login,password,projectName){
    $.ajax({
        url: 'http://api.rutrum.tech/api/Controllers/ProjectRemover.php',
        dataType: 'html',
        data:{
            login: login,
            password: password,
            projectName: projectName
        },
        type: 'post',
        success: function(response){
            notify(response);
            getProjectList(window.user.login,window.user.password);
        }
    });
}

function unzipCloudProject(projectName, method = 1, path = window.path+'/temp/'){

    let zipper = require('zip-local');
    let fs = require('fs');
    
    zipper.unzip(path+projectName+".zip", function(error, unzipped) {
        
        fs.mkdirSync(path+projectName);
        if(!error) {
            unzipped.save(path+projectName+"/", function() {
                
                fs.unlinkSync(path+projectName+".zip");
                if(method == 1){
                    ProjectClose.close();
                    let pl = new ProjectLoader();
                    pl.open(path+projectName);
                }else if(method == 2){
                    let gui = require('nw.gui');
                    gui.Shell.openItem(path);
                }
                hideLoading();
                
            });
        }else{
            console.log(error);
        }
    });
}

function downloadCloudProject(login,password,project,path = window.path+'/temp/'){
    var http = require('http');
    var fs = require('fs');
    var rimraf = require("rimraf");
    
    showLoading();
    
    // removing old project temponary instance
    if(path == window.path+'/temp/'){
        
        if(!fs.existsSync(window.path+'/temp/')){
            fs.mkdirSync(window.path+'/temp/');
        }
        
        if(fs.existsSync(window.path+'/temp/'+project)){
            rimraf.sync(window.path+'/temp/'+project);
        }

        if(fs.existsSync(window.path+'/temp/'+project+".zip")){
            fs.unlinkSync(window.path+'/temp/'+project+".zip"); // removing old compressed project 
        }
    }
    
    let url = "http://api.rutrum.tech/api/Controllers/ProjectGetter.php?login="+login+"&password="+password+"&project="+project;
    
    var req = http.get(url, function (res) {

        var fileSize = res.headers['content-length'];
        res.setEncoding('binary');
        var a = "";
        res.on('data', function (chunk) {
            a += chunk;
        });
        res.on('end', function() {
            fs.writeFile(path+project+".zip", a, 'binary', function (err) {
                if (err) throw err;
                if(path == window.path+'/temp/'){
                    unzipCloudProject(project);
                }else{
                    unzipCloudProject(project,2,path);
                }
            });
        });
    });
}
