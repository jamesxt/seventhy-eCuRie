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

		#endregion

		#region string ApeLLido1

		private string _apeLlIdo1;
		[DebuggerNonUserCode]
		[Column(Storage = "_apeLlIdo1", Name = "apellido1", DbType = "varchar(200)")]
		public string ApeLLido1
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
					OnPropertyChanged("ApeLLido1");
				}
			}
		}

		#endregion

		#region string ApeLLido2

		private string _apeLlIdo2;
		[DebuggerNonUserCode]
		[Column(Storage = "_apeLlIdo2", Name = "apellido2", DbType = "varchar(200)")]
		public string ApeLLido2
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
					OnPropertyChanged("ApeLLido2");
				}
			}
		}

		#endregion

		#region string CodIGo

		private string _codIgO;
		[DebuggerNonUserCode]
		[Column(Storage = "_codIgO", Name = "codigo", DbType = "varchar(10)", IsPrimaryKey = true, CanBeNull = false)]
		public string CodIGo
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
					OnPropertyChanged("CodIGo");
				}
			}
		}

		#endregion

		#region string DireCcIon

		private string _direCcIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_direCcIon", Name = "direccion", DbType = "varchar(254)")]
		public string DireCcIon
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
					OnPropertyChanged("DireCcIon");
				}
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int ID
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
					OnPropertyChanged("ID");
				}
			}
		}

		#endregion

		#region string IDClientE

		private string _idcLientE;
		[DebuggerNonUserCode]
		[Column(Storage = "_idcLientE", Name = "idcliente", DbType = "varchar(20)", IsPrimaryKey = true, CanBeNull = false)]
		public string IDClientE
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
					OnPropertyChanged("IDClientE");
				}
			}
		}

		#endregion

		#region string IDentIfIcaCIon

		private string _idEntIfIcaCiOn;
		[DebuggerNonUserCode]
		[Column(Storage = "_idEntIfIcaCiOn", Name = "identificacion", DbType = "varchar(20)")]
		public string IDentIfIcaCIon
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
					OnPropertyChanged("IDentIfIcaCIon");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string IDSEsIon
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
					OnPropertyChanged("IDSEsIon");
				}
			}
		}

		#endregion

		#region string NoMbRe1

		private string _noMbRe1;
		[DebuggerNonUserCode]
		[Column(Storage = "_noMbRe1", Name = "nombre1", DbType = "varchar(200)")]
		public string NoMbRe1
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
					OnPropertyChanged("NoMbRe1");
				}
			}
		}

		#endregion

		#region string NoMbRe2

		private string _noMbRe2;
		[DebuggerNonUserCode]
		[Column(Storage = "_noMbRe2", Name = "nombre2", DbType = "varchar(200)")]
		public string NoMbRe2
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
					OnPropertyChanged("NoMbRe2");
				}
			}
		}

		#endregion

		#region string TipOIDentIfIcaCIon

		private string _tipOidEntIfIcaCiOn;
		[DebuggerNonUserCode]
		[Column(Storage = "_tipOidEntIfIcaCiOn", Name = "tipoidentificacion", DbType = "varchar(20)")]
		public string TipOIDentIfIcaCIon
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
					OnPropertyChanged("TipOIDentIfIcaCIon");
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
		public int ID
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
					OnPropertyChanged("ID");
				}
			}
		}

		#endregion

		#region string IDInFormAcIon

		private string _idiNFormAcIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idiNFormAcIon", Name = "idinformacion", DbType = "varchar(20)", IsPrimaryKey = true, CanBeNull = false)]
		public string IDInFormAcIon
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
					OnPropertyChanged("IDInFormAcIon");
				}
			}
		}

		#endregion

		#region string IDRegisTRO

		private string _idrEgisTro;
		[DebuggerNonUserCode]
		[Column(Storage = "_idrEgisTro", Name = "idregistro", DbType = "varchar(45)")]
		public string IDRegisTRO
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
					OnPropertyChanged("IDRegisTRO");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string IDSEsIon
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
					OnPropertyChanged("IDSEsIon");
				}
			}
		}

		#endregion

		#region string TipOdAtO

		private string _tipOdAtO;
		[DebuggerNonUserCode]
		[Column(Storage = "_tipOdAtO", Name = "tipodato", DbType = "varchar(20)")]
		public string TipOdAtO
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
					OnPropertyChanged("TipOdAtO");
				}
			}
		}

		#endregion

		#region string TitUlO

		private string _titUlO;
		[DebuggerNonUserCode]
		[Column(Storage = "_titUlO", Name = "titulo", DbType = "varchar(45)")]
		public string TitUlO
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
					OnPropertyChanged("TitUlO");
				}
			}
		}

		#endregion

		#region string Valor

		private string _valor;
		[DebuggerNonUserCode]
		[Column(Storage = "_valor", Name = "valor", DbType = "varchar(4000)")]
		public string Valor
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
					OnPropertyChanged("Valor");
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

		#region string AcCIon

		private string _acCiOn;
		[DebuggerNonUserCode]
		[Column(Storage = "_acCiOn", Name = "accion", DbType = "varchar(45)")]
		public string AcCIon
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
					OnPropertyChanged("AcCIon");
				}
			}
		}

		#endregion

		#region DateTime? FeCHa

		private DateTime? _feChA;
		[DebuggerNonUserCode]
		[Column(Storage = "_feChA", Name = "fecha", DbType = "datetime")]
		public DateTime? FeCHa
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
					OnPropertyChanged("FeCHa");
				}
			}
		}

		#endregion

		#region int ID

		private int _id;
		[DebuggerNonUserCode]
		[Column(Storage = "_id", Name = "id", DbType = "int", IsPrimaryKey = true, IsDbGenerated = true, CanBeNull = false)]
		public int ID
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
					OnPropertyChanged("ID");
				}
			}
		}

		#endregion

		#region string IDMonitorEO

		private string _idmOnitorEo;
		[DebuggerNonUserCode]
		[Column(Storage = "_idmOnitorEo", Name = "idmonitoreo", DbType = "varchar(45)", IsPrimaryKey = true, CanBeNull = false)]
		public string IDMonitorEO
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
					OnPropertyChanged("IDMonitorEO");
				}
			}
		}

		#endregion

		#region string IDRegisTROafEcTadO

		private string _idrEgisTroAfEcTadO;
		[DebuggerNonUserCode]
		[Column(Storage = "_idrEgisTroAfEcTadO", Name = "idregistroafectado", DbType = "varchar(45)")]
		public string IDRegisTROafEcTadO
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
					OnPropertyChanged("IDRegisTROafEcTadO");
				}
			}
		}

		#endregion

		#region string IDSEsIon

		private string _idseSIon;
		[DebuggerNonUserCode]
		[Column(Storage = "_idseSIon", Name = "idsesion", DbType = "varchar(45)")]
		public string IDSEsIon
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
					OnPropertyChanged("IDSEsIon");
				}
			}
		}

		#endregion

		#region string TablaAfEcTadA

		private string _tablaAfEcTadA;
		[DebuggerNonUserCode]
		[Column(Storage = "_tablaAfEcTadA", Name = "tablaafectada", DbType = "varchar(200)")]
		public string TablaAfEcTadA
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
					OnPropertyChanged("TablaAfEcTadA");
				}
			}
		}

		#endregion

		#region ctor

		public monitoreo()
		{
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

		#endregion

	}


	[Table(Name = "ecurie.usuarios")]
	public partial class usuarios : INotifyPropertyChanged
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