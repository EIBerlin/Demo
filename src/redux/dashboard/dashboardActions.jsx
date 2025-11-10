import {
  FETCH_DASHBOARD_PENDING,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from "./dashboardTypes";

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const fetchDashboardData = (userEmail) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_PENDING });

    try {
      const userRes = await fetch(`${API_BASE}/api/data/users?email=${encodeURIComponent(userEmail)}`).then(r => r.json());
      const user = userRes.user || (Array.isArray(userRes.users) ? userRes.users[0] : null);

      const cryptosRes = await fetch(`${API_BASE}/api/data/cryptos`).then(r => r.json());
      const cryptos = cryptosRes.cryptos || cryptosRes.data || [];

      const userId = user?.id;
      const purchasesRes = await fetch(`${API_BASE}/api/data/purchase_history?user_id=${encodeURIComponent(userId||'')}`).then(r => r.json());
      const purchases = purchasesRes.purchases || purchasesRes.data || [];

      const rewardsRes = await fetch(`${API_BASE}/api/data/reward_history?user_id=${encodeURIComponent(userId||'')}`).then(r => r.json());
      const rewards = rewardsRes.rewards || rewardsRes.data || [];

      dispatch({
        type: FETCH_DASHBOARD_SUCCESS,
        payload: {
          user,
          cryptos,
          purchaseHistory: purchases,
          rewardHistory: rewards,
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_DASHBOARD_FAILURE, payload: error.message });
    }
  };
};
