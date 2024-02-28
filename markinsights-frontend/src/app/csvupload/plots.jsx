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
                datasets: [{
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
                }],
                labels: ['High Income , Low Spending - TARGET', 'Low Income , High Spending - CARELESS', 'High Income , High Spending - IDEAL', 'High Income , Low Spending - SENSIBLE', 'Low Income , Low Spending - STANDARD', 'Avg Income ,  Low Spending - CAREFUL']
            };

            const ctx = document.getElementById('pieChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right', // Positioning the legend to the right
                        }
                    }
                }
            });
        }
    }, [plotData]);

    return (
        <div>
            {/*  */}
            <div className="m-9">
                <canvas id="pieChart" width="400" height="400"></canvas>
                {/* */}
            </div>
            <h2 className="m-2">Pie Chart</h2> 
        </div>
    );
};

export default Plots;
