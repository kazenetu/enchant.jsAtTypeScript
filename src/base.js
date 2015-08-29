var Rf;
(function (Rf) {
    var Base;
    (function (Base) {
        /**
         * リソース情報
         * @classdesc リソース情報クラス
         * @constructor
         * @memberof Base
         */
        var Resource = (function () {
            /**
             * コンストラクタ
             * @method
             * @name Base.Resource#Resource
             * @param {string} keyword - リソースのキー
             * @param {string} fileName - リソース名
             */
            function Resource(keyword, fileName) {
                this.Keyword = keyword;
                this.FileName = fileName;
            }
            return Resource;
        })();
        Base.Resource = Resource;
        /**
         * リソース管理
         * @classdesc リソース管理クラス
         * @constructor
         * @memberof Base
         */
        var ResourceManager = (function () {
            /**
             * コンストラクタ
             * @method
             * @name Base.ResourceManager#ResourceManager
             */
            function ResourceManager() {
                this.ResourcePath = "";
                this.resources = new Array();
            }
            /**
            * リソース名を追加
            * @method
            * @name Base.ResourceManager#AddGetResourceName
            * @param {string} keyword - リソースのキー
            * @param {string} fileName - リソース名
             */
            ResourceManager.prototype.AddGetResourceName = function (keyword, fileName) {
                this.resources.push(new Resource(keyword, this.ResourcePath + fileName));
            };
            /**
            * リソースの配列を取得
            * @method
            * @name Base.ResourceManager#GetResourceNames
            * @return {string} リソースの配列を返す
             */
            ResourceManager.prototype.GetResourceNames = function () {
                var result = new Array();
                this.resources.forEach(function (value, index) {
                    result.push(value.FileName);
                });
                return result;
            };
            /**
             * リソース名を取得
             * @method
             * @name Base.ResourceManager#GetResourceName
             * @param {string} keyword - リソースのキー
             * @return {string} リソース名を返す
             */
            ResourceManager.prototype.GetResourceName = function (keyword) {
                var result = "";
                this.resources.filter(function (value) {
                    if (value.Keyword === keyword) {
                        result = value.FileName;
                        return false;
                    }
                });
                return result;
            };
            return ResourceManager;
        })();
        Base.ResourceManager = ResourceManager;
    })(Base = Rf.Base || (Rf.Base = {}));
})(Rf || (Rf = {}));



/// <reference path="../Interfaces/IPaintable.ts"/>
/// <reference path="../../../definitelytyped/enchantjs.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * UIパーツ
 * @namespace UIParts
 */
