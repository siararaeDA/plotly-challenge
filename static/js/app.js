function buildBarChart(id) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

        var metadata = data.metadata;

        console.log(metadata);
    });
}

function buildBubbleChart(id) {

}

function displayMetadata(id) {

}

// Function called when dropdown value changes
function optionChanged(id) {
    buildBarChart(id);
    buildBubbleChart(id);
    displayMetadata(id);
}

// Initalize page
function init() {
    // Select the dropdown menu
    var dropdown = d3.select("#selDataset")
    // Read in the data
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

        // Add the id's to the dropdown
        data.names.forEach(function(bbID) {
            dropdown.append("option").text(bbID).property("value");
        });
    });

    // Update horizontal bar chart

    // Update bubble chart

    // Updata metadata display
}

init();
  