// Explore Recipes button smooth scroll and focus
const exploreBtn = document.querySelector(".hero button");
const searchInput = document.getElementById("recipe-search");
const clearBtn = document.getElementById("clear-search");
const categoryCards = document.querySelectorAll(".card");
const recipeCards = document.querySelectorAll(".recipe-card");
const categoriesSection = document.querySelector(".categories");
const recipesSections = document.querySelectorAll(".recipes-section");
const noResults = document.getElementById("no-results");

if (exploreBtn && searchInput) {
    exploreBtn.addEventListener("click", () => {
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        searchInput.focus();
    });
}

// Search and filter logic
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (clearBtn) {
            clearBtn.style.display = query.length > 0 ? "flex" : "none";
        }
        
        let categoryMatches = 0;
        let recipeMatches = 0;
        
        // Filter category cards
        categoryCards.forEach(card => {
            const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
            const desc = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
            
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = "block";
                categoryMatches++;
            } else {
                card.style.display = "none";
            }
        });
        
        // Filter recipe cards
        recipeCards.forEach(card => {
            const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
            const desc = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
            const tags = card.dataset.category ? card.dataset.category.toLowerCase() : "";
            
            if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
                card.style.display = "block";
                recipeMatches++;
            } else {
                card.style.display = "none";
            }
        });
        
        // Show/hide sections depending on matches
        if (categoriesSection) {
            categoriesSection.style.display = (categoryMatches > 0 || (categoryMatches === 0 && recipeMatches === 0)) ? "block" : "none";
        }
        
        // Check each recipes-section individually
        recipesSections.forEach(section => {
            const sectionCards = section.querySelectorAll(".recipe-card");
            let hasVisibleCard = false;
            sectionCards.forEach(card => {
                if (card.style.display !== "none") {
                    hasVisibleCard = true;
                }
            });
            section.style.display = hasVisibleCard ? "block" : "none";
        });
        
        // Show/hide no results message
        if (noResults) {
            noResults.style.display = (categoryMatches === 0 && recipeMatches === 0) ? "block" : "none";
        }
    });
}

// Clear button logic
if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearBtn.style.display = "none";
        searchInput.focus();
        
        // Show all cards and sections
        categoryCards.forEach(card => {
            card.style.display = "block";
        });
        recipeCards.forEach(card => {
            card.style.display = "block";
        });
        
        if (categoriesSection) {
            categoriesSection.style.display = "block";
        }
        recipesSections.forEach(section => {
            section.style.display = "block";
        });
        if (noResults) {
            noResults.style.display = "none";
        }
    });
}

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}