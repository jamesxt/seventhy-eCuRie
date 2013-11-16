window.eCuRie=window.eCuRie || {};
window.eCuRie.usuarios = {};



// Devuelve unos datos con el nombre, codigo, y id de sesión ...
window.eCuRie.usuarios.iniciarSesion = function(nombre, contraseña, loginerror, loginok){
	var rq = window.eCuRie.usuarios.iniciarSesion.req;
	if(rq){
		try{
			rq.abort();
		}
		catch(e){
			console.error(e.stack);
		}
	}


	var request = 'usuarios?'+ JSON.stringify([nombre,contraseña]);
	var orequestx = new jxshell.request(request);
	window.eCuRie.usuarios.iniciarSesion.req = orequestx;
	orequestx.onSuccess(function(data){
		if(data.ok){
			loginok(data);
		}
		else{
			loginerror(data.error);
		}
	});
	orequestx.onError(function(data){
		loginerror(data);
	});

	// Envía la solicitud ... 
	try{
		orequestx.send();
	}
	catch(e){
		console.log(e);
	}
};

window.eCuRie.usuarios.cargarUsuarios = function(first, datareceived, xerror){
	var ya=false;
	var orequest= new jxshell.request("queryusuarios?20");
	// Va tomando de a 20 ...
	orequest.onSuccess(function (data){
		if (!ya){
			ya=true;
			first(data);
		}
		else{
			datareceived(data);
		}
	});

	orequest.onError(function(error){
		xerror(error);
	});
	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
		

};

window.eCuRie.usuarios.guardarUsuario = function(usuario, sucess, error){
	var orequest = new jxshell.request("saveusuarios?"+JSON.stringify(usuario));
	orequest.onSuccess(sucess);
	orequest.onError(error);

	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
};

window.eCuRie.usuarios.modificarUsuario = function(usuario, sucess, error){
	var orequest = new jxshell.request("editusuarios?"+JSON.stringify(usuario));
	orequest.onSuccess(sucess);
	orequest.onError(error);

	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
};



window.eCuRie.usuarios.INDEXInit=function(){

	window.eCuRie.usuarios.INDEXIniciarSesion=function(){
		var nombre, contraseña;
		nombre  = $("#login-usuario").val();
		contraseña  = $("#login-contraseña").val();

		eCuRie.usuarios.iniciarSesion(nombre, contraseña, function(error){
			// Obtiene el mensaje de error
			var msg=error.Message;
			$("#login-info").text(msg);
			$("#login-loading").hide();
			$("#login-info").show(500);
		},
		function(data){
			window.eCuRie.usuarios.info = {
				"nombre":data.nombreusuario,
				"idusuario":data.idusuario,
				"idsesion":data.idsesion
			};
			$("#login-loading").hide();
			window.location = 'bienvenido.html';
		})

	};

	$("#login-aceptar").click(function(){
		$("#login-info").hide();
		$("#login-loading").show(500);
		try{
			window.eCuRie.usuarios.INDEXIniciarSesion();
		}
		catch(e){
			alert(e);
		}
		//$("#login-info").show(500);
	});
};





