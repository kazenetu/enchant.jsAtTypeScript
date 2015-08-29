/// <reference path="./ResourceManager.ts"/>
/// <reference path="../UIParts/Character.ts"/>

/**
 * ベース
 * @namespace Base
 */
module Rf.Base {

    /**
     * ゲームメイン処理
     * @classdesc ゲームメインクラス
     * @constructor
     * @memberof Base
     */
    export class GameMain {

        //リソース管理
        public resourceManager: ResourceManager;

        /**
         * コンストラクタ
         * @method
         * @name Base.GameMain#GameMain
         */
        public constructor() {
            this.resourceManager = new ResourceManager();
        }

        /**
         * リソースのルートパスを設定
         * @method
         * @name Base.GameMain#SetResourcePath
         * @param {string} path - ルートパス
         */
        public SetResourcePath(path: string): void {
            this.resourceManager.ResourcePath = path;
        }

        /**
         * リソース名を追加
         * @method
         * @name Base.GameMain#AddGetResourceName
         * @param {string} keyword - リソースのキー
         * @param {string} fileName - リソース名
         */
        public AddGetResourceName(keyword: string, fileName: string): void {
            this.resourceManager.AddGetResourceName(keyword, fileName);
        }

        /**
         * リソースの配列を取得
         * @method
         * @name Base.GameMain#GetResourceNames
         * @return {string} リソースの配列を返す
         */
        public GetResourceNames(): Array<string> {
            return this.resourceManager.GetResourceNames();
        }

        /**
         * リソース名を取得
         * @method
         * @name Base.GameMain#GetResourceName
         * @param {string} keyword - リソースのキー
         * @return {string} リソース名を返す
         */
        public GetResourceName(keyword: string): string {
            return this.resourceManager.GetResourceName(keyword);
        }
    }

}
