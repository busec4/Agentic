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
    event ApprovalGiven(address indexed user, uint256 amount);
    event SwappedEthForToken(
        address indexed user,
        uint256 ethAmount,
        uint256 tokenAmount
    );
    event SwappedTokenForEth(
        address indexed user,
        uint256 tokenAmount,
        uint256 ethAmount
    );

    receive() external payable {
        emit Deposited(msg.value);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function swapEthForToken() external payable {
        require(msg.value > 0, "Must send ETH to swap");
        uint256 tokenAmount = getTokenAmount(msg.value);
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Not enough tokens in pool"
        );
        token.transfer(msg.sender, tokenAmount);
        emit SwappedEthForToken(msg.sender, msg.value, tokenAmount);
    }

    function swapTokenForEth(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Must send tokens to swap");
        uint256 ethAmount = getEthAmount(tokenAmount);
        require(address(this).balance >= ethAmount, "Not enough ETH in pool");
        token.transferFrom(msg.sender, address(this), tokenAmount);
        payable(msg.sender).transfer(ethAmount);
        emit SwappedTokenForEth(msg.sender, tokenAmount, ethAmount);
    }

    function approvePool(uint256 amount) external {
        token.approve(address(this), amount);
        emit ApprovalGiven(msg.sender, amount);
    }

    function getTokenAmount(uint256 ethAmount) public pure returns (uint256) {
        return ethAmount * 100; // Örnek oran: 1 ETH = 100 Token
    }

    function getEthAmount(uint256 tokenAmount) public pure returns (uint256) {
        return tokenAmount / 100; // Örnek oran: 100 Token = 1 ETH
    }
}
