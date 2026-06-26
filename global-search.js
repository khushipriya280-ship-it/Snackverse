// Run theme initialization immediately when script loads to prevent flashes
(function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
    } else if (savedTheme === "light") {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("recipe-search");
    const clearBtn = document.getElementById("clear-search");
    const searchIcon = document.querySelector(".nav-search-wrapper .search-icon") || document.querySelector(".search-icon");

    // Dynamic Theme Toggle Injection
    const navActions = document.querySelector(".nav-actions");
    if (navActions) {
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "theme-toggle";
        toggleBtn.setAttribute("aria-label", "Toggle dark mode");
        toggleBtn.innerHTML = `
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
        `;
        
        const navUl = navActions.querySelector("ul");
        if (navUl) {
            navActions.insertBefore(toggleBtn, navUl);
        } else {
            navActions.appendChild(toggleBtn);
        }

        toggleBtn.addEventListener("click", () => {
            const isDark = document.documentElement.classList.contains("dark-mode");
            const isLight = document.documentElement.classList.contains("light-mode");
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            
            let shouldBeDark;
            if (isDark) {
                shouldBeDark = false;
            } else if (isLight) {
                shouldBeDark = true;
            } else {
                // Currently matching system theme
                shouldBeDark = !systemPrefersDark;
            }
            
            if (shouldBeDark) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }

    if (searchInput) {
        // Set cursor pointer on search icon to make it look clickable
        if (searchIcon) {
            searchIcon.style.cursor = "pointer";
            searchIcon.addEventListener("click", () => {
                const query = searchInput.value.trim();
                const path = window.location.pathname;
                if (!path.endsWith("searched.html")) {
                    window.location.href = `searched.html?q=${encodeURIComponent(query)}`;
                }
            });
        }

        // Handle enter key press
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                const path = window.location.pathname;
                if (!path.endsWith("searched.html")) {
                    window.location.href = `searched.html?q=${encodeURIComponent(query)}`;
                } else {
                    e.preventDefault(); // Already on search page, keep real-time results
                }
            }
        });

        // For individual recipe pages, manage the clear button visibility and clearing
        // Note: index.html, pizza.html, burger.html, and fries.html have their own complex inline search / filter handlers.
        // We do not want to override their clear button or input logic, so we only handle it if they don't have custom logic
        const path = window.location.pathname;
        const isMainPage = path.endsWith("index.html") || 
                           path.endsWith("pizza.html") || 
                           path.endsWith("burger.html") || 
                           path.endsWith("fries.html") || 
                           path.endsWith("searched.html") || 
                           path === "/" || 
                           path.endsWith("/");

        if (!isMainPage && clearBtn) {
            searchInput.addEventListener("input", () => {
                const query = searchInput.value.trim();
                clearBtn.style.display = query.length > 0 ? "flex" : "none";
            });

            clearBtn.addEventListener("click", () => {
                searchInput.value = "";
                clearBtn.style.display = "none";
                searchInput.focus();
            });
        }
    }
});
