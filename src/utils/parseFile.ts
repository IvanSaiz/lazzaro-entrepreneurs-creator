import toBase64 from "./toBase64";

export async function parseFiles(input: any): Promise<string[]> {
  if (!input || !input.files || !input.files.length) {
    throw new Error("No files to parse");
  }

  const filesToParse = Array.from(input.files);

  return Promise.all(filesToParse.map(toBase64));
}
