// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./Token.sol";

contract Pool {
    address private immutable owner;
    IToken public token;

    constructor(address _token) {
        owner = msg.sender;
        token = IToken(_token);
        token.setPool(address(this));
    }

    event Deposited(uint256 amount);

    receive() external payable {
        emit Deposited(msg.value);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
