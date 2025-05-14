import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid';
import type { Helia } from '@helia/interface';
import type { UnixFS } from '@helia/unixfs';
import dotenv from 'dotenv';

dotenv.config();

let helia: Helia | undefined;
let fs: UnixFS | undefined;

const initializeHelia = async () => {
    try {
        helia = await createHelia();
        fs = unixfs(helia);
        console.log('Helia instance created successfully');
    } catch (error) {
        console.error('Failed to initialize Helia:', error);
        helia = undefined;
        fs = undefined;
    }

    if (!helia || !fs) {
        throw new Error('Failed to initialize Helia. Check your configuration.');
    }
};

// Initialize Helia when the module is imported
initializeHelia().catch(error => {
    console.error('Failed to initialize Helia:', error);
    process.exit(1);
});

export const uploadToIPFS = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
    if (!fs) throw new Error('Helia UnixFS not initialized');
    try {
        const cid = await fs.addBytes(fileBuffer);
        console.log('Uploaded to IPFS, CID:', cid.toString());
        return cid.toString();
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
};

export const getFromIPFS = async (cid: string): Promise<Uint8Array[]> => {
    if (!fs) throw new Error('Helia UnixFS not initialized');
    try {
        const cidObj = CID.parse(cid);
        const chunks: Uint8Array[] = [];
        for await (const chunk of fs.cat(cidObj)) {
            chunks.push(chunk);
        }
        return chunks;
    } catch (error) {
        console.error('Error fetching from IPFS:', error);
        throw error;
    }
};