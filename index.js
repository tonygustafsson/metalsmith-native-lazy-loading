var debug = require('debug')('metalsmith:nativeLazyLoading');
var multimatch = require('multimatch');

module.exports = plugin;

function plugin(opts) {
    opts.pattern = opts.pattern || '**/*.html';

    var totalImagesFixed = 0;
    var imageRegex = /<img(.*?)>/g;

    return function (files, metalsmith, done) {
        setImmediate(done);

        Object.keys(files).forEach(function (file) {
            if (multimatch(file, opts.pattern).length) {
                var data = files[file];

                if (!data.contents) {
                    return;
                }

                var html = data.contents.toString();

                debug('nativeLazyLoading working on: %s', file);

                var imagesFound = html.match(imageRegex);

                if (imagesFound) {
                    var newContent = html.replace(imageRegex, '<img $1 loading="lazy" />');
                    data.contents = Buffer.from(newContent);

                    totalImagesFixed += imagesFound.length;
                }
            }
        });

        debug('nativeLazyLoading done. Fixed a total of ' + totalImagesFixed + ' images.');
        done();
    };
}
