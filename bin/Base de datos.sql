create database ecurie;

CREATE TABLE `ecurie`.`sesiones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idsesion` VARCHAR(45) NOT NULL,
  `inicio` DATETIME NULL,
  `fin` DATETIME NULL,
  `idusuario` VARCHAR(20) NULL,
  `sede` VARCHAR(20) NULL,
  `idempresa` VARCHAR(20) NULL,
  `computador` VARCHAR(100) NULL,
  `ip` VARCHAR(20) NULL,
  `version` VARCHAR(20) NULL,
  PRIMARY KEY (`id`, `idsesion`));


CREATE TABLE `ecurie`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idusuario` VARCHAR(20) NOT NULL,
  `nombre` VARCHAR(200) NULL,
  `contraseña` VARCHAR(100) NULL,
  `administrador` BIT NULL,
  PRIMARY KEY (`id`, `idusuario`));

ALTER TABLE `ecurie`.`usuarios` 
ADD COLUMN `idsesion` VARCHAR(45) NULL AFTER `administrador`;

CREATE TABLE `ecurie`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idcliente` VARCHAR(20) NOT NULL,
  `codigo` VARCHAR(10) NOT NULL,
  `identificacion` VARCHAR(20) NULL,
  `tipoidentificacion` VARCHAR(20) NULL,
  `nombre1` VARCHAR(200) NULL,
  `nombre2` VARCHAR(200) NULL,
  `apellido1` VARCHAR(200) NULL,
  `apellido2` VARCHAR(200) NULL,
  `direccion` VARCHAR(254) NULL,
  PRIMARY KEY (`id`, `idcliente`, `codigo`));
ALTER TABLE `ecurie`.`clientes` 
ADD COLUMN `idsesion` VARCHAR(45) NULL AFTER `direccion`;


CREATE TABLE `ecurie`.`informacionextra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idinformacion` VARCHAR(20) NOT NULL,
  `idregistro` VARCHAR(45) NULL,
  `titulo` VARCHAR(45) NULL,
  `tipodato` VARCHAR(20) NULL,
  `valor` VARCHAR(4000) NULL,
  `idsesion` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `idinformacion`));

CREATE TABLE `ecurie`.`monitoreo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idmonitoreo` VARCHAR(45) NOT NULL,
  `tablaafectada` VARCHAR(200) NULL,
  `accion` VARCHAR(45) NULL,
  `idregistroafectado` VARCHAR(45) NULL,
  `idsesion` VARCHAR(45) NULL,
  `fecha` DATETIME NULL,
  PRIMARY KEY (`id`, `idmonitoreo`));



ALTER TABLE `ecurie`.`usuarios` 
ADD UNIQUE INDEX `idusuario_UNIQUE` (`idusuario` ASC);

use ecurie;

insert into usuarios (idusuario, nombre, contraseña, administrador)
  values ('SADMINISTRADOR', 'Administrador', '1', true);

ALTER TABLE `ecurie`.`usuarios` 
ADD COLUMN `imagen` TEXT NULL AFTER `idsesion`;


-- Valores por defecto ...


ALTER TABLE `ecurie`.`usuarios` 
CHANGE COLUMN `administrador` `administrador` BIT(1) NULL DEFAULT false ;

ALTER TABLE `ecurie`.`usuarios` 
CHANGE COLUMN `imagen` `imagen` LONGTEXT NULL DEFAULT null;

ALTER TABLE `ecurie`.`clientes` 
ADD COLUMN `imagen` LONGTEXT NULL AFTER `idsesion`;

ALTER TABLE `ecurie`.`usuarios` 
ADD COLUMN `eliminado` BIT NULL DEFAULT false AFTER `imagen`;

ALTER TABLE `ecurie`.`clientes` 
ADD COLUMN `telefono` VARCHAR(254) NULL DEFAULT '' AFTER `imagen`;

