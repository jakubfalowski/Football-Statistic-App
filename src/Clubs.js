import React from "react";

export default class Flashscore extends React.Component{
    render(){
    return(
        <div><a href={"/flashscore/"+this.props.clubID}>{this.props.clubName}</a></div>
    )
    }
}
