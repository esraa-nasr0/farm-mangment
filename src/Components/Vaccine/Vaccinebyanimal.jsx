import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { IoIosSave } from "react-icons/io";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from 'react-router-dom';

function Vaccinebyanimal() {
    const { Authorization } = useContext(UserContext);

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            vaccineName: '',
            givenEvery: '',
            tagId: '',
            DateGiven: '',
        },
        onSubmit: async (values) => {
            setIsLoading(true);  // Start loading
            const dataToSend = {
                vaccineName: values.vaccineName,
                givenEvery: values.givenEvery,
                vaccinationLog: [
                    {
                        tagId: values.tagId,
                        DateGiven: values.DateGiven,
                    },
                ],
            };

            try {
                const response = await axios.post(
                    'https://farm-project-bbzj.onrender.com/api/vaccine/AddVaccineForAnimal',
                    dataToSend,
                    {
                        headers: {
                            Authorization: `Bearer ${Authorization}`,
                        },
                    }
                );

                if (response.data.status === "success") {
                    setIsLoading(false);
                    console.log(response.data);
                    navigate('/vaccineTable');
                }
            } catch (error) {
                setError(error.response?.data || error.message);
                console.error('Error submitting data:', error.response?.data || error.message);
                setIsLoading(false);  // Stop loading if error occurs
            }
        },
    });

    return (
        <>
            <div className="container">
                <div className="title2">Vaccine</div>
                <p className="text-danger">{error}</p>
                <form onSubmit={formik.handleSubmit} className="mt-5">
                    {isLoading ? (
                        <button type="submit" className="btn button2" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                        </button>
                    ) : (
                        <button type="submit" className="btn button2">
                            <IoIosSave /> Save
                        </button>
                    )}

                    <div className="animaldata">
                        <div className="input-box">
                            <label className="label" htmlFor="vaccineName">Vaccine Name</label>
                            <input
                                id="vaccineName"
                                name="vaccineName"
                                type="text"
                                className="input2"
                                placeholder="Enter vaccine name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.vaccineName}
                            />
                        </div>

                        <div className="input-box">
                            <label className="label" htmlFor="givenEvery">Given Every</label>
                            <select
                                id="givenEvery"
                                name="givenEvery"
                                className="input2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.givenEvery}
                            >
                                <option value="">Select interval</option>
                                <option value="90">3 months (90 days)</option>
                                <option value="180">6 months (180 days)</option>
                                <option value="365">12 months (365 days)</option>
                            </select>
                        </div>

                        <div className="input-box">
                            <label className="label" htmlFor="tagId">Tag ID</label>
                            <input
                                id="tagId"
                                name="tagId"
                                type="text"
                                className="input2"
                                placeholder="Enter tag ID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.tagId}
                            />
                        </div>

                        <div className="input-box">
                            <label className="label" htmlFor="DateGiven">Date Given</label>
                            <input
                                id="DateGiven"
                                name="DateGiven"
                                type="date"
                                className="input2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.DateGiven}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Vaccinebyanimal;
