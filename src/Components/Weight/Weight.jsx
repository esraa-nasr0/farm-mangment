import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { IoIosSave } from "react-icons/io";


function Weight() {
    
    function submitWeight(value) {
        console.log(value);
    }


    let validation = Yup.object({
        tagId:Yup.string().max(10,'tag ID maxlength is 10').required('tag ID is required'),
        weightType:Yup.string().required('Mating Type is required '),
        weight:Yup.string().max(10,'Male ID maxlength is 10').required('Male ID is required'),
        height:Yup.string().max(10,'Male ID maxlength is 10').required('Male ID is required'),
        Date:Yup.date().required('Mating Date is required '),
    });

    let formik = useFormik({
        initialValues:{
            tagId:'',
            weightType:'',
            weight:'',
            height:'',
            Date:'',
        },validationSchema:validation
        ,onSubmit:submitWeight,
    })
return <>
    <div className='container'>
    <div className="title2">Weight</div>
        

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
                <label className="label" htmlFor='weightType'>Weight Type</label>
                <select 
                value={formik.values.weightType}
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}  
                className=" input2" 
                name='weightType' 
                id='weightType' 
                aria-label="Default select example">
                        <option value="" >Mating Type { }</option>
                        <option value="birth" >Birth { }</option>
                        <option value="Weaning" >Weaning { }</option>
                        <option value="regular" >Regular { }</option>
                    </select>
                    {formik.errors.weightType && formik.touched.weightType?<p className="text-danger">{formik.errors.weightType}</p>:""}
            </div>
            
            <div className="input-box">
            <label className="label" htmlFor="weight">Weight</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.weight} placeholder="Enter your weight" id="weight" type="text" className="input2" name="weight"/>
                {formik.errors.weight && formik.touched.weight?<p className="text-danger">{formik.errors.weight}</p>:""}
            </div>

            <div className="input-box">
            <label className="label" htmlFor="height">Height</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.height} placeholder="Enter your Height" id="height" type="text" className="input2" name="height"/>
                {formik.errors.height && formik.touched.height?<p className="text-danger">{formik.errors.height}</p>:""}
            </div>
    
            <div className="input-box">
            <label className="label" htmlFor="Date"> Date</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Date}  id="Date" type="date" className="input2" name="Date"/>
                {formik.errors.Date && formik.touched.Date?<p className="text-danger">{formik.errors.Date}</p>:""}
            </div>
            </div>
    </form>
    </div>
</>
}

export default Weight
