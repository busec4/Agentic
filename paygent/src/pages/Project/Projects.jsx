import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Projects.module.css'
function Projects(){
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        setProjects(storedProjects);
    }, []);

    function handleSelectProject(index) {
        navigate('/project-info', { state: { index } });
    }
    return(
        <>
            <div className={styles.incontainer}>
                <h2>PROJECTS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>MARKET CAP</th>
                                <th>INVESTMENT CURVE%</th>
                                <th>AGENTIC CURVE%</th>
                                <th>TOTAL REVENUE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {projects.map((project, index) => (
                            <tr key={index} onClick={() => handleSelectProject(index)}>
                                <td>{project.projectName}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
        </>
    )
}

export default Projects