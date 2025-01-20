// Get modal element
const modal = document.getElementById("myModal");

// Get button to open the modal
const openModalBtn = document.getElementById("openModalBtn");

// Get the close button inside the modal
const closeBtn = document.querySelector(".close-btn");

// Open the modal when the button is clicked
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex"; // Make modal container visible
  setTimeout(() => modal.classList.add("show"), 10); // Add 'show' class after a small delay for smooth transition
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show"); // Fade out
  modal.classList.add("fade-out"); // Add fade-out animation class
  const modalContent = document.querySelector(".modal-content");
  modalContent.classList.add("scale-out"); // Add scale-out animation

  // Wait for the animations to complete before hiding
  setTimeout(() => {
    modal.style.display = "none"; // Hide modal
    modal.classList.remove("fade-out"); // Reset fade-out class
    modalContent.classList.remove("scale-out"); // Reset scale-out class
  }, 300); // Match the duration of the animations
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeBtn.click(); // Trigger the close button's functionality
  }
});
