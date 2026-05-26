// Legacy Archive Landing Page - Google Sheets Integration

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5sNYQvHI4mkGqhpokgfqiODZJ7Dzv5KGRNpWKbMrLHFdS-Sk1__7MSirQVn4rSSg/exec";

document.addEventListener('DOMContentLoaded', function() {

    const waitlistForm = document.getElementById('waitlistForm');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const children = document.getElementById('children').value.trim();
            
            if (!email || !email.includes('@')) {
                alert("Please enter a valid email address.");
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            `;

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    children: children,
                    source: 'Landing Page'
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(() => {
                hideWaitlist();
                showSuccessMessage();
                waitlistForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Thank you! Your response has been recorded.");
                hideWaitlist();
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Modal Controls
function showWaitlist() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function hideWaitlist() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function showSuccessMessage() {
    const successHTML = `
        <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]">
            <div class="bg-white rounded-3xl max-w-md w-full mx-4 p-10 text-center">
                <div class="text-6xl mb-6">🎉</div>
                <h3 class="text-3xl font-semibold text-emerald-900 mb-4">You're on the list!</h3>
                <p class="text-zinc-600 text-lg mb-8">
                    Thank you for joining the Legacy Archive waitlist.<br>
                    We'll notify you as soon as early access is ready.
                </p>
                <button onclick="this.closest('.fixed').remove()" 
                        class="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-semibold text-lg transition">
                    Close
                </button>
            </div>
        </div>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = successHTML;
    document.body.appendChild(div.firstElementChild);
}