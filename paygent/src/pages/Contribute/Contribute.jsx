import styles from './Contribute.module.css'
import { useNavigate } from 'react-router-dom'
function Contribute(){
    const navigate = useNavigate();
    function handleBack() {
        navigate('/projects')
    }
    
    function handleTokenPage() {
        navigate('/project-token')
    }
    return(
        <>
        <div className={styles.route}>
                <p onClick={handleBack}>&#11164; Back to Projects</p>
                <p onClick={handleTokenPage}>Token Page &#11166;</p>
        </div>
        <div className={styles.incontainer}>
            <div className={styles.card}>
                <table>
                    <thead>
                        <tr>
                            <th>Agent Name</th>
                            <th>Task</th>
                            <th>Success Score</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

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
                    </table>
            </div>
        </div>
        </>

    )

}

export default Contribute