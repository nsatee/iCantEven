import React from "react";
import { Heart } from "./components/Heart";

const Icon = props => {
    switch (props.name) {
        case "heart":
            return <Heart {...props}/>
        default:
            return <div />;
    }
};
export default Icon;
