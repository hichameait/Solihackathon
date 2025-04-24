// Add hover effects and interactive elements
document.querySelectorAll(".course-card").forEach((card) => {
  // Hover effects
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
    card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    card.style.boxShadow =
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    card.style.borderColor = "var(--color-primary)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "var(--shadow)";
    card.style.borderColor = "var(--color-border)";
  });

  // Click handler for the entire card
  card.addEventListener("click", function (e) {
    // Don't handle clicks on buttons or their container
    if (
      e.target.closest(".course-actions") ||
      e.target.closest(".btn-test") ||
      e.target.closest(".btn-start") ||
      e.target.closest(".close-button")
    ) {
      return;
    }

    // Add click animation
    this.style.transform = "scale(0.98)";
    this.style.transition = "transform 0.15s ease";

    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);

    // Get course data with error handling
    const getElementText = (selector) => {
      const element = this.querySelector(selector);
      return element ? element.textContent : "Not available";
    };

    const courseData = {
      image: this.querySelector(".course-image")?.src || "",
      title: getElementText(".course-title"),
      category: getElementText(".course-category"),
      description: getElementText(".course-description"),
      logo: this.querySelector(".course-logo")?.innerHTML || "",
      duration: getElementText(".stat:nth-child(1) span"),
      lessons: getElementText(".stat:nth-child(2) span"),
    };

    // Add fade out animation before navigation
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
      window.location.href = `course-details.html?data=${encodeURIComponent(
        JSON.stringify(courseData)
      )}`;
    }, 300);
  });
});

// Navigation link hover effect
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.color = "var(--color-primary)";
    link.style.background = "var(--color-background)";
    link.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    const svg = link.querySelector("svg");
    if (svg) svg.style.transform = "translateX(-2px)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.color = "var(--color-foreground)";
    link.style.background = "transparent";
    const svg = link.querySelector("svg");
    if (svg) svg.style.transform = "translateX(0)";
  });
});

// Filter functionality with smooth animations
document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.getElementById("course-filter");
  const courseCards = document.querySelectorAll(".course-card");
  const container = document.querySelector(".courses-container");

  if (!filterSelect || !courseCards.length || !container) return;

  // Add smooth transition for filtering
  const style = document.createElement("style");
  style.textContent = `
    .course-card {
      transition: opacity 0.3s ease;
    }
    .course-card.hidden {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      visibility: hidden;
    }
    .course-card.visible {
      opacity: 1;
      pointer-events: auto;
      position: relative;
      visibility: visible;
    }
  `;
  document.head.appendChild(style);

  filterSelect.addEventListener("change", function () {
    const selectedCategory = this.value;
    let visibleCount = 0;

    courseCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      if (selectedCategory === "all" || cardCategory === selectedCategory) {
        card.classList.remove("hidden");
        card.classList.add("visible");
        visibleCount++;
      } else {
        card.classList.add("hidden");
        card.classList.remove("visible");
      }
    });

    // Update container height smoothly
    container.style.transition = "height 0.3s ease";
    container.style.height = "auto";

    // Force a reflow to ensure smooth transition
    container.offsetHeight;
  });

  // Add hover effect for filter select
  filterSelect.addEventListener("mouseenter", function () {
    this.style.borderColor = "var(--color-primary)";
    this.style.background = "var(--color-background-alt)";
  });

  filterSelect.addEventListener("mouseleave", function () {
    this.style.borderColor = "var(--color-border)";
    this.style.background = "var(--color-background)";
  });
});

// Card expansion functionality
document.querySelectorAll(".course-card").forEach((card) => {
  const closeButton = card.querySelector(".close-button");

  card.addEventListener("click", function (e) {
    // Don't expand if clicking on buttons or close button
    if (
      e.target.closest(".course-actions") ||
      e.target.closest(".close-button")
    )
      return;

    // Close other expanded cards
    document
      .querySelectorAll(".course-card.expanded")
      .forEach((expandedCard) => {
        if (expandedCard !== this) {
          expandedCard.classList.remove("expanded");
          document.body.style.overflow = "auto";
        }
      });

    // Toggle current card
    this.classList.toggle("expanded");

    // Prevent body scrolling when card is expanded
    if (this.classList.contains("expanded")) {
      document.body.style.overflow = "hidden";
      this.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Close button functionality
  closeButton.addEventListener("click", function (e) {
    e.stopPropagation();
    card.classList.remove("expanded");
    document.body.style.overflow = "auto";
  });
});

// Button click handlers
function createButtonHandler(buttonClass, targetPage) {
  document.querySelectorAll(buttonClass).forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const card = this.closest(".course-card");
      if (!card) return;

      // Add click animation
      card.style.transform = "scale(0.98)";
      card.style.transition = "transform 0.15s ease";

      setTimeout(() => {
        card.style.transform = "scale(1)";
      }, 150);

      // Get course data with error handling
      const getElementText = (selector) => {
        const element = card.querySelector(selector);
        return element ? element.textContent : "Not available";
      };

      const courseData = {
        image: card.querySelector(".course-image")?.src || "",
        title: getElementText(".course-title"),
        category: getElementText(".course-category"),
        description: getElementText(".course-description"),
        logo: card.querySelector(".course-logo")?.innerHTML || "",
        duration: getElementText(".stat:nth-child(1) span"),
        lessons: getElementText(".stat:nth-child(2) span"),
      };

      // Add fade out animation before navigation
      document.body.style.opacity = "0";
      document.body.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        window.location.href = `${targetPage}?data=${encodeURIComponent(
          JSON.stringify(courseData)
        )}`;
      }, 300);
    });
  });
}

// Initialize button handlers
createButtonHandler(".btn-test", "test.html");
createButtonHandler(".btn-start", "course.html");

// Add buttons to course cards
document.querySelectorAll(".course-card").forEach((card) => {
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "course-actions";

  const testBtn = document.createElement("button");
  testBtn.className = "btn-test";
  testBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
    Begin Test
  `;

  const startBtn = document.createElement("button");
  startBtn.className = "btn-start";
  startBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
    Start Course
  `;

  actionsDiv.appendChild(testBtn);
  actionsDiv.appendChild(startBtn);
  card.appendChild(actionsDiv);
});
