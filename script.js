const promptInput = document.getElementById("prompt");
const generateButton = document.getElementById("generate");
const downloadButton = document.getElementById("download");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let generatedImageUrl = null; // To store the image URL for downloading
let image = new Image(); // Image object to hold the generated image
let zoomLevel = 1; // Default zoom level
let isPanning = false; // To track if the user is panning
let panStartX = 0; // Starting X position for panning
let panStartY = 0; // Starting Y position for panning
let offsetX = 0; // Image offset on X
let offsetY = 0; // Image offset on Y
let canvasActive = false; // To track if canvas is active (interactive)

// API key is hardcoded here
const apiKey = "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";

// Function to generate a random 20-digit number
function generateRandomFileName() {
  return `${Math.floor(Math.random() * 1e20).toString().padStart(20, '0')}.png`;
}

// Function to display text on the canvas with word wrapping
function displayCanvasMessage(message) {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  const maxWidth = canvas.width - 100; // Padding inside the canvas
  const lineHeight = 20; // Line height for text
  const x = 10; // Left padding
  let y = canvas.height / 2 - lineHeight; // Center vertically

  // Set font and text properties
  context.font = "16px Arial";
  context.fillStyle = "#ffffff";
  context.textAlign = "center";

  // Split the message into lines that fit within the canvas width
  const words = message.split(" ");
  let line = "";

  words.forEach((word, index) => {
    const testLine = line + word + " ";
    const testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth && index > 0) {
      context.fillText(line.trim(), canvas.width / 2, y);
      line = word + " ";
      y += lineHeight; // Move to the next line
    } else {
      line = testLine;
    }
  });

  // Draw the last line
  context.fillText(line.trim(), canvas.width / 2, y);
}

// Initial message on the canvas
displayCanvasMessage("Type your prompt and click Generate!");

// Enable/disable buttons based on input validation
function updateButtonState() {
  generateButton.disabled = !(promptInput.value.trim());
}

promptInput.addEventListener("input", updateButtonState);

// Function to query the Hugging Face API
async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.error("Error: " + response.statusText);
      throw new Error("API Error");
    }

    console.log("API Response received!");
    return await response.blob();
  } catch (error) {
    console.error("Error occurred during the API call:", error);
    throw error;
  }
}

// Disable canvas interactions by preventing mouse events
function disableCanvasInteractions() {
  canvasActive = false;
  canvas.style.pointerEvents = "none"; // Disable pointer events
}

// Enable canvas interactions after image is generated
function enableCanvasInteractions() {
  canvasActive = true;
  canvas.style.pointerEvents = "auto"; // Enable pointer events
}

// Generate button click event
generateButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();

  if (!prompt) return; // Just a safeguard, button is disabled if inputs are invalid

  // Disable canvas interactions while generating
  disableCanvasInteractions();

  displayCanvasMessage("Generating your image, this might take a while so do not reload the page...");
  generateButton.disabled = true; // Disable the generate button during generation
  downloadButton.disabled = true; // Disable the download button during generation

  try {
    console.log("Starting image generation...");
    const imageBlob = await query({ inputs: prompt });

    // Clear the canvas and draw the generated image
    image.onload = () => {
      // Ensure the image is scaled to fit the canvas size
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
      const x = (canvas.width - image.width * scale) / 2; // Center the image horizontally
      const y = (canvas.height - image.height * scale) / 2; // Center the image vertically
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
      console.log("Image generated and drawn to canvas.");

      // Re-enable canvas interactions
      enableCanvasInteractions();
    };

    generatedImageUrl = URL.createObjectURL(imageBlob); // Store the generated image URL
    image.src = generatedImageUrl;

    // Enable the download button after the image is loaded
    downloadButton.disabled = false;

    // Clear the prompt input field and update the button state
    promptInput.value = "";
    updateButtonState(); // Re-check the button state
  } catch (error) {
    console.error("Error generating image:", error);
    displayCanvasMessage(
      "An error occurred while calling the model.\nThe model might be too busy so consider trying again."
    );
  } finally {
    generateButton.disabled = false; // Re-enable the generate button
  }
});

// Download button click event
downloadButton.addEventListener("click", () => {
  if (generatedImageUrl) {
    const link = document.createElement("a");
    link.href = generatedImageUrl;
    link.download = generateRandomFileName(); // Generate a random 20-digit filename
    link.click();
  }
});

// Zoom function (scroll to zoom)
canvas.addEventListener("wheel", (event) => {
  if (!canvasActive) return; // Prevent zooming if canvas is inactive
  event.preventDefault();
  if (event.deltaY < 0) {
    zoomLevel *= 1.1; // Zoom in
  } else {
    zoomLevel /= 1.1; // Zoom out
  }

  // Ensure the image is scaled based on the zoom level
  const scale = Math.min(canvas.width / image.width, canvas.height / image.height) * zoomLevel;
  const x = (canvas.width - image.width * scale) / 2 + offsetX;
  const y = (canvas.height - image.height * scale) / 2 + offsetY;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, x, y, image.width * scale, image.height * scale);
});

// Pan the image with mouse drag
canvas.addEventListener("mousedown", (event) => {
  if (!canvasActive || event.button !== 0) return; // Prevent panning if canvas is inactive
  isPanning = true;
  panStartX = event.clientX;
  panStartY = event.clientY;
  canvas.style.cursor = "grabbing"; // Change cursor to grabbing
});

canvas.addEventListener("mousemove", (event) => {
  if (!canvasActive || !isPanning) return; // Prevent panning if canvas is inactive
  const dx = event.clientX - panStartX;
  const dy = event.clientY - panStartY;
  offsetX += dx;
  offsetY += dy;
  panStartX = event.clientX;
  panStartY = event.clientY;

  // Re-draw the image with the updated offset
  const scale = Math.min(canvas.width / image.width, canvas.height / image.height) * zoomLevel;
  const x = (canvas.width - image.width * scale) / 2 + offsetX;
  const y = (canvas.height - image.height * scale) / 2 + offsetY;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, x, y, image.width * scale, image.height * scale);
});

canvas.addEventListener("mouseup", () => {
  isPanning = false;
  canvas.style.cursor = "grab"; // Reset cursor to grab
});

canvas.addEventListener("mouseleave", () => {
  isPanning = false;
  canvas.style.cursor = "grab"; // Reset cursor to grab
});
