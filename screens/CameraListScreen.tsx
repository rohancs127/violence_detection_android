import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../scripts/firebaseConfig";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the back button icon

// Define the types for the props
interface CameraListScreenProps {
  onBack: () => void;
  onCameraSelect: (cameraId: string) => void;
  onLogout: () => void;
}

export default function CameraListScreen({
  onBack,
  onCameraSelect,
  onLogout,
}: CameraListScreenProps) {
  const [cameras, setCameras] = useState<any[]>([]);

  useEffect(() => {
    const dbRef = ref(db, "latest_faces");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cameraList = Object.keys(data); // Get all camera IDs (keys)
        setCameras(cameraList);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Navbar with Icon and Title */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Available Cameras</Text>
        <View style={styles.placeholder} />
      </View>

      {/* List of cameras */}
      {cameras.length > 0 ? (
        cameras.map((cameraId, index) => (
          <View key={index} style={styles.cameraItem}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => onCameraSelect(cameraId)} // Pass cameraId to handleCameraSelect
            >
              <Text style={styles.cameraText}>Camera {cameraId}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No cameras available.</Text>
      )}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34495e", // Navbar background color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 30, // Placeholder for the back button
  },
  cameraItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cameraButton: {
    backgroundColor: "#34495e", // Button background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cameraText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
  noDataText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginTop: 50,
  },
  logoutContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#e74c3c", // Red background for logout
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
});
