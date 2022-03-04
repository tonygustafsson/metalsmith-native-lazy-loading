var debug = require('metalsmith-debug')('metalsmith:nativeLazyLoading');
var multimatch = require('multimatch');
var cheerio = require('cheerio');

module.exports = plugin;

function plugin(opts) {
    // check if there are any options passed
    opts = opts || {};

    // make sure that the default required options are filled in
    opts.pattern = opts.pattern || '**/*.html';

    var totalImagesFixed = 0;

    return function (files, metalsmith, done) {
        setImmediate(done);

        Object.keys(files).forEach(function (file) {
            if (multimatch(file, opts.pattern).length) {
                var data = files[file];

                if (!data.contents) {
                    return;
                }

                debug('nativeLazyLoading working on: %s', file);

                // Create DOM from HTML string
                var $ = cheerio.load(data.contents.toString());

                // Find all images in articles that is missing loading attribute
                var $imagesWithoutLoadingDefined = $('.article__content img:not([loading])');

                // Add loading lazy to all images
                $imagesWithoutLoadingDefined.attr('loading', 'lazy');

                // Save it
                data.contents = Buffer.from($.html());

                totalImagesFixed += $imagesWithoutLoadingDefined.length;
            }
        });

        debug('nativeLazyLoading done. Added lazy loading to ' + totalImagesFixed + ' images.');
        done();
    };
}
