import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MatingContext } from '../../Context/MatingContext';
import { Rings } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import UploadMatExcel from './UploadMatExcel';

const NO_DATE = 'No Date';

function MatingTable() {
    const navigate = useNavigate();
    const { getMating, deleteMating } = useContext(MatingContext);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const animalsPerPage = 10;
    const [searchCriteria, setSearchCriteria] = useState({
        tagId: '',
        matingDate: '',
        sonarResult: '',
        animalType: '',
    });
    const [matings, setMatings] = useState([]);

    async function fetchMating() {
        setIsLoading(true);
        try {
            const filters = {
                tagId: searchCriteria.tagId,
                matingDate: searchCriteria.matingDate,
                sonarResult: searchCriteria.sonarResult,
                animalType: searchCriteria.animalType,
            };
            const { data } = await getMating(currentPage, animalsPerPage, filters);
            setMatings(data.data.mating);
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
            setMatings((prevMatings) => prevMatings.filter((mating) => mating._id !== id));
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

    useEffect(() => {  
        const storedMatings = JSON.parse(localStorage.getItem('matings'));  
        if (storedMatings) {  
            setMatings(storedMatings);  
        } else {  
            fetchMating();  
        }  
    }, []);

    const addMatingData = (newMatings) => {  
        setMatings((prevMatings) => {  
            const updatedMatings = [...prevMatings, ...newMatings];  
            localStorage.setItem('matings', JSON.stringify(updatedMatings)); // تحديث localStorage  
            return updatedMatings;  
        });  
        fetchMating(); // إعادة تحميل البيانات من الـ API  
    };
    
    
    return (
        <>
            {isLoading ? (
                <div className='animal'>
                    <Rings visible={true} height="100" width="100" color="#3f5c40" ariaLabel="rings-loading" />
                </div>
            ) : (
                <div className="container">
                    <div className="title2">Mating</div>

                    <Link to='/mating'>
                        <button type="button" className="btn btn-secondary button2 btn-lg active mt-3">
                            <MdOutlineAddToPhotos /> Add New Mating
                        </button>
                    </Link>
                    <UploadMatExcel addMatingData={addMatingData} />

                    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                        <div className="d-flex align-items-center" style={{ flex: 1, gap: '1rem' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Tag ID"
                                value={searchCriteria.tagId}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, tagId: e.target.value })}
                            />
                            <select
                                value={searchCriteria.animalType}
                                className="form-select"
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, animalType: e.target.value })}
                            >
                                <option value="">Animal Type</option>
                                <option value="goat">Goat</option>
                                <option value="sheep">Sheep</option>
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mating Date"
                                value={searchCriteria.matingDate}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, matingDate: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Sonar Result"
                                value={searchCriteria.sonarResult}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, sonarResult: e.target.value })}
                            />
                            <button
                                className="btn me-3"
                                onClick={handleSearch}
                                style={{ backgroundColor: '#88522e', color: 'white' }}
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
                                <th>Male Tag ID</th>
                                <th>Mating Type</th>
                                <th>Mating Date</th>
                                <th>Sonar Date</th>
                                <th>Sonar Result</th>
                                <th>Expected Delivery Date</th>
                                <th>Edit</th>
                                <th>Remove</th>
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
                                    <td>{mating.sonarResult}</td>
                                    <td>{mating.expectedDeliveryDate ? mating.expectedDeliveryDate.split('T')[0] : NO_DATE}</td>
                                    <td onClick={() => editMating(mating._id)} className='text-success' style={{ cursor: 'pointer' }}>
                                        <FaRegEdit /> Edit
                                    </td>
                                    <td onClick={() => confirmDelete(mating._id)} className='text-danger' style={{ cursor: 'pointer' }}>
                                        <RiDeleteBin6Line /> Remove
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
