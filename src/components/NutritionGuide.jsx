import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  FileText, 
  Clock, 
  Sparkles,
  Zap,
  Shield,
  Search,
  CheckCircle2,
  Heart,
  ChevronDown,
  ChevronUp,
  Activity,
  Award,
  BookOpen,
  Leaf
} from 'lucide-react';
import { nutritionTopics, nutritionCategories } from '../data/nutritionTopicsData';

export default function NutritionGuide() {
  // Search & Category Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  // Plate interactive tab (highlights portion breakdown)
  const [activePlateSection, setActivePlateSection] = useState('veggies');

  // Interactive Label Inspector
  const [activeLabelPin, setActiveLabelPin] = useState(1);

  // Filter topics based on search and category
  const filteredTopics = useMemo(() => {
    return nutritionTopics.filter((topic) => {
      const matchesCategory = selectedCategory === 'All Topics' || topic.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.whyItMatters.toLowerCase().includes(q) ||
        topic.category.toLowerCase().includes(q) ||
        topic.topSources.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleTopicExpand = (id) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  };

  const plateData = {
    veggies: {
      name: "50% Colorful Veggies & Fruits",
      share: "1/2 Plate",
      icon: "🥗",
      color: "#10b981",
      role: "Vitamins, minerals, water, and prebiotic fiber that stabilize insulin.",
      examples: ["Baby spinach", "Broccoli", "Bell peppers", "Carrots", "Berries"]
    },
    protein: {
      name: "25% Lean Protein",
      share: "1/4 Plate",
      icon: "🍗",
      color: "#3b82f6",
      role: "Amino acids for muscle repair, cellular regeneration, and long satiety.",
      examples: ["Wild salmon", "Chicken breast", "Eggs", "Greek yogurt", "Tofu / Lentils"]
    },
    carbs: {
      name: "25% Complex Carbs",
      share: "1/4 Plate",
      icon: "🍠",
      color: "#f59e0b",
      role: "Slow-burning complex starches that power brain and physical activity.",
      examples: ["Rolled oats", "Quinoa", "Sweet potatoes", "Brown rice", "Chickpeas"]
    },
    fats: {
      name: "Healthy Fats (Thumb Rule)",
      share: "1-2 Tbsp",
      icon: "🥑",
      color: "#8b5cf6",
      role: "Supports cell membranes, brain structure, and fat-soluble vitamin uptake.",
      examples: ["Extra virgin olive oil", "Avocado", "Walnuts", "Chia / Flax seeds"]
    }
  };

  const labelPins = [
    {
      id: 1,
      title: "Serving Size",
      rule: "Check This First",
      text: "All numbers on the label apply to 1 serving only. If the package contains 2.5 servings and you eat all of it, multiply all numbers by 2.5!",
      status: "neutral",
      badge: "Crucial Base"
    },
    {
      id: 2,
      title: "Calories per Serving",
      rule: "Energy Budget",
      text: "Shows exact energy density. 40 kcal is low, 100 kcal is moderate, and 400+ kcal is high for a single serving size.",
      status: "neutral",
      badge: "Quick Gauge"
    },
    {
      id: 3,
      title: "Added Sugars",
      rule: "Aim for < 5g",
      text: "Different from natural sugars in fruit. High added sugar creates sharp insulin spikes followed by mid-day brain fog.",
      status: "warning",
      badge: "Watch Out"
    },
    {
      id: 4,
      title: "The 5 / 20 %DV Rule",
      rule: "Quick Cheat-Code",
      text: "5% Daily Value or less = LOW (ideal for Sodium & Saturated Fat). 20% or more = HIGH (aim for this in Fiber, Calcium & Iron).",
      status: "success",
      badge: "Golden Rule"
    }
  ];

  return (
    <div className="nutrition-guide-page">
      {/* Top Header */}
      <section className="guide-hero-banner">
        <div className="guide-hero-container">
          <h1 className="guide-main-heading">
            Nutrition Guide & <span className="gradient-text">Balanced Diet Hub</span>
          </h1>

          <p className="guide-sub-text">
            Discover the foundational principles of a balanced diet, search essential nutrition topics, 
            and explore actionable visual cheat-sheets designed for lifelong metabolic vitality.
          </p>
        </div>
      </section>

      <div className="guide-content-container">
        {/* =========================================================
            SECTION 1: Importance of a Balanced Diet (Core Showcase)
            ========================================================= */}
        <section className="balanced-diet-importance-section">
          <div className="section-header-block text-center">
            <div className="section-pill-tag">
              <Heart size={14} className="text-emerald" />
              <span>Core Health Philosophy</span>
            </div>
            <h2 className="section-main-heading">
              Why a Balanced Diet <span className="gradient-text">Matters</span>
            </h2>
            <p className="section-sub-heading">
              A balanced diet isn't about rigid restrictions or crash deprivation. It is the intelligent 
              synergy of nutrients working in harmony to fuel your cells, protect your organs, and sustain everyday energy.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="importance-pillars-grid">
            <div className="importance-pillar-card">
              <div className="pillar-icon-box bg-emerald-light">
                <Zap size={22} className="text-emerald" />
              </div>
              <h3 className="pillar-title">Consistent All-Day Energy</h3>
              <p className="pillar-desc">
                By pairing complex carbohydrates with protein and healthy fats, you avoid steep blood sugar spikes 
                and debilitating afternoon crashes, maintaining peak cognitive focus.
              </p>
            </div>

            <div className="importance-pillar-card">
              <div className="pillar-icon-box bg-blue-light">
                <Shield size={22} className="text-blue" />
              </div>
              <h3 className="pillar-title">Immune Defense & Healing</h3>
              <p className="pillar-desc">
                Rich micronutrients (Zinc, Vitamin C, Vitamin D) and complete proteins supply the raw building blocks 
                your immune cells require to neutralize pathogens and accelerate tissue recovery.
              </p>
            </div>

            <div className="importance-pillar-card">
              <div className="pillar-icon-box bg-amber-light">
                <Leaf size={22} className="text-amber" />
              </div>
              <h3 className="pillar-title">Gut Microbiome & Serotonin</h3>
              <p className="pillar-desc">
                Over 90% of your body's serotonin (the joy and calmness neurotransmitter) is produced in your gut. 
                Diverse plant fibers feed beneficial bacteria that govern digestion and mood.
              </p>
            </div>

            <div className="importance-pillar-card">
              <div className="pillar-icon-box bg-purple-light">
                <Activity size={22} className="text-purple" />
              </div>
              <h3 className="pillar-title">Metabolic Longevity</h3>
              <p className="pillar-desc">
                A nutrient-dense diet reduces chronic vascular inflammation, regulates blood lipid panels, and keeps 
                blood pressure healthy, drastically lowering the risk of metabolic ailments.
              </p>
            </div>
          </div>

          {/* The 80/20 Rule Banner */}
          <div className="eighty-twenty-rule-banner">
            <div className="rule-badge-column">
              <span className="rule-large-num">80 / 20</span>
              <span className="rule-badge-label">The Golden Rule</span>
            </div>
            <div className="rule-content-column">
              <h4 className="rule-heading">The Sustainable 80/20 Balanced Nutrition Principle</h4>
              <p className="rule-text">
                Dedicate <strong>80% of your daily nutrition</strong> to wholesome, unprocessed, nutrient-dense foods 
                (colorful vegetables, lean proteins, intact whole grains, and healthy plant fats). Reserve the remaining 
                <strong>20% for culinary freedom</strong>, social meals with friends, and favorite treats without guilt. 
                Consistency beats short-term perfection every single time.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: Search Bar & Nutrition Topic Cards
            ========================================================= */}
        <section className="nutrition-topics-explorer-section">
          <div className="section-header-block text-center">
            <div className="section-pill-tag">
              <BookOpen size={14} className="text-emerald" />
              <span>Interactive Knowledge Base</span>
            </div>
            <h2 className="section-main-heading">
              Explore Nutrition <span className="gradient-text">Topics & Cards</span>
            </h2>
            <p className="section-sub-heading">
              Search by nutrient, food type, or wellness goal to uncover evidence-based facts, action tips, and food sources.
            </p>
          </div>

          {/* Interactive Search Controls */}
          <div className="topic-search-controls-box">
            <div className="topic-search-input-wrapper">
              <Search size={19} className="search-icon-inside" />
              <input
                type="text"
                className="topic-search-input"
                placeholder="Search nutrition topics (e.g., Protein, Fiber, Balanced Diet, Healthy Fats, Gut Health, Hydration)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="topic-category-pills">
              {nutritionCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-pill-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="topic-results-counter">
              Showing <strong>{filteredTopics.length}</strong> {filteredTopics.length === 1 ? 'topic' : 'topics'}
              {searchQuery && <span> matching "<em>{searchQuery}</em>"</span>}
            </div>
          </div>

          {/* Topic Cards Grid */}
          {filteredTopics.length > 0 ? (
            <div className="nutrition-topics-grid">
              {filteredTopics.map((topic) => {
                const isExpanded = expandedTopicId === topic.id;
                return (
                  <div key={topic.id} className="nutrition-topic-card">
                    {/* Card Top Header */}
                    <div className="topic-card-header">
                      <span className="topic-card-icon">{topic.icon}</span>
                      <span className="topic-category-tag">{topic.category}</span>
                    </div>

                    {/* Topic Title */}
                    <h3 className="topic-card-title">{topic.title}</h3>

                    {/* Topic Summary */}
                    <p className="topic-card-summary">{topic.summary}</p>

                    {/* Why It Matters Callout */}
                    <div className="topic-why-box">
                      <strong>Why It Matters:</strong> {topic.whyItMatters}
                    </div>

                    {/* Smart Rule Action Pill */}
                    <div className="topic-smart-rule">
                      <span className="smart-rule-badge">💡 Smart Rule</span>
                      <p className="smart-rule-text">{topic.smartRule}</p>
                    </div>

                    {/* Top Food Sources */}
                    <div className="topic-sources-box">
                      <span className="sources-label">Best Whole-Food Sources:</span>
                      <div className="sources-pills-row">
                        {topic.topSources.map((source) => (
                          <span key={source} className="source-pill">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Key Takeaways */}
                    <div className="topic-expand-wrapper">
                      <button
                        type="button"
                        className="topic-expand-btn"
                        onClick={() => toggleTopicExpand(topic.id)}
                      >
                        <span>{isExpanded ? 'Hide Key Takeaways' : 'View Key Takeaways'}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isExpanded && (
                        <div className="topic-expanded-content">
                          <ul className="takeaways-list">
                            {topic.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="takeaway-item">
                                <CheckCircle2 size={15} className="text-emerald takeaway-icon" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-topic-results">
              <p className="empty-topic-title">No nutrition topics found matching "{searchQuery}"</p>
              <p className="empty-topic-sub">Try searching for keywords like "Protein", "Fiber", "Fats", or "Plate".</p>
              <button
                type="button"
                className="btn-reset-search"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Topics');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* =========================================================
            SECTION 3: The Smart Plate Method (Interactive Diagram)
            ========================================================= */}
        <section className="chart-block-card">
          <div className="chart-card-header">
            <div className="chart-icon-wrap bg-emerald-subtle">
              <PieChart size={22} className="text-emerald" />
            </div>
            <div>
              <h2 className="chart-title">The Smart Plate Diagram (Portion Sizes)</h2>
              <p className="chart-subtitle">Click each plate segment to inspect its optimal balance & food choices.</p>
            </div>
          </div>

          <div className="plate-interactive-layout">
            {/* Visual SVG / Circular Plate Diagram */}
            <div className="plate-graphic-box">
              <div className="plate-outer-rim">
                <div className="plate-inner-dish">
                  {/* Veggies 50% (Left Half) */}
                  <button 
                    type="button" 
                    className={`plate-slice slice-veggies ${activePlateSection === 'veggies' ? 'active' : ''}`}
                    onClick={() => setActivePlateSection('veggies')}
                  >
                    <span className="slice-emoji">🥗</span>
                    <span className="slice-label">50% Veggies & Fruit</span>
                  </button>

                  {/* Top-Right: 25% Protein */}
                  <button 
                    type="button" 
                    className={`plate-slice slice-protein ${activePlateSection === 'protein' ? 'active' : ''}`}
                    onClick={() => setActivePlateSection('protein')}
                  >
                    <span className="slice-emoji">🍗</span>
                    <span className="slice-label">25% Protein</span>
                  </button>

                  {/* Bottom-Right: 25% Carbs */}
                  <button 
                    type="button" 
                    className={`plate-slice slice-carbs ${activePlateSection === 'carbs' ? 'active' : ''}`}
                    onClick={() => setActivePlateSection('carbs')}
                  >
                    <span className="slice-emoji">🍠</span>
                    <span className="slice-label">25% Carbs</span>
                  </button>

                  {/* Center Dot for Fats */}
                  <button 
                    type="button" 
                    className={`plate-center-dot ${activePlateSection === 'fats' ? 'active' : ''}`}
                    onClick={() => setActivePlateSection('fats')}
                    title="Healthy Fats (Thumb Rule)"
                  >
                    <span>🥑</span>
                    <small>Fats</small>
                  </button>
                </div>
              </div>
            </div>

            {/* Plate Explainer Card */}
            <div className="plate-info-card">
              <div className="plate-info-top">
                <span className="plate-info-icon">{plateData[activePlateSection].icon}</span>
                <div>
                  <span className="plate-info-share" style={{ color: plateData[activePlateSection].color }}>
                    {plateData[activePlateSection].share}
                  </span>
                  <h3 className="plate-info-title">{plateData[activePlateSection].name}</h3>
                </div>
              </div>

              <p className="plate-info-role">{plateData[activePlateSection].role}</p>

              <div className="plate-examples-box">
                <span className="examples-heading">Top Choices:</span>
                <div className="examples-tags-list">
                  {plateData[activePlateSection].examples.map((ex) => (
                    <span key={ex} className="example-pill">
                      ✓ {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hand rule quick badge */}
              <div className="hand-rule-callout">
                <span className="hand-emoji">✋</span>
                <div>
                  <strong>Hand Portion Metric:</strong>
                  {activePlateSection === 'veggies' && ' 1–2 Full Fists per meal'}
                  {activePlateSection === 'protein' && ' 1–2 Palms per meal'}
                  {activePlateSection === 'carbs' && ' 1 Cupped Hand per meal'}
                  {activePlateSection === 'fats' && ' 1 Thumb tip (1–2 tbsp)'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: Macronutrients & Micronutrients Matrix
            ========================================================= */}
        <section className="chart-block-card">
          <div className="chart-card-header">
            <div className="chart-icon-wrap bg-blue-subtle">
              <Zap size={22} className="text-blue" />
            </div>
            <div>
              <h2 className="chart-title">Macronutrients & Micronutrients Comparison Table</h2>
              <p className="chart-subtitle">Direct comparison of caloric density, bodily function, and optimal targets.</p>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="nutrition-matrix-table">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Caloric Density</th>
                  <th>Core Biological Role</th>
                  <th>Ideal Daily Target</th>
                  <th>Best Whole Food Sources</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="table-nutrient-name">
                      <span className="table-dot dot-carbs"></span>
                      <strong>Carbohydrates</strong>
                    </div>
                  </td>
                  <td><span className="table-badge bg-blue-subtle text-blue">4 kcal / g</span></td>
                  <td>Primary energy currency for central nervous system and muscles</td>
                  <td><strong>45% – 55%</strong> of calories</td>
                  <td>Oats, Quinoa, Sweet Potatoes, Berries, Beans</td>
                </tr>

                <tr>
                  <td>
                    <div className="table-nutrient-name">
                      <span className="table-dot dot-protein"></span>
                      <strong>Proteins</strong>
                    </div>
                  </td>
                  <td><span className="table-badge bg-emerald-subtle text-emerald">4 kcal / g</span></td>
                  <td>Enzymes, muscle protein synthesis & satiety signaling</td>
                  <td><strong>20% – 30%</strong> of calories (1.6–2.2g/kg)</td>
                  <td>Eggs, Salmon, Chicken, Greek Yogurt, Tofu, Lentils</td>
                </tr>

                <tr>
                  <td>
                    <div className="table-nutrient-name">
                      <span className="table-dot dot-fats"></span>
                      <strong>Healthy Fats</strong>
                    </div>
                  </td>
                  <td><span className="table-badge bg-amber-subtle text-amber">9 kcal / g</span></td>
                  <td>Hormone synthesis, brain cell membranes, nutrient uptake</td>
                  <td><strong>25% – 35%</strong> of calories</td>
                  <td>Extra Virgin Olive Oil, Avocados, Walnuts, Chia Seeds</td>
                </tr>

                <tr>
                  <td>
                    <div className="table-nutrient-name">
                      <span className="table-dot dot-micros"></span>
                      <strong>Micronutrients</strong>
                    </div>
                  </td>
                  <td><span className="table-badge bg-purple-subtle text-purple">0 kcal / g</span></td>
                  <td>Metabolic catalysts unlocking cellular energy and DNA repair</td>
                  <td><strong>100% Daily Value</strong></td>
                  <td>Rainbow vegetables, Citrus, Seeds, Dark Leafy Greens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: Vitamins & Minerals Quick-Reference Chart
            ========================================================= */}
        <section className="chart-block-card">
          <div className="chart-card-header">
            <div className="chart-icon-wrap bg-amber-subtle">
              <Shield size={22} className="text-amber" />
            </div>
            <div>
              <h2 className="chart-title">Vitamins & Minerals Matrix</h2>
              <p className="chart-subtitle">Key essentials, what they do, where to find them, and low-intake signs.</p>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="nutrition-matrix-table">
              <thead>
                <tr>
                  <th>Micronutrient</th>
                  <th>Key Health Benefit</th>
                  <th>Richest Natural Sources</th>
                  <th>Warning Sign of Low Intake</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Vitamin C & A</strong></td>
                  <td>Immune defense, vision & collagen synthesis</td>
                  <td>Bell peppers, Citrus fruits, Carrots, Strawberries</td>
                  <td><span className="warning-text">Frequent colds, dry skin, fatigue</span></td>
                </tr>

                <tr>
                  <td><strong>Vitamin D3 & Calcium</strong></td>
                  <td>Bone mineral density & mood regulation</td>
                  <td>Natural sunlight, Fortified dairy, Egg yolks, Spinach</td>
                  <td><span className="warning-text">Low mood, bone/joint ache</span></td>
                </tr>

                <tr>
                  <td><strong>B-Complex (B6, B12)</strong></td>
                  <td>Converts food into cellular ATP energy & nerve health</td>
                  <td>Whole grains, Nutritional yeast, Legumes, Salmon</td>
                  <td><span className="warning-text">Brain fog, sluggish morning energy</span></td>
                </tr>

                <tr>
                  <td><strong>Magnesium</strong></td>
                  <td>Muscle relaxation, 300+ enzymes & deep sleep</td>
                  <td>Pumpkin seeds, Dark chocolate (85%+), Almonds</td>
                  <td><span className="warning-text">Muscle twitches/cramps, restless sleep</span></td>
                </tr>

                <tr>
                  <td><strong>Iron & Zinc</strong></td>
                  <td>Oxygen transport via hemoglobin & immune repair</td>
                  <td>Lentils, Grass-fed meat, Chickpeas, Sesame seeds</td>
                  <td><span className="warning-text">Cold extremities, shortness of breath</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: Interactive Food Label Inspector
            ========================================================= */}
        <section className="chart-block-card">
          <div className="chart-card-header">
            <div className="chart-icon-wrap bg-purple-subtle">
              <FileText size={22} className="text-purple" />
            </div>
            <div>
              <h2 className="chart-title">Nutrition Facts: Interactive Label Inspector</h2>
              <p className="chart-subtitle">Click the pins on the label to decode any grocery item in 10 seconds.</p>
            </div>
          </div>

          <div className="label-inspector-layout">
            {/* Visual Grocery Label Graphic */}
            <div className="nutrition-label-graphic">
              <div className="label-top-border">Nutrition Facts</div>
              <div className="label-sub">8 servings per container</div>
              
              {/* Pin 1: Serving Size */}
              <div 
                className={`label-row highlightable ${activeLabelPin === 1 ? 'selected' : ''}`}
                onClick={() => setActiveLabelPin(1)}
              >
                <div className="pin-indicator">①</div>
                <strong>Serving size</strong>
                <span>2/3 cup (55g)</span>
              </div>

              <div className="label-thick-bar"></div>

              {/* Pin 2: Calories */}
              <div 
                className={`label-calorie-row highlightable ${activeLabelPin === 2 ? 'selected' : ''}`}
                onClick={() => setActiveLabelPin(2)}
              >
                <div>
                  <div className="pin-indicator">②</div>
                  <span className="calorie-label">Calories</span>
                </div>
                <span className="calorie-amount">230</span>
              </div>

              <div className="label-thin-bar"></div>

              {/* Pin 3: Added Sugars */}
              <div 
                className={`label-row indent highlightable ${activeLabelPin === 3 ? 'selected' : ''}`}
                onClick={() => setActiveLabelPin(3)}
              >
                <div className="pin-indicator">③</div>
                <span>Incl. Added Sugars 12g</span>
                <strong>24%</strong>
              </div>

              {/* Pin 4: The 5/20 % Daily Value */}
              <div 
                className={`label-row highlightable ${activeLabelPin === 4 ? 'selected' : ''}`}
                onClick={() => setActiveLabelPin(4)}
              >
                <div className="pin-indicator">④</div>
                <span>% Daily Value (% DV) Rule</span>
                <span className="text-emerald font-bold">5% / 20%</span>
              </div>
            </div>

            {/* Label Inspector Details Side */}
            <div className="label-inspector-details">
              <div className="inspector-badge-row">
                <span className="inspector-step-num">Pin {activeLabelPin} of 4</span>
                <span className={`inspector-status-badge badge-${labelPins[activeLabelPin - 1].status}`}>
                  {labelPins[activeLabelPin - 1].badge}
                </span>
              </div>

              <h3 className="inspector-title">{labelPins[activeLabelPin - 1].title}</h3>
              <div className="inspector-rule-tag">{labelPins[activeLabelPin - 1].rule}</div>
              <p className="inspector-text">{labelPins[activeLabelPin - 1].text}</p>

              <div className="inspector-selector-buttons">
                {labelPins.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`btn-pin-select ${activeLabelPin === p.id ? 'active' : ''}`}
                    onClick={() => setActiveLabelPin(p.id)}
                  >
                    Pin {p.id}: {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: Healthy Eating Daily Timeline Chart
            ========================================================= */}
        <section className="chart-block-card">
          <div className="chart-card-header">
            <div className="chart-icon-wrap bg-emerald-subtle">
              <Clock size={22} className="text-emerald" />
            </div>
            <div>
              <h2 className="chart-title">The Healthy Eating Day: Visual Timeline</h2>
              <p className="chart-subtitle">A simple, chronobiological flow to maintain energy and avoid crashes.</p>
            </div>
          </div>

          <div className="timeline-horizontal-flow">
            {/* 7:30 AM */}
            <div className="timeline-node-card">
              <div className="timeline-time-pill">7:30 AM • Morning</div>
              <div className="timeline-icon-box">🌅</div>
              <h4 className="timeline-node-title">Hydrate & Front-Load Protein</h4>
              <p className="timeline-node-desc">
                Drink 16oz water with lemon. Eat 25–30g protein (eggs or Greek yogurt) to stabilize morning dopamine and suppress ghrelin.
              </p>
            </div>

            {/* 1:00 PM */}
            <div className="timeline-node-card">
              <div className="timeline-time-pill">1:00 PM • Lunch</div>
              <div className="timeline-icon-box">🥗</div>
              <h4 className="timeline-node-title">The Half-Plate Rule</h4>
              <p className="timeline-node-desc">
                50% greens/veggies + 25% grilled protein + 25% complex carbs. Eat vegetables first to build a fiber mesh and blunt glucose spikes.
              </p>
            </div>

            {/* 4:00 PM */}
            <div className="timeline-node-card">
              <div className="timeline-time-pill">4:00 PM • Snack</div>
              <div className="timeline-icon-box">🥑</div>
              <h4 className="timeline-node-title">Pair Carbs with Fat/Fiber</h4>
              <p className="timeline-node-desc">
                Avoid naked carbs (cookies/chips). Pair an apple with walnuts or celery with almond butter to eliminate the 3 PM energy slump.
              </p>
            </div>

            {/* 7:30 PM */}
            <div className="timeline-node-card">
              <div className="timeline-time-pill">7:30 PM • Dinner</div>
              <div className="timeline-icon-box">🌙</div>
              <h4 className="timeline-node-title">Mindful Dinner (No Screens)</h4>
              <p className="timeline-node-desc">
                Eat slowly without phones. Finish eating 2.5–3 hours before sleep to allow internal core temperature to drop for deep restorative sleep.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
