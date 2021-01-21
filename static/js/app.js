function getData(id) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

        var metadata = data.metadata;

        console.log(metadata);
    });
}

getData();
  