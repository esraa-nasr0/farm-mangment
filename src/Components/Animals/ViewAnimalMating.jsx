import React, { useContext, useEffect, useState } from 'react';
import { GetAnimalContext } from '../../Context/GetAnimalContext';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MatingContext } from '../../Context/MatingContext';
import Swal from 'sweetalert2'; 


function ordinalSuffix(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
}

function ViewAnimalMating({ animalId }) {
    let navigate = useNavigate();
    let { getAnimalMating } = useContext(GetAnimalContext);
    let {deleteMating} = useContext(MatingContext);
    const [animalMating, setAnimalMating] = useState([]);

    async function getMating(animalId) {
        const { data } = await getAnimalMating(animalId);
        setAnimalMating(data.data.mating);
    }

    useEffect(() => {
        if (animalId) {
            getMating(animalId);
        }
    }, [animalId]);

    
    async function deleteItem(id) {
        let {data} = await deleteMating(id);
        console.log(data);
        setAnimalMating((prevAnimals) => prevAnimals.filter((mating) => mating._id !== id));
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
                deleteItem(id);
            }
        });
    }

    
    function editMating(id) {
        navigate(`/editMating/${id}`);
    }

    
    function MatingAnimal() {
        navigate(`/mating`);
    }
    


    return (
        <div className="mating-record-wrapper">
            <div className="mating-record-header">
                <h2>MATING RECORD</h2>
                <button onClick={()=> MatingAnimal()} className="add-record-btn">
                    <FaPlusCircle /> Add New Record
                </button>
            </div>

            <div className="mating-record-list">
                {animalMating.length > 0 ? (
                    animalMating.map((mating, index) => (
                        <div key={mating._id} className="mating-record-item">
                            <div className="mating-record-info">
                                <span>{ordinalSuffix(index + 1)} Mating</span>
                            </div>
                            <div className="mating-record-actions">
                                <FaEdit onClick={() => editMating(mating._id)} className="edit-icon" title="Edit" />
                                <FaTrashAlt onClick={() => handleClick(mating._id)} className="delete-icon" title="Delete" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No mating records found for this animal.</p>
                )}
            </div>
        </div>
    );
}

export default ViewAnimalMating;
