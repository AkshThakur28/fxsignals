import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MarketOutlookLayer from "../components/MarketOutlookLayer";


const MarketOutlookPage = () => {
    return (
    <>

      {/* MasterLayout */}
        <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Market Outlook" />

        {/* UsersListLayer */}
        <MarketOutlookLayer />

        </MasterLayout>

    </>
    );
};

export default MarketOutlookPage; 
