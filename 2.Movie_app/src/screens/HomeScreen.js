import { View, ScrollView, Platform, Pressable, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { DrawerActions } from "@react-navigation/native";

import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";
import Loading from "../components/loading";

const ios = Platform.OS === "ios";
var { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
	const [trending, setTrending] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getTrendingMovies();
		getUpcomingMovies();
		getTopRatedMovies();
	}, []);

	const getTrendingMovies = async () => {
		const data = await fetchTrendingMovies();
		if (data && data.results) {
			setTrending(data.results);
		}
		setLoading(false);
	};
	const getUpcomingMovies = async () => {
		const data = await fetchUpcomingMovies();
		if (data && data.results) {
			setUpcoming(data.results);
		}
	};
	const getTopRatedMovies = async () => {
		const data = await fetchTopRatedMovies();
		if (data && data.results) {
			setTopRated(data.results);
		}
	};

	// Function to open the drawer
	const openDrawer = () => {
		navigation.dispatch(DrawerActions.openDrawer());
	};

	return (
		<View className='flex-1 bg-neutral-800'>
			{/* search bar */}
			<SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
				<StatusBar style='light' />
				<View className='flex-row justify-between items-center mx-4'>
					<Pressable onPress={openDrawer}>{({ pressed }) => <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />}</Pressable>
					<Image style={{ width: width * 0.3, height: height * 0.04 }} source={require("../../assets/images/logo.png")} />
					<Pressable onPress={() => navigation.navigate("Search")}>{({ pressed }) => <MagnifyingGlassIcon size='30' strokeWidth={2} color={pressed ? "gray" : "white"} />}</Pressable>
				</View>
			</SafeAreaView>

			{loading ? (
				<Loading />
			) : (
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
					{/* Trending Movies Carousel */}
					{trending.length > 0 && <TrendingMovies data={trending} slice={6} />}

					{/* upcoming movies row */}
					{upcoming.length > 0 && <MovieList title='Upcoming' data={upcoming} slice={5} />}

					{/* top rated movies row */}
					{topRated.length > 0 && <MovieList title='Top Rated' data={topRated} slice={5} />}
				</ScrollView>
			)}
		</View>
	);
}
