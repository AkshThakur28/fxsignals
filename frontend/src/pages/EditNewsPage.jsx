import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditNewsLayer from "../components/EditNewsLayer";

const EditNewsPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title="Edit News" />

                {/* UserEditLayer */}
                <EditNewsLayer />
            </MasterLayout>
        </>
    );
};

export default EditNewsPage;
