// Get modal element
const privacyModal = document.getElementById("privacyModal");

// Get button to open the modal
const openPrivacyModalBtn = document.getElementById("openPrivacyModalBtn");

// Get the close button inside the modal
const privacyCloseBtn = document.querySelector(".privacy-close-btn");

// Open the modal when the button is clicked
openPrivacyModalBtn.addEventListener("click", () => {
  privacyModal.style.display = "flex"; // Make modal container visible
  setTimeout(() => privacyModal.classList.add("visible"), 10); // Add 'visible' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
privacyCloseBtn.addEventListener("click", () => {
  privacyModal.classList.remove("visible"); // Fade out
  privacyModal.classList.add("fading-out"); // Add fade-out animation class

  const privacyModalContent = document.querySelector(".privacy_modal_content");
  privacyModalContent.classList.add("shrinking"); // Add scale-out animation class

  // Wait for the animations to complete before hiding the modal
  setTimeout(() => {
    privacyModal.style.display = "none"; // Hide modal
    privacyModal.classList.remove("fading-out"); // Reset fade-out class
    privacyModalContent.classList.remove("shrinking"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === privacyModal) {
    privacyCloseBtn.click(); // Trigger the close button's functionality
  }
});
