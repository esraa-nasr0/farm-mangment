import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Breadingcontext } from '../../Context/BreadingContext';
import { Rings } from 'react-loader-spinner';
import Swal from 'sweetalert2';

function BreadingTable() {
    const navigate = useNavigate();
    const { getAllBreeding, deleteBreeding } = useContext(Breadingcontext);
    const [breading, setBreading] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({ tagId: '', animalType: '', deliveryDate: '' });
    
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const animalsPerPage = 10;
    
    const getItem = async () => {
        setIsLoading(true);
        try {
            const filters = {
                tagId: searchCriteria.tagId,
                animalType: searchCriteria.animalType,
                deliveryDate: searchCriteria.deliveryDate,
            };
            let { data } = await getAllBreeding(currentPage, animalsPerPage, filters);
        // Assuming `data.data.animals` is the list of animals, and `data.data.total` is the total number of animals
            if (data?.data?.breeding) {
                setBreading(data.data.breeding);
                setTotalPages(Math.ceil(data.data.total / animalsPerPage)); // Calculate total pages
                setIsLoading(false);
            } else {
                setBreading([]);
                console.error("Unexpected data structure:", data);
            }
        } catch (error) {
            console.error("Error fetching breeding data:", error);
            setBreading([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        getItem();
    };

    const deleteItem = async (id) => {
        try {
            const response = await deleteBreeding(id);
            if (response.data.status === "success") {
                Swal.fire("Success", "Record deleted successfully.", "success");
                setBreading((prev) => prev.filter((breeding) => breeding._id !== id));
            } else {
                Swal.fire("Error", "Could not delete the record.", "error");
                console.error("Error deleting item:", response);
            }
        } catch (error) {
            console.error("Error occurred:", error);
            Swal.fire("Error", "An unexpected error occurred.", "error");
        }
    };

    const handleClick = (id) => {
        Swal.fire({
            title: "هل تريد الاستمرار؟",
            icon: "question",
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            showCancelButton: true,
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItem(id);
            }
        });
    };

    const editMating = (id) => {
        navigate(`/editbreading/${id}`);
    };

    useEffect(() => {
        getItem();
    }, [currentPage]);
    

    // Pagination function
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

//     const paginate = (pagenum) => {
//     if (pagenum > 0 && pagenum <= totalPages) {
//         console.log(`Changing page to: ${pagenum}`);
//         setCurrentPage(pagenum);
//     }
// };


    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Rings visible={true} height="100" width="100" color="#3F5C40" ariaLabel="rings-loading" />
                </div>
            ) : (
                <div className="container nnn">
                    <div className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "140px" }}>
                        <h2 style={{ color: "#88522e" }}>Breeding Records</h2>
                        <Link to="/breeding">
                            <button
                                type="button"
                                className="btn btn-lg active button2"
                                style={{ background: "#88522e", color: "white", borderColor: "#3a7d44" }}
                            >
                                <MdOutlineAddToPhotos /> Add New Breeding
                            </button>
                        </Link>
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-4" style={{ flexWrap: 'nowrap' }}>
                        <input
                            type="text"
                            className="form-control"
                            value={searchCriteria.tagId}
                            placeholder="Search by Tag ID"
                            onChange={(e) => setSearchCriteria((prev) => ({ ...prev, tagId: e.target.value }))}
                            style={{ flex: '1' }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            value={searchCriteria.animalType}
                            placeholder="Search by Animal Type"
                            onChange={(e) => setSearchCriteria((prev) => ({ ...prev, animalType: e.target.value }))}
                            style={{ flex: '1' }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            value={searchCriteria.deliveryDate}
                            placeholder="Search by Delivery Date"
                            onChange={(e) => setSearchCriteria((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                            style={{ flex: '1' }}
                        />
                        <button
                            className="btn"
                            onClick={handleSearch}
                            style={{ backgroundColor: '#88522e', borderColor: '#88522e', color: 'white' }}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover mt-3">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tag ID</th>
                                    <th scope="col">Delivery State</th>
                                    <th scope="col">Delivery Date</th>
                                    <th scope="col">Birth Entries</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {breading.map((breeding , index) => (
                                    <tr key={`${breeding._id}-${index}`}>
                                        <th scope="row">{(currentPage - 1) * animalsPerPage + index + 1}</th>
                                        <th >{breeding.tagId}</th>
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
                                        <td
                                            onClick={() => editMating(breeding._id)}
                                            style={{ cursor: 'pointer', color: "#5a3e2b" }}
                                        >
                                            <FaRegEdit /> Edit
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleClick(breeding._id)}
                                                className="btn"
                                                style={{ cursor: 'pointer', color: "#ff0000" }}
                                            >
                                                <RiDeleteBin6Line /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-center mt-4">
    <nav>
        <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(1)}>First</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
        </ul>
    </nav>
</div>

                    </div>
                </div>
            )}
        </>
    );
}

export default BreadingTable;
