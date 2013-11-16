
// Archivo para reemplazar tag selects por divs que simulen el combobox ...
window.jxshell= window.jxshell || {};

function getAbsoluteElementPosition(element) {
  if (typeof element == "string")
    element = document.getElementById(element)
    
  if (!element) return { top:0,left:0 };
  
  var y = 0;
  var x = 0;
  while (element.offsetParent) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }
  return {top:y,left:x};
};

window.jxshell.divAsSelect = function(object){
	// object debe ser un objeto jQuery
	var f = function(){

	};

	this.id = object.attr("id");
	var div = $("<div class='jxshell-select' style='display:inline-block;'></div>");
	
	var divS = $("<div class='jxshell-select-options'></div>");
	var inx = $("<input type='text' />");
	var inx2 = $("<input type='text' style='display:none' />");
	div.append(inx);
	div.append(inx2);
	div.attr("id", object.attr("id"));


	inx.attr("readonly", "readonly");
	$("body").append(divS);

	var xvalue = object.val();
	//inx2.get(0).__defineSetter__("value", function(e){div.val(e);div.change();});


	var classList = object.get(0).classList;
	for(var y=0;y<classList.length;y++){
		div.addClass(classList[y]);	
	}

	
	// Ahora los options ...
	var ops = object.find("option");
	inx.val(object.find("option[value="+xvalue+"]").text());
	var toptions = [];
	for(var i=0;i<ops.length;i++){
		var o=$("<div class='jxshell-select-options-option'></div>");
		o.html(ops.eq(i).html());
		divS.append(o);
		for(var y in ops.get(i).style){
			//o.css(y, ops.get(i).style[y]);
		}

		// Añadir las clases...
		var classList = ops.get(i).classList;
		for(var y=0;y<classList.length;y++){
			o.addClass(classList[y]);	
		}
		o.attr("value", ops.eq(i).attr("value"));
		toptions.push(o);
		
	}
	divS.hide();

	var locate = function(){

		// Ubica las opciones ...
		divS.css("left", div.position().left +"px");
		divS.css("top", (inx.offset().top + 1 + inx.outerHeight(true)) + "px");
		/*down.css("right", (inx.offset().left -26 + inx.outerWidth(true)) + "px");
		down.css("top", (inx.offset().top + 2) + "px");
		down.height(inx.outerHeight(true) - 4);*/
	};
	window.addEventListener("resize", locate);

	// Aplicando los estilos originales ...
	for(var i in object.style){
		//div.css(i, object.style[i]);
	}

	inx.click(function(){
		locate();
		if(divS.css("display")=="none"){
			divS.show(200);	
		}
		else{
			divS.hide(200);
		}
		
	});

	// Hacer el append sobre el parent. 
	if(object.css("display")!='none'){
		div.show();
	}
	else{
		div.hide();
	}

	// Atachar el evento click de cada opción...
	toptions.forEach(function(object){
		object.click(function(){
			var o = $(this);
			var v = o.attr("value");
			//div.attr("value", v);
			inx2.val(v);
			inx.val(o.text());
			divS.hide(200);
		});
	});

	div.get(0).__defineSetter__('value', function(v){
		//v = $(this).val();
		inx.val('');
		inx2.val(v);
		for(var i = 0;i<toptions.length;i++){
			var ve = toptions[i].attr("value");
			if(ve==v){
				inx.val(toptions[i].text());
			}
		}
	});
	div.get(0).__defineGetter__('value', function(){
		return inx2.val();
	});

	div.insertBefore(object);
	object.remove();

	locate();
	div.val(xvalue);
};

window.jxshell.convertSelectToDiv=function(){
	var selects = $("select");
	for (var i=0;i<selects.length;i++){
		var o = new jxshell.divAsSelect(selects.eq(i));
	}
};