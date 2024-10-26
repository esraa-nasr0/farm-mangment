import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { IoIosSave } from "react-icons/io";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";
import { VaccineanimalContext } from '../../Context/VaccineanimalContext';

function Vaccinebylocationshed() {
    const { Authorization } = useContext(UserContext);
    const { getallVaccineanimal } = useContext(VaccineanimalContext); // استخدام السياق لجلب البيانات

    const formik = useFormik({
        initialValues: {
            vaccineName: '',
            givenEvery: '',
            locationShed: '', 
            DateGiven: '',
        },
        onSubmit: async (values) => {
            const isVaccineExists = async (vaccineName) => {
                const response = await getallVaccineanimal();
                return response.data.vaccine.some(vaccine => vaccine.vaccineName === vaccineName);
            };

            if (await isVaccineExists(values.vaccineName)) {
                alert('هذا اللقاح موجود بالفعل!');
                return;
            }
            
            const dataToSend = {
                vaccineName: values.vaccineName,
                givenEvery: values.givenEvery,  
                vaccinationLog: [
                    {
                        locationShed: values.locationShed,
                        DateGiven: values.DateGiven,
                    },
                ],
            };

            try {
                const response = await axios.post(
                    'https://farm-project-bbzj.onrender.com/api/vaccine/AddVaccine',
                    dataToSend,
                    {
                        headers: {
                            Authorization: `Bearer ${Authorization}`,
                        },
                    }
                );

                console.log('API Response:', response.data);
                // يمكنك إضافة أي إجراء بعد نجاح الإرسال، مثل إعادة تعيين النموذج أو عرض رسالة نجاح
            } catch (error) {
                console.error('Error submitting data:', error.response?.data || error.message);
            }
        },
    });

    return (
        <>
            <div className="container">
                <div className="title2">Vaccine</div>
                <form onSubmit={formik.handleSubmit} className="mt-5">
                    <button type="submit" className="btn btn-dark button2">
                        <IoIosSave /> Save
                    </button>

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
                            <label className="label" htmlFor="locationShed">Location Shed</label>
                            <input
                                id="locationShed"
                                name="locationShed"
                                type="text"
                                className="input2"
                                placeholder="Enter tag ID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.locationShed}
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

export default Vaccinebylocationshed;