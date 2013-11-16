
using System;
using System.Linq;
using System.Data.Linq.Mapping;
using eCuRie;
using System.Collections.Generic;
using eCuRie.schema;
using DbLinq.Data.Linq;

namespace eCuRie{


	public class application{

		public static eCuRie.schema.database db=null;
		public static MySql.Data.MySqlClient.MySqlConnection conn;
		public static bool ocupado;

		static application(){
			createConnection();
			createDatabase();
		}

		static void createConnection(){
			conn = new MySql.Data.MySqlClient.MySqlConnection("Server=localhost;Database=ecurie;Uid=root;Pwd=496712;");
			conn.Open();
		}



		static schema.database createDatabase(){
			if(db!=null){
				db.Dispose();
			}
			db=new database(conn);
			db.xconnection = conn;
			schema.database.db = db;
			return db;
		}

		static schema.database createNewConnection(){
			MySql.Data.MySqlClient.MySqlConnection conn = new MySql.Data.MySqlClient.MySqlConnection("Server=localhost;Database=ecurie;Uid=root;Pwd=496712;");
			conn.Open();
			schema.database db = new database(conn);
			db.xconnection = conn;
			return db;
		}

		public static schema.database verificarConexion(){
			if(ocupado){
				return createNewConnection();
			}

			ocupado=true;
			return db;
		}

		public static void cerrarConexion(schema.database dbX){
			if(db==dbX){
				ocupado=false;
			}
			else{
				dbX.xconnection.Close(); // Cierra la conexión ...
				dbX.Dispose();
			}
		}

		public static void cargarTiposDeIdentificacion(jxshell.webapp.response response){
			IEnumerable<schema.tipoidentificacion> tipos = db.ExecuteQuery<schema.tipoidentificacion>("select * FROM tipoidentificacion;");
			List<schema.tipoidentificacion> lu = tipos.ToList();
			response.setData(lu.ToArray());
		}


		public class productos{

			public static void modificarProducto(string producto, jxshell.webapp.response response){
				schema.database db = verificarConexion();

				try{
					schema.producto p = (schema.producto)Newtonsoft.Json.JsonConvert.DeserializeObject(producto, typeof(schema.producto));

					IQueryable<schema.producto> productoL = from u in db.productos
						where u.idproducto == p.idproducto select u; 

					List<schema.producto> prodx = productoL.ToList();
					if(prodx.Count==0){
						throw new Exception("No se encontró el producto con el id especificado.");
					}

					prodx[0].nombre = p.nombre;
					prodx[0].codigo = p.codigo;
					prodx[0].descripcion = p.descripcion;
					prodx[0].costo = p.costo;
					prodx[0].imagen = p.imagen;
					prodx[0].porcentajeutilidad = p.porcentajeutilidad;
					prodx[0].precio = p.precio;
					
					//System.Windows.Forms.MessageBox.Show("Guardando");

					// Registra el monitoreo ...
					schema.monitoreo mon = new schema.monitoreo("productos", p.idproducto, p.idsesion, "MODIFICAR");
					db.monitoreo.InsertOnSubmit(mon);

					db.SubmitChanges();
					response.setData(p.idproducto);
				}
				catch(Exception e){
					createDatabase();
					cerrarConexion(db);
					throw e;
				}

				cerrarConexion(db); // Cierra la conexión creada en el mismo hilo ..
			}

			public static void cargarProductos(jxshell.webapp.response response, int page, int cantidad, string order){
				
				schema.database db = verificarConexion();
				try{

					db.GetTable<schema.conteos>();
					IEnumerable<schema.conteos> conteoS = db.ExecuteQuery<schema.conteos>("select count(*) as conteo from productos;");
					if(page==0){
						page=1;
					}

					int conteo = conteoS.SingleOrDefault().conteo;
					float pages = conteo / cantidad ;
					if(pages != ((int)pages)){
						pages = ((int)pages)+1;
					}

					int initial = ((page-1)*cantidad);
					int final = (page*cantidad);
					if(order!=""){
						order=" order by " + order + " ";
					}
					string query= "select * from productos "+
						order +"limit "+initial.ToString()+
						", " + cantidad.ToString();

					IEnumerable<schema.producto> prods = db.ExecuteQuery<schema.producto>(query);

					List<schema.producto> lis= prods.ToList();
					List<object> lisResponse = new List<object>();

					for(int i=0;i<lis.Count;i++){
						lisResponse.Add(new object[]{lis[i].codigo, lis[i].nombre, lis[i].descripcion,
								lis[i].costo, lis[i].precio, lis[i].existencia, lis[i].porcentajeutilidad,
								lis[i].idproducto, lis[i].imagen});
					}
					response.setData(new {data=lisResponse, count=conteo});

				}
				catch(Exception e){
					createDatabase();
					cerrarConexion(db);
					throw e;
				}

				cerrarConexion(db);
			}

