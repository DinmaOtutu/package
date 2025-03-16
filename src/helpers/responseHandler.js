
/**
 * Sends a success response.
 *
 * @param {Object} res - The response object.
 * @param {Object} data - The data to send in the response.
 * @param {string} [message='Success'] - The success message.
 * @param {number} [status=200] - The HTTP status code.
 * @returns {Object} The JSON response.
 */
const handleSuccess = (res, data, message = 'Success', status = 200) => {
    return res.status(status).json({
        status: 'success',
        message,
        data,
    });
};

/**
 * Sends an error response.
 *
 * @param {Object} res - The response object.
 * @param {string} [message='Error'] - The error message.
 * @param {number} [status=500] - The HTTP status code.
 * @returns {Object} The JSON response.
 */
const handleError = (res, message = 'Error', status = 500) => {
    return res.status(status).json({
        status: 'error',
        message,
    });
};

module.exports = {
    handleSuccess,
    handleError,
};
