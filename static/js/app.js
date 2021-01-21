function buildCharts(id) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

        // Build bar chart

        // Filter samples by ID
        var samples = data.samples.filter(s => s.id.toString() === id)[0];;
        console.log(samples);

        // Get the top 10 samples
        var topSamples = samples.sample_values.slice(0, 10).reverse();
        // Get the top 10 OTU's
        var topOTU = (samples.otu_ids.slice(0, 10)).reverse();
        // Format OTU ID's
        var otuID = topOTU.map(d => "OTU " + d);
        // Get labels for hover
        var labels = samples.otu_labels.slice(0, 10);

        // Create trace and layout
        var barData = [{
            x: topSamples,
            y: otuID,
            text: labels,
            type: "bar",
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 OTU's",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        }
        // Create plot
        Plotly.newPlot("bar", barData, barLayout);

        // Create bubble chart

        // Create trace and layout
        var bubbleData =[{
            x: topOTU,
            y: topSamples,
            mode: "markers",
            marker: {
                size: topSamples,
                color: topOTU
            },
            text: labels
        }];

        var bubbleLayout = {
            xaxis: {
                title: "OTU ID"
            },
            height: 600,
            width: 1000
        };

        // Build bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

function displayMetadata(id) {

}

// Function called when dropdown value changes
function optionChanged(id) {
    buildCharts(id);
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
        buildCharts(data.names[0]);
        displayMetadata(data.names[0]);
    });  
}

init();
  