			public static void guardarProducto(string producto, jxshell.webapp.response response){

				schema.database db= verificarConexion();
				schema.monitoreo mon=null;
				schema.producto e =null;
				try{
					e= (schema.producto)Newtonsoft.Json.JsonConvert.DeserializeObject(producto, typeof(schema.producto));
					db.productos.InsertOnSubmit(e);
					e.idproducto = jxshell.environment.uniqueId();

					

					// Registra el monitoreo ...
					mon= new schema.monitoreo("productos", e.idproducto, e.idsesion, "NUEVO");
					db.monitoreo.InsertOnSubmit(mon);
					db.SubmitChanges();
					response.setData(e.idproducto);
				}
				catch(Exception ex){
					createDatabase();
					cerrarConexion(db);
					throw ex;
				}
				cerrarConexion(db);

			}

		}

		public class clientes{

			public static void modificarCliente(string cliente, jxshell.webapp.response response){
				schema.database db = verificarConexion();

				try{
					schema.cliente ux = (schema.cliente)Newtonsoft.Json.JsonConvert.DeserializeObject(cliente, typeof(schema.cliente));

					IQueryable<schema.cliente> usuariosL = from u in db.clientes
						where u.idcliente == ux.idcliente select u; 

					List<schema.cliente> usus = usuariosL.ToList();
					if(usus.Count==0){
						throw new Exception("No se encontró el cliente con el id especificado.");
					}

					usus[0].nombre1 = ux.nombre1;
					usus[0].nombre2 = ux.nombre2;
					usus[0].apellido1 = ux.apellido1;
					usus[0].apellido2 = ux.apellido2;
					usus[0].imagen = ux.imagen;
					usus[0].direccion = ux.direccion;
					usus[0].telefono = ux.telefono;
					usus[0].identificacion = ux.identificacion;
					usus[0].tipoidentificacion = ux.tipoidentificacion;
					usus[0].codigo = ux.codigo;



					// Registra el monitoreo ...
					schema.monitoreo mon = new schema.monitoreo("clientes", ux.idcliente, ux.idsesion, "MODIFICAR");
					db.monitoreo.InsertOnSubmit(mon);

					db.SubmitChanges();
					response.setData(ux.idcliente);
				}
				catch(Exception e){
					createDatabase();
					cerrarConexion(db);
					throw e;
				}

				cerrarConexion(db); // Cierra la conexión creada en el mismo hilo ..
			}

