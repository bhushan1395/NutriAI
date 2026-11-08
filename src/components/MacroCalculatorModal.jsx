import React, { useState } from 'react';
import { X, Calculator, Flame, Check } from 'lucide-react';

export default function MacroCalculatorModal({ isOpen, onClose }) {
  const [gender, setGender] = useState('female');
  const [age, setAge] = useState(28);
  const [weightKg, setWeightKg] = useState(65);
  const [heightCm, setHeightCm] = useState(168);
  const [activity, setActivity] = useState('moderate'); // sedentary, light, moderate, active
  const [goal, setGoal] = useState('fat_loss'); // fat_loss, maintain, muscle_gain

  if (!isOpen) return null;

  // Calculate BMR using Mifflin-St Jeor formula
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.4));

  // Goal adjustment
  let targetCalories = tdee;
  if (goal === 'fat_loss') {
    targetCalories = Math.round(tdee * 0.82); // 18% deficit
  } else if (goal === 'muscle_gain') {
    targetCalories = Math.round(tdee * 1.12); // 12% surplus
  }

  // Macro calculation:
  // Protein: ~2.0g per kg of body weight (or 2.2g for muscle building)
  const proteinGrams = goal === 'muscle_gain' ? Math.round(weightKg * 2.2) : Math.round(weightKg * 1.9);
  const proteinCals = proteinGrams * 4;

  // Fat: ~25-30% of target calories
  const fatCals = Math.round(targetCalories * 0.28);
  const fatGrams = Math.round(fatCals / 9);

  // Remainder to Carbs
  const carbsCals = Math.max(0, targetCalories - (proteinCals + fatCals));
  const carbsGrams = Math.round(carbsCals / 4);

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-dialog-content calculator-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div className="meal-plan-header">
          <div className="meal-plan-badge">
            <Calculator size={14} className="text-emerald" />
            <span>Interactive Nutrition Intelligence</span>
          </div>
          <h2 className="meal-plan-heading">Smart Macro & Calorie Calculator</h2>
          <p className="meal-plan-subtext">
            Enter your physical stats and primary goal to calculate your exact metabolic energy budget and macro ratio.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="calculator-layout-grid">
          {/* Inputs Column */}
          <div className="calc-inputs-column">
            {/* Gender Selector */}
            <div className="calc-input-group">
              <label className="calc-field-label">Biological Sex:</label>
              <div className="calc-pill-toggle">
                <button
                  type="button"
                  className={`calc-toggle-btn ${gender === 'female' ? 'active' : ''}`}
                  onClick={() => setGender('female')}
                >
                  Female
                </button>
                <button
                  type="button"
                  className={`calc-toggle-btn ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => setGender('male')}
                >
                  Male
                </button>
              </div>
            </div>

            {/* Age, Weight, Height */}
            <div className="calc-inputs-row">
              <div className="calc-input-group">
                <label className="calc-field-label">Age (yrs):</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="calc-num-input"
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => {
                    if (!age || Number(age) < 15) setAge(15);
                    else if (Number(age) > 100) setAge(100);
                  }}
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-field-label">Weight (kg):</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="calc-num-input"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => {
                    if (!weightKg || Number(weightKg) < 30) setWeightKg(30);
                    else if (Number(weightKg) > 250) setWeightKg(250);
                  }}
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-field-label">Height (cm):</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="calc-num-input"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => {
                    if (!heightCm || Number(heightCm) < 100) setHeightCm(100);
                    else if (Number(heightCm) > 240) setHeightCm(240);
                  }}
                />
              </div>
            </div>

            {/* Activity Level */}
            <div className="calc-input-group">
              <label className="calc-field-label">Activity Level:</label>
              <select
                className="calc-select-input"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="sedentary">Sedentary (Desk job, little to no exercise)</option>
                <option value="light">Lightly Active (1-3 days exercise/week)</option>
                <option value="moderate">Moderately Active (3-5 days exercise/week)</option>
                <option value="active">Very Active (6-7 days hard training/week)</option>
              </select>
            </div>

            {/* Primary Goal */}
            <div className="calc-input-group">
              <label className="calc-field-label">Primary Goal:</label>
              <div className="goal-options-grid">
                <button
                  type="button"
                  className={`goal-btn-tile ${goal === 'fat_loss' ? 'active' : ''}`}
                  onClick={() => setGoal('fat_loss')}
                >
                  <span className="goal-tile-title">Fat Loss</span>
                  <span className="goal-tile-desc">Moderate Deficit</span>
                </button>
                <button
                  type="button"
                  className={`goal-btn-tile ${goal === 'maintain' ? 'active' : ''}`}
                  onClick={() => setGoal('maintain')}
                >
                  <span className="goal-tile-title">Maintenance</span>
                  <span className="goal-tile-desc">Balanced Energy</span>
                </button>
                <button
                  type="button"
                  className={`goal-btn-tile ${goal === 'muscle_gain' ? 'active' : ''}`}
                  onClick={() => setGoal('muscle_gain')}
                >
                  <span className="goal-tile-title">Muscle Gain</span>
                  <span className="goal-tile-desc">Lean Hypertrophy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="calc-results-column">
            <div className="calc-results-card">
              <div className="calc-tdee-tag">
                <span>Calculated TDEE: {tdee} kcal</span>
              </div>

              <div className="calc-target-calories-display">
                <Flame size={24} className="text-emerald" />
                <div>
                  <span className="target-num">{targetCalories}</span>
                  <span className="target-unit">kcal / day</span>
                </div>
              </div>
              <p className="target-desc">Recommended daily target for your chosen goal</p>

              {/* Macro breakdown */}
              <div className="calc-macros-list">
                {/* Protein */}
                <div className="calc-macro-item">
                  <div className="calc-macro-label-row">
                    <span className="calc-macro-name text-emerald font-semibold">Protein</span>
                    <span className="calc-macro-grams">{proteinGrams}g <small>({Math.round((proteinCals / targetCalories) * 100)}%)</small></span>
                  </div>
                  <div className="calc-macro-bar-bg">
                    <div className="calc-macro-bar-fill fill-protein" style={{ width: `${Math.round((proteinCals / targetCalories) * 100)}%` }}></div>
                  </div>
                </div>

                {/* Carbs */}
                <div className="calc-macro-item">
                  <div className="calc-macro-label-row">
                    <span className="calc-macro-name text-blue font-semibold">Carbohydrates</span>
                    <span className="calc-macro-grams">{carbsGrams}g <small>({Math.round((carbsCals / targetCalories) * 100)}%)</small></span>
                  </div>
                  <div className="calc-macro-bar-bg">
                    <div className="calc-macro-bar-fill fill-carbs" style={{ width: `${Math.round((carbsCals / targetCalories) * 100)}%` }}></div>
                  </div>
                </div>

                {/* Fats */}
                <div className="calc-macro-item">
                  <div className="calc-macro-label-row">
                    <span className="calc-macro-name text-amber font-semibold">Healthy Fats</span>
                    <span className="calc-macro-grams">{fatGrams}g <small>({Math.round((fatCals / targetCalories) * 100)}%)</small></span>
                  </div>
                  <div className="calc-macro-bar-bg">
                    <div className="calc-macro-bar-fill fill-fats" style={{ width: `${Math.round((fatCals / targetCalories) * 100)}%` }}></div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn-apply-macros"
                onClick={() => {
                  alert(`Targets saved! Daily budget set to ${targetCalories} kcal with ${proteinGrams}g protein.`);
                  onClose();
                }}
              >
                <Check size={16} />
                <span>Apply Targets to Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
