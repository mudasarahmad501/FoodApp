const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Fetch Recipe Function //
const FetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipies...</h2>"
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        // console.log(response.meals[0]);

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            // console.log(meal);
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</P>
            <p>Belongs to <span>${meal.strCategory}</span> Category</P>
        `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // adding event listener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })

            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Sorry this meal is not exist...</h2>"
    }
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <hr>
    <h3 class="inghead">Ingredients: </h3>
    <ul class="ingList">${fetchIngredients(meal)}</ul>
    <hr>
    <div>
        <h3>Instructions:</h3>
        <p class="instructions">${meal.strInstructions}</p>
    </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

// Function to fetch ingredients
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientList;
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    FetchRecipe(searchInput);
    // console.log('Hello Mudasar');
})