import React from 'react';
import Img1 from '../../Assets/Img/Goat-Kids-Care-and-Management-2.jpg';
import Img2 from '../../Assets/Img/goat3.jpeg';
import Img3 from '../../Assets/Img/weightGoat.jpg'
import { Link } from 'react-router-dom';

function HomeServices() {
    return <>
    <div className='section'>
        <h2>Home Services</h2>
        <ul className='cards'>
            <li className='card'>
                <Link className='Link' to="animals">
                <img  src={Img1} alt='goat1'/>
                <h3>Animals</h3>
                <p>Enter Animals Data</p>
                </Link>
            </li>
            <li className='card'>
                <Link className='Link' to="mating">
                <img  src={Img2} alt='goat2'/>
                <h3>mating</h3>
                <p>Enter The Animal Mating Data</p>
                </Link>
            </li>
            <li className='card'>
                <Link className='Link' to="weight">
                <img  src={Img3} alt='goat3'/>
                <h3>Weight</h3>
                <p>Enter The Animal's Weight Data</p>
                </Link>
            </li>

        </ul>
    </div>
    </>
}

export default HomeServices
