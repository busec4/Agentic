//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Token.sol";

contract Presale {
    IToken public token;
    address poolAddress;
    uint256 public immutable deadline;
    uint256 public immutable target;
    event Bought(address buyer, uint256 amount);
    event Ended(uint256 amount);

    constructor(address _token, uint256 _deadline, uint256 _target) {
        require(block.timestamp < deadline, "Presale has ended");
        token = IToken(_token);
        poolAddress = token.getPooladdress();
        deadline = _deadline;
        target = _target;
    }

    function buyToken(uint256 amount) public payable {
        require(block.timestamp < deadline, "Presale has ended");

        uint256 price = token.getCurrentBuyPrice(amount) * amount;
        require(msg.value >= price, "Insufficient funds");
        pool.call{value: msg.value}("");
        token.transferFrom(token.getOwner(), msg.sender, amount);
    }
}
