import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { Carousel } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function TrendingNews({ data }) {

    const navigation = useNavigation();

    const handleClick = item => {
        navigation.navigate('News', item);
    }

    return (
        <View className="mb-8 mt-5">
            {/* <Text className="text-white text-xl mx-4 mb-5">Trending</Text> */}
            <Carousel
                data={data}
                renderItem={({ item }) => <NewsCard handleClick={handleClick} item={item} />}
                firstItem={1}
                loop={true}
                // inactiveSlideScale={0.86}
                inactiveSlideOpacity={0}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}

const NewsCard = ({ item, handleClick }) => {
    return (
        <View>
            <TouchableWithoutFeedback onPress={() => handleClick(item)}>
                <Image
                    // source={{ uri: "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg" }}
                    source={{uri: item.image}} 
                    style={{
                        width: width * 0.9,
                        height: height * 0.6,
                        resizeMode:'contain'
                    }}
                    className="rounded-3xl object-cover"
                />
            </TouchableWithoutFeedback>
            <Text className="text-neutral-50 text-xl font-bold mt-5 ml-1">{item.title.length > 64 ? item.title.slice(0, 64) + '...' : item.title}</Text>
            <Text className="text-neutral-300 font-bold -mt-2 ml-1">{item.description}</Text>
        </View>
    )
}