import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20Token", function () {
  it("owner can mint tokens", async function () {
    const [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ERC20Token");
    const token = await Token.deploy("MyToken", "MTK");

    await token.mint(user.address, ethers.parseEther("100"));

    const balance = await token.balanceOf(user.address);
    expect(balance).to.equal(ethers.parseEther("100"));
  });

  it("non-owner cannot mint tokens", async function () {
    const [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ERC20Token");
    const token = await Token.deploy("MyToken", "MTK");

    await expect(
      token.connect(user).mint(user.address, 1)
    ).to.be.reverted;
  });

  it("user can burn own tokens", async function () {
    const [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ERC20Token");
    const token = await Token.deploy("MyToken", "MTK");

    await token.mint(user.address, ethers.parseEther("50"));
    await token.connect(user).burn(ethers.parseEther("10"));

    const balance = await token.balanceOf(user.address);
    expect(balance).to.equal(ethers.parseEther("40"));
  });
});
