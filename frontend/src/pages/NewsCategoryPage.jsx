import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import NewsCategoryLayer from "../components/NewsCategoryLayer";


const NewsCategoryPage = () => {
return (
    <>
      {/* MasterLayout */}
        <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="News Category" />


        {/* DashBoardLayerFour */}
        <NewsCategoryLayer />


        </MasterLayout>
    </>
);
};

export default NewsCategoryPage;
