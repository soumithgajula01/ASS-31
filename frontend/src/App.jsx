import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // 🔹 Player states
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState("");

  // 🔹 Game states (One-to-Many)
  const [games, setGames] = useState([]);
  const [gameTitle, setGameTitle] = useState("");

  // 🔹 Team states (Many-to-Many)
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");

  // ===================== FETCH =====================

  const fetchPlayers = async () => {
    const res = await axios.get("http://localhost:5000/players");
    setPlayers(res.data);
  };

  const fetchGames = async () => {
    const res = await axios.get("http://localhost:5000/games");
    setGames(res.data);
  };

  const fetchTeams = async () => {
    const res = await axios.get("http://localhost:5000/teams");
    setTeams(res.data);
  };

  useEffect(() => {
    fetchPlayers();
    fetchGames();
    fetchTeams();
  }, []);

  // ===================== PLAYER =====================

  const createPlayer = async () => {
    if (!username) return;

    await axios.post("http://localhost:5000/players", {
      username,
    });

    setUsername("");
    fetchPlayers();
  };

  const deletePlayer = async (id) => {
    await axios.delete(`http://localhost:5000/players/${id}`);
    fetchPlayers();
  };

  // ===================== GAME (ONE-TO-MANY) =====================

  const addGame = async (playerId) => {
    if (!gameTitle) return;

    await axios.post("http://localhost:5000/games", {
      title: gameTitle,
      player: playerId,
    });

    setGameTitle("");
    fetchGames();
  };

  // ===================== TEAM (MANY-TO-MANY) =====================

  const createTeam = async () => {
    if (!teamName) return;

    await axios.post("http://localhost:5000/teams", {
      name: teamName,
    });

    setTeamName("");
    fetchTeams();
  };

  const assignTeam = async (playerId, teamId) => {
    await axios.put(`http://localhost:5000/players/${playerId}`, {
      $push: { teams: teamId },
    });

    fetchPlayers();
  };

  // ===================== UI =====================

  return (
    <div style={{ padding: 20 }}>
      <h1>Gaming Hub 🎮</h1>

      {/* ADD PLAYER */}
      <input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={createPlayer}>Add Player</button>

      <hr />

      {/* CREATE TEAM */}
      <h2>Create Team</h2>
      <input
        placeholder="Team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button onClick={createTeam}>Add Team</button>

      <hr />

      {/* DISPLAY PLAYERS */}
      {players.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid gray", margin: 10, padding: 10 }}
        >
          <h3>{p.username}</h3>

          {/* MANY-TO-MANY DISPLAY */}
          <p>
            Teams: {p.teams?.map((t) => t.name).join(", ") || "None"}
          </p>

          {/* ASSIGN TEAM */}
          <select onChange={(e) => assignTeam(p._id, e.target.value)}>
            <option>Select Team</option>
            {teams.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <hr />

          {/* ADD GAME */}
          <input
            placeholder="Game name"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
          />
          <button onClick={() => addGame(p._id)}>Add Game</button>

          {/* ONE-TO-MANY DISPLAY */}
          <p>Games:</p>
          {games
            .filter((g) => g.player?._id === p._id)
            .map((g) => (
              <div key={g._id}>🎮 {g.title}</div>
            ))}

          <hr />

          {/* DELETE */}
          <button onClick={() => deletePlayer(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;