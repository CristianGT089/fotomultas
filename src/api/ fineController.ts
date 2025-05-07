import { Request, Response } from 'express';
import { uploadToIPFS, getFromIPFS } from '../services/ipfsService';
import { 
    registerFineOnBlockchain, 
    updateFineStatusOnBlockchain,
    getFineDetailsFromBlockchain,
    FineStatusBlockchain
} from '../services/blockchainService';
import { getSIMITFineByPlate } from '../services/simitService'; // Example

export const createFine = async (req: Request, res: Response) => {
  try {
    const {
      plateNumber,
      offenseType,
      location,
      offenseTimestamp, // Expect Unix timestamp
      amount,
      fineSIMITId = "" // Optional: ID from SIMIT if already known
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Evidence file is required.' });
    }

    if (!plateNumber || !offenseType || !location || !offenseTimestamp || amount === undefined) {
        return res.status(400).json({ message: 'Missing required fine details.' });
    }

    const ipfsHash = await uploadToIPFS(req.file.buffer, req.file.originalname);
    
    const result = await registerFineOnBlockchain(
      fineSIMITId,
      plateNumber,
      ipfsHash,
      offenseType,
      location,
      parseInt(offenseTimestamp, 10),
      parseInt(amount, 10)
    );

    res.status(201).json({
      message: 'Fine registered successfully.',
      fineId: result.fineId,
      ipfsHash,
      transactionHash: result.transactionHash,
    });
  } catch (error: any) {
    console.error("Error in createFine controller:", error);
    res.status(500).json({ message: 'Error registering fine.', error: error.message });
  }
};

export const updateFineStatus = async (req: Request, res: Response) => {
    try {
        const { fineId } = req.params;
        const { newStatus } = req.body; // e.g., "Paid", "Appealed"

        if (!fineId || newStatus === undefined) {
            return res.status(400).json({ message: 'Fine ID and new status are required.' });
        }
        
        // Map string status to enum value
        const statusEnumValue = FineStatusBlockchain[newStatus as keyof typeof FineStatusBlockchain];
        if (statusEnumValue === undefined) {
            return res.status(400).json({ message: 'Invalid status provided.' });
        }

        const transactionHash = await updateFineStatusOnBlockchain(
            parseInt(fineId, 10),
            statusEnumValue
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

export const getFine = async (req: Request, res: Response) => {
    try {
        const { fineId } = req.params;
        if (!fineId) {
            return res.status(400).json({ message: 'Fine ID is required.' });
        }
        const fineDetails = await getFineDetailsFromBlockchain(parseInt(fineId, 10));
        res.status(200).json(fineDetails);
    } catch (error: any) {
        console.error("Error in getFine controller:", error);
        res.status(500).json({ message: 'Error retrieving fine.', error: error.message });
    }
};

export const getFineEvidence = async (req: Request, res: Response) => {
    try {
        const { fineId } = req.params;
        if (!fineId) {
            return res.status(400).json({ message: 'Fine ID is required.' });
        }
        const fineDetails = await getFineDetailsFromBlockchain(parseInt(fineId, 10));
        if (!fineDetails || !fineDetails.ipfsEvidenceHash) {
            return res.status(404).json({ message: 'Evidence not found for this fine.' });
        }

        // This part is tricky because IPFS cat returns a stream.
        // You might want to set appropriate content type based on file extension.
        // For simplicity, we'll just pipe it.
        res.setHeader('Content-Disposition', `inline; filename="evidence_${fineId}"`); 
        // Potentially set Content-Type if you know it.
        
        const stream = await getFromIPFS(fineDetails.ipfsEvidenceHash);
        for await (const chunk of stream) {
            res.write(chunk);
        }
        res.end();

    } catch (error: any) {
        console.error("Error in getFineEvidence controller:", error);
        res.status(500).json({ message: 'Error retrieving fine evidence.', error: error.message });
    }
};

// Example of fetching from SIMIT and potentially syncing
export const getFineFromSIMIT = async (req: Request, res: Response) => {
    try {
        const { plateNumber } = req.query;
        if (!plateNumber || typeof plateNumber !== 'string') {
            return res.status(400).json({ message: 'Plate number query parameter is required.' });
        }
        const simitData = await getSIMITFineByPlate(plateNumber);
        
        // Here you could add logic to:
        // 1. Check if this SIMIT fine already exists in your blockchain (e.g., by SIMIT ID)
        // 2. If not, you might want to create a new record in your system.
        //    This would involve downloading any evidence from SIMIT (if possible), uploading to your IPFS,
        //    then calling `registerFineOnBlockchain`.

        res.status(200).json(simitData);
    } catch (error: any) {
        console.error("Error in getFineFromSIMIT controller:", error);
        res.status(500).json({ message: 'Error fetching fine from SIMIT.', error: error.message });
    }
};