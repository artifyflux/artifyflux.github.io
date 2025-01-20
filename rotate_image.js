// Select the image element with the class 'rotation_true'
const imgElement = document.querySelector('.rotation_true');

// Add rotation and hue-change animation
if (imgElement) {
    imgElement.style.animation = 'rotateAndHue 10s linear infinite';

    // Inject keyframes for rotation and hue change
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotateAndHue {
            0% {
                transform: rotate(0deg);
                filter: hue-rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
                filter: hue-rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}
