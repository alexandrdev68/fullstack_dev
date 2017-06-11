import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import browser_request from 'browser-request';
import JSExt from '../modules/js_extend';

class ListEntryes extends Component {

    constructor(props) {

        super(props);

        this.getComments = this.getComments.bind(this);
        this.getEntryBottomText = this.getEntryBottomText.bind(this);
        this.getCommentsView = this.getCommentsView.bind(this);

        this.state = {
            entry_id: this.props.match.params.id,
            entry: {},
            comments: []
        };

        this.moment = moment;

        this.jsExt = new JSExt();

    }


    entryResponse(error, response, body) {

        let self = this;
        if (error) {
            throw error;
        } else {

            this.setState({
                entry: JSON.parse(body)
            }, () => {
                if (self.state.entry.comments > 0) {
                    self.getComments();
                }
            });

        }
    }


    getComments() {

        let path = this.state.entry.comments_url.split('https://api.github.com/').join('');
        browser_request({
            method: 'GET',
            url: `/proxy/${path}`
        }, (error, response, body) => {

            if (error) {
                throw error;
            } else {
                this.setState({
                    comments: JSON.parse(body)
                });
            }

        });

    }


    componentDidMount() {
        let path = window.location.search.split('?url=').join('');
        browser_request({
            method: 'GET',
            url: `/proxy/${path}`
        }, this.entryResponse.bind(this));

    }


    getEntryBottomText() {

        let getInfoAboutIssue = (issue) => {

            if (issue.state === undefined) {
                return '';
            }
            this.moment().format();

            let now = this.moment();
            let state_text = '';
            let created = '';
            if (issue.state == 'open') {
                state_text = 'opened';
                created = this.moment(issue.created_at);
            } else if (issue.state == 'closed') {
                state_text = 'closed';
                created = this.moment(issue.closed_at);
            }

            let diff = now.diff(created, 'days');
            let dec = new this.jsExt.Declense({
                declensions: {
                    0: 'days',
                    1: 'day',
                    2: 'days',
                    3: 'days',
                    4: 'days'
                }
            });

            return (
                <p>
                    <span className="btn btn-default">
                        <span className="glyphicon glyphicon-exclamation-sign">&nbsp;</span> {state_text}</span>
                    <a href="#">{issue.user.login}</a> {state_text} this issue {diff == 0 ? 'today by' :
                    `${diff} ${dec.getWord(diff)} ago`} - {issue.comments} comment
                </p>


            );
        };

        return getInfoAboutIssue(this.state.entry);
    }


    getCommentsView(){

        let comments_view = [];
        let now = this.moment();
        let created;
        let diff;

        for(let index = 0; index < this.state.comments.length; index++){

            created = this.moment(this.state.comments[index].updated_at);
            diff = now.diff(created, 'days');

            comments_view.push(
                (
                    <div key={index} className="col-md-12 col-sm-12 col-xs-12 comment-task">

                        <div className="img-user hidden-xs">
                            <img src={this.state.comments[index].user.avatar_url}/>
                        </div>
                        <div className="body-comment ">
                            <div className="data-comment arrow_box">
                                <a href="#">{this.state.comments[index].user.login}</a>&nbsp;
                                 commented {diff} days ago
                            </div>
                            <div className="text-comment">
                                {this.state.comments[index].body}
                            </div>
                        </div>

                    </div>
                )
            );

        }

        return comments_view;
    }


    render() {

        return (
            <article className="entry-page">

                <div className="container-fluid main-content">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">

                                    <ol className="breadcrumb">
                                        <li>
                                            <Link to="/">
                                                <span className="glyphicon glyphicon-arrow-left"></span>
                                                Back to issues
                                            </Link>
                                        </li>
                                    </ol>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12 name-task">
                                            <h1>{this.state.entry.title} <span>#{this.state.entry_id}</span></h1>

                                            {this.getEntryBottomText()}


                                        </div>

                                        {this.getCommentsView()}

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </article>

        );
    }
}

export default ListEntryes;