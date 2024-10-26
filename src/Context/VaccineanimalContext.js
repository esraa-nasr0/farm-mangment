import React from 'react';
import axios from 'axios';

const VaccineanimalContext = React.createContext();

// دالة جلب جميع اللقاحات
async function getallVaccineanimal() {
    const Authorization = localStorage.getItem('Authorization');
    
    if (!Authorization) {
        throw new Error("Authorization token not found");
    }

    const headers = {
        Authorization: `Bearer ${Authorization}`,
    };

    try {
        const response = await axios.get('https://farm-project-bbzj.onrender.com/api/vaccine/GetAllVaccine', { headers });
        return response.data; // ارجع فقط البيانات بدلاً من كائن الاستجابة الكامل
    } catch (err) {
        console.error("Error fetching vaccines:", err.response ? err.response.data : err.message);
        throw err; // إعادة رمي الخطأ ليتم التعامل معه في مكان آخر
    }
}

// دالة حذف لقاح
async function DeletVaccineanimal(id) {
    const Authorization = localStorage.getItem('Authorization');
    
    if (!Authorization) {
        throw new Error("Authorization token not found");
    }

    const headers = {
        Authorization: `Bearer ${Authorization}`,
    };

    try {
        const response = await axios.delete(`https://farm-project-bbzj.onrender.com/api/vaccine/DeleteVaccine/${id}`, { headers });
        return response.data; // ارجع فقط البيانات بدلاً من كائن الاستجابة الكامل
    } catch (err) {
        console.error("Error deleting vaccine:", err.response ? err.response.data : err.message);
        throw err; // إعادة رمي الخطأ ليتم التعامل معه في مكان آخر
    }
}

// مزود السياق
export default function VaccineanimalContextProvider(props) {
    return (
        <VaccineanimalContext.Provider value={{ getallVaccineanimal, DeletVaccineanimal }}>
            {props.children}
        </VaccineanimalContext.Provider>
    );
}

export { VaccineanimalContext };