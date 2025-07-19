document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const overlay = document.getElementById("overlay");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sectionContents = document.querySelectorAll(".section-content");
  const sectionTitle = document.getElementById("sectionTitle");
  const hireMeBtn = document.getElementById("hireMeBtn");
  const downloadCvHero = document.getElementById("downloadCvHero");
  const downloadCvWhy = document.getElementById("downloadCvWhy");
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const contactForm = document.getElementById("contactForm");
  const successAlert = document.getElementById("successAlert");

  // Section titles for top bar
  const sectionTitles = {
    hero: "Introduction",
    education: "Education",
    services: "My Services",
    projects: "My Projects",
    why: "Why Choose Me",
    contact: "Contact Me",
  };

  // Mobile sidebar toggle
  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    overlay.style.display = sidebar.classList.contains("active")
      ? "block"
      : "none";
  });

  // Close sidebar when clicking overlay
  overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
  });

  // Navigation link click handler
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get target section
      const targetSection = this.getAttribute("data-section");

      // Update active link
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      // Show target section, hide others
      sectionContents.forEach((section) => {
        section.style.display = section.id === targetSection ? "block" : "none";
      });

      // Update section title
      sectionTitle.textContent = sectionTitles[targetSection];

      // Close sidebar on mobile after selection
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        overlay.style.display = "none";
      }
    });
  });

  // Auto-close sidebar when resizing to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      overlay.style.display = "none";
    }
  });

  // Hire Me button click handler
  hireMeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("why");
  });

  // Download CV button handlers
  downloadCvHero.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("why");
    // Scroll to download button in why section
    setTimeout(() => {
      downloadCvWhy.scrollIntoView({ behavior: "smooth" });
    }, 300);
  });

  downloadCvWhy.addEventListener("click", function (e) {
    e.preventDefault();
    alert("CV download started! (This is a demo)");
  });

  // Learn More button handler
  learnMoreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("education");
  });

  // Show a specific section
  function showSection(sectionId) {
    // Update active link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active");
      }
    });

    // Show target section, hide others
    sectionContents.forEach((section) => {
      section.style.display = section.id === sectionId ? "block" : "none";
    });

    // Update section title
    sectionTitle.textContent = sectionTitles[sectionId];

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
      overlay.style.display = "none";
    }
  }

  // Form validation and submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset error states
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
    });

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Validate name
    if (!name) {
      document
        .querySelector("#name")
        .closest(".form-group")
        .classList.add("error");
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      document
        .querySelector("#email")
        .closest(".form-group")
        .classList.add("error");
      isValid = false;
    }

    // Validate subject
    if (!subject) {
      document
        .querySelector("#subject")
        .closest(".form-group")
        .classList.add("error");
      isValid = false;
    }

    // Validate message
    if (!message) {
      document
        .querySelector("#message")
        .closest(".form-group")
        .classList.add("error");
      isValid = false;
    }

    if (isValid) {
      // In a real application, you would send the form data to a server here
      // For demo purposes, we'll just show a success message
      successAlert.style.display = "block";

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 5000);
    }
  });

  // Form input validation as user types
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const formGroup = this.closest(".form-group");
      if (formGroup.classList.contains("error")) {
        formGroup.classList.remove("error");
      }
    });
  });
});
