import React from 'react';
import { getUserName } from "../handlers/handlers";

const List = (props) => {
    return(
        <>
            <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Active</th>
                <th>Budget</th>
            </tr>
            { props.isError ? (
                <div>Something went wrong...</div>
            ) : (
                <>
                    { props.filterData.map((data, index) => {
                        const username = getUserName(props.userData, data.userId);
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
        </>
    );
}
export default List;
