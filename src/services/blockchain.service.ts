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
    newState: number, // Corresponds to FineState enum (0:PENDING, 1:PAID, etc.)
    reason: string
) => {
    try {
        const tx = await contract.updateFineStatus(fineId, newState, reason);
        const receipt = await tx.wait();
        console.log('Fine status updated, TX hash:', receipt.hash);
        return { txHash: receipt.hash };
    } catch (error) {
        console.error("Error updating fine status on chain:", error);
        throw error;
    }
};

// Add more wrappers for getFineDetails, getFinesByPlate, etc.