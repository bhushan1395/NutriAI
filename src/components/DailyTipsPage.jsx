import React, { useState } from 'react';
import { Lightbulb, Sparkles, Bookmark, Share2, CheckCircle2, RefreshCw, Search, Heart, Shield } from 'lucide-react';
import { dailyTips } from '../data/nutritionData';

export default function DailyTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [savedTips, setSavedTips] = useState(() => {
    try {
      const saved = localStorage.getItem('nutrismart_saved_tips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = ['All', 'Gut Microbiome & Immunity', 'Metabolism & Energy', 'Hydration & Cellular Health', 'Mindful Eating & Habits'];

  const toggleSave = (id) => {
    const updated = savedTips.includes(id) 
      ? savedTips.filter((t) => t !== id)
      : [...savedTips, id];
    setSavedTips(updated);
    try {
      localStorage.setItem('nutrismart_saved_tips', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopy = (tip) => {
    const text = `NutriSmart AI Daily Tip: ${tip.title}\n${tip.text}\nAction Step: ${tip.actionableStep}`;
    navigator.clipboard.writeText(text);
    setCopiedId(tip.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTips = dailyTips.filter((tip) => {
    const matchesCat = selectedCategory === 'All' || tip.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="daily-tips-page">
      {/* Hero Header */}
      <section className="guide-hero-banner">
        <div className="guide-hero-container">
          <div className="guide-pill-badge">
            <Lightbulb size={14} className="text-amber" />
            <span>Daily Nutritional Wisdom</span>
          </div>
          <h1 className="guide-main-heading">
            Daily Healthy <span className="gradient-text">Eating Tips</span>
          </h1>
          <p className="guide-sub-text">
            Compounding daily principles grounded in metabolic science and clinical nutrition. 
            Small, intentional steps to elevate vitality, gut health, and daily focus.
          </p>
        </div>
      </section>

      <div className="guide-content-container">
        {/* Search & Category Filter */}
        <div className="topic-search-controls-box">
          <div className="topic-search-input-wrapper">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              className="topic-search-input"
              placeholder="Search daily tips (e.g., protein, hydration, gut health, breakfast)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="topic-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="daily-tips-grid">
          {filteredTips.map((tip) => {
            const isSaved = savedTips.includes(tip.id);
            return (
              <div key={tip.id} className="daily-tip-display-card">
                <div className="tip-card-top-row">
                  <span className="tip-category-pill">{tip.category}</span>
                  <span className="tip-badge-tag">{tip.badge}</span>
                </div>

                <h3 className="tip-card-headline">{tip.title}</h3>
                <p className="tip-card-body">{tip.text}</p>

                {tip.scienceNote && (
                  <div className="tip-science-callout">
                    <Shield size={16} className="text-emerald" />
                    <span><strong>Science Insight:</strong> {tip.scienceNote}</span>
                  </div>
                )}

                <div className="tip-action-step-box">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <div>
                    <strong>Action Step:</strong> {tip.actionableStep}
                  </div>
                </div>

                <div className="tip-card-footer-actions">
                  <button
                    type="button"
                    className="tip-btn-icon"
                    onClick={() => handleCopy(tip)}
                    title="Copy tip"
                  >
                    <Share2 size={15} />
                    <span>{copiedId === tip.id ? 'Copied!' : 'Share'}</span>
                  </button>
                  <button
                    type="button"
                    className={`tip-btn-icon ${isSaved ? 'saved' : ''}`}
                    onClick={() => toggleSave(tip.id)}
                    title="Save tip"
                  >
                    <Bookmark size={15} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
