/// <reference path="../../definitelytyped/base.d.ts" />
/// <reference path="../../definitelytyped/enchantjs.d.ts" />

module Rf {
    export class Main {
        public gameMain: Base.GameMain;

        private stage: any = null;
        private group: Rf.UIParts.Group = null;
        private sprite: Rf.UIParts.Sprite = null;

        /**
         * コンストラクタ
        */
        public constructor() {
            //画像管理を利用するため、ゲームクラスを生成
            this.gameMain = new Base.GameMain();

            //画像のロード予約（ロードされたものはInitメソッドで取得可能）
            this.gameMain.SetResourcePath("resources/");
            this.gameMain.AddGetResourceName("charaImage", "chara.png");
        }

        /**
         * 初期化
         * @param {any} stage - ステージインスタンス(JSから取得)
        */
        public Init(stage: any): void {
            Rf.UIParts.UIPartBase.assets = RfView.GetAssets();

            this.stage = stage;
            var instance = this;

            //グループインスタンス作成
            this.group = new Rf.UIParts.Group(this.stage);
            this.group.Y = 100;
            this.group.Refresh();

            //画像無しスプライトインスタンス作成
            var surface: Rf.UIParts.NoImageSprite = new Rf.UIParts.NoImageSprite(100, 100, this.group.Ui);
            surface.SetSurface("rgb(128,255,255)");
            surface.Opacity = 0.5;
            surface.Refresh();

            //スプライトインスタンス作成
            this.sprite = new Rf.UIParts.Sprite(32, 32, this.group.Ui);
            this.sprite.FileName = this.gameMain.GetResourceName("charaImage");
            this.sprite.OriginX = 16; //中心で回転するように設定
            this.sprite.OriginY = 16; //中心で回転するように設定
            this.sprite.Frame = 26*2; //サンプル画像で正面画像を表示する
            this.sprite.Refresh();
        }

        /**
         * 処理実行
        */
        public Run(): void {
            //グループを右に移動する
            this.group.X += 2;
            if (this.group.X >= 200) {
                this.group.X = 0;
            }
            this.group.Refresh();

            //グループ内メンバのスプライトを回転させる
            this.sprite.Rotation += 5;
            if (this.sprite.Rotation >= 360) {
                this.sprite.Rotation = 0;
            }
            this.sprite.Refresh();
        }

    }
}
