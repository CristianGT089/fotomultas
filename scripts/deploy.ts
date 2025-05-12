// import { ethers } from "ethers"; // Import ethers from the ethers package
import { ethers as hardhatEthers } from "hardhat"; // Import Hardhat's ethers wrapper

async function main() {
  const PhotomultaFactory = await hardhatEthers.getContractFactory("Photomulta");
  console.log("Deploying Photomulta contract...");
  const Photomulta = await PhotomultaFactory.deploy();

  // Wait for the deployment transaction to be mined
  await Photomulta.waitForDeployment();

  console.log("Photomulta contract deployed to:", await Photomulta.getAddress());
  // The deployer of the contract will be the owner by default due to OpenZeppelin's Ownable
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });