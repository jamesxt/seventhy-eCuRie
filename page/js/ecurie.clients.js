window.eCuRie=window.eCuRie || {};
window.eCuRie.clientes = {};

window.addEventListener('xapp-ready', function(){

});


window.eCuRie.clientes.cargarClientes = function(page, first, datareceived, xerror){
	var ya=false;
	var orequest= new jxshell.request("queryclientes?"+JSON.stringify([page, window.eCuRie.opciones.CLIENTES.queryorderby]));

	// Va tomando de a 20 ...
	orequest.onSuccess(function (data){
		try{
			if (!ya){
				ya=true;
				first(data);
			}
			else{
				datareceived(data);
			}
		}
		catch(e){
			console.log(e.stack);
		}
	});

	orequest.onError(function(error){
		try{
			xerror(error);
		}
		catch(e){
			console.log(e.stack);
		}
	});

	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
		

};

window.eCuRie.clientes.guardarCliente = function(cliente, sucess, xerror){
	var orequest = new jxshell.request("saveclient?"+JSON.stringify(cliente));
	orequest.onSuccess(function(data){
		try{
			sucess(data);
		}
		catch(e){
			console.error(e.stack);
		}
	});
	orequest.onError(function (error){
		try{
			xerror(error);
		}
		catch(e){
			console.error(e.stack);
		}
	});

	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
};

window.eCuRie.clientes.modificarCliente = function(cliente, sucess, ferror){
	var orequest = new jxshell.request("editclientes?"+JSON.stringify(cliente));
	orequest.onSuccess(function(data){
		try{
			sucess(data);
		}
		catch(e){
			console.log("Error en la función de suceso modificar cliente.");
			console.log(e.stack);
		}
	});
	orequest.onError(function(error){
		try{
			ferror(error);
		}
		catch(e){
			console.log("Error en la función de error modificar cliente.");
			console.log(e.stack);
		}
	});

	try{
		orequest.send();
	}
	catch(e){
		console.log(e);
	}
};


window.eCuRie.clientes.cargarTiposDeIdentificacion = function(){
	var p=$("#options-option-clientes-new-data-dis");
	var orequest = new jxshell.request("cargarTiposDeIdentificacion");
	orequest.onError(function(error){
		console.log("Error al cagar tipos de identificacion");
		console.log(error);
	});

	orequest.onSuccess(function(data){
		// Devuelve un array con las opcioens de tipos de identificacion ...

		p.html("");
		console.log(data);
		var y = data.length;
		for(var i=0;i<y;i++){
			var ox = $("<option></option>");
			ox.text(data[i].nombre);
			ox.attr("value", data[i].codigo);
			p.append(ox);
		}

		// Si es linux convierte a divs el control select ...
		try{
			if(window.jxshell.isLinux()){
				window.jxshell.convertSelectToDiv();
			}
		}
		catch(e){
			console.log(e.stack);
		}
	});

	orequest.send();
};