window.eCuRie.opciones.USUARIOS= {};
window.eCuRie.opciones.USUARIOS.init=function(){


	// Mostrar un contenedor para seleccionar una imagen ...
	if(window.eCuRie.SESSIONINFO.usuario.administrador){
		$("#options-option-usuario-text").text("Usuario con cuenta de administrador, puede modificar los datos de todos los usuarios.");	
	}
	else{
		$("#options-option-usuario-text").text("Usuario con cuenta limitada, solo puede modificar los datos de todos de su cuenta.");		
	}
	
	var img = $("#options-option-usuarios-image-imgd").get(0);
	img.ondrop = function(e){
		var files =e.dataTransfer.files;
		var reader = new FileReader();
		if (files.length==0){
			return;
		}

		var fe = files[0];
		//alert(fe.type);
		if (!fe.type.match('image.*')) {
			$("#options-option-usuarios-image-error").text("El archivo seleccionado no es una imagen.");
		    $("#options-option-usuarios-image-error").show(500);
		    $("#options-option-usuarios-image-progress").hide(500);
			return ;
	    }
		reader.onerror = function(evt){
			var er;
			switch(evt.target.error.code) {
		      case evt.target.error.NOT_FOUND_ERR:
		        er = 'No se encontró el archivo.';
		        break;
		      case evt.target.error.NOT_READABLE_ERR:
		        er = 'El archivo está siendo utilizado por otra aplicación.';
		        break;
		      case evt.target.error.ABORT_ERR:
		        break; // noop
		      default:
		       	er = 'No se pudo leer el archivo. Intente nuevamente.';
		    };

		    $("#options-option-usuarios-image-error").text(er);
		    $("#options-option-usuarios-image-error").show(500);
		    $("#options-option-usuarios-image-progress").hide(500);

		};
		reader.onprogress = function(e){
			var p = Math.round((e.loaded/e.total)*100);
			$("#options-option-usuarios-image-progress").css("width", p.toString()+"%");
		};
		reader.onloadstart = function(){
			$("#options-option-usuarios-image-error").hide(500);
			$("#options-option-usuarios-image-progress").css("width", "0");
		};
		reader.onload = function(e){
			$("#options-option-usuarios-image-error").hide(500);
			$("#options-option-usuarios-image-progress").hide(500);

			//alert(e.target.result);
			$("#options-option-usuarios-image-img").attr(("src"), e.target.result);
		};

		reader.readAsDataURL(fe);

	};
	
	var o = $("#options-option-usuarios-image");
	//var oUSUARIOS2;
	window.eCuRie.opciones.USUARIOS.cambiarImagen = function(onSuccess, onError){
		/*var o;
		if(!oUSUARIOS2){
			oUSUARIOS2 = oUSUARIOS.clone();
			
		}
		oUSUARIOS.remove();
		o=oUSUARIOS2.clone();
		*/

		var options = {
			"style":{
				"background":"transparent"
			},
			"closeOnClick":true,
			"object":o
		};
		var f = new window.eCuRie.colorbox(options);
		$("#options-option-usuarios-image-img").attr("src", $("#options-option-usuario-new-image").attr("src"));
		$("#options-option-usuarios-image-aceptar").click(function(){
			$("#options-option-usuario-new-image").attr("src", $("#options-option-usuarios-image-img").attr("src"));
			f.close();
		});
		$("#options-option-usuarios-image-cancelar").click(function(){
			f.close();
		});

		o.show();
	};

	$("#options-option-usuario-new-data-cambiarimagen").click(function(){
		window.eCuRie.opciones.USUARIOS.cambiarImagen();
	});
	//window.eCuRie.SESSIONINFO.iniciarSesion();
	var options = {
		"id":"options-option-usuarios-table",
		"width":"100%",
		"min-width":"400px",
		columns:[
			{"text":"", "width":"8%", renderFunction : function(data, th){
				var f= $('<div align="center"></div>');
				var im = $('<img src = "images/user.png" style="width:90%;max-width:36px;" />');
				f.append(im);
				if(data){
					im.attr("src", data);
				}
				th.append(f);
			}},
			{"text":"Nombre de usuario", "width":"35%"},
			{"text":"Creado por", "width":"20%"},
			{"text":"Creado", "width":"19%"},
			{"text":"Ad.", "title":"Administrador", "width":"4%", renderFunction:function(data, th){
				var f = $("<input type='checkbox' class='options-option-usuario-adm' disabled='disabled'/>");
				if(data){
					f.attr("checked", "true");
					f.get(0).checked=true;
				}
				else{
					f.removeAttr("checked");
					f.get(0).checked=false;	
				}
				var div = $("<div align='center'></div>");
				div.append(f);
				th.append(div);
			}},
			{"text":"", "width":"14%", renderFunction:function(data, th){
				
				var o= $('<div align="center"></div>');
				var i = $('<button>Imagen</button>');
				o.append(i);
				i.click(function(){

					setTimeout(function(){
						if(!window.eCuRie.SESSIONINFO.usuario.administrador){
							var ind = window.eCuRie.opciones.USUARIOS.grid.indexSelected;
							if(window.eCuRie.opciones.USUARIOS.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
								return window.eCuRie.alert("Su cuenta es limitada. No puede modificar los datos de los demás usuarios.");					
							}
						}
						if(window.eCuRie.opciones.USUARIOS.editing){
							return;
						}
						$(".options-option-edit").click();
						window.eCuRie.opciones.USUARIOS.cambiarImagen();
					}, 300);
				});
				th.append(o);
			}}
		]
	};
	var fa = new window.jxshell.grid("options-option-usuarios-table", options);

	try{
		window.eCuRie.opciones.USUARIOS.editing=false;
		var yu = function(obj, index){

			if(window.eCuRie.opciones.USUARIOS.editing){
				return ;
			}

			window.eCuRie.opciones.USUARIOS.lastSelected = [obj,index];
			$("#options-option-usuario-new").show(600);
			var o = obj.find("td div img");
			$("#options-option-usuario-new-image").attr("src", o.attr("src"));

			// Llenar los datos del usuario ...
			var info = fa.getRowData(index);
			var o = $("#options-option-usuario-new-data h1");
			o.text(info[1]);
			$("#options-option-usuario-new-data-name").val(info[1]);
			$("#options-option-usuario-new-data-passwordc").val(info[7]);

			if(info[4]){
				$("#options-option-usuario-new-data-adm").text("Usuario con cuenta de administrador");
				$("#options-option-usuario-new-data-admc").attr("checked", "true");
				$("#options-option-usuario-new-data-admc").get(0).checked=true;
			}
			else{
				$("#options-option-usuario-new-data-adm").text("Usuario con cuenta limitada.");	
				$("#options-option-usuario-new-data-admc").removeAttr("checked");
				$("#options-option-usuario-new-data-admc").get(0).checked=false;
			}

			$("#options-option-usuario-new-data-usuario").text(info[2]||"");
			$("#options-option-usuario-new-data-fecha").text(info[3]||"");
		};

		window.eCuRie.opciones.USUARIOS.onRowSelected =(yu);
		fa.onRowSelected(yu);
	}
	catch(e){
		alert(e);
	}
	//f.appendTo(("options-option-usuarios-table-div"));
	window.eCuRie.opciones.USUARIOS.grid = fa;



	var g;
	var f = function(data){
		var clear = true;
		if(g){
			clear = false;
		}
		g = window.eCuRie.opciones.USUARIOS.grid;
		try{
			if(clear){
				g.clearData();
			}
			g.addData(data);
		}
		catch(e){
			alert(e);
		}
		
	};
	window.eCuRie.usuarios.cargarUsuarios(f, f, function(error){
		//alert(error.Message);
	});

	var fg = function(){
		$("#options-option-usuario-new").show(500);		
		$(".options-option-save-td,.options-option-undo-td").show(800);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").hide(500);

		$("#options-option-usuario-new-data .edit").show(500);
		$("#options-option-usuario-new-data .static").hide(500);

		window.eCuRie.opciones.USUARIOS.editing = true;
		window.eCuRie.opciones.USUARIOS.grid.enabled(false);
	};
	var fg2 = function(){
		$(".options-option-save-td,.options-option-undo-td").hide(500);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").show(800);

		$("#options-option-usuario-new-data .edit").hide(500);
		$("#options-option-usuario-new-data .static").show(500);

		window.eCuRie.opciones.USUARIOS.editing = false;
		window.eCuRie.opciones.USUARIOS.grid.enabled(true);
	};
	$(".options-option-edit").click(function(){
		// Verificar que esté seleccionado un usuario ...
		if (window.eCuRie.opciones.USUARIOS.grid.indexSelected<0){
			return window.eCuRie.alert("Debe seleccionar un usuario para modificar los datos.");	
		}
		var ind = window.eCuRie.opciones.USUARIOS.grid.indexSelected;

		if(!window.eCuRie.SESSIONINFO.usuario.administrador){
			$("#options-option-usuario-new-data-admc").attr("disabled","disabled");
			if(window.eCuRie.opciones.USUARIOS.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
				return window.eCuRie.alert("Su cuenta es limitada. No puede modificar los datos de los demás usuarios.");					
			}
		}
		else{
			$("#options-option-usuario-new-data-admc").removeAttr("disabled");
		}

		window.eCuRie.opciones.USUARIOS.editingIndex = ind;
		fg();

	});

	$(".options-option-add").click(function(){

		var ind = window.eCuRie.opciones.USUARIOS.grid.indexSelected;
		if(!window.eCuRie.SESSIONINFO.usuario.administrador){
			$("#options-option-usuario-new-data-admc").attr("disabled","disabled");
			if(window.eCuRie.opciones.USUARIOS.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
				return window.eCuRie.alert("Solo un usuario con cuenta de administrador puede crear más usuarios.");					
			}
		}

		fg();

		$("#options-option-usuario-new-image").attr("src","images/user.png");
		$("#options-option-usuario-new-data-name").val("");
		$("#options-option-usuario-new-data-passwordc").val("");
		$("#options-option-usuario-new-data-admc").removeAttr("checked");
	});
	$(".options-option-delete").click(function(){
		fg();
	});

	$(".options-option-save").click(function(){

		if($("#options-option-usuario-new-data-name").val()==""){
			// No hay usuario 
			window.alert("Debe escribir un nombre de usuario.");
			return false;

		}
		if($("#options-option-usuario-new-data-passwordc").val()==""){
			// No hay usuario 
			window.alert("Debe escribir una contraseña para el usuario.");
			return false;
		}

		var ux;
		if(window.eCuRie.opciones.USUARIOS.editingIndex>=0){
			// Significa que está modificando ...
			ux=window.eCuRie.opciones.USUARIOS.grid.getRowData(window.eCuRie.opciones.USUARIOS.editingIndex); 

		}

		// Aquí debe guardar el usuario ...
		var usuario = {
			"idsesion":window.eCuRie.SESSIONINFO.sesion.idsesion,
			"idusuario":"",
			"nombre":$("#options-option-usuario-new-data-name").val(),
			"contraseña":$("#options-option-usuario-new-data-passwordc").val(),
			"administrador":$("#options-option-usuario-new-data-admc").get(0).checked,
			"imagen":$("#options-option-usuario-new-image").attr("src")
		};

		//alert(usuario.imagen);
		if(ux){
			usuario.idusuario = ux[6];
		}
		//alert(usuario.administrador);

		var saveUsu = function(data){
			fg2();

			// Cargar los usuarios
			g=false;
			window.eCuRie.usuarios.cargarUsuarios(function (data2){
					f(data2);

					// Buscar el id del usuario recién guardado ...
					try{
						window.eCuRie.opciones.USUARIOS.grid.findAndSelect(data, 6);
					}
					catch(e){
						alert(e);
					}


				}, f, function(error){
				}
			);
		}

		if(ux){
			window.eCuRie.usuarios.modificarUsuario(usuario, function(data){
				saveUsu(data);
				window.eCuRie.opciones.USUARIOS.editingIndex=-1;

			}, function(error){
				window.eCuRie.alert("No se pudo modificar los datos del usuario: " +error.Message);
			});
		}
		else{
			window.eCuRie.usuarios.guardarUsuario(usuario, saveUsu, function(error){
				window.eCuRie.alert("No se pudo guardar el nuevo usuario: " +error.Message);
			});
		}
		

	});

	$(".options-option-undo").click(function(){
		fg2();
		if(window.eCuRie.opciones.USUARIOS.lastSelected ){
			window.eCuRie.opciones.USUARIOS.onRowSelected(window.eCuRie.opciones.USUARIOS.lastSelected[0], window.eCuRie.opciones.USUARIOS.lastSelected[1]);
		}
	});
};





