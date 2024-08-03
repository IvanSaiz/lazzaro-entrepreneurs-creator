import toBase64 from "../../utils/toBase64";
import http from "@/api/core/http";

export default async function uploader(
  file: File,
  progress: (percent: number) => void
) {
  // TODO: Replace with S3 endpoint
  progress(0);
  const [name] = file.name.split(".");
  const imageBase64 = await toBase64(file);
  const res = await http.post("/aws/upload", {
    filename: name,
    imageBase64
  });
  progress(100);
  return {
    url: res,
    name: file.name
  };
}
