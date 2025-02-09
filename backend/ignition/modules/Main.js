const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule("PaigentModule", (m) => {
    

    // Paigent kontratını deploy et
    const paigent = m.contract("Paigent", [
        
    ]);

    // Paigent içinde projeyi başlat
    m.call(paigent, "startProject", [
        "ProjectName",       // Project Name
        "Project Description", // Project Description
        1000,                // Goal
        1625439000,          // Presale Deadline (UNIX timestamp)
        1000000,             // maxSupply
        10,                  // devSupplyRate
        20,                  // investorSupplyRate
        ethers.parseEther("0.01"), // price
    ]);

    return { paigent };
});
