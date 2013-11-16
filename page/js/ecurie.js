if (window.jxshell){
	if(window.jxshell.eCuRie){
		window.eCuRie=window.jxshell.eCuRie;
		return;
	}
}

// Esto es para evitar que se pueda arrastrar desde escritorio ...
window.ondrop = function (e){e.preventDefault();e.stopPropagation();}
window.eCuRie=window.eCuRie || {};

if(!window.yetClosed){
	window.addEventListener('close', function(){
		window.yetClosed=true;
		window.eCuRie.finalizarSesion();
	});
}

window.addEventListener('xapp-ready', function(){
	window.jxshell.eCuRie = window.eCuRie;
	if(!window.eCuRie.phpExecuter){
		window.jxshell.loadLibrary('jxshell.php5.5', function(lib){
			window.eCuRie.phpExecuter = lib;
		}, function(error){
			console.log('Error al cargar la librería de impresión.');
			console.log(error);
		});
	}
});





window.eCuRie.alert = function(msg){
	var myObject = $("<div style='margin:auto;width:400px;-webkit-box-shadow:2px 2px 2px rgb(192,192,192);border:solid 1px rgb(240,240,240)"+
			";border-radius:2px;background:white;' align='center'></div>");

	var divT = $("<div style='margin:20px;'></div>");
	var ot = $("<div style='height:5px;border-bottom:solid 1px rgb(230,230,230);'></div>");
	var text = $("<div></div>");
	text.text(msg);



	divT.append($("<div style='height:14px;'></div>"));
	divT.append(text);
	divT.append($("<div style='height:8px;'></div>"));
	divT.append(ot);
	divT.append($("<div style='height:9px;'></div>"));
	var o = $("<div align='right' ><button>Aceptar</button></div>");



	divT.append(o);
	myObject.append(divT);

	var options = {
		"style":{
			"background":"transparent"
		},
		"closeOnClick":true,
		"object":myObject
	};
	var f = new window.eCuRie.colorbox(options);

	o.click(function(){
		f.close();
	});
};


window.eCuRie.opciones = {};
window.eCuRie.opciones.opciones =["clientes.html", "Productos.html", "Facturas.html", "backup.html", "usuarios.html", "inventario.html"];
window.eCuRie.opciones.OPCIONESDISPONIBLES ={
	"inicio":function(){
		$("#options-option").hide(800);
		$('#options-div').show(800);
	}
};

window.eCuRie.opciones.ULTIMAOPCION=[];
window.eCuRie.opciones.ULTIMAOPCION.push(window.eCuRie.opciones.OPCIONESDISPONIBLES.inicio);


window.eCuRie.opciones.procesar = function(object){
	window.eCuRie.opciones.ULTIMAOPCION.push(function(){});
	$('#options-div').hide(800);
	var index = object.attr("index");
	var fs = require("fs");
	var url=require("url");
	var http=require("http");
	var op=$("#options-option");

	uri=url.resolve(window.location, window.eCuRie.opciones.opciones[parseInt(index)]);
	urix=url.parse(uri);


	function convertUriToLocalPath(pathname)
	{
	    var returnString = pathname;
	    var path=require("path");
	    //try to find the file uri prefix, if there strip it off
	    if(pathname.search("file://") != -1 || pathname.search("FILE://") != -1)
	    {
	    	returnString = pathname.substring(7, pathname.length);
	    	if(returnString.indexOf(":")>-1){
	    		returnString=returnString.substring(1);
	    	}

	    }

	    //now make all slashes the same
	    if(path.sep === '\\')    //replace all '/' with '\\'
	    {   returnString = returnString.replace(/\//g, '\\');   }
	    else    //replace all '\\' with '/'
	    {   returnString = returnString.replace(/\\/g, '/');    }

	    return returnString;
	}


	if(urix.host!=""){
		
		var o=http.get(urix, function(e){
			var response=[];
			e.on('data', function(chunk){
				response.push(chunk);
			});
			e.on('end', function(){
				op.html(response.join(""));
				op.show(500);
			});

		});
	}

	else{
		uri=convertUriToLocalPath(uri);
		var h=fs.readFileSync(uri, "utf-8");
		op.html(h);
		op.show(500);	
	}
	//alert(jxshell.CONFIG.path.substring(8)+"/usuarios.html");
	/*
	var h=fs.readFileSync(jxshell.CONFIG.path.substring(8)+"/"+window.eCuRie.opciones.opciones[parseInt(index)], "utf-8");
	op.html(h);
	
	op.show(500);*/
};