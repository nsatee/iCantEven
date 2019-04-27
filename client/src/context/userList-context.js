import React from 'react';

export default React.createContext({
    userList: [],
    login: (userList) => {},
})