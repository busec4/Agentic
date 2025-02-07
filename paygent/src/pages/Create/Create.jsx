import styles from './Create.module.css'
import React, { useState } from "react"
function Create(){
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return(
        <>
        <div className={styles.incontainer}>
            <div className={styles.card}>
                <div className={styles.upload}>
                <label htmlFor="upload">Upload File</label>
                <img src={file} />
                <input type="file" onChange={handleChange}/>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.project}>
                    <label htmlFor="name">Project Name</label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="ability">Ability of Agent</label>
                    <textarea name="ability" id="ability"  className={styles.ability} />
                    <label htmlFor="work">How Agent Works</label>
                    <textarea name="work" id="work" className={styles.work}/>
                    <button className={styles.createBtn}>
                    CREATE
                </button>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.details}>
                    <label htmlFor="invest">Invest Amount</label>
                    <input type="text" name="invest" id="invest" />
                    <label htmlFor="token-name">Token Name</label>
                    <input type="text" name="token-name" id="token-name" />
                    <label htmlFor="supply">Token Supply</label>
                    <input type="text" name="supply" id="supply" />
                    {/* <label htmlFor="robot">Robot</label>
                    <select name="robot" id="robot">
                        <option value=""></option>
                    </select> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Create