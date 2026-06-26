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
    const currentScript = document.currentScript;
    const isSubPage = currentScript && currentScript.getAttribute('src') && currentScript.getAttribute('src').startsWith('../');
    const pathPrefix = isSubPage ? '../' : '';
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
                    window.location.href = `${pathPrefix}searched.html?q=${encodeURIComponent(query)}`;
                }
            });
        }

        // Handle enter key press
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                const path = window.location.pathname;
                if (!path.endsWith("searched.html")) {
                    window.location.href = `${pathPrefix}searched.html?q=${encodeURIComponent(query)}`;
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

    // Dynamic Professional Footer Injection
    const footer = document.querySelector("footer");
    if (footer) {
        footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-brand">
                    <div class="logo"><i data-lucide="chef-hat"></i> SnackVerse</div>
                    <p class="footer-description">Level up your late-night kitchen game with Gen Z's favorite trending comfort food recipes. Quick, simple, and satisfying.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Instagram"><i data-lucide="instagram"></i></a>
                        <a href="#" aria-label="YouTube"><i data-lucide="youtube"></i></a>
                        <a href="#" aria-label="TikTok">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                        </a>
                        <a href="#" aria-label="Twitter"><i data-lucide="twitter"></i></a>
                    </div>
                </div>
                <div class="footer-links-grid">
                    <div class="footer-links-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="${pathPrefix}index.html">Home</a></li>
                            <li><a href="${pathPrefix}index.html#trending-recipes">Recipes</a></li>
                            <li><a href="#">Guided Cooking</a></li>
                            <li><a href="${pathPrefix}index.html#about">About</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Vibe Categories</h4>
                        <ul>
                            <li><a href="${pathPrefix}pizza.html">Pizza Parlor</a></li>
                            <li><a href="${pathPrefix}burger.html">Burger Joint</a></li>
                            <li><a href="${pathPrefix}fries.html">Fries Corner</a></li>
                            <li><a href="${pathPrefix}midnight-cravings.html">Midnight Munchies</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Contact Info</h4>
                        <p><i data-lucide="mail"></i> cravings@snackverse.com</p>
                        <p><i data-lucide="map-pin"></i> Gen Z Kitchen, Cloud City</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 MIDNIGHT CRAVINGS. All Rights Reserved. Levelled up with 💜</p>
            </div>
        `;
        // Re-initialize Lucide icons in the footer
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});
