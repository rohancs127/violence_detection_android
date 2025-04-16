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

interface HomeScreenProps {
  onViewRecords: () => void;
}

export default function HomeScreen({ onViewRecords }: HomeScreenProps) {
  const [latestRecords, setLatestRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(db, "latest_faces");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const records = Object.entries(data).map(
          ([cameraId, recordsData]: any) => {
            const latestRecord = recordsData[Object.keys(recordsData)[0]];
            return { cameraId, ...latestRecord };
          }
        );
        setLatestRecords(records);
      }
      setLoading(false);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={onViewRecords}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Guard Vision</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Loader or Records */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#34495e" />
          <Text style={styles.loadingText}>Fetching live feed...</Text>
        </View>
      ) : latestRecords.length > 0 ? (
        latestRecords.map((record, index) => (
          <View key={index} style={styles.recordCard}>
            <Text style={styles.cameraId}>📷 Camera {record.cameraId}</Text>
            <Text style={styles.timestamp}>
              {new Date(record.timestamp).toLocaleString()}
            </Text>
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
          <Ionicons name="cloud-offline" size={48} color="#ccc" />
          <Text style={styles.noDataText}>No recent activity to show</Text>
        </View>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#34495e",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  placeholder: {
    width: 26,
  },
  recordCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  cameraId: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 15,
    color: "#555",
    marginBottom: 6,
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
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 8,
  },
  loaderContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: "#666",
  },
  noDataText: {
    marginTop: 12,
    fontSize: 17,
    color: "#aaa",
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
});
