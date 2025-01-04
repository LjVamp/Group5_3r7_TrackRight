import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const EmpDTRCorrection = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    timeIn: "",
    timeOut: "",
    overtimeIn: "",
    overtimeOut: "",
  });

  // Simulated existing data based on the selected date
  const existingData = {
    "2024-12-01": {
      timeIn: "08:00 AM",
      timeOut: "05:00 PM",
      overtimeIn: "06:00 PM",
      overtimeOut: "08:00 PM",
    },
    "2024-12-02": {
      timeIn: "09:00 AM",
      timeOut: "06:00 PM",
      overtimeIn: "none",
      overtimeOut: "none",
    },
  };

  // Load data when the date is selected
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      const data = existingData[formattedDate] || {
        timeIn: "",
        timeOut: "",
        overtimeIn: "",
        overtimeOut: "",
      };
      setFormData(data);
    }
  };

  // Update form data
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Updated DTR Data:", {
      date: selectedDate.toISOString().split("T")[0],
      ...formData,
    });
    alert("DTR correction submitted successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: "#606676" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="DTR Correction"
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Date Picker */}
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            Selected Date: {selectedDate.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Input Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Time In:</Text>
          <TextInput
            style={styles.input}
            value={formData.timeIn}
            onChangeText={(text) => handleInputChange("timeIn", text)}
          />

          <Text style={styles.label}>Time Out:</Text>
          <TextInput
            style={styles.input}
            value={formData.timeOut}
            onChangeText={(text) => handleInputChange("timeOut", text)}
          />

          <Text style={styles.label}>Overtime Time In:</Text>
          <TextInput
            style={styles.input}
            value={formData.overtimeIn}
            onChangeText={(text) => handleInputChange("overtimeIn", text)}
          />

          <Text style={styles.label}>Overtime Time Out:</Text>
          <TextInput
            style={styles.input}
            value={formData.overtimeOut}
            onChangeText={(text) => handleInputChange("overtimeOut", text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Correction</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { padding: 20 },
  datePicker: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateText: { fontSize: 16, color: "#333" },
  form: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  appBar: {
    backgroundColor: "#606676",
  },
  submitButton: {
    backgroundColor: "#606676",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default EmpDTRCorrection;
