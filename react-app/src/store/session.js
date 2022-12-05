// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const CREATE_CARD = 'session/CREATE_CARD';
const LOAD_CARD = 'session/LOAD_CARD';
const UPDATE_CARD = 'session/UPDATE_CARD';
const REMOVE_CARD = 'session/REMOVE_CARD';
const CHECK_WALLET = 'session/CHECK_WALLET';
const CREATE_TRANSACTION = 'session/CREATE_TRANSACTION';
const UPDATE_WALLET = 'session/UPDATE_WALLET';
const CREATE_WALLET = 'session/CREATE_WALLET';
const LOAD_WALLETS = 'session/LOAD_WALLETS';
const REMOVE_WALLET = 'session/REMOVE_WALLET';
const LOAD_TRANSACTIONS = 'session/LOAD_TRANSACTIONS';
const NEW_WATCHLIST = 'session/NEW_WATCHLIST';
const ADD_CRYPTO = 'session/ADD_CRYPTO';

const loadTransactions = (trActions) => ({
  type: LOAD_TRANSACTIONS,
  trActions
})


const loadWallets = (bifolds) => ({
  type: LOAD_WALLETS,
  bifolds
})


const updateWallet = (wallet) => ({
  type: UPDATE_WALLET,
  wallet
})

const removeWallet = (walletId, walletType) => ({
  type: REMOVE_WALLET,
  walletId,
  walletType
})

const addTransaction = (transaction) => ({
  type: CREATE_TRANSACTION,
  transaction
})

const createWallet = (wallet) => ({
  type: CREATE_WALLET,
  wallet
})


const addOneCard = (card) => ({
  type: CREATE_CARD,
  card
  // userId?
})

const updateCard = (card) => ({
  type: UPDATE_CARD,
  card
})

const checkWallet = (assetType) => ({
  type: CHECK_WALLET,
  assetType
})

const readCards = (card) => ({
  type: LOAD_CARD,
  card
})

const removeCard = (cardId) => ({
  type: REMOVE_CARD,
  cardId
})

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const newWatchlist = (userId) => ({
  type: NEW_WATCHLIST,
  userId
})

const cryptoToWatch = (asset) => ({
  type: ADD_CRYPTO,
  asset
})

export const createNewWatchlist = () => async (dispatch) => {
  const response = await fetch('/api/watchlists/', {
    method: "POST",
    headers:{
      'Content-type': 'application/json'
    }
  })

  if (response.ok){
    const newWatchlist = await response.json();
    dispatch(newWatchlist(newWatchlist))
    return response
  }

}

export const addCryptoToWatch = (assetType) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/add/${assetType}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: assetType
  })

  if (response.ok){
    const updatedWatchlist = await response.json();
    dispatch(cryptoToWatch(updatedWatchlist))
    return response
  }

}

//LOAD transactions
export const loadTransactionsThunk = () => async (dispatch) => {
  const response = await fetch('/api/transactions/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    const allTransactions = await response.json()
    dispatch(loadTransactions(allTransactions))
    return response
  }
  return response
}



// CREATE wallet Thunk
export const createWalletThunk = (assetType) => async (dispatch) => {
  console.log('create wallet thunk assetType parameter BEFORE fetch',assetType)
  const response = await fetch(`/api/wallets/${assetType}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: assetType
  })
  
  console.log('create wallet thunk AFTER fetch BEFORE response.ok, just response:', response)

  if (response.ok) {
    const newWallet = await response.json();
    console.log('create wallet thunk IF RESPONSE.OK newWallet: ', newWallet)

    await dispatch(createWallet(newWallet));
    return newWallet

  } else {
    console.log('create wallet failed, ', response)
    return false
  }
  
}

// // CHECK wallet status thunk -> saving old check wallet before experimenting with new one
// export const checkWalletThunk = (assetType) => async (dispatch) => {
//   const response = await fetch(`/api/wallets/check/${assetType}`)
//   

//   if (response) {
//     const walletAddress = await response.json()
//     
//     dispatch(checkWallet(walletAddress))
//     return true

//   } else {
//     return false
//   }
// }

 
// CHECK wallet status thunk v2!
export const checkWalletThunk = (assetType) => async (dispatch) => {
  const response = await fetch(`/api/wallets/check/${assetType}`)
  
  const wallet = await response.json()

  if (response.ok) {
    console.log('RESPONSE FROM check WALLET THUNK,', response)
    dispatch(checkWallet(wallet))
    return wallet
    
  } else {
    console.log('RESPONSE FROM check WALLET THUNK failed,', wallet)
    
    return wallet
  }
}


// UPDATE wallet thunk
export const updateWalletThunk = (transactionId) => async (dispatch) => {
  const response = await fetch(`/api/wallets/update/${transactionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transactionId)
  })

  if (response.ok) {
    const updatedWallet = await response.json()
    
    dispatch(updateWallet(updatedWallet));
    return updatedWallet
  }
}




