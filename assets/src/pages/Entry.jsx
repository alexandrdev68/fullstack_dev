import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ListHeader from '../components/ListHeader';
import ListEntryes from '../components/ListEntryes';

class EntryPage extends Component{

    constructor(props){

        super(props);

    }

    render(){

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
                <ListEntryes {...this.props}/>
            </div>
        );
    }
}

export default EntryPage;