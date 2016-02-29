function appendEditor(elt){
    var lbl0=gensym(),lbl1=gensym(),lbl2=gensym();
    var lblD=gensym(),lblE=gensym(),lblP=gensym();
    elt.appendChild(EDIT(ID(lbl0,H3("/static/FILENAME"))));
    elt.appendChild(ID(lblD,codeDiv('b1 db',lblE)));
    EDIT(document.getElementById(lblE));
    elt.appendChild(newElt('hr'));
    elt.appendChild(ID(lbl1,newElt('button','save')));
    elt.appendChild(ID(lbl2,newElt('button','load')));
    elt.appendChild(ID(lblP,newElt('button','preview')));
    function filename(){return $('#'+lbl0).html();}
    function filedata(){return $('#'+lblE).html();}
    function url(){
	var url = filename();
	return ( url[0]=='/' ? '_' : '_/' ) + url;}
    $('#'+lbl1).click(function(ev){
	$.post(url(),filedata(),{
	}).then(function(a){
	    console.log("saved "+url);
	}).then(null,function(a,b,c,d){
	    console.log("F",[a,b,c,d]);
	});    });
    $('#'+lbl2).click(function(ev){
	$('#'+lblE).load(url(),function(data,err,xhr){
	    console.log("FINISHED",[data,err,xhr]);
	});    });
    $('#'+lblP).click(function(ev){
	var arr = filename().split('/');
	if (arr[0]=='')  arr = arr.splice(1);
	window.open([''].concat(arr.splice(1)).join('/'));
    }); }
$('#createBuffer').click(appendEditor.bind(null,document.body));
