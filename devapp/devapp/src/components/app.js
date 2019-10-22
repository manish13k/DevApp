import React from "react";
import Campaign from "./campaign";

class App extends React.Component {
 
    render () { 
        return(<>
        <div>
            <h2>Campaign List</h2>
            <Campaign />
        </div>
        </>);
    }
}
export default App;

