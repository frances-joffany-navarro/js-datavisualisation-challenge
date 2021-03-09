
    var recordOne = [],
        recordTwo = [],
        year = [],
        headerOne = ["country"],
        headerTwo = [],
        lineDataSets1 = [],
        lineDataSets2 = [],
        index = ["label", "data", "backgroundColor", "borderColor", "borderWidth", "fill"],
        parent = document.getElementById("mw-content-text"),
        content = document.getElementById("content");

    //get the id of the table
    var title = document.getElementById("firstHeading");
    var tableOne = document.getElementById("table1");
    var tableTwo = document.getElementById("table2");

    //put canvas below the H1
    var graphLive = document.createElement("canvas");
    graphLive.setAttribute("id", "myChartLive");
    graphLive.setAttribute("width", "400");
    graphLive.setAttribute("height", "200");
    graphLive.setAttribute("aria-label", "Chart Live");
    graphLive.setAttribute("role", "img");
    content.insertBefore(graphLive, title.nextSibling);
    
    //put canvas before table1
    var graphOne = document.createElement("canvas");
    graphOne.setAttribute("id", "myChart1");
    graphOne.setAttribute("width", "400");
    graphOne.setAttribute("height", "200");
    graphOne.setAttribute("aria-label", "Chart 1");
    graphOne.setAttribute("role", "img");
    parent.insertBefore(graphOne, tableOne)

    //put canvas before table2
    var graphTwo = document.createElement("canvas");
    graphTwo.setAttribute("id", "myChart2");
    graphTwo.setAttribute("width", "400");
    graphTwo.setAttribute("height", "200");
    graphTwo.setAttribute("aria-label", "Chart 2");
    graphTwo.setAttribute("role", "img");
    parent.insertBefore(graphTwo, tableTwo)

    //Chart Live
    window.onload = function(){
        var myChartLive;
        var dataPoints = [];
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function(data) {  
            $.each(data, function(key, value){
                dataPoints.push({x: value[0], y: parseInt(value[1])});
            });

            var ctx = document.getElementById('myChartLive');
            myChartLive = new Chart(ctx, {
                type: 'line',
            data: {
                datasets: [{
                    label: 'Live Data',
                    data: dataPoints,
                    fill: false,
                    backgroundColor: "rgba(65,105,225,0.5)",
                    borderColor: "rgba(65,105,225,1)",
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }    
            });
    
            myChartLive.update();
            updateChart();
        });
    
        function updateChart() {
            $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function(data) {
                $.each(data, function(key, value) {
                    dataPoints.push({
                        x: parseInt(value[0]),
                        y: parseInt(value[1])
                    });
            });
            myChartLive.update();
            setTimeout(function(){updateChart()}, 1000);
            });
        }
    }

    //get data from table 1
    //first get the header
    for (var i = 2; i < tableOne.rows[1].cells.length; i++) {
        headerOne[i - 1] = tableOne.rows[1].cells[i].innerHTML;
        year[i - 2] = tableOne.rows[1].cells[i].innerHTML;
    }
    //second get the remaining data
    for (var i = 2; i < tableOne.rows.length; i++) {
        var dataOne = {};
        for (var j = 1; j < tableOne.rows[i].cells.length; j++) {
            if (j > 1) {
                dataOne[headerOne[j - 1]] = parseFloat((tableOne.rows[i].cells[j].innerHTML).replace(",", "."));
            } else {
                dataOne[headerOne[j - 1]] = tableOne.rows[i].cells[j].innerHTML;
            }
        }
        recordOne.push(dataOne);
    }

    //create a array of object for the dataset in chart.js
    for (var i = 0; i < recordOne.length; i++) {
        var lineData = {},
            chartData = [],
            bgcolor = [],
            bcolor = [],
            randomColor1 = Math.floor(Math.random() * 225) + 1,
            randomColor2 = Math.floor(Math.random() * 225) + 1,
            randomColor3 = Math.floor(Math.random() * 225) + 1;

        lineData[index[0]] = recordOne[i].country;

        for (var y = 2002; y <= 2012; y++) {
            chartData.push(recordOne[i][y]);
            bgcolor.push("rgba(" + randomColor1 + "," + randomColor2 + "," + randomColor3 + ",0.2)");
            bcolor.push("rgba(" + randomColor1 + "," + randomColor2 + "," + randomColor3 + ",1)");
        }

        lineData[index[1]] = chartData;
        lineData[index[2]] = bgcolor;
        lineData[index[3]] = bcolor;
        lineData[index[4]] = 1;
        lineData[index[5]] = false;
        lineDataSets1.push(lineData);
    }
    //chart.js for table 1
    var ctx1 = document.getElementById('myChart1');
    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: year,
            datasets: lineDataSets1
        },
        options: {
            /*legend: {
                display: true,
                position: 'right',
                align: 'start',
                fullWidth: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            }*/
        }
    });

    //get data from table 2
    for(var i = 1; i < tableTwo.rows[0].cells.length; i++){
        headerTwo[i-1] = (tableTwo.rows[0].cells[i].innerHTML).toLowerCase();
    }
    for(var i = 1; i < tableTwo.rows.length; i++){
        var dataTwo = {};
        for(var j = 1; j < tableTwo.rows[i].cells.length;j++){
            if(j > 1){
                dataTwo[headerTwo[j-1]] = parseInt(tableTwo.rows[i].cells[j].innerHTML);
            }else{
                var str = tableTwo.rows[i].cells[1].innerHTML;
                dataTwo[headerTwo[j-1]] = (tableTwo.rows[i].cells[j].innerHTML).replace(/\n|<br\s*\/?>|\s+/gi," "); 
            }
            
        }
        recordTwo.push(dataTwo);
    }   

    //create datasets for chart2
    for (var i = 0; i < recordTwo.length; i++) {
        var lineData = {},
            chartData = [],
            bgcolor = [],
            bcolor = [],
            randomColor1 = Math.floor(Math.random() * 225) + 1,
            randomColor2 = Math.floor(Math.random() * 225) + 1,
            randomColor3 = Math.floor(Math.random() * 225) + 1;

        lineData[index[0]] = recordTwo[i].country;
            chartData.push(recordTwo[i]["2007–09"]);
            chartData.push(recordTwo[i]["2010–12"]);
            bgcolor.push("rgba(" + randomColor1 + "," + randomColor2 + "," + randomColor3 + ",0.2)");
            bgcolor.push("rgba(" + randomColor1 + "," + randomColor2 + "," + randomColor3 + ",0.2)");
            bcolor.push("rgba(" + randomColor1 + "," + randomColor2 + "," + randomColor3 + ",1)");
            bcolor.push("rgba(" + randomColor1 + "," + randomColor2 + "," + randomColor3 + ",1)");

        lineData[index[1]] = chartData;
        lineData[index[2]] = bgcolor;
        lineData[index[3]] = bcolor;
        lineData[index[4]] = 1;
        lineData[index[5]] = false;
        lineDataSets2.push(lineData);
    }

    //chart.js for table 2
    var ctx2 = document.getElementById('myChart2');
    var myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["2007–09", "2010–12"], 
            datasets: lineDataSets2
        },
        options: {}
    });
