/// <reference path="../Interfaces/IPaintable.ts"/>
/// <reference path="../../../definitelytyped/enchantjs.d.ts"/>

module Rf.UIParts {

    /**
     * enchantjs用UIパーツのスーパークラス
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

        protected OnRefresh(): void {
        }
    }

    /**
     * グループUI
    */
    export class Group extends Rf.UIParts.UIPartBase {
        public constructor(stage: any) {
            super();

            var rfView = RfView.Create("new Group()", stage);
            this.Ui = rfView.ui;
        }
    }

    /**
     * ラベルUI
    */
    export class Label extends Rf.UIParts.UIPartBase {
        public Text: string;
        public Width: number = 0;
        public Height: number = 0;
        public Color: string;
        public TextAlign: string;

        public constructor(stage: any) {
            super();

            this.Text = "";
            this.Color = "";
            this.TextAlign = "";

            var rfView = RfView.Create("new Label()", stage);
            this.Ui = rfView.ui;
        }

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
    */
    export class Sprite extends Rf.UIParts.UIPartBase {
        public FileName: string;
        public Frame: number;

        public constructor(width: number, height: number,stage: any) {
            super();

            this.FileName = "";
            this.Frame = 0;

            var rfView = RfView.Create("new Sprite(" + width + "," + height+ ")", stage);
            this.Ui = rfView.ui;
        }

        protected OnRefresh(): void {
            if (this.FileName !== "") {
                this.Ui.image = UIPartBase.assets[this.FileName];
                this.Ui.frame = this.Frame;
            }
        }
    }

    /**
      * イメージ無しスプライトUI
    **/
    export class NoImageSprite extends Rf.UIParts.UIPartBase {

    /**
     * イメージ無しスプライトUI
    */
        public constructor(width: number, height: number, stage: any) {
            super();

            var rfView = RfView.Create("new Sprite(" + width + "," + height + ")", stage);
            this.Ui = rfView.ui;
        }

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
    */
    export class Map extends Rf.UIParts.UIPartBase {
        public FileName: string;

        public constructor(tipWidth: number, tipHeight: number,stage: any) {
            super();

            this.FileName = "";

            var rfView = RfView.Create("new Map(" + tipWidth + "," + tipHeight+ ")", stage);
            this.Ui = rfView.ui;
        }

        protected OnRefresh(): void {
            this.Ui.image = UIPartBase.assets[this.FileName];
        }

        public LoadData(mapData: any): void {
            this.Ui.loadData(mapData);
        }

        public LoadDatas(mapData0: any, mapData1: any): void {
            this.Ui.loadData(mapData0, mapData1);
        }
    }

}
