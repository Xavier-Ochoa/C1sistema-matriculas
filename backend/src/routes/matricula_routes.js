import { Router } from 'express';
import {
  listarMatriculas,
  detalleMatricula,
  crearMatricula,
  agregarMateria,
  eliminarMateria,
  eliminarMatricula
} from '../controllers/matricula_controller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';

const router = Router();

// ===== RUTAS PROTEGIDAS - CRUD MATRÍCULAS =====

/**
 * GET /matriculas
 * Listar todas las matrículas
 */
router.get('/', verificarTokenJWT, listarMatriculas);

/**
 * GET /matriculas/:id
 * Obtener detalle de una matrícula específica
 */
router.get('/:id', verificarTokenJWT, detalleMatricula);

/**
 * POST /matriculas
 * Crear una nueva matrícula
 * Body: {
 *   "id_estudiante": "...",
 *   "codigo": "MAT2024-001",
 *   "descripcion": "Matrícula 2024",
 *   "materias": ["id_materia1", "id_materia2"]
 * }
 */
router.post('/', verificarTokenJWT, crearMatricula);

/**
 * POST /matriculas/:id/materias
 * Agregar una materia a una matrícula existente
 * Body: { "id_materia": "..." }
 */
router.post('/:id/materias', verificarTokenJWT, agregarMateria);

/**
 * DELETE /matriculas/:id/materias/:idMateria
 * Eliminar una materia de la matrícula
 */
router.delete('/:id/materias/:idMateria', verificarTokenJWT, eliminarMateria);

/**
 * DELETE /matriculas/:id
 * Eliminar una matrícula completamente
 */
router.delete('/:id', verificarTokenJWT, eliminarMatricula);

export default router;