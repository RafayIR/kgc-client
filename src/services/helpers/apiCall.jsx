import axios from "./axios/axios";

async function postApi(apiCallRequest) {
  return await axios.post(
    apiCallRequest.url,
    apiCallRequest.data,
    apiCallRequest.config,
  );
}


async function searchApi(apiCallRequest) {
  const urlWithParams = `${apiCallRequest.url}?${new URLSearchParams(apiCallRequest.params).toString()}`;
  return await axios.post(
    urlWithParams,
    null, // No request body data
    apiCallRequest.config,
  );
}

async function getApi(apiCallRequest) {
  return await axios.get(apiCallRequest.url, apiCallRequest.config);
}

async function putApi(apiCallRequest) {
  return await axios.put(
    apiCallRequest.url,
    apiCallRequest.data,
    apiCallRequest.config
  );
}
async function deleteApi(apiCallRequest) {
  return await axios.delete(
    apiCallRequest.url,
    apiCallRequest.config,
    apiCallRequest.data,
  );
}

export { getApi, postApi, putApi, deleteApi, searchApi };
