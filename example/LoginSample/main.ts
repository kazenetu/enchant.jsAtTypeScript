/// <reference path="../../definitelytyped/base.d.ts" />
/// <reference path="../../definitelytyped/enchantjs.d.ts" />

module Rf {
    /**
     * タップ時に表示する演出用クラス
    */
    export class Particle {
        private isShowtParticle: boolean = false;
        private particles: Array<Rf.UIParts.NoImageSprite> = new Array<Rf.UIParts.NoImageSprite>();
        private particlePer: number = 0;
        private particleX: number;
        private particleY: number;

        /**
         * コンストラクタ
        */
        public constructor(stage:any) {
            for (var index = 0; index < 12; index++) {
                var particle: Rf.UIParts.NoImageSprite = new Rf.UIParts.NoImageSprite(4, 4, stage);
                particle.SetSurface("rgb(32,128,255)");
                particle.TouchEnabled = false;
                particle.Visible = false;
                particle.Opacity = 0.75;
                particle.Refresh();
                this.particles.push(particle);
            }
        }

        public SetParticle(x: number, y: number):void {
            this.particleX = x;
            this.particleY = y;
            this.particlePer = 0.0;
            this.isShowtParticle = true;
            for (var index = 0; index < this.particles.length; index++) {
                this.particles[index].X = x;
                this.particles[index].Y = y;
                this.particles[index].Visible = true;
                this.particles[index].Refresh();
            }
        }

        public Run(): void  {
            if (this.isShowtParticle) {
                this.particlePer += 0.125;

                if (this.particlePer < 1.0) {
                    var addRad: number = (Math.PI * 2) / 12;
                    var rad: number = Math.PI * this.particlePer * 1.0;
                    var distance: number = 50.0 * Math.sin(-Math.PI * this.particlePer * 0.5);
                    for (var index = 0; index < this.particles.length; index++) {
                        this.particles[index].X = this.particleX + distance * Math.sin(rad);
                        this.particles[index].Y = this.particleY + distance * Math.cos(rad);
                        this.particles[index].Opacity = 1.0 - 0.25 * this.particlePer;
                        this.particles[index].Refresh();
                        rad += addRad;
                    }
                } else {
                    for (var index = 0; index < this.particles.length; index++) {
                        this.particles[index].Visible = false;
                        this.particles[index].Refresh();
                    }
                    this.isShowtParticle = false;
                }
            }
        }
    }

    /**
     * メインクラス
    */
    export class Main {
        public gameMain: Base.GameMain;

        private static SelectCharacterGroupX: number = (320 / 2) - 16;

        private stage: any = null;
        private group: Rf.UIParts.Group;
        private selectCharacterBase: Rf.UIParts.Group = null;

        private characters: Array<Rf.UIParts.Character> = new Array<Rf.UIParts.Character>();
        private charaIndex: number = 0;

        private particle: Particle;

        private loginButton: Rf.UIParts.Sprite;
        private isShowMessage: boolean = false;
        private messageSurface: Rf.UIParts.NoImageSprite;
        private messageLabel: Rf.UIParts.Label;
        private messagePer: number = 0.0;

        private screenWidth: number = 320;
        private screenHeight: number = 240;

        /**
         * コンストラクタ
        */
        public constructor() {
            this.gameMain = new Base.GameMain();

            //画像のロード予約（ロードされたものはInitメソッドで取得可能）
            this.gameMain.SetResourcePath("resources/");
            this.gameMain.AddGetResourceName("charaImage", "chara.png");
            this.gameMain.AddGetResourceName("titleImage", "title.png");
            this.gameMain.AddGetResourceName("loginImage", "login.png");
        }

        /**
         * 初期化
         * @param {any} stage - ステージインスタンス(JSから取得)
        */
        public Init(stage: any): void {
            Rf.UIParts.UIPartBase.assets = RfView.GetAssets();

            this.stage = stage;
            var instance = this;

            // ログイン画面作成
            instance.createStage();
        }

        public Dispose(): void {
        }

