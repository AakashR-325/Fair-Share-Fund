const hre = require("hardhat");

async function main() {
  const FairShareFund = await hre.ethers.getContractFactory("FairShareFund");
  const fairShareFund = await FairShareFund.deploy();
  await fairShareFund.waitForDeployment();

  console.log(`protocol contract deployed at : ${fairShareFund.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
