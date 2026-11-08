// AI Personalized Meal Planner Data Engine & Nutrition Algorithms

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const commonAllergies = [
  { id: 'dairy', label: 'Dairy / Lactose', icon: '🥛', desc: 'Milk, cheese, yogurt, whey, butter' },
  { id: 'nuts', label: 'Tree Nuts & Peanuts', icon: '🥜', desc: 'Almonds, walnuts, peanut butter, cashews' },
  { id: 'gluten', label: 'Gluten / Wheat', icon: '🌾', desc: 'Wheat, barley, rye, standard bread & pasta' },
  { id: 'eggs', label: 'Eggs', icon: '🥚', desc: 'Whole eggs, egg whites, mayonnaise' },
  { id: 'seafood', label: 'Fish & Shellfish', icon: '🦐', desc: 'Salmon, tuna, shrimp, shellfish' },
  { id: 'soy', label: 'Soy Products', icon: '🫘', desc: 'Tofu, soy milk, edamame, tamari' }
];

export const nutritionGoals = [
  {
    id: 'weight_loss',
    title: 'Fat Loss & Lean Deficit',
    badge: '18% Deficit',
    icon: '🔥',
    desc: 'High protein and high fiber volume meals designed to keep you satiated while creating a steady fat-loss caloric deficit.'
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Growth & Hypertrophy',
    badge: '12% Surplus',
    icon: '💪',
    desc: 'Nutrient-rich caloric surplus packed with amino acids and complex starches to maximize muscle recovery and athletic strength.'
  },
  {
    id: 'maintenance',
    title: 'Balanced Vitality & Health',
    badge: '100% TDEE',
    icon: '⚖️',
    desc: 'Calibrated to sustain your baseline weight effortlessly, optimizing all-day energy, digestive health, and cognitive clarity.'
  },
  {
    id: 'heart_healthy',
    title: 'Heart Health & Longevity',
    badge: 'Mediterranean',
    icon: '❤️',
    desc: 'Rich in polyphenols, omega-3s, and prebiotic greens to maintain healthy blood pressure and long-term arterial wellness.'
  }
];

export const dietaryPreferences = [
  { id: 'omnivore', label: 'Omnivore', desc: 'Balanced real foods including lean poultry, seafood, dairy, and veggies', icon: '🥗' },
  { id: 'vegetarian', label: 'Vegetarian', desc: 'Plant-forward diet including dairy and eggs, excluding meat and fish', icon: '🥑' },
  { id: 'vegan', label: '100% Vegan', desc: 'Strictly plant-based whole foods, no animal products, dairy, or eggs', icon: '🌱' },
  { id: 'pescatarian', label: 'Pescatarian', desc: 'Plant-rich meals combined with wild fish and omega-rich seafood', icon: '🐟' },
  { id: 'low_carb', label: 'Low Carb / Keto', desc: 'Higher healthy fats and proteins with minimal carbohydrates', icon: '🥩' }
];

export const activityLevels = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, little to no formal exercise', multiplier: 1.2 },
  { id: 'light', label: 'Lightly Active', desc: 'Light exercise or walking 1–3 days/week', multiplier: 1.375 },
  { id: 'moderate', label: 'Moderately Active', desc: 'Moderate workout or sports 3–5 days/week', multiplier: 1.55 },
  { id: 'active', label: 'Very Active', desc: 'Intense training or physical job 6–7 days/week', multiplier: 1.725 }
];

