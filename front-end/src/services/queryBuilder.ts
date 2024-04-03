export const queryBuilder = (att: any) => {
    let queryString = `?`;

    if (att.sort && att.sortType) {
        queryString += `sort=${att.sort}&sortType=${att.sortType}`;
    }

    if (att.skip) {
        queryString += "&skip=" + (att.page - 1) * att.limit;
    }

    if (att.limit) {
        queryString += "&limit=" + att.limit;
    }

    if (att.searchText) {
        queryString += "&search=" + att.searchText;
    }

    if (att.userId) {
        queryString += "&userId=" + att.userId;
    }

    return queryString;
};