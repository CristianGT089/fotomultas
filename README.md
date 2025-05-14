# install ipfs
```shell
wget https://dist.ipfs.tech/kubo/v0.34.1/kubo_v0.34.1_linux-amd64.tar.gz
tar -xvzf kubo_v0.34.1_linux-amd64.tar.gz
cd kubo
sudo bash install.sh
ipfs --version
```

# To Start
Se recomienda usar (node v.20.18.0)
```shell
nvm use 20.18.0
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
ipfs init
ipfs daemon
npx ts-node src/server.ts
```

# Tecnologias

helia: https://ipfs.github.io/helia/modules/helia.html
apitude: https://apitude.co/es/docs/services/simit-co/
hardhat: https://hardhat.org/hardhat-runner/docs/getting-started#overview
alchemy: https://dashboard.alchemy.com/
openZeppelin: https://docs.openzeppelin.com/
# Comandos Hardhat
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
```


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
```