// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IToken is IERC20 {
    function mint(address to, uint256 amount) external payable;

    function listPresale(address presale, uint256 amount) external;

    function getVaultAddress() external view returns (address);
}

contract Token is ERC20, IToken {
    address immutable owner;
    address immutable vault;
    uint256 public constant k = 0.001 ether;

    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        uint256 initialSupply,
        address _vault
    ) ERC20(tokenName_, tokenSymbol_) {
        _mint(msg.sender, initialSupply);

        owner = msg.sender;
        vault = _vault;
    }

    function getPrice(uint256 amount) public view returns (uint256) {
        uint256 currentSupply = totalSupply();
        uint256 newSupply = currentSupply + amount;
        uint256 price = ((newSupply * (newSupply + 1)) -
            (currentSupply * (currentSupply + 1))) / 2;
        return price * k;
    }

    function mint(address to, uint256 amount) public payable override {
        uint256 cost = getPrice(amount);
        require(msg.value >= cost, "Insufficient ETH sent");
        _mint(to, amount);
        payable(vault).transfer(msg.value);
    }

    function listPresale(address presale, uint256 amount) public {
        require(msg.sender == owner, "Only owner can list presale");
        approve(presale, amount);
        transferFrom(msg.sender, presale, amount);
    }

    function getVaultAddress() external view override returns (address) {
        return vault;
    }
}
