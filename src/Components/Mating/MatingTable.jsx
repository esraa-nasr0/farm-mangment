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
    const [searchCriteria, setSearchCriteria] = useState({ tagId: '', matingDate: '', sonarRsult: '', animalType: '' });
    const [matings, setMating] = useState([]);

    async function fetchMating() {
        setIsLoading(true);
        try {
            const filters = {
                tagId: searchCriteria.tagId,
                matingDate: searchCriteria.matingDate,
                sonarRsult: searchCriteria.sonarRsult,
                animalType: searchCriteria.animalType,
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
    }, [currentPage]); 

    const deleteItem = async (id) => {
        try {
            await deleteMating(id);
            setMating((prevMating) => prevMating.filter((mating) => mating._id !== id));
        } catch (error) {
            Swal.fire('Error', 'Failed to delete mating', 'error');
        }
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: "هل تريد الاستمرار؟",
            icon: "question",
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) deleteItem(id);
        });
    };

    const editMating = (id) => {
        navigate(`/editMating/${id}`);
    };

    const handleSearch = () => {
        setCurrentPage(1); 
        fetchMating(); 
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {isLoading ? (
                <div className='animal'>
                    <Rings visible={true} height="100" width="100" color="#2f5e97" ariaLabel="rings-loading" />
                </div>
            ) : (
                <div className="container">
                    <div className="title2">Mating</div>
                    
                    <Link to='/mating'>
                            <button type="button" className="btn btn-secondary button2 btn-lg active mt-3">
                                <MdOutlineAddToPhotos /> Add New Mating
                            </button>
                        </Link>
                    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
            <div className="d-flex align-items-center" style={{ flex: 1, flexWrap: 'nowrap', gap: '1rem' }}>
    <input
        type="text"
        className="form-control"
        style={{ minWidth: '150px' }}
        placeholder="Search by Tag ID"
        value={searchCriteria.tagId}
        onChange={(e) => setSearchCriteria({ ...searchCriteria, tagId: e.target.value })}
        aria-label="Search by Tag ID"
    />
    
    <select
        value={searchCriteria.animalType}
        className="form-select"
        style={{ minWidth: '150px' }}
        onChange={(e) => setSearchCriteria({ ...searchCriteria, animalType: e.target.value })}
        aria-label="Filter by Animal Type"
    >
        <option value="">Animal Type</option>
        <option value="goat">Goat</option>
        <option value="sheep">Sheep</option>
    </select>

    <input
        type="date"
        className="form-control"
        style={{ minWidth: '150px' }}
        placeholder="Mating Date"
        value={searchCriteria.matingDate}
        onChange={(e) => setSearchCriteria({ ...searchCriteria, matingDate: e.target.value })}
        aria-label="Search by Mating Date"
    />

    <input
        type="text"
        className="form-control"
        style={{ minWidth: '150px' }}
        placeholder="Search by Sonar Result"
        value={searchCriteria.sonarRsult}
        onChange={(e) => setSearchCriteria({ ...searchCriteria, sonarRsult: e.target.value })}
        aria-label="Search by Sonar Result"
    />
    
    <button 
        className="btn me-3" 
        onClick={handleSearch}
        style={{ backgroundColor: '#81a9d1', color: 'white' }}
    >
        <i className="fas fa-search"></i>
    </button>
</div>

                    </div>
                    
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tag ID</th>
                                <th>Male Tag Id</th>
                                <th>Mating Type</th>
                                <th>Mating Date</th>
                                <th>Sonar Date</th>
                                <th>Sonar Result</th>
                                <th>Expected Delivery Date</th>
                                <th>Edit Mating</th>
                                <th>Remove Mating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matings.map((mating, index) => (
                                <tr key={mating._id}>
                                    <td>{(currentPage - 1) * animalsPerPage + index + 1}</td>
                                    <td>{mating.tagId}</td>
                                    <td>{mating.maleTag_id}</td>
                                    <td>{mating.matingType}</td>
                                    <td>{mating.matingDate ? mating.matingDate.split('T')[0] : NO_DATE}</td>
                                    <td>{mating.sonarDate ? mating.sonarDate.split('T')[0] : NO_DATE}</td>
                                    <td>{mating.sonarRsult}</td>
                                    <td>{mating.expectedDeliveryDate ? mating.expectedDeliveryDate.split('T')[0] : NO_DATE}</td>
                                    
                                    <td onClick={() => editMating(mating._id)} style={{ cursor: 'pointer' }} className='text-primary'>
                                        <FaRegEdit /> Edit Mating
                                    </td>
                                    <td onClick={() => confirmDelete(mating._id)} style={{ cursor: 'pointer' }} className='text-danger'>
                                        <RiDeleteBin6Line /> Remove Mating
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
            )}
        </>
    );
}

export default MatingTable;
