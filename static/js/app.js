function getData(id) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

        var metadata = data.metadata;

        console.log(metadata);
    });
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
}

init();
getData();
  