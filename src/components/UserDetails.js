import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    PixelRatio,
    Dimensions
} from 'react-native';
import {get as _get} from 'lodash';
import {DATA} from '../config/appConstants';
const UserDetails = ({navigation, route}) => {
    const title = _get(route,DATA.SELECTED_TITLE);
    const id = _get(route,DATA.SELECTED_ID);
    
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.text}>{`The id is : ${id}`}</Text>
            <Text style={styles.text}>{`Title: ${title}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent:'flex-start',
        padding:Dimensions.get('screen').height * 0.01,
    },
    text: {
        fontFamily:'Verdana',
        fontSize: PixelRatio.getFontScale() * 20,
        paddingBottom:Dimensions.get('screen').height * 0.01,
        fontWeight:'bold'
    },
})

export default UserDetails;