
export const saveToLocalStorage = (state) => {
    try{
        const serialized = JSON.stringify(state);
        localStorage.setItem("cartState", serialized);
    }
    catch(er){
        console.warn("Save the state failed", er);
    }
};

export const loadFromLocalStorage = () => {
    try{
        const serialized = localStorage.getItem("cartState");
        if(serialized === null) return undefined;
        return JSON.parse(serialized);
    }
    catch(er){
        console.log("Load state failed", er);
    }
}
