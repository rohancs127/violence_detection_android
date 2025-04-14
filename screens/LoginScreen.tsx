import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../scripts/firebaseConfig";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from "react-native";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create animated values for each element
  const titleSlide = new Animated.Value(100); // Start off-screen (below)
  const subtitleSlide = new Animated.Value(100); // Start off-screen (below)
  const emailSlide = new Animated.Value(100); // Start off-screen (below)
  const passwordSlide = new Animated.Value(100); // Start off-screen (below)
  const buttonSlide = new Animated.Value(100); // Start off-screen (below)

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Go to home screen only after successful login
    } catch (error) {
      alert("Invalid credentials. Access denied.");
    }
  };

  // Start the animations when the screen loads
  useEffect(() => {
    Animated.stagger(10, [  // Decrease delay to make animation faster
      Animated.timing(titleSlide, {
        toValue: 0,
        duration: 300,  // Reduced duration
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(subtitleSlide, {
        toValue: 0,
        duration: 300,  // Reduced duration
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(emailSlide, {
        toValue: 0,
        duration: 300,  // Reduced duration
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(passwordSlide, {
        toValue: 0,
        duration: 300,  // Reduced duration
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(buttonSlide, {
        toValue: 0,
        duration: 300,  // Reduced duration
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title and subtitle */}
      <Animated.View
        style={{
          ...styles.titleContainer,
          transform: [{ translateY: titleSlide }],
        }}
      >
        <Text style={styles.title}>Violence Detection</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: subtitleSlide }] }}>
        <Text style={styles.subtitle}>Please enter your admin credentials to proceed</Text>
      </Animated.View>

      {/* Input Fields */}
      <Animated.View style={{ transform: [{ translateY: emailSlide }] }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#a3a3a3"
        />
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: passwordSlide }] }}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#a3a3a3"
        />
      </Animated.View>

      {/* Login Button */}
      <Animated.View style={{ transform: [{ translateY: buttonSlide }] }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#34495e", // Green color for the button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});