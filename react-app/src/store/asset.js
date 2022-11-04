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
    console.log('~~~~~ GET ALL ASSETS THUNK HITTING ~~~~~')
    const response = await fetch('/api/assets/')
    console.log('~~~~~ GET ALL ASSETS RESPONSE ~~~~~', response)
    // console.log('How about this', action.asset)
    if (response.ok){
        const assets = await response.json()
        dispatch(loadAll(assets))
        return assets
    }
    console.log('~~~~~ LOAD ALL ASSETS THUNK FAILURE ~~~~~')
    return '~~~~~ LOAD ALL ASSETS THUNK FAILURE ~~~~~'
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
export default function assets(state = initialState, action) {
    let newState;
    let allAssets = {};
    let singleAsset = {};
    switch (action.type) {
        case LOAD_ALL:
            Object.keys(action.assets).forEach(crypto => {                
                allAssets[crypto] = action.assets[crypto];
            })
            return { ...state,
                allAssets
            }
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