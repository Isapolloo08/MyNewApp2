import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/LoginScreen';
import DetailsScreen from './screens/DetailsScreen';
import CustomHeader1 from './screens/CustomHeader';
import Homescreen1 from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import { View } from 'react-native';


const Stack = createNativeStackNavigator();

const App = () => {
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide header for SplashScreen
        />
        <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    header: () => <CustomHeader1 title="Welcome" />,
                    
                }}
                
            />
             <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{
                    header: () => <CustomHeader1 title="Welcome" />,
                    
                }}
              />
                  <Stack.Screen
                  name="Homes"
                  component={Homescreen1}
                  options={{
                      header: () => <CustomHeader1 title="Welcome" />,
                  }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                headerTintColor: '#FFFFFF', // Text color
                headerStyle: {
                backgroundColor: '#710808', // Background color
                height: 390, // Height of the header
                width: 834, // Width of the header
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};





export default App;
