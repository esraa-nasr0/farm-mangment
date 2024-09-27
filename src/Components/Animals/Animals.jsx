import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Rings } from 'react-loader-spinner';
import { AnimalContext } from '../../Context/AnimalContext';
import Swal from 'sweetalert2'; 
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";


export default function Animals() {
    let navigate = useNavigate();

    let { removeAnimals, getAnimals } = useContext(AnimalContext);
    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    async function removeItem(id) {
        let { data } = await removeAnimals(id);
        console.log(data);
        // Update the animals state locally by filtering out the removed animal
        setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal._id !== id));
    }

    async function getItem() {
        setIsLoading(true);
        let { data } = await getAnimals();
        setAnimals(data.data.animals);
        setIsLoading(false);
    }

    useEffect(() => {
        getItem();
    }, []);
    

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
                removeItem(id);
            }
        });
    }

    function editAnimal(id) {
        navigate(`/editAnimal/${id}`);
    }
    function viewAnimal(id) {
        navigate(`/viewAnimalDetails/${id}`);
    }

    return (
        <>
            {isLoading ? (
                <div className='animal'>
                    <Rings
                        visible={true}
                        height="100"
                        width="100"
                        color="#3F5C40"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className="container">
                    <div className="title2">Animals</div>
                    <Link to='/AnimalsDetails'>
                        <button type="button" className="btn btn-secondary btn-lg active button2 mt-3">
                            <MdOutlineAddToPhotos /> Add New Animal
                        </button>
                    </Link>

                    <table className="table table-striped mt-6">
                        <thead>
                            <tr>
                                <th scope="col">Tag ID</th>
                                <th scope="col">Animal Type</th>
                                <th scope="col">Breed</th>
                                <th scope="col">Gender</th>
                                <th scope="col">View Animal</th>
                                <th scope="col">Edit Animal</th>
                                <th scope="col">Remove Animal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map((animal, index) => (
                                <tr key={`${animal.id || animal._id}-${index}`}>
                                    <th scope="row">{animal.tagId}</th>
                                    <td>{animal.animalType}</td>
                                    <td>{animal.breed}</td>
                                    <td>{animal.gender}</td>
                                    <td onClick={() => viewAnimal(animal._id)} style={{ cursor: 'pointer' }} className='text-success'><GrView /> View Details</td>
                                    <td onClick={() => editAnimal(animal._id)} style={{ cursor: 'pointer' }} className='text-primary'><FaRegEdit /> Edit Animal</td>
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
                </div>
            )}
        </>
    );
}
