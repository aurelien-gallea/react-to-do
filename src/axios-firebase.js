import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-to-do-2595a-default-rtdb.europe-west1.firebasedatabase.app"
});

export default instance;