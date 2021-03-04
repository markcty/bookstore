import React from "react";
import {Carousel} from "antd";

class Banner extends React.Component {
    render() {
        const contentStyle = {
            color: '#fff',
            textAlign: 'center',
            background: '#364d79',
            paddingTop: '150%'
        };
        return (
            <Carousel autoplay>
                <div>
                    <div style={contentStyle}/>
                </div>
                <div>
                    <div style={contentStyle}/>
                </div>
                <div>
                    <div style={contentStyle}/>
                </div>
                <div>
                    <div style={contentStyle}/>
                </div>
            </Carousel>
        )
    }
}

export default Banner;