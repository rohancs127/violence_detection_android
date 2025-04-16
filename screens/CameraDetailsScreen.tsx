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

  const fetchRecords = () => {
    setLoading(true);
    const dbRef = ref(db, `latest_faces/${cameraId}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cameraRecords = Object.values(data).reverse();
        setRecords(cameraRecords);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchRecords();
  }, [cameraId]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Camera {cameraId} - Records</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchRecords}>
        <Ionicons name="refresh" size={18} color="#34495e" />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>

      {/* Loader or Records */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#34495e" />
          <Text style={styles.loadingText}>Loading records...</Text>
        </View>
      ) : records.length > 0 ? (
        records.map((record, index) => (
          <View key={index} style={styles.recordCard}>
            <View style={styles.metaRow}>
              <Ionicons name="calendar" size={18} color="#666" />
              <Text style={styles.timestamp}>
                {new Date(record.timestamp).toLocaleString()}
              </Text>
            </View>
            <Text style={styles.violenceStatus}>
              🚨 Violence Detected:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {record.violence ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.weaponInfo}>
              🗡️ Weapon Detected: {record.weapon}
            </Text>
            <Image
              source={{ uri: `data:image/jpeg;base64,${record.image_base64}` }}
              style={styles.image}
            />
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={48} color="#ccc" />
          <Text style={styles.noDataText}>
            No records available for this camera.
          </Text>
        </View>
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
    backgroundColor: "#f2f5f9",
    padding: 20,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#34495e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  placeholder: {
    width: 26,
  },
  refreshButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  refreshText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#34495e",
  },
  recordCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 15,
    color: "#333",
    marginLeft: 6,
    fontWeight: "600",
  },
  violenceStatus: {
    fontSize: 15,
    color: "#c0392b",
    marginBottom: 4,
  },
  weaponInfo: {
    fontSize: 15,
    color: "#2d3436",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  loaderContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  emptyState: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 17,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
  backButtonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#34495e",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 40,
  },
  backButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
});
