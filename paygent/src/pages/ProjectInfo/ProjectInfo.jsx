import styles from './ProjectInfo.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProjectInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const selectedProject = storedProjects[location.state.index];

        setProject(selectedProject);
    }, [location.state]);

    if (!project) return <p>Loading project details...</p>;

    function handleBack() {
        navigate('/projects')
    }
    return (
        <>
        <div className={styles.route}>
            <p onClick={handleBack}>Back to Projects</p>
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
        </div>
        </>
    );
}

export default ProjectInfo;