			public static void cargarClientes(jxshell.webapp.response response, int page, int cantidad, string order){
				
				schema.database db = verificarConexion();
				try{

					db.GetTable<schema.conteos>();
					IEnumerable<schema.conteos> conteoS = db.ExecuteQuery<schema.conteos>("select count(*) as conteo from clientes;");
					if(page==0){
						page=1;
					}

					int conteo = conteoS.SingleOrDefault().conteo;
					float pages = conteo / cantidad ;
					if(pages != ((int)pages)){
						pages = ((int)pages)+1;
					}

					int initial = ((page-1)*cantidad);
					int final = (page*cantidad);
					if(order!=""){
						order=" order by " + order + " ";
					}
					string query= "select t.id, t.idcliente, t.codigo, t.identificacion, t.tipoidentificacion, te.nombre as ntipoidentificacion, "+
						"t.nombre1, t.nombre2, t.apellido1, t.apellido2, t.direccion, t.idsesion, "+
						"t.imagen, t.telefono, m.fecha as fechacreado, u.nombre as creadopor "+
						"from clientes t "+
						"left join tipoidentificacion te on te.codigo = t.tipoidentificacion "+
						"left join monitoreo m on m.idregistroafectado = t.idcliente "+
						"left join sesiones s on s.idsesion = m.idsesion "+
						"left join usuarios u on u.idusuario = s.idusuario "+
						"where m.accion = 'NUEVO' "+
						order +"limit "+initial.ToString()+
						", " + cantidad.ToString();

					IEnumerable<schema.queryedCliente> clientes = db.ExecuteQuery<schema.queryedCliente>(query);

					List<schema.queryedCliente> lis= clientes.ToList();
					List<object> lisResponse = new List<object>();

					for(int i=0;i<lis.Count;i++){
						lisResponse.Add(new object[]{lis[i].codigo, lis[i].identificacion, lis[i].obtenerNombre(), lis[i].direccion, 
							lis[i].telefono, lis[i].idcliente, lis[i].idsesion, lis[i].nombre1, lis[i].nombre2,
							lis[i].apellido1, lis[i].apellido2, lis[i].imagen, lis[i].tipoidentificacion, lis[i].ntipoidentificacion,
							lis[i].fechacreado, lis[i].creadopor});
					}
					response.setData(new {data=lisResponse, count=conteo});

				}
				catch(Exception e){
					createDatabase();
					cerrarConexion(db);
					throw e;
				}

				cerrarConexion(db);
			}

			public static void guardarCliente(string cliente, jxshell.webapp.response response){

				schema.database db = verificarConexion();

				schema.monitoreo mon=null;
				schema.cliente e =null;
				try{
					e= (schema.cliente)Newtonsoft.Json.JsonConvert.DeserializeObject(cliente, typeof(schema.cliente));
					db.clientes.InsertOnSubmit(e);
					e.idcliente = jxshell.environment.uniqueId();

					

					// Registra el monitoreo ...
					mon= new schema.monitoreo("clientes", e.idcliente, e.idsesion, "NUEVO");
					db.monitoreo.InsertOnSubmit(mon);
					db.SubmitChanges();
					response.setData(e.idcliente);
				}
				catch(Exception ex){
					createDatabase();
					cerrarConexion(db);
					throw ex;
				}

				cerrarConexion(db);
			}
		}

		public class usuarios{

			public static schema.usuarios usuario = null;
			public static schema.sesion sesion = null;


			public static void finalizarSesion(	){
				if(sesion!=null){
					//System.Windows.Forms.MessageBox.Show("en sesion ");
					schema.database db = verificarConexion();
					try{

						string ise = sesion.idsesion;
						IQueryable<schema.sesion> ses = from s in db.sesiones
							where s.idsesion == ise select s; 

						
						List<schema.sesion> li = ses.ToList();
						sesion.fin = db.now(); // Fecha de finalización
						db.SubmitChanges();
						
					}
					catch(Exception e){
						//System.Windows.Forms.MessageBox.Show(e.ToString());	
					}

					cerrarConexion(db);

					
				}
				System.Windows.Forms.Application.Exit();
			}

			public static void guardarUsuario(string user, jxshell.webapp.response response){
				//System.Windows.Forms.MessageBox.Show(user);

				try{
					schema.usuarios u = (schema.usuarios)Newtonsoft.Json.JsonConvert.DeserializeObject(user, typeof(schema.usuarios));
					db.usuarios.InsertOnSubmit(u);
					u.idusuario = jxshell.environment.uniqueId();

					// Registra el monitoreo ...
					schema.monitoreo mon = new schema.monitoreo("usuarios", u.idusuario, u.idsesion, "NUEVO");
					db.monitoreo.InsertOnSubmit(mon);
				
					db.SubmitChanges();
					response.setData(u.idusuario);
				}
				catch(Exception e){
					createDatabase();
					throw e;
				}
				
			}

