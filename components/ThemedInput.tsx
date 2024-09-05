// dynamic text input component

import { StyleSheet, TextInput,  type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  value: string;
  onChangeText: (text: string) => void;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  placeholder,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const [focused, setFocused] = useState<boolean>(false);


  return (
    <TextInput
      style={[
        { color },
        { borderColor: focused ? "blue" : color },
        styles.input,
      ]}
      placeholder={placeholder}
      placeholderTextColor={color}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoFocus={false}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
