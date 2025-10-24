const hre = require("hardhat");

async function main() {
  console.log("Deploying GrantMind contracts to Celo Alfajores...");

  try {
    // Get the default provider
    const provider = hre.ethers.provider;
    
    // Get the signer
    const [deployer] = await hre.ethers.getSigners();
    
    if (!deployer || !deployer.address) {
      throw new Error("No deployer account found. Please check your private key configuration.");
    }
    
    console.log("Deploying with account:", deployer.address);
    
    const balance = await provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.utils.formatEther(balance), "CELO");

    // Deploy GrantToken
    console.log("\n1. Deploying GrantToken...");
    const GrantToken = await hre.ethers.getContractFactory("GrantToken", deployer);
    const grantToken = await GrantToken.deploy();
    await grantToken.deployed();
    console.log("✓ GrantToken deployed to:", grantToken.address);

    // Deploy GrantMindDAO
    console.log("\n2. Deploying GrantMindDAO...");
    const GrantMindDAO = await hre.ethers.getContractFactory("GrantMindDAO", deployer);
    const grantMindDAO = await GrantMindDAO.deploy();
    await grantMindDAO.deployed();
    console.log("✓ GrantMindDAO deployed to:", grantMindDAO.address);

    // Initial setup
    console.log("\n3. Setting up initial configuration...");
    
    // Fund the treasury with some initial CELO (if needed)
    const minBalance = hre.ethers.utils.parseEther("10");
    if (balance.gt(minBalance)) {
      console.log("Funding treasury with 10 CELO...");
      const depositTx = await grantMindDAO.depositToTreasury({ 
        value: minBalance 
      });
      await depositTx.wait();
      console.log("✓ Treasury funded with 10 CELO");
    } else {
      console.log(`⚠️  Insufficient balance to fund treasury (need 10 CELO, have ${hre.ethers.utils.formatEther(balance)} CELO)`);
    }

    // Grant GrantMindDAO contract the MINTER_ROLE for the token
    console.log("Granting MINTER_ROLE to DAO contract...");
    const MINTER_ROLE = await grantToken.MINTER_ROLE();
    const grantRoleTx = await grantToken.grantRole(MINTER_ROLE, grantMindDAO.address);
    await grantRoleTx.wait();
    console.log("✓ MINTER_ROLE granted to GrantMindDAO");

    // Set up an AI Oracle address (using deployer as default)
    console.log("Setting up AI Oracle...");
    const aiOracleTx = await grantMindDAO.addAIOracle(deployer.address);
    await aiOracleTx.wait();
    console.log("✓ AI Oracle added:", deployer.address);

    console.log("\n====================================");
    console.log("✅ Deployment complete!");
    console.log("GrantToken address:", grantToken.address);
    console.log("GrantMindDAO address:", grantMindDAO.address);
    console.log("Deployer address:", deployer.address);
    console.log("====================================\n");

    // Verify contracts on CeloScan (if API key is provided)
    if (process.env.CELOSCAN_API_KEY) {
      console.log("\nVerifying contracts on CeloScan...");
      try {
        await hre.run("verify:verify", {
          address: grantToken.address,
          constructorArguments: [],
        });
        await hre.run("verify:verify", {
          address: grantMindDAO.address,
          constructorArguments: [grantToken.address],
        });
        console.log("✓ Contracts verified on CeloScan");
      } catch (error) {
        console.log("⚠️  Verification failed:", error.message);
      }
    } else {
      console.log("\n⚠️  CELOSCAN_API_KEY not found. Skipping contract verification.");
    }

    console.log("\n🔗 Explorer Links:");
    console.log(`- GrantToken: https://alfajores.celoscan.io/address/${grantToken.address}`);
    console.log(`- GrantMindDAO: https://alfajores.celoscan.io/address/${grantMindDAO.address}`);

  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    if (error.code === 'INVALID_ARGUMENT' && error.argument === 'privateKey') {
      console.error('\n⚠️  Please check your PRIVATE_KEY in the .env file.');
      console.error('   Make sure it starts with 0x and is a valid private key.');
    }
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });