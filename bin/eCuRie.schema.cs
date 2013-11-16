#region Auto-generated classes for ecurie database on 2013-10-16 10:14:01Z

//
//  ____  _     __  __      _        _
// |  _ \| |__ |  \/  | ___| |_ __ _| |
// | | | | '_ \| |\/| |/ _ \ __/ _` | |
// | |_| | |_) | |  | |  __/ || (_| | |
// |____/|_.__/|_|  |_|\___|\__\__,_|_|
//
// Auto-generated from ecurie on 2013-10-16 10:14:01Z
// Please visit http://linq.to/db for more information

#endregion

using System;
using System.Data;
using System.Data.Linq.Mapping;
using System.Diagnostics;
using System.Reflection;
using DbLinq.Data.Linq;
using DbLinq.Vendor;
using System.ComponentModel;


namespace eCuRie.schema{
	public partial class database : DataContext
	{
		public static database db = null;

		public MySql.Data.MySqlClient.MySqlConnection xconnection=null;
		public DateTime now(){
			MySql.Data.MySqlClient.MySqlCommand c= new MySql.Data.MySqlClient.MySqlCommand("select now() as fecha;", xconnection);
			MySql.Data.MySqlClient.MySqlDataReader r = c.ExecuteReader();
			r.Read();
			DateTime d= r.GetDateTime(0);
			r.Close();
			return d;
		}


		public database(IDbConnection connection)
		: base(connection, new DbLinq.MySql.MySqlVendor())
		{
		}

		public database(IDbConnection connection, IVendor vendor)
		: base(connection, vendor)
		{
		}

		public Table<cliente> clientes { get { return GetTable<cliente>(); } }
		public Table<informacionextra> informacionextras { get { return GetTable<informacionextra>(); } }
		public Table<monitoreo> monitoreo { get { return GetTable<monitoreo>(); } }
		public Table<sesion> sesiones { get { return GetTable<sesion>(); } }
		public Table<usuarios> usuarios { get { return GetTable<usuarios>(); } }
		public Table<producto> productos { get { return GetTable<producto>(); } }
		public Table<tipoidentificacion> tipoidentificacion { get { return GetTable<tipoidentificacion>(); } }
		

	}

	[Table(Name="ecurie.productos")]
	public partial class producto :INotifyPropertyChanged{
		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}


		private string idproducto_="";
		private string idsesion_="";
		private string codigo_="";
		private string nombre_="";
		private string descripcion_="";
		private decimal? costo_=0;
		private decimal? porcentajeutilidad_=0;
		private decimal? precio_=0;
		private decimal? id_=0;
		private string tipoproducto_="";
		private decimal? existencia_=0;
		private string bodega_="";
		private string linea_="";
		private string imagen_="";

		[Column(Storage = "idproducto_", Name = "idproducto", IsPrimaryKey=true)]
		public string idproducto{
			get{return idproducto_;}
			set{
				if(idproducto_!=value){
					idproducto_=value;
					OnPropertyChanged("idproducto");
				}
			}
		}

		[Column(Storage = "idsesion_", Name = "idsesion")]
		public string idsesion{
			get{return idsesion_;}
			set{
				if(idsesion_!=value){
					idsesion_=value;
					OnPropertyChanged("idsesion");
				}
			}
		}

		[Column(Storage = "codigo_", Name = "codigo")]
		public string codigo{
			get{return codigo_;}
			set{
				if(codigo_!=value){
					codigo_=value;
					OnPropertyChanged("codigo");
				}
			}
		}

		[Column(Storage = "nombre_", Name = "nombre")]
		public string nombre{
			get{return nombre_;}
			set{
				if(nombre_!=value){
					nombre_=value;
					OnPropertyChanged("nombre");
				}
			}
		}

		[Column(Storage = "descripcion_", Name = "descripcion")]
		public string descripcion{
			get{return descripcion_;}
			set{
				//if(descripcion_!=value){
					descripcion_=value;
					OnPropertyChanged("descripcion");
				//}
			}
		}

		[Column(Storage = "costo_", Name = "costo")]
		public decimal? costo{
			get{return costo_;}
			set{
				if(costo_!=value){
					costo_=value;
					OnPropertyChanged("costo");
				}
			}
		}

