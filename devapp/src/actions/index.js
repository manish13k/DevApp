import { CAMPAIGN_DATA } from "../../public/constant/actionTypes";

export function campaignData(payload) {
  return {type: CAMPAIGN_DATA, payload}
}
