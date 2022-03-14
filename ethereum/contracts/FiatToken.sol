//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FiatToken is ERC20 {
  mapping(address => bool) alreadyRequested;

  constructor() ERC20("FiatToken", "FTK") {
  }

  function decimals() public view virtual override returns (uint8) {
    return 6;
  }

  function isAlreadyRequested(address wallet) public view returns (bool) {
    return alreadyRequested[wallet];
  }

  function requestSome() public {
    require(alreadyRequested[msg.sender] == false, 'Already requested');
    _mint(msg.sender, 10e6);
    alreadyRequested[msg.sender] = true;
  }
}
