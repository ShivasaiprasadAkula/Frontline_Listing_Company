import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import Swal from "sweetalert2";
import { getCompanies, deleteCompany } from "../api/companyApi";

function CompanyTable({ selectedType = "", selectedCity = "", searchQuery = "" }) {
  const tableRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
      document.title = "Companies List";
    }, []);

  useEffect(() => {
    if (!tableRef.current) return;

    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    const dataTable = $(tableRef.current).DataTable({
      serverSide: true,
      processing: true,
      responsive: true,
      lengthChange: true,
      pageLength: 10,
      lengthMenu: [
        [10, 25, 50, 75, 100, -1],
        [10, 25, 50, 75, 100, "All"],
      ],
      order: [[1, "asc"]],
      ajax: async function (data, callback) {
        try {
          const start = data.start || 0;
          const length = data.length || 10;
          const page = Math.floor(start / length) + 1;

          const sortParams = data.order
            .map((o) => {
              const colName = data.columns[o.column].data;
              const dir = o.dir;
              return colName ? `${colName}:${dir}` : null;
            })
            .filter(Boolean)
            .join(",");

          const searchValue = data.search.value || searchQuery;

          const params = new URLSearchParams();
          if (searchValue) params.append("search", searchValue);
          if (selectedType) params.append("type", selectedType);
          if (selectedCity) params.append("city", selectedCity);
          if (sortParams) params.append("sort", sortParams);
          params.append("page", page);
          params.append("limit", length);

          const response = await getCompanies(params);
          const companies = response.data || [];
          const totalCount = response.count || 0;

          callback({
            draw: data.draw,
            recordsTotal: totalCount,
            recordsFiltered: totalCount,
            data: companies,
          });
        } catch (error) {
          console.error(error);
          callback({
            draw: data.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          });
        }
      },
      columns: [
        {
          title: "S.No",
          data: null,
          render: (d, t, r, meta) => {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { title: "Name", data: "name" },
        { title: "Industry", data: "industry" },
        { title: "Description", data: "description" },
        { title: "Address", data: "address" },
        { title: "City", data: "city" },
        { title: "State", data: "state" },
        { title: "Country", data: "country" },
        { title: "Pincode", data: "pincode" },
        { title: "Founded Year", data: "foundedYear" },
        { title: "Employees", data: "employeeCount" },
        { title: "Type", data: "type" },
        {
          title: "Website",
          data: "website",
          render: (data) =>
            data
              ? `<a href="${data}" target="_blank" class="text-blue-600 underline">${data}</a>`
              : "",
        },
        { title: "Email", data: "email" },
        { title: "Phone", data: "phone" },
        {
          title: "Status",
          data: "isActive",
          render: (data) =>
            data
              ? '<span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>'
              : '<span class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Inactive</span>',
        },
        {
          title: "Actions",
          data: null,
          orderable: false,
          searchable: false,
          render: (data, type, row) => {
            return `
              <div class="flex space-x-3">
                <button class="edit-btn text-blue-600 hover:text-blue-800" data-id="${row._id}" title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 4.487l1.651 1.651a1.75 1.75 0 010 2.475l-8.486 8.486a2 2 0 01-.878.508l-3.285.82a.75.75 0 01-.916-.916l.82-3.285a2 2 0 01.508-.878l8.486-8.486a1.75 1.75 0 012.475 0z" />
                  </svg>
                </button>
                <button class="delete-btn text-red-600 hover:text-red-800" data-id="${row._id}" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                  </svg>
                </button>
              </div>
            `;
          }
        }
      ],
      createdRow: function (row) {
        $(row).find("td").addClass("border border-gray-200 px-2 py-1");
      },
      initComplete: function () {
        $(tableRef.current)
          .find("th")
          .addClass(
            "bg-gray-200 text-gray-800 font-semibold border border-gray-300 px-2 py-2"
          );
      },
      dom:
        '<"flex flex-col md:flex-row md:justify-between mb-4"<"dataTables_length mb-2 md:mb-0"l><"dataTables_filter mb-2 md:mb-0"f>>' +
        '<"overflow-x-auto"t>' +
        '<"flex flex-col md:flex-row md:justify-between mt-4"<"dataTables_info"i><"dataTables_paginate"p>>',
      language: {
        paginate: {
          previous: "Back",
          next: "Next",
        },
        emptyTable: "No Company Data Found",
      },
      stripeClasses: ["bg-white", "bg-gray-50"],
    });

    $(tableRef.current).on("click", ".edit-btn", function () {
      const id = $(this).data("id");
      navigate(`/companies/edit/${id}`);
    });

    $(tableRef.current).on("click", ".delete-btn", function () {
      const id = $(this).data("id");

      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteCompany(id);

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The company has been deleted.",
              confirmButtonColor: "#3085d6",
            });

            // Reload DataTable after delete
            $(tableRef.current).DataTable().ajax.reload(null, false);
          } catch (error) {
            console.error("Delete failed:", error);
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: error?.response?.data?.message || "Failed to delete company. Please try again.",
              confirmButtonColor: "#d33",
            });
          }
        }
      });
    });

    return () => {
      $(tableRef.current).off("click", ".edit-btn");
      $(tableRef.current).off("click", ".delete-btn");
    };
  }, [selectedType, selectedCity, searchQuery, navigate]);

  return (
    <div className="max-w-full p-6 bg-white border border-gray-200 shadow-2xl rounded-xl mx-auto">
      <div className="max-w-full p-6 bg-white border border-gray-200 shadow-2xl rounded-xl mx-auto">
        <div className="overflow-x-auto">
          <table
            ref={tableRef}
            className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg table-auto"
            style={{ borderCollapse: "collapse" }}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyTable;
