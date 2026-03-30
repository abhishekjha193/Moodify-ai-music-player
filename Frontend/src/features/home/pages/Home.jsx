import React from "react";
import FaceExpression from "../../expression/components/faceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import "./home.scss";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { handleGetSong, loading, song } = useSong();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__logo">
          <img src="/moodify - logo.png" alt="logo" />
          <span>Moodify</span>
        </div>

        <div className="home__user">
          <span className="home__username">
            {user?.name || user?.email || "User"}
          </span>

          <button className="home__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="home__layout">
        <div className="home__left">
          {song ? (
            <Player />
          ) : (
            <p className="home__empty">Select mood to play music</p>
          )}
        </div>

        <div className="home__right">
          <FaceExpression
            onClick={(expression) => handleGetSong({ mood: expression })}
          />

          {loading && <p className="home__loading">Detecting mood...</p>}
        </div>
      </div>

      <div className="home__footer">
        <p>
          Made by <span>Abhishek Jha</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
