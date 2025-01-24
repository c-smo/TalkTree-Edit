import API from "../__api_main__";

const speechgen_valid_data = () => {
  const apiKeyPattern = /^[a-zA-Z0-9]{32}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /^[A-Za-z\s]+$/;

  const api_data = API.expected_data;
  if (
    api_data.token === "x" ||
    api_data.email === "x" ||
    api_data.voice === "x" ||
    !apiKeyPattern.test(api_data.token) ||
    !emailPattern.test(api_data.email) ||
    !namePattern.test(api_data.voice)
  ) {
    return false;
  }
  return true;
};

export default speechgen_valid_data;
