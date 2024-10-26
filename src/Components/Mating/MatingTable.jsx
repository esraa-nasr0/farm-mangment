import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MatingContext } from '../../Context/MatingContext';
import { Rings } from 'react-loader-spinner';
import Swal from 'sweetalert2'; 

const NO_DATE = 'No Date';

function MatingTable() {
    const navigate = useNavigate();
    const { getMating, deleteMating } = useContext(MatingContext);
    
    const [isLoading, setIsLoading] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const animalsPerPage = 10; 
    const [searchCriteria, setSearchCriteria] = useState({ tagId: '', matingDate: '', sonarRsult: '' });
    const [matings, setMating] = useState([]);

    async function fetchMating() {
        setIsLoading(true);
        try {
            const filters = {
                tagId: searchCriteria.tagId,
                matingDate: searchCriteria.matingDate,
                sonarRsult: searchCriteria.sonarRsult,
            };
            const { data } = await getMating(currentPage, animalsPerPage, filters);
            setMating(data.data.mating);
            setTotalPages(Math.ceil(data.data.total / animalsPerPage));
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch data', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMating();
    }, [currentPage]); // Fetch mating data on page change

    const deleteItem = async (id) => {
        try {
            await deleteMating(id);
            setMating((prevMating) => prevMating.filter((mating) => mating._id !== id));
        } catch (error) {
            console.error("Failed to delete mating:", error);
            Swal.fire('Error', 'Failed to delete mating', 'error');
        }
    };

    const handleClick = (id) => {
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
    };

    const editMating = (id) => {
        navigate(`/editMating/${id}`);
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page when searching
        fetchMating(); // Fetch mating data with the current search criteria
    };

    // Pagination function
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {isLoading ? (
                <div className='animal'>
                    <Rings visible={true} height="100" width="100" color="#2f5e97" ariaLabel="rings-loading" />
                </div>
            ) : (
                <div className="container">
                    <div className="title2">Mating</div>
                    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                        <div className="d-flex flex-wrap" style={{ flex: 1 }}>
                            <input
                                type="text"
                                className="form-control me-2 mb-2"
                                placeholder="Search by Tag ID"
                                value={searchCriteria.tagId}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, tagId: e.target.value })}
                                style={{ flex: '1' }}
                                aria-label="Search by Tag ID"
                            />
                            <input
                                type="date"
                                className="form-control me-2 mb-2"
                                value={searchCriteria.matingDate}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, matingDate: e.target.value })}
                                style={{ flex: '1' }}
                                aria-label="Search by Mating Date"
                            />
                            <input
                                type="text"
                                className="form-control me-2 mb-2"
                                placeholder="Search by Sonar Result"
                                value={searchCriteria.sonarRsult}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, sonarRsult: e.target.value })}
                                style={{ flex: '1' }}
                                aria-label="Search by Sonar Result"
                            />
                            <button 
                                className="btn mb-2 me-2" 
                                onClick={handleSearch}
                                style={{ backgroundColor: '#81a9d1', borderColor: '#81a9d1', color: 'white' }}
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <Link to='/mating'>
                            <button type="button" className="btn btn-secondary btn-lg active button2 mb-2">
                                <MdOutlineAddToPhotos /> Add New Mating
                            </button>
                        </Link>
                    </div>
                    
                    <table className="table table-striped mt-6">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tag ID</th>
                                <th scope="col">Male Tag Id</th>
                                <th scope="col">Mating Type</th>
                                <th scope="col">Mating Date</th>
                                <th scope="col">Sonar Date</th>
                                <th scope="col">Sonar Result</th>
                                <th scope="col">Expected Delivery Date</th>
                                <th scope="col">Edit Mating</th>
                                <th scope="col">Remove Mating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matings.map((mating, index) => (
                                <tr key={`${mating._id}-${index}`}>
                                    <th scope="row">{(currentPage - 1) * animalsPerPage + index + 1}</th>
                                    <td>{mating.tagId}</td>
                                    <td>{mating.maleTag_id}</td>
                                    <td>{mating.matingType}</td>
                                    <td>{mating.matingDate ? mating.matingDate.split('T')[0] : NO_DATE}</td>
                                    <td>{mating.sonarDate ? mating.sonarDate.split('T')[0] : NO_DATE}</td>
                                    <td>{mating.sonarRsult}</td>
                                    <td>{mating.expectedDeliveryDate ? mating.expectedDeliveryDate.split('T')[0] : NO_DATE}</td>
                                    <td onClick={() => editMating(mating._id)} style={{ cursor: 'pointer' }} className="text-primary">
                                        <FaRegEdit /> Edit Mating 
                                    </td>
                                    <td onClick={() => handleClick(mating._id)} className="text-danger" style={{ cursor: 'pointer' }}>
                                        <RiDeleteBin6Line /> Remove Mating
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

export default MatingTable;
