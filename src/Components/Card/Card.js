import React from "react";
import "./Card.css";
import { cardData } from '../../data/cardData';
import Carousel from "./Caraousel"
const Card = () => {
    return (
        <>
        <div className="carousel">
        <div className="container d-flex">
            {cardData.map((card) => (
                <div className="card mt-3">
                    <div className="left-h">
                        <img src={card.image} className="card-img-top" alt="..." />
                    </div>
                    <div className="right-h">
                        <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">
                                {card.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>

        <div className="showCarousel">
        <div className="carouselPad">
        <Carousel cardData={cardData}/>

        </div>
        </div>
        
        </>
    );
};

export default Card;
