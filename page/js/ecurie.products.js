window.eCuRie=window.eCuRie || {};
window.eCuRie.productos = {};

window.addEventListener('xapp-ready', function(){

});


window.eCuRie.productos.cargarProductos = function(page, first, datareceived, xerror){
	var ya=false;
	var orequest= new jxshell.request("queryproducts?"+JSON.stringify([page, window.eCuRie.opciones.PRODUCTOS.queryorderby]));

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

window.eCuRie.productos.guardarProducto = function(cliente, sucess, xerror){
	var orequest = new jxshell.request("saveproduct?"+JSON.stringify(cliente));
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

window.eCuRie.productos.modificarProducto = function(cliente, sucess, ferror){
	var orequest = new jxshell.request("editproduct?"+JSON.stringify(cliente));
	orequest.onSuccess(function(data){
		try{
			sucess(data);
		}
		catch(e){
			console.log("Error en la función de suceso modificar producto.");
			console.log(e.stack);
		}
	});
	orequest.onError(function(error){
		try{
			ferror(error);
		}
		catch(e){
			console.log("Error en la función de error modificar producto.");
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





window.eCuRie.opciones.PRODUCTOS= {};
window.eCuRie.opciones.PRODUCTOS.queryorderby = 'nombre';
window.eCuRie.opciones.PRODUCTOS.init=function(){



	$("#options-option-producto-orderid").click(function(){
		window.eCuRie.opciones.PRODUCTOS.queryorderby = 'id';
		window.eCuRie.productos.cargarProductos(window.eCuRie.opciones.PRODUCTOS.page.index, f, f, function(error){
			console.log("Error al cargar los productos.");
			console.log(error);
		});
	});
	$("#options-option-producto-ordernombre").click(function(){
		window.eCuRie.opciones.PRODUCTOS.queryorderby = 'nombre,id';
		window.eCuRie.productos.cargarProductos(window.eCuRie.opciones.PRODUCTOS.page.index, f, f, function(error){
			console.log("Error al cargar los productos.");
			console.log(error);
		});
	});
	$("#options-option-producto-ordercodigo").click(function(){
		window.eCuRie.opciones.PRODUCTOS.queryorderby = 'codigo,id';
		window.eCuRie.productos.cargarProductos(window.eCuRie.opciones.PRODUCTOS.page.index, f, f, function(error){
			console.log("Error al cargar los productos.");
			console.log(error);
		});
	});



	window.eCuRie.opciones.PRODUCTOS.calculateUtility = function(){
		if(!window.eCuRie.opciones.PRODUCTOS.editing){
			return ;
		}
		var pu, v;
		pu= parseFloat($("#options-option-producto-new-utilidad").val());
		v=  parseFloat($("#options-option-producto-new-costo").val());

		v+=((v*pu)/100);
		v=v.toFixed(0);
		$("#options-option-producto-new-precio").val(v);
	};

	$("#options-option-producto-new-utilidad,#options-option-producto-new-costo").change(function(){
		window.eCuRie.opciones.PRODUCTOS.calculateUtility();
	});



	// Filtros ...
	$("#options-option-producto-filtros-1 input").keyup(function(){
		if (this.value!=""){
			$("#options-option-producto-filtros-2 input").val('');
			$("#options-option-producto-filtros-3 input").val('');
		}
		var g = window.eCuRie.opciones.PRODUCTOS.grid;
		g.advancedFilter($(this).val(), function(obj, value){
			if(obj[0].toLowerCase().indexOf(value.toLowerCase())>=0){
				return true;
			}
			return false;
		});
	});
	$("#options-option-producto-filtros-2 input").keyup(function(){
		if (this.value!=""){
			$("#options-option-producto-filtros-1 input").val('');
			$("#options-option-producto-filtros-3 input").val('');
		}
		
		var g = window.eCuRie.opciones.PRODUCTOS.grid;
		g.advancedFilter(this.value, function(obj, value){
			if(obj[1].toLowerCase().indexOf(value.toLowerCase())>=0){
				return true;
			}
			return false;
		});
	});
	$("#options-option-producto-filtros-3 input").keyup(function(){
		if (this.value!=""){
			$("#options-option-producto-filtros-1 input").val('');
			$("#options-option-producto-filtros-2 input").val('');
		}
		var g = window.eCuRie.opciones.PRODUCTOS.grid;
		g.advancedFilter($(this).val(), function(obj, value){
			if(obj[2].toLowerCase().indexOf(value.toLowerCase())>=0){
				return true;
			}
			return false;
		});
	});


	


	var img = $("#options-option-producto-image-imgd").get(0);
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
				$("#options-option-producto-image-error").text("El archivo seleccionado no es una imagen.");
			    $("#options-option-producto-image-error").show(500);
			    $("#options-option-producto-image-progress").hide(500);
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

			    $("#options-option-producto-image-error").text(er);
			    $("#options-option-producto-image-error").show(500);
			    $("#options-option-producto-image-progress").hide(500);

			};
		
			reader.onprogress = function(e){
				var p = Math.round((e.loaded/e.total)*100);
				$("#options-option-producto-image-progress").css("width", p.toString()+"%");
			};
			reader.onloadstart = function(){
				$("#options-option-producto-image-error").hide(500);
				$("#options-option-producto-image-progress").css("width", "0");
			};
			reader.onload = function(e){
				$("#options-option-producto-image-error").hide(500);
				$("#options-option-producto-image-progress").hide(500);

				//alert(e.target.result);
				$("#options-option-producto-image-img").attr(("src"), e.target.result);
			};

			reader.readAsDataURL(fe);

		};
	}
	



	var oUSUARIOS = $("#options-option-producto-image");
	var oUSUARIOS2;
	window.eCuRie.opciones.PRODUCTOS.cambiarImagen = function(onSuccess, onError){
		var o=oUSUARIOS;
		

		var options = {
			"style":{
				"background":"transparent"
			},
			"closeOnClick":true,
			"object":o
		};
		var f = new window.eCuRie.colorbox(options);
		$("#options-option-producto-image-img").attr("src", $("#options-option-producto-new-image").attr("src"));
		$("#options-option-producto-image-aceptar").click(function(){
			$("#options-option-producto-new-image").attr("src", $("#options-option-producto-image-img").attr("src"));
			f.close();
		});
		$("#options-option-producto-image-cancelar").click(function(){
			f.close();
		});

		o.show();
	};

	$("#options-option-producto-new-data-cambiarimagen").click(function(){
		window.eCuRie.opciones.PRODUCTOS.cambiarImagen();
	});


	//window.eCuRie.SESSIONINFO.iniciarSesion();
	var options = {
		"id":"options-option-producto-table",
		"width":"100%",
		"min-width":"400px",
		columns:[
			{"text":"Código", "width":"15%"},
			{"text":"Nombre", "width":"19%"},
			{"text":"Descripción", "width":"30%"},
			{"text":"Costo", "width":"12%"},
			{"text":"Precio", "width":"12%"},
			{"text":"Unidades", "width":"12%"}
		]
	};
	var fa = new window.jxshell.grid("options-option-producto-table", options);

	try{
		window.eCuRie.opciones.PRODUCTOS.editing=false;
		var yu = function(obj, index){

			if(window.eCuRie.opciones.PRODUCTOS.editing){
				return ;
			}

			window.eCuRie.opciones.PRODUCTOS.lastSelected = [obj,index];
			$("#options-option-producto-new").show(600);
			

			var info = window.eCuRie.opciones.PRODUCTOS.grid.getRowData(index);
			
			
			// Acá va el código de mostrar los datos ...
			$("#options-option-producto-new-nombre").val(info[1]);
			$("#options-option-producto-new-codigo").val(info[0]);
			$("#options-option-producto-new-costo").val(info[3]);
			$("#options-option-producto-new-utilidad").val(info[6]);
			$("#options-option-producto-new-precio").val(info[4]);
			$("#options-option-producto-new-descripcion").val(info[2]);

			if(info[8]){
				$("#options-option-producto-new-image").attr("src", info[8]);
			}
			else{
				$("#options-option-producto-new-image").attr("src", "images/productos.png");	
			}


		};

		window.eCuRie.opciones.PRODUCTOS.onRowSelected =(yu);
		fa.onRowSelected(yu);
	}
	catch(e){
		alert(e);
	}
	
	window.eCuRie.opciones.PRODUCTOS.grid = fa;



	var g;
	var f;
	window.eCuRie.opciones.PRODUCTOS.page={};
	window.eCuRie.opciones.PRODUCTOS.page.count = 1;
	window.eCuRie.opciones.PRODUCTOS.page.index = 1;


	f= function(data){


		window.eCuRie.opciones.PRODUCTOS.page.count = 1;

		// Crear las páginas ...
		var xi = $("#options-option-producto-pages");
		var xio = $("#options-option-producto-pages .pages");
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
			window.eCuRie.opciones.PRODUCTOS.page.count = tc;
			for(var i=0;i<tc;i++){
				var op=$("<div class='pages'></div>");
				op.append("<span>"+(i+1)+"</span>");
				op.attr("index", i+1);
				if(i==window.eCuRie.opciones.PRODUCTOS.page.index-1){
					op.addClass("selected");
				}
				xi.append(op);
			}

			op=$("<div class='pages'></div>");
			op.append("<span>&gt;</span>");
			op.attr("index", "next");
			xi.append(op);

			$("#options-option-producto-pages .pages").click(function(){
				if(window.eCuRie.opciones.PRODUCTOS.editing){
					return;
				}
				var index = $(this).attr("index");
				if(index=="next"){
					index = window.eCuRie.opciones.PRODUCTOS.page.index+1;
					if(window.eCuRie.opciones.PRODUCTOS.page.count < index){
						return;
					}
				}
				else if(index=="prev"){
					if(window.eCuRie.opciones.PRODUCTOS.page.index==1){
						return ;
					}
					index=window.eCuRie.opciones.PRODUCTOS.page.index-1;
				}
				else{
					index=parseInt(index);
				}
				$("#options-option-producto-new").hide(500);
				window.eCuRie.opciones.PRODUCTOS.page.index = index;
				window.eCuRie.productos.cargarProductos(index, f, f, function(error){
					console.log("Error al cargar los productos.");
					console.log(error);
				});
			});
		}
		xi.show(500);


		//alert(data.count);
		$("#options-option-producto-count").text(data.count.toString());
		var clear = true;
		/*if(g){
			clear = false;
		}*/
		g = window.eCuRie.opciones.PRODUCTOS.grid;
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
	window.eCuRie.productos.cargarProductos(window.eCuRie.opciones.PRODUCTOS.page.index, f, f, function(error){
		console.log("Error al cargar los productos.");
		console.log(error);
	});

	var fg = function(){
		$("#options-option-producto-new").show(500);		
		$(".options-option-save-td,.options-option-undo-td").show(800);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").hide(500);

		$("#options-option-producto-new-data .edit").show(500);
		$("#options-option-producto-new-data .static").hide(500);

		$("#options-option-producto-new-data input,#options-option-producto-new-data textarea").removeAttr("readonly");
		window.eCuRie.opciones.PRODUCTOS.editing = true;
		window.eCuRie.opciones.PRODUCTOS.grid.enabled(false);
	};

	var fg2 = function(){
		$(".options-option-save-td,.options-option-undo-td").hide(500);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").show(800);

		$("#options-option-producto-new-data .edit").hide(500);
		$("#options-option-producto-new-data .static").show(500);

		$("#options-option-producto-new-data input,#options-option-producto-new-data textarea").attr("readonly","readonly");

		window.eCuRie.opciones.PRODUCTOS.editing = false;
		window.eCuRie.opciones.PRODUCTOS.grid.enabled(true);
	};
	fg2();


	$(".options-option-edit").click(function(){
		
		// Verificar que esté seleccionado un usuario ...
		if (window.eCuRie.opciones.PRODUCTOS.grid.indexSelected<0){
			return window.eCuRie.alert("Debe seleccionar un cliente para modificar sus datos.");	
		}
		var ind = window.eCuRie.opciones.PRODUCTOS.grid.indexSelected;

		/*if(!window.eCuRie.SESSIONINFO.usuario.administrador){
			$("#options-option-clientes-new-data-admc").attr("disabled","disabled");
			if(window.eCuRie.opciones.CLIENTES.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
				return window.eCuRie.alert("Su cuenta es limitada. No puede modificar los datos de los demás usuarios.");					
			}
		}
		else{
			$("#options-option-clientes-new-data-admc").removeAttr("disabled");
		}*/

		window.eCuRie.opciones.PRODUCTOS.editingIndex = ind;
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

		$("#options-option-producto-new-data input,#options-option-producto-new-data textarea").val("");
		$("#options-option-producto-new-image").attr("src","images/productos.png");
		fg();
		$("#options-option-producto-new-codigo").focus();
		
	});
	$(".options-option-delete").click(function(){
		fg();
	});

	$(".options-option-save").click(function(){

		

		var ux;
		if(window.eCuRie.opciones.PRODUCTOS.editingIndex>=0){
			// Significa que está modificando ...
			ux=window.eCuRie.opciones.PRODUCTOS.grid.getRowData(window.eCuRie.opciones.PRODUCTOS.editingIndex); 

		}

		

		// Aquí debe guardar el usuario ...
		var producto = {
			"idsesion":window.eCuRie.SESSIONINFO.sesion.idsesion,
			"idproducto":"",
			"nombre":$("#options-option-producto-new-nombre").val(),
			"codigo":$("#options-option-producto-new-codigo").val(),
			"precio":$("#options-option-producto-new-precio").val(),
			"costo":$("#options-option-producto-new-costo").val(),
			"porcentajeutilidad":$("#options-option-producto-new-utilidad").val(),
			"tipoproducto":"producto",
			"descripcion":$("#options-option-producto-new-descripcion").val(),
			"imagen":$("#options-option-producto-new-image").attr("src")
		};

		if(!producto.codigo){
			window.eCuRie.alert("Debe escribir un código de producto");
			return ;
		}
		if(!producto.nombre){
			window.eCuRie.alert("Debe escribir un nombre de producto");
			return ;
		}
		
		
		
		if(ux){
			producto.idproducto = ux[7];
			//alert(ux[7]);
		}
		//alert(usuario.administrador);

		var saveUsu = function(data){
			//try{
				fg2();

				// Cargar los usuarios
				g=false;
				window.eCuRie.productos.cargarProductos(window.eCuRie.opciones.PRODUCTOS.page.index, function (data2){
						
						f(data2);
						// Buscar el id del usuario recién guardado ...
						try{
							window.eCuRie.opciones.PRODUCTOS.grid.findAndSelect(data, 5);
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
			
			window.eCuRie.productos.modificarProducto(producto, function(data){
				saveUsu(data);
				window.eCuRie.opciones.PRODUCTOS.editingIndex=-1;

			}, function(error){
				window.eCuRie.alert("No se pudo modificar los datos del producto: " +error.Message);
			});
		}
		else{

			window.eCuRie.productos.guardarProducto(producto, saveUsu, function(error){
				window.eCuRie.alert("No se pudo guardar el nuevo producto: " +error.Message);
			});
		}
		

	});

	$(".options-option-undo").click(function(){
		fg2();
		if(window.eCuRie.opciones.PRODUCTOS.lastSelected ){
			window.eCuRie.opciones.PRODUCTOS.onRowSelected(window.eCuRie.opciones.PRODUCTOS.lastSelected[0], window.eCuRie.opciones.PRODUCTOS.lastSelected[1]);
		}
		else{
			$("#options-option-producto-new").hide(500);
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
