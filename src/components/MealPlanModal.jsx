import React, { useState } from 'react';
import { X, Sparkles, Check, Calendar, Flame, RefreshCw } from 'lucide-react';
import { sampleMealPlans } from '../data/nutritionData';

export default function MealPlanModal({ isOpen, onClose }) {
  const [selectedGoal, setSelectedGoal] = useState('weight_loss');
  const [dietaryPreference, setDietaryPreference] = useState('Omnivore');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const activePlan = sampleMealPlans[selectedGoal] || sampleMealPlans.weight_loss;

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-dialog-content meal-plan-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div className="meal-plan-header">
          <div className="meal-plan-badge">
            <Sparkles size={14} className="text-emerald" />
            <span>AI Meal Planner Engine</span>
          </div>
          <h2 className="meal-plan-heading">Generate Personalized Meal Plan</h2>
          <p className="meal-plan-subtext">
            Configure your target goal and dietary preferences to synthesize an optimal, macronutrient-balanced meal schedule.
          </p>
        </div>

        {/* Controls: Goal Selector & Dietary Filter */}
        <div className="meal-plan-filters-wrap">
          <div className="plan-filter-group">
            <label className="plan-filter-label">Primary Goal:</label>
            <div className="plan-buttons-row">
              <button
                type="button"
                className={`plan-toggle-btn ${selectedGoal === 'weight_loss' ? 'active' : ''}`}
                onClick={() => setSelectedGoal('weight_loss')}
              >
                Fat Loss & Lean
              </button>
              <button
                type="button"
                className={`plan-toggle-btn ${selectedGoal === 'muscle_gain' ? 'active' : ''}`}
                onClick={() => setSelectedGoal('muscle_gain')}
              >
                Muscle Growth
              </button>
              <button
                type="button"
                className={`plan-toggle-btn ${selectedGoal === 'balanced' ? 'active' : ''}`}
                onClick={() => setSelectedGoal('balanced')}
              >
                Health & Longevity
              </button>
            </div>
          </div>

          <div className="plan-filter-group">
            <label className="plan-filter-label">Dietary Preference:</label>
            <div className="diet-select-row">
              {['Omnivore', 'Vegetarian', 'Vegan', 'Keto', 'Gluten-Free'].map((diet) => (
                <button
                  key={diet}
                  type="button"
                  className={`diet-pill-opt ${dietaryPreference === diet ? 'active' : ''}`}
                  onClick={() => setDietaryPreference(diet)}
                >
                  {dietaryPreference === diet && <Check size={12} />}
                  <span>{diet}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Meal Plan Preview Box */}
        <div className="meal-plan-result-box">
          <div className="plan-result-top-bar">
            <div>
              <h3 className="plan-result-title">{activePlan.title}</h3>
              <p className="plan-result-macros">{activePlan.split}</p>
            </div>
            <div className="plan-calories-pill">
              <Flame size={15} />
              <span>{activePlan.targetCalories}</span>
            </div>
          </div>

          <div className="plan-schedule-timeline">
            {/* Breakfast */}
            <div className="plan-schedule-card">
              <div className="schedule-time-badge">Breakfast • 8:00 AM</div>
              <div className="schedule-meal-info">
                <span className="schedule-meal-title">{activePlan.breakfast.name}</span>
                <span className="schedule-meal-meta">{activePlan.breakfast.cal} • {activePlan.breakfast.protein} protein</span>
              </div>
            </div>

            {/* Lunch */}
            <div className="plan-schedule-card">
              <div className="schedule-time-badge">Lunch • 1:00 PM</div>
              <div className="schedule-meal-info">
                <span className="schedule-meal-title">{activePlan.lunch.name}</span>
                <span className="schedule-meal-meta">{activePlan.lunch.cal} • {activePlan.lunch.protein} protein</span>
              </div>
            </div>

            {/* Snack */}
            <div className="plan-schedule-card">
              <div className="schedule-time-badge">Afternoon Fuel • 4:30 PM</div>
              <div className="schedule-meal-info">
                <span className="schedule-meal-title">{activePlan.snack.name}</span>
                <span className="schedule-meal-meta">{activePlan.snack.cal} • {activePlan.snack.protein} protein</span>
              </div>
            </div>

            {/* Dinner */}
            <div className="plan-schedule-card">
              <div className="schedule-time-badge">Dinner • 7:30 PM</div>
              <div className="schedule-meal-info">
                <span className="schedule-meal-title">{activePlan.dinner.name}</span>
                <span className="schedule-meal-meta">{activePlan.dinner.cal} • {activePlan.dinner.protein} protein</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="meal-plan-footer">
          <button
            type="button"
            className="btn-modal-secondary"
            onClick={handleRegenerate}
          >
            <RefreshCw size={15} className={isGenerating ? 'spin-icon' : ''} />
            <span>Shuffle Alternatives</span>
          </button>
          
          <button
            type="button"
            className="btn-modal-primary"
            onClick={() => {
              alert('Plan saved to your NutriSmart profile! You can now track your daily grocery list.');
              onClose();
            }}
          >
            <Calendar size={16} />
            <span>Save & Set as Active Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
