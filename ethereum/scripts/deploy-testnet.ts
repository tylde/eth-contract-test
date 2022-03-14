import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const FiatToken = await ethers.getContractFactory('FiatToken');
  const fiatTokenContract = await FiatToken.deploy();

  await fiatTokenContract.deployed();

  console.log('FiatToken Contract deployed to:', fiatTokenContract.address);

  // ---

  const WrappedToken = await ethers.getContractFactory('WrappedToken');
  const wrappedTokenContract = await WrappedToken.deploy(fiatTokenContract.address);

  await wrappedTokenContract.deployed();

  console.log('WrappedToken Contract deployed to:', wrappedTokenContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
