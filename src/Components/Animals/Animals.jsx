import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Rings } from 'react-loader-spinner';
import { AnimalContext } from '../../Context/AnimalContext';
import Swal from 'sweetalert2'; 
import { useNavigate } from "react-router-dom";

export default function Animals() {
    let navigate = useNavigate();
    let { removeAnimals, getAnimals } = useContext(AnimalContext);

    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalsPerPage] = useState(10); // Show 10 animals per page
    const [totalPages, setTotalPages] = useState(1);
    
    // Search states
    const [searchTagId, setSearchTagId] = useState('');
    const [searchAnimalType, setSearchAnimalType] = useState('');
    const [searchLocationShed, setSearchLocationShed] = useState('');
    const [searchBreed, setSearchBreed] = useState('');
    const [searchGender, setSearchGender] = useState('');

    async function removeItem(id) {
        await removeAnimals(id);
        setAnimals(prevAnimals => prevAnimals.filter(animal => animal._id !== id));
    }

    async function fetchAnimals() {
        setIsLoading(true);
        
        // Prepare filters for search functionality
        const filters = {
            tagId: searchTagId,
            animalType: searchAnimalType,
            breed: searchBreed,
            locationShed: searchLocationShed,
            gender: searchGender,
        };
        
        let { data } = await getAnimals(currentPage, animalsPerPage, filters);
        
        // Assuming `data.data.animals` is the list of animals, and `data.data.total` is the total number of animals
        setAnimals(data.data.animals);
        setTotalPages(Math.ceil(data.data.total / animalsPerPage)); // Calculate total pages
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAnimals();
    }, [currentPage]); // Re-fetch when the page changes

    function handleClick(id) {
        Swal.fire({
            title: "هل تريد الاستمرار؟",
            icon: "question",
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
            }
        });
    }

    function editAnimal(id) {
        navigate(`/editAnimal/${id}`);
    }

    function handleSearch() {
        setCurrentPage(1); // Reset to first page when searching
        fetchAnimals();
    }

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
                    <div className="title2">Animals</div>
                    <Link to='/AnimalsDetails'>
                        <button type="button" className="btn btn-lg btn-secondary active button2 mt-3">
                            <MdOutlineAddToPhotos /> Add New Animal
                        </button>
                    </Link>

                    {/* Search Inputs Inline */}
                    <div className="d-flex flex-wrap mt-4">
                        <input 
                            type="text" 
                            className="form-control me-2 mb-2" 
                            placeholder="Search by Tag ID" 
                            value={searchTagId} 
                            onChange={(e) => setSearchTagId(e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <input 
                            type="text" 
                            className="form-control me-2 mb-2" 
                            placeholder="Search by Animal Type" 
                            value={searchAnimalType} 
                            onChange={(e) => setSearchAnimalType(e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <input 
                            type="text" 
                            className="form-control me-2 mb-2" 
                            placeholder="Search by Location Shed" 
                            value={searchLocationShed} 
                            onChange={(e) => setSearchLocationShed(e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <input 
                            type="text" 
                            className="form-control me-2 mb-2" 
                            placeholder="Search by Breed" 
                            value={searchBreed} 
                            onChange={(e) => setSearchBreed(e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <input 
                            type="text" 
                            className="form-control me-2 mb-2" 
                            placeholder="Search by Gender" 
                            value={searchGender} 
                            onChange={(e) => setSearchGender(e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <button 
                            className="btn mb-2 me-2" 
                            onClick={handleSearch}
                            style={{ backgroundColor: '#81a9d1', borderColor: '#81a9d1', color: 'white' }}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>

                    {/* Animal Table */}
                    <table className="table table-striped mt-3 p-2">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tag ID</th>
                                <th scope="col">Animal Type</th>
                                <th scope="col">Breed</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Edit Animal</th>
                                <th scope="col">Remove Animal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map((animal, index) => (
                                <tr key={`${animal.id || animal._id}-${index}`}>
                                    <th scope="row">{(currentPage - 1) * animalsPerPage + index + 1}</th>
                                    <td>{animal.tagId}</td>
                                    <td>{animal.animalType}</td>
                                    <td>{animal.breed}</td>
                                    <td>{animal.gender}</td>
                                    <td onClick={() => editAnimal(animal._id)} style={{ cursor: 'pointer' }} className='text-primary'>
                                        <FaRegEdit /> Edit Animal
                                    </td>
                                    <td 
                                        onClick={() => handleClick(animal.id || animal._id)} 
                                        className='text-danger'
                                        style={{ cursor: 'pointer' }} 
                                    >
                                        <RiDeleteBin6Line /> Remove Animal
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
