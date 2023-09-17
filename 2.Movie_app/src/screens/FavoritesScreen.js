import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Platform, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { DrawerActions } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { styles } from "../theme";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchTopRatedMovies } from "../api/moviedb";

const ios = Platform.OS === "ios";

export default FavouritesScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	// Hard Coded
	const seeAllCategory = "Top Rated";

	const getData = async (seeAllCategory) => {
		if (seeAllCategory === "Top Rated") {
			const dataFetched = await fetchTopRatedMovies();
			if (dataFetched && dataFetched.results) {
				setData(dataFetched.results);
			}
		} else {
		}
	};

	useEffect(() => {
		setLoading(true);
		getData(seeAllCategory);
		setLoading(false);
	}, []);

	// Function to open the drawer
	const openDrawer = () => {
		navigation.dispatch(DrawerActions.openDrawer());
	};

	return (
		<View className='flex-1 bg-neutral-800'>
			{/* search bar */}
			<SafeAreaView className={ios ? "-mb-10" : "mb-3"}>
				<StatusBar style='light' />
				<View className='flex-row justify-between items-center mx-4'>
					<Pressable onPress={openDrawer}>{({ pressed }) => <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />}</Pressable>
					<Text style={styles.text} className='text-2xl'>
						Favorite Movies
					</Text>
					<Pressable onPress={() => navigation.navigate("Search")}>{({ pressed }) => <MagnifyingGlassIcon size='30' strokeWidth={2} color={pressed ? "gray" : "white"} />}</Pressable>
				</View>
				<View className='flex-row justify-between items-center mx-4'></View>
			</SafeAreaView>
			{loading ? <Loading /> : <MovieList data={data} vertical hideSeeAll />}
		</View>
	);
};
