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
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const OwnMenu = () => {
  const [searchText, setSearchText] = useState("");
  const [employees, setEmployees] = useState([
    { id: "1", name: "Ledy Joy Bandiola", email: "ledyjoy@gmail.com", address: "Cagayan de Oro", number: "09123456789", job: "Manager" },
    { id: "2", name: "Nathalie Jugapao", email: "nathaliej@gmail.com", address: "Iligan City", number: "09987654321", job: "Developer" },
    { id: "3", name: "Arnado, Rex Z.", email: "arnado.rex16@gmail.com", address: "Cagayan De Oro", number: "09987654321", job: "Developer" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
    job: "",
  });

  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const [burgerModalVisible, setBurgerModalVisible] = useState(false);

  const handleAddEmployee = () => {
    if (newEmployee.name.trim() && newEmployee.email.trim()) {
      const newEmployeeData = {
        id: (employees.length + 1).toString(),
        ...newEmployee,
      };
      setEmployees([...employees, newEmployeeData]);
      setModalVisible(false);
      setNewEmployee({ name: "", email: "", address: "", number: "", job: "" });
    } else {
      alert("Please fill in all required fields (name and email).");
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setBurgerModalVisible(true)}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={() => setNotifModalVisible(true)}>
          <Icon name="notifications" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Employees</Text>

      {/* Add Employee Section */}
      <View style={styles.searchSection}>
        <Button mode="contained" style={styles.addButton} onPress={() => setModalVisible(true)}>
          Add New Employee
        </Button>
      </View>

      {/* Employee List */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }} // Allows space for scrolling
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.detailsContainer}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.details}>Email: {item.email}</Text>
                <Text style={styles.details}>Address: {item.address}</Text>
                <Text style={styles.details}>Phone: {item.number}</Text>
                <Text style={styles.details}>Job: {item.job}</Text>
              </View>
            </View>
          </Card>
        )}
      />

      {/* Add Employee Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Employee</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={newEmployee.name}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={newEmployee.email}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, email: text })}
            />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={newEmployee.address}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, address: text })}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={newEmployee.number}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, number: text })}
            />
            <TextInput
              placeholder="Job"
              style={styles.input}
              value={newEmployee.job}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, job: text })}
            />
            <Button mode="contained" onPress={handleAddEmployee} style={styles.addEmployeeButton}>
              Add Employee
            </Button>
            <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              Cancel
            </Button>
          </ScrollView>
        </View>
      </Modal>

      {/* Notification Modal */}
      <Modal visible={notifModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <Text>You have 1 new notification!</Text>
            <Button mode="outlined" onPress={() => setNotifModalVisible(false)} style={styles.cancelButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* Burger Menu Modal */}
      <Modal visible={burgerModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menu</Text>
            <Button mode="contained" style={styles.addEmployeeButton}>
              Profile
            </Button>
            <Button mode="outlined" style={styles.cancelButton}>
              Logout
            </Button>
            <Button mode="outlined" onPress={() => setBurgerModalVisible(false)} style={styles.cancelButton}>
              Close
            </Button>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#ffffff",
  },
  card: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: "rgb(255, 255, 255)"
  },
  detailsContainer: {
    marginLeft: 16,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  addEmployeeButton: {
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: "#323333",
  },
});

export default OwnMenu;
