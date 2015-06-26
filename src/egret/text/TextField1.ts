//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module egret.sys {
    /**
     * @private
     */
    export const enum TextKeys {
        /**
         * @private
         */
        fontSize,
        /**
         * @private
         */
        lineSpacing,
        /**
         * @private
         */
        textColor,
        /**
         * @private
         */
        textFieldWidth,
        /**
         * @private
         */
        textFieldHeight,
        /**
         * @private
         */
        textWidth,
        /**
         * @private
         */
        textHeight,
        /**
         * @private
         */
        textDrawWidth,
        /**
         * @private
         */
        fontFamily,
        /**
         * @private
         */
        textAlign,
        /**
         * @private
         */
        verticalAlign,
        /**
         * @private
         */
        textColorString,
        /**
         * @private
         */
        fontString,
        /**
         * @private
         */
        text,
        /**
         * @private
         */
        measuredWidths,
        /**
         * @private
         */
        bold,
        /**
         * @private
         */
        italic,
        /**
         * @private
         */
        fontStringChanged,
        /**
         * @private
         */
        textLinesChanged,
        /**
         * @private
         */
        wordWrap,
        /**
         * @private
         */
        displayAsPassword,
        /**
         * @private
         */
        maxChars,
        /**
         * @private
         */
        selectionActivePosition,
        /**
         * @private
         */
        selectionAnchorPosition,
        /**
         * @private
         */
        type,
        /**
         * @private
         */
        strokeColor,
        /**
         * @private
         */
        strokeColorString,
        /**
         * @private
         */
        stroke,
        /**
         * @private
         */
        scrollV,
        /**
         * @private
         */
        numLines,
        /**
         * @private
         */
        multiline,
        /**
         * @private
         */
        border,
        /**
         * @private
         */
        borderColor,
        /**
         * @private
         */
        background,
        /**
         * @private
         */
        backgroundColor
    }
}

module egret {
    /**
     * @class egret.TextField
     * @classdesc
     * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
     * 如果开发者希望所有平台完全无差异，请使用BitmapText
     * @extends egret.DisplayObject
     * @link http://docs.egret-labs.org/post/manual/text/createtext.html 创建文本
     */
    export class TextField1 extends DisplayObject {

        public static default_fontFamily:string = "Arial";

        constructor() {
            super();
            this.$renderRegion = new sys.Region();
            this.$TextField = {
                0: 30,             //fontSize
                1: 0,              //lineSpacing
                2: 0x000000,       //textColor
                3: NONE,           //textFieldWidth
                4: NONE,           //textFieldHeight
                5: 0,              //textWidth
                6: 0,              //textHeight
                7: 0,              //textDrawWidth
                8: "sans-serif",   //fontFamily
                9: "left",         //textAlign
                10: "top",         //verticalAlign
                11: "#000000",     //textColorString
                12: "",            //fontString
                13: "",            //text
                14: [],            //measuredWidths
                15: false,         //bold,
                16: false,         //italic,
                17: true,          //fontStringChanged,
                18: false,         //textLinesChanged,
                19: true,          //wordWrap
                20: false,         //displayAsPassword
                21: 0,              //maxChars
                22: TextFieldType.DYNAMIC,              //type
                23: 0xFFFFFF,              //strokeColor
                24: "#FFFFFF",              //strokeColorString
                25: 0,              //stroke
                26: -1,              //scrollV
                27: 0,              //numLines
                28: false,              //multiline
                29: false,              //border
                30: 0x000000,              //borderColor
                31: false,              //background
                32: 0xffffff              //backgroundColor
            };
        }

        /**
         * @private
         */
        $TextField:Object;

        private isInput():boolean {
            return this.$TextField[sys.TextKeys.type] == TextFieldType.INPUT;
        }

