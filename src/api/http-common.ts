import axios from "axios";

// TODO: replace baseURL w/ environment variable
export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
});