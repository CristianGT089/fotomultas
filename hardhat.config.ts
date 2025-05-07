import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

// Validar variables críticas
if (!process.env.PRIVATE_KEY || !process.env.RPC_URL) {
  throw new Error("Missing critical environment variables: PRIVATE_KEY or RPC_URL");
}

const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: process.env.RPC_URL,// URL del nodo RPC (por ejemplo, Infura o Alchemy)
      accounts: [process.env.PRIVATE_KEY]// Clave privada para firmar transacciones
    }
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

export default config;