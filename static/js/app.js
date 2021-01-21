function buildBarChart(id) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

        // Build bar chart
        var samples = data.samples;
        console.log(samples);
    
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

        // Update/display charts
        buildBarChart(data.names[0]);
        buildBubbleChart(data.names[0]);
        displayMetadata(data.names[0]);
    });  
}

init();
  