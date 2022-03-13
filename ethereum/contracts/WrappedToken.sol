//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";

contract WrappedToken is ERC20, ERC20Wrapper {
  constructor(IERC20 wrappedToken) ERC20("WrappedToken", "wTK") ERC20Wrapper(wrappedToken) {
  }

  function decimals() public view virtual override returns (uint8) {
    return 6;
  }
}
