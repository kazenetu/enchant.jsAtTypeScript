/// <reference path="../definitelytyped/enchantjs.d.ts" />
declare module Rf.Base {
    class Resource {
        Keyword: string;
        FileName: string;
        constructor(keyword: string, fileName: string);
    }
    class ResourceManager {
        resources: Array<Resource>;
        ResourcePath: string;
        constructor();
        AddGetResourceName(keyword: string, fileName: string): void;
        GetResourceNames(): Array<string>;
        GetResourceName(keyword: string): string;
    }
}
declare module Rf.Interfaces {
    /**
     * 描画可能インターフェース
    */
    interface IPaintable {
        /**
         * 描画処理実行
        */
        Refresh(): void;
    }
}
declare module Rf.UIParts {
    /**
     * enchantjs用UIパーツのスーパークラス
    */
    class UIPartBase implements Rf.Interfaces.IPaintable {
        static assets: any;
        X: number;
        Y: number;
        OriginX: number;
        OriginY: number;
        Rotation: number;
        ScaleX: number;
        ScaleY: number;
        Opacity: number;
        TouchEnabled: boolean;
        Visible: boolean;
        Ui: any;
        constructor();
        /**
         * プロパティをjsオブジェクトに反映
        */
        Refresh(): void;
        protected OnRefresh(): void;
    }
    /**
     * グループUI
    */
    class Group extends Rf.UIParts.UIPartBase {
        constructor(stage: any);
    }
    /**
     * ラベルUI
    */
    class Label extends Rf.UIParts.UIPartBase {
        Text: string;
        Width: number;
        Height: number;
        Color: string;
        TextAlign: string;
        constructor(stage: any);
        protected OnRefresh(): void;
    }
    /**
     * スプライトUI
    */
    class Sprite extends Rf.UIParts.UIPartBase {
        FileName: string;
        constructor(width: number, height: number, stage: any);
        protected OnRefresh(): void;
    }
    /**
      * イメージ無しスプライトUI
    **/
    class NoImageSprite extends Rf.UIParts.UIPartBase {
        /**
         * イメージ無しスプライトUI
        */
        constructor(width: number, height: number, stage: any);
        SetSurface(fillStyle: string): void;
    }
    /**
     * マップUI
    */
    class Map extends Rf.UIParts.UIPartBase {
        FileName: string;
        constructor(tipWidth: number, tipHeight: number, stage: any);
        protected OnRefresh(): void;
        LoadData(mapData: any): void;
        LoadDatas(mapData0: any, mapData1: any): void;
    }
}
declare module Rf.UIParts {
    /**
     * キャラクタ
    */
    class Character extends Rf.UIParts.Sprite implements Rf.Interfaces.IRunnable {
        charaIndex: number;
        waitCount: number;
        dir: number;
        anime: number;
        /**
         * キャラクタ
        */
        constructor(width: number, height: number, stage: any);
        /**
         * プロパティをjsオブジェクトに反映
        */
        protected OnRefresh(): void;
        /**
         * 実行処理実行
        */
        Run(): boolean;
        /**
         * アニメ処理
        */
        SetAnime(): void;
    }
}
declare module Rf.Base {
    class GameMain {
        resourceManager: ResourceManager;
        constructor();
        SetResourcePath(path: string): void;
        AddGetResourceName(keyword: string, fileName: string): void;
        GetResourceNames(): Array<string>;
        GetResourceName(keyword: string): string;
    }
}
declare module Rf.Interfaces {
    /**
     * 実行可能インターフェース
    */
    interface IRunnable {
        /**
         * 実行処理実行
        */
        Run(): boolean;
        /**
         * 描画処理実行
        */
        Refresh(): void;
    }
}
