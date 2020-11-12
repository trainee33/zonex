//let replace = require('gulp-replace'); //.pipe(replace('bar', 'foo'))
let { src, dest } = require('gulp');
let fs = require('fs');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let autoprefixer = require('gulp-autoprefixer');
let scss = require('gulp-sass');
let group_media = require('gulp-group-css-media-queries');
let smartgrid = require('smart-grid');
let plumber = require('gulp-plumber');
let del = require('del');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify-es').default;
let rename = require('gulp-rename');
let fileinclude = require('gulp-file-include');
let clean_css = require('gulp-clean-css');
let newer = require('gulp-newer');
let concat = require('gulp-concat');
let webp = require('imagemin-webp');
let webpcss = require('gulp-webp-css');
let webphtml = require('gulp-webp-html');
let fonter = require('gulp-fonter');
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let svgSprite = require('gulp-svg-sprite');
let webpack = require('webpack');
let webpackStream = require('webpack-stream');

let project_name = require('path').basename(__dirname);
let src_folder = 'src';

let path = {
	build: {
		html: project_name + '/',
		js: project_name + '/js/',
		css: project_name + '/css/',
		images: project_name + '/img/',
      fonts: project_name + '/fonts/',
      resources: project_name + '/resources/',
	},
	src: {
		favicon: src_folder + '/img/favicon.{jpg,png,svg,gif,ico,webp}',
		html: [ src_folder + '/*.html', '!' + src_folder + '/_*.html' ],
		js: src_folder + '/js/script.js',
		css: src_folder + '/scss/style.scss',
      images: [ src_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}', '!**/favicon.*', '!**/svg/*.svg' ],
      svgSprites: [ src_folder + '/img/svg/*.svg' ],
      fonts: src_folder + '/fonts/*.ttf',
      resources: src_folder + '/resources/**',
	},
	watch: {
		html: src_folder + '/**/*.html',
		js: src_folder + '/js/**/*.js',
		css: src_folder + '/scss/**/*.scss',
      images: src_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
      svgSprites: [ src_folder + '/img/svg/*.svg' ],
      resources: src_folder + '/resources/**',
	},
	clean: './' + project_name + '/'
};
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './' + project_name + '/'
		},
		notify: false,
		port: 3000
	});
}
const settings = {
	outputStyle: 'scss',
	columns: 12,
	offset: '30px',
	mobileFirst: false,
	container: {
		maxWidth: '1326px',
		fields: '30px'
	},
	breakPoints: {
		lg: {
			width: '1200px'
		},
		md: {
			width: '992px'
		},
		sm: {
			width: '768px',
			fields: '15px'
		},
		xs: {
			width: '560px'
		}
	}
};

smartgrid('./#src/scss', settings);

function resources() {
   return src(path.src.resources, {})
     .pipe(dest(path.build.resources));
}

function html() {
	return src(path.src.html, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function css() {
	return src(path.src.css, {})
		.pipe(plumber())
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: [ 'last 5 versions' ],
				cascade: true
			})
		)
		.pipe(webpcss([ '.jpg', '.jpeg', '.png' ]))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: '.min.css'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}
function js() {
   return src(path.src.js, {})
   .pipe(webpackStream(
      {
        mode: 'development',
        output: {
          filename: 'script.js',
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }]
        },
      }
    ))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })
		.pipe(plumber())
		.pipe(gulp.dest(path.build.js))
		.pipe(uglify(/* options */))
		.pipe(
			rename({
				suffix: '.min',
				extname: '.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}
//svg sprite
function svgSprites() {
   return src(path.src.svgSprites)
     .pipe(svgSprite({
       mode: {
         stack: {
           sprite: "../sprite.svg" //sprite file name
         }
       },
     }))
     .pipe(dest(path.build.images));
 }
function images() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(
			imagemin([
				webp({
					quality: 75
				})
			])
		)
		.pipe(
			rename({
				extname: '.webp'
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(newer(path.build.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [ { removeViewBox: false } ],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images));
}
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: '.ico'
			})
		)
		.pipe(dest(path.build.html));
}
function fonts_otf() {
	return src('./' + src_folder + '/fonts/*.otf')
		.pipe(plumber())
		.pipe(
			fonter({
				formats: [ 'ttf' ]
			})
		)
		.pipe(gulp.dest('./' + src_folder + +'/fonts/'));
}
function fonts() {
	src(path.src.fonts).pipe(plumber()).pipe(ttf2woff()).pipe(dest(path.build.fonts));
	return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts)).pipe(browsersync.stream());
}
function fontstyle() {
	let file_content = fs.readFileSync(src_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function(err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(
							src_folder + '/scss/fonts.scss',
							'@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n',
							cb
						);
					}
					c_fontname = fontname;
				}
			}
		});
	}
}
function cb() {}
function clean() {
	return del(path.clean);
}
function watchFiles() {
	gulp.watch([ path.watch.html ], html);
	gulp.watch([ path.watch.css ], css);
	gulp.watch([ path.watch.js ], js);
   gulp.watch([ path.watch.images ], images);
   gulp.watch('./src/img/svg/**.svg', svgSprites);
   gulp.watch([ path.watch.resources ], resources);
}
let build = gulp.series(
	clean,
	fonts_otf,
	gulp.parallel(html, css, js, favicon, images, svgSprites, resources),
   fonts,      
	gulp.parallel(fontstyle)
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.favicon = favicon;
exports.fonts_otf = fonts_otf;
exports.fontstyle = fontstyle;
exports.fonts = fonts;
exports.images = images;
exports.svgSprites = svgSprites;
exports.resources = resources;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;