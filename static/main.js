function appendEditor(elt,pathname){
    pathname = pathname || "/static/FILENAME";
    var lbl0=gensym(),lbl1=gensym(),lbl2=gensym()
    var lblD=gensym(),lblE=gensym(),lblP=gensym()
    elt.appendChild(EDIT(ID(lbl0,H3(pathname))))
    elt.appendChild(ID(lblD,codeDiv('b1 db',lblE)))
    EDIT(document.getElementById(lblE))
    elt.appendChild(newElt('hr'))
    elt.appendChild(ID(lbl1,newElt('button','save')))
    elt.appendChild(ID(lbl2,newElt('button','load')))
    elt.appendChild(ID(lblP,newElt('button','preview')))
    function filename(){return $('#'+lbl0).html()}
    function filedata(){return $('#'+lblE).html()}
    function url(){
	var url = filename()
	return ( url[0]=='/' ? '_' : '_/' ) + url}
    $('#'+lbl1).click(function(ev){
	$.post(url(),unescape(filedata()),{
	}).then(function(a){
	    console.log("saved "+url)
	}).then(null,function(a,b,c,d){
	    console.log("F",[a,b,c,d])
	})})
    var load=function(ev){
	$.get(url()).then(function(data){
	    $('#'+lblE).html( escape(data) )
	}) }
    $('#'+lbl2).click(load);
    $('#'+lblP).click(function(ev){
	var arr = filename().split('/')
	if (arr[0]=='')  arr = arr.splice(1)
	window.open([''].concat(arr.splice(1)).join('/'))
    })
    return load;
}
function refreshDir(elt_name){
    var elt=$(elt_name)
    $.get('/_').then(function(data){
	elt.html('')
	var pfx = data.result.prefix
	var files=data.result.files
	for (var n=0; n<files.length; n++){
	    for (var m=0; m<files[n].length; m++){
		(function(){
		    var html = pfx+files[n][m]
		    var elt2 = newElt('li',html)
		    elt.append(elt2)
		    elt2.onclick=function(){
			appendEditor(document.body, html.substr(2))()
		    }.bind(null,html)
		})()
	    }}})}
$('#createBuffer').click(appendEditor.bind(null,document.body))
$('#refreshDir').click(refreshDir.bind(null,"#dir-viewport"))
