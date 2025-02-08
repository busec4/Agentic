//SPDX_License-Identifier: MIT
pragma solidity ^0.8.24;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Token.sol";

interface ISuccessBondingCurve {
    function checkEligibility(uint256 correlationScore) external;

    function updateBondingCurve(uint256 correlationScore) external;

    function getContribution(address contributor) external view returns (uint256);
    function getBondingCurveProgress() external view returns (uint256)
}
contract SuccessBondingCurve {
    address public owner;
    uint256 public bondingCurveProgress;
    uint256 public constant SCALE_FACTOR = 100;
    bool public isComplete;
    mapping(address => uint256) public contributions;
    uint256 public contributionCount;
    IToken public rewardToken;
    mapping (address=>bool) public claimed;

    event BondingCurveUpdated(uint256 newProgress, uint256 correlationScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can update the score");
        _;
    }

    constructor(address _rewardToken) {
        owner = msg.sender;
        bondingCurveProgress = 0;
        isComplete = false;
        contributionCount = 0;
        rewardToken = IToken(_rewardToken);
    }

    function checkEligibility(uint256 correlationScore) external {
        require(correlationScore <= SCALE_FACTOR, "Invalid score");
        if (isComplete) {
            return;
        }
        if (correlationScore > 40) {
            updateBondingCurve(correlationScore);
            contributions[msg.sender] = correlationScore;
        }
    }

    function updateBondingCurve(uint256 correlationScore) external {
        if (bondingCurveProgress >= 100) {
            isComplete = true;
            emit BondingCurveUpdated(bondingCurveProgress, correlationScore);
            return;
        }

        uint256 progressIncrement = correlationScore;
        bondingCurveProgress += progressIncrement;
        emit BondingCurveUpdated(bondingCurveProgress, correlationScore);
        contributionCount++;
    }

    function getContribution(address contributor) external view returns (uint256) {
        return contributions[contributor];
    }

    function getBondingCurveProgress() external view returns (uint256) {
        return bondingCurveProgress;
    }

    function withdraw() external  {
        require(isComplete, "Bonding curve is not complete");
        payable(owner).transfer(address(this).balance);
    }

    function claimDevReward() external {
        require(isComplete, "Bonding curve is not complete");
        require(contributions[msg.sender] > 0, "No contribution");
        require(!claimed[msg.sender], "Already claimed");
        uint256 reward = contributions[msg.sender]*rewardToken.balanceOf(address(this))/100;
        rewardToken.transfer(msg.sender, reward);
        claimed[msg.sender] = true;
        
    }
}
