import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import DailyTipCard from './components/DailyTipCard';
import HealthyRecipesShowcase from './components/HealthyRecipesShowcase';
import DailyTipsPage from './components/DailyTipsPage';
import HealthyRecipesPage from './components/HealthyRecipesPage';
import MealPlannerPage from './components/MealPlannerPage';
import NutritionToolsPage from './components/NutritionToolsPage';
import NutritionGuide from './components/NutritionGuide';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nutrismart_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nutrismart_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="nutrismart-app" data-theme={theme}>
      {/* Navbar with Home, Nutrition Guide, Healthy Recipes & Light/Dark Mode Toggle */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content-flow">
        {activeTab === 'home' && (
          <>
            {/* 1st Page: Welcome Banner and Introduction */}
            <HeroBanner onSelectTab={setActiveTab} />

            {/* Daily Healthy Eating Tip Feature */}
            <DailyTipCard />

            {/* Healthy Recipe Pictures Showcase */}
            <HealthyRecipesShowcase />
          </>
        )}

        {activeTab === 'tips' && (
          /* 2nd Page: Daily Healthy Eating Tips */
          <DailyTipsPage />
        )}

        {activeTab === 'recipes' && (
          /* 3rd Page: Healthy Recipes */
          <HealthyRecipesPage />
        )}

        {activeTab === 'planner' && (
          /* 4th Page: AI Personalised Meal Planner */
          <MealPlannerPage />
        )}

        {activeTab === 'tools' && (
          /* 5th Page: Nutrition Tools (BMI, Calories, 4 Macro Boxes) */
          <NutritionToolsPage onSelectTab={setActiveTab} />
        )}

        {activeTab === 'guide' && (
          /* 6th Page: Nutrition Guide (Importance of Balanced Diet, Topic Cards, Search & Charts) */
          <NutritionGuide />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
