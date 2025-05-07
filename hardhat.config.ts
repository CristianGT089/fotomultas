import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

// Validar variables críticas
if (!process.env.MNEMONIC || !process.env.RPC_URL) {
  throw new Error("Missing critical environment variables: MNEMONIC or RPC_URL");
}

const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    sepolia: {
      url: process.env.RPC_URL,// URL del nodo RPC (por ejemplo, Infura o Alchemy)
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
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