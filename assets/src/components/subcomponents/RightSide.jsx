import React, {Component} from 'react';
import right_logo from '../../img/testio.png';

class RightSide extends Component {


    render(){

        return(
            <div className="col-md-6 hidden-sm hidden-xs right-block-task">
                <div className="text">
                    <h3>Full Stack Developer Task</h3>
                    <p>by <img src={right_logo}/></p>
                </div>
            </div>
        );
    }
}

export default RightSide;