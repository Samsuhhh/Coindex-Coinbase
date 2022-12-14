const LOAD_ALL = "assets/LOAD_ALL";
const LOAD_ONE = "assets/LOAD_ONE";
const GET_ONE = "assets/GET_ONE";
const RESET = "assets/RESET";

// Action creatorrr

// load all assets
const loadAll = (assets) => ({
    type: LOAD_ALL,
    assets
})

// Load ONE asset by name
const loadOne = (asset ) => ({
    type: LOAD_ONE,
    asset
})

const getOneImg = (asset) => ({
    type: GET_ONE,
    asset
})


// GET ONE IMG
export const getImg = (asset) => async (dispatch) => {
    const response = await fetch(`/api/assets/img/${asset}`)

    if(response.ok){
        const img = await response.json()
        dispatch(getOneImg(img))
        return img
    }
}


// LOAD ALL THUNK
export const getAllAssets = () => async (dispatch) => {

    const response = await fetch('/api/assets/')

    if (response.ok){
        const assets = await response.json()
        dispatch(loadAll(assets))
        return assets
    }

    return '~~~~~ LOAD ALL ASSETS THUNK FAILURE ~~~~~'
}


// LOAD ONE THUNK
// GRAPH DATA days=default(7)
export const getOneAsset = (asset, days) => async (dispatch) => {
    const res = await fetch(`/api/assets/${asset}/${days}`);
    // const graph = await fetch(`/api/assets/history/${asset}/${days}`);

    if (res.ok ) {
        const asset = await res.json();
        // const graphData = await graph.json();
        dispatch(loadOne(asset))
        return asset
    }
}

//LOAD SOME THUNK
export const getWatchlist = (asset) => async (dispatch) => {
    
}



let initialState = {
    allAssets: {},
    singleAsset: {}
}
export default function assets(state = initialState, action) {
    let newState;
    let allAssets = {};
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