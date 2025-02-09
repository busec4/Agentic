// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SuccessCurve.sol";

interface IToken is IERC20 {
    function listPresale(address presale) external;

    function getPoolAddress() external view returns (address);

    function getCurrentBuyPrice(uint256 amount) external view returns (uint256);

    function getCurrentSellPrice(
        uint256 amount
    ) external view returns (uint256);

    function getOwner() external view returns (address);

    function increaseTotalSold(uint256 amount) external;

    function setPool(address _pool) external;

    function setSuccessCurve(address _successCurve) external;
}

contract Token is ERC20, IToken {
    address public immutable owner;
    address public pool;

    uint256 public constant sumMultiplier = 12 * 10 ** 17; // 1.2
    uint256 public constant subMultiplier = 7 * 10 ** 17; // 0.7

    uint256 public immutable maxSupply;
    uint256 public immutable devSupplyRate;
    uint256 public immutable investorSupplyRate;

    uint256 public constant initialEth = 0.1 ether;
    uint256 public devSupply;
    uint256 public investorSupply;
    uint256 public price;
    ISuccessBondingCurve public successCurve;
    uint256 public totalSold;

    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        uint256 _maxSupply,
        uint256 _devSupplyRate,
        uint256 _investorSupplyRate,
        uint256 _price
    ) ERC20(tokenName_, tokenSymbol_) {
        owner = msg.sender;
        maxSupply = _maxSupply;
        devSupplyRate = _devSupplyRate;
        investorSupplyRate = _investorSupplyRate;
        price = _price;

        investorSupply = (_maxSupply * investorSupplyRate) / 100;
        devSupply = (_maxSupply * devSupplyRate) / 100;

        uint256 poolSupply = _maxSupply - (investorSupply + devSupply);

        _mint(msg.sender, devSupply);
        _mint(address(this), investorSupply);
        _mint(address(this), poolSupply);
    }

    function setPool(address _pool) external {
        //require(msg.sender == owner, "Only owner can set pool");
        require(pool == address(0), "Pool already set");

        pool = _pool;

        uint256 poolToken = maxSupply - (devSupply + investorSupply);
        super.transfer(pool, poolToken);

        payable(pool).transfer(initialEth);
    }

    function getCurrentBuyPrice(uint256 amount) public view returns (uint256) {
        uint256 newPrice = price;
        for (uint256 i = 0; i < amount; i++) {
            newPrice = (newPrice * sumMultiplier) / 10 ** 18;
        }
        return newPrice;
    }

    function getCurrentSellPrice(uint256 amount) public view returns (uint256) {
        uint256 newPrice = price;
        for (uint256 i = 0; i < amount; i++) {
            newPrice = (newPrice * subMultiplier) / 10 ** 18;
        }
        return newPrice;
    }

    function listPresale(address presale) external {
        require(msg.sender == owner, "Only owner can list presale");
        require(presale != address(0), "Zero addresses are not allowed.");
        approve(presale, investorSupply);
    }

    function getPoolAddress() external view returns (address) {
        return pool;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function setSuccessCurve(address _successCurve) external {
        require(msg.sender == owner, "Only owner can set success curve");
        require(_successCurve != address(0), "Invalid address");

        successCurve = ISuccessBondingCurve(_successCurve);
        require(
            successCurve.getBondingCurveProgress() == 100,
            "Bonding curve is not complete"
        );

        super.transfer(_successCurve, devSupply);
    }

    function increaseTotalSold(uint256 amount) external {
        totalSold += amount;
    }
}
