document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.method-step, .skill-category, .writeup-card, .lab-item, .project-card, .cert-card');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    // Initial State for Animations
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- TERMINAL TYPEWRITER EFFECT (NEW) ---
    const textToType = [
        "sudo initiate_sequence", 
        "Loading dependencies...", 
        "Target: Web Infrastructure", 
        "Status: Online"
    ];
    const typeWriterElement = document.getElementById('typewriter');
    
    if(typeWriterElement) {
        let lineIndex = 0;
        let charIndex = 0;

        function typeWriter() {
            if (lineIndex < textToType.length) {
                if (charIndex < textToType[lineIndex].length) {
                    // Check if start of line
                    if(charIndex === 0) {
                        typeWriterElement.innerHTML = typeWriterElement.innerHTML.replace('<span class="cursor"></span>', '');
                        typeWriterElement.innerHTML += '<div>> ';
                    }
                    
                    const currentDivs = typeWriterElement.getElementsByTagName('div');
                    const currentLine = currentDivs[currentDivs.length - 1];
                    currentLine.innerHTML += textToType[lineIndex].charAt(charIndex);
                    
                    charIndex++;
                    setTimeout(typeWriter, 40); // Typing Speed
                } else {
                    // Line Finished
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeWriter, 400); // Pause between lines
                }
            } else {
                 // Final blinking cursor
                 typeWriterElement.innerHTML += '<span class="cursor"></span>';
            }
        }
        
        // Start Typing
        setTimeout(typeWriter, 1000);
    }

    // --- CONSOLE EASTER EGG ---
    console.log("%cStop looking at the console!", "color: red; font-size: 20px; font-weight: bold;");
    console.log("%cIf you are looking for vulnerabilities, you are in the right place to hire me.", "color: #6366f1; font-size: 12px;");
});
