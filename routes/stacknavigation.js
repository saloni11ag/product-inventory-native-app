import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../components/home';
import ReviewDetails from '../components/reviewDetails'
import EditProduct from '../components/editForm';
import AddProduct from '../components/addProduct';

// const screens = {
//     Home: {
//       screen: Home,
//       navigationOptions: ({ navigation }) => {
//         return {
//           headerTitle: () => <Header title='GameZone' navigation={navigation} />
//         }
//       },
//     },
//     ReviewDetails: {
//       screen: ReviewDetails,
//       navigationOptions: {
//         title: 'Product Details',
//       }
//     },
//   };
  
//   // home stack navigator screens
//   const StackNavigator = createStackNavigator(screens, {
//     defaultNavigationOptions: {
//       headerTintColor: '#444',
//       headerStyle: { backgroundColor: '#eee', height: 60 }
//     }
//   });
  
//   export default StackNavigator;

const Stack = createStackNavigator()

function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'
                screenOptions={{
                    gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: 'lightgrey',
                        height: 100
                    }
                }}
                headerMode='float'>
                <Stack.Screen name="ProductDetails" component={ReviewDetails}></Stack.Screen>
                <Stack.Screen name="EditProduct" component={EditProduct}></Stack.Screen>
                <Stack.Screen name="AddProduct" component={AddProduct}></Stack.Screen>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

