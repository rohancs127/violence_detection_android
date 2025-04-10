import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../scripts/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

interface CameraDetailsScreenProps {
  cameraId: string;
  onBack: () => void;
}

export default function CameraDetailsScreen({
  cameraId,
  onBack,
}: CameraDetailsScreenProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(db, `latest_faces/${cameraId}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cameraRecords = Object.values(data);
        setRecords(cameraRecords);
      }
      setLoading(false);
    });
  }, [cameraId]);

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Camera {cameraId} - Records</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Loader or Records */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#34495e" />
          <Text style={styles.loadingText}>Loading records...</Text>
        </View>
      ) : records.length > 0 ? (
        records.map((record, index) => (
          <View key={index} style={styles.recordContainer}>
            <Text style={styles.timestamp}>
              {new Date(record.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.violenceStatus}>
              Violence Detected: {record.violence ? "Yes" : "No"}
            </Text>
            <Text style={styles.weaponInfo}>Weapon: {record.weapon}</Text>
            <Image
              source={{ uri: `data:image/jpeg;base64,${record.image_base64}` }}
              style={styles.image}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>
          No records available for this camera.
        </Text>
      )}

      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to Camera List</Text>
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
    backgroundColor: "#34495e",
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
    width: 30,
  },
  recordContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  timestamp: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  violenceStatus: {
    fontSize: 16,
    color: "#ff3b3b",
    fontWeight: "600",
    marginBottom: 6,
  },
  weaponInfo: {
    fontSize: 16,
    color: "#000",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 12,
  },
  noDataText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginTop: 50,
  },
  backButtonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#34495e",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 50,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  loaderContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
});
