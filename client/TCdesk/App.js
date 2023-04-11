import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/views/Home";
import SingleProduct from "./src/views/SingleProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingleProduct"
          component={SingleProduct}
          options={{ title: "Sản phẩm" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
