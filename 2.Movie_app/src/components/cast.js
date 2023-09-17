import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";

import { fallbackPersonImage, image185 } from "../api/moviedb";

export default function Cast({ cast, navigation, slice }) {
	// Slice the data array to show only the first 5-6 items
	const slicedData = cast.slice(0, slice);

	return (
		<View className='my-6'>
			<Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				data={slicedData}
				keyExtractor={(person, index) => index.toString()}
				renderItem={({ item: person }) => (
					<Pressable onPress={() => navigation.navigate("Person", person)} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })} className='mr-4 items-center'>
						<View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
							<Image className='rounded-2xl h-24 w-20' source={{ uri: image185(person?.profile_path) || fallbackPersonImage }} />
						</View>
						<Text className='text-white text-xs mt-1'>{person?.character.length > 10 ? person.character.slice(0, 10) + "..." : person?.character}</Text>
						<Text className='text-neutral-400 text-xs'>{person?.original_name.length > 10 ? person.original_name.slice(0, 10) + "..." : person?.original_name}</Text>
					</Pressable>
				)}
			/>
		</View>
	);
}
