import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, LogBox } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../theme';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-svg';
import Moment from 'moment';
import { StatusBar } from 'expo-status-bar';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
var { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();

export default function NewsScreen() {

    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-800">

            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <StatusBar backgroundColor='light'/>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? 'red' : 'black'} />
                    </TouchableOpacity>
                </SafeAreaView>

                <View>
                    <Image
                        source={{ uri: item?.image}}
                        className="bg-white"
                        // source={{ uri: "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg" }}
                        style={{ width, height: height * 0.55, resizeMode:"contain" }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
                </View>

            </View>

            <View className="space-y-3 mt-5">
                <Text className="text-white mx-3 text-3xl font-bold tracking-widest">{item?.title}</Text>

                <View className="flex-row justify-between mx-4  space-x-2">
                    <View>
                        <Text className="text-neutral-400 font-semibold text-base text-start">{item?.source.name}</Text>
                        <Text className="font-semibold underline text-blue-700 text-base text-center">{item?.source.url}</Text>
                    </View>
                    <Text className="text-neutral-400 font-semibold text-sm items-center text-center">{Moment(item?.publishedAt).format('DD MMM yyyy')}</Text>
                </View>

                <Text className="text-neutral-400 mx-4 tracking-wide">{item?.content}</Text>
            </View>

        </ScrollView>
    )
}