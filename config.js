exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://dafear:sidney12@ds139480.mlab.com:39480/showtime-api';
                    

          
            exports.PORT = process.env.PORT || 8080;

