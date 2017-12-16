/*
* @Author: Rosen
* @Date:   2016-11-06 12:39:33
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-15 21:14:25
*/
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link} from 'react-router';
import PageTitle    from 'component/page-title/index.jsx';
import './index.scss';
const Home = React.createClass({
    getInitialState() {
        return {
            hello: 'Welcome'
        };
    },
    componentDidMount() {
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Home"/>
                <div className="row-fluid">
                    <div className="span3 statbox purple">
                        <div className="boxchart"><i className="fa fa-group"></i></div>
                        <div className="number">854<i className="glyphicon glyphicon-arrow-up"></i></div>
                        <div className="title">visits</div>
                        <div className="footer">
                            <Link to="/customer" activeClassName="active"> read full report</Link>
                        </div>
                    </div>
                    <div className="span3 statbox green">
                        <div className="boxchart"><i className="glyphicon glyphicon-list-alt"></i></div>
                        <div className="number">854<i className="glyphicon glyphicon-arrow-up"></i></div>
                        <div className="title">orders</div>
                        <div className="footer">
                            <Link to="/order" activeClassName="active"> read full report</Link>
                        </div>
                    </div>
                    <div className="span3 statbox blue">
                        <div className="boxchart"><i className="glyphicon glyphicon-home    "></i></div>
                        <div className="number">854<i className="glyphicon glyphicon-arrow-up"></i></div>
                        <div className="title">shops</div>
                        <div className="footer">
                            <Link to="/shop" activeClassName="active"> read full report</Link>
                        </div>
                    </div>
                    <div className="span3 statbox yellow">
                        <div className="boxchart"><i className="glyphicon glyphicon-film"></i></div>
                        <div className="number">854<i className="glyphicon glyphicon-arrow-up"></i></div>
                        <div className="title">advertisements</div>
                        <div className="footer">
                            <Link to="/ad" activeClassName="active"> read full report</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                          <section className="panel">
                              <header className="panel-heading">
                                 Top 10 Product
                              </header>
                              <div className="panel-body table-responsive">
                                  <table className="table table-hover">
                                      <thead>
                                      <tr>
                                          <th>#</th>
                                          <th>Project</th>
                                          <th>Manager</th>
                                          <th>Deadline</th>
                                          <th>Status</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                          <td>1</td>
                                          <td>Facebook</td>
                                          <td>Mark</td>
                                          <td>10/10/2014</td>
                                          <td><span className="label label-danger">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>2</td>
                                          <td>Twitter</td>
                                          <td>Evan</td>
                                          <td>10/8/2014</td>
                                          <td><span className="label label-success">completed</span></td>
                                      </tr>
                                      <tr>
                                          <td>3</td>
                                          <td>Google</td>
                                          <td>Larry</td>
                                          <td>10/12/2014</td>
                                          <td><span className="label label-warning">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>4</td>
                                          <td>LinkedIn</td>
                                          <td>Allen</td>
                                          <td>10/01/2015</td>
                                          <td><span className="label label-info">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>5</td>
                                          <td>Tumblr</td>
                                          <td>David</td>
                                          <td>01/11/2014</td>
                                          <td><span className="label label-warning">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>6</td>
                                          <td>Tesla</td>
                                          <td>Musk</td>
                                          <td>01/11/2014</td>
                                          <td><span className="label label-info">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>7</td>
                                          <td>Ghost</td>
                                          <td>XXX</td>
                                          <td>01/11/2014</td>
                                          <td><span className="label label-info">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>7</td>
                                          <td>Ghost</td>
                                          <td>XXX</td>
                                          <td>01/11/2014</td>
                                          <td><span className="label label-info">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>7</td>
                                          <td>Ghost</td>
                                          <td>XXX</td>
                                          <td>01/11/2014</td>
                                          <td><span className="label label-info">in progress</span></td>
                                      </tr>
                                      <tr>
                                          <td>7</td>
                                          <td>Ghost</td>
                                          <td>XXX</td>
                                          <td>01/11/2014</td>
                                          <td><span className="label label-info">in progress</span></td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </section>
                      </div>
                    <div className="col-md-6">
                        <section className="panel">
                            <header className="panel-heading">
                             Top 5 Stores
                            </header>
                            <div className="panel-body table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Project</th>
                                        <th>Manager</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Facebook</td>
                                        <td>Mark</td>
                                        <td>10/10/2014</td>
                                        <td><span className="label label-danger">in progress</span></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Twitter</td>
                                        <td>Evan</td>
                                        <td>10/8/2014</td>
                                        <td><span className="label label-success">completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Google</td>
                                        <td>Larry</td>
                                        <td>10/12/2014</td>
                                        <td><span className="label label-warning">in progress</span></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>LinkedIn</td>
                                        <td>Allen</td>
                                        <td>10/01/2015</td>
                                        <td><span className="label label-info">in progress</span></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Tumblr</td>
                                        <td>David</td>
                                        <td>01/11/2014</td>
                                        <td><span className="label label-warning">in progress</span></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Tesla</td>
                                        <td>Musk</td>
                                        <td>01/11/2014</td>
                                        <td><span className="label label-info">in progress</span></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Ghost</td>
                                        <td>XXX</td>
                                        <td>01/11/2014</td>
                                        <td><span className="label label-info">in progress</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
});

export default Home;
