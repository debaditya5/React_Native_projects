import { View, Text, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel-v4";
import { useNavigation } from "@react-navigation/native";

import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data, slice }) {
	const navigation = useNavigation();

	// Slice the data array to show only the first 5-6 items
	const slicedData = data.slice(0, slice);

	const handleClick = (item) => {
		navigation.navigate("Movie", item);
	};

	return (
		<View className='mb-8'>
			<Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
			<Carousel
				data={slicedData}
				renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
				firstItem={1}
				inactiveSlideOpacity={0.6}
				sliderWidth={width}
				itemWidth={width * 0.62}
				slideStyle={{ display: "flex", alignItems: "center" }}
			/>
		</View>
	);
}

const MovieCard = ({ item, handleClick }) => {
	return (
		<Pressable onPress={() => handleClick(item)}>
			<Image source={{ uri: image500(item.poster_path) }} style={{ width: width * 0.6, height: height * 0.4 }} className='rounded-3xl' />
		</Pressable>
	);
};
