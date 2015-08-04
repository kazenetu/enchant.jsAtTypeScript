var RfView = function () {
    this.ui = null;
};

RfView.Create = function (uiName, stage) {
    var instance = new RfView();
    instance.ui = new Function('return '+uiName)();
    if (stage !== null) {
        stage.addChild(instance.ui);
    }
    return instance;
};

RfView.GetAssets = function () {
    return enchant.Core.instance.assets;
};

RfView.GetScreenWidth = function () {
    return enchant.Core.instance.width;
};

RfView.GetScreenHeight = function () {
    return enchant.Core.instance.height;
};