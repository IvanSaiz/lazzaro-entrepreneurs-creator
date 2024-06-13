const reader = new FileReader();

const toBase64 = (file: File | { url: string }): Promise<string> => {
  if (!(file instanceof File)) return Promise.resolve(file?.url ?? "");
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to parse file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to parse file"));
    };
  });
};

export default toBase64;
