import axios from "axios";

const api = axios.create({
    baseURL : "http://127.0.0.1:8000/",
});

export const getAllRecords = async() => {
    const response = await api.get("records");
    return response.data
}

export const approveRecord = async(id) => {
    const response = await api.put(`records/${id}/approve`);
    return response.data;
}

export const rejectRecord = async(id) => {
    const response = await api.put(`records/${id}/reject`);
    return response.data;
}

export const getPending = async() => {
    const response = await api.get("records/pending");
    return response.data;
}

export const getSuspicious = async() => {
    const response = await api.get("records/suspicious");
    return response.data;
}

export const deleteRecord = async(id) => {
    const response = await api.delete(`records/${id}`);
    return response.data
}