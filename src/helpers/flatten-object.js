 export default function flattenObject(parentKey,json){
    
    if(typeof json !== "object"){
        
        return {[parentKey]:json};
    }
    const result =  Object.entries(json).reduce((acc,val)=>{
       
       const [key,value]=val;
       const newParentKey = parentKey == ""?key:`${parentKey}.${key}`;
        return {...acc,...flattenObject(newParentKey,value)};
    },{});
    
    return result;
}

const json = {register:{sigin:"signin",register:"register"}};
console.log( flattenObject("",json));