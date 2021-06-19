import React from 'react';
import { 
    TouchableOpacity, 
    View, 
    Image, 
    Text, 
    StyleSheet,
    Dimensions 
} from 'react-native';
//item separator comopnent 
export const itemSeparator = () => {
   return (
    <View style={styles.itemSep}>
    </View>
   )
}
const styles = StyleSheet.create({
    itemSep: {
        height: Dimensions.get('screen').height * 0.02,
    }
});
