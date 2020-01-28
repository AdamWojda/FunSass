// Requirements
var sass = require('node-sass'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    getDirName = require('path').dirname;

function compileSass(options = {}) {
    // set default options
    options = Object.assign({
        style: 'expanded'
    }, options);

    // render the result
    var result = sass.renderSync({
        file: options.src,
        outputStyle: options.style
    });

    // write the result to file
    mkdirp(getDirName(options.dest), (err) => {
        if (err) return cb(err);
        fs.writeFile(options.dest, result.css,  (err) => {
            if (err) throw err;
        });
    });
};

// Expanded
compileSass({
    src : 'src/assets/scss/example.scss',
    dest: 'src/dist/css/example.css'
});

// Minified
compileSass({
    src : 'src/assets/scss/example.scss',
    dest : 'src/dist/css/example.min.css',
    style: 'compressed'
});
