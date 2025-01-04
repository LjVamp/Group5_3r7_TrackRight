import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const OwnDTRca = () => {
  const navigation = useNavigation(); // Access the navigation object

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.navigate("OwnDash")} />
        <Appbar.Content title="DTR Correction" />
      </Appbar.Header>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.message}>DTR Correction content goes here!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { fontSize: 16, color: "#333", textAlign: "center" },
  appBar: {
    backgroundColor: "#606676",
  },
});

export default OwnDTRca;
