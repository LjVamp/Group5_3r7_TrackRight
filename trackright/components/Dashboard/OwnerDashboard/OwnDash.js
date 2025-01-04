import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Picker,
  Pressable,
} from "react-native";
import { Avatar, Button, Card, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const OwnDash = () => {
  const [employees, setEmployees] = useState([

  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  const handleAddEmployee = () => {
    if (firstName.trim() && lastName.trim() && email.trim() && position.trim() && gender && address.trim()) {
      const newEmployee = {
        id: (employees.length + 1).toString(),
        name: `${firstName} ${lastName}`,
        empId: `202130${Math.floor(Math.random() * 10000)}`,
        email,
        position,
        gender,
        address,
        timeIn: "--:-- AM/PM",
        timeOut: "--:-- AM/PM",
        breakTime: "--:--:--hr",
      };
      setEmployees([...employees, newEmployee]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPosition("");
      setGender("");
      setAddress("");
      setIsModalVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity onPress={() => setIsNotifVisible(true)}>
          <Icon name="notifications" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Date Picker */}
        <View style={styles.datePicker}>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
        </View>

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

          <ScrollView style={styles.employeeList}>
            {employees.map((item) => (
              <Card key={item.id} style={styles.employeeItem}>
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
                  <Text style={styles.employeeInfo}>Email: {item.email}</Text>
                  <Text style={styles.employeeInfo}>Position: {item.position}</Text>
                  <Text style={styles.employeeInfo}>Gender: {item.gender}</Text>
                  <Text style={styles.employeeInfo}>Address: {item.address}</Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </Card>
      </ScrollView>


      {/* Scan Button */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => alert("Scan Button Pressed")}
      >
        <Text style={styles.scanButtonText}>SCAN QR CODE</Text>
      </TouchableOpacity>

      {/* Floating Menu */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                toggleMenu();
                navigation.navigate("OwnProfile");
              }}
            >
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                toggleMenu();
                navigation.navigate("OwnManReq");
              }}
            >
              <Text style={styles.menuText}>Manage Leave Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                toggleMenu();
                navigation.navigate("OwnDTRca");
              }}
            >
              <Text style={styles.menuText}>Approve DTR Correction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                toggleMenu();
                navigation.navigate("RoleSelection");
              }}
            >
              <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
              <Text style={styles.menuText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

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
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Position"
              value={position}
              onChangeText={setPosition}
              style={styles.input}
            />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Gender</Text>
              <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
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
  datePicker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  dateText: { fontSize: 16, fontWeight: "bold", color: "#606676" },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  chip: { backgroundColor: "#606676", color: "#FFFFFF" },
  employeeCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    height: 580,
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
  employeeList: { maxHeight: 500 },
  employeeItem: {
    backgroundColor: "#FFFFFF",
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
  employeeId: { fontSize: 12 },
  employeeInfo: { fontSize: 12, color: "#606676" },
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
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    padding: 12,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  scanButton: {
    backgroundColor: "#606676",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 45,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OwnDash;
