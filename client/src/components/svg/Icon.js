import React from "react";
import { Heart } from "./components/Heart";
import { Feed } from "./components/Feed";

const Icon = props => {
    switch (props.name) {
        case "heart":
            return <Heart {...props}/>
        case "feed":
            return <Feed {...props}/>
        default:
            return <div />;
    }
};
export default Icon;
