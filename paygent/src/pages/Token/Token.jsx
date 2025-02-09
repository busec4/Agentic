import styles from './Token.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';


const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/EV_yfqumjCALt1Myfz7n-ZPIod7tv1TU");
// const provider = new ethers.BrowserProvider(window.ethereum);


const contractAddress = "0xB3E4D6CaB0988486dd8BC28003154322BB28173C";
const abi = [
  "function getCurrentBuyPrice(uint256 amount) public view returns (uint256)",
  "function getCurrentSellPrice(uint256 amount) public view returns (uint256)"
];

function Token() {
    const [developerShare, setDeveloperShare] = useState(60); // %60
    const [communityShare, setCommunityShare] = useState(40);
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        const contract = new ethers.Contract(contractAddress, abi, provider);

        async function fetchPrices() {
            try {
                const buyPrice = await contract.getCurrentBuyPrice(100); 
                const sellPrice = await contract.getCurrentSellPrice(100); 

                setBuyPrice(ethers.utils.formatUnits(buyPrice, 18)); 
                setSellPrice(ethers.utils.formatUnits(sellPrice, 18)); 
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        }

        fetchPrices();
    }, []); 

    function handleBack() {
        navigate('/projects');
    }

    return (
        <>
        <div className={styles.route}>
            <p onClick={handleBack}>&#11164; Back to Projects</p>
        </div>
        <div className={styles.incontainer}>
            <div className={styles.section}>
                <div className={styles.card}>
                    <h2>Revenue Share</h2>
                    <div className={styles.revenueBar}>
                        <div className={styles.developerShare} style={{ width: `${developerShare}%` }}>
                            {developerShare}%
                        </div>
                        <div className={styles.communityShare} style={{ width: `${communityShare}%` }}>
                            {communityShare}%
                        </div>
                    </div>
                    <h3>Lifetime Revenue</h3>
                    <p>Buy Price: {buyPrice} USD</p>
                    <p>Sell Price: {sellPrice} USD</p>
                </div>
                <div className={styles.button}>
                    <button className={styles.buy}>BUY</button>
                    <button className={styles.sell}>SELL</button>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.card}>

                </div>
            </div>
        </div>
        </>
    )
}

export default Token;
