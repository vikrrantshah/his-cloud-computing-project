// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the table body element
var tableBody = document.querySelector("tbody");

// Define an array of image objects
var images = [
  {
    filename: "cat.jpg",
    date: "23.04.2023",
    object: "cat",
    confidence: 90,
    location: "Living room",
    objectCount: 1,
  },
  {
    filename: "dog.jpg",
    date: "23.04.2023",
    object: "dog",
    confidence: 85,
    location: "Backyard",
    objectCount: 2,
  },
  {
    filename: "bird.jpg",
    date: "22.04.2023",
    object: "bird",
    confidence: 80,
    location: "Front porch",
    objectCount: 1,
  },
];

// Loop through the images array and add a row to the table for each image
images.forEach(function (image) {
  // Create a new row element
  var row = document.createElement("tr");

  // Create a new cell element for the image filename
  var filenameCell = document.createElement("td");
  filenameCell.textContent = image.filename;

  // Create a new cell element for the date and time
  var datetimeCell = document.createElement("td");
  datetimeCell.textContent = image.date;

  // Create a new cell element for the view button
  var viewButtonCell = document.createElement("td");
  var viewButton = document.createElement("button");
  viewButton.textContent = "View";
  viewButton.addEventListener("click", function () {
    // Set the modal image source
    document.getElementById("modalImage").src = "images/" + image.filename;

    // Set the modal object details
    document.getElementById("modalObject").textContent = image.object;
    document.getElementById("modalConfidence").textContent = image.confidence;
    document.getElementById("modalLocation").textContent = image.location;
    document.getElementById("modalObjectCount").textContent =
      image.objectCount;

    // Show the modal
    modal.style.display = "block";
  });
  viewButtonCell.appendChild(viewButton);

  // Append the cells to the row
  row.appendChild(filenameCell);
  row.appendChild(datetimeCell);
  row.appendChild(viewButtonCell);

  // Append the row to the table body
  tableBody.appendChild(row);
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
