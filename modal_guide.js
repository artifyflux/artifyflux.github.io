// Get modal element
const guideModal = document.getElementById("guideModal");

// Get button to open the modal
const guideOpenModalBtn = document.getElementById("openGuideModalBtn");

// Get the close button outside the modal
const guideCloseBtn = document.querySelector(".guide-close-btn");

// Open the modal when the button is clicked
guideOpenModalBtn.addEventListener("click", () => {
  guideModal.style.display = "flex"; // Make modal container visible
  setTimeout(() => guideModal.classList.add("show"), 10); // Add 'show' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
guideCloseBtn.addEventListener("click", () => {
  guideModal.classList.remove("show"); // Fade out
  guideModal.classList.add("fade-out"); // Add fade-out animation class

  const guideModalContent = document.querySelector(".guide_modal_content");
  guideModalContent.classList.add("scale-out"); // Add scale-out animation class

  // Wait for the animations to complete before hiding the modal
  setTimeout(() => {
    guideModal.style.display = "none"; // Hide modal
    guideModal.classList.remove("fade-out"); // Reset fade-out class
    guideModalContent.classList.remove("scale-out"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === guideModal) {
    guideCloseBtn.click(); // Trigger the close button's functionality
  }
});
