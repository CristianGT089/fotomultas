import { ethers } from 'ethers';
import { config } from '../config';
import FotocomparendoABI from '../config/Fotocomparendo.json'; // Ajusta la ruta si es necesario

const provider = new ethers.JsonRpcProvider(config.rpcUrl);
const wallet = new ethers.Wallet(config.privateKey, provider);
const contract = new ethers.Contract(config.contractAddress, FotocomparendoABI.abi, wallet);


/**
 * Asocia una multa con un ID externo del sistema SIMIT.
 * @param fineId ID de la multa en la blockchain.
 * @param simitId ID externo del sistema SIMIT.
 * @returns Hash de la transacción.
 */
export async function linkFineToSIMIT(fineId: number, simitId: string): Promise<string> {
    try {
        const tx = await contract.linkToSIMIT(fineId, simitId);
        const receipt = await tx.wait();
        console.log('Fine linked to SIMIT:', receipt.transactionHash);
        return receipt.transactionHash;
    } catch (error) {
        console.error("Error linking fine to SIMIT:", error);
        throw error;
    }
}

export enum FineStatusBlockchain {
    Pending = 0,
    Paid = 1,
    Appealed = 2,
    Cancelled = 3,
    SIMITVerified = 4,
}

/**
 * Registra una multa en la blockchain.
 * @param fineSIMITId - ID externo del sistema SIMIT (opcional).
 * @param plateNumber - Número de placa del vehículo.
 * @param ipfsEvidenceHash - CID de IPFS de la evidencia.
 * @param offenseType - Tipo de infracción.
 * @param location - Ubicación de la infracción.
 * @param offenseTimestamp - Marca de tiempo de la infracción (Unix timestamp).
 * @param amount - Monto de la multa.
 * @returns Hash de la transacción y ID de la multa.
 */
export async function registerFineOnBlockchain(
    fineSIMITId: string,
    plateNumber: string,
    ipfsEvidenceHash: string,
    offenseType: string,
    location: string,
    offenseTimestamp: number,
    amount: number
): Promise<{ transactionHash: string; fineId: number }> {
    try {
        const tx = await contract.registerFine(
            fineSIMITId,
            plateNumber,
            ipfsEvidenceHash,
            offenseType,
            location,
            offenseTimestamp,
            amount
        );
        const receipt = await tx.wait();
        console.log('Fine registered on blockchain:', receipt.transactionHash);

        // Extraer el ID de la multa del evento emitido
        let fineId = 0;
        if (receipt.events) {
            const event = receipt.events.find((e: any) => e.event === "FineRegistered");
            if (event && event.args) {
                fineId = event.args.id.toNumber();
            }
        }

        return { transactionHash: receipt.transactionHash, fineId };
    } catch (error) {
        console.error("Error registering fine on blockchain:", error);
        throw error;
    }
}

/**
 * Actualiza el estado de una multa en la blockchain.
 * @param fineId - ID de la multa.
 * @param newStatus - Nuevo estado de la multa.
 * @returns Hash de la transacción.
 */
export async function updateFineStatusOnBlockchain(
    fineId: number,
    newStatus: FineStatusBlockchain
): Promise<string> {
    try {
        const tx = await contract.updateFineStatus(fineId, newStatus);
        const receipt = await tx.wait();
        console.log('Fine status updated on blockchain:', receipt.transactionHash);
        return receipt.transactionHash;
    } catch (error) {
        console.error("Error updating fine status on blockchain:", error);
        throw error;
    }
}

/**
 * Obtiene los detalles de una multa desde la blockchain.
 * @param fineId - ID de la multa.
 * @returns Detalles de la multa.
 */
export async function getFineDetailsFromBlockchain(fineId: number): Promise<any> {
    try {
        const fineData = await contract.getFineDetails(fineId);
        return {
            id: fineData.id.toNumber(),
            fineSIMITId: fineData.fineSIMITId,
            plateNumber: fineData.plateNumber,
            ipfsEvidenceHash: fineData.ipfsEvidenceHash,
            offenseType: fineData.offenseType,
            location: fineData.location,
            offenseTimestamp: fineData.offenseTimestamp.toNumber(),
            amount: fineData.amount.toString(),
            status: fineData.status,
            registrar: fineData.registrar,
            lastUpdated: fineData.lastUpdated.toNumber(),
        };
    } catch (error) {
        console.error("Error fetching fine details from blockchain:", error);
        throw error;
    }
}