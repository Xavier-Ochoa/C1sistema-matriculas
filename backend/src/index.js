import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./server.js";  // Importación de server.js

async function startServer() {
  try {
    // Intentamos conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    // Obtenemos el puerto de la variable de entorno o usamos el puerto 3000 por defecto
    const PORT = process.env.PORT || 3000;

    // Iniciamos el servidor y escuchamos en el puerto configurado
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);  // Aquí imprimimos el mensaje del puerto
    });

  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error);
  }
}

startServer();
