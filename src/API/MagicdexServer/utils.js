
const getAuthHeaders = () => {
  let token = localStorage.getItem("accessToken")

  return token ? { Authorization: `Bearer ${token}` } : {}
}

const authHeadersDecorator = (func) => (
  function(args) {
    args = {
      ...args,
      headers: {
        ...args?.headers,
        ...getAuthHeaders(),
      },
    }
    return func(args)
  }
)

const saveAuth = (response) => {
  localStorage.setItem("accessToken", response.data?.['access-token']);
  return response;
}

const catchErrors = (error) => {
  if (error.response) 
    console.error('Request made and server responded', error.response);
  else if (error.request)
    console.error('Request was made but no response was recieved', error.request);
  else
    console.error("Something happened in setting up the request that triggered an error", error.message);
  
  return error;
};


export {
  getAuthHeaders,
  authHeadersDecorator,
  saveAuth,
  catchErrors,
};