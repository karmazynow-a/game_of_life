//operations with plot

var chartData = []
var chartSizeX = 600, chartSizeY = 250;
var chart = {
    "type": "line",
    'scale-x': {
        label: {
            text: "Czas",
        },
    },
    'scale-y': {
        label: {
            text: "Gęstość",
        },
        values: '0:100:20',
    },
    "series": [
        { "values": chartData }
    ]
};

function paintPlot() {
    zingchart.exec('plot', 'clearfeed');
    chartData = []
    zingchart.render({
        id: 'plot',
        data: chart,
        height: chartSizeY,
        width: chartSizeX
    });
}

function updatePlot() {
    chartData.push(sumMatrix() / (matrixSizeX * matrixSizeY) * 100);
    zingchart.exec('plot', 'modify', {
        graphid: 0,
        data: {
            "series": [
                { "values": chartData }
            ]
        }
    });
}