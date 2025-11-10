import {
  SET_PAYMENT_METHOD_1,
  SET_PAYMENT_DETAILS,
  RESET_CHECKOUT,
  SET_CARDS,
  SELECT_CARD,
  SET_BANKS,
  SELECT_BANK,
  FETCHING_START,
  FETCHING_SUCCESS,
  FETCHING_FAIL,
  INSERT_CB_START,
  INSERT_CB_SUCCESS,
  INSERT_CB_FAIL,
} from "./checkoutTypes";

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const setPaymentMethod_1 = (method) => {
  sessionStorage.setItem("method_1", method);
  return { type: SET_PAYMENT_METHOD_1, payload: method };
};

export const setPaymentDetails = (details) => ({
  type: SET_PAYMENT_DETAILS,
  payload: details,
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT,
});

export const fetchCheckoutData = (method) => async (dispatch) => {
  try {
    const goodsRes = await fetch(`${API_BASE}/api/data/goods?payment_method=${encodeURIComponent(method)}`).then(r => r.json());
    const goods = (goodsRes.goods && goodsRes.goods[0]) || null;

    if (!goods) throw new Error('No goods found for payment method');

    let details = {};

    if (method === 'crypto') {
      const cryptosRes = await fetch(`${API_BASE}/api/data/cryptos`).then(r => r.json());
      const cryptos = cryptosRes.cryptos || [];
      const eth = cryptos.find(c => c.symbol && c.symbol.startsWith('ETH')) || cryptos[0];
      details = {
        item: goods.name,
        usdPrice: null,
        cryptoPrice: goods.price,
        discount: goods.discount,
        rate: eth?.price || 0,
        merchant_name: goods.merchant,
      };
    } else {
      details = {
        item: goods.name,
        usdPrice: goods.price,
        discount: goods.discount,
        rate: null,
        merchant_name: goods.merchant,
        cryptoPrice: null,
      };
    }
    dispatch(setPaymentDetails(details));
  } catch (error) {
    console.error("Error fetching checkout data:", error.message);
  }
};

export const fetchCardAndBankData = (holder_id) => async (dispatch) => {
  dispatch({ type: FETCHING_START });
  try {
    const [cardList, bankList] = await Promise.all([
      fetch(`${API_BASE}/api/data/cards?holder_id=${encodeURIComponent(holder_id)}`).then(r => r.json()),
      fetch(`${API_BASE}/api/data/banks?holder_id=${encodeURIComponent(holder_id)}`).then(r => r.json()),
    ]);

    const cardsData = cardList.cards || [];
    const banksData = bankList.banks || [];

    dispatch({
      type: FETCHING_SUCCESS,
      payload: {
        cards: cardsData,
        banks: banksData,
      },
    });
  } catch (error) {
    dispatch({ type: FETCHING_FAIL, payload: error.message });
    console.error("Fetching card and bank list error:", error.message);
    alert("Error fetching card and bank list. Please try again.");
    throw error;
  }
};

export const saveNewCard = (card) => async (dispatch) => {
  dispatch({ type: INSERT_CB_START });
  try {
    const res = await fetch(`${API_BASE}/api/data/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    });
    const json = await res.json();
    const data = json.card ? [json.card] : [];
    dispatch(setCardList(data));
    dispatch({ type: INSERT_CB_SUCCESS });
  } catch (error) {
    dispatch({ type: INSERT_CB_FAIL, payload: error.message });
    console.error("Saving new card info error:", error.message);
    alert("Error saving card info. Please try again.");
    throw error;
  }
};

export const saveNewBank = (bank) => async (dispatch) => {
  dispatch({ type: INSERT_CB_START });
  console.log(bank);
  try {
    const res = await fetch(`${API_BASE}/api/data/banks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bank)
    });
    const json = await res.json();
    const data = json.bank ? [json.bank] : [];
    dispatch(setBankList(data));
    dispatch({ type: INSERT_CB_SUCCESS });
  } catch (error) {
    dispatch({ type: INSERT_CB_FAIL, payload: error.message });
    console.error("Saving new bank info error:", error.message);
    alert("Error saving bank info. Please try again.");
    throw error;
  }
};

export const setCardList = (cards) => ({
  type: SET_CARDS,
  payload: cards,
});

export const setBankList = (banks) => ({
  type: SET_BANKS,
  payload: banks,
});

export const selectCard = (card) => ({ type: SELECT_CARD, payload: card });
export const selectBank = (bank) => ({ type: SELECT_BANK, payload: bank });
