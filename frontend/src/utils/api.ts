import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const analyzeTransaction = async (transaction: {
  [key: string]: number;
}) => {
  const response = await axios.post(`${BASE_URL}/analyze`, transaction);
  return response.data;
};

export const explainTransaction = async (transaction: {
  [key: string]: number;
}) => {
  const response = await axios.post(`${BASE_URL}/explain`, transaction);
  return response.data;
};

export const fetchMetrics = async () => {
  const response = await axios.get(`${BASE_URL}/metrics`);
  return response.data;
};
