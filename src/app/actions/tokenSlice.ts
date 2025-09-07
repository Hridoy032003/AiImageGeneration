
import { createSlice } from "@reduxjs/toolkit";


const CREDIT_COSTS = {
    IMAGE_GENERATION: 5,
    IMAGE_BACKGROUND_REMOVAL: 10,
    IMAGE_RESIZER: 10,
    IMAGE_OPTIMIZER: 7,
   
};


const initialState = {
    token: 0, 
    loading: 'idle', 
    error: null,
    featureCosts: CREDIT_COSTS, 
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        
        initializeToken: (state, action) => {
            state.token = action.payload;
            state.loading = 'succeeded';
            state.error = null;
        },
     
        setTokenValue: (state, action) => {
            state.token = action.payload;
            state.loading = 'idle'
            state.error = null;
        },
   
        deductCredits: (state, action) => {
            const { feature, creditsToDeduct } = action.payload;

            
            if (typeof creditsToDeduct !== 'number' || isNaN(creditsToDeduct) || creditsToDeduct <= 0) {
                console.error(`deductCredits: Invalid creditsToDeduct value for ${feature}:`, creditsToDeduct);
                return; 
            }

           
            if (state.token >= creditsToDeduct) {
                state.token -= creditsToDeduct;
                console.log(`Client-side deducted ${creditsToDeduct} credits for ${feature}. New balance: ${state.token}`);
            } else {
               
                console.warn(`Client-side insufficient credits for ${feature}. Current balance: ${state.token}, needed: ${creditsToDeduct}`);
              
            }
        },
    
      
      
     
    }
});


export const {
    initializeToken,
    setTokenValue,
    deductCredits,
   
} = tokenSlice.actions;

export default tokenSlice.reducer;