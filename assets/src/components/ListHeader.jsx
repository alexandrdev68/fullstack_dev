import React, {Component} from 'react';
import logo from '../img/testio2.png';
import logout from '../img/ico-logout.png';


class ListHeader extends Component {

    constructor(props) {

        super(props);

    }

    render(){

        return(
            <header className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6"><img className="logo" src={logo}/></div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <a href="/logout" className="logout"><img src={logout}/>
                            Logout</a></div>
                </div>
            </header>
        );
    }
}

export default ListHeader;