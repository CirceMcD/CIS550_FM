import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Tabs} from 'antd';
import RankTable from './RankTable';

export class RiskMax extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-climate-resilience-score">
        <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Most at Risk People per County" key="1">
          {this.props.home.mostRiskPeoplePerCountryResults? <RankTable data={this.props.home.mostRiskPeoplePerCountryResults}/>: null}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Climate Risk in Most Dense Counties" key="2">
        {this.props.home.climateRiskInMostDenseCountiesResults? <RankTable data={this.props.home.climateRiskInMostDenseCountiesResults}/>: null}
        </Tabs.TabPane>
      </Tabs>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiskMax);
