import React,{useState,useEffect,useCallback} from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    TextInput
} from 'react-native';
import {getListUserids} from '../store/reducers/listUserId'
import {shallowEqual, useDispatch,useSelector} from 'react-redux';
import {itemSeparator} from './ViewComponents';
import {
    getDistinctValues,
    searchObjectById,
    sortByAscOrDesc
} from '../config/HelperFunction'
import {get as _get} from 'lodash';
const ListUserId = (props) => {
    const getListUseridsResponse = useSelector(state=> state.getListUserids,shallowEqual);
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState(0);
    const [ascOrDescFlag, setAscOrDescFlag] = useState(true);
    const [random,setRandom] = useState(false)
    //useEffect where api call is being done- its like componentDidMount called once at mount stage
    useEffect(() => {
        async function makeAPICall() {
            await dispatch(getListUserids.fetchCall({},{}));
        }
        makeAPICall();
    },[dispatch])

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

    const searchObject = useCallback((serchKeyValue,data) => searchObjectById(serchKeyValue,data),[]);

    const sortByAscOrDescFun = useCallback((data,ascdes,ran) =>sortByAscOrDesc(data,ascdes,ran) ,[ascOrDescFlag,random]);

    const ascOrDesc = () => {
        return (
            <View style={styles.sortSec}>
                <TouchableOpacity  style={styles.touchable} onPress={() => {
                    setAscOrDescFlag(true)
                    setRandom(false)
                }}>
                    <Text style={styles.text}>{`Asc`}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.touchable} onPress={() =>{
                     setAscOrDescFlag(false)
                     setRandom(false)
                }}>
                    <Text style={styles.text}>{`Desc`}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.touchable} onPress={() => setRandom(true)}>
                    <Text style={styles.text}>{`Random`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const sortView = useCallback(() => ascOrDesc(),[]);

    return(
        <View style={styles.mainContainer}>
           { !getListUseridsResponse?.response 
           ? <Text>Loading.....</Text> 
           :  <View style={styles.flatList}>
               {sortView()}
               <TextInput placeholder={`Enter search key`} style={styles.textInput} defaultValue={searchKey} onChangeText={(value) => setSearchKey(value)}/>
               <FlatList
                data={
                    searchKey && setSearchKey!= ''
                    ? searchObject(searchKey,getListUseridsResponse?.response)
                    : (ascOrDescFlag && !random
                        ?  cachedGetDistinct(getListUseridsResponse?.response)
                        :  (random 
                                ? sortByAscOrDescFun(getListUseridsResponse?.response,false,random)
                                : sortByAscOrDescFun(getListUseridsResponse?.response,ascOrDescFlag,false)))
                }
                keyExtractor={keyExt}
                renderItem={cachedRenderItem}
                ItemSeparatorComponent={itemSep}
                windowSize={21}
            />
           </View>
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
    },
    flatList: {
        flex:1,
    },
    textInput: {
        marginHorizontal: Dimensions.get('screen').height * 0.01,
        paddingBottom: Dimensions.get('screen').height * 0.04,
        fontFamily:'Verdana',
        fontSize: PixelRatio.getFontScale() * 30
    },
    sortSec: {
        // flex:1,
        // height: 
        // justifyContent:'flex-end',r
        // padding:Dimensions.get('screen').height * 0.04,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    touchable: {
        // backgroundColor:'yellow',
        // width:40
    }
})

export default React.memo(ListUserId);