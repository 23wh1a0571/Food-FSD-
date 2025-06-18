import React, { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const images = [
    "/food1.png",
    "/food2.png",
    "/food3.png",
    "/food4.png",
    "/food5.png",
    "/food6.png",
  ];

  return (
    <>
      {/* ---------- Header ---------- */}
      <header>
        <div className="inner-header">
          <h1>🍲 YumRipple</h1>
          <nav>
            {!isLoggedIn ? (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            ) : (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("userEmail");
                  window.location.reload();
                }}
              >
                Logout
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* ---------- Hero slider ---------- */}
      <section className="hero">
        <div className="hero-slider">
          {images.concat(images).map((src, i) => (
            <img key={i} src={src} alt={`Food ${i + 1}`} />
          ))}
        </div>

        <div className="hero-overlay">
          <h2 className="hero-title">Your Smart Cooking Companion</h2>
          <p className="hero-subtext">
            Add, organize, and plan your favorite meals with ease.
          </p>
        </div>
      </section>

      {/* ---------- Feature cards ---------- */}
      <section className="features">
        {[
          {
            title: "🍳 Add Recipes",
            text: "Create and upload your favorite meal ideas.",
            href: "/add-recipe",
          },
          {
            title: "🧂 View by Ingredients",
            text: "Find recipes with ingredients you have.",
            href: "/view-by-ingredients",
          },
          {
            title: "🧡 Favorite Recipes",
            text: "Save and access recipes anytime.",
            href: "/favorites",
          },
          {
            title: "📅 Meal Planner",
            text: "Plan meals for the week.",
            href: "/meal-planner",
          },
          {
            title: "🛒 Shopping",
            text: "Shop by food category.",
            href: "/shopping",
          },
        ].map(({ title, text, href }) => (
          <a key={title} href={href} className="feature-card">
            <h3>{title}</h3>
            <p>{text}</p>
          </a>
        ))}
      </section>

      {/* ---------- Footer ---------- */}
      <footer>
        &copy; 2025 Food Recipe Finder. All rights reserved.
      </footer>
    </>
  );
}
