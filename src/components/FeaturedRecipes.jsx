import React, { useState } from 'react';
import { Clock, Star, Flame, Bookmark, ArrowUpRight, Sparkles, RotateCcw } from 'lucide-react';
import SearchBar from './SearchBar';

export default function FeaturedRecipes({
  recipes,
  savedRecipeIds,
  onToggleSave,
  onSelectRecipe
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Filter recipes based on search, category pill, and saved status
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      recipe.category === selectedCategory ||
      recipe.dietary.some((d) => d.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.dietary.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSaved = showSavedOnly ? savedRecipeIds.includes(recipe.id) : true;

    return matchesCategory && matchesSearch && matchesSaved;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setShowSavedOnly(false);
  };

  return (
    <section id="search-recipes" className="featured-recipes-section">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header-block text-center">
          <div className="section-pill-tag">
            <Sparkles size={14} className="text-emerald" />
            <span>Curated by NutriSmart AI</span>
          </div>
          <h2 className="section-main-heading">
            Featured Healthy <span className="gradient-text">Recipes</span>
          </h2>
          <p className="section-sub-heading">
            Discover dietitian-calibrated dishes made with real, whole foods. 
            Filtered in real time to match your exact fitness goals and dietary preferences.
          </p>
        </div>

        {/* Search Bar & Filter Tabs */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalResults={filteredRecipes.length}
        />

        {/* Filter Toolbar: Saved Filter Toggle */}
        <div className="recipes-filter-toolbar">
          <button
            type="button"
            className={`filter-toggle-saved ${showSavedOnly ? 'active' : ''}`}
            onClick={() => setShowSavedOnly(!showSavedOnly)}
          >
            <Bookmark size={15} fill={showSavedOnly ? "currentColor" : "none"} />
            <span>{showSavedOnly ? 'Showing Saved Recipes' : 'Show Saved Recipes'}</span>
            {savedRecipeIds.length > 0 && (
              <span className="saved-count-pill">{savedRecipeIds.length}</span>
            )}
          </button>
        </div>

        {/* Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => {
              const isSaved = savedRecipeIds.includes(recipe.id);

              return (
                <div key={recipe.id} className="recipe-card">
                  {/* Card Image Wrapper */}
                  <div className="recipe-image-wrap" onClick={() => onSelectRecipe(recipe)}>
                    <img src={recipe.image} alt={recipe.title} className="recipe-card-img" loading="lazy" />
                    
                    {/* AI Score Badge */}
                    <div className="card-ai-score-badge">
                      <Sparkles size={12} />
                      <span>{recipe.aiScore}% Match</span>
                    </div>

                    {/* Bookmark Heart Button */}
                    <button
                      type="button"
                      className={`card-bookmark-btn ${isSaved ? 'is-saved' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(recipe.id);
                      }}
                      title={isSaved ? "Remove from saved" : "Save recipe"}
                      aria-label="Save recipe"
                    >
                      <Bookmark size={16} fill={isSaved ? "#10b981" : "none"} />
                    </button>

                    {/* Calories Tag */}
                    <div className="card-calorie-tag">
                      <Flame size={14} />
                      <span>{recipe.calories} kcal</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="recipe-card-body">
                    {/* Dietary Tags */}
                    <div className="card-tags-list">
                      {recipe.dietary.slice(0, 2).map((tag) => (
                        <span key={tag} className="recipe-mini-tag">{tag}</span>
                      ))}
                      {recipe.dietary.length > 2 && (
                        <span className="recipe-mini-tag text-muted">+{recipe.dietary.length - 2}</span>
                      )}
                    </div>

                    <h3 className="recipe-card-title" onClick={() => onSelectRecipe(recipe)}>
                      {recipe.title}
                    </h3>

                    <p className="recipe-card-desc">
                      {recipe.description.length > 95
                        ? `${recipe.description.slice(0, 95)}...`
                        : recipe.description}
                    </p>

                    {/* Macro Breakdown Mini Strip */}
                    <div className="card-macro-mini-strip">
                      <div className="macro-chip">
                        <span className="macro-chip-num">{recipe.protein}g</span>
                        <span className="macro-chip-lbl">Protein</span>
                      </div>
                      <div className="macro-chip">
                        <span className="macro-chip-num">{recipe.carbs}g</span>
                        <span className="macro-chip-lbl">Carbs</span>
                      </div>
                      <div className="macro-chip">
                        <span className="macro-chip-num">{recipe.fat}g</span>
                        <span className="macro-chip-lbl">Fat</span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="recipe-card-footer">
                      <div className="footer-meta-left">
                        <span className="card-time-badge">
                          <Clock size={13} />
                          {recipe.prepTime}
                        </span>
                        <span className="card-rating-badge">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          {recipe.rating}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="btn-card-view"
                        onClick={() => onSelectRecipe(recipe)}
                      >
                        <span>View</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-results-box">
            <div className="empty-icon-wrap">
              <RotateCcw size={32} />
            </div>
            <h3 className="empty-title">No matching healthy recipes found</h3>
            <p className="empty-desc">
              We couldn’t find any recipes matching your current search term or filter criteria. 
              Try searching for "salmon", "protein", "quinoa", or clear your filters.
            </p>
            <button
              type="button"
              className="btn-reset-filters"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
