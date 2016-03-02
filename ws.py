#!/usr/bin/env bottle.py -b:7000 -sgevent --debug --reload ws --
import pyjade,markdown,coffeescript,os,sys,json
from bottle import request,response,static_file,route,get,put,post,error
def ropen(name,ext): return open('tmpl/%s.%s'%(name,ext)).read()
def wopen(pfx,name,txt): return open(pfx+'/'+name,'w').write(txt)
@route('/_/<prefix>/<name:path>')
def _(prefix,name): return static_file(name,root=prefix,mimetype='text/plain')
@post('/_/<prefix>/<name:path>')
def _(prefix,name):wopen(prefix,name,request.body.read());return['ok']
@route('/_')
def _(): return dict(result=dict(prefix='/_/',
                                 files=getfiles('static')+getfiles('tmpl')))
def getfiles(pfx): return [ [ prefix+'/'+f for f in files ]
                            for prefix, dirs, files in os.walk(pfx) ]
@route('/')
@route('/<name:path>')
def _(name='index'):
    try:   return [ pyjade.simple_convert(ropen(name,'jade')) ]
    except IOError: pass
    try:   return [ markdown.markdown(ropen(name,'md')) ]
    except IOError: pass
    try:   return [ coffeescript.compile(ropen(name,'cs')) ]
    except IOError: pass
    try:   return [ ropen(name,'html') ]
    except IOError: pass
    try:   return [ ropen(name,'js') ]
    except IOError: pass
    return static_file(name, root='./static/')
@route('/_/*')
def _(): return static_file('',root='./static')
@error(404)
def _(error): return ['Not Found\n']
