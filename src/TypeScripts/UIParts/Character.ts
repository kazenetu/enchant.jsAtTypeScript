/// <reference path="./UIParts.ts"/>

module Rf.UIParts {
    /**
     * キャラクタ
     * @classdesc キャラクタクラス
     * @constructor
     * @memberof UIParts
     * @extends UIParts.Sprite
     */
    export class Character extends Rf.UIParts.Sprite implements Rf.Interfaces.IRunnable {

        public charaIndex: number = 0;

        public waitCount: number = 0;
        public dir: number = 2;
        public anime: number = 0;

        /**
         * コンストラクタ
         * @method
         * @name UIParts.Character#Character
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} stage - 親Node(enchantjsインスタンス)
         */
        public constructor(width: number, height: number, stage: any) {
            super(width, height, stage);

            this.Ui.instance = this;
            this.Ui.on(enchant.Event.RENDER, function () {
                this.instance.Refresh();
            });
        }

        /**
         * 更新イベントハンドラ
         * @method
         * @name UIParts.Character#OnRefresh
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
         * @method
         * @name UIParts.Character#Run
         * @return {boolean} 処理結果を返す
         */
        public Run(): boolean {
            this.SetAnime();

            return true;
        }

        /**
         * アニメ実行
         * @method
         * @name UIParts.Character#SetAnime
         */
        public SetAnime():void {
            if (++this.anime >= 4) {
                this.anime = 0;
            }
        }
    }
}
