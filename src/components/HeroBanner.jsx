import React from 'react';
import { Sparkles, Leaf, Heart, Sun, ArrowRight, Utensils, CheckCircle2 } from 'lucide-react';

export default function HeroBanner({ onSelectTab }) {
  return (
    <section className="welcome-banner-section">
      <div className="welcome-banner-container">
        {/* Top 2-Column Split Hero Layout */}
        <div className="hero-split-grid">
          {/* Left Column: Personalized Text & CTAs */}
          <div className="hero-text-content">
            <div className="welcome-pill-badge">
              <Sparkles size={14} className="welcome-badge-icon" />
              <span>Welcome to NutriSmart AI</span>
            </div>

            <h1 className="welcome-main-title">
              Personalized Nutrition for a <br />
              <span className="gradient-text">Healthier, Balanced Life</span>
            </h1>

            <p className="welcome-intro-text">
              NutriSmart AI is your intelligent guide to personalized nutrition and wellness. 
              We believe eating well shouldn't be complicated. By combining evidence-based nutrition 
              principles with modern smart planning, we help you discover nourishing whole-food meals, 
              stay inspired with daily health tips, and build sustainable eating habits that fuel your everyday energy.
            </p>

            {/* Quick Action CTAs */}
            <div className="hero-cta-group">
              <button 
                type="button"
                className="hero-primary-btn" 
                onClick={() => onSelectTab && onSelectTab('recipes')}
              >
                <span>Explore Healthy Recipes</span>
                <ArrowRight size={17} />
              </button>
              <button 
                type="button"
                className="hero-secondary-btn" 
                onClick={() => onSelectTab && onSelectTab('planner')}
              >
                <Utensils size={17} />
                <span>AI Meal Planner</span>
              </button>
            </div>

            {/* Trust / Benefit micro tags */}
            <div className="hero-perks-row">
              <span className="hero-perk-item">
                <CheckCircle2 size={15} className="text-emerald" />
                Whole-Food Recipes
              </span>
              <span className="hero-perk-item">
                <CheckCircle2 size={15} className="text-emerald" />
                Daily Expert Tips
              </span>
              <span className="hero-perk-item">
                <CheckCircle2 size={15} className="text-emerald" />
                Macro-Balanced
              </span>
            </div>
          </div>

          {/* Right Column: Healthy Salad Bowl Photo & Floating Badges */}
          <div className="hero-image-container">
            <div className="hero-image-backdrop-glow" aria-hidden="true" />
            
            {/* Top Floating Badge */}
            <div className="hero-floating-badge badge-top-right">
              <div className="badge-icon-bubble bg-emerald-light">🥗</div>
              <div className="badge-text-group">
                <span className="badge-title">Fresh & Wholesome</span>
                <span className="badge-subtitle">100% Real Food Fuel</span>
              </div>
            </div>

            {/* Main Salad Bowl Card */}
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"
                alt="Colorful fresh healthy salad bowl with avocado, quinoa, greens, and veggies"
                className="hero-salad-img"
                loading="eager"
              />
            </div>

            {/* Bottom Floating Badge */}
            <div className="hero-floating-badge badge-bottom-left">
              <div className="badge-icon-bubble bg-amber-light">⚡</div>
              <div className="badge-text-group">
                <span className="badge-title">Balanced Nutrition</span>
                <span className="badge-subtitle">Optimal Vitamins & Macros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Highlights Row (Bottom of Banner) */}
        <div className="welcome-highlights-row">
          <div className="welcome-feature-card">
            <div className="feature-icon-box bg-emerald-light">
              <Leaf size={20} className="text-emerald" />
            </div>
            <div>
              <h3 className="feature-title">Wholesome Recipes</h3>
              <p className="feature-desc">Nutrient-rich, delicious meals made from real foods</p>
            </div>
          </div>

          <div className="welcome-feature-card">
            <div className="feature-icon-box bg-amber-light">
              <Sun size={20} className="text-amber" />
            </div>
            <div>
              <h3 className="feature-title">Daily Nutrition Tips</h3>
              <p className="feature-desc">Practical, science-backed guidance every single day</p>
            </div>
          </div>

          <div className="welcome-feature-card">
            <div className="feature-icon-box bg-blue-light">
              <Heart size={20} className="text-blue" />
            </div>
            <div>
              <h3 className="feature-title">Personalized Wellness</h3>
              <p className="feature-desc">Mindful eating tailored to your daily vitality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
