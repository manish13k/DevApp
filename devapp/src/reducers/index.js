import { CAMPAIGN_DATA } from "../../public/constant/actionTypes";

const initialState = {
    campaign: [],
    getapidata: ''
  };
  function rootReducer(state = initialState, action) {
    if (action.type === CAMPAIGN_DATA) {
      return Object.assign({}, state, { campaign: state.campaign.concat(action.payload)});
    }
    
    return state;
  };
  export default rootReducer;