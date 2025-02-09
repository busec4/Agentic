const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m) => {
  // Token sözleşmesi için parametreler
  const tokenName = "MyToken";
  const tokenSymbol = "MTK";
  const maxSupply = m.getParameter("maxSupply", 1000000); // 1,000,000 token
  const devSupplyRate = m.getParameter("devSupplyRate", 10); // %10 developer supply
  const investorSupplyRate = m.getParameter("investorSupplyRate", 20); // %20 investor supply
  const initialPrice = m.getParameter("initialPrice", ethers.parseEther("0.01")); // Başlangıç fiyatı: 0.01 ETH

  // Token sözleşmesini deploy et
  const token = m.contract("Token", [
    tokenName,
    tokenSymbol,
    maxSupply,
    devSupplyRate,
    investorSupplyRate,
    initialPrice,
  ]);

  return { token };
});

module.exports = TokenModule;
