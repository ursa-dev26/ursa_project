/**
 * @function 
 * validation des données
 */
const isValuePresent = (val) => {
    if (val === null || val === undefined) return false;
    if (typeof val === 'string' || Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object') return Object.keys(val).length > 0;
    return true
} 

export default isValuePresent