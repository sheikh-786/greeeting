// types.ts
declare global {
    interface Window {
      MiniAppExtension: {
        PERMISSIONS: {
          CAMERA: string;
          FILE_PICKER: string;
          LOCATION: string;
          MICROPHONE: string;
        };
        checkPermission: (
          permission: string,
          callback: (result: { granted: boolean }) => void
        ) => void;
        getPermission: (
          permission: string,
          callback: (result: { granted: boolean }) => void
        ) => void;
        shareFile: (
          mime: string,
          data: string,
          shareText: string,
          callback: (response: { success: boolean; error?: string }) => void
        ) => void;
      };
    }
  }
  
  export {};