import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../scripts/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

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
        const cameraList = Object.keys(data);
        setCameras(cameraList);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Available Cameras</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Camera Cards */}
      {cameras.length > 0 ? (
        cameras.map((cameraId, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onCameraSelect(cameraId)}
            style={styles.cardWrapper}
          >
            <View style={styles.cameraCard}>
              <Ionicons name="videocam" size={24} color="#34495e" />
              <Text style={styles.cameraText}>Camera {cameraId}</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="eye-off" size={48} color="#ccc" />
          <Text style={styles.noDataText}>No cameras available</Text>
        </View>
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
    backgroundColor: "#f2f5f9",
    padding: 20,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#34495e",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 26,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  cameraCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    justifyContent: "space-between",
  },
  cameraText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
    flex: 1,
    marginLeft: 12,
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
    marginTop: 14,
    textAlign: "center",
  },
  emptyState: {
    marginTop: 80,
    alignItems: "center",
  },
  logoutContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
