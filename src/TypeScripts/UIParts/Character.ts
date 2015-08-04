/// <reference path="./UIParts.ts"/>

module Rf.UIParts {
    /** 
     * キャラクタ
    */
    export class Character extends Rf.UIParts.Sprite implements Rf.Interfaces.IRunnable {

        public charaIndex: number = 0;

        public waitCount: number = 0;
        public dir: number = 2;
        public anime: number = 0;

        /** 
         * キャラクタ
        */
        public constructor(width: number, height: number, stage: any) {
            super(width, height, stage);

            this.Ui.instance = this;
            this.Ui.on(enchant.Event.RENDER, function () {
                this.instance.Refresh();
            });
        }

        /** 
         * プロパティをjsオブジェクトに反映
        */
        protected OnRefresh(): void {
            super.OnRefresh();

            //フレーム処理
            this.Ui.frame = this.charaIndex * 2 + this.dir * 26;
            if (this.anime >= 2) {
                this.Ui.frame += 1;
            }
        }

        /**
         * 実行処理実行
        */
        public Run(): boolean {
            this.SetAnime();

            return true;
        }

        /**
         * アニメ処理
        */
        public SetAnime():void {
            if (++this.anime >= 4) {
                this.anime = 0;
            }
        }
    }
} 