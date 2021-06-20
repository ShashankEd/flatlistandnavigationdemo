import React,{useState,useEffect,useCallback} from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native';
import {getListUserids} from '../store/reducers/listUserId'
import {shallowEqual, useDispatch,useSelector} from 'react-redux';
import {itemSeparator} from './ViewComponents';
import {
    getDistinctValues
} from '../config/HelperFunction'
import {get as _get} from 'lodash';
const ListUserId = (props) => {
    const getListUseridsResponse = useSelector(state=> state.getListUserids,shallowEqual);
    const dispatch = useDispatch();

    //useEffect where api call is being done
    useEffect(() => {
        async function makeAPICall() {
            await dispatch(getListUserids.fetchCall({},{}));
        }
        makeAPICall();
    },[])

    //key extractor using useCallback 
    const keyExt = useCallback((item) => item.userId,[]);
    
    //handle when user presses on the list item
    const handleUserIdPress =(id) => {
        //navigate to list user item list screen
        const {navigation} = props;
        navigation.navigate('LisrUserIdItems',{selectedId: id});
    }
    
    //function which returns the list item 
    const renderItem = ({item}) => {
        return(
            <View style={styles.item}>
               <TouchableOpacity onPress={() => handleUserIdPress(item.userId)}>
                    <Text style={styles.text}>{`User id: ${item.userId}`}</Text>
               </TouchableOpacity>
            </View>
        )
    }

    //useCallback to call renderItem
    const cachedRenderItem = useCallback((item) => renderItem(item),[]);

    //useCallback to call itemSeparator
    const itemSep = useCallback(() => itemSeparator(),[])

    //useCallback to call getDistinctValues function
    const cachedGetDistinct = useCallback((users) => getDistinctValues(users),[]);

    return(
        <View style={styles.mainContainer}>
           { !getListUseridsResponse?.response 
           ? <Text>Loading.....</Text> 
           :  <FlatList
                data={cachedGetDistinct(getListUseridsResponse?.response)}
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
        alignItems:'center',
    }
})

export default React.memo(ListUserId);