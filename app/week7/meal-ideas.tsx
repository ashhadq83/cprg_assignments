"use client";

import { useState, useEffect } from "react";
import { Meal } from "./types";

// Extended interface for meal details including ingredients
interface MealDetails extends Meal {
  ingredients: string[];
}

interface MealIdeasProps {
  ingredient: string | null;
}

// First API function - gets basic meal list
async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) return [];
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await res.json();
    return data.meals ?? [];
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

// Second API function - gets meal details including ingredients
async function fetchMealDetails(mealId: string): Promise<MealDetails | null> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    );
    const data = await res.json();
    const meal = data.meals?.[0];

    if (!meal) return null;

    // Extract ingredients (up to 20 possible ingredients)
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      // Stop if no more ingredients
      if (!ingredient || ingredient.trim() === "") break;

      // Format: "measure ingredient" (e.g., "2 cups flour")
      const formattedIngredient =
        measure && measure.trim() !== ""
          ? `${measure} ${ingredient}`.trim()
          : ingredient;

      ingredients.push(formattedIngredient);
    }

    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      ingredients,
    };
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [mealDetails, setMealDetails] = useState<Record<string, MealDetails>>(
    {},
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>(
    {},
  );

  // Load initial meal list
  useEffect(() => {
    if (!ingredient) {
      setMeals([]);
      setExpandedMealId(null);
      setMealDetails({});
      return;
    }

    const loadMealIdeas = async () => {
      setLoading(true);
      setExpandedMealId(null);
      setMealDetails({});
      try {
        const result = await fetchMealIdeas(ingredient);
        setMeals(result);
      } catch (error) {
        console.error("Error in loadMealIdeas:", error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    loadMealIdeas();
  }, [ingredient]);

  // Handle meal expansion/collapse
  const handleMealToggle = async (meal: Meal) => {
    if (expandedMealId === meal.idMeal) {
      // Collapse if already expanded
      setExpandedMealId(null);
    } else {
      // Expand new meal
      setExpandedMealId(meal.idMeal);

      // Load details if not already loaded
      if (!mealDetails[meal.idMeal]) {
        setLoadingDetails((prev) => ({ ...prev, [meal.idMeal]: true }));
        try {
          const details = await fetchMealDetails(meal.idMeal);
          if (details) {
            setMealDetails((prev) => ({ ...prev, [meal.idMeal]: details }));
          }
        } catch (error) {
          console.error("Error loading meal details:", error);
        } finally {
          setLoadingDetails((prev) => ({ ...prev, [meal.idMeal]: false }));
        }
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full lg:w-[600px] xl:w-[700px] max-w-full mx-auto border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-3xl">🍽️</span>
        Meal Ideas
      </h2>

      {/* Loading state for meal list */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="spinner"></div>
          <p className="text-gray-300 ml-3">Loading meal ideas...</p>
        </div>
      )}

      {/* No ingredient selected */}
      {!loading && !ingredient && (
        <div className="bg-white/5 rounded-lg p-8 text-center">
          <span className="text-5xl mb-3 block">👆</span>
          <p className="text-gray-300">
            Select an item from your shopping list to see meal ideas
          </p>
        </div>
      )}

      {/* Ingredient selected but no meals found */}
      {!loading && ingredient && meals.length === 0 && (
        <div className="bg-white/5 rounded-lg p-8 text-center">
          <span className="text-5xl mb-3 block">😕</span>
          <p className="text-gray-300">No meal ideas found for</p>
          <p className="text-white font-semibold mt-2 bg-blue-600/30 px-4 py-2 rounded-full inline-block">
            {ingredient}
          </p>
        </div>
      )}

      {/* Meals found - show as dropdown list */}
      {!loading && meals.length > 0 && (
        <>
          <div className="bg-blue-600/20 rounded-lg p-4 mb-4 border border-blue-500/30">
            <p className="text-white">
              Here are some meal ideas using{" "}
              <span className="font-bold text-blue-300 bg-blue-800/30 px-3 py-1 rounded-full inline-block ml-1">
                {ingredient}
              </span>
              :
            </p>
          </div>

          <div className="space-y-3 w-full">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Meal header - clickable */}
                <div
                  className={`p-4 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 flex items-center justify-between w-full group ${
                    expandedMealId === meal.idMeal
                      ? "border-b border-white/10 bg-white/10"
                      : ""
                  }`}
                  onClick={() => handleMealToggle(meal)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all duration-300"></div>
                    </div>
                    <h3 className="text-white font-medium truncate group-hover:text-blue-300 transition-colors">
                      {meal.strMeal}
                    </h3>
                  </div>
                  <span className="text-2xl text-white/70 group-hover:text-white transition-colors flex-shrink-0 ml-2">
                    {expandedMealId === meal.idMeal ? "▼" : "▶"}
                  </span>
                </div>

                {/* Expanded content - ingredients */}
                {expandedMealId === meal.idMeal && (
                  <div className="p-5 bg-white/5 animate-fade-in">
                    {loadingDetails[meal.idMeal] ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="spinner-small"></div>
                        <p className="text-gray-300 ml-3">
                          Loading ingredients...
                        </p>
                      </div>
                    ) : mealDetails[meal.idMeal] ? (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="text-xl">📋</span>
                          Ingredients:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {mealDetails[meal.idMeal].ingredients.map(
                            (ingredient, index) => (
                              <li
                                key={index}
                                className="text-gray-200 text-sm flex items-start bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                              >
                                <span className="text-blue-400 mr-2 group-hover:scale-110 transition-transform">
                                  •
                                </span>
                                <span className="flex-1">{ingredient}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-300 text-center py-4">
                        No ingredients found
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
