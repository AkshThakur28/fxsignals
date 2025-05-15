import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddNewsLayer from "../components/AddNewsLayer";


const AddNewsPage = () => {
return (
    <>

      {/* MasterLayout */}
    <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add News" />

        {/* FormValidationLayer */}
        <AddNewsLayer />

    </MasterLayout>

    </>
);
};

export default AddNewsPage;
