document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="text"]');

    if (form && input) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = input.value.toLowerCase().trim();

            if (!query) return;

            const elements = document.querySelectorAll('p, h1, h2, a');
            let found = false;

            for (let el of elements) {
                if (el.textContent.toLowerCase().includes(query)) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.backgroundColor = '#38bdf8';
                    el.style.color = '#0f172a';
                    setTimeout(() => {
                        el.style.backgroundColor = '';
                        el.style.color = '';
                    }, 2000);
                    found = true;
                    break;
                }
            }

            if (!found) {
                alert("No matching word or section found for: " + query);
            }
        });
    }
});