import { ethers } from "hardhat";

async function main() {
  const FotocomparendoFactory = await ethers.getContractFactory("Fotocomparendo");
  console.log("Deploying Fotocomparendo contract...");
  const fotocomparendo = await FotocomparendoFactory.deploy();
  await fotocomparendo.deployed();

  console.log("Fotocomparendo contract deployed to:", fotocomparendo.address);
  // The deployer of the contract will be the owner by default due to OpenZeppelin's Ownable
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });