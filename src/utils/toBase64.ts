const toBase64 = (file: File | { url: string }): Promise<string> => {
  if (!(file instanceof File)) return Promise.resolve(file?.url ?? "");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();  // Crear una nueva instancia de FileReader para cada archivo
    reader.readAsDataURL(file);
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
