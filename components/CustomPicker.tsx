// custom picker component dynamically allows picking options passed to it in an array of stings and setting that option as value string

import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useColorScheme,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

type pickerOptions = {
    lightColor?: string;
  darkColor?: string;
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (item: string) => void;
};

const CustomPicker = (props: pickerOptions) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [borderColor, setBorderColor] = useState("gray");
  const theme = useColorScheme() ?? "light";
  const color = useThemeColor({ light: props.lightColor, dark: props.darkColor }, "text");

  return (
    <ThemedView style={styles.pickerContainer}>
      <ThemedText style={styles.pickerLabel}>{props.label}</ThemedText>
      <TouchableOpacity
        style={[styles.pickerButton, { borderColor: borderColor }]} 
        onPress={() => {
          setBorderColor("#0000FF"); 
          setModalVisible(true);
        }}
        onPressOut={() => setBorderColor(color)}
      >
        <ThemedText>{props.selectedValue}</ThemedText>
      </TouchableOpacity>

      {modalVisible && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ThemedView style={styles.modalContainer}>
            <ThemedView style={styles.modalContent}>
              <FlatList
                data={props.options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      props.onValueChange(item);
                      setBorderColor(color);
                      setModalVisible(false);
                    }}
                  >
                    <ThemedText type="defaultSemiBold">{item}</ThemedText>
                  </TouchableOpacity>
                )}
              />
            </ThemedView>
            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  borderBottomColor:
                    theme === "light" ? Colors.light.icon : Colors.dark.icon,
                },
              ]}
              onPress={() => {
                setBorderColor(color); 
                setModalVisible(false)
            }}
            >
              <ThemedText type="default">Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Modal>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
    width: "80%",
  },
  pickerLabel: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
  },
  pickerButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },
});

export default CustomPicker;
