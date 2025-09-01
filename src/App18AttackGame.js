import React, {useState} from 'react';
import PlayerCard from "./attackcomp/PlayerCard";
import Enemy from "./attackcomp/Enemy";

const App18AttackGame = () => {
    const [player, setPlayer] = useState({
        hp: 100,
        potions: 1,
        coins: 10,
    });

    const [enemy, setEnemy] = useState({
        hp: 100,
    });

    const attackEnemy = () => {
        setEnemy((prev) => {
            const newHp = prev.hp - 10;
            console.log(`Player damages Enemy for 10 HP and enemy has HP:  ${Math.max(newHp, 0)} left`);

            if (newHp <= 0) {

                setPlayer((p) => ({
                    ...p,
                    coins: p.coins + 10,
                }));

                setTimeout(() => {
                    setEnemy({hp: 100});
                }, 500);

                return {hp: 0};
            }

            return {hp: newHp};
        });

        setTimeout(() => {
            setPlayer((prev) => {
                const newHp = Math.max(prev.hp - 5, 0);
                console.log(`Enemy counter-attacks Player and Player takes 5 damage (HP: ${newHp})`);
                return { ...prev, hp: newHp };
            });
        }, 1000);
    };

    const buyPotion = () => {
        if (player.coins >= 5) {
            setPlayer((prev) => ({
                ...prev,
                coins: prev.coins - 5,
                potions: prev.potions + 1,
            }));
        }
    };

    const usePotion = () => {
        if (player.potions > 0 && player.hp < 100) {
            setPlayer((prev) => ({
                ...prev,
                potions: prev.potions - 1,
                hp: Math.min(prev.hp + 40, 100),
            }));
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 30 }}>
            <PlayerCard data={player} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={attackEnemy}>Attack</button>
                <button onClick={buyPotion}>Buy Potion (5 coins)</button>
                <button onClick={usePotion}>Use Potion (+40 HP)</button>
            </div>

            <Enemy data={enemy} />
        </div>
    );
};

export default App18AttackGame;