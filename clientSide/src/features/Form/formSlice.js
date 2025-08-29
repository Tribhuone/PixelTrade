
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        title: "",
        description: "",
        keywords: ["Nature",],
        price: "",
        imgFile: "",
        imgPreview: "",
}

// Here we create slice to upload file then export it to use on other files...
export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { name , value } = action.payload;        // Here we spread name and value of each input.
            state[name] = value;
        },

        addKeywords: (state, action) => {
            state.keywords.push(action.payload);
        },

        removeKeywords: (state, action) => {
            state.keywords = state.keywords.filter( (_, i) => i !== action.payload );
        },

        updateImageFile: (state, action) => {
            state.imgFile = action.payload.image;
            state.imgPreview = action.payload.imgPreview || "";
        },

        resetAllValues : (state) => {
            state.title = "";
            state.description = "";
            state.keywords = ["Nature",];
            state.price = "";
            state.imgFile = "";
            state.imgPreview = "";
            state.imgId = "";
            state.imgPath = "";
        }
    },
});


// Here Redux toolkit automatically generate action creators for each reducer function...
export const { updateField , addKeywords , removeKeywords , updateImageFile , resetAllValues } = formSlice.actions;

export default formSlice.reducer;