// Master Meal Library with Portions & Allergen Flags
export const masterMealLibrary = [
  // ==========================================
  // BREAKFAST MEALS
  // ==========================================
  {
    id: 'bf-1',
    title: 'Blueberry Chia & Cinnamon Rolled Oats',
    mealType: 'breakfast',
    diet: 'vegan',
    allergens: [],
    calories: 340,
    protein: 18,
    carbs: 52,
    fat: 7,
    fiber: 11,
    prepTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    desc: 'Slow-simmered rolled oats infused with Ceylon cinnamon, fresh wild blueberries, chia seeds, and unsweetened oat milk.',
    portion: '1 bowl (approx 280g): 1/2 cup dry rolled oats cooked in 1 cup oat milk + 1/2 cup blueberries + 1 tbsp chia seeds.',
    portionGuide: '1 fist-sized cooked oats + 1 cupped hand blueberries + 1 thumb chia seeds',
    ingredients: ['Rolled oats', 'Oat milk (unsweetened)', 'Fresh blueberries', 'Chia seeds', 'Ceylon cinnamon', 'Raw maple drizzle']
  },
  {
    id: 'bf-2',
    title: 'Spinach, Tomato & Free-Range Scramble',
    mealType: 'breakfast',
    diet: 'vegetarian',
    allergens: ['eggs'],
    calories: 330,
    protein: 26,
    carbs: 22,
    fat: 14,
    fiber: 4,
    prepTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    desc: 'Soft farm-fresh scrambled eggs folded with wilted organic baby spinach and blistered cherry tomatoes, served with sourdough.',
    portion: '1 plate: 2 large pasture eggs (or 1 whole egg + 2 whites) + 1.5 cups sautéed spinach + 1 slice toasted artisan sourdough.',
    portionGuide: '1 palm-sized egg scramble + 2 cupped hands wilted spinach + 1 open palm toast slice',
    ingredients: ['Pasture-raised eggs', 'Baby spinach', 'Cherry tomatoes', 'Extra virgin olive oil', 'Artisan sourdough slice']
  },
  {
    id: 'bf-3',
    title: 'Greek Yogurt Protein Berry Parfait',
    mealType: 'breakfast',
    diet: 'vegetarian',
    allergens: ['dairy'],
    calories: 320,
    protein: 28,
    carbs: 34,
    fat: 6,
    fiber: 7,
    prepTime: '5 mins',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
    desc: 'Velvety plain Greek yogurt layered with organic raspberries, blackberries, unsweetened hemp hearts, and pure vanilla bean.',
    portion: '1 tall jar (approx 260g): 3/4 cup (170g) 0-2% Greek yogurt + 1/2 cup mixed berries + 1.5 tbsp shelled hemp hearts.',
    portionGuide: '1 fist-sized yogurt cup + 1 cupped hand berries + 1 thumb hemp hearts',
    ingredients: ['Plain Greek yogurt', 'Organic raspberries', 'Blackberries', 'Shelled hemp hearts', 'Pure vanilla extract']
  },
  {
    id: 'bf-4',
    title: 'Smoked Wild Salmon & Avocado Tartine',
    mealType: 'breakfast',
    diet: 'pescatarian',
    allergens: ['seafood'],
    calories: 380,
    protein: 26,
    carbs: 28,
    fat: 18,
    fiber: 6,
    prepTime: '8 mins',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=700&q=80',
    desc: 'Hearty sprouted grain toast layered with ripe smashed avocado, cold-smoked Alaskan salmon, capers, and fresh garden dill.',
    portion: '1 open-faced toast: 1 slice sprouted grain toast + 1/3 medium Hass avocado + 75g cold-smoked wild salmon + lemon wedge.',
    portionGuide: '1 palm-sized toast slice + 1/2 fist smashed avocado + 1 palm smoked salmon',
    ingredients: ['Sprouted grain bread', 'Wild Alaskan smoked salmon', 'Hass avocado', 'Fresh dill', 'Lemon juice', 'Capers']
  },
  {
    id: 'bf-5',
    title: 'Golden Turmeric & Tropical Smoothie Bowl',
    mealType: 'breakfast',
    diet: 'vegan',
    allergens: [],
    calories: 310,
    protein: 16,
    carbs: 48,
    fat: 6,
    fiber: 8,
    prepTime: '7 mins',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    desc: 'Energizing morning blend of frozen mango, fresh ginger, golden turmeric, and clean pea protein topped with toasted pumpkin seeds.',
    portion: '1 bowl (approx 320ml): 1 cup blended fruit & unsweetened almond milk + 1 scoop plant protein + 1 tbsp raw pumpkin seeds.',
    portionGuide: '1 medium smoothie bowl + 1 thumb pumpkin seeds topping',
    ingredients: ['Frozen mango cubes', 'Organic pea protein', 'Ground turmeric & fresh ginger', 'Pumpkin seeds', 'Unsweetened almond milk']
  },
  {
    id: 'bf-6',
    title: 'Savory Tofu & Veggie Breakfast Hash',
    mealType: 'breakfast',
    diet: 'vegan',
    allergens: ['soy'],
    calories: 310,
    protein: 24,
    carbs: 24,
    fat: 12,
    fiber: 6,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    desc: 'Crumbled high-protein firm tofu sautéed with bell peppers, red onion, nutritional yeast, and diced roasted red potatoes.',
    portion: '1 skillet plate: 150g firm tofu + 1/2 cup diced bell peppers + 1/2 cup roasted potato cubes.',
    portionGuide: '1 palm-sized tofu crumble + 1 cupped hand diced potatoes + 1 cupped hand peppers',
    ingredients: ['Organic firm tofu', 'Bell peppers', 'Nutritional yeast', 'Red potato cubes', 'Olive oil', 'Turmeric seasoning']
  },
  {
    id: 'bf-7',
    title: 'Banana & Oat Blender Protein Waffle / Cake',
    mealType: 'breakfast',
    diet: 'vegetarian',
    allergens: ['eggs'],
    calories: 350,
    protein: 22,
    carbs: 46,
    fat: 7,
    fiber: 6,
    prepTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=700&q=80',
    desc: 'Fluffy whole-grain pancakes whipped from rolled oats, ripe banana, pasture eggs, and pure cinnamon. Zero refined flour.',
    portion: '2 medium pancakes (approx 180g) + 1 tbsp pure maple syrup + 1/4 cup fresh sliced strawberries.',
    portionGuide: '2 palm-sized pancakes + 1 cupped hand sliced berries',
    ingredients: ['Rolled oats', 'Ripe banana', 'Pasture eggs', 'Pure vanilla', 'Ground cinnamon', 'Fresh strawberries']
  },

  // ==========================================
  // LUNCH MEALS
  // ==========================================
  {
    id: 'ln-1',
    title: 'Mediterranean Roasted Chickpea Buddha Bowl',
    mealType: 'lunch',
    diet: 'vegan',
    allergens: [],
    calories: 430,
    protein: 20,
    carbs: 58,
    fat: 14,
    fiber: 13,
    prepTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    desc: 'Spiced oven-crisped chickpeas, tri-color quinoa, Persian cucumbers, cherry tomatoes, and creamy lemon-tahini dressing.',
    portion: '1 large bowl (approx 350g): 1/2 cup cooked quinoa + 3/4 cup roasted chickpeas + 1.5 cups diced crunchy veggies + 1.5 tbsp tahini.',
    portionGuide: '1 cupped hand quinoa + 1 palm roasted chickpeas + 2 cupped hands fresh vegetables + 1 thumb tahini',
    ingredients: ['Spiced chickpeas', 'Tri-color quinoa', 'Persian cucumbers', 'Cherry tomatoes', 'Sesame tahini', 'Lemon & garlic']
  },
  {
    id: 'ln-2',
    title: 'Rosemary Grilled Chicken Breast & Sweet Potato',
    mealType: 'lunch',
    diet: 'omnivore',
    allergens: [],
    calories: 460,
    protein: 44,
    carbs: 38,
    fat: 13,
    fiber: 6,
    prepTime: '22 mins',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80',
    desc: 'Herb-marinated free-range chicken breast flame-grilled, accompanied by oven-roasted sweet potato cubes and tender steamed broccoli.',
    portion: '1 plate: 150g cooked chicken breast + 1 medium baked sweet potato (130g) + 1.5 cups steamed broccoli with lemon olive oil.',
    portionGuide: '1 palm-sized chicken breast (deck-of-cards) + 1 fist sweet potato + 2 cupped hands broccoli',
    ingredients: ['Skinless chicken breast', 'Sweet potato', 'Broccoli florets', 'Fresh rosemary', 'Extra virgin olive oil', 'Sea salt']
  },
  {
    id: 'ln-3',
    title: 'Crisp Sesame Tofu & Edamame Soba Salad',
    mealType: 'lunch',
    diet: 'vegan',
    allergens: ['soy', 'gluten'],
    calories: 410,
    protein: 25,
    carbs: 46,
    fat: 15,
    fiber: 8,
    prepTime: '18 mins',
    image: 'https://images.unsplash.com/photo-1546069901-d703e7c8ec17?auto=format&fit=crop&w=700&q=80',
    desc: 'Golden pan-seared organic firm tofu tossed with buckwheat soba noodles, shelled edamame, purple cabbage, and toasted sesame vinaigrette.',
    portion: '1 bowl (approx 340g): 120g cubed crispy tofu + 1/2 cup cooked buckwheat soba + 1/2 cup edamame + 1 cup shredded crunchy cabbage.',
    portionGuide: '1 palm-sized tofu + 1 cupped hand soba noodles + 1/2 cupped hand edamame + 2 cupped hands cabbage',
    ingredients: ['Firm organic tofu', 'Buckwheat soba noodles', 'Shelled edamame', 'Red cabbage', 'Toasted sesame oil', 'Tamari']
  },
  {
    id: 'ln-4',
    title: 'Zesty Albacore Tuna & Cannellini Bean Garden Salad',
    mealType: 'lunch',
    diet: 'pescatarian',
    allergens: ['seafood'],
    calories: 410,
    protein: 38,
    carbs: 32,
    fat: 14,
    fiber: 9,
    prepTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    desc: 'Sustainably wild-caught white tuna tossed with creamy Cannellini white beans, peppery baby arugula, diced red onion, and lemon vinaigrette.',
    portion: '1 large salad bowl: 1 can (130g drained) tuna + 1/2 cup rinsed Cannellini beans + 2 cups fresh baby arugula + 1 tbsp olive oil vinaigrette.',
    portionGuide: '1 palm-sized tuna + 1 cupped hand beans + 2 big handfuls arugula',
    ingredients: ['Wild albacore tuna', 'Cannellini beans', 'Baby arugula', 'Red onion', 'Extra virgin olive oil', 'Dijon lemon dressing']
  },
  {
    id: 'ln-5',
    title: 'Warm Moroccan Red Lentil & Vegetable Stew',
    mealType: 'lunch',
    diet: 'vegan',
    allergens: [],
    calories: 420,
    protein: 22,
    carbs: 56,
    fat: 11,
    fiber: 14,
    prepTime: '25 mins',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
    desc: 'Aromatic red lentils simmered with diced carrots, zucchini, cumin, coriander, crushed San Marzano tomatoes, and fresh cilantro.',
    portion: '1 deep bowl (approx 380ml): 1.5 cups hearty lentil stew + 1/4 cup cooked brown rice or 1 warm corn/flax tortilla.',
    portionGuide: '2 cupped hands warm stew + 1 small fist complex grain side',
    ingredients: ['Red split lentils', 'Crushed tomatoes', 'Carrots & zucchini', 'Cumin & coriander', 'Fresh cilantro', 'Olive oil']
  },
  {
    id: 'ln-6',
    title: 'Turkey, Avocado & Crisp Romaine Wrap',
    mealType: 'lunch',
    diet: 'omnivore',
    allergens: ['gluten'],
    calories: 420,
    protein: 36,
    carbs: 34,
    fat: 16,
    fiber: 8,
    prepTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    desc: 'Oven-roasted sliced lean turkey rolled in a sprouted whole grain wrap with creamy avocado, crunchy romaine hearts, and Dijon mustard.',
    portion: '1 wrap: 1 large whole grain tortilla (60g) + 110g sliced roasted turkey + 1/4 sliced avocado + 1 cup crisp romaine lettuce.',
    portionGuide: '1 open hand tortilla + 1 palm lean sliced turkey + 1 thumb avocado spread',
    ingredients: ['Whole grain wrap', 'Roasted turkey breast', 'Hass avocado', 'Romaine hearts', 'Stoneground Dijon mustard']
  },
  {
    id: 'ln-7',
    title: 'Greek Chickpea & Crumbled Feta Village Bowl',
    mealType: 'lunch',
    diet: 'vegetarian',
    allergens: ['dairy'],
    calories: 410,
    protein: 21,
    carbs: 45,
    fat: 17,
    fiber: 10,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    desc: 'Crisp bell peppers, Kalamata olives, cucumbers, and tender chickpeas tossed with authentic crumbled Greek sheep milk feta and oregano.',
    portion: '1 salad bowl: 3/4 cup cooked chickpeas + 1.5 cups chopped Greek salad veggies + 35g crumbled feta cheese + 1 tbsp herb vinaigrette.',
    portionGuide: '1 palm chickpeas + 2 cupped hands veggies + 1 thumb crumbled feta',
    ingredients: ['Cooked chickpeas', 'Persian cucumbers', 'Kalamata olives', 'Greek feta cheese', 'Bell peppers', 'Oregano olive oil']
  },

  // ==========================================
  // DINNER MEALS
  // ==========================================
  {
    id: 'dn-1',
    title: 'Pan-Seared Alaskan Salmon with Lemon Asparagus',
    mealType: 'dinner',
    diet: 'pescatarian',
    allergens: ['seafood'],
    calories: 450,
    protein: 42,
    carbs: 12,
    fat: 26,
    fiber: 4,
    prepTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80',
    desc: 'Crisp-skin wild Alaskan salmon fillet seared in cold-pressed olive oil, paired with grilled lemon asparagus spears and garlic cauliflower mash.',
    portion: '1 dinner plate: 160g wild salmon fillet + 8-10 charred asparagus spears + 1 cup steamed cauliflower mash with chives.',
    portionGuide: '1 palm salmon fillet + 2 open hands asparagus + 1 fist cauliflower mash',
    ingredients: ['Wild Alaskan salmon fillet', 'Fresh green asparagus', 'Cauliflower florets', 'Garlic & lemon zest', 'Extra virgin olive oil']
  },
  {
    id: 'dn-2',
    title: 'Coconut Lentil & Wilted Baby Spinach Curry',
    mealType: 'dinner',
    diet: 'vegan',
    allergens: [],
    calories: 430,
    protein: 20,
    carbs: 58,
    fat: 13,
    fiber: 13,
    prepTime: '25 mins',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
    desc: 'Warm and comforting red lentils simmered in light coconut milk, fresh ginger, crushed cumin, and folded with tender baby spinach.',
    portion: '1 dinner bowl: 1.5 cups coconut lentil curry + 1/2 cup steamed Jasmine brown rice or quinoa.',
    portionGuide: '2 cupped hands curry + 1 tight fist brown rice',
    ingredients: ['Red split lentils', 'Light coconut milk', 'Fresh baby spinach', 'Crushed tomatoes', 'Turmeric, ginger & cumin']
  },
  {
    id: 'dn-3',
    title: 'Lean Herb Turkey & Zucchini Meatballs with Marinara',
    mealType: 'dinner',
    diet: 'omnivore',
    allergens: ['eggs'],
    calories: 420,
    protein: 44,
    carbs: 22,
    fat: 16,
    fiber: 5,
    prepTime: '28 mins',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=700&q=80',
    desc: 'Tender meatballs made from 93% lean turkey and grated zucchini, slow-baked in homemade Italian San Marzano marinara over zucchini ribbons.',
    portion: '1 plate: 4 medium turkey meatballs (approx 150g) + 1/2 cup homemade marinara + 2 cups spiralized sautéed zucchini noodles.',
    portionGuide: '1 palm turkey meatballs + 2 big cupped hands zucchini noodles + 1/2 fist marinara',
    ingredients: ['Lean ground turkey (93%)', 'Grated zucchini', 'San Marzano tomatoes', 'Pasture egg white', 'Italian oregano & basil']
  },
  {
    id: 'dn-4',
    title: 'Roasted Bell Peppers Stuffed with Black Beans & Corn',
    mealType: 'dinner',
    diet: 'vegan',
    allergens: [],
    calories: 390,
    protein: 19,
    carbs: 62,
    fat: 8,
    fiber: 15,
    prepTime: '30 mins',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    desc: 'Sweet red bell peppers roasted until tender, filled with seasoned black beans, sweet corn, brown rice, salsa verde, and fresh cilantro.',
    portion: '2 stuffed bell pepper halves (approx 340g total) + 2 tbsp fresh guacamole + lime wedge.',
    portionGuide: '2 palm-sized roasted pepper halves + 1 thumb guacamole',
    ingredients: ['Bell peppers', 'Black beans', 'Sweet corn', 'Brown rice', 'Salsa verde', 'Fresh cilantro & lime']
  },
  {
    id: 'dn-5',
    title: 'Grilled Lemon Herb Chicken with Roasted Green Beans',
    mealType: 'dinner',
    diet: 'omnivore',
    allergens: [],
    calories: 440,
    protein: 45,
    carbs: 18,
    fat: 17,
    fiber: 6,
    prepTime: '22 mins',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80',
    desc: 'Tender chicken breast marinated in fresh garlic, thyme, and lemon juice, paired with crisp roasted French green beans and yellow squash.',
    portion: '1 plate: 160g grilled chicken breast + 1.5 cups blistered green beans + 1 cup roasted summer squash cubes.',
    portionGuide: '1 palm chicken breast + 2 cupped hands green beans & squash',
    ingredients: ['Chicken breast', 'Haricots verts (green beans)', 'Yellow summer squash', 'Thyme & garlic', 'Extra virgin olive oil']
  },
  {
    id: 'dn-6',
    title: 'Portobello Cap Baked with Ricotta & Spinach',
    mealType: 'dinner',
    diet: 'vegetarian',
    allergens: ['dairy'],
    calories: 340,
    protein: 20,
    carbs: 22,
    fat: 19,
    fiber: 7,
    prepTime: '25 mins',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    desc: 'Jumbo Portobello mushroom caps filled with creamy part-skim ricotta, garlic wilted spinach, marinara, and fresh chopped basil.',
    portion: '2 stuffed mushroom caps + 1 side garden salad with lemon vinaigrette.',
    portionGuide: '2 palm-sized mushroom caps + 1 big handful garden greens',
    ingredients: ['Portobello mushrooms', 'Part-skim ricotta', 'Baby spinach', 'Marinara sauce', 'Fresh basil', 'Garlic']
  },
  {
    id: 'dn-7',
    title: 'Ginger Soy Crispy Tofu & Stir-Fry Veggies',
    mealType: 'dinner',
    diet: 'vegan',
    allergens: ['soy'],
    calories: 400,
    protein: 24,
    carbs: 42,
    fat: 16,
    fiber: 9,
    prepTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1546069901-d703e7c8ec17?auto=format&fit=crop&w=700&q=80',
    desc: 'Crisp pressed organic tofu cubes wok-tossed with snap peas, baby corn, bok choy, fresh grated ginger, and gluten-free tamari.',
    portion: '1 wok bowl: 140g cubed tofu + 2 cups colorful stir-fry veggies + 1/2 cup cooked jasmine brown rice.',
    portionGuide: '1 palm tofu + 2 cupped hands stir-fry veggies + 1 fist brown rice',
    ingredients: ['Organic firm tofu', 'Sugar snap peas', 'Baby bok choy', 'Fresh ginger & garlic', 'Tamari soy sauce', 'Sesame seeds']
  },

  // ==========================================
  // HEALTHY SNACKS / FUEL
  // ==========================================
  {
    id: 'sn-1',
    title: 'Crunchy Smoked Paprika Roasted Chickpeas',
    mealType: 'snack',
    diet: 'vegan',
    allergens: [],
    calories: 160,
    protein: 7,
    carbs: 24,
    fat: 4,
    fiber: 6,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=700&q=80',
    desc: 'Crunchy oven-toasted chickpeas dusted with smoked paprika, roasted garlic powder, and Himalayan pink salt. High fiber satisfaction.',
    portion: '1 ramekin: 1/2 cup (approx 65g) roasted crunchy chickpeas.',
    portionGuide: '1 small cupped hand (approx 1 handful)',
    ingredients: ['Cooked chickpeas', 'Smoked paprika', 'Garlic powder', 'Cold pressed olive oil mist', 'Himalayan salt']
  },
  {
    id: 'sn-2',
    title: 'Hard-Boiled Pasture Egg & Sliced Avocado',
    mealType: 'snack',
    diet: 'vegetarian',
    allergens: ['eggs'],
    calories: 190,
    protein: 13,
    carbs: 5,
    fat: 14,
    fiber: 4,
    prepTime: '5 mins',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    desc: 'Soft-boiled pasture egg sliced and paired with a quarter sliced ripe avocado, cracked pepper, and crunchy baby Persian cucumbers.',
    portion: '1 snack plate: 1 large hard-boiled egg + 1/4 Hass avocado + 2 baby Persian cucumbers.',
    portionGuide: '1 whole egg + 1/2 fist avocado slices + unlimited crunchy cucumber sticks',
    ingredients: ['Pasture egg', 'Hass avocado', 'Persian cucumbers', 'Cracked black pepper', 'Flaky sea salt']
  },
  {
    id: 'sn-3',
    title: 'Greek Yogurt & Walnuts with Pomegranate',
    mealType: 'snack',
    diet: 'vegetarian',
    allergens: ['dairy', 'nuts'],
    calories: 210,
    protein: 17,
    carbs: 15,
    fat: 10,
    fiber: 3,
    prepTime: '4 mins',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
    desc: 'Thick strained plain Greek yogurt topped with crunchy raw California walnuts and ruby pomegranate jewels.',
    portion: '1 small bowl: 1/2 cup (120g) plain Greek yogurt + 5 raw walnut halves + 2 tbsp pomegranate arils.',
    portionGuide: '1 small cupped hand yogurt + 1 thumb walnut pieces',
    ingredients: ['Plain 0% Greek yogurt', 'Raw walnuts', 'Fresh pomegranate arils', 'Ground cinnamon']
  },
  {
    id: 'sn-4',
    title: 'Crisp Apple Slices with Creamy Almond Butter',
    mealType: 'snack',
    diet: 'vegan',
    allergens: ['nuts'],
    calories: 190,
    protein: 5,
    carbs: 23,
    fat: 10,
    fiber: 5,
    prepTime: '3 mins',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=700&q=80',
    desc: 'Crisp tart Granny Smith or Honeycrisp apple wedges paired with pure unsweetened roasted almond butter and cinnamon.',
    portion: '1 plate: 1 medium crisp apple sliced + 1 level tablespoon (16g) raw almond butter.',
    portionGuide: '1 fist apple + 1 thumb almond butter',
    ingredients: ['Crisp apple', 'Raw unsweetened almond butter', 'Ground cinnamon']
  },
  {
    id: 'sn-5',
    title: 'Chilled Chia Seed & Berry Pudding Cup',
    mealType: 'snack',
    diet: 'vegan',
    allergens: [],
    calories: 160,
    protein: 6,
    carbs: 18,
    fat: 7,
    fiber: 8,
    prepTime: '5 mins (make-ahead)',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    desc: 'Silky overnight chia pudding prepared with unsweetened coconut milk, layered with crushed raspberries and raw vanilla.',
    portion: '1 jar (approx 160g): 2 tbsp chia seeds soaked in 1/2 cup coconut milk + 1/4 cup fresh raspberries.',
    portionGuide: '1 small jar + 1 small cupped hand raspberries',
    ingredients: ['Chia seeds', 'Unsweetened coconut milk', 'Fresh raspberries', 'Pure vanilla']
  },
  {
    id: 'sn-6',
    title: 'Cucumber & Smoked Salmon Ribbon Bites',
    mealType: 'snack',
    diet: 'pescatarian',
    allergens: ['seafood'],
    calories: 150,
    protein: 15,
    carbs: 3,
    fat: 8,
    fiber: 1,
    prepTime: '6 mins',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80',
    desc: 'Thin ribbons of English cucumber wrapped around wild smoked salmon with fresh chopped chives and cracked black pepper.',
    portion: '4-5 ribbon bites: 60g smoked wild salmon + 1 whole English cucumber + lemon squeeze.',
    portionGuide: '1 palm smoked salmon wrapped in crunchy cucumbers',
    ingredients: ['English cucumber', 'Wild smoked salmon', 'Fresh chives', 'Lemon squeeze', 'Black pepper']
  }
];

