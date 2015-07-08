package quake;

import js.html.webgl.Buffer;
import js.html.webgl.Texture;
import quake.ED.Edict;
import quake.GL.GLTexture;

@:enum abstract MModelType(Int) {
    var brush = 0;
    var sprite = 1;
    var alias = 2;
}

@:publicFields
class MModel {
    var flags:Int;
    var oriented:Bool;
    var numframes:Int;
    var frames:Array<MFrame>;
    var boundingradius:Float;
    var player:Bool;
    var numtris:Int;
    var cmds:Buffer;
    var numskins:Int;
    var skins:Array<MSkin>;
    var type:MModelType;
    var mins:Vec;
    var maxs:Vec;
    var radius:Float;
    var submodel:Bool;
    var submodels:Array<MModel>;
    var lightdata:Array<Int>;
    var chains:Array<Array<Int>>;
    var textures:Array<MTexture>;
    var waterchain:Int;
    var skychain:Int;
    var leafs:Array<MLeaf>;
    var numfaces:Int;
    var faces:Array<MSurface>;
    var firstface:Int;
    var marksurfaces:Array<Int>;
    var texinfo:Array<MTexinfo>;
    var name:String;
    var vertexes:Array<Vec>;
    var edges:Array<Array<Int>>;
    var surfedges:Array<Int>;
    var random:Bool;
    var nodes:Array<MNode>;
    var hulls:Array<MHull>;
    var entities:String;
}

@:publicFields
class MHull {
    var clipnodes:Array<MClipNode>;
    var planes:Array<Plane>;
    var firstclipnode:Int;
    var lastclipnode:Int;
    var clip_mins:Vec;
    var clip_maxs:Vec;
    function new() {}
}

@:publicFields
class MClipNode {
    var planenum:Int;
    var children:Array<ModContents>;
}

@:publicFields
class MSkin {
    var group:Bool;
    var skins:Array<MSkin>;
    var interval:Float;
    var texturenum:GLTexture;
    var playertexture:Texture;
}

@:publicFields
class MFrame {
    var name:String;
    var group:Bool;
    var frames:Array<MFrame>;
    var interval:Float;
    var origin:Vec2i;
    var width:Int;
    var height:Int;
    var texturenum:Texture;
    var cmdofs:Int;
}

@:publicFields
class MNode {
    var contents:ModContents;
    var plane:Plane;
    var num:Int;
    var parent:MNode;
    var children:Array<MNode>;
    var numfaces:Int;
    var firstface:Int;
    var visframe:Int;
    var markvisframe:Int;
    var skychain:Int;
    var waterchain:Int;
    var mins:Vec;
    var maxs:Vec;
    var cmds:Array<Array<Int>>;
    var nummarksurfaces:Int;
    var firstmarksurface:Int;
}


@:publicFields
class MLeaf extends MNode {
}

@:publicFields
class MTexinfo {
    var texture:Int;
    var vecs:Array<Vec>;
}

@:publicFields
class MSurface {
    var extents:Vec2i;
    var texturemins:Vec2i;
    var light_s:Int;
    var light_t:Int;
    var dlightframe:Int;
    var dlightbits:Int;
    var plane:Plane;
    var texinfo:Int;
    var sky:Bool;
    var turbulent:Bool;
    var lightofs:Int;
    var styles:Array<Int>;
    var texture:Int;
    var verts:Array<Vec>;
    var numedges:Int;
    var firstedge:Int;
}

@:publicFields
class MTexture {
    var name:String;
    var width:Int;
    var height:Int;
    var anim_base:Int;
    var anim_frame:Int;
    var anims:Array<Int>;
    var alternate_anims:Array<Int>;
    var sky:Bool;
    var turbulent:Bool;
    var texturenum:Texture;
    function new() {}
}

@:publicFields
class MTrace {
    var allsolid:Bool;
    var startsolid:Bool;
    var inopen:Bool;
    var inwater:Bool;
    var plane:Plane;
    var fraction:Float;
    var endpos:Vec;
    var ent:Edict;
    function new() {}
}


@:publicFields
class MMoveClip {
    var type:Int;
    var trace:MTrace;
    var boxmins:Vec;
    var boxmaxs:Vec;
    var mins:Vec;
    var maxs:Vec;
    var mins2:Vec;
    var maxs2:Vec;
    var start:Vec;
    var end:Vec;
    var passedict:Edict;
    function new() {}
}


@:publicFields
class MAreaNode {
    var axis:Int;
    var dist:Float;
    var children:Array<MAreaNode>;
    var trigger_edicts:MLink;
    var solid_edicts:MLink;
    function new() {}
}

class MLink {
    public var prev:MLink;
    public var next:MLink;
    public var ent:Edict;
    public function new() {}
}