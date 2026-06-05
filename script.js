// ========== DATA STRUCTURES (BACKEND-READY) ==========
const features = [
  { icon: "⚡", title: "Lightning Fast", desc: "Edge-optimized performance with sub-50ms latency." },
  { icon: "🤖", title: "AI Analytics", desc: "Predictive insights and automated reporting." },
  { icon: "🔒", title: "Enterprise Security", desc: "SOC2 compliant, end-to-end encryption." },
  { icon: "📊", title: "Real-time Dashboard", desc: "Live KPIs with customizable widgets." },
  { icon: "🔄", title: "API First", desc: "Seamless integration with any stack." },
  { icon: "🌍", title: "Global CDN", desc: "Multi-region deployment ready." }
];

const pricingPlans = [
  { name: "Free", price: "$0", period: "/month", features: ["Up to 1k requests", "Basic analytics", "Community support"], popular: false, cta: "Get Started" },
  { name: "Pro", price: "$29", period: "/month", features: ["50k requests", "Advanced AI", "Priority support", "Custom reports"], popular: true, cta: "Start Trial" },
  { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited requests", "Dedicated SLAs", "On-premise option", "24/7 support"], popular: false, cta: "Contact Sales" }
];

const testimonials = [
  { text: "Nexify transformed our workflow. The AI insights saved us 20+ hours weekly.", author: "Sarah Chen, CTO at Lumina" },
  { text: "Clean UI and blazing fast. Our entire team adopted it within days.", author: "Marcus V., Product Lead" },
  { text: "Best decision we made this year – scaling became effortless.", author: "Elena Rossi, Founder at Creo" }
];

const faqData = [
  { q: "What is Nexify?", a: "Nexify is an AI‑powered SaaS platform that helps businesses automate workflows and gain real‑time insights." },
  { q: "Can I change plans later?", a: "Absolutely. You can upgrade or downgrade anytime from your dashboard." },
  { q: "Do you offer API access?", a: "Yes, all plans include API access with different rate limits." }
];

// ========== DYNAMIC RENDERING ==========
function renderFeatures() {
  const grid = document.getElementById("featuresGrid");
  if (!grid) return;
  grid.innerHTML = features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join("");
}

function renderPricing() {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;
  grid.innerHTML = pricingPlans.map(plan => `
    <div class="pricing-card ${plan.popular ? 'popular' : ''}" data-price="${plan.price}">
      <h3>${plan.name}</h3>
      <div class="price">${plan.price}<span style="font-size:1rem">${plan.period}</span></div>
      <ul style="list-style:none; margin:1rem 0">
        ${plan.features.map(f => `<li style="margin:0.5rem 0">✓ ${f}</li>`).join("")}
      </ul>
      <button class="btn-primary pricing-cta" data-plan="${plan.name}">${plan.cta}</button>
    </div>
  `).join("");
}

function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;
  grid.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <p>“${t.text}”</p>
      <div class="testimonial-author">— ${t.author}</div>
    </div>
  `).join("");
}

function renderFAQ() {
  const container = document.getElementById("faqContainer");
  if (!container) return;
  container.innerHTML = faqData.map((item, idx) => `
    <div class="faq-item" data-faq-idx="${idx}">
      <div class="faq-question">
        <span>${item.q}</span>
        <span>+</span>
      </div>
      <div class="faq-answer">${item.a}</div>
    </div>
  `).join("");
  // attach event listeners after render
  document.querySelectorAll(".faq-item").forEach(item => {
    const qDiv = item.querySelector(".faq-question");
    qDiv.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

// ========== STATS ANIMATION + DATA-ATTRIBUTES ==========
const statsData = [
  { label: "Active Users", target: 15420, suffix: "+", key: "users" },
  { label: "Projects Managed", target: 8900, suffix: "+", key: "projects" },
  { label: "Uptime", target: 99.99, suffix: "%", key: "uptime" }
];

function animateStats() {
  const container = document.getElementById("statsContainer");
  if (!container) return;
  container.innerHTML = statsData.map(stat => `
    <div class="stat-item" data-stat="${stat.key}">
      <div class="stat-number" data-target="${stat.target}">0</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join("");

  const statNumbers = document.querySelectorAll(".stat-number");
  const animate = (el, target) => {
    let current = 0;
    const increment = target / 70;
    const update = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.floor(current).toLocaleString() + (statsData.find(s => s.target === target)?.suffix || "");
        requestAnimationFrame(update);
      } else {
        el.innerText = target.toLocaleString() + (statsData.find(s => s.target === target)?.suffix || "");
      }
    };
    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numDiv = entry.target;
        const target = parseFloat(numDiv.getAttribute("data-target"));
        animate(numDiv, target);
        observer.unobserve(numDiv);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(num => observer.observe(num));
}

// ========== API SIMULATION (BACKEND READY) ==========
async function mockApiFetch(endpoint) {
  console.log(`🌐 API Call: ${endpoint}`);
  // simulate network delay
  await new Promise(r => setTimeout(r, 400));
  if (endpoint === "/api/stats") return { users: 15420, projects: 8900, uptime: 99.99 };
  if (endpoint === "/api/pricing") return pricingPlans;
  if (endpoint === "/api/testimonials") return testimonials;
  return { success: true };
}

// ========== CONTACT FORM HANDLER (POST) ==========
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMsg").value;
    const feedback = document.getElementById("formFeedback");
    feedback.textContent = "Sending...";
    feedback.style.color = "#8aa9ff";
    try {
      // POST request simulation - actual backend integration ready
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      // For demo, we simulate success (since backend not real)
      console.log("POST /api/contact payload", { name, email, message });
      feedback.textContent = "✅ Message sent! We'll get back soon.";
      feedback.style.color = "#4f76ff";
      contactForm.reset();
      setTimeout(() => feedback.textContent = "", 3000);
    } catch (err) {
      feedback.textContent = "⚠️ Could not send. Please try again.";
      feedback.style.color = "#ff7b72";
    }
  });
}

// ========== SMOOTH SCROLL, MOBILE MENU, CTA ==========
document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary').forEach(btn => {
  if (btn.id === "heroStartFree" || btn.id === "getStartedNav") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
    });
  }
  if (btn.id === "heroWatchDemo") {
    btn.addEventListener("click", () => {
      document.querySelector(".dashboard-preview").scrollIntoView({ behavior: "smooth" });
    });
  }
});

// smooth scroll from nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navButtons = document.querySelector(".nav-buttons");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navButtons.classList.toggle("active");
  });
}

// pricing cta dynamic (backend ready)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pricing-cta")) {
    const plan = e.target.getAttribute("data-plan");
    alert(`✨ Starting onboarding for ${plan} plan. Backend will handle checkout.`);
    // backend integration point: redirect to /api/checkout?plan=xxx
  }
});

// ========== INIT ALL DYNAMIC CONTENT ==========
function init() {
  renderFeatures();
  renderPricing();
  renderTestimonials();
  renderFAQ();
  animateStats();  // also creates stats DOM and counters
  
  // Optional: simulate fetch to show backend readiness
  mockApiFetch("/api/stats").then(data => console.log("📡 Stats API ready:", data));
  mockApiFetch("/api/pricing").then(data => console.log("💰 Pricing API ready"));
}

init();
