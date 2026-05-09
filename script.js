// ===== AI Assistant Chat Widget =====
// Swarali AI Assistant Logic
const orb = document.getElementById('swarali-ai-orb');
const chat = document.getElementById('swarali-ai-chat');
const messages = document.getElementById('swaraliAiMessages');
const form = document.getElementById('swaraliAiForm');
const input = document.getElementById('swaraliAiInput');

function openChat() {
  orb.style.display = 'none';
  chat.classList.add('open');
  chat.style.display = 'flex';
  input.focus();
}
function closeChat() {
  chat.classList.remove('open');
  setTimeout(() => {
    chat.style.display = 'none';
    orb.style.display = 'flex';
  }, 350);
}
orb.addEventListener('click', openChat);
orb.addEventListener('keypress', e => { if (e.key === 'Enter' || e.key === ' ') openChat(); });
document.addEventListener('keydown', e => {
  if (chat.classList.contains('open') && e.key === 'Escape') closeChat();
});

// Click outside to close
document.addEventListener('mousedown', e => {
  if (chat.classList.contains('open') && !chat.contains(e.target) && !orb.contains(e.target)) closeChat();
});

// Send message
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  showTyping();
  setTimeout(() => {
    addMessage(getAIResponse(text), 'ai');
    hideTyping();
  }, 1200 + Math.random() * 800);
});

function addMessage(text, who = 'ai') {
  const msg = document.createElement('div');
  msg.className = 'swarali-ai-msg ' + who;
  if (who === 'ai') msg.innerHTML = `<span class="swarali-ai-emoji">🎨</span> ` + text;
  else msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'swarali-ai-msg ai swarali-ai-typing';
  typing.id = 'swaraliAiTyping';
  typing.innerHTML = `
    <span class="swarali-ai-typing-dot"></span>
    <span class="swarali-ai-typing-dot"></span>
    <span class="swarali-ai-typing-dot"></span>
  `;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}
function hideTyping() {
  const typing = document.getElementById('swaraliAiTyping');
  if (typing) typing.remove();
}

// Simple AI response (replace with real AI integration)
function getAIResponse(userText) {
  userText = userText.toLowerCase();
  if (userText.includes('card')) return "We offer premium visiting and wedding cards with custom designs. Want to see samples?";
  if (userText.includes('design')) return "Our designers can help you create unique prints. Would you like creative suggestions?";
  if (userText.includes('price') || userText.includes('cost')) return "Prices depend on paper, size, and quantity. Want a quick quote?";
  if (userText.includes('upload')) return "You can upload PDF, JPG, or PNG files up to 10MB. Need help with file types?";
  if (userText.includes('help')) return "I'm here to help with anything print-related! Ask me about paper, size, or design.";
  return "Let me know what you need help with – paper, design, size, or something else!";
}

// ===== Cursor Trail Effect =====
const heroSection = document.querySelector('.hero');
const cursorTrail = document.getElementById('cursorTrail');
let lastTrailTime = 0;

if (heroSection && cursorTrail) {
    heroSection.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 30) return; // Throttle
        lastTrailTime = now;

        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const trail = document.createElement('div');
        trail.className = 'trail-dot';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';

        // Random colors for trail
        const colors = [
            'rgba(0, 212, 255, 0.8)',
            'rgba(233, 30, 140, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(123, 45, 142, 0.8)'
        ];
        trail.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;

        cursorTrail.appendChild(trail);

        // Remove trail after animation
        setTimeout(() => trail.remove(), 800);
    });
}
