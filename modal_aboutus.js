// Get modal element
const aboutUsModal = document.getElementById("aboutUsModal");

// Get button to open the modal
const aboutUsOpenModalBtn = document.getElementById("openAboutUsModalBtn");

// Get the close button outside the modal
const aboutUsCloseBtn = document.querySelector(".aboutus-close-btn");

// Open the modal when the button is clicked
aboutUsOpenModalBtn.addEventListener("click", () => {
  aboutUsModal.style.display = "flex"; // Make modal container visible
  setTimeout(() => aboutUsModal.classList.add("show"), 10); // Add 'show' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
aboutUsCloseBtn.addEventListener("click", () => {
  aboutUsModal.classList.remove("show"); // Fade out
  aboutUsModal.classList.add("fade-out"); // Add fade-out animation class

  const aboutUsModalContent = document.querySelector(".aboutus_modal_content");
  aboutUsModalContent.classList.add("scale-out"); // Add scale-out animation class

  // Wait for the animations to complete before hiding the modal
  setTimeout(() => {
    aboutUsModal.style.display = "none"; // Hide modal
    aboutUsModal.classList.remove("fade-out"); // Reset fade-out class
    aboutUsModalContent.classList.remove("scale-out"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === aboutUsModal) {
    aboutUsCloseBtn.click(); // Trigger the close button's functionality
  }
});