        /**
         * @language en_US
         * The name of the font to use, or a comma-separated list of font names.
         * @default "sans-serif"
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要使用的字体的名称或用逗号分隔的字体名称列表。
         * @default "sans-serif"
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get fontFamily():string {
            return this.$TextField[sys.TextKeys.fontFamily];
        }

        public set fontFamily(value:string) {
            var values = this.$TextField;
            if (values[sys.TextKeys.fontFamily] == value) {
                return;
            }
            values[sys.TextKeys.fontFamily] = value;
            this.invalidateFontString();
        }

        /**
         * @language en_US
         * The size in pixels of text
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本的字号大小。
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get size():number {
            return this.$TextField[sys.TextKeys.fontSize];
        }

        public set size(value:number) {
            value = +value || 0;
            var values = this.$TextField;
            if (values[sys.TextKeys.fontSize] === value) {
                return;
            }
            values[sys.TextKeys.fontSize] = value;
            this.invalidateFontString();
        }

        public get fontSize():number {
            return this.$TextField[sys.TextKeys.fontSize];
        }

        public set fontSize(value:number) {
            value = +value || 0;
            var values = this.$TextField;
            if (values[sys.TextKeys.fontSize] === value) {
                return;
            }
            values[sys.TextKeys.fontSize] = value;
            this.invalidateFontString();
        }

        /**
         * @language en_US
         * Specifies whether the text is boldface.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否显示为粗体。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get bold():boolean {
            return this.$TextField[sys.TextKeys.bold];
        }

        public set bold(value:boolean) {
            value = !!value;
            var values = this.$TextField;
            if (value === values[sys.TextKeys.bold]) {
                return;
            }
            values[sys.TextKeys.bold] = value;
            this.invalidateFontString();
        }

        /**
         * @language en_US
         * Determines whether the text is italic font.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否显示为斜体。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get italic():boolean {
            return this.$TextField[sys.TextKeys.italic];
        }

        public set italic(value:boolean) {
            value = !!value;
            var values = this.$TextField;
            if (value === values[sys.TextKeys.italic]) {
                return;
            }
            values[sys.TextKeys.italic] = value;
            this.invalidateFontString();
        }

        /**
         * @private
         *
         */
        private invalidateFontString():void {
            this.$TextField[sys.TextKeys.fontStringChanged] = true;
            this.$invalidateContentBounds();
        }

        /**
         * @private
         * 获取字体信息的字符串形式。
         */
        private getFontString():string {
            var values = this.$TextField;
            if (values[sys.TextKeys.fontStringChanged]) {
                values[sys.TextKeys.fontStringChanged] = false;
                values[sys.TextKeys.fontString] = sys.toFontString(this);
            }
            return values[sys.TextKeys.fontString];
        }

        /**
         * @language en_US
         * Horizontal alignment of text.
         * @default：lark.HorizontalAlign.LEFT
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本的水平对齐方式。
         * @default：lark.HorizontalAlign.LEFT
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get textAlign():string {
            return this.$TextField[sys.TextKeys.textAlign];
        }

        public set textAlign(value:string) {
            var values = this.$TextField;
            if (values[sys.TextKeys.textAlign] == value) {
                return;
            }
            values[sys.TextKeys.textAlign] = value;
            this.$invalidateContentBounds();
        }

        /**
         * @language en_US
         * Vertical alignment of text.
         * @default：lark.VerticalAlign.TOP
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文字的垂直对齐方式。
         * @default：lark.VerticalAlign.TOP
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get verticalAlign():string {
            return this.$TextField[sys.TextKeys.verticalAlign];
        }

        public set verticalAlign(value:string) {
            var values = this.$TextField;
            if (values[sys.TextKeys.verticalAlign] == value) {
                return;
            }
            values[sys.TextKeys.verticalAlign] = value;
            this.$invalidateContentBounds();
        }

        /**
         * @language en_US
         * An integer representing the amount of vertical space between lines.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个整数，表示行与行之间的垂直间距量
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get lineSpacing():number {
            return this.$TextField[sys.TextKeys.lineSpacing];
        }

        public set lineSpacing(value:number) {
            value = +value || 0;
            var values = this.$TextField;
            if (values[sys.TextKeys.lineSpacing] === value)
                return;
            values[sys.TextKeys.lineSpacing] = value;
            this.$invalidateContentBounds();
        }

        /**
         * @language en_US
         * Color of the text.
         * @default 0x000000
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本颜色
         * @default 0x000000
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get textColor():number {
            return this.$TextField[sys.TextKeys.textColor];
        }

        public set textColor(value:number) {
            value = +value | 0;
            var values = this.$TextField;
            if (values[sys.TextKeys.textColor] === value) {
                return;
            }
            values[sys.TextKeys.textColor] = value;
            values[sys.TextKeys.textColorString] = sys.toColorString(value);
            this.$invalidate();
        }

        /**
         * @language en_US
         * A Boolean value that indicates whether the text field has word wrap. If the value of wordWrap is true, the text
         * field has word wrap; if the value is false, the text field does not have word wrap.
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
         * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get wordWrap():boolean {
            return this.$TextField[sys.TextKeys.wordWrap];
        }

        public set wordWrap(value:boolean) {
            value = !!value;
            var values = this.$TextField;
            if (value === values[sys.TextKeys.wordWrap]) {
                return;
            }
            if (values[sys.TextKeys.displayAsPassword]) {
                return;
            }
            values[sys.TextKeys.wordWrap] = value;
            this.$invalidateContentBounds();
        }

        private _inputUtils:InputController = null;

        /**
         * 文本字段的类型。
         * 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
         * 默认值为 dynamic。
         * @member {string} egret.TextField#type
         */
        public set type(value:string) {
            this._setType(value);
        }

