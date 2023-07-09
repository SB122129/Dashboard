    
 async function getcharts ()  {
    let loading=document.getElementById('loading')
    loading.innerHTML=`<div class="d-flex justify-content-center">
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
    
                
            const response = await fetch(`https://api.covidtracking.com/v1/states/current.json`);
            if(!response.ok) {
                console.log('Error retrieving data');
                return;
            }
            const reponseData = await response.json();
            loading.innerHTML=``
            console.log(reponseData)
            

            let arr=[]
            let arr2=[]
            let arr3=[]
            let arr4=[]
            
            
            for(i=0;i<reponseData.length;i++){
                
                
                 arr[i]=[reponseData[i].hospitalized]
                 arr2[i]=[reponseData[i].death]
                 arr3[i]=[reponseData[i].hospitalizedCurrently]
                 arr4[i]=[reponseData[i].state]
                 
            }
               
                console.log(arr2[22])

            Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'CoronVirus Data US',
        align: 'left'
    },
    subtitle: {
        text: 'Source: The COVID Tracking Project',
        align: 'left'
    },
    xAxis: {
        categories: [arr4[0], arr4[1], arr4[2], arr4[5],arr4[4]],
        title: {
            text: 'Sates '
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' thousand'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },colors: [
        'yellow',
        'black',
        'red'
        ],
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
            name: 'Hospitalized',
            data:  [arr[0],arr[1],arr[2],arr[5],arr[4]]
        }, {
            name: 'Deaths',
            data: [arr2[0],arr2[1],arr2[2],arr2[5],arr2[4]]
        }, {
            name: 'Hospitalized Currently',
            data: [arr3[0],arr3[1],arr3[2],arr3[5],arr3[4]]
        }]
});
let firstChart = Highcharts.charts[0];
let btn = document.getElementById('randomize');

function changedata(){
    let rand1=Math.floor(Math.random() * 56)
    let rand2=Math.floor(Math.random() * 56)
    let rand3=Math.floor(Math.random() * 56)
    let rand4=Math.floor(Math.random() * 56)
    let rand5=Math.floor(Math.random() * 56)
    firstChart.xAxis[0].update({categories: [arr4[rand1], arr4[rand2], arr4[rand3], arr4[rand4],arr4[rand5]]})

    firstChart.series[0].update({ 
    name: 'Hospitalized',
    data:  [arr[rand1],arr[rand2],arr[rand3],arr[rand4],arr[rand5]]
})
firstChart.series[1].update({
    name: 'Deaths',
    data: [arr2[rand1],arr2[rand2],arr2[rand3],arr2[rand4],arr2[rand5]]
}) 
firstChart.series[2].update({
    name: 'Hospitalized Currently',
    data: [arr3[rand1],arr3[rand2],arr3[rand3],arr3[rand4],arr3[rand5]]
})
}

        btn.addEventListener('click', changedata)
        
        
        let actualTerm='ca'
        async function generatePieChart(){
          
              const response2 = await fetch(` https://api.covidtracking.com/v1/states/${actualTerm}/current.json`);
                  if(!response2.ok) {
                      console.log('Error retrieving data');
                      return;
                  }
                  const reponseData2 = await response2.json();
                  console.log(reponseData2)
                  
                  let arrs=reponseData2
                  Highcharts.chart('container2',{
                      chart: {
                          renderTo: 'container2',
                          plotBackgroundColor: null,
                          plotBorderWidth: null,
                          plotShadow: false,
                          type: 'pie'
                      },
                      title: {
                          text: `COVID Data of the state of  ${actualTerm.toUpperCase()}`,
                          align: 'left'
                      },
                      tooltip: {
                          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                      },
                      accessibility: {
                          point: {
                              valueSuffix: '%'
                          }
                      },
                      plotOptions: {
                          pie: {
                              allowPointSelect: true,
                              cursor: 'pointer',
                              dataLabels: {
                                  enabled: false
                              },
                              showInLegend: true
                          }
                      },
                      colors: [
                        'blue',
                        'red',
                        'yellow',
                        'black'
                        ],
                      series: [{
                          name: 'Status',
                          colorByPoint: true,
                          data: [{
                              name: 'Hospitalized',
                              y: arrs.hospitalized
                          },  {
                              name: 'In ICU',
                              y: arrs.inIcuCurrently
                          },  {
                              name: 'On Ventilator',
                              y: arrs.onVentilatorCurrently
                          }, {
                              name: 'Deaths',
                              y: arrs.death
                          }]
                      }]
                  });
                  
            }

generatePieChart();
let searchbtn=document.getElementById('searchbtn');
        
        searchbtn.addEventListener('click',changePieChart)
function changePieChart(){
    let searchterm=document.querySelector('#searchTerm').value;
    actualTerm=searchterm
generatePieChart() ;
}

