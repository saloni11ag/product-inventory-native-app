import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Button } from 'react-native'
// import { ListItem, Button, Icon } from 'react-native-elements'
import { globalStyles } from '../styles/global';
import Card from './card';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        marginHorizontal: 5
    },
    tinyLogo: {
        width: 280,
        height: 250,
    },
    logo: {
        width: 66,
        height: 58,
    },
    name: {
        fontSize: 25
    }
});

function Home({navigation}) {

    const [allProducts, setAllProduct] = useState([])

    const getAllProducts = () => {
        axios.get('http://localhost:3000/allProducts')
            .then(response => {
                // console.log(response.data)
                setAllProduct(response.data)
            }, error => {
                console.error(error);
            })
    }

    const renderProducts = () => {
        // console.log("clicked");
        getAllProducts()
    }


    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <View style={globalStyles.container}>
            <Button title="Add Product" onPress={() => navigation.navigate('AddProduct', {renderProducts})} />
            <FlatList data={allProducts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails',{ item, renderProducts})} >
                        <Card>
                            <Image
                                style={styles.tinyLogo}
                                resizeMode="cover"
                                source={item.product_img}
                            />
                            <Text style={globalStyles.titleText}>{item.product_name}</Text>
                        </Card>
                    </TouchableOpacity>
                )} />
        </View>
    )
}

export default Home