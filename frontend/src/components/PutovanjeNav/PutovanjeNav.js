import React from "react";
import * as ReactNavbar from "react-responsive-animate-navbar";

const PutovanjeNav = () => {
    return (
        <ReactNavbar.ReactNavbar
            color="rgb(25,25,25)"
            logo="./logo.svg"
            menu={[]}
            social={[
                {
                    name: "Twitter",
                    url: "https://twitter.com/pramit_armpit",
                    icon: ["fab", "twitter"],
                },
            ]}
        />
    );
};

export default PutovanjeNav;