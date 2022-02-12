CREATE DATABASE inab_forestal;
USE inab_forestal;

DROP TABLE IF EXISTS `Cuatrimestre`;

CREATE TABLE `Cuatrimestre` (
  `idCuatrimestre` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCuatrimestre` varchar(25) NOT NULL,
  PRIMARY KEY (`idCuatrimestre`)
);


DROP TABLE IF EXISTS `CambioSol`;

CREATE TABLE `CambioSol` (
  `idCambioSol` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCambio` varchar(55) NOT NULL,
  `inicio` varchar(11) NOT NULL,
  `final` varchar(11) NOT NULL,
  PRIMARY KEY (`idCambioSol`)
) ;


DROP TABLE IF EXISTS `Arbol`;

CREATE TABLE `Arbol` (
  `idArbol` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCicloArbol` varchar(35) NOT NULL,
  PRIMARY KEY (`idArbol`)
) ;

DROP TABLE IF EXISTS `tbTiempo`;

CREATE TABLE `tbTiempo` (
  `idTiempo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreTiempo` varchar(13) NOT NULL,
  PRIMARY KEY (`idTiempo`)
);

DROP TABLE IF EXISTS `Epoca`;

CREATE TABLE `Epoca` (
  `idEpoca` int(11) NOT NULL AUTO_INCREMENT,
  `nombreEpoca` varchar(8) NOT NULL,
  PRIMARY KEY (`idEpoca`)
);


DROP TABLE IF EXISTS `tbFaseLunar`;

CREATE TABLE `tbFaseLunar` (
  `idFaseLunar` int(11) NOT NULL AUTO_INCREMENT,
  `nombreFaseLunar` varchar(20) NOT NULL,
  PRIMARY KEY (`idFaseLunar`)
);


DROP TABLE IF EXISTS `tbFechasLuna`;

CREATE TABLE `tbFechasLuna` (
  `idFechasLuna` int(11) NOT NULL AUTO_INCREMENT,
  `idMes` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `anio` int(11) DEFAULT NULL,
  `idFaseLunar` int(11) NOT NULL,
  CONSTRAINT `fk_fechas_fase` FOREIGN KEY (`idFaseLunar`) REFERENCES `tbFaseLunar` (`idFaseLunar`),
  PRIMARY KEY (`idFechasLuna`)
 );

DROP TABLE IF EXISTS `Actividad`;
CREATE TABLE `Actividad` (
  `idActividad` int(11) NOT NULL AUTO_INCREMENT,
  `nombreActividad` varchar(120) NOT NULL,
  PRIMARY KEY (`idActividad`)
);

DROP TABLE IF EXISTS `detalleActividad`;
CREATE TABLE `detalleActividad` (
  `idDetalleActividad` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(800) DEFAULT NULL,
  `fechaInicio` varchar(800) DEFAULT NULL,
  `fechaFinal` varchar(800) DEFAULT NULL,
  `fechaOptima` varchar(800) DEFAULT NULL,

  `idFechasLuna` int(11) NOT NULL,
  `idCuatrimestre` int(11) NOT NULL,
  `idTiempo` int(11) NOT NULL,
  `idArbol` int(11) NOT NULL,
  `idEpoca` int(11) NOT NULL,
  `idCambioSol` int(11) NOT NULL,
  `idActividad` int(11) NOT NULL,
  PRIMARY KEY (`idDetalleActividad`),
  CONSTRAINT `fk_idFechasLuna` FOREIGN KEY (`idFechasLuna`) REFERENCES `tbFechasLuna` (`idFechasLuna`),
  CONSTRAINT `fk_idTiempo` FOREIGN KEY (`idTiempo`) REFERENCES `tbTiempo` (`idTiempo`),
  CONSTRAINT `fk_idArbol` FOREIGN KEY (`idArbol`) REFERENCES `Arbol` (`idArbol`),
  CONSTRAINT `fk_idEpoca` FOREIGN KEY (`idEpoca`) REFERENCES `Epoca` (`idEpoca`),
  CONSTRAINT `fk_idCambioSol` FOREIGN KEY (`idCambioSol`) REFERENCES `CambioSol` (`idCambioSol`),
  CONSTRAINT `fk_idActividad` FOREIGN KEY (`idActividad`) REFERENCES `Actividad` (`idActividad`),
  CONSTRAINT `fk_idCuatrimestre` FOREIGN KEY (`idCuatrimestre`) REFERENCES `Cuatrimestre` (`idCuatrimestre`)
  );