let searchterm2='eth'
async function eco (){
   
  const response = await fetch(`http://api.worldbank.org/v2/country/${searchterm2}/indicator/SP.POP.TOTL?format=json`);
      if(!response.ok) {
          console.log('Error retrieving data');
          return;
      }
      const reponseData = await response.json();
      console.log(reponseData)
      
        let arr2=[]
    
      for(i=0;i<reponseData[1].length;i++){
           arr2[i]=[reponseData[1][i]]
         }
console.log(arr2[22][0].value)
Highcharts.chart('container4',{
chart: {
renderTo:'container4',
type: 'column',
options3d: {
    enabled: true,
    alpha: 15,
    beta: 15,
    depth: 50,
    viewDistance: 25
}
},
xAxis: {
categories: ['2020', '2010', '2000', '1990','1980','1973']
},
yAxis: {
title: {
    enabled: false
}
},
tooltip: {
headerFormat: '<b>{point.key}</b><br>',
pointFormat: 'Popluation: {point.y}'
},
title: {
text: `Total Popluation of  ${searchterm2.toUpperCase()} the last six decades`,
align: 'left'
},
subtitle: {
text: 'Source: ' +
    '<a href="https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL"' +
    'target="_blank">World Bank</a>',
align: 'left'
},
legend: {
enabled: false
},
plotOptions: {
column: {
    depth: 25
}
},
colors: [
    'blue',
    ' #228B22',
    'yellow',
    'indigo',
    'cyan',
    'brown'
    ],
series: [{
data: [arr2[2][0].value,arr2[12][0].value, arr2[22][0].value, arr2[32][0].value, arr2[42][0].value, arr2[49][0].value],
colorByPoint: true
}]
});
        }
         eco();
        let swithbtn = document.getElementById('switchbtn')
        
        
        function changedata2(){
let option = document.getElementById('op').value
console.log(option)
if(option=='Ethiopia'){
searchterm2='eth'
eco()
return

}
else if(option=='Sudan'){
searchterm2='sdn'
eco()
return
}
else if(option=='Kenya'){
searchterm2='ken'
eco()
return
} else if(option=='Uganda'){
searchterm2='uga'
eco()
return
}

}

swithbtn.addEventListener('click',changedata2)
       


