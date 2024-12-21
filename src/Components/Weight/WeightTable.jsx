import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Rings } from 'react-loader-spinner';
import Swal from 'sweetalert2'; 
import { WeightContext } from '../../Context/WeightContext';


function WeightTable() {

    let navigate = useNavigate()

    let {getWeight , deleteWeight} = useContext(WeightContext);
    const [weights, setWeight] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [searchCriteria, setSearchCriteria] = useState({
        tagId: '',
        weightType: '',
        Date: ''
    });
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const animalsPerPage = 10;
    
    
    async function fetchWeight() {
        setIsLoading(true);
        // Prepare filters for search functionality
        const filters = {
            tagId: searchCriteria.tagId,
            weightType: searchCriteria.weightType,
            Date: searchCriteria.Date,
        };
        let { data } = await getWeight(currentPage, animalsPerPage, filters);
        // Assuming `data.data.animals` is the list of animals, and `data.data.total` is the total number of animals
        setWeight(data.data.weight);
        setTotalPages(Math.ceil(data.data.total / animalsPerPage)); // Calculate total pages
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchWeight();
    }, []);
    

    const deleteItem = async (id) => {
        try {
            await deleteWeight(id);
            setWeight((prevMating) => prevMating.filter((mating) => mating._id !== id));
        } catch (error) {
            console.error("Failed to delete mating:", error);
            Swal.fire('Error', 'Failed to delete mating', 'error');
        }
    };
    
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
                deleteItem(id);
            }
        });
    }

    function editWeight(id) {
        navigate(`/editWeight/${id}`);
    }

    function handleSearch() {
        setCurrentPage(1); // Reset to first page when searching
        fetchWeight();
    }

    // Pagination function
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        {isLoading ? (
            <div className='animal'>
                <Rings
                    visible={true}
                    height="100"
                    width="100"
                    color="#3f5c40"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        ) : (
            <div className="container">
                <div className="title2">Weight</div>

                {/* Search Inputs and Add Button Row */}
                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                    {/* Search Inputs */}
                    <div className="d-flex flex-wrap" style={{ flex: 1 }}>
                        <input
                            type="text"
                            className="form-control me-2 mb-2"
                            placeholder="Search by Tag ID"
                            value={searchCriteria.tagId}
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, tagId: e.target.value })}
                            style={{ flex: '1' }}
                        />
                        
                        <input
                            type="text"
                            className="form-control me-2 mb-2"
                            placeholder="Search by Weight Type"
                            value={searchCriteria.weightType}
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, weightType: e.target.value })}
                            style={{ flex: '1' }}
                        />

                        <input
                            type="text"
                            className="form-control me-2 mb-2"
                            placeholder="Search by Date"
                            value={searchCriteria.Date}
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, Date: e.target.value })}
                            style={{ flex: '1' }}
                        />

                        <button
                            className="btn mb-2 me-2"
                            onClick={handleSearch}
                            style={{ backgroundColor: '#88522e', borderColor: '#88522e', color: '#E9E6E2' }}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>

                    <Link to='/weight'>
                        <button type="button" className="btn btn-secondary btn-lg active button2 mb-2">
                            <MdOutlineAddToPhotos /> Add New Weight
                        </button>
                    </Link>
                </div>

                <table className="table table-striped mt-6">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tag ID</th>
                            <th scope="col">Weight Type</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Height</th>
                            <th scope="col">Date</th>
                            <th scope="col">Edit weight</th>
                            <th scope="col">Remove weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weights.map((weight, index) => (
                            <tr key={`${weight.id || weight._id}-${index}`}>
                                <th scope="row">{(currentPage - 1) * animalsPerPage + index + 1}</th>
                                <td >{weight.tagId}</td>
                                <td>{weight.weightType}</td>
                                <td>{weight.weight}</td>
                                <td>{weight.height}</td>
                                <td>{weight.Date ? weight.Date.split('T')[0] : 'No Date'}</td>
                                <td onClick={() => editWeight(weight._id)} style={{ cursor: 'pointer' }} className="text-success">
                                    <FaRegEdit /> Edit Weight
                                </td>
                                <td onClick={() => handleClick(weight._id)} className="text-danger" style={{ cursor: 'pointer' }}>
                                    <RiDeleteBin6Line /> Remove weight
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {/* Go to first page */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(1)}>First</button>
                                </li>

                                {/* Show previous page */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                                </li>

                                {/* Dynamic page numbers */}
                                {Array.from({ length: totalPages }, (_, index) => {
                                    const pageNumber = index + 1;
                                    const isPageInRange = pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2;

                                    if (isPageInRange) {
                                        return (
                                            <li key={index} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => paginate(pageNumber)}>
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Show next page */}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
            </div>
        )}
        </>
    );
}

export default WeightTable;
