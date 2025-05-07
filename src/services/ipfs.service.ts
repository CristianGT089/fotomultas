import { create, IPFSHTTPClient } from 'kubo-rpc-client';
import dotenv from 'dotenv';

dotenv.config();

let ipfs: IPFSHTTPClient | undefined;

try {
    ipfs = create({ url: process.env.IPFS_API_URL });
    console.log('Connected to IPFS node at:', process.env.IPFS_API_URL);
} catch (error) {
    console.error('Failed to connect to IPFS node:', error);
    ipfs = undefined;
}

if (!ipfs) {
    throw new Error('Failed to initialize IPFS client. Check your IPFS node or configuration.');
}

export const uploadToIPFS = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
    if (!ipfs) throw new Error('IPFS client not initialized');
    try {
        const result = await ipfs.add({
            path: fileName,
            content: fileBuffer,
        });
        console.log('Uploaded to IPFS, CID:', result.cid.toString());
        return result.cid.toString();
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
};

export const getFromIPFS = async (cid: string): Promise<AsyncIterable<Uint8Array>> => {
    if (!ipfs) throw new Error('IPFS client not initialized');
    try {
        return ipfs.cat(cid);
    } catch (error) {
        console.error('Error fetching from IPFS:', error);
        throw error;
    }
};