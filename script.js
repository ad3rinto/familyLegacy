// Legacy Archive Landing Page Script

document.addEventListener('DOMContentLoaded', function() {
    // Tailwind script already loaded via CDN

    // Waitlist Form
    const waitlistForm = document.getElementById('waitlistForm');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            if (email) {
                // Simulate submission
                const btn = this.querySelector('button');
                const originalText = btn.textContent;
                
                btn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-emerald-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                `;
                
                setTimeout(() => {
                    alert("🎉 Thank you! You've been added to the waitlist. We'll notify you when Legacy Archive is ready.");
                    waitlistForm.reset();
                    btn.textContent = originalText;
                }, 1200);
            }
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Keyboard shortcut (for demo)
    document.addEventListener('keydown', function(e) {
        if (e.metaKey && e.key === 'k') {
            e.preventDefault();
            showWaitlist();
        }
    });
});

function showWaitlist() {
    const waitlistSection = document.querySelector('section:last-of-type');
    if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Join the waitlist at the bottom of the page!");
    }
}

function watchDemo() {
    alert("🎥 Demo video would play here.\n\nIn the real version, this would open a 60-second Loom or YouTube video showing the app in action.");
}