let actualTerm1='chn'
let actualTerm2='eth'
async function agriChart (){
   
    const response = await fetch(`https://api.worldbank.org/v2/country/${actualTerm1}/indicator/SL.AGR.EMPL.ZS?format=json`);
        if(!response.ok) {
            console.log('Error retrieving data');
            return;
        }
        const reponseData = await response.json();
        console.log(reponseData)
        
          let arr2=[]
      
        for(i=0;i<reponseData[1].length;i++){
             arr2[i]=[reponseData[1][i]]
           }
           console.log(reponseData)
  console.log(arr2[22][0].value)
  
  const response2 = await fetch(`https://api.worldbank.org/v2/country/${actualTerm2}/indicator/SL.AGR.EMPL.ZS?format=json`);
        if(!response2.ok) {
            console.log('Error retrieving data');
            return;
        }
        const reponseData2 = await response2.json();
        console.log(reponseData2)
        
          let arr3=[]
      
        for(i=0;i<reponseData[1].length;i++){
             arr3[i]=[reponseData2[1][i]]
           }
  console.log(arr3[22][0].value)

Highcharts.chart('container3', {
    chart: {
        type: 'area'
    },
    accessibility: {
        description: `Image description: An area chart that compares the Agricultural Employment of ${actualTerm1.toUpperCase()} and ${actualTerm2.toUpperCase()} between 2011 and 2021.`
    },
    title: {
        text: `${actualTerm1.toUpperCase()} and ${actualTerm2.toUpperCase()} Agricultural Employment Rate`,
        align:'left'
    },
    subtitle: {
        text: 'Source: <a href="https://api.worldbank.org/v2/country/all/indicator/SL.AGR.EMPL.ZS" ' +
            'target="_blank">World Bank</a>'
    },
    xAxis: {
        allowDecimals: true,
        accessibility: {
            rangeDescription: 'Range: 2011 to 2021.'
        }
    },
    yAxis: {
        title: {
            text: 'Agricultural Employment'
        }
    },
    tooltip: {
        pointFormat: '{series.name} had <b>{point.y:,.0f}% Agri Employment</b><br/>in {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: 2011,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    colors: [
        'yellow',
        '#4169e1',
        'red'
        ],
    series: [{
        name: `${actualTerm1}`,
        data: [arr2[11][0].value,arr2[10][0].value, arr2[9][0].value, arr2[8][0].value,
        arr2[7][0].value,arr2[6][0].value,arr2[5][0].value,arr2[4][0].value,arr2[3][0].value,
        arr2[2][0].value,arr2[1][0].value]
    }, {
        name: `${actualTerm2}`,
        data: [arr3[11][0].value,arr3[10][0].value, arr3[9][0].value, arr3[8][0].value,
        arr3[7][0].value,arr3[6][0].value,arr3[5][0].value,arr3[4][0].value,arr3[3][0].value,
        arr3[2][0].value,arr3[1][0].value
        ]
    }]
});

          }
          agriChart()
          let comparebtn=document.querySelector('#compareBtn');
          comparebtn.addEventListener('click',changeAreaChart)
          function changeAreaChart(){
            let compareTerm=document.querySelector('#compareTerm').value;
            let compareTerm2=document.querySelector('#compareTerm2').value;
            actualTerm1=compareTerm
            actualTerm2=compareTerm2
            agriChart() ;
        }

        (async () => {

            const topology = await fetch(
                'http://code.highcharts.com/mapdata/countries/et/et-all.topo.json'
            ).then(response => response.json());
            
            console.log(topology)
            // Data structure: [country_code, latitude, longitude, capital_city]
            const newData = [
                ['et-2837', 9.005401, 38.763611, 'Addis Ababa'],
                ['et-ti', 14.1667, 38.8333, 'Tigray'],
                ['et-am', 11.663240, 37.821903, 'Amhara'],
                ['et-be', 11.0000 , 35.5000, 'Benshangul Gumuz'],
                ['et-ha', 	9.31387, 42.11815, 'Harar'],
                ['et-aa', 8.514477, 39.269257, 'Oromia'],
                ['et-sn', 6.058619, 36.7273, 'Southern Nations and Nationalities'],
                ['et-af', 11.75593880, 40.95868800, 'Afar'],
                ['et-so',  7.4387, 44.2969, 'Somalia'],
                ['et-dd', 9.6008747, 41.850142000000005, 'Dire Dawa'],
                ['et-ga', 8.25, 34.58333, 'Gambella'],
                
            ];
            // Get temperature for specific localization, and add it to the chart. It
            // takes point as first argument, countries series as second and capitals
            // series as third. Capitals series have to be the 'mappoint' series type,
            // and it should be defined before in the series array.
            async function getTemp(point, regionCodes, regions) {
            
                const json = await fetch(
                    'https://api.met.no/weatherapi/locationforecast/2.0/?' +
                        `lat=${point[1]}&lon=${point[2]}`
                ).then(response => response.json());
                console.log(json)
            
                const temp = json.properties.timeseries[0].data.instant.details.air_temperature,
                    value = parseInt(temp, 10);
                
            
                const regionCode = {
                    'hc-key': point[0],
                    value
                };
                const region = {
                    name: point[3],
                    lat: point[1],
                    lon: point[2],
                    colorKey: 'y',
                    y: Number.isInteger(value) ? value : null,
                    custom: {
                        label: Number.isInteger(value) ?
                            `${value}℃` :
                            '<span style="font-weight: normal; opacity: 0.5">N/A</span>'
                    },
                };
            
                regionCodes.addPoint(regionCode);
                regions.addPoint(region);
            }
            
            // Create the chart
            Highcharts.mapChart('container5', {
                chart: {
                    map: topology,
                    events: {
                        load: function () {
                            const regionCodes = this.series[0],
                                regions = this.series[1];
                            newData.forEach(elem => getTemp(elem, regionCodes, regions));
                        }
                    }
                },
            
                title: {
                    text: 'Current temperatures in Regions of Ethiopia',
                    align: 'left'
                },
            
                subtitle: {
                    text: 'Data source: <a href="https://api.met.no/">https://api.met.no/</a>',
                    align: 'left'
                },
            
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
            
                colorAxis: {
                    min: -25,
                    max: 40,
                    labels: {
                        format: '{value}°C'
                    },
                    stops: [
                        [0, '#0000ff'],
                        [0.3, '#6da5ff'],
                        [0.6, '#ffff00'],
                        [1, '#ff0000']
                    ]
                },
            
                legend: {
                    title: {
                        text: 'Degrees Celsius'
                    }
                },
            
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25CF</span> {point.key}:<br/>',
                    pointFormat: 'Temperature: <b>{point.custom.label}</b>'
                },
            
                series: [{
                    allAreas: true,
                    name: 'Temperatures',
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    accessibility: {
                        point: {
                            valueDescriptionFormat: '{xDescription}, {point.value}°C.'
                        }
                    }
                }, {
                    name: 'Tempratures',
                    type: 'mappoint',
                    showInLegend: false,
                    marker: {
                        lineWidth: 2,
                        lineColor: '#000'
                    },
                    dataLabels: {
                        crop: true,
                        format: '<span>{key}</span><br><span>{point.custom.label}</span>'
                    },
                    accessibility: {
                        point: {
                            valueDescriptionFormat: '{xDescription}, {point.temp}°C.'
                        }
                    }
                }]
            });
            
            })();

}
getcharts()
