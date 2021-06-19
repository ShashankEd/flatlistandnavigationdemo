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
import {useDispatch,useSelector} from 'react-redux';
import {itemSeparator} from './ViewComponents';

const ListUserId = (props) => {
    const getListUseridsResponse = useSelector(state=> state.getListUserids);
    const [data,setData] = useState([]);
    const dispatch = useDispatch();
    const [isloading,setIsLoading] = useState(true);

    useEffect(async() => {
        await dispatch(getListUserids.fetchCall({},{}));
        if(getListUseridsResponse?.response) {
            console.log("inside useEffect ", getListUseridsResponse?.response);
            //get only 
            let uniqueItems = getListUseridsResponse?.response.filter(
                (item,i,arr) => arr[i].userId === item.userId
            )
            setData(uniqueItems);
            setIsLoading(false);
        }
    },[])

    const keyExt = useCallback((item) => item.userId,[]);
    
    const handleUserIdPress =(id) => {
        //navigate to list user item list screen
        const {navigation} = props;
        navigation.navigate('LisrUserIdItems',{selectedId: id});
    }
    
    const renderItem = ({item}) => {
        return(
            <View style={styles.item}>
               <TouchableOpacity onPress={() => handleUserIdPress(item.userId)}>
                    <Text style={styles.text}>{`User id: ${item.userId}`}</Text>
               </TouchableOpacity>
            </View>
        )
    }

    const cachedRenderItem = useCallback((item) => renderItem(item),[]);

    const itemSep = useCallback(() => itemSeparator(),[])

    return(
        <View style={styles.mainContainer}>
           { isloading 
           ? <Text>Loading.....</Text> 
           :  <FlatList
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
        alignItems:'center',
    }
})

export default React.memo(ListUserId);