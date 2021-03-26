import React from 'react';
import './style.css';

export default class SortBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
    };
  }

  toggleDropdown = () =>
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });

  render() {
    const { isDropdownOpen } = this.state;
    const { currentSortOption, sortOptions } = this.props;

    const menuClass = `dropdown-menu${isDropdownOpen ? ' show' : ''}`;

    return (
      <div className="row my-5">
        <div className="col-7 offset-9">
          <div class="dropdown" onClick={this.toggleDropdown}>
            <button
              className="btn btn-danger dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              {currentSortOption}
            </button>
            <div
              className={menuClass}
              aria-labelledby="dropdownMenuButton"
            >
              {Object.values(sortOptions).map((value, index) => (
                <a
                  className="dropdown-item"
                  href="#nogo"
                  key={index}
                  onClick={() => this.props.updateSortOption(value)}
                >
                  {value}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
