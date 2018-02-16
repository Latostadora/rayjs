(function(exports){

    var HtmlFixture=function()
    {
        this.root=null;
    };

    HtmlFixture.prototype.create=function() {
        if (this.root!=null) {
            this.destroy();
        }
        var div = document.createElement("div");
        div.setAttribute("id","html-fixture-"+this._newGUID());
        div.setAttribute("style","display:none");
        this.root=document.body.appendChild(div);
    };

    HtmlFixture.prototype._newGUID=function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    HtmlFixture.prototype.destroy=function() {
        this.root.parentNode.removeChild(this.root);
        this.root=null;
    };

    HtmlFixture.prototype.isEmpty=function() {
        if (this.root == null) return true;
        if (this.root.innerHTML.trim().length===0) return true;
        return false;
    };


    HtmlFixture.prototype.getRootElement=function() {
        return this.root;
    };

    HtmlFixture.prototype._parseFunctionComment=function (fn) {
        var reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
        var match = reCommentContents.exec(fn.toString());
        if (!match) { throw new TypeError('Multiline comment missing.'); }
        return match[1];
    };

    HtmlFixture.prototype._isFunction=function(param) {
        return typeof param === 'function';
    };

    HtmlFixture.prototype._isDomNode=function(param) {
        return param.outerHTML != undefined;
    };

    HtmlFixture.prototype._paramToString=function(param) {
        if (this._isFunction(param)) {
            return this._parseFunctionComment(param);
        }

        if (this._isDomNode(param)) {
            return param.outerHTML;
        }
        return param.toString();
    };

    HtmlFixture.prototype._parseHTML = function(str) {
        var tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = str;
        return tmp.body.children;
    };

    HtmlFixture.prototype.add=function(param) {
        var html=this._paramToString(param);
        return this.root.innerHTML=this.root.innerHTML+html;
    };

    HtmlFixture.prototype._replaceAll = function(str, search, replacement) {
        return str.replace(new RegExp(search, 'g'), replacement);
    };

    HtmlFixture.prototype._replaceAllDoubleSpaces= function(str) {
        var oldLength;
        var newLength;
        do {
            oldLength = str.length;
            str = this._replaceAll(str, "  ", " "); //double spaces
            newLength = str.length;
        } while (oldLength != newLength);
        return str;
    };

    HtmlFixture.prototype._replaceSpacesBetweenTags=function(str) {
        return this._replaceAll(str, "> <", "><");
    };

    HtmlFixture.prototype._normalizeHtml=function(html) {
        var normalizedHtml="";
        var nodes=this._parseHTML(html);
        for(var i=0; i<nodes.length; i++) {
            var node=nodes[i];
            normalizedHtml=normalizedHtml+node.outerHTML;
        }
        normalizedHtml = this._replaceAllDoubleSpaces(normalizedHtml);
        normalizedHtml = this._replaceSpacesBetweenTags(normalizedHtml);
        return normalizedHtml;
    };

    HtmlFixture.prototype.isEqual=function(param) {
        var myHtml=this._normalizeHtml(this.root.innerHTML);
        var otherHtml=this._paramToString(param);
        otherHtml=this._normalizeHtml(otherHtml);
        return myHtml===otherHtml;
    };

    HtmlFixture.prototype.asString=function() {
        return this._normalizeHtml(this.root.innerHTML);
    };

    exports.Spec=exports.Spec || {};
    exports.Spec.HtmlFixture=HtmlFixture;
})(window);
