import { View, Text, Image, Dimensions, FlatList, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { fallbackMoviePoster, image185 } from "../api/moviedb";
import { styles } from "../theme";

const { width, height } = Dimensions.get("window");

const seeAllHandler = (navigation, title) => {
	navigation.navigate("SeeAll", { title });
};

export default function MovieList({ title, hideSeeAll, data, slice, vertical }) {
	const navigation = useNavigation();

	let SlicedData = [];
	if (slice > 0) {
		// Slice the data array to show only the first 5-6 items
		SlicedData = data.slice(0, slice);
	} else {
		SlicedData = data;
	}

	return (
		<View className='mb-8 space-y-4'>
			<View className='mx-4 flex-row justify-between items-center'>
				<Text className='text-white text-lg'>{title}</Text>
				{!hideSeeAll && (
					<Pressable onPress={seeAllHandler.bind(this, navigation, title)}>
						{({ pressed }) => (
							<Text style={pressed ? styles.textDark : styles.text} className='text-lg'>
								See All
							</Text>
						)}
					</Pressable>
				)}
			</View>

			{vertical ? (
				<FlatList
					numColumns={2}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
					data={SlicedData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
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
			) : (
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
					data={SlicedData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
						<Pressable onPress={() => navigation.push("Movie", item)} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
							<View className='space-y-1 mr-4'>
								<Image source={{ uri: image185(item.poster_path) || fallbackMoviePoster }} className='rounded-3xl' style={{ width: width * 0.33, height: height * 0.22 }} />
								<Text className='text-neutral-300 ml-1'>{item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title}</Text>
							</View>
						</Pressable>
					)}
				/>
			)}
		</View>
	);
}
