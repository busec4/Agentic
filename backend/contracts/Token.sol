// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IToken is IERC20 {
    function listPresale(address presale) external;

    function getPoolAddress() external view override returns (address);

    function getCurrentBuyPrice(uint256 amount) public view returns (uint256);

    function getCurrentSellPrice(uint256 amount) public view returns (uint256);

    function getOwner() external view returns (address);
}

contract Token is ERC20, IToken {
    address immutable owner;
    address pool;
    uint256 public constant sumMultiplier = 1.2;
    uint256 public constant subMultiplier = 0.7;
    uint256 public immutable maxSupply;
    uint256 public devSupplyRate;
    uint256 public investorSupplyRate;
    uint256 public constant initialEth = 0.1 ether;
    uint256 public devSupply;
    uint256 public investorSupply;
    uint256 public price;

    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        uint256 _maxSupply,
        uint256 _devSupplyRate,
        uint256 _investorSupplyRate,
        uint256 _price
    ) ERC20(tokenName_, tokenSymbol_) {
        _mint(msg.sender, _maxSupply);
        maxSupply = _maxSupply;
        owner = msg.sender;
        devSupplyRate = _devSupplyRate;
        investorSupplyRate = _investorSupplyRate;
        payable(pool).transfer(initialEth);

        investorSupply = (_maxSupply * investorSupplyRate) / 100;
        devSupply = (_maxSupply * devSupplyRate) / 100;
        price = _price;
    }

    function setPool(address _pool) public {
        require(msg.sender == owner, "Only owner can set pool");
        pool = _pool;
        uint256 poolToken = (_maxSupply *
            (100 - devSupplyRate - investorSupplyRate)) / 100;
        super.transfer(pool, poolToken);
    }

    function getCurrentBuyPrice(uint256 amount) public view returns (uint256) {
        for (uint256 i = 0; i < totalSold + amount; i++) {
            price = price * sumMultiplier;
        }
        return price;
    }

    function getCurrentSellPrice(uint256 amount) public view returns (uint256) {
        for (uint256 i = 0; i < totalSold + amount; i++) {
            price = price * subMultiplier;
        }
        return price;
    }

    function listPresale(address presale) public {
        require(msg.sender == owner, "Only owner can list presale");
        require(presale != address(0), "Zero addresses are not allowed.");
        approve(presale, investorSupply);
    }

    function getPoolAddress() external view override returns (address) {
        return pool;
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}
