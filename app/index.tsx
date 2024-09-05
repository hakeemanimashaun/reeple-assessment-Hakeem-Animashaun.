// app/login.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

export default function login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false); // State for tracking login failure
  const [hint, setHint] = useState(""); // State for storing hint text
  const theme = useColorScheme() ?? "light";

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setHint("");
      router.replace("/(tabs)");
    } else {
      setLoginFailed(true);
      setHint("username: admin password: password,");
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText  style={styles.title} type="default">Enter login details</ThemedText>
      <ThemedTextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       {loginFailed && hint && (
        <ThemedText type="default" style={styles.hint}>{hint}</ThemedText> // Show hint text if login fails
      )}

      <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  borderBottomColor:
                    theme === "light" ? Colors.light.icon : Colors.dark.icon,
                },
              ]}
              onPress={handleLogin}
            >
              <ThemedText  type="subtitle">Login</ThemedText>
            </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    alignItems:"center"
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 12,
    paddingLeft: 8,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
   
  },
  hint: {
    color: "red", 
    textAlign: "center",
  },
});
