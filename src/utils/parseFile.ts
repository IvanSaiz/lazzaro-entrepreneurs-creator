import toBase64 from "./toBase64";

type Input = string | { files: { file: File }[] } | { url: string }[];

export async function parseFiles(input: Input): Promise<string[]> {
  if (typeof input === "string") return [input];

  if (Array.isArray(input)) return input.map(({ url }) => url);

  return Promise.all(input.files.map(({ file }) => toBase64(file)));
}
