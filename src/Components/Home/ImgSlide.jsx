import React from 'react';
import Slider from "react-slick";
import slider4 from "../../Assets/Img/long-shot-herd-sheep-eating-grass-pasture.jpg";
import slider2 from "../../Assets/Img/cute-goats-farmhouse.jpg";
import slider3 from "../../Assets/Img/full-shot-man-living-countryside.jpg";

function ImgSlide() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return <>
        
            <div className="row gx-0">
                <Slider {...settings}>
                    <div className="image-wrapper">
                        <img height={645} className='w-100' src={slider3} alt='goat3'/>
                        <div className="text-overlay">
                            <h1>FARM ONLINE</h1>
                            <span>Hello Everyone</span>
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <img height={645} className='w-100' src={slider2} alt='goat2'/>
                        <div className="text-overlay">
                            <h1>FARM ONLINE</h1>
                            <span>Hello Everyone</span>
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <img height={645} className='w-100' src={slider4} alt='goat4'/>
                        <div className="text-overlay">
                            <h1>FARM ONLINE</h1>
                            <span>Hello Everyone</span>
                        </div>
                    </div>
                </Slider>
            </div>
        
        </>
}

export default ImgSlide;
