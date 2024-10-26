import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { VaccineanimalContext } from '../../Context/VaccineanimalContext';
import { Rings } from 'react-loader-spinner';
import Swal from 'sweetalert2';

function VaccineTable() {
    let navigate = useNavigate();
    let { getallVaccineanimal, DeletVaccineanimal } = useContext(VaccineanimalContext);
    const [vaccines, setVaccines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // دالة جلب اللقاحات
    async function getItem() {
        setIsLoading(true);
        try {
            let { data } = await getallVaccineanimal();
            console.log("Data received from API:", data);
            
            // تعديل هنا
            if (data && data.vaccine) {
                // إزالة اللقاحات المكررة باستخدام Set
                const uniqueVaccines = Array.from(new Set(data.vaccine.map(vaccine => vaccine._id)))
                    .map(id => {
                        return data.vaccine.find(vaccine => vaccine._id === id)
                    });
                setVaccines(uniqueVaccines);
            } else {
                console.error("Unexpected data structure:", data);
                setVaccines([]);
            }
        } catch (error) {
            console.error("Error fetching vaccine data:", error);
            setVaccines([]);
        } finally {
            setIsLoading(false);
        }
    }
    

    useEffect(() => {
        getItem();
    }, []);

    async function deleteItem(id) {
        console.log("Deleting ID:", id);
        try {
            let response = await DeletVaccineanimal(id); // استدعاء دالة الحذف الخاصة باللقاح
    console.log(response);
        
            if (response.status === "success") {
                // تحديث الحالة بعد الحذف بإزالة اللقاح المحذوف من القائمة
                setVaccines(prevVaccines => prevVaccines.filter(vaccine => vaccine._id !== id));
                console.log("Vaccine deleted successfully");
            } else {
                console.error("Error deleting vaccine:", response);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
    
    function handleClick(id) {
        Swal.fire({
            title: "هل تريد الاستمرار؟",
            icon: "question",
            iconHtml: "؟",
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItem(id); // استدعاء دالة الحذف إذا تم تأكيد العملية
            }
        });
    }
    

    function editVaccine(id) {
        navigate(`/editVaccine/${id}`);
    }

 

    return (
        <>
            {isLoading ? (
                <div className='animal'>
                    <Rings visible={true} height="100" width="100" color="#2f5e97" ariaLabel="rings-loading" />
                </div>
            ) : (
                <div className="container">
                    <div className="title2">Vaccines</div>
                    <Link to='/Vaccinebyanimal'>
                        <button type="button" className="btn btn-secondary btn-lg active button2 mt-3">
                            <MdOutlineAddToPhotos /> Add New Vaccine
                        </button>
                    </Link>
                    <table className="table table-striped mt-6">
                        <thead>
                            <tr>
                                <th scope="col">Vaccine Name</th>
                                <th scope="col">Given Every (Days)</th>
                                <th scope="col">Vaccination Log</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaccines.map((vaccine, index) => (
                                <tr key={`${vaccine._id}-${index}`}>
                                    <th scope="row">{vaccine.vaccineName}</th>
                                    <td>{vaccine.givenEvery}</td>
                                    <td>
                                        {vaccine.vaccinationLog && vaccine.vaccinationLog.length > 0
                                            ? vaccine.vaccinationLog.map((log, i) => (
                                                <div key={i}>
                                                    <strong>Date Given:</strong> {log.DateGiven ? log.DateGiven.split('T')[0] : 'No Date'}<br />
                                                    <strong>Valid Until:</strong> {log.vallidTell ? log.vallidTell.split('T')[0] : 'No Date'}<br />
                                                    <strong>Location Shed:</strong> {log.locationShed ? log.locationShed : 'No Location'}<br />
                                                    <strong>Tag ID:</strong> {log.tagId ? log.tagId : 'No Tag ID'}
                                                </div>
                                            ))
                                            : 'No Vaccination Log'}
                                    </td>
                                    <td onClick={() => editVaccine(vaccine._id)} className="text-primary" style={{ cursor: 'pointer' }}>
                                        <FaRegEdit /> Edit
                                    </td>
                                    <td onClick={() => handleClick(vaccine._id)} className="text-danger" style={{ cursor: 'pointer' }}>
                                        <RiDeleteBin6Line /> Remove
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default VaccineTable;