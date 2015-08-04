var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');

var baseSrcPath = 'src/TypeScripts/**/*.ts';
var baseDestPath = 'src/';
var baseDestBuildPath = 'build/';


// オプションを渡して事前にプロジェクトを作成
var typescriptProject = typescript.createProject({
  target: "ES5",
  sortOutput: true,
  declarationFiles : true
});

gulp.task('typescript',function(){
	var result = gulp.src([baseSrcPath])
		.pipe(typescript(typescriptProject));

    //JavaScript
		result.pipe(typescript.filter(
		  typescriptProject
		  ,{referencedFrom: ['Base\\GameMain.ts']}
		))
		.pipe(concat('base.js'))
		.pipe(gulp.dest(baseDestPath))
    .pipe(gulp.dest(baseDestBuildPath));

    //dts
    result.dts
    .pipe(concat('base.d.ts'))
    .pipe(gulp.dest(baseDestPath))
    .pipe(gulp.dest(baseDestBuildPath));
});

gulp.task('default',function(){
	gulp.watch(baseSrcPath,['typescript']);
});