        public _setType(value:string):void {
            if (this.$TextField[sys.TextKeys.type] != value) {
                this.$TextField[sys.TextKeys.type] = value;
                if (value == TextFieldType.INPUT) {//input，如果没有设置过宽高，则设置默认值为100，30
                    if (this.$TextField[sys.TextKeys.textFieldWidth] == NONE) {
                        this.$setWidth(100);
                    }
                    if (this.$TextField[sys.TextKeys.textFieldHeight] == NONE) {
                        this.$setHeight(30);
                    }

                    this.$setTouchEnabled(true);

                    //创建stageText
                    if (this._inputUtils == null) {
                        this._inputUtils = new egret.InputController();
                    }

                    this._inputUtils.init(this);
                    this.$invalidateContentBounds();

                    if (this.$stage) {
                        this._inputUtils._addStageText();
                    }
                }
                else {
                    if (this._inputUtils) {
                        this._inputUtils._removeStageText();
                        this._inputUtils = null;
                    }
                    this.$setTouchEnabled(false);
                }
            }
        }

        public get type():string {
            return this.$TextField[sys.TextKeys.type];
        }

        public get text():string {
            return this.$getText();
        }

        public $getText():string {
            if (this.$TextField[sys.TextKeys.type] == egret.TextFieldType.INPUT) {
                return this._inputUtils._getText();
            }

            return this.$TextField[sys.TextKeys.text];
        }

        /**
         * 作为文本字段中当前文本的字符串
         * @member {string} egret.TextField#text
         */
        public set text(value:string) {
            this.$setText(value);
        }

        public _setBaseText(value:string):void {
            if (value == null) {
                value = "";
            }

            this._isFlow = false;
            if (this.$TextField[sys.TextKeys.text] != value) {
                this.$invalidateContentBounds();
                this.$TextField[sys.TextKeys.text] = value;
                var text:string = "";
                if (this.$TextField[sys.TextKeys.displayAsPassword]) {
                    text = this.changeToPassText(value);
                }
                else {
                    text = value;
                }

                this.setMiddleStyle([<egret.ITextElement>{text: text}]);
            }
        }

        $setText(value:string):void {
            if (value == null) {
                value = "";
            }
            this._setBaseText(value);
            if (this._inputUtils) {
                this._inputUtils._setText(this.$TextField[sys.TextKeys.text]);
            }
        }

        public get displayAsPassword():boolean {
            return this.$TextField[sys.TextKeys.displayAsPassword];
        }

        /**
         * 指定文本字段是否是密码文本字段。
         * 如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
         * 默认值为 false。
         * @member {boolean} egret.TextInput#displayAsPassword
         */
        public set displayAsPassword(value:boolean) {
            this._setDisplayAsPassword(value);
        }

        public _setDisplayAsPassword(value:boolean):void {
            var self = this;
            if (this.$TextField[sys.TextKeys.displayAsPassword] != value) {
                this.$TextField[sys.TextKeys.displayAsPassword] = value;
                this.$invalidateContentBounds();

                var text:string = "";
                if (value) {
                    text = this.changeToPassText(this.$TextField[sys.TextKeys.text]);
                }
                else {
                    text = this.$TextField[sys.TextKeys.text];
                }

                this.setMiddleStyle([<egret.ITextElement>{text: text}]);
            }
        }

        public get strokeColor():number {
            return this.$TextField[sys.TextKeys.strokeColor];
        }

        /**
         * 表示文本的描边颜色。
         * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
         * 默认值为 0x000000。
         * @member {number} egret.TextField#strokeColor
         */
        public set strokeColor(value:number) {
            this._setStrokeColor(value);
        }

