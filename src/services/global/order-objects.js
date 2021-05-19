import { sortOptions } from 'constants/constants'

export const orderObjectsService = (objArray, sortOrder = sortOptions.TITLE_ASCENDING) => {

    let isAlphabeticSort = sortOrder === sortOptions.TITLE_ASCENDING || sortOrder === sortOptions.TITLE_DESCENDING
    let isAddedDateSort = sortOrder === sortOptions.ORDER_ADDED

    if (isAlphabeticSort) {
        if (sortOrder === sortOptions.TITLE_ASCENDING) {
            //return books sorted alphabetically by title A-Z
            objArray.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
        } else if (sortOrder === sortOptions.TITLE_DESCENDING) {
            //return books sorted alphabetically by title Z-A
            objArray.sort(function (a, b) {
                return b.title.localeCompare(a.title);
            });
        }

    } else if (isAddedDateSort) {
        //return books ordered by added date
        objArray.sort(function (a, b) {
            return b.dateAdded - a.dateAdded;
        });
    }
    return objArray;
}