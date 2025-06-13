import axios from "axios";

const API_Instance = axios.create({
  baseURL: "https://api.dictionaryapi.dev",
});

export default API_Instance;
