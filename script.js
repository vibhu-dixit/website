document.addEventListener('DOMContentLoaded', function() {
    const bg = document.getElementById('gradient-bg');
    let mouseX = 0;
    let mouseY = 0;
    let gradientX = 50;
    let gradientY = 50;

    // Gradient background code 
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    function updateGradient() {
        gradientX += (mouseX - gradientX) * 0.1;
        gradientY += (mouseY - gradientY) * 0.1;

        const gradient = `
            radial-gradient(
                circle at ${gradientX}% ${gradientY}%,
                rgba(52, 152, 219, 0.5) 0%,
                rgba(255, 255, 255, 0.5) 10%,  
                rgba(0, 0, 0, 0.98) 20% 
            )
        `;

        bg.style.background = gradient;
        requestAnimationFrame(updateGradient);
    }

    updateGradient();
    //for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const githubUrl = this.getAttribute('data-github');
            if (githubUrl) {
                window.open(githubUrl, '_blank');
            }
        });
    });

    // Add smooth scroll functionality
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                history.pushState(null, null, targetId);
            }
        });
    });
});