/**
 * Created by sasha on 31.05.17.
 */
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import logo from '../img/testio2.png';
import logout from '../img/ico-logout.png';
import right_logo from '../img/testio.png';
import '../css/jquery.mCustomScrollbar.css';
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

class ListPage extends Component {

    render() {

        $(document).ready(function () {
            $(".left-block-task").mCustomScrollbar({
                theme: "minimal-dark"
            });
        });

        return (
            <div>
                <Helmet
                    title='Issues list'
                    meta={[
                        {'name': 'description', 'content': 'list page'},
                        {'charset': 'UTF-8'}
                    ]}
                />
                <header className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-6"><img className="logo" src={logo}/></div>
                        <div className="col-md-6 col-sm-6 col-xs-6"><a href="#" className="logout"><img src={logout}/>
                            Logout</a></div>
                    </div>
                </header>

                <article className="list-page">

                    <div className="container-fluid main-content">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12 left-block-task">

                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-6 task-open">
                                        <a href="#">
                                            <span className="glyphicon glyphicon-exclamation-sign"></span> 4220 Open
                                        </a>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 task-closed">
                                        <a href="#">
                                            <span className="glyphicon glyphicon-ok-circle"></span> 4220 Closed
                                        </a>
                                    </div>
                                </div>

                                <div className="row list-tasks">

                                    <div className="col-md-12 col-sm-12 col-xs-12 tasks">
                                        <div>
                                            <span className="glyphicon glyphicon-exclamation-sign"></span>
                                            <span className="glyphicon comment">&#8194;<a href="#">23</a></span>

                                            <h3>
                                                <a href="#" className="title">[RE] fsdfdf qweqwe qweqwe qweq we
                                                    qweqweqwe qw eqweqeqwe qweqweqwe qweqweq qwe qweqwe qweqwewqe</a>
                                                <span className="info orange">RFC</span>
                                                <span className="info hide red">Bug</span>
                                                <span className="info black">Unconfirmed</span>
                                            </h3>
                                            <p>#50252 opened 3 days ago by
                                                <a href="#"> Big Boss</a>
                                            </p>

                                        </div>
                                    </div>

                                    <div className="col-md-12 col-sm-12 col-xs-12 tasks">
                                        <div>
                                            <span className="glyphicon glyphicon-exclamation-sign"></span>
                                            <span className="glyphicon comment">&#8194;<a href="#">33</a></span>

                                            <h3>
                                                <a href="#" className="title">[RE] fsdfdf qweqwe qweqwe qweq we
                                                    qweqweqwe qw eqweqeqwe qweqweqwe qweqweq qwe qweqwe qweqwewqe</a>
                                                <span className="info orange">RFC</span>
                                                <span className="info  red">Bug</span>
                                                <span className="info hide black">Unconfirmed</span>
                                            </h3>
                                            <p>#50252 opened 3 days ago by
                                                <a href="#"> Big Boss</a>
                                            </p>

                                        </div>
                                    </div>

                                    <div className="col-md-12 col-sm-12 col-xs-12 tasks">
                                        <div>
                                            <span className="glyphicon glyphicon-exclamation-sign"></span>
                                            <span className="glyphicon comment">&#8194;<a href="#">3</a></span>

                                            <h3>
                                                <a href="#" className="title">[RE] fsdfdf qweqwe qweqwe qweq we
                                                    qweqwewqe</a>
                                                <span className="info orange">RFC</span>
                                                <span className="info red">Bug</span>
                                                <span className="info black">Unconfirmed</span>
                                            </h3>
                                            <p>#50252 opened 3 days ago by
                                                <a href="#"> Big Boss</a>
                                            </p>

                                        </div>
                                    </div>


                                </div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12 list-page">

                                        <nav aria-label="Page navigation">
                                            <ul className="pagination">

                                                <li><a className="prev" href="#">Previous</a></li>

                                                <li><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li className="active"><a href="#">5</a></li>

                                                <li className="disabled"><a className="next" href="#">Next</a></li>

                                            </ul>
                                        </nav>

                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 hidden-sm hidden-xs right-block-task">
                                <div className="text">
                                    <h3>Full Stack Developer Task</h3>
                                    <p>by <img src={right_logo}/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

        );
    }

}

export default ListPage;