import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Card, Avatar, Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const OwnDash = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAddEmployee = () => {
    if (firstName.trim() && lastName.trim()) {
      const newEmployee = {
        id: (employees.length + 1).toString(),
        name: `${firstName} ${lastName}`,
        employeeId: "2021302136", // Placeholder
        timeIn: "--:-- AM/PM",
        timeOut: "--:-- AM/PM",
        breakTime: "--:--:-- hr",
      };
      setEmployees([...employees, newEmployee]);
      setFirstName("");
      setLastName("");
      setIsModalVisible(false);
    } else {
      alert("Please fill in both first and last names.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filters}>
        <Chip style={styles.chip}>All</Chip>
        <Chip style={styles.chip}>Employees</Chip>
        <Chip style={styles.chip}>Active</Chip>
        <Chip style={styles.chip}>Pending</Chip>
        <Chip style={styles.chip}>Deactivated</Chip>
      </View>

      {/* Static Card with Add New Employee and Search */}
      <Card style={styles.mainCard}>
        <View style={styles.cardHeader}>
          <Button
            mode="contained"
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}
          >
            Add New Employee
          </Button>
          <TextInput
            placeholder="Search Employee"
            style={styles.searchInput}
          />
        </View>

        {/* Header Labels */}
        <View style={styles.labels}>
          <Text style={styles.labelText}>Employee Name</Text>
          <Text style={styles.labelText}>Time In</Text>
          <Text style={styles.labelText}>Time Out</Text>
          <Text style={styles.labelText}>Break Time</Text>
        </View>

        {/* Scrollable Employee List */}
        <FlatList
          data={employees}
          renderItem={({ item }) => (
            <Card style={styles.employeeCard}>
              <View style={styles.employeeRow}>
                <Avatar.Text
                  label={item.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                  size={40}
                  style={styles.avatar}
                />
                <View style={styles.employeeInfo}>
                  <Text style={styles.employeeName}>{item.name}</Text>
                  <Text style={styles.employeeId}>{item.employeeId}</Text>
                </View>
                <Text style={styles.employeeData}>{item.timeIn}</Text>
                <Text style={styles.employeeData}>{item.timeOut}</Text>
                <Text style={styles.employeeData}>{item.breakTime}</Text>
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.id}
          style={styles.employeeList}
        />
      </Card>

      {/* Add Employee Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Employee</Text>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={handleAddEmployee}
                style={styles.modalButton}
              >
                Add
              </Button>
              <Button
                mode="text"
                onPress={() => setIsModalVisible(false)}
                style={styles.modalCancelButton}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9AA6B2", padding: 16 },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  chip: { backgroundColor: "#606676", color: "#FFFFFF" },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: { backgroundColor: "#E2D4F7", borderRadius: 25 },
  searchInput: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  labelText: { fontWeight: "bold", color: "#333" },
  employeeList: { flex: 1, marginTop: 8 },
  employeeCard: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { marginRight: 16, backgroundColor: "#8872A8" },
  employeeInfo: { flex: 2 },
  employeeName: { fontWeight: "bold" },
  employeeId: { color: "#666" },
  employeeData: { flex: 1, textAlign: "center" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    height: 40,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { flex: 1, marginRight: 8, backgroundColor: "#8872A8" },
  modalCancelButton: { flex: 1, backgroundColor: "#323333" },
});

export default OwnDash;
