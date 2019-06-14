import React from 'react';
import {connect} from 'react-redux';
import {getOffers} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/data/data';

const witchSortingOption = (Component) => {
  class WitchSortingOption extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpenMenu: false,
      };

      this._changeStatus = this._changeStatus.bind(this);
      this._onSorting = this._onSorting.bind(this);
    }

    _onSorting(option) {
      const {allOffers, sorting} = this.props;
      console.log(allOffers)
      switch (option) {
        case `highCost`:
          sorting([...allOffers].sort((a, b) => {
            return b.price - a.price;
          }));
          break;
        case `lowCost`:
          sorting([...allOffers].sort((a, b) => {
            return a.price - b.price;
          }));
          break;
        case `rainting`:
          sorting([...allOffers].sort((a, b) => {
            return b.rating - a.rating;
          }));
          break;
      }
    }

    _changeStatus() {
      this.setState({
        isOpenMenu: !this.state.isOpenMenu
      });
    }


    render() {
      return <Component
        sorting={this._onSorting}
        statusMenu={this.state.isOpenMenu}
        changeMenu={this._changeStatus}
        {...this.props}/>;
    }

  }
  const mapStateToProps = (state) => ({
    allOffers: getOffers(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    sorting: (offers) => dispatch(ActionCreator.loadOffers(offers)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WitchSortingOption);
};

export default witchSortingOption;
