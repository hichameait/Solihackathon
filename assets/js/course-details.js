document.addEventListener("DOMContentLoaded", function () {
  // Get course data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const courseData = JSON.parse(decodeURIComponent(urlParams.get("data")));

  // Update page content with course data
  document.getElementById("courseImage").src = courseData.image;
  document.getElementById("courseTitle").textContent = courseData.title;
  document.getElementById("courseCategory").textContent = courseData.category;
  document.getElementById("courseDescription").textContent =
    courseData.description;

  // Update course logo
  const logoContainer = document.getElementById("courseLogo");
  logoContainer.innerHTML = courseData.logo;

  // Update page title
  document.title = `${courseData.title} - InnovBridge`;

  // Button click handlers
  document.querySelector(".btn-test").addEventListener("click", function () {
    // Add test functionality here
    console.log("Test button clicked");
  });

  document.querySelector(".btn-start").addEventListener("click", function () {
    // Add start course functionality here
    console.log("Start course button clicked");
  });
});
