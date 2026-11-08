import React from 'react';
import { Search, X } from 'lucide-react';
import { dietaryCategories } from '../data/nutritionData';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalResults
}) {
  const quickSuggestions = ["Salmon", "Quinoa", "Avocado", "Chicken", "Keto", "Smoothie"];

  return (
    <div className="search-section-container">
      {/* Search Input Bar */}
      <div className="search-input-wrapper">
        <Search className="search-input-icon" size={20} />
        <input
          type="text"
          className="search-main-input"
          placeholder="Search foods, ingredients, macros (e.g., 'salmon', 'high protein', 'keto', 'smoothie')..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Category Filter Pills & Results Count */}
      <div className="filter-controls-row">
        <div className="category-pills-list">
          {dietaryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-results-meta">
          <span className="results-count-badge">
            <strong>{totalResults}</strong> {totalResults === 1 ? 'recipe' : 'recipes'} found
          </span>
        </div>
      </div>

      {/* Quick Search Suggestions */}
      <div className="quick-suggestions-row">
        <span className="suggestions-label">Popular Searches:</span>
        <div className="suggestions-tags">
          {quickSuggestions.map((term) => (
            <button
              key={term}
              type="button"
              className="suggestion-tag"
              onClick={() => onSearchChange(term)}
            >
              #{term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
