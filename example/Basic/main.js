/// <reference path="../../definitelytyped/base.d.ts" />
/// <reference path="../../definitelytyped/enchantjs.d.ts" />
var Rf;
(function (Rf) {
    var Main = (function () {
        /**
         * コンストラクタ
        */
        function Main() {
            this.stage = null;
            this.label = null;
        }
        /**
         * 初期化
         * @param {any} stage - ステージインスタンス(JSから取得)
        */
        Main.prototype.Init = function (stage) {
            Rf.UIParts.UIPartBase.assets = RfView.GetAssets();
            this.stage = stage;
            var instance = this;
            //グループインスタンス作成
            this.group = new Rf.UIParts.Group(this.stage);
            this.group.Y = 0;
            this.group.Refresh();
            //画像無しスプライトインスタンス作成
            var surface = new Rf.UIParts.NoImageSprite(100, 100, this.group.Ui);
            surface.SetSurface("rgb(128,255,255)");
            surface.Opacity = 0.5;
            surface.Refresh();
            //グループメンバとしてラベルインスタンス作成
            this.label = new Rf.UIParts.Label(this.group.Ui);
            this.label.Text = "サンプルラベル";
            this.label.Refresh();
        };
        /**
         * 処理実行
        */
        Main.prototype.Run = function () {
            //グループを右に移動する
            this.group.X += 2;
            if (this.group.X >= 100) {
                this.group.X = 0;
            }
            this.group.Refresh();
            //グループ内メンバのラベルを下に移動する
            this.label.Y += 2;
            if (this.label.Y >= 100) {
                this.label.Y = 0;
            }
            this.label.Refresh();
        };
        return Main;
    })();
    Rf.Main = Main;
})(Rf || (Rf = {}));