// Calculation Function for Personalized Targets
export function calculateNutritionTargets({
  age = 28,
  gender = 'female',
  weight = 65,
  activityLevel = 'moderate',
  goal = 'weight_loss'
}) {
  const numAge = Math.max(14, Math.min(100, Number(age) || 28));
  const numWeight = Number(weight) || (gender === 'male' ? 76 : 64);
  const height = gender === 'male' ? 176 : 164; // average cm estimate

  // Mifflin-St Jeor formula
  let bmr;
  if (gender === 'male') {
    bmr = 10 * numWeight + 6.25 * height - 5 * numAge + 5;
  } else {
    bmr = 10 * numWeight + 6.25 * height - 5 * numAge - 161;
  }

  const actItem = activityLevels.find((a) => a.id === activityLevel) || activityLevels[2];
  const tdee = Math.round(bmr * actItem.multiplier);

  let targetCalories = tdee;
  let proteinRatio = 0.25;
  let carbRatio = 0.45;
  let fatRatio = 0.30;
  let goalTitle = 'Healthy Maintenance & Vitality';
  let goalBadge = '100% TDEE';
  let goalSummary = 'Calibrated to maintain your natural weight, stabilize energy output, and optimize metabolic wellness.';

  if (goal === 'weight_loss') {
    targetCalories = Math.round(tdee * 0.82); // 18% deficit
    proteinRatio = 0.30;
    carbRatio = 0.40;
    fatRatio = 0.30;
    goalTitle = 'Lean Fat Loss & Caloric Deficit';
    goalBadge = '18% Deficit';
    goalSummary = 'Sustained mild caloric deficit with elevated protein to preserve active muscle while burning body fat.';
  } else if (goal === 'muscle_gain') {
    targetCalories = Math.round(tdee * 1.12); // 12% surplus
    proteinRatio = 0.28;
    carbRatio = 0.47;
    fatRatio = 0.25;
    goalTitle = 'Muscle Growth & Hypertrophy Surplus';
    goalBadge = '12% Surplus';
    goalSummary = 'Clean caloric surplus with high amino acid density to accelerate post-workout recovery and strength.';
  } else if (goal === 'heart_healthy') {
    targetCalories = Math.round(tdee * 0.94);
    proteinRatio = 0.22;
    carbRatio = 0.50;
    fatRatio = 0.28;
    goalTitle = 'Heart Health & Mediterranean Longevity';
    goalBadge = 'Cardio Longevity';
    goalSummary = 'High fiber, omega-3s, and polyphenols to promote cardiovascular elasticity, lower cholesterol, and boost vitality.';
  }

  // Safety bounds
  targetCalories = Math.max(1350, Math.min(3600, targetCalories));

  const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
  const carbGrams = Math.round((targetCalories * carbRatio) / 4);
  const fatGrams = Math.round((targetCalories * fatRatio) / 9);
  const waterLiters = (numWeight * 0.035).toFixed(1);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    proteinGrams,
    carbGrams,
    fatGrams,
    proteinRatio: Math.round(proteinRatio * 100),
    carbRatio: Math.round(carbRatio * 100),
    fatRatio: Math.round(fatRatio * 100),
    waterLiters,
    goalTitle,
    goalBadge,
    goalSummary
  };
}

