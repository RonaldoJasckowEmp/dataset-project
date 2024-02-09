import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { LineChart } from '@portaljs/components';

const OpponentCountChart: React.FC<{ csvUrl: string }> = ({ csvUrl }) => {
    const [goalsByYear, setGoalsByYear] = useState<{ [year: string]: number }>({});
    const [totalGoals, setTotalGoals] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(csvUrl);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);

            Papa.parse(csv, {
                header: true,
                complete: (result) => {
                    const goals: { [year: string]: number } = {};

                    result.data.forEach((row) => {
                        const date = row['Date'];
                        let year = date.split('/')[2]; // Extracting the year from dd/mm/yyyy format
                        if (!year) {
                            year = date.split('-')[2]; // Extracting the year from dd-mm-yyyy format
                        }
                        if (year) {
                            year = "20" + year; // Prepend "20" to the year
                            if (goals[year]) {
                                goals[year]++;
                            } else {
                                goals[year] = 1;
                            }
                        }
                    });

                    setGoalsByYear(goals);

                    const total = Object.values(goals).reduce((acc, val) => acc + val, 0);
                    setTotalGoals(total);
                },
            });
        };

        fetchData();
    }, [csvUrl]);

    // Format data for LineChart component
    const lineChartData = Object.entries(goalsByYear).map(([year, goals]) => [year, goals]);

    return (
        <div>
            <LineChart data={lineChartData} />
            <p>Total Goals: {totalGoals}</p>
        </div>
    );
};

export default OpponentCountChart;
