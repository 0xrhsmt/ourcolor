import { Buffer } from 'buffer';

export {};

declare global {
  interface Window {
    global: Window;
    Buffer: Buffer;
    process: { env: { [key: string]: string } };
  }
}