			public static void modificarUsuario(string user, jxshell.webapp.response response){
				schema.database db = verificarConexion();
				try{
					schema.usuarios ux = (schema.usuarios)Newtonsoft.Json.JsonConvert.DeserializeObject(user, typeof(schema.usuarios));

					IQueryable<schema.usuarios> usuariosL = from u in db.usuarios
						where u.idusuario == ux.idusuario select u; 

					List<schema.usuarios> usus = usuariosL.ToList();
					if(usus.Count==0){
						throw new Exception("No se encontró el usuario con el id especificado.");
					}

					usus[0].nombre = ux.nombre;
					usus[0].imagen = ux.imagen;
					usus[0].administrador = ux.administrador;
					usus[0].contraseña = ux.contraseña;

					// Registra el monitoreo ...
					schema.monitoreo mon = new schema.monitoreo("usuarios", ux.idusuario, ux.idsesion, "MODIFICAR");
					db.monitoreo.InsertOnSubmit(mon);

					db.SubmitChanges();
					response.setData(ux.idusuario);
				}
				catch(Exception e){
					createDatabase();
					cerrarConexion(db);
					throw e;
				}
				cerrarConexion(db);
			}

			public static void iniciarSesion(jxshell.webapp.response response){
				response.setData(new {sesion=sesion, usuario=usuario});
			}


			public static void cargarUsuarios(jxshell.webapp.response response){
				/*IQueryable<schema.usuarios> usuariosL = from u in application.db.usuarios
					select u; */

				schema.database db = verificarConexion();
				try{
					//application.db.GetTable<schema.queryedUsuarios>();
					IEnumerable<schema.queryedUsuarios> usuariosL = db.ExecuteQuery<schema.queryedUsuarios>(
						"select u.id, u.idusuario, u.nombre, u.contraseña as contrasena, u.administrador, u.idsesion, u.imagen "+
						", se.idusuario as idusuariocreador, u2.nombre as usuariocreador, s.fecha as fechacreado "+
						"from usuarios u "+
						"left join monitoreo s on s.idregistroafectado = u.idusuario and s.accion ='NUEVO' "+
						"LEFT JOIN sesiones se on se.idsesion = s.idsesion "+
						"left join usuarios u2 on u2.idusuario = se.idusuario;");


					List<schema.queryedUsuarios> un= usuariosL.ToList();
					List<object> usuariosResponse = new List<object>();

					for(int i=0;i<un.Count;i++){
						usuariosResponse.Add(new object[]{un[i].imagen, un[i].nombre, un[i].usuariocreador, 
							un[i].fechacreado, un[i].administrador,  false, un[i].idusuario, un[i].contrasena});
					}
					response.setData(usuariosResponse);
				}
				catch(Exception e){
					cerrarConexion(db);
					throw e;
				}			

				cerrarConexion(db);	
			}

			public static object iniciarSesion(string usuario, string contraseña){
				schema.database db = verificarConexion();
				try{
					IQueryable<schema.usuarios> usuariosL = from u in db.usuarios
						where (u.nombre == usuario && u.contraseña == contraseña)
						select u; 

					List<schema.usuarios> un= usuariosL.ToList();
					if(un.Count==0){
						schema.usuarios ux = new schema.usuarios();
						ux.error = new Exception("El usuario o contraseña son incorrectos");
						return ux;
					}
					else{

						try{
							schema.usuarios ux = un[0];
							ux.ok=true;

							// Inserta un registro de sesión ...
							sesion ses = new schema.sesion(true);
							ses.idusuario = ux.idusuario;
							
							db.sesiones.InsertOnSubmit(ses);
							db.SubmitChanges();
							db.sesiones.Attach(ses);	
							sesion=ses;
							usuarios.usuario = usuariosL.Single(ui=> ui.idusuario==ux.idusuario);
							return ux;
						}
						catch(Exception e){
							createDatabase();
							throw e;
						}
						
					}
				}
				catch(Exception e){
					cerrarConexion(db);
					throw e;
				}
				cerrarConexion(db);
			}



		}
	}

	/*namespace schema{
		public partial class database: DataContext{

			public DateTime now(){
				MySql.Data.MySqlClient.MySqlCommand c= new MySql.Data.MySqlClient.MySqlCommand("select now() as fecha;", xconnection);
				MySql.Data.MySqlClient.MySqlDataReader r = c.ExecuteReader();
				r.Read();
				DateTime d= r.GetDateTime(0);
				r.Close();
				return d;
			}
		}
	}*/
}
