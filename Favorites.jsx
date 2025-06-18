// File: src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewByIngredients.css"; // reuse existing recipe styles

function extractYouTubeID(url) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    } else {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(favs);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-100 text-slate-900 py-10 px-6">
      <h2 className="text-3xl font-bold text-cyan-700 text-center mb-8">
        🧡 Your Favorite Recipes
      </h2>

      <div id="recipesContainer">
        {favorites.length === 0 ? (
          <p className="text-center text-lg text-slate-600">
            You haven’t favorited any recipes yet.
          </p>
        ) : (
          favorites.map((r, idx) => {
            const videoID = extractYouTubeID(r.youtube);
            return (
              <div key={idx} className="recipe-card">
                <img
                  src={r.image}
                  alt={r.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x200?text=No+Image")
                  }
                />
                <h4>{r.title}</h4>
                <p><strong>Ingredients:</strong> {r.ingredients.join(", ")}</p>
                {videoID && (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoID}`}
                    frameBorder="0"
                    allowFullScreen
                    title={r.title}
                    className="w-full h-56 rounded-lg mt-3"
                  ></iframe>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favorites;