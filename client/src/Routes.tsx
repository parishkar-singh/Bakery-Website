import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "@/Pages/Home.tsx";
import Auth from "@/Containers/SignIn.tsx";
import Builder from "@/Pages/Builder.tsx";
import React from "react";
import Account from "@/Pages/Account.tsx";

const Routing: React.FunctionComponent = (): React.ReactElement => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path={`/account`} element={<Account/>}/>
                <Route path="/builder" element={<Builder/>}/>
            </Routes>
        </Router>
    )
}
export default Routing;