import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'

let helia: any;
let fs: any;

// Inicializar Helia
try {
    helia = await createHelia();
    fs = unixfs(helia);
    console.log('Connected to Helia (IPFS replacement)');
} catch (error) {
    console.error('Failed to initialize Helia:', error);
}

/**
 * Sube un archivo a Helia.
 * @param fileBuffer - Contenido del archivo en formato Buffer.
 * @param fileName - Nombre del archivo.
 * @returns CID del archivo subido.
 */
export const uploadToIPFS = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
    if (!fs) throw new Error('Helia not initialized');
    try {
        const cid = await fs.addBytes(fileBuffer);
        console.log('Uploaded to Helia, CID:', cid.toString());
        return cid.toString();
    } catch (error) {
        console.error('Error uploading to Helia:', error);
        throw error;
    }
};

/**
 * Obtiene un archivo desde Helia.
 * @param cid - CID del archivo en Helia.
 * @returns Stream de datos del archivo.
 */
export const getFromIPFS = async (cid: string): Promise<AsyncIterable<Uint8Array>> => {
    if (!fs) throw new Error('Helia not initialized');
    try {
        const data = fs.cat(CID.parse(cid));
        return data;
    } catch (error) {
        console.error('Error fetching from Helia:', error);
        throw error;
    }
};