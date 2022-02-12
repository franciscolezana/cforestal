module.exports = app => {
    const actividades = require("../controllers/actividad.controller.js");
  
    // Retrieve all Actividades
    app.get("/actividades", actividades.findAll);
    
  };