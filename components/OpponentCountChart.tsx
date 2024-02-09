import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Vega } from 'react-vega';

interface CsvRow {
    Opponent: string;
    Count: number;
}

const OpponentCountChart: React.FC<{ csvUrl: string }> = ({ csvUrl }) => {
    const [chartData, setChartData] = useState<{ opponent: string; count: number }[]>([]);
    const [sortedOpponents, setSortedOpponents] = useState<[string, number][]>([]);
    const [totalOpponentCount, setTotalOpponentCount] = useState<number>(0);


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
                    const counts: { [key: string]: number } = {};
                    result.data.forEach((row: CsvRow) => {
                        const opponent = row['Opponent'];
                        counts[opponent] = (counts[opponent] || 0) + 1;
                    });

                    // Sort opponents by count in descending order
                    const sortedOpponents = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                    setSortedOpponents(sortedOpponents);

                    const total = sortedOpponents.reduce((acc, [, count]) => acc + count, 0);
                    setTotalOpponentCount(total);

                    // Take only top 5 opponents
                    const topOpponents = sortedOpponents.slice(0, 5);

                    // Update chart data
                    setChartData(topOpponents.map(([opponent, count]) => ({ opponent, count })));
                },
            });
        };

        fetchData();
    }, [csvUrl]);

    const vegaData = {
        table: chartData.map(({ opponent, count }) => ({ x: opponent, y: count })),
    };

    return (
        <div>
            <Vega
                data={vegaData}
                spec={{
                    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
                    data: {
                        name: 'table'
                    },
                    encoding: {
                        x: {
                            field: 'x',
                            type: 'ordinal'
                        },
                        y: {
                            field: 'y',
                            type: 'quantitative'
                        }
                    },
                    mark: 'bar'
                }}
            />
        </div>
    );
};

export default OpponentCountChart;
