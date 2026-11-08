import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Flame,
  Utensils,
  Calendar,
  Clock,
  Check,
  RefreshCw,
  ShoppingBag,
  Droplets,
  ChevronDown,
  ChevronUp,
  Share2,
  Printer,
  ShieldCheck,
  Zap,
  Info,
  Scale,
  Heart
} from 'lucide-react';
import {
  commonAllergies,
  nutritionGoals,
  dietaryPreferences,
  activityLevels,
  generatePersonalizedPlan,
  getAlternateMeal,
  generateSmartGroceryList
} from '../data/mealPlannerData';

export default function MealPlannerPage() {
  // Form State
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState('65');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [selectedGoal, setSelectedGoal] = useState('weight_loss');
  const [dietPreference, setDietPreference] = useState('omnivore');
  const [selectedAllergies, setSelectedAllergies] = useState(['dairy']); // default allergy example for clarity
  const [planDuration, setPlanDuration] = useState('weekly'); // 'daily' or 'weekly'

  // Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState(() =>
    generatePersonalizedPlan({
      age: 28,
      gender: 'female',
      weight: 65,
      activityLevel: 'moderate',
      goal: 'weight_loss',
      dietPreference: 'omnivore',
      allergies: ['dairy'],
      planDuration: 'weekly'
    })
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [checkedGroceryItems, setCheckedGroceryItems] = useState({});
  const [copyFeedback, setCopyFeedback] = useState(false);

  const resultsRef = useRef(null);

  // Handle allergy selection toggle
  const toggleAllergy = (allergyId) => {
    setSelectedAllergies((prev) => {
      if (prev.includes(allergyId)) {
        return prev.filter((id) => id !== allergyId);
      } else {
        return [...prev, allergyId];
      }
    });
  };

  // Generate Plan with AI simulation steps
  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setGenerationStep(0);

    const steps = [
      'Analyzing age, metabolic rate & TDEE...',
      'Applying dietary filters & excluding allergens...',
      'Optimizing macro balance & portion targets...',
      'Synthesizing personalized breakfast, lunch & dinner...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setGenerationStep(current);
      } else {
        clearInterval(interval);
        const newPlan = generatePersonalizedPlan({
          age: Number(age) || 28,
          gender,
          weight: Number(weight) || 65,
          activityLevel,
          goal: selectedGoal,
          dietPreference,
          allergies: selectedAllergies,
          planDuration
        });
        setGeneratedPlan(newPlan);
        setSelectedDayIndex(0);
        setIsGenerating(false);

        // Smooth scroll to results
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }, 380);
  };

  // Swap an individual meal
  const handleSwapMeal = (dayIdx, mealKey) => {
    if (!generatedPlan) return;
    const currentMeal = generatedPlan.days[dayIdx].meals[mealKey];
    const newMeal = getAlternateMeal(currentMeal.id, mealKey, dietPreference, selectedAllergies);

    setGeneratedPlan((prev) => {
      const updatedDays = [...prev.days];
      const targetDay = { ...updatedDays[dayIdx] };
      const updatedMeals = {
        ...targetDay.meals,
        [mealKey]: {
          ...newMeal,
          timeLabel: currentMeal.timeLabel
        }
      };

      // Recalculate totals
      const cals = Object.values(updatedMeals).reduce((sum, m) => sum + (m.calories || 0), 0);
      const protein = Object.values(updatedMeals).reduce((sum, m) => sum + (m.protein || 0), 0);
      const carbs = Object.values(updatedMeals).reduce((sum, m) => sum + (m.carbs || 0), 0);
      const fat = Object.values(updatedMeals).reduce((sum, m) => sum + (m.fat || 0), 0);
      const fiber = Object.values(updatedMeals).reduce((sum, m) => sum + (m.fiber || 0), 0);

      targetDay.meals = updatedMeals;
      targetDay.dayTotals = { calories: cals, protein, carbs, fat, fiber };
      updatedDays[dayIdx] = targetDay;

      return {
        ...prev,
        days: updatedDays
      };
    });
  };

  // Toggle grocery item checkbox
  const toggleGroceryItem = (itemName) => {
    setCheckedGroceryItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  // Copy grocery list
  const handleCopyGroceryList = () => {
    if (!generatedPlan) return;
    const groceryData = generateSmartGroceryList(
      planDuration === 'daily' ? [generatedPlan.days[selectedDayIndex]] : generatedPlan.days
    );
    let text = `🛒 NutriSmart AI Shopping List (${planDuration === 'daily' ? generatedPlan.days[selectedDayIndex].day : '7-Day Plan'})\n\n`;
    Object.entries(groceryData).forEach(([category, items]) => {
      text += `--- ${category} ---\n`;
      items.forEach((item) => {
        text += `• ${item.name} (${item.count}x)\n`;
      });
      text += '\n';
    });
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2200);
  };

  // Active day object for display
  const activeDay = generatedPlan?.days[selectedDayIndex] || generatedPlan?.days[0];
  const targets = generatedPlan?.meta?.targets;
  const groceryCategories = generatedPlan
    ? generateSmartGroceryList(planDuration === 'daily' ? [activeDay] : generatedPlan.days)
    : {};

  return (
    <div className="meal-planner-view-page">
      {/* =========================================================
          HERO BANNER
          ========================================================= */}
      <section className="planner-hero-banner">
        <div className="planner-hero-container">
          <div className="planner-pill-badge">
            <Sparkles size={15} className="text-emerald" />
            <span>AI Nutritionist & Meal Architect</span>
          </div>

          <h1 className="planner-main-heading">
            Personalized <span className="gradient-text">AI Meal Planner</span>
          </h1>

          <p className="planner-sub-text">
            Enter your age, dietary preferences, food allergies, and wellness targets.
            Our intelligent nutrition engine generates a custom daily or weekly meal plan
            with macro calibration and exact portion guidance.
          </p>

          <div className="planner-hero-highlights">
            <div className="planner-highlight-item">
              <ShieldCheck size={18} className="text-emerald" />
              <span>100% Allergen Safe Filters</span>
            </div>
            <div className="planner-highlight-item">
              <Scale size={18} className="text-emerald" />
              <span>Precision Suggested Portions</span>
            </div>
            <div className="planner-highlight-item">
              <Calendar size={18} className="text-emerald" />
              <span>Daily & 7-Day Schedules</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONFIGURATOR FORM SECTION (SPACIOUS & UNCLUTTERED)
          ========================================================= */}
      <section className="planner-form-section">
        <div className="planner-form-container">
          <form onSubmit={handleGenerate} className="planner-card-panel">
            <div className="panel-header-block">
              <h2 className="panel-main-title">Configure Your Personal Nutrition Profile</h2>
              <p className="panel-subtitle">
                Customize each parameter below to let the AI balance your calorie expenditure, macronutrients, and allergen exclusions.
              </p>
            </div>

            <div className="planner-form-grid">
              {/* Row 1: Age, Gender & Activity Level */}
              <div className="form-input-card">
                <div className="card-badge-row">
                  <span className="input-group-badge">1. Personal Profile</span>
                </div>
                
                <div className="form-controls-vertical">
                  {/* Age & Weight Inputs (Manual Typing - No Arrows) */}
                  <div className="age-weight-inputs-grid">
                    <div className="single-field-wrap">
                      <label className="field-label" htmlFor="age-input">
                        <span>Age</span>
                        <span className="field-hint">Years (14 - 99)</span>
                      </label>
                      <div className="manual-input-box">
                        <input
                          id="age-input"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="28"
                          value={age}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 3) setAge(val);
                          }}
                          onBlur={() => {
                            if (!age || Number(age) < 14) setAge('14');
                            else if (Number(age) > 99) setAge('99');
                          }}
                          className="styled-manual-input"
                        />
                        <span className="input-suffix">yrs</span>
                      </div>
                    </div>

                    <div className="single-field-wrap">
                      <label className="field-label" htmlFor="weight-input">
                        <span>Weight</span>
                        <span className="field-hint">Kg (35 - 200)</span>
                      </label>
                      <div className="manual-input-box">
                        <input
                          id="weight-input"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="65"
                          value={weight}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 3) setWeight(val);
                          }}
                          onBlur={() => {
                            if (!weight || Number(weight) < 35) setWeight('35');
                            else if (Number(weight) > 200) setWeight('200');
                          }}
                          className="styled-manual-input"
                        />
                        <span className="input-suffix">kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Gender Selector */}
                  <div className="single-field-wrap">
                    <label className="field-label">
                      <span>Biological Profile / Gender</span>
                    </label>
                    <div className="pill-selector-row">
                      <button
                        type="button"
                        className={`pill-choice-btn ${gender === 'female' ? 'active' : ''}`}
                        onClick={() => setGender('female')}
                      >
                        Female
                      </button>
                      <button
                        type="button"
                        className={`pill-choice-btn ${gender === 'male' ? 'active' : ''}`}
                        onClick={() => setGender('male')}
                      >
                        Male
                      </button>
                    </div>
                  </div>

                  {/* Daily Activity Level */}
                  <div className="single-field-wrap">
                    <label className="field-label">
                      <span>Daily Activity Level</span>
                    </label>
                    <div className="activity-options-grid">
                      {activityLevels.map((act) => (
                        <button
                          key={act.id}
                          type="button"
                          className={`activity-pill-btn ${activityLevel === act.id ? 'active' : ''}`}
                          onClick={() => setActivityLevel(act.id)}
                        >
                          <span className="activity-name">{act.label}</span>
                          <span className="activity-desc">{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Nutrition Goal & Plan Duration */}
              <div className="form-input-card">
                <div className="card-badge-row">
                  <span className="input-group-badge">2. Target Goal & Duration</span>
                </div>

                <div className="form-controls-vertical">
                  {/* Goal Cards */}
                  <div className="single-field-wrap">
                    <label className="field-label">
                      <span>Primary Nutrition Goal</span>
                    </label>
                    <div className="goal-cards-stack">
                      {nutritionGoals.map((g) => (
                        <div
                          key={g.id}
                          className={`goal-selectable-card ${selectedGoal === g.id ? 'active' : ''}`}
                          onClick={() => setSelectedGoal(g.id)}
                        >
                          <div className="goal-card-icon-area">{g.icon}</div>
                          <div className="goal-card-text">
                            <div className="goal-title-line">
                              <span className="goal-name">{g.title}</span>
                              <span className="goal-badge">{g.badge}</span>
                            </div>
                            <p className="goal-explanation">{g.desc}</p>
                          </div>
                          <div className="goal-check-circle">
                            {selectedGoal === g.id && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan Duration Toggle */}
                  <div className="single-field-wrap">
                    <label className="field-label">
                      <span>Plan Duration</span>
                      <span className="field-hint">Choose schedule scope</span>
                    </label>
                    <div className="duration-toggle-row">
                      <button
                        type="button"
                        className={`duration-opt-btn ${planDuration === 'daily' ? 'active' : ''}`}
                        onClick={() => setPlanDuration('daily')}
                      >
                        <Clock size={16} />
                        <span>Daily Plan (1 Day Focus)</span>
                      </button>
                      <button
                        type="button"
                        className={`duration-opt-btn ${planDuration === 'weekly' ? 'active' : ''}`}
                        onClick={() => setPlanDuration('weekly')}
                      >
                        <Calendar size={16} />
                        <span>Weekly Plan (7 Days Full Schedule)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Dietary Preference & Food Allergies */}
            <div className="form-input-card full-width-card">
              <div className="card-badge-row">
                <span className="input-group-badge">3. Dietary Preference & Food Allergies</span>
              </div>

              <div className="preferences-dual-grid">
                {/* Dietary Preference */}
                <div className="single-field-wrap">
                  <label className="field-label">
                    <span>Dietary Preference</span>
                    <span className="field-hint">Select what best matches your eating style</span>
                  </label>
                  <div className="dietary-cards-row">
                    {dietaryPreferences.map((diet) => (
                      <button
                        key={diet.id}
                        type="button"
                        className={`diet-preference-card ${dietPreference === diet.id ? 'active' : ''}`}
                        onClick={() => setDietPreference(diet.id)}
                      >
                        <span className="diet-icon">{diet.icon}</span>
                        <span className="diet-title">{diet.label}</span>
                        <span className="diet-desc">{diet.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food Allergies / Exclusions */}
                <div className="single-field-wrap">
                  <div className="allergy-label-row">
                    <label className="field-label">
                      <span>Food Allergies & Intolerances</span>
                      <span className="field-hint">Multi-select ingredients to strictly exclude</span>
                    </label>
                    {selectedAllergies.length > 0 && (
                      <button
                        type="button"
                        className="btn-clear-allergies"
                        onClick={() => setSelectedAllergies([])}
                      >
                        Clear All ({selectedAllergies.length})
                      </button>
                    )}
                  </div>

                  <div className="allergy-pills-cluster">
                    {commonAllergies.map((allergy) => {
                      const isSelected = selectedAllergies.includes(allergy.id);
                      return (
                        <button
                          key={allergy.id}
                          type="button"
                          className={`allergy-toggle-chip ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleAllergy(allergy.id)}
                          title={allergy.desc}
                        >
                          <span className="allergy-icon">{allergy.icon}</span>
                          <span className="allergy-name">{allergy.label}</span>
                          {isSelected && (
                            <span className="allergy-check-mark">
                              <Check size={13} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAllergies.length > 0 ? (
                    <div className="allergy-notice-box">
                      <ShieldCheck size={16} className="text-emerald shrink-0" />
                      <span>
                        AI will strictly filter recipes containing: <strong>{selectedAllergies.map((a) => commonAllergies.find((c) => c.id === a)?.label).join(', ')}</strong>.
                      </span>
                    </div>
                  ) : (
                    <div className="allergy-notice-box neutral">
                      <Info size={16} className="text-muted shrink-0" />
                      <span>No allergies selected. All nutritious whole food ingredients will be eligible.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Row: Generate Button */}
            <div className="form-action-center-block">
              <button
                type="submit"
                className="btn-generate-ai-plan"
                disabled={isGenerating}
              >
                <Sparkles size={20} className={isGenerating ? 'spin-icon' : ''} />
                <span>{isGenerating ? 'Synthesizing Your AI Meal Plan...' : 'Generate My Personalized Meal Plan'}</span>
              </button>

              {isGenerating && (
                <div className="ai-generation-progress-box">
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${((generationStep + 1) / 4) * 100}%` }}
                    />
                  </div>
                  <p className="generation-step-text">
                    {[
                      'Calculating age-adjusted BMR & calorie baseline...',
                      'Filtering out allergens (e.g. Dairy, Nuts, Gluten)...',
                      'Optimizing suggested portion sizes & macro targets...',
                      'Finalizing your personalized daily & weekly schedule...'
                    ][generationStep]}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================
          GENERATED MEAL PLAN DASHBOARD
          ========================================================= */}
      {generatedPlan && (
        <section ref={resultsRef} className="planner-results-section">
          <div className="planner-results-container">
            {/* Plan Header Bar */}
            <div className="plan-results-overview-card">
              <div className="overview-header-top">
                <div className="overview-title-group">
                  <div className="overview-badge-tag">
                    <Sparkles size={14} className="text-emerald" />
                    <span>Personalized Result for Age {generatedPlan.meta.userProfile.age}</span>
                  </div>
                  <h2 className="overview-main-heading">{targets?.goalTitle}</h2>
                  <p className="overview-goal-summary">{targets?.goalSummary}</p>
                </div>

                <div className="overview-action-buttons">
                  <button
                    type="button"
                    className="btn-secondary-action"
                    onClick={() => setShowGroceryList(!showGroceryList)}
                  >
                    <ShoppingBag size={16} />
                    <span>{showGroceryList ? 'Hide Grocery List' : 'View Smart Grocery List'}</span>
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-action"
                    onClick={() => window.print()}
                    title="Print or save as PDF"
                  >
                    <Printer size={16} />
                    <span>Print Plan</span>
                  </button>
                  <button
                    type="button"
                    className="btn-primary-action-accent"
                    onClick={handleGenerate}
                  >
                    <RefreshCw size={15} />
                    <span>Regenerate Fresh Menu</span>
                  </button>
                </div>
              </div>

              {/* Targets Metrics Strip */}
              <div className="metrics-summary-strip">
                <div className="metric-box">
                  <div className="metric-icon-circle bg-amber-soft">
                    <Flame size={18} className="text-amber" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Target Energy</span>
                    <span className="metric-number">{targets?.targetCalories} <small>kcal/day</small></span>
                    <span className="metric-sub">TDEE: {targets?.tdee} kcal</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon-circle bg-blue-soft">
                    <Utensils size={18} className="text-blue" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Protein Target</span>
                    <span className="metric-number">{targets?.proteinGrams}g <small>({targets?.proteinRatio}%)</small></span>
                    <span className="metric-sub">Muscle repair & satiety</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon-circle bg-emerald-soft">
                    <Zap size={18} className="text-emerald" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Complex Carbs</span>
                    <span className="metric-number">{targets?.carbGrams}g <small>({targets?.carbRatio}%)</small></span>
                    <span className="metric-sub">Sustained glucose fuel</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon-circle bg-purple-soft">
                    <Heart size={18} className="text-purple" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Healthy Fats</span>
                    <span className="metric-number">{targets?.fatGrams}g <small>({targets?.fatRatio}%)</small></span>
                    <span className="metric-sub">Hormone & cell balance</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon-circle bg-cyan-soft">
                    <Droplets size={18} className="text-cyan" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Water Target</span>
                    <span className="metric-number">{targets?.waterLiters} <small>Liters/day</small></span>
                    <span className="metric-sub">Optimal cellular hydration</span>
                  </div>
                </div>
              </div>

              {/* Active Filters Pill Badges */}
              <div className="active-preferences-pills">
                <span className="active-pill">
                  <strong>Diet:</strong> {dietaryPreferences.find((d) => d.id === dietPreference)?.label}
                </span>
                <span className="active-pill">
                  <strong>Activity:</strong> {activityLevels.find((a) => a.id === activityLevel)?.label}
                </span>
                {selectedAllergies.length > 0 ? (
                  <span className="active-pill allergen-active">
                    <strong>Allergen Free:</strong> {selectedAllergies.map((a) => commonAllergies.find((c) => c.id === a)?.label).join(', ')}
                  </span>
                ) : (
                  <span className="active-pill">
                    <strong>Allergies:</strong> None
                  </span>
                )}
                <span className="active-pill">
                  <strong>Duration:</strong> {planDuration === 'daily' ? '1 Day Detailed Focus' : '7-Day Full Weekly Cycle'}
                </span>
              </div>
            </div>

            {/* Smart Grocery List Accordion Drawer (If Toggled) */}
            {showGroceryList && (
              <div className="smart-grocery-drawer">
                <div className="grocery-drawer-header">
                  <div className="drawer-title-group">
                    <ShoppingBag size={20} className="text-emerald" />
                    <div>
                      <h3 className="grocery-heading">
                        Aggregated Grocery Shopping List ({planDuration === 'daily' ? activeDay.day : 'Full 7-Day Week'})
                      </h3>
                      <p className="grocery-sub">
                        Click items to check off while shopping. All ingredients are cross-checked against your allergy exclusions.
                      </p>
                    </div>
                  </div>

                  <div className="drawer-actions">
                    <button
                      type="button"
                      className="btn-copy-list"
                      onClick={handleCopyGroceryList}
                    >
                      <Share2 size={15} />
                      <span>{copyFeedback ? 'Copied to Clipboard!' : 'Copy Shopping List'}</span>
                    </button>
                  </div>
                </div>

                <div className="grocery-categories-grid">
                  {Object.entries(groceryCategories).map(([catName, items]) => (
                    <div key={catName} className="grocery-category-column">
                      <h4 className="category-title">{catName}</h4>
                      <ul className="category-items-list">
                        {items.map((item) => {
                          const isChecked = !!checkedGroceryItems[item.name];
                          return (
                            <li
                              key={item.name}
                              className={`grocery-item-row ${isChecked ? 'checked' : ''}`}
                              onClick={() => toggleGroceryItem(item.name)}
                            >
                              <div className="grocery-checkbox">
                                {isChecked && <Check size={12} className="text-white" />}
                              </div>
                              <span className="grocery-item-name">{item.name}</span>
                              {item.count > 1 && (
                                <span className="grocery-item-count">×{item.count}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weekly Days Navigation Bar (If Weekly Plan is selected) */}
            {planDuration === 'weekly' && (
              <div className="weekly-days-nav-bar">
                <div className="days-tab-track">
                  {generatedPlan.days.map((dayObj, idx) => (
                    <button
                      key={dayObj.day}
                      type="button"
                      className={`day-selector-tab ${selectedDayIndex === idx ? 'active' : ''}`}
                      onClick={() => setSelectedDayIndex(idx)}
                    >
                      <span className="tab-day-name">{dayObj.day}</span>
                      <span className="tab-day-cals">{dayObj.dayTotals.calories} kcal</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Day Title & Tally Bar */}
            <div className="day-schedule-meta-bar">
              <div className="day-title-badge">
                <Calendar size={18} className="text-emerald" />
                <span className="day-heading-text">{activeDay.day}'s Curated Meal Schedule</span>
              </div>
              <div className="day-tallies-row">
                <span className="tally-pill">
                  <strong>Total:</strong> {activeDay.dayTotals.calories} kcal
                </span>
                <span className="tally-pill">
                  <strong>Protein:</strong> {activeDay.dayTotals.protein}g
                </span>
                <span className="tally-pill">
                  <strong>Carbs:</strong> {activeDay.dayTotals.carbs}g
                </span>
                <span className="tally-pill">
                  <strong>Fats:</strong> {activeDay.dayTotals.fat}g
                </span>
                <span className="tally-pill">
                  <strong>Fiber:</strong> {activeDay.dayTotals.fiber}g
                </span>
              </div>
            </div>

            {/* =========================================================
                MEAL CARDS LIST (BREAKFAST, LUNCH, SNACK, DINNER)
                GENEROUS SPACING & CLEAR PORTIONS
                ========================================================= */}
            <div className="meals-cards-flow">
              {['breakfast', 'lunch', 'snack', 'dinner'].map((mealKey) => {
                const meal = activeDay.meals[mealKey];
                if (!meal) return null;
                const isExpanded = expandedMealId === `${selectedDayIndex}-${mealKey}`;

                return (
                  <div key={mealKey} className="spacious-meal-card">
                    {/* Top Status Strip */}
                    <div className="meal-card-top-strip">
                      <div className="meal-time-badge">
                        <span className="meal-type-icon">
                          {mealKey === 'breakfast' && '🌅'}
                          {mealKey === 'lunch' && '☀️'}
                          {mealKey === 'snack' && '🥑'}
                          {mealKey === 'dinner' && '🌙'}
                        </span>
                        <span className="meal-time-text">{meal.timeLabel}</span>
                      </div>

                      <div className="meal-card-top-actions">
                        <div className="meal-cals-pill">
                          <Flame size={14} className="text-amber" />
                          <span>{meal.calories} kcal</span>
                        </div>
                        <button
                          type="button"
                          className="btn-swap-meal"
                          onClick={() => handleSwapMeal(selectedDayIndex, mealKey)}
                          title="Generate a different alternative recipe for this meal"
                        >
                          <RefreshCw size={13} />
                          <span>Swap Meal</span>
                        </button>
                      </div>
                    </div>

                    {/* Meal Content Dual Column */}
                    <div className="meal-card-body-grid">
                      {/* Left: Image with diet badge */}
                      <div className="meal-img-column">
                        <img
                          src={meal.image}
                          alt={meal.title}
                          className="meal-photo"
                          loading="lazy"
                        />
                        <span className={`meal-diet-tag ${meal.diet === 'vegan' ? 'vegan' : meal.diet === 'vegetarian' ? 'veg' : 'omni'}`}>
                          {meal.diet.toUpperCase()}
                        </span>
                      </div>

                      {/* Right: Meal Details */}
                      <div className="meal-details-column">
                        <div className="meal-header-row">
                          <h3 className="meal-title">{meal.title}</h3>
                          <span className="meal-prep-badge">
                            <Clock size={13} />
                            <span>{meal.prepTime}</span>
                          </span>
                        </div>

                        <p className="meal-description">{meal.desc}</p>

                        {/* SUGGESTED PORTION & SERVING ADVICE (HIGHLIGHTED BOX) */}
                        <div className="suggested-portion-box">
                          <div className="portion-icon-col">
                            <Scale size={18} className="text-emerald" />
                          </div>
                          <div className="portion-text-col">
                            <span className="portion-box-title">Suggested Portion & Serving Calibration:</span>
                            <p className="portion-recommendation">{meal.portion}</p>
                            {meal.portionGuide && (
                              <div className="portion-hand-rule">
                                <span className="hand-rule-label">Hand Rule Guide:</span>
                                <span className="hand-rule-text">{meal.portionGuide}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Nutrition Splits Chips */}
                        <div className="meal-macros-row">
                          <div className="macro-chip">
                            <span className="chip-label">Protein</span>
                            <span className="chip-val protein">{meal.protein}g</span>
                          </div>
                          <div className="macro-chip">
                            <span className="chip-label">Carbs</span>
                            <span className="chip-val carbs">{meal.carbs}g</span>
                          </div>
                          <div className="macro-chip">
                            <span className="chip-label">Fats</span>
                            <span className="chip-val fats">{meal.fat}g</span>
                          </div>
                          {meal.fiber !== undefined && (
                            <div className="macro-chip">
                              <span className="chip-label">Fiber</span>
                              <span className="chip-val fiber">{meal.fiber}g</span>
                            </div>
                          )}
                        </div>

                        {/* Ingredients Expandable Drawer */}
                        <div className="meal-expandable-section">
                          <button
                            type="button"
                            className="btn-toggle-ingredients-drawer"
                            onClick={() =>
                              setExpandedMealId(isExpanded ? null : `${selectedDayIndex}-${mealKey}`)
                            }
                          >
                            <span>Ingredients ({meal.ingredients?.length || 0})</span>
                            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>

                          {isExpanded && (
                            <div className="ingredients-drawer-content">
                              <div className="ingredients-pill-list">
                                {meal.ingredients?.map((ing, i) => (
                                  <span key={i} className="ingredient-chip">
                                    <Check size={11} className="text-emerald" />
                                    <span>{ing}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Nutritionist Portion Control Tips Card */}
            <div className="portion-education-card">
              <div className="education-icon-box">
                <Utensils size={24} className="text-emerald" />
              </div>
              <div className="education-content">
                <h3 className="education-title">AI Nutritionist Portion Control Quick Guide</h3>
                <p className="education-desc">
                  No kitchen food scale? You can measure healthy portion sizes anywhere using your hand:
                </p>
                <div className="hand-guide-grid">
                  <div className="hand-card">
                    <span className="hand-emoji">✋</span>
                    <span className="hand-target">Palm of Hand</span>
                    <span className="hand-food">= Lean Protein (120–160g chicken, fish, tofu)</span>
                  </div>
                  <div className="hand-card">
                    <span className="hand-emoji">👊</span>
                    <span className="hand-target">Closed Fist</span>
                    <span className="hand-food">= Vegetables & Leafy Greens (1–2 cups)</span>
                  </div>
                  <div className="hand-card">
                    <span className="hand-emoji">🤲</span>
                    <span className="hand-target">Cupped Hand</span>
                    <span className="hand-food">= Complex Carbohydrates (quinoa, oats, sweet potatoes)</span>
                  </div>
                  <div className="hand-card">
                    <span className="hand-emoji">👍</span>
                    <span className="hand-target">Thumb Size</span>
                    <span className="hand-food">= Healthy Fats (1 tbsp olive oil, nuts, seeds, avocado)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
