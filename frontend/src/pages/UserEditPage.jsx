import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UserEditLayer from "../components/UserEditLayer";

const UserEditPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Edit User" />

        {/* UserEditLayer */}
        <UserEditLayer />
      </MasterLayout>
    </>
  );
};

export default UserEditPage;
