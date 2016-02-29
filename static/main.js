function appendEditor(elt){
    var lbl0=gensym(),lbl1=gensym(),lbl2=gensym(),lblD=gensym(),lblE=gensym();
    elt.appendChild(EDIT(ID(lbl0,H3("FILENAME"))));
    elt.appendChild(ID(lblD,(codeDiv('b1 db',lblE))));
    EDIT(document.getElementById(lblE));
    elt.appendChild(newElt('hr'));
    elt.appendChild(ID(lbl1,newElt('button','save')));
    elt.appendChild(ID(lbl2,newElt('button','load')));
    function filename(){ return JSON.stringify($('#'+lbl0).html()); }
    function filedata(){ return JSON.stringify($('#'+lblE).html()); }
    $('#'+lbl1).click(function(ev){
	console.log("SAVE",filename());
	console.log("SAVE",filedata());
    });
    $('#'+lbl2).click(function(ev){
	console.log("LOAD",filename());
	console.log("A4",ev);
    });
}
$('#createBuffer').click(appendEditor.bind(null,document.body));
