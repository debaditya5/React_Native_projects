import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Pressable } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

export default function SearchBox({ onChangeText }) {
	navigation = useNavigation();

	return (
		<View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
			<TextInput onChangeText={onChangeText} placeholder='Search Movie' placeholderTextColor={"lightgray"} className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider' />
			<Pressable onPress={() => navigation.navigate("Home")} className='rounded-full p-3 m-1 bg-neutral-500'>
				{({ pressed }) => <XMarkIcon size='25' color={pressed ? "red" : "white"} />}
			</Pressable>
		</View>
	);
}
