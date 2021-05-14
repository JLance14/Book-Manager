import { useState } from "react";
import { sortOptions } from 'constants/constants';


export const SortBar = (props) => {

    const { currentSortOption, updateSortOption, sortBooks } = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const menuClass = `dropdown-menu${isDropdownOpen ? ' show' : ''}`;

    let toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    let onClick = (value) => {
        updateSortOption(value);
        sortBooks(value)
    }

    return (
        <div className="row my-5">
            <div className="col-7 offset-9">
                <div class="dropdown" onClick={toggleDropdown}>
                    <button
                        className="btn btn-danger dropdown-toggle dropdownMenuButton"
                        type="button"
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
                                onClick={() => onClick(value)}
                            >
                                {value}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortBar;