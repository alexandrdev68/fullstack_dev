/**
 * Created by sasha on 31.05.17.
 */
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../css/jquery.mCustomScrollbar.css';
import ListHeader from '../components/ListHeader';
import ListIssues from '../components/ListIssues';

class ListPage extends Component {

    constructor(props) {

        super(props);

    }


    render() {

        return (
            <div>
                <Helmet
                    title='Issues list'
                    meta={[
                        {'name': 'description', 'content': 'list page'},
                        {'charset': 'UTF-8'}
                    ]}
                />
                <ListHeader />
                <ListIssues />
            </div>

        );
    }

}

export default ListPage;