import React, { useState } from 'react';
import { X, Clock, BarChart3, Star, Bookmark, Check, Utensils, Sparkles, Flame } from 'lucide-react';

export default function RecipeModal({ recipe, onClose, onToggleSave, isSaved, onAddToMealPlan }) {
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [addedNotice, setAddedNotice] = useState(false);

  if (!recipe) return null;

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleAddToPlan = () => {
    onAddToMealPlan(recipe);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-dialog-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        {/* Modal Banner Hero Image */}
        <div className="modal-hero-image-wrap">
          <img src={recipe.image} alt={recipe.title} className="modal-hero-img" />
          <div className="modal-hero-overlay"></div>
          
          <div className="modal-hero-meta">
            <div className="modal-tags-list">
              {recipe.dietary.map((tag) => (
                <span key={tag} className="modal-tag-pill">{tag}</span>
              ))}
            </div>
            <h2 className="modal-recipe-title">{recipe.title}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-inner-scroll">
          {/* Quick Metrics Bar */}
          <div className="modal-metrics-strip">
            <div className="metric-cell">
              <Clock size={16} className="text-emerald" />
              <div>
                <span className="cell-label">Prep Time</span>
                <span className="cell-val">{recipe.prepTime}</span>
              </div>
            </div>
            <div className="metric-cell">
              <BarChart3 size={16} className="text-emerald" />
              <div>
                <span className="cell-label">Difficulty</span>
                <span className="cell-val">{recipe.difficulty}</span>
              </div>
            </div>
            <div className="metric-cell">
              <Star size={16} className="text-amber" />
              <div>
                <span className="cell-label">Rating</span>
                <span className="cell-val">{recipe.rating} ({recipe.reviewsCount})</span>
              </div>
            </div>
            <div className="metric-cell">
              <Sparkles size={16} className="text-emerald" />
              <div>
                <span className="cell-label">AI Health Score</span>
                <span className="cell-val text-emerald font-bold">{recipe.aiScore}/100</span>
              </div>
            </div>
          </div>

          {/* Nutrition Facts Table */}
          <div className="modal-nutrition-panel">
            <h4 className="panel-subheading">
              <Flame size={16} className="text-emerald" />
              <span>Nutrition Facts per Serving</span>
            </h4>
            <div className="macro-badges-row">
              <div className="macro-badge-box calorie-box">
                <span className="macro-num">{recipe.calories}</span>
                <span className="macro-name">Calories</span>
              </div>
              <div className="macro-badge-box">
                <span className="macro-num">{recipe.protein}g</span>
                <span className="macro-name">Protein</span>
              </div>
              <div className="macro-badge-box">
                <span className="macro-num">{recipe.carbs}g</span>
                <span className="macro-name">Carbs</span>
              </div>
              <div className="macro-badge-box">
                <span className="macro-num">{recipe.fat}g</span>
                <span className="macro-name">Healthy Fat</span>
              </div>
              <div className="macro-badge-box">
                <span className="macro-num">{recipe.fiber}g</span>
                <span className="macro-name">Dietary Fiber</span>
              </div>
            </div>
          </div>

          <p className="modal-recipe-desc">{recipe.description}</p>

          {/* AI Nutrition Insight */}
          <div className="ai-nutrition-callout">
            <div className="callout-header">
              <Sparkles size={16} className="text-emerald" />
              <strong>NutriSmart AI Dietitian Note:</strong>
            </div>
            <p className="callout-body">
              This recipe supplies an optimal amino acid profile with high bioavailability. 
              Its low glycemic index helps maintain insulin sensitivity and sustained cognitive energy throughout the day.
            </p>
          </div>

          {/* Ingredients & Checklist */}
          <div className="recipe-section-block">
            <div className="section-block-title-row">
              <h3 className="section-block-title">
                <Utensils size={18} className="text-emerald" />
                <span>Ingredients</span>
              </h3>
              <span className="ingredients-tip-badge">Click ingredients you already have</span>
            </div>
            <ul className="modal-ingredients-list">
              {recipe.ingredients.map((item, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <li
                    key={idx}
                    className={`ingredient-item ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleIngredient(idx)}
                  >
                    <div className={`ingredient-checkbox ${isChecked ? 'active' : ''}`}>
                      {isChecked && <Check size={14} />}
                    </div>
                    <span className="ingredient-text">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Cooking Instructions */}
          <div className="recipe-section-block">
            <h3 className="section-block-title">Step-by-Step Instructions</h3>
            <ol className="modal-instructions-list">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="instruction-step">
                  <span className="step-number">{idx + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-action-footer">
          <button
            type="button"
            className={`btn-modal-bookmark ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave(recipe.id)}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? 'Recipe Saved' : 'Save to Favorites'}</span>
          </button>

          <button
            type="button"
            className="btn-modal-add-plan"
            onClick={handleAddToPlan}
          >
            <Sparkles size={16} />
            <span>{addedNotice ? 'Added to Meal Plan!' : 'Add to Today’s Meal Plan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
