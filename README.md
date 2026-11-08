# NutriAI — Personalized Nutrition & Meal Planning

NutriAI is a React-based nutrition and meal-planning web application designed to help users explore healthy recipes, learn nutrition basics, plan meals, and estimate daily calorie and macronutrient needs.

> **Project note:** This repository currently contains a frontend application. Meal-plan examples are selected from predefined sample data, and nutrition calculations run in the browser. It does not currently connect to a trained AI/ML model, backend API, or medical data service.

## Features

- **Nutrition dashboard** — Home page with an introduction, daily healthy-eating tip, and featured recipes.
- **Daily tips** — Browse practical healthy-eating information.
- **Healthy recipes** — Explore recipe ideas and recipe details.
- **Meal planner** — View sample meal plans for different goals, with dietary preference controls.
- **Nutrition tools** — Calculate BMI, estimate BMR and daily energy needs, and view suggested macronutrient targets.
- **Nutrition guide** — Browse educational nutrition topics.
- **Light/dark theme** — Switch themes; the selected theme is saved in browser local storage.
- **Responsive interface** — React components and CSS organize the application into reusable sections.

## Tech Stack

- React
- Vite
- JavaScript (JSX)
- CSS
- Lucide React icons
- Browser Local Storage

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) (which includes npm).

### 1. Clone the repository

```bash
git clone https://github.com/bhushan1395/NutriAI.git
cd NutriAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal (Vite typically uses `http://localhost:5173`).

### 4. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
NutriAI/
├── public/                  # Public static assets
├── src/
│   ├── assets/              # Images and frontend assets
│   ├── components/          # Reusable UI components and pages
│   ├── data/                # Recipe, meal-plan, and nutrition content
│   ├── App.jsx              # Main application and page navigation
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── NutriSmart_AI_Project_Guide.pdf
└── PROJECT_OVERVIEW_2PAGE.html
```

## How the Nutrition Tools Work

- **BMI:** calculated from weight and height.
- **BMR:** estimated using the Mifflin–St Jeor equation.
- **Daily energy estimate:** BMR is multiplied by an activity-level factor to estimate total daily energy expenditure (TDEE).
- **Goal adjustment:** the app applies a selected calorie adjustment for goals such as fat loss, maintenance, or muscle gain.
- **Macronutrients:** target protein, carbohydrate, and fat amounts are estimated from the selected macro preset.

These are general estimates, not individualized medical or dietetic advice.

## Current Scope & Future Improvements

The current version is a frontend prototype using local sample data and browser-side calculations.

Potential future enhancements:

- Add a backend and database for user profiles and saved meal plans.
- Integrate a validated nutrition database and recipe API.
- Build and evaluate a genuine recommendation or machine-learning model using suitable data.
- Add authentication, meal tracking, and accessibility testing.
- Add automated tests for calculators and user flows.

## Health Disclaimer

NutriAI is an educational project and is not a medical device or a substitute for advice from a qualified healthcare professional or registered dietitian. BMI, calorie, and macronutrient estimates are approximate and may not be suitable for every person.

## Author

**Bhushan Bhatkar**

- GitHub: [@bhushan1395](https://github.com/bhushan1395)

## License

No license has been specified for this repository. All rights are reserved by the project owner unless a license is added.
