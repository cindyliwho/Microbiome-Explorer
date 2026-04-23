// URL to your JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let cachedData = null;

function init() {
    // Fetch the JSON data and initialize the page
    let dropdown = d3.select("#selDataset");
    d3.json(url).then((data) => {
        cachedData = data;
        for (let i = 0; i < data.names.length; i++){
            dropdown.append("option").text(data.names[i]).property("value", data.names[i]);
        };
        let sampleName = data.names[0];

        createHorizontalBarChart(sampleName);
        createBubbleChart(sampleName);
        createGaugeChart(sampleName);
        displayMetadata(sampleName);
    });
};

function createHorizontalBarChart(sample) {
    const selectedSample = cachedData.samples.find(s => s.id === sample);

    const yticks = selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const xticks = selectedSample.sample_values.slice(0, 10).reverse();
    const labels = selectedSample.otu_labels.slice(0, 10).reverse();

    const trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h",
        marker: {
            color: xticks,
            colorscale: [[0, "#e8ecf1"], [0.5, "#5b8bd4"], [1, "#0f3460"]]
        }
    };

    const layout = {
        title: { text: "Top 10 OTUs Found", font: { size: 18, color: "#333" } },
        xaxis: { title: "Sample Value" },
        margin: { l: 100, r: 30, t: 50, b: 50 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)"
    };

    Plotly.newPlot("bar", [trace], layout, { responsive: true });
}

function createBubbleChart(sample) {
    const selectedSample = cachedData.samples.find(s => s.id === sample);

    const trace = {
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: "markers",
        marker: {
            size: selectedSample.sample_values,
            color: selectedSample.otu_ids,
            colorscale: "YlGnBu",
            opacity: 0.75,
            line: { width: 0.5, color: "#fff" }
            }
        };
    const layout = {
        title: { text: "Bacteria Cultures Per Sample", font: { size: 18, color: "#333" } },
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Value" },
        hovermode: "closest",
        margin: { l: 60, r: 30, t: 50, b: 50 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)"
    };

    Plotly.newPlot("bubble", [trace], layout, { responsive: true });
}

// Function to display metadata
function displayMetadata(sample) {
    const metadata = cachedData.metadata.find(m => m.id == sample);
    const panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panel.append("h5").text(`${key.toUpperCase()}: ${value !== null ? value : "N/A"}`);
    });
}

function createGaugeChart(sample) {
    const metadata = cachedData.metadata.find(m => m.id == sample);
    const wfreq = metadata.wfreq !== null ? metadata.wfreq : 0;

    const trace = {
        value: wfreq,
        title: { text: "<b>Scrubs per Week</b>", font: { size: 14, color: "#555" } },
        type: "indicator",
        mode: "gauge+number",
        number: { font: { size: 28, color: "#0f3460" } },
        gauge: {
            axis: { range: [0, 9], tickwidth: 1, tickcolor: "#ccc" },
            bar: { color: "#0f3460" },
            bgcolor: "white",
            steps: [
                { range: [0, 1], color: "#f8f9fa" },
                { range: [1, 2], color: "#e8ecf1" },
                { range: [2, 3], color: "#d0dbe8" },
                { range: [3, 4], color: "#b3c7db" },
                { range: [4, 5], color: "#8badc9" },
                { range: [5, 6], color: "#6a96b8" },
                { range: [6, 7], color: "#4a7fa8" },
                { range: [7, 8], color: "#2d6890" },
                { range: [8, 9], color: "#0f3460" }
            ]
        }
    };
    const layout = {
        margin: { t: 30, b: 0, l: 30, r: 30 },
        paper_bgcolor: "rgba(0,0,0,0)",
        height: 250
    };
    Plotly.newPlot("gauge", [trace], layout, { responsive: true });
}


// Function to handle dropdown change
function optionChanged(selectedValue) {
    createHorizontalBarChart(selectedValue);
    createBubbleChart(selectedValue);
    createGaugeChart(selectedValue)
    displayMetadata(selectedValue);
}

init();