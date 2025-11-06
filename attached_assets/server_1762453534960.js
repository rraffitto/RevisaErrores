require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,             // Ej: "tu_usuario"
  host: process.env.DB_SERVER,           // Ej: "localhost"
  database: process.env.DB_NAME,         // Ej: "tu_basededatos"
  password: process.env.DB_PASSWORD,     // Ej: "tu_contraseña"
  port: process.env.DB_PORT || 5432        // Puerto por defecto de PostgreSQL
});

// Endpoint para la traducción
app.get('/translate', async (req, res) => {
  const { word, from, to } = req.query;
  if (!word || !from || !to) {
    return res.status(400).json({ error: "Faltan parámetros en la consulta." });
  }
  
  try {
    let queryText;
    // Consulta según la dirección de traducción
    if (from === "es-ES" && to === "em-EM") {
      queryText = "SELECT embera AS translation FROM Diccionario WHERE español = $1";
    } else if (from === "em-EM" && to === "es-ES") {
      queryText = "SELECT español AS translation FROM Diccionario WHERE embera = $1";
    } else {
      return res.status(400).json({ error: "Par de idiomas no soportado." });
    }
    
    // Ejecutar la consulta con el parámetro 'word'
    const result = await pool.query(queryText, [word]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No se encontró traducción." });
    }
    
    res.json({ translation: result.rows[0].translation });
    
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
