import { useState } from "react";
import { orderObjectsService } from 'services/global/order-objects';
import { sortOptions } from 'constants/constants';


export const SortBar = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState('');

    toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const { currentSortOption } = props;

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
                                onClick={() => orderObjectsService(value)}
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