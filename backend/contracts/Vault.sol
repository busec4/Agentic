// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IVault {
    function getBalance() external view returns (uint256);

    function withdraw(uint256 amount) external;
}

contract Vault {
    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }

    event Deposited(uint256 amount);

    receive() external payable {
        emit Deposited(msg.value);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(amount);
    }
}
