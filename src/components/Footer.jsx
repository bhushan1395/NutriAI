import React from 'react';
import { Leaf, Sparkles, Shield, Award } from 'lucide-react';

const currentYear = new Date().getFullYear();

export default function Footer({ onSelectTab }) {
  const handleNav = (tab) => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand & Mission */}
        <div className="footer-brand-simple">
          <div className="brand-logo" onClick={() => handleNav('home')}>
            <div className="logo-icon-wrapper">
              <Leaf className="logo-leaf-icon" size={20} />
              <Sparkles className="logo-sparkle-icon" size={12} />
            </div>
            <div className="brand-text-group">
              <span className="brand-title">
                NutriSmart <span className="brand-highlight">AI</span>
              </span>
              <span className="brand-tagline">Personalized Nutrition Planner</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            Empowering healthy lifestyles with personalized nutrition insights, mindful whole-food cooking, and evidence-based daily wellness advice.
          </p>
          <div className="footer-badges-row">
            <span className="footer-trust-badge">
              <Shield size={13} className="text-emerald" /> Evidence-Based Nutrition
            </span>
            <span className="footer-trust-badge">
              <Award size={13} className="text-emerald" /> Wholesome Real Food
            </span>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="footer-disclaimer-box">
          <p className="disclaimer-text">
            <strong>Medical Disclaimer:</strong> NutriSmart AI provides nutritional recommendations and healthy eating guidance for wellness and educational purposes. It is not intended as medical advice, clinical diagnosis, or disease treatment. Always consult a licensed healthcare practitioner or registered dietitian for specific personal dietary needs.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} NutriSmart AI – Personalized Nutrition Planner. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <button type="button" className="footer-text-btn" onClick={() => handleNav('home')}>
              Home
            </button>
            <span>•</span>
            <button type="button" className="footer-text-btn" onClick={() => handleNav('tips')}>
              Daily Tips
            </button>
            <span>•</span>
            <button type="button" className="footer-text-btn" onClick={() => handleNav('recipes')}>
              Healthy Recipes
            </button>
            <span>•</span>
            <button type="button" className="footer-text-btn" onClick={() => handleNav('planner')}>
              AI Meal Planner
            </button>
            <span>•</span>
            <button type="button" className="footer-text-btn" onClick={() => handleNav('tools')}>
              Nutrition Tools
            </button>
            <span>•</span>
            <button type="button" className="footer-text-btn" onClick={() => handleNav('guide')}>
              Nutrition Guide
            </button>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
