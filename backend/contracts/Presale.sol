//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Token.sol";
import "./Vault.sol";

contract Presale {
    IToken public token;
    IVault public vault;
    uint256 public immutable deadline;
    uint256 public immutable target;
    event Bought(address buyer, uint256 amount);
    event Ended(uint256 amount);

    constructor(address _token, uint256 _deadline, uint256 _target) {
        require(block.timestamp < deadline, "Presale has ended");
        token = IToken(_token);
        vault = IVault(token.getVaultAddress());
        deadline = _deadline;
        target = _target;
    }

    function buyToken(uint256 amount) public payable {
        require(block.timestamp < deadline, "Presale has ended");
        require(msg.value >= amount, "Insufficient ETH sent");
        token.mint{value: msg.value}(msg.sender, amount);
        if (vault.getBalance() >= target) {
            emit Ended(vault.getBalance());
        }
        emit Bought(msg.sender, amount);
    }
}
