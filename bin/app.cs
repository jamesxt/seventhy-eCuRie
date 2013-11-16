using System.Windows.Forms;
using System;
using System.Collections.Generic;

class program{
	public static void main(){
		string s= jxshell.environment.application.getAbsolutePath("../page/index.html").AbsoluteUri;

		//MessageBox.Show(s);
		jxshell.webapp.app web = new jxshell.webapp.app(s);
		web.setType(typeof(_myWebApp));
		web.run();
		
	}   
}

public class _myWebApp:jxshell.webapp.appInterface{

	public _myWebApp() {
	}

	public void onRequest(jxshell.webapp.request request, jxshell.webapp.response response){
		
		try{
			if(request.requestString.Substring(0,7)=="Append:"){
				string s = request.requestString.Substring(7);
				System.Text.StringBuilder sb=new System.Text.StringBuilder();
				for(int i=0;i<800;i++){
					sb.Append(s);
				}
				response.setData(sb.ToString());
			}
			else if(request.requestString.Substring(0,13)=="saveusuarios?"){
				string s = request.requestString.Substring(13);
				eCuRie.application.usuarios.guardarUsuario(s, response);
			}
			else if(request.requestString.Substring(0,11)=="saveclient?"){
				//MessageBox.Show("Guardar");
				string s = request.requestString.Substring(11);
				eCuRie.application.clientes.guardarCliente(s, response);
			}
			else if(request.requestString.Substring(0,12)=="saveproduct?"){
				//MessageBox.Show("Guardar");
				string s = request.requestString.Substring(12);
				eCuRie.application.productos.guardarProducto(s, response);
			}

			else if(request.requestString.Substring(0,13)=="editusuarios?"){
				string s = request.requestString.Substring(13);
				eCuRie.application.usuarios.modificarUsuario(s, response);
			}
			else if(request.requestString.Substring(0,13)=="editclientes?"){
				string s = request.requestString.Substring(13);
				eCuRie.application.clientes.modificarCliente(s, response);
			}
			else if(request.requestString.Substring(0,12)=="editproduct?"){
				string s = request.requestString.Substring(12);
				eCuRie.application.productos.modificarProducto(s, response);
			}
			else if(request.requestString.Substring(0,9)=="usuarios?"){
				string s = request.requestString.Substring(9);
				string[] usuario = (string[])Newtonsoft.Json.JsonConvert.DeserializeObject(s,typeof(string[]));
				var o = eCuRie.application.usuarios.iniciarSesion(usuario[0], usuario[1]);
				response.setData(o);
			}
			else if(request.requestString=="finalizarSesion"){
				eCuRie.application.usuarios.finalizarSesion();
			}
			else if(request.requestString=="iniciarSesion"){
				eCuRie.application.usuarios.iniciarSesion(response);
			}
			else if(request.requestString.Substring(0,13)=="queryusuarios"){
				eCuRie.application.usuarios.cargarUsuarios(response);
			}
			else if(request.requestString=="cargarTiposDeIdentificacion"){
				eCuRie.application.cargarTiposDeIdentificacion(response);
			}
			else if(request.requestString.Substring(0,14)=="queryclientes?"){
				string s = request.requestString.Substring(14);
				
				List<object> parameters = (List<object>)Newtonsoft.Json.JsonConvert.DeserializeObject(s,typeof(List<object>));
				eCuRie.application.clientes.cargarClientes(response,Convert.ToInt32(parameters[0]), 20, (string)(parameters[1]));	
			}
			else if(request.requestString.Substring(0,14)=="queryproducts?"){				
				string s = request.requestString.Substring(14);
				
				List<object> parameters = (List<object>)Newtonsoft.Json.JsonConvert.DeserializeObject(s,typeof(List<object>));
				eCuRie.application.productos.cargarProductos(response,Convert.ToInt32(parameters[0]), 20, (string)(parameters[1]));	
			}
		}
		catch(Exception e){
			response.setError(e);
		}
	}
	public void onAborted(jxshell.webapp.request request){
		//MessageBox.Show("Procedimiento abortado");
	}
	public void onSuspend(jxshell.webapp.request request){
		System.Console.WriteLine(request.id);
	}
	public void onResumed(jxshell.webapp.request request){
		System.Console.WriteLine(request.id);
	}

}

