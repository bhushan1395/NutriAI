import React, { useState } from 'react';
import {
  Calculator,
  Flame,
  Utensils,
  Zap,
  Heart,
  Droplets,
  Scale,
  Sparkles,
  ArrowRight,
  Share2,
  Check,
  TrendingDown,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';

export default function NutritionToolsPage({ onSelectTab }) {
  // Input Units
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'

  // User Profile Basic Info
  const [gender, setGender] = useState('female');
  const [age, setAge] = useState('28');
  
  // Metric values
  const [weightKg, setWeightKg] = useState('65');
  const [heightCm, setHeightCm] = useState('168');

  // Imperial values
  const [weightLbs, setWeightLbs] = useState('143');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('6');

  // Activity & Goal
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('fat_loss');
  const [macroPreset, setMacroPreset] = useState('balanced'); // 'balanced', 'high_protein', 'low_carb', 'zone'

  const [copied, setCopied] = useState(false);

  // Sync unit conversions when toggling unit system
  const handleUnitSystemChange = (system) => {
    if (system === 'imperial' && unitSystem === 'metric') {
      const wKg = parseFloat(weightKg) || 65;
      const hCm = parseFloat(heightCm) || 168;
      setWeightLbs(Math.round(wKg * 2.20462).toString());
      const totalInches = hCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFt(ft.toString());
      setHeightIn(inches.toString());
    } else if (system === 'metric' && unitSystem === 'imperial') {
      const wLbs = parseFloat(weightLbs) || 143;
      const ft = parseFloat(heightFt) || 5;
      const inches = parseFloat(heightIn) || 6;
      setWeightKg(Math.round(wLbs / 2.20462).toString());
      const totalCm = Math.round((ft * 12 + inches) * 2.54);
      setHeightCm(totalCm.toString());
    }
    setUnitSystem(system);
  };

  // Standardized metric values for calculation
  const currentWeightKg = unitSystem === 'metric'
    ? parseFloat(weightKg) || 65
    : (parseFloat(weightLbs) || 143) / 2.20462;

  const currentHeightCm = unitSystem === 'metric'
    ? parseFloat(heightCm) || 168
    : (parseFloat(heightFt) || 5) * 30.48 + (parseFloat(heightIn) || 6) * 2.54;

  const currentAge = Math.max(14, Math.min(100, parseInt(age) || 28));

  // ==========================================
  // 1. BMI CALCULATION
  // ==========================================
  const heightMeters = currentHeightCm / 100;
  const bmiValue = heightMeters > 0 ? (currentWeightKg / (heightMeters * heightMeters)) : 22.0;
  const roundedBmi = parseFloat(bmiValue.toFixed(1));

  let bmiCategory = {
    label: 'Normal / Healthy Weight',
    badgeClass: 'bmi-normal',
    color: '#10b981',
    description: 'Your weight is in the optimal range for cardiovascular and metabolic vitality.'
  };

  if (roundedBmi < 18.5) {
    bmiCategory = {
      label: 'Underweight',
      badgeClass: 'bmi-under',
      color: '#3b82f6',
      description: 'Your BMI is below normal. Increasing nutrient-dense whole foods and protein is advised.'
    };
  } else if (roundedBmi >= 25 && roundedBmi < 30) {
    bmiCategory = {
      label: 'Overweight',
      badgeClass: 'bmi-over',
      color: '#f59e0b',
      description: 'Your BMI is slightly elevated. A gentle caloric deficit and regular activity will restore balance.'
    };
  } else if (roundedBmi >= 30) {
    bmiCategory = {
      label: 'Obese',
      badgeClass: 'bmi-obese',
      color: '#ef4444',
      description: 'Health risks increase at this range. Consult a healthcare dietitian for a tailored metabolic plan.'
    };
  }

  // Healthy weight range for height
  const minNormalWeightKg = Math.round(18.5 * heightMeters * heightMeters);
  const maxNormalWeightKg = Math.round(24.9 * heightMeters * heightMeters);

  // Meter percentage (from BMI 15 to 35)
  const meterProgress = Math.min(100, Math.max(0, ((roundedBmi - 15) / 20) * 100));

  // ==========================================
  // 2. BMR & TDEE CALCULATION (Mifflin-St Jeor)
  // ==========================================
  let bmr = 10 * currentWeightKg + 6.25 * currentHeightCm - 5 * currentAge;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  bmr = Math.round(bmr);

  const activityMultipliers = {
    sedentary: { mult: 1.2, label: 'Sedentary', desc: 'Desk job, little to no exercise' },
    light: { mult: 1.375, label: 'Lightly Active', desc: 'Light exercise or brisk walks 1–3 days/wk' },
    moderate: { mult: 1.55, label: 'Moderately Active', desc: 'Moderate workout 3–5 days/wk' },
    very: { mult: 1.725, label: 'Very Active', desc: 'Hard training 6–7 days/wk' },
    extra: { mult: 1.9, label: 'Athlete / Physical Job', desc: 'Intense training 2x/day or manual labor' }
  };

  const currentMultiplier = activityMultipliers[activityLevel]?.mult || 1.55;
  const tdee = Math.round(bmr * currentMultiplier);

  // Goal adjustment
  let goalMultiplier = 1.0;
  let goalBadge = 'Maintenance';
  let goalDiffKcal = 0;

  if (goal === 'fat_loss') {
    goalMultiplier = 0.80; // 20% deficit
    goalBadge = 'Caloric Deficit (-20%)';
    goalDiffKcal = Math.round(tdee * -0.20);
  } else if (goal === 'mild_loss') {
    goalMultiplier = 0.90; // 10% deficit
    goalBadge = 'Mild Deficit (-10%)';
    goalDiffKcal = Math.round(tdee * -0.10);
  } else if (goal === 'maintain') {
    goalMultiplier = 1.0;
    goalBadge = 'Baseline Maintenance (100%)';
    goalDiffKcal = 0;
  } else if (goal === 'lean_gain') {
    goalMultiplier = 1.10; // 10% surplus
    goalBadge = 'Lean Muscle Surplus (+10%)';
    goalDiffKcal = Math.round(tdee * 0.10);
  } else if (goal === 'bulking') {
    goalMultiplier = 1.15; // 15% surplus
    goalBadge = 'Hypertrophy Surplus (+15%)';
    goalDiffKcal = Math.round(tdee * 0.15);
  }

  const targetDailyCalories = Math.max(1250, Math.round(tdee * goalMultiplier));

  // ==========================================
  // 3. PROTEIN & MACROS (THE FOUR SMALL BOXES)
  // ==========================================
  const macroRatios = {
    balanced: { protein: 0.25, carbs: 0.45, fat: 0.30, title: 'Balanced Vitality' },
    high_protein: { protein: 0.35, carbs: 0.40, fat: 0.25, title: 'High-Protein Athletic' },
    low_carb: { protein: 0.30, carbs: 0.15, fat: 0.55, title: 'Low Carb / Ketogenic' },
    zone: { protein: 0.30, carbs: 0.40, fat: 0.30, title: 'Zone 40-30-30' }
  };

  const activeRatio = macroRatios[macroPreset] || macroRatios.balanced;

  const proteinCalories = Math.round(targetDailyCalories * activeRatio.protein);
  const proteinGrams = Math.round(proteinCalories / 4);
  const proteinPerKg = (proteinGrams / currentWeightKg).toFixed(1);

  const carbCalories = Math.round(targetDailyCalories * activeRatio.carbs);
  const carbGrams = Math.round(carbCalories / 4);

  const fatCalories = Math.round(targetDailyCalories * activeRatio.fat);
  const fatGrams = Math.round(fatCalories / 9);

  // Water & Fiber estimations
  const waterLiters = (currentWeightKg * 0.035).toFixed(1);
  const waterGlasses = Math.round((currentWeightKg * 0.035) / 0.25);
  const fiberGrams = Math.round((targetDailyCalories / 1000) * 14);

  // Copy results summary
  const handleCopySummary = () => {
    const text = `📊 NutriSmart AI Nutrition Assessment
• Age: ${currentAge} | Sex: ${gender} | Weight: ${Math.round(currentWeightKg)}kg | Height: ${Math.round(currentHeightCm)}cm
• BMI: ${roundedBmi} (${bmiCategory.label})
• BMR: ${bmr} kcal | TDEE: ${tdee} kcal
• Goal Target Calories: ${targetDailyCalories} kcal/day (${goalBadge})
• Protein Target: ${proteinGrams}g (${Math.round(activeRatio.protein * 100)}% • ${proteinPerKg}g/kg)
• Carbs Target: ${carbGrams}g (${Math.round(activeRatio.carbs * 100)}%)
• Fats Target: ${fatGrams}g (${Math.round(activeRatio.fat * 100)}%)
• Daily Hydration: ${waterLiters}L (~${waterGlasses} glasses)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="nutrition-tools-page">
      {/* =========================================================
          HERO BANNER
          ========================================================= */}
      <section className="tools-hero-banner">
        <div className="tools-hero-container">
          <div className="tools-pill-badge">
            <Calculator size={15} className="text-emerald" />
            <span>Clinical Nutrition & Metabolic Suite</span>
          </div>

          <h1 className="tools-main-heading">
            Smart <span className="gradient-text">Nutrition Tools</span> & Calculators
          </h1>

          <p className="tools-sub-text">
            Calculate your exact Body Mass Index (BMI), Basal Metabolic Rate (BMR), 
            Total Daily Energy Expenditure (TDEE), and personalized daily macronutrient targets.
          </p>

          <div className="tools-hero-features-row">
            <div className="tools-feature-pill">
              <Scale size={16} className="text-emerald" />
              <span>BMI Body Composition Analysis</span>
            </div>
            <div className="tools-feature-pill">
              <Flame size={16} className="text-amber" />
              <span>Mifflin-St Jeor TDEE Precision</span>
            </div>
            <div className="tools-feature-pill">
              <Layers size={16} className="text-blue" />
              <span>4-Box Macro Calibration</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONFIGURATOR INPUT FORM (MANUAL TYPING - NO ARROWS)
          ========================================================= */}
      <section className="tools-configurator-section">
        <div className="tools-configurator-container">
          <div className="tools-form-panel">
            <div className="panel-header-flex">
              <div>
                <h2 className="panel-title">Enter Your Personal Body Details</h2>
                <p className="panel-desc">
                  Input your age, gender, height, weight, and activity level to compute your exact metabolic blueprint.
                </p>
              </div>

              {/* Unit Switcher: Metric vs Imperial */}
              <div className="unit-toggle-cluster">
                <button
                  type="button"
                  className={`unit-btn ${unitSystem === 'metric' ? 'active' : ''}`}
                  onClick={() => handleUnitSystemChange('metric')}
                >
                  Metric (kg / cm)
                </button>
                <button
                  type="button"
                  className={`unit-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
                  onClick={() => handleUnitSystemChange('imperial')}
                >
                  Imperial (lbs / ft)
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="tools-inputs-grid">
              {/* Gender Selection */}
              <div className="tool-input-card">
                <label className="tool-label">Biological Sex:</label>
                <div className="sex-toggle-group">
                  <button
                    type="button"
                    className={`sex-btn ${gender === 'female' ? 'active' : ''}`}
                    onClick={() => setGender('female')}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    className={`sex-btn ${gender === 'male' ? 'active' : ''}`}
                    onClick={() => setGender('male')}
                  >
                    Male
                  </button>
                </div>
                <span className="input-note">Affects BMR hormone equation</span>
              </div>

              {/* Age Manual Input */}
              <div className="tool-input-card">
                <label className="tool-label" htmlFor="calc-age">Age (years):</label>
                <div className="manual-typing-wrapper">
                  <input
                    id="calc-age"
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
                    className="styled-typing-input"
                  />
                  <span className="unit-tag">yrs</span>
                </div>
                <span className="input-note">Range 14 to 99</span>
              </div>

              {/* Weight Manual Input */}
              <div className="tool-input-card">
                <label className="tool-label" htmlFor="calc-weight">
                  Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'}):
                </label>
                <div className="manual-typing-wrapper">
                  {unitSystem === 'metric' ? (
                    <input
                      id="calc-weight"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="65"
                      value={weightKg}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 3) setWeightKg(val);
                      }}
                      onBlur={() => {
                        if (!weightKg || Number(weightKg) < 30) setWeightKg('30');
                        else if (Number(weightKg) > 250) setWeightKg('250');
                      }}
                      className="styled-typing-input"
                    />
                  ) : (
                    <input
                      id="calc-weight"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="143"
                      value={weightLbs}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 3) setWeightLbs(val);
                      }}
                      onBlur={() => {
                        if (!weightLbs || Number(weightLbs) < 66) setWeightLbs('66');
                        else if (Number(weightLbs) > 550) setWeightLbs('550');
                      }}
                      className="styled-typing-input"
                    />
                  )}
                  <span className="unit-tag">{unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
                <span className="input-note">Type manually without arrows</span>
              </div>

              {/* Height Manual Input */}
              <div className="tool-input-card">
                <label className="tool-label">
                  Height ({unitSystem === 'metric' ? 'cm' : 'ft & in'}):
                </label>
                {unitSystem === 'metric' ? (
                  <div className="manual-typing-wrapper">
                    <input
                      id="calc-height-cm"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="168"
                      value={heightCm}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 3) setHeightCm(val);
                      }}
                      onBlur={() => {
                        if (!heightCm || Number(heightCm) < 100) setHeightCm('100');
                        else if (Number(heightCm) > 240) setHeightCm('240');
                      }}
                      className="styled-typing-input"
                    />
                    <span className="unit-tag">cm</span>
                  </div>
                ) : (
                  <div className="imperial-height-row">
                    <div className="manual-typing-wrapper">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="5"
                        value={heightFt}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 1) setHeightFt(val);
                        }}
                        className="styled-typing-input"
                      />
                      <span className="unit-tag">ft</span>
                    </div>
                    <div className="manual-typing-wrapper">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="6"
                        value={heightIn}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 2) setHeightIn(val);
                        }}
                        className="styled-typing-input"
                      />
                      <span className="unit-tag">in</span>
                    </div>
                  </div>
                )}
                <span className="input-note">Standard stature measurement</span>
              </div>
            </div>

            {/* Activity Level Selector */}
            <div className="tool-select-row">
              <label className="tool-label">Daily Physical Activity Level:</label>
              <div className="activity-tabs-cluster">
                {Object.entries(activityMultipliers).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={`act-tab-pill ${activityLevel === key ? 'active' : ''}`}
                    onClick={() => setActivityLevel(key)}
                  >
                    <span className="act-tab-title">{item.label}</span>
                    <span className="act-tab-sub">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Goal & Macro Preset Selection */}
            <div className="goal-preset-dual-row">
              {/* Primary Goal */}
              <div className="goal-choice-block">
                <label className="tool-label">Primary Body / Health Goal:</label>
                <div className="goal-pills-row">
                  {[
                    { id: 'fat_loss', label: 'Fat Loss (-20%)', icon: '🔥' },
                    { id: 'mild_loss', label: 'Mild Deficit (-10%)', icon: '📉' },
                    { id: 'maintain', label: 'Maintain Baseline', icon: '⚖️' },
                    { id: 'lean_gain', label: 'Lean Muscle (+10%)', icon: '💪' },
                    { id: 'bulking', label: 'Hypertrophy (+15%)', icon: '⚡' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className={`goal-toggle-pill ${goal === g.id ? 'active' : ''}`}
                      onClick={() => setGoal(g.id)}
                    >
                      <span className="goal-pill-emoji">{g.icon}</span>
                      <span>{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Macro Preset */}
              <div className="macro-preset-block">
                <label className="tool-label">Macronutrient Distribution Preset:</label>
                <div className="preset-tabs-row">
                  {[
                    { id: 'balanced', label: 'Balanced (45C / 25P / 30F)' },
                    { id: 'high_protein', label: 'High Protein (40C / 35P / 25F)' },
                    { id: 'low_carb', label: 'Low Carb / Keto (15C / 30P / 55F)' },
                    { id: 'zone', label: 'Zone Diet (40C / 30P / 30F)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`preset-tab-btn ${macroPreset === p.id ? 'active' : ''}`}
                      onClick={() => setMacroPreset(p.id)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESULTS SECTION: BMI + 4 MACRO BOXES + METABOLIC BREAKDOWN
          ========================================================= */}
      <section className="tools-results-section">
        <div className="tools-results-container">
          
          {/* Top Bar with Profile Summary & Actions */}
          <div className="results-top-action-bar">
            <div>
              <span className="results-section-tag">Instant Diagnostic Output</span>
              <h2 className="results-main-title">Your Personalized Metabolic & Macro Blueprint</h2>
            </div>
            <div className="results-actions-right">
              <button
                type="button"
                className="btn-action-tool"
                onClick={handleCopySummary}
              >
                <Share2 size={15} />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
              </button>
              {onSelectTab && (
                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={() => onSelectTab('planner')}
                >
                  <Sparkles size={15} />
                  <span>Build Meal Plan With These Targets</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>

          {/* =========================================================
              PART 1: BODY MASS INDEX (BMI) CARD
              ========================================================= */}
          <div className="bmi-diagnostic-card">
            <div className="bmi-card-header">
              <div className="bmi-badge-wrap">
                <Scale size={20} className="text-emerald" />
                <span className="bmi-badge-title">Body Mass Index (BMI) Diagnostic</span>
              </div>
              <span className={`bmi-status-pill ${bmiCategory.badgeClass}`}>
                {bmiCategory.label}
              </span>
            </div>

            <div className="bmi-content-layout">
              {/* Left Score Display */}
              <div className="bmi-score-display">
                <span className="bmi-number">{roundedBmi}</span>
                <span className="bmi-unit">kg/m²</span>
              </div>

              {/* Right Gauge & Explanation */}
              <div className="bmi-details-col">
                <p className="bmi-explanation-text">
                  {bmiCategory.description} For your height of <strong>{Math.round(currentHeightCm)} cm</strong>, 
                  the clinically recommended healthy weight bracket is <strong>{minNormalWeightKg} kg – {maxNormalWeightKg} kg</strong>.
                </p>

                {/* Visual Spectrum Bar */}
                <div className="bmi-gauge-track">
                  <div className="gauge-zones">
                    <span className="zone zone-under" title="Underweight (< 18.5)">Underweight (&lt;18.5)</span>
                    <span className="zone zone-normal" title="Normal (18.5 - 24.9)">Normal (18.5 - 24.9)</span>
                    <span className="zone zone-over" title="Overweight (25 - 29.9)">Overweight (25 - 29.9)</span>
                    <span className="zone zone-obese" title="Obese (30+)">Obese (30+)</span>
                  </div>
                  {/* Gauge Pointer Needle */}
                  <div
                    className="bmi-pointer-needle"
                    style={{ left: `${meterProgress}%` }}
                  >
                    <div className="needle-dot" style={{ backgroundColor: bmiCategory.color }} />
                    <span className="needle-value">{roundedBmi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              PART 2: THE 4 SMALL BOXES TYPES (PROTEIN & MACROS)
              Exactly as requested: 4 small boxes showing different things
              ========================================================= */}
          <div className="macro-four-boxes-container">
            <div className="boxes-header-block">
              <h3 className="boxes-title">Estimated Energy & Macronutrient Requirements</h3>
              <p className="boxes-sub">
                Four calibrated targets calculated to power your daily energy expenditure and achieve your {goalBadge.toLowerCase()}.
              </p>
            </div>

            <div className="four-boxes-grid">
              {/* BOX 1: Target Daily Calories */}
              <div className="macro-box box-calories">
                <div className="box-top-strip">
                  <div className="box-icon-wrap bg-amber-soft">
                    <Flame size={20} className="text-amber" />
                  </div>
                  <span className="box-tag">Energy Budget</span>
                </div>

                <div className="box-main-value">
                  <span className="value-digits">{targetDailyCalories.toLocaleString()}</span>
                  <span className="value-unit">kcal / day</span>
                </div>

                <div className="box-role-badge">
                  {goalDiffKcal < 0 ? (
                    <span className="diff-pill deficit">
                      <TrendingDown size={12} /> {goalDiffKcal} kcal deficit
                    </span>
                  ) : goalDiffKcal > 0 ? (
                    <span className="diff-pill surplus">
                      <TrendingUp size={12} /> +{goalDiffKcal} kcal surplus
                    </span>
                  ) : (
                    <span className="diff-pill maintain">
                      <Activity size={12} /> Balanced equilibrium
                    </span>
                  )}
                </div>

                <p className="box-explanation">
                  Basal Metabolism (BMR): <strong>{bmr} kcal</strong> • Maintenance (TDEE): <strong>{tdee} kcal</strong>.
                </p>
              </div>

              {/* BOX 2: Daily Protein Target */}
              <div className="macro-box box-protein">
                <div className="box-top-strip">
                  <div className="box-icon-wrap bg-blue-soft">
                    <Utensils size={20} className="text-blue" />
                  </div>
                  <span className="box-tag">Protein Fuel</span>
                </div>

                <div className="box-main-value">
                  <span className="value-digits">{proteinGrams}</span>
                  <span className="value-unit">grams ({Math.round(activeRatio.protein * 100)}%)</span>
                </div>

                <div className="box-role-badge">
                  <span className="sub-pill blue-pill">
                    {proteinPerKg}g per kg body weight
                  </span>
                </div>

                <p className="box-explanation">
                  Supplies <strong>{proteinCalories} kcal</strong> for lean muscle preservation, cellular regeneration, and high meal satiety.
                </p>
              </div>

              {/* BOX 3: Complex Carbohydrates Target */}
              <div className="macro-box box-carbs">
                <div className="box-top-strip">
                  <div className="box-icon-wrap bg-emerald-soft">
                    <Zap size={20} className="text-emerald" />
                  </div>
                  <span className="box-tag">Complex Carbs</span>
                </div>

                <div className="box-main-value">
                  <span className="value-digits">{carbGrams}</span>
                  <span className="value-unit">grams ({Math.round(activeRatio.carbs * 100)}%)</span>
                </div>

                <div className="box-role-badge">
                  <span className="sub-pill emerald-pill">
                    {carbCalories} kcal total energy
                  </span>
                </div>

                <p className="box-explanation">
                  Slow-burning starches from oats, quinoa, and vegetables to power cognitive focus and glycogen reserves.
                </p>
              </div>

              {/* BOX 4: Healthy Dietary Fats Target */}
              <div className="macro-box box-fats">
                <div className="box-top-strip">
                  <div className="box-icon-wrap bg-purple-soft">
                    <Heart size={20} className="text-purple" />
                  </div>
                  <span className="box-tag">Healthy Fats</span>
                </div>

                <div className="box-main-value">
                  <span className="value-digits">{fatGrams}</span>
                  <span className="value-unit">grams ({Math.round(activeRatio.fat * 100)}%)</span>
                </div>

                <div className="box-role-badge">
                  <span className="sub-pill purple-pill">
                    {fatCalories} kcal lipid density
                  </span>
                </div>

                <p className="box-explanation">
                  Essential fatty acids from extra virgin olive oil, nuts, and avocado for endocrine balance and nutrient absorption.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================
              PART 3: MACRO RATIO VISUAL PROGRESS BAR & HYDRATION
              ========================================================= */}
          <div className="tools-additional-grid">
            {/* Visual Macro Split Breakdown Bar */}
            <div className="sub-panel-card">
              <h4 className="sub-card-title">Macronutrient Energy Distribution</h4>
              <p className="sub-card-desc">Visual breakdown of your daily caloric budget across macro classes:</p>
              
              <div className="segmented-macro-bar">
                <div
                  className="macro-segment seg-protein"
                  style={{ width: `${Math.round(activeRatio.protein * 100)}%` }}
                  title={`Protein: ${Math.round(activeRatio.protein * 100)}%`}
                >
                  <span>{Math.round(activeRatio.protein * 100)}% Protein</span>
                </div>
                <div
                  className="macro-segment seg-carbs"
                  style={{ width: `${Math.round(activeRatio.carbs * 100)}%` }}
                  title={`Carbs: ${Math.round(activeRatio.carbs * 100)}%`}
                >
                  <span>{Math.round(activeRatio.carbs * 100)}% Carbs</span>
                </div>
                <div
                  className="macro-segment seg-fats"
                  style={{ width: `${Math.round(activeRatio.fat * 100)}%` }}
                  title={`Fats: ${Math.round(activeRatio.fat * 100)}%`}
                >
                  <span>{Math.round(activeRatio.fat * 100)}% Fats</span>
                </div>
              </div>

              <div className="macro-legend-row">
                <div className="legend-item">
                  <span className="legend-dot dot-protein" />
                  <span>Protein ({proteinGrams}g • {proteinCalories} kcal)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot dot-carbs" />
                  <span>Carbs ({carbGrams}g • {carbCalories} kcal)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot dot-fats" />
                  <span>Fats ({fatGrams}g • {fatCalories} kcal)</span>
                </div>
              </div>
            </div>

            {/* Hydration & Fiber Box */}
            <div className="sub-panel-card">
              <h4 className="sub-card-title">Daily Hydration & Fiber Standards</h4>
              <div className="micro-metrics-row">
                <div className="micro-metric-item">
                  <div className="micro-icon bg-cyan-soft">
                    <Droplets size={20} className="text-cyan" />
                  </div>
                  <div>
                    <span className="micro-label">Daily Water Intake</span>
                    <span className="micro-val">{waterLiters} Liters</span>
                    <span className="micro-sub">~{waterGlasses} glasses (250ml each)</span>
                  </div>
                </div>

                <div className="micro-metric-item">
                  <div className="micro-icon bg-emerald-soft">
                    <Zap size={20} className="text-emerald" />
                  </div>
                  <div>
                    <span className="micro-label">Dietary Prebiotic Fiber</span>
                    <span className="micro-val">{fiberGrams}g / day</span>
                    <span className="micro-sub">14g per 1,000 calories consumed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              PART 4: MEAL-BY-MEAL SUGGESTED MACRO SPLIT
              ========================================================= */}
          <div className="meal-split-education-card">
            <h3 className="meal-split-title">Recommended Daily Meal Breakdown</h3>
            <p className="meal-split-desc">
              How to distribute your <strong>{targetDailyCalories} calories</strong> and <strong>{proteinGrams}g protein</strong> across typical daily meals:
            </p>

            <div className="meal-split-table-grid">
              <div className="meal-split-column">
                <div className="split-col-header">
                  <span className="split-emoji">🌅</span>
                  <span className="split-name">Breakfast (25%)</span>
                </div>
                <div className="split-col-body">
                  <span className="split-cals">{Math.round(targetDailyCalories * 0.25)} kcal</span>
                  <span className="split-metric">🍗 ~{Math.round(proteinGrams * 0.25)}g Protein</span>
                  <span className="split-metric">🍠 ~{Math.round(carbGrams * 0.25)}g Carbs</span>
                  <span className="split-metric">🥑 ~{Math.round(fatGrams * 0.25)}g Fat</span>
                </div>
              </div>

              <div className="meal-split-column">
                <div className="split-col-header">
                  <span className="split-emoji">☀️</span>
                  <span className="split-name">Lunch (35%)</span>
                </div>
                <div className="split-col-body">
                  <span className="split-cals">{Math.round(targetDailyCalories * 0.35)} kcal</span>
                  <span className="split-metric">🍗 ~{Math.round(proteinGrams * 0.35)}g Protein</span>
                  <span className="split-metric">🍠 ~{Math.round(carbGrams * 0.35)}g Carbs</span>
                  <span className="split-metric">🥑 ~{Math.round(fatGrams * 0.35)}g Fat</span>
                </div>
              </div>

              <div className="meal-split-column">
                <div className="split-col-header">
                  <span className="split-emoji">🥑</span>
                  <span className="split-name">Snack (10%)</span>
                </div>
                <div className="split-col-body">
                  <span className="split-cals">{Math.round(targetDailyCalories * 0.10)} kcal</span>
                  <span className="split-metric">🍗 ~{Math.round(proteinGrams * 0.10)}g Protein</span>
                  <span className="split-metric">🍠 ~{Math.round(carbGrams * 0.10)}g Carbs</span>
                  <span className="split-metric">🥑 ~{Math.round(fatGrams * 0.10)}g Fat</span>
                </div>
              </div>

              <div className="meal-split-column">
                <div className="split-col-header">
                  <span className="split-emoji">🌙</span>
                  <span className="split-name">Dinner (30%)</span>
                </div>
                <div className="split-col-body">
                  <span className="split-cals">{Math.round(targetDailyCalories * 0.30)} kcal</span>
                  <span className="split-metric">🍗 ~{Math.round(proteinGrams * 0.30)}g Protein</span>
                  <span className="split-metric">🍠 ~{Math.round(carbGrams * 0.30)}g Carbs</span>
                  <span className="split-metric">🥑 ~{Math.round(fatGrams * 0.30)}g Fat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
