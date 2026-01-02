export interface WistiaVideo {
  pause: () => void;
  play: () => void;
  // Add other methods you might need from the Wistia Player API
}

export interface WistiaAPI {
  (hashedId: string): WistiaVideo | undefined;
  api: (hashedId: string) => WistiaVideo | undefined;
}
