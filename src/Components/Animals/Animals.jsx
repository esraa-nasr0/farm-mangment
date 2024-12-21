import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Rings } from 'react-loader-spinner';
import { AnimalContext } from '../../Context/AnimalContext';
import Swal from 'sweetalert2'; 
import { useNavigate } from "react-router-dom";
import UploadExcel from './UploadExcel';

export default function Animals() {
    const navigate = useNavigate();
    const { removeAnimals, getAnimals } = useContext(AnimalContext);

    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [searchTagId, setSearchTagId] = useState('');
    const [searchAnimalType, setSearchAnimalType] = useState('');
    const [searchLocationShed, setSearchLocationShed] = useState('');
    const [searchBreed, setSearchBreed] = useState('');
    const [searchGender, setSearchGender] = useState('');

    const removeItem = async (id) => {
        await removeAnimals(id);
        setAnimals(prevAnimals => prevAnimals.filter(animal => animal._id !== id));
    };

    const fetchAnimals = async () => {
        setIsLoading(true);

        const filters = {
            tagId: searchTagId,
            animalType: searchAnimalType,
            breed: searchBreed,
            locationShed: searchLocationShed,
            gender: searchGender,
        };

        let { data } = await getAnimals(currentPage, animalsPerPage, filters);
        setAnimals(data.data.animals);
        setTotalPages(Math.ceil(data.data.total / animalsPerPage));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAnimals();
    }, [currentPage]);

    const handleClick = (id) => {
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
    };

    const editAnimal = (id) => {
        navigate(`/editAnimal/${id}`);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchAnimals();
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Load animals from local storage on mount
    useEffect(() => {
        const storedAnimals = JSON.parse(localStorage.getItem('animals'));
        if (storedAnimals) {
            setAnimals(storedAnimals);
        } else {
            fetchAnimals(); // Fetch from backend if nothing is in local storage
        }
    }, []);

    const addAnimals = (newAnimals) => {  
    setAnimals((prevAnimals) => {  
        const updatedAnimals = [
            ...prevAnimals, 
            ...newAnimals.filter(animal => !prevAnimals.some(existingAnimal => existingAnimal.tagId === animal.tagId))
        ];  
        localStorage.setItem('animals', JSON.stringify(updatedAnimals));  
        return updatedAnimals;  
    });  
    setTotalPages(Math.ceil((animals.length + newAnimals.length) / animalsPerPage));   
};

    return (
        <>
            {isLoading ? (
                <div className='animal'>
                    <Rings visible={true} height="100" width="100" color="#3f5c40" ariaLabel="rings-loading" />
                </div>
            ) : (
                <div className="container">
                    <div className="title2">Animals</div>
                    <Link to='/AnimalsDetails'>
                        <button type="button" className="btn btn-lg btn-secondary active button2 mt-3">
                            <MdOutlineAddToPhotos /> Add New Animal
                        </button>
                    </Link>

                    {/* Pass the addAnimals function to UploadExcel component */}
                    <UploadExcel addAnimals={addAnimals} />

                    <div className="d-flex flex-wrap mt-4">
                        <input type="text" className="form-control me-2 mb-2" placeholder="Search by Tag ID" value={searchTagId} onChange={(e) => setSearchTagId(e.target.value)} style={{ flex: 1 }} />
                        <input type="text" className="form-control me-2 mb-2" placeholder="Search by Animal Type" value={searchAnimalType} onChange={(e) => setSearchAnimalType(e.target.value)} style={{ flex: 1 }} />
                        <input type="text" className="form-control me-2 mb-2" placeholder="Search by Location Shed" value={searchLocationShed} onChange={(e) => setSearchLocationShed(e.target.value)} style={{ flex: 1 }} />
                        <input type="text" className="form-control me-2 mb-2" placeholder="Search by Breed" value={searchBreed} onChange={(e) => setSearchBreed(e.target.value)} style={{ flex: 1 }} />
                        <input type="text" className="form-control me-2 mb-2" placeholder="Search by Gender" value={searchGender} onChange={(e) => setSearchGender(e.target.value)} style={{ flex: 1 }} />
                        <button className="btn mb-2 me-2" onClick={handleSearch} style={{ backgroundColor: '#88522e', borderColor: '#88522e', color: 'white' }}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>

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
                                    <td onClick={() => editAnimal(animal._id)} style={{ cursor: 'pointer' }} className='text-success'>
                                        <FaRegEdit /> Edit Animal
                                    </td>
                                    <td onClick={() => handleClick(animal.id || animal._id)} className='text-danger' style={{ cursor: 'pointer' }}>
                                        <RiDeleteBin6Line /> Remove Animal
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
                                {Array.from({ length: totalPages }, (_, index) => {
                                    const pageNumber = index + 1;
                                    if (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) {
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
