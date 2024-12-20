import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const OwnManReq = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* AppBar with BackAction */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Manage Leave Request" />
      </Appbar.Header>

      {/* Floating Card */}
      <View style={styles.floatingCard}>
        <Card style={styles.card}>
          <Text style={styles.cardText}>
            Manage Leave Request functionality goes here.
          </Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9AA6B2" },
  appBar: {
    backgroundColor: "#606676", // Set the color for the AppBar
  },
  floatingCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    width: "90%",
  },
  cardText: {
    fontSize: 16,
    color: "#606676",
    textAlign: "center",
  },
});

export default OwnManReq;
