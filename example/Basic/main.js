/// <reference path="../../definitelytyped/base.d.ts" />
/// <reference path="../../definitelytyped/enchantjs.d.ts" />
var Rf;
(function (Rf) {
    var Main = (function () {
        function Main() {
            this.stage = null;
            this.label = null;
        }
        Main.prototype.Init = function (stage) {
            Rf.UIParts.UIPartBase.assets = RfView.GetAssets();
            this.stage = stage;
            var instance = this;
            this.group = new Rf.UIParts.Group(this.stage);
            this.group.Y = 0;
            this.group.Refresh();
            var surface = new Rf.UIParts.NoImageSprite(100, 100, this.group.Ui);
            surface.SetSurface("rgb(128,255,255)");
            surface.Opacity = 0.5;
            surface.Refresh();
            this.label = new Rf.UIParts.Label(this.group.Ui);
            this.label.Text = "サンプルラベル";
            this.label.Refresh();
        };
        Main.prototype.Run = function () {
            this.group.X += 2;
            if (this.group.X >= 100) {
                this.group.X = 0;
            }
            this.group.Refresh();
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
