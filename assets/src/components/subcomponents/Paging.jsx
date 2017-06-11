import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Paging extends Component {

    constructor(props) {

        super(props);

        this.drop_down_id = `PagingDropDown${Math.floor((Math.random() * 999999999) + 1)}`;

        this.getCountItems = this.getCountItems.bind(this);
        this.getNavChain = this.getNavChain.bind(this);
    }


    getCountItems() {

        let count_items = [];

        for (let index = 0; index < this.props.countItems.length; index++) {
            count_items.push(
                <Link key={index}
                      data-items_count={this.props.countItems[index].value}
                      to={`/${this.props.countItems[index].value}/1`}
                      className="w3-bar-item w3-white w3-button">{this.props.countItems[index].value}</Link>
            );
        }

        return count_items;

    }


    getNavChain() {
        let navArr = [];
        let navHTML = [];
        let declineStr = 'pred,next,all,first,last';

        navArr = this.build_page(this.props.currPage, this.props.pagesCount, this.props.navChainLength);

        navHTML.push(
            <li key="prev">
                <Link
                      data-page_num={navArr[0] == 'pred' ? navArr['current'] - 1 : '-1'}
                      to={`/${navArr[0] == 'pred' ? navArr['current'] - 1 : navArr['current']}`}
                      >Previous
                </Link>
            </li>
        );

        for (let index = 0; index < navArr.length; index++) {
            if (declineStr.indexOf(navArr[index]) == -1) {
                if (navArr[index] == 'curr') {
                    navHTML.push(<li key={index} className="active"><Link to="/#" >{navArr['current']}</Link></li>);
                } else if (navArr[index] !== undefined) {
                    navHTML.push(
                        <li key={index} className="">
                            <Link
                                  data-page_num={navArr[index]}
                                  to={`/${navArr[index]}`}>
                                {navArr[index]}
                            </Link>
                        </li>);
                }

            } else if (navArr[index] == 'first' || navArr[index] == 'last') {
                navHTML.push(<li key={navArr[index]}><span >...</span></li>);
            }
        }
        navHTML.push(
            <li key='next'>
                <Link
                      data-page_num={navArr['current'] >= this.props.pagesCount ? '-1' : navArr['current'] + 1}
                      to={`/${navArr['current'] >= this.props.pagesCount ? navArr['current'] : navArr['current'] + 1}`}
                      >
                    Next
                </Link>
            </li>
        );

        return navHTML

    }


    render() {

        return (


            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 list-page">
                    <nav aria-label="Page navigation">
                        <ul onClick={this.props.onPageChange} className="pagination">

                            {this.getNavChain()}

                        </ul>
                    </nav>
                </div>
            </div>

        );
    }


    build_page(curr_page, pages, len) {
        let index;
        let val;
        let result = [];
        curr_page = parseInt(curr_page);
        pages = parseInt(pages);
        len = parseInt(len);
        //длинна цепочки не может быть меньше 6
        if (len < 6) return false;
        if (pages <= len) {
            index = 0;
            if (curr_page > 1) {
                result[index] = 'pred';
                index++;
            }
            for (let c = 1; c <= pages; c++) {
                if (c == curr_page) {
                    result[index] = 'curr';
                    index++;
                } else {
                    result[index] = c;
                    index++;
                }
            }
            if (curr_page < pages) {
                result[index] = 'next';
                index++;
            }
            index++;
            result[index] = "all";
        } else if (pages > len) {
            index = 0;
            val = 1;
            if (curr_page > 1) {
                result[index] = 'pred';
                index++;
            }
            if (curr_page == val) {
                result[index] = "curr";
                index++;
                val++;
            }
            result[index] = val;
            index++;
            val++;
            if (curr_page <= Math.ceil((len - 1) / 2)) {
                //текущая страница в первой половине видимости
                for (let c = 1; c <= (len - 2); c++) {
                    if (curr_page == val) {
                        result[index] = "curr";
                        index++;
                        val++;
                    }
                    result[index] = val;
                    index++;
                    val++;
                }
                result[index] = "last";
                index++;
                result[index] = pages;
                index++;
                if (curr_page < pages) result[index] = "next";
                index++;
                result[index] = "all";
                result['current'] = curr_page;
                return result;

            } else {
                //текущая страница за пределами видимости
                result[index] = "first";
                index++;
                val = pages - (len + 1);
                if ((curr_page + Math.ceil((len - 1) / 2)) > pages) {
                    for (let c1 = val; c1 < pages; c1++) {
                        if (curr_page == val) {
                            result[index] = "curr";
                            index++;
                            val++;
                        }
                        result[index] = val;
                        index++;
                        val++;
                        if (curr_page < pages) result[index] = "next"; else result[index] = "curr";
                    }
                } else {
                    val = curr_page - (len - 4) / 2;
                    for (let c = 1; c <= (len - 4); c++) {
                        if (curr_page == val) {
                            result[index] = "curr";
                            index++;
                            val++;
                        }
                        result[index] = val;
                        index++;
                        val++;
                    }
                    result[index] = "last";
                    index++;
                    result[index] = pages;
                    index++;
                    if (curr_page < pages) result[index] = "next";
                }
            }
        }
        index++;
        result[index] = 'all';
        result['current'] = curr_page;
        return result;
    }


    ddMnClick() {
        let x = document.getElementById(this.drop_down_id);
        x.className += " w3-show";


        let ddRemoveOnClick = () => {
            x.className = x.className.replace(" w3-show", "");
            setTimeout(() => {
                document.removeEventListener('click', ddRemoveOnClick);
            }, 10);
        };

        document.addEventListener('click', ddRemoveOnClick, false);
    }

}

export default Paging;