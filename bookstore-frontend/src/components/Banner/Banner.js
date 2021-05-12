import React from "react";
import { Carousel } from "antd";
import poster1 from "./poster1.jpg";
import poster2 from "./poster2.jpeg";
import "./index.css";

export default function Banner() {
    return (
        <Carousel autoplay>
            <div className={"posterContainer"}>
                <img className={"poster"} src={poster1} alt={" "} />
            </div>
            <div className={"posterContainer"}>
                <img className={"poster"} src={poster2} alt={" "} />
            </div>
        </Carousel>
    )
}