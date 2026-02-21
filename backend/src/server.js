import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth_routes.js";
import estudianteRoutes from "./routes/estudiante_routes.js";
import materiaRoutes from "./routes/materia_routes.js";
import matriculaRoutes from "./routes/matricula_routes.js";

const app = express();

// ===== MIDDLEWARES =====

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      'https://c1sistema-matriculas.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.URL_FRONTEND,
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===== CONFIGURACIÓN DE SESIONES =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'tu_secreto_temporal',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ===== RUTAS =====

app.get("/", (req, res) => {
  res.send("API de Sistema de Gestión de Matrículas - TSDS");
});

// Autenticación
app.use("/api/auth", authRoutes);

// Estudiantes
app.use("/api/estudiantes", estudianteRoutes);

// Materias
app.use("/api/materias", materiaRoutes);

// Matrículas
app.use("/api/matriculas", matriculaRoutes);

// ===== MANEJO DE ERRORES =====

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint no encontrado - 404"
  });
});

app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;
