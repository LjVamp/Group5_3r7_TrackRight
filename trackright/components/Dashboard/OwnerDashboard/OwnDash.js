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
import { Avatar, Button, Card, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const OwnDash = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotifVisible, setIsNotifVisible] = useState(false); // For notifications
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false); // For burger menu
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigation = useNavigation();

  const handleAddEmployee = () => {
    if (firstName.trim() && lastName.trim()) {
      const newEmployee = {
        id: (employees.length + 1).toString(),
        name: `${firstName} ${lastName}`,
        empId: `202130${Math.floor(Math.random() * 10000)}`, // Random employee ID
        timeIn: "--:-- AM/PM", // Placeholder for now
        timeOut: "--:-- AM/PM", // Placeholder for now
        breakTime: "--:--:--hr", // Placeholder for now
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsBurgerMenuVisible(true)}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity onPress={() => setIsNotifVisible(true)}>
          <Icon name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <FlatList
        horizontal
        data={[
          { date: "20 Jan", active: true },
          { date: "21 Jan" },
          { date: "22 Jan" },
          { date: "23 Jan" },
          { date: "24 Jan" },
        ]}
        renderItem={({ item }) => (
          <View style={[styles.dateItem, item.active && styles.activeDate]}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.datePicker}
      />

      {/* Filters */}
      <View style={styles.filters}>
        <Chip style={styles.chip}>All</Chip>
        <Chip style={styles.chip}>Employees</Chip>
        <Chip style={styles.chip}>Active</Chip>
        <Chip style={styles.chip}>Pending</Chip>
        <Chip style={styles.chip}>Deactivated</Chip>
      </View>

      {/* Employee List Section */}
      <Card style={styles.employeeCard}>
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
            style={styles.searchInputCard}
          />
        </View>

        {/* Scrollable Employee List */}
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.employeeItem}>
              <Avatar.Text
                size={40}
                label={item.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                style={styles.avatar}
              />
              <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.employeeId}>{item.empId}</Text>
              </View>
              <Text style={styles.employeeTime}>{item.timeIn}</Text>
              <Text style={styles.employeeTime}>{item.timeOut}</Text>
              <Text style={styles.employeeTime}>{item.breakTime}</Text>
            </Card>
          )}
          style={styles.employeeList}
          contentContainerStyle={styles.employeeListContent}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  datePicker: { },
  dateItem: {
    height: "20%",
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDate: { backgroundColor: "#606676" },
  dateText: { color: "#fff", fontWeight: "bold" },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    marginTop: -280,
  },
  chip: { backgroundColor: "#606676", color: "#FFFFFF" },
  employeeCard: {
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
  searchInputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    flex: 1,
    marginLeft: 8,
  },
  employeeList: {
    flex: 1,
  },
  employeeListContent: {
    paddingBottom: 16,
  },
  employeeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 4,
  },
  avatar: { marginRight: 8, backgroundColor: "#8872A8" },
  employeeDetails: { flex: 3 },
  employeeName: { fontWeight: "bold", fontSize: 16 },
  employeeId: { color: "#606676", fontSize: 12 },
  employeeTime: { flex: 1, textAlign: "center" },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
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
