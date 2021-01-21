function buildCharts(id) {
    d3.json("data/samples.json").then((data) => {
        console.log(data);

        // Build bar chart

        // Filter samples by ID
        var samples = data.samples.filter(sample => sample.id === id)[0];;
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
            marker: {
                color: "#e31478"
            },
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 Samples",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 80,
                r: 50,
                t: 50,
                b: 20
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
                color: topOTU,
                colorscale: "Rainbow"
            },
            text: labels
        }];

        var bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            xaxis: {
                title: "OTU ID"
            },
            height: 500,
            width: 900
        };

        // Build bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

function displayMetadata(id) {
    d3.json("data/samples.json").then((data) => {
        // Save metadata into variable
        var metadata = data.metadata;
        console.log("Meta", metadata);

        // Find the metadata for the selected ID
        var idInfo = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select display item
        dataDisplay = d3.select('#sample-metadata');

        // Clear old data
        dataDisplay.html("");

        // Fill out the display
        Object.entries(idInfo).forEach((key)=> {
            dataDisplay.append("p").text(key[0] + ": " + key[1] + "\n");

        });
    });
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
    d3.json("data/samples.json").then((data) => {
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
  