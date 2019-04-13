import React from "react";

export const Heart = ({
    style = {},
    width = "100%",
    height = "auto",
    className = "",
    viewBox = "0 0 950 831.25",
    fill = "#393939"
}) => {
    return (
        <svg
            id="Layer_1"
            className={`svg-icon ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            style={style}
        >
            <path
                fill={fill}
                d="M475 831.25S0 593.75 0 296.87C0 118.75 87.56 0 237.5 0 356.25 0 475 118.75 475 118.75S593.75 0 712.5 0C863.63 0 950 118.75 950 296.88c0 296.87-475 534.37-475 534.37z"
            />
        </svg>
    );
};