/*
window.eCuRie.opciones.HISTORY = [];
window.eCuRie.opciones.HISTORY.position = 0;
window.eCuRie.opciones.add = function(f){
	if (window.eCuRie.opciones.HISTORY.length>10){
		window.eCuRie.opciones.HISTORY.shift(0);
	}
	window.eCuRie.opciones.HISTORY.push(f);
};
window.eCuRie.opciones.HISTORY.add(window.eCuRie.opciones.OPCIONESDISPONIBLES.inicio);
*/



window.eCuRie.usuarios.WELCOMEInit = function(){


	var loadI = function(){
		window.eCuRie.SESSIONINFO.iniciarSesion(function(data){
			$("#welcome-name").text(data.usuario.nombre);
			if(data.usuario.imagen){
				$("#welcome-userimage").attr("src", data.usuario.imagen);
				$("#welcome-user-config-image").attr("src", data.usuario.imagen);
			}
		});
	};

	window.addEventListener('xapp-ready', loadI);


	$("#options-back").click(function(){
		window.eCuRie.opciones.IRAULTIMAOPCION();
	});
	$('.options.program').click(function(){
		window.eCuRie.opciones.procesar($(this));
	});

	$("#welcome-user-config").click(function(){
		$("body").data('config', true);
	});
	$("#welcome-user").click(function(){
		var f = $("#welcome-user-config").css("display");
		if(f=="none"){
			$("#welcome-user-config").show(500);
		}
		else{
			$("#welcome-user-config").hide(500);	
		}

		$("body").data('config', true);
	});

	$("body").click(function(){
		var f = $("#welcome-user-config").css("display");
		if(f=="none"){
			//$("#welcome-user-config").show(500);
		}
		else{
			setTimeout(function(){
				if (!$("body").data('config')){
					$("#welcome-user-config").hide(500);
				}
				else{
					$("body").data('config',false);
				}
			}, 200);
					
		}
	});
};