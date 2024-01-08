// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reader = new FileReader();

const toBase64 = (file: Blob): Promise<string> => {
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
