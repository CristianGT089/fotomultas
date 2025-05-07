import axios from 'axios'; // Import axios as default
import { Request, Response, NextFunction } from 'express';
import * as ipfsService from '../services/ipfs.service';
import * as blockchainService from '../services/blockchain.service';
import * as aptitudService from '../services/aptitud.service'; // Mocked
import { RegisterFineDto, UpdateFineStatusDto, ImportFromAptitudDto } from '../models/fine.dto';
import { FineStatusBlockchain } from '../services/blockchain.service';

// Helper to download file from URL
async function downloadFile(url: string): Promise<Buffer> {
    const response: any = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data); // No need for 'binary' encoding when using ArrayBuffer
}

/**
 * Registra una multa en la blockchain y sube la evidencia a IPFS.
 */
export const registerFine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { plateNumber, location, infractionType, cost, ownerIdentifier, externalSystemId } = req.body as RegisterFineDto;

        // Validar datos requeridos
        if (!req.file) {
            return res.status(400).json({ message: "Evidence file is required." });
        }
        if (!plateNumber || !location || !infractionType || cost === undefined || !ownerIdentifier) {
            return res.status(400).json({ message: "Missing required fine details." });
        }

        // Subir evidencia a IPFS
        const evidenceCID = await ipfsService.uploadToIPFS(req.file.buffer, req.file.originalname);

        // Registrar multa en la blockchain
        const result = await blockchainService.registerFineOnBlockchain(
            externalSystemId || "",
            plateNumber,
            evidenceCID,
            infractionType,
            location,
            Date.now(), // Usar la fecha actual como timestamp
            cost
        );

        res.status(201).json({
            message: 'Fine registered successfully.',
            fineId: result.fineId,
            ipfsHash: evidenceCID,
            transactionHash: result.transactionHash,
        });
    } catch (error: any) {
        console.error("Error in registerFine controller:", error);
        res.status(500).json({ message: 'Error registering fine.', error: error.message });
    }
};

/**
 * Asocia una multa con un ID externo del sistema SIMIT.
 */
export const linkFineToSIMIT = async (req: Request, res: Response) => {
    try {
        const { fineId } = req.params;
        const { simitId } = req.body;

        if (!fineId || !simitId) {
            return res.status(400).json({ message: "Fine ID and SIMIT ID are required." });
        }

        const transactionHash = await blockchainService.linkFineToSIMIT(parseInt(fineId, 10), simitId);

        res.status(200).json({
            message: 'Fine linked to SIMIT successfully.',
            transactionHash,
        });
    } catch (error: any) {
        console.error("Error in linkFineToSIMIT controller:", error);
        res.status(500).json({ message: 'Error linking fine to SIMIT.', error: error.message });
    }
};

/**
 * Actualiza el estado de una multa en la blockchain.
 */
export const updateFineStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fineId } = req.params;
        const { newState, reason } = req.body as UpdateFineStatusDto;

        // Validate required data
        if (!fineId || newState === undefined || !reason) {
            return res.status(400).json({ message: "Fine ID, new state, and reason are required." });
        }

        // Ensure newState is a valid FineStatus
        const statusEnumValue = FineStatusBlockchain[newState as keyof typeof FineStatusBlockchain];
        if (statusEnumValue === undefined) {
            return res.status(400).json({ message: "Invalid status provided." });
        }

        // Update the fine status on the blockchain
        const transactionHash = await blockchainService.updateFineStatusOnChain(
            parseInt(fineId, 10),
            statusEnumValue,
            reason
        );

        res.status(200).json({
            message: 'Fine status updated successfully.',
            transactionHash,
        });
    } catch (error: any) {
        console.error("Error in updateFineStatus controller:", error);
        res.status(500).json({ message: 'Error updating fine status.', error: error.message });
    }
};

/**
 * Obtiene los detalles de una multa desde la blockchain.
 */
