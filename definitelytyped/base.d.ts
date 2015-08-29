declare module Rf.Base {
    /**
     * リソース情報
     * @classdesc リソース情報クラス
     * @constructor
     * @memberof Base
     */
    class Resource {
        Keyword: string;
        FileName: string;
        /**
         * コンストラクタ
         * @method
         * @name Base.Resource#Resource
         * @param {string} keyword - リソースのキー
         * @param {string} fileName - リソース名
         */
        constructor(keyword: string, fileName: string);
    }
    /**
     * リソース管理
     * @classdesc リソース管理クラス
     * @constructor
     * @memberof Base
     */
    class ResourceManager {
        resources: Array<Resource>;
        ResourcePath: string;
        /**
         * コンストラクタ
         * @method
         * @name Base.ResourceManager#ResourceManager
         */
        constructor();
        /**
        * リソース名を追加
        * @method
        * @name Base.ResourceManager#AddGetResourceName
        * @param {string} keyword - リソースのキー
        * @param {string} fileName - リソース名
         */
        AddGetResourceName(keyword: string, fileName: string): void;
        /**
        * リソースの配列を取得
        * @method
        * @name Base.ResourceManager#GetResourceNames
        * @return {string} リソースの配列を返す
         */
        GetResourceNames(): Array<string>;
        /**
         * リソース名を取得
         * @method
         * @name Base.ResourceManager#GetResourceName
         * @param {string} keyword - リソースのキー
         * @return {string} リソース名を返す
         */
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

/// <reference path="../Interfaces/IPaintable.d.ts" />
/// <reference path="../../../definitelytyped/enchantjs.d.ts" />
/**
 * UIパーツ
 * @namespace UIParts
 */
declare module Rf.UIParts {
    /**
     * enchantjs用UIパーツのスーパークラス
     * @classdesc enchantjs用UIパーツのスーパークラス
     * @constructor
     * @memberof UIParts
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
        /**
         * コンストラクタ
         * @method
         * @name UIParts.UIPartBase#UIPartBase
         */
        constructor();
        /**
         * プロパティをjsオブジェクトに反映
         * @method
         * @name UIParts.UIPartBase#Refresh
         */
        Refresh(): void;
        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.UIPartBase#OnRefresh
         */
        protected OnRefresh(): void;
    }
    /**
     * グループUI
     * @classdesc グループUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    class Group extends Rf.UIParts.UIPartBase {
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Group#Group
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        constructor(stage: any);
    }
    /**
     * ラベルUI
     * @classdesc ラベルUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    class Label extends Rf.UIParts.UIPartBase {
        Text: string;
        Width: number;
        Height: number;
        Color: string;
        TextAlign: string;
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Label#Label
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        constructor(stage: any);
        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Label#OnRefresh
         */
        protected OnRefresh(): void;
    }
    /**
     * スプライトUI
     * @classdesc スプライトUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    class Sprite extends Rf.UIParts.UIPartBase {
        FileName: string;
        Frame: number;
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Sprite#Sprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        constructor(width: number, height: number, stage: any);
        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Sprite#OnRefresh
         */
        protected OnRefresh(): void;
    }
    /**
     * イメージ無しスプライトUI
     * @classdesc イメージ無しスプライトUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    class NoImageSprite extends Rf.UIParts.UIPartBase {
        /**
         * コンストラクタ
         * @method
         * @name UIParts.NoImageSprite#NoImageSprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        constructor(width: number, height: number, stage: any);
        /**
         * 塗りつぶし情報の設定
         * @method
         * @name UIParts.NoImageSprite#SetSurface
         * @param {string} fillStyle - 塗りつぶし情報
         */
        SetSurface(fillStyle: string): void;
    }
    /**
     * マップUI
     * @classdesc マップUIクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.UIPartBase
     */
    class Map extends Rf.UIParts.UIPartBase {
        FileName: string;
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Map#Map
         * @param {number} tipWidth - マップチップサイズ.幅
         * @param {number} tipHeight - マップチップサイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        constructor(tipWidth: number, tipHeight: number, stage: any);
        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Map#OnRefresh
         */
        protected OnRefresh(): void;
        /**
         * マップ情報の読み込み
         * @method
         * @name UIParts.Map#LoadData
         * @param {Array} mapData - マップ情報（２次元配列）
         */
        LoadData(mapData: any): void;
        /**
         * 複数のマップ情報の読み込み
         * @method
         * @name UIParts.Map#LoadDatas
         * @param {Array} mapData0 - 前景マップ情報（２次元配列）
         * @param {Array} mapData1 - 背景マップ情報（２次元配列）
         */
        LoadDatas(mapData0: any, mapData1: any): void;
    }
}

/// <reference path="UIParts.d.ts" />
declare module Rf.UIParts {
    /**
     * キャラクタ
     * @classdesc キャラクタクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.Sprite
     */
    class Character extends Rf.UIParts.Sprite implements Rf.Interfaces.IRunnable {
        charaIndex: number;
        waitCount: number;
        dir: number;
        anime: number;
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Character#Character
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        constructor(width: number, height: number, stage: any);
        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Character#OnRefresh
         */
        protected OnRefresh(): void;
        /**
         * 実行処理実行
         * @method
         * @name UIParts.Character#Run
         * @return {boolean} 処理結果を返す
         */
        Run(): boolean;
        /**
         * アニメ実行
         * @method
         * @name UIParts.Character#SetAnime
         */
        SetAnime(): void;
    }
}

/// <reference path="ResourceManager.d.ts" />
/// <reference path="../UIParts/Character.d.ts" />
/**
 * ベース
 * @namespace Base
 */
declare module Rf.Base {
    /**
     * ゲームメイン処理
     * @classdesc ゲームメインクラス
     * @constructor
     * @memberof Base
     */
    class GameMain {
        resourceManager: ResourceManager;
        /**
         * コンストラクタ
         * @method
         * @name Base.GameMain#GameMain
         */
        constructor();
        /**
         * リソースのルートパスを設定
         * @method
         * @name Base.GameMain#SetResourcePath
         * @param {string} path - ルートパス
         */
        SetResourcePath(path: string): void;
        /**
         * リソース名を追加
         * @method
         * @name Base.GameMain#AddGetResourceName
         * @param {string} keyword - リソースのキー
         * @param {string} fileName - リソース名
         */
        AddGetResourceName(keyword: string, fileName: string): void;
        /**
         * リソースの配列を取得
         * @method
         * @name Base.GameMain#GetResourceNames
         * @return {string} リソースの配列を返す
         */
        GetResourceNames(): Array<string>;
        /**
         * リソース名を取得
         * @method
         * @name Base.GameMain#GetResourceName
         * @param {string} keyword - リソースのキー
         * @return {string} リソース名を返す
         */
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