// Check if a meal is compatible with user's dietary preference
function isDietCompatible(meal, dietPref) {
  if (dietPref === 'omnivore' || !dietPref) return true;
  if (dietPref === 'vegan') return meal.diet === 'vegan';
  if (dietPref === 'vegetarian') return meal.diet === 'vegan' || meal.diet === 'vegetarian';
  if (dietPref === 'pescatarian') {
    return meal.diet === 'vegan' || meal.diet === 'vegetarian' || meal.diet === 'pescatarian';
  }
  if (dietPref === 'low_carb') {
    // Low carb meals: carbs <= 30g or fat >= 14g
    return meal.carbs <= 35;
  }
  return true;
}

// Check if a meal contains any excluded allergens
function isAllergenSafe(meal, allergies = []) {
  if (!allergies || allergies.length === 0) return true;
  for (const allergy of allergies) {
    if (meal.allergens && meal.allergens.includes(allergy)) {
      return false;
    }
  }
  return true;
}

// Filter candidate pool
export function filterCandidateMeals(mealType, dietPref, allergies) {
  let candidates = masterMealLibrary.filter((m) => m.mealType === mealType);

  // Filter by diet
  let dietFiltered = candidates.filter((m) => isDietCompatible(m, dietPref));
  if (dietFiltered.length === 0) {
    // Fallback if too strict
    dietFiltered = candidates;
  }

  // Filter by allergies
  let safeMeals = dietFiltered.filter((m) => isAllergenSafe(m, allergies));

  // If filter eliminates everything, fall back to meals with least allergen collision
  if (safeMeals.length === 0) {
    safeMeals = dietFiltered.filter((m) => {
      const collisions = (m.allergens || []).filter((a) => allergies.includes(a));
      return collisions.length <= 1;
    });
    if (safeMeals.length === 0) {
      safeMeals = dietFiltered;
    }
  }

  return safeMeals;
}