        /**
         * ログイン画面作成
        */
        private createStage(): void {
            this.group = new Rf.UIParts.Group(this.stage);
            this.group.Y = 0;
            this.group.Refresh();

            this.screenWidth = RfView.GetScreenWidth();
            this.screenHeight = RfView.GetScreenHeight();

            //キャラ選択グループ
            this.selectCharacterBase = new Rf.UIParts.Group(this.group.Ui);
            this.selectCharacterBase.Y = (480 / 2) - 16;
            this.selectCharacterBase.Refresh();

            //キャラクタインスタンス作成とグループへの追加
            this.charaIndex = 0;
            if (sessionStorage.getItem("charaIndex") != null) {
                this.charaIndex = parseInt(sessionStorage.getItem("charaIndex"), 10);
            }
            for (var index = 0; index < 13; index++) {
                this.characters.push(new Rf.UIParts.Character(32, 32, this.selectCharacterBase.Ui));
                this.characters[index].FileName = this.gameMain.GetResourceName("charaImage");
                this.characters[index].charaIndex = index;
                this.characters[index].X = 48 * (index % 7);
                this.characters[index].Y = 48 * Math.floor(index / 7);
                this.characters[index].charaIndex = index;
                this.characters[index].Ui.addEventListener(enchant.Event.TOUCH_START, (e: any) => {
                    if (this.isShowMessage === false) {
                        this.charaIndex = e.target.instance.charaIndex;
                        this.displayCharacters();

                        this.particle.SetParticle(e.x, e.y);
                    }
                });
            }
            this.displayCharacters();

            //タイトル
            var title: Rf.UIParts.Sprite = new Rf.UIParts.Sprite(320, 100, this.stage);
            title.FileName = this.gameMain.GetResourceName("titleImage");
            title.Refresh();

            //ログインボタン
            this.loginButton = new Rf.UIParts.Sprite(100, 48, this.stage);
            this.loginButton.FileName = this.gameMain.GetResourceName("loginImage");
            this.loginButton.X = (this.screenWidth - 100) / 2;
            this.loginButton.Y = this.screenHeight - 48;
            this.loginButton.Refresh();
            var loginText = new Rf.UIParts.Label(this.stage);
            loginText.Text = "ログイン";
            loginText.Width = 100;
            loginText.X = this.loginButton.X + 4;
            loginText.Y = this.loginButton.Y + 16;
            loginText.TouchEnabled = false;
            loginText.TextAlign = "center";
            loginText.Refresh();

            //ログインメッセージ
            var messageGroup: Rf.UIParts.Group = new Rf.UIParts.Group(this.stage);
            messageGroup.Y = 240;
            messageGroup.Refresh();

            this.messageSurface = new Rf.UIParts.NoImageSprite(320, 100, messageGroup.Ui);
            this.messageSurface.SetSurface("rgb(128,128,128)");
            this.messageSurface.Visible = false;
            this.messageSurface.Opacity = 0.5;
            this.messageSurface.OriginY = 50.0;
            this.messageSurface.ScaleY = 0.0;
            this.messageSurface.Refresh();

            this.messageLabel = new Rf.UIParts.Label(messageGroup.Ui);
            this.messageLabel.Text = "ログイン処理が走ります。";
            this.messageLabel.Width = 320;
            this.messageLabel.Y = 50;
            this.messageLabel.TextAlign = "center";
            this.messageLabel.Visible = false;
            this.messageLabel.Refresh();

            //パーティクル作成
            this.particle = new Particle(this.stage);

            //ログイン処理
            this.loginButton.Ui.addEventListener(enchant.Event.TOUCH_END, (e: any) => {
                if (this.isShowMessage === false) {
                    this.messagePer = 0.0;
                    this.isShowMessage = true;
                    this.messageSurface.Visible = true;
                    this.particle.SetParticle(e.x, e.y);
                }
            });

            //メッセージクリック
            this.messageSurface.Ui.addEventListener(enchant.Event.TOUCH_END, (e: any) => {
                this.isShowMessage = false;
                this.messageSurface.Visible = false;
                this.messageSurface.Refresh();
                this.messageLabel.Visible = false;
                this.messageLabel.Refresh();
            });
        }

        /**
         * ログイン処理
        */
        private login(instance: Main, playerIndex: number, label: Rf.UIParts.Label): void {
          //サーバとの通信処理などを行う

          //選択されたキャラクタをsessionStorageに格納
          sessionStorage.setItem("charaIndex", playerIndex.toString());
        }

        /**
         * 処理実行
        */
        public Run(): void {
            //ログインボタンクリック時のメッセージ表示
            if (this.isShowMessage) {
                if (this.messagePer < 1.0) {
                    this.messagePer += 0.125;
                    if (this.messagePer >= 1.0) {
                        this.messagePer = 1.0;
                        this.messageLabel.Visible = true;
                        this.messageLabel.Refresh();

                        this.login(this, this.charaIndex, this.messageLabel);
                    }
                    this.messageSurface.ScaleY = Math.sin(Math.PI * this.messagePer * 0.75);
                    this.messageSurface.Refresh();
                }
            }

            //選択キャラをアニメーションさせる
            this.characters[this.charaIndex].Run();

            //パーティクル表示
            this.particle.Run();
        }

        /**
         * キャラクタ選択時の表示切替処理
        */
        private displayCharacters(): void {
            this.selectCharacterBase.Refresh();
            for (var index = 0; index < 13; index++) {
                if (this.charaIndex != index) {
                    this.characters[index].Opacity = 0.25;
                } else {
                    this.characters[index].Opacity = 1.0;
                }
                this.characters[index].Refresh();
            }
        }
    }
}
