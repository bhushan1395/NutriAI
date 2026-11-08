import React, { useState } from 'react';
import { Lightbulb, Sparkles, RefreshCw, Bookmark, Share2, CheckCircle2, BookOpen } from 'lucide-react';
import { dailyTips } from '../data/nutritionData';

export default function DailyTipCard() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const tip = dailyTips[currentTipIndex];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % dailyTips.length);
    setIsSaved(false);
  };

  const handleCopyTip = () => {
    const textToCopy = `NutriSmart AI Daily Tip: ${tip.title}\n${tip.text}\nAction Step: ${tip.actionableStep}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="daily-tip" className="daily-tip-section">
      <div className="section-container">
        {/* Section Header Block */}
        <div className="section-header-block text-center">
          <div className="section-pill-tag">
            <Lightbulb size={14} className="text-amber" />
            <span>Daily Nutrition Wisdom</span>
          </div>
          <h2 className="section-main-heading">
            Daily Healthy <span className="gradient-text">Eating Tip</span>
          </h2>
          <p className="section-sub-heading">
            Small, science-grounded nutritional adjustments that yield compounding improvements 
            in energy, gut wellness, and metabolic resilience.
          </p>
        </div>

        {/* Tip Feature Card */}
        <div className="daily-tip-card-wrapper">
          <div className="tip-card-card">
            {/* Top Bar of the Tip Card */}
            <div className="tip-card-header">
              <div className="tip-badge-group">
                <span className="tip-counter-badge">
                  Tip {currentTipIndex + 1} of {dailyTips.length}
                </span>
                <span className="tip-category-pill">{tip.category}</span>
                <span className="tip-sub-badge">{tip.badge}</span>
              </div>

              <div className="tip-header-actions">
                <button
                  type="button"
                  className="btn-tip-action"
                  onClick={handleCopyTip}
                  title="Copy tip to clipboard"
                >
                  <Share2 size={16} />
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  className={`btn-tip-action ${isSaved ? 'active' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                  title="Save tip"
                >
                  <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Main Tip Title & Body */}
            <h3 className="tip-main-title">{tip.title}</h3>
            <p className="tip-body-text">{tip.text}</p>

            {/* Science Note Box */}
            <div className="tip-science-box">
              <div className="science-box-header">
                <BookOpen size={16} className="text-emerald" />
                <span className="science-box-label">The Clinical Science</span>
              </div>
              <p className="science-box-text">{tip.scienceNote}</p>
            </div>

            {/* Today's Action Step */}
            <div className="tip-action-step-card">
              <div className="action-step-icon">
                <CheckCircle2 size={18} className="text-emerald" />
              </div>
              <div className="action-step-content">
                <span className="action-step-title">Today's Micro Action:</span>
                <p className="action-step-text">{tip.actionableStep}</p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="tip-card-footer">
              <span className="tip-footer-hint">
                <Sparkles size={14} className="text-emerald" />
                <span>Verified by NutriSmart AI Clinical Nutrition Engine</span>
              </span>

              <button
                type="button"
                className="btn-shuffle-tip"
                onClick={handleNextTip}
              >
                <RefreshCw size={15} />
                <span>Shuffle Next Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
