import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function EditProduct(props) {

    // console.log(props);
    const detail = props.route.params
    const [productName, setProductName] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [productDes,setProductDes] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productRating, setProductRating] = useState('')

    useEffect(() => {
        setProductName(detail.product_name)
        setCategoryName(detail.category_name)
        setProductDes(detail.product_des)
        setProductPrice(detail.product_price)
        setProductQuantity(detail.product_quantity)
        setProductRating(detail.product_rating)
    }, [])

    const handleSubmit = () => {
        // console.log(productName);
        let reqBody = {
            "product_name": productName,
            "category_name": categoryName,
            "product_des": productDes,
            "product_price": productPrice,
            "product_quantity": productQuantity,
            "product_rating": productRating,
        }
        axios.patch('http://localhost:3000/allProducts/' + detail.id, reqBody)
        .then(
            response => {
                // console.log(response);
                props.navigation.goBack();
            }, error => {
                console.error(error);
            }
        )
    }
    return (

        <View style={globalStyles.container}>
            <ScrollView>
                <Formik
                    // onSubmit={(values) => {
                    //     console.log(values);
                    // }}
                >
                    <View>
                        <Text style={styles.title}>Product name:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Product Name'
                            onChangeText={(value) => {setProductName(value)}}
                            value={productName}
                        />
                        <Text style={styles.title}>Category name:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Category Name'
                            onChangeText={(value) => {setCategoryName(value)}}
                            value={categoryName}
                        />
                        <Text style={styles.title}>Description:</Text>
                        <TextInput
                            style={globalStyles.input}
                            multiline
                            placeholder='Product Description'
                            onChangeText={(value) => {setProductDes(value)}}
                            value={productDes}
                        />
                        <Text style={styles.title}>Product Quantity:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Product Quantity'
                            onChangeText={(value) => {setProductQuantity(value)}}
                            value={productQuantity}
                            keyboardType='numeric'
                        />
                        <Text style={styles.title}>Product Price:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Product Price'
                            onChangeText={(value) => {setProductPrice(value)}}
                            value={productPrice}
                            keyboardType='numeric'
                        />
                        <Text style={styles.title}>Product Rating:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Rating (1 - 5)'
                            onChangeText={(value) => {setProductRating(value)}}
                            value={productRating}
                            keyboardType='numeric'
                        />

                        <Button color='maroon' title="Submit" onPress= {handleSubmit}/>
                    </View>
                </Formik>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        color: "#000000",
        fontWeight: "bold"
    }
});