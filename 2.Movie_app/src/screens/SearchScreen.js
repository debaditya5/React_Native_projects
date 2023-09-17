import { View, Text, Image, Dimensions, FlatList, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { debounce } from "lodash";

import SearchBox from "../components/searchBox";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
import Loading from "../components/loading";

const { width, height } = Dimensions.get("window");

export default function SearchScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);

	const handleSearch = async (search) => {
		try {
			if (search && search.length > 2) {
				setLoading(true);
				const data = await searchMovies({ query: search, include_adult: false, language: "en-US", page: "1" });

				setLoading(false);

				if (data && data.results) {
					setResults(data.results);
				}
			} else {
				setLoading(false);
				setResults([]);
			}
		} catch (error) {
			console.error("Error during movie search:", error); // Handle any errors that occur during the searchMovies call.
		}
	};

	const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

	return (
		<SafeAreaView className='bg-neutral-800 flex-1'>
			{/* search input */}
			<SearchBox onChangeText={handleTextDebounce} />

			{/* search results */}
			{loading ? (
				<Loading />
			) : results.length > 0 ? (
				<View>
					<Text className='text-white font-semibold ml-1 py-3 px-4'>Results ({results.length})</Text>
					<FlatList
						data={results}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 15 }}
						className='space-y-3'
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<Pressable onPress={() => navigation.push("Movie", item)}>
								{({ pressed }) => (
									<View className={`space-y-2 mb-4 ${pressed ? "opacity-70" : ""}`} style={{ marginRight: width * 0.06 }}>
										<Image source={{ uri: image185(item.poster_path) || fallbackMoviePoster }} className='rounded-3xl' style={{ width: width * 0.44, height: height * 0.3 }} />
										<Text className='text-gray-300 ml-1'>{item.title.length > 22 ? item.title.slice(0, 22) + "..." : item.title}</Text>
									</View>
								)}
							</Pressable>
						)}
					/>
				</View>
			) : (
				<View className='flex-row justify-center'>
					<Image source={require("../../assets/images/movieTime.png")} className='h-96 w-96' />
				</View>
			)}
		</SafeAreaView>
	);
}
