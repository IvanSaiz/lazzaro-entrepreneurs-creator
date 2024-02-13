import toBase64 from "./toBase64";

export async function parseFiles(input: any): Promise<string[]> {
  if (typeof input === "string") return [input];

  if (Array.isArray(input)) return input.map(({ url }) => url);

  if ("results" in input && input.results) {
    return input.results.map(({ url }) => url);
  }

  return Promise.all(input.files.map(({ file }) => toBase64(file)));
}
