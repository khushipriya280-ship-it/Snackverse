// Explore Recipes button smooth scroll and focus
const exploreBtn = document.querySelector(".hero button");
const searchInput = document.getElementById("recipe-search");
const clearBtn = document.getElementById("clear-search");
const categoryCards = document.querySelectorAll(".card");
const recipeCards = document.querySelectorAll(".recipe-card");
const vibeCategories = document.querySelectorAll(".vibe-category");
const categoriesSection = document.querySelector(".categories");
const recipesSection = document.querySelector(".recipes-section");
const noResults = document.getElementById("no-results");

if (exploreBtn && searchInput) {
    exploreBtn.addEventListener("click", () => {
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        searchInput.focus();
    });
}

// Recipe Database with descriptive metadata and ingredients checklists
const RECIPE_DB = {
    "croffle": {
        title: "Golden Sweet Croffle",
        desc: "Flaky croissant dough pressed into a waffle maker, sweet and crispy.",
        category: "The Midnight Cravings",
        image: "croffle.png",
        link: "golden-sweet-croffle.html",
        ingredients: [
            "2 Pre-made Raw Croissant Pastries (fresh or thawed frozen)",
            "2 tbsp Granulated Sugar or Pearl Sugar (for coating)",
            "1 tbsp Butter (melted, for brushing waffle iron)",
            "Whipped Cream (for serving)",
            "Fresh Berries (strawberries, blueberries, or raspberries)",
            "Maple Syrup or Honey (for drizzling)",
            "Powdered Sugar (optional, for dusting)"
        ]
    },
    "tanghulu": {
        title: "Strawberry Tanghulu",
        desc: "Crunchy, glass-like sugar shell-coated sweet strawberries.",
        category: "The Midnight Cravings",
        image: "tanghulu.png",
        link: "strawberry-tanghulu.html",
        ingredients: [
            "10–12 Fresh, Firm Strawberries (washed and dried)",
            "2 cups Granulated White Sugar",
            "1 cup Water",
            "4–6 Wooden Bamboo Skewers",
            "Large bowl of Ice Cubes and Cold Water (for ice bath)"
        ]
    },
    "pizza": {
        title: "Homemade Cheesy Pizza",
        desc: "Crispy, restaurant-style cheese pizza made with simple ingredients.",
        category: "Swicy & Savory Hacks",
        image: "pizza_recipe.png",
        link: "pizza.html",
        ingredients: [
            "250g Pizza Dough (store-bought or homemade)",
            "1/2 cup Premium Pizza Tomato Sauce",
            "1.5 cups Shredded Mozzarella Cheese",
            "1 tbsp Olive Oil (for brushing the crust)",
            "Fresh Basil Leaves (for garnish)",
            "1 tsp Oregano and Red Chili Flakes",
            "Semolina or Cornmeal (for dusting)"
        ]
    },
    "pesto-eggs": {
        title: "Crispy Pesto Eggs",
        desc: "Sunny-side up eggs cooked in flavorful, aromatic basil pesto.",
        category: "Swicy & Savory Hacks",
        image: "pesto_eggs.png",
        link: "crispy-pesto-eggs.html",
        ingredients: [
            "2 Large Eggs",
            "2–3 tbsp Basil Pesto (fresh or store-bought)",
            "1 slice Sourdough Bread (or bread of choice)",
            "1 tbsp Cream Cheese or Goat Cheese (optional)",
            "A pinch of Red Pepper Flakes (chili flakes)",
            "Salt and Freshly Ground Black Pepper (to taste)",
            "1 tbsp Fresh Grated Parmesan Cheese"
        ]
    },
    "feta-pasta": {
        title: "Baked Feta Pasta",
        desc: "Rich, creamy oven-baked feta cheese and sweet cherry tomato pasta.",
        category: "Swicy & Savory Hacks",
        image: "feta_pasta.png",
        link: "baked-feta-pasta.html",
        ingredients: [
            "200g (7 oz) Block of Feta Cheese (Greek feta)",
            "500g (18 oz) Sweet Cherry Tomatoes",
            "250g (8.8 oz) Cavatappi or Penne Pasta",
            "1/2 cup Extra Virgin Olive Oil",
            "3–4 Cloves of Garlic (minced or smashed)",
            "1/2 tsp Dried Oregano",
            "A handful of Fresh Basil Leaves (chopped)",
            "Salt and Freshly Ground Black Pepper (to taste)",
            "A pinch of Red Pepper Flakes (optional)"
        ]
    },
    "birria-tacos": {
        title: "Beef Birria Tacos",
        desc: "Slow-cooked beef in savory consommé, folded in crispy cheese tacos.",
        category: "Swicy & Savory Hacks",
        image: "birria_tacos.png",
        link: "#",
        ingredients: [
            "1 kg (2.2 lbs) Beef Chuck Roast or Brisket",
            "4 Dried Guajillo Chilies (stemmed and seeded)",
            "2 Dried Ancho Chilies (stemmed and seeded)",
            "1 Medium Onion & 4 Cloves Garlic",
            "2 cups Beef Broth (for simmering)",
            "2 cups Shredded Oaxaca or Monterey Jack Cheese",
            "12 Corn Tortillas (dipped in consommé)",
            "Fresh Cilantro and Lime Wedges (for serving)"
        ]
    },
    "ramen-hack": {
        title: "Kewpie Ramen Hack",
        desc: "Creamy, rich garlic-infused egg and mayo upgraded instant ramen.",
        category: "Swicy & Savory Hacks",
        image: "ramen_hack.png",
        link: "kewpie-ramen-hack.html",
        ingredients: [
            "1 packet of Instant Ramen (Shin Ramyun, Sapporo, etc.)",
            "1 raw Egg",
            "1–2 tbsp Japanese Kewpie Mayonnaise",
            "1 clove of Garlic (finely grated or minced)",
            "2 cups Water (for boiling)",
            "1 Green Onion (finely sliced)",
            "1 Soft-Boiled Egg (halved)",
            "1 slice of American Cheese",
            "1 tsp Toasted Sesame Seeds",
            "1 tsp Chili Oil or Red Pepper Flakes (for heat)"
        ]
    },
    "dalgona-coffee": {
        title: "Dalgona Coffee",
        desc: "Frothy whipped coffee foam served over iced fresh creamy milk.",
        category: "Aesthetic Sips",
        image: "dalgona_coffee.png",
        link: "dalgona-coffee.html",
        ingredients: [
            "2 tbsp Instant Coffee powder (must be instant)",
            "2 tbsp Granulated Sugar",
            "2 tbsp Boiling Hot Water",
            "1 cup Cold Whole Milk (or milk of choice)",
            "4–5 Ice Cubes"
        ]
    }
};