        public _setStrokeColor(value:number):void {
            if (this.$TextField[sys.TextKeys.strokeColor] != value) {
                this.$invalidateContentBounds();
                this.$TextField[sys.TextKeys.strokeColor] = value;
                this.$TextField[sys.TextKeys.strokeColorString] = toColorString(value);
            }
        }


        public get stroke():number {
            return this.$TextField[sys.TextKeys.stroke];
        }

        /**
         * 表示描边宽度。
         * 0为没有描边。
         * 默认值为 0。
         * @member {number} egret.TextField#stroke
         */
        public set stroke(value:number) {
            this._setStroke(value);
        }

        public _setStroke(value:number):void {
            if (this.$TextField[sys.TextKeys.stroke] != value) {
                this.$invalidateContentBounds();
                this.$TextField[sys.TextKeys.stroke] = value;
            }
        }

        public get maxChars():number {
            return this.$TextField[sys.TextKeys.maxChars];
        }

        /**
         * 文本字段中最多可包含的字符数（即用户输入的字符数）。
         * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
         * 默认值为 0。
         */
        public set maxChars(value:number) {
            this._setMaxChars(value);
        }

        public _setMaxChars(value:number):void {
            if (this.$TextField[sys.TextKeys.maxChars] != value) {
                this.$TextField[sys.TextKeys.maxChars] = value;
            }
        }

        /**
         * 文本在文本字段中的垂直位置。scrollV 属性可帮助用户定位到长篇文章的特定段落，还可用于创建滚动文本字段。
         * 垂直滚动的单位是行，而水平滚动的单位是像素。
         * 如果显示的第一行是文本字段中的第一行，则 scrollV 设置为 1（而非 0）。
         * @param value
         */
        public set scrollV(value:number) {
            this.$TextField[sys.TextKeys.scrollV] = Math.max(value, 1);

            this.$invalidateContentBounds();
        }

        public get scrollV():number {
            return Math.min(Math.max(this.$TextField[sys.TextKeys.scrollV], 1), this.maxScrollV);
        }

        /**
         * scrollV 的最大值
         * @returns {number}
         */
        public get maxScrollV():number {
            this._getLinesArr();
            return Math.max(this.$TextField[sys.TextKeys.numLines] - TextFieldUtils._getScrollNum(this) + 1, 1);
        }

        public get selectionBeginIndex():number {
            return 0;
        }

        public get selectionEndIndex():number {
            return 0;
        }

        public get caretIndex():number {
            return 0;
        }

        public $setSelection(beginIndex:number, endIndex:number) {

        }

        $getLineHeight():number {
            return this.$TextField[sys.TextKeys.lineSpacing] + this.$TextField[sys.TextKeys.fontSize];
        }

        /**
         * 文本行数。
         * @member {number} egret.TextField#numLines
         */
        public get numLines():number {
            return this.$TextField[sys.TextKeys.numLines];
        }

        /**
         * 表示字段是否为多行文本字段。注意，此属性仅在type为TextFieldType.INPUT时才有效。
         * 如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 TextFieldType.INPUT 的字段中，multiline 值将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。
         * 默认值为 false。
         * @member {boolean} egret.TextField#multiline
         */
        public set multiline(value:boolean) {
            this._setMultiline(value);
        }

        public _setMultiline(value:boolean):void {
            this.$TextField[sys.TextKeys.multiline] = value;
            this.$invalidateContentBounds();
        }

        public get multiline():boolean {
            return this.$TextField[sys.TextKeys.multiline];
        }

        $setWidth(value:number):void {
            value = +value || 0;
            var values = this.$TextField;
            if (value < 0 || value === values[sys.TextKeys.textFieldWidth]) {
                return;
            }
            values[sys.TextKeys.textFieldWidth] = value;
            this.$invalidateContentBounds();

            this.fillBackground();
        }

        $setHeight(value:number):void {
            value = +value || 0;
            var values = this.$TextField;
            if (value < 0 || value === values[sys.TextKeys.textFieldHeight]) {
                return;
            }
            values[sys.TextKeys.textFieldHeight] = value;

            this.fillBackground();
        }

        private _bgGraphics:Graphics = null;

        /**
         * 指定文本字段是否具有边框。
         * 如果为 true，则文本字段具有边框。如果为 false，则文本字段没有边框。
         * 使用 borderColor 属性来设置边框颜色。
         * 默认值为 false。
         * @member {boolean} egret.TextField#border
         */
        public set border(value:boolean) {
            this.$TextField[sys.TextKeys.border] = value;
            this.fillBackground();
        }

