import { useFormik } from 'formik';
import React, {  useState } from 'react';
import axios from 'axios';
// import * as Yup from 'yup';
import { IoIosSave } from "react-icons/io";

export default function AnimalsDetails() {

    const [error ,setError] = useState(null);
    const [isLoading , setisLoading] = useState(false);
    let Authorization = localStorage.getItem('Authorization')

    let headers = {
    Authorization: `Bearer ${Authorization}`
    }
    
    async function submitAnimals(value) {
        setisLoading(true);
        setError(null);
        try {
            let { data } = await axios.post(`https://farm-project-bbzj.onrender.com/api/animal/addanimal`, value, 
            { headers });
            // console.log(value);  
            // console.log(headers);  
            if (data.status === "success") {
                setisLoading(false);
            }
        } catch (err) {
            setisLoading(false);
            setError(err.response?.data?.message || "An unknown error occurred");
            console.log(err.response.data);  
        }
    }
    
    


    // const validationSchema = Yup.object({
    //     tagId: Yup.number()
    //         .typeError('Tag ID must be a number')
    //         .required('Tag ID is required'),
    //     animalType: Yup.string().required('Animal Type is required'),
    //     breed: Yup.string().min(3, 'Breed minlength is 3').max(40, 'Breed maxlength is 40').required('Breed is required'),
    //     gender: Yup.string().required('Gender is required'),
    //     femaleCondation: Yup.string().min(3, 'Condition minlength is 3').max(50, 'Condition maxlength is 50'),
    //     animaleCondation: Yup.string().required('Animal Condition is required'),
    //     tarderName: Yup.string().min(3, 'Trader Name minlength is 3').max(50, 'Trader Name maxlength is 50').required('Trader Name is required'),
    //     purchaseDate: Yup.date().required('Purchase Date is required'),
    //     purchasePrice: Yup.number()
    //         .typeError('Purchase Price must be a number')
    //         .required('Purchase Price is required'),
    //     teething: Yup.string().required('Teething is required'),
    //     motherId: Yup.number().required('Mother ID is required'),
    //     fatherId: Yup.number().required('Father ID is required'),
    //     birthDate: Yup.date().required('Birth Date is required'),
    //     locationShed: Yup.string().min(3, 'Location Shed minlength is 3').max(50, 'Location Shed maxlength is 50').required('Location Shed is required'),
    // });

    const formik = useFormik({
        initialValues: {
        tagId: '',
        animalType: '',
        breed: '',
        gender: '',
        motherId: '',
        fatherId: '',
        birthDate: '',
        locationShed: '',
        femaleCondation: '',
        animaleCondation: '',
        tarderName: '',
        purchaseDate: '',
        purchasePrice: '',
        teething: '',
        },
        // validationSchema,
        onSubmit:submitAnimals
    });
    

    return <>
        <div className="container">
        <div className="title2">Animals</div>
        <p className="text-danger">{error}</p>
        <form onSubmit={formik.handleSubmit} className='mt-5'>
        {isLoading?(
        <button type="submit" className="btn btn-dark button2">
    <i className="fas fa-spinner fa-spin"></i>
    </button>):(
    <button type="submit" className="btn btn-dark button2">
    <IoIosSave /> Save
    </button>)}

        <div className="animaldata">
        <div className="input-box">
            <label className="label" htmlFor="tagId">Tag ID</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.tagId} placeholder="Enter your Tag ID" id="tagId" type="text" className="input2" name="tagId"/>
            {formik.errors.tagId && formik.touched.tagId && ( <p className="text-danger">{formik.errors.tagId}</p> )}
        </div>
        <div className="input-box">
            <label className="label" htmlFor="breed">Breed</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.breed} placeholder="Enter  Breed" id="breed" type="text" className="input2" name="breed"/>
            {formik.errors.breed && formik.touched.breed && ( <p className="text-danger">{formik.errors.breed}</p> )}
        </div>

                    <div className="input-box">
        <label className="label" htmlFor="animalType">Animal Type</label>
        <select
            value={formik.values.animalType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input2"
            name="animalType"
            id="animalType">
            <option value="">Animal Type</option>
            <option value="goat">Goat</option>
            <option value="sheep">Sheep</option>
        </select>
        {formik.errors.animalType && formik.touched.animalType && (<p className="text-danger">{formik.errors.animalType}</p>)}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="gender">Gender</label>
        <select
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input2"
            name="gender"
            id="gender">
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>
        {formik.errors.gender && formik.touched.gender && (<p className="text-danger">{formik.errors.gender}</p>)}
        </div>

        {formik.values.gender === 'female' && (
            <div className="input-box">
            <label className="label" htmlFor="femaleCondation">Female Condition</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.femaleCondation} placeholder="Enter your Female Condition" id="femaleCondation" type="text" className="input2" name="femaleCondation"/>
        {formik.errors.femaleCondation && formik.touched.femaleCondation && (<p className="text-danger">{formik.errors.femaleCondation}</p>)}
        </div>)}

        <div className="input-box">
        <label className="label" htmlFor="animaleCondation">Animal Condition</label>
        <select
            value={formik.values.animaleCondation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input2"
            name="animaleCondation"
            id="animaleCondation">
        <option value="">Animal Condition</option>
        <option value="purchase">Purchase</option>
        <option value="born at farm">Born at Farm</option>
        </select>
        {formik.errors.animaleCondation && formik.touched.animaleCondation && (<p className="text-danger">{formik.errors.animaleCondation}</p>)}
        </div>

        {formik.values.animaleCondation === 'purchase' && (<>
        <div className="input-box">
        <label className="label" htmlFor="tarderName">Trader Name</label>
        <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.tarderName}
            placeholder="Enter Trader Name"
            id="tarderName"
            type="text"
            className="input2"
            name="tarderName"/>
            {formik.errors.tarderName && formik.touched.tarderName && (<p className="text-danger">{formik.errors.tarderName}</p>)}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="purchaseDate">Purchase Date</label>
        <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.purchaseDate}
            id="purchaseDate"
            type="date"
            className="input2"
            name="purchaseDate"/>
            {formik.errors.purchaseDate && formik.touched.purchaseDate && (<p className="text-danger">{formik.errors.purchaseDate}</p>)}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="purchasePrice">Purchase Price</label>
        <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.purchasePrice}
            placeholder="Enter Purchase Price"
            id="purchasePrice"
            type="number"
            className="input2"
            name="purchasePrice"
            />
            {formik.errors.purchasePrice && formik.touched.purchasePrice && (<p className="text-danger">{formik.errors.purchasePrice}</p>)}
        </div>
                            
        <div className="input-box">
        <label className="label" htmlFor="teething">Teething</label>
        <select
            value={formik.values.teething}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} className="input2" name="teething" id="teething">
            <option value="">Teething</option>
            <option value="two">Two</option>
            <option value="four">Four</option>
            <option value="six">Six</option>
            </select>
            {formik.errors.teething && formik.touched.teething && (<p className="text-danger">{formik.errors.teething}</p>)}
            </div></>)}

        {formik.values.animaleCondation === 'born at farm' && (<>
        <div className="input-box">
            <label className="label" htmlFor="motherId">Mother ID</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.motherId} placeholder="Enter your Mother ID" id="motherId" type="text" className="input2" name="motherId"/>
            {formik.errors.motherId && formik.touched.motherId?<p className="text-danger">{formik.errors.motherId}</p>:""}
        </div>

        <div className="input-box">
            <label className="label" htmlFor="fatherId">Father ID</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.fatherId} placeholder="Enter your Father ID" id="fatherId" type="text" className="input2" name="fatherId"/>
            {formik.errors.fatherId && formik.touched.fatherId?<p className="text-danger">{formik.errors.fatherId}</p>:""}
        </div>

        <div className="input-box">
            <label className="label" htmlFor="birthDate">Birth Date</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthDate}  id="birthDate" type="date" className="input2" name="birthDate"/>
            {formik.errors.birthDate && formik.touched.birthDate?<p className="text-danger">{formik.errors.birthDate}</p>:""}
        </div> 
                    </>)}
                    

            <div className="input-box">  
            <label className="label" htmlFor="locationShed">Location Shed</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.locationShed} placeholder="Enter your Location Shed" id="locationShed" type="text" className="input2" name="locationShed"/>
            {formik.errors.locationShed && formik.touched.locationShed?<p className="text-danger">{formik.errors.locationShed}</p>:""}
            </div>

                </div>
            </form>
        </div>
    </>
}