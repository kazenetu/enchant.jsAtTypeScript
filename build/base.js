var Rf;
(function (Rf) {
    var Base;
    (function (Base) {
        /*
         * リソース情報
        */
        var Resource = (function () {
            function Resource(keyword, fileName) {
                this.Keyword = keyword;
                this.FileName = fileName;
            }
            return Resource;
        })();
        Base.Resource = Resource;
        /*
         * リソース管理クラス
        */
        var ResourceManager = (function () {
            function ResourceManager() {
                this.ResourcePath = "";
                this.resources = new Array();
            }
            ResourceManager.prototype.AddGetResourceName = function (keyword, fileName) {
                this.resources.push(new Resource(keyword, this.ResourcePath + fileName));
            };
            ResourceManager.prototype.GetResourceNames = function () {
                var result = new Array();
                this.resources.forEach(function (value, index) {
                    result.push(value.FileName);
                });
                return result;
            };
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
var Rf;
(function (Rf) {
    var UIParts;
    (function (UIParts) {
        /**
         * enchantjs用UIパーツのスーパークラス
        */
        var UIPartBase = (function () {
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
            UIPartBase.prototype.OnRefresh = function () {
            };
            return UIPartBase;
        })();
        UIParts.UIPartBase = UIPartBase;
        /**
         * グループUI
        */
        var Group = (function (_super) {
            __extends(Group, _super);
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
        */
        var Label = (function (_super) {
            __extends(Label, _super);
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
        */
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite(width, height, stage) {
                _super.call(this);
                this.FileName = "";
                var rfView = RfView.Create("new Sprite(" + width + "," + height + ")", stage);
                this.Ui = rfView.ui;
            }
            Sprite.prototype.OnRefresh = function () {
                if (this.FileName !== "") {
                    this.Ui.image = UIPartBase.assets[this.FileName];
                }
            };
            return Sprite;
        })(Rf.UIParts.UIPartBase);
        UIParts.Sprite = Sprite;
        /**
          * イメージ無しスプライトUI
        **/
        var NoImageSprite = (function (_super) {
            __extends(NoImageSprite, _super);
            /**
             * イメージ無しスプライトUI
            */
            function NoImageSprite(width, height, stage) {
                _super.call(this);
                var rfView = RfView.Create("new Sprite(" + width + "," + height + ")", stage);
                this.Ui = rfView.ui;
            }
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
        */
        var Map = (function (_super) {
            __extends(Map, _super);
            function Map(tipWidth, tipHeight, stage) {
                _super.call(this);
                this.FileName = "";
                var rfView = RfView.Create("new Map(" + tipWidth + "," + tipHeight + ")", stage);
                this.Ui = rfView.ui;
            }
            Map.prototype.OnRefresh = function () {
                this.Ui.image = UIPartBase.assets[this.FileName];
            };
            Map.prototype.LoadData = function (mapData) {
                this.Ui.loadData(mapData);
            };
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
        */
        var Character = (function (_super) {
            __extends(Character, _super);
            /**
             * キャラクタ
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
             * プロパティをjsオブジェクトに反映
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
            */
            Character.prototype.Run = function () {
                this.SetAnime();
                return true;
            };
            /**
             * アニメ処理
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
var Rf;
(function (Rf) {
    var Base;
    (function (Base) {
        /*
         * ゲームメイン処理
        */
        var GameMain = (function () {
            function GameMain() {
                this.resourceManager = new Base.ResourceManager();
            }
            GameMain.prototype.SetResourcePath = function (path) {
                this.resourceManager.ResourcePath = path;
            };
            GameMain.prototype.AddGetResourceName = function (keyword, fileName) {
                this.resourceManager.AddGetResourceName(keyword, fileName);
            };
            GameMain.prototype.GetResourceNames = function () {
                return this.resourceManager.GetResourceNames();
            };
            GameMain.prototype.GetResourceName = function (keyword) {
                return this.resourceManager.GetResourceName(keyword);
            };
            return GameMain;
        })();
        Base.GameMain = GameMain;
    })(Base = Rf.Base || (Rf.Base = {}));
})(Rf || (Rf = {}));
