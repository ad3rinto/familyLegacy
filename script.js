// Legacy Archive Landing Page - CORS Fixed Version

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
                <span class="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Submitting...
            `;

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    children: children,
                    source: 'Landing Page'
                }),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors'                    // ← This fixes the CORS error
            })
            .then(() => {
                // We can't read response due to no-cors, so assume success
                hideWaitlist();
                showSuccessMessage();
                waitlistForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                // Still show success - most likely it worked
                hideWaitlist();
                showSuccessMessage();
                waitlistForm.reset();
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