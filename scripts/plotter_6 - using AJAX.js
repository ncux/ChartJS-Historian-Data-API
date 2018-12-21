let API = {
    access_token: "",
    tagsUrl: 'https://dev.sealu.net:4433/api/v1/forward?url=/historian-rest-api/v1/tagslist',
    dataUrl: "https://dev.sealu.net:4433/api/v1/forward?url=/historian-rest-api/v1/datapoints/calculated"
};

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
        console.log('button clicked');

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${API.url}`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + API.access_token);
        // xhr.open('GET', `./data/WIN-9DBOGP80695.Simulation00052.json`, true);

        xhr.onload = async () => {
            if(xhr.status === 200) {
                console.log(xhr.responseText);
                let sampleValues = await JSON.parse(xhr.responseText);
                console.log(sampleValues);
                sampleValues.forEach(value => {
                    // console.log(value.Value);
                    // console.log(value.TimeStamp);
                    timeArray.push(simplifyTime(value.TimeStamp));
                    // valuesArray.push(Math.ceil(value.Value));
                    valuesArray.push((parseInt(value.Value)).toFixed(0));
                    plotChart();
                })

            }
        };

        xhr.send();

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


