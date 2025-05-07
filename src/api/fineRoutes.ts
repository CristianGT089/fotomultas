import express from 'express';
import multer from 'multer';
import { createFine, updateFineStatus, getFine, getFineEvidence, getFineFromSIMIT } from './fineController';

const router = express.Router();

// Multer setup for handling file uploads (evidence)
const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage: storage });

// Create a new fine (evidence uploaded to IPFS, metadata to blockchain)
router.post('/', upload.single('evidenceFile'), createFine);

// Update the status of an existing fine
router.put('/:fineId/status', updateFineStatus);

// Get fine details from blockchain
router.get('/:fineId', getFine);

// Get fine evidence from IPFS
router.get('/:fineId/evidence', getFineEvidence);

// Example: Get fine data from SIMIT (via Aptitud)
router.get('/simit', getFineFromSIMIT);


export default router;