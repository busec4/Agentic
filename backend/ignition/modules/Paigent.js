const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
module.exports = buildModule("PaigentModule", (m) => {
    // Paigent kontratını deploy et
    const paigent = m.contract("Paigent");

    return { paigent };
});
