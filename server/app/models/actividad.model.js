const sql = require("./db.js");

// constructor
const Actividad = function(actividad) {
    this.idActividad = actividad.idRegistro
    this.dia = actividad.dia;
    this.mes = actividad.mes;
    this.anio = actividad.anio;
    this.act1 = actividad.act1;
    this.act2 = actividad.act2;
    this.act3 = actividad.act3;
    this.act4 = actividad.act4;
    this.act5 = actividad.act5;
    this.act6 = actividad.act1;
    this.act7 = actividad.act2;
    this.act8 = actividad.act3;
    this.act9 = actividad.act4;
    this.act10 = actividad.act5;
    this.act11 = actividad.act1;
    this.act12 = actividad.act2;
    this.act13 = actividad.act3;
    this.act14 = actividad.act4;
    this.act15 = actividad.act5;
    this.act16 = actividad.act1;
    this.act17 = actividad.act2;
    this.act18 = actividad.act3;
    this.act19 = actividad.act4;
    this.act20 = actividad.act5;
    this.act21 = actividad.act1;
    this.act22 = actividad.act2;
    this.act23 = actividad.act3;
    this.nombreFaseLunar = actividad.nombreFaseLunar;
    this.nombreEpoca = actividad.nombreEpoca;
    this.nombreTiempo = actividad.nombreTiempo;
    this.nombreCicloArbol = actividad.nombreCicloArbol;
    this.nombreCambio = actividad.nombreCambio;
    this.nombreCuatrimestre = actividad.nombreCuatrimestre;
  };

  Actividad.getAll = result => {
    sql.query('SELECT r.idRegistro, r.dia, r.mes, r.anio,'+
    'r.act1, r.act2, r.act3, r.act4, r.act5, r.act6, r.act7, r.act8, r.act9, r.act10,'+
    'r.act11, r.act12, r.act13, r.act14, r.act15, r.act16, r.act17, r.act18, r.act19, '+
    'r.act20, r.act21, r.act22, r.act23, fl.nombreFaseLunar, e.nombreEpoca, t.nombreTiempo, '+
    'a.nombreCicloArbol, c.nombreCambio, ct.nombreCuatrimestre '+
    'FROM registro as r '+
    'JOIN faselunar as fl ON fl.idFaseLunar = r.idFaseLunar '+
    'JOIN epoca as e ON e.idEpoca = r.idEpoca '+
    'JOIN tiempo as t ON t.idTiempo = r.idTiempo '+
    'JOIN arbol as a ON a.idArbol = r.idArbol '+
    'JOIN cambiosol as c ON c.idCambioSol = r.idCambioSol '+
    'JOIN cuatrimestre as ct ON ct.idCuatrimestre = r.idCuatrimestre '+
    'ORDER BY idRegistro ASC;', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("actividades: ", res);
      result(null, res);
    });
  };

  module.exports = Actividad;