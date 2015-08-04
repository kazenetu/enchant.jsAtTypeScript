module Rf.Interfaces {

    /**
     * 実行可能インターフェース
    */
    export interface IRunnable {

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