export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode)
};

export const errorResponse = (res, message = 'Error', statusCode = 500, errors = null) => {
  return res.status(statusCode)
};

export const paginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.json({ success: true });
};