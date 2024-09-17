import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";

function Animals() {
return <>
<div className="container">

    <div className="title2">Animals</div>
    <Link to='/AnimalsDetails'><button type="button" className="btn btn-secondary btn-lg active button2 mt-3"><MdOutlineAddToPhotos />Add New Animal</button></Link>

    <table class="table table-striped mt-5">
    <thead>
        <tr>
            <th scope="col">Tag ID</th>
            <th scope="col">Type</th>
            <th scope="col">Breed</th>
            <th scope="col">Gender</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>

        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td><FaRegEdit /></td>
            <td><RiDeleteBin6Line /></td>
        </tr>
    </tbody>
</table>
</div>
</>
}

export default Animals
