import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Plots = ({ plotData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (plotData) {
            if (chartRef.current !== null) {
                chartRef.current.destroy();
            }

            const data = {
                labels: ['Target', 'Careless', 'Ideal', 'Sensible', 'Standard', 'Careful'],
                datasets: [{
                    label: 'Number of Customers',
                    data: [
                        plotData.count_0,
                        plotData.count_1,
                        plotData.count_2,
                        plotData.count_3,
                        plotData.count_4,
                        plotData.count_5
                    ],
                    backgroundColor: [
                        'rgb(255, 193, 7)',
                        'rgb(0, 150, 136)',
                        'rgb(156, 204, 101)',
                        'rgb(255, 87, 34)',
                        'purple',
                        'rgb(233, 30, 99)'
                    ]
                }]
            };

            const ctx = document.getElementById('barChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Levels'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Customers'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [plotData]);

    return (
        <div>
            <div className="m-9">
                <canvas id="barChart" width="400" height="400"></canvas>
            </div>
            <h2 className="m-2">Bar Chart</h2> 
        </div>
    );
};

export default Plots;
