// client-side bulk generator (browser). For large sets prefer server.
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { generateCertificatePDF } from "./generateCertificatePDF"; // your util

export async function generateBulk(certList, template = "gold") {
  // certList = array of certificate objects
  const zip = new JSZip();
  for (let i = 0; i < certList.length; i++) {
    const c = certList[i];
    // generate PDF as data URL (modify generateCertificatePDF to return blob or dataURL if needed)
    // simplest approach: generate PDF in window (saves file) OR modify util to return blob
    // For now, call util and save each file one by one using generateCertificatePDF(c, template)
    await generateCertificatePDF(c, template); // this will prompt individual downloads; for zipped flow we adapt util to return blob
  }
  // Advanced mode: modify generateCertificatePDF to return ArrayBuffer or Blob then add to zip
}
