import api from "../../../api/axios";

// ===========================
// ALL CERTIFICATES
// ===========================
export const fetchAllCertificates = async (params = {}) => {
  const res = await api.get("/admin/certificates", { params });
  return res.data; // { certificates: [] }
};

// ===========================
// ISSUE CERTIFICATE
// ===========================
export const issueCertificate = async (payload) => {
  const res = await api.post("/admin/certificates", payload);
  return res.data;
};

// ===========================
// SINGLE CERTIFICATE
// ===========================
export const fetchCertificateById = async (id) => {
  const res = await api.get(`/admin/certificates/${id}`);
  return res.data;
};

// ===========================
// REVOKE CERTIFICATE
// ===========================
export const revokeCertificate = async (id) => {
  const res = await api.patch(`/admin/certificates/${id}/revoke`);
  return res.data;
};

// ===========================
// VERIFY PUBLIC CERTIFICATE
// ===========================
export const verifyPublicCertificate = async (code) => {
  const res = await api.get(`/certificates/verify/${code}`);
  return res.data;
};
