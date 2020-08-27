import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Modal, Button, Picker } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from './card';
// import { ListItem, Button, Icon } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import EditForm from './editForm';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function ReviewDetails(props) {

    // const [editShow, setEditShow] = useState(false);
    // console.log(props);
    const [prod, setProd] = useState([])

    useEffect(() => {
        const detail = props.route.params.item
        getProduct()
    }, [])
    const detail = props.route.params.item

    const handleDelete = () => {
        axios.delete('http://localhost:3000/allProducts/' + detail.id)
            .then(response => {
                // console.log(response)
                props.route.params.renderProducts()
                props.navigation.goBack();
            }, error => {
                console.error(error)
            })
    }

    const getProduct = () => {
        axios.get('http://localhost:3000/allProducts/' + detail.id)
            .then(response => {
                setProd(response.data)
            }, error => {
                console.error(error)
            }

            )
    }

    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Card>
                    <Image
                        style={styles.tinyLogo}
                        resizeMode="cover"
                        source={prod.product_img}
                    />
                    <Text style={globalStyles.titleText}>
                        Product Name:  {prod.product_name}
                    </Text>
                    <Text style={styles.text}>Category Name:  {prod.category_name}</Text>
                    <Text style={styles.text}>Description:  {prod.product_des}</Text>
                    <Text style={styles.text}>Product Quantity:  {prod.product_quantity}</Text>
                    <Text style={styles.text}>Product Price:  {prod.product_price}$</Text>
                    <Text style={styles.text}>Product Rating:  {prod.product_rating}</Text>
                    <Button onPress={() => props.navigation.navigate('EditProduct', { prod, getProduct })} title='Edit' />
                    <Text>{' '}</Text>
                    <Button color='red' onPress={handleDelete} title='Delete' />
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 280,
        height: 250,
    },
    text: {
        fontSize: 12,
        padding: 5
    },
    button: {
        backgroundColor: '#f01d71',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    }
});