import express from 'express';
import multer from 'multer';
import { uploadToIPFS, getFromIPFS } from './services/ipfs.service.js';
import type { Request, Response } from 'express';
import fineRoutes from './routes/fine.routes';
import { globalErrorHandler, AppError } from './utils/errorHandler'; // Asegúrate de que la ruta sea correcta

const app = express();

// Configuración de multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales
app.use('/api/fines', fineRoutes);

// Ruta de prueba
app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'API Fotomultas funcionando correctamente' });
});

// Ruta para subir una multa
app.post('/api/fines', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
        }

        const cid = await uploadToIPFS(req.file.buffer, req.file.originalname);
        return res.json({ 
            message: 'Multa subida exitosamente',
            cid: cid
        });
    } catch (error) {
        console.error('Error al subir la multa:', error);
        return res.status(500).json({ error: 'Error al procesar la multa' });
    }
});

// Ruta para obtener una multa por su CID
app.get('/api/fines/:cid', async (req: Request, res: Response) => {
    try {
        const chunks = await getFromIPFS(req.params.cid);
        const buffer = Buffer.concat(chunks);
        return res.send(buffer);
    } catch (error) {
        console.error('Error al obtener la multa:', error);
        return res.status(500).json({ error: 'Error al obtener la multa' });
    }
});

// Ruta para asociar una multa con SIMIT
app.put('/api/fines/:fineId/link-simit', async (req: Request, res: Response) => {
    try {
        const { simitId } = req.body;
        if (!simitId) {
            return res.status(400).json({ error: 'Se requiere el ID de SIMIT' });
        }

        // Aquí iría la lógica para vincular con SIMIT y el contrato inteligente
        res.json({
            message: 'Multa vinculada con SIMIT exitosamente',
            fineId: req.params.fineId,
            simitId: simitId
        });
    } catch (error) {
        console.error('Error al vincular con SIMIT:', error);
        res.status(500).json({ error: 'Error al vincular la multa con SIMIT' });
    }
});

// Ruta para errores 404 (si ninguna ruta anterior coincide)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Middleware global de manejo de errores (debe ser el último middleware)
app.use(globalErrorHandler);

export default app;