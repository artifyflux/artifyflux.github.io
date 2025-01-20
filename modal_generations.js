// Get modal element
const generationsModal = document.getElementById("generationsModal");

// Get button to open the modal
const generationsOpenModalBtn = document.getElementById("openGenerationsModalBtn");

// Get the close button outside the modal
const generationsCloseBtn = document.querySelector(".generations-close-btn");

// Open the modal when the button is clicked
generationsOpenModalBtn.addEventListener("click", () => {
  generationsModal.style.display = "flex"; // Make modal container visible
  setTimeout(() => generationsModal.classList.add("show"), 10); // Add 'show' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
generationsCloseBtn.addEventListener("click", () => {
  generationsModal.classList.remove("show"); // Fade out
  generationsModal.classList.add("fade-out"); // Add fade-out animation class

  const generationsModalContent = document.querySelector(".generations_modal_content");
  generationsModalContent.classList.add("scale-out"); // Add scale-out animation class

  // Wait for the animations to complete before hiding the modal
  setTimeout(() => {
    generationsModal.style.display = "none"; // Hide modal
    generationsModal.classList.remove("fade-out"); // Reset fade-out class
    generationsModalContent.classList.remove("scale-out"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === generationsModal) {
    generationsCloseBtn.click(); // Trigger the close button's functionality
  }
});
