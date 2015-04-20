mrApp.provider('Token', function() {

    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRvbnlsZWZsLmVyQGdtYWlsLmNvbSIsImlhdCI6MTQyOTM2NDg2M30.fCsgsv29mv_Q9AOWIKRoD_NXafboCH2VnGctGA9MrpE';

    return {
        setToken: function (value) {
            token = value;
        },
        getTokentime: function() {
            
        },
        $get: function () {
            return {
                token: token
            };
        }
    };
});
