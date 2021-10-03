const getAuthHeaders = () => {
  const token = localStorage.getItem('access-token');
  if (token)
    return { Authorization: `Bearer ${token}`};
  return {};
}

export {
  getAuthHeaders,
}