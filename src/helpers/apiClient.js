// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import config from "../env.config";

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Sets the default authorization header for all axios requests.
 * @param {string} token The authorization token to be set.
 */
const setAuthorization = (token) => {
    axios.defaults.headers.common.Authorization = token ? {token} : null;
}

class APIClient {
    constructor() {
        setAuthorization(null);
    }

    /**
     * Fetches data from the given URL.
     * @param {string} url The URL to fetch data from.
     * @param {object} params The parameters for the GET request.
     * @returns {Promise} Axios promise returning the fetched data.
     */
    get = (url, params) => axios.get(url, { params }).catch(this.handleError)

    /**
     * Initiates a download request.
     * @param {string} url The URL to download data from.
     * @returns {Promise} Axios promise returning the blob response.
     */
    download = (url) => axios.get(url, { responseType: 'blob' }).catch(this.handleError)

    /**
     * Posts data to the given URL.
     * @param {string} url The URL to post data to.
     * @param {object} data The data to be posted.
     * @returns {Promise} Axios promise returning the response.
     */
    post = (url, data) => axios.post(url, data).catch(this.handleError)

    /**
     * Updates data at the given URL.
     * @param {string} url The URL to send the update request to.
     * @param {object} data The data to update.
     * @returns {Promise} Axios promise returning the response.
     */
    update = (url, data) => axios.patch(url, data).catch(this.handleError)

    /**
     * Deletes data at the given URL.
     * @param {string} url The URL to delete data from.
     * @returns {Promise} Axios promise returning the response.
     */
    delete = (url) => axios.delete(url).catch(this.handleError)

    /**
     * Generic error handler for Axios requests.
     * @param {Error} error The error object thrown by Axios.
     */
    // eslint-disable-next-line class-methods-use-this
    handleError = (error) => {
        // Implement error handling logic, e.g., logging or displaying error messages
        console.error('API call failed:', error);
        throw error; // Re-throw error for further handling if needed
    }
}

export { APIClient, setAuthorization };
