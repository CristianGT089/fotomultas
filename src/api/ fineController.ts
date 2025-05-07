import { Request, Response } from 'express';
import { uploadToIPFS, getFromIPFS } from '../services/ipfsService';
import { 
    registerFineOnBlockchain, 
    updateFineStatusOnBlockchain,
    getFineDetailsFromBlockchain,
    FineStatusBlockchain
} from '../services/blockchainService';
import { getSIMITFineByPlate } from '../services/simitService'; // Example

export const createFine = async (req: Request, res: Response): Promise<void> => {
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
      res.status(400).json({ message: 'Evidence file is required.' });
      return;
    }

    if (!plateNumber || !offenseType || !location || !offenseTimestamp || amount === undefined) {
      res.status(400).json({ message: 'Missing required fine details.' });
      return;
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

export const updateFineStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fineId } = req.params;
    const { newStatus } = req.body;

    if (!fineId || newStatus === undefined) {
      res.status(400).json({ message: 'Fine ID and new status are required.' });
      return;
    }

    const statusEnumValue = FineStatusBlockchain[newStatus as keyof typeof FineStatusBlockchain];
    if (statusEnumValue === undefined) {
      res.status(400).json({ message: 'Invalid status provided.' });
      return;
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

export const getFine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fineId } = req.params;
    if (!fineId) {
      res.status(400).json({ message: 'Fine ID is required.' });
      return;
    }
    const fineDetails = await getFineDetailsFromBlockchain(parseInt(fineId, 10));
    res.status(200).json(fineDetails);
  } catch (error: any) {
    console.error("Error in getFine controller:", error);
    res.status(500).json({ message: 'Error retrieving fine.', error: error.message });
  }
};

export const getFineEvidence = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fineId } = req.params;
    if (!fineId) {
      res.status(400).json({ message: 'Fine ID is required.' });
      return;
    }
    const fineDetails = await getFineDetailsFromBlockchain(parseInt(fineId, 10));
    if (!fineDetails || !fineDetails.ipfsEvidenceHash) {
      res.status(404).json({ message: 'Evidence not found for this fine.' });
      return;
    }

    res.setHeader('Content-Disposition', `inline; filename="evidence_${fineId}"`); 

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

export const getFineFromSIMIT = async (req: Request, res: Response): Promise<void> => {
  try {
    const { plateNumber } = req.query;
    if (!plateNumber || typeof plateNumber !== 'string') {
      res.status(400).json({ message: 'Plate number query parameter is required.' });
      return;
    }
    const simitData = await getSIMITFineByPlate(plateNumber);

    res.status(200).json(simitData);
  } catch (error: any) {
    console.error("Error in getFineFromSIMIT controller:", error);
    res.status(500).json({ message: 'Error fetching fine from SIMIT.', error: error.message });
  }
};