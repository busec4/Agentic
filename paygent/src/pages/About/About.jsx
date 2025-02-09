import styles from './About.module.css'

function About(){
    return(
        <>
        <div className={styles.containerMain}>
            <h3>About the Project</h3>
            <p>This project has been developed for the Agentic Hackathon to create a decentralized and collaborative ecosystem where users can contribute to the development of Physical AI agents using various machine learning algorithms.

            The process begins with the project owner selecting a robot from Isaac Sim and defining a specific mission for it. Contributors then develop AI agents that fulfill the given mission and share their results through the PAIgent application. Each AI agent is evaluated based on predefined criteria, which are publicly available on GitHub.

            The project platform lists these AI agents along with two key performance curves: the Agent Curve and the Investment Curve. When these curves bond, a token is generated, making it tradeable. Contributors receive token allocations, creating a sustainable ecosystem where users, developers, and investors can all benefit from their contributions.

            By integrating AI development with a tokenized incentive model, this project fosters innovation and collaboration in the field of Physical AI while providing economic value to participants.
            </p>
            <h3>Vision</h3>
            <p>
            To build a dynamic and decentralized AI ecosystem where contributors, developers, and investors collaboratively advance the capabilities of Physical AI agents, driving innovation while ensuring mutual financial benefits.
            </p>
            <h3>Mission</h3>
            <ul className={styles.mission}>
                <li>
                Develop an innovative project for the Agentic Hackathon, integrating AI and blockchain technologies.
                </li>
                <li>
                Enable users to select robots from Isaac Sim and define AI-driven missions
                </li>
                <li>
                Facilitate the development of AI agents through machine learning contributions.
                </li>
                <li>
                Establish a transparent evaluation system based on predefined criteria.

                </li>
                <li>
                Implement a token-based incentive model that rewards contributors and fosters investment opportunities.

                </li>
                <li>
                Promote an open-source and decentralized approach to Physical AI development, bridging the gap between AI research, real-world applications, and financial incentives.
                </li>
            </ul>
        </div>
        </>
    )
}

export default About