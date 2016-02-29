var gensym=function(){var _n=0;return function(){return 'sym'+(_n++)}}();
function mseta(elt,args){
    for(var n = 1; n<args.length; n += 2)
	if (n+1<args.length) {
	    elt[ args[n] ] = args[n+1];
	} else {
	    elt.innerHTML = args[n];
	}
    return elt;}
function mset(elt){ return mseta(elt,arguments); }
function newElt(typ){ return mseta(document.createElement(typ), arguments); }
function Text(txt){ return document.createTextNode(txt); }
function H3(txt){return newElt("h3",'innerHTML',txt);}
function Div(){ return newElt("div"); }
function ID(id,elt){ return mset(elt,'id',id); }
function codeDiv(classes,iid){
    return newElt("div",'className',classes,
		  "<code id='"+iid+"' class='ws-pre'>QQ\nww</code>");}
function EDIT(x){return mset(x,'contentEditable',true);}