// Ingredients checklist modal interactive logic
const modalOverlay = document.getElementById("recipe-modal");
const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalIngredientsList = document.getElementById("modal-ingredients-list");
const modalRecipeLink = document.getElementById("modal-recipe-link");
const closeModalBtn = document.getElementById("close-modal");

function openIngredientsModal(recipeId) {
    const data = RECIPE_DB[recipeId];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    // Handle birria tacos / placeholder recipe link
    if (data.link === "#") {
        modalRecipeLink.textContent = "Recipe Coming Soon!";
        modalRecipeLink.style.pointerEvents = "none";
        modalRecipeLink.style.opacity = "0.5";
        modalRecipeLink.href = "#";
    } else {
        modalRecipeLink.textContent = "Cook This Snack!";
        modalRecipeLink.style.pointerEvents = "auto";
        modalRecipeLink.style.opacity = "1";
        modalRecipeLink.href = data.link;
    }

    // Generate checklist elements
    modalIngredientsList.innerHTML = "";
    data.ingredients.forEach((ing, idx) => {
        const li = document.createElement("li");
        
        const label = document.createElement("label");
        label.className = "checklist-item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `modal-check-${recipeId}-${idx}`;
        
        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";
        
        const textSpan = document.createElement("span");
        textSpan.className = "item-text";
        textSpan.textContent = ing;
        
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        label.appendChild(textSpan);
        li.appendChild(label);
        
        modalIngredientsList.appendChild(li);
    });

    // Toggle overlay visibility
    if (modalOverlay) {
        modalOverlay.classList.add("open");
        modalOverlay.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";
}

function closeIngredientsModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove("open");
        modalOverlay.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

// Bind clicks on recipe cards to trigger the modal instead of navigating directly
recipeCards.forEach(card => {
    card.addEventListener("click", (e) => {
        const recipeId = card.dataset.recipeId;
        if (recipeId && RECIPE_DB[recipeId]) {
            e.preventDefault();
            openIngredientsModal(recipeId);
        }
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeIngredientsModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeIngredientsModal();
        }
    });
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
        closeIngredientsModal();
    }
});

// Search and filter logic across categories and vibe categories
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        
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
        
        // Filter recipe cards grouped under vibe categories
        vibeCategories.forEach(vibe => {
            let sectionMatches = 0;
            const cards = vibe.querySelectorAll(".recipe-card");
            
            cards.forEach(card => {
                const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
                const desc = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
                const tags = card.dataset.category ? card.dataset.category.toLowerCase() : "";
                
                if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
                    card.style.display = "block";
                    sectionMatches++;
                    recipeMatches++;
                } else {
                    card.style.display = "none";
                }
            });
            
            // Hide the entire vibe category section if it has no match
            vibe.style.display = sectionMatches > 0 ? "block" : "none";
        });
        
        // Show/hide sections depending on matches
        if (categoriesSection) {
            categoriesSection.style.display = categoryMatches > 0 ? "block" : "none";
        }
        if (recipesSection) {
            recipesSection.style.display = recipeMatches > 0 ? "block" : "none";
        }
        
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
        
        // Show all category cards
        categoryCards.forEach(card => {
            card.style.display = "block";
        });
        
        // Show all vibe categories and internal cards
        vibeCategories.forEach(vibe => {
            vibe.style.display = "block";
            const cards = vibe.querySelectorAll(".recipe-card");
            cards.forEach(card => {
                card.style.display = "block";
            });
        });
        
        if (categoriesSection) {
            categoriesSection.style.display = "block";
        }
        if (recipesSection) {
            recipesSection.style.display = "block";
        }
        if (noResults) {
            noResults.style.display = "none";
        }
    });
}

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}