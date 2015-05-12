var mandrill = require('mandrill-api/mandrill')
    , mandrillToken = 'FRKHkLf05PO6PeZNxqZ4xg'
    , mandrillClient = new mandrill.Mandrill(mandrillToken)
    , info = {
        fromName: 'Mission Return',
        fromEmail: 'no-reply@missionreturn.com',
        toType: 'to'
    };

var mailer = {
    authorizeAccount: function(email, authToken) {

        var message = {
            "html": '<div>\n    <img src="logo.png">\n    <h2>Authorize your Account</h2>\n    <p>\n        Thank you for signing up for Mission Return.\n        Please authorize your account by following this link:\n    </p>\n    <a style="font-size: 1.2em; font-weight: 700;" href="http://localhost:5555/authorize/'+ authToken +'">missionreturn.com/authorize/'+ authToken +'</a>\n    <br>\n    <h3>-The Mission Return Team</h3>\n</div>',
            "text": "Authorize your Account",
            "subject": "example subject",
            "from_email": info.fromEmail,
            "from_name": info.fromName,
            "to": [{
                "email": email,
                "type": info.toType
            }]
        };
        mandrillClient.messages.send({"message": message}, function(result) {

        }, function(e) {
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }
};

module.exports.mailer = mailer;