/// <reference path="./ResourceManager.ts"/>
/// <reference path="../UIParts/Character.ts"/>

module Rf.Base {

    /* 
     * ゲームメイン処理
    */
    export class GameMain {

        //リソース管理
        public resourceManager: ResourceManager;

        public constructor() {
            this.resourceManager = new ResourceManager();
        }

        public SetResourcePath(path: string): void {
            this.resourceManager.ResourcePath = path;
        }

        public AddGetResourceName(keyword: string, fileName: string): void {
            this.resourceManager.AddGetResourceName(keyword, fileName);
        }

        public GetResourceNames(): Array<string> {
            return this.resourceManager.GetResourceNames();
        }

        public GetResourceName(keyword: string): string {
            return this.resourceManager.GetResourceName(keyword);
        }

    }

} 