import styles from './Token.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
function Token() {
    const [developerShare, setDeveloperShare] = useState(60); // %60
    const [communityShare, setCommunityShare] = useState(40);
    const navigate = useNavigate()
    function handleBack() {
        navigate('/projects')
    }
    
    return(
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

export default Token