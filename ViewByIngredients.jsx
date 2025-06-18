// File: src/pages/ViewByIngredients.jsx
import React, { useEffect, useState } from "react";
import "./ViewByIngredients.css";

const sampleRecipes = [
  {
    title: "Spaghetti Aglio e Olio",
    ingredients: ["spaghetti", "garlic", "olive oil", "parsley", "chili flakes"],
    image: "https://i.ytimg.com/vi/3AAdKl1UYZs/maxresdefault.jpg",
    youtube: "https://www.youtube.com/watch?v=3AAdKl1UYZs",
  },
  {
    title: "Cheese Garlic Bread",
    ingredients: ["bread", "garlic", "butter", "parsley"],
    image: "https://i.ytimg.com/vi/lDWzcWY0llk/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/lDWzcWY0llk",
  },
  {
    title: "Creamy Tomato Soup",
    ingredients: ["tomato", "onion", "garlic", "cream", "basil"],
    image: "https://i.ytimg.com/vi/XTlhM2NrtXk/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/XTlhM2NrtXk",
  },
  {
    title: "Paneer Butter Masala",
    ingredients: ["paneer", "butter", "tomato", "cream", "spices"],
    image: "https://i.ytimg.com/vi/s-DEOyXxebw/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/s-DEOyXxebw",
  },
  {
    title: "Vegetable Fried Rice",
    ingredients: ["rice", "carrot", "peas", "capsicum", "soy sauce"],
    image: "https://i.ytimg.com/vi/1r8xlel_YHE/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/1r8xlel_YHE",
  },
  {
    title: "Banana Pancakes",
    ingredients: ["banana", "egg", "flour", "milk", "honey"],
    image: "https://i.ytimg.com/vi/MZbjNEQIIro/maxresdefault.jpg",
    youtube: "https://www.youtube.com/shorts/MZbjNEQIIro",
  },
];

function extractYouTubeID(url) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

export default function ViewByIngredients() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(sampleRecipes);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFiltered(sampleRecipes);
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored.map((r) => r.title));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParts = query.toLowerCase().split(",").map((q) => q.trim());
    const results = sampleRecipes.filter((recipe) =>
      queryParts.some(
        (q) =>
          recipe.title.toLowerCase().includes(q) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(q))
      )
    );
    setFiltered(results);
  };

  const toggleFavorite = (recipe) => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((r) => r.title === recipe.title);
    const updatedFavorites = exists
      ? stored.filter((r) => r.title !== recipe.title)
      : [...stored, recipe];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites.map((r) => r.title));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-100 text-slate-900">
      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <h2 className="text-4xl font-extrabold text-cyan-700 mb-4">🍲 YumRipple</h2>
          <p className="text-slate-700 mb-8">Enter an ingredient or dish name...</p>

          <form className="flex gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter ingredients or dish name..."
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="button">Search</button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-6 py-10 max-w-7xl">
        <h3 className="text-3xl font-bold text-cyan-700 mb-6">Results</h3>
        <div id="recipesContainer">
          {filtered.length === 0 ? (
            <p className="text-slate-700 col-span-full text-center text-lg">
              No recipes found for your search.
            </p>
          ) : (
            filtered.map((r, idx) => {
              const videoID = extractYouTubeID(r.youtube);
              const isFav = favorites.includes(r.title);
              return (
                <div key={idx} className="recipe-card">
                  <div
                    className="favorite-icon-top"
                    onClick={() => toggleFavorite(r)}
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFav ? "❤️" : "🤍"}
                  </div>

                  <img
                    src={r.image}
                    alt={r.title}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/400x200?text=No+Image")
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
      </section>
    </div>
  );
}