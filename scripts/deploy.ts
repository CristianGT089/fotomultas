import { ethers } from "hardhat"; // Import ethers from the ethers package
// import { ethers as hardhatEthers } from "hardhat"; // Import Hardhat's ethers wrapper

async function main() {
  const PhotomultaFactory = await ethers.getContractFactory("Photomulta");
  console.log("Deploying Photomulta contract...");
  const Photomulta = await PhotomultaFactory.deploy();

  // Wait for the deployment transaction to be mined
  const deploymentTx = await Photomulta.deploymentTransaction();
  if (deploymentTx) {
    await deploymentTx.wait();
  } else {
    throw new Error("Deployment transaction is null.");
  }

  console.log("Fotocomparendo contract deployed to:",Photomulta.target);
  // The deployer of the contract will be the owner by default due to OpenZeppelin's Ownable
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });