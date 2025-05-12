// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.querySelector('.floating-petals');
    const aiMessage = document.getElementById('ai-message');
    const generateButton = document.getElementById('generate-message');
    
    // Advanced message templates with variables
    const templates = [
        "May your {time} be filled with {feeling} and {noun}",
        "Wishing you {amount} of {noun} on your special {event}",
        "Here's to a {adjective} year filled with {noun}",
        "May your dreams {verb} as bright as {noun}",
        "Celebrating your {event} with {amount} of {feeling}"
    ];
    
    const words = {
        time: ['day', 'year', 'moments', 'future', 'journey'],
        feeling: ['joy', 'happiness', 'laughter', 'delight', 'wonder', 'excitement'],
        noun: ['sunshine', 'rainbows', 'flowers', 'stars', 'magic', 'dreams', 'wishes'],
        amount: ['endless amounts', 'countless moments', 'infinite rays', 'boundless waves'],
        adjective: ['magical', 'wonderful', 'fantastic', 'spectacular', 'remarkable', 'extraordinary'],
        verb: ['shine', 'sparkle', 'glow', 'radiate', 'bloom'],
        event: ['day', 'celebration', 'birthday', 'special moment', 'wonderful occasion']
    };

    // AI-like message generation using template-based approach
    function generateAIMessage() {
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        return template.replace(/\{(\w+)\}/g, (match, word) => {
            const options = words[word];
            return options[Math.floor(Math.random() * options.length)];
        });
    }

    // Create an enhanced floating petal
    function createEnhancedPetal(isAITriggered = false) {
        const petal = document.createElement('div');
        petal.className = 'floating-petal' + (isAITriggered ? ' ai-enhanced' : '');
        
        // AI-influenced randomization
        const size = Math.random() * 10 + (isAITriggered ? 15 : 10);
        const duration = Math.random() * 4 + (isAITriggered ? 4 : 6);
        const hue = Math.random() * 30 - 15;
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animation = `float ${duration}s linear`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        if (isAITriggered) {
            petal.style.background = `linear-gradient(45deg, 
                hsl(${330 + hue}, 100%, 70%), 
                hsl(${330 + hue + 30}, 100%, 75%))`;
            petal.style.boxShadow = '0 0 10px rgba(255, 105, 180, 0.5)';
        } else {
            petal.style.backgroundColor = `hsl(${330 + hue}, 100%, 70%)`;
        }
        
        petalsContainer.appendChild(petal);
        
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    // Create AI burst effect
    function createAIBurst() {
        const burstCount = 15;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                createEnhancedPetal(true);
            }, i * 100);
        }
    }

    // Generate new message with visual effects
    function updateMessage() {
        // Fade out current message
        aiMessage.style.opacity = 0;
        
        // Create visual burst effect
        createAIBurst();
        
        // Update message with animation
        setTimeout(() => {
            const newMessage = generateAIMessage();
            aiMessage.textContent = newMessage;
            aiMessage.style.opacity = 1;
            
            // Activate corner flowers
            document.querySelectorAll('.flower').forEach(flower => {
                flower.classList.add('ai-active');
                setTimeout(() => flower.classList.remove('ai-active'), 1000);
            });
        }, 500);
    }

    // Event Listeners
    generateButton.addEventListener('click', () => {
        generateButton.disabled = true;
        updateMessage();
        setTimeout(() => {
            generateButton.disabled = false;
        }, 1500);
    });

    // Initialize
    // Create initial batch of petals
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createEnhancedPetal(false);
        }, i * 300);
    }

    // Continue creating background petals
    setInterval(() => createEnhancedPetal(false), 1000);

    // Interactive flower movement
    document.addEventListener('mousemove', (e) => {
        const flowers = document.querySelectorAll('.flower');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        flowers.forEach(flower => {
            const rect = flower.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 300) {
                const angle = Math.atan2(deltaY, deltaX);
                const movement = 10 * (1 - distance / 300);
                flower.style.transform = `translate(${Math.cos(angle) * movement}px, ${Math.sin(angle) * movement}px)`;
            } else {
                flower.style.transform = 'none';
            }
        });
    });
});
