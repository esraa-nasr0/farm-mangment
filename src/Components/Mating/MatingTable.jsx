import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MatingContext } from '../../Context/MatingContext';
import { Rings } from 'react-loader-spinner';
import Swal from 'sweetalert2'; 


function MatingTable() {

    let navigate = useNavigate()

    let {getMating , deleteMating} = useContext(MatingContext);
    const [matings , setMating] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    async function getItem() {
        setIsLoading(true);
        let { data } = await getMating();
        setMating(data.data.mating);
        setIsLoading(false);
    }

    useEffect(()=>{
        getItem()
    },[])

    async function deleteItem(id) {
        let {data} = await deleteMating(id);
        console.log(data);
        setMating((prevAnimals) => prevAnimals.filter((mating) => mating._id !== id));
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



    return (
        <>
        {isLoading? (<div className='animal'>
                    <Rings
                    visible={true}
                    height="100"
                    width="100"
                    color="#3F5C40"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""   />
                </div> ):(
                <div className="container">
                    <div className="title2">Mating</div>
                    <Link to='/mating'>
                        <button type="button" className="btn btn-secondary btn-lg active button2 mt-3">
                            <MdOutlineAddToPhotos /> Add New Mating
                        </button>
                    </Link>
                <table className="table table-striped mt-6">
                    <thead>
                        <tr>
                            <th scope="col">Tag ID</th>
                            <th scope="col">Male Tag Id</th>
                            <th scope="col">Mating Type</th>
                            <th scope="col">Mating Date</th>
                            <th scope="col">Sonar Date</th>
                            <th scope="col">Sonar Rsult</th>
                            <th scope="col">Expected Delivery Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
            <tbody>
            {matings.map((mating, index) => (
            <tr key={`${mating.id || mating._id}-${index}`}>
            <th scope="row">{mating.tagId}</th>
            <td>{mating.maleTag_id}</td>
            <td>{mating.matingType}</td>
            {/* Safely handle date fields */}
            <td>{mating.matingDate ? mating.matingDate.split('T')[0] : 'No Date'}</td>
            <td>{mating.sonarDate ? mating.sonarDate.split('T')[0] : 'No Date'}</td>
            <td>{mating.sonarRsult}</td>
            <td>{mating.expectedDeliveryDate ? mating.expectedDeliveryDate.split('T')[0] : 'No Date'}</td>
            <td onClick={() => editMating(mating._id)} style={{ cursor: 'pointer' }} className="text-primary">
                <FaRegEdit /> Edit
            </td>
            <td onClick={() => handleClick(mating._id)} className="text-danger" style={{ cursor: 'pointer' }}>
                <RiDeleteBin6Line /> Remove
            </td>
        </tr>
        ))}
        </tbody>
                </table>
            </div>)}
                

        </>
    );
}

export default MatingTable
