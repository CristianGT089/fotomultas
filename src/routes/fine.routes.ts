import { Router } from 'express';
import * as fineController from '../controllers/fine.controller';
import multer from 'multer';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const storage = multer.memoryStorage(); // Almacena archivos en memoria para subirlos a IPFS
const upload = multer({ storage: storage });

// Ruta para registrar una multa manualmente con evidencia
router.post('/', upload.single('evidenceFile'), asyncHandler(fineController.registerFine));

// Ruta para importar multas desde Aptitud/SIMIT y registrarlas
router.post('/import-aptitud', asyncHandler(fineController.importFromAptitudAndRegister));

// Ruta para actualizar el estado de una multa
router.put('/:fineId/status', asyncHandler(fineController.updateFineStatus));

// Ruta para obtener los detalles de una multa
router.get('/:fineId', asyncHandler(fineController.getFine));

// Ruta para obtener la evidencia de una multa desde IPFS
router.get('/:fineId/evidence', asyncHandler(fineController.getFineEvidence));

// Ruta para obtener multas por número de placa (pendiente de implementación)
router.get('/by-plate/:plateNumber', asyncHandler(fineController.getFinesByPlate));

// Ruta para obtener el historial de estados de una multa (pendiente de implementación)
router.get('/:fineId/status-history', asyncHandler(fineController.getFineStatusHistory));

// Ruta para asociar una multa con un ID de SIMIT
router.put('/:fineId/link-simit', asyncHandler(fineController.linkFineToSIMIT));

export default router;