import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite:false,
      arrows:false,
    };
    const cardData = this.props.cardData;
    console.log('cardData', cardData)
    return (
        <Slider {...settings}>
            {cardData.map((card) => (
                <div className="card mt-3" style={{ width: "18rem" }}>
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
        </Slider>
    );
  }
}