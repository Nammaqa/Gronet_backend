export const sendConnectionRequest = async (requestData) => {
  return requestData;
};

export const acceptConnectionRequest = async (requestId) => {
  return { id: requestId, status: 'ACCEPTED' };
};

export const rejectConnectionRequest = async (requestId) => {
  return { id: requestId, status: 'REJECTED' };
};

export const getConnections = async (userId) => {
  return [];
};

export const getPendingRequests = async (userId) => {
  return [];
};