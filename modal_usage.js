// Get modal element
const usageModal = document.getElementById("usageModal");

// Get button to open the modal
const usageOpenModalBtn = document.getElementById("openUsageModalBtn");

// Get the close button outside the modal
const usageCloseBtn = document.querySelector(".usage-close-btn");

// Open the modal when the button is clicked
usageOpenModalBtn.addEventListener("click", () => {
  usageModal.style.display = "flex"; // Make modal container visible
  setTimeout(() => usageModal.classList.add("show"), 10); // Add 'show' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
usageCloseBtn.addEventListener("click", () => {
  usageModal.classList.remove("show"); // Fade out
  usageModal.classList.add("fade-out"); // Add fade-out animation class

  const usageModalContent = document.querySelector(".usage_modal_content");
  usageModalContent.classList.add("scale-out"); // Add scale-out animation class

  // Wait for the animations to complete before hiding the modal
  setTimeout(() => {
    usageModal.style.display = "none"; // Hide modal
    usageModal.classList.remove("fade-out"); // Reset fade-out class
    usageModalContent.classList.remove("scale-out"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === usageModal) {
    usageCloseBtn.click(); // Trigger the close button's functionality
  }
});
