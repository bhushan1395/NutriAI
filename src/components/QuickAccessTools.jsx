import React, { useState } from 'react';
import {
  CalendarCheck,
  Calculator,
  Utensils,
  Droplets,
  ScanLine,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import { nutritionTools } from '../data/nutritionData';

export default function QuickAccessTools({ onOpenMealPlanModal, onOpenCalculator }) {
  // Mini interactive state for Water Tracker tool directly on the card!
  const [waterGlasses, setWaterGlasses] = useState(5);
  const targetWaterGlasses = 8;

  // Mini interactive state for Pantry Chef quick test
  const [fridgeItem, setFridgeItem] = useState('');
  const [fridgeIngredients, setFridgeIngredients] = useState(['Eggs', 'Spinach', 'Olive Oil']);
  const [chefIdea, setChefIdea] = useState(null);

  const addIngredient = (e) => {
    e.preventDefault();
    if (fridgeItem.trim() && !fridgeIngredients.includes(fridgeItem.trim())) {
      setFridgeIngredients([...fridgeIngredients, fridgeItem.trim()]);
      setFridgeItem('');
    }
  };

  const removeIngredient = (name) => {
    setFridgeIngredients(fridgeIngredients.filter((i) => i !== name));
  };

  const generateQuickPantryIdea = () => {
    setChefIdea(
      `AI Chef Recommendation: Whip up a "Fluffy Mediterranean Scramble" using your ${fridgeIngredients.join(', ')} with a side of toasted whole wheat toast!`
    );
  };

  const getToolIcon = (iconName) => {
    switch (iconName) {
      case 'CalendarCheck':
        return <CalendarCheck size={26} className="tool-icon" />;
      case 'Calculator':
        return <Calculator size={26} className="tool-icon" />;
      case 'Utensils':
        return <Utensils size={26} className="tool-icon" />;
      case 'Droplets':
        return <Droplets size={26} className="tool-icon" />;
      case 'ScanLine':
        return <ScanLine size={26} className="tool-icon" />;
      case 'ShieldCheck':
        return <ShieldCheck size={26} className="tool-icon" />;
      default:
        return <Sparkles size={26} className="tool-icon" />;
    }
  };

  return (
    <section id="nutrition-tools" className="quick-tools-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block text-center">
          <div className="section-pill-tag">
            <Sparkles size={14} className="text-emerald" />
            <span>Intelligent Nutrition Suite</span>
          </div>
          <h2 className="section-main-heading">
            Quick Access to <span className="gradient-text">Meal Plans & Tools</span>
          </h2>
          <p className="section-sub-heading">
            Everything you need to orchestrate a healthier lifestyle. From automated meal generation 
            to precision macro calculators and zero-waste pantry planning.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="tools-card-grid">
          {nutritionTools.map((tool) => (
            <div key={tool.id} className="tool-card">
              <div className="tool-card-top">
                <div
                  className="tool-icon-wrapper"
                  style={{ backgroundColor: tool.bgColor, color: tool.color }}
                >
                  {getToolIcon(tool.icon)}
                </div>
                <span className="tool-badge-pill" style={{ color: tool.color, borderColor: tool.color }}>
                  {tool.badge}
                </span>
              </div>

              <h3 className="tool-card-title">{tool.title}</h3>
              <p className="tool-card-desc">{tool.description}</p>
              
              <div className="tool-stats-tag">{tool.stats}</div>

              {/* Action Buttons based on tool type */}
              <div className="tool-action-wrap">
                {tool.id === 'meal-planner' && (
                  <button
                    type="button"
                    className="btn-tool-action btn-tool-primary"
                    onClick={onOpenMealPlanModal}
                  >
                    <span>{tool.actionText}</span>
                    <ArrowRight size={15} />
                  </button>
                )}

                {tool.id === 'macro-calc' && (
                  <button
                    type="button"
                    className="btn-tool-action btn-tool-secondary"
                    onClick={onOpenCalculator}
                  >
                    <span>{tool.actionText}</span>
                    <ArrowRight size={15} />
                  </button>
                )}

                {tool.id === 'hydration-tracker' && (
                  <div className="mini-water-widget">
                    <div className="water-glasses-count">
                      <Droplets size={16} className="text-cyan" />
                      <span>{waterGlasses} / {targetWaterGlasses} Glasses</span>
                    </div>
                    <div className="water-buttons">
                      <button
                        type="button"
                        className="btn-water-icon"
                        onClick={() => setWaterGlasses((prev) => Math.max(0, prev - 1))}
                        title="Remove glass"
                      >
                        <Minus size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-water-icon"
                        onClick={() => setWaterGlasses((prev) => Math.min(15, prev + 1))}
                        title="Add glass"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {tool.id === 'pantry-chef' && (
                  <button
                    type="button"
                    className="btn-tool-action btn-tool-secondary"
                    onClick={() => {
                      const el = document.getElementById('pantry-interactive-box');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>{tool.actionText}</span>
                    <ArrowRight size={15} />
                  </button>
                )}

                {tool.id !== 'meal-planner' && tool.id !== 'macro-calc' && tool.id !== 'hydration-tracker' && tool.id !== 'pantry-chef' && (
                  <button
                    type="button"
                    className="btn-tool-action btn-tool-secondary"
                    onClick={onOpenMealPlanModal}
                  >
                    <span>{tool.actionText}</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Pantry-to-Plate Showcase Box */}
        <div id="pantry-interactive-box" className="pantry-interactive-container">
          <div className="pantry-box-left">
            <div className="pantry-header">
              <div className="pantry-icon-circle">
                <Utensils size={20} className="text-emerald" />
              </div>
              <div>
                <h3 className="pantry-title">Pantry-to-Plate AI Chef Simulator</h3>
                <p className="pantry-subtitle">What ingredients do you have right now? Let NutriSmart construct a healthy meal.</p>
              </div>
            </div>

            <form onSubmit={addIngredient} className="pantry-input-row">
              <input
                type="text"
                className="pantry-text-input"
                placeholder="Add ingredient (e.g., Avocado, Greek Yogurt, Broccoli)..."
                value={fridgeItem}
                onChange={(e) => setFridgeItem(e.target.value)}
              />
              <button type="submit" className="btn-pantry-add">
                <Plus size={16} />
                <span>Add</span>
              </button>
            </form>

            <div className="pantry-tags-wrapper">
              {fridgeIngredients.map((item) => (
                <span key={item} className="pantry-ingredient-pill">
                  {item}
                  <button
                    type="button"
                    className="btn-remove-pill"
                    onClick={() => removeIngredient(item)}
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <button
              type="button"
              className="btn-generate-pantry-meal"
              onClick={generateQuickPantryIdea}
            >
              <Sparkles size={16} />
              <span>Generate Recipe from My Ingredients</span>
            </button>

            {chefIdea && (
              <div className="pantry-ai-result-card">
                <Sparkles size={18} className="text-emerald shrink-0" />
                <p className="pantry-result-text">{chefIdea}</p>
              </div>
            )}
          </div>

          <div className="pantry-box-right">
            <div className="quick-plan-banner-card">
              <div className="banner-tag">Instant Planner</div>
              <h4 className="banner-title">Need a Complete 7-Day Nutrition Routine?</h4>
              <p className="banner-desc">
                Generate an intelligent weekly meal schedule balanced across macro targets, 
                micros, and prep time with an automated shopping list.
              </p>
              <button
                type="button"
                className="btn-banner-action"
                onClick={onOpenMealPlanModal}
              >
                <CalendarCheck size={16} />
                <span>Launch AI Planner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
