declare module "@capacitor/core" {
  interface PluginRegistry {
    MBackend: MBackendPlugin;
  }
}

export interface MBackendPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
  downloadImage(options: { url: string }): Promise<{value: string}>;
}
