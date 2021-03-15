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
                    totalImagesFixed += imagesFound.length;
                    var newContent = html.replace(imageRegex, '<img loading="lazy"$1 />');
                    data.contents = Buffer.from(newContent);
                }
            }
        });

        debug('nativeLazyLoading done. Fixed a total of ' + totalImagesFixed + ' images.');
        done();
    };
}
