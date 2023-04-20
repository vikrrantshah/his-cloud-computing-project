const inputImage = document.getElementById('input-image');
const imagePreview = document.getElementById('image-preview');
const canvas = document.getElementById('canvas');
const category = document.getElementById('category');
const subcategory = document.getElementById('subcategory');
const confidence = document.getElementById('confidence');
const location = document.getElementById('location');
const objectCount = document.getElementById('object-count');
const clearButton = document.getElementById('clear-button');
const detectButton = document.getElementById('detect-button');
const progressBar = document.getElementById('progress-bar');

let model;
let predictions = [];

// Load the TensorFlow.js model
async function loadModel() {
    model = await tf.loadGraphModel('model/model.json');
}

// Clear the canvas and output container
function clearOutput() {
    predictions = [];
    category.innerText = '';
    subcategory.innerText = '';
    confidence.innerText = '';
    location.innerText = '';
    objectCount.innerText = '';
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the bounding box around the detected object
function drawBoundingBox(prediction) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'red';
    ctx.rect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3]);
    ctx.stroke();
}

// Update the output container with the details of the detected object(s)
function updateOutput() {
    if (predictions.length > 0) {
        // Display the details of the first detected object
        category.innerText = predictions[0].class;
        subcategory.innerText = predictions[0].subclass;
        confidence.innerText = `${(predictions[0].score * 100).toFixed(2)}%`;
        location.innerText = `[${predictions[0].bbox[0]}, ${predictions[0].bbox[1]}, ${predictions[0].bbox[2]}, ${predictions[0].bbox[3]}]`;
        objectCount.innerText = predictions.length.toString();
        // Draw the bounding box around the first detected object
        drawBoundingBox(predictions[0]);
    } else {
        // Clear the output container if no objects were detected
        clearOutput();
    }
}

// Detect objects in the input image
async function detectObjects() {
    // Clear the previous output
    clearOutput();

    // Get the input image data
    const input = tf.browser.fromPixels(imagePreview);
    const imageHeight = input.shape[0];
    const imageWidth = input.shape[1];

    // Preprocess the image
    const preprocessedInput = tf.image.resizeBilinear(input, [300, 300]).div(255.0).expandDims();
    
    // Run the model on the preprocessed image
    const predictionsTensor = await model.predict(preprocessedInput).array();
    predictions = tf.util.squeeze(predictionsTensor, 0);

    // Filter out low-confidence detections
    const threshold = 0.5;
    predictions = predictions.filter(prediction => prediction.score > threshold);

    // Convert the bounding box coordinates from normalized values to pixel values
    predictions.forEach(prediction => {
        prediction.bbox[0] *= imageWidth;
        prediction.bbox[1] *= imageHeight;
        prediction.bbox[2] *= imageWidth;
        prediction.bbox[3] *= imageHeight;
    });

    // Update the output container
    updateOutput();
}

// Load the model on page load
window.addEventListener('load', () => {
    loadModel();
});

// Handle input image change
inputImage.addEventListener('change', () => {
    const file = inputImage.files[0];
    if (file) {
        // Display the selected
