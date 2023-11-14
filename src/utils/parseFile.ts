import toBase64 from "./toBase64";

export async function parseFile(file: any): Promise<any> {
  if (!file || !file.files || !file.files.length) {
    return Promise.resolve(file);
  }

  const parsedFiles: any[] = [];

  for (const f of file.files) {
    parsedFiles.push(
      f.file instanceof Blob ? await toBase64(f.file) : f.file.url || ""
    );
  }
  return Promise.resolve(parsedFiles);
}
