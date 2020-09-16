export const StorageConfig = {

    photo: {
        destination: '../storage/photos/',
        urlPrefix: '/assets/photos',
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
        maxSize: 1024 * 1024 * 3, //3MB in bytes
        resize: {
            thumb: {
                width: 120, 
                height: 100,
                directory: 'thumb/'
            },
            small: {
                width: 320, 
                height: 240,
                directory: 'small/'
            }
        }
    }
};