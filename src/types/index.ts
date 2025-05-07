// src/types/index.ts
import { Multer } from 'multer';

// --------------------
// Tipos para el Contrato Inteligente y Blockchain
// --------------------

// Refleja el enum FineStatus del contrato inteligente
export enum BlockchainFineStatus {
    Pending = 0,
    Paid = 1,
    Appealed = 2,
    Cancelled = 3,
    SIMITVerified = 4, // Estado adicional si se usa en el contrato
}

// Representa la estructura de una multa tal como se obtiene del contrato inteligente
export interface BlockchainFineData {
    id: string; // BigInt convertido a string
    fineSIMITId?: string; // ID externo del sistema SIMIT (opcional)
    plateNumber: string;
    ipfsEvidenceHash: string; // CID de IPFS
    offenseType: string;
    location: string;
    offenseTimestamp: string; // Unix timestamp como string
    amount: string; // Costo como string
    status: BlockchainFineStatus; // Estado de la multa
    registrar: string; // Dirección de Ethereum del registrador
    lastUpdated: string; // Unix timestamp de la última actualización
}

// Representa una actualización de estado de una multa en la blockchain
export interface FineStatusUpdateBlockchain {
    timestamp: string; // Unix timestamp como string
    oldState: BlockchainFineStatus;
    newState: BlockchainFineStatus;
    reason: string; // Razón del cambio de estado
    updatedBy: string; // Dirección de Ethereum del operador
}

// --------------------
// Tipos para las Peticiones/Respuestas de la API
// --------------------

// Datos para crear una multa desde el backend
export interface CreateFinePayload {
    plateNumber: string;
    location: string;
    infractionType: string;
    cost: number; // Costo como número
    ownerIdentifier: string;
    externalSystemId?: string; // ID externo opcional
    offenseTimestamp?: number; // Unix timestamp de la infracción (opcional)
}

// Datos para actualizar el estado de una multa
export interface UpdateFineStatusPayload {
    newState: BlockchainFineStatus; // Nuevo estado de la multa
    reason: string; // Razón del cambio de estado
}

// Datos para importar multas desde Aptitud/SIMIT
export interface ImportFromAptitudPayload {
    plateNumber: string;
    date: string; // Fecha en formato "YYYY-MM-DD"
}

// --------------------
// Tipos para la API de Aptitud/SIMIT
// --------------------

// Representa los datos de una multa obtenida de la API de Aptitud/SIMIT
export interface AptitudFineData {
    id_multa_externa: string; // ID del sistema externo
    placa: string; // Número de placa
    fecha_infraccion: string; // Fecha de la infracción en formato "YYYY-MM-DD"
    hora_infraccion: string; // Hora de la infracción en formato "HH:MM:SS"
    lugar_descripcion: string; // Descripción del lugar
    codigo_infraccion: string; // Código de la infracción
    descripcion_infraccion: string; // Descripción de la infracción
    documento_propietario: string; // Documento del propietario
    valor_multa: number; // Valor de la multa
    url_evidencia?: string; // URL de la evidencia (opcional)
}

// Representa los datos de un conductor obtenidos de la API de Aptitud/SIMIT
export interface SimitDriverData {
    dni: string; // Documento de identidad
    firstName: string; // Nombre del conductor
    lastName: string; // Apellido del conductor
    address?: string; // Dirección (opcional)
}

// --------------------
// Tipos Globales y Extensiones
// --------------------

// Enum para estados internos de la multa (si es necesario)
export enum FineStateInternal {
    PENDING = 0,
    PAID = 1,
    APPEALED = 2,
    RESOLVED_APPEAL = 3,
    CANCELLED = 4,
}

// Extiende el objeto Request de Express para incluir propiedades de Multer
declare global {
    namespace Express {
        interface Request {
            file?: Multer.File; // Archivo único (upload.single)
            files?: Multer.File[] | { [fieldname: string]: Multer.File[] }; // Archivos múltiples (upload.array o upload.fields)
        }
    }
}