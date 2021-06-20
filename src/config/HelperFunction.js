//method which will return distinct objects from the array of objects
export const getDistinctValues = (data) => {
    const unique = [...data.reduce((map,obj) => map.set(obj.userId,obj), new Map()).values()];
    return unique;
}

//method to search the flatlist item
export const searchObjectById = (searchId,data) => {
    const distinct  = getDistinctValues(data);
    const result = distinct.filter(obj => obj.userId == searchId);
    return result;
}

//method to sort
export const sortByAscOrDesc = (data,isAsc,isRamdom) => {
    const distinct  = getDistinctValues(data);
    var result = distinct.sort();
    let randomResult = [];
    let mapRandoms = new Map();
    if(!isRamdom) {
        if(!isAsc) {
            result = result.sort((a,b) => b.userId - a.userId);
        }
    } 
    else {
        const min = 1;
        const max = result.length;
        const len = [...mapRandoms.values()].length;//0
        let counter = 0;
        while(counter<max) {
            let rand = Math.random() * (max-min) + max;
            if(Math.floor(rand)>0)
                mapRandoms.set(Math.floor(rand)-max,Math.floor(rand)-max);
            counter++;
        }
        [...mapRandoms.values()].map(
            item =>  randomResult.push(
                result[item]
            )
        );
    }
    return isRamdom ? randomResult : result;
}