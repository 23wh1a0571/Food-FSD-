import React, { useState } from "react";
import "./AddRecipe.css";

export default function AddRecipe() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [dishPhoto, setDishPhoto] = useState(null);
  const [prepVideo, setPrepVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted:", {
      dishName,
      ingredients: ingredients.split("\n").map((item) => item.trim()).filter(Boolean),
      dishPhoto,
      prepVideo,
    });

    alert("Recipe submitted!");

    setDishName("");
    setIngredients("");
    setDishPhoto(null);
    setPrepVideo(null);
    e.target.reset();
  };

  return (
    <div className="add-recipe-wrapper">
      <header>
        <h1>🍲 YumRipple</h1>
      </header>

      <main>
        <h2>Add New Recipe</h2>
        <form className="recipe-form" onSubmit={handleSubmit}>
          <label>
            Dish Name:
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
            />
          </label>

          <label>
            Ingredients:
            <textarea
              rows="5"
              placeholder="e.g., 2 cups flour\n1 tsp sugar\n1/2 cup milk"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </label>

          <label>
            Dish Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setDishPhoto(e.target.files[0])}
              required
            />
          </label>

          <label>
            Preparation Video:
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setPrepVideo(e.target.files[0])}
              required
            />
          </label>

          <button type="submit">Add Recipe</button>
        </form>
      </main>
    </div>
  );
}