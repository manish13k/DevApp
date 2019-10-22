import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { campaignData } from "../actions/index";
import {renderApi} from "../../public/constant/constant";
import {getCampaignData} from "../../public/constant/getCampaignData";
import "../../public/css/main.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserName, handleFilterData } from "../handlers/handlers"

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
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handlenameSearch = this.handlenameSearch.bind(this);
    }

    componentDidMount() {
        this.renderApiData();
        this.props.campaignData(getCampaignData);
    }

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

    handlenameSearch(e) {
        const getName = document.getElementById('username').value;
        this.setState({
            name: getName
        });
    }

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
                <tr>
                    <th><DatePicker selected={this.state.startDate} placeholderText="Start Date" onChange={this.handleStartDate}/></th>
                    <th><DatePicker selected={this.state.endDate} placeholderText="End Date" onChange={this.handleEndDate}/></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th><input type="text" name="username" id="username" placeholder="search by name" /><input type="submit" value="Go" onClick={this.handlenameSearch}/></th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Active</th>
                    <th>Budget</th>
                </tr>
                { isError ? (
                    <div>Something went wrong...</div>
                ) : (
                    <>
                        { getFilterData.map((data, index) => {
                            const username = getUserName(this.state.userData, data.userId);
                            return(
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{username}</td>
                                    <td>{data.startDate}</td>
                                    <td>{data.endDate}</td>
                                    <td>Active</td>
                                    <td>{parseInt(data.Budget/70)} USD</td>
                                </tr>
                            );
                        })}
                    </>
                )}
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

const Data = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Campaign);
export default Data;

