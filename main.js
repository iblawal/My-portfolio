document.addEventListener("DOMContentLoaded", () => {
  // ========== 1. Mobile Menu Toggle ==========
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // ========== 2. Close nav when a link is clicked ==========
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // ========== 3. ScrollSpy ==========
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // ========== 4. Smooth Scroll for Anchor Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ========== 5. Stack Dropdown Toggle ==========
  const toggleBtn = document.querySelector(".toggle-stack");
  const stackDropdown = document.getElementById("stackDropdown");

  if (toggleBtn && stackDropdown) {
    toggleBtn.addEventListener("click", () => {
      stackDropdown.classList.toggle("active");
      toggleBtn.textContent = stackDropdown.classList.contains("active")
        ? "Hide My Tech Stack"
        : "Show My Tech Stack";
    });
  }

  // ========== 6. Animate Horizontal Skill Bars ==========
  const progressFills = document.querySelectorAll(".progress");

  progressFills.forEach(fill => {
    const targetWidth = fill.getAttribute("data-width");
    fill.style.width = "0"; // Start hidden
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.width = targetWidth;
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(fill);
       
     // Force check on load in case it's already visible
    if (fill.getBoundingClientRect().top < window.innerHeight) {
        fill.style.width = targetWidth;
     }

  });

      
  

  // ========== 7. Animate Circular Skills ==========
  const circles = document.querySelectorAll(".circle svg circle:nth-child(2)");
  const labels = document.querySelectorAll(".circle .label");

  const animateCircles = () => {
    circles.forEach((circle, i) => {
      const percent = circle.style.getPropertyValue("--percent");
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      setTimeout(() => {
        circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
      }, 300);

      if (labels[i]) labels[i].textContent = `${percent}%`;
    });
  };

  const circleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCircles();
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".circle-skills").forEach(el => {
    circleObserver.observe(el);
  });

  // ========== 8. AOS Init ==========
  AOS.init({
    duration: 800,
    delay: 0,
    once: true,
    easing: 'ease-in-out',
  });

  // ========== 9. Typed.js (optional if using .typed span) ==========
  if (document.querySelector(".typed")) {
    new Typed(".typed", {
      strings: ["Frontend Developer", "UI/UX Designer", "Web Developer"],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
      showCursor: false
    });
  }
});
