//SPDX_License-Identifier: MIT
pragma solidity ^0.8.24;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SuccessBondingCurve {
    address public owner;
    uint256 public bondingCurveProgress;
    uint256 public constant SCALE_FACTOR = 100;

    event BondingCurveUpdated(uint256 newProgress, uint256 correlationScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can update the score");
        _;
    }

    constructor() {
        owner = msg.sender;
        bondingCurveProgress = 0;
    }

    function updateBondingCurve(uint256 correlationScore) external onlyOwner {
        require(correlationScore <= SCALE_FACTOR, "Invalid score");

        if (correlationScore > 40) {
            uint256 progressIncrement = correlationScore;
            bondingCurveProgress += progressIncrement;
            emit BondingCurveUpdated(bondingCurveProgress, correlationScore);
        }
    }
}
