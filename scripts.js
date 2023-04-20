// Get references to the HTML elements
const imagePreview = document.getElementById('image-preview');
const petNameOutput = document.getElementById('pet-name');
const latencyOutput = document.getElementById('latency');
const clearButton = document.getElementById('clear-button');
const submitButton = document.getElementById('submit-button');

// Set up a function to capture the image from the camera and display it on the page
function captureImage() {
    // TODO: Add code here to capture the image from the Raspberry Pi camera and set the 'src' attribute of the 'imagePreview' element to the captured image
}

// Add an event listener to the 'clear' button to clear the output fields
clearButton.addEventListener('click', () => {
    petNameOutput.textContent = '';
    latencyOutput.textContent = '';
});

// Add an event listener to the 'submit' button to send the image to the Django view for image recognition
submitButton.addEventListener('click', () => {
    // Get the image data from the 'imagePreview' element
    const imageData = imagePreview.getAttribute('src');

    // Create a new FormData object to send the image data to the server
    const formData = new FormData();
    formData.append('image', imageData);

    // Send a POST request to the server with the image data
    fetch('/recognize-image', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Update the output fields with the pet name and latency
        petNameOutput.textContent = data.petName;
        latencyOutput.textContent = `Latency: ${data.latency}ms`;
    })
    .catch(error => {
        console.error(error);
    });
});

// Call the 'captureImage' function when the page loads
captureImage();