        public get border():boolean {
            return this.$TextField[sys.TextKeys.border];
        }

        /**
         * 文本字段边框的颜色。默认值为 0x000000（黑色）。
         * 即使当前没有边框，也可检索或设置此属性，但只有当文本字段已将 border 属性设置为 true 时，才可以看到颜色。
         * @member {number} egret.TextField#borderColor
         */
        public set borderColor(value:number) {
            this.$TextField[sys.TextKeys.borderColor] = value;
            this.fillBackground();
        }

        public get borderColor():number {
            return this.$TextField[sys.TextKeys.borderColor];
        }

        /**
         * 指定文本字段是否具有背景填充。
         * 如果为 true，则文本字段具有背景填充。如果为 false，则文本字段没有背景填充。
         * 使用 backgroundColor 属性来设置文本字段的背景颜色。
         * 默认值为 false。
         * @member {boolean} egret.TextField#background
         */
        public set background(value:boolean) {
            this.$TextField[sys.TextKeys.background] = value;
            this.fillBackground();
        }

        public get background():boolean {
            return this.$TextField[sys.TextKeys.background];
        }

        /**
         * 文本字段背景的颜色。默认值为 0xFFFFFF（白色）。
         * 即使当前没有背景，也可检索或设置此属性，但只有当文本字段已将 background 属性设置为 true 时，才可以看到颜色。
         * @member {number} egret.TextField#backgroundColor
         */
        public set backgroundColor(value:number) {
            this.$TextField[sys.TextKeys.backgroundColor] = value;
            this.fillBackground();
        }

        public get backgroundColor():number {
            return this.$TextField[sys.TextKeys.backgroundColor];
        }

        private fillBackground():void {
            var self = this;
            var graphics:egret.Graphics = self._bgGraphics;
            if (graphics) {
                graphics.clear();
            }
            if (this.$TextField[sys.TextKeys.background] || this.$TextField[sys.TextKeys.border]) {
                if (graphics == null) {
                    graphics = self._bgGraphics = new egret.Graphics();
                    this._bgGraphics.$renderContext.$targetDisplay = this;
                }
                if (this.$TextField[sys.TextKeys.background]) {
                    graphics.beginFill(this.$TextField[sys.TextKeys.backgroundColor], 1);
                }
                if (this.$TextField[sys.TextKeys.border]) {
                    graphics.lineStyle(1, this.$TextField[sys.TextKeys.borderColor]);
                }
                graphics.drawRect(0, 0, self.$getWidth(), self.$getHeight());
                graphics.endFill();
            }
        }

        public setFocus() {
            //todo:
            Logger.warningWithErrorId(1013);
        }

        public $onRemoveFromStage():void {
            super.$onRemoveFromStage();

            this._removeEvent();

            if (this.$TextField[sys.TextKeys.type] == TextFieldType.INPUT) {
                this._inputUtils._removeStageText();
            }
        }

        public $onAddToStage(stage:Stage, nestLevel:number):void {
            super.$onAddToStage(stage, nestLevel);

            this._addEvent();

            if (this.$TextField[sys.TextKeys.type] == TextFieldType.INPUT) {
                this._inputUtils._addStageText();
            }
        }

        /**
         * @private
         */
        $invalidateContentBounds():void {
            super.$invalidateContentBounds();
            this.$TextField[sys.TextKeys.textLinesChanged] = true;
        }

        /**
         * @private
         */
        $measureContentBounds(bounds:Rectangle):void {
            var self = this;
            this._getLinesArr();
            if (this.$TextField[sys.TextKeys.textWidth] == 0) {
                bounds.setEmpty();
            }
            else {
                var w:number = this.$TextField[sys.TextKeys.textFieldWidth] != NONE ? this.$TextField[sys.TextKeys.textFieldWidth] : this.$TextField[sys.TextKeys.textWidth];
                var h:number = this.$TextField[sys.TextKeys.textFieldHeight] != NONE ? this.$TextField[sys.TextKeys.textFieldHeight] : TextFieldUtils._getTextHeight(self);
                bounds.setTo(0, 0, w, h);
            }
        }

