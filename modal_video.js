// Get modal element
const videoModal = document.getElementById("videoModal");

// Get button to open the modal
const openVideoModalBtn = document.getElementById("openVideoModalBtn");

// Get the close button outside the modal
const videoCloseBtn = document.querySelector(".video-close-btn");

// Open the modal when the button is clicked
openVideoModalBtn.addEventListener("click", () => {
  videoModal.style.display = "flex"; // Make modal container visible
  setTimeout(() => videoModal.classList.add("show"), 10); // Add 'show' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
videoCloseBtn.addEventListener("click", () => {
  videoModal.classList.remove("show"); // Fade out
  videoModal.classList.add("fade-out"); // Add fade-out animation class

  const videoModalContent = document.querySelector(".video_modal_content");
  videoModalContent.classList.add("scale-out"); // Add scale-out animation class

  // Wait for the animations to complete before hiding the modal
  setTimeout(() => {
    videoModal.style.display = "none"; // Hide modal
    videoModal.classList.remove("fade-out"); // Reset fade-out class
    videoModalContent.classList.remove("scale-out"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    videoCloseBtn.click(); // Trigger the close button's functionality
  }
});
