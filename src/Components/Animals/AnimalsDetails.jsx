import { useFormik } from 'formik';
import React, {  useState } from 'react';
import axios from 'axios';
// import * as Yup from 'yup';
import { IoIosSave } from "react-icons/io";
import { useTranslation } from 'react-i18next';


export default function AnimalsDetails() {
    const { t } = useTranslation();
    const [showAlert, setShowAlert] = useState(false);
    const [error ,setError] = useState(null);
    const [isLoading , setisLoading] = useState(false);
    const [animalData, setAnimalData] = useState(null);

    
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
                // console.log(data);
                setisLoading(false);
                setAnimalData(data.data.animal);
                setShowAlert(true);  // Show the alert with the delivery date
            }
        } catch (err) {
            setisLoading(false);
            setError(err.response?.data?.message );
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
        female_Condition: '',
        animaleCondation: '',
        traderName: '',
        purchaseDate: '',
        purchasePrice: '',
        teething: '',
        },
        // validationSchema,
        onSubmit:submitAnimals
    });
    

    return <>
        <div className="container">
        <div className="title2">{t('animals')}</div>
        <p className="text-danger">{error}</p>
        
    {showAlert && animalData && (  
    <div className="alert mt-5 p-4 alert-success">  
    {t('animal_age_in_days')} {animalData.ageInDays} {/* Display the specific data */}  
    </div>  
    )}  
        <form onSubmit={formik.handleSubmit} className='mt-5'>
        {isLoading?(
        <button type="submit" className="btn  button2">
    <i className="fas fa-spinner fa-spin"></i>
    </button>):(
    <button type="submit" className="btn  button2">
    <IoIosSave /> {t('save')}
    </button>)}

        <div className="animaldata">
        <div className="input-box">
            <label className="label" htmlFor="tagId">{t('tag_id')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.tagId} placeholder={t('enter_tag_id')} id="tagId" type="text" className="input2" name="tagId"/>
            {formik.errors.tagId && formik.touched.tagId && ( <p className="text-danger">{formik.errors.tagId}</p> )}
        </div>
        <div className="input-box">
            <label className="label" htmlFor="breed">{t('breed')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.breed}placeholder={t('enter_breed')} id="breed" type="text" className="input2" name="breed"/>
            {formik.errors.breed && formik.touched.breed && ( <p className="text-danger">{formik.errors.breed}</p> )}
        </div>

                    <div className="input-box">
        <label className="label" htmlFor="animalType">{t('animal_type')}</label>
        <select
            value={formik.values.animalType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input2"
            name="animalType"
            id="animalType">
            <option value="">{t('animal_type')}</option>
            <option value="goat">{t('goat')}</option>
            <option value="sheep">{t('sheep')}</option>
        </select>
        {formik.errors.animalType && formik.touched.animalType && (<p className="text-danger">{formik.errors.animalType}</p>)}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="gender">{t('gender')}</label>
        <select
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input2"
            name="gender"
            id="gender">
            <option value="">{t('gender')}</option>
            <option value="female">{t('female')}</option>
            <option value="male">{t('male')}</option>
        </select>
        {formik.errors.gender && formik.touched.gender && (<p className="text-danger">{formik.errors.gender}</p>)}
        </div>

        {formik.values.gender === 'female' && (
            <div className="input-box">
            <label className="label" htmlFor="female_Condition">{t('female_condition')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.female_Condition} placeholder={t('enter_female_condition')} id="female_Condition" type="text" className="input2" name="female_Condition"/>
        {formik.errors.female_Condition && formik.touched.female_Condition && (<p className="text-danger">{formik.errors.female_Condition}</p>)}
        </div>)}

        <div className="input-box">
        <label className="label" htmlFor="animaleCondation">{t('animal_condition')}</label>
        <select
            value={formik.values.animaleCondation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input2"
            name="animaleCondation"
            id="animaleCondation">
        <option value="">{t('animal_condition')}</option>
        <option value="purchase">{t('purchase')}</option>
        <option value="born at farm">{t('born_at_farm')}</option>
        </select>
        {formik.errors.animaleCondation && formik.touched.animaleCondation && (<p className="text-danger">{formik.errors.animaleCondation}</p>)}
        </div>

        {formik.values.animaleCondation === 'purchase' && (<>
        <div className="input-box">
        <label className="label" htmlFor="traderName">{t('trader_name')}</label>
        <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.traderName}
            placeholder={t('enter_trader_name')}
            id="traderName"
            type="text"
            className="input2"
            name="traderName"/>
            {formik.errors.traderName && formik.touched.traderName && (<p className="text-danger">{formik.errors.traderName}</p>)}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="purchaseDate">{t('purchase_date')}</label>
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
        <label className="label" htmlFor="purchasePrice">{t('purchase_price')}</label>
        <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.purchasePrice}
            placeholder={t('enter_purchase_price')}
            id="purchasePrice"
            type="number"
            className="input2"
            name="purchasePrice"
            />
            {formik.errors.purchasePrice && formik.touched.purchasePrice && (<p className="text-danger">{formik.errors.purchasePrice}</p>)}
        </div>
                            
        <div className="input-box">
        <label className="label" htmlFor="teething">{t('teething')}</label>
        <select
            value={formik.values.teething}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} className="input2" name="teething" id="teething">
            <option value="">{t('teething')}</option>
            <option value="two">{t('two')}</option>
            <option value="four">{t('four')}</option>
            <option value="six">{t('six')}</option>
            </select>
            {formik.errors.teething && formik.touched.teething && (<p className="text-danger">{formik.errors.teething}</p>)}
            </div></>)}

        {formik.values.animaleCondation === 'born at farm' && (<>
        <div className="input-box">
            <label className="label" htmlFor="motherId">{t('mother_id')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.motherId} placeholder={t('enter_mother_id')} id="motherId" type="text" className="input2" name="motherId"/>
            {formik.errors.motherId && formik.touched.motherId?<p className="text-danger">{formik.errors.motherId}</p>:""}
        </div>

        <div className="input-box">
            <label className="label" htmlFor="fatherId">{t('father_id')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.fatherId} placeholder={t('enter_father_id')} id="fatherId" type="text" className="input2" name="fatherId"/>
            {formik.errors.fatherId && formik.touched.fatherId?<p className="text-danger">{formik.errors.fatherId}</p>:""}
        </div>

        <div className="input-box">
            <label className="label" htmlFor="birthDate">{t('birth_date')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthDate}  id="birthDate" type="date" className="input2" name="birthDate"/>
            {formik.errors.birthDate && formik.touched.birthDate?<p className="text-danger">{formik.errors.birthDate}</p>:""}
        </div> 
                    </>)}
                    

            <div className="input-box">  
            <label className="label" htmlFor="locationShed">{t('location_shed')}</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.locationShed} placeholder={t('enter_location_shed')} id="locationShed" type="text" className="input2" name="locationShed"/>
            {formik.errors.locationShed && formik.touched.locationShed?<p className="text-danger">{formik.errors.locationShed}</p>:""}
            </div>

                </div>
            </form> 

        </div>
    </>
}