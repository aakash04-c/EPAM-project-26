/* ==========================================
   BANKOFBUDDY - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- DOM Elements ---------- */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  const dropdownToggles = document.querySelectorAll('.has-dropdown');
  const navLinks = document.querySelectorAll('.nav-link');

  /* ---------- Mobile Menu Toggle ---------- */
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navbarMenu.classList.toggle('open');
    });
  }

  /* ---------- Dropdown Toggle (Mobile) ---------- */
  dropdownToggles.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('open');

          // Close other dropdowns
          dropdownToggles.forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('open');
            }
          });
        }
      });
    }
  });

  /* ---------- Close Mobile Menu on Link Click ---------- */
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileToggle.classList.remove('active');
        navbarMenu.classList.remove('open');
        dropdownToggles.forEach(d => d.classList.remove('open'));
      }
    });
  });

  /* ---------- Close Dropdowns on Outside Click ---------- */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown') && window.innerWidth > 768) {
      dropdownToggles.forEach(d => d.classList.remove('open'));
    }

    if (!e.target.closest('.navbar') && window.innerWidth <= 768) {
      mobileToggle.classList.remove('active');
      navbarMenu.classList.remove('open');
      dropdownToggles.forEach(d => d.classList.remove('open'));
    }
  });

  /* ---------- Navbar Scroll Effect ---------- */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href && href.includes('#' + sectionId)) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Counter Animation ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  /* ---------- Intersection Observer for Animations ---------- */
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Counter animation for stats
        if (entry.target.classList.contains('about-stats')) {
          statNumbers.forEach(num => animateCounter(num));
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) {
    observer.observe(aboutStats);
  }

  /* ---------- Toast Notification ---------- */
  function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  /* ---------- Login Form Validation ---------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      if (!username) {
        showToast('Please enter your username.', 'error');
        return;
      }

      if (!password) {
        showToast('Please enter your password.', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      showToast('Login successful! Welcome back.', 'success');
      loginForm.reset();
    });
  }

  /* ---------- Signup Form Validation ---------- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const username = document.getElementById('signupUsername').value.trim();
      const password = document.getElementById('signupPassword').value.trim();
      const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();

      if (!name) {
        showToast('Please enter your full name.', 'error');
        return;
      }

      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      if (!username || username.length < 3) {
        showToast('Username must be at least 3 characters.', 'error');
        return;
      }

      if (!password || password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        return;
      }

      showToast('Account created successfully!', 'success');
      signupForm.reset();
    });
  }

  /* ---------- Newsletter Form ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      showToast('Thank you for subscribing!', 'success');
      newsletterForm.reset();
    });
  }

  /* ---------- Money Management ---------- */
  const balanceAmount = document.getElementById('balanceAmount');
  const addMoneyForm = document.getElementById('addMoneyForm');
  const depositMoneyForm = document.getElementById('depositMoneyForm');
  const balanceStorageKey = 'bankofbuddy-balance';

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  }

  function getBalance() {
    const storedBalance = Number(localStorage.getItem(balanceStorageKey));
    return Number.isFinite(storedBalance) && storedBalance >= 0 ? storedBalance : 50000;
  }

  function updateBalanceDisplay(balance) {
    if (balanceAmount) {
      balanceAmount.textContent = formatCurrency(balance);
    }
  }

  function saveBalance(balance) {
    localStorage.setItem(balanceStorageKey, balance.toString());
    updateBalanceDisplay(balance);
  }

  if (balanceAmount) {
    updateBalanceDisplay(getBalance());
  }

  function handleAddMoney() {
    const amountInput = addMoneyForm?.querySelector('input[type="number"]');
    const amount = Number(amountInput?.value);

    if (!amount || amount <= 0) {
      showToast('Please enter a valid amount.', 'error');
      return;
    }

    const currentBalance = getBalance();
    saveBalance(currentBalance + amount);
    showToast(`Added ${formatCurrency(amount)} to your account.`, 'success');
    if (amountInput) amountInput.value = '';
  }

  function handleDepositMoney() {
    const amountInput = depositMoneyForm?.querySelector('input[type="number"]');
    const amount = Number(amountInput?.value);

    if (!amount || amount <= 0) {
      showToast('Please enter a valid deposit amount.', 'error');
      return;
    }

    const currentBalance = getBalance();
    saveBalance(currentBalance + amount);
    showToast(`Deposited ${formatCurrency(amount)} to your account.`, 'success');
    if (amountInput) amountInput.value = '';
  }

  if (addMoneyForm) {
    addMoneyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAddMoney();
    });
  }

  if (depositMoneyForm) {
    depositMoneyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDepositMoney();
    });
  }

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name) {
        showToast('Please enter your name.', 'error');
        return;
      }

      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email.', 'error');
        return;
      }

      if (!subject) {
        showToast('Please enter a subject.', 'error');
        return;
      }

      if (!message) {
        showToast('Please enter your message.', 'error');
        return;
      }

      showToast('Message sent successfully!', 'success');
      contactForm.reset();
    });
  }

  /* ---------- Email Validation Helper ---------- */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /* ---------- Reset Dropdowns on Resize ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileToggle.classList.remove('active');
      navbarMenu.classList.remove('open');
      dropdownToggles.forEach(d => d.classList.remove('open'));
    }
  });

});
