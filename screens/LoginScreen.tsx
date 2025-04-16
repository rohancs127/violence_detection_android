import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Keyboard,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../scripts/firebaseConfig";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const slideY = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(100)).current;
  const subtitleSlide = useRef(new Animated.Value(100)).current;
  const emailSlide = useRef(new Animated.Value(100)).current;
  const passwordSlide = useRef(new Animated.Value(100)).current;
  const buttonSlide = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.stagger(10, [
      Animated.timing(titleSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(subtitleSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(emailSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(passwordSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(buttonSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => Animated.timing(slideY, {
        toValue: -80,
        duration: 250,
        useNativeDriver: true,
      }).start()
    );

    const keyboardHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => Animated.timing(slideY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      alert("Invalid credentials. Access denied.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, { transform: [{ translateY: slideY }] }]}>
        <View style={styles.card}>
          <Animated.View style={[styles.titleContainer, { transform: [{ translateY: titleSlide }] }]}>
            <Text style={styles.title}>Guard Vision</Text>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: subtitleSlide }] }}>
            <Text style={styles.subtitle}>Admin access only</Text>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: emailSlide }] }}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: passwordSlide }] }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: buttonSlide }] }}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2c3e50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
