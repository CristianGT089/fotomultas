import { ethers } from 'ethers';
import FineManagementArtifact from '../../artifacts/contracts/FineManagement.sol/FineManagement.json'; // Adjust path
import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.NODE_RPC_URL!;
const OPERATOR_KEY = process.env.OPERATOR_PRIVATE_KEY!;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

if (!RPC_URL || !OPERATOR_KEY || !CONTRACT_ADDRESS) {
    throw new Error("Missing environment variables for blockchain service.");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(OPERATOR_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, FineManagementArtifact.abi, wallet);

export const fineManagementContract = contract;

// Enumeración para los estados de las multas en la blockchain
const FineStatusBlockchain = {
    PENDING: 0,
    PAID: 1,
    CANCELLED: 2,
    DISPUTED: 3,
} as const;

export { FineStatusBlockchain };

// Exporta el tipo de los valores de FineStatusBlockchain
export type FineStatus = typeof FineStatusBlockchain[keyof typeof FineStatusBlockchain];

// Example function wrapper
export const registerFineOnChain = async (
    plateNumber: string,
    evidenceCID: string,
    location: string,
    infractionType: string,
    cost: number,
    ownerIdentifier: string,
    externalSystemId: string = ""
) => {
    try {
        const tx = await contract.registerFine(
            plateNumber,
            evidenceCID,
            location,
            infractionType,
            ethers.parseUnits(cost.toString(), 0), // Assuming cost is an integer, no decimals for simplicity
            ownerIdentifier,
            externalSystemId
        );
        const receipt = await tx.wait();
        console.log('Fine registered on blockchain, TX hash:', receipt.hash);
        // Extract fineId from event if needed, or return from contract
        const event = receipt.logs?.find((log: any) => log.fragment?.name === 'FineRegistered');
        const fineId = event?.args[0] ? BigInt(event.args[0]).toString() : null;
        return { txHash: receipt.hash, fineId };
    } catch (error) {
        console.error("Error registering fine on chain:", error);
        throw error;
    }
};

export const updateFineStatusOnChain = async (
    fineId: number,
    newState: FineStatus, // Use the FineStatus type for stricter typing
    reason: string
) => {
    try {
        // Validate that the state is valid
        if (!Object.values(FineStatusBlockchain).includes(newState)) {
            throw new Error("Invalid status provided.");
        }

        const tx = await contract.updateFineStatus(fineId, newState, reason);
        const receipt = await tx.wait();
        console.log('Fine status updated, TX hash:', receipt.hash);
        return { txHash: receipt.hash };
    } catch (error) {
        console.error("Error updating fine status on chain:", error);
        throw error;
    }
};

export const getFineDetailsFromBlockchain = async (fineId: number) => {
    // Replace with actual logic to fetch fine details from the blockchain
    try {
        // Example: Simulate fetching fine details
        const fineDetails = {
            fineId,
            ipfsEvidenceHash: "QmExampleHash123", // Example IPFS hash
            status: "Pending",
        };
        return fineDetails;
    } catch (error) {
        console.error("Error fetching fine details from blockchain:", error);
        throw new Error("Unable to fetch fine details from blockchain.");
    }
};

// Add more wrappers for getFineDetails, getFinesByPlate, etc.

export async function registerFineOnBlockchain(
    externalSystemId: string,
    plateNumber: string,
    evidenceCID: string,
    infractionType: string,
    location: string,
    timestamp: number,
    cost: number
): Promise<{ fineId: string; transactionHash: string }> {
    // Implementación simulada para evitar el error
    return {
        fineId: "generatedFineId", // Reemplaza con la lógica real
        transactionHash: "generatedTransactionHash", // Reemplaza con la lógica real
    };
}

export async function linkFineToSIMIT(fineId: number, simitId: string): Promise<string> {
    // Implementación simulada para devolver un hash de transacción
    return `transactionHash_${fineId}_${simitId}`; // Reemplaza con la lógica real
}

export function getFineStatusHistoryFromBlockchain(arg0: number) {
    throw new Error('Function not implemented.');
}
