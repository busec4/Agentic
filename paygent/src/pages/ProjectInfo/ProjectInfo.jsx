import styles from './ProjectInfo.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProjectInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [progress, setProgress] = useState(0);
    const [developerShare, setDeveloperShare] = useState(60); // %60
    const [communityShare, setCommunityShare] = useState(40);
    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const selectedProject = storedProjects[location.state.index];

        setProject(selectedProject);
    }, [location.state]);

    if (!project) return <p>Loading project details...</p>;

    function handleBack() {
        navigate('/projects')
    }

    function handleContribute() {

            navigate('/contribute', { state: { index: location.state.index } });

    }
    function handleInvest() {
            navigate('/contribute', { state: { index: location.state.index } });
        
    }
    
    return (
        <>
        <div className={styles.route}>
            <p onClick={handleBack}>&#11164; Back to Projects</p>
        </div>
        <div className={styles.incontainer}>
            <div className={styles.card}>
                {project.file && <img src={project.file} alt="Project" style={{ width: '200px' }} />}
            </div>
            <div className={styles.card}>
                <h2>{project.projectName || 'N/A'}</h2>
                <h3>Ability of Agent</h3>
                <p className={styles.abilityInfo}>{project.ability || 'N/A'}</p>
                <h3>How Agent Works</h3>
                <p className={styles.workInfo}>{project.work || 'N/A'}</p>
            </div>
            <div className={styles.card}>
                <div className={styles.investBar}>
                <p>Investment Curve</p>
                    <div className={styles.investBarFill}>0%</div>
                    <button onClick={handleInvest}>INVEST</button>
                </div>
                <div className={styles.progressBar}>
                    <p>Success Curve</p>
                    <div className={styles.progressBarFill}>0%</div>
                    <button onClick={handleContribute}>CONTRIBUTE</button>
                </div>
            </div>
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
                                    {/* <p>Buy Price: {buyPrice} USD</p>
                                    <p>Sell Price: {sellPrice} USD</p> */}
                <div className={styles.button}>
                <button className={styles.buy}>BUY</button>
                <button className={styles.sell}>SELL</button>
             </div>
            </div>

            </div>
        </>
    );
}

export default ProjectInfo
