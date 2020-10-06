import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Sauco</title>
        <meta
          name="description"
          content="Somos dos hermanos mexicanos compartiendo nuestras creaciones de salsas caseras con mucho cariño para ustedes!"
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="All Categories" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
