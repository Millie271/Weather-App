import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather/${city}`);
  return response.data;
};