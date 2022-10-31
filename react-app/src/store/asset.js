const LOAD_ALL = "assets/LOAD_ALL";
const LOAD_ONE = "assets/LOAD_ONE";
const RESET = "assets/RESET";

// Action creatorrr

// load all assets
const loadAll = (assets) => ({
    type: LOAD_ALL,
    assets
})

// Load ONE asset by name
const loadOne = (asset) => ({
    type: LOAD_ONE,
    asset
})


// LOAD ALL THUNK
export const getAllAssets = () => async (dispatch) => {
    // const response = await fetch()
}


// LOAD ONE THUNK
export const getOneAsset = () => async (dispatch) => {
    const res = await fetch('/api/assets/v2')
    console.log('~~~~~~GET ONE ASSET THUNK HITTING~~~', res)
    if (res.ok) {
        const asset = await res.json()
        dispatch(loadOne(asset))
        return asset
    }
}

let initialState = {
    allAssets: {},
    singleAsset: {}
}
export default function assetReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_ONE:
            newState = { ...state, allAssets: { ...state.allAssets }, singleAsset: { ...state.singleAsset } }
            newState.singleAsset = action.asset
            return {...newState}
        case RESET:
            return initialState
        default:
            return state
    }
}