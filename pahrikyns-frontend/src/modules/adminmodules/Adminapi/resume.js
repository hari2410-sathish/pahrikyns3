import api from "../../../api/axios";


export const saveToServer = async (id = null, data) => {
  if (id) {
    const res = await API.put(`/api/resumes/${id}`, data);
    return res.data.updated.id;
  } else {
    const res = await API.post(`/api/resumes`, data);
    return res.data.id;
  }
};

export const publishResume = async (id) => {
  const res = await API.post(`/api/resumes/${id}/publish`);
  return res.data;
};

export const exportDocxServer = async (id) => {
  const res = await API.get(`/api/resumes/${id}/export/docx`, {
    responseType: "blob",
  });
  return res;
};
