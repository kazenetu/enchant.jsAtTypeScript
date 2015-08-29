/// <reference path="../Interfaces/IPaintable.ts"/>
/// <reference path="../../../definitelytyped/enchantjs.d.ts"/>

/**
 * UIパーツ
 * @namespace UIParts
 */
module Rf.UIParts {

    /**
     * enchantjs用UIパーツのスーパークラス
     * @classdesc enchantjs用UIパーツのスーパークラス
     * @constructor
     * @memberof UIParts
     */
    export class UIPartBase implements Rf.Interfaces.IPaintable {
        public static assets: any;

        public X: number;
        public Y: number;
        public OriginX: number;
        public OriginY: number;
        public Rotation: number;
        public ScaleX: number;
        public ScaleY: number;
        public Opacity: number;
        public TouchEnabled: boolean;
        public Visible: boolean;
        public Ui: any;

        /**
         * コンストラクタ
         * @method
         * @name UIParts.UIPartBase#UIPartBase
         */
        public constructor() {
            this.X = 0;
            this.Y = 0;
            this.OriginX = 0;
            this.OriginY = 0;
            this.Rotation = 0;
            this.ScaleX = 1.0;
            this.ScaleY = 1.0;
            this.Opacity = 1.0;
            this.TouchEnabled = true;
            this.Visible = true;
            this.Ui = null;
        }

        /**
         * プロパティをjsオブジェクトに反映
         * @method
         * @name UIParts.UIPartBase#Refresh
         */
        public Refresh(): void {
            if (this.Ui !== null) {
                this.Ui.x = this.X;
                this.Ui.y = this.Y;
                this.Ui.originX = this.OriginX;
                this.Ui.originY = this.OriginY;
                this.Ui.rotation = this.Rotation;
                this.Ui.scaleX = this.ScaleX;
                this.Ui.scaleY = this.ScaleY;
                this.Ui.opacity = this.Opacity;
                this.Ui.touchEnabled = this.TouchEnabled;
                this.Ui.visible = this.Visible;

                this.OnRefresh();
            }
        }

        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.UIPartBase#OnRefresh
         */
        protected OnRefresh(): void {
        }
    }

    /**
     * グループUI
     * @classdesc グループUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    export class Group extends Rf.UIParts.UIPartBase {

        /**
         * コンストラクタ
         * @method
         * @name UIParts.Group#Group
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        public constructor(stage: any) {
            super();

            var rfView = RfView.Create("new Group()", stage);
            this.Ui = rfView.ui;
        }
    }

    /**
     * ラベルUI
     * @classdesc ラベルUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    export class Label extends Rf.UIParts.UIPartBase {
        public Text: string;
        public Width: number = 0;
        public Height: number = 0;
        public Color: string;
        public TextAlign: string;

        /**
         * コンストラクタ
         * @method
         * @name UIParts.Label#Label
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        public constructor(stage: any) {
            super();

            this.Text = "";
            this.Color = "";
            this.TextAlign = "";

            var rfView = RfView.Create("new Label()", stage);
            this.Ui = rfView.ui;
        }

        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Label#OnRefresh
         */
        protected OnRefresh(): void {
            this.Ui.text = this.Text;
            if (this.Width > 0.0) {
                this.Ui.width = this.Width;
            }
            if (this.Height > 0.0) {
                this.Ui.height = this.Height;
            }
            if (this.Color !== "") {
                this.Ui.color = this.Color;
            }
            if (this.TextAlign !== "") {
                this.Ui.textAlign = this.TextAlign;
            }

        }
    }

    /**
     * スプライトUI
     * @classdesc スプライトUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    export class Sprite extends Rf.UIParts.UIPartBase {
        public FileName: string;
        public Frame: number;

        /**
         * コンストラクタ
         * @method
         * @name UIParts.Sprite#Sprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        public constructor(width: number, height: number,stage: any) {
            super();

            this.FileName = "";
            this.Frame = 0;

            var rfView = RfView.Create("new Sprite(" + width + "," + height+ ")", stage);
            this.Ui = rfView.ui;
        }

        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Sprite#OnRefresh
         */
        protected OnRefresh(): void {
            if (this.FileName !== "") {
                this.Ui.image = UIPartBase.assets[this.FileName];
                this.Ui.frame = this.Frame;
            }
        }
    }

    /**
     * イメージ無しスプライトUI
     * @classdesc イメージ無しスプライトUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    export class NoImageSprite extends Rf.UIParts.UIPartBase {

        /**
         * コンストラクタ
         * @method
         * @name UIParts.NoImageSprite#NoImageSprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        public constructor(width: number, height: number, stage: any) {
            super();

            var rfView = RfView.Create("new Sprite(" + width + "," + height + ")", stage);
            this.Ui = rfView.ui;
        }

        /**
         * 塗りつぶし情報の設定
         * @method
         * @name UIParts.NoImageSprite#SetSurface
         * @param {string} fillStyle - 塗りつぶし情報
         */
        public SetSurface(fillStyle: string): void {
            var rfView = RfView.Create("new Surface(" + this.Ui.width + "," + this.Ui.height + ")", null);
            rfView.ui.context.beginPath();
            rfView.ui.context.fillStyle = fillStyle;
            rfView.ui.context.rect(0, 0, this.Ui.width, this.Ui.height);
            rfView.ui.context.fill();
            this.Ui.image = rfView.ui;
        }
    }

    /**
     * マップUI
     * @classdesc マップUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    export class Map extends Rf.UIParts.UIPartBase {
        public FileName: string;

        /**
         * コンストラクタ
         * @method
         * @name UIParts.Map#Map
         * @param {number} tipWidth - マップチップサイズ.幅
         * @param {number} tipHeight - マップチップサイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        public constructor(tipWidth: number, tipHeight: number,stage: any) {
            super();

            this.FileName = "";

            var rfView = RfView.Create("new Map(" + tipWidth + "," + tipHeight+ ")", stage);
            this.Ui = rfView.ui;
        }

        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Map#OnRefresh
         */
        protected OnRefresh(): void {
            this.Ui.image = UIPartBase.assets[this.FileName];
        }

        /**
         * マップ情報の読み込み
         * @method
         * @name UIParts.Map#LoadData
         * @param {Array} mapData - マップ情報（２次元配列）
         */
        public LoadData(mapData: any): void {
            this.Ui.loadData(mapData);
        }

        /**
         * 複数のマップ情報の読み込み
         * @method
         * @name UIParts.Map#LoadDatas
         * @param {Array} mapData0 - 前景マップ情報（２次元配列）
         * @param {Array} mapData1 - 背景マップ情報（２次元配列）
         */
        public LoadDatas(mapData0: any, mapData1: any): void {
            this.Ui.loadData(mapData0, mapData1);
        }
    }

}
