$(document).on('ready',load);
var listener = "config/app/app.php", directorios = 'scaner.php';
function load(e)
{
    console.log("welcom to events ready");
    var aplication = new  APP();
    e.preventDefault();
    e.stopPropagation();
    
    var protocolo= ($(location).attr('href')).split(":"),url= (protocolo[1]).split("/"),dir="";
    for (i=1 ;i<=2 ;i++){ if (aplication.iswhitespace(url[i])){var obs="";if (i>2){obs=".";}dir+=obs+url[i];}}
    
    $("body").backstretch(["config/img/background.jpg"]);
    $('#protocol').text(""+ protocolo[0]+"");
    $('#locations').text(dir);
    
    loadplugins();
    loaddir();
    
    $('#btnconfig').on('click',btnconfig_cliked);
    $('#btnaddplugin').on('click',btnaddplugin_cliked);
    $('#addproject').on('click',btnfold_cliked);
    $('#sendnewplugin').on('click',sendnewplugin_cliked);
    $('#btnlaunch').on('click',launchpl_cliked);
    $('#sendnewfolder').on('click',sendnewfolder_clicked)
    
//diparadores especiales

    function loadplugins()
    {
         $.post(listener,{ url:'plugin',act:'sel'},responseselplugin,'json');
    }
    function loaddir()
    {
         $.post(directorios,{ url:'dirs',act:'list'},responseseldir,'json');
    }
// eventos de clickeo
    function btnfold_cliked(e) {
        
        e.preventDefault();
        e.stopPropagation();
        
        $('#dirnew-modal-content').modal();
        
    }
    function btnconfig_cliked(e) {
        
        console.log("click");
        
        e.preventDefault();
        e.stopPropagation();
    }
    
    function launchpl_cliked(e) {
        
        e.preventDefault();
        e.stopPropagation();
        
        $('#pluginlanch-modal-content').modal();
    }
    
    function btnaddplugin_cliked (e) {
        $('#form-modal-content').modal();
        return false;
    }
    
    function sendnewplugin_cliked(e) {
        console.log("new plugin send");
        
       if(aplication.iswhitespace($("#plu").val()))
       {if(aplication.iswhitespace($("#url").val()))
            {if(aplication.iswhitespace($("#ico").val()))
                {if(aplication.iswhitespace($("#desc").val()))
                    {   $.post(listener,
                        { url:'plugin',
                         act:'ins',
                         name:$("#plu").val(),
                         dir:$.base64.btoa($("#url").val(),true),
                         icon:$("#ico").val(),
                         desc:$.base64.btoa($("#desc").val(),true)
                         },responsenewplugin,'json');
                    }else{alert("Ingrese una descripcion del plugin"); }}
                      else{alert("Ingrese un icono para plugin");}}
                      else{alert("Ingrese la direcion del plugin");}}
            else{alert("Ingrese el nombre del plugin");}
    }
    function sendnewfolder_clicked(e) {
       if(aplication.iswhitespace($("#name").val()))
       {
            if(aplication.iswhitespace($("#useros").val()))
            {
              if($("input:checked").length<=1)
                {
                     $.post(directorios,{ url:'dirs',act:'new',name:$("#name").val(),
                     user:$("#useros").val(),op: $( "input:checked" ).val(),},responseselnewdir);
                }else{
                 alert('Solo puedes marcar una opcion \n libreia o exepcion ');
                 $("#library").attr('checked',  false);
                 $("#exep").attr('checked', false);
                 }
            }else{
                 alert('Ingrese un usuario del sitema para la carpeta');
                 }
       }else
       {
        alert('Ingrese un nombre para la carpeta');
        } 
    }
//    eventos de respuestas
    function responsenewplugin(data,success,XHR) {
        console.log('send ok response');
        console.log(data);
        if (data.success==="OK"){
            $("#plu").val("");
            $("#url").val("");
            $("#ico").val("");
            $("#desc").val("");
            location.href="index.html";
        }
    }
    
    function responseselplugin(data,success,XHR)
    {
        if(data.success==='OK'){
                 console.log("los plugins estan cargando");
                 setplugins(data);
            }else{
                 console.log("los plugins no cargaron");
            }
    }
    function responseseldir(data,success,XHR) {
         if(data.success==='OK'){
                 console.log("los directorios estan cargando");
                 setdirs(data);
            }else{
                 console.log("los directorios no cargaron");
            }
    }
    function setdirs(data)
    {
         console.log("los directorios estan setiados");
         console.log(data);
          var htmlstr="" , librarys="";
         for(i=0;i<data.data.length;i++)
         {
            name =data.data[i].dir;
            
            if (name.length>10) {
                 name = name.substring(0,7)+'...';
            }
            
            if (data.data[i].library===true)
            {
                librarys+='<a class="aproject" href="/'+data.data[i].dir+'" >'+
                    '<div class="project" >'+
                        '<section class="library" ></section>'+
                        '<h5 class="title" >'+name+'</h5>'+
                    '</div>'+
                 '</a>';
            }else{
            htmlstr+='<a class="aproject" href="/'+data.data[i].dir+'"  >'+
                    '<div class="project" >'+
                        '<section class="icon" ></section>'+
                        '<h5 class="title" >'+name+'</h5>'+
                    '</div>'+
                 '</a>';
                 }
         }
        
         $("#conteinerpj").html(librarys+htmlstr);
    }
    function responseselnewdir(data,success,XHR) {
        location.href="index.html";
    }
    
    function setplugins(data)
    {
         console.log("los plugins estan setiados");
         console.log(data);
         var htmlstr="";
         for(i=0;i<data.data.length;i++)
         {
            if (data.data[i].visible==="true")
            {
                htmlstr+="<a href='"+$.base64.atob(data.data[i].url,true)+"' target=\"_blank\" >"+
                "<div class='plugin' data-id='"+data.data[i].name+"'"+
                " style='background-image: url(\""+"config/plugins/img/"+data.data[i].icon+"\")''></div>"
                +"</a>"; 
            }
         }
         $("#conteinerpl").html(htmlstr);
    }
}
 
