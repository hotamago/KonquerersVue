// Set up axios
const baseURL = process.env.NODE_ENV === 'production' ? 'https://kon-api.hotavn.com' : 'http://localhost:8010';
// const baseURL = 'https://kon-api.hotavn.com';
const apiVersion = 'v1.0';
const apiPrefix = {
    "user": baseURL + "/api/" + apiVersion,
    "server": baseURL + "/api-non/" + apiVersion,
    // "server": baseURL + "/api-server/" + apiVersion,
}

export { apiPrefix };