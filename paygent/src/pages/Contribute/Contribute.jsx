import styles from './Contribute.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

function Contribute() {
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const selectedProject = storedProjects[location.state.index];  // Doğru projeyi al
        setProject(selectedProject);
    }, [location.state]);

    if (!project) return <p>Loading project details...</p>;

    function handleBack() {
        navigate('/projects')
    }

    return (
        <>
            <div className={styles.route}>
                <p onClick={handleBack}>&#11164; Back to Projects</p>
            </div>
            <div className={styles.incontainer}>
                <div className={styles.card}>
                    <table>
                        <thead>
                            <tr>
                                <th>Agent Name</th>
                                <th>Task Of Agent</th>
                                <th>Success Score</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className={styles.contribute}>
                                <p>Invest</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.card}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mission List</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {project.abilities && project.abilities.length > 0 ? (
                                project.abilities.map((ability, abilityIndex) => (
                                    <tr key={`${abilityIndex}`}>
                                        <td>{ability}</td>
                                        <td className={styles.contribute}>
                                            <p>Contribute</p></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No abilities available</td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Contribute;
