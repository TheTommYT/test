document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="text"]');

    if (form && input) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = input.value.toLowerCase().trim();

            if (!query) return;

            // Nettoyer les anciennes surbrillances
            document.querySelectorAll('mark.search-highlight').forEach(mark => {
                const parent = mark.parentNode;
                parent.replaceChild(document.createTextNode(mark.textContent), mark);
                parent.normalize();
            });

            const elements = document.querySelectorAll('p, h1, h2, a');
            let matchCount = 0;
            let firstMatch = null;

            elements.forEach(el => {
                const text = el.textContent;
                const lowerText = text.toLowerCase();
                
                if (lowerText.includes(query)) {
                    matchCount++;
                    
                    // Remplacer le texte pour surligner tous les mots trouvés
                    const regex = new RegExp(`(${query})`, 'gi');
                    el.innerHTML = text.replace(regex, '<mark class="search-highlight" style="background-color: #38bdf8; color: #0f172a; padding: 0 2px;">$1</mark>');
                    
                    if (!firstMatch) {
                        firstMatch = el;
                    }
                }
            });

            if (matchCount > 0) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                alert(`Found ${matchCount} match(es) for: "${query}".`);
            } else {
                alert(`No results found for: "${query}".`);
            }
        });
    }
});