// Generator: Generates either a single Day or 7-Day Plan
export function generatePersonalizedPlan({
  age = 28,
  gender = 'female',
  weight = 65,
  activityLevel = 'moderate',
  goal = 'weight_loss',
  dietPreference = 'omnivore',
  allergies = [],
  planDuration = 'daily' // 'daily' or 'weekly'
}) {
  const targets = calculateNutritionTargets({ age, gender, weight, activityLevel, goal });

  const breakfastPool = filterCandidateMeals('breakfast', dietPreference, allergies);
  const lunchPool = filterCandidateMeals('lunch', dietPreference, allergies);
  const dinnerPool = filterCandidateMeals('dinner', dietPreference, allergies);
  const snackPool = filterCandidateMeals('snack', dietPreference, allergies);

  const getMealByIndex = (pool, index) => {
    return pool[index % pool.length];
  };

  const createDaySchedule = (dayName, dayIndex) => {
    const breakfast = getMealByIndex(breakfastPool, dayIndex);
    const lunch = getMealByIndex(lunchPool, dayIndex + 1);
    const snack = getMealByIndex(snackPool, dayIndex + 2);
    const dinner = getMealByIndex(dinnerPool, dayIndex + 3);

    const totalCals = breakfast.calories + lunch.calories + snack.calories + dinner.calories;
    const totalProtein = breakfast.protein + lunch.protein + snack.protein + dinner.protein;
    const totalCarbs = breakfast.carbs + lunch.carbs + snack.carbs + dinner.carbs;
    const totalFat = breakfast.fat + lunch.fat + snack.fat + dinner.fat;
    const totalFiber = (breakfast.fiber || 0) + (lunch.fiber || 0) + (snack.fiber || 0) + (dinner.fiber || 0);

    return {
      day: dayName,
      dayIndex,
      meals: {
        breakfast: {
          ...breakfast,
          timeLabel: 'Breakfast • 8:00 AM'
        },
        lunch: {
          ...lunch,
          timeLabel: 'Lunch • 1:00 PM'
        },
        snack: {
          ...snack,
          timeLabel: 'Power Fuel Snack • 4:30 PM'
        },
        dinner: {
          ...dinner,
          timeLabel: 'Dinner • 7:30 PM'
        }
      },
      dayTotals: {
        calories: totalCals,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        fiber: totalFiber
      }
    };
  };

  const daysSchedule = weekDays.map((dayName, idx) => createDaySchedule(dayName, idx));

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      userProfile: {
        age,
        gender,
        weight,
        activityLevel,
        goal,
        dietPreference,
        allergies,
        planDuration
      },
      targets
    },
    days: daysSchedule
  };
}

