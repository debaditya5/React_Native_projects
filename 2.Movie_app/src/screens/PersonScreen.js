import { View, Text, Image, Platform, Dimensions, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

import MovieList from "../components/movieList";
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";
import Loading from "../components/loading";
import { styles } from "../theme";

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";
var { width, height } = Dimensions.get("window");

export default function PersonScreen({ route, navigation }) {
	const item = route.params;
	const [isFavourite, toggleFavourite] = useState(false);
	const [person, setPerson] = useState({});
	const [personMovies, setPersonMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getPersonDetails(item.id);
		getPersonMovies(item.id);
	}, [item]);

	const getPersonDetails = async (id) => {
		const data = await fetchPersonDetails(id);
		setLoading(false);
		if (data) {
			setPerson(data);
		}
	};
	const getPersonMovies = async (id) => {
		const data = await fetchPersonMovies(id);
		if (data && data.cast) {
			setPersonMovies(data.cast);
		}
	};

	return (
		<ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
			{/* back button */}
			<SafeAreaView className={"flex-row justify-between items-center mx-4 z-10 " + verticalMargin}>
				<Pressable style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
					{({ pressed }) => <ChevronLeftIcon size='28' strokeWidth={2.5} color={pressed ? "gray" : "white"} />}
				</Pressable>

				<Pressable onPress={() => toggleFavourite(!isFavourite)}>{({ pressed }) => <HeartIcon size='35' color={isFavourite ? "red" : pressed ? "gray" : "white"} />}</Pressable>
			</SafeAreaView>

			{/* person details */}
			{loading ? (
				<Loading />
			) : (
				<View>
					<View className='flex-row justify-center'>
						<View className='items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2'>
							<Image source={{ uri: image342(person?.profile_path) || fallbackPersonImage }} style={{ height: height * 0.43, width: width * 0.74 }} />
						</View>
					</View>

					<View className='mt-6'>
						<Text className='text-3xl text-white font-bold text-center'>{person?.name}</Text>
						<Text className='text-neutral-500 text-base text-center'>{person?.place_of_birth}</Text>
					</View>

					<View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full '>
						<View className='border-r-2 border-r-neutral-400 px-2 items-center'>
							<Text className='text-white font-semibold '>Gender</Text>
							<Text className='text-neutral-300 text-sm'>{person?.gender == 1 ? "Female" : "Male"}</Text>
						</View>
						<View className='border-r-2 border-r-neutral-400 px-2 items-center'>
							<Text className='text-white font-semibold'>Birthday</Text>
							<Text className='text-neutral-300 text-sm'>{person?.birthday}</Text>
						</View>
						<View className='border-r-2 border-r-neutral-400 px-2 items-center'>
							<Text className='text-white font-semibold'>Known for</Text>
							<Text className='text-neutral-300 text-sm'>{person?.known_for_department}</Text>
						</View>
						<View className='px-2 items-center'>
							<Text className='text-white font-semibold'>Popularity</Text>
							<Text className='text-neutral-300 text-sm'>{person?.popularity?.toFixed(2)} %</Text>
						</View>
					</View>
					<View className='my-6 mx-4 space-y-2'>
						<Text className='text-white text-lg'>Biography</Text>
						<Text className='text-neutral-400 tracking-wide'>{person?.biography ? person.biography : "N/A"}</Text>
					</View>

					{/* person movies */}
					{person?.id && personMovies.length > 0 && <MovieList title='Movies' hideSeeAll={true} data={personMovies} />}
				</View>
			)}
		</ScrollView>
	);
}
