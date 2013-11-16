/**
 * @author Desarrollo
 */



var f = function(){
	window.jxshell = window.jxshell ||{};
	window.jxshell.grid = function(id, parameters){


		this.indexSelected = -1;
		this.__length=0;
		this.__init = function(id){
			var objA, objP;
			objA = $("#"+id);
			objP = $("<div>").attr("id", "jxshell-grid-"+id);
			objA.append(objP);
			this.o = objP;
		}
		
		this.transform = function(value){
			if(value===undefined){
				return "";
			}
			return value+"";
		}
		
		this.applyStyle = function(obj, style, par0, index){
			//alert("oh si");
			var c1=false, c2 = false, c3 = false, c4=false;
			if (par0==="container"){
				c1 = true;
			}
			if (par0==="containerh"){
				c3 = true;
			}
			if (par0==="header"){
				c4= true;
			}
			if (par0==="content"){
				c2 = true;
			}
			if(!c1){
				if (style["table-layout"]){
					obj.css("table-layout", style["table-layout"]);
				}
			}
			
			if(style["font-size"]&& (!c4 && !c3)){
				obj.css("font-size", style["font-size"]);	
			}

			if(style["font-size-header"] && (c4 || c3)){
				obj.css("font-size", style["font-size-header"]);	
			}
			
			if(c2 || c4){
				obj.css("width", "100%");
			}
			else{
				if (style["width"]){
					obj.css("width", style["width"]);
				}	
			}

			if (style["cursor"]){
				obj.css("cursor", style["cursor"]);
			}
			if (style["min-width"]){
				obj.css("min-width", style["min-width"]);
			}
			if (c1){
				if (style["height"]){
					obj.css("height", style["height"]);
				}	
				if (style["min-height"]){
					obj.css("min-height", style["min-height"]);
				}
				if (style["max-height"]){
					obj.css("max-height", style["max-height"]);
				}
			}
			
			if (style["border-collapse"]){
				obj.css("border-collapse", style["border-collapse"]);
			}
			if(par0===true){
				if (!this.o["cols-def"]){
					this.o["cols-def"]=[];
				}
				this.o["cols-def"][index] = obj.attr("style");
			}
			
		}
		
		this.addData = function(data){

			
			if(!this.__data){
				this.__data = data;
			}
			else{
				this.__data = this.__data.concat(data);
			}

			// Data debe ser un array de arrays
			var l,i, tr, td,c, y, li;
			l=data.length;
			var coldef;
			if (!this.__rows){
				this.__rows=[];
			}
			coldef = this.o['cols-definition'];
			//alert(coldef);
			for (i=0;i<l;i++){
				if(i==0){
					this.o.body["container-info"].html(""); 
				}
				tr = $("<tr class='jxshell-grid-btr'>");
				c = this.o.body["x-length"];
				tr.attr("index", c);
				this.__rows[c]=tr;
				c++;
				this.o.body["x-length"]=c;
				//li=data[i].length;
				li=this.o["cols-def"].length;
				
				
				for(y=0;y<li;y++){
					if(y==li-1){
						td = $("<td class='jxshell-grid-btd last'>");
					}
					else{
						td = $("<td class='jxshell-grid-btd'>");	
					}
					td.attr("style", this.o["cols-def"][y]);
					tr.append(td);		
					this.defaultRenderFunction(data[i][y],td, coldef[y]);
					tr.data("jxshell-table", this);
					
				}
				tr.click(this.__onTrClick);
				this.o.body.append(tr);
			}
			
			
			this.__length += data.length;
		}
		
		this.getFilteredData =function(){
			if (!this.__fdata){
				return this.__data;
			}
			return this.__fdata;
		}
		this.getData = function(){
			return this.__data;
		}
		
		this.getRowData = function(index){
			return this.__data[index];
		}
		this.length = function(){
			if(!this.__data){
				return 0;
			}
			//return this.__length;
			return this.__data.length;
		}
		this.deleteRow = function(index){
			if (this.__data){
				this.__data[index]=undefined;
				var obj = this.o.body.find(".jxshell-grid-btr[index='"+index+"']");
				obj.remove();
				this.__length--;
				//alert(this.__length);
				if(this.__length==0){
					this.__clearData();
				}

				if (this.indexSelected == index){
					this.indexSelected =-1;
				}
			}
		}
		
		this.advancedFilter = function(value, filterFunction){
			var oe = this;
			this.__fdata=this.__data.filter(function(obj, index){
				if(filterFunction(obj, value)){
					var obj2 = oe.__rows[index];//oe.o.body.find(".jxshell-grid-btr[index='"+index+"']");
					obj2.show();
					return true;
				}
				else{
					var obj2 = oe.__rows[index];//oe.o.body.find(".jxshell-grid-btr[index='"+index+"']");
					obj2.hide();
					return false;
				}
			});
			
			
			if (this.__fdata.length==0){
				this.__shcleardata();
			}	
			else{
				this.o.body["container-info"].hide();
			}
		}
		this.unFilter = function(){
			this.__rows.forEach(function (obj){obj.show();});
			this.__fdata = this.__data;
		}
		
		this.exactFilter = function(value, colIndex){
			return this.filter(value, colIndex, function(obj, value){
				return obj==value;
			});
		} 
		this.ignorecaseFilter = function(value, colIndex){
			return this.filter(value, colIndex, function(obj, value){
				return obj.toLowerCase().substring(0,value.length)==value.toLowerCase();
			});
		}
		
		this.filter = function(value, colindex, filterFunction){
			
			if (!filterFunction){
				filterFunction = function(obj, value){
					return obj.substring(0,value.length)==value;
				}
			}
		
			var oe = this;
			if (this.__data){
				this.__fdata = this.__data.filter(function(obj, index){
					var d = obj[colindex];
					if(filterFunction(d	, value)){
						var obj = oe.__rows[index];//oe.o.body.find(".jxshell-grid-btr[index='"+index+"']");
						obj.show();
						return true;
					}
					else{
						var obj = oe.__rows[index];//oe.o.body.find(".jxshell-grid-btr[index='"+index+"']");
						obj.hide();
						return false;
					}
				});
				//alert(this.__fdata);
				if (this.__fdata.length==0){
					this.__shcleardata();
				}
				else{
					this.o.body["container-info"].hide();
				}
			}
		}
		
		
		var myThis=this;
		this.__onTrClick=function(){

			if(myThis.__disabled){
				return ;
			}

			var o= $(this);
			var table =o.data("jxshell-table");
			var index = o.attr("index");
			o.parent().find(".jxshell-grid-btr").removeClass("jxshell-selected");
			o.addClass("jxshell-selected");
			table.__onRowSelected(o, index);

			myThis.indexSelected = parseInt(index);
			//alert(index);
		}

		this.enabled = function(enabled){
			this.__disabled =!enabled;
		};

		this.__onRowSelected = function(obj, index){
			this.__index = index;
			if(this["___onRowSelected"]){
				for(i=0;i<this["___onRowSelected"].length;i++){
					this["___onRowSelected"][i](obj, index);	
				}
			}
		}
		this.onRowSelected = function(f){
			if(!this["___onRowSelected"]){
				this["___onRowSelected"] =[];
			}
			this.___onRowSelected.push(f);
		}
		
		this.defaultRenderFunction = function(value, td, coldef){
			if (coldef["renderFunction"]){
				var f=coldef["renderFunction"];
				return f(value, td);
			}
			if(value){
				td.text(this.transform(value));
				if (value){
					if(coldef['isHtml']){
						td.html(this.transform(value));
					}
				}
			}
			else{
				td.html("&nbsp;&nbsp;");		
			}
		}
		
		this.replaceData = function(value, index1, index2){
			var obj = this.o.body.find(".jxshell-grid-btr[index='"+index1+"']");
			var coldef = this.o["cols-definition"], f;
			var td;
			
			if(index2!==undefined){
				td = obj.find("td").eq(index2);
				this.__data[index1][index2] = value;
				this.defaultRenderFunction(value, td, coldef[index2]);
				return; 
			}
			else{
				var o=obj.find("td");
				var i, td;
				this.__data[index1] = value;
				for(i=0;i<o.length;i++){
					td = o.eq(i);
					this.defaultRenderFunction(value[i], td, coldef[i]);
				}
				
			}
		}
		
		this.index = function(){
			return this.__index;
		}
		this.find = function(value, colIndex){
			if(!this["__data"]){
				return [];
			}
			var art=[];
			return this.__find(value, colIndex, art);
			
		};

		this.findAndSelect = function(value, colIndex){
			var positions = this.find(value,colIndex);
			var o= this.o.body["container"];
			if(positions.length>0){
				var th = o.find(".jxshell-grid-btr[index="+ positions[0][0].toString()+"]");
				th.click();	
			}
			
		};

		this.__find = function(value, colIndex, art){
			this.__data.forEach(function(obj, index2){
				if(!obj){
					return;
				}
				obj.filter(function(obj, index){
					if(colIndex>=0 && index != colIndex){
						return false;
					}
					else if(obj==value){
						art.push([index2, index]);
					}
				});
			});
			return art;
		}
		
		
		
		this.clearData = function(){
			this.__fdata = undefined;
			this.o.body["x-length"]=0;
			this.__clearData();

		}
		this.__clearData = function(){
			this.__shcleardata();
			this.__length = 0;
			this.__data =[];
			this.o.body.html("");
			this.indexSelected = -1;
		}
		this.__shcleardata=function(){
			var o=this.o.body["container-info"];
			o.text("No hay registros"); 
			o.show();
		}
		
		this.applySuperStyles = function(){
			// Aplicar los estilos globales de jxshell-grid ...
			if(window.jxshell.grid.count>1){
			//	return;
			}
			var st;
			st = $("<div></div>");
			this.o.append(st);	
			st.html(
				"<style>.jxshell-grid-container{background:orange;border:solid 1px rgb(255,136,17);}"+
				".jxshell-grid-container.jxshell-body{background:none;border:solid 1px rgb(255,206,157);overflow:auto;}"+
				".jxshell-grid-container-info{font-size:12px;padding:4px;}"+
				".jxshell-grid.jxshell-body{padding-bottom:4px;}"+
				".jxshell-grid-btr{font-size:12px;border-bottom:solid 1px rgb(255,226,198);}"+
				".jxshell-grid-btd{padding:2px 0 2px 0;text-indent:4px;border-right:solid 1px rgb(255,206,157);word-break: break-all;}"+
				".jxshell-grid-btd.last{text-indent:4px;border:none;}"+
				".jxshell-grid-htr{color:white;font-size:13px;}"+
				".jxshell-grid-htd{padding:2px 0 2px 0;border-right:solid 1px rgb(255,136,17);text-align:center;word-break: break-all;}"+
				".jxshell-grid-htd.last{border-right:none;}"+
				".jxshell-grid-btr:hover{background:rgb(254,245,211)}"+
				".jxshell-grid-btr:active,.jxshell-grid-btr.jxshell-selected{background:rgb(253,236,166)}</style>"
			);	
		}
		
		
		var ob;
		window.jxshell.grid.count ++;
		this.id = "jxshell-grid-"+id;
		this.__init(id);
		var cols, table, th,tb,l, tr, td;
		cols = parameters.columns;
		th = $("<thead>");
		l=cols.length;
		tr=$("<tr class='jxshell-grid-htr'>");
		this.o['cols-definition']=[];
		this.o['cols-definition']=cols;
		for (i=0;i<l;i++){
			if (i==(l-1)){
				td=$("<td index='"+i+"' class='jxshell-grid-htd last'>");
			}
			else{
				td=$("<td index='"+i+"' class='jxshell-grid-htd'>");
			}
			if(cols[i].visible==false){
				td.hide();
			}
			if (cols[i]["onClick"]){
				td.click(cols[i]["onClick"]);
			}

			td.text(this.transform(cols[i].text));
			this.applyStyle(td,cols[i],true, i);
			tr.append(td);
			if (cols[i]["headerRenderFunction"]){
				cols[i]["headerRenderFunction"](td);
			}
		}
		th.append(tr);
		ob = $("<div class='jxshell-grid-container'>");
		this.applyStyle(ob, parameters, "containerh");
		table = $("<table borderspacing='0' cellspacing='0' class='jxshell-grid'>");
		table.append(th);
		ob.append(table);
		this.o.append(ob);
		this.o.header = th;
		
		if(!(parameters["table-layout"])){
			parameters["table-layout"]="fixed";
		}
		if(!(parameters["border-collapse"])){
			parameters["border-collapse"]="collapse";
		}
		this.applyStyle(table, parameters, "header");
		
		
		// Hasta acá ha llenado el encabezado solamente ...
		table = $("<table class='jxshell-grid jxshell-body'>");
		tbody = $("<tbody>");
		table.append(tbody);
		this.applyStyle(table, parameters,"content");
		ob = $("<div class='jxshell-grid-container jxshell-body'>");
		this.applyStyle(ob, parameters, "container");
		
		var ty;
		ty=$("<div class='jxshell-grid-container-info'>");
		
		
		ob.append(table);
		ob.append(ty);
		this.o.append(ob);
		this.o.body = tbody;
		this.o.body["x-length"]=0;
		this.o.body["container"]=ob;
		this.o.body["container-info"]=ty;
		if(parameters["data"]){
			this.addData(parameters["data"]);
		}
		else{
			this.clearData();
		}
		this.applySuperStyles()
		
	}
	window.jxshell.grid.count=0;
};

if(window.jxshell){
	f();
}
else{
	window.addEventListener('xapp-ready', f);
}