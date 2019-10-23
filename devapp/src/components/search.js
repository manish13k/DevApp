import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const handleStartDate = (props, selectedDate) => {
    props.handleStartDate(selectedDate);
};

const handlenameSearch = (props, selectedDate) => {
    props.handlenameSearch(selectedDate);
}

const handleEndDate = (props, selectedDate) => {
    props.handleEndDate(selectedDate);
};

const Search = (props) => {
    return(
        <tr>
            <th><DatePicker selected={props.date.startDate} placeholderText="Start Date" onChange={e => handleStartDate(props, e)} /></th>
            <th><DatePicker selected={props.date.endDate} placeholderText="End Date" onChange={e => handleEndDate(props, e)}/></th>
            <th></th>
            <th></th>
            <th></th>
            <th><input type="text" name="username" id="username" placeholder="search by name" /><input type="submit" value="Go" onClick={e => handlenameSearch(props, e)}/></th>
        </tr>
    );
}
export default Search;
