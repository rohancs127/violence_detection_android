import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import CameraListScreen from "../screens/CameraListScreen";
import CameraDetailsScreen from "../screens/CameraDetailsScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>("login");
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen("login");
  };

  const handleViewRecords = () => {
    setCurrentScreen("cameraList");
  };

  const handleCameraSelect = (cameraId: string) => {
    setSelectedCameraId(cameraId);
    setCurrentScreen("cameraDetails");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={handleLogin} />;
      case "home":
        return (
          <HomeScreen onViewRecords={handleViewRecords} />
        );
      case "cameraList":
        return <CameraListScreen onBack={() => setCurrentScreen("home")} onCameraSelect={handleCameraSelect} onLogout={handleLogout} />;
      case "cameraDetails":
        return <CameraDetailsScreen cameraId={selectedCameraId!} onBack={() => setCurrentScreen("cameraList")} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return <>{renderScreen()}</>;
}
