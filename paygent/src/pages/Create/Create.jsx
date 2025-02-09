import styles from './Create.module.css'
import React, { useState } from "react"
function Create(){

    const [formData, setFormData] = useState({
        projectName: "",
        abilities: [""],
        work: "",
        investAmount: "",
        supply: "",
        tokenName: "",
        robot: "Velocity",
        file: null,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    file: reader.result,
                }));
            };
        }
    }
    

    function handleCreate() {
        const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const updatedProjects = [...existingProjects, formData];
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        console.log("New Project:", formData);
    }

    function addAbility() {
        setFormData((prev) => ({
            ...prev,
            abilities: [...prev.abilities, ""]
        }));
    }

    function handleAbilityChange(index, event) {
        const newAbilities = [...formData.abilities];
        newAbilities[index] = event.target.value;
        setFormData((prev) => ({
            ...prev,
            abilities: newAbilities
        }));
    }

    return(
        <>
        <div className={styles.incontainer}>
            <div className={styles.card}>
                <div className={styles.upload}>
                <label htmlFor="upload">Upload Pic</label>
                {formData.file && (
                <img src={formData.file} alt="Project Preview" className={styles.previewImage} />
                )}
                <input type="file" onChange={handleFileChange} />
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.project}>
                    <label htmlFor="projectName">Project Name</label>
                    <input type="text" id='projectName' name='projectName' value={formData.projectName} onChange={handleChange} />
                    <label>Ability of Agent</label>
                        {formData.abilities.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(event) => handleAbilityChange(index, event)}
                                placeholder={`Ability ${index + 1}`}
                                className={styles.dynamicInput}
                            />
                        ))}
                        <button onClick={addAbility} className={styles.addButton}>
                            + Add Ability
                        </button>
                    <label htmlFor="work">How Agent Works</label>
                    <textarea name="work" id="work" value={formData.work} className={styles.work} onChange={handleChange}/>
                    <button className={styles.createBtn} onClick={handleCreate}>
                    CREATE
                </button>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.details}>
                    <label htmlFor="investAmount">Invest Amount</label>
                    <input type="text" name="investAmount" id="investAmount" value={formData.investAmount} onChange={handleChange} />
                    <label htmlFor="tokenName">Token Name</label>
                    <input type="text" name="tokenName" id="tokenName" value={formData.tokenName} onChange={handleChange}/>
                    <label htmlFor="supply">Total Supply</label>
                    <input type="text" name="supply" id="supply" value={formData.supply} onChange={handleChange}/>
                    <label htmlFor="robot">Robot</label>
                    <select name="robot" id="robot" value={formData.robot} onChange={handleChange}>
                        <option value="Velocity">Velocity-Rough-G1-v0</option>
                        <option value="Reach">Reach-Franka-IK-Abs-v0</option>
                        <option value="Stack">Stack-Cube-Franka-v0</option>
                        <option value="Navigation">Navigation-Flat-Anymal-C-v0</option>
                        <option value="Cartpole">Cartpole-RGB-Camera-Direct-v0</option>
                        <option value="Humanoid">Humanoid-AMP-Walk-Direct-v0</option>
                    </select>
                </div>
            </div>
        </div>
        </>
    )
}

export default Create