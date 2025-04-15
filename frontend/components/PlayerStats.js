import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerStats = ({ playerName }) => {
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pubg/player/${playerName}`);
                setPlayerData(response.data);
            } catch (error) {
                console.error("Error fetching player stats:", error);
            }
        };

        fetchPlayerData();
    }, [playerName]);

    return (
        <div>
            <h2>{playerName}'s Live Stats</h2>
            {playerData ? (
                <div>
                    <p>Player ID: {playerData.data[0].id}</p>
                    <p>Region: {playerData.data[0].attributes.shardId}</p>
                </div>
            ) : (
                <p>Loading player stats...</p>
            )}
        </div>
    );
};

export default PlayerStats;
