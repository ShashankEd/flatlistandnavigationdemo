
 import React, { useEffect } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   BackHandler,
   Alert
 } from 'react-native';
 import 'react-native-gesture-handler';
 import {Provider} from 'react-redux';
 import {PersistGate} from 'redux-persist/integration/react';
 //@ts-ignore
 import {get as _get} from 'lodash';
 import {store, persistor} from './src/store/configureStore';
 import { LogBox } from 'react-native';
 LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
 LogBox.ignoreAllLogs();//Ignore all log notifications
 
import LisrUserIdItems from './src/components/ListUserIdItems';
import ListUserId from './src/components/ListUserId';
import UserDetails from './src/components/UserDetails';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
  function App() {
    
  //If user presses hardware back button more than once, then following method will show alert, and on clicking OK it will signout 
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want Exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
      return () => backHandler.remove();
  },[])
    
   return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.mainContainer}>
           <NavigationContainer>
            <Stack.Navigator initialRouteName='ListUserId'>
              <Stack.Screen name="ListUserId" component={ListUserId} options={{header: ()=> null}}/>
              <Stack.Screen name="LisrUserIdItems" component={LisrUserIdItems} options={{ title: ''}}/>
              <Stack.Screen name="UserDetails" component={UserDetails}  options={{title: '' }}/>
            </Stack.Navigator>
           </NavigationContainer>
           </SafeAreaView>
       </PersistGate>
     </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   mainContainer: {
    flex: 1,
    justifyContent: 'center',
   }
 });
 
 export default App;
 