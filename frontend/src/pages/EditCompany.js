import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyForm from "../components/CompanyForm";
import { getCompanyById, updateCompany } from "../api/companyApi";
import Swal from "sweetalert2";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [defaultValues, setDefaultValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Edit Company";
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getCompanyById(id);
        if (response.success && response.data) {
          setDefaultValues(response.data);
        } else {
          setDefaultValues(null);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setDefaultValues(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  useEffect(() => {
    if (!loading && !defaultValues) {
      Swal.fire({
        icon: "error",
        title: "Company Not Found",
        text: "The requested company does not exist.",
        confirmButtonText: "Go to Companies",
      }).then(() => {
        navigate("/companies");
      });
    }
  }, [loading, defaultValues, navigate]);

  const handleUpdate = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this company?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await updateCompany(id, data);

      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Company updated successfully.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/companies");
    } catch (error) {
      console.error("Error updating company:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error?.response?.data?.message || "Failed to update company. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (loading) {
    return <div className="text-center text-lg py-10">Loading company details...</div>;
  }

  if (!defaultValues) {
    return null;
  }

  return (
    <CompanyForm
      onSubmit={handleUpdate}
      title="Edit Company"
      submitText="Update"
      defaultValues={defaultValues}
    />
  );
}

export default EditCompany;
