const { ethers } = require("hardhat");

async function main() {
  const provider = ethers.provider;
  
  // Get current gas price
  const gasPrice = await provider.getGasPrice();
  console.log("Current gas price:", ethers.utils.formatUnits(gasPrice, 'gwei'), "Gwei");
  
  // Get block to check base fee
  const block = await provider.getBlock("latest");
  console.log("Latest block number:", block.number);
  console.log("Base fee per gas:", ethers.utils.formatUnits(block.baseFeePerGas || 0, 'gwei'), "Gwei");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
