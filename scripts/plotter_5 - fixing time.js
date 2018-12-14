
const ctx = document.querySelector('#chart').getContext('2d');

let valuesArray = [];
let timeArray = [];

let chartType = {
    bar: 'bar',
    line: 'line'
};

let data = {
    labels: timeArray,
    datasets: [{
        label: 'WIN-9DBOGP80695.Simulation00052',
        data: valuesArray,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

let options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:false
            }
        }]
    }
};



async function getValues() {
    try {
        let data = await fetch(`./data/WIN-9DBOGP80695.Simulation00052.json`);
        let SampleValues = await data.json();
        console.log(SampleValues);
        SampleValues.forEach(value => {
            // console.log(value.Value);
            console.log(value.TimeStamp);
            timeArray.push(simplifyTime(value.TimeStamp));
            // valuesArray.push(Math.ceil(value.Value));
            valuesArray.push((parseInt(value.Value)).toFixed(0));
            plotChart();
        })
    } catch (e) {
        console.log(e);
    }
}

function simplifyTime(timestamp) {
    return timestamp.slice(0, 19);
}

function plotChart() {
    const chart = new Chart(ctx, {
        type: chartType.bar,
        data: data,
        options: options
    });
}


