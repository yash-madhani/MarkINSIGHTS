import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Link from 'next/link'
import './Plots.css'; 

const Plots = ({ plotData }) => {
    const chartRefs = useRef([]);

    useEffect(() => {
        if (plotData) {
            chartRefs.current.forEach((canvasRef, index) => {
                const ctx = canvasRef.getContext('2d');
                const existingChart = Chart.getChart(ctx);
                if (existingChart) {
                    existingChart.destroy();
                }

                const totalCount = Object.keys(plotData).reduce((total, key) => {
                    if (key.startsWith("count_")) {
                        return total + plotData[key];
                    }
                    return total;
                }, 0);

                const classCount = plotData[`count_${index}`];
                const otherClassesCount = totalCount - classCount;

                const chartData = {
                    datasets: [{
                        data: [classCount, otherClassesCount],
                        backgroundColor: [
                            'rgb(255, 0, 0)',
                            'rgba(255,255,255, 0.2)', // Transparent color for the remaining percentage
                        ]
                    }]
                };

                new Chart(ctx, {
                    type: 'pie',
                    data: chartData,
                    options: {
                        responsive: false,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            });
        }
    }, [plotData]);

    return (
        <div className="container">
            <h2 className="m-2 flex items-center justify-center my-4">Customer Segmentation</h2>
            <div className="flex justify-center items-center">
                {Object.keys(plotData).map((key, index) => {
                    if (key.startsWith("count_")) {
                        const totalCount = Object.keys(plotData).reduce((total, key) => {
                            if (key.startsWith("count_")) {
                                return total + plotData[key];
                            }
                            return total;
                        }, 0);

                        const classCount = plotData[`count_${index}`];
                        const percentage = ((classCount / totalCount) * 100).toFixed(2);

                        // Generate random male and female percentages
                        const randomMalePercentage = Math.floor(Math.random() * 100);
                        const randomFemalePercentage = 100 - randomMalePercentage;

                        // Define the background color class based on index
                        let bgColorClass = "card glass rounded-lg p-2 mx-1";
                        if (index === 2) {
                            bgColorClass += " bg-neon-green";
                        } else if (index === 3) {
                            bgColorClass += " bg-purple";
                        } else if (index === 4 ) {
                            bgColorClass += " bg-grey";
                        } else if (index === 1) {
                            bgColorClass += " bg-grey";
                        }

                        // Define crown emojis
                        let crownEmoji = "";
                        if (index === 2) {
                            crownEmoji = "👑"; // King crown emoji
                        } else if (index === 3) {
                            crownEmoji = "👸"; // Queen crown emoji
                        }

                        // Define thumbs down and cross emojis
                        let feedbackEmoji = "";
                        if (index === 1) {
                            feedbackEmoji = "👎"; // Thumbs down emoji
                        } else if (index === 4) {
                            feedbackEmoji = "❌"; // Cross emoji
                        }

                        return (
                            <Link key={index} href={`/level${index + 1}`}>
                                <div className="col-lg-4 col-md-6 mb-4" style={{ textDecoration: 'none' }}>
                                    <div className={bgColorClass}>
                                        <div className="card-body">
                                            <h5 className="card-title flex justify-center items-center">{`Level ${index + 1}`} {crownEmoji} {feedbackEmoji}</h5>
                                            <canvas ref={ref => chartRefs.current[index] = ref} width="200" height="200"></canvas>
                                            <p className="card-text my-9">
                                                <strong>Total Customers:</strong> {classCount}
                                                <br />
                                                <strong>Percentage:</strong> {percentage}%
                                                <br />
                                                <strong className="text-blue-900">Male Percentage:</strong> {randomMalePercentage}%
                                                <br />
                                                <strong className="text-pink-700">Female Percentage:</strong> {randomFemalePercentage}%
                                                <br />
                                                {/* {feedbackEmoji && <span>{feedbackEmoji}</span>} */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Plots;
