import React, { useState } from "react";
import "./MealPlanner.css";

/* -------------------------------------------------------------------------- */
/*                             SAMPLE FOOD DATA                               */
/* -------------------------------------------------------------------------- */
const foodData = {
  breakfast: [
    { item: "2 Boiled Eggs", cal: 140 },
    { item: "Oatmeal with Milk", cal: 150 },
    { item: "Banana", cal: 90 },
    { item: "Toast with Avocado", cal: 180 },
    { item: "Greek Yogurt + Berries", cal: 120 },
    { item: "Smoothie", cal: 160 },
    { item: "Pancakes (2)", cal: 200 },
  ],
  lunch: [
    { item: "Grilled Chicken Breast", cal: 280 },
    { item: "Brown Rice", cal: 215 },
    { item: "Dal + Rice", cal: 350 },
    { item: "Chapati (2) & Sabzi", cal: 300 },
    { item: "Lentil Curry", cal: 250 },
    { item: "Veg Biryani", cal: 400 },
    { item: "Fish Curry", cal: 320 },
  ],
  dinner: [
    { item: "Vegetable Soup", cal: 150 },
    { item: "Grilled Paneer", cal: 300 },
    { item: "Salad with Dressing", cal: 120 },
    { item: "Chapati & Dal", cal: 280 },
    { item: "Veg Stir Fry", cal: 200 },
    { item: "Tofu Curry", cal: 250 },
    { item: "Baked Sweet Potato", cal: 180 },
  ],
  snacks: [
    { item: "Almonds (handful)", cal: 160 },
    { item: "Apple", cal: 95 },
    { item: "Protein Bar", cal: 200 },
    { item: "Yogurt", cal: 110 },
    { item: "Carrot Sticks", cal: 50 },
    { item: "Boiled Corn", cal: 90 },
    { item: "Dark Chocolate (2 sq.)", cal: 120 },
  ],
};

/* ------------------- helper: random items within calorie cap -------------- */
function getRandomMealOptions(mealItems, maxCalories) {
  let total = 0;
  const chosen = [];
  const pool = [...mealItems];

  while (pool.length && total < maxCalories) {
    const index = Math.floor(Math.random() * pool.length);
    const { item, cal } = pool[index];

    if (total + cal <= maxCalories) {
      chosen.push({ item, cal });
      total += cal;
    }
    pool.splice(index, 1);
  }
  return chosen;
}

/* ---------------------------- component ----------------------------------- */
export default function MealPlanner() {
  const [calories, setCalories]   = useState("");
  const [plan,     setPlan]       = useState(null);
  const [error,    setError]      = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = Number(calories);

    if (isNaN(goal) || goal < 1000) {
      setError("Calorie target should be at least 1000 kcal.");
      setPlan(null);
      return;
    }
    setError("");

    const allocation = {
      breakfast: goal * 0.25,
      lunch:     goal * 0.35,
      dinner:    goal * 0.3,
      snacks:    goal * 0.1,
    };

    const newPlan = {
      breakfast: getRandomMealOptions(foodData.breakfast, allocation.breakfast),
      lunch:     getRandomMealOptions(foodData.lunch,      allocation.lunch),
      dinner:    getRandomMealOptions(foodData.dinner,     allocation.dinner),
      snacks:    getRandomMealOptions(foodData.snacks,     allocation.snacks),
    };

    setPlan(newPlan);
  };

  const totalCals = (arr) => arr.reduce((s, i) => s + i.cal, 0);

  return (
    <div className="meal-planner-container">
      <h1>🥗 YumRipple Meal Planner</h1>

      {/* form */}
      <form className="meal-form" onSubmit={handleSubmit}>
        <label htmlFor="calories">Enter Daily Calorie Goal:</label>
        <input
          id="calories"
          type="number"
          value={calories}
          min="1000"
          placeholder="e.g. 2000"
          onChange={(e) => setCalories(e.target.value)}
          required
        />
        <button type="submit">Generate Meal Plan</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* results */}
      {plan && (
        <div className="meal-results">
          <h2>🍴 Your Meal Plan</h2>
          {Object.entries(plan).map(([meal, items]) => (
            <div key={meal}>
              <h3 className="meal-heading">
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </h3>
              <ul>
                {items.map(({ item, cal }, i) => (
                  <li key={i}>
                    {item} – {cal} kcal
                  </li>
                ))}
              </ul>
              <p className="meal-total">Total: {totalCals(items)} kcal</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
