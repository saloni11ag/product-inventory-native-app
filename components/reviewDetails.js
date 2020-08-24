import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Modal, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from './card';
// import { ListItem, Button, Icon } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import FlatButton from './button'
import EditForm from './editForm';
import axios from 'axios';

export default function ReviewDetails(props) {

    // const [editShow, setEditShow] = useState(false);
    // console.log(props);
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

    return (
        <View style={globalStyles.container}>
            <Card>
                <Image
                    style={styles.tinyLogo}
                    resizeMode="cover"
                    source={detail.product_img}
                />
                <Text style={globalStyles.titleText}>
                    Product Name:  {detail.product_name}
                </Text>
                <Text style={styles.text}>Category Name:  {detail.category_name}</Text>
                <Text style={styles.text}>Description:  {detail.product_des}</Text>
                <Text style={styles.text}>Product Quantity:  {detail.product_quantity}</Text>
                <Text style={styles.text}>Product Price:  {detail.product_price}$</Text>
                <Text style={styles.text}>Product Rating:  {detail.product_rating}</Text>
                <Button onPress={() => props.navigation.navigate('EditProduct', detail)} title='Edit' />
                <Text>{' '}</Text>
                <Button color= 'red' onPress={handleDelete} title='Delete' />
            </Card>
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