var Rf;
(function (Rf) {
    var UIParts;
    (function (UIParts) {
        /**
         * enchantjs用UIパーツのスーパークラス
         * @classdesc enchantjs用UIパーツのスーパークラス
         * @constructor
         * @memberof UIParts
         */
        var UIPartBase = (function () {
            /**
             * コンストラクタ
             * @method
             * @name UIParts.UIPartBase#UIPartBase
             */
            function UIPartBase() {
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
            UIPartBase.prototype.Refresh = function () {
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
            };
            /**
             * 更新イベントハンドラ
             * @method
             * @name UIParts.UIPartBase#OnRefresh
             */
            UIPartBase.prototype.OnRefresh = function () {
            };
            return UIPartBase;
        })();
        UIParts.UIPartBase = UIPartBase;
        /**
         * グループUI
         * @classdesc グループUIクラス
         * @constructor
         * @memberof UIParts
         * @extends UIParts.UIPartBase
         */
        var Group = (function (_super) {
            __extends(Group, _super);
            /**
             * コンストラクタ
             * @method
             * @name UIParts.Group#Group
             * @param {Object} stage - 親Node(enchantjsインスタンス)
             */
            function Group(stage) {
                _super.call(this);
                var rfView = RfView.Create("new Group()", stage);
                this.Ui = rfView.ui;
            }
            return Group;
        })(Rf.UIParts.UIPartBase);
        UIParts.Group = Group;
        /**
         * ラベルUI
         * @classdesc ラベルUIクラス
         * @constructor
         * @memberof UIParts
         * @extends UIParts.UIPartBase
         */
        var Label = (function (_super) {
            __extends(Label, _super);
            /**
             * コンストラクタ
             * @method
             * @name UIParts.Label#Label
             * @param {Object} stage - 親Node(enchantjsインスタンス)
             */
            function Label(stage) {
                _super.call(this);
                this.Width = 0;
                this.Height = 0;
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
            Label.prototype.OnRefresh = function () {
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
            };
            return Label;
        })(Rf.UIParts.UIPartBase);
        UIParts.Label = Label;
        /**
         * スプライトUI
         * @classdesc スプライトUIクラス
         * @constructor
         * @memberof UIParts
         * @extends UIParts.UIPartBase
         */
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            /**
             * コンストラクタ
             * @method
             * @name UIParts.Sprite#Sprite
             * @param {number} width - 表示サイズ.幅
             * @param {number} height - 表示サイズ.高さ
             * @param {Object} stage - 親Node(enchantjsインスタンス)
             */
            function Sprite(width, height, stage) {
                _super.call(this);
                this.FileName = "";
                this.Frame = 0;
                var rfView = RfView.Create("new Sprite(" + width + "," + height + ")", stage);
                this.Ui = rfView.ui;
            }
            /**
             * 更新イベントハンドラ
             * @method
             * @name UIParts.Sprite#OnRefresh
             */
            Sprite.prototype.OnRefresh = function () {
                if (this.FileName !== "") {
                    this.Ui.image = UIPartBase.assets[this.FileName];
                    this.Ui.frame = this.Frame;
                }
            };
            return Sprite;
        })(Rf.UIParts.UIPartBase);
        UIParts.Sprite = Sprite;
        /**
         * イメージ無しスプライトUI
         * @classdesc イメージ無しスプライトUIクラス
         * @constructor
         * @memberof UIParts
         * @extends UIParts.UIPartBase
         */
        var NoImageSprite = (function (_super) {
            __extends(NoImageSprite, _super);
            /**
             * コンストラクタ
             * @method
             * @name UIParts.NoImageSprite#NoImageSprite
             * @param {number} width - 表示サイズ.幅
             * @param {number} height - 表示サイズ.高さ
             * @param {Object} stage - 親Node(enchantjsインスタンス)
             */
            function NoImageSprite(width, height, stage) {
                _super.call(this);
                var rfView = RfView.Create("new Sprite(" + width + "," + height + ")", stage);
                this.Ui = rfView.ui;
            }
            /**
             * 塗りつぶし情報の設定
             * @method
             * @name UIParts.NoImageSprite#SetSurface
             * @param {string} fillStyle - 塗りつぶし情報
             */
            NoImageSprite.prototype.SetSurface = function (fillStyle) {
                var rfView = RfView.Create("new Surface(" + this.Ui.width + "," + this.Ui.height + ")", null);
                rfView.ui.context.beginPath();
                rfView.ui.context.fillStyle = fillStyle;
                rfView.ui.context.rect(0, 0, this.Ui.width, this.Ui.height);
                rfView.ui.context.fill();
                this.Ui.image = rfView.ui;
            };
            return NoImageSprite;
        })(Rf.UIParts.UIPartBase);
        UIParts.NoImageSprite = NoImageSprite;
        /**
         * マップUI
         * @classdesc マップUIクラス
         * @constructor
         * @memberof UIParts
         * @extends UIParts.UIPartBase
         */
        var Map = (function (_super) {
            __extends(Map, _super);
            /**
             * コンストラクタ
             * @method
             * @name UIParts.Map#Map
             * @param {number} tipWidth - マップチップサイズ.幅
             * @param {number} tipHeight - マップチップサイズ.高さ
             * @param {Object} stage - 親Node(enchantjsインスタンス)
             */
            function Map(tipWidth, tipHeight, stage) {
                _super.call(this);
                this.FileName = "";
                var rfView = RfView.Create("new Map(" + tipWidth + "," + tipHeight + ")", stage);
                this.Ui = rfView.ui;
            }
            /**
             * 更新イベントハンドラ
             * @method
             * @name UIParts.Map#OnRefresh
             */
            Map.prototype.OnRefresh = function () {
                this.Ui.image = UIPartBase.assets[this.FileName];
            };
            /**
             * マップ情報の読み込み
             * @method
             * @name UIParts.Map#LoadData
             * @param {Array} mapData - マップ情報（２次元配列）
             */
            Map.prototype.LoadData = function (mapData) {
                this.Ui.loadData(mapData);
            };
            /**
             * 複数のマップ情報の読み込み
             * @method
             * @name UIParts.Map#LoadDatas
             * @param {Array} mapData0 - 前景マップ情報（２次元配列）
             * @param {Array} mapData1 - 背景マップ情報（２次元配列）
             */
            Map.prototype.LoadDatas = function (mapData0, mapData1) {
                this.Ui.loadData(mapData0, mapData1);
            };
            return Map;
        })(Rf.UIParts.UIPartBase);
        UIParts.Map = Map;
    })(UIParts = Rf.UIParts || (Rf.UIParts = {}));
})(Rf || (Rf = {}));

