import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCompanies = async (params) => {
  const res = await API.get("/companies", { params });
  return res.data;
};

export const createCompany = async (data) => {
  const res = await API.post("/companies", data);
  return res.data;
};

export const getCompanyById = async (id) => {
  const res = await API.get(`/companies/${id}`);
  return res.data;
};

export const updateCompany = async (id, data) => {
  const res = await API.put(`/companies/${id}`, data);
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await API.delete(`/companies/${id}`);
  return res.data;
};
