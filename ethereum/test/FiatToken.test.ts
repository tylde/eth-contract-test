import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('MyToken', function () {
  let contract: Contract;
  let signer: SignerWithAddress;
  let address: string;

  beforeEach(async function () {
    const FiatToken = await ethers.getContractFactory('FiatToken');
    contract = await FiatToken.deploy();

    [signer] = await ethers.getSigners();
    address = await signer.getAddress();
  });

  it('Should send some tokens on request', async function () {
    expect(await contract.balanceOf(address)).to.equal(0);

    await contract.requestSome();

    expect(await contract.balanceOf(address)).to.equal(10e6);
    expect(await contract.totalSupply()).to.equal(10e6);
  });

  it('Should not send some tokens on request twice', async function () {
    expect(await contract.balanceOf(address)).to.equal(0);

    await contract.requestSome();
    await expect(contract.requestSome()).to.be.revertedWith('Already requested');

    expect(await contract.balanceOf(address)).to.equal(10e6);
    expect(await contract.totalSupply()).to.equal(10e6);
  });
});
