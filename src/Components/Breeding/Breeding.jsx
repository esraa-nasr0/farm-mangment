import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";
import { IoIosSave } from "react-icons/io"; // For the save icon

export default function Breeding() {
    const [numberOfBirths, setNumberOfBirths] = useState(1);
    const [birthEntries, setBirthEntries] = useState([{ tagId: '', gender: '', birthweight: '' }]);
    let { Authorization } = useContext(UserContext);

    async function Breading(values) {
        try {
            const dataToSubmit = {
                ...values,
                birthEntries,
            };

            console.log('Submitting form with values:', dataToSubmit);

            let { data } = await axios.post(
                `https://farm-project-bbzj.onrender.com/api/breeding/AddBreeding`,
                dataToSubmit,
                {
                    headers: {
                        Authorization:` Bearer ${Authorization}`,
                    },
                }
            );

            console.log('Response:', data);
        
        } catch (err) {
            console.log(err.response?.data);
        }
    }

    const validationSchema = Yup.object({
        tagId: Yup.string().required('Tag ID is required'),
        deliveryState: Yup.string().required('Delivery state is required').max(50, 'Delivery state must be 50 characters or less'),
        deliveryDate: Yup.date().required('Delivery date is required').typeError('Invalid date format'),
        numberOfBirths: Yup.number().required('Number of births is required').min(1, 'At least 1').max(4, 'No more than 4'),
    });

    const formik = useFormik({
        initialValues: {
            tagId: '',
            deliveryState: '',
            deliveryDate: '',
            numberOfBirths: 1,
        },
        validationSchema,
        onSubmit: Breading
    });

    function handleNumberOfBirthsChange(e) {
        const newNumberOfBirths = parseInt(e.target.value, 10);

        // التأكد من أن القيمة الجديدة تبقى بين 1 و 4
        if (newNumberOfBirths < 1) {
            setNumberOfBirths(1);
            return;
        } else if (newNumberOfBirths > 4) {
            setNumberOfBirths(4);
            return;
        }

        setNumberOfBirths(newNumberOfBirths);

        setBirthEntries((prev) => {
            const newEntries = prev.slice(0, newNumberOfBirths);
            while (newEntries.length < newNumberOfBirths) {
                newEntries.push({ tagId: '', gender: '', birthweight: '' });
            }
            return newEntries;
        });

        formik.setFieldValue("numberOfBirths", newNumberOfBirths);
    }
    
    function handleBirthEntriesChange(e, index) {
        const { name, value } = e.target;
        setBirthEntries((prevEntries) => {
            const updatedEntries = [...prevEntries];
            updatedEntries[index][name] = value;
            return updatedEntries;  
        });
    }

    return (
        <div className="container">
            <div className="title2">Breeding</div>
            <form onSubmit={formik.handleSubmit} className="mt-5">
                <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-dark button2">
                    <IoIosSave /> Save
                </button>
                <div className="animaldata">
                    <div className="input-box">
                        <label className="label" htmlFor="tagId">Tag ID</label>
                        <input
                            {...formik.getFieldProps('tagId')}
                            placeholder="Enter your Tag ID"
                            id="tagId"
                            type="text"
                            className="input2"
                        />
                        {formik.touched.tagId && formik.errors.tagId ? <p className="text-danger">{formik.errors.tagId}</p> : null}
                    </div>

                    <div className="input-box">
                        <label className="label" htmlFor="deliveryState">Delivery State</label>
                        <input
                            {...formik.getFieldProps('deliveryState')}
                            placeholder="Enter your delivery state"
                            id="deliveryState"
                            type="text"
                            className="input2"
                        />
                        {formik.touched.deliveryState && formik.errors.deliveryState ? <p className="text-danger">{formik.errors.deliveryState}</p> : null}
                    </div>

                    <div className="input-box">
                        <label className="label" htmlFor="deliveryDate">Delivery Date</label>
                        <input
                            {...formik.getFieldProps('deliveryDate')}
                            placeholder="Enter your delivery date"
                            id="deliveryDate"
                            type="date"
                            className="input2"
                        />
                        {formik.touched.deliveryDate && formik.errors.deliveryDate ? <p className="text-danger">{formik.errors.deliveryDate}</p> : null}
                    </div>

                    <div className="input-box">
                        <label className="label" htmlFor="numberOfBirths">Number of Births</label>
                        <input
                            value={numberOfBirths}
                            onChange={handleNumberOfBirthsChange}
                            placeholder="Enter number of births"
                            id="numberOfBirths"
                            type="number"
                            className="input2"
                            name="numberOfBirths"
                        />
                        {formik.touched.numberOfBirths && formik.errors.numberOfBirths ? <p className="text-danger">{formik.errors.numberOfBirths}</p> : null}
                    </div>
                    {birthEntries.map((entry, index) => (
    <div key={index} className="input-box">
        <label className="label" htmlFor={`tagId-${index}`}>Calf Tag ID {index + 1}</label>
        <input
            value={entry.tagId}
            onChange={(e) => handleBirthEntriesChange(e, index)}
            placeholder="Enter Calf Tag ID"
            id={`tagId-${index}`}
            name="tagId"
            type="text"
            className="input2"
        />

        <label className="label" htmlFor={`gender-${index}`}>Gender {index + 1}</label>
        <input
            value={entry.gender}
            onChange={(e) => handleBirthEntriesChange(e, index)}
            placeholder="Enter Gender"
            id={`gender-${index}`}
            name="gender"
            type="text"
            className="input2"
        />

        <label className="label" htmlFor={`birthweight-${index}`}>Birth Weight {index + 1}</label>
        <input
            value={entry.birthweight}
            onChange={(e) => handleBirthEntriesChange(e, index)}
            placeholder="Enter Birth Weight"
            id={`birthweight-${index}`}
            name="birthweight"
            type="number"
            className="input2"
        />
    </div>
))}

                </div>
            </form>
        </div>
    );
}