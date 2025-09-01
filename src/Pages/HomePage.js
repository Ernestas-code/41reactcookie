import React from 'react';
import {useStore} from "../Store/Store";

const HomePage = ({}) => {
    const IncreasePopulation = useStore((state)=>state.increasePopulation)
    const updateBears = useStore(state=>state.updateBears)
function update() {
        updateBears(20)
}
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <div
                style={{
                    height: "50%",
                    backgroundImage: "url('https://e0.365dm.com/25/07/1600x900/skysports-eafc-bellingham-musiala_6966794.jpg?20250717093803')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                    fontSize: "2rem",
                    fontWeight: "bold"
                }}
            >
                Welcome to Our Site
            </div>


            <div
                style={{
                    height: "50%",
                    padding: "20px",
                    boxSizing: "border-box",
                    overflowY: "auto"
                }}
            >
                <h2>About Something</h2>
                <button onClick={IncreasePopulation}> Increase Population</button>
                <p>
                    FC 26 is the anticipated installment in the long-running football video game series by EA Sports, following the rebranding from FIFA to EA Sports FC. While specific details about FC 26 may not be fully available yet (as it depends on release timelines), here’s what you can generally expect based on the series' evolution:

                    Gameplay Enhancements: Improved mechanics, AI, and realism for a more immersive football experience.
                    Graphics and Animations: Upgraded visuals, player likenesses, and motion-captured animations.
                    Modes: Popular modes like Ultimate Team, Career Mode, and Volta Football will likely return with new features.

                </p>
            </div>
        </div>
    );
};

export default HomePage;