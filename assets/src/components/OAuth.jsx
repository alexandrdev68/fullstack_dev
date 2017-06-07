import React, {Component} from 'react';


class OAuth extends Component{

    constructor(props){

        super(props);

        this.sendOAuth = this.sendOAuth.bind(this);
    }


    sendOAuth(){

        window.location.href = 'http://github.com/login/oauth/authorize' + 
            `?client_id=${process.env.ClientID}`+
            `&redirect_uri=${process.env.Redirect_uri}` + 
            `&scope=user%20public_repo`

    }


    render(){

        return (
            <div
                className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1   blc-btn">
                <button className="btn btn-login"
                        onClick={this.sendOAuth}>
                    Login With GitHub
                </button>
            </div>
        );
    }
}

export default OAuth;