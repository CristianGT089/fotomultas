import { ethers } from "hardhat";

async function main() {
  const FotocomparendoFactory = await ethers.getContractFactory("Fotocomparendo");
  console.log("Deploying Fotocomparendo contract...");
  const fotocomparendo = await FotocomparendoFactory.deploy();

  // Wait for the deployment transaction to be mined
  const deploymentTx = await fotocomparendo.deploymentTransaction();
  if (deploymentTx) {
    await deploymentTx.wait();
  } else {
    throw new Error("Deployment transaction is null.");
  }

  console.log("Fotocomparendo contract deployed to:", fotocomparendo.target);
  // The deployer of the contract will be the owner by default due to OpenZeppelin's Ownable
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });