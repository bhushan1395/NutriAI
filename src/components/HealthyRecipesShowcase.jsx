import React from 'react';
import { featuredRecipes } from '../data/nutritionData';
import { Clock, Flame } from 'lucide-react';

export default function HealthyRecipesShowcase() {
  return (
    <section className="recipes-showcase-section">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header-block text-center">
          <div className="section-pill-tag">
            <span>Wholesome Eating</span>
          </div>
          <h2 className="section-main-heading">
            Healthy Recipe <span className="gradient-text">Inspiration</span>
          </h2>
          <p className="section-sub-heading">
            Explore a selection of colorful, nutrient-dense meals made with fresh ingredients 
            to inspire your daily cooking.
          </p>
        </div>

        {/* Recipe Pictures Grid */}
        <div className="simple-recipes-grid">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="simple-recipe-card">
              <div className="simple-image-container">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="simple-recipe-img"
                  loading="lazy" 
                />
                <span className="simple-category-badge">{recipe.category}</span>
              </div>
              <div className="simple-recipe-info">
                <h3 className="simple-recipe-name">{recipe.title}</h3>
                <div className="simple-recipe-meta">
                  <span className="meta-item">
                    <Flame size={14} className="text-emerald" />
                    {recipe.calories} kcal
                  </span>
                  <span className="meta-item">
                    <Clock size={14} className="text-muted" />
                    {recipe.prepTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