		[Column(Storage = "porcentajeutilidad_", Name = "porcentajeutilidad")]
		public decimal? porcentajeutilidad{
			get{return porcentajeutilidad_;}
			set{
				if(porcentajeutilidad_!=value){
					porcentajeutilidad_=value;
					OnPropertyChanged("porcentajeutilidad");
				}
			}
		}

		[Column(Storage = "precio_", Name = "precio")]
		public decimal? precio{
			get{return precio_;}
			set{
				if(precio_!=value){
					precio_=value;
					OnPropertyChanged("precio");
				}
			}
		}

		[Column(Storage = "id_", Name = "id")]
		public decimal? id{
			get{return id_;}
			set{
				if(id_!=value){
					id_=value;
					OnPropertyChanged("id");
				}
			}
		}

		[Column(Storage = "existencia_", Name = "existencia")]
		public decimal? existencia{
			get{return existencia_;}
			set{
				if(existencia_!=value){
					existencia_=value;
					OnPropertyChanged("existencia");
				}
			}
		}

		[Column(Storage = "tipoproducto_", Name = "tipoproducto")]
		public string tipoproducto{
			get{return tipoproducto_;}
			set{
				if(tipoproducto_!=value){
					tipoproducto_=value;
					OnPropertyChanged("tipoproducto");
				}
			}
		}

		[Column(Storage = "bodega_", Name = "bodega")]
		public string bodega{
			get{return bodega_;}
			set{
				if(bodega_!=value){
					bodega_=value;
					OnPropertyChanged("bodega");
				}
			}
		}

		[Column(Storage = "linea_", Name = "linea")]
		public string linea{
			get{return linea_;}
			set{
				if(linea_!=value){
					linea_=value;
					OnPropertyChanged("linea");
				}
			}
		}

