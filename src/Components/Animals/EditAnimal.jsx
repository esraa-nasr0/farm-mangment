import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { IoIosSave } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';

function EditAnimal() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag to check if data is loaded
    const { id } = useParams(); // Get the animal ID from the URL params
    let navigate = useNavigate();

    let Authorization = localStorage.getItem('Authorization');

    let headers = {
        Authorization: `Bearer ${Authorization}`
    };

    async function editAnimals(values) {
        setIsLoading(true);
        try {
            let { data } = await axios.patch(
                `https://farm-project-bbzj.onrender.com/api/animal/updateanimal/${id}`, 
                values,
                { headers }
            );
            console.log(data);
            setError(null);
            if (data.status === "success") {
                setIsLoading(false);
                navigate('/animals');
            }
        } catch (error) {
            console.error("Failed to edit animal:", error);
            setError("Failed to update animal. Please try again.");
            setIsLoading(false); 
        }
    }

    // Fetch the current animal details to set initial form values
    useEffect(() => {
        async function fetchAnimal() {
            try {
                let { data } = await axios.get(
                    `https://farm-project-bbzj.onrender.com/api/animal/getsinglanimals/${id}`, 
                    { headers } );
                // console.log( data); 
                // Check if `data.data.animal` exists and then set form values
                if (data && data.data && data.data.animal) {
                    formik.setValues({
                        tagId: data.data.animal.tagId || '',
                        breed: data.data.animal.breed || '',
                        animalType: data.data.animal.animalType || '',
                        gender: data.data.animal.gender || '',
                        femaleCondation: data.data.animal.femaleCondation || '',
                    });
                    setIsDataLoaded(true); 
                } else {
                    throw new Error("Unexpected API response structure");
                }
            } catch (error) {
                console.error("Failed to fetch animal data:", error);
                setError("Failed to fetch animal details.");
            }
        }
        fetchAnimal();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            tagId: '',
            animalType: '',
            breed: '',
            gender: '',
            femaleCondation: '' 
        },
        onSubmit: editAnimals
    });

    if (!isDataLoaded) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }

    return (
        <div className="container">
            <div className="title2">Edit Animals</div>
            <p className="text-danger">{error}</p>
            <form onSubmit={formik.handleSubmit} className='mt-5'>
                {isLoading ? (
                    <button type="submit" className="btn btn-dark button2" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                    </button>
                ) : (
                    <button type="submit" className="btn btn-dark button2">
                        <IoIosSave /> Save
                    </button>
                )}

                <div className="animaldata">
                    <div className="input-box">
                        <label className="label" htmlFor="tagId">Tag ID</label>
                        <input 
                            onBlur={formik.handleBlur} 
                            onChange={formik.handleChange} 
                            value={formik.values.tagId} 
                            placeholder="Enter your Tag ID" 
                            id="tagId" 
                            type="text" 
                            className="input2" 
                            name="tagId"
                        />
                        {formik.errors.tagId && formik.touched.tagId && ( 
                            <p className="text-danger">{formik.errors.tagId}</p> 
                        )}
                    </div>

                    <div className="input-box">
                        <label className="label" htmlFor="breed">Breed</label>
                        <input 
                            onBlur={formik.handleBlur} 
                            onChange={formik.handleChange} 
                            value={formik.values.breed} 
                            placeholder="Enter Breed" 
                            id="breed" 
                            type="text" 
                            className="input2" 
                            name="breed"
                        />
                        {formik.errors.breed && formik.touched.breed && ( 
                            <p className="text-danger">{formik.errors.breed}</p> 
                        )}
                    </div>

                    <div className="input-box">
                        <label className="label" htmlFor="animalType">Animal Type</label>
                        <select
                            value={formik.values.animalType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="input2"
                            name="animalType"
                            id="animalType"
                        >
                            <option value="">Animal Type</option>
                            <option value="goat">Goat</option>
                            <option value="sheep">Sheep</option>
                        </select>
                        {formik.errors.animalType && formik.touched.animalType && (
                            <p className="text-danger">{formik.errors.animalType}</p>
                        )}
                    </div>

                    <div className="input-box">
                        <label className="label" htmlFor="gender">Gender</label>
                        <select
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="input2"
                            name="gender"
                            id="gender"
                        >
                            <option value="">Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                        {formik.errors.gender && formik.touched.gender && (
                            <p className="text-danger">{formik.errors.gender}</p>
                        )}
                    </div>

                    {formik.values.gender === 'female' && (
                        <div className="input-box">
                            <label className="label" htmlFor="femaleCondation">Female Condition</label>
                            <input 
                                onBlur={formik.handleBlur} 
                                onChange={formik.handleChange} 
                                value={formik.values.femaleCondation} 
                                placeholder="Enter your Female Condition" 
                                id="femaleCondation" 
                                type="text" 
                                className="input2" 
                                name="femaleCondation"
                            />
                            {formik.errors.femaleCondation && formik.touched.femaleCondation && (
                                <p className="text-danger">{formik.errors.femaleCondation}</p>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default EditAnimal;
