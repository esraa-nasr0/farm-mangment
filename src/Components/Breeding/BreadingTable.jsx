import React, { useContext, useEffect, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import { MdOutlineAddToPhotos } from "react-icons/md";  
import { RiDeleteBin6Line } from "react-icons/ri";   
import { FaRegEdit } from "react-icons/fa";  
import { Breadingcontext } from '../../Context/BreadingContext';  
import { Rings } from 'react-loader-spinner';  
import Swal from 'sweetalert2';   

function BreadingTable() {  
    let navigate = useNavigate();  
    const { getallbreading, Deletbreading } = useContext(Breadingcontext);  
    const [breading, setBreading] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);  

    async function getItem() {  
        setIsLoading(true);  
        try {  
            let { data } = await getallbreading();  
            console.log(data.data);  

            if (data && data.data && data.data.breeding) {  
                setBreading(data.data.breeding);  
            } else {  
                console.error("Unexpected data structure:", data);  
                setBreading([]);  
            }  
        } catch (error) {  
            console.error("Error fetching breeding data:", error);  
            setBreading([]);  
        } finally {  
            setIsLoading(false);  
        }  
    }  

    async function deletItem(id) {  
        console.log("Deleting ID:", id);  
        try {  
            let response = await Deletbreading(id);  

            if (response.data.status === "success") {  
                setBreading(prevBreading => prevBreading.filter(breeding => breeding._id !== id));  
                console.log("Item deleted successfully");  
            } else {  
                console.error("Error deleting item:", response);  
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
                deletItem(id);  
            }  
        });  
    }  

    useEffect(() => {  
        getItem(); // Fetch breeding data on mount  
    }, []);  

    function editMating(id) {  
        navigate(`/editbreading/${id}`); // Use backticks correctly  
    }  

    return (  
        <>  
            {isLoading ? (  
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>  
                    <Rings  
                        visible={true}  
                        height="100"  
                        width="100"  
                        color="#3F5C40"  
                        ariaLabel="rings-loading"  
                    />  
                </div>  
            ) : (  
                <div className="container mt-5">  
                    <div className="d-flex justify-content-between align-items-center mb-4">  
                        <h2 className="title2">Breeding Records</h2>  
                        <Link to='/breading'>  
                            <button type="button" className="btn btn-secondary btn-lg active button2">  
                                <MdOutlineAddToPhotos /> Add New Breeding  
                            </button>  
                        </Link>  
                    </div>  
                    <div className="table-responsive">  
                        <table className="table table-bordered table-hover mt-3">  
                            <thead className="thead-dark">  
                                <tr>  
                                    <th scope="col">Tag ID</th>  
                                    <th scope="col">Delivery State</th>  
                                    <th scope="col">Delivery Date</th>  
                                    <th scope="col">Birth Entries</th>  
                                    <th scope="col">Edit</th>  
                                    <th scope="col">Delete</th>  
                                </tr>  
                            </thead>  
                            <tbody>  
                                {breading.map((breeding, index) => (  
                                    <tr key={`${breeding._id}-${index}`}> {/* Fix key here */}  
                                        <th scope="row">{breeding.tagId}</th>  
                                        <td>{breeding.deliveryState}</td>  
                                        <td>{breeding.deliveryDate ? breeding.deliveryDate.split('T')[0] : 'No Date'}</td>  
                                        <td>  
                                            {breeding.birthEntries && breeding.birthEntries.length > 0 ? (  
                                                <ul className="list-group">  
                                                    {breeding.birthEntries.map((entry, idx) => (  
                                                        <li key={idx} className="list-group-item">  
                                                            <strong>Tag ID:</strong> {entry.tagId},  
                                                            <strong> Gender:</strong> {entry.gender},  
                                                            <strong> Birthweight:</strong> {entry.birthweight} kg  
                                                        </li>  
                                                    ))}  
                                                </ul>  
                                            ) : (  
                                                <span className="text-muted">No Birth Entries</span>  
                                            )}  
                                        </td>  
                                        <td onClick={() => editMating(breeding._id)} style={{ cursor: 'pointer' }} className="text-primary">  
                                            <FaRegEdit /> Edit  
                                        </td>  
                                        <td>  
                                            <button onClick={() => handleClick(breeding._id)} className="btn btn-danger">  
                                                <RiDeleteBin6Line /> Delete  
                                            </button>  
                                        </td>  
                                    </tr>  
                                ))}  
                            </tbody>  
                        </table>  
                    </div>  
                </div>  
            )}  
        </>  
    );  
}  

export default BreadingTable;