        /**
         * @see egret.DisplayObject._render
         * @param renderContext
         */
        $render(renderContext:sys.RenderContext):void {
            if (this._bgGraphics)
                this._bgGraphics.$render(renderContext);

            if (this.$TextField[sys.TextKeys.type] == TextFieldType.INPUT) {
                this._inputUtils._updateProperties();
                if (this._isTyping) {
                    return;
                }
            }
            else if (this.$TextField[sys.TextKeys.textFieldWidth] == 0) {
                return;
            }

            this.drawText(renderContext);
        }

        private _isFlow:boolean = false;

        /**
         * 设置富文本
         * @param textArr 富文本数据
         */
        public set textFlow(textArr:Array<egret.ITextElement>) {
            var self = this;
            this._isFlow = true;
            var text:string = "";
            if (textArr == null)
                textArr = [];
            for (var i:number = 0; i < textArr.length; i++) {
                var element:egret.ITextElement = textArr[i];
                text += element.text;
            }

            if (this.$TextField[sys.TextKeys.displayAsPassword]) {
                this._setBaseText(text);
            }
            else {
                this.$TextField[sys.TextKeys.text] = text;
                this.setMiddleStyle(textArr);
            }
        }

        public get textFlow():Array<egret.ITextElement> {
            return this._textArr;
        }

        private changeToPassText(text:string):string {
            if (this.$TextField[sys.TextKeys.displayAsPassword]) {
                var passText:string = "";
                for (var i:number = 0, num = text.length; i < num; i++) {
                    switch (text.charAt(i)) {
                        case '\n' :
                            passText += "\n";
                            break;
                        case '\r' :
                            break;
                        default :
                            passText += '*';
                    }
                }
                return passText;
            }
            return text;
        }

        private _textArr:Array<egret.ITextElement> = [];
        private _isArrayChanged:boolean = false;

        private setMiddleStyle(textArr:Array<egret.ITextElement>):void {
            this._isArrayChanged = true;
            this._textArr = textArr;
            this.$invalidateContentBounds();
        }

        public get textWidth():number {
            return this.$TextField[sys.TextKeys.textWidth];
        }

        public get textHeight():number {
            return TextFieldUtils._getTextHeight(this);
        }

        public appendText(text:string):void {
            this.appendElement(<egret.ITextElement>{text: text});
        }

        public appendElement(element:egret.ITextElement):void {
            this._textArr.push(element);
            this.setMiddleStyle(this._textArr);
        }

        private _linesArr:Array<egret.ILineElement> = [];

