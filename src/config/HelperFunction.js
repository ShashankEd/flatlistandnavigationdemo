//method which will return distinct objects from the array of objects
export const getDistinctValues = (data) => {
    const unique = [...data.reduce((map,obj) => map.set(obj.userId,obj), new Map()).values()];
    return unique;
}