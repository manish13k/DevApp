    /*get user name */
    export function getUserName(userData, userId) {
        let userName = 'Unknown User';
        userData.map(data => {
            if (data.id === userId) {
                userName = data.username;
                return;
            }
        });
        return userName;
    }

    export function handleFilterData(startDate, endDate, name, defaultData) {
        let getFilterData = [];
        if (startDate && endDate && name) {
            getFilterData = filterData(startDate, endDate, name, defaultData, 'all');
        } else if (startDate && name) {
            getFilterData = filterData(startDate, endDate, name, defaultData, 'combo');
        } else if (startDate) {
            getFilterData = filterData(startDate, endDate, name, defaultData, 'startdate');
        } else if (endDate) {
            getFilterData = filterData(startDate, endDate, name, defaultData, 'enddate');
        } else if (name) {
            getFilterData = filterData(startDate, endDate, name, defaultData, 'name');
        } else {
            getFilterData = defaultData;
        }
        return getFilterData;
    }

    export function filterData(startDate, endDate, name, defaultData, type) {
        let dataValue = new Array();
        defaultData.map(data => {
            if (type === 'startdate') {
                if (new Date(data.startDate) >= new Date(startDate)) {
                    dataValue.push(data);
                }
            } else if (type === 'enddate') {
                if (new Date(data.endDate) <= new Date(endDate) && new Date(data.startDate) >= new Date(startDate)) {
                    dataValue.push(data);               
                }
            } else if (type === 'name') {
                if (data.name == name) {
                    dataValue.push(data);               
                }
            } else if (type === 'all') {
                if (new Date(data.endDate) <= new Date(endDate) && new Date(data.startDate) >= new Date(startDate) && data.name == name) {
                    dataValue.push(data);               
                }
            }  else if (type === 'combo') {
                if (new Date(data.startDate) >= new Date(startDate) && data.name == name) {
                    dataValue.push(data);               
                }
            } 
        });
        return dataValue;
    }