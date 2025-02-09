const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PoolModule", (m) => {
    // 🔹 Önce Token kontratını deploy et (Eğer zaten deploy edildiyse, var olanı kullanabilirsin)
    

    // 🔹 Token deploy edildikten sonra, Pool kontratını Token adresiyle deploy et
    const pool = m.contract("Pool", 0xB3E4D6CaB0988486dd8BC28003154322BB28173C);

    // 🔹 Pool adresini Token'a bildir (setPool fonksiyonunu çağırarak)
    m.call(token, "setPool", [pool.address]);

    return { token, pool };
});
