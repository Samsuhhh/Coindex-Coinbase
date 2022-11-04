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


const updateWallet = (wallet) => ({
  type: UPDATE_WALLET,
  wallet
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


// CREATE wallet Thunk
export const createWalletThunk = (assetType) => async (dispatch) => {
  const response = await fetch(`/api/wallets/${assetType}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(assetType)
  })
  console.log('CREATE WALLLLLLLET THUNKAROOOO', assetType, response)
  if (response.ok){
    const newWallet = await response.json();
    console.log('Create wallet response OK~~~', newWallet)
    dispatch(createWallet(newWallet));
  }
  console.log('CREATE WALLET THUNK ERRORED OUT')
}

// CHECK wallet status thunk
export const checkWalletThunk = (assetType) => async (dispatch) => {
  const response = await fetch(`/api/wallets/check/${assetType}`)
  console.log('~~~~~~ ASSET TYPE CHECK ~~~~~~', response)

  if (response) {
    const walletAddress = response.json()
    return true

  } else {
    return false
  }
}


// UPDATE wallet thunk
export const updateWalletThunk = (transaction) => async (dispatch) => {
  const response = await fetch('/api/wallets/update', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transaction)
  })
  if (response.ok){
    const updatedWallet = await response.json()
    dispatch(updateWallet(updatedWallet));
    return updatedWallet
  }
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
  console.log('CREAT TRANSACTION THUNK HITTING:', response)

  if (response.ok) {
    const newTransaction = await response.json()
    dispatch(addTransaction(newTransaction));
    return newTransaction
  }
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
  console.log('Create Card Session thunk hitting,', response, card)

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
  console.log('GET CURRENT USER CARD THUNK HITTING ~~~~~', response)
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
export const deleteCard = (cardId) => async (dispatch) => {
  // need to figure out some type of logic to key into each card,
  // might have to just render the button on the card we want to delete so 
  // we can just delete that card by grabbing card.id in state
  console.log(`~~~~~~ DELETE Card THUNK HITTING => ID: ${cardId}`)

  const response = await fetch(`api/cards/${cardId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeCard(cardId))
    console.log(`~~~ Card with id: ${cardId} deleted SUCCESSFULLY !!! ~~~`)
    return
  }
  console.log(`~~~~ FAILED TO DELETE CARD with ID: ${cardId} ~~~~`)
  return
}


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
  console.log('Login thunk hitting!!!!!')

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
    return ['An error occurred. Please try again.']
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
    console.log(data)
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
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
  const user = {}
  const wallets = {}
  const card = {}
  const transactions = {}
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
    case CREATE_WALLET:
      newState = {
        user: {...state.user},
        wallets: {...state.wallets},
        transactions: {...state.transactions},
        card: {...state.card}
      }
      newState.wallets = action.wallet
      return newState
    case UPDATE_WALLET:
      newState = {
        user: {...state.user},
        card: {...state.card},
        transactions: {...state.transactions},
        wallets: {...state.wallets}
      }
      newState.wallets[action.wallet.walletType] = action.wallet
      return newState
    default:
      return state;
  }
}
