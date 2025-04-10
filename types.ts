// types.ts
export type RootStackParamList = {
    Login: undefined; // No parameters
    Home: undefined; // No parameters
    CameraList: undefined; // No parameters for CameraList
    CameraDetail: { cameraId: string }; // CameraDetail requires a cameraId parameter
  };
  