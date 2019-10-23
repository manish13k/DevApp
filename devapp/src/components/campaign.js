import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { campaignData } from "../actions/index";
import {renderApi} from "../../public/constant/constant";
import {getCampaignData} from "../../public/constant/getCampaignData";
import { handleFilterData } from "../handlers/handlers";
import SearchComponent from "./search";
import ListComponent from "./list";
import "../../public/css/main.css";

class Campaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            loading: true,
            isError: false,
            getDataFromUser: [],
            startDate: "",
            endDate: "",
            name: ""
          };
        this.renderApiData = this.renderApiData.bind(this);
    }

    componentDidMount() {
        this.renderApiData();
        this.props.campaignData(getCampaignData);
    }

    /* get campaign list */
    getCampaignList() {
        this.props.campaignData(this.state.getDataFromUser);
    }

    /* render api data */
    renderApiData() {
        axios.get(renderApi).then( response => {
            this.setState({
                userData: response.data,
                loading: false
            });
        }).catch(function (error) {
            this.setState({
                isError: true,
                loading: false
            })
        });
    }

    /* handle start date */
    handleStartDate(date) {
        if(new Date(date) > new Date(this.state.endDate)) { 
            this.setState({
                startDate: date,
                endDate: ""
            });
            
        } else {
            this.setState({
                startDate: date
            });
        }
    };

    /* handle search name */
    handlenameSearch() {
        const getName = document.getElementById('username').value;
        this.setState({
            name: getName
        });
    }

    /* handle end date */
    handleEndDate(date) {
        if(this.state.startDate === "" || new Date(this.state.startDate) > new Date(date)) { 
            alert('You can not select an end-date that is before the start-date.');
            return;
        } else { 
            this.setState({
                endDate: date
            });
        }
    };

    render () {
        let self = this;
        window.AddCampaigns = function(getData) {
            self.setState({
                getDataFromUser: getData
            });
            self.getCampaignList();
        };
        const getFilterData = handleFilterData(this.state.startDate, this.state.endDate, this.state.name, this.props.campaign);
        const { loading, isError } = this.state;
        return(
            <>
                { !loading ? (
                    <table>
                        <tbody>
                            <SearchComponent 
                                date={this.state} 
                                handleStartDate={this.handleStartDate.bind(this)}
                                handleEndDate={this.handleEndDate.bind(this)}
                                handlenameSearch={this.handlenameSearch.bind(this)}
                            />
                            <ListComponent 
                                isError={isError} 
                                filterData={getFilterData}
                                userData={this.state.userData}
                            />
                        </tbody>
                    </table>
                ) : (
                    <div>Data is loading....</div>
                )}
            </>
            );
    }
}

const mapStateToProps = state => {
    return { 
        campaign: state.campaign
    };
}

const mapDispatchToProps = dispatch => {
    return {
        campaignData: campaign => dispatch(campaignData(campaign)),
    };
}

const Data = connect(mapStateToProps, mapDispatchToProps)(Campaign);
export default Data;

