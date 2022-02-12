const Actividad = require("../models/actividad.model.js");

// Retrieve all Actividades from the database.
exports.findAll = (req, res) => {
    Actividad.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving actividades."
        });
      else res.send(data);
    });
  };