import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

// Validar variables críticas
if (!process.env.PRIVATE_KEY || !process.env.RPC_URL) {
  throw new Error("Missing critical environment variables: PRIVATE_KEY or RPC_URL");
}

const config: HardhatUserConfig = {
  solidity: "0.8.28", // Versión del compilador Solidity
  networks: {
    hardhat: {
      chainId: 31337, // Red local de Hardhat
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Nodo local
      chainId: 31337,
    },
    goerli: {
      url: process.env.RPC_URL, // URL del nodo RPC (por ejemplo, Infura o Alchemy)
      accounts: [process.env.PRIVATE_KEY], // Clave privada para firmar transacciones
      chainId: 5, // ID de la red Goerli
    },
  },
  paths: {
    artifacts: "./artifacts", // Directorio de salida para contratos compilados
    cache: "./cache", // Directorio de caché
  },
  mocha: {
    timeout: 20000, // Tiempo máximo para pruebas (en milisegundos)
  },
};

export default config;