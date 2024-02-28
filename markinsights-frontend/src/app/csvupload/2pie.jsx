import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Plots = ({ plotData }) => {
    const chartRefs = useRef([]);
    const charts = useRef([]); // Create a separate ref to store chart instances

    useEffect(() => {
        if (plotData) {
            const genderDistributionData = {
                datasets: [{
                    data: [plotData.number_of_males, plotData.number_of_females],
                    backgroundColor: ['blue', 'pink']
                }],
                labels: ['Men' , 'Women']
            };

            const ageDistributionData = {
                datasets: [{
                    data: [
                        plotData.age_less_than_20,
                        plotData.age_between_20_and_40,
                        plotData.age_greater_than_40
                    ],
                    backgroundColor: ['green', 'orange', 'red']
                }],
                labels: ['0-20 yr old ' , '20-40 yr old' , '40+ yrs old']
            };

            // Destroy existing Chart instances before creating new ones
            charts.current.forEach(chartInstance => {
                if (chartInstance) {
                    chartInstance.destroy();
                }
            });

            // Gender distribution chart
            const genderChartCanvas = chartRefs.current[0];
            charts.current[0] = new Chart(genderChartCanvas, {
                type: 'pie',
                data: genderDistributionData,
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'left'
                        },
                        labels: {
                            render: 'percentage',
                            fontSize: 14,
                            fontColor: 'white',
                            position: 'outside'
                        }
                    }
                }
            });

            // Age distribution chart
            const ageChartCanvas = chartRefs.current[1];
            charts.current[1] = new Chart(ageChartCanvas, {
                type: 'pie',
                data: ageDistributionData,
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        labels: {
                            render: 'percentage',
                            fontSize: 14,
                            fontColor: 'white',
                            position: 'outside'
                        }
                    }
                }
            });
        }
    }, [plotData]);

    return (
        <div className="container">
            <h2 className="m-2 flex items-center justify-center my-4">Customer Segmentation </h2>
            <div className="flex justify-center items-center">
                <div className="w-1/2 h-40" style={{ position: 'relative' }}>
                    <canvas ref={ref => chartRefs.current[0] = ref} width="200" height="200"></canvas>
                   
                </div>
                <div  style={{ position: 'relative' }}>
                    <canvas ref={ref => chartRefs.current[1] = ref} width="200" height="200"></canvas>
                   
                </div>
            </div>
        </div>
    );
};

export default Plots;