window.eCuRie.opciones.CLIENTES= {};
window.eCuRie.opciones.CLIENTES.queryorderby = 'nombre1,nombre2,apellido1, apellido2';
window.eCuRie.opciones.CLIENTES.init=function(){

	window.eCuRie.clientes.cargarTiposDeIdentificacion();

	// Filtros ...
	$("#options-option-clientes-filtros-1 input").keyup(function(){
		if (this.value!=""){
			$("#options-option-clientes-filtros-2 input").val('');
			$("#options-option-clientes-filtros-3 input").val('');
		}
		var g = window.eCuRie.opciones.CLIENTES.grid;
		g.advancedFilter($(this).val(), function(obj, value){
			if(obj[0].toLowerCase().indexOf(value.toLowerCase())>=0){
				return true;
			}
			return false;
		});
	});
	$("#options-option-clientes-filtros-2 input").keyup(function(){
		if (this.value!=""){
			$("#options-option-clientes-filtros-1 input").val('');
			$("#options-option-clientes-filtros-3 input").val('');
		}
		
		var g = window.eCuRie.opciones.CLIENTES.grid;
		g.advancedFilter(this.value, function(obj, value){
			if(obj[1].toLowerCase().indexOf(value.toLowerCase())>=0){
				return true;
			}
			return false;
		});
	});
	$("#options-option-clientes-filtros-3 input").keyup(function(){
		if (this.value!=""){
			$("#options-option-clientes-filtros-1 input").val('');
			$("#options-option-clientes-filtros-2 input").val('');
		}
		var g = window.eCuRie.opciones.CLIENTES.grid;
		g.advancedFilter($(this).val(), function(obj, value){
			if(obj[2].toLowerCase().indexOf(value.toLowerCase())>=0){
				return true;
			}
			return false;
		});
	});


	$("#options-option-clientes-orderid").click(function(){
		window.eCuRie.opciones.CLIENTES.queryorderby = 'id';
		window.eCuRie.clientes.cargarClientes(window.eCuRie.opciones.CLIENTES.page.index, f, f, function(error){
			console.log("Error al cargar los clientes.");
			console.log(error);
		});
	});
	$("#options-option-clientes-ordernombre").click(function(){
		window.eCuRie.opciones.CLIENTES.queryorderby = 'nombre1,nombre2,apellido1,apellido2,id';
		window.eCuRie.clientes.cargarClientes(window.eCuRie.opciones.CLIENTES.page.index, f, f, function(error){
			console.log("Error al cargar los clientes.");
			console.log(error);
		});
	});
	$("#options-option-clientes-ordercodigo").click(function(){
		window.eCuRie.opciones.CLIENTES.queryorderby = 'codigo,id';
		window.eCuRie.clientes.cargarClientes(window.eCuRie.opciones.CLIENTES.page.index, f, f, function(error){
			console.log("Error al cargar los clientes.");
			console.log(error);
		});
	});


	var img = $("#options-option-clientes-image-imgd").get(0);
	if(img){
		img.ondrop = function(e){
			var files =e.dataTransfer.files;
			var reader = new FileReader();
			if (files.length==0){
				return;
			}

			var fe = files[0];
			//alert(fe.type);
			if (!fe.type.match('image.*')) {
				$("#options-option-clientes-image-error").text("El archivo seleccionado no es una imagen.");
			    $("#options-option-clientes-image-error").show(500);
			    $("#options-option-clientes-image-progress").hide(500);
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

			    $("#options-option-clientes-image-error").text(er);
			    $("#options-option-clientes-image-error").show(500);
			    $("#options-option-clientes-image-progress").hide(500);

			};
		
			reader.onprogress = function(e){
				var p = Math.round((e.loaded/e.total)*100);
				$("#options-option-clientes-image-progress").css("width", p.toString()+"%");
			};
			reader.onloadstart = function(){
				$("#options-option-clientes-image-error").hide(500);
				$("#options-option-clientes-image-progress").css("width", "0");
			};
			reader.onload = function(e){
				$("#options-option-clientes-image-error").hide(500);
				$("#options-option-clientes-image-progress").hide(500);

				//alert(e.target.result);
				$("#options-option-clientes-image-img").attr(("src"), e.target.result);
			};

			reader.readAsDataURL(fe);

		};
	}
	
	var oUSUARIOS = $("#options-option-clientes-image");
	var oUSUARIOS2;
	window.eCuRie.opciones.CLIENTES.cambiarImagen = function(onSuccess, onError){
		var o=oUSUARIOS;
		

		var options = {
			"style":{
				"background":"transparent"
			},
			"closeOnClick":true,
			"object":o
		};
		var f = new window.eCuRie.colorbox(options);
		$("#options-option-clientes-image-img").attr("src", $("#options-option-clientes-new-image").attr("src"));
		$("#options-option-clientes-image-aceptar").click(function(){
			$("#options-option-clientes-new-image").attr("src", $("#options-option-clientes-image-img").attr("src"));
			f.close();
		});
		$("#options-option-clientes-image-cancelar").click(function(){
			f.close();
		});

		o.show();
	};

	$("#options-option-clientes-new-data-cambiarimagen").click(function(){
		window.eCuRie.opciones.CLIENTES.cambiarImagen();
	});


	//window.eCuRie.SESSIONINFO.iniciarSesion();
	var options = {
		"id":"options-option-clientes-table",
		"width":"100%",
		"min-width":"400px",
		columns:[
			{"text":"Código", "width":"15%"},
			{"text":"DI", "width":"15%"},
			{"text":"Nombre de cliente", "width":"24%"},
			{"text":"Dirección", "width":"28%"},
			{"text":"Teléfono", "width":"18%"},
		]
	};
	var fa = new window.jxshell.grid("options-option-clientes-table", options);

	try{
		window.eCuRie.opciones.CLIENTES.editing=false;
		var yu = function(obj, index){

			if(window.eCuRie.opciones.CLIENTES.editing){
				return ;
			}

			window.eCuRie.opciones.CLIENTES.lastSelected = [obj,index];
			$("#options-option-clientes-new").show(600);
			

			var info = window.eCuRie.opciones.CLIENTES.grid.getRowData(index);
			
			$("#options-option-clientes-new-data-dis").val(info[12]);
			if(!info[11]){
				$("#options-option-clientes-new-image").attr("src","images/user.png");
			}
			else{
				$("#options-option-clientes-new-image").attr("src",info[11]);
			}
			
			$("#options-option-clientes-new-data-codigoc").val(info[0]);
			$("#options-option-clientes-new-data-codigo").text(info[0]);


			$("#options-option-clientes-new-data-n1").val(info[7]);
			$("#options-option-clientes-new-data-n2").val(info[8]);
			$("#options-option-clientes-new-data-n3").val(info[9]);
			$("#options-option-clientes-new-data-n4").val(info[10]);
			$("#options-option-clientes-new-name").text(info[2]);
			$("#options-option-clientes-new-data-din").text(info[1]);
			$("#options-option-clientes-new-data-dins").val(info[1]);
			$("#options-option-clientes-new-data-di").text(info[13]);

			$("#options-option-clientes-new-data-fecha").text(info[14]);
			$("#options-option-clientes-new-data-usuario").text(info[15]);

			$("#options-option-clientes-new-data-dir").text(info[3]);
			$("#options-option-clientes-new-data-dirc").val(info[3]);

			$("#options-option-clientes-new-data-tel").text(info[4]);
			$("#options-option-clientes-new-data-telc").val(info[4]);

		};

		window.eCuRie.opciones.CLIENTES.onRowSelected =(yu);
		fa.onRowSelected(yu);
	}
	catch(e){
		alert(e);
	}
	
	window.eCuRie.opciones.CLIENTES.grid = fa;



	var g;
	var f;
	window.eCuRie.opciones.CLIENTES.page={};
	window.eCuRie.opciones.CLIENTES.page.count = 1;
	window.eCuRie.opciones.CLIENTES.page.index = 1;
	f= function(data){

		window.eCuRie.opciones.CLIENTES.page.count = 1;

		// Crear las páginas ...
		var xi = $("#options-option-clientes-pages");
		var xio = $("#options-option-clientes-pages .pages");
		xio.remove();
		if(data.count>1){
			
			var op=$("<div class='pages'></div>");
			op.append("<span>&lt;</span>");
			op.attr("index", "prev");
			xi.append(op);
			var tc = data.count/20;
			if(tc!=parseInt(tc)){
				tc=parseInt(tc)+1;
			}
			window.eCuRie.opciones.CLIENTES.page.count = tc;
			for(var i=0;i<tc;i++){
				var op=$("<div class='pages'></div>");
				op.append("<span>"+(i+1)+"</span>");
				op.attr("index", i+1);
				if(i==window.eCuRie.opciones.CLIENTES.page.index-1){
					op.addClass("selected");
				}
				xi.append(op);
			}

			op=$("<div class='pages'></div>");
			op.append("<span>&gt;</span>");
			op.attr("index", "next");
			xi.append(op);

			$("#options-option-clientes-pages .pages").click(function(){
				if(window.eCuRie.opciones.CLIENTES.editing){
					return;
				}
				var index = $(this).attr("index");
				if(index=="next"){
					index = window.eCuRie.opciones.CLIENTES.page.index+1;
					if(window.eCuRie.opciones.CLIENTES.page.count < index){
						return;
					}
				}
				else if(index=="prev"){
					if(window.eCuRie.opciones.CLIENTES.page.index==1){
						return ;
					}
					index=window.eCuRie.opciones.CLIENTES.page.index-1;
				}
				else{
					index=parseInt(index);
				}
				$("#options-option-clientes-new").hide(500);
				window.eCuRie.opciones.CLIENTES.page.index = index;
				window.eCuRie.clientes.cargarClientes(index, f, f, function(error){
					console.log("Error al cargar los clientes.");
					console.log(error);
				});
			});
		}
		xi.show(500);


		//alert(data.count);
		$("#options-option-clientes-count").text(data.count.toString());
		var clear = true;
		/*if(g){
			clear = false;
		}*/
		g = window.eCuRie.opciones.CLIENTES.grid;
		try{
			if(clear){
				g.clearData();
			}
			g.addData(data.data);
		}
		catch(e){
			alert(e);
		}
		
	};
	window.eCuRie.clientes.cargarClientes(window.eCuRie.opciones.CLIENTES.page.index, f, f, function(error){
		console.log("Error al cargar los clientes.");
		console.log(error);
	});

	var fg = function(){
		$("#options-option-clientes-new").show(500);		
		$(".options-option-save-td,.options-option-undo-td").show(800);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").hide(500);

		$("#options-option-clientes-new-data .edit").show(500);
		$("#options-option-clientes-new-data .static").hide(500);

		window.eCuRie.opciones.CLIENTES.editing = true;
		window.eCuRie.opciones.CLIENTES.grid.enabled(false);
	};

	var fg2 = function(){
		$(".options-option-save-td,.options-option-undo-td").hide(500);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").show(800);

		$("#options-option-clientes-new-data .edit").hide(500);
		$("#options-option-clientes-new-data .static").show(500);

		window.eCuRie.opciones.CLIENTES.editing = false;
		window.eCuRie.opciones.CLIENTES.grid.enabled(true);
	};

	$(".options-option-edit").click(function(){
		
		// Verificar que esté seleccionado un usuario ...
		if (window.eCuRie.opciones.CLIENTES.grid.indexSelected<0){
			return window.eCuRie.alert("Debe seleccionar un cliente para modificar sus datos.");	
		}
		var ind = window.eCuRie.opciones.CLIENTES.grid.indexSelected;

		/*if(!window.eCuRie.SESSIONINFO.usuario.administrador){
			$("#options-option-clientes-new-data-admc").attr("disabled","disabled");
			if(window.eCuRie.opciones.CLIENTES.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
				return window.eCuRie.alert("Su cuenta es limitada. No puede modificar los datos de los demás usuarios.");					
			}
		}
		else{
			$("#options-option-clientes-new-data-admc").removeAttr("disabled");
		}*/

		window.eCuRie.opciones.CLIENTES.editingIndex = ind;

		fg();

	});

	$(".options-option-add").click(function(){

		/*var ind = window.eCuRie.opciones.CLIENTES.grid.indexSelected;
		if(!window.eCuRie.SESSIONINFO.usuario.administrador){
			$("#options-option-clientes-new-data-admc").attr("disabled","disabled");
			if(window.eCuRie.opciones.CLIENTES.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
				return window.eCuRie.alert("Solo un usuario con cuenta de administrador puede crear más usuarios.");					
			}
		}*/

		fg();

		$("#options-option-clientes-new-data-dis").val('0');
		$("#options-option-clientes-new-data-dins").val('');
		$("#options-option-clientes-new-image").attr("src","images/user.png");
		$("#options-option-clientes-new-data-n input").val("");
		$("#options-option-clientes-new-data-dirc").val("");
		$("#options-option-clientes-new-data-telc").val("");
		$("#options-option-clientes-new-data-codigoc").val("");
	});
	$(".options-option-delete").click(function(){
		fg();
	});

	$(".options-option-save").click(function(){

		if($("#options-option-clientes-new-data-name").val()==""){
			// No hay usuario 
			window.alert("Debe escribir un nombre de usuario.");
			return false;

		}
		if($("#options-option-clientes-new-data-passwordc").val()==""){
			// No hay usuario 
			window.alert("Debe escribir una contraseña para el usuario.");
			return false;
		}

		var ux;
		if(window.eCuRie.opciones.CLIENTES.editingIndex>=0){
			// Significa que está modificando ...
			ux=window.eCuRie.opciones.CLIENTES.grid.getRowData(window.eCuRie.opciones.CLIENTES.editingIndex); 

		}

		

		// Aquí debe guardar el usuario ...
		var cliente = {
			"idsesion":window.eCuRie.SESSIONINFO.sesion.idsesion,
			"idcliente":"",
			"nombre1":$("#options-option-clientes-new-data-n1").val(),
			"nombre2":$("#options-option-clientes-new-data-n2").val(),
			"apellido1":$("#options-option-clientes-new-data-n3").val(),
			"apellido2":$("#options-option-clientes-new-data-n4").val(),
			"tipoidentificacion":$("#options-option-clientes-new-data-dis").val(),
			"identificacion":$("#options-option-clientes-new-data-dins").val(),
			"imagen":$("#options-option-clientes-new-image").attr("src"),
			"telefono":$("#options-option-clientes-new-data-telc").val(),
			"direccion":$("#options-option-clientes-new-data-dirc").val(),
			"codigo":$("#options-option-clientes-new-data-codigoc").val()
		};
		
		if(!cliente.identificacion){
			return window.eCuRie.alert("Debe escribir un número de identificación.");
		}
		if(!cliente.tipoidentificacion){
			return window.eCuRie.alert("Debe seleccionar un tipo de identificación.");
		}
		if(!cliente.nombre1){
			return window.eCuRie.alert("Debe escribir por lo menos el primer nombre.");
		}
		if(!cliente.codigo){
			return window.eCuRie.alert("Debe escribir un código único de cliente.");
		}
		
		if(ux){
			cliente.idcliente = ux[5];
		}
		//alert(usuario.administrador);

		var saveUsu = function(data){
			//try{
				fg2();

				// Cargar los usuarios
				g=false;
				window.eCuRie.clientes.cargarClientes(window.eCuRie.opciones.CLIENTES.page.index, function (data2){
						
						f(data2);
						// Buscar el id del usuario recién guardado ...
						try{
							window.eCuRie.opciones.CLIENTES.grid.findAndSelect(data, 5);
						}
						catch(e){
							console.error(e.stack);
						}


					}, f, function(error){
					}
				);
			/*}
			catch(e){
				alert(e);
			}*/
		};

		if(ux){
			window.eCuRie.clientes.modificarCliente(cliente, function(data){
				saveUsu(data);
				window.eCuRie.opciones.CLIENTES.editingIndex=-1;

			}, function(error){
				window.eCuRie.alert("No se pudo modificar los datos del cliente: " +error.Message);
			});
		}
		else{

			window.eCuRie.clientes.guardarCliente(cliente, saveUsu, function(error){
				window.eCuRie.alert("No se pudo guardar el nuevo cliente: " +error.Message);
			});
		}
		

	});

	$(".options-option-undo").click(function(){
		fg2();
		if(window.eCuRie.opciones.CLIENTES.lastSelected ){
			window.eCuRie.opciones.CLIENTES.onRowSelected(window.eCuRie.opciones.CLIENTES.lastSelected[0], window.eCuRie.opciones.CLIENTES.lastSelected[1]);
		}
		else{
			$("#options-option-clientes-new").hide(500);
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