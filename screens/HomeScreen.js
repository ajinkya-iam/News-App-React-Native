import { View, Text, Platform, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import TrendingNews from '../components/TrendingNews';
import { apiKey, newsData } from "../constants/index"
import axios from 'axios';
import Loading from '../components/loading';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState(newsData[0].articles)
    const [loading, setLoading] = useState(false)

    async function fetchLatestNews() {
        setLoading(true)
        await axios.get(`https://gnews.io/api/v4/search?q=all&lang=en&country=us&max=10&apikey=${apiKey}`)
            .then((response) => {
                setData(response.data.articles)
            }).catch((err) => {
                console.warn("Error");
            })
        setLoading(false)
    }

    useEffect(() => {
        fetchLatestNews()
    }, [])


    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text
                        className="text-white text-3xl font-bold">
                        <Text style={styles.text}>N</Text>ews
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (<Loading />) :
                    (<ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}>
                        <TrendingNews data={data} />
                    </ScrollView>
                    )
            }

        </View>
    )
}

export default HomeScreen