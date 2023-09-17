import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StarIcon, HomeIcon } from "react-native-heroicons/solid";

import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import SeeAllScreen from "../screens/SeeAllScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// drawerStyle
function MyDrawer() {
	return (
		<Drawer.Navigator screenOptions={{ drawerStyle: { backgroundColor: "#262626" }, drawerLabelStyle: { color: "#ffffff" }, drawerActiveBackgroundColor: "#00acc1" }}>
			<Drawer.Screen name='Home' options={{ headerShown: false, title: "Home", drawerIcon: ({ color, size }) => <HomeIcon color={"white"} size={size} /> }} component={HomeScreen} />
			<Drawer.Screen name='Favourite' options={{ headerShown: false, title: "Favourite", drawerIcon: ({ color, size }) => <StarIcon color={"white"} size={size} /> }} component={FavoritesScreen} />
		</Drawer.Navigator>
	);
}

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Drawer' options={{ headerShown: false }} component={MyDrawer} />
				<Stack.Screen name='Movie' options={{ headerShown: false }} component={MovieScreen} />
				<Stack.Screen name='Person' options={{ headerShown: false }} component={PersonScreen} />
				<Stack.Screen name='Search' options={{ headerShown: false }} component={SearchScreen} />
				<Stack.Screen name='SeeAll' options={{ headerShown: false }} component={SeeAllScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