/// <reference path="./UIParts.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rf;
(function (Rf) {
    var UIParts;
    (function (UIParts) {
        /**
         * キャラクタ
         * @classdesc キャラクタクラス
         * @constructor
         * @memberof UIParts
         * @extends UIParts.Sprite
         */
        var Character = (function (_super) {
            __extends(Character, _super);
            /**
             * コンストラクタ
             * @method
             * @name UIParts.Character#Character
             * @param {number} width - 表示サイズ.幅
             * @param {number} height - 表示サイズ.高さ
             * @param {Object} stage - 親Node(enchantjsインスタンス)
             */
            function Character(width, height, stage) {
                _super.call(this, width, height, stage);
                this.charaIndex = 0;
                this.waitCount = 0;
                this.dir = 2;
                this.anime = 0;
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
            Character.prototype.OnRefresh = function () {
                _super.prototype.OnRefresh.call(this);
                //フレーム処理
                this.Ui.frame = this.charaIndex * 2 + this.dir * 26;
                if (this.anime >= 2) {
                    this.Ui.frame += 1;
                }
            };
            /**
             * 実行処理実行
             * @method
             * @name UIParts.Character#Run
             * @return {boolean} 処理結果を返す
             */
            Character.prototype.Run = function () {
                this.SetAnime();
                return true;
            };
            /**
             * アニメ実行
             * @method
             * @name UIParts.Character#SetAnime
             */
            Character.prototype.SetAnime = function () {
                if (++this.anime >= 4) {
                    this.anime = 0;
                }
            };
            return Character;
        })(Rf.UIParts.Sprite);
        UIParts.Character = Character;
    })(UIParts = Rf.UIParts || (Rf.UIParts = {}));
})(Rf || (Rf = {}));

/// <reference path="./ResourceManager.ts"/>
/// <reference path="../UIParts/Character.ts"/>
/**
 * ベース
 * @namespace Base
 */
var Rf;
(function (Rf) {
    var Base;
    (function (Base) {
        /**
         * ゲームメイン処理
         * @classdesc ゲームメインクラス
         * @constructor
         * @memberof Base
         */
        var GameMain = (function () {
            /**
             * コンストラクタ
             * @method
             * @name Base.GameMain#GameMain
             */
            function GameMain() {
                this.resourceManager = new Base.ResourceManager();
            }
            /**
             * リソースのルートパスを設定
             * @method
             * @name Base.GameMain#SetResourcePath
             * @param {string} path - ルートパス
             */
            GameMain.prototype.SetResourcePath = function (path) {
                this.resourceManager.ResourcePath = path;
            };
            /**
             * リソース名を追加
             * @method
             * @name Base.GameMain#AddGetResourceName
             * @param {string} keyword - リソースのキー
             * @param {string} fileName - リソース名
             */
            GameMain.prototype.AddGetResourceName = function (keyword, fileName) {
                this.resourceManager.AddGetResourceName(keyword, fileName);
            };
            /**
             * リソースの配列を取得
             * @method
             * @name Base.GameMain#GetResourceNames
             * @return {string} リソースの配列を返す
             */
            GameMain.prototype.GetResourceNames = function () {
                return this.resourceManager.GetResourceNames();
            };
            /**
             * リソース名を取得
             * @method
             * @name Base.GameMain#GetResourceName
             * @param {string} keyword - リソースのキー
             * @return {string} リソース名を返す
             */
            GameMain.prototype.GetResourceName = function (keyword) {
                return this.resourceManager.GetResourceName(keyword);
            };
            return GameMain;
        })();
        Base.GameMain = GameMain;
    })(Base = Rf.Base || (Rf.Base = {}));
})(Rf || (Rf = {}));
