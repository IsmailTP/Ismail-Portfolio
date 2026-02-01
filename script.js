document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. BOOT PRELOADER --- */
    const preloader = document.getElementById('preloader');
    const logs = document.getElementById('loader-logs');
    const bootMessages = [
        "> Initializing Kernel...",
        "> Mounting File System...",
        "> Loading Security Modules...",
        "> Verifying Handshake Protocols...",
        "> Access Granted."
    ];
    let logIndex = 0;
    const logInterval = setInterval(() => {
        if(logIndex < bootMessages.length) {
            logs.innerHTML += `<div>${bootMessages[logIndex]}</div>`;
            logIndex++;
            logs.scrollTop = logs.scrollHeight;
        } else {
            clearInterval(logInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 500);
            }, 500);
        }
    }, 300);

    /* --- 2. INTERACTIVE TERMINAL --- */
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termBody = document.getElementById('terminal-body');
    const termWindow = document.getElementById('terminal-window');

    if(termWindow) {
        termWindow.addEventListener('click', () => termInput.focus());

        const initialMsg = `
        <div class="response">Welcome to Ismail's Terminal v1.0. 
        Type <span style="color:#2dd4bf">'help'</span> to see available commands.</div>
        `;
        termOutput.innerHTML = initialMsg;

        termInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const fullCommand = this.value.trim();
                const cmdParts = fullCommand.split(" ");
                const action = cmdParts[0].toLowerCase();
                
                const cmdLine = `<div class="command-line"><span class="prompt">guest@ismail-tp:~$</span> ${fullCommand}</div>`;
                termOutput.innerHTML += cmdLine;
                
                let response = "";

                switch(action) {
                    case 'help':
                        response = `<div class="response">Available commands:
    <span style="color:#2dd4bf">help</span>      - Show this message
    <span style="color:#2dd4bf">whoami</span>    - Display current user info
    <span style="color:#2dd4bf">about</span>     - About Ismail TP
    <span style="color:#2dd4bf">projects</span>  - List operations
    <span style="color:#2dd4bf">contact</span>   - Contact information
    <span style="color:#2dd4bf">submit</span>    - Submit a CTF Flag (Usage: submit &lt;flag&gt;)
    <span style="color:#2dd4bf">clear</span>     - Clear terminal screen</div>`;
                        break;
                    
                    case 'submit':
                        if(cmdParts[1] === "CTF{W3b_D0M_1nsp3ct0r_M4st3r}") {
                            response = `<div class="response success">
    [+] SYSTEM OVERRIDE SUCCESSFUL.<br>
    [+] Flag Captured. You have excellent enumeration skills.<br>
    [+] Screenshot this and send it to me for a virtual high-five.
    </div>`;
                        } else {
                            response = `<div class="response error">[-] ACCESS DENIED. Incorrect Flag. Try looking in the HTML comments.</div>`;
                        }
                        break;

                    case 'whoami':
                        response = `<div class="response">User: Guest Visitor\nRole: Viewer\nIP: 127.0.0.1 (Local)</div>`;
                        break;
                    case 'about':
                        response = `<div class="response">Ismail TP.\nEthical Hacker & Security Researcher based in Kerala.\nSpecializing in Web App Security & Network Analysis.</div>`;
                        break;
                    case 'projects':
                        response = `<div class="response">1. Shadow Code (Malware Sim)\n2. IP Subnet Calculator\n3. The Void CTF (In Progress)</div>`;
                        break;
                    case 'contact':
                        response = `<div class="response">Email: inuismail10@gmail.com\nOpening mail client...</div>`;
                        setTimeout(() => window.location.href = "mailto:inuismail10@gmail.com", 1000);
                        break;
                    case 'clear':
                        termOutput.innerHTML = "";
                        this.value = "";
                        return;
                    case 'sudo':
                        response = `<div class="response error">Permission denied: You are not in the sudoers file. This incident will be reported.</div>`;
                        break;
                    default:
                        response = `<div class="response error">Command not found: ${action}. Type 'help' for list.</div>`;
                }

                termOutput.innerHTML += response;
                this.value = "";
                termBody.scrollTop = termBody.scrollHeight;
            }
        });
    }

    /* --- 3. PGP MODAL LOGIC --- */
    const modal = document.getElementById("pgp-modal");
    const btn = document.getElementById("pgp-trigger");
    const span = document.getElementsByClassName("close-modal")[0];

    if(btn) {
        btn.onclick = function(e) { e.preventDefault(); modal.style.display = "block"; }
        span.onclick = function() { modal.style.display = "none"; }
        window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }
    }

    /* --- 4. CONSOLE EASTER EGG --- */
    console.log("%cSTOP!", "color: red; font-size: 30px; font-weight: bold;");
    console.log("%cAre you looking for vulnerabilities? Good luck.", "color: #6366f1; font-size: 14px;");
    console.log("%cHidden Flag Part 1: CTF{W3b_D0M_", "color: #2dd4bf; background: #0f172a; padding: 5px; border-radius: 4px;");
    console.log("%cHint: The rest is in the HTML source.", "color: #94a3b8; font-style: italic;");

    /* --- 5. VISUAL EFFECTS --- */
    window.addEventListener('scroll', () => {
        const scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + "%";
    });

    if (window.innerWidth > 900) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.transform = `perspective(1000px) rotateX(${(0.5 - y/rect.height)*10}deg) rotateY(${(x/rect.width - 0.5)*10}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
        });
    }

    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        function initParticles() {
            particles = [];
            let count = (canvas.width * canvas.height) / 15000;
            for(let i=0; i<count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: Math.random() * 1.5 - 0.75,
                    speedY: Math.random() * 1.5 - 0.75
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x += p.speedX; p.y += p.speedY;
                if(p.x > canvas.width || p.x < 0) p.speedX *= -1;
                if(p.y > canvas.height || p.y < 0) p.speedY *= -1;
                
                ctx.fillStyle = '#6366f1';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for(let j=i; j<particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist/150})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }
        initParticles();
        animate();
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
    document.querySelectorAll(".hacker-text").forEach(el => {
        el.onmouseover = event => {
            let iteration = 0;
            const target = event.target.dataset.value;
            let interval = setInterval(() => {
                event.target.innerText = target.split("").map((l, i) => {
                    if(i < iteration) return target[i];
                    return letters[Math.floor(Math.random() * 26)];
                }).join("");
                if(iteration >= target.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        };
    });

    const dot = document.querySelector("[data-cursor-dot]");
    const outline = document.querySelector("[data-cursor-outline]");
    window.addEventListener("mousemove", (e) => {
        if(dot) { dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`; }
        if(outline) outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-times');
            hamburger.querySelector('i').classList.toggle('fa-bars');
        });
    }
});
