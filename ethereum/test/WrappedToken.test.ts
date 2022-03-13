import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('MyToken', function () {
  let fiatContract: Contract;
  let contract: Contract;
  let signer: SignerWithAddress;
  let address: string;

  beforeEach(async function () {
    const FiatToken = await ethers.getContractFactory('FiatToken');
    fiatContract = await FiatToken.deploy();

    const WrappedToken = await ethers.getContractFactory('WrappedToken');
    contract = await WrappedToken.deploy(fiatContract.address);

    [signer] = await ethers.getSigners();
    address = await signer.getAddress();
  });

  it('Should wrap tokens', async function () {
    expect(await fiatContract.balanceOf(address)).to.equal(0);
    expect(await contract.balanceOf(address)).to.equal(0);

    await fiatContract.requestSome();
    expect(await fiatContract.balanceOf(address)).to.equal(10e6);

    await fiatContract.approve(contract.address, 2e6);

    await contract.depositFor(address, 2e6);

    expect(await fiatContract.balanceOf(address)).to.equal(8e6);
    expect(await contract.balanceOf(address)).to.equal(2e6);
    expect(await contract.totalSupply()).to.equal(2e6);
  });
});
