# enchant.jsAtTypeScript
TypeScriptでenchant.jsを簡易的に使えるようにするライブラリ  
[実装サンプルのデモ](http://kazenetu.github.io/enchant.jsAtTypeScript/)

## ビルド方法
  * VisualStudio2013以降でビルドする場合  
本ディレクトリのslnファイルからVisualStudioを立ち上げてください。

  * Node.jsでビルドする場合  
npm installした上で、下記を実行してください。  
   * ```gulp buildBases``` ライブラリをビルドします。
   * ```gulp buildExamples``` 実装例をビルドします。
   * ```gulp``` ライブラリと実装例をビルドします。

## 実装方法
実装の全体は[example/Basicのmain.ts](./example/Basic/main.ts)をご覧ください。  
現在使用できるenchantjsのクラスは以下のとおりです。

* Group
* Label
* Sprite
* Surface

enchantjsのインスタンスは```UIPartクラス#Ui```に格納されます。  
そのため、画面に更新結果を反映する場合は```UIPartクラス#Refresh() ```を実行します。  

```typescript:[実装例](example/Basic/main.ts)
public Run(): void {
    //グループを右に移動する
    this.group.X += 2;
    if (this.group.X >= 100) {
        this.group.X = 0;
    }
    //TypeScriptの情報をenchantjsのインスタンスに反映する
    this.group.Refresh();

    //グループ内メンバのラベルを下に移動する
    this.label.Y += 2;
    if (this.label.Y >= 100) {
        this.label.Y = 0;
    }
    //TypeScriptの情報をenchantjsのインスタンスに反映する
    this.label.Refresh();
}
```

### 各クラスで利用可能なプロパティ・メソッド

|クラス名|プロパティ|メソッド|
|:---------|:---------|:---------|
|Group  |X(number)<br>Y(number) <br>OriginX(number)<br>OriginY(number)<br>Rotation(number)<br>ScaleX(number)<br>ScaleY(number)<br>Opacity(number)<br>TouchEnabled(boolean)<br>Visible(boolean)<br>||
|Label  |X(number)<br>Y(number)<br>OriginX(number)<br>OriginY(number)<br>Rotation(number)<br>ScaleX(number)<br>ScaleY(number)<br>Opacity(number)<br>TouchEnabled(boolean)<br>Visible(boolean)<br>Text(string)<br>Width(number)<br>Height(number)<br>Color(string)<br>TextAlign(string)||
|Sprite  |X(number)<br>Y(number)<br>OriginX(number)<br>OriginY(number)<br>Rotation(number)<br>ScaleX(number)<br>ScaleY(number)<br>Opacity(number)<br>TouchEnabled(boolean)<br>Visible(boolean)<br>FileName(string)<br>Frame(number)||
|Surface  |X(number)<br>Y(number)<br>OriginX(number)<br>OriginY(number)<br>Rotation(number)<br>ScaleX(number)<br>ScaleY(number)<br>Opacity(number)<br>TouchEnabled(boolean)<br>Visible(boolean)<br>|SetSurface(fillStyle: string):void|

## License
MIT license.
