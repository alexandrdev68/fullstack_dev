import React, {Component} from 'react';
import Helmet from 'react-helmet';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import OAuth from '../components/OAuth';
import logo from '../img/testio.png';

class MainPage extends Component {

    render() {

        return (
            <div>
                <Helmet
                    title='Auth page'
                    meta={[
                        {'name': 'description', 'content': 'authorization'},
                        {'charset': 'UTF-8'}
                    ]}
                />
                <article className="main-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div
                                className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1   blc-logo">
                                <img className="logo" src={logo}/>
                            </div>
                            <OAuth />
                        </div>
                    </div>
                </article>
            </div>
        );
    }

}

export default MainPage;

