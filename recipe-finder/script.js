// API Configuration
const API_KEY = '7b40adc564bc4c1d9c2fb67d823ac20e'; // Spoonacular API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

// DOM Elements
const ingredientInput = document.getElementById('ingredient-input');
const addIngredientBtn = document.getElementById('add-ingredient');
const selectedIngredients = document.getElementById('selected-ingredients');
const searchBtn = document.getElementById('search-btn');
const resultsGrid = document.getElementById('results-grid');
const noResults = document.getElementById('no-results');
const loading = document.getElementById('loading');
const recipeModal = document.getElementById('recipe-modal');
const modalBody = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');

// State
let ingredients = [];

// Event Listeners
addIngredientBtn.addEventListener('click', addIngredient);
ingredientInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addIngredient();
});
searchBtn.addEventListener('click', searchRecipes);
closeModal.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.style.display = 'none';
    }
});

// Functions
function addIngredient() {
    const ingredient = ingredientInput.value.trim().toLowerCase();
    if (ingredient && !ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        updateIngredientsList();
        ingredientInput.value = '';
    }
}

function updateIngredientsList() {
    selectedIngredients.innerHTML = ingredients.map(ingredient => `
        <div class="ingredient-tag">
            ${ingredient}
            <button onclick="removeIngredient('${ingredient}')">&times;</button>
        </div>
    `).join('');
}

function removeIngredient(ingredient) {
    ingredients = ingredients.filter(i => i !== ingredient);
    updateIngredientsList();
}

async function searchRecipes() {
    if (ingredients.length === 0) {
        alert('Please add at least one ingredient');
        return;
    }

    showLoading();
    hideResults();

    try {
        const diet = document.getElementById('diet-filter').value;
        const cuisine = document.getElementById('cuisine-filter').value;
        const mealType = document.getElementById('meal-type').value;

        const queryParams = new URLSearchParams({
            apiKey: API_KEY,
            ingredients: ingredients.join(','),
            number: 12,
            addRecipeInformation: true,
            fillIngredients: true,
            ...(diet && { diet }),
            ...(cuisine && { cuisine }),
            ...(mealType && { type: mealType })
        });

        const response = await fetch(`${BASE_URL}/findByIngredients?${queryParams}`);
        const data = await response.json();

        if (data.length === 0) {
            showNoResults();
        } else {
            displayResults(data);
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Error fetching recipes. Please try again.');
    } finally {
        hideLoading();
    }
}

function displayResults(recipes) {
    resultsGrid.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <div class="recipe-info">
                    <span>${recipe.usedIngredientCount} ingredients used</span>
                    <span>${recipe.missedIngredientCount} ingredients missing</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.diets?.map(diet => `<span class="recipe-tag">${diet}</span>`).join('') || ''}
                </div>
            </div>
        </div>
    `).join('');
}

async function showRecipeDetails(recipeId) {
    showLoading();
    try {
        const response = await fetch(`${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`);
        const recipe = await response.json();

        modalBody.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin: 1rem 0;">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                <div>
                    <h3>Ingredients</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${recipe.extendedIngredients.map(ing => `
                            <li style="margin: 0.5rem 0;">
                                <span style="font-weight: bold;">${ing.amount} ${ing.unit}</span> ${ing.originalName}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div>
                    <h3>Instructions</h3>
                    <ol style="padding-left: 1.5rem;">
                        ${recipe.analyzedInstructions[0]?.steps.map(step => `
                            <li style="margin: 0.5rem 0;">${step.step}</li>
                        `).join('') || 'No instructions available'}
                    </ol>
                </div>
            </div>

            <div style="margin-top: 2rem;">
                <h3>Additional Information</h3>
                <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                ${recipe.diets?.length ? `<p><strong>Diets:</strong> ${recipe.diets.join(', ')}</p>` : ''}
                ${recipe.cuisines?.length ? `<p><strong>Cuisines:</strong> ${recipe.cuisines.join(', ')}</p>` : ''}
            </div>

            <div style="margin-top: 2rem;">
                <a href="${recipe.sourceUrl}" target="_blank" class="btn primary">View Original Recipe</a>
            </div>
        `;

        recipeModal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        alert('Error fetching recipe details. Please try again.');
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.style.display = 'block';
    resultsGrid.style.display = 'none';
    noResults.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showNoResults() {
    noResults.style.display = 'block';
    resultsGrid.style.display = 'none';
}

function hideResults() {
    resultsGrid.style.display = 'grid';
    noResults.style.display = 'none';
}