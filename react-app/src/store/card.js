const LOAD_ALL = "cards/LOAD_ALL"
const CREATE = "cards/CREATE"
const UPDATE = "cards/UPDATE"
const REMOVE = "cards/REMOVE"


// Action creators

// load all cards of current user?
const loadAll = (payload) => ({
    type: LOAD_ALL,
    payload
})

// create card
const addOne = (payload) => ({
    type: CREATE,
    payload
})

// update card information
const updateCard = (payload) => ({
    type: UPDATE,
    payload
})

const removeCard = (payload) => ({
    type: REMOVE,
    payload
})

// THUNKS

// CREATE CARD
// export const createCardThunk = (card) => async (dispatch) => {
//     const response = await fetch("/api/cards", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(card)
//     });

//     if (response.ok) {
//         const newCardData = await response.json()
//         dispatch(addOne(newCardData));
//         return newCardData
//     }
//     // user[card] = newCard


//     return "~~~~~ ERROR WITH CREATE CARD THUNK ~~~~~"
// }