// Swaps a single meal for an alternate candidate
export function getAlternateMeal(currentMealId, mealType, dietPreference, allergies) {
  const candidates = filterCandidateMeals(mealType, dietPreference, allergies);
  const alternatives = candidates.filter((m) => m.id !== currentMealId);
  if (alternatives.length > 0) {
    const randomIdx = Math.floor(Math.random() * alternatives.length);
    return alternatives[randomIdx];
  }
  return candidates[0] || masterMealLibrary[0];
}

// Aggregates smart grocery shopping list from meals
export function generateSmartGroceryList(daysList) {
  const ingredientsMap = new Map();

  daysList.forEach((dayObj) => {
    const meals = Object.values(dayObj.meals);
    meals.forEach((meal) => {
      if (meal.ingredients && Array.isArray(meal.ingredients)) {
        meal.ingredients.forEach((ing) => {
          const cleanName = ing.trim();
          if (!ingredientsMap.has(cleanName)) {
            ingredientsMap.set(cleanName, {
              name: cleanName,
              category: categorizeIngredient(cleanName),
              count: 1
            });
          } else {
            ingredientsMap.get(cleanName).count += 1;
          }
        });
      }
    });
  });

  const list = Array.from(ingredientsMap.values());
  // Group by category
  const categories = {
    'Fresh Produce': [],
    'Proteins & Seafood': [],
    'Pantry, Grains & Seeds': [],
    'Dairy, Oils & Extras': []
  };

  list.forEach((item) => {
    if (categories[item.category]) {
      categories[item.category].push(item);
    } else {
      categories['Pantry, Grains & Seeds'].push(item);
    }
  });

  return categories;
}

