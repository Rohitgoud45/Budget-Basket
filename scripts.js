// JavaScript for budget tracking and navigation
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    updateBudget();
    document.getElementById('budget-form').addEventListener('submit', updateBudgetInput);
    document.getElementById('expense-form').addEventListener('submit', addExpense);
});

let budget = 0;
let spent = 0;

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function updateBudget() {
    const remaining = budget - spent;
    document.getElementById('budget').textContent = `$${budget}`;
    document.getElementById('spent').textContent = `$${spent}`;
    document.getElementById('remaining').textContent = `$${remaining}`;
}

function updateBudgetInput(event) {
    event.preventDefault();
    budget = parseFloat(document.getElementById('budget-input').value);
    updateBudget();
}

function addExpense(event) {
    event.preventDefault();
    const expense = parseFloat(document.getElementById('expense-input').value);
    spent += expense;
    updateBudget();
    document.getElementById('expense-form').reset();
}

// JavaScript for price comparison
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('price-form').addEventListener('submit', addPrice);
});

let priceData = [];

function addPrice(event) {
    event.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('price').value);
    const source = document.getElementById('source').value;

    priceData.push({ itemName, price, source });
    displayPriceComparison();
    document.getElementById('price-form').reset();
}

function displayPriceComparison() {
    const priceComparisonList = document.getElementById('price-comparison');
    priceComparisonList.innerHTML = '';

    priceData.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${data.itemName} - $${data.price.toFixed(2)} (${data.source})`;
        priceComparisonList.appendChild(listItem);
    });
}

// JavaScript for meal planning
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('meal-form').addEventListener('submit', addMeal);
});

let mealPlans = [];

function addMeal(event) {
    event.preventDefault();
    const meal = document.getElementById('meal').value;
    mealPlans.push(meal);
    displayMeals();
    document.getElementById('meal-form').reset();
}

function displayMeals() {
    const mealPlanList = document.getElementById('meal-plan');
    mealPlanList.innerHTML = '';

    mealPlans.forEach((meal, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = meal;
        mealPlanList.appendChild(listItem);
    });
}


// JavaScript for smart recommendations
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('recommendation-form').addEventListener('submit', addRecommendation);
});

let recommendations = [];

function addRecommendation(event) {
    event.preventDefault();
    const item = document.getElementById('recommendation-input').value;
    recommendations.push(item);
    displayRecommendations();
    document.getElementById('recommendation-form').reset();
}

function displayRecommendations() {
    const recommendationList = document.getElementById('recommendations');
    recommendationList.innerHTML = '';

    recommendations.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        recommendationList.appendChild(listItem);
    });
}


// JavaScript for smooth navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});


// JavaScript for data persistence
document.addEventListener('DOMContentLoaded', function() {
    loadBudgetData();
    loadPriceData();
    loadMealPlans();
    loadRecommendations();
    // Other form event listeners
});

function saveBudgetData() {
    localStorage.setItem('budget', budget);
    localStorage.setItem('spent', spent);
}

function loadBudgetData() {
    budget = parseFloat(localStorage.getItem('budget')) || 0;
    spent = parseFloat(localStorage.getItem('spent')) || 0;
    updateBudget();
}

function savePriceData() {
    localStorage.setItem('priceData', JSON.stringify(priceData));
}

function loadPriceData() {
    priceData = JSON.parse(localStorage.getItem('priceData')) || [];
    displayPriceComparison();
}

function saveMealPlans() {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
}

function loadMealPlans() {
    mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || [];
    displayMeals();
}

function saveRecommendations() {
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
}

function loadRecommendations() {
    recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
    displayRecommendations();
}


function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.style.opacity = '0'; // Ensure smooth transition
    });

    // Remove the active class from all menu items
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.style.opacity = '1'; // Fade-in effect
    }

    // Set the active class for the clicked link
    const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Initialize by showing the home section by default
window.onload = () => {
    showSection('home');
};

// Form handling (for budget, expenses, etc.)
document.getElementById('budget-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const budget = document.getElementById('budget-input').value;
    document.getElementById('budget').textContent = `$${budget}`;
    updateRemaining();
});

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const expense = document.getElementById('expense-input').value;
    const currentSpent = parseFloat(document.getElementById('spent').textContent.replace('$', '')) || 0;
    const newSpent = currentSpent + parseFloat(expense);
    document.getElementById('spent').textContent = `$${newSpent}`;
    updateRemaining();
});

function updateRemaining() {
    const budget = parseFloat(document.getElementById('budget').textContent.replace('$', '')) || 0;
    const spent = parseFloat(document.getElementById('spent').textContent.replace('$', '')) || 0;
    const remaining = budget - spent;
    document.getElementById('remaining').textContent = `$${remaining}`;
}

// Price Comparison Form Handling
document.getElementById('price-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const price = document.getElementById('price').value;
    const source = document.getElementById('source').value;
    
    const listItem = document.createElement('li');
    listItem.textContent = `${itemName}: $${price} from ${source}`;
    document.getElementById('price-comparison').appendChild(listItem);
});

// Meal Planning Form Handling
document.getElementById('meal-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const meal = document.getElementById('meal').value;
    
    const listItem = document.createElement('li');
    listItem.textContent = meal;
    document.getElementById('meal-plan').appendChild(listItem);
});

// Recommendations Form Handling
document.getElementById('recommendation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const recommendation = document.getElementById('recommendation-input').value;
    
    const listItem = document.createElement('li');
    listItem.textContent = recommendation;
    document.getElementById('recommendations').appendChild(listItem);
});
