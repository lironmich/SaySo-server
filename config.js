module.exports = {
  "db": {
        "mongodb": "mongodb://razawi:aq12345@ds039960.mongolab.com:39960/bookstore",
		"shell": "mongo ds039960.mongolab.com:39960/bookstore -u razawi -p aq12345"
    },
    "logger": {
        "api": "logs/api.log",
        "exception": "logs/exceptions.log"
    }
};