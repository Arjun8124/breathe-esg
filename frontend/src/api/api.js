import axios from "axios";

const api = axios.create({
  baseURL: "https://breathe-esg-vkx3.onrender.com",
});

export const getAllRecords = async () => {
  const response = await api.get("/records");
  return response.data;
};

export const approveRecord = async (id) => {
  const response = await api.patch(`/records/${id}/approve`);
  return response.data;
};

export const rejectRecord = async (id) => {
  const response = await api.patch(`/records/${id}/reject`);
  return response.data;
};

export const getPending = async () => {
  const response = await api.get("/records/pending");
  return response.data;
};

export const getSuspicious = async () => {
  const response = await api.get("/records/suspicious");
  return response.data;
};

export const deleteRecord = async (id) => {
  const response = await api.delete(`/records/${id}`);
  return response.data;
};

export const uploadFile = async (file, source_type) => {
  const formdata = new FormData();
  formdata.append("file", file);

  const response = await api.post(`/records/upload/${source_type}`, formdata);
  return response.data;
};
