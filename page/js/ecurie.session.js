window.eCuRie=window.eCuRie || {};
window.eCuRie.finalizarSesion = function(){
	var request = 'finalizarSesion';
	var orequest = new jxshell.request(request);
	orequest.onError(function(ex){
		alert(ex.Message);
	});
	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
	var s;
	s=new Date();
	while(new Date() - s<1000){
		// pass
	}
};


// SESSION INFO ...
window.eCuRie.SESSIONINFO = {};
window.eCuRie.SESSIONINFO.iniciarSesion= function(onSuccess, onError){
	// Obtiene los datos de sesión ...
	var orequestx = new jxshell.request("iniciarSesion");
	//orequestx.id+='3';
	orequestx.onSuccess(function(data){
		window.eCuRie.SESSIONINFO.sesion = data.sesion;
		window.eCuRie.SESSIONINFO.usuario = data.usuario;
		if(onSuccess){
			onSuccess(data);
		}

	});

	if(onError){
		orequestx.onError(onError);
	}
	try{
		orequestx.send();
	}
	catch(e){
		console.log(e);
	}
};

window.eCuRie.opciones.IRAULTIMAOPCION = function(){
	
	if(window.eCuRie.opciones.ULTIMAOPCION.length>1){
		window.eCuRie.opciones.ULTIMAOPCION[window.eCuRie.opciones.ULTIMAOPCION.length-2]();
		window.eCuRie.opciones.ULTIMAOPCION.pop();
	}
};