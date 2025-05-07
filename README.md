# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
usar nvm use 20 (node v.20)
npx hardhat test
npx hardhat compile
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
npx hardhat run scripts/deploy.ts --network localhost

ipfs daemon
wget https://dist.ipfs.tech/kubo/v0.34.1/kubo_v0.34.1_linux-amd64.tar.gz
tar -xvzf kubo_v0.34.1_linux-amd64.tar.gz
cd kubo
sudo bash install.sh
ipfs --version

ipfs init
npx ts-node src/server.ts
npx hardhat node

## API Endpoints

### Asociar Multa con SIMIT
**PUT /api/fines/:fineId/link-simit**

Asocia una multa existente con un ID externo del sistema SIMIT.

**Body:**
```json
{
  "simitId": "SIMIT-12345"
}'
{
  "message": "Fine linked to SIMIT successfully.",
  "transactionHash": "0x123abc..."
}