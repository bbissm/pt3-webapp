const data = {};

export const store = {
    setUser: function(user) {
        console.log('Set user in store');
        data.user = user;
    },
    getUser: function() {
        console.log('Get user from store');
        return data.user;
    },
    clear: function() {
        console.log('Clear store');
        Object.keys(data).forEach(key => delete data[key]);
    }
};
