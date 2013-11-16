window.eCuRie=window.eCuRie || {};


// COLORBOX Similar al de facebook
window.eCuRie.colorbox = function(options){
	// Crea una ventana 

	var divC;
	var r = $("#jxshell-colorbox");

	if(r.length==0){
		r = $("<div id = 'jxshell-colorbox'></div>");
		r2 = $("<div id='jxshell-colorbox-s' > </div>");
		var style = $("<style></style>");
		var style2 = $("<style></style>");
		style.html("#jxshell-colorbox{"+
			"position: absolute;"+
			"top:0;"+
			"opacity:0.5;"+
			"left:0;"+
			"right:0;"+
			"bottom:0;"+
			"background:white;"+
			"display:none;"+
			"z-index:999999;"+
		"}");

		style2.html("#jxshell-colorbox-s{"+
			"position: absolute;"+
			"top:0;"+
			"left:0;"+
			"right:0;"+
			"bottom:0;"+
			"display:none;"+
			"z-index:1000000"+
		"}"+
		"#jxshell-colorbox-content{margin:20px auto;}");


		r.append(style);
		divC =$("<div id='jxshell-colorbox-content'></div>");
		r2.append(style2);
		r2.append(divC);
		$("body").append(r);
		$("body").append(r2);


	}
	else{
		divC = $("#jxshell-colorbox-content");
	}
	divC.hide(100);
	divC.html('');

	this.divTotal = $("#jxshell-colorbox");
	this.divTotal2 = $("#jxshell-colorbox-s");
	this.divContenedor = divC;

	if(options.object){
		divC.append(options.object);
	}

	this.applyStyle = function(style){
		for (var i in style){
			try{
				divC.get(0).style[i] =  style[i];	
			}
			catch(e){
				alert(e);
			}
		}
	};

	this.close = function(time){
		if (!time){
			time = 500;
		}
		this.divTotal.hide(time);
		this.divTotal2.hide(time);
	};


	divC.show(500);
	r.show(500);
	this.divTotal2.show(500);


	if (options.style){
		this.applyStyle(options.style);
	}

	if(options.closeOnClick){
		var me = this;

		this.divContenedor.click(function(){
			me.noclose=true;
		});
		this.divTotal.click(function(){
			me.close();
		});
		
		this.divTotal2.click(function(){
			
			setTimeout(function(){
				if (me.noclose){
					me.noclose = false;
					return;
				}
				me.close();
			}, 200);
		});
		
	}
	else{
		this.divTotal.unbind('click');
		this.divTotal2.unbind('click');
	}	
};