        public _getLinesArr():Array<egret.ILineElement> {
            var self = this;
            if (!self._isArrayChanged) {
                return self._linesArr;
            }

            self._isArrayChanged = false;
            var text2Arr:Array<egret.ITextElement> = self._textArr;
            var renderContext = sys.sharedRenderContext;

            self._linesArr.length = 0;
            this.$TextField[sys.TextKeys.textHeight] = 0;
            this.$TextField[sys.TextKeys.textWidth] = 0;

            var textFieldWidth:number = this.$TextField[sys.TextKeys.textFieldWidth];
            //宽度被设置为0
            if (textFieldWidth != NONE && textFieldWidth == 0) {
                this.$TextField[sys.TextKeys.numLines] = 0;
                return [{width: 0, height: 0, charNum: 0, elements: [], hasNextLine: false}];
            }

            if (!self._isFlow) {
                setupFont(renderContext, self);
            }

            var linesArr:Array<egret.ILineElement> = self._linesArr;
            var lineW:number = 0;
            var lineCharNum:number = 0;
            var lineH:number = 0;
            var lineCount:number = 0;
            var lineElement:egret.ILineElement;

            for (var i:number = 0, text2ArrLength:number = text2Arr.length; i < text2ArrLength; i++) {
                var element:egret.ITextElement = text2Arr[i];
                element.style = element.style || <egret.ITextStyle>{};

                var text:string = element.text.toString();
                var textArr:Array<string> = text.split(/(?:\r\n|\r|\n)/);

                for (var j:number = 0, textArrLength:number = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = {width: 0, height: 0, elements: [], charNum: 0, hasNextLine: false};
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                        lineCharNum = 0;
                    }

                    if (this.$TextField[sys.TextKeys.type] == egret.TextFieldType.INPUT) {
                        lineH = this.$TextField[sys.TextKeys.fontSize];
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || this.$TextField[sys.TextKeys.fontSize]);
                    }

                    var isNextLine:boolean = true;
                    if (textArr[j] == "") {
                        if (j == textArrLength - 1) {
                            isNextLine = false;
                        }
                    }
                    else {
                        if (self._isFlow) {
                            setupFont(renderContext, self, element.style);
                        }
                        var w:number = renderContext.measureText(textArr[j]).width;
                        if (textFieldWidth == NONE) {//没有设置过宽
                            lineW += w;
                            lineCharNum += textArr[j].length;
                            lineElement.elements.push(<egret.IWTextElement>{
                                width: w,
                                text: textArr[j],
                                style: element.style
                            });

                            if (j == textArrLength - 1) {
                                isNextLine = false;
                            }
                        }
                        else {
                            if (lineW + w <= textFieldWidth) {//在设置范围内
                                lineElement.elements.push(<egret.IWTextElement>{
                                    width: w,
                                    text: textArr[j],
                                    style: element.style
                                });
                                lineW += w;
                                lineCharNum += textArr[j].length;

                                if (j == textArrLength - 1) {
                                    isNextLine = false;
                                }
                            }
                            else {
                                var k:number = 0;
                                var ww:number = 0;
                                var word:string = textArr[j];
                                var wl:number = word.length;
                                for (; k < wl; k++) {
                                    w = renderContext.measureText(word.charAt(k)).width;
                                    if (lineW + w > textFieldWidth && lineW + k != 0) {
                                        break;
                                    }
                                    ww += w;
                                    lineW += w;
                                    lineCharNum += 1;
                                }

                                if (k > 0) {
                                    lineElement.elements.push(<egret.IWTextElement>{
                                        width: ww,
                                        text: word.substring(0, k),
                                        style: element.style
                                    });
                                    textArr[j] = word.substring(k);
                                }

                                j--;
                                isNextLine = false;
                            }
                        }
                    }

                    if (isNextLine) {
                        lineCharNum++;
                        lineElement.hasNextLine = true;
                    }

                    if (j < textArr.length - 1) {//非最后一个
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        this.$TextField[sys.TextKeys.textWidth] = Math.max(this.$TextField[sys.TextKeys.textWidth], lineW);
                        this.$TextField[sys.TextKeys.textHeight] += lineH;

                        //if (self._type == TextFieldType.INPUT && !self._multiline) {
                        //    self._numLines = linesArr.length;
                        //    return linesArr;
                        //}
                        lineCount++;
                    }


                }

                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    lineElement.charNum = lineCharNum;
                    this.$TextField[sys.TextKeys.textWidth] = Math.max(this.$TextField[sys.TextKeys.textWidth], lineW);
                    this.$TextField[sys.TextKeys.textHeight] += lineH;
                }
            }

            this.$TextField[sys.TextKeys.numLines] = linesArr.length;
            return linesArr;
        }

        public _isTyping:boolean = false;

        /**
         * @private
         * @param renderContext
         * @returns {Rectangle}
         */
        private drawText(renderContext:sys.RenderContext):void {
            var self = this;

            //先算出需要的数值
            var lines:Array<egret.ILineElement> = self._getLinesArr();
            if (this.$TextField[sys.TextKeys.textWidth] == 0) {
                return;
            }

            var maxWidth:number = this.$TextField[sys.TextKeys.textFieldWidth] != NONE ? this.$TextField[sys.TextKeys.textFieldWidth] : this.$TextField[sys.TextKeys.textWidth];
            var textHeight:number = TextFieldUtils._getTextHeight(self);

            var drawY:number = 0;
            var startLine:number = TextFieldUtils._getStartLine(self);

            var textFieldHeight:number = this.$TextField[sys.TextKeys.textFieldHeight];
            if (textFieldHeight != NONE && textFieldHeight > textHeight) {
                var valign:number = TextFieldUtils._getValign(self);
                drawY += valign * (textFieldHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var halign:number = TextFieldUtils._getHalign(self);

            var drawX:number = 0;
            for (var i:number = startLine, numLinesLength:number = this.$TextField[sys.TextKeys.numLines]; i < numLinesLength; i++) {
                var line:egret.ILineElement = lines[i];
                var h:number = line.height;
                drawY += h / 2;
                if (i != startLine) {
                    if (this.$TextField[sys.TextKeys.type] == egret.TextFieldType.INPUT && !this.$TextField[sys.TextKeys.multiline]) {
                        break;
                    }
                    if (textFieldHeight != NONE && drawY > textFieldHeight) {
                        break;
                    }
                }

                drawX = Math.round((maxWidth - line.width) * halign);
                for (var j:number = 0, elementsLength:number = line.elements.length; j < elementsLength; j++) {
                    var element:egret.IWTextElement = line.elements[j];
                    var size:number = element.style.size || this.$TextField[sys.TextKeys.fontSize];

                    drawText(renderContext, self, element.text, drawX, drawY + (h - size) / 2, element.width, element.style);
                    drawX += element.width;
                }
                drawY += h / 2 + this.$TextField[sys.TextKeys.lineSpacing];
            }
        }

        //增加点击事件
        private _addEvent():void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        }

        //释放点击事件
        private _removeEvent():void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        }

        //处理富文本中有href的
        private onTapHandler(e:egret.TouchEvent):void {
            if (this.$TextField[sys.TextKeys.type] == egret.TextFieldType.INPUT) {
                return;
            }
            var ele:ITextElement = TextFieldUtils._getTextElement(this, e.localX, e.localY);
            if (ele == null) {
                return;
            }
            var style:egret.ITextStyle = ele.style;

            if (style && style.href) {
                if (style.href.match(/^event:/)) {
                    var type:string = style.href.match(/^event:/)[0];
                    egret.TextEvent.dispatchTextEvent(this, egret.TextEvent.LINK, style.href.substring(type.length));
                }
                else {

                }
            }
        }
    }

    function drawText(renderContext:sys.RenderContext, textfield:egret.TextField1, text:string, x:number, y:number, maxWidth:number, style:egret.ITextStyle = null) {
        setupFont(renderContext, textfield, style);
        style = style || <egret.ITextStyle>{};

        var textColor:string;
        if (style.textColor != null) {
            textColor = toColorString(style.textColor);
        }
        else {
            textColor = textfield.$TextField[sys.TextKeys.textColorString];
        }

        var strokeColor:string;
        if (style.strokeColor != null) {
            strokeColor = toColorString(style.strokeColor);
        }
        else {
            strokeColor = textfield.$TextField[sys.TextKeys.strokeColorString];
        }

        var outline;
        if (style.stroke != null) {
            outline = style.stroke;
        }
        else {
            outline = textfield.$TextField[sys.TextKeys.stroke];
        }

        renderContext.fillStyle = textColor;
        renderContext.strokeStyle = strokeColor;
        if (outline) {
            renderContext.lineWidth = outline * 2;
            renderContext.strokeText(text, x, y, maxWidth || 0xFFFF);
        }
        renderContext.fillText(text, x, y, maxWidth || 0xFFFF);
    }

    function setupFont(renderContext:sys.RenderContext, textField:TextField1, style:egret.ITextStyle = null):void {
        style = style || <egret.ITextStyle>{};
        var italic:boolean = style.italic == null ? textField.$TextField[sys.TextKeys.italic] : style.italic;
        var bold:boolean = style.bold == null ? textField.$TextField[sys.TextKeys.bold] : style.bold;
        var size:number = style.size == null ? textField.$TextField[sys.TextKeys.fontSize] : style.size;
        var fontFamily:string = style.fontFamily == null ? textField.$TextField[sys.TextKeys.fontFamily] : style.fontFamily;
        var font:string = italic ? "italic " : "normal ";
        font += bold ? "bold " : "normal ";
        font += size + "px " + fontFamily;
        renderContext.font = font;
        renderContext.textAlign = "left";
        renderContext.textBaseline = "middle";
    }

}


module egret.sys {

    /**
     * @private
     * 返回格式化的字体样式文本
     */
    export function toFontString(style:{fontFamily?:string;fontSize?:number;bold?:boolean;italic?:boolean}):string {
        var font = "";
        if (style.italic)
            font += "italic ";
        if (style.bold)
            font += "bold ";
        font += (style.fontSize || 12) + "px ";
        font += (style.fontFamily || "sans-serif");
        return font;
    }

    /**
     * @private
     * 返回字符串形式的颜色值
     */
    export function toColorString(value:number):string {
        if (value < 0)
            value = 0;
        if (value > 16777215)
            value = 16777215;
        var color = value.toString(16).toUpperCase();
        while (color.length < 6) {
            color = "0" + color;
        }
        return "#" + color;
    }

    if(DEBUG){
        egret.$markReadOnly(TextField.prototype,"numLines");
        egret.$markReadOnly(TextField.prototype,"textWidth");
        egret.$markReadOnly(TextField.prototype,"textWidth");
    }
}