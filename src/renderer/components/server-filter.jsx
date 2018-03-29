import React, { Component } from 'react';
import PropTypes from 'proptypes';
import debounce from 'lodash.debounce';


export default class ServerFilter extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.delayedCallback = debounce(this.props.onFilterChange, 200);
  }

  onFilterChange (event) {
    event.persist();
    this.delayedCallback(event);
  }

  render () {
    return (
      <div className="ui small action left icon input fluid"
        style={{ marginBottom: '1em', fontSize: '0.8em' }}>
        <i className="search icon"></i>
        <input type="text" placeholder="Search..." onChange={this.onFilterChange.bind(this)} />
        <button className="ui button green" onClick={this.props.onAddClick.bind(this)}>Add</button>
        <button className="ui button" onClick={this.props.onSettingsClick.bind(this)}>Settings</button>
      </div>
    );
  }
}
