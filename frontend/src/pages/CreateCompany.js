import { React, useEffect } from "react";
import CompanyForm from "../components/CompanyForm";
import { createCompany } from "../api/companyApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateCompany() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Company";
  }, []);

  const handleSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this company?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await createCompany(data);

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Company created successfully.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/companies");
    } catch (error) {
      console.error("Error creating company:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error?.response?.data?.message || "Failed to create company. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <CompanyForm
      onSubmit={handleSubmit}
      title="Create Company"
      submitText="Create"
    />
  );
}

export default CreateCompany;
