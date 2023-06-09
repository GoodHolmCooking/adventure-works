import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.bootcampcentral.com/api",
	headers: {
		common: { Authorization: "INSTANCE TOKEN" },
	},
});
export default instance;