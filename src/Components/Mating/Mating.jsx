import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup";
import { IoIosSave } from "react-icons/io";



function Mating() {

    const [showAlert , setShowAlert] = useState(false)
    
    function submitMating(value) {
        console.log(value);
        setShowAlert(true);
    }

    let validation = Yup.object({
        tagId:Yup.string().max(10,'tag ID maxlength is 10').required('tag ID is required'),
        matingType:Yup.string().required('Mating Type is required '),
        maleTagId:Yup.string().max(10,'Male ID maxlength is 10').required('Male ID is required'),
        matingDate:Yup.date().required('Mating Date is required '),
        sonarDate:Yup.date().required('Sonar Date is required '),
        sonarRsult:Yup.string().required('Sonar Rsult is required '),
    });

let formik = useFormik({
    initialValues:{
        tagId:'',
        matingType:'',
        maleTagId:'',
        matingDate:'',
        sonarDate:'',
        sonarRsult:'',
    },validationSchema:validation,
    onSubmit:submitMating
});


return <>
<div className="container">
<div className="title2">Mating</div>

<form onSubmit={formik.handleSubmit} className='mt-5'>
    
    
<button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn btn-dark button2 ">
            <IoIosSave /> Save
        </button>   

        <div className="animaldata">
            
        <div className="input-box">
        <label className="label" htmlFor="tagId">Tag ID</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.tagId} placeholder="Enter your Tag ID" id="tagId" type="text" className="input2" name="tagId"/>
            {formik.errors.tagId && formik.touched.tagId?<p className="text-danger">{formik.errors.tagId}</p>:""}
        </div>
        
        <div className="input-box">
            <label className="label" htmlFor='matingType'>Mating Type</label>
            <select 
            value={formik.values.matingType}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}  
            className=" input2" 
            name='matingType' 
            id='matingType' 
            aria-label="Default select example">
                    <option value="" >Mating Type { }</option>
                    <option value="Natural" >Natural { }</option>
                </select>
                {formik.errors.matingType && formik.touched.matingType?<p className="text-danger">{formik.errors.matingType}</p>:""}
        </div>
        
        <div className="input-box">
        <label className="label" htmlFor="maleTagId">Male Tag ID</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.maleTagId} placeholder="Enter your Male Tag ID" id="maleTagId" type="text" className="input2" name="maleTagId"/>
            {formik.errors.maleTagId && formik.touched.maleTagId?<p className="text-danger">{formik.errors.maleTagId}</p>:""}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="matingDate">Mating Date</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.matingDate}  id="matingDate" type="date" className="input2" name="matingDate"/>
            {formik.errors.matingDate && formik.touched.matingDate?<p className="text-danger">{formik.errors.matingDate}</p>:""}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="sonarDate">Sonar Date</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.sonarDate}  id="sonarDate" type="date" className="input2" name="sonarDate"/>
            {formik.errors.sonarDate && formik.touched.sonarDate?<p className="text-danger">{formik.errors.sonarDate}</p>:""}
        </div>

        <div className="input-box">
        <label className="label" htmlFor="sonarRsult">Sonar Rsult</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.sonarRsult}  id="sonarRsult" placeholder="Enter your Sonar Rsult" type="text" className="input2" name="sonarRsult"/>
            {formik.errors.sonarRsult && formik.touched.sonarRsult?<p className="text-danger">{formik.errors.sonarRsult}</p>:""}
        </div>

        </div>
</form>
        {showAlert && <div className='alert mt-5 p-4 alert-info '>Expected Delivery Date:</div> }
</div>
</>
}

export default Mating
