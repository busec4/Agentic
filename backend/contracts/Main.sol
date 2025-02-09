//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Token.sol";
import "./Pool.sol";
import "./Presale.sol";

contract Paigent {
    mapping(address => Project) public projects;
    struct Project {
        string name;
        string description;
        uint256 goal;
        uint256 presaleDeadline;
        uint256 raised;
        address owner;
        address token;
        address pool;
        address presale;
    }

    function startProject(
        string memory name,
        string memory description,
        uint256 goal,
        uint256 presaleDeadline,
        uint256 maxSupply,
        uint256 devSupplyRate,
        uint256 investorSupplyRate,
        uint256 price
    ) public {
        Token token = new Token(
            name,
            description,
            maxSupply,
            devSupplyRate,
            investorSupplyRate,
            price
        );
        Pool pool = new Pool(address(token));
        Presale presale = new Presale(address(token), goal);
        token.listPresale(address(presale));
        token.setPool(address(pool));
        Project memory project = Project({
            name: name,
            description: description,
            goal: goal,
            presaleDeadline: presaleDeadline,
            raised: 0,
            owner: msg.sender,
            token: address(token),
            pool: address(pool),
            presale: address(presale)
        });
        projects[msg.sender] = project;
    }
}
