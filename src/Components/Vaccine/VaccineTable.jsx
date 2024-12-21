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
    const [searchCriteria, setSearchCriteria] = useState({ tagId: '', animalType: '', vaccineName: '' });

    async function getItem() {
        setIsLoading(true);
        try {
            
            const filters = {
                vaccineName: searchCriteria.vaccineName,
                tagId: searchCriteria.tagId,
                locationShed: searchCriteria.locationShed
            };
    
            console.log("Applying filters:", filters);
    
            let { data } = await getallVaccineanimal(filters);
    
            if (data && data.vaccine) {
                const uniqueVaccines = Array.from(new Set(data.vaccine.map(vaccine => vaccine._id)))
                    .map(id => data.vaccine.find(vaccine => vaccine._id === id));
    
        
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

    const handleSearch = () => {
        getItem();
    };

    useEffect(() => {
        getItem();
    }, []);

    async function deleteItem(id) {
        try {
            let response = await DeletVaccineanimal(id);
            if (response.status === "success") {
                setVaccines(prevVaccines => prevVaccines.filter(vaccine => vaccine._id !== id));
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
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItem(id);
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
                    <div className="d-flex justify-content-between align-items-center  mb-4" style={{marginTop:"140px"}}>  
                        <h2 className="" style={{color:"#88522e"}}>Vaccine Records</h2>  
                        <Link to='/vaccinebyanimal'>  
                            <button 
                                type="button" 
                                className="btn btn-lg active button2"  
                                style={{ background: "#88522e", color: "white", borderColor: "#3a7d44" }}
                            >  
                                <MdOutlineAddToPhotos /> Add New Vaccine by Animal
                            </button>  
                        </Link> 
                        <Link to='/vaccinebylocationshed'>  
                            <button 
                                type="button" 
                                className="btn btn-lg active button2"  
                                style={{ background: "#88522e", color: "white", borderColor: "#3a7d44" }}
                            >  
                                <MdOutlineAddToPhotos /> Add New Vaccine by LocationShed
                            </button>  
                        </Link> 
                    </div>  

                    <div className="d-flex align-items-center gap-2 mt-4">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={searchCriteria.vaccineName} 
                            placeholder="Search by vaccineName" 
                            onChange={(e) => setSearchCriteria(prev => ({ ...prev, vaccineName: e.target.value }))} 
                        />
                        <input 
                            type="text" 
                            className="form-control" 
                            value={searchCriteria.tagId} 
                            placeholder="Search by tagId" 
                            onChange={(e) => setSearchCriteria(prev => ({ ...prev, tagId: e.target.value }))} 
                        />

<input 
                            type="text" 
                            className="form-control" 
                            value={searchCriteria.locationShed} 
                            placeholder="Search by locationShed" 
                            onChange={(e) => setSearchCriteria(prev => ({ ...prev, locationShed: e.target.value }))} 
                        />
                        <button 
                            className="btn" 
                            onClick={handleSearch} 
                            style={{ backgroundColor: '#88522e', borderColor: '#88522e', color: 'white' }}
                        >
                            <i className="fas fa-search" style={{ background: "#88522e"}} ></i>
                        </button>
                    </div>

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
                                    <td onClick={() => editVaccine(vaccine._id)}  style={{ cursor: 'pointer' ,color:"#88522e"}}>
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