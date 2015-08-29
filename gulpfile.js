var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var runsequence = require('run-sequence');
var merge2 = require('merge2');

var baseSrcPath = 'src/TypeScripts/**/*.ts';
var baseDestPath = 'src/';
var baseDestBuildPath = 'build/';
var baseDestDtsPath = 'definitelytyped/';

// オプションを渡して事前にプロジェクトを作成
var buildBasesProject = typescript.createProject({
  target: "ES5",
  sortOutput: true,
  declarationFiles : true
});

//スーパークラスのビルド
gulp.task('buildBases',function(){
	var result = gulp.src([baseSrcPath])
		.pipe(typescript(buildBasesProject));

    return merge2[
    //JavaScript
		result.pipe(typescript.filter(
		  buildBasesProject
		  ,{referencedFrom: ['Base\\GameMain.ts']}
		))
		.pipe(concat('base.js'))
		.pipe(gulp.dest(baseDestPath))
    .pipe(gulp.dest(baseDestBuildPath))
    ,
    //dts
    result.dts
    .pipe(concat('base.d.ts'))
    .pipe(gulp.dest(baseDestPath))
    .pipe(gulp.dest(baseDestDtsPath))
    ];
});

// オプションを渡して事前にプロジェクトを作成
var buildExamplesProject = typescript.createProject({
  target: "ES5",
  sortOutput: true
});

var examplePaths = ['example/LoginSample/**/*.ts','example/Basic/**/*.ts','example/ImageSpriteSample/**/*.ts'];

//実装例のビルド
gulp.task('buildExamples',function(){
  var tasks = new Array();

  //ビルドタスクの依存情報
  var beforeFuncName = new Array();

  //ビルドタスク作成
  for(var index=0;index<examplePaths.length;index++){
    var examplePath = examplePaths[index];
    var funcName = examplePath.replace("/**/*.ts","").replace("/","_");

    //実装例フォルダごとのビルドタスクを宣言
    (function(name,path,beforeTask){
      gulp.task(name,beforeTask,function(){
          var result = gulp.src(path,{base:'example'})
        		.pipe(typescript(buildExamplesProject));

          //JavaScript
      		return result.pipe(gulp.dest('example'))
      });
    })(funcName,examplePath,beforeFuncName);

    beforeFuncName = new Array(funcName);

    //タスク名を追加
    tasks.push(funcName);
  }

  //ビルドタスク実行
  runsequence(tasks);
});

//スーパークラスと実装例のビルド
gulp.task('default',['buildBases'],function(){
	runsequence('buildExamples');
});

//ドキュメント作成
var jsdoc = require("gulp-jsdoc");

// プロジェクト情報
var infos = {
	// バージョン
	version: "1.0.0"
};

// HTMLのテンプレート設定
var template = {
	// テンプレートプラグイン「ink-docstrap」を使用する
	path: "ink-docstrap",

	// プロジェクト名 ページタイトル・ヘッダーの左上に表示されます
  systemName: "enchant.jsAtTypeScript",

  // HTMLのスタイルテーマ
  // cerulean, cosmo, cyborg, darkly, flatly, journal, lumen, paper, readable, sandstone, simplex, slate, spacelab, superhero, united, yetiの中から選べます
  theme: "cosmo",

  // ソースコードに行番号を表示するかどうか
  linenums: true
};

// オプション
var options = {
  // ソースコードを記述したHTMLを生成するかどうか
  outputSourceFiles: true
};

// jsdocを書き出すタスク
gulp.task("jsdoc", function() {
  gulp.src(["src/base.js"])
		.pipe(jsdoc.parser(infos))
		.pipe(jsdoc.generator("./doc/", template, options));
});
