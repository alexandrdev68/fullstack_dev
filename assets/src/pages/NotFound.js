/**
 * Created by sasha on 22.03.17.
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFound extends Component {

    render (){

        return (
            <div>
                <Helmet
                    title='Page is not found'
                    meta={[
                        { 'name': 'description', 'content': '404 Not found' },
                        { 'charset' : 'UTF-8' }
                    ]}
                />
                <h2>404 Not Found</h2>
            </div>
        )

    }

}

export default NotFound;