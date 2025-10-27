config.devServer = {
    ...config.devServer,
    static: {
        directory: require('path').join(__dirname, '../python'),
    },
};