export const getFine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fineId } = req.params;

        // Validar datos requeridos
        if (!fineId) {
            return res.status(400).json({ message: "Fine ID is required." });
        }

        // Obtener detalles de la multa desde la blockchain
        const fineDetails = await blockchainService.getFineDetailsFromBlockchain(parseInt(fineId, 10));
        res.status(200).json(fineDetails);
    } catch (error: any) {
        console.error("Error in getFine controller:", error);
        res.status(500).json({ message: 'Error retrieving fine.', error: error.message });
    }
};

/**
 * Obtiene la evidencia de una multa desde IPFS.
 */
export const getFineEvidence = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fineId } = req.params;

        // Validar datos requeridos
        if (!fineId) {
            return res.status(400).json({ message: "Fine ID is required." });
        }

        // Obtener detalles de la multa para recuperar el CID de IPFS
        const fineDetails = await blockchainService.getFineDetailsFromBlockchain(parseInt(fineId, 10));
        if (!fineDetails || !fineDetails.ipfsEvidenceHash) {
            return res.status(404).json({ message: "Evidence not found for this fine." });
        }

        // Recuperar el archivo desde IPFS
        res.setHeader('Content-Disposition', `inline; filename="evidence_${fineId}"`);
        const stream = await ipfsService.getFromIPFS(fineDetails.ipfsEvidenceHash);
        for await (const chunk of stream) {
            res.write(chunk);
        }
        res.end();
    } catch (error: any) {
        console.error("Error in getFineEvidence controller:", error);
        res.status(500).json({ message: 'Error retrieving fine evidence.', error: error.message });
    }
};

/**
 * Obtiene datos de multas desde Aptitud/SIMIT.
 */
export const getFineFromSIMIT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { plateNumber } = req.query;

        // Validar datos requeridos
        if (!plateNumber || typeof plateNumber !== 'string') {
            return res.status(400).json({ message: "Plate number query parameter is required." });
        }

        // Obtener datos de la API de Aptitud/SIMIT
        const simitData = await aptitudService.fetchFineFromAptitud(plateNumber, new Date().toISOString().split('T')[0]);

        res.status(200).json(simitData);
    } catch (error: any) {
        console.error("Error in getFineFromSIMIT controller:", error);
        res.status(500).json({ message: 'Error fetching fine from SIMIT.', error: error.message });
    }
};

/**
 * Importa multas desde Aptitud/SIMIT y las registra.
 */
interface ImportFromAptitudAndRegisterRequest extends Request {
    body: ImportFromAptitudDto;
}

interface ImportFromAptitudAndRegisterResponse extends Response {
    json: (body: { message: string }) => this;
}

export const importFromAptitudAndRegister = async (
    req: ImportFromAptitudAndRegisterRequest,
    res: ImportFromAptitudAndRegisterResponse
) => {
    // Logic for importing fines from Aptitud/SIMIT and registering them
    res.status(200).json({ message: 'Fines imported and registered successfully' });
};

/**
 * Obtiene multas por número de placa.
 */
export const getFinesByPlate = async (req: Request, res: Response) => {
    const { plateNumber } = req.params;

    // Placeholder logic for fetching fines by plate number
    res.status(200).json({
        message: `Fines for plate number ${plateNumber} retrieved successfully`,
        data: [], // Replace with actual data
    });
};

/**
 * Obtiene el historial de estados de una multa.
 */
export const getFineStatusHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fineId } = req.params;

        // Validar datos requeridos
        if (!fineId) {
            return res.status(400).json({ message: "Fine ID is required." });
        }

        // Obtener historial de estados desde la blockchain
        const statusHistory = await blockchainService.getFineStatusHistoryFromBlockchain(parseInt(fineId, 10));

        res.status(200).json({
            message: 'Fine status history retrieved successfully.',
            data: statusHistory,
        });
    } catch (error: any) {
        console.error("Error in getFineStatusHistory controller:", error);
        res.status(500).json({ message: 'Error retrieving fine status history.', error: error.message });
    }
};

