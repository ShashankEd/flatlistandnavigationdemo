import React,{useState,useEffect,useCallback} from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    Alert
} from 'react-native';
import {useSelector} from 'react-redux';
import {get as _get} from 'lodash';
import {DATA} from '../config/appConstants';
import {itemSeparator} from './ViewComponents';
const LisrUserIdItems = ({navigation, route}) => {
    const getListUseridsResponse = useSelector(state=> state.getListUserids);
    const [data,setData] = useState([]);
    const [isloading,setIsLoading] = useState(true);

    const keyExt = useCallback((item) => item.userId,[]);
    
    const handleUserIdPress =(id,title) => {
        //navigate to user details screen
        navigation.navigate('UserDetails',{selectedId: id,selectedTitle: title });
    }

    useEffect(() => {
        // console.log(getListUseridsResponse?.response);
        // console.log("selectedId",route,_get(route,DATA.SELECTED_ID));
        if(getListUseridsResponse?.response) {
           let data= getListUseridsResponse?.response.filter(
                item => item.userId === _get(route,DATA.SELECTED_ID)
            );
            setData(data);
            setIsLoading(false);
        }
    },[])
    
    const renderItem = ({item}) => {
        return(
            <View style={styles.item}>
               <TouchableOpacity onPress={() => handleUserIdPress(item.userId,item.title)}>
                    <Text style={styles.text}>{`Id: ${item.id}`}</Text>
               </TouchableOpacity>
            </View>
        )
    }

    const cachedRenderItem = useCallback((item) => renderItem(item),[]);

    const itemSep = useCallback(() => itemSeparator(),[])

    return(
        <View style={styles.mainContainer}>
           { isloading 
           ?  <Text>Loading.....</Text> 
           : <FlatList
                data={data}
                keyExtractor={keyExt}
                renderItem={cachedRenderItem}
                ItemSeparatorComponent={itemSep}
                windowSize={21}
            />
    }
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        padding:Dimensions.get('screen').height * 0.01,
        marginTop:Dimensions.get('screen').height * 0.01
    },
    item: {
        backgroundColor:'yellow',
        padding: Dimensions.get('screen').height * 0.01,
        marginHorizontal: Dimensions.get('screen').height * 0.01,
        alignItems:'flex-start',
        borderRadius:Dimensions.get('screen').height * 0.02,
    },
    text: {
        fontFamily:'Verdana',
        fontSize: PixelRatio.getFontScale() * 30
    },
    itemSep: {
        height: Dimensions.get('screen').height * 0.02,
    },
    loading: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default React.memo(LisrUserIdItems);