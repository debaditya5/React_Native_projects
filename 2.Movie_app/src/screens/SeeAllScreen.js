import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";

import Loading from "../components/loading";
import MovieList from "../components/movieList";
import { fetchTopRatedMovies, fetchUpcomingMovies } from "../api/moviedb";
import { styles } from "../theme";
import SearchBox from "../components/searchBox";

const ios = Platform.OS === "ios";

export default function SeeAllScreen({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState(false);

	const seeAllCategory = route.params.title;

	const getData = async (seeAllCategory) => {
		if (seeAllCategory === "Top Rated") {
			const dataFetched = await fetchTopRatedMovies();
			if (dataFetched && dataFetched.results) {
				setData(dataFetched.results);
			}
		} else {
			const dataFetched = await fetchUpcomingMovies();
			if (dataFetched && dataFetched.results) {
				setData(dataFetched.results);
			}
		}
	};

	const searchFilm = () => {
		setSearch(!search);
	};

	useEffect(() => {
		setLoading(true);
		getData(seeAllCategory);
		setLoading(false);
	}, []);

	return (
		<View className='flex-1 bg-neutral-800'>
			{/* search bar */}
			<SafeAreaView className={ios ? "-mb-10" : "mb-3"}>
				<StatusBar style='light' />
				<View className='flex-row justify-between items-center mx-4'>
					<Pressable style={styles.background} className='z-20 rounded-xl p-1 ml-1' onPress={() => navigation.goBack()}>
						{({ pressed }) => <ChevronLeftIcon size='28' strokeWidth={2.5} color={pressed ? "gray" : "white"} />}
					</Pressable>
					<Text style={styles.text} className='text-2xl'>{`${seeAllCategory} Movies`}</Text>
					<Pressable onPress={searchFilm}>{({ pressed }) => <MagnifyingGlassIcon size='30' strokeWidth={2} color={pressed ? "gray" : "white"} />}</Pressable>
				</View>

				{search && (
					<View className='mt-5'>
						<SearchBox />
					</View>
				)}
			</SafeAreaView>

			{loading ? <Loading /> : <MovieList data={data} vertical hideSeeAll />}
		</View>
	);
}
