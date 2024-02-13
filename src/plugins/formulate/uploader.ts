import toBase64 from "../../utils/toBase64";
import http from "@/api/core/http";

export default async function uploader(
  file: File,
  progess: (percent: number) => void
) {
  // TODO: Replace with S3 endpoint
  progess(0);
  const res = await http.post("/aws/upload", {
    filename: file.name,
    imageBase64: await toBase64(file)
  });
  progess(100);
  return {
    url: res,
    name: file.name
  };
}
