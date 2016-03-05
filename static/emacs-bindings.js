function KeyThing(){this.init.apply(this,arguments)}
KeyThing.prototype={
    init:function(){
	this.mode = 0;
	this.log = console.log.bind(console);
	this.log("init another one!");
    },
    toStr:function(e){
	var key = e.code;
	if (e.ctrlKey ) key='^'+key;
	if (e.shiftKey) key='+'+key;
	return key;
    },
    process:function(e){
	e = this.toStr(e);
	switch(this.mode){
	case 1:
	    if (e=='^KeyS') {
		this.log("Save Buffer");
	    } else if (e=='^KeyF') {
		this.log("Find File");
	    } else if (e=='KeyB') {
		this.log("Switch to Buffer");
	    } else {
		this.log("KEY NOT BOUND");
	    }
	    this.mode = 0;
	    return false;
	case 2:
	    if (e=='KeyX') {
		this.log("M-x \\");
		this.mode = 3;
		return false;
	    } else if (e=='KeyV') {
		this.log("PageUp");
	    } else {
		this.log("KEY NOT BOUND");
	    }
	    this.mode = 0;
	    return false;
	case 0:
	    if (e=='^KeyX') {
		this.mode = 1;
		this.log("C-x - \\");
		return false;
	    } else if (e=='^KeyG') {
		this.log("Quit");
		return false;
	    } else if (e=='Escape') {
		this.log("ESC - \\");
		this.mode = 2;
		return false;
	    }
	}
    },
    sentinel:null
};
