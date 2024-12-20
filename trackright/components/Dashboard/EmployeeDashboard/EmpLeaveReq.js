import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LeaveRequest = () => {
  const navigation = useNavigation();

  const [leaveID, setLeaveID] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [statusList, setStatusList] = useState([]);

  const leaveTypes = [
    "Sick",
    "Paternity/Maternity",
    "Parental",
    "Bereavement",
    "Religious Holidays",
    "Family",
    "Medical",
    "Annual",
    "Marriage",
    "Other Types of Leave",
  ];

  const submitLeaveRequest = () => {
    const newStatus = {
      leaveID,
      employeeID,
      requestDate: new Date().toLocaleDateString(),
      leaveType,
      reason,
      status: "Pending",
    };
    setStatusList([...statusList, newStatus]);
    setLeaveID("");
    setEmployeeID("");
    setLeaveType("");
    setReason("");
  };

  return (
    <View style={styles.container}>
      {/* AppBar with BackAction */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Submit Leave Request" />
      </Appbar.Header>

      {/* Floating Card */}
      <View style={styles.floatingCard}>
        <TextInput
          placeholder="Leave ID"
          value={leaveID}
          onChangeText={setLeaveID}
          style={styles.input}
        />
        <TextInput
          placeholder="Employee ID"
          value={employeeID}
          onChangeText={setEmployeeID}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {leaveType || "Select Leave Type"}
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Reason"
          value={reason}
          onChangeText={setReason}
          style={[styles.input, styles.textArea]}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={submitLeaveRequest}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Leave Types */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {leaveTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setLeaveType(type);
                  setModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Status List */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusHeader}>Leave Requests</Text>
        <FlatList
          data={statusList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.statusItem}>
              <Text>Leave ID: {item.leaveID}</Text>
              <Text>Employee ID: {item.employeeID}</Text>
              <Text>Request Date: {item.requestDate}</Text>
              <Text>Leave Type: {item.leaveType}</Text>
              <Text>Reason: {item.reason}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  appBar: {
    backgroundColor: "#606676", // Set the color for the AppBar
  },
  floatingCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  dropdownText: {
    color: "#555",
  },
  button: {
    backgroundColor: "#606676",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "80%",
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 16,
  },
  statusContainer: {
    marginTop: 16,
  },
  statusHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
});

export default LeaveRequest;
