import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import fineRoutes from './routes/fine.routes';
import { globalErrorHandler, AppError } from './utils/errorHandler'; // Asegúrate de que la ruta sea correcta

dotenv.config();

const app: Application = express();

// Middleware para parsear JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api/fines', fineRoutes);

// Ruta para errores 404 (si ninguna ruta anterior coincide)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Middleware global de manejo de errores (debe ser el último middleware)
app.use(globalErrorHandler);

export default app;