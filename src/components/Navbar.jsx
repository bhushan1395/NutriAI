import React from 'react';
import { Leaf, Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab = 'home', onSelectTab, theme = 'light', onToggleTheme }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Left Side: Brand Logo + Divider + Navigation Links */}
        <div className="navbar-left-cluster">
          {/* Brand Logo */}
          <div 
            className="brand-logo" 
            onClick={() => {
              onSelectTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="logo-icon-wrapper">
              <Leaf className="logo-leaf-icon" size={22} />
              <Sparkles className="logo-sparkle-icon" size={14} />
            </div>
            <div className="brand-text-group">
              <span className="brand-title">
                NutriSmart <span className="brand-highlight">AI</span>
              </span>
              <span className="brand-tagline">Personalized Nutrition Planner</span>
            </div>
          </div>

          {/* Clean Vertical Divider */}
          <div className="nav-divider" />

          {/* Navigation Tabs - 6 Main Pages */}
          <nav className="desktop-nav">
            <button 
              type="button" 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => {
                onSelectTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </button>
            <button 
              type="button" 
              className={`nav-link ${activeTab === 'tips' ? 'active' : ''}`}
              onClick={() => {
                onSelectTab('tips');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Daily Tips
            </button>
            <button 
              type="button" 
              className={`nav-link ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => {
                onSelectTab('recipes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Healthy Recipes
            </button>
            <button 
              type="button" 
              className={`nav-link ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={() => {
                onSelectTab('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Sparkles size={13} className="text-emerald nav-sparkle" />
              <span>AI Meal Planner</span>
            </button>
            <button 
              type="button" 
              className={`nav-link ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => {
                onSelectTab('tools');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Nutrition Tools
            </button>
            <button 
              type="button" 
              className={`nav-link ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => {
                onSelectTab('guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Nutrition Guide
            </button>
          </nav>
        </div>

        {/* Right Side: Light / Dark Mode Toggle */}
        <div className="navbar-right-cluster">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={18} className="theme-icon sun-icon text-amber" />
                <span className="theme-toggle-label">Light</span>
              </>
            ) : (
              <>
                <Moon size={18} className="theme-icon moon-icon text-blue" />
                <span className="theme-toggle-label">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