function categorizeIngredient(name) {
  const lower = name.toLowerCase();
  if (
    lower.includes('spinach') ||
    lower.includes('tomato') ||
    lower.includes('blueberr') ||
    lower.includes('raspberr') ||
    lower.includes('apple') ||
    lower.includes('mango') ||
    lower.includes('cucumber') ||
    lower.includes('asparagus') ||
    lower.includes('broccoli') ||
    lower.includes('pepper') ||
    lower.includes('zucchini') ||
    lower.includes('garlic') ||
    lower.includes('lemon') ||
    lower.includes('carrot') ||
    lower.includes('arugula') ||
    lower.includes('cabbage') ||
    lower.includes('mushroom') ||
    lower.includes('bok choy') ||
    lower.includes('avocado')
  ) {
    return 'Fresh Produce';
  }
  if (
    lower.includes('chicken') ||
    lower.includes('salmon') ||
    lower.includes('tuna') ||
    lower.includes('turkey') ||
    lower.includes('egg') ||
    lower.includes('tofu') ||
    lower.includes('lentil') ||
    lower.includes('chickpea') ||
    lower.includes('bean') ||
    lower.includes('edamame') ||
    lower.includes('protein')
  ) {
    return 'Proteins & Seafood';
  }
  if (
    lower.includes('yogurt') ||
    lower.includes('feta') ||
    lower.includes('milk') ||
    lower.includes('olive oil') ||
    lower.includes('sesame oil') ||
    lower.includes('dressing') ||
    lower.includes('tahini')
  ) {
    return 'Dairy, Oils & Extras';
  }
  return 'Pantry, Grains & Seeds';
}