ALTER TABLE `ecurie`.`clientes` 
CHANGE COLUMN `codigo` `codigo` VARCHAR(10) NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `idcliente`),
ADD UNIQUE INDEX `identificacion_UNIQUE` (`identificacion` ASC);

ALTER TABLE `ecurie`.`clientes` 
CHANGE COLUMN `codigo` `codigo` VARCHAR(10) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `idcliente`, `codigo`),
ADD UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC);


CREATE TABLE `ecurie`.`tipoidentificacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ididentificacion` VARCHAR(30) NOT NULL,
  `prefijo` VARCHAR(5) NULL DEFAULT '',
  `codigo` VARCHAR(5) NULL DEFAULT '',
  `nombre` VARCHAR(254) NULL DEFAULT '',
  PRIMARY KEY (`id`, `ididentificacion`),
  UNIQUE INDEX `ididentificacion_UNIQUE` (`ididentificacion` ASC));


use ecurie;
-- Tipos de documentos ...
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('TI','12', 'Tarjeta de identidad', 1);
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('CC','13', 'Cédula de ciudadanía',2);
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('','21', 'Tarjeta de extranjería',3);
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('','22', 'Cédula de extranjería',4);
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('','31', 'Nit',5);
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('','41', 'Pasaporte',6 );
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('','42', 'Documentación de identificación extranjero',7);
insert into tipoidentificacion (prefijo, codigo, nombre, ididentificacion)
    values('','43', 'Sin identificación del exterior o para uso definido por la DIAN', 8);



CREATE TABLE `ecurie`.`productos` (
  `idproducto` VARCHAR(40) NULL,
  `id` INT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(20) NOT NULL,
  `nombre` VARCHAR(245) NULL,
  `descripcion` VARCHAR(4000) NULL,
  `precio` DECIMAL(15,2) NULL,
  `existencia` DECIMAL(15,2) NULL,
  `costo` DECIMAL(15,2) NULL,
  `porcentajeutilidad` DECIMAL(6,2) NULL,
  `tipoproducto` VARCHAR(40) NULL,
  `bodega` VARCHAR(30) NULL DEFAULT '001',
  `linea` VARCHAR(30) NULL DEFAULT '001',
  `idsesion` VARCHAR(40) NULL,
  PRIMARY KEY (`id`, `idproducto`, `codigo`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  UNIQUE INDEX `idproducto_UNIQUE` (`idproducto` ASC));

ALTER TABLE `ecurie`.`productos` 
ADD COLUMN `imagen` LONGTEXT NULL AFTER `idsesion`;



CREATE TABLE `ecurie`.`bloqueos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tablabloqueo` VARCHAR(45) NULL,
  `tablabloqueada` VARCHAR(45) NULL,
  `idbloqueo` VARCHAR(45) NOT NULL,
  `idbloqueado` VARCHAR(45) NULL,
  `idbloqueador` VARCHAR(45) NULL,
  `descripcion` VARCHAR(4000) NULL,
  PRIMARY KEY (`id`, `idbloqueo`),
  UNIQUE INDEX `idbloqueo_UNIQUE` (`idbloqueo` ASC));


CREATE TABLE `ecurie`.`inventario_encabezado` (
  `idinventario` VARCHAR(45) NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(30) NULL,
  `concepto` VARCHAR(30) NULL,
  `responsable` VARCHAR(30) NULL,
  `fecha` DATETIME NULL,
  `idsesion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `idinventario`, `idsesion`),
  UNIQUE INDEX `idinventario_UNIQUE` (`idinventario` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


CREATE TABLE `ecurie`.`inventario_detalle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idinventario` VARCHAR(45) NULL,
  `idinventariodetalle` VARCHAR(45) NOT NULL,
  `idproducto` VARCHAR(45) NULL,
  `existencias` DECIMAL(18,2) NULL,
  `costounitario` DECIMAL(18,2) NULL,
  `precioventa` DECIMAL(18,2) NULL,
  PRIMARY KEY (`id`, `idinventariodetalle`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `idinventariodetalle_UNIQUE` (`idinventariodetalle` ASC));
