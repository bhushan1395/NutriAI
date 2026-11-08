import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Check, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { healthyRecipesData } from '../data/healthyRecipesData';

export default function HealthyRecipesPage() {
  const [selectedMeal, setSelectedMeal] = useState('all'); // all, breakfast, lunch, dinner, snack
  const [selectedDiet, setSelectedDiet] = useState('all'); // all, vegetarian, non-vegetarian
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  // Filter recipes based on meal type and diet
  const filteredRecipes = healthyRecipesData.filter((recipe) => {
    const matchesMeal = selectedMeal === 'all' || recipe.mealType === selectedMeal;
    const matchesDiet = selectedDiet === 'all' || recipe.dietType === selectedDiet;
    return matchesMeal && matchesDiet;
  });

  const mealTabs = [
    { id: 'all', label: 'All Meals', icon: '🍽️' },
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snack', label: 'Snacks', icon: '🥑' }
  ];

  const toggleIngredients = (id) => {
    setExpandedRecipeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="healthy-recipes-page">
      {/* Top Banner */}
      <section className="recipes-hero-banner">
        <div className="recipes-hero-container">
          <div className="recipes-pill-badge">
            <Sparkles size={14} className="text-emerald" />
            <span>Curated Whole-Food Menu</span>
          </div>

          <h1 className="recipes-main-heading">
            Healthy <span className="gradient-text">Recipes</span>
          </h1>

          <p className="recipes-sub-text">
            Balanced recipes for breakfast, lunch, dinner, and snacks. 
            Calibrated with exact nutritional values and macro splits per serving.
          </p>

          {/* Meal Type Filter Tabs */}
          <div className="meal-filter-tabs-row">
            {mealTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`meal-tab-btn ${selectedMeal === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedMeal(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Diet Selector: All vs Vegetarian vs Non-Vegetarian */}
          <div className="diet-filter-pill-group">
            <button
              type="button"
              className={`diet-filter-pill ${selectedDiet === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDiet('all')}
            >
              All Diets
            </button>
            <button
              type="button"
              className={`diet-filter-pill ${selectedDiet === 'vegetarian' ? 'active veg-active' : ''}`}
              onClick={() => setSelectedDiet('vegetarian')}
            >
              <span className="diet-dot veg-dot"></span>
              <span>Vegetarian Only</span>
            </button>
            <button
              type="button"
              className={`diet-filter-pill ${selectedDiet === 'non-vegetarian' ? 'active nonveg-active' : ''}`}
              onClick={() => setSelectedDiet('non-vegetarian')}
            >
              <span className="diet-dot nonveg-dot"></span>
              <span>Non-Vegetarian Only</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="recipes-page-container">
        {/* Results Counter Bar */}
        <div className="recipes-results-meta-bar">
          <span className="results-count-text">
            Showing <strong>{filteredRecipes.length}</strong> {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
          </span>
          {(selectedMeal !== 'all' || selectedDiet !== 'all') && (
            <button 
              type="button" 
              className="btn-clear-filters"
              onClick={() => { setSelectedMeal('all'); setSelectedDiet('all'); }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Recipes Grid */}
        <div className="recipes-showcase-grid">
          {filteredRecipes.map((recipe) => {
            const isExpanded = expandedRecipeId === recipe.id;

            return (
              <div key={recipe.id} className="recipe-showcase-card">
                {/* Image & Overlay Badges */}
                <div className="recipe-card-img-wrap">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="recipe-card-img"
                    loading="lazy" 
                  />

                  {/* Meal Tag */}
                  <span className="recipe-meal-tag">
                    {recipe.mealType.toUpperCase()}
                  </span>

                  {/* Vegetarian / Non-Vegetarian Badge */}
                  <div className={`diet-indicator-badge ${recipe.dietType === 'vegetarian' ? 'is-veg' : 'is-nonveg'}`}>
                    <span className="diet-indicator-dot"></span>
                    <span>{recipe.dietType === 'vegetarian' ? 'Vegetarian' : 'Non-Veg'}</span>
                  </div>
                </div>

                {/* Recipe Card Body */}
                <div className="recipe-card-content">
                  <div className="card-title-row">
                    <h3 className="recipe-heading">{recipe.title}</h3>
                  </div>

                  <p className="recipe-brief-desc">{recipe.description}</p>

                  {/* Nutritional Values Per Serving Panel */}
                  <div className="nutrition-stats-panel">
                    <div className="panel-header-line">
                      <span className="panel-label">Nutritional Values per Serving:</span>
                      <span className="prep-time-chip">
                        <Clock size={12} />
                        {recipe.prepTime}
                      </span>
                    </div>

                    <div className="nutritional-metrics-strip">
                      <div className="nutri-stat-cell cal-cell">
                        <span className="nutri-num">{recipe.calories}</span>
                        <span className="nutri-label">kcal</span>
                      </div>
                      <div className="nutri-stat-cell">
                        <span className="nutri-num">{recipe.protein}g</span>
                        <span className="nutri-label">Protein</span>
                      </div>
                      <div className="nutri-stat-cell">
                        <span className="nutri-num">{recipe.carbs}g</span>
                        <span className="nutri-label">Carbs</span>
                      </div>
                      <div className="nutri-stat-cell">
                        <span className="nutri-num">{recipe.fat}g</span>
                        <span className="nutri-label">Fat</span>
                      </div>
                      <div className="nutri-stat-cell">
                        <span className="nutri-num">{recipe.fiber}g</span>
                        <span className="nutri-label">Fiber</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="recipe-feature-tags">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="feature-mini-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand Ingredients Drawer */}
                  <button
                    type="button"
                    className="btn-toggle-ingredients"
                    onClick={() => toggleIngredients(recipe.id)}
                  >
                    <span>{isExpanded ? 'Hide Key Ingredients' : 'View Key Ingredients'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="ingredients-drawer">
                      <span className="drawer-title">Key Ingredients:</span>
                      <ul className="drawer-list">
                        {recipe.keyIngredients.map((item, idx) => (
                          <li key={idx} className="drawer-item">
                            <Check size={13} className="text-emerald shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
