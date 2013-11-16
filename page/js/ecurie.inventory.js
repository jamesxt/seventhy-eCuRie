window.eCuRie=window.eCuRie || {};
window.eCuRie.productos = {};

window.addEventListener('xapp-ready', function(){

});






window.eCuRie.opciones.INVENTARIO= {};


window.eCuRie.opciones.INVENTARIO.init=function(){




	


	//window.eCuRie.SESSIONINFO.iniciarSesion();
	var options = {
		"id":"options-option-inventario-table",
		"width":"100%",
		"min-width":"400px",
		columns:[
			{"text":"Fecha", "width":"15%"},
			{"text":"Número", "width":"17%"},
			{"text":"Tipo", "width":"18%"},
			{"text":"Responsable", "width":"25%"},
			{"text":"Creado por", "width":"12%"},
			{"text":"Total costo", "width":"12%"}
		]
	};
	var fa = new window.jxshell.grid("options-option-inventario-table", options);

	var options = {
		"id":"options-option-inventario-table",
		"width":"100%",
		"min-width":"400px",
		columns:[
			{"text":"Código", "width":"12%"},
			{"text":"Producto", "width":"28%"},
			{"text":"Cantidad", "width":"10%"},
			{"text":"Costo Unitario", "width":"17%"},
			{"text":"Costo total", "width":"17%"},
			{"text":"Precio. venta", "width":"18%"}
		]
	};
	var fb = new window.jxshell.grid("options-option-inventario-detalle-table", options);

	try{
		window.eCuRie.opciones.INVENTARIO.editing=false;
		var yu = function(obj, index){

			if(window.eCuRie.opciones.INVENTARIO.editing){
				return ;
			}

			window.eCuRie.opciones.INVENTARIO.lastSelected = [obj,index];
			$("#options-option-inventario-new").show(600);
			

			var info = window.eCuRie.opciones.INVENTARIO.grid.getRowData(index);
			
			
			// Acá va el código de mostrar los datos ...
			


		};

		window.eCuRie.opciones.INVENTARIO.onRowSelected =(yu);
		fa.onRowSelected(yu);
	}
	catch(e){
		alert(e);
	}
	
	window.eCuRie.opciones.INVENTARIO.grid = fa;



	var g;
	var f;
	window.eCuRie.opciones.INVENTARIO.page={};
	window.eCuRie.opciones.INVENTARIO.page.count = 1;
	window.eCuRie.opciones.INVENTARIO.page.index = 1;


	f= function(data){


		window.eCuRie.opciones.INVENTARIO.page.count = 1;

		// Crear las páginas ...
		var xi = $("#options-option-inventario-pages");
		var xio = $("#options-option-inventario-pages .pages");
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
			window.eCuRie.opciones.INVENTARIO.page.count = tc;
			for(var i=0;i<tc;i++){
				var op=$("<div class='pages'></div>");
				op.append("<span>"+(i+1)+"</span>");
				op.attr("index", i+1);
				if(i==window.eCuRie.opciones.INVENTARIO.page.index-1){
					op.addClass("selected");
				}
				xi.append(op);
			}

			op=$("<div class='pages'></div>");
			op.append("<span>&gt;</span>");
			op.attr("index", "next");
			xi.append(op);

			$("#options-option-inventario-pages .pages").click(function(){
				if(window.eCuRie.opciones.INVENTARIO.editing){
					return;
				}
				var index = $(this).attr("index");
				if(index=="next"){
					index = window.eCuRie.opciones.INVENTARIO.page.index+1;
					if(window.eCuRie.opciones.INVENTARIO.page.count < index){
						return;
					}
				}
				else if(index=="prev"){
					if(window.eCuRie.opciones.INVENTARIO.page.index==1){
						return ;
					}
					index=window.eCuRie.opciones.INVENTARIO.page.index-1;
				}
				else{
					index=parseInt(index);
				}
				$("#options-option-inventario-new").hide(500);
				window.eCuRie.opciones.INVENTARIO.page.index = index;
				window.eCuRie.inventario.cargarProductos(index, f, f, function(error){
					console.log("Error al cargar el inventario.");
					console.log(error);
				});
			});
		}
		xi.show(500);


		//alert(data.count);
		$("#options-option-inventario-count").text(data.count.toString());
		var clear = true;
		/*if(g){
			clear = false;
		}*/
		g = window.eCuRie.opciones.INVENTARIO.grid;
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
	

	var fg = function(){
		$("#options-option-inventario-new").show(500);		
		$(".options-option-save-td,.options-option-undo-td").show(800);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").hide(500);

		$("#options-option-inventario-new-data .edit").show(500);
		$("#options-option-inventario-new-data .static").hide(500);

		
		window.eCuRie.opciones.INVENTARIO.editing = true;
		window.eCuRie.opciones.INVENTARIO.grid.enabled(false);
	};

	var fg2 = function(){
		$(".options-option-save-td,.options-option-undo-td").hide(500);
		$(".options-option-add-td,.options-option-edit-td,.options-option-delete-td").show(800);

		$("#options-option-inventario-new-data .edit").hide(500);
		$("#options-option-inventario-new-data .static").show(500);

		

		window.eCuRie.opciones.INVENTARIO.editing = false;
		window.eCuRie.opciones.INVENTARIO.grid.enabled(true);
	};
	fg2();


	$(".options-option-edit").click(function(){
		
		// Verificar que esté seleccionado un usuario ...
		if (window.eCuRie.opciones.INVENTARIO.grid.indexSelected<0){
			return window.eCuRie.alert("Debe seleccionar un registro para modificar sus datos.");	
		}
		var ind = window.eCuRie.opciones.INVENTARIO.grid.indexSelected;

		/*if(!window.eCuRie.SESSIONINFO.usuario.administrador){
			$("#options-option-clientes-new-data-admc").attr("disabled","disabled");
			if(window.eCuRie.opciones.CLIENTES.grid.getRowData(ind)[6]!=window.eCuRie.SESSIONINFO.usuario.idusuario){
				return window.eCuRie.alert("Su cuenta es limitada. No puede modificar los datos de los demás usuarios.");					
			}
		}
		else{
			$("#options-option-clientes-new-data-admc").removeAttr("disabled");
		}*/

		window.eCuRie.opciones.INVENTARIO.editingIndex = ind;
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

		$("#options-option-inventario-new-data input,#options-option-inventario-new-data textarea").val("");
		$("#options-option-inventario-new-image").attr("src","images/productos.png");
		fg();
		$("#options-option-inventario-new-codigo").focus();
		
	});
	$(".options-option-delete").click(function(){
		fg();
	});

	$(".options-option-save").click(function(){

		

		
		

	});

	$(".options-option-undo").click(function(){
		fg2();
		if(window.eCuRie.opciones.INVENTARIO.lastSelected ){
			window.eCuRie.opciones.INVENTARIO.onRowSelected(window.eCuRie.opciones.INVENTARIO.lastSelected[0], window.eCuRie.opciones.INVENTARIO.lastSelected[1]);
		}
		else{
			$("#options-option-inventario-new").hide(500);
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
