import React, {Component} from 'react';
import Paging from './subcomponents/Paging';
import browser_request from 'browser-request';
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);
import moment from 'moment';
import RightSide from "./subcomponents/RightSide";
import JSExt from '../modules/js_extend';

class ListIssues extends Component {

    constructor(props) {

        super(props);

        this.buildIssuesHTML = this.buildIssuesHTML.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.getIssues = this.getIssues.bind(this);
        this.getLastPageFromLink = this.getLastPageFromLink.bind(this);

        this.state = {
            issues: [],
            currentPage: 1,
            pagesCount: 1,
            perPage: 3,
            issuesClosed: 0,
            issuesOpened: 0
        };

        this.moment = moment;

        this.jsExt = new JSExt();

    }


    issuesResponse(error, response, body) {

        if (error) {
            throw error;
        } else {

            this.setState({
                issues: JSON.parse(body)
            });

        }

    }


    getLastPageFromLink(link) {

        let temp = link.split('rel="next", ')[1];
        temp = temp.match(/&page=[\d]{1,}/g);
        if (/^&page/.test(temp)) {
            return temp[0].split('=')[1];
        }
        return false;
    }


    componentWillMount() {

        let self = this;

        browser_request({
            method: 'GET',
            url: `/header/user/issues?filter=all&state=all&page=${this.state.currentPage}&per_page=${this.state.perPage}`
        }, (error, response, body) => {
            if (error) {
                throw error;
            } else {
                body = JSON.parse(body);
                if (!!body.Link) {
                    let last_page = self.getLastPageFromLink(body.Link);
                    if (last_page !== false) {
                        self.setState({
                            pagesCount: last_page
                        });
                    }
                }
                if (!!self.props.match && !!self.props.match.params.issue_page) {
                    self.setState({
                        currentPage: self.props.match.params.issue_page
                    });
                }
                self.getIssues();
            }
        });

        browser_request({
            method: 'GET',
            url: `/header/user/issues?filter=all&state=close&per_page=1`
        }, (error, response, body) => {
            if (error) {
                throw error;
            } else {
                body = JSON.parse(body);
                if (!!body.Link) {
                    this.setState({
                        issuesClosed: self.getLastPageFromLink(body.Link)
                    });
                }

            }

        });

        browser_request({
            method: 'GET',
            url: `/header/user/issues?filter=all&state=open&per_page=1`
        }, (error, response, body) => {
            if (error) {
                throw error;
            } else {
                body = JSON.parse(body);
                if (!!body.Link) {
                    this.setState({
                        issuesOpened: self.getLastPageFromLink(body.Link)
                    });
                }

            }

        });

    }


    getIssues() {

        browser_request({
            method: 'GET',
            url: `/proxy/user/issues?filter=all&state=all&page=${this.state.currentPage}&per_page=${this.state.perPage}`
        }, this.issuesResponse.bind(this));

    }


    componentDidMount() {


    }

    onPageChange(event) {
        let target = event.target;
        let page_num = target.dataset.page_num;
        this.setState({
            currentPage: page_num
        }, () => {
            this.getIssues();
            event.click();
        });

    }


    buildIssuesHTML(issues) {

        let getLabelsHTML = (labels) => {
            let ar_html = [];
            let in_style = {};
            for (let index = 0; index < labels.length; index++) {
                in_style = {
                    backgroundColor: `#${labels[index].color}`
                };
                ar_html.push(
                    <span key={index} className="info" style={in_style}>{labels[index].name}</span>
                );
            }
            return ar_html;
        };

        let getInfoAboutIssue = (issue) => {

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
                <p>#{issue.number} {state_text} {diff == 0 ? 'today by' : `${diff} ${dec.getWord(diff)} ago by`}
                    <a href={issue.user.html_url}> {issue.user.login}</a></p>
            );
        };

        let ar_html = [];

        for (let index = 0; index < issues.length; index++) {

            ar_html.push(
                (
                    <div key={index} className="col-md-12 col-sm-12 col-xs-12 tasks">
                        <div>
                            {issues[index].state == 'open' ?
                                <span className="glyphicon glyphicon-exclamation-sign"></span> :
                                <span className="glyphicon glyphicon-ok-circle"></span>}

                            <span className="glyphicon comment">&#8194;
                                <a href={issues[index].html_url}>{issues[index].comments}</a>
                            </span>

                            <h3>
                                <a href={issues[index].html_url} className="title">{issues[index].title}</a>
                                {getLabelsHTML(issues[index].labels)}
                            </h3>
                            {getInfoAboutIssue(issues[index])}


                        </div>
                    </div>
                )
            );

        }

        return ar_html;

    }


    render() {

        $(document).ready(function () {
            $(".left-block-task").mCustomScrollbar({
                theme: "minimal-dark"
            });
        });

        return (
            <article className="list-page">

                <div className="container-fluid main-content">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 left-block-task">

                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-6 task-open">
                                    <a href="#">
                                        <span className="glyphicon glyphicon-exclamation-sign"></span>
                                        {this.state.issuesOpened} Open
                                    </a>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 task-closed">
                                    <a href="#">
                                        <span className="glyphicon glyphicon-ok-circle"></span>
                                        {this.state.issuesClosed} Closed
                                    </a>
                                </div>
                            </div>

                            <div className="row list-tasks">

                                {this.buildIssuesHTML(this.state.issues)}

                            </div>

                            <Paging currentCount="8"
                                    onPageChange={this.onPageChange}
                                    currPage={this.state.currentPage}
                                    pagesCount={this.state.pagesCount}
                                    navChainLength="8"
                            />

                        </div>
                        <RightSide />
                    </div>
                </div>
            </article>
        );
    }
}

export default ListIssues;