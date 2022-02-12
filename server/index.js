const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors({ origin : true, credentials:true }));

app.get('/', (req, res) => {
    res.send('Calendario Forestal api');
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to calendario forestal application." });
});

// Obtener todas las fechas
require("./app/routes/actividad.routes")(app);


//Puerto Utilizado en ambiente local 
const port = process.env.PORT || 3000;


//Listening 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})