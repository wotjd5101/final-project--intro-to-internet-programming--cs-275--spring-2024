const {series, watch, src, dest} = require(`gulp`),
    browserSync = require(`browser-sync`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    CSSLinter = require(`gulp-stylelint`),
    concat = require(`gulp-concat`),
    cleanCss = require(`gulp-clean-css`);

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    browserChoice = `microsoft-edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft-edge`, // Note: In Windows, this might need to be microsoft-edge
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let lintJS = () => {
    return src(`dev/js/*.js`)
        .pipe(
            jsLinter({ configFile: `.eslintrc`})
        )
        .pipe(jsLinter.formatEach(`compact`));
};

let lintCSS = () => {
    return src(`dev/css/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ],
            configFile: `.stylelintrc`
        })
        );
};

let transpileJSForDev = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`prod/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `dev`,
                `dev/html`,
                `dev/styles`,
                `dev/css`
            ]
        }
    });

    watch(`dev/js/*.js`).on(`change`, browserSync.reload);
    watch(`dev/css/*.css`).on(`change`, browserSync.reload);
    watch(`dev/html/*.html`).on(`change`, browserSync.reload);
};

let compileCSSForProd = () => {
    return src(`dev/css/*.css`)
        .pipe(concat(`app.css`))
        .pipe(cleanCss())
        .pipe(dest(`prod/styles`));
};

let transpileJSForProd = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

exports.default = serve;
exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.edge = series(edge, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.vivaldi = series(vivaldi, serve);
exports.allBrowsers = series(allBrowsers, serve);
exports.default = serve;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    lintJS,
    serve,
    lintCSS,
    transpileJSForDev
);
exports.build   = series(
    compileCSSForProd,
    transpileJSForProd
);
