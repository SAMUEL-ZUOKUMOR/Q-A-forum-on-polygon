import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

describe('Goflow', function () {
  let goflow: Contract, owner: SignerWithAddress, otherAccount: SignerWithAddress;

  const deployContract = async () => {
    // Contracts are deployed using the first signer/account by default
    // but we can create multiple user accounts for testing
    const [_owner, _otherAccount] = await ethers.getSigners();

    // Make sure the string argument passed to getContractFactory matches
    // the exact name of your token contract!
    const Goflow = await ethers.getContractFactory('Goflow');
    goflow = await Goflow.deploy();

    owner = _owner;
    otherAccount = _otherAccount; 
  }

  const mint = async (user: SignerWithAddress, amount: number) => {
  // We mock different users with the `connect` method
    const tx = await goflow.connect(user).mint(amount);
    await tx.wait();
  }

  beforeEach( async () => {
    await deployContract();
  })

  describe("Deployment", () => {
    it("Should deploy and return correct symbol", async () => {
      expect(await goflow.symbol()).to.equal("GOFLOW");
    });
  });

  describe("Minting", () => {
  it("Should mint tokens to user", async () => {
    await mint(owner, 100);
  // We need to input an address correctly!
    expect(await goflow.balanceOf(owner.address)).to.equal(100);
  });
});
});