// LOAD CURRENT USER WALLETS
export const loadAllWallets = () => async (dispatch) => {
  const response = await fetch('/api/wallets/')
  

  if (response.ok) {
    const wallets = await response.json()
    dispatch(loadWallets(wallets))
    return wallets
  }

  return "~~~~~ ERROR WITH LOAD WALLETS THUNK ~~~~~"

}

// CREATE Transaction
export const createTransactionThunk = (transaction) => async (dispatch) => {
  const response = await fetch('/api/transactions/new', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transaction)
  })
  

  if (response.ok) {
    const newTransaction = await response.json()
    dispatch(addTransaction(newTransaction));
    
    return newTransaction
  }

  return 'ERROR FOO, NO TRANSACTION FOR YOU >:['
}

// CREATE CARD
export const createCardThunk = (card) => async (dispatch) => {
  const response = await fetch("/api/cards/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(card)
    // do I need to list out each column instead of taking in just card? 
    // i don't think so but note for later
  });
  

  if (response.ok) {
    const newCardData = await response.json()
    dispatch(addOneCard(newCardData));
    return newCardData
  }

  return "~~~~~ ERROR WITH CREATE CARD THUNK ~~~~~"
}

// Load current user cards
export const getCurrentUserCards = () => async (dispatch) => {
  const response = await fetch('/api/cards/')
  
  if (response.ok) {
    const cards = await response.json()
    dispatch(readCards(cards))
    return cards
  }

  return "~~~~~ ERROR WITH LOAD CARDS THUNK ~~~~~"

}

// EDIT CARD
export const updateCardThunk = (card, cardId) => async (dispatch) => {
  
  const response = await fetch(`/api/cards/edit/${cardId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(card)
  });
  

  if (response.ok) {
    const updatedCardData = await response.json();
    
    dispatch(updateCard(updatedCardData))
    return updatedCardData
  }

  return 'ERROR ERROR ERROR WITH UPDATE CARD THUNK'

}

// DELETE CARD
export const deleteCardThunk = (cardId) => async (dispatch) => {
  // need to figure out some type of logic to key into each card,
  // might have to just render the button on the card we want to delete so 
  // we can just delete that card by grabbing card.id in state
  

  const response = await fetch(`/api/cards/${cardId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeCard(cardId))
    
    return
  }
  
  return
}

// DELETE WALLET THUNK
export const deleteWalletThunk = (walletId, walletType) => async (dispatch) => {
    const response = await fetch(`api/wallets/${walletId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      dispatch(removeWallet(walletId, walletType))
      
      return 
    }

    

}


// ~~~~~~~  AUTHORIZATION THUNKS  ~~~~~~~~
export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })

  });
  

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Invalid credentials. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (first_name, last_name, username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Invalid. Please try again.']
  }
}

let initialState = {
  user: {},
  wallets: {},
  card: {},
  transactions: {}
};

export default function reducer(state = initialState, action) {
  let newState;  
  const card = {}
  
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
        wallets: { ...state.wallets },
        card: { ...state.card },
        transactions: { ...state.transactions }
      }
    case REMOVE_USER:
      return { user: null }
    case LOAD_CARD:
      action.card.cards.forEach(debitCard => {
        card[debitCard.id] = debitCard
      })
      return { ...state, card }
    case CREATE_CARD:
      newState = {
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      newState.card = action.card
      return newState
    case REMOVE_CARD:
      newState = {
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      delete newState.card[action.cardId]
      return newState
    case REMOVE_WALLET:
      newState = {
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      delete newState.wallets[action.walletType]
      return newState
    case LOAD_WALLETS:
      newState = {
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      action.bifolds.wallets.forEach(bifold => {
        newState.wallets[bifold.assetType] = bifold
      })
      return newState
    case CREATE_WALLET:
      newState = {
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      newState.wallets[action.wallet.assetType] = action.wallet
      return newState
    case UPDATE_WALLET:
      newState = {
        user: { ...state.user },
        card: { ...state.card },
        transactions: { ...state.transactions },
        wallets: { ...state.wallets }
      }
      newState.wallets[action.wallet.assetType] = action.wallet
      return newState
    case CREATE_TRANSACTION:
      newState={
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      newState.transactions[action.transaction.id] = action.transaction
      return newState
    case LOAD_TRANSACTIONS:
      newState = {
        user: { ...state.user },
        wallets: { ...state.wallets },
        transactions: { ...state.transactions },
        card: { ...state.card }
      }
      action.trActions.transactions.forEach(taction => {
        newState.transactions[taction.id] = taction
      })
      return newState
    default:
      return state;
  }
}
