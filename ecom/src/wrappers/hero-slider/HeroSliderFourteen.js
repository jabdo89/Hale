import React from "react";
import Swiper from "react-id-swiper";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import heroSliderData from "../../data/hero-sliders/hero-slider-fourteen.json";
import HeroSliderFourteenSingle from "../../components/hero-slider/HeroSliderFourteenSingle.js";

const HeroSliderFourteen = ({ sliders }) => {
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <div className="slider-area">
      <div className="slider-active-2 nav-style-3">
        <Swiper {...params}>
          {sliders &&
            sliders.map((single, key) => {
              return (
                <HeroSliderFourteenSingle
                  sliderClassName="swiper-slide"
                  data={single}
                  key={key}
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sliders: state.firestore.ordered.Sliders,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Sliders" }])
)(HeroSliderFourteen);
