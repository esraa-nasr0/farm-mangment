import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Report() {
    const [animalType, setAnimalType] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [reportData, setReportData] = useState(null); // Renamed for clarity
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const Authorization = localStorage.getItem('Authorization');
    const headers = {
        Authorization: `Bearer ${Authorization}`,
    };

    async function getReport() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://farm-project-bbzj.onrender.com/api/filter/report', {
                params: {
                    animalType,
                    dateFrom,
                    dateTo,
                },
                headers,
            });
            const { data } = response;
            if (data.status === 'success') {
                setReportData(data.data); // Updated to use the correct data
            } else {
                setError('Unexpected response format');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching report');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the parameters being sent to the API
        console.log("Parameters sent to API:", {
            animalType,
            dateFrom,
            dateTo,
        });

        // Perform validation if necessary
        if (!animalType || !dateFrom || !dateTo) {
            setError("Please provide all required fields.");
            return;
        }

        getReport(); // Call the correct function to fetch data
    };

    useEffect(() => {
    }, [reportData]);

    // Provide fallback in case reportData is null
    const animalReport = reportData?.animalReport || [];
    const birthEntries = reportData?.birthEntries || {};
    const excludedReport = reportData?.excludedReport || [];

    // Calculate counts
    const totalAnimals = animalReport.reduce((acc, animal) => acc + animal.count, 0);
    const maleCount = animalReport.filter((animal) => animal.gender === 'male').reduce((acc, animal) => acc + animal.count, 0);
    const femaleCount = animalReport.filter((animal) => animal.gender === 'female').reduce((acc, animal) => acc + animal.count, 0);
    const breederCount = reportData?.pregnantAnimal || 0;

    // Birth entries
    const totalBirthEntries = birthEntries.totalBirthEntries || 0;
    const totalMales = birthEntries.totalMales || 0;
    const totalFemales = birthEntries.totalFemales || 0;

    // Excluded report counts
    const excludedSweep = excludedReport.filter((report) => report.excludedType === 'sweep').reduce((acc, report) => acc + report.count, 0);
    const excludedDeath = excludedReport.filter((report) => report.excludedType === 'death').reduce((acc, report) => acc + report.count, 0);
    const excludedSale = excludedReport.filter((report) => report.excludedType === 'sale').reduce((acc, report) => acc + report.count, 0);

    const totalExcluded = excludedSweep + excludedDeath + excludedSale;

    const pieData = {
        labels: ['Male', 'Female', 'Pregnant', 'Total Excluded', 'Total Birth Males', 'Total Birth Females'],
        datasets: [
            {
                data: [maleCount, femaleCount, breederCount, totalExcluded, totalMales, totalFemales],
                backgroundColor: ['#ffea00', '#FF69B4', '#219de5', '#e70505', '#4169E1', '#81a9d1'],
            },
        ],
    };

    return (
        <div className="container">
            <div className="title2">Report</div>
            <div className="form1-container">
                <form onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-secondary button2">Get Report</button>
                    <div className="animaldata">
                        <div className="input-box">
                            <label className="label">Animal Type:</label>
                            <select className="input2" value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
                                <option value="">Select Animal Type</option>
                                <option value="goat">Goat</option>
                                <option value="sheep">Sheep</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label className="label">Date From:</label>
                            <input type="date" className="input2" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label className="label">Date To:</label>
                            <input type="date" className="input2" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                        </div>
                    </div>
                </form>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            <h2 style={{color:'#88522e'}}>Current Status</h2>
            {reportData && (
                <div className="report-container">
                    <Pie data={pieData} />
                </div>
            )}

            {reportData && (
                <div className="summary">
                    <h3 className="summary-item total-animal">Total Animal: {totalAnimals}</h3>
                    <p className="summary-item male">Male: {maleCount}</p>
                    <p className="summary-item female">Female: {femaleCount}</p>
                    <p className="summary-item pregnant">Pregnant: {breederCount}</p>
                    <p className="summary-item total-birth-entries">Total Birth Entries: {totalBirthEntries}</p>
                    <p className="summary-item total-birth-males">Total Birth Males: {totalMales}</p>
                    <p className="summary-item total-birth-females">Total Birth Females: {totalFemales}</p>
                    <p className="summary-item total-excluded">Total Excluded: {totalExcluded}</p>
                    <p className="summary-item excluded-sweep">Excluded Sweep: {excludedSweep}</p>
                    <p className="summary-item excluded-death">Excluded Death: {excludedDeath}</p>
                    <p className="summary-item excluded-sale">Excluded Sale: {excludedSale}</p>
                </div>
            )}
        </div>
    );
}

export default Report;
