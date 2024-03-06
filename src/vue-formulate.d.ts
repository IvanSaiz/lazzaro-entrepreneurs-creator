declare module "@braid/vue-formulate";
declare module "@braid/vue-formulate-i18n";

declare type ImageVModel = {
  upload: () => Promise<{ url: string; name: string }[]>;
};
