import React from 'react';
import "./App.css";

import UserGreeting from "../components/UserGreeting";
function BroCodeRendering () {
    return (
        <>
       <UserGreeting isLoggedIn= {true} username="BroCode" />
           </>
    );
};

export default BroCodeRendering