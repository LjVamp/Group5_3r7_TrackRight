import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import Intro from "./components/GetStarted/Intro";
import RoleSelection from "./components/GetStarted/RoleSelection";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import Recover from "./components/LoginRegister/Recover";
import EmpDash from "./components/Dashboard/EmployeeDashboard/EmpDash";
import EmpLeaveReq from "./components/Dashboard/EmployeeDashboard/EmpLeaveReq";
import EmpDTRCorrection from "./components/Dashboard/EmployeeDashboard/EmpDTRCorrection";
import OwnDash from "./components/Dashboard/OwnerDashboard/OwnDash";
import OwnManReq from "./components/Dashboard/OwnerDashboard/OwnManReq";
import OwnDTRca from "./components/Dashboard/OwnerDashboard/OwnDTRca";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="RoleSelection" component={RoleSelection} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Recover" component={Recover} />
          <Stack.Screen name="EmpDash" component={EmpDash} />
          <Stack.Screen name="EmpLeaveReq" component={EmpLeaveReq} />
          <Stack.Screen name="EmpDTRCorrection" component={EmpDTRCorrection} />
          <Stack.Screen name="OwnDash" component={OwnDash} />
          <Stack.Screen name="OwnManReq" component={OwnManReq} />
          <Stack.Screen name="OwnDTRca" component={OwnDTRca} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
