// var util = require('util'),
//     ImapConnection = require('imap');
//
// var imap = new ImapConnection({
//     // user: "contratos@cubanacan.tur.cu",
//     // password: "Cubanacan123",
//     // host: "10.104.190.5", //this may differ if you are using some other mail services like yahoo
//     // port: 993,
//     // tls: true,
//     username: 'contratos@cubanacan.tur.cu',
//     password: 'Cubanacan123',
//     host: 'correo.cubanacan.tur.cu',
//     port: 993,
//     secure: true,
//     // tlsOptions : {
//     //
//     // }
// });
//
// function show(obj) {
//     return util.inspect(obj, false, Infinity);
// }
//
// function die(err) {
//     console.log('Uh oh: ' + err);
//     process.exit(1);
// }
//
// function openInbox(cb) {
//     imap.connect(function(err) {
//         if (err) die(err);
//         imap.openBox('INBOX', false, cb);
//     });
// }
//
// openInbox(function(err, mailbox) {
//     if (err) die(err);
//     imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2018'] ], function(err, results) {
//         if (err) die(err);
//         var fetch = imap.fetch(results, {
//             request: {
//                 headers: ['from', 'to', 'subject', 'date']
//             }
//         });
//         fetch.on('message', function(msg) {
//             console.log('Got a message with sequence number ' + msg.seqno);
//             msg.on('end', function() {
//                 // msg.headers is now an object containing the requested headers ...
//                 console.log('Finished message. Headers ' + show(msg.headers));
//             });
//         });
//         fetch.on('end', function() {
//             console.log('Done fetching all messages!');
//             imap.logout();
//         });
//     });
// });
var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
    user: 'contratos@cubanacan.tur.cu',
    password: 'Cubanacan123',
    host: '10.104.190.5',
    port: 993,
    tls: true,
    tlsOptions : {
        rejectUnauthorized: false
    }
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch('1:3', {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true
        });
        f.on('message', function(msg, seqno) {
            console.log('Message #%d', seqno);
            var prefix = '(#' + seqno + ') ';
            msg.on('body', function(stream, info) {
                var buffer = '';
                stream.on('data', function(chunk) {
                    buffer += chunk.toString('utf8');
                });
                stream.once('end', function() {
                    console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                });
            });
            msg.once('attributes', function(attrs) {
                console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
            });
            msg.once('end', function() {
                console.log(prefix + 'Finished');
            });
        });
        f.once('error', function(err) {
            console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
            console.log('Done fetching all messages!');
            imap.end();
        });
    });
});

imap.once('error', function(err) {
    console.log(err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

imap.connect();