		[Column(Storage = "imagen_", Name = "imagen")]
		public string imagen{
			get{return imagen_;}
			set{
				if(imagen_!=value){
					imagen_=value;
					OnPropertyChanged("imagen");
				}
			}
		}





	} 

	[Table(Name = "ecurie.clientes")]
	public partial class cliente : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged handling

		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}

		public string obtenerNombre(){
			System.Text.StringBuilder s=new System.Text.StringBuilder();
			if(nombre1!=""){
				s.Append(nombre1).Append(" ");
			}
			if(nombre2!=""){
				s.Append(nombre2).Append(" ");
			}
			if(apellido1!=""){
				s.Append(apellido1).Append(" ");
			}
			if(apellido2!=""){
				s.Append(apellido2).Append(" ");
			}
			return s.ToString().Trim();
		}

		#endregion


		private string telefono_;
		[Column(Storage = "telefono_", Name = "telefono", DbType = "varchar(254)")]
		public string telefono{
			get{
				return telefono_;
			}
			set{
				if (value != telefono_)
				{
					telefono_ = value;
					OnPropertyChanged("telefono");
				}
			}
		}

		#region string ApeLLido1

		private string _apeLlIdo1;
		[DebuggerNonUserCode]
		[Column(Storage = "_apeLlIdo1", Name = "apellido1", DbType = "varchar(200)")]
		public string apellido1
		{
			get
			{
				return _apeLlIdo1;
			}
			set
			{
				if (value != _apeLlIdo1)
				{
					_apeLlIdo1 = value;
					OnPropertyChanged("apellido1");
				}
			}
		}

		#endregion

		#region string ApeLLido2

		private string _apeLlIdo2;
		[DebuggerNonUserCode]
		[Column(Storage = "_apeLlIdo2", Name = "apellido2", DbType = "varchar(200)")]
		public string apellido2
		{
			get
			{
				return _apeLlIdo2;
			}
			set
			{
				if (value != _apeLlIdo2)
				{
					_apeLlIdo2 = value;
					OnPropertyChanged("apellido2");
				}
			}
		}

		#endregion

		#region string CodIGo

		private string _codIgO;
		[DebuggerNonUserCode]
		[Column(Storage = "_codIgO", Name = "codigo", DbType = "varchar(10)", IsPrimaryKey = true, CanBeNull = true)]
		public string codigo
		{
			get
			{
				return _codIgO;
			}
			set
			{
				if (value != _codIgO)
				{
					_codIgO = value;
					OnPropertyChanged("codigo");
				}
			}
		}

		#endregion

		#region string DireCcIon

		private string _direCcIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_direCcIon", Name = "direccion", DbType = "varchar(254)")]
		public string direccion
		{
			get
			{
				return _direCcIon;
			}
			set
			{
				if (value != _direCcIon)
				{
					_direCcIon = value;
					OnPropertyChanged("direccion");
				}
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int id
		{
			get
			{
				return _id;
			}
			set
			{
				if (value != _id)
				{
					_id = value;
					OnPropertyChanged("id");
				}
			}
		}

		#endregion

		#region string IDClientE

		private string _idcLientE;
		[DebuggerNonUserCode]
		[Column(Storage = "_idcLientE", Name = "idcliente", DbType = "varchar(20)", IsPrimaryKey = true, CanBeNull = false)]
		public string idcliente
		{
			get
			{
				return _idcLientE;
			}
			set
			{
				if (value != _idcLientE)
				{
					_idcLientE = value;
					OnPropertyChanged("idcliente");
				}
			}
		}

		#endregion

		#region string IDentIfIcaCIon

		private string _idEntIfIcaCiOn;
		[DebuggerNonUserCode]
		[Column(Storage = "_idEntIfIcaCiOn", Name = "identificacion", DbType = "varchar(20)")]
		public string identificacion
		{
			get
			{
				return _idEntIfIcaCiOn;
			}
			set
			{
				if (value != _idEntIfIcaCiOn)
				{
					_idEntIfIcaCiOn = value;
					OnPropertyChanged("identificacion");
				}
			}
		}

		#endregion

		private string imagen_;
		[Column(Storage = "imagen_", Name = "imagen", DbType = "longtext")]
		public string imagen{
			get{
				return imagen_;
			}
			set{
				if (value != imagen_)
				{
					imagen_ = value;
					OnPropertyChanged("imagen");
				}
			}
		}


		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string idsesion
		{
			get
			{
				return _idseSIon;
			}
			set
			{
				if (value != _idseSIon)
				{
					_idseSIon = value;
					OnPropertyChanged("idsesion");
				}
			}
		}

		#endregion

		#region string NoMbRe1

		private string _noMbRe1;
		[DebuggerNonUserCode]
		[Column(Storage = "_noMbRe1", Name = "nombre1", DbType = "varchar(200)")]
		public string nombre1
		{
			get
			{
				return _noMbRe1;
			}
			set
			{
				if (value != _noMbRe1)
				{
					_noMbRe1 = value;
					OnPropertyChanged("nombre1");
				}
			}
		}

		#endregion

		#region string NoMbRe2

		private string _noMbRe2;
		[DebuggerNonUserCode]
		[Column(Storage = "_noMbRe2", Name = "nombre2", DbType = "varchar(200)")]
		public string nombre2
		{
			get
			{
				return _noMbRe2;
			}
			set
			{
				if (value != _noMbRe2)
				{
					_noMbRe2 = value;
					OnPropertyChanged("nombre2");
				}
			}
		}

		#endregion

		#region string TipOIDentIfIcaCIon

		private string _tipOidEntIfIcaCiOn;
		[DebuggerNonUserCode]
		[Column(Storage = "_tipOidEntIfIcaCiOn", Name = "tipoidentificacion", DbType = "varchar(20)")]
		public string tipoidentificacion
		{
			get
			{
				return _tipOidEntIfIcaCiOn;
			}
			set
			{
				if (value != _tipOidEntIfIcaCiOn)
				{
					_tipOidEntIfIcaCiOn = value;
					OnPropertyChanged("tipoidentificacion");
				}
			}
		}

		#endregion

		#region ctor

		public cliente()
		{
		}

		#endregion

	}

	[Table]
	public partial class conteos{
		[Column(Name="conteo")]
		public int conteo{
			get;
			set;
		}
	}

	[Table(Name = "ecurie.informacionextra")]
	public partial class informacionextra : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged handling

		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int id
		{
			get
			{
				return _id;
			}
			set
			{
				if (value != _id)
				{
					_id = value;
					OnPropertyChanged("id");
				}
			}
		}

		#endregion

		#region string IDInFormAcIon

		private string _idiNFormAcIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idiNFormAcIon", Name = "idinformacion", DbType = "varchar(20)", IsPrimaryKey = true, CanBeNull = false)]
		public string idinformacion
		{
			get
			{
				return _idiNFormAcIon;
			}
			set
			{
				if (value != _idiNFormAcIon)
				{
					_idiNFormAcIon = value;
					OnPropertyChanged("idinformacion");
				}
			}
		}

		#endregion

		#region string IDRegisTRO

		private string _idrEgisTro;
		[DebuggerNonUserCode]
		[Column(Storage = "_idrEgisTro", Name = "idregistro", DbType = "varchar(45)")]
		public string idregistro
		{
			get
			{
				return _idrEgisTro;
			}
			set
			{
				if (value != _idrEgisTro)
				{
					_idrEgisTro = value;
					OnPropertyChanged("idregistro");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string idsesion
		{
			get
			{
				return _idseSIon;
			}
			set
			{
				if (value != _idseSIon)
				{
					_idseSIon = value;
					OnPropertyChanged("idsesion");
				}
			}
		}

		#endregion

		#region string TipOdAtO

		private string _tipOdAtO;
		[DebuggerNonUserCode]
		[Column(Storage = "_tipOdAtO", Name = "tipodato", DbType = "varchar(20)")]
		public string tipodato
		{
			get
			{
				return _tipOdAtO;
			}
			set
			{
				if (value != _tipOdAtO)
				{
					_tipOdAtO = value;
					OnPropertyChanged("tipodato");
				}
			}
		}

		#endregion

		#region string TitUlO

		private string _titUlO;
		[DebuggerNonUserCode]
		[Column(Storage = "_titUlO", Name = "titulo", DbType = "varchar(45)")]
		public string titulo
		{
			get
			{
				return _titUlO;
			}
			set
			{
				if (value != _titUlO)
				{
					_titUlO = value;
					OnPropertyChanged("titulo");
				}
			}
		}

		#endregion

		#region string Valor

		private string _valor;
		[DebuggerNonUserCode]
		[Column(Storage = "_valor", Name = "valor", DbType = "varchar(4000)")]
		public string valor
		{
			get
			{
				return _valor;
			}
			set
			{
				if (value != _valor)
				{
					_valor = value;
					OnPropertyChanged("valor");
				}
			}
		}

		#endregion

		#region ctor

		public informacionextra()
		{
		}

		#endregion

	}

	[Table(Name = "ecurie.monitoreo")]
	public partial class monitoreo : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged handling

		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}

		#endregion

		#region string accion

		private string _acCiOn;
		[DebuggerNonUserCode]
		[Column(Storage = "_acCiOn", Name = "accion", DbType = "varchar(45)")]
		public string accion
		{
			get
			{
				return _acCiOn;
			}
			set
			{
				if (value != _acCiOn)
				{
					_acCiOn = value;
					OnPropertyChanged("accion");
				}
			}
		}

		#endregion

		#region DateTime? FeCHa

		private DateTime? _feChA;
		[DebuggerNonUserCode]
		[Column(Storage = "_feChA", Name = "fecha", DbType = "datetime")]
		public DateTime? fecha
		{
			get
			{
				return _feChA;
			}
			set
			{
				if (value != _feChA)
				{
					_feChA = value;
					OnPropertyChanged("fecha");
				}
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int id
		{
			get
			{
				return _id;
			}
			set
			{
				if (value != _id)
				{
					_id = value;
					OnPropertyChanged("id");
				}
			}
		}

		#endregion

		#region string IDMonitorEO

		private string _idmOnitorEo;
		[DebuggerNonUserCode]
		[Column(Storage = "_idmOnitorEo", Name = "idmonitoreo", DbType = "varchar(45)", IsPrimaryKey = true, CanBeNull = false)]
		public string idmonitoreo
		{
			get
			{
				return _idmOnitorEo;
			}
			set
			{
				if (value != _idmOnitorEo)
				{
					_idmOnitorEo = value;
					OnPropertyChanged("idmonitoreo");
				}
			}
		}

		#endregion

		#region string IDRegisTROafEcTadO

		private string _idrEgisTroAfEcTadO;
		[DebuggerNonUserCode]
		[Column(Storage = "_idrEgisTroAfEcTadO", Name = "idregistroafectado", DbType = "varchar(45)")]
		public string idregistroafectado
		{
			get
			{
				return _idrEgisTroAfEcTadO;
			}
			set
			{
				if (value != _idrEgisTroAfEcTadO)
				{
					_idrEgisTroAfEcTadO = value;
					OnPropertyChanged("idregistroafectado");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string idsesion
		{
			get
			{
				return _idseSIon;
			}
			set
			{
				if (value != _idseSIon)
				{
					_idseSIon = value;
					OnPropertyChanged("idsesion");
				}
			}
		}

		#endregion

		#region string TablaAfEcTadA

		private string _tablaAfEcTadA;
		[DebuggerNonUserCode]
		[Column(Storage = "_tablaAfEcTadA", Name = "tablaafectada", DbType = "varchar(200)")]
		public string tablaafectada
		{
			get
			{
				return _tablaAfEcTadA;
			}
			set
			{
				if (value != _tablaAfEcTadA)
				{
					_tablaAfEcTadA = value;
					OnPropertyChanged("tablaafectada");
				}
			}
		}

		#endregion

		#region ctor

		public monitoreo()
		{
			idmonitoreo = jxshell.environment.uniqueId();
			fecha = database.db.now();
		}

		public monitoreo(string tabla, string idregistro, string sesion, string accion){
			tablaafectada=tabla;
			idregistroafectado=idregistro;
			idmonitoreo = jxshell.environment.uniqueId();
			idsesion = sesion;
			this.accion = accion;
			this.fecha = database.db.now();
		}

		#endregion

	}

	[Table(Name = "ecurie.sesiones")]
	public partial class sesion : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged handling

		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}

		#endregion

		#region string CompUtAdoR

		private string _compUtAdoR;
		[DebuggerNonUserCode]
		[Column(Storage = "_compUtAdoR", Name = "computador", DbType = "varchar(100)")]
		public string computador
		{
			get
			{
				return _compUtAdoR;
			}
			set
			{
				if (value != _compUtAdoR)
				{
					_compUtAdoR = value;
					OnPropertyChanged("computador");
				}
			}
		}

		#endregion

		#region DateTime? Fin

		private DateTime? _fin;
		[DebuggerNonUserCode]
		[Column(Storage = "_fin", Name = "fin", DbType = "datetime")]
		public DateTime? fin
		{
			get
			{
				return _fin;
			}
			set
			{
				if (value != _fin)
				{
					_fin = value;
					OnPropertyChanged("fin");
				}
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int id
		{
			get
			{
				return _id;
			}
			set
			{
				if (value != _id)
				{
					_id = value;
					OnPropertyChanged("id");
				}
			}
		}

		#endregion

		#region string IdemPreSa

		private string _idemPreSa;
		[DebuggerNonUserCode]
		[Column(Storage = "_idemPreSa", Name = "idempresa", DbType = "varchar(20)")]
		public string idempresa
		{
			get
			{
				return _idemPreSa;
			}
			set
			{
				if (value != _idemPreSa)
				{
					_idemPreSa = value;
					OnPropertyChanged("idempresa");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)", IsPrimaryKey = true, CanBeNull = false)]
		public string idsesion
		{
			get
			{
				return _idseSIon;
			}
			set
			{
				if (value != _idseSIon)
				{
					_idseSIon = value;
					OnPropertyChanged("idsesion");
				}
			}
		}

		#endregion

		#region string IDUsUarIo

		private string _iduSUarIo;
		[DebuggerNonUserCode]
		[Column(Storage = "_iduSUarIo", Name = "idusuario", DbType = "varchar(20)")]
		public string idusuario
		{
			get
			{
				return _iduSUarIo;
			}
			set
			{
				if (value != _iduSUarIo)
				{
					_iduSUarIo = value;
					OnPropertyChanged("idusuario");
				}
			}
		}

		#endregion

		#region DateTime? InICIo

		private DateTime? _inIciO;
		[DebuggerNonUserCode]
		[Column(Storage = "_inIciO", Name = "inicio", DbType = "datetime")]
		public DateTime? inicio
		{
			get
			{
				return _inIciO;
			}
			set
			{
				if (value != _inIciO)
				{
					_inIciO = value;
					OnPropertyChanged("inicio");
				}
			}
		}

		#endregion

		#region string IP

		private string _ip;
		[DebuggerNonUserCode]
		[Column(Storage = "_ip", Name = "ip", DbType = "varchar(20)")]
		public string ip
		{
			get
			{
				return _ip;
			}
			set
			{
				if (value != _ip)
				{
					_ip = value;
					OnPropertyChanged("ip");
				}
			}
		}

		#endregion

		#region string SEdE

		private string _seDE;
		[DebuggerNonUserCode]
		[Column(Storage = "_seDE", Name = "sede", DbType = "varchar(20)")]
		public string sede
		{
			get
			{
				return _seDE;
			}
			set
			{
				if (value != _seDE)
				{
					_seDE = value;
					OnPropertyChanged("sede");
				}
			}
		}

		#endregion

		#region string Version

		private string _version;
		[DebuggerNonUserCode]
		[Column(Storage = "_version", Name = "version", DbType = "varchar(20)")]
		public string version
		{
			get
			{
				return _version;
			}
			set
			{
				if (value != _version)
				{
					_version = value;
					OnPropertyChanged("version");
				}
			}
		}

		#endregion

		#region ctor

		public sesion()
		{
		}
		public sesion(bool nuevo){
			// Llena por defecto los valores 
			this.idsesion =jxshell.environment.uniqueId();
			this.computador = Environment.MachineName;
			this.idempresa ="001";
			this.sede ="001";
			this.inicio = database.db.now();
			this.version = "0.1";
		}

		#endregion

	}

	[Table]
	public class queryedCliente{
		public string obtenerNombre(){
			System.Text.StringBuilder s=new System.Text.StringBuilder();
			if(nombre1!=""){
				s.Append(nombre1).Append(" ");
			}
			if(nombre2!=""){
				s.Append(nombre2).Append(" ");
			}
			if(apellido1!=""){
				s.Append(apellido1).Append(" ");
			}
			if(apellido2!=""){
				s.Append(apellido2).Append(" ");
			}
			return s.ToString().Trim();
		}

		[Column(Name="id")]
		public int? id{
			get;set;
		}
		[Column(Name="idcliente")]
		public string idcliente{
			get;set;
		}
		[Column(Name="codigo")]
		public string codigo{
			get;set;
		}
		[Column(Name="identificacion")]
		public string identificacion{
			get;set;
		}
		[Column(Name="ntipoidentificacion")]
		public string ntipoidentificacion{
			get;set;
		}

		[Column(Name="tipoidentificacion")]
		public string tipoidentificacion{
			get;set;
		}
		[Column(Name="nombre1")]
		public string nombre1{
			get;set;
		}
		[Column(Name="nombre2")]
		public string nombre2{
			get;set;
		}
		[Column(Name="apellido1")]
		public string apellido1{
			get;set;
		}
		[Column(Name="apellido2")]
		public string apellido2{
			get;set;
		}
		[Column(Name="direccion")]
		public string direccion{
			get;set;
		}
		[Column(Name="idsesion")]
		public string idsesion{
			get;set;
		}
		[Column(Name="imagen")]
		public string imagen{
			get;set;
		}
		[Column(Name="telefono")]
		public string telefono{
			get;set;
		}

		[Column(Name="fechacreado")]
		public DateTime? fechacreado{
			get;set;
		}
		[Column(Name="creadopor")]
		public string creadopor{
			get;set;
		}

	}

	[Table(Name="ecurie.tipoidentificacion")]
	public partial class tipoidentificacion : INotifyPropertyChanged{

		public tipoidentificacion(){

		}
		public event PropertyChangedEventHandler PropertyChanged;
		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}


		
		private int? id_;

		[Column(Name="id", Storage="id_")]
		public int? id{
			get{return id_;}
			set{
				if(id_!=value){
					OnPropertyChanged("id");
					id_ = value;
				}
			}
		}

		
		private string ididentificacion_;
		[Column(Name="ididentificacion", Storage="ididentificacion_")]
		public string ididentificacion{
			get{return ididentificacion_;}
			set{
				if(ididentificacion_!=value){
					OnPropertyChanged("identificacion");
					ididentificacion_ = value;
				}
			}
		}

		
		private string codigo_;
		[Column(Name="codigo", Storage="codigo_")]
		public string codigo{
			get{return codigo_;}
			set{
				if(codigo_!=value){
					OnPropertyChanged("codigo");
					codigo_ = value;
				}
			}
		}

		
		private string prefijo_;
		[Column(Name="prefijo", Storage="prefijo_")]
		public string prefijo{
			get{return prefijo_;}
			set{
				if(prefijo_!=value){
					OnPropertyChanged("prefijo");
					prefijo_ = value;
				}
			}
		}

		
		private string nombre_;
		[Column(Name="nombre", Storage="nombre_")]
		public string nombre{
			get{return nombre_;}
			set{
				if(nombre_!=value){
					OnPropertyChanged("nombre");
					nombre_ = value;
				}
			}
		}




	}

	[Table(Name="queryedUsuarios")]
	public partial class queryedUsuarios : INotifyPropertyChanged{
		[Column(Name="idusuario")]
		public string idusuario{
			get;
			set;
		}
		[Column(Name="id")]
		public int? id{
			get;
			set;
		}
		[Column(Name="nombre")]
		public string nombre{
			get;
			set;
		}
		[Column(Name="usuariocreador")]
		public string usuariocreador{
			get;
			set;
		}
		[Column(Name="idusuariocreador")]
		public string idusuariocreador{
			get;
			set;
		}
		[Column(Name="fechacreado")]
		public DateTime? fechacreado{
			get;
			set;
		}
		[Column(Name="administrador")]
		public bool? administrador{
			get;
			set;
		}

		
		[Column(Name="contrasena")]
		public string contrasena{
			get;
			set;
		}
		[Column(Name="imagen")]
		public string imagen{
			get;
			set;
		}
		[Column(Name="idsesion")]
		public string idsesion{
			get;
			set;
		}

		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}


	}

	[Table(Name = "ecurie.usuarios")]
	public partial class usuarios : INotifyPropertyChanged
	{

		public Exception error=null;
		#region INotifyPropertyChanged handling

		public event PropertyChangedEventHandler PropertyChanged;

		protected virtual void OnPropertyChanged(string propertyName)
		{
			if (PropertyChanged != null)
			{
				PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}

		#endregion

		#region bool? administrador

		private bool? _adMinisTrAdOr;
		[DebuggerNonUserCode]
		[Column(Storage = "_adMinisTrAdOr", Name = "administrador", DbType = "bit(1)")]
		public bool? administrador
		{
			get
			{
				return _adMinisTrAdOr;
			}
			set
			{
				if (value != _adMinisTrAdOr)
				{
					_adMinisTrAdOr = value;
					OnPropertyChanged("administrador");
				}
			}
		}

		#endregion


		private string _imagen;
		[DebuggerNonUserCode]
		[Column(Storage = "_imagen", Name = "imagen", DbType = "longtext")]
		public string imagen
		{
			get
			{
				return _imagen;
			}
			set
			{
				if (value != _imagen)
				{
					_imagen = value;
					OnPropertyChanged("imagen");
				}
			}
		}

		#region string contraseña

		private string _contraSeña;
		[DebuggerNonUserCode]
		[Column(Storage = "_contraSeña", Name = "contraseña", DbType = "varchar(100)")]
		public string contraseña
		{
			get
			{
				return _contraSeña;
			}
			set
			{
				if (value != _contraSeña)
				{
					_contraSeña = value;
					OnPropertyChanged("contraseña");
				}
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int id
		{
			get
			{
				return _id;
			}
			set
			{
				if (value != _id)
				{
					_id = value;
					OnPropertyChanged("id");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string idsesion
		{
			get
			{
				return _idseSIon;
			}
			set
			{
				if (value != _idseSIon)
				{
					_idseSIon = value;
					OnPropertyChanged("idsesion");
				}
			}
		}

		#endregion

		#region string IDUsUarIo

		private string _iduSUarIo;
		[DebuggerNonUserCode]
		[Column(Storage = "_iduSUarIo", Name = "idusuario", DbType = "varchar(20)", IsPrimaryKey = true, CanBeNull = false)]
		public string idusuario
		{
			get
			{
				return _iduSUarIo;
			}
			set
			{
				if (value != _iduSUarIo)
				{
					_iduSUarIo = value;
					OnPropertyChanged("idusuario");
				}
			}
		}

		#endregion

		#region string nombre

		private string _noMbRe;
		[DebuggerNonUserCode]
		[Column(Storage = "_noMbRe", Name = "nombre", DbType = "varchar(200)")]
		public string nombre
		{
			get
			{
				return _noMbRe;
			}
			set
			{
				if (value != _noMbRe)
				{
					_noMbRe = value;
					OnPropertyChanged("nombre");
				}
			}
		}

		#endregion

		public bool ok=false;

		#region ctor

		public usuarios()
		{
		}

		#endregion

	}
}