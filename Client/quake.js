(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		var tmp;
		var _this = this.map;
		var key = this.keys[this.index++];
		if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
		return tmp;
	}
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		return this.rh == null?null:this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var tmp;
		var _this = this.arrayKeys();
		tmp = HxOverrides.iter(_this);
		return tmp;
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var quake_CDAudio = function() { };
quake_CDAudio.__name__ = true;
quake_CDAudio.Init = function() {
	quake_Cmd.AddCommand("cd",quake_CDAudio.CD_f);
	if(quake_COM.CheckParm("-nocdaudio") != null) return;
	quake_CDAudio.known = [];
	var xhr = new XMLHttpRequest();
	var _g = 2;
	while(_g < 100) {
		var i = _g++;
		var track = "/music/track" + (i <= 9?"0":"") + i + ".ogg";
		var j = quake_COM.searchpaths.length - 1;
		while(j >= 0) {
			xhr.open("HEAD",quake_COM.searchpaths[j].filename + track,false);
			xhr.send();
			if(xhr.status >= 200 && xhr.status <= 299) {
				quake_CDAudio.known[i - 2] = quake_COM.searchpaths[j].filename + track;
				break;
			}
			j--;
		}
		if(j < 0) break;
	}
	if(quake_CDAudio.known.length == 0) return;
	quake_CDAudio.initialized = quake_CDAudio.enabled = true;
	quake_CDAudio.Update();
	quake_Console.Print("CD Audio Initialized\n");
};
quake_CDAudio.Update = function() {
	if(!quake_CDAudio.initialized || !quake_CDAudio.enabled) return;
	if(quake_S.bgmvolume.value == quake_CDAudio.cdvolume) return;
	if(quake_S.bgmvolume.value < 0.0) quake_S.bgmvolume.setValue(0.0); else if(quake_S.bgmvolume.value > 1.0) quake_S.bgmvolume.setValue(1.0);
	quake_CDAudio.cdvolume = quake_S.bgmvolume.value;
	if(quake_CDAudio.cd != null) quake_CDAudio.cd.volume = quake_CDAudio.cdvolume;
};
quake_CDAudio.Play = function(track,looping) {
	if(!quake_CDAudio.initialized || !quake_CDAudio.enabled) return;
	track -= 2;
	if(quake_CDAudio.playTrack == track) {
		if(quake_CDAudio.cd != null) {
			quake_CDAudio.cd.loop = looping;
			if(looping && quake_CDAudio.cd.paused) quake_CDAudio.cd.play();
		}
		return;
	}
	if(track < 0 || track >= quake_CDAudio.known.length) {
		quake_Console.DPrint("CDAudio.Play: Bad track number " + (track + 2) + ".\n");
		return;
	}
	quake_CDAudio.Stop();
	quake_CDAudio.playTrack = track;
	quake_CDAudio.cd = new Audio(quake_CDAudio.known[track]);
	quake_CDAudio.cd.loop = looping;
	quake_CDAudio.cd.volume = quake_CDAudio.cdvolume;
	quake_CDAudio.cd.play();
};
quake_CDAudio.Stop = function() {
	if(!quake_CDAudio.initialized || !quake_CDAudio.enabled) return;
	if(quake_CDAudio.cd != null) quake_CDAudio.cd.pause();
	quake_CDAudio.playTrack = null;
	quake_CDAudio.cd = null;
};
quake_CDAudio.Pause = function() {
	if(!quake_CDAudio.initialized || !quake_CDAudio.enabled) return;
	if(quake_CDAudio.cd != null) quake_CDAudio.cd.pause();
};
quake_CDAudio.Resume = function() {
	if(!quake_CDAudio.initialized || !quake_CDAudio.enabled) return;
	if(quake_CDAudio.cd != null) quake_CDAudio.cd.play();
};
quake_CDAudio.CD_f = function() {
	if(!quake_CDAudio.initialized || quake_Cmd.argv.length <= 1) return;
	var command = quake_Cmd.argv[1].toLowerCase();
	switch(command) {
	case "on":
		quake_CDAudio.enabled = true;
		break;
	case "off":
		quake_CDAudio.Stop();
		quake_CDAudio.enabled = false;
		break;
	case "play":
		quake_CDAudio.Play(quake_Q.atoi(quake_Cmd.argv[2]),false);
		break;
	case "loop":
		quake_CDAudio.Play(quake_Q.atoi(quake_Cmd.argv[2]),true);
		break;
	case "stop":
		quake_CDAudio.Stop();
		break;
	case "pause":
		quake_CDAudio.Pause();
		break;
	case "resume":
		quake_CDAudio.Resume();
		break;
	case "info":
		quake_Console.Print(quake_CDAudio.known.length + " tracks\n");
		if(quake_CDAudio.cd != null) {
			if(!quake_CDAudio.cd.paused) quake_Console.Print("Currently " + (quake_CDAudio.cd.loop?"looping":"playing") + " track " + (quake_CDAudio.playTrack + 2) + "\n");
		}
		quake_Console.Print("Volume is " + quake_CDAudio.cdvolume + "\n");
		break;
	}
};
var quake__$CL_Beam = function() {
	this.entity = 0;
	this.model = null;
	this.endtime = 0;
	this.start = new Float32Array(3);
	this.end = new Float32Array(3);
};
quake__$CL_Beam.__name__ = true;
var quake__$CL_ClientStatic = function() {
	this.state = 0;
	this.spawnparms = "";
	this.demonum = 0;
	this.message = new quake_MSG(8192);
};
quake__$CL_ClientStatic.__name__ = true;
var quake_ClientCmd = function() {
	this.upmove = 0.0;
	this.sidemove = 0.0;
	this.forwardmove = 0.0;
};
quake_ClientCmd.__name__ = true;
var quake__$CL_Score = function() {
	this.colors = 0;
	this.frags = 0;
	this.name = "";
};
quake__$CL_Score.__name__ = true;
var quake__$CL_ClientState = function() {
	this.cdtrack = 0;
	this.viewent = new quake_Entity();
	this.viewentity = 0;
	this.last_received_message = 0.0;
	this.oldtime = 0.0;
	this.completed_time = 0.0;
	this.intermission = 0;
	this.laststop = 0.0;
	this.driftmove = 0.0;
	this.pitchvel = 0.0;
	this.idealpitch = 0.0;
	this.punchangle = new Float32Array(3);
	this.cshifts = [[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0]];
	this.faceanimtime = 0.0;
	this.item_gettime = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	this.items = 0;
	this.stats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.movemessages = 0;
	this.cmd = new quake_ClientCmd();
	this.velocity = new Float32Array(3);
	this.mvelocity1 = new Float32Array(3);
	this.mvelocity0 = new Float32Array(3);
	this.mviewangles1 = new Float32Array(3);
	this.mviewangles0 = new Float32Array(3);
	this.viewangles = new Float32Array(3);
	this.time = 0.0;
	this.mtime1 = 0.0;
	this.mtime0 = 0.0;
};
quake__$CL_ClientState.__name__ = true;
var quake_MSG = function(capacity,size) {
	if(size == null) size = 0;
	this.overflowed = false;
	this.allowoverflow = false;
	this.data = new ArrayBuffer(capacity);
	this.cursize = size;
};
quake_MSG.__name__ = true;
quake_MSG.BeginReading = function() {
	quake_MSG.readcount = 0;
	quake_MSG.badread = false;
};
quake_MSG.ReadChar = function() {
	if(quake_MSG.readcount >= quake_NET.message.cursize) {
		quake_MSG.badread = true;
		return -1;
	}
	var c = new Int8Array(quake_NET.message.data,quake_MSG.readcount,1)[0];
	++quake_MSG.readcount;
	return c;
};
quake_MSG.ReadByte = function() {
	if(quake_MSG.readcount >= quake_NET.message.cursize) {
		quake_MSG.badread = true;
		return -1;
	}
	var c = new Uint8Array(quake_NET.message.data,quake_MSG.readcount,1)[0];
	++quake_MSG.readcount;
	return c;
};
quake_MSG.ReadShort = function() {
	if(quake_MSG.readcount + 2 > quake_NET.message.cursize) {
		quake_MSG.badread = true;
		return -1;
	}
	var c = new DataView(quake_NET.message.data).getInt16(quake_MSG.readcount,true);
	quake_MSG.readcount += 2;
	return c;
};
quake_MSG.ReadLong = function() {
	if(quake_MSG.readcount + 4 > quake_NET.message.cursize) {
		quake_MSG.badread = true;
		return -1;
	}
	var c = new DataView(quake_NET.message.data).getInt32(quake_MSG.readcount,true);
	quake_MSG.readcount += 4;
	return c;
};
quake_MSG.ReadFloat = function() {
	if(quake_MSG.readcount + 4 > quake_NET.message.cursize) {
		quake_MSG.badread = true;
		return -1;
	}
	var f = new DataView(quake_NET.message.data).getFloat32(quake_MSG.readcount,true);
	quake_MSG.readcount += 4;
	return f;
};
quake_MSG.ReadString = function() {
	var string_b = "";
	var _g = 0;
	while(_g < 2048) {
		_g++;
		var c = quake_MSG.ReadByte();
		if(c <= 0) break;
		string_b += String.fromCharCode(c);
	}
	return string_b;
};
quake_MSG.prototype = {
	GetSpace: function(length) {
		if(this.cursize + length > this.data.byteLength) {
			if(!this.allowoverflow) quake_Sys.Error("SZ.GetSpace: overflow without allowoverflow set");
			if(length > this.data.byteLength) quake_Sys.Error("SZ.GetSpace: " + length + " is > full buffer size");
			this.overflowed = true;
			quake_Console.Print("SZ.GetSpace: overflow\n");
			this.cursize = 0;
		}
		var oldsize = this.cursize;
		this.cursize += length;
		return oldsize;
	}
	,Write: function(a,length) {
		new Uint8Array(this.data,this.GetSpace(length),length).set(a.subarray(0,length));
	}
	,WriteChar: function(c) {
		new DataView(this.data).setInt8(this.GetSpace(1),c);
	}
	,WriteByte: function(c) {
		new DataView(this.data).setUint8(this.GetSpace(1),c);
	}
	,WriteShort: function(c) {
		new DataView(this.data).setInt16(this.GetSpace(2),c,true);
	}
	,WriteLong: function(c) {
		new DataView(this.data).setInt32(this.GetSpace(4),c,true);
	}
	,WriteFloat: function(f) {
		new DataView(this.data).setFloat32(this.GetSpace(4),f,true);
	}
	,WriteString: function(s) {
		if(s != null) this.Write(new Uint8Array(quake_Q.strmem(s)),s.length);
		this.WriteChar(0);
	}
};
var quake_CL = function() { };
quake_CL.__name__ = true;
quake_CL.StopPlayback = function() {
	if(!quake_CL.cls.demoplayback) return;
	quake_CL.cls.demoplayback = false;
	quake_CL.cls.demofile = null;
	quake_CL.cls.state = 0;
	if(quake_CL.cls.timedemo) quake_CL.FinishTimeDemo();
};
quake_CL.WriteDemoMessage = function() {
	var len = quake_CL.cls.demoofs + 16 + quake_NET.message.cursize;
	if(quake_CL.cls.demofile.byteLength < len) {
		var src = new Uint8Array(quake_CL.cls.demofile,0,quake_CL.cls.demoofs);
		quake_CL.cls.demofile = new ArrayBuffer(quake_CL.cls.demofile.byteLength + 16384);
		new Uint8Array(quake_CL.cls.demofile).set(src);
	}
	var f = new DataView(quake_CL.cls.demofile,quake_CL.cls.demoofs,16);
	f.setInt32(0,quake_NET.message.cursize,true);
	f.setFloat32(4,quake_CL.state.viewangles[0],true);
	f.setFloat32(8,quake_CL.state.viewangles[1],true);
	f.setFloat32(12,quake_CL.state.viewangles[2],true);
	new Uint8Array(quake_CL.cls.demofile).set(new Uint8Array(quake_NET.message.data,0,quake_NET.message.cursize),quake_CL.cls.demoofs + 16);
	quake_CL.cls.demoofs = len;
};
quake_CL.GetMessage = function() {
	if(quake_CL.cls.demoplayback) {
		if(quake_CL.cls.signon == 4) {
			if(quake_CL.cls.timedemo) {
				if(quake_Host.framecount == quake_CL.cls.td_lastframe) return 0;
				quake_CL.cls.td_lastframe = quake_Host.framecount;
				if(quake_Host.framecount == quake_CL.cls.td_startframe + 1) quake_CL.cls.td_starttime = quake_Host.realtime;
			} else if(quake_CL.state.time <= quake_CL.state.mtime0) return 0;
		}
		if(quake_CL.cls.demoofs + 16 >= quake_CL.cls.demosize) {
			quake_CL.StopPlayback();
			return 0;
		}
		var view = new DataView(quake_CL.cls.demofile);
		quake_NET.message.cursize = view.getUint32(quake_CL.cls.demoofs,true);
		if(quake_NET.message.cursize > 8000) quake_Sys.Error("Demo message > MAX_MSGLEN");
		quake_CL.state.mviewangles1.set(quake_CL.state.mviewangles0);
		var this1 = quake_CL.state.mviewangles0;
		var x = view.getFloat32(quake_CL.cls.demoofs + 4,true);
		var y = view.getFloat32(quake_CL.cls.demoofs + 8,true);
		var z = view.getFloat32(quake_CL.cls.demoofs + 12,true);
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
		quake_CL.cls.demoofs += 16;
		if(quake_CL.cls.demoofs + quake_NET.message.cursize > quake_CL.cls.demosize) {
			quake_CL.StopPlayback();
			return 0;
		}
		var src = new Uint8Array(quake_CL.cls.demofile,quake_CL.cls.demoofs,quake_NET.message.cursize);
		var dest = new Uint8Array(quake_NET.message.data,0,quake_NET.message.cursize);
		var _g1 = 0;
		var _g = quake_NET.message.cursize;
		while(_g1 < _g) {
			var i = _g1++;
			dest[i] = src[i];
		}
		quake_CL.cls.demoofs += quake_NET.message.cursize;
		return 1;
	}
	var r = null;
	while(true) {
		r = quake_NET.GetMessage(quake_CL.cls.netcon);
		if(r != 1 && r != 2) return r;
		if(quake_NET.message.cursize == 1 && new Uint8Array(quake_NET.message.data,0,1)[0] == 1) quake_Console.Print("<-- server to client keepalive\n"); else break;
	}
	if(quake_CL.cls.demorecording) quake_CL.WriteDemoMessage();
	return r;
};
quake_CL.Stop_f = function() {
	if(quake_Cmd.client) return;
	if(!quake_CL.cls.demorecording) {
		quake_Console.Print("Not recording a demo.\n");
		return;
	}
	quake_NET.message.cursize = 0;
	quake_NET.message.WriteByte(2);
	quake_CL.WriteDemoMessage();
	if(!quake_COM.WriteFile(quake_CL.cls.demoname,new Uint8Array(quake_CL.cls.demofile),quake_CL.cls.demoofs)) quake_Console.Print("ERROR: couldn't open.\n");
	quake_CL.cls.demofile = null;
	quake_CL.cls.demorecording = false;
	quake_Console.Print("Completed demo\n");
};
quake_CL.Record_f = function() {
	var c = quake_Cmd.argv.length;
	if(c <= 1 || c >= 5) {
		quake_Console.Print("record <demoname> [<map> [cd track]]\n");
		return;
	}
	if(quake_Cmd.argv[1].indexOf("..") != -1) {
		quake_Console.Print("Relative pathnames are not allowed.\n");
		return;
	}
	if(c == 2 && quake_CL.cls.state == 2) {
		quake_Console.Print("Can not record - already connected to server\nClient demo recording must be started before connecting\n");
		return;
	}
	if(c == 4) {
		quake_CL.cls.forcetrack = quake_Q.atoi(quake_Cmd.argv[3]);
		quake_Console.Print("Forcing CD track to " + quake_CL.cls.forcetrack);
	} else quake_CL.cls.forcetrack = -1;
	quake_CL.cls.demoname = quake_COM.DefaultExtension(quake_Cmd.argv[1],".dem");
	if(c >= 3) quake_Cmd.ExecuteString("map " + quake_Cmd.argv[2]);
	quake_Console.Print("recording to " + quake_CL.cls.demoname + ".\n");
	quake_CL.cls.demofile = new ArrayBuffer(16384);
	var track = Std.string(quake_CL.cls.forcetrack) + "\n";
	var dest = new Uint8Array(quake_CL.cls.demofile,0,track.length);
	var _g1 = 0;
	var _g = track.length;
	while(_g1 < _g) {
		var i = _g1++;
		dest[i] = HxOverrides.cca(track,i);
	}
	quake_CL.cls.demoofs = track.length;
	quake_CL.cls.demorecording = true;
};
quake_CL.PlayDemo_f = function() {
	if(quake_Cmd.client) return;
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("playdemo <demoname> : plays a demo\n");
		return;
	}
	quake_CL.Disconnect();
	var name = quake_COM.DefaultExtension(quake_Cmd.argv[1],".dem");
	quake_Console.Print("Playing demo from " + name + ".\n");
	var demofile = quake_COM.LoadFile(name);
	if(demofile == null) {
		quake_Console.Print("ERROR: couldn't open.\n");
		quake_CL.cls.demonum = -1;
		quake_SCR.disabled_for_loading = false;
		return;
	}
	quake_CL.cls.demofile = demofile;
	var demofile1 = new Uint8Array(demofile);
	quake_CL.cls.demosize = demofile1.length;
	quake_CL.cls.demoplayback = true;
	quake_CL.cls.state = 2;
	quake_CL.cls.forcetrack = 0;
	var i = 0;
	var neg = false;
	while(i < demofile1.length) {
		var c = demofile1[i];
		if(c == 10) break;
		if(c == 45) neg = true; else quake_CL.cls.forcetrack = quake_CL.cls.forcetrack * 10 + c - 48;
		i++;
	}
	if(neg) quake_CL.cls.forcetrack = -quake_CL.cls.forcetrack;
	quake_CL.cls.demoofs = i + 1;
};
quake_CL.FinishTimeDemo = function() {
	quake_CL.cls.timedemo = false;
	var frames = quake_Host.framecount - quake_CL.cls.td_startframe - 1;
	var time = quake_Host.realtime - quake_CL.cls.td_starttime;
	if(time == 0.0) time = 1.0;
	quake_Console.Print(frames + " frames " + time.toFixed(1) + " seconds " + (frames / time).toFixed(1) + " fps\n");
};
quake_CL.TimeDemo_f = function() {
	if(quake_Cmd.client) return;
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("timedemo <demoname> : gets demo speeds\n");
		return;
	}
	quake_CL.PlayDemo_f();
	quake_CL.cls.timedemo = true;
	quake_CL.cls.td_startframe = quake_Host.framecount;
	quake_CL.cls.td_lastframe = -1;
};
quake_CL.KeyDown = function() {
	var b = Reflect.field(quake_CL.kbutton,quake_Cmd.argv[0].substring(1));
	if(b == null) return;
	var b1 = quake_CL.kbuttons[b];
	var k;
	if(quake_Cmd.argv[1] != null) k = quake_Q.atoi(quake_Cmd.argv[1]); else k = -1;
	if(k == b1.down[0] || k == b1.down[1]) return;
	if(b1.down[0] == 0) b1.down[0] = k; else if(b1.down[1] == 0) b1.down[1] = k; else {
		quake_Console.Print("Three keys down for a button!\n");
		return;
	}
	if((b1.state & 1) == 0) b1.state |= 3;
};
quake_CL.KeyUp = function() {
	var b = Reflect.field(quake_CL.kbutton,quake_Cmd.argv[0].substring(1));
	if(b == null) return;
	var b1 = quake_CL.kbuttons[b];
	var k;
	if(quake_Cmd.argv[1] != null) k = quake_Q.atoi(quake_Cmd.argv[1]); else {
		b1.down[0] = b1.down[1] = 0;
		b1.state = 4;
		return;
	}
	if(b1.down[0] == k) b1.down[0] = 0; else if(b1.down[1] == k) b1.down[1] = 0; else return;
	if(b1.down[0] != 0 || b1.down[1] != 0) return;
	if((b1.state & 1) != 0) b1.state = b1.state - 1 | 4;
};
quake_CL.MLookUp = function() {
	quake_CL.KeyUp();
	if((quake_CL.kbuttons[quake_CL.kbutton.mlook].state & 1) == 0 && quake_CL.lookspring.value != 0) quake_V.StartPitchDrift();
};
quake_CL.Impulse = function() {
	quake_CL.impulse = quake_Q.atoi(quake_Cmd.argv[1]);
};
quake_CL.KeyState = function(key) {
	var key1 = quake_CL.kbuttons[key];
	var down = key1.state & 1;
	key1.state &= 1;
	if((key1.state & 2) != 0) {
		if((key1.state & 4) != 0) return down != 0?0.75:0.25;
		return down != 0?0.5:0.0;
	}
	if((key1.state & 4) != 0) return 0.0;
	return down != 0?1.0:0.0;
};
quake_CL.AdjustAngles = function() {
	var speed = quake_Host.frametime;
	if((quake_CL.kbuttons[quake_CL.kbutton.speed].state & 1) != 0) speed *= quake_CL.anglespeedkey.value;
	var angles = quake_CL.state.viewangles;
	if((quake_CL.kbuttons[quake_CL.kbutton.strafe].state & 1) == 0) {
		var v = angles[1] + speed * quake_CL.yawspeed.value * (quake_CL.KeyState(quake_CL.kbutton.left) - quake_CL.KeyState(quake_CL.kbutton.right));
		angles[1] = v;
		var v1 = quake__$Vec_Vec_$Impl_$.Anglemod(angles[1]);
		angles[1] = v1;
	}
	if((quake_CL.kbuttons[quake_CL.kbutton.klook].state & 1) != 0) {
		quake_V.StopPitchDrift();
		var v2 = angles[0] + speed * quake_CL.pitchspeed.value * (quake_CL.KeyState(quake_CL.kbutton.back) - quake_CL.KeyState(quake_CL.kbutton.forward));
		angles[0] = v2;
	}
	var up = quake_CL.KeyState(quake_CL.kbutton.lookup);
	var down = quake_CL.KeyState(quake_CL.kbutton.lookdown);
	if(up != 0.0 || down != 0.0) {
		angles[0] = angles[0] + speed * quake_CL.pitchspeed.value * (down - up);
		quake_V.StopPitchDrift();
	}
	if(angles[0] > 80.0) angles[0] = 80.0; else if(angles[0] < -70.0) angles[0] = -70.0;
	if(angles[2] > 50.0) angles[2] = 50.0; else if(angles[2] < -50.0) angles[2] = -50.0;
};
quake_CL.BaseMove = function() {
	if(quake_CL.cls.signon != 4) return;
	quake_CL.AdjustAngles();
	var cmd = quake_CL.state.cmd;
	cmd.sidemove = quake_CL.sidespeed.value * (quake_CL.KeyState(quake_CL.kbutton.moveright) - quake_CL.KeyState(quake_CL.kbutton.moveleft));
	if((quake_CL.kbuttons[quake_CL.kbutton.strafe].state & 1) != 0) cmd.sidemove += quake_CL.sidespeed.value * (quake_CL.KeyState(quake_CL.kbutton.right) - quake_CL.KeyState(quake_CL.kbutton.left));
	cmd.upmove = quake_CL.upspeed.value * (quake_CL.KeyState(quake_CL.kbutton.moveup) - quake_CL.KeyState(quake_CL.kbutton.movedown));
	if((quake_CL.kbuttons[quake_CL.kbutton.klook].state & 1) == 0) cmd.forwardmove = quake_CL.forwardspeed.value * quake_CL.KeyState(quake_CL.kbutton.forward) - quake_CL.backspeed.value * quake_CL.KeyState(quake_CL.kbutton.back); else cmd.forwardmove = 0.0;
	if((quake_CL.kbuttons[quake_CL.kbutton.speed].state & 1) != 0) {
		cmd.forwardmove *= quake_CL.movespeedkey.value;
		cmd.sidemove *= quake_CL.movespeedkey.value;
		cmd.upmove *= quake_CL.movespeedkey.value;
	}
};
quake_CL.SendMove = function() {
	var buf = quake_CL.sendmovebuf;
	buf.cursize = 0;
	buf.WriteByte(3);
	buf.WriteFloat(quake_CL.state.mtime0);
	buf.WriteByte((quake_CL.state.viewangles[0] * 256 / 360 | 0) & 255);
	buf.WriteByte((quake_CL.state.viewangles[1] * 256 / 360 | 0) & 255);
	buf.WriteByte((quake_CL.state.viewangles[2] * 256 / 360 | 0) & 255);
	buf.WriteShort(quake_CL.state.cmd.forwardmove | 0);
	buf.WriteShort(quake_CL.state.cmd.sidemove | 0);
	buf.WriteShort(quake_CL.state.cmd.upmove | 0);
	var bits = 0;
	if((quake_CL.kbuttons[quake_CL.kbutton.attack].state & 3) != 0) bits += 1;
	quake_CL.kbuttons[quake_CL.kbutton.attack].state &= 5;
	if((quake_CL.kbuttons[quake_CL.kbutton.jump].state & 3) != 0) bits += 2;
	quake_CL.kbuttons[quake_CL.kbutton.jump].state &= 5;
	buf.WriteByte(bits);
	buf.WriteByte(quake_CL.impulse);
	quake_CL.impulse = 0;
	if(quake_CL.cls.demoplayback) return;
	if(++quake_CL.state.movemessages <= 2) return;
	if(quake_NET.SendUnreliableMessage(quake_CL.cls.netcon,buf) == -1) {
		quake_Console.Print("CL.SendMove: lost server connection\n");
		quake_CL.Disconnect();
	}
};
quake_CL.InitInput = function() {
	var commands = ["moveup","movedown","left","right","forward","back","lookup","lookdown","strafe","moveleft","moveright","speed","attack","use","jump","klook"];
	var _g = 0;
	while(_g < commands.length) {
		var cmd = commands[_g];
		++_g;
		quake_Cmd.AddCommand("+" + cmd,quake_CL.KeyDown);
		quake_Cmd.AddCommand("-" + cmd,quake_CL.KeyUp);
	}
	quake_Cmd.AddCommand("impulse",quake_CL.Impulse);
	quake_Cmd.AddCommand("+mlook",quake_CL.KeyDown);
	quake_Cmd.AddCommand("-mlook",quake_CL.MLookUp);
	var _g1 = 0;
	var _g2 = quake_CL.kbutton.num;
	while(_g1 < _g2) {
		var i = _g1++;
		quake_CL.kbuttons[i] = { down : [0,0], state : 0};
	}
};
quake_CL.Rcon_f = function() {
	if(quake_CL.rcon_password.string.length == 0) {
		quake_Console.Print("You must set 'rcon_password' before\nissuing an rcon command.\n");
		return;
	}
	var to = null;
	if(quake_CL.cls.state == 2 && quake_CL.cls.netcon != null) {
		if(quake_NET.drivers[quake_CL.cls.netcon.driver] == quake_NET_$WEBS) to = quake_CL.cls.netcon.address.substring(5);
	}
	if(to == null) {
		if(quake_CL.rcon_address.string.length == 0) {
			quake_Console.Print("You must either be connected,\nor set the 'rcon_address' cvar\nto issue rcon commands\n");
			return;
		}
		to = quake_CL.rcon_address.string;
	}
	var pw;
	try {
		pw = quake_Q.btoa(new Uint8Array(quake_Q.strmem("quake:" + quake_CL.rcon_password.string)));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return;
	}
	var message = "";
	var i;
	var _g1 = 1;
	var _g = quake_Cmd.argv.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		message += quake_Cmd.argv[i1] + " ";
	}
	try {
		message = encodeURIComponent(message);
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return;
	}
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD","http://" + to + "/rcon/" + message);
	xhr.setRequestHeader("Authorization","Basic " + pw);
	xhr.send();
};
quake_CL.ClearState = function() {
	if(!quake_SV.server.active) {
		quake_Console.DPrint("Clearing memory\n");
		quake_Mod.ClearAll();
		quake_CL.cls.signon = 0;
	}
	quake_CL.state = new quake__$CL_ClientState();
	quake_CL.static_entities.length = 0;
	quake_CL.cls.message.cursize = 0;
	quake_CL.entities = [];
	quake_CL.dlights = [];
	var _g = 0;
	while(_g < 32) {
		_g++;
		quake_CL.dlights.push(new quake_DLight());
	}
	quake_CL.lightstyle = [];
	var _g1 = 0;
	while(_g1 < 64) {
		_g1++;
		quake_CL.lightstyle.push("");
	}
	quake_CL.beams = [];
	var _g2 = 0;
	while(_g2 < 24) {
		_g2++;
		quake_CL.beams.push(new quake__$CL_Beam());
	}
};
quake_CL.Disconnect = function() {
	quake_S.StopAllSounds();
	if(quake_CL.cls.demoplayback) quake_CL.StopPlayback(); else if(quake_CL.cls.state == 2) {
		if(quake_CL.cls.demorecording) quake_CL.Stop_f();
		quake_Console.DPrint("Sending clc_disconnect\n");
		quake_CL.cls.message.cursize = 0;
		quake_CL.cls.message.WriteByte(2);
		quake_NET.SendUnreliableMessage(quake_CL.cls.netcon,quake_CL.cls.message);
		quake_CL.cls.message.cursize = 0;
		quake_NET.Close(quake_CL.cls.netcon);
		quake_CL.cls.state = 0;
		if(quake_SV.server.active) quake_Host.ShutdownServer(false);
	}
	quake_CL.cls.demoplayback = quake_CL.cls.timedemo = false;
	quake_CL.cls.signon = 0;
};
quake_CL.Connect = function(sock) {
	quake_CL.cls.netcon = sock;
	quake_Console.DPrint("CL.Connect: connected to " + quake_CL.host + "\n");
	quake_CL.cls.demonum = -1;
	quake_CL.cls.state = 2;
	quake_CL.cls.signon = 0;
};
quake_CL.EstablishConnection = function(host) {
	if(quake_CL.cls.demoplayback) return;
	quake_CL.Disconnect();
	quake_CL.host = host;
	var sock = quake_NET.Connect(host);
	if(sock == null) quake_Host.Error("CL.EstablishConnection: connect failed\n");
	quake_CL.Connect(sock);
};
quake_CL.SignonReply = function() {
	quake_Console.DPrint("CL.SignonReply: " + quake_CL.cls.signon + "\n");
	var _g = quake_CL.cls.signon;
	switch(_g) {
	case 1:
		quake_CL.cls.message.WriteByte(4);
		quake_CL.cls.message.WriteString("prespawn");
		break;
	case 2:
		quake_CL.cls.message.WriteByte(4);
		quake_CL.cls.message.WriteString("name \"" + quake_CL.$name.string + "\"\n");
		quake_CL.cls.message.WriteByte(4);
		var col = quake_CL.color.value | 0;
		quake_CL.cls.message.WriteString("color " + (col >> 4) + " " + (col & 15) + "\n");
		quake_CL.cls.message.WriteByte(4);
		quake_CL.cls.message.WriteString("spawn " + quake_CL.cls.spawnparms);
		break;
	case 3:
		quake_CL.cls.message.WriteByte(4);
		quake_CL.cls.message.WriteString("begin");
		break;
	case 4:
		quake_SCR.EndLoadingPlaque();
		break;
	}
};
quake_CL.NextDemo = function() {
	if(quake_CL.cls.demonum == -1) return;
	quake_SCR.BeginLoadingPlaque();
	if(quake_CL.cls.demonum >= quake_CL.cls.demos.length) {
		if(quake_CL.cls.demos.length == 0) {
			quake_Console.Print("No demos listed with startdemos\n");
			quake_CL.cls.demonum = -1;
			return;
		}
		quake_CL.cls.demonum = 0;
	}
	quake_Cmd.text = "playdemo " + quake_CL.cls.demos[quake_CL.cls.demonum++] + "\n" + quake_Cmd.text;
};
quake_CL.PrintEntities_f = function() {
	var _g1 = 0;
	var _g = quake_CL.entities.length;
	while(_g1 < _g) {
		var i = _g1++;
		var ent = quake_CL.entities[i];
		if(i <= 9) quake_Console.Print("  " + i + ":"); else if(i <= 99) quake_Console.Print(" " + i + ":"); else quake_Console.Print(i + ":");
		if(ent.model == null) {
			quake_Console.Print("EMPTY\n");
			continue;
		}
		quake_Console.Print(ent.model.name + (ent.frame <= 9?": ":":") + ent.frame + "  (" + ent.origin[0].toFixed(1) + "," + ent.origin[1].toFixed(1) + "," + ent.origin[2].toFixed(1) + ") [" + ent.angles[0].toFixed(1) + " " + ent.angles[1].toFixed(1) + " " + ent.angles[2].toFixed(1) + "]\n");
	}
};
quake_CL.AllocDlight = function(key) {
	var dl = null;
	if(key != 0) {
		var _g = 0;
		var _g1 = quake_CL.dlights;
		while(_g < _g1.length) {
			var light = _g1[_g];
			++_g;
			if(light.key == key) {
				dl = light;
				break;
			}
		}
	}
	if(dl == null) {
		var _g2 = 0;
		var _g11 = quake_CL.dlights;
		while(_g2 < _g11.length) {
			var light1 = _g11[_g2];
			++_g2;
			if(light1.die < quake_CL.state.time) {
				dl = light1;
				break;
			}
		}
		if(dl == null) dl = quake_CL.dlights[0];
	}
	dl.key = key;
	dl.origin.set(quake__$Vec_Vec_$Impl_$.origin);
	dl.radius = 0;
	dl.minlight = 0;
	dl.decay = 0;
	dl.die = 0;
	return dl;
};
quake_CL.DecayLights = function() {
	var time = quake_CL.state.time - quake_CL.state.oldtime;
	var _g = 0;
	var _g1 = quake_CL.dlights;
	while(_g < _g1.length) {
		var dl = _g1[_g];
		++_g;
		if(dl.die < quake_CL.state.time || dl.radius == 0.0) continue;
		dl.radius -= time * dl.decay;
		if(dl.radius < 0.0) dl.radius = 0.0;
	}
};
quake_CL.LerpPoint = function() {
	var f = quake_CL.state.mtime0 - quake_CL.state.mtime1;
	if(f == 0.0 || quake_CL.nolerp.value != 0 || quake_CL.cls.timedemo || quake_SV.server.active) {
		quake_CL.state.time = quake_CL.state.mtime0;
		return 1.0;
	}
	if(f > 0.1) {
		quake_CL.state.mtime1 = quake_CL.state.mtime0 - 0.1;
		f = 0.1;
	}
	var frac = (quake_CL.state.time - quake_CL.state.mtime1) / f;
	if(frac < 0.0) {
		if(frac < -0.01) quake_CL.state.time = quake_CL.state.mtime1;
		return 0.0;
	}
	if(frac > 1.0) {
		if(frac > 1.01) quake_CL.state.time = quake_CL.state.mtime0;
		return 1.0;
	}
	return frac;
};
quake_CL.RelinkEntities = function() {
	var frac = quake_CL.LerpPoint();
	quake_CL.numvisedicts = 0;
	quake_CL.state.velocity[0] = quake_CL.state.mvelocity1[0] + frac * (quake_CL.state.mvelocity0[0] - quake_CL.state.mvelocity1[0]);
	quake_CL.state.velocity[1] = quake_CL.state.mvelocity1[1] + frac * (quake_CL.state.mvelocity0[1] - quake_CL.state.mvelocity1[1]);
	quake_CL.state.velocity[2] = quake_CL.state.mvelocity1[2] + frac * (quake_CL.state.mvelocity0[2] - quake_CL.state.mvelocity1[2]);
	if(quake_CL.cls.demoplayback) {
		var _g = 0;
		while(_g < 3) {
			var i = _g++;
			var d = quake_CL.state.mviewangles0[i] - quake_CL.state.mviewangles1[i];
			if(d > 180.0) d -= 360.0; else if(d < -180.0) d += 360.0;
			quake_CL.state.viewangles[i] = quake_CL.state.mviewangles1[i] + frac * d;
		}
	}
	var bobjrotate = quake__$Vec_Vec_$Impl_$.Anglemod(100.0 * quake_CL.state.time);
	var delta = [];
	var oldorg = new Float32Array(3);
	var dl;
	var _g1 = 1;
	var _g2 = quake_CL.entities.length;
	while(_g1 < _g2) {
		var i1 = _g1++;
		var ent = quake_CL.entities[i1];
		if(ent.model == null) continue;
		if(ent.msgtime != quake_CL.state.mtime0) {
			ent.model = null;
			continue;
		}
		oldorg[0] = ent.origin[0];
		oldorg[1] = ent.origin[1];
		oldorg[2] = ent.origin[2];
		if(ent.forcelink) {
			ent.origin.set(ent.msg_origins0);
			ent.angles.set(ent.msg_angles0);
		} else {
			var f = frac;
			var _g21 = 0;
			while(_g21 < 3) {
				var j = _g21++;
				delta[j] = ent.msg_origins0[j] - ent.msg_origins1[j];
				if(delta[j] > 100.0 || delta[j] < -100.0) f = 1.0;
			}
			var _g22 = 0;
			while(_g22 < 3) {
				var j1 = _g22++;
				ent.origin[j1] = ent.msg_origins1[j1] + f * delta[j1];
				var d1 = ent.msg_angles0[j1] - ent.msg_angles1[j1];
				if(d1 > 180.0) d1 -= 360.0; else if(d1 < -180.0) d1 += 360.0;
				ent.angles[j1] = ent.msg_angles1[j1] + f * d1;
			}
		}
		if((ent.model.flags & 8) != 0) ent.angles[1] = bobjrotate;
		if((ent.effects & 1) != 0) quake_Render.EntityParticles(ent);
		if((ent.effects & 2) != 0) {
			dl = quake_CL.AllocDlight(i1);
			var fv = new Float32Array(3);
			quake__$Vec_Vec_$Impl_$.AngleVectors(ent.angles,fv);
			var this1 = dl.origin;
			this1[0] = ent.origin[0] + 18.0 * fv[0];
			this1[1] = ent.origin[1] + 18.0 * fv[1];
			this1[2] = ent.origin[2] + 16.0 + 18.0 * fv[2];
			dl.radius = 200.0 + Math.random() * 32.0;
			dl.minlight = 32.0;
			dl.die = quake_CL.state.time + 0.1;
		}
		if((ent.effects & 4) != 0) {
			dl = quake_CL.AllocDlight(i1);
			var this2 = dl.origin;
			this2[0] = ent.origin[0];
			this2[1] = ent.origin[1];
			this2[2] = ent.origin[2] + 16.0;
			dl.radius = 400.0 + Math.random() * 32.0;
			dl.die = quake_CL.state.time + 0.001;
		}
		if((ent.effects & 8) != 0) {
			dl = quake_CL.AllocDlight(i1);
			var this3 = dl.origin;
			this3[0] = ent.origin[0];
			this3[1] = ent.origin[1];
			this3[2] = ent.origin[2] + 16.0;
			dl.radius = 200.0 + Math.random() * 32.0;
			dl.die = quake_CL.state.time + 0.001;
		}
		if((ent.model.flags & 4) != 0) quake_Render.RocketTrail(oldorg,ent.origin,2); else if((ent.model.flags & 32) != 0) quake_Render.RocketTrail(oldorg,ent.origin,4); else if((ent.model.flags & 16) != 0) quake_Render.RocketTrail(oldorg,ent.origin,3); else if((ent.model.flags & 64) != 0) quake_Render.RocketTrail(oldorg,ent.origin,5); else if((ent.model.flags & 1) != 0) {
			quake_Render.RocketTrail(oldorg,ent.origin,0);
			dl = quake_CL.AllocDlight(i1);
			dl.origin.set(ent.origin);
			dl.radius = 200.0;
			dl.die = quake_CL.state.time + 0.01;
		} else if((ent.model.flags & 2) != 0) quake_Render.RocketTrail(oldorg,ent.origin,1); else if((ent.model.flags & 128) != 0) quake_Render.RocketTrail(oldorg,ent.origin,6);
		ent.forcelink = false;
		if(i1 != quake_CL.state.viewentity || quake_Chase.active.value != 0) quake_CL.visedicts[quake_CL.numvisedicts++] = ent;
	}
};
quake_CL.ReadFromServer = function() {
	quake_CL.state.oldtime = quake_CL.state.time;
	quake_CL.state.time += quake_Host.frametime;
	while(true) {
		var ret = quake_CL.GetMessage();
		if(ret == -1) quake_Host.Error("CL.ReadFromServer: lost server connection");
		if(ret == 0) break;
		quake_CL.state.last_received_message = quake_Host.realtime;
		quake_CL.ParseServerMessage();
		if(quake_CL.cls.state != 2) break;
	}
	if(quake_CL.shownet.value != 0) quake_Console.Print("\n");
	quake_CL.RelinkEntities();
	quake_CL.UpdateTEnts();
};
quake_CL.SendCmd = function() {
	if(quake_CL.cls.state != 2) return;
	if(quake_CL.cls.signon == 4) {
		quake_CL.BaseMove();
		quake_IN.Move();
		quake_CL.SendMove();
	}
	if(quake_CL.cls.demoplayback) {
		quake_CL.cls.message.cursize = 0;
		return;
	}
	if(quake_CL.cls.message.cursize == 0) return;
	if(!quake_NET.CanSendMessage(quake_CL.cls.netcon)) {
		quake_Console.DPrint("CL.SendCmd: can't send\n");
		return;
	}
	if(quake_NET.SendMessage(quake_CL.cls.netcon,quake_CL.cls.message) == -1) quake_Host.Error("CL.SendCmd: lost server connection");
	quake_CL.cls.message.cursize = 0;
};
quake_CL.Init = function() {
	quake_CL.ClearState();
	quake_CL.InitInput();
	quake_CL.InitTEnts();
	quake_CL.$name = quake_Cvar.RegisterVariable("_cl_name","player",true);
	quake_CL.color = quake_Cvar.RegisterVariable("_cl_color","0",true);
	quake_CL.upspeed = quake_Cvar.RegisterVariable("cl_upspeed","200");
	quake_CL.forwardspeed = quake_Cvar.RegisterVariable("cl_forwardspeed","200",true);
	quake_CL.backspeed = quake_Cvar.RegisterVariable("cl_backspeed","200",true);
	quake_CL.sidespeed = quake_Cvar.RegisterVariable("cl_sidespeed","350");
	quake_CL.movespeedkey = quake_Cvar.RegisterVariable("cl_movespeedkey","2.0");
	quake_CL.yawspeed = quake_Cvar.RegisterVariable("cl_yawspeed","140");
	quake_CL.pitchspeed = quake_Cvar.RegisterVariable("cl_pitchspeed","150");
	quake_CL.anglespeedkey = quake_Cvar.RegisterVariable("cl_anglespeedkey","1.5");
	quake_CL.shownet = quake_Cvar.RegisterVariable("cl_shownet","0");
	quake_CL.nolerp = quake_Cvar.RegisterVariable("cl_nolerp","0");
	quake_CL.lookspring = quake_Cvar.RegisterVariable("lookspring","0",true);
	quake_CL.lookstrafe = quake_Cvar.RegisterVariable("lookstrafe","0",true);
	quake_CL.sensitivity = quake_Cvar.RegisterVariable("sensitivity","3",true);
	quake_CL.m_pitch = quake_Cvar.RegisterVariable("m_pitch","0.022",true);
	quake_CL.m_yaw = quake_Cvar.RegisterVariable("m_yaw","0.022",true);
	quake_CL.m_forward = quake_Cvar.RegisterVariable("m_forward","1",true);
	quake_CL.m_side = quake_Cvar.RegisterVariable("m_side","0.8",true);
	quake_CL.rcon_password = quake_Cvar.RegisterVariable("rcon_password","");
	quake_CL.rcon_address = quake_Cvar.RegisterVariable("rcon_address","");
	quake_Cmd.AddCommand("entities",quake_CL.PrintEntities_f);
	quake_Cmd.AddCommand("disconnect",quake_CL.Disconnect);
	quake_Cmd.AddCommand("record",quake_CL.Record_f);
	quake_Cmd.AddCommand("stop",quake_CL.Stop_f);
	quake_Cmd.AddCommand("playdemo",quake_CL.PlayDemo_f);
	quake_Cmd.AddCommand("timedemo",quake_CL.TimeDemo_f);
	quake_Cmd.AddCommand("rcon",quake_CL.Rcon_f);
};
quake_CL.EntityNum = function(num) {
	if(num < quake_CL.entities.length) return quake_CL.entities[num];
	while(quake_CL.entities.length <= num) quake_CL.entities.push(new quake_Entity(num));
	return quake_CL.entities[num];
};
quake_CL.ParseStartSoundPacket = function() {
	var field_mask = quake_MSG.ReadByte();
	var volume = (field_mask & 1) != 0?quake_MSG.ReadByte():255;
	var attenuation = (field_mask & 2) != 0?quake_MSG.ReadByte() * 0.015625:1.0;
	var channel = quake_MSG.ReadShort();
	var sound_num = quake_MSG.ReadByte();
	var ent = channel >> 3;
	channel &= 7;
	var tmp;
	var x = quake_MSG.ReadShort() * 0.125;
	var y = quake_MSG.ReadShort() * 0.125;
	var z = quake_MSG.ReadShort() * 0.125;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	var pos = tmp;
	quake_S.StartSound(ent,channel,quake_CL.state.sound_precache[sound_num],pos,volume / 255.0,attenuation);
};
quake_CL.KeepaliveMessage = function() {
	if(quake_SV.server.active || quake_CL.cls.demoplayback) return;
	var oldsize = quake_NET.message.cursize;
	var olddata = new Uint8Array(8192);
	olddata.set(new Uint8Array(quake_NET.message.data,0,oldsize));
	while(true) {
		var ret = quake_CL.GetMessage();
		switch(ret) {
		case 0:
			break;
		case 1:
			quake_Host.Error("CL.KeepaliveMessage: received a message");
			break;
		case 2:
			if(quake_MSG.ReadByte() != 1) quake_Host.Error("CL.KeepaliveMessage: datagram wasn't a nop");
			break;
		default:
			quake_Host.Error("CL.KeepaliveMessage: CL.GetMessage failed");
		}
		if(ret == 0) break;
	}
	quake_NET.message.cursize = oldsize;
	new Uint8Array(quake_NET.message.data,0,oldsize).set(olddata.subarray(0,oldsize));
	var time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	if(time - quake_CL.lastmsg < 5.0) return;
	quake_CL.lastmsg = time;
	quake_Console.Print("--> client to server keepalive\n");
	quake_CL.cls.message.WriteByte(1);
	quake_NET.SendMessage(quake_CL.cls.netcon,quake_CL.cls.message);
	quake_CL.cls.message.cursize = 0;
};
quake_CL.ParseServerInfo = function() {
	quake_Console.DPrint("Serverinfo packet received.\n");
	quake_CL.ClearState();
	var i = quake_MSG.ReadLong();
	if(i != 15) {
		quake_Console.Print("Server returned version " + i + ", not " + 15 + "\n");
		return;
	}
	quake_CL.state.maxclients = quake_MSG.ReadByte();
	if(quake_CL.state.maxclients <= 0 || quake_CL.state.maxclients > 16) {
		quake_Console.Print("Bad maxclients (" + quake_CL.state.maxclients + ") from server\n");
		return;
	}
	quake_CL.state.scores = [];
	var _g1 = 0;
	var _g = quake_CL.state.maxclients;
	while(_g1 < _g) {
		var i1 = _g1++;
		quake_CL.state.scores[i1] = new quake__$CL_Score();
	}
	quake_CL.state.gametype = quake_MSG.ReadByte();
	quake_CL.state.levelname = quake_MSG.ReadString();
	var s = "\n\n";
	var _g2 = 0;
	var _g11 = [35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,37];
	while(_g2 < _g11.length) {
		var c = _g11[_g2];
		++_g2;
		s += String.fromCharCode(c);
	}
	s += "\n\n";
	quake_Console.Print("\x02" + quake_CL.state.levelname + "\n");
	var str;
	var nummodels = 1;
	var model_precache = [];
	while(true) {
		str = quake_MSG.ReadString();
		if(str.length == 0) break;
		model_precache[nummodels++] = str;
	}
	var numsounds = 1;
	var sound_precache = [];
	while(true) {
		str = quake_MSG.ReadString();
		if(str.length == 0) break;
		sound_precache[numsounds++] = str;
	}
	quake_CL.state.model_precache = [];
	var _g3 = 1;
	while(_g3 < nummodels) {
		var i2 = _g3++;
		quake_CL.state.model_precache[i2] = quake_Mod.LoadModel(quake_Mod.FindName(model_precache[i2]),false);
		if(quake_CL.state.model_precache[i2] == null) {
			quake_Console.Print("Model " + model_precache[i2] + " not found\n");
			return;
		}
		quake_CL.KeepaliveMessage();
	}
	quake_CL.state.sound_precache = [];
	var _g4 = 1;
	while(_g4 < numsounds) {
		var i3 = _g4++;
		quake_CL.state.sound_precache[i3] = quake_S.PrecacheSound(sound_precache[i3]);
		quake_CL.KeepaliveMessage();
	}
	quake_CL.state.worldmodel = quake_CL.state.model_precache[1];
	quake_CL.EntityNum(0).model = quake_CL.state.worldmodel;
	quake_Render.NewMap();
	quake_Host.noclip_anglehack = false;
};
quake_CL.ParseUpdate = function(bits) {
	if(quake_CL.cls.signon == 3) {
		quake_CL.cls.signon = 4;
		quake_CL.SignonReply();
	}
	if((bits & 1) != 0) bits += quake_MSG.ReadByte() << 8;
	var ent = quake_CL.EntityNum((bits & 16384) != 0?quake_MSG.ReadShort():quake_MSG.ReadByte());
	var forcelink = ent.msgtime != quake_CL.state.mtime1;
	ent.msgtime = quake_CL.state.mtime0;
	var model = quake_CL.state.model_precache[(bits & 1024) != 0?quake_MSG.ReadByte():ent.baseline.modelindex];
	if(model != ent.model) {
		ent.model = model;
		if(model != null) ent.syncbase = model.random?Math.random():0.0; else forcelink = true;
	}
	ent.frame = (bits & 64) != 0?quake_MSG.ReadByte():ent.baseline.frame;
	ent.colormap = (bits & 2048) != 0?quake_MSG.ReadByte():ent.baseline.colormap;
	if(ent.colormap > quake_CL.state.maxclients) quake_Sys.Error("i >= cl.maxclients");
	ent.skinnum = (bits & 4096) != 0?quake_MSG.ReadByte():ent.baseline.skin;
	ent.effects = (bits & 8192) != 0?quake_MSG.ReadByte():ent.baseline.effects;
	ent.msg_origins1.set(ent.msg_origins0);
	ent.msg_angles1.set(ent.msg_angles0);
	var v = (bits & 2) != 0?quake_MSG.ReadShort() * 0.125:ent.baseline.origin[0];
	ent.msg_origins0[0] = v;
	var v1 = (bits & 256) != 0?quake_MSG.ReadChar() * 1.40625:ent.baseline.angles[0];
	ent.msg_angles0[0] = v1;
	var v2 = (bits & 4) != 0?quake_MSG.ReadShort() * 0.125:ent.baseline.origin[1];
	ent.msg_origins0[1] = v2;
	var v3 = (bits & 16) != 0?quake_MSG.ReadChar() * 1.40625:ent.baseline.angles[1];
	ent.msg_angles0[1] = v3;
	var v4 = (bits & 8) != 0?quake_MSG.ReadShort() * 0.125:ent.baseline.origin[2];
	ent.msg_origins0[2] = v4;
	var v5 = (bits & 512) != 0?quake_MSG.ReadChar() * 1.40625:ent.baseline.angles[2];
	ent.msg_angles0[2] = v5;
	if((bits & 32) != 0) ent.forcelink = true;
	if(forcelink) {
		ent.origin.set(ent.msg_origins0);
		ent.msg_origins1.set(ent.origin);
		ent.angles.set(ent.msg_angles0);
		ent.msg_angles1.set(ent.angles);
		ent.forcelink = true;
	}
};
quake_CL.ParseBaseline = function(ent) {
	ent.baseline.modelindex = quake_MSG.ReadByte();
	ent.baseline.frame = quake_MSG.ReadByte();
	ent.baseline.colormap = quake_MSG.ReadByte();
	ent.baseline.skin = quake_MSG.ReadByte();
	var v = quake_MSG.ReadShort() * 0.125;
	ent.baseline.origin[0] = v;
	var v1 = quake_MSG.ReadChar() * 1.40625;
	ent.baseline.angles[0] = v1;
	var v2 = quake_MSG.ReadShort() * 0.125;
	ent.baseline.origin[1] = v2;
	var v3 = quake_MSG.ReadChar() * 1.40625;
	ent.baseline.angles[1] = v3;
	var v4 = quake_MSG.ReadShort() * 0.125;
	ent.baseline.origin[2] = v4;
	var v5 = quake_MSG.ReadChar() * 1.40625;
	ent.baseline.angles[2] = v5;
};
quake_CL.ParseClientdata = function(bits) {
	quake_CL.state.viewheight = (bits & 1) != 0?quake_MSG.ReadChar():22;
	quake_CL.state.idealpitch = (bits & 2) != 0?quake_MSG.ReadChar():0.0;
	quake_CL.state.mvelocity1.set(quake_CL.state.mvelocity0);
	var _g = 0;
	while(_g < 3) {
		var i1 = _g++;
		if((bits & 4 << i1) != 0) {
			var v = quake_MSG.ReadChar();
			quake_CL.state.punchangle[i1] = v;
		} else quake_CL.state.punchangle[i1] = 0.0;
		if((bits & 32 << i1) != 0) {
			var v1 = quake_MSG.ReadChar() * 16.0;
			quake_CL.state.mvelocity0[i1] = v1;
		} else quake_CL.state.mvelocity0[i1] = 0.0;
	}
	var i = quake_MSG.ReadLong();
	if(quake_CL.state.items != i) {
		var _g1 = 0;
		while(_g1 < 32) {
			var j = _g1++;
			if((i >>> j & 1) != 0 && (quake_CL.state.items >>> j & 1) == 0) quake_CL.state.item_gettime[j] = quake_CL.state.time;
		}
		quake_CL.state.items = i;
	}
	quake_CL.state.onground = (bits & 1024) != 0;
	quake_CL.state.inwater = (bits & 2048) != 0;
	quake_CL.state.stats[5] = (bits & 4096) != 0?quake_MSG.ReadByte():0;
	quake_CL.state.stats[4] = (bits & 8192) != 0?quake_MSG.ReadByte():0;
	quake_CL.state.stats[2] = (bits & 16384) != 0?quake_MSG.ReadByte():0;
	quake_CL.state.stats[0] = quake_MSG.ReadShort();
	quake_CL.state.stats[3] = quake_MSG.ReadByte();
	quake_CL.state.stats[6] = quake_MSG.ReadByte();
	quake_CL.state.stats[7] = quake_MSG.ReadByte();
	quake_CL.state.stats[8] = quake_MSG.ReadByte();
	quake_CL.state.stats[9] = quake_MSG.ReadByte();
	if(quake_COM.standard_quake) quake_CL.state.stats[10] = quake_MSG.ReadByte(); else quake_CL.state.stats[10] = 1 << quake_MSG.ReadByte();
};
quake_CL.ParseStatic = function() {
	var ent = new quake_Entity();
	quake_CL.static_entities.push(ent);
	quake_CL.ParseBaseline(ent);
	ent.model = quake_CL.state.model_precache[ent.baseline.modelindex];
	ent.frame = ent.baseline.frame;
	ent.skinnum = ent.baseline.skin;
	ent.effects = ent.baseline.effects;
	ent.origin.set(ent.baseline.origin);
	ent.angles.set(ent.baseline.angles);
	quake_Render.currententity = ent;
	var tmp;
	var v1 = ent.origin;
	var v2 = ent.model.mins;
	var v = new Float32Array(3);
	v[0] = v1[0] + v1[2];
	v[1] = v1[1] + v2[1];
	v[2] = v1[2] + v2[2];
	tmp = v;
	var tmp1;
	var v11 = ent.origin;
	var v21 = ent.model.maxs;
	var v3 = new Float32Array(3);
	v3[0] = v11[0] + v11[2];
	v3[1] = v11[1] + v21[1];
	v3[2] = v11[2] + v21[2];
	tmp1 = v3;
	quake_Render.SplitEntityOnNode(tmp,tmp1,quake_CL.state.worldmodel.nodes[0]);
};
quake_CL.ParseStaticSound = function() {
	var tmp;
	var x = quake_MSG.ReadShort() * 0.125;
	var y = quake_MSG.ReadShort() * 0.125;
	var z = quake_MSG.ReadShort() * 0.125;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	var org = tmp;
	var sound_num = quake_MSG.ReadByte();
	var vol = quake_MSG.ReadByte();
	var atten = quake_MSG.ReadByte();
	quake_S.StaticSound(quake_CL.state.sound_precache[sound_num],org,vol / 255.0,atten);
};
quake_CL.Shownet = function(x) {
	if(quake_CL.shownet.value == 2) quake_Console.Print((quake_MSG.readcount <= 99?quake_MSG.readcount <= 9?"  ":" ":"") + (quake_MSG.readcount - 1) + ":" + x + "\n");
};
quake_CL.ParseServerMessage = function() {
	if(quake_CL.shownet.value == 1) quake_Console.Print(quake_NET.message.cursize + " "); else if(quake_CL.shownet.value == 2) quake_Console.Print("------------------\n");
	quake_CL.state.onground = false;
	quake_MSG.BeginReading();
	while(true) {
		if(quake_MSG.badread) quake_Host.Error("CL.ParseServerMessage: Bad server message");
		var cmd = quake_MSG.ReadByte();
		if(cmd == -1) {
			quake_CL.Shownet("END OF MESSAGE");
			return;
		}
		if((cmd & 128) != 0) {
			quake_CL.Shownet("fast update");
			quake_CL.ParseUpdate(cmd & 127);
			continue;
		}
		quake_CL.Shownet("svc_" + quake_CL.svc_strings[cmd]);
		var _g = cmd;
		switch(_g) {
		case 1:
			continue;
			break;
		case 7:
			quake_CL.state.mtime1 = quake_CL.state.mtime0;
			quake_CL.state.mtime0 = quake_MSG.ReadFloat();
			continue;
			break;
		case 15:
			quake_CL.ParseClientdata(quake_MSG.ReadShort());
			continue;
			break;
		case 4:
			var i = quake_MSG.ReadLong();
			if(i != 15) quake_Host.Error("CL.ParseServerMessage: Server is protocol " + i + " instead of " + 15 + "\n");
			continue;
			break;
		case 2:
			quake_Host.EndGame("Server disconnected\n");
			break;
		case 8:
			quake_Console.Print(quake_MSG.ReadString());
			continue;
			break;
		case 26:
			quake_SCR.CenterPrint(quake_MSG.ReadString());
			continue;
			break;
		case 9:
			quake_Cmd.text += quake_MSG.ReadString();
			continue;
			break;
		case 19:
			quake_V.ParseDamage();
			continue;
			break;
		case 11:
			quake_CL.ParseServerInfo();
			quake_SCR.recalc_refdef = true;
			continue;
			break;
		case 10:
			var v = quake_MSG.ReadChar() * 1.40625;
			quake_CL.state.viewangles[0] = v;
			var v1 = quake_MSG.ReadChar() * 1.40625;
			quake_CL.state.viewangles[1] = v1;
			var v2 = quake_MSG.ReadChar() * 1.40625;
			quake_CL.state.viewangles[2] = v2;
			continue;
			break;
		case 5:
			quake_CL.state.viewentity = quake_MSG.ReadShort();
			continue;
			break;
		case 12:
			var i1 = quake_MSG.ReadByte();
			if(i1 >= 64) quake_Sys.Error("svc_lightstyle > MAX_LIGHTSTYLES");
			quake_CL.lightstyle[i1] = quake_MSG.ReadString();
			continue;
			break;
		case 6:
			quake_CL.ParseStartSoundPacket();
			continue;
			break;
		case 16:
			var i2 = quake_MSG.ReadShort();
			quake_S.StopSound(i2 >> 3,i2 & 7);
			continue;
			break;
		case 13:
			var i3 = quake_MSG.ReadByte();
			if(i3 >= quake_CL.state.maxclients) quake_Host.Error("CL.ParseServerMessage: svc_updatename > MAX_SCOREBOARD");
			quake_CL.state.scores[i3].name = quake_MSG.ReadString();
			continue;
			break;
		case 14:
			var i4 = quake_MSG.ReadByte();
			if(i4 >= quake_CL.state.maxclients) quake_Host.Error("CL.ParseServerMessage: svc_updatefrags > MAX_SCOREBOARD");
			quake_CL.state.scores[i4].frags = quake_MSG.ReadShort();
			continue;
			break;
		case 17:
			var i5 = quake_MSG.ReadByte();
			if(i5 >= quake_CL.state.maxclients) quake_Host.Error("CL.ParseServerMessage: svc_updatecolors > MAX_SCOREBOARD");
			quake_CL.state.scores[i5].colors = quake_MSG.ReadByte();
			continue;
			break;
		case 18:
			quake_Render.ParseParticleEffect();
			continue;
			break;
		case 22:
			quake_CL.ParseBaseline(quake_CL.EntityNum(quake_MSG.ReadShort()));
			continue;
			break;
		case 20:
			quake_CL.ParseStatic();
			continue;
			break;
		case 23:
			quake_CL.ParseTEnt();
			continue;
			break;
		case 24:
			quake_CL.state.paused = quake_MSG.ReadByte() != 0;
			if(quake_CL.state.paused) quake_CDAudio.Pause(); else quake_CDAudio.Resume();
			continue;
			break;
		case 25:
			var i6 = quake_MSG.ReadByte();
			if(i6 <= quake_CL.cls.signon) quake_Host.Error("Received signon " + i6 + " when at " + quake_CL.cls.signon);
			quake_CL.cls.signon = i6;
			quake_CL.SignonReply();
			continue;
			break;
		case 27:
			++quake_CL.state.stats[14];
			continue;
			break;
		case 28:
			++quake_CL.state.stats[13];
			continue;
			break;
		case 3:
			var i7 = quake_MSG.ReadByte();
			if(i7 >= 32) quake_Sys.Error("svc_updatestat: " + i7 + " is invalid");
			quake_CL.state.stats[i7] = quake_MSG.ReadLong();
			continue;
			break;
		case 29:
			quake_CL.ParseStaticSound();
			continue;
			break;
		case 32:
			quake_CL.state.cdtrack = quake_MSG.ReadByte();
			quake_MSG.ReadByte();
			if((quake_CL.cls.demoplayback || quake_CL.cls.demorecording) && quake_CL.cls.forcetrack != -1) quake_CDAudio.Play(quake_CL.cls.forcetrack,true); else quake_CDAudio.Play(quake_CL.state.cdtrack,true);
			continue;
			break;
		case 30:
			quake_CL.state.intermission = 1;
			quake_CL.state.completed_time = quake_CL.state.time;
			quake_SCR.recalc_refdef = true;
			continue;
			break;
		case 31:
			quake_CL.state.intermission = 2;
			quake_CL.state.completed_time = quake_CL.state.time;
			quake_SCR.recalc_refdef = true;
			quake_SCR.CenterPrint(quake_MSG.ReadString());
			continue;
			break;
		case 34:
			quake_CL.state.intermission = 3;
			quake_CL.state.completed_time = quake_CL.state.time;
			quake_SCR.recalc_refdef = true;
			quake_SCR.CenterPrint(quake_MSG.ReadString());
			continue;
			break;
		case 33:
			quake_Cmd.ExecuteString("help");
			continue;
			break;
		}
		quake_Host.Error("CL.ParseServerMessage: Illegible server message\n");
	}
};
quake_CL.InitTEnts = function() {
	quake_CL.sfx_wizhit = quake_S.PrecacheSound("wizard/hit.wav");
	quake_CL.sfx_knighthit = quake_S.PrecacheSound("hknight/hit.wav");
	quake_CL.sfx_tink1 = quake_S.PrecacheSound("weapons/tink1.wav");
	quake_CL.sfx_ric1 = quake_S.PrecacheSound("weapons/ric1.wav");
	quake_CL.sfx_ric2 = quake_S.PrecacheSound("weapons/ric2.wav");
	quake_CL.sfx_ric3 = quake_S.PrecacheSound("weapons/ric3.wav");
	quake_CL.sfx_r_exp3 = quake_S.PrecacheSound("weapons/r_exp3.wav");
};
quake_CL.ParseBeam = function(m) {
	var ent = quake_MSG.ReadShort();
	var start_0 = quake_MSG.ReadShort() * 0.125;
	var start_1 = quake_MSG.ReadShort() * 0.125;
	var start_2 = quake_MSG.ReadShort() * 0.125;
	var end_0 = quake_MSG.ReadShort() * 0.125;
	var end_1 = quake_MSG.ReadShort() * 0.125;
	var end_2 = quake_MSG.ReadShort() * 0.125;
	var _g = 0;
	var _g1 = quake_CL.beams;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		if(b.entity == ent) {
			b.model = m;
			b.endtime = quake_CL.state.time + 0.2;
			var this1 = b.start;
			this1[0] = start_0;
			this1[1] = start_1;
			this1[2] = start_2;
			var this2 = b.end;
			this2[0] = end_0;
			this2[1] = end_1;
			this2[2] = end_2;
			return;
		}
	}
	var _g2 = 0;
	var _g11 = quake_CL.beams;
	while(_g2 < _g11.length) {
		var b1 = _g11[_g2];
		++_g2;
		if(b1.model == null || b1.endtime >= quake_CL.state.time) {
			b1.entity = ent;
			b1.model = m;
			b1.endtime = quake_CL.state.time + 0.2;
			var this3 = b1.start;
			this3[0] = start_0;
			this3[1] = start_1;
			this3[2] = start_2;
			var this4 = b1.end;
			this4[0] = end_0;
			this4[1] = end_1;
			this4[2] = end_2;
			return;
		}
	}
	quake_Console.Print("beam list overflow!\n");
};
quake_CL.ParseTEnt = function() {
	var type = quake_MSG.ReadByte();
	switch(type) {
	case 5:
		quake_CL.ParseBeam(quake_Mod.LoadModel(quake_Mod.FindName("progs/bolt.mdl"),true));
		return;
	case 6:
		quake_CL.ParseBeam(quake_Mod.LoadModel(quake_Mod.FindName("progs/bolt2.mdl"),true));
		return;
	case 9:
		quake_CL.ParseBeam(quake_Mod.LoadModel(quake_Mod.FindName("progs/bolt3.mdl"),true));
		return;
	case 13:
		quake_CL.ParseBeam(quake_Mod.LoadModel(quake_Mod.FindName("progs/beam.mdl"),true));
		return;
	default:
	}
	var tmp;
	var x = quake_MSG.ReadShort() * 0.125;
	var y = quake_MSG.ReadShort() * 0.125;
	var z = quake_MSG.ReadShort() * 0.125;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	var pos = tmp;
	switch(type) {
	case 7:
		quake_Render.RunParticleEffect(pos,quake__$Vec_Vec_$Impl_$.origin,20,20);
		quake_S.StartSound(-1,0,quake_CL.sfx_wizhit,pos,1.0,1.0);
		break;
	case 8:
		quake_Render.RunParticleEffect(pos,quake__$Vec_Vec_$Impl_$.origin,226,20);
		quake_S.StartSound(-1,0,quake_CL.sfx_knighthit,pos,1.0,1.0);
		break;
	case 0:
		quake_Render.RunParticleEffect(pos,quake__$Vec_Vec_$Impl_$.origin,0,10);
		break;
	case 1:
		quake_Render.RunParticleEffect(pos,quake__$Vec_Vec_$Impl_$.origin,0,20);
		break;
	case 2:
		quake_Render.RunParticleEffect(pos,quake__$Vec_Vec_$Impl_$.origin,0,20);
		break;
	case 3:
		quake_Render.ParticleExplosion(pos);
		var dl = quake_CL.AllocDlight(0);
		dl.origin.set(pos);
		dl.radius = 350.0;
		dl.die = quake_CL.state.time + 0.5;
		dl.decay = 300.0;
		quake_S.StartSound(-1,0,quake_CL.sfx_r_exp3,pos,1.0,1.0);
		break;
	case 4:
		quake_Render.BlobExplosion(pos);
		quake_S.StartSound(-1,0,quake_CL.sfx_r_exp3,pos,1.0,1.0);
		break;
	case 10:
		quake_Render.LavaSplash(pos);
		break;
	case 11:
		quake_Render.TeleportSplash(pos);
		break;
	case 12:
		var colorStart = quake_MSG.ReadByte();
		var colorLength = quake_MSG.ReadByte();
		quake_Render.ParticleExplosion2(pos,colorStart,colorLength);
		var dl1 = quake_CL.AllocDlight(0);
		dl1.origin.set(pos);
		dl1.radius = 350.0;
		dl1.die = quake_CL.state.time + 0.5;
		dl1.decay = 300.0;
		quake_S.StartSound(-1,0,quake_CL.sfx_r_exp3,pos,1.0,1.0);
		break;
	default:
		quake_Sys.Error("CL.ParseTEnt: bad type");
	}
};
quake_CL.NewTempEntity = function() {
	var ent = new quake_Entity();
	quake_CL.temp_entities[quake_CL.num_temp_entities++] = ent;
	quake_CL.visedicts[quake_CL.numvisedicts++] = ent;
	return ent;
};
quake_CL.UpdateTEnts = function() {
	quake_CL.num_temp_entities = 0;
	var dist_0 = 0.0;
	var dist_1 = 0.0;
	var dist_2 = 0.0;
	var org_0 = 0.0;
	var org_1 = 0.0;
	var org_2 = 0.0;
	var _g = 0;
	var _g1 = quake_CL.beams;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		if(b.model == null || b.endtime < quake_CL.state.time) continue;
		if(b.entity == quake_CL.state.viewentity) b.start.set(quake_CL.entities[quake_CL.state.viewentity].origin);
		dist_0 = b.end[0] - b.start[0];
		dist_1 = b.end[1] - b.start[1];
		dist_2 = b.end[2] - b.start[2];
		var yaw;
		var pitch;
		if(dist_0 == 0.0 && dist_1 == 0.0) {
			yaw = 0;
			pitch = dist_2 > 0.0?90:270;
		} else {
			var tmp;
			var x = Math.atan2(dist_1,dist_0) * 180.0 / Math.PI;
			tmp = x | 0;
			yaw = tmp;
			if(yaw < 0) yaw += 360;
			var tmp1;
			var x1 = Math.atan2(dist_2,Math.sqrt(dist_0 * dist_0 + dist_1 * dist_1)) * 180.0 / Math.PI;
			tmp1 = x1 | 0;
			pitch = tmp1;
			if(pitch < 0) pitch += 360;
		}
		org_0 = b.start[0];
		org_1 = b.start[1];
		org_2 = b.start[2];
		var d = Math.sqrt(dist_0 * dist_0 + dist_1 * dist_1 + dist_2 * dist_2);
		if(d != 0.0) {
			dist_0 /= d;
			dist_1 /= d;
			dist_2 /= d;
		}
		while(d > 0.0) {
			var ent = quake_CL.NewTempEntity();
			var this1 = ent.origin;
			this1[0] = org_0;
			this1[1] = org_1;
			this1[2] = org_2;
			ent.model = b.model;
			var this2 = ent.angles;
			var z = Math.random() * 360.0;
			this2[0] = pitch;
			this2[1] = yaw;
			this2[2] = z;
			org_0 += dist_0 * 30.0;
			org_1 += dist_1 * 30.0;
			org_2 += dist_2 * 30.0;
			d -= 30.0;
		}
	}
};
quake_CL.RunParticles = function() {
	var frametime = quake_CL.state.time - quake_CL.state.oldtime;
	var grav = frametime * quake_SV.gravity.value * 0.05;
	var dvel = frametime * 4.0;
	var _g = 0;
	var _g1 = quake_Render.particles;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(p.die < quake_CL.state.time) continue;
		p.org[0] = p.org[0] + p.vel[0] * frametime;
		p.org[1] = p.org[1] + p.vel[1] * frametime;
		p.org[2] = p.org[2] + p.vel[2] * frametime;
		var _g2 = p.type;
		switch(_g2) {
		case 3:
			p.ramp += frametime * 5.0;
			if(p.ramp >= 6.0) p.die = -1.0; else p.color = quake_Render.ramp3[Math.floor(p.ramp)];
			p.vel[2] = p.vel[2] + grav;
			break;
		case 4:
			p.ramp += frametime * 10.0;
			if(p.ramp >= 8.0) p.die = -1.0; else p.color = quake_Render.ramp1[Math.floor(p.ramp)];
			p.vel[0] = p.vel[0] + p.vel[0] * dvel;
			p.vel[1] = p.vel[1] + p.vel[1] * dvel;
			p.vel[2] = p.vel[2] + (p.vel[2] * dvel - grav);
			break;
		case 5:
			p.ramp += frametime * 15.0;
			if(p.ramp >= 8.0) p.die = -1.0; else p.color = quake_Render.ramp2[Math.floor(p.ramp)];
			p.vel[0] = p.vel[0] - p.vel[0] * frametime;
			p.vel[1] = p.vel[1] - p.vel[1] * frametime;
			p.vel[2] = p.vel[2] - (p.vel[2] * frametime + grav);
			break;
		case 6:
			p.vel[0] = p.vel[0] + p.vel[0] * dvel;
			p.vel[1] = p.vel[1] + p.vel[1] * dvel;
			p.vel[2] = p.vel[2] + (p.vel[2] * dvel - grav);
			break;
		case 7:
			p.vel[0] = p.vel[0] + p.vel[0] * dvel;
			p.vel[1] = p.vel[1] + p.vel[1] * dvel;
			p.vel[2] = p.vel[2] - grav;
			break;
		case 1:case 2:
			p.vel[2] = p.vel[2] - grav;
			break;
		default:
		}
	}
};
var quake__$COM_SearchPath = function(f) {
	this.filename = f;
	this.pack = [];
};
quake__$COM_SearchPath.__name__ = true;
var quake__$COM_File = function(info,i) {
	this.name = quake_Q.memstr(new Uint8Array(info,i << 6,56)).toLowerCase();
	this.filepos = new DataView(info).getUint32((i << 6) + 56,true);
	this.filelen = new DataView(info).getUint32((i << 6) + 60,true);
};
quake__$COM_File.__name__ = true;
var quake_COM = function() { };
quake_COM.__name__ = true;
quake_COM.DefaultExtension = function(path,extension) {
	var i = path.length - 1;
	while(i >= 0) {
		var src = HxOverrides.cca(path,i);
		if(src == 47) break;
		if(src == 46) return path;
		i--;
	}
	return path + extension;
};
quake_COM.Parse = function(data) {
	quake_COM.token = "";
	if(data.length == 0) return null;
	var i = 0;
	var c = null;
	var skipwhite = true;
	while(true) {
		if(!skipwhite) break;
		skipwhite = false;
		while(true) {
			if(i >= data.length) return null;
			c = HxOverrides.cca(data,i);
			if(c > 32) break;
			++i;
		}
		if(c == 47 && HxOverrides.cca(data,i + 1) == 47) {
			while(true) {
				if(i >= data.length || HxOverrides.cca(data,i) == 10) break;
				++i;
			}
			skipwhite = true;
		}
	}
	if(c == 34) {
		++i;
		while(true) {
			c = HxOverrides.cca(data,i);
			++i;
			if(i >= data.length || c == 34) return data.substring(i);
			quake_COM.token += String.fromCharCode(c);
		}
	}
	while(true) {
		if(i >= data.length || c <= 32) break;
		quake_COM.token += String.fromCharCode(c);
		++i;
		c = HxOverrides.cca(data,i);
	}
	return data.substring(i);
};
quake_COM.CheckParm = function(parm) {
	var _g1 = 1;
	var _g = quake_COM.argv.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_COM.argv[i] == parm) return i;
	}
	return null;
};
quake_COM.CheckRegistered = function() {
	var h = quake_COM.LoadFile("gfx/pop.lmp");
	if(h == null) {
		quake_Console.Print("Playing shareware version.\n");
		if(quake_COM.modified) quake_Sys.Error("You must have the registered version to use modified games");
		return;
	}
	var check = new Uint8Array(h);
	var pop = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,102,0,0,0,0,0,0,0,102,0,0,0,0,0,0,102,0,0,0,0,0,0,0,0,0,103,0,0,0,0,102,101,0,0,0,0,0,0,0,0,0,101,102,0,0,99,101,97,0,0,0,0,0,0,0,0,0,97,101,99,0,100,101,97,0,0,0,0,0,0,0,0,0,97,101,100,0,100,101,100,0,0,100,105,105,105,100,0,0,100,101,100,0,99,101,104,98,0,0,100,104,100,0,0,98,104,101,99,0,0,101,103,105,99,0,100,103,100,0,99,105,103,101,0,0,0,98,102,103,105,106,104,103,104,106,105,103,102,98,0,0,0,0,98,101,102,102,102,102,102,102,102,101,98,0,0,0,0,0,0,0,98,99,100,102,100,99,98,0,0,0,0,0,0,0,0,0,0,0,98,102,98,0,0,0,0,0,0,0,0,0,0,0,0,0,97,102,97,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0,0,0,0];
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		if(check[i] != pop[i]) quake_Sys.Error("Corrupted data file.");
	}
	quake_COM.registered.set("1");
	quake_Console.Print("Playing registered version.\n");
};
quake_COM.InitArgv = function(pargv) {
	quake_COM.cmdline = (pargv.join(" ") + " ").substring(0,256);
	quake_COM.argv = pargv.slice();
	if(quake_COM.CheckParm("-safe") != null) quake_COM.argv = quake_COM.argv.concat(["-nosound","-nocdaudio","-nomouse"]);
	if(quake_COM.CheckParm("-rogue") != null) {
		quake_COM.rogue = true;
		quake_COM.standard_quake = false;
	} else if(quake_COM.CheckParm("-hipnotic") != null) {
		quake_COM.hipnotic = true;
		quake_COM.standard_quake = false;
	}
};
quake_COM.Init = function() {
	if(window.document.location.protocol != "http:" && window.document.location.protocol != "https:") quake_Sys.Error("Protocol is " + window.document.location.protocol + ", not http: or https:");
	var swaptest = new ArrayBuffer(2);
	var swaptestview = new Uint8Array(swaptest);
	swaptestview[0] = 1;
	swaptestview[1] = 0;
	if(new Uint16Array(swaptest)[0] == 1) quake_COM.LittleLong = function(l) {
		return l;
	}; else quake_COM.LittleLong = function(l1) {
		return (l1 >>> 24) + ((l1 & 16711680) >>> 8) + ((l1 & 65280) << 8 >>> 0) + (l1 << 24 >>> 0);
	};
	quake_COM.registered = quake_Cvar.RegisterVariable("registered","0");
	quake_Cvar.RegisterVariable("cmdline",quake_COM.cmdline,false,true);
	quake_Cmd.AddCommand("path",quake_COM.Path_f);
	quake_COM.InitFilesystem();
	quake_COM.CheckRegistered();
};
quake_COM.Path_f = function() {
	quake_Console.Print("Current search path:\n");
	var i = quake_COM.searchpaths.length - 1;
	while(i >= 0) {
		var s = quake_COM.searchpaths[i--];
		var j = s.pack.length - 1;
		while(j >= 0) {
			quake_Console.Print(s.filename + "/" + "pak" + j + ".pak (" + s.pack[j].length + " files)\n");
			j--;
		}
		quake_Console.Print(s.filename + "\n");
	}
};
quake_COM.WriteFile = function(filename,data,len) {
	filename = filename.toLowerCase();
	var dest = [];
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest.push(String.fromCharCode(data[i]));
	}
	try {
		quake_COM.localStorage.setItem("Quake." + quake_COM.searchpaths[quake_COM.searchpaths.length - 1].filename + "/" + filename,dest.join(""));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		console.log("COM.WriteFile: failed on " + filename + "\n");
		return false;
	}
	console.log("COM.WriteFile: " + filename + "\n");
	return true;
};
quake_COM.WriteTextFile = function(filename,data) {
	filename = filename.toLowerCase();
	try {
		quake_COM.localStorage.setItem("Quake." + quake_COM.searchpaths[quake_COM.searchpaths.length - 1].filename + "/" + filename,data);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		console.log("COM.WriteTextFile: failed on " + filename + "\n");
		return false;
	}
	console.log("COM.WriteTextFile: " + filename + "\n");
	return true;
};
quake_COM.LoadFile = function(filename) {
	filename = filename.toLowerCase();
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("text/plain; charset=x-user-defined");
	quake_Draw.BeginDisc();
	var i = quake_COM.searchpaths.length - 1;
	while(i >= 0) {
		var search = quake_COM.searchpaths[i--];
		var netpath = search.filename + "/" + filename;
		var data = quake_COM.localStorage.getItem("Quake." + netpath);
		if(data != null) {
			console.log("FindFile: " + netpath + "\n");
			quake_Draw.EndDisc();
			return quake_Q.strmem(data);
		}
		var j = search.pack.length - 1;
		while(j >= 0) {
			var pak = search.pack[j];
			var _g = 0;
			while(_g < pak.length) {
				var file = pak[_g];
				++_g;
				if(file.name != filename) continue;
				if(file.filelen == 0) {
					quake_Draw.EndDisc();
					return new ArrayBuffer(0);
				}
				xhr.open("GET",search.filename + "/pak" + j + ".pak",false);
				xhr.setRequestHeader("Range","bytes=" + file.filepos + "-" + (file.filepos + file.filelen - 1));
				xhr.send();
				if(xhr.status >= 200 && xhr.status <= 299 && xhr.responseText.length == file.filelen) {
					console.log("PackFile: " + search.filename + "/pak" + j + ".pak : " + filename + "\n");
					quake_Draw.EndDisc();
					return quake_Q.strmem(xhr.responseText);
				}
				break;
			}
			j--;
		}
		xhr.open("GET",netpath,false);
		xhr.send();
		if(xhr.status >= 200 && xhr.status <= 299) {
			console.log("FindFile: " + netpath + "\n");
			quake_Draw.EndDisc();
			return quake_Q.strmem(xhr.responseText);
		}
	}
	console.log("FindFile: can't find " + filename + "\n");
	quake_Draw.EndDisc();
	return null;
};
quake_COM.LoadTextFile = function(filename) {
	var buf = quake_COM.LoadFile(filename);
	if(buf == null) return null;
	var bufview = new Uint8Array(buf);
	var f_b = "";
	var _g1 = 0;
	var _g = bufview.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(bufview[i] != 13) f_b += String.fromCharCode(bufview[i]);
	}
	return f_b;
};
quake_COM.LoadPackFile = function(packfile) {
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("text/plain; charset=x-user-defined");
	xhr.open("GET",packfile,false);
	xhr.setRequestHeader("Range","bytes=0-11");
	xhr.send();
	if(xhr.status <= 199 || xhr.status >= 300 || xhr.responseText.length != 12) return null;
	var header = new DataView(quake_Q.strmem(xhr.responseText));
	if(header.getUint32(0,true) != 1262698832) quake_Sys.Error(packfile + " is not a packfile");
	var dirofs = header.getUint32(4,true);
	var dirlen = header.getUint32(8,true);
	var numpackfiles = dirlen >> 6;
	if(numpackfiles != 339) quake_COM.modified = true;
	var pack = [];
	if(numpackfiles != 0) {
		xhr.open("GET",packfile,false);
		xhr.setRequestHeader("Range","bytes=" + dirofs + "-" + (dirofs + dirlen - 1));
		xhr.send();
		if(xhr.status <= 199 || xhr.status >= 300 || xhr.responseText.length != dirlen) return null;
		var info = quake_Q.strmem(xhr.responseText);
		if(quake_CRC.Block(new Uint8Array(info)) != 32981) quake_COM.modified = true;
		var _g = 0;
		while(_g < numpackfiles) {
			var i = _g++;
			pack.push(new quake__$COM_File(info,i));
		}
	}
	quake_Console.Print("Added packfile " + packfile + " (" + numpackfiles + " files)\n");
	return pack;
};
quake_COM.AddGameDirectory = function(dir) {
	var search = new quake__$COM_SearchPath(dir);
	var i = 0;
	while(true) {
		var pak = quake_COM.LoadPackFile(dir + "/" + "pak" + i + ".pak");
		if(pak == null) break;
		search.pack.push(pak);
		++i;
	}
	quake_COM.searchpaths.push(search);
};
quake_COM.InitFilesystem = function() {
	var i = quake_COM.CheckParm("-basedir");
	var search = null;
	if(i != null) search = quake_COM.argv[i + 1];
	if(search != null) quake_COM.AddGameDirectory(search); else quake_COM.AddGameDirectory("id1");
	if(quake_COM.rogue) quake_COM.AddGameDirectory("rogue"); else if(quake_COM.hipnotic) quake_COM.AddGameDirectory("hipnotic");
	i = quake_COM.CheckParm("-game");
	if(i != null) {
		search = quake_COM.argv[i + 1];
		if(search != null) {
			quake_COM.modified = true;
			quake_COM.AddGameDirectory(search);
		}
	}
	quake_COM.gamedir = [quake_COM.searchpaths[quake_COM.searchpaths.length - 1]];
};
var quake_CRC = function() { };
quake_CRC.__name__ = true;
quake_CRC.Block = function(start) {
	var crcvalue = 65535;
	var _g1 = 0;
	var _g = start.length;
	while(_g1 < _g) {
		var i = _g1++;
		crcvalue = crcvalue << 8 & 65535 ^ quake_CRC.table[crcvalue >> 8 ^ start[i]];
	}
	return crcvalue;
};
var quake_Chase = function() { };
quake_Chase.__name__ = true;
quake_Chase.Init = function() {
	quake_Chase.back = quake_Cvar.RegisterVariable("chase_back","100");
	quake_Chase.up = quake_Cvar.RegisterVariable("chase_up","16");
	quake_Chase.right = quake_Cvar.RegisterVariable("chase_right","0");
	quake_Chase.active = quake_Cvar.RegisterVariable("chase_active","0");
};
quake_Chase.Update = function() {
	var forward = new Float32Array(3);
	var r = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(quake_CL.state.viewangles,forward,r);
	var tr = new quake_Trace();
	var org = quake_Render.refdef.vieworg;
	var tmp;
	var v = new Float32Array(3);
	v[0] = org[0] + 4096.0 * forward[0];
	v[1] = org[1] + 4096.0 * forward[1];
	v[2] = org[2] + 4096.0 * forward[2];
	tmp = v;
	quake_SV.RecursiveHullCheck(quake_CL.state.worldmodel.hulls[0],0,0.0,1.0,org,tmp,tr);
	var stop = tr.endpos;
	stop[2] = stop[2] - org[2];
	var dist = (stop[0] - org[0]) * forward[0] + (stop[1] - org[1]) * forward[1] + stop[2] * forward[2];
	if(dist < 1.0) dist = 1.0;
	var v1 = Math.atan(stop[2] / dist) / Math.PI * -180.0;
	quake_Render.refdef.viewangles[0] = v1;
	org[0] = org[0] - (forward[0] * quake_Chase.back.value + r[0] * quake_Chase.right.value);
	org[1] = org[1] - (forward[1] * quake_Chase.back.value + r[1] * quake_Chase.right.value);
	org[2] = org[2] + quake_Chase.up.value;
};
var quake_Cmd = function() { };
quake_Cmd.__name__ = true;
quake_Cmd.Init = function() {
	quake_Cmd.AddCommand("stuffcmds",quake_Cmd.StuffCmds_f);
	quake_Cmd.AddCommand("exec",quake_Cmd.Exec_f);
	quake_Cmd.AddCommand("echo",quake_Cmd.Echo_f);
	quake_Cmd.AddCommand("alias",quake_Cmd.Alias_f);
	quake_Cmd.AddCommand("cmd",quake_Cmd.ForwardToServer);
	quake_Cmd.AddCommand("wait",quake_Cmd.Wait_f);
};
quake_Cmd.AddCommand = function(name,command) {
	var tmp;
	var _this = quake_Cvar.vars;
	if(__map_reserved[name] != null) tmp = _this.existsReserved(name); else tmp = _this.h.hasOwnProperty(name);
	if(tmp) {
		quake_Console.Print("Cmd.AddCommand: " + name + " already defined as a var\n");
		return;
	}
	var tmp1;
	var _this1 = quake_Cmd.functions;
	if(__map_reserved[name] != null) tmp1 = _this1.existsReserved(name); else tmp1 = _this1.h.hasOwnProperty(name);
	if(tmp1) quake_Console.Print("Cmd.AddCommand: " + name + " already defined\n"); else {
		var tmp2;
		var _this2 = quake_Cmd.functions;
		if(__map_reserved[name] != null) _this2.setReserved(name,command); else _this2.h[name] = command;
		tmp2 = command;
		tmp2;
	}
};
quake_Cmd.CompleteCommand = function(partial) {
	if(partial.length == 0) return null;
	var $it0 = quake_Cmd.functions.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		if(name.substring(0,partial.length) == partial) return name;
	}
	return null;
};
quake_Cmd.Execute = function() {
	var line = "";
	var quotes = false;
	while(quake_Cmd.text.length != 0) {
		var c = HxOverrides.cca(quake_Cmd.text,0);
		quake_Cmd.text = quake_Cmd.text.substring(1);
		if(c == 34) {
			quotes = !quotes;
			line += "\"";
			continue;
		}
		if(!quotes && c == 59 || c == 10) {
			if(line.length == 0) continue;
			quake_Cmd.ExecuteString(line);
			if(quake_Cmd.wait) {
				quake_Cmd.wait = false;
				return;
			}
			line = "";
			continue;
		}
		line += String.fromCharCode(c);
	}
	quake_Cmd.text = "";
};
quake_Cmd.ExecuteString = function(text,client) {
	if(client == null) client = false;
	quake_Cmd.client = client;
	quake_Cmd.TokenizeString(text);
	if(quake_Cmd.argv.length == 0) return;
	var name = quake_Cmd.argv[0].toLowerCase();
	var tmp;
	var _this = quake_Cmd.functions;
	if(__map_reserved[name] != null) tmp = _this.getReserved(name); else tmp = _this.h[name];
	var f = tmp;
	if(f != null) {
		f();
		return;
	}
	var tmp1;
	var _this1 = quake_Cmd.alias;
	if(__map_reserved[name] != null) tmp1 = _this1.getReserved(name); else tmp1 = _this1.h[name];
	var a = tmp1;
	if(a != null) {
		quake_Cmd.text = a + quake_Cmd.text;
		return;
	}
	if(!quake_Cvar.Command()) quake_Console.Print("Unknown command \"" + name + "\"\n");
};
quake_Cmd.ForwardToServer = function() {
	if(quake_CL.cls.state != 2) {
		quake_Console.Print("Can't \"" + quake_Cmd.argv[0] + "\", not connected\n");
		return;
	}
	if(quake_CL.cls.demoplayback == true) return;
	var args = String.fromCharCode(4);
	if(quake_Cmd.argv[0].toLowerCase() != "cmd") args += quake_Cmd.argv[0] + " ";
	if(quake_Cmd.argv.length >= 2) args += quake_Cmd.args; else args += "\n";
	quake_CL.cls.message.WriteString(args);
};
quake_Cmd.StuffCmds_f = function() {
	var s = false;
	var build = "";
	var _g = 0;
	var _g1 = quake_COM.argv;
	while(_g < _g1.length) {
		var arg = _g1[_g];
		++_g;
		var c = HxOverrides.cca(arg,0);
		if(s == true) {
			if(c == 43) {
				build += "\n" + arg.substring(1) + " ";
				continue;
			}
			if(c == 45) {
				s = false;
				build += "\n";
				continue;
			}
			build += arg + " ";
			continue;
		}
		if(c == 43) {
			s = true;
			build += arg.substring(1) + " ";
		}
	}
	if(build.length != 0) quake_Cmd.text = build + "\n" + quake_Cmd.text;
};
quake_Cmd.Exec_f = function() {
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("exec <filename> : execute a script file\n");
		return;
	}
	var filename = quake_Cmd.argv[1];
	var f = quake_COM.LoadTextFile(filename);
	if(f == null) {
		quake_Console.Print("couldn't exec " + filename + "\n");
		return;
	}
	quake_Console.Print("execing " + filename + "\n");
	quake_Cmd.text = f + quake_Cmd.text;
};
quake_Cmd.Echo_f = function() {
	var _g1 = 1;
	var _g = quake_Cmd.argv.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Console.Print(quake_Cmd.argv[i] + " ");
	}
	quake_Console.Print("\n");
};
quake_Cmd.Alias_f = function() {
	if(quake_Cmd.argv.length <= 1) {
		quake_Console.Print("Current alias commands:\n");
		var $it0 = quake_Cmd.alias.keys();
		while( $it0.hasNext() ) {
			var name1 = $it0.next();
			var tmp;
			var _this = quake_Cmd.alias;
			if(__map_reserved[name1] != null) tmp = _this.getReserved(name1); else tmp = _this.h[name1];
			quake_Console.Print(name1 + " : " + tmp + "\n");
		}
	}
	var name = quake_Cmd.argv[1];
	var value = "";
	var _g1 = 2;
	var _g = quake_Cmd.argv.length;
	while(_g1 < _g) {
		var j = _g1++;
		value += quake_Cmd.argv[j];
		if(j != quake_Cmd.argv.length - 1) value += " ";
	}
	var v = value + "\n";
	var _this1 = quake_Cmd.alias;
	if(__map_reserved[name] != null) _this1.setReserved(name,v); else _this1.h[name] = v;
	v;
};
quake_Cmd.Wait_f = function() {
	quake_Cmd.wait = true;
};
quake_Cmd.TokenizeString = function(text) {
	quake_Cmd.argv = [];
	while(true) {
		var i = 0;
		while(i < text.length) {
			var c = HxOverrides.cca(text,i);
			if(c > 32 || c == 10) break;
			i++;
		}
		if(quake_Cmd.argv.length == 1) quake_Cmd.args = text.substring(i);
		if(HxOverrides.cca(text,i) == 10 || i >= text.length) return;
		text = quake_COM.Parse(text);
		if(text == null) return;
		quake_Cmd.argv.push(quake_COM.token);
	}
};
var quake__$Console_ConsoleEntry = function(s,t) {
	this.text = s;
	this.time = t;
};
quake__$Console_ConsoleEntry.__name__ = true;
var quake_Console = function() { };
quake_Console.__name__ = true;
quake_Console.Init = function() {
	quake_Console.debuglog = quake_COM.CheckParm("-condebug") != null;
	if(quake_Console.debuglog) quake_COM.WriteTextFile("qconsole.log","");
	quake_Console.Print("Console initialized.\n");
	quake_Console.notifytime = quake_Cvar.RegisterVariable("con_notifytime","3");
	quake_Cmd.AddCommand("toggleconsole",quake_Console.ToggleConsole_f);
	quake_Cmd.AddCommand("messagemode",quake_Console.MessageMode_f);
	quake_Cmd.AddCommand("messagemode2",quake_Console.MessageMode2_f);
	quake_Cmd.AddCommand("clear",quake_Console.Clear_f);
};
quake_Console.ToggleConsole_f = function() {
	quake_SCR.EndLoadingPlaque();
	if(quake_Key.dest == 1) {
		if(quake_CL.cls.state != 2) {
			quake_Menu.Menu_Main_f();
			return;
		}
		quake_Key.dest = 0;
		quake_Key.edit_line = "";
		quake_Key.history_line = quake_Key.lines.length;
		return;
	}
	quake_Key.dest = 1;
};
quake_Console.MessageMode_f = function() {
	quake_Key.dest = 2;
	quake_Key.team_message = false;
};
quake_Console.MessageMode2_f = function() {
	quake_Key.dest = 2;
	quake_Key.team_message = true;
};
quake_Console.Clear_f = function() {
	quake_Console.backscroll = 0;
	quake_Console.current = 0;
	quake_Console.text = [];
};
quake_Console.Print = function(msg) {
	if(quake_Console.debuglog) {
		var data = quake_COM.LoadTextFile("qconsole.log");
		if(data != null) {
			data += msg;
			if(data.length >= 32768) data = data.substring(data.length - 16384);
			quake_COM.WriteTextFile("qconsole.log",data);
		}
	}
	quake_Console.backscroll = 0;
	var mask = 0;
	if(HxOverrides.cca(msg,0) <= 2) {
		mask = 128;
		if(HxOverrides.cca(msg,0) == 1) quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Console.sfx_talk,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		msg = msg.substring(1);
	}
	var _g1 = 0;
	var _g = msg.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_Console.text[quake_Console.current] == null) quake_Console.text[quake_Console.current] = new quake__$Console_ConsoleEntry("",quake_Host.realtime);
		if(HxOverrides.cca(msg,i) == 10) {
			if(quake_Console.text.length >= 1024) {
				quake_Console.text = quake_Console.text.slice(-512);
				quake_Console.current = quake_Console.text.length;
			} else quake_Console.current++;
			continue;
		}
		quake_Console.text[quake_Console.current].text += String.fromCharCode(HxOverrides.cca(msg,i) + mask);
	}
};
quake_Console.DPrint = function(msg) {
	if(quake_Host.developer.value != 0) quake_Console.Print(msg);
};
quake_Console.DrawNotify = function() {
	var width = (quake_VID.width >> 3) - 2;
	var i = quake_Console.text.length - 4;
	var v = 0;
	var _g1 = i < 0?0:i;
	var _g = quake_Console.text.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(quake_Host.realtime - quake_Console.text[i1].time > quake_Console.notifytime.value) continue;
		quake_Draw.String(8,v,quake_Console.text[i1].text.substring(0,width));
		v += 8;
	}
	if(quake_Key.dest == 2) quake_Draw.String(8,v,"say: " + quake_Key.chat_buffer + String.fromCharCode(10 + ((quake_Host.realtime * 4.0 | 0) & 1)));
};
quake_Console.ClearNotify = function() {
	var i = quake_Console.text.length - 4;
	var _g1 = i < 0?0:i;
	var _g = quake_Console.text.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		quake_Console.text[i1].time = 0.0;
	}
};
quake_Console.DrawConsole = function(lines) {
	if(lines <= 0) return;
	lines = Math.floor(lines * quake_VID.height * 0.005);
	quake_Draw.ConsoleBackground(lines);
	var width = (quake_VID.width >> 3) - 2;
	var y = lines - 16;
	var i = quake_Console.text.length - 1 - quake_Console.backscroll;
	while(i >= 0) {
		if(quake_Console.text[i].text.length == 0) y -= 8; else y -= Math.ceil(quake_Console.text[i].text.length / width) << 3;
		--i;
		if(y <= 0) break;
	}
	var _g1 = i + 1;
	var _g = quake_Console.text.length - quake_Console.backscroll;
	while(_g1 < _g) {
		var i1 = _g1++;
		var txt = quake_Console.text[i1].text;
		var rows = Math.ceil(txt.length / width);
		if(rows == 0) {
			y += 8;
			continue;
		}
		var _g2 = 0;
		while(_g2 < rows) {
			var j = _g2++;
			quake_Draw.String(8,y,HxOverrides.substr(txt,j * width,width));
			y += 8;
		}
	}
	quake_Console.DrawInput(lines);
};
quake_Console.DrawInput = function(vislines) {
	if(quake_Key.dest != 1 && !quake_Console.forcedup) return;
	var text = "]" + quake_Key.edit_line + String.fromCharCode(10 + ((quake_Host.realtime * 4.0 | 0) & 1));
	var width = (quake_VID.width >> 3) - 2;
	if(text.length >= width) text = text.substring(1 + text.length - width);
	quake_Draw.String(8,vislines - 16,text);
};
var quake_Cvar = function(name,value,archive,server) {
	this.name = name;
	this.string = value;
	this.archive = archive;
	this.server = server;
	this.value = quake_Q.atof(value);
};
quake_Cvar.__name__ = true;
quake_Cvar.CompleteVariable = function(partial) {
	if(partial.length == 0) return null;
	var $it0 = quake_Cvar.vars.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		if(name.substring(0,partial.length) == partial) return name;
	}
	return null;
};
quake_Cvar.Set = function(name,value) {
	var tmp;
	var _this = quake_Cvar.vars;
	if(__map_reserved[name] != null) tmp = _this.getReserved(name); else tmp = _this.h[name];
	var v = tmp;
	if(v == null) quake_Console.Print("Cvar.Set: variable " + name + " not found\n"); else v.set(value);
};
quake_Cvar.RegisterVariable = function(name,value,archive,server) {
	if(server == null) server = false;
	if(archive == null) archive = false;
	var tmp;
	var _this = quake_Cvar.vars;
	if(__map_reserved[name] != null) tmp = _this.existsReserved(name); else tmp = _this.h.hasOwnProperty(name);
	if(tmp) {
		quake_Console.Print("Can't register variable " + name + ", already defined\n");
		return null;
	}
	var tmp1;
	var v = new quake_Cvar(name,value,archive,server);
	var _this1 = quake_Cvar.vars;
	if(__map_reserved[name] != null) _this1.setReserved(name,v); else _this1.h[name] = v;
	tmp1 = v;
	return tmp1;
};
quake_Cvar.Command = function() {
	var tmp;
	var _this = quake_Cvar.vars;
	var key = quake_Cmd.argv[0];
	if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
	var v = tmp;
	if(v == null) return false;
	if(quake_Cmd.argv.length <= 1) {
		quake_Console.Print("\"" + v.name + "\" is \"" + v.string + "\"\n");
		return true;
	}
	quake_Cvar.Set(v.name,quake_Cmd.argv[1]);
	return true;
};
quake_Cvar.WriteVariables = function() {
	var f = [];
	var tmp;
	var _this = quake_Cvar.vars;
	tmp = new haxe_ds__$StringMap_StringMapIterator(_this,_this.arrayKeys());
	while( tmp.hasNext() ) {
		var v = tmp.next();
		if(v.archive) f.push(v.name + " \"" + v.string + "\"\n");
	}
	return f.join("");
};
quake_Cvar.prototype = {
	set: function(s) {
		var changed = this.string != s;
		this.string = s;
		this.value = quake_Q.atof(s);
		if(this.server && changed && quake_SV.server.active) quake_Host.BroadcastPrint("\"" + this.name + "\" changed to \"" + this.string + "\"\n");
	}
	,setValue: function(value) {
		this.set(value.toFixed(6));
	}
};
var quake_DLight = function() {
	this.key = 0;
	this.origin = new Float32Array(3);
	this.radius = 0;
	this.minlight = 0;
	this.decay = 0;
	this.die = 0;
};
quake_DLight.__name__ = true;
var quake_Def = function() { };
quake_Def.__name__ = true;
var quake_DrawPic = function(buf) {
	if(buf != null) {
		var view = new DataView(buf,0,8);
		this.width = view.getUint32(0,true);
		this.height = view.getUint32(4,true);
		this.data = new Uint8Array(buf,8,this.width * this.height);
		this.texnum = quake_GL.LoadPicTexture(this);
	}
};
quake_DrawPic.__name__ = true;
var quake_Draw = function() { };
quake_Draw.__name__ = true;
quake_Draw.CharToConback = function(num,dest) {
	var source = (num >> 4 << 10) + ((num & 15) << 3);
	var _g = 0;
	while(_g < 8) {
		_g++;
		var _g1 = 0;
		while(_g1 < 8) {
			var x = _g1++;
			if(quake_Draw.chars[source + x] != 0) quake_Draw.conback.data[dest + x] = 96 + quake_Draw.chars[source + x];
		}
		source += 128;
		dest += 320;
	}
};
quake_Draw.Init = function() {
	quake_Draw.chars = new Uint8Array(quake_W.GetLumpName("CONCHARS"));
	var trans = new ArrayBuffer(65536);
	var trans32 = new Uint32Array(trans);
	var _g = 0;
	while(_g < 16384) {
		var i = _g++;
		if(quake_Draw.chars[i] != 0) trans32[i] = quake_COM.LittleLong(quake_VID.d_8to24table[quake_Draw.chars[i]] + -16777216);
	}
	quake_Draw.char_texture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Draw.char_texture);
	quake_GL.gl.texImage2D(3553,0,6408,128,128,0,6408,5121,new Uint8Array(trans));
	quake_GL.gl.texParameterf(3553,10241,9729);
	quake_GL.gl.texParameterf(3553,10240,9729);
	quake_Draw.conback = new quake_DrawPic(null);
	var cb = quake_COM.LoadFile("gfx/conback.lmp");
	if(cb == null) quake_Sys.Error("Couldn't load gfx/conback.lmp");
	quake_Draw.conback.width = 320;
	quake_Draw.conback.height = 200;
	quake_Draw.conback.data = new Uint8Array(cb,8,64000);
	var ver = "(HaxeQuake " + "0.0.1" + ") 1.09";
	var _g1 = 0;
	var _g2 = ver.length;
	while(_g1 < _g2) {
		var i1 = _g1++;
		quake_Draw.CharToConback(HxOverrides.cca(ver,i1),59829 - (ver.length - i1 << 3));
	}
	quake_Draw.conback.texnum = quake_GL.LoadPicTexture(quake_Draw.conback);
	quake_Draw.loading = quake_Draw.CachePic("loading");
	quake_Draw.loadingElem = window.document.getElementById("loading");
	quake_Draw.loadingElem.src = quake_Draw.PicToDataURL(quake_Draw.loading);
	window.document.body.style.backgroundImage = "url(\"" + quake_Draw.PicToDataURL(new quake_DrawPic(quake_W.GetLumpName("BACKTILE"))) + "\")";
	quake_GL.CreateProgram("character",["uCharacter","uDest","uOrtho"],["aPoint"],["tTexture"]);
	quake_GL.CreateProgram("fill",["uRect","uOrtho","uColor"],["aPoint"],[]);
	quake_GL.CreateProgram("pic",["uRect","uOrtho"],["aPoint"],["tTexture"]);
	quake_GL.CreateProgram("picTranslate",["uRect","uOrtho","uTop","uBottom"],["aPoint"],["tTexture","tTrans"]);
};
quake_Draw.Character = function(x,y,num) {
	var program = quake_GL.UseProgram("character");
	quake_GL.Bind(program.tTexture,quake_Draw.char_texture);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.uniform2f(program.uCharacter,num & 15,num >> 4);
	quake_GL.gl.uniform2f(program.uDest,x,y);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Draw.String = function(x,y,str) {
	var program = quake_GL.UseProgram("character");
	quake_GL.Bind(program.tTexture,quake_Draw.char_texture);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var num = HxOverrides.cca(str,i);
		quake_GL.gl.uniform2f(program.uCharacter,num & 15,num >> 4);
		quake_GL.gl.uniform2f(program.uDest,x,y);
		quake_GL.gl.drawArrays(5,0,4);
		x += 8;
	}
};
quake_Draw.StringWhite = function(x,y,str) {
	var program = quake_GL.UseProgram("character");
	quake_GL.Bind(program.tTexture,quake_Draw.char_texture);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var num = HxOverrides.cca(str,i) + 128;
		quake_GL.gl.uniform2f(program.uCharacter,num & 15,num >> 4);
		quake_GL.gl.uniform2f(program.uDest,x,y);
		quake_GL.gl.drawArrays(5,0,4);
		x += 8;
	}
};
quake_Draw.CachePic = function(path) {
	path = "gfx/" + path + ".lmp";
	var buf = quake_COM.LoadFile(path);
	if(buf == null) quake_Sys.Error("CachePic: failed to load " + path);
	return new quake_DrawPic(buf);
};
quake_Draw.Pic = function(x,y,pic) {
	var program = quake_GL.UseProgram("pic");
	quake_GL.Bind(program.tTexture,pic.texnum);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.uniform4f(program.uRect,x,y,pic.width,pic.height);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Draw.PicTranslate = function(x,y,pic,top,bottom) {
	var program = quake_GL.UseProgram("picTranslate");
	quake_GL.Bind(program.tTexture,pic.texnum);
	quake_GL.Bind(program.tTrans,pic.translate);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.uniform4f(program.uRect,x,y,pic.width,pic.height);
	var p = quake_VID.d_8to24table[top];
	quake_GL.gl.uniform3f(program.uTop,p & 255,p >> 8 & 255,p >> 16);
	p = quake_VID.d_8to24table[bottom];
	quake_GL.gl.uniform3f(program.uBottom,p & 255,p >> 8 & 255,p >> 16);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Draw.ConsoleBackground = function(lines) {
	var program = quake_GL.UseProgram("pic");
	quake_GL.Bind(program.tTexture,quake_Draw.conback.texnum);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.uniform4f(program.uRect,0,lines - quake_VID.height,quake_VID.width,quake_VID.height);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Draw.Fill = function(x,y,w,h,c) {
	var program = quake_GL.UseProgram("fill");
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.uniform4f(program.uRect,x,y,w,h);
	var color = quake_VID.d_8to24table[c];
	quake_GL.gl.uniform4f(program.uColor,color & 255,color >> 8 & 255,color >> 16,1.0);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Draw.FadeScreen = function() {
	var program = quake_GL.UseProgram("fill");
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.uniform4f(program.uRect,0,0,quake_VID.width,quake_VID.height);
	quake_GL.gl.uniform4f(program.uColor,0.0,0.0,0.0,0.8);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Draw.BeginDisc = function() {
	if(quake_Draw.loadingElem == null) return;
	quake_Draw.loadingElem.style.left = (quake_VID.width - quake_Draw.loading.width >> 1) + "px";
	quake_Draw.loadingElem.style.top = (quake_VID.height - quake_Draw.loading.height >> 1) + "px";
	quake_Draw.loadingElem.style.display = "inline-block";
};
quake_Draw.EndDisc = function() {
	if(quake_Draw.loadingElem != null) quake_Draw.loadingElem.style.display = "none";
};
quake_Draw.PicToDataURL = function(pic) {
	var canvas = window.document.createElement("canvas");
	canvas.width = pic.width;
	canvas.height = pic.height;
	var ctx = canvas.getContext("2d");
	var data = ctx.createImageData(pic.width,pic.height);
	var trans = new ArrayBuffer(data.data.length);
	var trans32 = new Uint32Array(trans);
	var _g1 = 0;
	var _g = pic.data.length;
	while(_g1 < _g) {
		var i = _g1++;
		trans32[i] = quake_COM.LittleLong(quake_VID.d_8to24table[pic.data[i]] + -16777216);
	}
	data.data.set(new Uint8Array(trans));
	ctx.putImageData(data,0,0);
	return canvas.toDataURL();
};
var quake_ED = function() { };
quake_ED.__name__ = true;
quake_ED.Alloc = function() {
	var i = quake_SV.svs.maxclients + 1;
	while(i < quake_SV.server.num_edicts) {
		var e1 = quake_SV.server.edicts[i++];
		if(e1.free && (e1.freetime < 2.0 || quake_SV.server.time - e1.freetime > 0.5)) {
			e1.Clear();
			return e1;
		}
	}
	if(i == 2048) quake_Sys.Error("ED.Alloc: no free edicts (max_edicts is " + 2048 + ")");
	var e = quake_SV.server.edicts[quake_SV.server.num_edicts++];
	e.Clear();
	return e;
};
quake_ED.Free = function(ed) {
	quake_SV.UnlinkEdict(ed);
	ed.free = true;
	ed._v_int[29] = 0;
	ed._v_float[59] = 0.0;
	ed._v_float[0] = 0.0;
	ed._v_float[77] = 0.0;
	ed._v_float[31] = 0.0;
	ed._v_float[30] = 0.0;
	ed._v_float.set(quake__$Vec_Vec_$Impl_$.origin,10);
	ed._v_float.set(quake__$Vec_Vec_$Impl_$.origin,19);
	ed._v_float[46] = -1.0;
	ed._v_float[9] = 0.0;
	ed.freetime = quake_SV.server.time;
};
quake_ED.GlobalAtOfs = function(ofs) {
	var _g = 0;
	var _g1 = quake_PR.globaldefs;
	while(_g < _g1.length) {
		var def = _g1[_g];
		++_g;
		if(def.ofs == ofs) return def;
	}
	return null;
};
quake_ED.FieldAtOfs = function(ofs) {
	var _g = 0;
	var _g1 = quake_PR.fielddefs;
	while(_g < _g1.length) {
		var def = _g1[_g];
		++_g;
		if(def.ofs == ofs) return def;
	}
	return null;
};
quake_ED.FindField = function(name) {
	var _g = 0;
	var _g1 = quake_PR.fielddefs;
	while(_g < _g1.length) {
		var def = _g1[_g];
		++_g;
		if(quake_PR.GetString(def.name) == name) return def;
	}
	return null;
};
quake_ED.FindGlobal = function(name) {
	var _g = 0;
	var _g1 = quake_PR.globaldefs;
	while(_g < _g1.length) {
		var def = _g1[_g];
		++_g;
		if(quake_PR.GetString(def.name) == name) return def;
	}
	return null;
};
quake_ED.FindFunction = function(name) {
	var _g1 = 0;
	var _g = quake_PR.functions.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_PR.GetString(quake_PR.functions[i].name) == name) return i;
	}
	return null;
};
quake_ED.Print = function(ed) {
	if(ed.free) {
		quake_Console.Print("FREE\n");
		return;
	}
	quake_Console.Print("\nEDICT " + ed.num + ":\n");
	var _g1 = 1;
	var _g = quake_PR.fielddefs.length;
	while(_g1 < _g) {
		var i = _g1++;
		var d = quake_PR.fielddefs[i];
		var name = quake_PR.GetString(d.name);
		if(HxOverrides.cca(name,name.length - 2) == 95) continue;
		var v = d.ofs;
		if(ed._v_int[v] == 0) {
			if((d.type & 32767) == 3) {
				if(ed._v_int[v + 1] == 0 && ed._v_int[v + 2] == 0) continue;
			} else continue;
		}
		while(name.length <= 14) name += " ";
		quake_Console.Print(name + quake_PR.ValueString(d.type,ed._v,v) + "\n");
	}
};
quake_ED.PrintEdicts = function() {
	if(!quake_SV.server.active) return;
	quake_Console.Print(quake_SV.server.num_edicts + " entities\n");
	var _g1 = 0;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		quake_ED.Print(quake_SV.server.edicts[i]);
	}
};
quake_ED.PrintEdict_f = function() {
	if(!quake_SV.server.active) return;
	var i = quake_Q.atoi(quake_Cmd.argv[1]);
	if(i >= 0 && i < quake_SV.server.num_edicts) quake_ED.Print(quake_SV.server.edicts[i]);
};
quake_ED.Count = function() {
	if(!quake_SV.server.active) return;
	var active = 0;
	var models = 0;
	var solid = 0;
	var step = 0;
	var _g1 = 0;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		var ent = quake_SV.server.edicts[i];
		if(ent.free) continue;
		++active;
		if(ent._v_float[9] != 0.0) ++solid;
		if(ent._v_int[29] != 0) ++models;
		if(ent._v_float[8] == 4) ++step;
	}
	var num_edicts = quake_SV.server.num_edicts;
	quake_Console.Print("num_edicts:" + (num_edicts <= 9?"  ":num_edicts <= 99?" ":"") + num_edicts + "\n");
	quake_Console.Print("active    :" + (active <= 9?"  ":active <= 99?" ":"") + active + "\n");
	quake_Console.Print("view      :" + (models <= 9?"  ":models <= 99?" ":"") + models + "\n");
	quake_Console.Print("touch     :" + (solid <= 9?"  ":solid <= 99?" ":"") + solid + "\n");
	quake_Console.Print("step      :" + (step <= 9?"  ":step <= 99?" ":"") + step + "\n");
};
quake_ED.NewString = function(string) {
	var newstring_b = "";
	var i = 0;
	while(i < string.length) {
		var c = HxOverrides.cca(string,i);
		if(c == 92 && i < string.length - 1) {
			++i;
			var c1 = HxOverrides.cca(string,i) == 110?10:92;
			newstring_b += String.fromCharCode(c1);
		} else newstring_b += String.fromCharCode(c);
		i++;
	}
	return quake_PR.NewString(newstring_b,string.length + 1);
};
quake_ED.ParseEpair = function(base,key,s) {
	var d_float = new Float32Array(base);
	var d_int = new Int32Array(base);
	var _g = key.type & 32767;
	switch(_g) {
	case 1:
		d_int[key.ofs] = quake_ED.NewString(s);
		return true;
	case 2:
		d_float[key.ofs] = quake_Q.atof(s);
		return true;
	case 3:
		var v = s.split(" ");
		d_float[key.ofs] = quake_Q.atof(v[0]);
		d_float[key.ofs + 1] = quake_Q.atof(v[1]);
		d_float[key.ofs + 2] = quake_Q.atof(v[2]);
		return true;
	case 4:
		d_int[key.ofs] = quake_Q.atoi(s);
		return true;
	case 5:
		var d = quake_ED.FindField(s);
		if(d == null) {
			quake_Console.Print("Can't find field " + s + "\n");
			return false;
		}
		d_int[key.ofs] = d.ofs;
		return true;
	case 6:
		var d1 = quake_ED.FindFunction(s);
		if(d1 == null) {
			quake_Console.Print("Can't find function " + s + "\n");
			return false;
		}
		d_int[key.ofs] = d1;
		break;
	default:
	}
	return true;
};
quake_ED.ParseEdict = function(data,ent) {
	if(ent != quake_SV.server.edicts[0]) {
		var _g1 = 0;
		var _g = quake_PR.entityfields;
		while(_g1 < _g) {
			var i = _g1++;
			ent._v_int[i] = 0;
		}
	}
	var init = false;
	while(true) {
		data = quake_COM.Parse(data);
		if(HxOverrides.cca(quake_COM.token,0) == 125) break;
		if(data == null) quake_Sys.Error("ED.ParseEdict: EOF without closing brace");
		var anglehack;
		if(quake_COM.token == "angle") {
			quake_COM.token = "angles";
			anglehack = true;
		} else {
			anglehack = false;
			if(quake_COM.token == "light") quake_COM.token = "light_lev";
		}
		var n = quake_COM.token.length;
		while(n > 0) {
			if(HxOverrides.cca(quake_COM.token,n - 1) != 32) break;
			n--;
		}
		var keyname = quake_COM.token.substring(0,n);
		data = quake_COM.Parse(data);
		if(data == null) quake_Sys.Error("ED.ParseEdict: EOF without closing brace");
		if(HxOverrides.cca(quake_COM.token,0) == 125) quake_Sys.Error("ED.ParseEdict: closing brace without data");
		init = true;
		if(HxOverrides.cca(keyname,0) == 95) continue;
		var key = quake_ED.FindField(keyname);
		if(key == null) {
			quake_Console.Print("'" + keyname + "' is not a field\n");
			continue;
		}
		if(anglehack) quake_COM.token = "0 " + quake_COM.token + " 0";
		if(!quake_ED.ParseEpair(ent._v,key,quake_COM.token)) quake_Host.Error("ED.ParseEdict: parse error");
	}
	if(!init) ent.free = true;
	return data;
};
quake_ED.LoadFromFile = function(data) {
	var ent = null;
	var inhibit = 0;
	quake_PR._globals_float[31] = quake_SV.server.time;
	while(true) {
		data = quake_COM.Parse(data);
		if(data == null) break;
		if(HxOverrides.cca(quake_COM.token,0) != 123) quake_Sys.Error("ED.LoadFromFile: found " + quake_COM.token + " when expecting {");
		if(ent == null) ent = quake_SV.server.edicts[0]; else ent = quake_ED.Alloc();
		data = quake_ED.ParseEdict(data,ent);
		var spawnflags = ent._v_float[89] | 0;
		if(quake_Host.deathmatch.value != 0) {
			if((spawnflags & 2048) != 0) {
				quake_ED.Free(ent);
				++inhibit;
				continue;
			}
		} else if(quake_Host.current_skill == 0 && (spawnflags & 256) != 0 || quake_Host.current_skill == 1 && (spawnflags & 512) != 0 || quake_Host.current_skill >= 2 && (spawnflags & 1024) != 0) {
			quake_ED.Free(ent);
			++inhibit;
			continue;
		}
		if(ent._v_int[28] == 0) {
			quake_Console.Print("No classname for:\n");
			quake_ED.Print(ent);
			quake_ED.Free(ent);
			continue;
		}
		var func = quake_ED.FindFunction(quake_PR.GetString(ent._v_int[28]));
		if(func == null) {
			quake_Console.Print("No spawn function for:\n");
			quake_ED.Print(ent);
			quake_ED.Free(ent);
			continue;
		}
		quake_PR._globals_int[28] = ent.num;
		quake_PR.ExecuteProgram(func);
	}
	quake_Console.DPrint(inhibit + " entities inhibited\n");
};
var quake_Edict = function(num) {
	this.num = num;
	this.free = false;
	this.area = new quake_EdictLink();
	this.area.ent = this;
	this.leafnums = [];
	this.baseline = new quake_EntityState();
	this.freetime = 0.0;
	this._v = new ArrayBuffer(quake_PR.entityfields << 2);
	this._v_float = new Float32Array(this._v);
	this._v_int = new Int32Array(this._v);
};
quake_Edict.__name__ = true;
quake_Edict.prototype = {
	Clear: function() {
		var _g1 = 0;
		var _g = quake_PR.entityfields;
		while(_g1 < _g) {
			var i = _g1++;
			this._v_int[i] = 0;
		}
		this.free = false;
	}
};
var quake_EdictLink = function() {
};
quake_EdictLink.__name__ = true;
var quake_EdictVarOfs = function() { };
quake_EdictVarOfs.__name__ = true;
var quake_Entity = function(n) {
	if(n == null) n = -1;
	this.baseline = new quake_EntityState();
	this.effects = 0;
	this.msgtime = 0.0;
	this.skinnum = 0;
	this.syncbase = 0.0;
	this.frame = 0;
	this.msg_origins1 = new Float32Array(3);
	this.msg_origins0 = new Float32Array(3);
	this.origin = new Float32Array(3);
	this.msg_angles1 = new Float32Array(3);
	this.msg_angles0 = new Float32Array(3);
	this.angles = new Float32Array(3);
	this.leafs = [];
	this.num = n;
};
quake_Entity.__name__ = true;
var quake_EntityState = function() {
	this.effects = 0;
	this.skin = 0;
	this.colormap = 0;
	this.frame = 0;
	this.modelindex = 0;
	this.angles = new Float32Array(3);
	this.origin = new Float32Array(3);
};
quake_EntityState.__name__ = true;
var quake__$GL_GLModeSetting = function(min,max) {
	this.min = min;
	this.max = max;
};
quake__$GL_GLModeSetting.__name__ = true;
var quake_GLTexture = function(id,w,h) {
	this.texnum = quake_GL.gl.createTexture();
	this.identifier = id;
	this.width = w;
	this.height = h;
};
quake_GLTexture.__name__ = true;
var quake__$GL_GLProgram = function(identifier,uniforms,attribs,textures) {
	var tmp;
	var _this = quake_Shaders.shaders;
	if(__map_reserved[identifier] != null) tmp = _this.getReserved(identifier); else tmp = _this.h[identifier];
	var shaderSrc = tmp;
	if(shaderSrc == null) quake_Sys.Error("Shader not found: " + identifier);
	this.identifier = identifier;
	this.attribs = [];
	this.program = quake_GL.gl.createProgram();
	var vsh = quake_GL.gl.createShader(35633);
	quake_GL.gl.shaderSource(vsh,shaderSrc.vert);
	quake_GL.gl.compileShader(vsh);
	if(!quake_GL.gl.getShaderParameter(vsh,35713)) quake_Sys.Error("Error compiling shader: " + quake_GL.gl.getShaderInfoLog(vsh));
	var fsh = quake_GL.gl.createShader(35632);
	quake_GL.gl.shaderSource(fsh,shaderSrc.frag);
	quake_GL.gl.compileShader(fsh);
	if(!quake_GL.gl.getShaderParameter(fsh,35713)) quake_Sys.Error("Error compiling shader: " + quake_GL.gl.getShaderInfoLog(fsh));
	quake_GL.gl.attachShader(this.program,vsh);
	quake_GL.gl.attachShader(this.program,fsh);
	quake_GL.gl.linkProgram(this.program);
	if(!quake_GL.gl.getProgramParameter(this.program,35714)) quake_Sys.Error("Error linking program: " + quake_GL.gl.getProgramInfoLog(this.program));
	quake_GL.gl.useProgram(this.program);
	var _g = 0;
	while(_g < uniforms.length) {
		var name = uniforms[_g];
		++_g;
		var value = quake_GL.gl.getUniformLocation(this.program,name);
		this[name] = value;
	}
	var _g1 = 0;
	while(_g1 < attribs.length) {
		var name1 = attribs[_g1];
		++_g1;
		this.attribs.push(name1);
		var value1 = quake_GL.gl.getAttribLocation(this.program,name1);
		this[name1] = value1;
	}
	var _g11 = 0;
	var _g2 = textures.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var name2 = textures[i];
		this[name2] = i;
		quake_GL.gl.uniform1i(quake_GL.gl.getUniformLocation(this.program,name2),i);
	}
};
quake__$GL_GLProgram.__name__ = true;
quake__$GL_GLProgram.prototype = {
	'use': function() {
		quake_GL.gl.useProgram(this.program);
		var _g = 0;
		var _g1 = this.attribs;
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			quake_GL.gl.enableVertexAttribArray(Reflect.field(this,name));
		}
	}
	,unbind: function() {
		var _g = 0;
		var _g1 = this.attribs;
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			quake_GL.gl.disableVertexAttribArray(Reflect.field(this,name));
		}
	}
};
var quake_GL = function() { };
quake_GL.__name__ = true;
quake_GL.Bind = function(target,texnum) {
	if(quake_GL.currenttextures.h[target] != texnum) {
		if(quake_GL.activetexture != target) {
			quake_GL.activetexture = target;
			quake_GL.gl.activeTexture(33984 + target);
		}
		quake_GL.currenttextures.h[target] = texnum;
		texnum;
		quake_GL.gl.bindTexture(3553,texnum);
	}
};
quake_GL.TextureMode_f = function() {
	if(quake_Cmd.argv.length <= 1) {
		var $it0 = quake_GL.modes.keys();
		while( $it0.hasNext() ) {
			var name1 = $it0.next();
			var tmp1;
			var _this = quake_GL.modes;
			if(__map_reserved[name1] != null) tmp1 = _this.getReserved(name1); else tmp1 = _this.h[name1];
			var mode1 = tmp1;
			if(quake_GL.filter_min == mode1.min) {
				quake_Console.Print(name1 + "\n");
				return;
			}
		}
		quake_Console.Print("current filter is unknown???\n");
		return;
	}
	var name = quake_Cmd.argv[1].toUpperCase();
	var tmp;
	var _this1 = quake_GL.modes;
	if(__map_reserved[name] != null) tmp = _this1.getReserved(name); else tmp = _this1.h[name];
	var mode = tmp;
	if(mode == null) {
		quake_Console.Print("bad filter name\n");
		return;
	}
	quake_GL.filter_min = mode.min;
	quake_GL.filter_max = mode.max;
	var _g = 0;
	var _g1 = quake_GL.textures;
	while(_g < _g1.length) {
		var tex = _g1[_g];
		++_g;
		quake_GL.Bind(0,tex.texnum);
		quake_GL.gl.texParameterf(3553,10241,quake_GL.filter_min);
		quake_GL.gl.texParameterf(3553,10240,quake_GL.filter_max);
	}
};
quake_GL.Set2D = function() {
	quake_GL.gl.viewport(0,0,quake_VID.width * quake_SCR.devicePixelRatio | 0,quake_VID.height * quake_SCR.devicePixelRatio | 0);
	quake_GL.UnbindProgram();
	var _g = 0;
	var _g1 = quake_GL.programs;
	while(_g < _g1.length) {
		var program = _g1[_g];
		++_g;
		if(program.uOrtho == null) continue;
		quake_GL.gl.useProgram(program.program);
		quake_GL.gl.uniformMatrix4fv(program.uOrtho,false,quake_GL.ortho);
	}
	quake_GL.gl.disable(2929);
	quake_GL.gl.enable(3042);
};
quake_GL.ResampleTexture = function(data,inwidth,inheight,outwidth,outheight) {
	var outdata = new ArrayBuffer(outwidth * outheight);
	var out = new Uint8Array(outdata);
	var xstep = inwidth / outwidth;
	var ystep = inheight / outheight;
	var src;
	var dest = 0;
	var _g = 0;
	while(_g < outheight) {
		var i = _g++;
		src = Math.floor(i * ystep) * inwidth;
		var _g1 = 0;
		while(_g1 < outwidth) {
			var j = _g1++;
			out[dest + j] = data[src + Math.floor(j * xstep)];
		}
		dest += outwidth;
	}
	return out;
};
quake_GL.Upload = function(data,width,height) {
	var scaled_width = width;
	var scaled_height = height;
	if((width & width - 1) != 0 || (height & height - 1) != 0) {
		--scaled_width;
		scaled_width |= scaled_width >> 1;
		scaled_width |= scaled_width >> 2;
		scaled_width |= scaled_width >> 4;
		scaled_width |= scaled_width >> 8;
		scaled_width |= scaled_width >> 16;
		++scaled_width;
		--scaled_height;
		scaled_height |= scaled_height >> 1;
		scaled_height |= scaled_height >> 2;
		scaled_height |= scaled_height >> 4;
		scaled_height |= scaled_height >> 8;
		scaled_height |= scaled_height >> 16;
		++scaled_height;
	}
	if(scaled_width > quake_GL.maxtexturesize) scaled_width = quake_GL.maxtexturesize;
	if(scaled_height > quake_GL.maxtexturesize) scaled_height = quake_GL.maxtexturesize;
	if(scaled_width != width || scaled_height != height) data = quake_GL.ResampleTexture(data,width,height,scaled_width,scaled_height);
	var trans = new ArrayBuffer(scaled_width * scaled_height << 2);
	var trans32 = new Uint32Array(trans);
	var i = scaled_width * scaled_height - 1;
	while(i >= 0) {
		trans32[i] = quake_COM.LittleLong(quake_VID.d_8to24table[data[i]] + -16777216);
		if(data[i] >= 224) trans32[i] &= 16777215;
		i--;
	}
	quake_GL.gl.texImage2D(3553,0,6408,scaled_width,scaled_height,0,6408,5121,new Uint8Array(trans));
	quake_GL.gl.generateMipmap(3553);
	quake_GL.gl.texParameterf(3553,10241,quake_GL.filter_min);
	quake_GL.gl.texParameterf(3553,10240,quake_GL.filter_max);
};
quake_GL.LoadTexture = function(identifier,width,height,data) {
	if(identifier.length != 0) {
		var _g = 0;
		var _g1 = quake_GL.textures;
		while(_g < _g1.length) {
			var glt1 = _g1[_g];
			++_g;
			if(glt1.identifier == identifier) {
				if(width != glt1.width || height != glt1.height) quake_Sys.Error("GL.LoadTexture: cache mismatch");
				return glt1;
			}
		}
	}
	var scaled_width = width;
	var scaled_height = height;
	if((width & width - 1) != 0 || (height & height - 1) != 0) {
		--scaled_width;
		scaled_width |= scaled_width >> 1;
		scaled_width |= scaled_width >> 2;
		scaled_width |= scaled_width >> 4;
		scaled_width |= scaled_width >> 8;
		scaled_width |= scaled_width >> 16;
		++scaled_width;
		--scaled_height;
		scaled_height |= scaled_height >> 1;
		scaled_height |= scaled_height >> 2;
		scaled_height |= scaled_height >> 4;
		scaled_height |= scaled_height >> 8;
		scaled_height |= scaled_height >> 16;
		++scaled_height;
	}
	if(scaled_width > quake_GL.maxtexturesize) scaled_width = quake_GL.maxtexturesize;
	if(scaled_height > quake_GL.maxtexturesize) scaled_height = quake_GL.maxtexturesize;
	scaled_width >>= quake_GL.picmip.value | 0;
	if(scaled_width == 0) scaled_width = 1;
	scaled_height >>= quake_GL.picmip.value | 0;
	if(scaled_height == 0) scaled_height = 1;
	if(scaled_width != width || scaled_height != height) data = quake_GL.ResampleTexture(data,width,height,scaled_width,scaled_height);
	var glt = new quake_GLTexture(identifier,width,height);
	quake_GL.Bind(0,glt.texnum);
	quake_GL.Upload(data,scaled_width,scaled_height);
	quake_GL.textures.push(glt);
	return glt;
};
quake_GL.LoadPicTexture = function(pic) {
	var data = pic.data;
	var scaled_width = pic.width;
	var scaled_height = pic.height;
	if((pic.width & pic.width - 1) != 0 || (pic.height & pic.height - 1) != 0) {
		--scaled_width;
		scaled_width |= scaled_width >> 1;
		scaled_width |= scaled_width >> 2;
		scaled_width |= scaled_width >> 4;
		scaled_width |= scaled_width >> 8;
		scaled_width |= scaled_width >> 16;
		++scaled_width;
		--scaled_height;
		scaled_height |= scaled_height >> 1;
		scaled_height |= scaled_height >> 2;
		scaled_height |= scaled_height >> 4;
		scaled_height |= scaled_height >> 8;
		scaled_height |= scaled_height >> 16;
		++scaled_height;
	}
	if(scaled_width > quake_GL.maxtexturesize) scaled_width = quake_GL.maxtexturesize;
	if(scaled_height > quake_GL.maxtexturesize) scaled_height = quake_GL.maxtexturesize;
	if(scaled_width != pic.width || scaled_height != pic.height) data = quake_GL.ResampleTexture(data,pic.width,pic.height,scaled_width,scaled_height);
	var texnum = quake_GL.gl.createTexture();
	quake_GL.Bind(0,texnum);
	var trans = new ArrayBuffer(scaled_width * scaled_height << 2);
	var trans32 = new Uint32Array(trans);
	var i = scaled_width * scaled_height - 1;
	while(i >= 0) {
		if(data[i] != 255) trans32[i] = quake_COM.LittleLong(quake_VID.d_8to24table[data[i]] + -16777216);
		i--;
	}
	quake_GL.gl.texImage2D(3553,0,6408,scaled_width,scaled_height,0,6408,5121,new Uint8Array(trans));
	quake_GL.gl.texParameterf(3553,10241,9729);
	quake_GL.gl.texParameterf(3553,10240,9729);
	return texnum;
};
quake_GL.CreateProgram = function(identifier,uniforms,attribs,textures) {
	var program = new quake__$GL_GLProgram(identifier,uniforms,attribs,textures);
	quake_GL.programs.push(program);
	return program;
};
quake_GL.UseProgram = function(identifier) {
	var program = quake_GL.currentprogram;
	if(program != null) {
		if(program.identifier == identifier) return program;
		program.unbind();
	}
	var _g = 0;
	var _g1 = quake_GL.programs;
	while(_g < _g1.length) {
		var program1 = _g1[_g];
		++_g;
		if(program1.identifier == identifier) {
			quake_GL.currentprogram = program1;
			quake_GL.currentprogram["use"]();
			return program1;
		}
	}
	return null;
};
quake_GL.UnbindProgram = function() {
	if(quake_GL.currentprogram == null) return;
	quake_GL.currentprogram.unbind();
	quake_GL.currentprogram = null;
};
quake_GL.RotationMatrix = function(pitch,yaw,roll) {
	pitch *= Math.PI / -180.0;
	yaw *= Math.PI / 180.0;
	roll *= Math.PI / 180.0;
	var sp = Math.sin(pitch);
	var cp = Math.cos(pitch);
	var sy = Math.sin(yaw);
	var cy = Math.cos(yaw);
	var sr = Math.sin(roll);
	var cr = Math.cos(roll);
	return [cy * cp,sy * cp,-sp,-sy * cr + cy * sp * sr,cy * cr + sy * sp * sr,cp * sr,-sy * -sr + cy * sp * cr,cy * -sr + sy * sp * cr,cp * cr];
};
quake_GL.Init = function() {
	quake_VID.mainwindow = window.document.getElementById("mainwindow");
	try {
		quake_GL.gl = quake_VID.mainwindow.getContext("webgl");
		if(quake_GL.gl == null) quake_VID.mainwindow.getContext("experimental-webgl");
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
	if(quake_GL.gl == null) quake_Sys.Error("Unable to initialize WebGL. Your browser may not support it.");
	quake_GL.maxtexturesize = quake_GL.gl.getParameter(3379);
	quake_GL.gl.clearColor(0.0,0.0,0.0,0.0);
	quake_GL.gl.cullFace(1028);
	quake_GL.gl.blendFuncSeparate(770,771,1,1);
	var tmp;
	var _g = new haxe_ds_StringMap();
	var value = new quake__$GL_GLModeSetting(9728,9728);
	if(__map_reserved.GL_NEAREST != null) _g.setReserved("GL_NEAREST",value); else _g.h["GL_NEAREST"] = value;
	var value1 = new quake__$GL_GLModeSetting(9729,9729);
	if(__map_reserved.GL_LINEAR != null) _g.setReserved("GL_LINEAR",value1); else _g.h["GL_LINEAR"] = value1;
	var value2 = new quake__$GL_GLModeSetting(9984,9728);
	if(__map_reserved.GL_NEAREST_MIPMAP_NEAREST != null) _g.setReserved("GL_NEAREST_MIPMAP_NEAREST",value2); else _g.h["GL_NEAREST_MIPMAP_NEAREST"] = value2;
	var value3 = new quake__$GL_GLModeSetting(9985,9729);
	if(__map_reserved.GL_LINEAR_MIPMAP_NEAREST != null) _g.setReserved("GL_LINEAR_MIPMAP_NEAREST",value3); else _g.h["GL_LINEAR_MIPMAP_NEAREST"] = value3;
	var value4 = new quake__$GL_GLModeSetting(9986,9728);
	if(__map_reserved.GL_NEAREST_MIPMAP_LINEAR != null) _g.setReserved("GL_NEAREST_MIPMAP_LINEAR",value4); else _g.h["GL_NEAREST_MIPMAP_LINEAR"] = value4;
	var value5 = new quake__$GL_GLModeSetting(9987,9729);
	if(__map_reserved.GL_LINEAR_MIPMAP_LINEAR != null) _g.setReserved("GL_LINEAR_MIPMAP_LINEAR",value5); else _g.h["GL_LINEAR_MIPMAP_LINEAR"] = value5;
	tmp = _g;
	quake_GL.modes = tmp;
	var tmp1;
	var _this = quake_GL.modes;
	if(__map_reserved.GL_LINEAR_MIPMAP_NEAREST != null) tmp1 = _this.getReserved("GL_LINEAR_MIPMAP_NEAREST"); else tmp1 = _this.h["GL_LINEAR_MIPMAP_NEAREST"];
	var defaultMode = tmp1;
	quake_GL.filter_min = defaultMode.min;
	quake_GL.filter_max = defaultMode.max;
	quake_GL.picmip = quake_Cvar.RegisterVariable("gl_picmip","0");
	quake_Cmd.AddCommand("gl_texturemode",quake_GL.TextureMode_f);
	quake_GL.rect = quake_GL.gl.createBuffer();
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.bufferData(34962,new Float32Array([0,0,0,1,1,0,1,1]),35044);
	quake_VID.mainwindow.style.display = "inline-block";
};
var quake_HClient = function() {
	this.num = 0;
	this.message = new quake_MSG(8000);
	this.message.allowoverflow = true;
	this.colors = 0;
	this.old_frags = 0;
};
quake_HClient.__name__ = true;
var quake_Host = function() { };
quake_Host.__name__ = true;
quake_Host.EndGame = function(message) {
	quake_Console.DPrint("Host.EndGame: " + message + "\n");
	if(quake_CL.cls.demonum != -1) quake_CL.NextDemo(); else quake_CL.Disconnect();
	throw new js__$Boot_HaxeError("Host.abortserver");
};
quake_Host.Error = function(error) {
	if(quake_Host.inerror) quake_Sys.Error("Host.Error: recursively entered");
	quake_Host.inerror = true;
	quake_SCR.EndLoadingPlaque();
	quake_Console.Print("Host.Error: " + error + "\n");
	if(quake_SV.server.active) quake_Host.ShutdownServer(false);
	quake_CL.Disconnect();
	quake_CL.cls.demonum = -1;
	quake_Host.inerror = false;
	throw new Error("Host.abortserver");
};
quake_Host.FindMaxClients = function() {
	quake_SV.svs.maxclients = quake_SV.svs.maxclientslimit = 1;
	quake_CL.cls.state = 0;
	quake_SV.svs.clients = [new quake_HClient()];
	quake_Host.deathmatch.setValue(0);
};
quake_Host.InitLocal = function() {
	quake_Host.InitCommands();
	quake_Host.framerate = quake_Cvar.RegisterVariable("host_framerate","0");
	quake_Host.speeds = quake_Cvar.RegisterVariable("host_speeds","0");
	quake_Host.ticrate = quake_Cvar.RegisterVariable("sys_ticrate","0.05");
	quake_Host.serverprofile = quake_Cvar.RegisterVariable("serverprofile","0");
	quake_Host.fraglimit = quake_Cvar.RegisterVariable("fraglimit","0",false,true);
	quake_Host.timelimit = quake_Cvar.RegisterVariable("timelimit","0",false,true);
	quake_Host.teamplay = quake_Cvar.RegisterVariable("teamplay","0",false,true);
	quake_Host.samelevel = quake_Cvar.RegisterVariable("samelevel","0");
	quake_Host.noexit = quake_Cvar.RegisterVariable("noexit","0",false,true);
	quake_Host.skill = quake_Cvar.RegisterVariable("skill","1");
	quake_Host.developer = quake_Cvar.RegisterVariable("developer","0");
	quake_Host.deathmatch = quake_Cvar.RegisterVariable("deathmatch","0");
	quake_Host.coop = quake_Cvar.RegisterVariable("coop","0");
	quake_Host.pausable = quake_Cvar.RegisterVariable("pausable","1");
	quake_Host.temp1 = quake_Cvar.RegisterVariable("temp1","0");
	quake_Host.FindMaxClients();
};
quake_Host.ClientPrint = function(string) {
	quake_Host.client.message.WriteByte(8);
	quake_Host.client.message.WriteString(string);
};
quake_Host.BroadcastPrint = function(string) {
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		var client = quake_SV.svs.clients[i];
		if(!client.active || !client.spawned) continue;
		client.message.WriteByte(8);
		client.message.WriteString(string);
	}
};
quake_Host.DropClient = function(crash) {
	var client = quake_Host.client;
	if(!crash) {
		if(quake_NET.CanSendMessage(client.netconnection)) {
			client.message.WriteByte(2);
			quake_NET.SendMessage(client.netconnection,client.message);
		}
		if(client.edict != null && client.spawned) {
			var saveSelf = quake_PR._globals_int[28];
			quake_PR._globals_int[28] = client.edict.num;
			quake_PR.ExecuteProgram(quake_PR._globals_int[89]);
			quake_PR._globals_int[28] = saveSelf;
		}
		var text = "Client " + quake_PR.GetString(quake_PR.netnames + (client.num << 5)) + " removed\n";
		console.log(text);
	}
	quake_NET.Close(client.netconnection);
	client.netconnection = null;
	client.active = false;
	quake_SV.SetClientName(client,"");
	client.old_frags = -999999;
	--quake_NET.activeconnections;
	var num = client.num;
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		var client1 = quake_SV.svs.clients[i];
		if(!client1.active) continue;
		client1.message.WriteByte(13);
		client1.message.WriteByte(num);
		client1.message.WriteByte(0);
		client1.message.WriteByte(14);
		client1.message.WriteByte(num);
		client1.message.WriteShort(0);
		client1.message.WriteByte(17);
		client1.message.WriteByte(num);
		client1.message.WriteByte(0);
	}
};
quake_Host.ShutdownServer = function(crash) {
	if(!quake_SV.server.active) return;
	quake_SV.server.active = false;
	if(quake_CL.cls.state == 2) quake_CL.Disconnect();
	var start = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	var count = 0;
	while(true) {
		var _g1 = 0;
		var _g = quake_SV.svs.maxclients;
		while(_g1 < _g) {
			var i = _g1++;
			quake_Host.client = quake_SV.svs.clients[i];
			if(!quake_Host.client.active || quake_Host.client.message.cursize == 0) continue;
			if(quake_NET.CanSendMessage(quake_Host.client.netconnection)) {
				quake_NET.SendMessage(quake_Host.client.netconnection,quake_Host.client.message);
				quake_Host.client.message.cursize = 0;
				continue;
			}
			quake_NET.GetMessage(quake_Host.client.netconnection);
			++count;
		}
		if(new Date().getTime() * 0.001 - quake_Sys.oldtime - start > 3.0) break;
		if(!(count != 0)) break;
	}
	var buf = new quake_MSG(4,1);
	new Uint8Array(buf.data)[0] = 2;
	count = quake_NET.SendToAll(buf);
	if(count != 0) quake_Console.Print("Host.ShutdownServer: NET.SendToAll failed for " + count + " clients\n");
	var _g11 = 0;
	var _g2 = quake_SV.svs.maxclients;
	while(_g11 < _g2) {
		var i1 = _g11++;
		quake_Host.client = quake_SV.svs.clients[i1];
		if(quake_Host.client.active) quake_Host.DropClient(crash);
	}
};
quake_Host.ServerFrame = function() {
	quake_PR._globals_float[32] = quake_Host.frametime;
	quake_SV.server.datagram.cursize = 0;
	quake_SV.CheckForNewClients();
	quake_SV.RunClients();
	if(!quake_SV.server.paused && (quake_SV.svs.maxclients >= 2 || quake_Key.dest == 0)) quake_SV.Physics();
	quake_SV.SendClientMessages();
};
quake_Host._Frame = function() {
	Math.random();
	quake_Host.realtime = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	quake_Host.frametime = quake_Host.realtime - quake_Host.oldrealtime;
	quake_Host.oldrealtime = quake_Host.realtime;
	if(quake_Host.framerate.value > 0) quake_Host.frametime = quake_Host.framerate.value; else if(quake_Host.frametime > 0.1) quake_Host.frametime = 0.1; else if(quake_Host.frametime < 0.001) quake_Host.frametime = 0.001;
	if(quake_CL.cls.state == 1) {
		quake_NET.CheckForResend();
		quake_SCR.UpdateScreen();
		return;
	}
	var time1 = null;
	var time2 = null;
	var pass1;
	var pass2;
	var pass3;
	var tot;
	quake_Cmd.Execute();
	quake_CL.SendCmd();
	if(quake_SV.server.active) quake_Host.ServerFrame();
	if(quake_CL.cls.state == 2) quake_CL.ReadFromServer();
	if(quake_Host.speeds.value != 0) time1 = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	quake_SCR.UpdateScreen();
	quake_CL.RunParticles();
	if(quake_Host.speeds.value != 0) time2 = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	if(quake_CL.cls.signon == 4) {
		quake_S.Update(quake_Render.refdef.vieworg,quake_Render.vpn,quake_Render.vright,quake_Render.vup);
		quake_CL.DecayLights();
	} else quake_S.Update(quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin);
	quake_CDAudio.Update();
	if(quake_Host.speeds.value != 0) {
		pass1 = (time1 - quake_Host.time3) * 1000.0;
		quake_Host.time3 = new Date().getTime() * 0.001 - quake_Sys.oldtime;
		pass2 = (time2 - time1) * 1000.0;
		pass3 = (quake_Host.time3 - time2) * 1000.0;
		tot = Math.floor(pass1 + pass2 + pass3);
		quake_Console.Print((tot <= 99?tot <= 9?"  ":" ":"") + tot + " tot " + (pass1 < 100.0?pass1 < 10.0?"  ":" ":"") + Math.floor(pass1) + " server " + (pass2 < 100.0?pass2 < 10.0?"  ":" ":"") + Math.floor(pass2) + " gfx " + (pass3 < 100.0?pass3 < 10.0?"  ":" ":"") + Math.floor(pass3) + " snd\n");
	}
	if(quake_Host.startdemos) {
		quake_CL.NextDemo();
		quake_Host.startdemos = false;
	}
	++quake_Host.framecount;
};
quake_Host.Frame = function() {
	if(quake_Host.serverprofile.value == 0) {
		quake_Host._Frame();
		return;
	}
	var time1 = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	quake_Host._Frame();
	quake_Host.timetotal += new Date().getTime() * 0.001 - quake_Sys.oldtime - time1;
	if(++quake_Host.timecount <= 999) return;
	var m = quake_Host.timetotal * 1000.0 / quake_Host.timecount | 0;
	quake_Host.timecount = 0;
	quake_Host.timetotal = 0.0;
	var c = 0;
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_SV.svs.clients[i].active) ++c;
	}
	quake_Console.Print("serverprofile: " + (c <= 9?" ":"") + c + " clients " + (m <= 9?" ":"") + m + " msec\n");
};
quake_Host.Init = function() {
	quake_Host.oldrealtime = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	quake_Cmd.Init();
	quake_V.Init();
	quake_Chase.Init();
	quake_COM.Init();
	quake_Host.InitLocal();
	quake_W.LoadWadFile("gfx.wad");
	quake_Key.Init();
	quake_Console.Init();
	quake_PR.Init();
	quake_Mod.Init();
	quake_NET.Init();
	quake_SV.Init();
	quake_Console.Print("Exe: 12:39:20 Aug  7 2014\n");
	quake_VID.Init();
	quake_Draw.Init();
	quake_SCR.Init();
	quake_Render.Init();
	quake_S.Init();
	quake_Menu.Init();
	quake_CDAudio.Init();
	quake_Sbar.Init();
	quake_CL.Init();
	quake_IN.Init();
	quake_Cmd.text = "exec quake.rc\n" + quake_Cmd.text;
	quake_Host.initialized = true;
	console.log("======Quake Initialized======\n");
};
quake_Host.Shutdown = function() {
	if(quake_Host.isdown) {
		console.log("recursive shutdown\n");
		return;
	}
	quake_Host.isdown = true;
	quake_COM.WriteTextFile("config.cfg",quake_Key.WriteBindings() + quake_Cvar.WriteVariables());
	quake_CDAudio.Stop();
	quake_NET.Shutdown();
	quake_S.StopAllSounds();
	quake_IN.Shutdown();
};
quake_Host.Quit_f = function() {
	if(quake_Key.dest != 1) {
		quake_Menu.Menu_Quit_f();
		return;
	}
	quake_Sys.Quit();
};
quake_Host.Status_f = function() {
	var print;
	if(!quake_Cmd.client) {
		if(!quake_SV.server.active) {
			quake_Cmd.ForwardToServer();
			return;
		}
		print = quake_Console.Print;
	} else print = quake_Host.ClientPrint;
	print("host:    " + quake_NET.hostname.string + "\n");
	print("version: 1.09\n");
	print("map:     " + quake_PR.GetString(quake_PR._globals_int[34]) + "\n");
	print("players: " + quake_NET.activeconnections + " active (" + quake_SV.svs.maxclients + " max)\n\n");
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		var client = quake_SV.svs.clients[i];
		if(!client.active) continue;
		var frags = client.edict._v_float[49].toFixed(0);
		if(frags.length == 1) frags = "  " + frags; else if(frags.length == 2) frags = " " + frags;
		var seconds = quake_NET.time - client.netconnection.connecttime | 0;
		var minutes = seconds / 60 | 0;
		var hours;
		if(minutes != 0) {
			seconds -= minutes * 60;
			hours = minutes / 60 | 0;
			if(hours != 0) minutes -= hours * 60;
		} else hours = 0;
		var str = "#" + (i + 1) + " ";
		if(i <= 8) str += " ";
		str += quake_PR.GetString(quake_PR.netnames + (client.num << 5));
		while(str.length <= 21) str += " ";
		str += frags + "  ";
		if(hours <= 9) str += " ";
		str += hours + ":";
		if(minutes <= 9) str += "0";
		str += minutes + ":";
		if(seconds <= 9) str += "0";
		print(str + seconds + "\n");
		print("   " + client.netconnection.address + "\n");
	}
};
quake_Host.God_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_PR._globals_float[35] != 0) return;
	var v = (quake_SV.player._v_float[76] | 0) ^ 64;
	quake_SV.player._v_float[76] = v;
	if(((quake_SV.player._v_float[76] | 0) & 64) == 0) quake_Host.ClientPrint("godmode OFF\n"); else quake_Host.ClientPrint("godmode ON\n");
};
quake_Host.Notarget_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_PR._globals_float[35] != 0) return;
	var v = (quake_SV.player._v_float[76] | 0) ^ 128;
	quake_SV.player._v_float[76] = v;
	if(((quake_SV.player._v_float[76] | 0) & 128) == 0) quake_Host.ClientPrint("notarget OFF\n"); else quake_Host.ClientPrint("notarget ON\n");
};
quake_Host.Noclip_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_PR._globals_float[35] != 0) return;
	if(quake_SV.player._v_float[8] != 8) {
		quake_Host.noclip_anglehack = true;
		quake_SV.player._v_float[8] = 8;
		quake_Host.ClientPrint("noclip ON\n");
		return;
	}
	quake_Host.noclip_anglehack = false;
	quake_SV.player._v_float[8] = 3;
	quake_Host.ClientPrint("noclip OFF\n");
};
quake_Host.Fly_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_PR._globals_float[35] != 0) return;
	if(quake_SV.player._v_float[8] != 5) {
		quake_SV.player._v_float[8] = 5;
		quake_Host.ClientPrint("flymode ON\n");
		return;
	}
	quake_SV.player._v_float[8] = 3;
	quake_Host.ClientPrint("flymode OFF\n");
};
quake_Host.Ping_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	quake_Host.ClientPrint("Client ping times:\n");
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		var client = quake_SV.svs.clients[i];
		if(!client.active) continue;
		var total = 0.0;
		var _g2 = 0;
		while(_g2 < 16) {
			var j = _g2++;
			total += client.ping_times[j];
		}
		var total1 = (total * 62.5).toFixed(0);
		if(total1.length == 1) total1 = "   " + total1; else if(total1.length == 2) total1 = "  " + total1; else if(total1.length == 3) total1 = " " + total1;
		quake_Host.ClientPrint(total1 + " " + quake_PR.GetString(quake_PR.netnames + (client.num << 5)) + "\n");
	}
};
quake_Host.Map_f = function() {
	if(quake_Cmd.argv.length <= 1) {
		quake_Console.Print("USAGE: map <map>\n");
		return;
	}
	if(quake_Cmd.client) return;
	quake_CL.cls.demonum = -1;
	quake_CL.Disconnect();
	quake_Host.ShutdownServer(false);
	quake_Key.dest = 0;
	quake_SCR.BeginLoadingPlaque();
	quake_SV.svs.serverflags = 0;
	quake_SV.SpawnServer(quake_Cmd.argv[1]);
	if(!quake_SV.server.active) return;
	quake_CL.cls.spawnparms = "";
	var _g1 = 2;
	var _g = quake_Cmd.argv.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_CL.cls.spawnparms += quake_Cmd.argv[i] + " ";
	}
	quake_Cmd.ExecuteString("connect local");
};
quake_Host.Changelevel_f = function() {
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("changelevel <levelname> : continue game on a new level\n");
		return;
	}
	if(!quake_SV.server.active || quake_CL.cls.demoplayback) {
		quake_Console.Print("Only the server may changelevel\n");
		return;
	}
	quake_SV.SaveSpawnparms();
	quake_SV.SpawnServer(quake_Cmd.argv[1]);
};
quake_Host.Restart_f = function() {
	if(!quake_CL.cls.demoplayback && quake_SV.server.active && !quake_Cmd.client) quake_SV.SpawnServer(quake_PR.GetString(quake_PR._globals_int[34]));
};
quake_Host.Reconnect_f = function() {
	quake_SCR.BeginLoadingPlaque();
	quake_CL.cls.signon = 0;
};
quake_Host.Connect_f = function() {
	quake_CL.cls.demonum = -1;
	if(quake_CL.cls.demoplayback) {
		quake_CL.StopPlayback();
		quake_CL.Disconnect();
	}
	quake_CL.EstablishConnection(quake_Cmd.argv[1]);
	quake_CL.cls.signon = 0;
};
quake_Host.SavegameComment = function() {
	var text = new EReg("\\s","gm").replace(quake_CL.state.levelname,"_");
	var _g = quake_CL.state.levelname.length;
	while(_g < 22) {
		_g++;
		text += "_";
	}
	text += "kills:";
	var kills = Std.string(quake_CL.state.stats[14]);
	if(kills.length == 2) text += "_"; else if(kills.length == 1) text += "__";
	text += kills + "/";
	kills = Std.string(quake_CL.state.stats[12]);
	if(kills.length == 2) text += "_"; else if(kills.length == 1) text += "__";
	text += kills;
	return text + "____";
};
quake_Host.Savegame_f = function() {
	if(quake_Cmd.client) return;
	if(!quake_SV.server.active) {
		quake_Console.Print("Not playing a local game.\n");
		return;
	}
	if(quake_CL.state.intermission != 0) {
		quake_Console.Print("Can't save in intermission.\n");
		return;
	}
	if(quake_SV.svs.maxclients != 1) {
		quake_Console.Print("Can't save multiplayer games.\n");
		return;
	}
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("save <savename> : save a game\n");
		return;
	}
	if(quake_Cmd.argv[1].indexOf("..") != -1) {
		quake_Console.Print("Relative pathnames are not allowed.\n");
		return;
	}
	var client = quake_SV.svs.clients[0];
	if(client.active) {
		if(client.edict._v_float[48] <= 0.0) {
			quake_Console.Print("Can't savegame with a dead player\n");
			return;
		}
	}
	var f = ["5\n" + quake_Host.SavegameComment() + "\n"];
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		f.push(client.spawn_parms[i].toFixed(6) + "\n");
	}
	f.push(quake_Host.current_skill + "\n" + quake_PR.GetString(quake_PR._globals_int[34]) + "\n" + quake_SV.server.time.toFixed(6) + "\n");
	var _g1 = 0;
	var _g11 = quake_SV.server.lightstyles;
	while(_g1 < _g11.length) {
		var ls = _g11[_g1];
		++_g1;
		if(ls.length != 0) f.push(ls + "\n"); else f.push("m\n");
	}
	f.push("{\n");
	var _g2 = 0;
	var _g12 = quake_PR.globaldefs;
	while(_g2 < _g12.length) {
		var def = _g12[_g2];
		++_g2;
		var type = def.type;
		if((type & 32768) == 0) continue;
		var type1 = type & 32767;
		if(type1 != 1 && type1 != 2 && type1 != 4) continue;
		f.push("\"" + quake_PR.GetString(def.name) + "\" \"" + quake_PR.UglyValueString(type1,quake_PR._globals,def.ofs) + "\"\n");
	}
	f.push("}\n");
	var _g13 = 0;
	var _g3 = quake_SV.server.num_edicts;
	while(_g13 < _g3) {
		var i1 = _g13++;
		var ed = quake_SV.server.edicts[i1];
		if(ed.free) {
			f.push("{\n}\n");
			continue;
		}
		f.push("{\n");
		var _g21 = 0;
		var _g31 = quake_PR.fielddefs;
		while(_g21 < _g31.length) {
			var def1 = _g31[_g21];
			++_g21;
			var name1 = quake_PR.GetString(def1.name);
			if(HxOverrides.cca(name1,name1.length - 2) == 95) continue;
			var type2 = def1.type & 32767;
			var v = def1.ofs;
			if(ed._v_int[v] == 0) {
				if(type2 == 3) {
					if(ed._v_int[v + 1] == 0 && ed._v_int[v + 2] == 0) continue;
				} else continue;
			}
			f.push("\"" + name1 + "\" \"" + quake_PR.UglyValueString(type2,ed._v,def1.ofs) + "\"\n");
		}
		f.push("}\n");
	}
	var name = quake_COM.DefaultExtension(quake_Cmd.argv[1],".sav");
	quake_Console.Print("Saving game to " + name + "...\n");
	if(quake_COM.WriteTextFile(name,f.join(""))) quake_Console.Print("done.\n"); else quake_Console.Print("ERROR: couldn't open.\n");
};
quake_Host.Loadgame_f = function() {
	if(quake_Cmd.client) return;
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("load <savename> : load a game\n");
		return;
	}
	quake_CL.cls.demonum = -1;
	var name = quake_COM.DefaultExtension(quake_Cmd.argv[1],".sav");
	quake_Console.Print("Loading game from " + name + "...\n");
	var f = quake_COM.LoadTextFile(name);
	if(f == null) {
		quake_Console.Print("ERROR: couldn't open.\n");
		return;
	}
	var f1 = f.split("\n");
	var tfloat = parseFloat(f1[0]);
	if(tfloat != 5) {
		quake_Console.Print("Savegame is version " + tfloat + ", not 5\n");
		return;
	}
	var spawn_parms = [];
	var _g = 0;
	while(_g < 16) {
		var i1 = _g++;
		spawn_parms[i1] = parseFloat(f1[2 + i1]);
	}
	var tmp;
	var x = parseFloat(f1[18]) + 0.1;
	tmp = x | 0;
	quake_Host.current_skill = tmp;
	quake_Host.skill.setValue(quake_Host.current_skill);
	var time = parseFloat(f1[20]);
	quake_CL.Disconnect();
	quake_SV.SpawnServer(f1[19]);
	if(!quake_SV.server.active) {
		quake_Console.Print("Couldn't load map\n");
		return;
	}
	quake_SV.server.paused = true;
	quake_SV.server.loadgame = true;
	var _g1 = 0;
	while(_g1 < 64) {
		var i2 = _g1++;
		quake_SV.server.lightstyles[i2] = f1[21 + i2];
	}
	if(f1[85] != "{") quake_Sys.Error("First token isn't a brace");
	var i = 86;
	while(i < f1.length) {
		if(f1[i] == "}") {
			++i;
			break;
		}
		var token = f1[i].split("\"");
		var keyname = token[1];
		var key = quake_ED.FindGlobal(keyname);
		i++;
		if(key == null) {
			quake_Console.Print("'" + keyname + "' is not a global\n");
			continue;
		}
		if(!quake_ED.ParseEpair(quake_PR._globals,key,token[3])) quake_Host.Error("Host.Loadgame_f: parse error");
	}
	f1.push("");
	var entnum = 0;
	var data = f1.slice(i).join("\n");
	while(true) {
		data = quake_COM.Parse(data);
		if(data == null) break;
		if(HxOverrides.cca(quake_COM.token,0) != 123) quake_Sys.Error("Host.Loadgame_f: found " + quake_COM.token + " when expecting {");
		var ent = quake_SV.server.edicts[entnum++];
		var _g11 = 0;
		var _g2 = quake_PR.entityfields;
		while(_g11 < _g2) {
			var j = _g11++;
			ent._v_int[j] = 0;
		}
		ent.free = false;
		data = quake_ED.ParseEdict(data,ent);
		if(!ent.free) quake_SV.LinkEdict(ent,false);
	}
	quake_SV.server.num_edicts = entnum;
	quake_SV.server.time = time;
	var client = quake_SV.svs.clients[0];
	client.spawn_parms = [];
	var _g3 = 0;
	while(_g3 < 16) {
		var i3 = _g3++;
		client.spawn_parms[i3] = spawn_parms[i3];
	}
	quake_CL.EstablishConnection("local");
	quake_Host.Reconnect_f();
};
quake_Host.Name_f = function() {
	if(quake_Cmd.argv.length <= 1) {
		quake_Console.Print("\"name\" is \"" + quake_CL.$name.string + "\"\n");
		return;
	}
	var newName;
	if(quake_Cmd.argv.length == 2) newName = quake_Cmd.argv[1].substring(0,15); else newName = quake_Cmd.args.substring(0,15);
	if(!quake_Cmd.client) {
		quake_CL.$name.set(newName);
		if(quake_CL.cls.state == 2) quake_Cmd.ForwardToServer();
		return;
	}
	var name = quake_PR.GetString(quake_PR.netnames + (quake_Host.client.num << 5));
	if(name.length != 0 && name != "unconnected" && name != newName) quake_Console.Print(name + " renamed to " + newName + "\n");
	quake_SV.SetClientName(quake_Host.client,newName);
	var msg = quake_SV.server.reliable_datagram;
	msg.WriteByte(13);
	msg.WriteByte(quake_Host.client.num);
	msg.WriteString(newName);
};
quake_Host.Version_f = function() {
	quake_Console.Print("Version 1.09\n");
	quake_Console.Print("Exe: 12:39:20 Aug  7 2014\n");
};
quake_Host.Say = function(teamonly) {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_Cmd.argv.length <= 1) return;
	var save = quake_Host.client;
	var p = quake_Cmd.args;
	if(HxOverrides.cca(p,0) == 34) p = p.substring(1,p.length - 1);
	var text = "\x01" + quake_PR.GetString(quake_PR.netnames + (save.num << 5)) + ": ";
	var i = 62 - text.length;
	if(p.length > i) p = p.substring(0,i);
	text += p + "\n";
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i1 = _g1++;
		var client = quake_SV.svs.clients[i1];
		if(!client.active || !client.spawned) continue;
		if(quake_Host.teamplay.value != 0 && teamonly && client.edict._v_float[78] != save.edict._v_float[78]) continue;
		quake_Host.client = client;
		quake_Host.ClientPrint(text);
	}
	quake_Host.client = save;
	var text1 = text.substring(1);
	console.log(text1);
};
quake_Host.Say_Team_f = function() {
	quake_Host.Say(true);
};
quake_Host.Tell_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_Cmd.argv.length <= 2) return;
	var text = quake_PR.GetString(quake_PR.netnames + (quake_Host.client.num << 5)) + ": ";
	var p = quake_Cmd.args;
	if(HxOverrides.cca(p,0) == 34) p = p.substring(1,p.length - 1);
	var i = 62 - text.length;
	if(p.length > i) p = p.substring(0,i);
	text += p + "\n";
	var save = quake_Host.client;
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i1 = _g1++;
		var client = quake_SV.svs.clients[i1];
		if(!client.active || !client.spawned) continue;
		if(quake_PR.GetString(quake_PR.netnames + (client.num << 5)).toLowerCase() != quake_Cmd.argv[1].toLowerCase()) continue;
		quake_Host.client = client;
		quake_Host.ClientPrint(text);
		break;
	}
	quake_Host.client = save;
};
quake_Host.Color_f = function() {
	if(quake_Cmd.argv.length <= 1) {
		var col = quake_CL.color.value | 0;
		quake_Console.Print("\"color\" is \"" + (col >> 4) + " " + (col & 15) + "\"\ncolor <0-13> [0-13]\n");
		return;
	}
	var top;
	var bottom;
	if(quake_Cmd.argv.length == 2) top = bottom = (quake_Q.atoi(quake_Cmd.argv[1]) & 15) >>> 0; else {
		top = (quake_Q.atoi(quake_Cmd.argv[1]) & 15) >>> 0;
		bottom = (quake_Q.atoi(quake_Cmd.argv[2]) & 15) >>> 0;
	}
	if(top >= 14) top = 13;
	if(bottom >= 14) bottom = 13;
	var playercolor = (top << 4) + bottom;
	if(!quake_Cmd.client) {
		quake_CL.color.setValue(playercolor);
		if(quake_CL.cls.state == 2) quake_Cmd.ForwardToServer();
		return;
	}
	quake_Host.client.colors = playercolor;
	quake_Host.client.edict._v_float[78] = bottom + 1;
	var msg = quake_SV.server.reliable_datagram;
	msg.WriteByte(17);
	msg.WriteByte(quake_Host.client.num);
	msg.WriteByte(playercolor);
};
quake_Host.Kill_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_SV.player._v_float[48] <= 0.0) {
		quake_Host.ClientPrint("Can't suicide -- already dead!\n");
		return;
	}
	quake_PR._globals_float[31] = quake_SV.server.time;
	quake_PR._globals_int[28] = quake_SV.player.num;
	quake_PR.ExecuteProgram(quake_PR._globals_int[86]);
};
quake_Host.Pause_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_Host.pausable.value == 0) {
		quake_Host.ClientPrint("Pause not allowed.\n");
		return;
	}
	quake_SV.server.paused = !quake_SV.server.paused;
	quake_Host.BroadcastPrint(quake_PR.GetString(quake_PR.netnames + (quake_Host.client.num << 5)) + (quake_SV.server.paused?" paused the game\n":" unpaused the game\n"));
	quake_SV.server.reliable_datagram.WriteByte(24);
	quake_SV.server.reliable_datagram.WriteByte(quake_SV.server.paused?1:0);
};
quake_Host.PreSpawn_f = function() {
	if(!quake_Cmd.client) {
		quake_Console.Print("prespawn is not valid from the console\n");
		return;
	}
	var client = quake_Host.client;
	if(client.spawned) {
		quake_Console.Print("prespawn not valid -- already spawned\n");
		return;
	}
	client.message.Write(new Uint8Array(quake_SV.server.signon.data),quake_SV.server.signon.cursize);
	client.message.WriteByte(25);
	client.message.WriteByte(2);
	client.sendsignon = true;
};
quake_Host.Spawn_f = function() {
	if(!quake_Cmd.client) {
		quake_Console.Print("spawn is not valid from the console\n");
		return;
	}
	var client = quake_Host.client;
	if(client.spawned) {
		quake_Console.Print("Spawn not valid -- already spawned\n");
		return;
	}
	var ent = client.edict;
	if(quake_SV.server.loadgame) quake_SV.server.paused = false; else {
		var _g1 = 0;
		var _g = quake_PR.entityfields;
		while(_g1 < _g) {
			var i = _g1++;
			ent._v_int[i] = 0;
		}
		ent._v_float[77] = ent.num;
		ent._v_float[78] = (client.colors & 15) + 1;
		ent._v_int[74] = quake_PR.netnames + (client.num << 5);
		var _g2 = 0;
		while(_g2 < 16) {
			var i1 = _g2++;
			quake_PR._globals_float[43 + i1] = client.spawn_parms[i1];
		}
		quake_PR._globals_float[31] = quake_SV.server.time;
		quake_PR._globals_int[28] = ent.num;
		quake_PR.ExecuteProgram(quake_PR._globals_int[87]);
		if(new Date().getTime() * 0.001 - quake_Sys.oldtime - client.netconnection.connecttime <= quake_SV.server.time) {
			var text = quake_PR.GetString(quake_PR.netnames + (client.num << 5)) + " entered the game\n";
			console.log(text);
		}
		quake_PR.ExecuteProgram(quake_PR._globals_int[88]);
	}
	var message = client.message;
	message.cursize = 0;
	message.WriteByte(7);
	message.WriteFloat(quake_SV.server.time);
	var _g11 = 0;
	var _g3 = quake_SV.svs.maxclients;
	while(_g11 < _g3) {
		var i2 = _g11++;
		client = quake_SV.svs.clients[i2];
		message.WriteByte(13);
		message.WriteByte(i2);
		message.WriteString(quake_PR.GetString(quake_PR.netnames + (client.num << 5)));
		message.WriteByte(14);
		message.WriteByte(i2);
		message.WriteShort(client.old_frags);
		message.WriteByte(17);
		message.WriteByte(i2);
		message.WriteByte(client.colors);
	}
	var _g4 = 0;
	while(_g4 < 64) {
		var i3 = _g4++;
		message.WriteByte(12);
		message.WriteByte(i3);
		message.WriteString(quake_SV.server.lightstyles[i3]);
	}
	message.WriteByte(3);
	message.WriteByte(11);
	message.WriteLong(quake_PR._globals_float[39] | 0);
	message.WriteByte(3);
	message.WriteByte(12);
	message.WriteLong(quake_PR._globals_float[40] | 0);
	message.WriteByte(3);
	message.WriteByte(13);
	message.WriteLong(quake_PR._globals_float[41] | 0);
	message.WriteByte(3);
	message.WriteByte(14);
	message.WriteLong(quake_PR._globals_float[42] | 0);
	message.WriteByte(10);
	message.WriteByte((ent._v_float[19] * 256 / 360 | 0) & 255);
	message.WriteByte((ent._v_float[20] * 256 / 360 | 0) & 255);
	message.WriteByte((0. | 0) & 255);
	quake_SV.WriteClientdataToMessage(ent,message);
	message.WriteByte(25);
	message.WriteByte(3);
	quake_Host.client.sendsignon = true;
};
quake_Host.Begin_f = function() {
	if(!quake_Cmd.client) {
		quake_Console.Print("begin is not valid from the console\n");
		return;
	}
	quake_Host.client.spawned = true;
};
quake_Host.Kick_f = function() {
	if(!quake_Cmd.client) {
		if(!quake_SV.server.active) {
			quake_Cmd.ForwardToServer();
			return;
		}
	} else if(quake_PR._globals_float[35] != 0.0) return;
	var save = quake_Host.client;
	var i;
	var byNumber = null;
	if(quake_Cmd.argv.length >= 3 && quake_Cmd.argv[1] == "#") {
		i = quake_Q.atoi(quake_Cmd.argv[2]) - 1;
		if(i < 0 || i >= quake_SV.svs.maxclients) return;
		if(!quake_SV.svs.clients[i].active) return;
		quake_Host.client = quake_SV.svs.clients[i];
		byNumber = true;
	} else {
		i = 0;
		while(i < quake_SV.svs.maxclients) {
			quake_Host.client = quake_SV.svs.clients[i];
			if(!quake_Host.client.active) {
				i++;
				continue;
			}
			if(quake_PR.GetString(quake_PR.netnames + (quake_Host.client.num << 5)).toLowerCase() == quake_Cmd.argv[1].toLowerCase()) break;
			i++;
		}
	}
	if(i >= quake_SV.svs.maxclients) {
		quake_Host.client = save;
		return;
	}
	if(quake_Host.client == save) return;
	var who;
	if(!quake_Cmd.client) who = quake_CL.$name.string; else {
		if(quake_Host.client == save) return;
		who = quake_PR.GetString(quake_PR.netnames + (save.num << 5));
	}
	var message = null;
	if(quake_Cmd.argv.length >= 3) message = quake_COM.Parse(quake_Cmd.args);
	if(message != null) {
		var p = 0;
		if(byNumber) {
			++p;
			while(p < message.length) {
				if(HxOverrides.cca(message,p) != 32) break;
				p++;
			}
			p += quake_Cmd.argv[2].length;
		}
		while(p < message.length) {
			if(HxOverrides.cca(message,p) != 32) break;
			p++;
		}
		quake_Host.ClientPrint("Kicked by " + who + ": " + message.substring(p) + "\n");
	} else quake_Host.ClientPrint("Kicked by " + who + "\n");
	quake_Host.DropClient(false);
	quake_Host.client = save;
};
quake_Host.Give_f = function() {
	if(!quake_Cmd.client) {
		quake_Cmd.ForwardToServer();
		return;
	}
	if(quake_PR._globals_float[35] != 0) return;
	if(quake_Cmd.argv.length <= 1) return;
	var t = HxOverrides.cca(quake_Cmd.argv[1],0);
	var ent = quake_SV.player;
	if(t >= 48 && t <= 57) {
		if(!quake_COM.hipnotic) {
			if(t >= 50) {
				var v1 = ent._v_float[58] | 0 | quake_Def.it.shotgun << t - 50;
				ent._v_float[58] = v1;
			}
			return;
		}
		if(t == 54) {
			if(HxOverrides.cca(quake_Cmd.argv[1],1) == 97) {
				var v2 = ent._v_float[58] | 0 | quake_Def.hit.proximity_gun;
				ent._v_float[58] = v2;
			} else {
				var v3 = ent._v_float[58] | 0 | quake_Def.it.grenade_launcher;
				ent._v_float[58] = v3;
			}
			return;
		}
		if(t == 57) {
			var v4 = ent._v_float[58] | 0 | quake_Def.hit.laser_cannon;
			ent._v_float[58] = v4;
		} else if(t == 48) {
			var v5 = ent._v_float[58] | 0 | quake_Def.hit.mjolnir;
			ent._v_float[58] = v5;
		} else if(t >= 50) {
			var v6 = ent._v_float[58] | 0 | quake_Def.it.shotgun << t - 50;
			ent._v_float[58] = v6;
		}
		return;
	}
	var v = quake_Q.atoi(quake_Cmd.argv[2]);
	if(t == 104) {
		ent._v_float[48] = v;
		return;
	}
	if(!quake_COM.rogue) {
		if(t != null) switch(t) {
		case 115:
			ent._v_float[54] = v;
			break;
		case 110:
			ent._v_float[55] = v;
			break;
		case 114:
			ent._v_float[56] = v;
			break;
		case 99:
			ent._v_float[57] = v;
			break;
		}
		return;
	}
	if(t != null) switch(t) {
	case 115:
		if(quake_EdictVarOfs.ammo_shells1 != null) ent._v_float[quake_EdictVarOfs.ammo_shells1] = v;
		ent._v_float[54] = v;
		break;
	case 110:
		if(quake_EdictVarOfs.ammo_nails1 != null) {
			ent._v_float[quake_EdictVarOfs.ammo_nails1] = v;
			if(ent._v_float[50] <= quake_Def.it.lightning) ent._v_float[55] = v;
		}
		break;
	case 108:
		if(quake_EdictVarOfs.ammo_lava_nails != null) {
			ent._v_float[quake_EdictVarOfs.ammo_lava_nails] = v;
			if(ent._v_float[50] > quake_Def.it.lightning) ent._v_float[55] = v;
		}
		break;
	case 114:
		if(quake_EdictVarOfs.ammo_rockets1 != null) {
			ent._v_float[quake_EdictVarOfs.ammo_rockets1] = v;
			if(ent._v_float[50] <= quake_Def.it.lightning) ent._v_float[56] = v;
		}
		break;
	case 109:
		if(quake_EdictVarOfs.ammo_multi_rockets != null) {
			ent._v_float[quake_EdictVarOfs.ammo_multi_rockets] = v;
			if(ent._v_float[50] > quake_Def.it.lightning) ent._v_float[56] = v;
		}
		break;
	case 99:
		if(quake_EdictVarOfs.ammo_cells1 != null) {
			ent._v_float[quake_EdictVarOfs.ammo_cells1] = v;
			if(ent._v_float[50] <= quake_Def.it.lightning) ent._v_float[57] = v;
		}
		break;
	case 112:
		if(quake_EdictVarOfs.ammo_plasma != null) {
			ent._v_float[quake_EdictVarOfs.ammo_plasma] = v;
			if(ent._v_float[50] > quake_Def.it.lightning) ent._v_float[57] = v;
		}
		break;
	}
};
quake_Host.FindViewthing = function() {
	if(quake_SV.server.active) {
		var _g1 = 0;
		var _g = quake_SV.server.num_edicts;
		while(_g1 < _g) {
			var i = _g1++;
			var e = quake_SV.server.edicts[i];
			if(quake_PR.GetString(e._v_int[28]) == "viewthing") return e;
		}
	}
	quake_Console.Print("No viewthing on map\n");
	return null;
};
quake_Host.Viewmodel_f = function() {
	if(quake_Cmd.argv.length != 2) return;
	var ent = quake_Host.FindViewthing();
	if(ent == null) return;
	var m = quake_Mod.LoadModel(quake_Mod.FindName(quake_Cmd.argv[1]),false);
	if(m == null) {
		quake_Console.Print("Can't load " + quake_Cmd.argv[1] + "\n");
		return;
	}
	ent._v_float[30] = 0.0;
	quake_CL.state.model_precache[ent._v_float[0] | 0] = m;
};
quake_Host.Viewframe_f = function() {
	var ent = quake_Host.FindViewthing();
	if(ent == null) return;
	var m = quake_CL.state.model_precache[ent._v_float[0] | 0];
	var f = quake_Q.atoi(quake_Cmd.argv[1]);
	if(f >= m.frames.length) f = m.frames.length - 1;
	ent._v_float[30] = f;
};
quake_Host.Viewnext_f = function() {
	var ent = quake_Host.FindViewthing();
	if(ent == null) return;
	var m = quake_CL.state.model_precache[ent._v_float[0] | 0];
	var f = (ent._v_float[30] | 0) + 1;
	if(f >= m.frames.length) f = m.frames.length - 1;
	ent._v_float[30] = f;
	quake_Console.Print("frame " + f + ": " + m.frames[f].name + "\n");
};
quake_Host.Viewprev_f = function() {
	var ent = quake_Host.FindViewthing();
	if(ent == null) return;
	var m = quake_CL.state.model_precache[ent._v_float[0] | 0];
	var f = (ent._v_float[30] | 0) - 1;
	if(f < 0) f = 0;
	ent._v_float[30] = f;
	quake_Console.Print("frame " + f + ": " + m.frames[f].name + "\n");
};
quake_Host.Startdemos_f = function() {
	quake_Console.Print(quake_Cmd.argv.length - 1 + " demo(s) in loop\n");
	quake_CL.cls.demos = [];
	var _g1 = 1;
	var _g = quake_Cmd.argv.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_CL.cls.demos[i - 1] = quake_Cmd.argv[i];
	}
	if(quake_CL.cls.demonum != -1 && !quake_CL.cls.demoplayback) {
		quake_CL.cls.demonum = 0;
		if(quake_Host.framecount != 0) quake_CL.NextDemo(); else quake_Host.startdemos = true;
	} else quake_CL.cls.demonum = -1;
};
quake_Host.Demos_f = function() {
	if(quake_CL.cls.demonum == -1) quake_CL.cls.demonum = 1;
	quake_CL.Disconnect();
	quake_CL.NextDemo();
};
quake_Host.Stopdemo_f = function() {
	if(!quake_CL.cls.demoplayback) return;
	quake_CL.StopPlayback();
	quake_CL.Disconnect();
};
quake_Host.InitCommands = function() {
	quake_Cmd.AddCommand("status",quake_Host.Status_f);
	quake_Cmd.AddCommand("quit",quake_Host.Quit_f);
	quake_Cmd.AddCommand("god",quake_Host.God_f);
	quake_Cmd.AddCommand("notarget",quake_Host.Notarget_f);
	quake_Cmd.AddCommand("fly",quake_Host.Fly_f);
	quake_Cmd.AddCommand("map",quake_Host.Map_f);
	quake_Cmd.AddCommand("restart",quake_Host.Restart_f);
	quake_Cmd.AddCommand("changelevel",quake_Host.Changelevel_f);
	quake_Cmd.AddCommand("connect",quake_Host.Connect_f);
	quake_Cmd.AddCommand("reconnect",quake_Host.Reconnect_f);
	quake_Cmd.AddCommand("name",quake_Host.Name_f);
	quake_Cmd.AddCommand("noclip",quake_Host.Noclip_f);
	quake_Cmd.AddCommand("version",quake_Host.Version_f);
	quake_Cmd.AddCommand("say",function() {
		quake_Host.Say(false);
	});
	quake_Cmd.AddCommand("say_team",quake_Host.Say_Team_f);
	quake_Cmd.AddCommand("tell",quake_Host.Tell_f);
	quake_Cmd.AddCommand("color",quake_Host.Color_f);
	quake_Cmd.AddCommand("kill",quake_Host.Kill_f);
	quake_Cmd.AddCommand("pause",quake_Host.Pause_f);
	quake_Cmd.AddCommand("spawn",quake_Host.Spawn_f);
	quake_Cmd.AddCommand("begin",quake_Host.Begin_f);
	quake_Cmd.AddCommand("prespawn",quake_Host.PreSpawn_f);
	quake_Cmd.AddCommand("kick",quake_Host.Kick_f);
	quake_Cmd.AddCommand("ping",quake_Host.Ping_f);
	quake_Cmd.AddCommand("load",quake_Host.Loadgame_f);
	quake_Cmd.AddCommand("save",quake_Host.Savegame_f);
	quake_Cmd.AddCommand("give",quake_Host.Give_f);
	quake_Cmd.AddCommand("startdemos",quake_Host.Startdemos_f);
	quake_Cmd.AddCommand("demos",quake_Host.Demos_f);
	quake_Cmd.AddCommand("stopdemo",quake_Host.Stopdemo_f);
	quake_Cmd.AddCommand("viewmodel",quake_Host.Viewmodel_f);
	quake_Cmd.AddCommand("viewframe",quake_Host.Viewframe_f);
	quake_Cmd.AddCommand("viewnext",quake_Host.Viewnext_f);
	quake_Cmd.AddCommand("viewprev",quake_Host.Viewprev_f);
	quake_Cmd.AddCommand("mcache",quake_Mod.Print);
};
var quake__$IN_StdMouseHandler = function() { };
quake__$IN_StdMouseHandler.__name__ = true;
quake__$IN_StdMouseHandler.attach = function() {
	if(quake_VID.mainwindow.requestPointerLock != null) {
		quake_VID.mainwindow.onclick = quake__$IN_StdMouseHandler.onclick;
		window.document.onmousemove = quake__$IN_StdMouseHandler.onmousemove;
		window.document.onpointerlockchange = quake__$IN_StdMouseHandler.onpointerlockchange;
		return quake__$IN_StdMouseHandler.detach;
	}
	return null;
};
quake__$IN_StdMouseHandler.detach = function() {
	quake_VID.mainwindow.onclick = null;
	window.document.onmousemove = null;
	window.document.onpointerlockchange = null;
};
quake__$IN_StdMouseHandler.onclick = function() {
	if(window.document.pointerLockElement != quake_VID.mainwindow) quake_VID.mainwindow.requestPointerLock();
};
quake__$IN_StdMouseHandler.onmousemove = function(e) {
	if(window.document.pointerLockElement != quake_VID.mainwindow) return;
	quake_IN.mouse_x += e.movementX;
	quake_IN.mouse_y += e.movementY;
};
quake__$IN_StdMouseHandler.onpointerlockchange = function() {
	if(window.document.pointerLockElement == quake_VID.mainwindow) return;
	quake_Key.Event(27,true);
	quake_Key.Event(27,false);
};
var quake__$IN_MozMouseHandler = function() { };
quake__$IN_MozMouseHandler.__name__ = true;
quake__$IN_MozMouseHandler.attach = function() {
	if(quake_VID.mainwindow.mozRequestPointerLock != null) {
		quake_VID.mainwindow.onclick = quake__$IN_MozMouseHandler.onclick;
		window.document.onmousemove = quake__$IN_MozMouseHandler.onmousemove;
		window.document.onmozpointerlockchange = quake__$IN_MozMouseHandler.onmozpointerlockchange;
		return quake__$IN_MozMouseHandler.detach;
	}
	return null;
};
quake__$IN_MozMouseHandler.detach = function() {
	quake_VID.mainwindow.onclick = null;
	window.document.onmousemove = null;
	window.document.onmozpointerlockchange = null;
};
quake__$IN_MozMouseHandler.onclick = function() {
	if(window.document.mozPointerLockElement != quake_VID.mainwindow) quake_VID.mainwindow.mozRequestPointerLock();
};
quake__$IN_MozMouseHandler.onmousemove = function(e) {
	if(window.document.mozPointerLockElement != quake_VID.mainwindow) return;
	quake_IN.mouse_x += e.mozMovementX;
	quake_IN.mouse_y += e.mozMovementY;
};
quake__$IN_MozMouseHandler.onmozpointerlockchange = function() {
	if(window.document.mozPointerLockElement == quake_VID.mainwindow) return;
	quake_Key.Event(27,true);
	quake_Key.Event(27,false);
};
var quake__$IN_WebkitMouseHandler = function() { };
quake__$IN_WebkitMouseHandler.__name__ = true;
quake__$IN_WebkitMouseHandler.attach = function() {
	if(quake_VID.mainwindow.webkitRequestPointerLock != null) {
		quake_VID.mainwindow.onclick = quake__$IN_WebkitMouseHandler.onclick;
		window.document.onmousemove = quake__$IN_WebkitMouseHandler.onmousemove;
		window.document.onwebkitpointerlockchange = quake__$IN_WebkitMouseHandler.onwebkitpointerlockchange;
		return quake__$IN_WebkitMouseHandler.detach;
	}
	return null;
};
quake__$IN_WebkitMouseHandler.detach = function() {
	quake_VID.mainwindow.onclick = null;
	window.document.onmousemove = null;
	window.document.onwebkitpointerlockchange = null;
};
quake__$IN_WebkitMouseHandler.onclick = function() {
	if(window.document.webkitPointerLockElement != quake_VID.mainwindow) quake_VID.mainwindow.webkitRequestPointerLock();
};
quake__$IN_WebkitMouseHandler.onmousemove = function(e) {
	if(window.document.webkitPointerLockElement != quake_VID.mainwindow) return;
	quake_IN.mouse_x += e.webkitMovementX;
	quake_IN.mouse_y += e.webkitMovementY;
};
quake__$IN_WebkitMouseHandler.onwebkitpointerlockchange = function() {
	if(window.document.webkitPointerLockElement == quake_VID.mainwindow) return;
	quake_Key.Event(27,true);
	quake_Key.Event(27,false);
};
var quake_IN = function() { };
quake_IN.__name__ = true;
quake_IN.Init = function() {
	quake_IN.m_filter = quake_Cvar.RegisterVariable("m_filter","1");
	if(quake_COM.CheckParm("-nomouse") != null) return;
	quake_IN.detachMouseHandler = quake_IN.attachMouseHandler();
	if(quake_IN.detachMouseHandler != null) quake_IN.mouse_avail = true;
};
quake_IN.attachMouseHandler = function() {
	var detach = quake__$IN_StdMouseHandler.attach();
	if(detach == null) detach = quake__$IN_MozMouseHandler.attach();
	if(detach == null) detach = quake__$IN_WebkitMouseHandler.attach();
	return detach;
};
quake_IN.Shutdown = function() {
	if(quake_IN.detachMouseHandler != null) quake_IN.detachMouseHandler();
};
quake_IN.Move = function() {
	if(!quake_IN.mouse_avail) return;
	var mouse_x;
	var mouse_y;
	if(quake_IN.m_filter.value != 0) {
		mouse_x = (quake_IN.mouse_x + quake_IN.old_mouse_x) * 0.5;
		mouse_y = (quake_IN.mouse_y + quake_IN.old_mouse_y) * 0.5;
	} else {
		mouse_x = quake_IN.mouse_x;
		mouse_y = quake_IN.mouse_y;
	}
	quake_IN.old_mouse_x = quake_IN.mouse_x;
	quake_IN.old_mouse_y = quake_IN.mouse_y;
	mouse_x *= quake_CL.sensitivity.value;
	mouse_y *= quake_CL.sensitivity.value;
	var strafe = quake_CL.kbuttons[quake_CL.kbutton.strafe].state & 1;
	var mlook = quake_CL.kbuttons[quake_CL.kbutton.mlook].state & 1;
	var angles = quake_CL.state.viewangles;
	if(strafe != 0 || quake_CL.lookstrafe.value != 0 && mlook != 0) quake_CL.state.cmd.sidemove += quake_CL.m_side.value * mouse_x; else angles[1] = angles[1] - quake_CL.m_yaw.value * mouse_x;
	if(mlook != 0) quake_V.StopPitchDrift();
	if(mlook != 0 && strafe == 0) {
		angles[0] = angles[0] + quake_CL.m_pitch.value * mouse_y;
		if(angles[0] > 80.0) angles[0] = 80.0; else if(angles[0] < -70.0) angles[0] = -70.0;
	} else if(strafe != 0 && quake_Host.noclip_anglehack) quake_CL.state.cmd.upmove -= quake_CL.m_forward.value * mouse_y; else quake_CL.state.cmd.forwardmove -= quake_CL.m_forward.value * mouse_y;
	quake_IN.mouse_x = quake_IN.mouse_y = 0;
};
var quake_Key = function() { };
quake_Key.__name__ = true;
quake_Key.ProcessConsole = function(key) {
	if(key == 13) {
		quake_Cmd.text += quake_Key.edit_line + "\n";
		quake_Console.Print("]" + quake_Key.edit_line + "\n");
		quake_Key.lines.push(quake_Key.edit_line);
		quake_Key.edit_line = "";
		quake_Key.history_line = quake_Key.lines.length;
		return;
	}
	if(key == 9) {
		var cmd = quake_Cmd.CompleteCommand(quake_Key.edit_line);
		if(cmd == null) cmd = quake_Cvar.CompleteVariable(quake_Key.edit_line);
		if(cmd == null) return;
		quake_Key.edit_line = cmd + " ";
		return;
	}
	if(key == 127 || key == 130) {
		if(quake_Key.edit_line.length > 0) quake_Key.edit_line = quake_Key.edit_line.substring(0,quake_Key.edit_line.length - 1);
		return;
	}
	if(key == 128) {
		if(--quake_Key.history_line < 0) quake_Key.history_line = 0;
		quake_Key.edit_line = quake_Key.lines[quake_Key.history_line];
		return;
	}
	if(key == 129) {
		if(quake_Key.history_line >= quake_Key.lines.length) return;
		if(++quake_Key.history_line >= quake_Key.lines.length) {
			quake_Key.history_line = quake_Key.lines.length;
			quake_Key.edit_line = "";
			return;
		}
		quake_Key.edit_line = quake_Key.lines[quake_Key.history_line];
		return;
	}
	if(key == 150) {
		quake_Console.backscroll += 2;
		if(quake_Console.backscroll > quake_Console.text.length) quake_Console.backscroll = quake_Console.text.length;
		return;
	}
	if(key == 149) {
		quake_Console.backscroll -= 2;
		if(quake_Console.backscroll < 0) quake_Console.backscroll = 0;
		return;
	}
	if(key == 151) {
		quake_Console.backscroll = quake_Console.text.length - 10;
		if(quake_Console.backscroll < 0) quake_Console.backscroll = 0;
		return;
	}
	if(key == 152) {
		quake_Console.backscroll = 0;
		return;
	}
	if(key < 32 || key > 127) return;
	quake_Key.edit_line += String.fromCharCode(key);
};
quake_Key.Message = function(key) {
	if(key == 13) {
		if(quake_Key.team_message) quake_Cmd.text += "say_team \"" + quake_Key.chat_buffer + "\"\n"; else quake_Cmd.text += "say \"" + quake_Key.chat_buffer + "\"\n";
		quake_Key.dest = 0;
		quake_Key.chat_buffer = "";
		return;
	}
	if(key == 27) {
		quake_Key.dest = 0;
		quake_Key.chat_buffer = "";
		return;
	}
	if(key < 32 || key > 127) return;
	if(key == 127) {
		if(quake_Key.chat_buffer.length != 0) quake_Key.chat_buffer = quake_Key.chat_buffer.substring(0,quake_Key.chat_buffer.length - 1);
		return;
	}
	if(quake_Key.chat_buffer.length >= 31) return;
	quake_Key.chat_buffer = quake_Key.chat_buffer + String.fromCharCode(key);
};
quake_Key.StringToKeynum = function(str) {
	if(str.length == 1) return HxOverrides.cca(str,0);
	str = str.toUpperCase();
	var _g = 0;
	var _g1 = quake_Key.names;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(k.name == str) return k.keynum;
	}
	return null;
};
quake_Key.KeynumToString = function(keynum) {
	if(keynum > 32 && keynum < 127) return String.fromCharCode(keynum);
	var _g = 0;
	var _g1 = quake_Key.names;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(k.keynum == keynum) return k.name;
	}
	return "<UNKNOWN KEYNUM>";
};
quake_Key.Unbind_f = function() {
	if(quake_Cmd.argv.length != 2) {
		quake_Console.Print("unbind <key> : remove commands from a key\n");
		return;
	}
	var b = quake_Key.StringToKeynum(quake_Cmd.argv[1]);
	if(b == null) {
		quake_Console.Print("\"" + quake_Cmd.argv[1] + "\" isn't a valid key\n");
		return;
	}
	quake_Key.bindings[b] = null;
};
quake_Key.Unbindall_f = function() {
	quake_Key.bindings = [];
};
quake_Key.Bind_f = function() {
	var c = quake_Cmd.argv.length;
	if(c != 2 && c != 3) {
		quake_Console.Print("bind <key> [command] : attach a command to a key\n");
		return;
	}
	var b = quake_Key.StringToKeynum(quake_Cmd.argv[1]);
	if(b == null) {
		quake_Console.Print("\"" + quake_Cmd.argv[1] + "\" isn't a valid key\n");
		return;
	}
	if(c == 2) {
		if(quake_Key.bindings[b] != null) quake_Console.Print("\"" + quake_Cmd.argv[1] + "\" = \"" + quake_Key.bindings[b] + "\"\n"); else quake_Console.Print("\"" + quake_Cmd.argv[1] + "\" is not bound\n");
		return;
	}
	var cmd = quake_Cmd.argv[2];
	var _g = 3;
	while(_g < c) {
		var i = _g++;
		cmd += " " + quake_Cmd.argv[i];
	}
	quake_Key.bindings[b] = cmd;
};
quake_Key.WriteBindings = function() {
	var f_b = "";
	var _g1 = 0;
	var _g = quake_Key.bindings.length;
	while(_g1 < _g) {
		var i = _g1++;
		var b = quake_Key.bindings[i];
		if(b != null) {
			var x = "bind \"" + quake_Key.KeynumToString(i) + "\" \"" + b + "\"\n";
			f_b += x == null?"null":"" + x;
		}
	}
	return f_b;
};
quake_Key.Init = function() {
	var _g = 32;
	while(_g < 128) {
		var i = _g++;
		quake_Key.consolekeys[i] = true;
	}
	quake_Key.consolekeys[13] = true;
	quake_Key.consolekeys[9] = true;
	quake_Key.consolekeys[130] = true;
	quake_Key.consolekeys[131] = true;
	quake_Key.consolekeys[128] = true;
	quake_Key.consolekeys[129] = true;
	quake_Key.consolekeys[127] = true;
	quake_Key.consolekeys[151] = true;
	quake_Key.consolekeys[152] = true;
	quake_Key.consolekeys[150] = true;
	quake_Key.consolekeys[149] = true;
	quake_Key.consolekeys[134] = true;
	quake_Key.consolekeys[96] = false;
	quake_Key.consolekeys[126] = false;
	var _g1 = 0;
	while(_g1 < 256) {
		var i1 = _g1++;
		quake_Key.shift[i1] = i1;
	}
	var _g2 = 97;
	while(_g2 < 123) {
		var i2 = _g2++;
		quake_Key.shift[i2] = i2 - 32;
	}
	quake_Key.shift[49] = 33;
	quake_Key.shift[50] = 64;
	quake_Key.shift[51] = 35;
	quake_Key.shift[52] = 36;
	quake_Key.shift[53] = 37;
	quake_Key.shift[54] = 94;
	quake_Key.shift[55] = 38;
	quake_Key.shift[56] = 42;
	quake_Key.shift[57] = 40;
	quake_Key.shift[48] = 41;
	quake_Key.shift[45] = 95;
	quake_Key.shift[61] = 43;
	quake_Key.shift[43] = 60;
	quake_Key.shift[46] = 62;
	quake_Key.shift[47] = 63;
	quake_Key.shift[59] = 58;
	quake_Key.shift[39] = 34;
	quake_Key.shift[91] = 123;
	quake_Key.shift[93] = 125;
	quake_Key.shift[96] = 126;
	quake_Key.shift[92] = 124;
	quake_Cmd.AddCommand("bind",quake_Key.Bind_f);
	quake_Cmd.AddCommand("unbind",quake_Key.Unbind_f);
	quake_Cmd.AddCommand("unbindall",quake_Key.Unbindall_f);
};
quake_Key.Event = function(key,down) {
	if(quake_CL.cls.state == 1) return;
	if(down) {
		if(key != 127 && key != 255 && quake_Key.down[key]) return;
		if(key >= 200 && quake_Key.bindings[key] == null) quake_Console.Print(quake_Key.KeynumToString(key) + " is unbound, hit F4 to set.\n");
	}
	quake_Key.down[key] = down;
	if(key == 134) quake_Key.shift_down = down;
	if(key == 27) {
		if(!down) return;
		if(quake_Key.dest == 2) quake_Key.Message(key); else if(quake_Key.dest == 3) quake_Menu.Keydown(key); else quake_Menu.ToggleMenu_f();
		return;
	}
	var kb;
	if(!down) {
		kb = quake_Key.bindings[key];
		if(kb != null) {
			if(HxOverrides.cca(kb,0) == 43) quake_Cmd.text += "-" + kb.substring(1) + " " + key + "\n";
		}
		if(quake_Key.shift[key] != key) {
			kb = quake_Key.bindings[quake_Key.shift[key]];
			if(kb != null) {
				if(HxOverrides.cca(kb,0) == 43) quake_Cmd.text += "-" + kb.substring(1) + " " + key + "\n";
			}
		}
		return;
	}
	if(quake_CL.cls.demoplayback && quake_Key.consolekeys[key] && quake_Key.dest == 0) {
		quake_Menu.ToggleMenu_f();
		return;
	}
	if(quake_Key.dest == 3 && (key == 27 || key >= 135 && key <= 146) || quake_Key.dest == 1 && !quake_Key.consolekeys[key] || quake_Key.dest == 0 && (!quake_Console.forcedup || !quake_Key.consolekeys[key])) {
		kb = quake_Key.bindings[key];
		if(kb != null) {
			if(HxOverrides.cca(kb,0) == 43) quake_Cmd.text += kb + " " + key + "\n"; else quake_Cmd.text += kb + "\n";
		}
		return;
	}
	if(quake_Key.shift_down) key = quake_Key.shift[key];
	if(quake_Key.dest == 2) quake_Key.Message(key); else if(quake_Key.dest == 3) quake_Menu.Keydown(key); else quake_Key.ProcessConsole(key);
};
var quake_Menu = function() { };
quake_Menu.__name__ = true;
quake_Menu.DrawCharacter = function(cx,line,num) {
	quake_Draw.Character(cx + (quake_VID.width >> 1) - 160,line + (quake_VID.height >> 1) - 100,num);
};
quake_Menu.Print = function(cx,cy,str) {
	quake_Draw.StringWhite(cx + (quake_VID.width >> 1) - 160,cy + (quake_VID.height >> 1) - 100,str);
};
quake_Menu.PrintWhite = function(cx,cy,str) {
	quake_Draw.String(cx + (quake_VID.width >> 1) - 160,cy + (quake_VID.height >> 1) - 100,str);
};
quake_Menu.DrawPic = function(x,y,pic) {
	quake_Draw.Pic(x + (quake_VID.width >> 1) - 160,y + (quake_VID.height >> 1) - 100,pic);
};
quake_Menu.DrawPicTranslate = function(x,y,pic,top,bottom) {
	quake_Draw.PicTranslate(x + (quake_VID.width >> 1) - 160,y + (quake_VID.height >> 1) - 100,pic,top,bottom);
};
quake_Menu.DrawTextBox = function(x,y,width,lines) {
	var cx;
	var cy = y;
	quake_Menu.DrawPic(x,cy,quake_Menu.box_tl);
	var _g = 0;
	while(_g < lines) {
		_g++;
		quake_Menu.DrawPic(x,cy += 8,quake_Menu.box_ml);
	}
	quake_Menu.DrawPic(x,cy + 8,quake_Menu.box_bl);
	cx = x + 8;
	var p;
	while(width > 0) {
		cy = y;
		quake_Menu.DrawPic(cx,y,quake_Menu.box_tm);
		p = quake_Menu.box_mm;
		var _g1 = 0;
		while(_g1 < lines) {
			var n = _g1++;
			quake_Menu.DrawPic(cx,cy += 8,p);
			if(n == 0) p = quake_Menu.box_mm2;
		}
		quake_Menu.DrawPic(cx,cy + 8,quake_Menu.box_bm);
		width -= 2;
		cx += 16;
	}
	cy = y;
	quake_Menu.DrawPic(cx,cy,quake_Menu.box_tr);
	var _g2 = 0;
	while(_g2 < lines) {
		_g2++;
		quake_Menu.DrawPic(cx,cy += 8,quake_Menu.box_mr);
	}
	quake_Menu.DrawPic(cx,cy + 8,quake_Menu.box_br);
};
quake_Menu.ToggleMenu_f = function() {
	quake_Menu.entersound = true;
	if(quake_Key.dest == 3) {
		if(quake_Menu.state != 1) {
			quake_Menu.Menu_Main_f();
			return;
		}
		quake_Key.dest = 0;
		quake_Menu.state = 0;
		return;
	}
	quake_Menu.Menu_Main_f();
};
quake_Menu.Menu_Main_f = function() {
	if(quake_Key.dest != 3) {
		quake_Menu.save_demonum = quake_CL.cls.demonum;
		quake_CL.cls.demonum = -1;
	}
	quake_Key.dest = 3;
	quake_Menu.state = 1;
	quake_Menu.entersound = true;
};
quake_Menu.Main_Draw = function() {
	quake_Menu.DrawPic(16,4,quake_Menu.qplaque);
	quake_Menu.DrawPic(160 - (quake_Menu.ttl_main.width >> 1),4,quake_Menu.ttl_main);
	quake_Menu.DrawPic(72,32,quake_Menu.mainmenu);
	quake_Menu.DrawPic(54,32 + quake_Menu.main_cursor * 20,quake_Menu.menudot[Math.floor(quake_Host.realtime * 10.0) % 6]);
};
quake_Menu.Main_Key = function(k) {
	switch(k) {
	case 27:
		quake_Key.dest = 0;
		quake_Menu.state = 0;
		quake_CL.cls.demonum = quake_Menu.save_demonum;
		if(quake_CL.cls.demonum != -1 && !quake_CL.cls.demoplayback && quake_CL.cls.state != 2) quake_CL.NextDemo();
		break;
	case 129:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.main_cursor >= 5) quake_Menu.main_cursor = 0;
		break;
	case 128:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.main_cursor < 0) quake_Menu.main_cursor = 4;
		break;
	case 13:
		quake_Menu.entersound = true;
		var _g = quake_Menu.main_cursor;
		switch(_g) {
		case 0:
			quake_Menu.Menu_SinglePlayer_f();
			break;
		case 1:
			quake_Menu.Menu_MultiPlayer_f();
			break;
		case 2:
			quake_Menu.Menu_Options_f();
			break;
		case 3:
			quake_Menu.Menu_Help_f();
			break;
		case 4:
			quake_Menu.Menu_Quit_f();
			break;
		}
		break;
	default:
	}
};
quake_Menu.Menu_SinglePlayer_f = function() {
	quake_Key.dest = 3;
	quake_Menu.state = 2;
	quake_Menu.entersound = true;
};
quake_Menu.SinglePlayer_Draw = function() {
	quake_Menu.DrawPic(16,4,quake_Menu.qplaque);
	quake_Menu.DrawPic(160 - (quake_Menu.ttl_sgl.width >> 1),4,quake_Menu.ttl_sgl);
	quake_Menu.DrawPic(72,32,quake_Menu.sp_menu);
	quake_Menu.DrawPic(54,32 + quake_Menu.singleplayer_cursor * 20,quake_Menu.menudot[Math.floor(quake_Host.realtime * 10.0) % 6]);
};
quake_Menu.SinglePlayer_Key = function(k) {
	switch(k) {
	case 27:
		quake_Menu.Menu_Main_f();
		break;
	case 129:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.singleplayer_cursor >= 3) quake_Menu.singleplayer_cursor = 0;
		break;
	case 128:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.singleplayer_cursor < 0) quake_Menu.singleplayer_cursor = 2;
		break;
	case 13:
		quake_Menu.entersound = true;
		var _g = quake_Menu.singleplayer_cursor;
		switch(_g) {
		case 0:
			if(quake_SV.server.active) {
				if(!window.confirm("Are you sure you want to start a new game?")) return;
				quake_Cmd.text += "disconnect\n";
			}
			quake_Key.dest = 0;
			quake_Cmd.text += "maxplayers 1\nmap start\n";
			break;
		case 1:
			quake_Menu.Menu_Load_f();
			break;
		case 2:
			quake_Menu.Menu_Save_f();
			break;
		}
		break;
	}
};
quake_Menu.ScanSaves = function() {
	var searchpaths = quake_COM.searchpaths;
	var search = "Quake." + quake_COM.gamedir[0].filename + "/s";
	quake_COM.searchpaths = quake_COM.gamedir;
	var _g1 = 0;
	var _g = quake_Menu.max_savegames;
	while(_g1 < _g) {
		var i = _g1++;
		var f = quake_Menu.localStorage.getItem(search + i + ".sav");
		if(f != null) quake_Menu.removable[i] = true; else {
			quake_Menu.removable[i] = false;
			f = quake_COM.LoadTextFile("s" + i + ".sav");
			if(f == null) {
				quake_Menu.filenames[i] = "--- UNUSED SLOT ---";
				quake_Menu.loadable[i] = false;
				continue;
			}
		}
		var version = 0;
		while(version < f.length) {
			var tmp;
			var index = version++;
			tmp = HxOverrides.cca(f,index);
			var c = tmp;
			if(c == 10) break;
		}
		var name = [];
		var _g2 = 0;
		while(_g2 < 40) {
			var j = _g2++;
			var c1 = HxOverrides.cca(f,version + j);
			if(c1 == 13) break;
			if(c1 == 95) name[j] = " "; else name[j] = String.fromCharCode(c1);
		}
		quake_Menu.filenames[i] = name.join("");
		quake_Menu.loadable[i] = true;
	}
	quake_COM.searchpaths = searchpaths;
};
quake_Menu.Menu_Load_f = function() {
	quake_Menu.entersound = true;
	quake_Menu.state = 3;
	quake_Key.dest = 3;
	quake_Menu.ScanSaves();
};
quake_Menu.Menu_Save_f = function() {
	if(!quake_SV.server.active || quake_CL.state.intermission != 0 || quake_SV.svs.maxclients != 1) return;
	quake_Menu.entersound = true;
	quake_Menu.state = 4;
	quake_Key.dest = 3;
	quake_Menu.ScanSaves();
};
quake_Menu.Load_Draw = function() {
	quake_Menu.DrawPic(160 - (quake_Menu.p_load.width >> 1),4,quake_Menu.p_load);
	var _g1 = 0;
	var _g = quake_Menu.max_savegames;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Menu.Print(16,32 + (i << 3),quake_Menu.filenames[i]);
	}
	quake_Menu.DrawCharacter(8,32 + (quake_Menu.load_cursor << 3),12 + ((quake_Host.realtime * 4 | 0) & 1));
};
quake_Menu.Save_Draw = function() {
	quake_Menu.DrawPic(160 - (quake_Menu.p_save.width >> 1),4,quake_Menu.p_save);
	var _g1 = 0;
	var _g = quake_Menu.max_savegames;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Menu.Print(16,32 + (i << 3),quake_Menu.filenames[i]);
	}
	quake_Menu.DrawCharacter(8,32 + (quake_Menu.load_cursor << 3),12 + ((quake_Host.realtime * 4 | 0) & 1));
};
quake_Menu.Load_Key = function(k) {
	switch(k) {
	case 27:
		quake_Menu.Menu_SinglePlayer_f();
		break;
	case 13:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu2,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(!quake_Menu.loadable[quake_Menu.load_cursor]) return;
		quake_Menu.state = 0;
		quake_Key.dest = 0;
		quake_SCR.BeginLoadingPlaque();
		quake_Cmd.text += "load s" + quake_Menu.load_cursor + "\n";
		break;
	case 128:case 130:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.load_cursor < 0) quake_Menu.load_cursor = quake_Menu.max_savegames - 1;
		break;
	case 129:case 131:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.load_cursor >= quake_Menu.max_savegames) quake_Menu.load_cursor = 0;
		return;
	case 148:
		if(!quake_Menu.removable[quake_Menu.load_cursor]) return;
		if(!window.confirm("Delete selected game?")) return;
		quake_Menu.localStorage.removeItem("Quake." + quake_COM.gamedir[0].filename + "/s" + quake_Menu.load_cursor + ".sav");
		quake_Menu.ScanSaves();
		break;
	default:
	}
};
quake_Menu.Save_Key = function(k) {
	switch(k) {
	case 27:
		quake_Menu.Menu_SinglePlayer_f();
		break;
	case 13:
		quake_Menu.state = 0;
		quake_Key.dest = 0;
		quake_Cmd.text += "save s" + quake_Menu.load_cursor + "\n";
		break;
	case 128:case 130:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.load_cursor < 0) quake_Menu.load_cursor = quake_Menu.max_savegames - 1;
		break;
	case 129:case 131:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.load_cursor >= quake_Menu.max_savegames) quake_Menu.load_cursor = 0;
		break;
	case 148:
		if(!quake_Menu.removable[quake_Menu.load_cursor]) return;
		if(!window.confirm("Delete selected game?")) return;
		quake_Menu.localStorage.removeItem("Quake." + quake_COM.gamedir[0].filename + "/s" + quake_Menu.load_cursor + ".sav");
		quake_Menu.ScanSaves();
		break;
	default:
	}
};
quake_Menu.Menu_MultiPlayer_f = function() {
	quake_Key.dest = 3;
	quake_Menu.state = 5;
	quake_Menu.entersound = true;
	quake_Menu.multiplayer_myname = quake_CL.$name.string;
	quake_Menu.multiplayer_top = quake_Menu.multiplayer_oldtop = (quake_CL.color.value | 0) >> 4;
	quake_Menu.multiplayer_bottom = quake_Menu.multiplayer_oldbottom = (quake_CL.color.value | 0) & 15;
};
quake_Menu.MultiPlayer_Draw = function() {
	quake_Menu.DrawPic(16,4,quake_Menu.qplaque);
	quake_Menu.DrawPic(160 - (quake_Menu.p_multi.width >> 1),4,quake_Menu.p_multi);
	quake_Menu.Print(64,40,"Join game at:");
	quake_Menu.DrawTextBox(72,48,22,1);
	quake_Menu.Print(80,56,quake_Menu.multiplayer_joinname.substring(quake_Menu.multiplayer_joinname.length - 21));
	quake_Menu.Print(64,72,"Your name");
	quake_Menu.DrawTextBox(160,64,16,1);
	quake_Menu.Print(168,72,quake_Menu.multiplayer_myname);
	quake_Menu.Print(64,96,"Shirt color");
	quake_Menu.Print(64,120,"Pants color");
	quake_Menu.DrawTextBox(64,148,14,1);
	quake_Menu.Print(72,156,"Accept Changes");
	quake_Menu.DrawPic(160,80,quake_Menu.bigbox);
	quake_Menu.DrawPicTranslate(172,88,quake_Menu.menuplyr,(quake_Menu.multiplayer_top << 4) + (quake_Menu.multiplayer_top >= 8?4:11),(quake_Menu.multiplayer_bottom << 4) + (quake_Menu.multiplayer_bottom >= 8?4:11));
	quake_Menu.DrawCharacter(56,quake_Menu.multiplayer_cursor_table[quake_Menu.multiplayer_cursor],12 + ((quake_Host.realtime * 4 | 0) & 1));
	if(quake_Menu.multiplayer_cursor == 0) quake_Menu.DrawCharacter(quake_Menu.multiplayer_joinname.length <= 20?80 + (quake_Menu.multiplayer_joinname.length << 3):248,56,10 + ((quake_Host.realtime * 4 | 0) & 1)); else if(quake_Menu.multiplayer_cursor == 1) quake_Menu.DrawCharacter(168 + (quake_Menu.multiplayer_myname.length << 3),72,10 + ((quake_Host.realtime * 4 | 0) & 1));
	if(!quake_NET_$WEBS.available) quake_Menu.PrintWhite(52,172,"No Communications Available");
};
quake_Menu.MultiPlayer_Key = function(k) {
	if(k == 27) quake_Menu.Menu_Main_f();
	switch(k) {
	case 128:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.multiplayer_cursor < 0) quake_Menu.multiplayer_cursor = 4;
		return;
	case 129:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.multiplayer_cursor >= 5) quake_Menu.multiplayer_cursor = 0;
		return;
	case 130:
		if(quake_Menu.multiplayer_cursor == 2) {
			if(--quake_Menu.multiplayer_top < 0) quake_Menu.multiplayer_top = 13;
			quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu3,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		} else if(quake_Menu.multiplayer_cursor == 3) {
			if(--quake_Menu.multiplayer_bottom < 0) quake_Menu.multiplayer_bottom = 13;
			quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu3,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		}
		return;
	case 131:
		if(quake_Menu.multiplayer_cursor == 2) {
			if(quake_Menu.multiplayer_top <= 12) ++quake_Menu.multiplayer_top; else quake_Menu.multiplayer_top = 0;
		} else if(quake_Menu.multiplayer_cursor == 3) {
			if(quake_Menu.multiplayer_bottom <= 12) ++quake_Menu.multiplayer_bottom; else quake_Menu.multiplayer_bottom = 0;
		} else return;
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu3,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		return;
	case 13:
		var _g = quake_Menu.multiplayer_cursor;
		switch(_g) {
		case 0:
			quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu2,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
			if(!quake_NET_$WEBS.available) return;
			quake_Key.dest = 0;
			quake_Menu.state = 0;
			quake_Cmd.text += "connect \"";
			if(quake_Menu.multiplayer_joinname.substring(0,5) != "ws://") quake_Cmd.text += "ws://";
			quake_Cmd.text += quake_Menu.multiplayer_joinname + "\"\n";
			break;
		case 2:
			quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu3,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
			if(quake_Menu.multiplayer_top <= 12) ++quake_Menu.multiplayer_top; else quake_Menu.multiplayer_top = 0;
			break;
		case 3:
			quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu3,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
			if(quake_Menu.multiplayer_bottom <= 12) ++quake_Menu.multiplayer_bottom; else quake_Menu.multiplayer_bottom = 0;
			break;
		case 4:
			if(quake_CL.$name.string != quake_Menu.multiplayer_myname) quake_Cmd.text += "name \"" + quake_Menu.multiplayer_myname + "\"\n";
			if(quake_Menu.multiplayer_top != quake_Menu.multiplayer_oldtop || quake_Menu.multiplayer_bottom != quake_Menu.multiplayer_oldbottom) {
				quake_Menu.multiplayer_oldtop = quake_Menu.multiplayer_top;
				quake_Menu.multiplayer_oldbottom = quake_Menu.multiplayer_bottom;
				quake_Cmd.text += "color " + quake_Menu.multiplayer_top + " " + quake_Menu.multiplayer_bottom + "\n";
			}
			quake_Menu.entersound = true;
			break;
		}
		break;
	case 127:
		if(quake_Menu.multiplayer_cursor == 0) {
			if(quake_Menu.multiplayer_joinname.length != 0) quake_Menu.multiplayer_joinname = quake_Menu.multiplayer_joinname.substring(0,quake_Menu.multiplayer_joinname.length - 1);
			return;
		}
		if(quake_Menu.multiplayer_cursor == 1) {
			if(quake_Menu.multiplayer_myname.length != 0) quake_Menu.multiplayer_myname = quake_Menu.multiplayer_myname.substring(0,quake_Menu.multiplayer_myname.length - 1);
		}
		return;
	default:
	}
	if(k < 32 || k > 127) return;
	if(quake_Menu.multiplayer_cursor == 0) {
		quake_Menu.multiplayer_joinname += String.fromCharCode(k);
		return;
	}
	if(quake_Menu.multiplayer_cursor == 1) {
		if(quake_Menu.multiplayer_myname.length <= 14) quake_Menu.multiplayer_myname += String.fromCharCode(k);
	}
};
quake_Menu.Menu_Options_f = function() {
	quake_Key.dest = 3;
	quake_Menu.state = 6;
	quake_Menu.entersound = true;
};
quake_Menu.AdjustSliders = function(dir) {
	quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu3,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
	var _g = quake_Menu.options_cursor;
	switch(_g) {
	case 3:
		quake_SCR.viewsize.value += dir * 10;
		if(quake_SCR.viewsize.value < 30) quake_SCR.viewsize.value = 30; else if(quake_SCR.viewsize.value > 120) quake_SCR.viewsize.value = 120;
		quake_SCR.viewsize.setValue(quake_SCR.viewsize.value);
		return;
	case 4:
		quake_V.gamma.value -= dir * 0.05;
		if(quake_V.gamma.value < 0.5) quake_V.gamma.value = 0.5; else if(quake_V.gamma.value > 1.0) quake_V.gamma.value = 1.0;
		quake_V.gamma.setValue(quake_V.gamma.value);
		return;
	case 5:
		quake_CL.sensitivity.value += dir * 0.5;
		if(quake_CL.sensitivity.value < 1.0) quake_CL.sensitivity.value = 1.0; else if(quake_CL.sensitivity.value > 11.0) quake_CL.sensitivity.value = 11.0;
		quake_CL.sensitivity.setValue(quake_CL.sensitivity.value);
		return;
	case 6:
		quake_S.bgmvolume.value += dir * 0.1;
		if(quake_S.bgmvolume.value < 0.0) quake_S.bgmvolume.value = 0.0; else if(quake_S.bgmvolume.value > 1.0) quake_S.bgmvolume.value = 1.0;
		quake_S.bgmvolume.setValue(quake_S.bgmvolume.value);
		return;
	case 7:
		quake_S.volume.value += dir * 0.1;
		if(quake_S.volume.value < 0.0) quake_S.volume.value = 0.0; else if(quake_S.volume.value > 1.0) quake_S.volume.value = 1.0;
		quake_S.volume.setValue(quake_S.volume.value);
		return;
	case 8:
		if(quake_CL.forwardspeed.value > 200.0) {
			quake_CL.forwardspeed.setValue(200);
			quake_CL.backspeed.setValue(200);
			return;
		}
		quake_CL.forwardspeed.setValue(400);
		quake_CL.backspeed.setValue(400);
		return;
	case 9:
		quake_CL.m_pitch.setValue(-quake_CL.m_pitch.value);
		return;
	case 10:
		quake_CL.lookspring.setValue(quake_CL.lookspring.value != 0?0:1);
		return;
	case 11:
		quake_CL.lookstrafe.setValue(quake_CL.lookstrafe.value != 0?0:1);
		break;
	}
};
quake_Menu.DrawSlider = function(x,y,range) {
	if(range < 0) range = 0; else if(range > 1) range = 1;
	quake_Menu.DrawCharacter(x - 8,y,128);
	quake_Menu.DrawCharacter(x,y,129);
	quake_Menu.DrawCharacter(x + 8,y,129);
	quake_Menu.DrawCharacter(x + 16,y,129);
	quake_Menu.DrawCharacter(x + 24,y,129);
	quake_Menu.DrawCharacter(x + 32,y,129);
	quake_Menu.DrawCharacter(x + 40,y,129);
	quake_Menu.DrawCharacter(x + 48,y,129);
	quake_Menu.DrawCharacter(x + 56,y,129);
	quake_Menu.DrawCharacter(x + 64,y,129);
	quake_Menu.DrawCharacter(x + 72,y,129);
	quake_Menu.DrawCharacter(x + 80,y,130);
	quake_Menu.DrawCharacter(x + Math.floor(72 * range),y,131);
};
quake_Menu.Options_Draw = function() {
	quake_Menu.DrawPic(16,4,quake_Menu.qplaque);
	quake_Menu.DrawPic(160 - (quake_Menu.p_option.width >> 1),4,quake_Menu.p_option);
	quake_Menu.Print(48,32,"Customize controls");
	quake_Menu.Print(88,40,"Go to console");
	quake_Menu.Print(56,48,"Reset to defaults");
	quake_Menu.Print(104,56,"Screen size");
	quake_Menu.DrawSlider(220,56,(quake_SCR.viewsize.value - 30) / 90);
	quake_Menu.Print(112,64,"Brightness");
	quake_Menu.DrawSlider(220,64,(1.0 - quake_V.gamma.value) * 2.0);
	quake_Menu.Print(104,72,"Mouse Speed");
	quake_Menu.DrawSlider(220,72,(quake_CL.sensitivity.value - 1) / 10);
	quake_Menu.Print(72,80,"CD Music Volume");
	quake_Menu.DrawSlider(220,80,quake_S.bgmvolume.value);
	quake_Menu.Print(96,88,"Sound Volume");
	quake_Menu.DrawSlider(220,88,quake_S.volume.value);
	quake_Menu.Print(112,96,"Always Run");
	quake_Menu.Print(220,96,quake_CL.forwardspeed.value > 200.0?"on":"off");
	quake_Menu.Print(96,104,"Invert Mouse");
	quake_Menu.Print(220,104,quake_CL.m_pitch.value < 0.0?"on":"off");
	quake_Menu.Print(112,112,"Lookspring");
	quake_Menu.Print(220,112,quake_CL.lookspring.value != 0?"on":"off");
	quake_Menu.Print(112,120,"Lookstrafe");
	quake_Menu.Print(220,120,quake_CL.lookstrafe.value != 0?"on":"off");
	quake_Menu.DrawCharacter(200,32 + (quake_Menu.options_cursor << 3),12 + ((quake_Host.realtime * 4 | 0) & 1));
};
quake_Menu.Options_Key = function(k) {
	switch(k) {
	case 27:
		quake_Menu.Menu_Main_f();
		return;
	case 13:
		quake_Menu.entersound = true;
		var _g = quake_Menu.options_cursor;
		switch(_g) {
		case 0:
			quake_Menu.Menu_Keys_f();
			return;
		case 1:
			quake_Menu.state = 0;
			quake_Console.ToggleConsole_f();
			return;
		case 2:
			quake_Cmd.text += "exec default.cfg\n";
			return;
		default:
			quake_Menu.AdjustSliders(1);
		}
		return;
	case 128:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.options_cursor < 0) quake_Menu.options_cursor = 11;
		return;
	case 129:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.options_cursor >= 12) quake_Menu.options_cursor = 0;
		return;
	case 130:
		quake_Menu.AdjustSliders(-1);
		return;
	case 131:
		quake_Menu.AdjustSliders(1);
		break;
	}
};
quake_Menu.Menu_Keys_f = function() {
	quake_Key.dest = 3;
	quake_Menu.state = 7;
	quake_Menu.entersound = true;
};
quake_Menu.FindKeysForCommand = function(command) {
	var twokeys = [];
	var _g1 = 0;
	var _g = quake_Key.bindings.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_Key.bindings[i] == command) {
			twokeys.push(i);
			if(twokeys.length == 2) return twokeys;
		}
	}
	return twokeys;
};
quake_Menu.UnbindCommand = function(command) {
	var _g1 = 0;
	var _g = quake_Key.bindings.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_Key.bindings[i] == command) quake_Key.bindings[i] = null;
	}
};
quake_Menu.Keys_Draw = function() {
	quake_Menu.DrawPic(160 - (quake_Menu.ttl_cstm.width >> 1),4,quake_Menu.ttl_cstm);
	if(quake_Menu.bind_grab) {
		quake_Menu.Print(12,32,"Press a key or button for this action");
		quake_Menu.DrawCharacter(130,48 + (quake_Menu.keys_cursor << 3),61);
	} else {
		quake_Menu.Print(18,32,"Enter to change, backspace to clear");
		quake_Menu.DrawCharacter(130,48 + (quake_Menu.keys_cursor << 3),12 + ((quake_Host.realtime * 4 | 0) & 1));
	}
	var y = 48;
	var _g1 = 0;
	var _g = quake_Menu.bindnames.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Menu.Print(16,y,quake_Menu.bindnames[i][1]);
		var keys = quake_Menu.FindKeysForCommand(quake_Menu.bindnames[i][0]);
		if(keys[0] == null) quake_Menu.Print(140,y,"???"); else {
			var name = quake_Key.KeynumToString(keys[0]);
			if(keys[1] != null) name += " or " + quake_Key.KeynumToString(keys[1]);
			quake_Menu.Print(140,y,name);
		}
		y += 8;
	}
};
quake_Menu.Keys_Key = function(k) {
	if(quake_Menu.bind_grab) {
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(k != 27 && k != 96) quake_Cmd.text = "bind \"" + quake_Key.KeynumToString(k) + "\" \"" + quake_Menu.bindnames[quake_Menu.keys_cursor][0] + "\"\n" + quake_Cmd.text;
		quake_Menu.bind_grab = false;
		return;
	}
	switch(k) {
	case 27:
		quake_Menu.Menu_Options_f();
		break;
	case 130:case 128:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(--quake_Menu.keys_cursor < 0) quake_Menu.keys_cursor = quake_Menu.bindnames.length - 1;
		break;
	case 129:case 131:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu1,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(++quake_Menu.keys_cursor >= quake_Menu.bindnames.length) quake_Menu.keys_cursor = 0;
		break;
	case 13:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu2,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		if(quake_Menu.FindKeysForCommand(quake_Menu.bindnames[quake_Menu.keys_cursor][0])[1] != null) quake_Menu.UnbindCommand(quake_Menu.bindnames[quake_Menu.keys_cursor][0]);
		quake_Menu.bind_grab = true;
		break;
	case 127:case 148:
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu2,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		quake_Menu.UnbindCommand(quake_Menu.bindnames[quake_Menu.keys_cursor][0]);
		break;
	default:
	}
};
quake_Menu.Menu_Help_f = function() {
	quake_Key.dest = 3;
	quake_Menu.state = 8;
	quake_Menu.entersound = true;
	quake_Menu.help_page = 0;
};
quake_Menu.Help_Draw = function() {
	quake_Menu.DrawPic(0,0,quake_Menu.help_pages[quake_Menu.help_page]);
};
quake_Menu.Help_Key = function(k) {
	switch(k) {
	case 27:
		quake_Menu.Menu_Main_f();
		return;
	case 128:
		break;
	case 131:
		quake_Menu.entersound = true;
		if(++quake_Menu.help_page >= 6) quake_Menu.help_page = 0;
		return;
	case 129:
		break;
	case 130:
		quake_Menu.entersound = true;
		if(--quake_Menu.help_page < 0) quake_Menu.help_page = 5;
		break;
	}
};
quake_Menu.Menu_Quit_f = function() {
	if(quake_Menu.state == 9) return;
	quake_Menu.wasInMenus = quake_Key.dest == 3;
	quake_Key.dest = 3;
	quake_Menu.quit_prevstate = quake_Menu.state;
	quake_Menu.state = 9;
	quake_Menu.entersound = true;
	quake_Menu.msgNumber = Math.floor(Math.random() * quake_Menu.quitMessage.length);
};
quake_Menu.Quit_Draw = function() {
	if(quake_Menu.wasInMenus) {
		quake_Menu.state = quake_Menu.quit_prevstate;
		quake_Menu.recursiveDraw = true;
		quake_Menu.DrawMenu();
		quake_Menu.state = 9;
	}
	quake_Menu.DrawTextBox(56,76,24,4);
	quake_Menu.Print(64,84,quake_Menu.quitMessage[quake_Menu.msgNumber][0]);
	quake_Menu.Print(64,92,quake_Menu.quitMessage[quake_Menu.msgNumber][1]);
	quake_Menu.Print(64,100,quake_Menu.quitMessage[quake_Menu.msgNumber][2]);
	quake_Menu.Print(64,108,quake_Menu.quitMessage[quake_Menu.msgNumber][3]);
};
quake_Menu.Quit_Key = function(k) {
	switch(k) {
	case 27:case 110:
		if(quake_Menu.wasInMenus) {
			quake_Menu.state = quake_Menu.quit_prevstate;
			quake_Menu.entersound = true;
		} else {
			quake_Key.dest = 0;
			quake_Menu.state = 0;
		}
		break;
	case 121:
		quake_Key.dest = 1;
		quake_Host.Quit_f();
		break;
	default:
	}
};
quake_Menu.Init = function() {
	quake_Cmd.AddCommand("togglemenu",quake_Menu.ToggleMenu_f);
	quake_Cmd.AddCommand("menu_main",quake_Menu.Menu_Main_f);
	quake_Cmd.AddCommand("menu_singleplayer",quake_Menu.Menu_SinglePlayer_f);
	quake_Cmd.AddCommand("menu_load",quake_Menu.Menu_Load_f);
	quake_Cmd.AddCommand("menu_save",quake_Menu.Menu_Save_f);
	quake_Cmd.AddCommand("menu_multiplayer",quake_Menu.Menu_MultiPlayer_f);
	quake_Cmd.AddCommand("menu_setup",quake_Menu.Menu_MultiPlayer_f);
	quake_Cmd.AddCommand("menu_options",quake_Menu.Menu_Options_f);
	quake_Cmd.AddCommand("menu_keys",quake_Menu.Menu_Keys_f);
	quake_Cmd.AddCommand("help",quake_Menu.Menu_Help_f);
	quake_Cmd.AddCommand("menu_quit",quake_Menu.Menu_Quit_f);
	quake_Menu.sfx_menu1 = quake_S.PrecacheSound("misc/menu1.wav");
	quake_Menu.sfx_menu2 = quake_S.PrecacheSound("misc/menu2.wav");
	quake_Menu.sfx_menu3 = quake_S.PrecacheSound("misc/menu3.wav");
	quake_Menu.box_tl = quake_Draw.CachePic("box_tl");
	quake_Menu.box_ml = quake_Draw.CachePic("box_ml");
	quake_Menu.box_bl = quake_Draw.CachePic("box_bl");
	quake_Menu.box_tm = quake_Draw.CachePic("box_tm");
	quake_Menu.box_mm = quake_Draw.CachePic("box_mm");
	quake_Menu.box_mm2 = quake_Draw.CachePic("box_mm2");
	quake_Menu.box_bm = quake_Draw.CachePic("box_bm");
	quake_Menu.box_tr = quake_Draw.CachePic("box_tr");
	quake_Menu.box_mr = quake_Draw.CachePic("box_mr");
	quake_Menu.box_br = quake_Draw.CachePic("box_br");
	quake_Menu.qplaque = quake_Draw.CachePic("qplaque");
	quake_Menu.menudot = [quake_Draw.CachePic("menudot1"),quake_Draw.CachePic("menudot2"),quake_Draw.CachePic("menudot3"),quake_Draw.CachePic("menudot4"),quake_Draw.CachePic("menudot5"),quake_Draw.CachePic("menudot6")];
	quake_Menu.ttl_main = quake_Draw.CachePic("ttl_main");
	quake_Menu.mainmenu = quake_Draw.CachePic("mainmenu");
	quake_Menu.ttl_sgl = quake_Draw.CachePic("ttl_sgl");
	quake_Menu.sp_menu = quake_Draw.CachePic("sp_menu");
	quake_Menu.p_load = quake_Draw.CachePic("p_load");
	quake_Menu.p_save = quake_Draw.CachePic("p_save");
	quake_Menu.p_multi = quake_Draw.CachePic("p_multi");
	quake_Menu.bigbox = quake_Draw.CachePic("bigbox");
	quake_Menu.menuplyr = quake_Draw.CachePic("menuplyr");
	quake_COM.LoadFile("gfx/menuplyr.lmp");
	var data = quake_GL.ResampleTexture(quake_Menu.menuplyr.data,quake_Menu.menuplyr.width,quake_Menu.menuplyr.height,64,64);
	var trans = new Uint8Array(new ArrayBuffer(16384));
	var _g = 0;
	while(_g < 4096) {
		var i = _g++;
		var p = data[i];
		if(p >> 4 == 1) {
			trans[i << 2] = (p & 15) * 17;
			trans[(i << 2) + 1] = 255;
		} else if(p >> 4 == 6) {
			trans[(i << 2) + 2] = (p & 15) * 17;
			trans[(i << 2) + 3] = 255;
		}
	}
	quake_Menu.menuplyr.translate = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Menu.menuplyr.translate);
	quake_GL.gl.texImage2D(3553,0,6408,64,64,0,6408,5121,trans);
	quake_GL.gl.texParameterf(3553,10241,9729);
	quake_GL.gl.texParameterf(3553,10240,9729);
	quake_Menu.p_option = quake_Draw.CachePic("p_option");
	quake_Menu.ttl_cstm = quake_Draw.CachePic("ttl_cstm");
	quake_Menu.help_pages = [quake_Draw.CachePic("help0"),quake_Draw.CachePic("help1"),quake_Draw.CachePic("help2"),quake_Draw.CachePic("help3"),quake_Draw.CachePic("help4"),quake_Draw.CachePic("help5")];
};
quake_Menu.DrawMenu = function() {
	if(quake_Menu.state == 0 || quake_Key.dest != 3) return;
	if(!quake_Menu.recursiveDraw) {
		if(quake_SCR.con_current != 0) quake_Draw.ConsoleBackground(quake_VID.height); else quake_Draw.FadeScreen();
	} else quake_Menu.recursiveDraw = false;
	var _g = quake_Menu.state;
	switch(_g) {
	case 1:
		quake_Menu.Main_Draw();
		break;
	case 2:
		quake_Menu.SinglePlayer_Draw();
		break;
	case 3:
		quake_Menu.Load_Draw();
		break;
	case 4:
		quake_Menu.Save_Draw();
		break;
	case 5:
		quake_Menu.MultiPlayer_Draw();
		break;
	case 6:
		quake_Menu.Options_Draw();
		break;
	case 7:
		quake_Menu.Keys_Draw();
		break;
	case 8:
		quake_Menu.Help_Draw();
		break;
	case 9:
		quake_Menu.Quit_Draw();
		break;
	case 0:
		break;
	}
	if(quake_Menu.entersound) {
		quake_S.StartSound(quake_CL.state.viewentity,-1,quake_Menu.sfx_menu2,quake__$Vec_Vec_$Impl_$.origin,1.0,1.0);
		quake_Menu.entersound = false;
	}
};
quake_Menu.Keydown = function(key) {
	var _g = quake_Menu.state;
	switch(_g) {
	case 1:
		quake_Menu.Main_Key(key);
		break;
	case 2:
		quake_Menu.SinglePlayer_Key(key);
		break;
	case 3:
		quake_Menu.Load_Key(key);
		break;
	case 4:
		quake_Menu.Save_Key(key);
		break;
	case 5:
		quake_Menu.MultiPlayer_Key(key);
		break;
	case 6:
		quake_Menu.Options_Key(key);
		break;
	case 7:
		quake_Menu.Keys_Key(key);
		break;
	case 8:
		quake_Menu.Help_Key(key);
		break;
	case 9:
		quake_Menu.Quit_Key(key);
		break;
	case 0:
		break;
	}
};
var quake_MModel = function(name) {
	this.name = name;
	this.needload = true;
};
quake_MModel.__name__ = true;
var quake_MFrame = function(g) {
	this.group = g;
};
quake_MFrame.__name__ = true;
var quake_Mod = function() { };
quake_Mod.__name__ = true;
quake_Mod.Init = function() {
	quake_Mod_$Brush.Init();
	quake_Mod_$Alias.Init();
};
quake_Mod.ClearAll = function() {
	var _g1 = 0;
	var _g = quake_Mod.known.length;
	while(_g1 < _g) {
		var i = _g1++;
		var mod = quake_Mod.known[i];
		if(mod.type != 0) continue;
		if(mod.cmds != null) quake_GL.gl.deleteBuffer(mod.cmds);
		quake_Mod.known[i] = new quake_MModel(mod.name);
	}
};
quake_Mod.FindName = function(name) {
	if(name.length == 0) quake_Sys.Error("Mod.FindName: NULL name");
	var _g = 0;
	var _g1 = quake_Mod.known;
	while(_g < _g1.length) {
		var mod = _g1[_g];
		++_g;
		if(mod == null) continue;
		if(mod.name == name) return mod;
	}
	var _g11 = 0;
	var _g2 = quake_Mod.known.length + 1;
	while(_g11 < _g2) {
		var i = _g11++;
		if(quake_Mod.known[i] != null) continue;
		return quake_Mod.known[i] = new quake_MModel(name);
	}
	return null;
};
quake_Mod.LoadModel = function(mod,crash) {
	if(!mod.needload) return mod;
	var buf = quake_COM.LoadFile(mod.name);
	if(buf == null) {
		if(crash) quake_Sys.Error("Mod.LoadModel: " + mod.name + " not found");
		return null;
	}
	mod.needload = false;
	var view = new DataView(buf);
	var _g = view.getUint32(0,true);
	switch(_g) {
	case 1330660425:
		quake_Mod_$Alias.LoadAliasModel(mod,view);
		break;
	case 1347634249:
		quake_Mod_$Sprite.LoadSpriteModel(mod,view);
		break;
	default:
		quake_Mod_$Brush.LoadBrushModel(mod,view);
	}
	return mod;
};
quake_Mod.Print = function() {
	quake_Console.Print("Cached models:\n");
	var _g = 0;
	var _g1 = quake_Mod.known;
	while(_g < _g1.length) {
		var mod = _g1[_g];
		++_g;
		quake_Console.Print(mod.name + "\n");
	}
};
var quake__$Mod_$Alias_STVert = function(onseam,s,t) {
	this.onseam = onseam;
	this.s = s;
	this.t = t;
};
quake__$Mod_$Alias_STVert.__name__ = true;
var quake__$Mod_$Alias_Triangle = function(facesfront,vertindex) {
	this.facesfront = facesfront;
	this.vertindex = vertindex;
};
quake__$Mod_$Alias_Triangle.__name__ = true;
var quake_Trivert = function(v,lightnormalindex) {
	this.v = v;
	this.lightnormalindex = lightnormalindex;
};
quake_Trivert.__name__ = true;
var quake_Skin = function(g) {
	this.group = g;
};
quake_Skin.__name__ = true;
var quake_Mod_$Alias = function() { };
quake_Mod_$Alias.__name__ = true;
quake_Mod_$Alias.Init = function() {
	quake_Mod_$Alias.filledcolor = 0;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		if(quake_VID.d_8to24table[i] == 0) {
			quake_Mod_$Alias.filledcolor = i;
			break;
		}
	}
};
quake_Mod_$Alias.LoadAliasModel = function(loadmodel,model) {
	var version = model.getUint32(4,true);
	if(version != 6) quake_Sys.Error(loadmodel.name + " has wrong version number (" + version + " should be " + 6 + ")");
	loadmodel.type = 2;
	loadmodel.player = loadmodel.name == "progs/player.mdl";
	var tmp;
	var x = model.getFloat32(8,true);
	var y = model.getFloat32(12,true);
	var z = model.getFloat32(16,true);
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	loadmodel.scale = tmp;
	var tmp1;
	var x1 = model.getFloat32(20,true);
	var y1 = model.getFloat32(24,true);
	var z1 = model.getFloat32(28,true);
	var v1 = new Float32Array(3);
	v1[0] = x1;
	v1[1] = y1;
	v1[2] = z1;
	tmp1 = v1;
	loadmodel.scale_origin = tmp1;
	loadmodel.boundingradius = model.getFloat32(32,true);
	loadmodel.numskins = model.getUint32(48,true);
	if(loadmodel.numskins == 0) quake_Sys.Error("model " + loadmodel.name + " has no skins");
	loadmodel.skinwidth = model.getUint32(52,true);
	loadmodel.skinheight = model.getUint32(56,true);
	loadmodel.numverts = model.getUint32(60,true);
	if(loadmodel.numverts == 0) quake_Sys.Error("model " + loadmodel.name + " has no vertices");
	loadmodel.numtris = model.getUint32(64,true);
	if(loadmodel.numtris == 0) quake_Sys.Error("model " + loadmodel.name + " has no triangles");
	loadmodel.numframes = model.getUint32(68,true);
	if(loadmodel.numframes == 0) quake_Sys.Error("model " + loadmodel.name + " has no frames");
	loadmodel.random = model.getUint32(72,true) == 1;
	loadmodel.flags = model.getUint32(76,true);
	var tmp2;
	var v2 = new Float32Array(3);
	v2[0] = -16.0;
	v2[1] = -16.0;
	v2[2] = -16.0;
	tmp2 = v2;
	loadmodel.mins = tmp2;
	var tmp3;
	var v3 = new Float32Array(3);
	v3[0] = 16.0;
	v3[1] = 16.0;
	v3[2] = 16.0;
	tmp3 = v3;
	loadmodel.maxs = tmp3;
	var inmodel = quake_Mod_$Alias.LoadAllSkins(loadmodel,model,84);
	var stverts = [];
	var _g1 = 0;
	var _g = loadmodel.numverts;
	while(_g1 < _g) {
		_g1++;
		stverts.push(new quake__$Mod_$Alias_STVert(model.getUint32(inmodel,true) != 0,model.getUint32(inmodel + 4,true),model.getUint32(inmodel + 8,true)));
		inmodel += 12;
	}
	var triangles = [];
	var _g11 = 0;
	var _g2 = loadmodel.numtris;
	while(_g11 < _g2) {
		_g11++;
		triangles.push(new quake__$Mod_$Alias_Triangle(model.getUint32(inmodel,true) != 0,[model.getUint32(inmodel + 4,true),model.getUint32(inmodel + 8,true),model.getUint32(inmodel + 12,true)]));
		inmodel += 16;
	}
	quake_Mod_$Alias.LoadAllFrames(loadmodel,model,inmodel);
	var cmds = [];
	var _g12 = 0;
	var _g3 = loadmodel.numtris;
	while(_g12 < _g3) {
		var i = _g12++;
		var triangle = triangles[i];
		if(triangle.facesfront) {
			var vert = stverts[triangle.vertindex[0]];
			cmds.push((vert.s + 0.5) / loadmodel.skinwidth);
			cmds.push((vert.t + 0.5) / loadmodel.skinheight);
			vert = stverts[triangle.vertindex[1]];
			cmds.push((vert.s + 0.5) / loadmodel.skinwidth);
			cmds.push((vert.t + 0.5) / loadmodel.skinheight);
			vert = stverts[triangle.vertindex[2]];
			cmds.push((vert.s + 0.5) / loadmodel.skinwidth);
			cmds.push((vert.t + 0.5) / loadmodel.skinheight);
			continue;
		}
		var _g21 = 0;
		while(_g21 < 3) {
			var j = _g21++;
			var vert1 = stverts[triangle.vertindex[j]];
			if(vert1.onseam) cmds.push((vert1.s + loadmodel.skinwidth / 2 + 0.5) / loadmodel.skinwidth); else cmds.push((vert1.s + 0.5) / loadmodel.skinwidth);
			cmds.push((vert1.t + 0.5) / loadmodel.skinheight);
		}
	}
	var group;
	var frame;
	var _g13 = 0;
	var _g4 = loadmodel.numframes;
	while(_g13 < _g4) {
		var i1 = _g13++;
		group = loadmodel.frames[i1];
		if(group.group) {
			var _g31 = 0;
			var _g22 = group.frames.length;
			while(_g31 < _g22) {
				var j1 = _g31++;
				frame = group.frames[j1];
				frame.cmdofs = cmds.length << 2;
				var _g5 = 0;
				var _g41 = loadmodel.numtris;
				while(_g5 < _g41) {
					var k = _g5++;
					var triangle1 = triangles[k];
					var _g6 = 0;
					while(_g6 < 3) {
						var l = _g6++;
						var vert2 = frame.v[triangle1.vertindex[l]];
						if(vert2.lightnormalindex >= 162) quake_Sys.Error("lightnormalindex >= NUMVERTEXNORMALS");
						cmds.push(vert2.v[0] * loadmodel.scale[0] + loadmodel.scale_origin[0]);
						cmds.push(vert2.v[1] * loadmodel.scale[1] + loadmodel.scale_origin[1]);
						cmds.push(vert2.v[2] * loadmodel.scale[2] + loadmodel.scale_origin[2]);
						cmds.push(quake_Render.avertexnormals[vert2.lightnormalindex * 3]);
						cmds.push(quake_Render.avertexnormals[vert2.lightnormalindex * 3 + 1]);
						cmds.push(quake_Render.avertexnormals[vert2.lightnormalindex * 3 + 2]);
					}
				}
			}
			continue;
		}
		frame = group;
		frame.cmdofs = cmds.length << 2;
		var _g32 = 0;
		var _g23 = loadmodel.numtris;
		while(_g32 < _g23) {
			var j2 = _g32++;
			var triangle2 = triangles[j2];
			var _g42 = 0;
			while(_g42 < 3) {
				var k1 = _g42++;
				var vert3 = frame.v[triangle2.vertindex[k1]];
				if(vert3.lightnormalindex >= 162) quake_Sys.Error("lightnormalindex >= NUMVERTEXNORMALS");
				cmds.push(vert3.v[0] * loadmodel.scale[0] + loadmodel.scale_origin[0]);
				cmds.push(vert3.v[1] * loadmodel.scale[1] + loadmodel.scale_origin[1]);
				cmds.push(vert3.v[2] * loadmodel.scale[2] + loadmodel.scale_origin[2]);
				cmds.push(quake_Render.avertexnormals[vert3.lightnormalindex * 3]);
				cmds.push(quake_Render.avertexnormals[vert3.lightnormalindex * 3 + 1]);
				cmds.push(quake_Render.avertexnormals[vert3.lightnormalindex * 3 + 2]);
			}
		}
	}
	loadmodel.cmds = quake_GL.gl.createBuffer();
	quake_GL.gl.bindBuffer(34962,loadmodel.cmds);
	quake_GL.gl.bufferData(34962,new Float32Array(cmds),35044);
};
quake_Mod_$Alias.LoadAllSkins = function(loadmodel,model,inmodel) {
	loadmodel.skins = [];
	var skinsize = loadmodel.skinwidth * loadmodel.skinheight;
	var _g1 = 0;
	var _g = loadmodel.numskins;
	while(_g1 < _g) {
		var i = _g1++;
		inmodel += 4;
		if(model.getUint32(inmodel - 4,true) == 0) {
			var skin = new Uint8Array(model.buffer,inmodel,skinsize);
			quake_Mod_$Alias.FloodFillSkin(loadmodel,skin);
			var g = new quake_Skin(false);
			g.texturenum = quake_GL.LoadTexture(loadmodel.name + "_" + i,loadmodel.skinwidth,loadmodel.skinheight,skin);
			loadmodel.skins[i] = g;
			if(loadmodel.player) quake_Mod_$Alias.TranslatePlayerSkin(loadmodel,new Uint8Array(model.buffer,inmodel,skinsize),loadmodel.skins[i]);
			inmodel += skinsize;
		} else {
			var group = new quake_Skin(true);
			var numskins = model.getUint32(inmodel,true);
			inmodel += 4;
			var _g2 = 0;
			while(_g2 < numskins) {
				var j = _g2++;
				var s = new quake_Skin(false);
				s.interval = model.getFloat32(inmodel,true);
				if(s.interval <= 0.0) quake_Sys.Error("Mod.LoadAllSkins: interval<=0");
				group.skins[j] = s;
				inmodel += 4;
			}
			var _g21 = 0;
			while(_g21 < numskins) {
				var j1 = _g21++;
				var skin1 = new Uint8Array(model.buffer,inmodel,skinsize);
				quake_Mod_$Alias.FloodFillSkin(loadmodel,skin1);
				group.skins[j1].texturenum = quake_GL.LoadTexture(loadmodel.name + "_" + i + "_" + j1,loadmodel.skinwidth,loadmodel.skinheight,skin1);
				if(loadmodel.player) quake_Mod_$Alias.TranslatePlayerSkin(loadmodel,new Uint8Array(model.buffer,inmodel,skinsize),group.skins[j1]);
				inmodel += skinsize;
			}
			loadmodel.skins[i] = group;
		}
	}
	return inmodel;
};
quake_Mod_$Alias.LoadAllFrames = function(loadmodel,model,inmodel) {
	loadmodel.frames = [];
	var _g1 = 0;
	var _g = loadmodel.numframes;
	while(_g1 < _g) {
		var i = _g1++;
		inmodel += 4;
		if(model.getUint32(inmodel - 4,true) == 0) {
			var frame = new quake_MFrame(false);
			frame.group = false;
			frame.bboxmin = [model.getUint8(inmodel),model.getUint8(inmodel + 1),model.getUint8(inmodel + 2)];
			frame.bboxmax = [model.getUint8(inmodel + 4),model.getUint8(inmodel + 5),model.getUint8(inmodel + 6)];
			frame.name = quake_Q.memstr(new Uint8Array(model.buffer,inmodel + 8,16));
			frame.v = [];
			inmodel += 24;
			var _g3 = 0;
			var _g2 = loadmodel.numverts;
			while(_g3 < _g2) {
				var j = _g3++;
				frame.v[j] = new quake_Trivert([model.getUint8(inmodel),model.getUint8(inmodel + 1),model.getUint8(inmodel + 2)],model.getUint8(inmodel + 3));
				inmodel += 4;
			}
			loadmodel.frames[i] = frame;
		} else {
			var group = new quake_MFrame(true);
			group.bboxmin = [model.getUint8(inmodel + 4),model.getUint8(inmodel + 5),model.getUint8(inmodel + 6)];
			group.bboxmax = [model.getUint8(inmodel + 8),model.getUint8(inmodel + 9),model.getUint8(inmodel + 10)];
			group.frames = [];
			var numframes = model.getUint32(inmodel,true);
			inmodel += 12;
			var _g21 = 0;
			while(_g21 < numframes) {
				var j1 = _g21++;
				var f = new quake_MFrame(false);
				f.interval = model.getFloat32(inmodel,true);
				group.frames[j1] = f;
				if(group.frames[j1].interval <= 0.0) quake_Sys.Error("Mod.LoadAllFrames: interval<=0");
				inmodel += 4;
			}
			var _g22 = 0;
			while(_g22 < numframes) {
				var j2 = _g22++;
				var frame1 = group.frames[j2];
				frame1.bboxmin = [model.getUint8(inmodel),model.getUint8(inmodel + 1),model.getUint8(inmodel + 2)];
				frame1.bboxmax = [model.getUint8(inmodel + 4),model.getUint8(inmodel + 5),model.getUint8(inmodel + 6)];
				frame1.name = quake_Q.memstr(new Uint8Array(model.buffer,inmodel + 8,16));
				frame1.v = [];
				inmodel += 24;
				var _g4 = 0;
				var _g31 = loadmodel.numverts;
				while(_g4 < _g31) {
					var k = _g4++;
					frame1.v[k] = new quake_Trivert([model.getUint8(inmodel),model.getUint8(inmodel + 1),model.getUint8(inmodel + 2)],model.getUint8(inmodel + 3));
					inmodel += 4;
				}
			}
			loadmodel.frames[i] = group;
		}
	}
};
quake_Mod_$Alias.FloodFillSkin = function(loadmodel,skin) {
	var fillcolor = skin[0];
	if(fillcolor == quake_Mod_$Alias.filledcolor) return;
	var width = loadmodel.skinwidth;
	var height = loadmodel.skinheight;
	var lifo = [[0,0]];
	var sp = 1;
	while(sp > 0) {
		var cur = lifo[--sp];
		var x = cur[0];
		var y = cur[1];
		skin[y * width + x] = quake_Mod_$Alias.filledcolor;
		if(x > 0) {
			if(skin[y * width + x - 1] == fillcolor) lifo[sp++] = [x - 1,y];
		}
		if(x < width - 1) {
			if(skin[y * width + x + 1] == fillcolor) lifo[sp++] = [x + 1,y];
		}
		if(y > 0) {
			if(skin[(y - 1) * width + x] == fillcolor) lifo[sp++] = [x,y - 1];
		}
		if(y < height - 1) {
			if(skin[(y + 1) * width + x] == fillcolor) lifo[sp++] = [x,y + 1];
		}
	}
};
quake_Mod_$Alias.TranslatePlayerSkin = function(loadmodel,data,skin) {
	if(loadmodel.skinwidth != 512 || loadmodel.skinheight != 256) data = quake_GL.ResampleTexture(data,loadmodel.skinwidth,loadmodel.skinheight,512,256);
	var out = new Uint8Array(new ArrayBuffer(524288));
	var _g1 = 0;
	while(_g1 < 131072) {
		var i = _g1++;
		var original = data[i];
		if(original >> 4 == 1) {
			out[i << 2] = (original & 15) * 17;
			out[(i << 2) + 1] = 255;
		} else if(original >> 4 == 6) {
			out[(i << 2) + 2] = (original & 15) * 17;
			out[(i << 2) + 3] = 255;
		}
	}
	skin.playertexture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,skin.playertexture);
	quake_GL.gl.texImage2D(3553,0,6408,512,256,0,6408,5121,out);
	quake_GL.gl.generateMipmap(3553);
	quake_GL.gl.texParameteri(3553,10241,quake_GL.filter_min);
	quake_GL.gl.texParameteri(3553,10240,quake_GL.filter_max);
};
var quake_Hull = function() {
};
quake_Hull.__name__ = true;
var quake_ClipNode = function() {
};
quake_ClipNode.__name__ = true;
var quake_Surface = function() {
};
quake_Surface.__name__ = true;
var quake_Node = function() {
};
quake_Node.__name__ = true;
var quake_Leaf = function() {
	quake_Node.call(this);
};
quake_Leaf.__name__ = true;
quake_Leaf.__super__ = quake_Node;
quake_Leaf.prototype = $extend(quake_Node.prototype,{
});
var quake_Texinfo = function(v,t,f) {
	this.vecs = v;
	this.texture = t;
	this.flags = f;
};
quake_Texinfo.__name__ = true;
var quake_MTexture = function() {
};
quake_MTexture.__name__ = true;
var quake_Mod_$Brush = function() { };
quake_Mod_$Brush.__name__ = true;
quake_Mod_$Brush.Init = function() {
	quake_Mod_$Brush.novis = [];
	var _g = 0;
	while(_g < 1024) {
		_g++;
		quake_Mod_$Brush.novis.push(255);
	}
};
quake_Mod_$Brush.PointInLeaf = function(p,model) {
	if(model == null || model.nodes == null) quake_Sys.Error("Mod.PointInLeaf: bad model");
	var node = model.nodes[0];
	while(true) {
		if(node.contents < 0) return node;
		var plane = node.plane;
		var tmp;
		var v2 = plane.normal;
		tmp = p[0] * v2[0] + p[1] * v2[1] + p[2] * v2[2];
		if(tmp - plane.dist > 0) node = node.child0; else node = node.child1;
	}
};
quake_Mod_$Brush.LeafPVS = function(leaf,model) {
	if(leaf == model.leafs[0]) return quake_Mod_$Brush.novis;
	return quake_Mod_$Brush.DecompressVis(leaf.visofs,model);
};
quake_Mod_$Brush.DecompressVis = function(i,model) {
	var decompressed = [];
	var out = 0;
	var row = model.leafs.length + 7 >> 3;
	if(model.visdata == null) {
		while(row >= 0) {
			decompressed[out++] = 255;
			row--;
		}
		return decompressed;
	}
	var out1 = 0;
	while(out1 < row) {
		if(model.visdata[i] != 0) {
			decompressed[out1++] = model.visdata[i++];
			continue;
		}
		var c = model.visdata[i + 1];
		while(c > 0) {
			decompressed[out1++] = 0;
			c--;
		}
		i += 2;
	}
	return decompressed;
};
quake_Mod_$Brush.LoadBrushModel = function(loadmodel,data) {
	var version = data.getUint32(0,true);
	if(version != 29) quake_Sys.Error("Mod.LoadBrushModel: " + loadmodel.name + " has wrong version number (" + version + " should be " + 29 + ")");
	loadmodel.type = 0;
	quake_Mod_$Brush.LoadVertexes(loadmodel,data);
	quake_Mod_$Brush.LoadEdges(loadmodel,data);
	quake_Mod_$Brush.LoadSurfedges(loadmodel,data);
	quake_Mod_$Brush.LoadTextures(loadmodel,data);
	quake_Mod_$Brush.LoadLighting(loadmodel,data);
	quake_Mod_$Brush.LoadPlanes(loadmodel,data);
	quake_Mod_$Brush.LoadTexinfo(loadmodel,data);
	quake_Mod_$Brush.LoadFaces(loadmodel,data);
	quake_Mod_$Brush.LoadMarksurfaces(loadmodel,data);
	quake_Mod_$Brush.LoadVisibility(loadmodel,data);
	quake_Mod_$Brush.LoadLeafs(loadmodel,data);
	quake_Mod_$Brush.LoadNodes(loadmodel,data);
	quake_Mod_$Brush.LoadClipnodes(loadmodel,data);
	quake_Mod_$Brush.MakeHull0(loadmodel);
	quake_Mod_$Brush.LoadEntities(loadmodel,data);
	quake_Mod_$Brush.LoadSubmodels(loadmodel,data);
	var mins_0 = 0.0;
	var mins_1 = 0.0;
	var mins_2 = 0.0;
	var maxs_0 = 0.0;
	var maxs_1 = 0.0;
	var maxs_2 = 0.0;
	var _g = 0;
	var _g1 = loadmodel.vertexes;
	while(_g < _g1.length) {
		var vert = _g1[_g];
		++_g;
		if(vert[0] < mins_0) mins_0 = vert[0]; else if(vert[0] > maxs_0) maxs_0 = vert[0];
		if(vert[1] < mins_1) mins_1 = vert[1]; else if(vert[1] > maxs_1) maxs_1 = vert[1];
		if(vert[2] < mins_2) mins_2 = vert[2]; else if(vert[2] > maxs_2) maxs_2 = vert[2];
	}
	var tmp;
	var tmp1;
	var x = Math.max(Math.abs(mins_0),Math.abs(maxs_0));
	var y = Math.max(Math.abs(mins_1),Math.abs(maxs_1));
	var z = Math.max(Math.abs(mins_2),Math.abs(maxs_2));
	var v1 = new Float32Array(3);
	v1[0] = x;
	v1[1] = y;
	v1[2] = z;
	tmp1 = v1;
	var v = tmp1;
	tmp = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	loadmodel.radius = tmp;
};
quake_Mod_$Brush.LoadVertexes = function(loadmodel,view) {
	var fileofs = view.getUint32(28,true);
	var filelen = view.getUint32(32,true);
	if(filelen % 12 != 0) quake_Sys.Error("Mod.LoadVisibility: funny lump size in " + loadmodel.name);
	var count = filelen / 12 | 0;
	loadmodel.vertexes = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var tmp;
		var x = view.getFloat32(fileofs,true);
		var y = view.getFloat32(fileofs + 4,true);
		var z = view.getFloat32(fileofs + 8,true);
		var v = new Float32Array(3);
		v[0] = x;
		v[1] = y;
		v[2] = z;
		tmp = v;
		loadmodel.vertexes[i] = tmp;
		fileofs += 12;
	}
};
quake_Mod_$Brush.LoadEdges = function(loadmodel,view) {
	var fileofs = view.getUint32(100,true);
	var filelen = view.getUint32(104,true);
	if((filelen & 3) != 0) quake_Sys.Error("Mod.LoadEdges: funny lump size in " + loadmodel.name);
	var count = filelen >> 2;
	loadmodel.edges = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		loadmodel.edges[i] = [view.getUint16(fileofs,true),view.getUint16(fileofs + 2,true)];
		fileofs += 4;
	}
};
quake_Mod_$Brush.LoadSurfedges = function(loadmodel,view) {
	var fileofs = view.getUint32(108,true);
	var filelen = view.getUint32(112,true);
	var count = filelen >> 2;
	loadmodel.surfedges = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		loadmodel.surfedges[i] = view.getInt32(fileofs + (i << 2),true);
	}
};
quake_Mod_$Brush.LoadTextures = function(loadmodel,view) {
	var fileofs = view.getUint32(20,true);
	view.getUint32(24,true);
	loadmodel.textures = [];
	var nummiptex = view.getUint32(fileofs,true);
	var dataofs = fileofs + 4;
	var _g = 0;
	while(_g < nummiptex) {
		var i = _g++;
		var miptexofs = view.getInt32(dataofs,true);
		dataofs += 4;
		if(miptexofs == -1) {
			loadmodel.textures[i] = quake_Render.notexture_mip;
			continue;
		}
		miptexofs += fileofs;
		var tx = new quake_MTexture();
		tx.name = quake_Q.memstr(new Uint8Array(view.buffer,miptexofs,16));
		tx.width = view.getUint32(miptexofs + 16,true);
		tx.height = view.getUint32(miptexofs + 20,true);
		if(tx.name.substring(0,3).toLowerCase() == "sky") {
			quake_Render.InitSky(new Uint8Array(view.buffer,miptexofs + view.getUint32(miptexofs + 24,true),32768));
			tx.texturenum = quake_Render.solidskytexture;
			quake_Render.skytexturenum = i;
			tx.sky = true;
		} else {
			var glt = quake_GL.LoadTexture(tx.name,tx.width,tx.height,new Uint8Array(view.buffer,miptexofs + view.getUint32(miptexofs + 24,true),tx.width * tx.height));
			tx.texturenum = glt.texnum;
			if(HxOverrides.cca(tx.name,0) == 42) tx.turbulent = true;
		}
		loadmodel.textures[i] = tx;
	}
	var _g1 = 0;
	while(_g1 < nummiptex) {
		var i1 = _g1++;
		var tx1 = loadmodel.textures[i1];
		if(HxOverrides.cca(tx1.name,0) != 43) continue;
		if(HxOverrides.cca(tx1.name,1) != 48) continue;
		var name = tx1.name.substring(2);
		tx1.anims = [i1];
		tx1.alternate_anims = [];
		var _g11 = 0;
		while(_g11 < nummiptex) {
			var j = _g11++;
			var tx2 = loadmodel.textures[j];
			if(HxOverrides.cca(tx2.name,0) != 43) continue;
			if(tx2.name.substring(2) != name) continue;
			var num = HxOverrides.cca(tx2.name,1);
			if(num == 48) continue;
			if(num >= 49 && num <= 57) {
				tx1.anims[num - 48] = j;
				tx2.anim_base = i1;
				tx2.anim_frame = num - 48;
				continue;
			}
			if(num >= 97) num -= 32;
			if(num >= 65 && num <= 74) {
				tx1.alternate_anims[num - 65] = j;
				tx2.anim_base = i1;
				tx2.anim_frame = num - 65;
				continue;
			}
			quake_Sys.Error("Bad animating texture " + tx1.name);
		}
		var _g2 = 0;
		var _g12 = tx1.anims.length;
		while(_g2 < _g12) {
			var j1 = _g2++;
			if(tx1.anims[j1] == null) quake_Sys.Error("Missing frame " + j1 + " of " + tx1.name);
		}
		var _g21 = 0;
		var _g13 = tx1.alternate_anims.length;
		while(_g21 < _g13) {
			var j2 = _g21++;
			if(tx1.alternate_anims[j2] == null) quake_Sys.Error("Missing frame " + j2 + " of " + tx1.name);
		}
		loadmodel.textures[i1] = tx1;
	}
	loadmodel.textures.push(quake_Render.notexture_mip);
};
quake_Mod_$Brush.LoadLighting = function(loadmodel,view) {
	var fileofs = view.getUint32(68,true);
	var filelen = view.getUint32(72,true);
	if(filelen == 0) return;
	loadmodel.lightdata = new Uint8Array(view.buffer.slice(fileofs,fileofs + filelen));
};
quake_Mod_$Brush.LoadPlanes = function(loadmodel,view) {
	var fileofs = view.getUint32(12,true);
	var filelen = view.getUint32(16,true);
	if(filelen % 20 != 0) quake_Sys.Error("Mod.LoadPlanes: funny lump size in " + loadmodel.name);
	var count = filelen / 20 | 0;
	loadmodel.planes = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var out = new quake_Plane();
		var this1 = out.normal;
		var x = view.getFloat32(fileofs,true);
		var y = view.getFloat32(fileofs + 4,true);
		var z = view.getFloat32(fileofs + 8,true);
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
		out.dist = view.getFloat32(fileofs + 12,true);
		out.type = view.getUint32(fileofs + 16,true);
		out.signbits = 0;
		if(out.normal[0] < 0) ++out.signbits;
		if(out.normal[1] < 0) out.signbits += 2;
		if(out.normal[2] < 0) out.signbits += 4;
		loadmodel.planes[i] = out;
		fileofs += 20;
	}
};
quake_Mod_$Brush.LoadTexinfo = function(loadmodel,view) {
	var fileofs = view.getUint32(52,true);
	var filelen = view.getUint32(56,true);
	if(filelen % 40 != 0) quake_Sys.Error("Mod.LoadTexinfo: funny lump size in " + loadmodel.name);
	var count = filelen / 40 | 0;
	loadmodel.texinfo = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var out = new quake_Texinfo([[view.getFloat32(fileofs,true),view.getFloat32(fileofs + 4,true),view.getFloat32(fileofs + 8,true),view.getFloat32(fileofs + 12,true)],[view.getFloat32(fileofs + 16,true),view.getFloat32(fileofs + 20,true),view.getFloat32(fileofs + 24,true),view.getFloat32(fileofs + 28,true)]],view.getUint32(fileofs + 32,true),view.getUint32(fileofs + 36,true));
		if(out.texture >= loadmodel.textures.length) {
			out.texture = loadmodel.textures.length - 1;
			out.flags = 0;
		}
		loadmodel.texinfo[i] = out;
		fileofs += 40;
	}
};
quake_Mod_$Brush.LoadFaces = function(loadmodel,view) {
	var fileofs = view.getUint32(60,true);
	var filelen = view.getUint32(64,true);
	if(filelen % 20 != 0) quake_Sys.Error("Mod.LoadFaces: funny lump size in " + loadmodel.name);
	var count = filelen / 20 | 0;
	loadmodel.firstface = 0;
	loadmodel.numfaces = count;
	loadmodel.faces = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var styles = new Uint8Array(view.buffer,fileofs + 12,4);
		var out = new quake_Surface();
		out.plane = loadmodel.planes[view.getUint16(fileofs,true)];
		out.firstedge = view.getUint16(fileofs + 4,true);
		out.numedges = view.getUint16(fileofs + 8,true);
		out.texinfo = view.getUint16(fileofs + 10,true);
		out.styles = [];
		out.lightofs = view.getInt32(fileofs + 16,true);
		if(styles[0] != 255) out.styles[0] = styles[0];
		if(styles[1] != 255) out.styles[1] = styles[1];
		if(styles[2] != 255) out.styles[2] = styles[2];
		if(styles[3] != 255) out.styles[3] = styles[3];
		var mins_0 = 999999.0;
		var mins_1 = 999999.0;
		var maxs_0 = -99999.0;
		var maxs_1 = -99999.0;
		var tex = loadmodel.texinfo[out.texinfo];
		out.texture = tex.texture;
		var _g2 = 0;
		var _g1 = out.numedges;
		while(_g2 < _g1) {
			var j = _g2++;
			var e = loadmodel.surfedges[out.firstedge + j];
			var v;
			if(e >= 0) v = loadmodel.vertexes[loadmodel.edges[e][0]]; else v = loadmodel.vertexes[loadmodel.edges[-e][1]];
			var tmp;
			var tmp2;
			var a = tex.vecs[0];
			var v1 = new Float32Array(3);
			v1[0] = a[0];
			v1[1] = a[1];
			v1[2] = a[2];
			tmp2 = v1;
			var v2 = tmp2;
			tmp = v[0] * v2[0] + v[1] * v2[1] + v[2] * v2[2];
			var val = tmp + tex.vecs[0][3];
			if(val < mins_0) mins_0 = val;
			if(val > maxs_0) maxs_0 = val;
			var tmp1;
			var tmp3;
			var a1 = tex.vecs[1];
			var v3 = new Float32Array(3);
			v3[0] = a1[0];
			v3[1] = a1[1];
			v3[2] = a1[2];
			tmp3 = v3;
			var v21 = tmp3;
			tmp1 = v[0] * v21[0] + v[1] * v21[1] + v[2] * v21[2];
			val = tmp1 + tex.vecs[1][3];
			if(val < mins_1) mins_1 = val;
			if(val > maxs_1) maxs_1 = val;
		}
		out.texturemins = [Math.floor(mins_0 / 16) * 16,Math.floor(mins_1 / 16) * 16];
		out.extents = [Math.ceil(maxs_0 / 16) * 16 - out.texturemins[0],Math.ceil(maxs_1 / 16) * 16 - out.texturemins[1]];
		if(loadmodel.textures[tex.texture].turbulent) out.turbulent = true; else if(loadmodel.textures[tex.texture].sky) out.sky = true;
		loadmodel.faces[i] = out;
		fileofs += 20;
	}
};
quake_Mod_$Brush.LoadMarksurfaces = function(loadmodel,view) {
	var fileofs = view.getUint32(92,true);
	var filelen = view.getUint32(96,true);
	var count = filelen >> 1;
	loadmodel.marksurfaces = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var j = view.getUint16(fileofs + (i << 1),true);
		if(j > loadmodel.faces.length) quake_Sys.Error("Mod.LoadMarksurfaces: bad surface number");
		loadmodel.marksurfaces[i] = j;
	}
};
quake_Mod_$Brush.LoadVisibility = function(loadmodel,view) {
	var fileofs = view.getUint32(36,true);
	var filelen = view.getUint32(40,true);
	if(filelen == 0) return;
	loadmodel.visdata = new Uint8Array(view.buffer.slice(fileofs,fileofs + filelen));
};
quake_Mod_$Brush.LoadLeafs = function(loadmodel,view) {
	var fileofs = view.getUint32(84,true);
	var filelen = view.getUint32(88,true);
	if(filelen % 28 != 0) quake_Sys.Error("Mod.LoadLeafs: funny lump size in " + loadmodel.name);
	var count = filelen / 28 | 0;
	loadmodel.leafs = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var out = new quake_Leaf();
		out.num = i;
		out.contents = view.getInt32(fileofs,true);
		out.visofs = view.getInt32(fileofs + 4,true);
		var tmp;
		var x = view.getInt16(fileofs + 8,true);
		var y = view.getInt16(fileofs + 10,true);
		var z = view.getInt16(fileofs + 12,true);
		var v = new Float32Array(3);
		v[0] = x;
		v[1] = y;
		v[2] = z;
		tmp = v;
		out.mins = tmp;
		var tmp1;
		var x1 = view.getInt16(fileofs + 14,true);
		var y1 = view.getInt16(fileofs + 16,true);
		var z1 = view.getInt16(fileofs + 18,true);
		var v1 = new Float32Array(3);
		v1[0] = x1;
		v1[1] = y1;
		v1[2] = z1;
		tmp1 = v1;
		out.maxs = tmp1;
		out.firstmarksurface = view.getUint16(fileofs + 20,true);
		out.nummarksurfaces = view.getUint16(fileofs + 22,true);
		out.ambient_level = [view.getUint8(fileofs + 24),view.getUint8(fileofs + 25),view.getUint8(fileofs + 26),view.getUint8(fileofs + 27)];
		out.cmds = [];
		out.skychain = 0;
		out.waterchain = 0;
		loadmodel.leafs.push(out);
		fileofs += 28;
	}
};
quake_Mod_$Brush.LoadNodes = function(loadmodel,view) {
	var fileofs = view.getUint32(44,true);
	var filelen = view.getUint32(48,true);
	if(filelen == 0 || filelen % 24 != 0) quake_Sys.Error("Mod.LoadNodes: funny lump size in " + loadmodel.name);
	var count = filelen / 24 | 0;
	loadmodel.nodes = [];
	var tmp;
	var this1;
	this1 = new Array(count);
	tmp = this1;
	var children = tmp;
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var n = loadmodel.nodes[i] = new quake_Node();
		n.num = i;
		n.contents = 0;
		n.planenum = view.getUint32(fileofs,true);
		var val = [view.getInt16(fileofs + 4,true),view.getInt16(fileofs + 6,true)];
		children[i] = val;
		var tmp1;
		var x = view.getInt16(fileofs + 8,true);
		var y = view.getInt16(fileofs + 10,true);
		var z = view.getInt16(fileofs + 12,true);
		var v = new Float32Array(3);
		v[0] = x;
		v[1] = y;
		v[2] = z;
		tmp1 = v;
		n.mins = tmp1;
		var tmp2;
		var x1 = view.getInt16(fileofs + 14,true);
		var y1 = view.getInt16(fileofs + 16,true);
		var z1 = view.getInt16(fileofs + 18,true);
		var v1 = new Float32Array(3);
		v1[0] = x1;
		v1[1] = y1;
		v1[2] = z1;
		tmp2 = v1;
		n.maxs = tmp2;
		n.firstface = view.getUint16(fileofs + 20,true);
		n.numfaces = view.getUint16(fileofs + 22,true);
		n.cmds = [];
		fileofs += 24;
	}
	var _g1 = 0;
	while(_g1 < count) {
		var i1 = _g1++;
		var out = loadmodel.nodes[i1];
		out.plane = loadmodel.planes[out.planenum];
		var children1 = children[i1];
		if(children1[0] >= 0) out.child0 = loadmodel.nodes[children1[0]]; else out.child0 = loadmodel.leafs[-1 - children1[0]];
		if(children1[1] >= 0) out.child1 = loadmodel.nodes[children1[1]]; else out.child1 = loadmodel.leafs[-1 - children1[1]];
	}
	quake_Mod_$Brush.SetParent(loadmodel.nodes[0],null);
};
quake_Mod_$Brush.SetParent = function(node,parent) {
	node.parent = parent;
	if(node.contents < 0) return;
	quake_Mod_$Brush.SetParent(node.child0,node);
	quake_Mod_$Brush.SetParent(node.child1,node);
};
quake_Mod_$Brush.LoadClipnodes = function(loadmodel,view) {
	var fileofs = view.getUint32(76,true);
	var filelen = view.getUint32(80,true);
	var count = filelen >> 3;
	loadmodel.clipnodes = [];
	loadmodel.hulls = [];
	var tmp;
	var h = new quake_Hull();
	h.clipnodes = loadmodel.clipnodes;
	h.firstclipnode = 0;
	h.lastclipnode = count - 1;
	h.planes = loadmodel.planes;
	var tmp2;
	var v = new Float32Array(3);
	v[0] = -16.0;
	v[1] = -16.0;
	v[2] = -24.0;
	tmp2 = v;
	h.clip_mins = tmp2;
	var tmp3;
	var v1 = new Float32Array(3);
	v1[0] = 16.0;
	v1[1] = 16.0;
	v1[2] = 32.0;
	tmp3 = v1;
	h.clip_maxs = tmp3;
	tmp = h;
	loadmodel.hulls[1] = tmp;
	var tmp1;
	var h1 = new quake_Hull();
	h1.clipnodes = loadmodel.clipnodes;
	h1.firstclipnode = 0;
	h1.lastclipnode = count - 1;
	h1.planes = loadmodel.planes;
	var tmp4;
	var v2 = new Float32Array(3);
	v2[0] = -32.0;
	v2[1] = -32.0;
	v2[2] = -24.0;
	tmp4 = v2;
	h1.clip_mins = tmp4;
	var tmp5;
	var v3 = new Float32Array(3);
	v3[0] = 32.0;
	v3[1] = 32.0;
	v3[2] = 64.0;
	tmp5 = v3;
	h1.clip_maxs = tmp5;
	tmp1 = h1;
	loadmodel.hulls[2] = tmp1;
	var _g = 0;
	while(_g < count) {
		_g++;
		var n = new quake_ClipNode();
		n.planenum = view.getUint32(fileofs,true);
		n.child0 = view.getInt16(fileofs + 4,true);
		n.child1 = view.getInt16(fileofs + 6,true);
		loadmodel.clipnodes.push(n);
		fileofs += 8;
	}
};
quake_Mod_$Brush.MakeHull0 = function(loadmodel) {
	var clipnodes = [];
	var tmp;
	var h = new quake_Hull();
	h.clipnodes = clipnodes;
	h.lastclipnode = loadmodel.nodes.length - 1;
	h.planes = loadmodel.planes;
	h.clip_mins = new Float32Array(3);
	h.clip_maxs = new Float32Array(3);
	tmp = h;
	var hull = tmp;
	var _g1 = 0;
	var _g = loadmodel.nodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = loadmodel.nodes[i];
		var out = new quake_ClipNode();
		out.planenum = node.planenum;
		var child = node.child0;
		out.child0 = child.contents < 0?child.contents:child.num;
		child = node.child1;
		out.child1 = child.contents < 0?child.contents:child.num;
		clipnodes[i] = out;
	}
	loadmodel.hulls[0] = hull;
};
quake_Mod_$Brush.LoadEntities = function(loadmodel,view) {
	var fileofs = view.getUint32(4,true);
	var filelen = view.getUint32(8,true);
	loadmodel.entities = quake_Q.memstr(new Uint8Array(view.buffer,fileofs,filelen));
};
quake_Mod_$Brush.LoadSubmodels = function(loadmodel,view) {
	var fileofs = view.getUint32(116,true);
	var filelen = view.getUint32(120,true);
	var count = filelen >> 6;
	if(count == 0) quake_Sys.Error("Mod.LoadSubmodels: funny lump size in " + loadmodel.name);
	loadmodel.submodels = [];
	var tmp;
	var x = view.getFloat32(fileofs,true) - 1.0;
	var y = view.getFloat32(fileofs + 4,true) - 1.0;
	var z = view.getFloat32(fileofs + 8,true) - 1.0;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	loadmodel.mins = tmp;
	var tmp1;
	var x1 = view.getFloat32(fileofs + 12,true) + 1.0;
	var y1 = view.getFloat32(fileofs + 16,true) + 1.0;
	var z1 = view.getFloat32(fileofs + 20,true) + 1.0;
	var v1 = new Float32Array(3);
	v1[0] = x1;
	v1[1] = y1;
	v1[2] = z1;
	tmp1 = v1;
	loadmodel.maxs = tmp1;
	loadmodel.hulls[0].firstclipnode = view.getUint32(fileofs + 36,true);
	loadmodel.hulls[1].firstclipnode = view.getUint32(fileofs + 40,true);
	loadmodel.hulls[2].firstclipnode = view.getUint32(fileofs + 44,true);
	fileofs += 64;
	var clipnodes = loadmodel.hulls[0].clipnodes;
	var _g = 1;
	while(_g < count) {
		var i = _g++;
		var out = quake_Mod.FindName("*" + i);
		out.needload = false;
		out.type = 0;
		out.submodel = true;
		var tmp2;
		var x2 = view.getFloat32(fileofs,true) - 1.0;
		var y2 = view.getFloat32(fileofs + 4,true) - 1.0;
		var z2 = view.getFloat32(fileofs + 8,true) - 1.0;
		var v2 = new Float32Array(3);
		v2[0] = x2;
		v2[1] = y2;
		v2[2] = z2;
		tmp2 = v2;
		out.mins = tmp2;
		var tmp3;
		var x3 = view.getFloat32(fileofs + 12,true) + 1.0;
		var y3 = view.getFloat32(fileofs + 16,true) + 1.0;
		var z3 = view.getFloat32(fileofs + 20,true) + 1.0;
		var v3 = new Float32Array(3);
		v3[0] = x3;
		v3[1] = y3;
		v3[2] = z3;
		tmp3 = v3;
		out.maxs = tmp3;
		var tmp4;
		var x4 = view.getFloat32(fileofs + 24,true);
		var y4 = view.getFloat32(fileofs + 28,true);
		var z4 = view.getFloat32(fileofs + 32,true);
		var v4 = new Float32Array(3);
		v4[0] = x4;
		v4[1] = y4;
		v4[2] = z4;
		tmp4 = v4;
		out.origin = tmp4;
		var tmp5;
		var h = new quake_Hull();
		h.clipnodes = clipnodes;
		h.firstclipnode = view.getUint32(fileofs + 36,true);
		h.lastclipnode = loadmodel.nodes.length - 1;
		h.planes = loadmodel.planes;
		h.clip_mins = new Float32Array(3);
		h.clip_maxs = new Float32Array(3);
		tmp5 = h;
		var tmp6;
		var h1 = new quake_Hull();
		h1.clipnodes = loadmodel.clipnodes;
		h1.firstclipnode = view.getUint32(fileofs + 40,true);
		h1.lastclipnode = loadmodel.clipnodes.length - 1;
		h1.planes = loadmodel.planes;
		var tmp8;
		var v5 = new Float32Array(3);
		v5[0] = -16.0;
		v5[1] = -16.0;
		v5[2] = -24.0;
		tmp8 = v5;
		h1.clip_mins = tmp8;
		var tmp9;
		var v6 = new Float32Array(3);
		v6[0] = 16.0;
		v6[1] = 16.0;
		v6[2] = 32.0;
		tmp9 = v6;
		h1.clip_maxs = tmp9;
		tmp6 = h1;
		var tmp7;
		var h2 = new quake_Hull();
		h2.clipnodes = loadmodel.clipnodes;
		h2.firstclipnode = view.getUint32(fileofs + 44,true);
		h2.lastclipnode = loadmodel.clipnodes.length - 1;
		h2.planes = loadmodel.planes;
		var tmp10;
		var v7 = new Float32Array(3);
		v7[0] = -32.0;
		v7[1] = -32.0;
		v7[2] = -24.0;
		tmp10 = v7;
		h2.clip_mins = tmp10;
		var tmp11;
		var v8 = new Float32Array(3);
		v8[0] = 32.0;
		v8[1] = 32.0;
		v8[2] = 64.0;
		tmp11 = v8;
		h2.clip_maxs = tmp11;
		tmp7 = h2;
		out.hulls = [tmp5,tmp6,tmp7];
		out.textures = loadmodel.textures;
		out.lightdata = loadmodel.lightdata;
		out.faces = loadmodel.faces;
		out.firstface = view.getUint32(fileofs + 56,true);
		out.numfaces = view.getUint32(fileofs + 60,true);
		loadmodel.submodels[i - 1] = out;
		fileofs += 64;
	}
};
var quake_Mod_$Sprite = function() { };
quake_Mod_$Sprite.__name__ = true;
quake_Mod_$Sprite.LoadSpriteModel = function(loadmodel,model) {
	var version = model.getUint32(4,true);
	if(version != 1) quake_Sys.Error(loadmodel.name + " has wrong version number (" + version + " should be " + 1 + ")");
	loadmodel.type = 1;
	loadmodel.oriented = model.getUint32(8,true) == 3;
	loadmodel.boundingradius = model.getFloat32(12,true);
	loadmodel.width = model.getUint32(16,true);
	loadmodel.height = model.getUint32(20,true);
	loadmodel.numframes = model.getUint32(24,true);
	if(loadmodel.numframes == 0) quake_Sys.Error("model " + loadmodel.name + " has no frames");
	loadmodel.random = model.getUint32(32,true) == 1;
	var tmp;
	var v = new Float32Array(3);
	v[0] = loadmodel.width * -0.5;
	v[1] = loadmodel.width * -0.5;
	v[2] = loadmodel.height * -0.5;
	tmp = v;
	loadmodel.mins = tmp;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = loadmodel.width * 0.5;
	v1[1] = loadmodel.width * 0.5;
	v1[2] = loadmodel.height * 0.5;
	tmp1 = v1;
	loadmodel.maxs = tmp1;
	loadmodel.frames = [];
	var inframe = 36;
	var frame;
	var group;
	var numframes;
	var _g1 = 0;
	var _g = loadmodel.numframes;
	while(_g1 < _g) {
		var i = _g1++;
		inframe += 4;
		if(model.getUint32(inframe - 4,true) == 0) {
			frame = new quake_MFrame(false);
			loadmodel.frames[i] = frame;
			inframe = quake_Mod_$Sprite.LoadSpriteFrame(loadmodel.name + "_" + i,model,inframe,frame);
		} else {
			group = new quake_MFrame(true);
			group.frames = [];
			loadmodel.frames[i] = group;
			numframes = model.getUint32(inframe,true);
			inframe += 4;
			var _g2 = 0;
			while(_g2 < numframes) {
				var j = _g2++;
				var f = new quake_MFrame(false);
				f.interval = model.getFloat32(inframe,true);
				group.frames[j] = f;
				if(group.frames[j].interval <= 0.0) quake_Sys.Error("Mod.LoadSpriteModel: interval<=0");
				inframe += 4;
			}
			var _g21 = 0;
			while(_g21 < numframes) {
				var j1 = _g21++;
				inframe = quake_Mod_$Sprite.LoadSpriteFrame(loadmodel.name + "_" + i + "_" + j1,model,inframe,group.frames[j1]);
			}
		}
	}
};
quake_Mod_$Sprite.LoadSpriteFrame = function(identifier,model,inframe,frame) {
	frame.origin = [model.getInt32(inframe,true),-model.getInt32(inframe + 4,true)];
	frame.width = model.getUint32(inframe + 8,true);
	frame.height = model.getUint32(inframe + 12,true);
	var size = frame.width * frame.height;
	var _g = 0;
	var _g1 = quake_GL.textures;
	while(_g < _g1.length) {
		var glt1 = _g1[_g];
		++_g;
		if(glt1.identifier == identifier) {
			if(frame.width != glt1.width || frame.height != glt1.height) quake_Sys.Error("Mod.LoadSpriteFrame: cache mismatch");
			frame.texturenum = glt1.texnum;
			return inframe + 16 + frame.width * frame.height;
		}
	}
	var data = new Uint8Array(model.buffer,inframe + 16,size);
	var scaled_width = frame.width;
	var scaled_height = frame.height;
	if((frame.width & frame.width - 1) != 0 || (frame.height & frame.height - 1) != 0) {
		--scaled_width;
		scaled_width |= scaled_width >> 1;
		scaled_width |= scaled_width >> 2;
		scaled_width |= scaled_width >> 4;
		scaled_width |= scaled_width >> 8;
		scaled_width |= scaled_width >> 16;
		++scaled_width;
		--scaled_height;
		scaled_height |= scaled_height >> 1;
		scaled_height |= scaled_height >> 2;
		scaled_height |= scaled_height >> 4;
		scaled_height |= scaled_height >> 8;
		scaled_height |= scaled_height >> 16;
		++scaled_height;
	}
	if(scaled_width > quake_GL.maxtexturesize) scaled_width = quake_GL.maxtexturesize;
	if(scaled_height > quake_GL.maxtexturesize) scaled_height = quake_GL.maxtexturesize;
	if(scaled_width != frame.width || scaled_height != frame.height) {
		size = scaled_width * scaled_height;
		data = quake_GL.ResampleTexture(data,frame.width,frame.height,scaled_width,scaled_height);
	}
	var trans = new ArrayBuffer(size << 2);
	var trans32 = new Uint32Array(trans);
	var _g2 = 0;
	while(_g2 < size) {
		var i = _g2++;
		if(data[i] != 255) trans32[i] = quake_COM.LittleLong(quake_VID.d_8to24table[data[i]] + -16777216);
	}
	var glt = new quake_GLTexture(identifier,frame.width,frame.height);
	quake_GL.Bind(0,glt.texnum);
	quake_GL.gl.texImage2D(3553,0,6408,scaled_width,scaled_height,0,6408,5121,new Uint8Array(trans));
	quake_GL.gl.generateMipmap(3553);
	quake_GL.gl.texParameterf(3553,10241,quake_GL.filter_min);
	quake_GL.gl.texParameterf(3553,10240,quake_GL.filter_max);
	quake_GL.textures.push(glt);
	frame.texturenum = glt.texnum;
	return inframe + 16 + frame.width * frame.height;
};
var quake_NETSocketBase = function(address) {
	this.connecttime = quake_NET.time;
	this.lastMessageTime = quake_NET.time;
	this.driver = quake_NET.driverlevel;
	this.address = address;
};
quake_NETSocketBase.__name__ = true;
var quake_INETSocket = function() { };
quake_INETSocket.__name__ = true;
var quake_NET = function() { };
quake_NET.__name__ = true;
quake_NET.AddNewSocket = function(sock) {
	var i = 0;
	while(i < quake_NET.activeSockets.length) {
		if(quake_NET.activeSockets[i].disconnected) break;
		i++;
	}
	quake_NET.activeSockets[i] = sock;
};
quake_NET.Connect = function(host) {
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	if(host == "local") {
		quake_NET.driverlevel = 0;
		return quake_NET_$Loop.Connect(host);
	}
	var _g1 = 1;
	var _g = quake_NET.drivers.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_NET.driverlevel = i;
		var dfunc = quake_NET.drivers[quake_NET.driverlevel];
		if(!dfunc.initialized) continue;
		var ret = dfunc.Connect(host);
		if(ret == 0) {
			quake_CL.cls.state = 1;
			quake_Console.Print("trying...\n");
			quake_NET.start_time = quake_NET.time;
			quake_NET.reps = 0;
			throw new js__$Boot_HaxeError("NET.Connect");
		}
		if(ret != null) return ret;
	}
	return null;
};
quake_NET.CheckForResend = function() {
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	var dfunc = quake_NET.drivers[quake_NET.newsocket.driver];
	if(quake_NET.reps <= 2) {
		if(quake_NET.time - quake_NET.start_time >= 2.5 * (quake_NET.reps + 1)) {
			quake_Console.Print("still trying...\n");
			++quake_NET.reps;
		}
	} else if(quake_NET.reps == 3) {
		if(quake_NET.time - quake_NET.start_time >= 10.0) {
			quake_NET.Close(quake_NET.newsocket);
			quake_CL.cls.state = 0;
			quake_Console.Print("No Response\n");
			quake_Host.Error("NET.CheckForResend: connect failed\n");
		}
	}
	var ret = dfunc.CheckForResend();
	if(ret == 1) {
		quake_NET.newsocket.disconnected = false;
		quake_CL.Connect(quake_NET.newsocket);
	} else if(ret == -1) {
		quake_NET.newsocket.disconnected = false;
		quake_NET.Close(quake_NET.newsocket);
		quake_CL.cls.state = 0;
		quake_Console.Print("Network Error\n");
		quake_Host.Error("NET.CheckForResend: connect failed\n");
	}
};
quake_NET.CheckNewConnections = function() {
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	var _g1 = 0;
	var _g = quake_NET.drivers.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_NET.driverlevel = i;
		var dfunc = quake_NET.drivers[quake_NET.driverlevel];
		if(!dfunc.initialized) continue;
		var ret = dfunc.CheckNewConnections();
		if(ret != null) return ret;
	}
	return null;
};
quake_NET.Close = function(sock) {
	if(sock == null) return;
	if(sock.disconnected) return;
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	sock.Close();
	sock.disconnected = true;
};
quake_NET.GetMessage = function(sock) {
	if(sock == null) return -1;
	if(sock.disconnected) {
		quake_Console.Print("NET.GetMessage: disconnected socket\n");
		return -1;
	}
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	var ret = sock.GetMessage();
	if(sock.driver != 0) {
		if(ret == 0) {
			if(quake_NET.time - sock.lastMessageTime > quake_NET.messagetimeout.value) {
				quake_NET.Close(sock);
				return -1;
			}
		} else if(ret > 0) sock.lastMessageTime = quake_NET.time;
	}
	return ret;
};
quake_NET.SendMessage = function(sock,data) {
	if(sock == null) return -1;
	if(sock.disconnected) {
		quake_Console.Print("NET.SendMessage: disconnected socket\n");
		return -1;
	}
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	return sock.SendMessage(data);
};
quake_NET.SendUnreliableMessage = function(sock,data) {
	if(sock == null) return -1;
	if(sock.disconnected) {
		quake_Console.Print("NET.SendUnreliableMessage: disconnected socket\n");
		return -1;
	}
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	return sock.SendUnreliableMessage(data);
};
quake_NET.CanSendMessage = function(sock) {
	if(sock == null) return false;
	if(sock.disconnected) return false;
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	return sock.CanSendMessage();
};
quake_NET.SendToAll = function(data) {
	var count = 0;
	var state1 = [];
	var state2 = [];
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Host.client = quake_SV.svs.clients[i];
		if(quake_Host.client.netconnection == null) continue;
		if(!quake_Host.client.active) {
			state1[i] = state2[i] = true;
			continue;
		}
		if(quake_Host.client.netconnection.driver == 0) {
			quake_NET.SendMessage(quake_Host.client.netconnection,data);
			state1[i] = state2[i] = true;
			continue;
		}
		++count;
		state1[i] = state2[i] = false;
	}
	var start = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	while(count != 0) {
		count = 0;
		var _g11 = 0;
		var _g2 = quake_SV.svs.maxclients;
		while(_g11 < _g2) {
			var i1 = _g11++;
			quake_Host.client = quake_SV.svs.clients[i1];
			if(!state1[i1]) {
				if(quake_NET.CanSendMessage(quake_Host.client.netconnection)) {
					state1[i1] = true;
					quake_NET.SendMessage(quake_Host.client.netconnection,data);
				} else quake_NET.GetMessage(quake_Host.client.netconnection);
				++count;
				continue;
			}
			if(!state2[i1]) {
				if(quake_NET.CanSendMessage(quake_Host.client.netconnection)) state2[i1] = true; else quake_NET.GetMessage(quake_Host.client.netconnection);
				++count;
			}
		}
		if(new Date().getTime() * 0.001 - quake_Sys.oldtime - start > 5.0) return count;
	}
	return count;
};
quake_NET.Init = function() {
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	quake_NET.messagetimeout = quake_Cvar.RegisterVariable("net_messagetimeout","300");
	quake_NET.hostname = quake_Cvar.RegisterVariable("hostname","UNNAMED");
	quake_NET.drivers = [quake_NET_$Loop,quake_NET_$WEBS];
	var _g1 = 0;
	var _g = quake_NET.drivers.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_NET.driverlevel = i;
		quake_NET.drivers[quake_NET.driverlevel].initialized = quake_NET.drivers[quake_NET.driverlevel].Init();
	}
};
quake_NET.Shutdown = function() {
	quake_NET.time = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	var _g1 = 0;
	var _g = quake_NET.activeSockets.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_NET.Close(quake_NET.activeSockets[i]);
	}
};
var quake__$NET_$Loop_LoopNETSocket = function(address) {
	quake_NETSocketBase.call(this,address);
	this.receiveMessage = new Uint8Array(new ArrayBuffer(8192));
};
quake__$NET_$Loop_LoopNETSocket.__name__ = true;
quake__$NET_$Loop_LoopNETSocket.__interfaces__ = [quake_INETSocket];
quake__$NET_$Loop_LoopNETSocket.__super__ = quake_NETSocketBase;
quake__$NET_$Loop_LoopNETSocket.prototype = $extend(quake_NETSocketBase.prototype,{
	Close: function() {
		if(this.other_side != null) this.other_side.other_side = null;
		this.receiveMessageLength = 0;
		this.canSend = false;
		if(this == quake_NET_$Loop.client) quake_NET_$Loop.client = null; else quake_NET_$Loop.server = null;
	}
	,GetMessage: function() {
		if(this.receiveMessageLength == 0) return 0;
		var ret = this.receiveMessage[0];
		var length = this.receiveMessage[1] + (this.receiveMessage[2] << 8);
		if(length > quake_NET.message.data.byteLength) quake_Sys.Error("GetMessage: overflow");
		quake_NET.message.cursize = length;
		new Uint8Array(quake_NET.message.data).set(this.receiveMessage.subarray(3,length + 3));
		this.receiveMessageLength -= length;
		if(this.receiveMessageLength >= 4) {
			var _g1 = 0;
			var _g = this.receiveMessageLength;
			while(_g1 < _g) {
				var i = _g1++;
				this.receiveMessage[i] = this.receiveMessage[length + 3 + i];
			}
		}
		this.receiveMessageLength -= 3;
		if(this.other_side != null && ret == 1) this.other_side.canSend = true;
		return ret;
	}
	,SendMessage: function(data) {
		if(this.other_side == null) return -1;
		var bufferLength = this.other_side.receiveMessageLength;
		this.other_side.receiveMessageLength += data.cursize + 3;
		if(this.other_side.receiveMessageLength > 8192) quake_Sys.Error("SendMessage: overflow");
		var buffer = this.other_side.receiveMessage;
		buffer[bufferLength] = 1;
		buffer[bufferLength + 1] = data.cursize & 255;
		buffer[bufferLength + 2] = data.cursize >> 8;
		buffer.set(new Uint8Array(data.data,0,data.cursize),bufferLength + 3);
		this.canSend = false;
		return 1;
	}
	,SendUnreliableMessage: function(data) {
		if(this.other_side == null) return -1;
		var bufferLength = this.other_side.receiveMessageLength;
		this.other_side.receiveMessageLength += data.cursize + 3;
		if(this.other_side.receiveMessageLength > 8192) quake_Sys.Error("SendMessage: overflow");
		var buffer = this.other_side.receiveMessage;
		buffer[bufferLength] = 2;
		buffer[bufferLength + 1] = data.cursize & 255;
		buffer[bufferLength + 2] = data.cursize >> 8;
		buffer.set(new Uint8Array(data.data,0,data.cursize),bufferLength + 3);
		return 1;
	}
	,CanSendMessage: function() {
		if(this.other_side != null) return this.canSend;
		return false;
	}
});
var quake_NET_$Loop = function() { };
quake_NET_$Loop.__name__ = true;
quake_NET_$Loop.Init = function() {
	return true;
};
quake_NET_$Loop.Connect = function(host) {
	if(host != "local") return null;
	quake_NET_$Loop.localconnectpending = true;
	if(quake_NET_$Loop.client == null) quake_NET_$Loop.client = new quake__$NET_$Loop_LoopNETSocket("localhost");
	quake_NET_$Loop.client.receiveMessageLength = 0;
	quake_NET_$Loop.client.canSend = true;
	if(quake_NET_$Loop.server == null) quake_NET_$Loop.server = new quake__$NET_$Loop_LoopNETSocket("LOCAL");
	quake_NET_$Loop.server.receiveMessageLength = 0;
	quake_NET_$Loop.server.canSend = true;
	quake_NET_$Loop.client.other_side = quake_NET_$Loop.server;
	quake_NET_$Loop.server.other_side = quake_NET_$Loop.client;
	quake_NET.AddNewSocket(quake_NET_$Loop.client);
	quake_NET.AddNewSocket(quake_NET_$Loop.server);
	return quake_NET_$Loop.client;
};
quake_NET_$Loop.CheckNewConnections = function() {
	if(!quake_NET_$Loop.localconnectpending) return null;
	quake_NET_$Loop.localconnectpending = false;
	quake_NET_$Loop.server.receiveMessageLength = 0;
	quake_NET_$Loop.server.canSend = true;
	quake_NET_$Loop.client.receiveMessageLength = 0;
	quake_NET_$Loop.client.canSend = true;
	return quake_NET_$Loop.server;
};
quake_NET_$Loop.CheckForResend = function() {
	throw new js__$Boot_HaxeError("Not implemented");
};
var quake__$NET_$WEBS_WEBSNETSocket = function(address) {
	quake_NETSocketBase.call(this,address);
	this.disconnected = true;
	this.receiveMessage = [];
	this.native_socket = new WebSocket(address,"quake");
	this.native_socket.data_socket = this;
	this.native_socket.binaryType = "arraybuffer";
	this.native_socket.onerror = $bind(this,this.OnError);
	this.native_socket.onmessage = $bind(this,this.OnMessage);
};
quake__$NET_$WEBS_WEBSNETSocket.__name__ = true;
quake__$NET_$WEBS_WEBSNETSocket.__interfaces__ = [quake_INETSocket];
quake__$NET_$WEBS_WEBSNETSocket.__super__ = quake_NETSocketBase;
quake__$NET_$WEBS_WEBSNETSocket.prototype = $extend(quake_NETSocketBase.prototype,{
	OnError: function() {
		quake_NET.Close(this);
	}
	,OnMessage: function(message) {
		var data = message.data;
		if(typeof(data) == "string") return;
		if(data.byteLength > 8000) return;
		this.receiveMessage.push(new Uint8Array(data));
	}
	,Close: function() {
		if(this.native_socket != null) this.native_socket.close(1000);
	}
	,GetMessage: function() {
		if(this.native_socket == null) return -1;
		if(this.native_socket.readyState != 1) return -1;
		if(this.receiveMessage.length == 0) return 0;
		var message = this.receiveMessage.shift();
		quake_NET.message.cursize = message.length - 1;
		new Uint8Array(quake_NET.message.data).set(message.subarray(1,message.length));
		return message[0];
	}
	,SendMessage: function(data) {
		if(this.native_socket == null) return -1;
		if(this.native_socket.readyState != 1) return -1;
		var buf = new ArrayBuffer(data.cursize + 1);
		var dest = new Uint8Array(buf);
		dest[0] = 1;
		dest.set(new Uint8Array(data.data,0,data.cursize),1);
		this.native_socket.send(buf);
		return 1;
	}
	,SendUnreliableMessage: function(data) {
		if(this.native_socket == null) return -1;
		if(this.native_socket.readyState != 1) return -1;
		var buf = new ArrayBuffer(data.cursize + 1);
		var dest = new Uint8Array(buf);
		dest[0] = 2;
		dest.set(new Uint8Array(data.data,0,data.cursize),1);
		this.native_socket.send(buf);
		return 1;
	}
	,CanSendMessage: function() {
		if(this.native_socket == null) return false;
		if(this.native_socket.readyState == 1) return true;
		return false;
	}
});
var quake_NET_$WEBS = function() { };
quake_NET_$WEBS.__name__ = true;
quake_NET_$WEBS.Init = function() {
	if(window.WebSocket == null || window.document.location.protocol == "https:") return false;
	quake_NET_$WEBS.available = true;
	return true;
};
quake_NET_$WEBS.Connect = function(host) {
	if(host.length <= 5) return null;
	if(HxOverrides.cca(host,5) == 47) return null;
	if(host.substring(0,5) != "ws://") return null;
	host = "ws://" + host.split("/")[2];
	var tmp;
	try {
		tmp = new quake__$NET_$WEBS_WEBSNETSocket(host);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
	var sock = tmp;
	quake_NET.newsocket = sock;
	quake_NET.AddNewSocket(sock);
	return 0;
};
quake_NET_$WEBS.CheckNewConnections = function() {
	return null;
};
quake_NET_$WEBS.CheckForResend = function() {
	var sock = quake_NET.newsocket;
	if(sock.native_socket.readyState == 1) return 1;
	if(sock.native_socket.readyState != 0) return -1;
	return null;
};
var quake_PR = function() { };
quake_PR.__name__ = true;
quake_PR.CheckEmptyString = function(s) {
	var c = HxOverrides.cca(s,0);
	if(c == null || c <= 32) quake_PR.RunError("Bad string");
};
quake_PR.ValueString = function(type,val,ofs) {
	var val_float = new Float32Array(val);
	var val_int = new Int32Array(val);
	var type1 = type & 32767;
	switch(type1) {
	case 1:
		return quake_PR.GetString(val_int[ofs]);
	case 4:
		return "entity " + val_int[ofs];
	case 6:
		return quake_PR.GetString(quake_PR.functions[val_int[ofs]].name) + "()";
	case 5:
		var def = quake_ED.FieldAtOfs(val_int[ofs]);
		if(def != null) return "." + quake_PR.GetString(def.name);
		return ".";
	case 0:
		return "void";
	case 2:
		return val_float[ofs].toFixed(1);
	case 3:
		return "'" + val_float[ofs].toFixed(1) + " " + val_float[ofs + 1].toFixed(1) + " " + val_float[ofs + 2].toFixed(1) + "'";
	case 7:
		return "pointer";
	default:
		return "bad type " + type1;
	}
};
quake_PR.UglyValueString = function(type,val,ofs) {
	var val_float = new Float32Array(val);
	var val_int = new Int32Array(val);
	var type1 = type & 32767;
	switch(type1) {
	case 1:
		return quake_PR.GetString(val_int[ofs]);
	case 4:
		return Std.string(val_int[ofs]);
	case 6:
		return quake_PR.GetString(quake_PR.functions[val_int[ofs]].name);
	case 5:
		var def = quake_ED.FieldAtOfs(val_int[ofs]);
		if(def != null) return quake_PR.GetString(def.name);
		return "";
	case 0:
		return "void";
	case 2:
		return val_float[ofs].toFixed(6);
	case 3:
		return val_float[ofs].toFixed(6) + " " + val_float[ofs + 1].toFixed(6) + " " + val_float[ofs + 2].toFixed(6);
	default:
		return "bad type " + type1;
	}
};
quake_PR.GlobalString = function(ofs) {
	var def = quake_ED.GlobalAtOfs(ofs);
	var line;
	if(def != null) line = ofs + "(" + quake_PR.GetString(def.name) + ")" + quake_PR.ValueString(def.type,quake_PR._globals,ofs); else line = ofs + "(???)";
	while(line.length <= 20) line += " ";
	return line;
};
quake_PR.GlobalStringNoContents = function(ofs) {
	var def = quake_ED.GlobalAtOfs(ofs);
	var line;
	if(def != null) line = ofs + "(" + quake_PR.GetString(def.name) + ")"; else line = ofs + "(???)";
	while(line.length <= 20) line += " ";
	return line;
};
quake_PR.LoadProgs = function() {
	var progs = quake_COM.LoadFile("progs.dat");
	if(progs == null) quake_Sys.Error("PR.LoadProgs: couldn't load progs.dat");
	quake_Console.DPrint("Programs occupy " + (progs.byteLength >> 10) + "K.\n");
	var view = new DataView(progs);
	var i = view.getUint32(0,true);
	if(i != 6) quake_Sys.Error("progs.dat has wrong version number (" + i + " should be " + 6 + ")");
	if(view.getUint32(4,true) != 5927) quake_Sys.Error("progs.dat system vars have been modified, PR.js is out of date");
	quake_PR.crc = quake_CRC.Block(new Uint8Array(progs));
	quake_PR.stack = [];
	quake_PR.depth = 0;
	quake_PR.localstack = [];
	var _g1 = 0;
	var _g = quake_PR.localstack_size;
	while(_g1 < _g) {
		_g1++;
		quake_PR.localstack.push(0);
	}
	quake_PR.localstack_used = 0;
	var ofs;
	var num;
	ofs = view.getUint32(8,true);
	num = view.getUint32(12,true);
	quake_PR.statements = [];
	var _g2 = 0;
	while(_g2 < num) {
		_g2++;
		quake_PR.statements.push(new quake__$PR_PRStatement(view,ofs));
		ofs += 8;
	}
	ofs = view.getUint32(16,true);
	num = view.getUint32(20,true);
	quake_PR.globaldefs = [];
	var _g3 = 0;
	while(_g3 < num) {
		_g3++;
		quake_PR.globaldefs.push(new quake_PRDef(view,ofs));
		ofs += 8;
	}
	ofs = view.getUint32(24,true);
	num = view.getUint32(28,true);
	quake_PR.fielddefs = [];
	var _g4 = 0;
	while(_g4 < num) {
		_g4++;
		quake_PR.fielddefs.push(new quake_PRDef(view,ofs));
		ofs += 8;
	}
	ofs = view.getUint32(32,true);
	num = view.getUint32(36,true);
	quake_PR.functions = [];
	var _g5 = 0;
	while(_g5 < num) {
		_g5++;
		quake_PR.functions.push(new quake__$PR_PRFunction(view,ofs));
		ofs += 36;
	}
	ofs = view.getUint32(40,true);
	num = view.getUint32(44,true);
	quake_PR.strings = new Uint8Array(num);
	quake_PR.strings.set(new Uint8Array(progs,ofs,num));
	quake_PR.string_temp = quake_PR.NewString("",128);
	quake_PR.netnames = quake_PR.NewString("",quake_SV.svs.maxclients << 5);
	ofs = view.getUint32(48,true);
	num = view.getUint32(52,true);
	quake_PR._globals = new ArrayBuffer(num << 2);
	quake_PR._globals_float = new Float32Array(quake_PR._globals);
	quake_PR._globals_int = new Int32Array(quake_PR._globals);
	var _g6 = 0;
	while(_g6 < num) {
		var i1 = _g6++;
		quake_PR._globals_int[i1] = view.getInt32(ofs + (i1 << 2),true);
	}
	quake_PR.entityfields = view.getUint32(56,true);
	quake_PR.edict_size = 96 + (quake_PR.entityfields << 2);
	var def = quake_ED.FindField("ammo_shells1");
	if(def != null) quake_EdictVarOfs.ammo_shells1 = def.ofs;
	var def1 = quake_ED.FindField("ammo_nails1");
	if(def1 != null) quake_EdictVarOfs.ammo_nails1 = def1.ofs;
	var def2 = quake_ED.FindField("ammo_lava_nails");
	if(def2 != null) quake_EdictVarOfs.ammo_lava_nails = def2.ofs;
	var def3 = quake_ED.FindField("ammo_rockets1");
	if(def3 != null) quake_EdictVarOfs.ammo_rockets1 = def3.ofs;
	var def4 = quake_ED.FindField("ammo_multi_rockets");
	if(def4 != null) quake_EdictVarOfs.ammo_multi_rockets = def4.ofs;
	var def5 = quake_ED.FindField("ammo_cells1");
	if(def5 != null) quake_EdictVarOfs.ammo_cells1 = def5.ofs;
	var def6 = quake_ED.FindField("ammo_plasma");
	if(def6 != null) quake_EdictVarOfs.ammo_plasma = def6.ofs;
	var def7 = quake_ED.FindField("gravity");
	if(def7 != null) quake_EdictVarOfs.gravity = def7.ofs;
	var def8 = quake_ED.FindField("items2");
	if(def8 != null) quake_EdictVarOfs.items2 = def8.ofs;
};
quake_PR.Init = function() {
	quake_Cmd.AddCommand("edict",quake_ED.PrintEdict_f);
	quake_Cmd.AddCommand("edicts",quake_ED.PrintEdicts);
	quake_Cmd.AddCommand("edictcount",quake_ED.Count);
	quake_Cmd.AddCommand("profile",quake_PR.Profile_f);
	quake_Cvar.RegisterVariable("nomonsters","0");
	quake_Cvar.RegisterVariable("gamecfg","0");
	quake_Cvar.RegisterVariable("scratch1","0");
	quake_Cvar.RegisterVariable("scratch2","0");
	quake_Cvar.RegisterVariable("scratch3","0");
	quake_Cvar.RegisterVariable("scratch4","0");
	quake_Cvar.RegisterVariable("savedgamecfg","0",true);
	quake_Cvar.RegisterVariable("saved1","0",true);
	quake_Cvar.RegisterVariable("saved2","0",true);
	quake_Cvar.RegisterVariable("saved3","0",true);
	quake_Cvar.RegisterVariable("saved4","0",true);
};
quake_PR.PrintStatement = function(s) {
	var text;
	if(s.op < quake_PR.opnames.length) {
		text = quake_PR.opnames[s.op] + " ";
		while(text.length <= 9) text += " ";
	} else text = "";
	if(s.op == 49 || s.op == 50) text += quake_PR.GlobalString(s.a) + "branch " + s.b; else if(s.op == 61) text += "branch " + s.a; else if(s.op >= 31 && s.op <= 36) text += quake_PR.GlobalString(s.a) + quake_PR.GlobalStringNoContents(s.b); else {
		if(s.a != 0) text += quake_PR.GlobalString(s.a);
		if(s.b != 0) text += quake_PR.GlobalString(s.b);
		if(s.c != 0) text += quake_PR.GlobalStringNoContents(s.c);
	}
	quake_Console.Print(text + "\n");
};
quake_PR.StackTrace = function() {
	if(quake_PR.depth == 0) {
		quake_Console.Print("<NO STACK>\n");
		return;
	}
	quake_PR.stack[quake_PR.depth] = new quake__$PR_PRStackItem(quake_PR.xstatement,quake_PR.xfunction);
	while(quake_PR.depth >= 0) {
		var f = quake_PR.stack[quake_PR.depth--].func;
		if(f == null) {
			quake_Console.Print("<NO FUNCTION>\n");
			continue;
		}
		var file = quake_PR.GetString(f.file);
		while(file.length <= 11) file += " ";
		quake_Console.Print(file + " : " + quake_PR.GetString(f.name) + "\n");
	}
	quake_PR.depth = 0;
};
quake_PR.Profile_f = function() {
	if(!quake_SV.server.active) return;
	var num = 0;
	while(true) {
		var max = 0;
		var best = null;
		var _g = 0;
		var _g1 = quake_PR.functions;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if(f.profile > max) {
				max = f.profile;
				best = f;
			}
		}
		if(best == null) return;
		if(num < 10) {
			var profile = best.profile == null?"null":"" + best.profile;
			while(profile.length <= 6) profile = " " + profile;
			quake_Console.Print(profile + " " + quake_PR.GetString(best.name) + "\n");
		}
		++num;
		best.profile = 0;
	}
};
quake_PR.RunError = function(error) {
	quake_PR.PrintStatement(quake_PR.statements[quake_PR.xstatement]);
	quake_PR.StackTrace();
	quake_Console.Print(error + "\n");
	quake_Host.Error("Program error");
};
quake_PR.EnterFunction = function(f) {
	quake_PR.stack[quake_PR.depth++] = new quake__$PR_PRStackItem(quake_PR.xstatement,quake_PR.xfunction);
	var c = f.locals;
	if(quake_PR.localstack_used + c > quake_PR.localstack_size) quake_PR.RunError("PR.EnterFunction: locals stack overflow\n");
	var _g = 0;
	while(_g < c) {
		var i = _g++;
		quake_PR.localstack[quake_PR.localstack_used + i] = quake_PR._globals_int[f.parm_start + i];
	}
	quake_PR.localstack_used += c;
	var o = f.parm_start;
	var _g1 = 0;
	var _g2 = f.numparms;
	while(_g1 < _g2) {
		var i1 = _g1++;
		var _g3 = 0;
		var _g21 = f.parm_size[i1];
		while(_g3 < _g21) {
			var j = _g3++;
			quake_PR._globals_int[o++] = quake_PR._globals_int[4 + i1 * 3 + j];
		}
	}
	quake_PR.xfunction = f;
	return f.first_statement - 1;
};
quake_PR.LeaveFunction = function() {
	if(quake_PR.depth <= 0) quake_Sys.Error("prog stack underflow");
	var c = quake_PR.xfunction.locals;
	quake_PR.localstack_used -= c;
	if(quake_PR.localstack_used < 0) quake_PR.RunError("PR.LeaveFunction: locals stack underflow\n");
	c--;
	while(c >= 0) {
		quake_PR._globals_int[quake_PR.xfunction.parm_start + c] = quake_PR.localstack[quake_PR.localstack_used + c];
		c--;
	}
	quake_PR.xfunction = quake_PR.stack[--quake_PR.depth].func;
	return quake_PR.stack[quake_PR.depth].stmt;
};
quake_PR.ExecuteProgram = function(fnum) {
	if(fnum == 0 || fnum >= quake_PR.functions.length) {
		if(quake_PR._globals_int[28] != 0) quake_ED.Print(quake_SV.server.edicts[quake_PR._globals_int[28]]);
		quake_Host.Error("PR.ExecuteProgram: NULL function");
	}
	var runaway = 100000;
	quake_PR.trace = false;
	var exitdepth = quake_PR.depth;
	var s = quake_PR.EnterFunction(quake_PR.functions[fnum]);
	while(true) {
		++s;
		var st = quake_PR.statements[s];
		if(--runaway == 0) quake_PR.RunError("runaway loop error");
		++quake_PR.xfunction.profile;
		quake_PR.xstatement = s;
		if(quake_PR.trace) quake_PR.PrintStatement(st);
		var _g = st.op;
		switch(_g) {
		case 6:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] + quake_PR._globals_float[st.b];
			break;
		case 7:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] + quake_PR._globals_float[st.b];
			quake_PR._globals_float[st.c + 1] = quake_PR._globals_float[st.a + 1] + quake_PR._globals_float[st.b + 1];
			quake_PR._globals_float[st.c + 2] = quake_PR._globals_float[st.a + 2] + quake_PR._globals_float[st.b + 2];
			break;
		case 8:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] - quake_PR._globals_float[st.b];
			break;
		case 9:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] - quake_PR._globals_float[st.b];
			quake_PR._globals_float[st.c + 1] = quake_PR._globals_float[st.a + 1] - quake_PR._globals_float[st.b + 1];
			quake_PR._globals_float[st.c + 2] = quake_PR._globals_float[st.a + 2] - quake_PR._globals_float[st.b + 2];
			break;
		case 1:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] * quake_PR._globals_float[st.b];
			break;
		case 2:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] * quake_PR._globals_float[st.b] + quake_PR._globals_float[st.a + 1] * quake_PR._globals_float[st.b + 1] + quake_PR._globals_float[st.a + 2] * quake_PR._globals_float[st.b + 2];
			break;
		case 3:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] * quake_PR._globals_float[st.b];
			quake_PR._globals_float[st.c + 1] = quake_PR._globals_float[st.a] * quake_PR._globals_float[st.b + 1];
			quake_PR._globals_float[st.c + 2] = quake_PR._globals_float[st.a] * quake_PR._globals_float[st.b + 2];
			break;
		case 4:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.b] * quake_PR._globals_float[st.a];
			quake_PR._globals_float[st.c + 1] = quake_PR._globals_float[st.b] * quake_PR._globals_float[st.a + 1];
			quake_PR._globals_float[st.c + 2] = quake_PR._globals_float[st.b] * quake_PR._globals_float[st.a + 2];
			break;
		case 5:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] / quake_PR._globals_float[st.b];
			break;
		case 64:
			quake_PR._globals_float[st.c] = (quake_PR._globals_float[st.a] | 0) & (quake_PR._globals_float[st.b] | 0);
			break;
		case 65:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] | 0 | (quake_PR._globals_float[st.b] | 0);
			break;
		case 21:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] >= quake_PR._globals_float[st.b]?1.0:0.0;
			break;
		case 20:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] <= quake_PR._globals_float[st.b]?1.0:0.0;
			break;
		case 23:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] > quake_PR._globals_float[st.b]?1.0:0.0;
			break;
		case 22:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] < quake_PR._globals_float[st.b]?1.0:0.0;
			break;
		case 62:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] != 0.0 && quake_PR._globals_float[st.b] != 0.0?1.0:0.0;
			break;
		case 63:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] != 0.0 || quake_PR._globals_float[st.b] != 0.0?1.0:0.0;
			break;
		case 44:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] == 0.0?1.0:0.0;
			break;
		case 45:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] == 0.0 && quake_PR._globals_float[st.a + 1] == 0.0 && quake_PR._globals_float[st.a + 2] == 0.0?1.0:0.0;
			break;
		case 46:
			if(quake_PR._globals_int[st.a] != 0) quake_PR._globals_float[st.c] = quake_PR.strings[quake_PR._globals_int[st.a]] == 0?1.0:0.0; else quake_PR._globals_float[st.c] = 1.0;
			break;
		case 48:case 47:
			quake_PR._globals_float[st.c] = quake_PR._globals_int[st.a] == 0?1.0:0.0;
			break;
		case 10:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] == quake_PR._globals_float[st.b]?1.0:0.0;
			break;
		case 11:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] == quake_PR._globals_float[st.b] && quake_PR._globals_float[st.a + 1] == quake_PR._globals_float[st.b + 1] && quake_PR._globals_float[st.a + 2] == quake_PR._globals_float[st.b + 2]?1.0:0.0;
			break;
		case 12:
			var v = quake_PR.GetString(quake_PR._globals_int[st.a]) == quake_PR.GetString(quake_PR._globals_int[st.b])?1.0:0.0;
			quake_PR._globals_float[st.c] = v;
			break;
		case 13:case 14:
			quake_PR._globals_float[st.c] = quake_PR._globals_int[st.a] == quake_PR._globals_int[st.b]?1.0:0.0;
			break;
		case 15:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] != quake_PR._globals_float[st.b]?1.0:0.0;
			break;
		case 16:
			quake_PR._globals_float[st.c] = quake_PR._globals_float[st.a] != quake_PR._globals_float[st.b] || quake_PR._globals_float[st.a + 1] != quake_PR._globals_float[st.b + 1] || quake_PR._globals_float[st.a + 2] != quake_PR._globals_float[st.b + 2]?1.0:0.0;
			break;
		case 17:
			var v1 = quake_PR.GetString(quake_PR._globals_int[st.a]) != quake_PR.GetString(quake_PR._globals_int[st.b])?1.0:0.0;
			quake_PR._globals_float[st.c] = v1;
			break;
		case 18:case 19:
			quake_PR._globals_float[st.c] = quake_PR._globals_int[st.a] != quake_PR._globals_int[st.b]?1.0:0.0;
			break;
		case 31:case 34:case 35:case 33:case 36:
			quake_PR._globals_int[st.b] = quake_PR._globals_int[st.a];
			break;
		case 32:
			quake_PR._globals_int[st.b] = quake_PR._globals_int[st.a];
			quake_PR._globals_int[st.b + 1] = quake_PR._globals_int[st.a + 1];
			quake_PR._globals_int[st.b + 2] = quake_PR._globals_int[st.a + 2];
			break;
		case 37:case 40:case 41:case 39:case 42:
			var ptr = quake_PR._globals_int[st.b];
			quake_SV.server.edicts[Math.floor(ptr / quake_PR.edict_size)]._v_int[ptr % quake_PR.edict_size - 96 >> 2] = quake_PR._globals_int[st.a];
			break;
		case 38:
			var ed = quake_SV.server.edicts[Math.floor(quake_PR._globals_int[st.b] / quake_PR.edict_size)];
			var ptr1 = quake_PR._globals_int[st.b] % quake_PR.edict_size - 96 >> 2;
			ed._v_int[ptr1] = quake_PR._globals_int[st.a];
			ed._v_int[ptr1 + 1] = quake_PR._globals_int[st.a + 1];
			ed._v_int[ptr1 + 2] = quake_PR._globals_int[st.a + 2];
			break;
		case 30:
			var ed1 = quake_PR._globals_int[st.a];
			if(ed1 == 0 && !quake_SV.server.loading) quake_PR.RunError("assignment to world entity");
			quake_PR._globals_int[st.c] = ed1 * quake_PR.edict_size + 96 + (quake_PR._globals_int[st.b] << 2);
			break;
		case 24:case 28:case 27:case 26:case 29:
			quake_PR._globals_int[st.c] = quake_SV.server.edicts[quake_PR._globals_int[st.a]]._v_int[quake_PR._globals_int[st.b]];
			break;
		case 25:
			var ed2 = quake_SV.server.edicts[quake_PR._globals_int[st.a]];
			var ptr2 = quake_PR._globals_int[st.b];
			quake_PR._globals_int[st.c] = ed2._v_int[ptr2];
			quake_PR._globals_int[st.c + 1] = ed2._v_int[ptr2 + 1];
			quake_PR._globals_int[st.c + 2] = ed2._v_int[ptr2 + 2];
			break;
		case 50:
			if(quake_PR._globals_int[st.a] == 0) s += st.b - 1;
			break;
		case 49:
			if(quake_PR._globals_int[st.a] != 0) s += st.b - 1;
			break;
		case 61:
			s += st.a - 1;
			break;
		case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 58:case 59:
			if(quake_PR._globals_int[st.a] == 0) quake_PR.RunError("NULL function");
			var newf = quake_PR.functions[quake_PR._globals_int[st.a]];
			if(newf.first_statement < 0) {
				var idx = -newf.first_statement;
				if(idx >= quake_PF.builtin.length) quake_PR.RunError("Bad builtin call number");
				quake_PF.argc = st.op - 51;
				quake_PF.builtin[idx]();
				continue;
			}
			s = quake_PR.EnterFunction(newf);
			break;
		case 0:case 43:
			quake_PR._globals_int[1] = quake_PR._globals_int[st.a];
			quake_PR._globals_int[1 + 1] = quake_PR._globals_int[st.a + 1];
			quake_PR._globals_int[1 + 2] = quake_PR._globals_int[st.a + 2];
			s = quake_PR.LeaveFunction();
			if(quake_PR.depth == exitdepth) return;
			break;
		case 60:
			var ed3 = quake_SV.server.edicts[quake_PR._globals_int[28]];
			ed3._v_float[46] = quake_PR._globals_float[31] + 0.1;
			ed3._v_float[30] = quake_PR._globals_float[st.a];
			ed3._v_int[44] = quake_PR._globals_int[st.b];
			break;
		default:
			quake_PR.RunError("Bad opcode " + st.op);
		}
	}
};
quake_PR.GetString = function(num) {
	var buf_b = "";
	var _g1 = num;
	var _g = quake_PR.strings.length;
	while(_g1 < _g) {
		var num1 = _g1++;
		if(quake_PR.strings[num1] == 0) break;
		buf_b += String.fromCharCode(quake_PR.strings[num1]);
	}
	return buf_b;
};
quake_PR.NewString = function(s,length) {
	var ofs = quake_PR.strings.length;
	var old_strings = quake_PR.strings;
	quake_PR.strings = new Uint8Array(ofs + length);
	quake_PR.strings.set(old_strings);
	var end = s.length >= length?length - 1:s.length;
	var _g = 0;
	while(_g < end) {
		var i = _g++;
		quake_PR.strings[ofs + i] = HxOverrides.cca(s,i);
	}
	return ofs;
};
quake_PR.TempString = function(string) {
	if(string.length > 127) string = string.substring(0,127);
	var _g1 = 0;
	var _g = string.length;
	while(_g1 < _g) {
		var i = _g1++;
		quake_PR.strings[quake_PR.string_temp + i] = HxOverrides.cca(string,i);
	}
	quake_PR.strings[quake_PR.string_temp + string.length] = 0;
};
var quake_VID = function() { };
quake_VID.__name__ = true;
quake_VID.SetPalette = function() {
	var palette = quake_COM.LoadFile("gfx/palette.lmp");
	if(palette == null) quake_Sys.Error("Couldn't load gfx/palette.lmp");
	var pal = new Uint8Array(palette);
	var src = 0;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		quake_VID.d_8to24table[i] = pal[src] + (pal[src + 1] << 8) + (pal[src + 2] << 16);
		src += 3;
	}
};
quake_VID.Init = function() {
	window.document.getElementById("progress").style.display = "none";
	quake_GL.Init();
	quake_VID.SetPalette();
};
var quake_Q = function() { };
quake_Q.__name__ = true;
quake_Q.memstr = function(src) {
	var dest = [];
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(src[i] == 0) break;
		dest.push(String.fromCharCode(src[i]));
	}
	return dest.join("");
};
quake_Q.strmem = function(src) {
	var buf = new ArrayBuffer(src.length);
	var dest = new Uint8Array(buf);
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		dest[i] = HxOverrides.cca(src,i) & 255;
	}
	return buf;
};
quake_Q.atoi = function(str) {
	if(str == null) return 0;
	var ptr;
	var sign;
	if(HxOverrides.cca(str,0) == 45) {
		sign = -1;
		ptr = 1;
	} else {
		sign = 1;
		ptr = 0;
	}
	var c = HxOverrides.cca(str,ptr);
	var c2 = HxOverrides.cca(str,ptr + 1);
	var val = 0;
	if(c == 48 && (c2 == 120 || c2 == 88)) {
		ptr += 2;
		while(true) {
			var tmp;
			var index = ptr++;
			tmp = HxOverrides.cca(str,index);
			c = tmp;
			if(c >= 48 && c <= 57) val = (val << 4) + c - 48; else if(c >= 97 && c <= 102) val = (val << 4) + c - 87; else if(c >= 65 && c <= 70) val = (val << 4) + c - 55; else return val * sign;
		}
	}
	if(c == 39) {
		if(c2 == null) return 0;
		return sign * c2;
	}
	while(true) {
		var tmp1;
		var index1 = ptr++;
		tmp1 = HxOverrides.cca(str,index1);
		c = tmp1;
		if(c == null || c <= 47 || c >= 58) return val * sign;
		val = val * 10 + c - 48;
	}
};
quake_Q.atof = function(str) {
	if(str == null) return 0.0;
	var ptr;
	var val;
	var sign;
	var c;
	var c2;
	if(HxOverrides.cca(str,0) == 45) {
		sign = -1.0;
		ptr = 1;
	} else {
		sign = 1.0;
		ptr = 0;
	}
	c = HxOverrides.cca(str,ptr);
	c2 = HxOverrides.cca(str,ptr + 1);
	if(c == 48 && (c2 == 120 || c2 == 88)) {
		ptr += 2;
		val = 0.0;
		while(true) {
			var tmp;
			var index = ptr++;
			tmp = HxOverrides.cca(str,index);
			c = tmp;
			if(c >= 48 && c <= 57) val = val * 16.0 + c - 48; else if(c >= 97 && c <= 102) val = val * 16.0 + c - 87; else if(c >= 65 && c <= 70) val = val * 16.0 + c - 55; else return val * sign;
		}
	}
	if(c == 39) {
		if(isNaN(c2)) return 0.0;
		return sign * c2;
	}
	val = parseFloat(str);
	if(isNaN(val)) return 0.0;
	return val;
};
quake_Q.btoa = function(src) {
	var val = [];
	var len = src.length - src.length % 3;
	var i = 0;
	while(i < len) {
		var c = (src[i] << 16) + (src[i + 1] << 8) + src[i + 2];
		val.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 18) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c & 63));
		i += 3;
	}
	if(src.length - len == 1) {
		var c1 = src[len];
		val.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c1 >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((c1 & 3) << 4) + "==");
	} else if(src.length - len == 2) {
		var c2 = (src[len] << 8) + src[len + 1];
		val.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c2 >> 10) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c2 >> 4 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((c2 & 15) << 2) + "=");
	}
	return val.join("");
};
var quake_S = function() { };
quake_S.__name__ = true;
quake_S.Init = function() {
	quake_Console.Print("\nSound Initialization\n");
	quake_Cmd.AddCommand("play",quake_S.Play);
	quake_Cmd.AddCommand("playvol",quake_S.PlayVol);
	quake_Cmd.AddCommand("stopsound",quake_S.StopAllSounds);
	quake_Cmd.AddCommand("soundlist",quake_S.SoundList);
	quake_S.nosound = quake_Cvar.RegisterVariable("nosound",quake_COM.CheckParm("-nosound") != null?"1":"0");
	quake_S.volume = quake_Cvar.RegisterVariable("volume","0.7",true);
	quake_S.precache = quake_Cvar.RegisterVariable("precache","1");
	quake_S.bgmvolume = quake_Cvar.RegisterVariable("bgmvolume","1",true);
	quake_S.ambient_level = quake_Cvar.RegisterVariable("ambient_level","0.3");
	quake_S.ambient_fade = quake_Cvar.RegisterVariable("ambient_fade","100");
	quake_S.started = true;
	var ambient_sfx = ["water1","wind2"];
	var _g1 = 0;
	var _g = ambient_sfx.length;
	while(_g1 < _g) {
		var i = _g1++;
		var ch = new quake__$S_Channel(quake_S.PrecacheSound("ambience/" + ambient_sfx[i] + ".wav"));
		quake_S.ambient_channels[i] = ch;
		if(!quake_S.LoadSound(ch.sfx)) continue;
		if(ch.sfx.cache.loopstart == null) {
			quake_Console.Print("Sound ambience/" + ch.sfx.name + ".wav not looped\n");
			continue;
		}
		ch.audio = ch.sfx.cache.data.cloneNode();
	}
	quake_Console.sfx_talk = quake_S.PrecacheSound("misc/talk.wav");
};
quake_S.PrecacheSound = function(name) {
	if(quake_S.nosound.value != 0) return null;
	var sfx = null;
	var _g = 0;
	var _g1 = quake_S.known_sfx;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		if(s.name == name) {
			sfx = s;
			break;
		}
	}
	if(sfx == null) {
		sfx = new quake_Sfx(name);
		quake_S.known_sfx.push(sfx);
	}
	if(quake_S.precache.value != 0) quake_S.LoadSound(sfx);
	return sfx;
};
quake_S.PickChannel = function(entnum,entchannel) {
	var i = null;
	var channel = null;
	if(entchannel != 0) {
		i = 0;
		while(i < quake_S.channels.length) {
			channel = quake_S.channels[i++];
			if(channel == null) continue;
			if(channel.entnum == entnum && (channel.entchannel == entchannel || entchannel == -1)) {
				channel.sfx = null;
				if(channel.audio != null) {
					channel.audio.pause();
					channel.audio = null;
				}
				break;
			}
		}
	}
	if(entchannel == 0 || i == quake_S.channels.length) {
		i = 0;
		while(i < quake_S.channels.length) {
			channel = quake_S.channels[i++];
			if(channel == null) break;
			if(channel.sfx == null) break;
		}
	}
	if(i == quake_S.channels.length) {
		channel = new quake__$S_Channel();
		quake_S.channels.push(channel);
	}
	return channel;
};
quake_S.Spatialize = function(ch) {
	if(ch.entnum == quake_CL.state.viewentity) {
		ch.leftvol = ch.master_vol;
		ch.rightvol = ch.master_vol;
		return;
	}
	var source_0 = ch.origin[0] - quake_S.listener_origin[0];
	var source_1 = ch.origin[1] - quake_S.listener_origin[1];
	var source_2 = ch.origin[2] - quake_S.listener_origin[2];
	var dist = Math.sqrt(source_0 * source_0 + source_1 * source_1 + source_2 * source_2);
	if(dist != 0.0) {
		source_0 /= dist;
		source_1 /= dist;
		source_2 /= dist;
	}
	dist *= ch.dist_mult;
	var dot = quake_S.listener_right[0] * source_0 + quake_S.listener_right[1] * source_1 + quake_S.listener_right[2] * source_2;
	ch.rightvol = ch.master_vol * (1.0 - dist) * (1.0 + dot);
	if(ch.rightvol < 0.0) ch.rightvol = 0.0;
	ch.leftvol = ch.master_vol * (1.0 - dist) * (1.0 - dot);
	if(ch.leftvol < 0.0) ch.leftvol = 0.0;
};
quake_S.StartSound = function(entnum,entchannel,sfx,origin,vol,attenuation) {
	if(quake_S.nosound.value != 0 || sfx == null) return;
	var target_chan = quake_S.PickChannel(entnum,entchannel);
	target_chan.origin = new Float32Array(origin);
	target_chan.dist_mult = attenuation * 0.001;
	target_chan.master_vol = vol;
	target_chan.entnum = entnum;
	target_chan.entchannel = entchannel;
	quake_S.Spatialize(target_chan);
	if(target_chan.leftvol == 0.0 && target_chan.rightvol == 0.0) return;
	if(!quake_S.LoadSound(sfx)) {
		target_chan.sfx = null;
		return;
	}
	target_chan.sfx = sfx;
	target_chan.pos = 0.0;
	target_chan.end = quake_Host.realtime + sfx.cache.length;
	target_chan.audio = sfx.cache.data.cloneNode();
	var volume = (target_chan.leftvol + target_chan.rightvol) * 0.5;
	if(volume > 1.0) volume = 1.0;
	target_chan.audio.volume = volume * quake_S.volume.value;
	target_chan.audio.play();
};
quake_S.StopSound = function(entnum,entchannel) {
	if(quake_S.nosound.value != 0) return;
	var _g = 0;
	var _g1 = quake_S.channels;
	while(_g < _g1.length) {
		var ch = _g1[_g];
		++_g;
		if(ch == null) continue;
		if(ch.entnum == entnum && ch.entchannel == entchannel) {
			ch.end = 0.0;
			ch.sfx = null;
			if(ch.audio != null) {
				ch.audio.pause();
				ch.audio = null;
			}
			return;
		}
	}
};
quake_S.StopAllSounds = function() {
	if(quake_S.nosound.value != 0) return;
	var _g = 0;
	var _g1 = quake_S.ambient_channels;
	while(_g < _g1.length) {
		var ch = _g1[_g];
		++_g;
		ch.master_vol = 0.0;
		if(ch.audio != null) ch.audio.pause();
	}
	var _g2 = 0;
	var _g11 = quake_S.channels;
	while(_g2 < _g11.length) {
		var ch1 = _g11[_g2];
		++_g2;
		if(ch1 == null) continue;
		if(ch1.audio != null) ch1.audio.pause();
	}
	quake_S.channels = [];
	var _g3 = 0;
	var _g12 = quake_S.static_channels;
	while(_g3 < _g12.length) {
		var ch2 = _g12[_g3];
		++_g3;
		ch2.audio.pause();
	}
	quake_S.static_channels = [];
};
quake_S.StaticSound = function(sfx,origin,vol,attenuation) {
	if(quake_S.nosound.value != 0 || sfx == null) return;
	if(!quake_S.LoadSound(sfx)) return;
	if(sfx.cache.loopstart == null) {
		quake_Console.Print("Sound " + sfx.name + " not looped\n");
		return;
	}
	var ss = new quake__$S_Channel(sfx);
	ss.origin = new Float32Array(origin);
	ss.master_vol = vol;
	ss.dist_mult = attenuation * 0.000015625;
	ss.end = quake_Host.realtime + sfx.cache.length;
	quake_S.static_channels.push(ss);
	ss.audio = sfx.cache.data.cloneNode();
	ss.audio.pause();
};
quake_S.SoundList = function() {
	var total = 0;
	var _g = 0;
	var _g1 = quake_S.known_sfx;
	while(_g < _g1.length) {
		var sfx = _g1[_g];
		++_g;
		var sc = sfx.cache;
		if(sc == null) continue;
		var size = sc.size == null?"null":"" + sc.size;
		total += sc.size;
		while(size.length <= 5) size = " " + size;
		if(sc.loopstart != null) size = "L" + size; else size = " " + size;
		quake_Console.Print(size + " : " + sfx.name + "\n");
	}
	quake_Console.Print("Total resident: " + total + "\n");
};
quake_S.UpdateAmbientSounds = function() {
	if(quake_CL.state.worldmodel == null) return;
	var l = quake_Mod_$Brush.PointInLeaf(quake_S.listener_origin,quake_CL.state.worldmodel);
	if(l == null || quake_S.ambient_level.value == 0) {
		var _g = 0;
		var _g1 = quake_S.ambient_channels;
		while(_g < _g1.length) {
			var ch = _g1[_g];
			++_g;
			ch.master_vol = 0.0;
			if(ch.audio != null) {
				if(!ch.audio.paused) ch.audio.pause();
			}
		}
		return;
	}
	var _g11 = 0;
	var _g2 = quake_S.ambient_channels.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var ch1 = quake_S.ambient_channels[i];
		if(ch1.audio == null) continue;
		var vol = quake_S.ambient_level.value * l.ambient_level[i];
		if(vol < 8.0) vol = 0.0;
		vol /= 255.0;
		if(ch1.master_vol < vol) {
			ch1.master_vol += quake_Host.frametime * quake_S.ambient_fade.value / 255.0;
			if(ch1.master_vol > vol) ch1.master_vol = vol;
		} else if(ch1.master_vol > vol) {
			ch1.master_vol -= quake_Host.frametime * quake_S.ambient_fade.value / 255.0;
			if(ch1.master_vol < vol) ch1.master_vol = vol;
		}
		if(ch1.master_vol == 0.0) {
			if(!ch1.audio.paused) ch1.audio.pause();
			continue;
		}
		if(ch1.master_vol > 1.0) ch1.master_vol = 1.0;
		ch1.audio.volume = ch1.master_vol * quake_S.volume.value;
		var sc = ch1.sfx.cache;
		if(ch1.audio.paused) {
			ch1.audio.play();
			ch1.end = quake_Host.realtime + sc.length;
			continue;
		}
		if(quake_Host.realtime >= ch1.end) {
			try {
				ch1.audio.currentTime = sc.loopstart;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				ch1.end = quake_Host.realtime;
				continue;
			}
			ch1.end = quake_Host.realtime + sc.length - sc.loopstart;
		}
	}
};
quake_S.UpdateDynamicSounds = function() {
	var _g = 0;
	var _g1 = quake_S.channels;
	while(_g < _g1.length) {
		var ch = _g1[_g];
		++_g;
		if(ch == null) continue;
		if(ch.sfx == null) continue;
		if(quake_Host.realtime >= ch.end) {
			var sc = ch.sfx.cache;
			if(sc.loopstart != null) {
				try {
					ch.audio.currentTime = sc.loopstart;
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					ch.end = quake_Host.realtime;
					continue;
				}
				ch.end = quake_Host.realtime + sc.length - sc.loopstart;
			} else {
				ch.sfx = null;
				ch.audio = null;
				continue;
			}
		}
		quake_S.Spatialize(ch);
		var volume = (ch.leftvol + ch.rightvol) * 0.5;
		if(volume > 1.0) volume = 1.0;
		ch.audio.volume = volume * quake_S.volume.value;
	}
};
quake_S.UpdateStaticSounds = function() {
	var _g = 0;
	var _g1 = quake_S.static_channels;
	while(_g < _g1.length) {
		var ch = _g1[_g];
		++_g;
		quake_S.Spatialize(ch);
	}
	var _g11 = 0;
	var _g2 = quake_S.static_channels.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var ch1 = quake_S.static_channels[i];
		if(ch1.leftvol == 0.0 && ch1.rightvol == 0.0) continue;
		var sfx = ch1.sfx;
		var _g3 = i + 1;
		var _g21 = quake_S.static_channels.length;
		while(_g3 < _g21) {
			var j = _g3++;
			var ch2 = quake_S.static_channels[j];
			if(sfx == ch2.sfx) {
				ch1.leftvol += ch2.leftvol;
				ch1.rightvol += ch2.rightvol;
				ch2.leftvol = 0.0;
				ch2.rightvol = 0.0;
			}
		}
	}
	var _g4 = 0;
	var _g12 = quake_S.static_channels;
	while(_g4 < _g12.length) {
		var ch3 = _g12[_g4];
		++_g4;
		var volume = (ch3.leftvol + ch3.rightvol) * 0.5;
		if(volume > 1.0) volume = 1.0;
		if(volume == 0.0) {
			if(!ch3.audio.paused) ch3.audio.pause();
			continue;
		}
		ch3.audio.volume = volume * quake_S.volume.value;
		var sc = ch3.sfx.cache;
		if(ch3.audio.paused) {
			ch3.audio.play();
			ch3.end = quake_Host.realtime + sc.length;
			continue;
		}
		if(quake_Host.realtime >= ch3.end) {
			try {
				ch3.audio.currentTime = sc.loopstart;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				ch3.end = quake_Host.realtime;
				continue;
			}
			ch3.end = quake_Host.realtime + sc.length - sc.loopstart;
		}
	}
};
quake_S.Update = function(origin,forward,right,up) {
	if(quake_S.nosound.value != 0) return;
	quake_S.listener_origin[0] = origin[0];
	quake_S.listener_origin[1] = origin[1];
	quake_S.listener_origin[2] = origin[2];
	quake_S.listener_forward[0] = forward[0];
	quake_S.listener_forward[1] = forward[1];
	quake_S.listener_forward[2] = forward[2];
	quake_S.listener_right[0] = right[0];
	quake_S.listener_right[1] = right[1];
	quake_S.listener_right[2] = right[2];
	quake_S.listener_up[0] = up[0];
	quake_S.listener_up[1] = up[1];
	quake_S.listener_up[2] = up[2];
	if(quake_S.volume.value < 0.0) quake_S.volume.setValue(0.0); else if(quake_S.volume.value > 1.0) quake_S.volume.setValue(1.0);
	quake_S.UpdateAmbientSounds();
	quake_S.UpdateDynamicSounds();
	quake_S.UpdateStaticSounds();
};
quake_S.Play = function() {
	if(quake_S.nosound.value != 0) return;
	var _g1 = 1;
	var _g = quake_Cmd.argv.length;
	while(_g1 < _g) {
		var i = _g1++;
		var sfx = quake_S.PrecacheSound(quake_COM.DefaultExtension(quake_Cmd.argv[i],".wav"));
		if(sfx != null) quake_S.StartSound(quake_CL.state.viewentity,0,sfx,quake_S.listener_origin,1.0,1.0);
	}
};
quake_S.PlayVol = function() {
	if(quake_S.nosound.value != 0) return;
	var i = 1;
	while(i < quake_Cmd.argv.length) {
		var sfx = quake_S.PrecacheSound(quake_COM.DefaultExtension(quake_Cmd.argv[i],".wav"));
		if(sfx != null) quake_S.StartSound(quake_CL.state.viewentity,0,sfx,quake_S.listener_origin,quake_Q.atof(quake_Cmd.argv[i + 1]),1.0);
		i += 2;
	}
};
quake_S.LoadSound = function(s) {
	if(quake_S.nosound.value != 0) return false;
	if(s.cache != null) return true;
	var sc = new quake__$S_SfxCache();
	var data = quake_COM.LoadFile("sound/" + s.name);
	if(data == null) {
		quake_Console.Print("Couldn't load sound/" + s.name + "\n");
		return false;
	}
	var view = new DataView(data);
	if(view.getUint32(0,true) != 1179011410 || view.getUint32(8,true) != 1163280727) {
		quake_Console.Print("Missing RIFF/WAVE chunks\n");
		return false;
	}
	var p = 12;
	var fmt = null;
	var dataofs = null;
	var datalen = null;
	var cue = null;
	var loopstart = null;
	var samples = null;
	while(p < data.byteLength) {
		var _g = view.getUint32(p,true);
		switch(_g) {
		case 544501094:
			if(view.getInt16(p + 8,true) != 1) {
				quake_Console.Print("Microsoft PCM format only\n");
				return false;
			}
			fmt = { channels : view.getUint16(p + 10,true), samplesPerSec : view.getUint32(p + 12,true), avgBytesPerSec : view.getUint32(p + 16,true), blockAlign : view.getUint16(p + 20,true), bitsPerSample : view.getUint16(p + 22,true)};
			break;
		case 1635017060:
			dataofs = p + 8;
			datalen = view.getUint32(p + 4,true);
			break;
		case 543520099:
			cue = true;
			loopstart = view.getUint32(p + 32,true);
			break;
		case 1414744396:
			if(cue) {
				cue = false;
				if(view.getUint32(p + 28,true) == 1802658157) samples = loopstart + view.getUint32(p + 24,true);
			}
			break;
		}
		p += view.getUint32(p + 4,true) + 8;
		if((p & 1) != 0) ++p;
	}
	if(fmt == null) {
		quake_Console.Print("Missing fmt chunk\n");
		return false;
	}
	if(dataofs == null) {
		quake_Console.Print("Missing data chunk\n");
		return false;
	}
	if(loopstart != null) sc.loopstart = loopstart * fmt.blockAlign / fmt.samplesPerSec;
	if(samples != null) sc.length = samples / fmt.samplesPerSec; else sc.length = datalen / fmt.avgBytesPerSec;
	sc.size = datalen + 44;
	if((sc.size & 1) != 0) ++sc.size;
	var out = new ArrayBuffer(sc.size);
	view = new DataView(out);
	view.setUint32(0,1179011410,true);
	view.setUint32(4,sc.size - 8,true);
	view.setUint32(8,1163280727,true);
	view.setUint32(12,544501094,true);
	view.setUint32(16,16,true);
	view.setUint16(20,1,true);
	view.setUint16(22,fmt.channels,true);
	view.setUint32(24,fmt.samplesPerSec,true);
	view.setUint32(28,fmt.avgBytesPerSec,true);
	view.setUint16(32,fmt.blockAlign,true);
	view.setUint16(34,fmt.bitsPerSample,true);
	view.setUint32(36,1635017060,true);
	view.setUint32(40,datalen,true);
	new Uint8Array(out,44,datalen).set(new Uint8Array(data,dataofs,datalen));
	sc.data = new Audio("data:audio/wav;base64," + quake_Q.btoa(new Uint8Array(out)));
	s.cache = sc;
	return true;
};
var quake__$S_Channel = function(s) {
	this.sfx = s;
	this.end = 0.0;
	this.master_vol = 0.0;
};
quake__$S_Channel.__name__ = true;
var quake__$S_SfxCache = function() {
};
quake__$S_SfxCache.__name__ = true;
var quake__$Vec_Vec_$Impl_$ = {};
quake__$Vec_Vec_$Impl_$.__name__ = true;
quake__$Vec_Vec_$Impl_$.Perpendicular = function(v) {
	var pos = 0;
	var minelem = 1.0;
	if(Math.abs(v[0]) < 1.0) {
		pos = 0;
		minelem = Math.abs(v[0]);
	}
	if(Math.abs(v[1]) < minelem) {
		pos = 1;
		minelem = Math.abs(v[1]);
	}
	if(Math.abs(v[2]) < minelem) {
		pos = 2;
		Math.abs(v[2]);
	}
	var tempvec = [0.0,0.0,0.0];
	tempvec[pos] = 1.0;
	var inv_denom = 1.0 / (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	var d = (tempvec[0] * v[0] + tempvec[1] * v[1] + tempvec[2] * v[2]) * inv_denom;
	var tmp;
	var v1 = new Float32Array(3);
	v1[0] = tempvec[0] - d * v[0] * inv_denom;
	v1[1] = tempvec[1] - d * v[1] * inv_denom;
	v1[2] = tempvec[2] - d * v[2] * inv_denom;
	tmp = v1;
	var dst = tmp;
	quake__$Vec_Vec_$Impl_$.Normalize(dst);
	return dst;
};
quake__$Vec_Vec_$Impl_$.RotatePointAroundVector = function(dir,point,degrees,out) {
	var r = quake__$Vec_Vec_$Impl_$.Perpendicular(dir);
	var up = quake__$Vec_Vec_$Impl_$.CrossProduct(r,dir);
	var m = [[r[0],up[0],dir[0]],[r[1],up[1],dir[1]],[r[2],up[2],dir[2]]];
	var im = [[m[0][0],m[1][0],m[2][0]],[m[0][1],m[1][1],m[2][1]],[m[0][2],m[1][2],m[2][2]]];
	var s = Math.sin(degrees * Math.PI / 180.0);
	var c = Math.cos(degrees * Math.PI / 180.0);
	var zrot = [[c,s,0],[-s,c,0],[0.0,0.0,1.0]];
	var rot = quake__$Vec_Vec_$Impl_$.ConcatRotations(quake__$Vec_Vec_$Impl_$.ConcatRotations(m,zrot),im);
	out[0] = rot[0][0] * point[0] + rot[0][1] * point[1] + rot[0][2] * point[2];
	out[1] = rot[1][0] * point[0] + rot[1][1] * point[1] + rot[1][2] * point[2];
	out[2] = rot[2][0] * point[0] + rot[2][1] * point[1] + rot[2][2] * point[2];
	return out;
};
quake__$Vec_Vec_$Impl_$.Anglemod = function(a) {
	return (a % 360.0 + 360.0) % 360.0;
};
quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide = function(emins,emaxs,p) {
	if(p.type <= 2) {
		if(p.dist <= emins[p.type]) return 1;
		if(p.dist >= emaxs[p.type]) return 2;
		return 3;
	}
	var dist1 = null;
	var dist2 = null;
	var _g = p.signbits;
	switch(_g) {
	case 0:
		dist1 = p.normal[0] * emaxs[0] + p.normal[1] * emaxs[1] + p.normal[2] * emaxs[2];
		dist2 = p.normal[0] * emins[0] + p.normal[1] * emins[1] + p.normal[2] * emins[2];
		break;
	case 1:
		dist1 = p.normal[0] * emins[0] + p.normal[1] * emaxs[1] + p.normal[2] * emaxs[2];
		dist2 = p.normal[0] * emaxs[0] + p.normal[1] * emins[1] + p.normal[2] * emins[2];
		break;
	case 2:
		dist1 = p.normal[0] * emaxs[0] + p.normal[1] * emins[1] + p.normal[2] * emaxs[2];
		dist2 = p.normal[0] * emins[0] + p.normal[1] * emaxs[1] + p.normal[2] * emins[2];
		break;
	case 3:
		dist1 = p.normal[0] * emins[0] + p.normal[1] * emins[1] + p.normal[2] * emaxs[2];
		dist2 = p.normal[0] * emaxs[0] + p.normal[1] * emaxs[1] + p.normal[2] * emins[2];
		break;
	case 4:
		dist1 = p.normal[0] * emaxs[0] + p.normal[1] * emaxs[1] + p.normal[2] * emins[2];
		dist2 = p.normal[0] * emins[0] + p.normal[1] * emins[1] + p.normal[2] * emaxs[2];
		break;
	case 5:
		dist1 = p.normal[0] * emins[0] + p.normal[1] * emaxs[1] + p.normal[2] * emins[2];
		dist2 = p.normal[0] * emaxs[0] + p.normal[1] * emins[1] + p.normal[2] * emaxs[2];
		break;
	case 6:
		dist1 = p.normal[0] * emaxs[0] + p.normal[1] * emins[1] + p.normal[2] * emins[2];
		dist2 = p.normal[0] * emins[0] + p.normal[1] * emaxs[1] + p.normal[2] * emaxs[2];
		break;
	case 7:
		dist1 = p.normal[0] * emins[0] + p.normal[1] * emins[1] + p.normal[2] * emins[2];
		dist2 = p.normal[0] * emaxs[0] + p.normal[1] * emaxs[1] + p.normal[2] * emaxs[2];
		break;
	default:
		quake_Sys.Error("Vec.BoxOnPlaneSide: Bad signbits");
	}
	var sides = 0;
	if(dist1 >= p.dist) sides = 1;
	if(dist2 < p.dist) sides += 2;
	return sides;
};
quake__$Vec_Vec_$Impl_$.AngleVectors = function(angles,forward,right,up) {
	var angle;
	angle = angles[0] * Math.PI / 180.0;
	var sp = Math.sin(angle);
	var cp = Math.cos(angle);
	angle = angles[1] * Math.PI / 180.0;
	var sy = Math.sin(angle);
	var cy = Math.cos(angle);
	angle = angles[2] * Math.PI / 180.0;
	var sr = Math.sin(angle);
	var cr = Math.cos(angle);
	if(forward != null) {
		forward[0] = cp * cy;
		forward[1] = cp * sy;
		forward[2] = -sp;
	}
	if(right != null) {
		right[0] = cr * sy - sr * sp * cy;
		right[1] = -sr * sp * sy - cr * cy;
		right[2] = -sr * cp;
	}
	if(up != null) {
		up[0] = cr * sp * cy + sr * sy;
		up[1] = cr * sp * sy - sr * cy;
		up[2] = cr * cp;
	}
};
quake__$Vec_Vec_$Impl_$.CrossProduct = function(v1,v2) {
	var tmp;
	var v = new Float32Array(3);
	v[0] = v1[1] * v2[2] - v1[2] * v2[1];
	v[1] = v1[2] * v2[0] - v1[0] * v2[2];
	v[2] = v1[0] * v2[1] - v1[1] * v2[0];
	tmp = v;
	return tmp;
};
quake__$Vec_Vec_$Impl_$.Normalize = function(v) {
	var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	if(length == 0.0) {
		var tmp;
		var v2 = v[2] = 0.0;
		tmp = v[1] = v2;
		var v1 = tmp;
		v[0] = v1;
		return 0.0;
	}
	v[0] = v[0] / length;
	v[1] = v[1] / length;
	v[2] = v[2] / length;
	return length;
};
quake__$Vec_Vec_$Impl_$.ConcatRotations = function(m1,m2) {
	return [[m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0],m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1],m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2]],[m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0],m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1],m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2]],[m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0],m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1],m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2]]];
};
var quake__$PR_PRStackItem = function(s,f) {
	this.stmt = s;
	this.func = f;
};
quake__$PR_PRStackItem.__name__ = true;
var quake_Sys = function() { };
quake_Sys.__name__ = true;
quake_Sys.clearEvents = function() {
	window.onbeforeunload = null;
	window.oncontextmenu = null;
	window.onfocus = null;
	window.onkeydown = null;
	window.onkeyup = null;
	window.onmousedown = null;
	window.onmouseup = null;
	window.onunload = null;
	window.onwheel = null;
};
quake_Sys.Quit = function() {
	if(quake_Sys.frame != null) window.clearInterval(quake_Sys.frame);
	quake_Sys.clearEvents();
	quake_Host.Shutdown();
	window.document.body.style.cursor = "auto";
	quake_VID.mainwindow.style.display = "none";
	if(quake_COM.registered.value != 0) window.document.getElementById("end2").style.display = "inline"; else window.document.getElementById("end1").style.display = "inline";
	throw new Error();
};
quake_Sys.Error = function(text) {
	if(quake_Sys.frame != null) window.clearInterval(quake_Sys.frame);
	quake_Sys.clearEvents();
	if(quake_Host.initialized) quake_Host.Shutdown();
	window.document.body.style.cursor = "auto";
	var i = quake_Console.text.length - 25;
	if(i < 0) i = 0;
	if(window.console != null) while(i < quake_Console.text.length) window.console.log(quake_Console.text[i++].text);
	window.alert(text);
	throw new Error(text);
};
quake_Sys.main = function() {
	window.onload = function() {
		var tmp;
		var s = window.document.location.search;
		tmp = decodeURIComponent(s);
		var cmdline = tmp;
		var location = window.document.location;
		var argv = [location.href.substring(0,location.href.length - location.search.length)];
		if(HxOverrides.cca(cmdline,0) == 63) {
			var text = "";
			var quotes = false;
			var _g1 = 1;
			var _g = cmdline.length;
			while(_g1 < _g) {
				var i = _g1++;
				var c = HxOverrides.cca(cmdline,i);
				if(c < 32 || c > 127) continue;
				if(c == 34) {
					quotes = !quotes;
					continue;
				}
				if(quotes == false && c == 32) {
					if(text.length == 0) continue;
					argv.push(text);
					text = "";
					continue;
				}
				text += cmdline.charAt(i);
			}
			if(text.length != 0) argv.push(text);
		}
		quake_COM.InitArgv(argv);
		var elem = window.document.documentElement;
		quake_VID.width = elem.clientWidth <= 320?320:elem.clientWidth;
		quake_VID.height = elem.clientHeight <= 200?200:elem.clientHeight;
		quake_Sys.scantokey = new haxe_ds_IntMap();
		var v = 127;
		quake_Sys.scantokey.h[8] = v;
		v;
		var v1 = 9;
		quake_Sys.scantokey.h[9] = v1;
		v1;
		var v2 = 13;
		quake_Sys.scantokey.h[13] = v2;
		v2;
		var v3 = 134;
		quake_Sys.scantokey.h[16] = v3;
		v3;
		var v4 = 133;
		quake_Sys.scantokey.h[17] = v4;
		v4;
		var v5 = 132;
		quake_Sys.scantokey.h[18] = v5;
		v5;
		var v6 = 255;
		quake_Sys.scantokey.h[19] = v6;
		v6;
		var v7 = 27;
		quake_Sys.scantokey.h[27] = v7;
		v7;
		var v8 = 32;
		quake_Sys.scantokey.h[32] = v8;
		v8;
		var tmp10;
		var v10 = 150;
		quake_Sys.scantokey.h[105] = v10;
		tmp10 = v10;
		var v9 = tmp10;
		quake_Sys.scantokey.h[33] = v9;
		v9;
		var tmp11;
		var v12 = 149;
		quake_Sys.scantokey.h[99] = v12;
		tmp11 = v12;
		var v11 = tmp11;
		quake_Sys.scantokey.h[34] = v11;
		v11;
		var tmp12;
		var v14 = 152;
		quake_Sys.scantokey.h[97] = v14;
		tmp12 = v14;
		var v13 = tmp12;
		quake_Sys.scantokey.h[35] = v13;
		v13;
		var tmp13;
		var v16 = 151;
		quake_Sys.scantokey.h[103] = v16;
		tmp13 = v16;
		var v15 = tmp13;
		quake_Sys.scantokey.h[36] = v15;
		v15;
		var tmp14;
		var v18 = 130;
		quake_Sys.scantokey.h[100] = v18;
		tmp14 = v18;
		var v17 = tmp14;
		quake_Sys.scantokey.h[37] = v17;
		v17;
		var tmp15;
		var v20 = 128;
		quake_Sys.scantokey.h[104] = v20;
		tmp15 = v20;
		var v19 = tmp15;
		quake_Sys.scantokey.h[38] = v19;
		v19;
		var tmp16;
		var v22 = 131;
		quake_Sys.scantokey.h[102] = v22;
		tmp16 = v22;
		var v21 = tmp16;
		quake_Sys.scantokey.h[39] = v21;
		v21;
		var tmp17;
		var v24 = 129;
		quake_Sys.scantokey.h[98] = v24;
		tmp17 = v24;
		var v23 = tmp17;
		quake_Sys.scantokey.h[40] = v23;
		v23;
		var tmp18;
		var v26 = 147;
		quake_Sys.scantokey.h[96] = v26;
		tmp18 = v26;
		var v25 = tmp18;
		quake_Sys.scantokey.h[45] = v25;
		v25;
		var tmp19;
		var v28 = 148;
		quake_Sys.scantokey.h[110] = v28;
		tmp19 = v28;
		var v27 = tmp19;
		quake_Sys.scantokey.h[46] = v27;
		v27;
		var _g2 = 48;
		while(_g2 < 58) {
			var i1 = _g2++;
			var tmp20;
			quake_Sys.scantokey.h[i1] = i1;
			tmp20 = i1;
			tmp20;
		}
		var tmp21;
		quake_Sys.scantokey.h[186] = 59;
		tmp21 = 59;
		var v29 = tmp21;
		quake_Sys.scantokey.h[59] = v29;
		v29;
		var tmp22;
		quake_Sys.scantokey.h[187] = 61;
		tmp22 = 61;
		var v30 = tmp22;
		quake_Sys.scantokey.h[61] = v30;
		v30;
		var _g3 = 65;
		while(_g3 < 91) {
			var i2 = _g3++;
			var v31 = i2 + 32;
			quake_Sys.scantokey.h[i2] = v31;
			v31;
		}
		var tmp1;
		quake_Sys.scantokey.h[106] = 42;
		tmp1 = 42;
		tmp1;
		var tmp2;
		quake_Sys.scantokey.h[107] = 43;
		tmp2 = 43;
		tmp2;
		var tmp23;
		var tmp24;
		quake_Sys.scantokey.h[189] = 45;
		tmp24 = 45;
		var v33 = tmp24;
		quake_Sys.scantokey.h[173] = v33;
		tmp23 = v33;
		var v32 = tmp23;
		quake_Sys.scantokey.h[109] = v32;
		v32;
		var tmp25;
		quake_Sys.scantokey.h[191] = 47;
		tmp25 = 47;
		var v34 = tmp25;
		quake_Sys.scantokey.h[111] = v34;
		v34;
		var _g4 = 112;
		while(_g4 < 124) {
			var i3 = _g4++;
			var v35 = 135 + (i3 - 112);
			quake_Sys.scantokey.h[i3] = v35;
			v35;
		}
		var tmp3;
		quake_Sys.scantokey.h[188] = 44;
		tmp3 = 44;
		tmp3;
		var tmp4;
		quake_Sys.scantokey.h[190] = 46;
		tmp4 = 46;
		tmp4;
		var tmp5;
		quake_Sys.scantokey.h[192] = 96;
		tmp5 = 96;
		tmp5;
		var tmp6;
		quake_Sys.scantokey.h[219] = 91;
		tmp6 = 91;
		tmp6;
		var tmp7;
		quake_Sys.scantokey.h[220] = 92;
		tmp7 = 92;
		tmp7;
		var tmp8;
		quake_Sys.scantokey.h[221] = 93;
		tmp8 = 93;
		tmp8;
		var tmp9;
		quake_Sys.scantokey.h[222] = 39;
		tmp9 = 39;
		tmp9;
		quake_Sys.oldtime = new Date().getTime() * 0.001;
		console.log("Host.Init\n");
		quake_Host.Init();
		window.onbeforeunload = quake_Sys.onbeforeunload;
		window.oncontextmenu = quake_Sys.oncontextmenu;
		window.onfocus = quake_Sys.onfocus;
		window.onkeydown = quake_Sys.onkeydown;
		window.onkeyup = quake_Sys.onkeyup;
		window.onmousedown = quake_Sys.onmousedown;
		window.onmouseup = quake_Sys.onmouseup;
		window.onunload = quake_Sys.onunload;
		window.onwheel = quake_Sys.onwheel;
		quake_Sys.frame = window.setInterval(quake_Host.Frame,16);
	};
};
quake_Sys.onbeforeunload = function(_) {
	return "Are you sure you want to quit?";
};
quake_Sys.oncontextmenu = function(e) {
	e.preventDefault();
};
quake_Sys.onfocus = function() {
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		quake_Key.Event(i,false);
		quake_Key.down[i] = false;
	}
};
quake_Sys.onkeydown = function(e) {
	var key = quake_Sys.scantokey.h[e.keyCode];
	if(key == null) return;
	quake_Key.Event(key,true);
	e.preventDefault();
};
quake_Sys.onkeyup = function(e) {
	var key = quake_Sys.scantokey.h[e.keyCode];
	if(key == null) return;
	quake_Key.Event(key,false);
	e.preventDefault();
};
quake_Sys.onmousedown = function(e) {
	var tmp;
	var _g = e.which;
	switch(_g) {
	case 1:
		tmp = 200;
		break;
	case 2:
		tmp = 202;
		break;
	case 3:
		tmp = 201;
		break;
	default:
		return;
	}
	var key = tmp;
	quake_Key.Event(key,true);
	e.preventDefault();
};
quake_Sys.onmouseup = function(e) {
	var tmp;
	var _g = e.which;
	switch(_g) {
	case 1:
		tmp = 200;
		break;
	case 2:
		tmp = 202;
		break;
	case 3:
		tmp = 201;
		break;
	default:
		return;
	}
	var key = tmp;
	quake_Key.Event(key,false);
	e.preventDefault();
};
quake_Sys.onunload = function() {
	quake_Host.Shutdown();
};
quake_Sys.onwheel = function(e) {
	var key = e.deltaY < 0?239:240;
	quake_Key.Event(key,true);
	quake_Key.Event(key,false);
	e.preventDefault();
};
var quake_SCR = function() { };
quake_SCR.__name__ = true;
quake_SCR.Init = function() {
	quake_SCR.fov = quake_Cvar.RegisterVariable("fov","90");
	quake_SCR.viewsize = quake_Cvar.RegisterVariable("viewsize","100",true);
	quake_SCR.conspeed = quake_Cvar.RegisterVariable("scr_conspeed","300");
	quake_SCR.showturtle = quake_Cvar.RegisterVariable("showturtle","0");
	quake_SCR.showpause = quake_Cvar.RegisterVariable("showpause","1");
	quake_SCR.centertime = quake_Cvar.RegisterVariable("scr_centertime","2");
	quake_SCR.printspeed = quake_Cvar.RegisterVariable("scr_printspeed","8");
	quake_Cmd.AddCommand("screenshot",quake_SCR.ScreenShot_f);
	quake_Cmd.AddCommand("sizeup",quake_SCR.SizeUp_f);
	quake_Cmd.AddCommand("sizedown",quake_SCR.SizeDown_f);
	quake_SCR.net = new quake_DrawPic(quake_W.GetLumpName("NET"));
	quake_SCR.turtle = new quake_DrawPic(quake_W.GetLumpName("TURTLE"));
	quake_SCR.pause = quake_Draw.CachePic("pause");
};
quake_SCR.CenterPrint = function(str) {
	quake_SCR.centerstring = [];
	var start = 0;
	var i = 0;
	while(i < str.length) {
		var next;
		if(HxOverrides.cca(str,i) == 10) next = i + 1; else if(i - start >= 40) next = i; else {
			i++;
			continue;
		}
		quake_SCR.centerstring.push(str.substring(start,i));
		start = next;
		i++;
	}
	quake_SCR.centerstring.push(str.substring(start,i));
	quake_SCR.centertime_off = quake_SCR.centertime.value;
	quake_SCR.centertime_start = quake_CL.state.time;
};
quake_SCR.BeginLoadingPlaque = function() {
	quake_S.StopAllSounds();
	if(quake_CL.cls.state != 2 || quake_CL.cls.signon != 4) return;
	quake_SCR.centertime_off = 0.0;
	quake_SCR.con_current = 0;
	quake_SCR.disabled_for_loading = true;
	quake_SCR.disabled_time = quake_Host.realtime + 60.0;
};
quake_SCR.EndLoadingPlaque = function() {
	quake_SCR.disabled_for_loading = false;
	quake_Console.ClearNotify();
};
quake_SCR.UpdateScreen = function() {
	if(quake_SCR.disabled_for_loading) {
		if(quake_Host.realtime <= quake_SCR.disabled_time) return;
		quake_SCR.disabled_for_loading = false;
		quake_Console.Print("load failed.\n");
	}
	var elem = window.document.documentElement;
	var width = elem.clientWidth <= 320?320:elem.clientWidth;
	var height = elem.clientHeight <= 200?200:elem.clientHeight;
	var pixelRatio = window.devicePixelRatio >= 1.0?window.devicePixelRatio:1.0;
	if(quake_VID.width != width || quake_VID.height != height || quake_SCR.devicePixelRatio != pixelRatio || quake_Host.framecount == 0) {
		quake_VID.width = width;
		quake_VID.height = height;
		quake_VID.mainwindow.width = width * pixelRatio | 0;
		quake_VID.mainwindow.height = height * pixelRatio | 0;
		quake_VID.mainwindow.style.width = width + "px";
		quake_VID.mainwindow.style.height = height + "px";
		quake_SCR.devicePixelRatio = pixelRatio;
		quake_SCR.recalc_refdef = true;
	}
	if(quake_SCR.oldfov != quake_SCR.fov.value) {
		quake_SCR.oldfov = quake_SCR.fov.value;
		quake_SCR.recalc_refdef = true;
	}
	if(quake_SCR.oldscreensize != quake_SCR.viewsize.value) {
		quake_SCR.oldscreensize = quake_SCR.viewsize.value;
		quake_SCR.recalc_refdef = true;
	}
	if(quake_SCR.recalc_refdef) quake_SCR.CalcRefdef();
	quake_SCR.SetUpToDrawConsole();
	quake_V.RenderView();
	quake_GL.Set2D();
	if(quake_Render.dowarp) quake_Render.WarpScreen();
	if(!quake_Console.forcedup) quake_Render.PolyBlend();
	if(quake_CL.cls.state == 1) quake_SCR.DrawConsole(); else if(quake_CL.state.intermission == 1 && quake_Key.dest == 0) quake_Sbar.IntermissionOverlay(); else if(quake_CL.state.intermission == 2 && quake_Key.dest == 0) {
		quake_Draw.Pic(quake_VID.width - quake_Sbar.finale.width >> 1,16,quake_Sbar.finale);
		quake_SCR.DrawCenterString();
	} else if(quake_CL.state.intermission == 3 && quake_Key.dest == 0) quake_SCR.DrawCenterString(); else {
		if(quake_V.crosshair.value != 0) quake_Draw.Character(quake_Render.refdef.vrect.x + (quake_Render.refdef.vrect.width >> 1) + quake_V.crossx.value | 0,quake_Render.refdef.vrect.y + (quake_Render.refdef.vrect.height >> 1) + quake_V.crossy.value | 0,43);
		quake_SCR.DrawNet();
		quake_SCR.DrawTurtle();
		quake_SCR.DrawPause();
		quake_SCR.DrawCenterString();
		quake_Sbar.DrawSbar();
		quake_SCR.DrawConsole();
		quake_Menu.DrawMenu();
	}
	quake_GL.gl.disable(3042);
	if(quake_SCR.screenshot) {
		quake_SCR.screenshot = false;
		quake_GL.gl.finish();
		window.open(quake_VID.mainwindow.toDataURL("image/jpeg"));
	}
};
quake_SCR.DrawCenterString = function() {
	quake_SCR.centertime_off -= quake_Host.frametime;
	if(quake_SCR.centertime_off <= 0.0 && quake_CL.state.intermission == 0 || quake_Key.dest != 0) return;
	var y = quake_SCR.centerstring.length <= 4?Math.floor(quake_VID.height * 0.35):48;
	if(quake_CL.state.intermission != 0) {
		var remaining = Math.floor(quake_SCR.printspeed.value * (quake_CL.state.time - quake_SCR.centertime_start));
		var _g = 0;
		var _g1 = quake_SCR.centerstring;
		while(_g < _g1.length) {
			var str = _g1[_g];
			++_g;
			var x = quake_VID.width - (str.length << 3) >> 1;
			var _g3 = 0;
			var _g2 = str.length;
			while(_g3 < _g2) {
				var j = _g3++;
				quake_Draw.Character(x,y,HxOverrides.cca(str,j));
				if(remaining-- == 0) return;
				x += 8;
			}
			y += 8;
		}
		return;
	}
	var _g4 = 0;
	var _g11 = quake_SCR.centerstring;
	while(_g4 < _g11.length) {
		var s = _g11[_g4];
		++_g4;
		quake_Draw.String(quake_VID.width - (s.length << 3) >> 1,y,s);
		y += 8;
	}
};
quake_SCR.CalcRefdef = function() {
	quake_SCR.recalc_refdef = false;
	if(quake_SCR.viewsize.value < 30) quake_SCR.viewsize.set("30"); else if(quake_SCR.viewsize.value > 120) quake_SCR.viewsize.set("120");
	var size;
	var full = false;
	if(quake_CL.state.intermission != 0) {
		full = true;
		size = 1.0;
		quake_Sbar.lines = 0;
	} else {
		size = quake_SCR.viewsize.value;
		if(size >= 120.0) quake_Sbar.lines = 0; else if(size >= 110.0) quake_Sbar.lines = 24; else quake_Sbar.lines = 48;
		if(size >= 100.0) {
			full = true;
			size = 100.0;
		}
		size *= 0.01;
	}
	var vrect = quake_Render.refdef.vrect;
	vrect.width = Math.floor(quake_VID.width * size);
	if(vrect.width < 96) {
		size = 96.0 / vrect.width;
		vrect.width = 96;
	}
	vrect.height = Math.floor(quake_VID.height * size);
	if(vrect.height > quake_VID.height - quake_Sbar.lines) vrect.height = quake_VID.height - quake_Sbar.lines;
	vrect.x = quake_VID.width - vrect.width >> 1;
	if(full) vrect.y = 0; else vrect.y = quake_VID.height - quake_Sbar.lines - vrect.height >> 1;
	if(quake_SCR.fov.value < 10) quake_SCR.fov.set("10"); else if(quake_SCR.fov.value > 170) quake_SCR.fov.set("170");
	if(vrect.width * 0.75 <= vrect.height) {
		quake_Render.refdef.fov_x = quake_SCR.fov.value;
		quake_Render.refdef.fov_y = Math.atan(vrect.height / (vrect.width / Math.tan(quake_SCR.fov.value * Math.PI / 360.0))) * 360.0 / Math.PI;
	} else {
		quake_Render.refdef.fov_x = Math.atan(vrect.width / (vrect.height / Math.tan(quake_SCR.fov.value * 0.82 * Math.PI / 360.0))) * 360.0 / Math.PI;
		quake_Render.refdef.fov_y = quake_SCR.fov.value * 0.82;
	}
	var ymax = 4.0 * Math.tan(quake_Render.refdef.fov_y * Math.PI / 360.0);
	quake_Render.perspective[0] = 4.0 / (ymax * quake_Render.refdef.vrect.width / quake_Render.refdef.vrect.height);
	quake_Render.perspective[5] = 4.0 / ymax;
	quake_GL.ortho[0] = 2.0 / quake_VID.width;
	quake_GL.ortho[5] = -2. / quake_VID.height;
	quake_Render.warpwidth = vrect.width * quake_SCR.devicePixelRatio | 0;
	quake_Render.warpheight = vrect.height * quake_SCR.devicePixelRatio | 0;
	if(quake_Render.warpwidth > 2048) quake_Render.warpwidth = 2048;
	if(quake_Render.warpheight > 2048) quake_Render.warpheight = 2048;
	if(quake_Render.oldwarpwidth != quake_Render.warpwidth || quake_Render.oldwarpheight != quake_Render.warpheight) {
		quake_Render.oldwarpwidth = quake_Render.warpwidth;
		quake_Render.oldwarpheight = quake_Render.warpheight;
		quake_GL.Bind(0,quake_Render.warptexture);
		quake_GL.gl.texImage2D(3553,0,6408,quake_Render.warpwidth,quake_Render.warpheight,0,6408,5121,null);
		quake_GL.gl.bindRenderbuffer(36161,quake_Render.warprenderbuffer);
		quake_GL.gl.renderbufferStorage(36161,33189,quake_Render.warpwidth,quake_Render.warpheight);
		quake_GL.gl.bindRenderbuffer(36161,null);
	}
};
quake_SCR.SizeUp_f = function() {
	quake_SCR.viewsize.setValue(quake_SCR.viewsize.value + 10);
	quake_SCR.recalc_refdef = true;
};
quake_SCR.SizeDown_f = function() {
	quake_SCR.viewsize.setValue(quake_SCR.viewsize.value - 10);
	quake_SCR.recalc_refdef = true;
};
quake_SCR.DrawTurtle = function() {
	if(quake_SCR.showturtle.value == 0) return;
	if(quake_Host.frametime < 0.1) {
		quake_SCR.count = 0;
		return;
	}
	if(++quake_SCR.count >= 3) quake_Draw.Pic(quake_Render.refdef.vrect.x,quake_Render.refdef.vrect.y,quake_SCR.turtle);
};
quake_SCR.DrawNet = function() {
	if(quake_Host.realtime - quake_CL.state.last_received_message >= 0.3 && !quake_CL.cls.demoplayback) quake_Draw.Pic(quake_Render.refdef.vrect.x,quake_Render.refdef.vrect.y,quake_SCR.net);
};
quake_SCR.DrawPause = function() {
	if(quake_SCR.showpause.value != 0 && quake_CL.state.paused) quake_Draw.Pic(quake_VID.width - quake_SCR.pause.width >> 1,quake_VID.height - 48 - quake_SCR.pause.height >> 1,quake_SCR.pause);
};
quake_SCR.SetUpToDrawConsole = function() {
	quake_Console.forcedup = quake_CL.state.worldmodel == null || quake_CL.cls.signon != 4;
	if(quake_Console.forcedup) {
		quake_SCR.con_current = 200;
		return;
	}
	var conlines = quake_Key.dest == 1?100:0;
	if(conlines < quake_SCR.con_current) {
		quake_SCR.con_current -= quake_SCR.conspeed.value * quake_Host.frametime | 0;
		if(conlines > quake_SCR.con_current) quake_SCR.con_current = conlines;
	} else if(conlines > quake_SCR.con_current) {
		quake_SCR.con_current += quake_SCR.conspeed.value * quake_Host.frametime | 0;
		if(conlines < quake_SCR.con_current) quake_SCR.con_current = conlines;
	}
};
quake_SCR.DrawConsole = function() {
	if(quake_SCR.con_current > 0) {
		quake_Console.DrawConsole(quake_SCR.con_current);
		return;
	}
	if(quake_Key.dest == 0 || quake_Key.dest == 2) quake_Console.DrawNotify();
};
quake_SCR.ScreenShot_f = function() {
	quake_SCR.screenshot = true;
};
var quake__$SV_ServerState = function() {
	this.signon = new quake_MSG(8192);
	this.reliable_datagram = new quake_MSG(1024);
	this.datagram = new quake_MSG(1024);
	this.num_edicts = 0;
};
quake__$SV_ServerState.__name__ = true;
var quake__$SV_ServerStatic = function() {
};
quake__$SV_ServerStatic.__name__ = true;
var quake_SV = function() { };
quake_SV.__name__ = true;
quake_SV.Init = function() {
	quake_SV.maxvelocity = quake_Cvar.RegisterVariable("sv_maxvelocity","2000");
	quake_SV.gravity = quake_Cvar.RegisterVariable("sv_gravity","800",false,true);
	quake_SV.friction = quake_Cvar.RegisterVariable("sv_friction","4",false,true);
	quake_SV.edgefriction = quake_Cvar.RegisterVariable("edgefriction","2");
	quake_SV.stopspeed = quake_Cvar.RegisterVariable("sv_stopspeed","100");
	quake_SV.maxspeed = quake_Cvar.RegisterVariable("sv_maxspeed","320",false,true);
	quake_SV.accelerate = quake_Cvar.RegisterVariable("sv_accelerate","10");
	quake_SV.idealpitchscale = quake_Cvar.RegisterVariable("sv_idealpitchscale","0.8");
	quake_SV.aim = quake_Cvar.RegisterVariable("sv_aim","0.93");
	quake_SV.nostep = quake_Cvar.RegisterVariable("sv_nostep","0");
	quake_SV.nop = new quake_MSG(4,1);
	new Uint8Array(quake_SV.nop.data)[0] = 1;
	quake_SV.reconnect = new quake_MSG(128);
	quake_SV.reconnect.WriteByte(9);
	quake_SV.reconnect.WriteString("reconnect\n");
	quake_SV.InitBoxHull();
};
quake_SV.StartParticle = function(org,dir,color,count) {
	var datagram = quake_SV.server.datagram;
	if(datagram.cursize >= 1009) return;
	datagram.WriteByte(18);
	datagram.WriteShort(org[0] * 8 | 0);
	datagram.WriteShort(org[1] * 8 | 0);
	datagram.WriteShort(org[2] * 8 | 0);
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var v = dir[i] * 16.0 | 0;
		if(v > 127) v = 127; else if(v < -128) v = -128;
		datagram.WriteChar(v);
	}
	datagram.WriteByte(count);
	datagram.WriteByte(color);
};
quake_SV.StartSound = function(entity,channel,sample,volume,attenuation) {
	if(volume < 0 || volume > 255) quake_Sys.Error("SV.StartSound: volume = " + volume);
	if(attenuation < 0.0 || attenuation > 4.0) quake_Sys.Error("SV.StartSound: attenuation = " + attenuation);
	if(channel < 0 || channel > 7) quake_Sys.Error("SV.StartSound: channel = " + channel);
	var datagram = quake_SV.server.datagram;
	if(datagram.cursize >= 1009) return;
	var i = 1;
	while(i < quake_SV.server.sound_precache.length) {
		if(sample == quake_SV.server.sound_precache[i]) break;
		i++;
	}
	if(i >= quake_SV.server.sound_precache.length) {
		quake_Console.Print("SV.StartSound: " + sample + " not precached\n");
		return;
	}
	var field_mask = 0;
	if(volume != 255) field_mask += 1;
	if(attenuation != 1.0) field_mask += 2;
	datagram.WriteByte(6);
	datagram.WriteByte(field_mask);
	if((field_mask & 1) != 0) datagram.WriteByte(volume);
	if((field_mask & 2) != 0) datagram.WriteByte(Math.floor(attenuation * 64.0));
	datagram.WriteShort((entity.num << 3) + channel);
	datagram.WriteByte(i);
	datagram.WriteShort((entity._v_float[10] + 0.5 * (entity._v_float[33] + entity._v_float[36])) * 8 | 0);
	datagram.WriteShort((entity._v_float[11] + 0.5 * (entity._v_float[34] + entity._v_float[37])) * 8 | 0);
	datagram.WriteShort((entity._v_float[12] + 0.5 * (entity._v_float[35] + entity._v_float[38])) * 8 | 0);
};
quake_SV.SendServerinfo = function(client) {
	var message = client.message;
	message.WriteByte(8);
	message.WriteString("\x02" + "\nVERSION 1.09 SERVER (" + quake_PR.crc + " CRC)\n");
	message.WriteByte(11);
	message.WriteLong(15);
	message.WriteByte(quake_SV.svs.maxclients);
	message.WriteByte(quake_Host.coop.value == 0 && quake_Host.deathmatch.value != 0?1:0);
	message.WriteString(quake_PR.GetString(quake_SV.server.edicts[0]._v_int[99]));
	var _g1 = 1;
	var _g = quake_SV.server.model_precache.length;
	while(_g1 < _g) {
		var i = _g1++;
		message.WriteString(quake_SV.server.model_precache[i]);
	}
	message.WriteByte(0);
	var _g11 = 1;
	var _g2 = quake_SV.server.sound_precache.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		message.WriteString(quake_SV.server.sound_precache[i1]);
	}
	message.WriteByte(0);
	message.WriteByte(32);
	message.WriteByte(quake_SV.server.edicts[0]._v_float[100] | 0);
	message.WriteByte(quake_SV.server.edicts[0]._v_float[100] | 0);
	message.WriteByte(5);
	message.WriteShort(client.edict.num);
	message.WriteByte(25);
	message.WriteByte(1);
	client.sendsignon = true;
	client.spawned = false;
};
quake_SV.ConnectClient = function(clientnum) {
	var client = quake_SV.svs.clients[clientnum];
	var spawn_parms = null;
	if(quake_SV.server.loadgame) {
		spawn_parms = [];
		if(client.spawn_parms == null) client.spawn_parms = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			spawn_parms[i] = client.spawn_parms[i];
		}
	}
	quake_Console.DPrint("Client " + client.netconnection.address + " connected\n");
	client.active = true;
	client.dropasap = false;
	client.last_message = 0.0;
	client.cmd = new quake_ClientCmd();
	client.wishdir = new Float32Array(3);
	client.message.cursize = 0;
	client.edict = quake_SV.server.edicts[clientnum + 1];
	client.edict._v_int[74] = quake_PR.netnames + (clientnum << 5);
	quake_SV.SetClientName(client,"unconnected");
	client.colors = 0;
	client.ping_times = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	client.num_pings = 0;
	if(!quake_SV.server.loadgame) client.spawn_parms = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	client.old_frags = 0;
	if(quake_SV.server.loadgame) {
		var _g1 = 0;
		while(_g1 < 16) {
			var i1 = _g1++;
			client.spawn_parms[i1] = spawn_parms[i1];
		}
	} else {
		quake_PR.ExecuteProgram(quake_PR._globals_int[90]);
		var _g2 = 0;
		while(_g2 < 16) {
			var i2 = _g2++;
			client.spawn_parms[i2] = quake_PR._globals_float[43 + i2];
		}
	}
	quake_SV.SendServerinfo(client);
};
quake_SV.CheckForNewClients = function() {
	while(true) {
		var ret = quake_NET.CheckNewConnections();
		if(ret == null) return;
		var i = 0;
		while(i < quake_SV.svs.maxclients) {
			if(!quake_SV.svs.clients[i].active) break;
			i++;
		}
		if(i == quake_SV.svs.maxclients) quake_Sys.Error("SV.CheckForNewClients: no free clients");
		quake_SV.svs.clients[i].netconnection = ret;
		quake_SV.ConnectClient(i);
		quake_NET.activeconnections++;
	}
};
quake_SV.AddToFatPVS = function(org,node) {
	while(true) {
		if(node.contents < 0) {
			if(node.contents != -2) {
				var pvs = quake_Mod_$Brush.LeafPVS(node,quake_SV.server.worldmodel);
				var _g1 = 0;
				var _g = quake_SV.fatbytes;
				while(_g1 < _g) {
					var i = _g1++;
					quake_SV.fatpvs[i] |= pvs[i];
				}
			}
			return;
		}
		var normal = node.plane.normal;
		var d = org[0] * normal[0] + org[1] * normal[1] + org[2] * normal[2] - node.plane.dist;
		if(d > 8.0) node = node.child0; else {
			if(d >= -8.0) quake_SV.AddToFatPVS(org,node.child0);
			node = node.child1;
		}
	}
};
quake_SV.FatPVS = function(org) {
	quake_SV.fatbytes = quake_SV.server.worldmodel.leafs.length + 31 >> 3;
	var _g1 = 0;
	var _g = quake_SV.fatbytes;
	while(_g1 < _g) {
		var i = _g1++;
		quake_SV.fatpvs[i] = 0;
	}
	quake_SV.AddToFatPVS(org,quake_SV.server.worldmodel.nodes[0]);
};
quake_SV.WriteEntitiesToClient = function(clent,msg) {
	var tmp;
	var v = new Float32Array(3);
	v[0] = clent._v_float[10] + clent._v_float[62];
	v[1] = clent._v_float[11] + clent._v_float[63];
	v[2] = clent._v_float[12] + clent._v_float[64];
	tmp = v;
	quake_SV.FatPVS(tmp);
	var pvs = quake_SV.fatpvs;
	var _g1 = 1;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var e = _g1++;
		var ent = quake_SV.server.edicts[e];
		if(ent != clent) {
			if(ent._v_float[0] == 0.0 || quake_PR.strings[ent._v_int[29]] == 0) continue;
			var i = 0;
			while(i < ent.leafnums.length) {
				if((pvs[ent.leafnums[i] >> 3] & 1 << (ent.leafnums[i] & 7)) != 0) break;
				i++;
			}
			if(i == ent.leafnums.length) continue;
		}
		if(msg.data.byteLength - msg.cursize < 16) {
			quake_Console.Print("packet overflow\n");
			return;
		}
		var bits = 0;
		var _g2 = 0;
		while(_g2 < 3) {
			var i1 = _g2++;
			var miss = ent._v_float[10 + i1] - ent.baseline.origin[i1];
			if(miss < -0.1 || miss > 0.1) bits += 2 << i1;
		}
		if(ent._v_float[19] != ent.baseline.angles[0]) bits = 256 + bits;
		if(ent._v_float[20] != ent.baseline.angles[1]) bits = 16 + bits;
		if(ent._v_float[21] != ent.baseline.angles[2]) bits = 512 + bits;
		if(ent._v_float[8] == 4) bits = 32 + bits;
		if(ent.baseline.colormap != ent._v_float[77]) bits = 2048 + bits;
		if(ent.baseline.skin != ent._v_float[31]) bits = 4096 + bits;
		if(ent.baseline.frame != ent._v_float[30]) bits = 64 + bits;
		if(ent.baseline.effects != ent._v_float[32]) bits = 8192 + bits;
		if(ent.baseline.modelindex != ent._v_float[0]) bits = 1024 + bits;
		if(e >= 256) bits = 16384 + bits;
		if(bits >= 256) bits = 1 + bits;
		msg.WriteByte(128 + bits);
		if((bits & 1) != 0) msg.WriteByte(bits >> 8);
		if((bits & 16384) != 0) msg.WriteShort(e); else msg.WriteByte(e);
		if((bits & 1024) != 0) msg.WriteByte(ent._v_float[0] | 0);
		if((bits & 64) != 0) msg.WriteByte(ent._v_float[30] | 0);
		if((bits & 2048) != 0) msg.WriteByte(ent._v_float[77] | 0);
		if((bits & 4096) != 0) msg.WriteByte(ent._v_float[31] | 0);
		if((bits & 8192) != 0) msg.WriteByte(ent._v_float[32] | 0);
		if((bits & 2) != 0) msg.WriteShort(ent._v_float[10] * 8 | 0);
		if((bits & 256) != 0) msg.WriteByte((ent._v_float[19] * 256 / 360 | 0) & 255);
		if((bits & 4) != 0) msg.WriteShort(ent._v_float[11] * 8 | 0);
		if((bits & 16) != 0) msg.WriteByte((ent._v_float[20] * 256 / 360 | 0) & 255);
		if((bits & 8) != 0) msg.WriteShort(ent._v_float[12] * 8 | 0);
		if((bits & 512) != 0) msg.WriteByte((ent._v_float[21] * 256 / 360 | 0) & 255);
	}
};
quake_SV.WriteClientdataToMessage = function(ent,msg) {
	if(ent._v_float[92] != 0.0 || ent._v_float[93] != 0.0) {
		var other = quake_SV.server.edicts[ent._v_int[94]];
		msg.WriteByte(19);
		msg.WriteByte(ent._v_float[93] | 0);
		msg.WriteByte(ent._v_float[92] | 0);
		msg.WriteShort((other._v_float[10] + 0.5 * (other._v_float[33] + other._v_float[36])) * 8 | 0);
		msg.WriteShort((other._v_float[11] + 0.5 * (other._v_float[34] + other._v_float[37])) * 8 | 0);
		msg.WriteShort((other._v_float[12] + 0.5 * (other._v_float[35] + other._v_float[38])) * 8 | 0);
		ent._v_float[92] = 0.0;
		ent._v_float[93] = 0.0;
	}
	quake_SV.SetIdealPitch();
	if(ent._v_float[69] != 0.0) {
		msg.WriteByte(10);
		msg.WriteByte((ent._v_float[19] * 256 / 360 | 0) & 255);
		msg.WriteByte((ent._v_float[20] * 256 / 360 | 0) & 255);
		msg.WriteByte((ent._v_float[21] * 256 / 360 | 0) & 255);
		ent._v_float[69] = 0.0;
	}
	var bits = 512 + 16384;
	if(ent._v_float[64] != 22) bits = bits + 1;
	if(ent._v_float[73] != 0.0) bits = bits + 2;
	var val = quake_EdictVarOfs.items2;
	var items;
	if(val != null) {
		if(ent._v_float[val] != 0.0) items = (ent._v_float[58] | 0 | 0) + ((ent._v_float[val] | 0) << 23); else items = (ent._v_float[58] | 0 | 0) + ((quake_PR._globals_float[38] | 0) << 28);
	} else items = (ent._v_float[58] | 0 | 0) + ((quake_PR._globals_float[38] | 0) << 28);
	if(((ent._v_float[76] | 0) & 512) != 0) bits = bits + 1024;
	if(ent._v_float[83] >= 2.0) bits = bits + 2048;
	if(ent._v_float[25] != 0.0) bits = bits + 4;
	if(ent._v_float[16] != 0.0) bits = bits + 32;
	if(ent._v_float[26] != 0.0) bits = bits + 8;
	if(ent._v_float[17] != 0.0) bits = bits + 64;
	if(ent._v_float[27] != 0.0) bits = bits + 16;
	if(ent._v_float[18] != 0.0) bits = bits + 128;
	if(ent._v_float[52] != 0.0) bits = bits + 4096;
	if(ent._v_float[82] != 0.0) bits = bits + 8192;
	msg.WriteByte(15);
	msg.WriteShort(bits);
	if((bits & 1) != 0) msg.WriteChar(ent._v_float[64] | 0);
	if((bits & 2) != 0) msg.WriteChar(ent._v_float[73] | 0);
	if((bits & 4) != 0) msg.WriteChar(ent._v_float[25] | 0);
	if((bits & 32) != 0) msg.WriteChar(ent._v_float[16] * 0.0625 | 0);
	if((bits & 8) != 0) msg.WriteChar(ent._v_float[26] | 0);
	if((bits & 64) != 0) msg.WriteChar(ent._v_float[17] * 0.0625 | 0);
	if((bits & 16) != 0) msg.WriteChar(ent._v_float[27] | 0);
	if((bits & 128) != 0) msg.WriteChar(ent._v_float[18] * 0.0625 | 0);
	msg.WriteLong(items);
	if((bits & 4096) != 0) msg.WriteByte(ent._v_float[52] | 0);
	if((bits & 8192) != 0) msg.WriteByte(ent._v_float[82] | 0);
	msg.WriteByte(quake_SV.ModelIndex(quake_PR.GetString(ent._v_int[51])));
	msg.WriteShort(ent._v_float[48] | 0);
	msg.WriteByte(ent._v_float[53] | 0);
	msg.WriteByte(ent._v_float[54] | 0);
	msg.WriteByte(ent._v_float[55] | 0);
	msg.WriteByte(ent._v_float[56] | 0);
	msg.WriteByte(ent._v_float[57] | 0);
	if(quake_COM.standard_quake) msg.WriteByte(ent._v_float[50] | 0); else {
		var weapon = ent._v_float[50] | 0;
		var _g = 0;
		while(_g < 32) {
			var i = _g++;
			if((weapon & 1 << i) != 0) {
				msg.WriteByte(i);
				break;
			}
		}
	}
};
quake_SV.SendClientDatagram = function() {
	var client = quake_Host.client;
	var msg = quake_SV.clientdatagram;
	msg.cursize = 0;
	msg.WriteByte(7);
	msg.WriteFloat(quake_SV.server.time);
	quake_SV.WriteClientdataToMessage(client.edict,msg);
	quake_SV.WriteEntitiesToClient(client.edict,msg);
	if(msg.cursize + quake_SV.server.datagram.cursize < msg.data.byteLength) msg.Write(new Uint8Array(quake_SV.server.datagram.data),quake_SV.server.datagram.cursize);
	if(quake_NET.SendUnreliableMessage(client.netconnection,msg) == -1) {
		quake_Host.DropClient(true);
		return false;
	}
	return true;
};
quake_SV.UpdateToReliableMessages = function() {
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Host.client = quake_SV.svs.clients[i];
		var frags = quake_Host.client.edict._v_float[49] | 0;
		quake_Host.client.edict._v_float[49] = frags;
		if(quake_Host.client.old_frags == frags) continue;
		var _g3 = 0;
		var _g2 = quake_SV.svs.maxclients;
		while(_g3 < _g2) {
			var j = _g3++;
			var client = quake_SV.svs.clients[j];
			if(!client.active) continue;
			client.message.WriteByte(14);
			client.message.WriteByte(i);
			client.message.WriteShort(frags);
		}
		quake_Host.client.old_frags = frags;
	}
	var _g11 = 0;
	var _g4 = quake_SV.svs.maxclients;
	while(_g11 < _g4) {
		var i1 = _g11++;
		var client1 = quake_SV.svs.clients[i1];
		if(client1.active) client1.message.Write(new Uint8Array(quake_SV.server.reliable_datagram.data),quake_SV.server.reliable_datagram.cursize);
	}
	quake_SV.server.reliable_datagram.cursize = 0;
};
quake_SV.SendClientMessages = function() {
	quake_SV.UpdateToReliableMessages();
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		var client = quake_Host.client = quake_SV.svs.clients[i];
		if(!client.active) continue;
		if(client.spawned) {
			if(!quake_SV.SendClientDatagram()) continue;
		} else if(!client.sendsignon) {
			if(quake_Host.realtime - client.last_message > 5.0) {
				if(quake_NET.SendUnreliableMessage(client.netconnection,quake_SV.nop) == -1) quake_Host.DropClient(true);
				client.last_message = quake_Host.realtime;
			}
			continue;
		}
		if(client.message.overflowed) {
			quake_Host.DropClient(true);
			client.message.overflowed = false;
			continue;
		}
		if(client.dropasap) {
			if(quake_NET.CanSendMessage(client.netconnection)) quake_Host.DropClient(false);
		} else if(client.message.cursize != 0) {
			if(!quake_NET.CanSendMessage(client.netconnection)) continue;
			if(quake_NET.SendMessage(client.netconnection,client.message) == -1) quake_Host.DropClient(true);
			client.message.cursize = 0;
			client.last_message = quake_Host.realtime;
			client.sendsignon = false;
		}
	}
	var _g11 = 1;
	var _g2 = quake_SV.server.num_edicts;
	while(_g11 < _g2) {
		var i1 = _g11++;
		quake_SV.server.edicts[i1]._v_float[32] = (quake_SV.server.edicts[i1]._v_float[32] | 0) & ~2;
	}
};
quake_SV.ModelIndex = function(name) {
	if(name == null) return 0;
	if(name.length == 0) return 0;
	var _g1 = 0;
	var _g = quake_SV.server.model_precache.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_SV.server.model_precache[i] == name) return i;
	}
	quake_Sys.Error("SV.ModelIndex: model " + name + " not precached");
	return 0;
};
quake_SV.CreateBaseline = function() {
	var player = quake_SV.ModelIndex("progs/player.mdl");
	var signon = quake_SV.server.signon;
	var _g1 = 0;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		var svent = quake_SV.server.edicts[i];
		if(svent.free) continue;
		if(i > quake_SV.svs.maxclients && svent._v_float[0] == 0) continue;
		var baseline = svent.baseline;
		var this1 = baseline.origin;
		this1[0] = svent._v_float[10];
		this1[1] = svent._v_float[11];
		this1[2] = svent._v_float[12];
		var this2 = baseline.angles;
		this2[0] = svent._v_float[19];
		this2[1] = svent._v_float[20];
		this2[2] = svent._v_float[21];
		baseline.frame = svent._v_float[30] | 0;
		baseline.skin = svent._v_float[31] | 0;
		if(i > 0 && i <= quake_SV.svs.maxclients) {
			baseline.colormap = i;
			baseline.modelindex = player;
		} else {
			baseline.colormap = 0;
			baseline.modelindex = quake_SV.ModelIndex(quake_PR.GetString(svent._v_int[29]));
		}
		signon.WriteByte(22);
		signon.WriteShort(i);
		signon.WriteByte(baseline.modelindex);
		signon.WriteByte(baseline.frame);
		signon.WriteByte(baseline.colormap);
		signon.WriteByte(baseline.skin);
		signon.WriteShort(baseline.origin[0] * 8 | 0);
		signon.WriteByte((baseline.angles[0] * 256 / 360 | 0) & 255);
		signon.WriteShort(baseline.origin[1] * 8 | 0);
		signon.WriteByte((baseline.angles[1] * 256 / 360 | 0) & 255);
		signon.WriteShort(baseline.origin[2] * 8 | 0);
		signon.WriteByte((baseline.angles[2] * 256 / 360 | 0) & 255);
	}
};
quake_SV.SaveSpawnparms = function() {
	quake_SV.svs.serverflags = quake_PR._globals_float[38] | 0;
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Host.client = quake_SV.svs.clients[i];
		if(!quake_Host.client.active) continue;
		quake_PR._globals_int[28] = quake_Host.client.edict.num;
		quake_PR.ExecuteProgram(quake_PR._globals_int[91]);
		var _g2 = 0;
		while(_g2 < 16) {
			var j = _g2++;
			quake_Host.client.spawn_parms[j] = quake_PR._globals_float[43 + j];
		}
	}
};
quake_SV.SpawnServer = function(map) {
	if(quake_NET.hostname.string.length == 0) quake_NET.hostname.set("UNNAMED");
	quake_SCR.centertime_off = 0.0;
	quake_Console.DPrint("SpawnServer: " + map + "\n");
	quake_SV.svs.changelevel_issued = false;
	if(quake_SV.server.active) {
		quake_NET.SendToAll(quake_SV.reconnect);
		quake_Cmd.ExecuteString("reconnect\n");
	}
	if(quake_Host.coop.value != 0) quake_Host.deathmatch.setValue(0);
	quake_Host.current_skill = Math.floor(quake_Host.skill.value + 0.5);
	if(quake_Host.current_skill < 0) quake_Host.current_skill = 0; else if(quake_Host.current_skill > 3) quake_Host.current_skill = 3;
	quake_Host.skill.setValue(quake_Host.current_skill);
	quake_Console.DPrint("Clearing memory\n");
	quake_Mod.ClearAll();
	quake_PR.LoadProgs();
	quake_SV.server.edicts = [];
	var _g = 0;
	while(_g < 2048) {
		var i = _g++;
		quake_SV.server.edicts.push(new quake_Edict(i));
	}
	quake_SV.server.datagram.cursize = 0;
	quake_SV.server.reliable_datagram.cursize = 0;
	quake_SV.server.signon.cursize = 0;
	quake_SV.server.num_edicts = quake_SV.svs.maxclients + 1;
	var _g1 = 0;
	var _g2 = quake_SV.svs.maxclients;
	while(_g1 < _g2) {
		var i1 = _g1++;
		quake_SV.svs.clients[i1].edict = quake_SV.server.edicts[i1 + 1];
	}
	quake_SV.server.loading = true;
	quake_SV.server.paused = false;
	quake_SV.server.loadgame = false;
	quake_SV.server.time = 1.0;
	quake_SV.server.lastcheck = 0;
	quake_SV.server.lastchecktime = 0.0;
	quake_SV.server.modelname = "maps/" + map + ".bsp";
	quake_SV.server.worldmodel = quake_Mod.LoadModel(quake_Mod.FindName(quake_SV.server.modelname),false);
	if(quake_SV.server.worldmodel == null) {
		quake_Console.Print("Couldn't spawn server " + quake_SV.server.modelname + "\n");
		quake_SV.server.active = false;
		return;
	}
	quake_SV.server.models = [];
	quake_SV.server.models[1] = quake_SV.server.worldmodel;
	quake_SV.areanodes = [];
	quake_SV.CreateAreaNode(0,quake_SV.server.worldmodel.mins,quake_SV.server.worldmodel.maxs);
	quake_SV.server.sound_precache = [""];
	quake_SV.server.model_precache = ["",quake_SV.server.modelname];
	var _g11 = 1;
	var _g3 = quake_SV.server.worldmodel.submodels.length + 1;
	while(_g11 < _g3) {
		var i2 = _g11++;
		quake_SV.server.model_precache[i2 + 1] = "*" + i2;
		quake_SV.server.models[i2 + 1] = quake_Mod.LoadModel(quake_Mod.FindName("*" + i2),false);
	}
	quake_SV.server.lightstyles = [];
	var _g4 = 0;
	while(_g4 < 64) {
		_g4++;
		quake_SV.server.lightstyles.push("");
	}
	var ent = quake_SV.server.edicts[0];
	var value = quake_PR.NewString(quake_SV.server.modelname,64);
	ent._v_int[29] = value;
	ent._v_float[0] = 1.0;
	ent._v_float[9] = 4;
	ent._v_float[8] = 7;
	if(quake_Host.coop.value != 0) quake_PR._globals_float[36] = quake_Host.coop.value; else quake_PR._globals_float[35] = quake_Host.deathmatch.value;
	var value1 = quake_PR.NewString(map,64);
	quake_PR._globals_int[34] = value1;
	quake_PR._globals_float[38] = quake_SV.svs.serverflags;
	quake_ED.LoadFromFile(quake_SV.server.worldmodel.entities);
	quake_SV.server.active = true;
	quake_SV.server.loading = false;
	quake_Host.frametime = 0.1;
	quake_SV.Physics();
	quake_SV.Physics();
	quake_SV.CreateBaseline();
	var _g12 = 0;
	var _g5 = quake_SV.svs.maxclients;
	while(_g12 < _g5) {
		var i3 = _g12++;
		quake_Host.client = quake_SV.svs.clients[i3];
		if(!quake_Host.client.active) continue;
		quake_Host.client.edict._v_int[74] = quake_PR.netnames + (i3 << 5);
		quake_SV.SendServerinfo(quake_Host.client);
	}
	quake_Console.DPrint("Server spawned.\n");
};
quake_SV.SetClientName = function(client,name) {
	var ofs = quake_PR.netnames + (client.num << 5);
	var i = 0;
	while(i < name.length) {
		quake_PR.strings[ofs + i] = HxOverrides.cca(name,i);
		i++;
	}
	quake_PR.strings[ofs + i] = 0;
};
quake_SV.CheckBottom = function(ent) {
	var mins_0 = ent._v_float[10] + ent._v_float[33];
	var mins_1 = ent._v_float[11] + ent._v_float[34];
	var mins_2 = ent._v_float[12] + ent._v_float[35];
	var maxs_0 = ent._v_float[10] + ent._v_float[36];
	var maxs_1 = ent._v_float[11] + ent._v_float[37];
	while(true) {
		var tmp2;
		var v = new Float32Array(3);
		v[0] = mins_0;
		v[1] = mins_1;
		v[2] = mins_2 - 1.0;
		tmp2 = v;
		if(quake_SV.PointContents(tmp2) != -2) break;
		var tmp3;
		var v1 = new Float32Array(3);
		v1[0] = mins_0;
		v1[1] = maxs_1;
		v1[2] = mins_2 - 1.0;
		tmp3 = v1;
		if(quake_SV.PointContents(tmp3) != -2) break;
		var tmp4;
		var v2 = new Float32Array(3);
		v2[0] = maxs_0;
		v2[1] = mins_1;
		v2[2] = mins_2 - 1.0;
		tmp4 = v2;
		if(quake_SV.PointContents(tmp4) != -2) break;
		var tmp5;
		var v3 = new Float32Array(3);
		v3[0] = maxs_0;
		v3[1] = maxs_1;
		v3[2] = mins_2 - 1.0;
		tmp5 = v3;
		if(quake_SV.PointContents(tmp5) != -2) break;
		return true;
	}
	var tmp;
	var v4 = new Float32Array(3);
	v4[0] = (mins_0 + maxs_0) * 0.5;
	v4[1] = (mins_1 + maxs_1) * 0.5;
	v4[2] = mins_2;
	tmp = v4;
	var start = tmp;
	var tmp1;
	var v5 = new Float32Array(3);
	v5[0] = start[0];
	v5[1] = start[1];
	v5[2] = start[2] - 36.0;
	tmp1 = v5;
	var stop = tmp1;
	var trace = quake_SV.Move(start,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,stop,1,ent);
	if(trace.fraction == 1.0) return false;
	var mid;
	var bottom;
	mid = bottom = trace.endpos[2];
	var _g = 0;
	while(_g < 2) {
		var x = _g++;
		var _g1 = 0;
		while(_g1 < 2) {
			var y = _g1++;
			var v6 = stop[0] = x != 0?maxs_0:mins_0;
			start[0] = v6;
			var v7 = stop[1] = y != 0?maxs_1:mins_1;
			start[1] = v7;
			trace = quake_SV.Move(start,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,stop,1,ent);
			if(trace.fraction != 1.0 && trace.endpos[2] > bottom) bottom = trace.endpos[2];
			if(trace.fraction == 1.0 || mid - trace.endpos[2] > 18.0) return false;
		}
	}
	return true;
};
quake_SV.movestep = function(ent,move,relink) {
	var oldorg = new Float32Array(ent._v_float.buffer.slice(40,52));
	var neworg = new Float32Array(3);
	var mins = new Float32Array(ent._v_float.buffer.slice(132,144));
	var maxs = new Float32Array(ent._v_float.buffer.slice(144,156));
	if(((ent._v_float[76] | 0) & 2 + 1) != 0) {
		var enemy = ent._v_int[75];
		var _g = 0;
		while(_g < 2) {
			var i = _g++;
			neworg[0] = ent._v_float[10] + move[0];
			neworg[1] = ent._v_float[11] + move[1];
			neworg[2] = ent._v_float[12];
			if(i == 0 && enemy != 0) {
				var dz = ent._v_float[12] - quake_SV.server.edicts[enemy]._v_float[12];
				if(dz > 40.0) neworg[2] = neworg[2] - 8.0; else if(dz < 30.0) neworg[2] = neworg[2] + 8.0;
			}
			var trace1 = quake_SV.Move(new Float32Array(ent._v_float.buffer.slice(40,52)),mins,maxs,neworg,0,ent);
			if(trace1.fraction == 1.0) {
				if(((ent._v_float[76] | 0) & 2) != 0 && quake_SV.PointContents(trace1.endpos) == -1) return false;
				ent._v_float[10] = trace1.endpos[0];
				ent._v_float[11] = trace1.endpos[1];
				ent._v_float[12] = trace1.endpos[2];
				if(relink) quake_SV.LinkEdict(ent,true);
				return true;
			}
			if(enemy == 0) return false;
		}
		return false;
	}
	neworg[0] = ent._v_float[10] + move[0];
	neworg[1] = ent._v_float[11] + move[1];
	neworg[2] = ent._v_float[12] + 18.0;
	var tmp;
	var v = new Float32Array(3);
	v[0] = neworg[0];
	v[1] = neworg[1];
	v[2] = neworg[2] - 36.0;
	tmp = v;
	var end = tmp;
	var trace = quake_SV.Move(neworg,mins,maxs,end,0,ent);
	if(trace.allsolid) return false;
	if(trace.startsolid) {
		neworg[2] = neworg[2] - 18.0;
		trace = quake_SV.Move(neworg,mins,maxs,end,0,ent);
		if(trace.allsolid || trace.startsolid) return false;
	}
	if(trace.fraction == 1.0) {
		if(((ent._v_float[76] | 0) & 1024) == 0) return false;
		var _g1 = ent;
		_g1._v_float[10] = _g1._v_float[10] + move[0];
		var _g2 = ent;
		_g2._v_float[11] = _g2._v_float[11] + move[1];
		if(relink) quake_SV.LinkEdict(ent,true);
		return true;
	}
	ent._v_float[10] = trace.endpos[0];
	ent._v_float[11] = trace.endpos[1];
	ent._v_float[12] = trace.endpos[2];
	if(!quake_SV.CheckBottom(ent)) {
		if(((ent._v_float[76] | 0) & 1024) != 0) {
			if(relink) quake_SV.LinkEdict(ent,true);
			return true;
		}
		ent._v_float[10] = oldorg[0];
		ent._v_float[11] = oldorg[1];
		ent._v_float[12] = oldorg[2];
		return false;
	}
	ent._v_int[47] = trace.ent.num;
	if(relink) quake_SV.LinkEdict(ent,true);
	return true;
};
quake_SV.StepDirection = function(ent,yaw,dist) {
	ent._v_float[85] = yaw;
	quake_PF.changeyaw();
	yaw *= Math.PI / 180.0;
	var oldorigin = new Float32Array(ent._v_float.buffer.slice(40,52));
	var tmp;
	var x = Math.cos(yaw) * dist;
	var y = Math.sin(yaw) * dist;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = 0;
	tmp = v;
	if(quake_SV.movestep(ent,tmp,false)) {
		var delta = ent._v_float[20] - ent._v_float[85];
		if(delta > 45.0 && delta < 315.0) ent._v_float.set(oldorigin,10);
		quake_SV.LinkEdict(ent,true);
		return true;
	}
	quake_SV.LinkEdict(ent,true);
	return false;
};
quake_SV.NewChaseDir = function(actor,enemy,dist) {
	var olddir = quake__$Vec_Vec_$Impl_$.Anglemod((actor._v_float[85] / 45.0 | 0) * 45.0);
	var turnaround = quake__$Vec_Vec_$Impl_$.Anglemod(olddir - 180.0);
	var deltax = enemy._v_float[10] - actor._v_float[10];
	var deltay = enemy._v_float[11] - actor._v_float[11];
	var dx;
	var dy;
	if(deltax > 10.0) dx = 0.0; else if(deltax < -10.0) dx = 180.0; else dx = -1;
	if(deltay < -10.0) dy = 270.0; else if(deltay > 10.0) dy = 90.0; else dy = -1;
	var tdir;
	if(dx != -1 && dy != -1) {
		if(dx == 0.0) tdir = dy == 90.0?45.0:315.0; else tdir = dy == 90.0?135.0:215.0;
		if(tdir != turnaround && quake_SV.StepDirection(actor,tdir,dist)) return;
	}
	if(Math.random() >= 0.25 || Math.abs(deltay) > Math.abs(deltax)) {
		tdir = dx;
		dx = dy;
		dy = tdir;
	}
	if(dx != -1 && dx != turnaround && quake_SV.StepDirection(actor,dx,dist)) return;
	if(dy != -1 && dy != turnaround && quake_SV.StepDirection(actor,dy,dist)) return;
	if(olddir != -1 && quake_SV.StepDirection(actor,olddir,dist)) return;
	if(Math.random() >= 0.5) {
		tdir = 0.0;
		while(tdir <= 315.0) {
			if(tdir != turnaround && quake_SV.StepDirection(actor,tdir,dist)) return;
			tdir += 45.0;
		}
	} else {
		tdir = 315.0;
		while(tdir >= 0.0) {
			if(tdir != turnaround && quake_SV.StepDirection(actor,tdir,dist)) return;
			tdir -= 45.0;
		}
	}
	if(turnaround != -1 && quake_SV.StepDirection(actor,turnaround,dist)) return;
	actor._v_float[85] = olddir;
	if(!quake_SV.CheckBottom(actor)) {
	}
};
quake_SV.CloseEnough = function(ent,goal,dist) {
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		if(goal._v_float[1 + i] > ent._v_float[4 + i] + dist) return false;
		if(goal._v_float[4 + i] < ent._v_float[1 + i] - dist) return false;
	}
	return true;
};
quake_SV.CheckVelocity = function(ent) {
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var velocity = ent._v_float[16 + i];
		if(isNaN(velocity)) {
			quake_Console.Print("Got a NaN velocity on " + quake_PR.GetString(ent._v_int[28]) + "\n");
			velocity = 0.0;
		}
		if(isNaN(ent._v_float[10 + i])) {
			quake_Console.Print("Got a NaN origin on " + quake_PR.GetString(ent._v_int[28]) + "\n");
			ent._v_float[10 + i] = 0.0;
		}
		if(velocity > quake_SV.maxvelocity.value) velocity = quake_SV.maxvelocity.value; else if(velocity < -quake_SV.maxvelocity.value) velocity = -quake_SV.maxvelocity.value;
		ent._v_float[16 + i] = velocity;
	}
};
quake_SV.RunThink = function(ent) {
	var thinktime = ent._v_float[46];
	if(thinktime <= 0.0 || thinktime > quake_SV.server.time + quake_Host.frametime) return true;
	if(thinktime < quake_SV.server.time) thinktime = quake_SV.server.time;
	ent._v_float[46] = 0.0;
	quake_PR._globals_float[31] = thinktime;
	quake_PR._globals_int[28] = ent.num;
	quake_PR._globals_int[29] = 0;
	quake_PR.ExecuteProgram(ent._v_int[44]);
	return !ent.free;
};
quake_SV.Impact = function(e1,e2) {
	var old_self = quake_PR._globals_int[28];
	var old_other = quake_PR._globals_int[29];
	quake_PR._globals_float[31] = quake_SV.server.time;
	if(e1._v_int[42] != 0 && e1._v_float[9] != 0) {
		quake_PR._globals_int[28] = e1.num;
		quake_PR._globals_int[29] = e2.num;
		quake_PR.ExecuteProgram(e1._v_int[42]);
	}
	if(e2._v_int[42] != 0 && e2._v_float[9] != 0) {
		quake_PR._globals_int[28] = e2.num;
		quake_PR._globals_int[29] = e1.num;
		quake_PR.ExecuteProgram(e2._v_int[42]);
	}
	quake_PR._globals_int[28] = old_self;
	quake_PR._globals_int[29] = old_other;
};
quake_SV.ClipVelocity = function(vec,normal,out,overbounce) {
	var backoff = (vec[0] * normal[0] + vec[1] * normal[1] + vec[2] * normal[2]) * overbounce;
	out[0] = vec[0] - normal[0] * backoff;
	if(out[0] > -0.1 && out[0] < 0.1) out[0] = 0.0;
	out[1] = vec[1] - normal[1] * backoff;
	if(out[1] > -0.1 && out[1] < 0.1) out[1] = 0.0;
	out[2] = vec[2] - normal[2] * backoff;
	if(out[2] > -0.1 && out[2] < 0.1) out[2] = 0.0;
};
quake_SV.FlyMove = function(ent,time) {
	var primal_velocity = new Float32Array(ent._v_float.buffer.slice(64,76));
	var original_velocity = new Float32Array(ent._v_float.buffer.slice(64,76));
	var new_velocity = new Float32Array(3);
	var end = new Float32Array(3);
	var time_left = time;
	var blocked = 0;
	var planes = [];
	var numplanes = 0;
	var _g = 0;
	while(_g < 4) {
		_g++;
		if(ent._v_float[16] == 0.0 && ent._v_float[17] == 0.0 && ent._v_float[18] == 0.0) break;
		end[0] = ent._v_float[10] + time_left * ent._v_float[16];
		end[1] = ent._v_float[11] + time_left * ent._v_float[17];
		end[2] = ent._v_float[12] + time_left * ent._v_float[18];
		var trace = quake_SV.Move(new Float32Array(ent._v_float.buffer.slice(40,52)),new Float32Array(ent._v_float.buffer.slice(132,144)),new Float32Array(ent._v_float.buffer.slice(144,156)),end,0,ent);
		if(trace.allsolid) {
			ent._v_float.set(quake__$Vec_Vec_$Impl_$.origin,16);
			return 3;
		}
		if(trace.fraction > 0.0) {
			ent._v_float.set(trace.endpos,10);
			original_velocity = new Float32Array(ent._v_float.buffer.slice(64,76));
			numplanes = 0;
			if(trace.fraction == 1.0) break;
		}
		if(trace.ent == null) quake_Sys.Error("SV.FlyMove: !trace.ent");
		if(trace.plane.normal[2] > 0.7) {
			blocked |= 1;
			if(trace.ent._v_float[9] == 4) {
				ent._v_float[76] | 0 | 512;
				ent._v_int[47] = trace.ent.num;
			}
		} else if(trace.plane.normal[2] == 0.0) {
			blocked |= 2;
			quake_SV.steptrace = trace;
		}
		quake_SV.Impact(ent,trace.ent);
		if(ent.free) break;
		time_left -= time_left * trace.fraction;
		if(numplanes >= 5) {
			ent._v_float.set(quake__$Vec_Vec_$Impl_$.origin,16);
			return 3;
		}
		var tmp;
		var v = new Float32Array(3);
		v[0] = trace.plane.normal[0];
		v[1] = trace.plane.normal[1];
		v[2] = trace.plane.normal[2];
		tmp = v;
		planes[numplanes++] = tmp;
		var i = 0;
		while(i < numplanes) {
			quake_SV.ClipVelocity(original_velocity,planes[i],new_velocity,1.0);
			var j = 0;
			while(j < numplanes) {
				if(j != i) {
					var plane = planes[j];
					if(new_velocity[0] * plane[0] + new_velocity[1] * plane[1] + new_velocity[2] * plane[2] < 0.0) break;
				}
				j++;
			}
			if(j == numplanes) break;
			i++;
		}
		if(i != numplanes) ent._v_float.set(new_velocity,16); else {
			if(numplanes != 2) {
				ent._v_float.set(quake__$Vec_Vec_$Impl_$.origin,16);
				return 7;
			}
			var dir = quake__$Vec_Vec_$Impl_$.CrossProduct(planes[0],planes[1]);
			var d = dir[0] * ent._v_float[16] + dir[1] * ent._v_float[17] + dir[2] * ent._v_float[18];
			ent._v_float[16] = dir[0] * d;
			ent._v_float[17] = dir[1] * d;
			ent._v_float[18] = dir[2] * d;
		}
		if(ent._v_float[16] * primal_velocity[0] + ent._v_float[17] * primal_velocity[1] + ent._v_float[18] * primal_velocity[2] <= 0.0) {
			ent._v_float.set(quake__$Vec_Vec_$Impl_$.origin,16);
			return blocked;
		}
	}
	return blocked;
};
quake_SV.AddGravity = function(ent) {
	var val = quake_EdictVarOfs.gravity;
	var ent_gravity;
	if(val != null) ent_gravity = ent._v_float[val] != 0.0?ent._v_float[val]:1.0; else ent_gravity = 1.0;
	var _g = ent;
	_g._v_float[18] = _g._v_float[18] - ent_gravity * quake_SV.gravity.value * quake_Host.frametime;
};
quake_SV.PushEntity = function(ent,push) {
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[10] + push[0];
	v[1] = ent._v_float[11] + push[1];
	v[2] = ent._v_float[12] + push[2];
	tmp = v;
	var end = tmp;
	var nomonsters;
	var solid = ent._v_float[9];
	if(ent._v_float[8] == 9) nomonsters = 2; else if(solid == 1 || solid == 0) nomonsters = 1; else nomonsters = 0;
	var trace = quake_SV.Move(new Float32Array(ent._v_float.buffer.slice(40,52)),new Float32Array(ent._v_float.buffer.slice(132,144)),new Float32Array(ent._v_float.buffer.slice(144,156)),end,nomonsters,ent);
	ent._v_float.set(trace.endpos,10);
	quake_SV.LinkEdict(ent,true);
	if(trace.ent != null) quake_SV.Impact(ent,trace.ent);
	return trace;
};
quake_SV.PushMove = function(pusher,movetime) {
	if(pusher._v_float[16] == 0.0 && pusher._v_float[17] == 0.0 && pusher._v_float[18] == 0.0) {
		var _g = pusher;
		_g._v_float[7] = _g._v_float[7] + movetime;
		return;
	}
	var tmp;
	var v = new Float32Array(3);
	v[0] = pusher._v_float[16] * movetime;
	v[1] = pusher._v_float[17] * movetime;
	v[2] = pusher._v_float[18] * movetime;
	tmp = v;
	var move = tmp;
	var mins_0 = pusher._v_float[1] + move[0];
	var mins_1 = pusher._v_float[2] + move[1];
	var mins_2 = pusher._v_float[3] + move[2];
	var maxs_0 = pusher._v_float[4] + move[0];
	var maxs_1 = pusher._v_float[5] + move[1];
	var maxs_2 = pusher._v_float[6] + move[2];
	var pushorig = new Float32Array(pusher._v_float.buffer.slice(40,52));
	var _g1 = pusher;
	_g1._v_float[10] = _g1._v_float[10] + move[0];
	var _g2 = pusher;
	_g2._v_float[11] = _g2._v_float[11] + move[1];
	var _g3 = pusher;
	_g3._v_float[12] = _g3._v_float[12] + move[2];
	var _g4 = pusher;
	_g4._v_float[7] = _g4._v_float[7] + movetime;
	quake_SV.LinkEdict(pusher,false);
	var moved = [];
	var _g11 = 1;
	var _g5 = quake_SV.server.num_edicts;
	while(_g11 < _g5) {
		var e = _g11++;
		var check = quake_SV.server.edicts[e];
		if(check.free) continue;
		var movetype = check._v_float[8];
		if(movetype == 7 || movetype == 0 || movetype == 8) continue;
		if(((check._v_float[76] | 0) & 512) == 0 || check._v_int[47] != pusher.num) {
			if(check._v_float[1] >= maxs_0 || check._v_float[2] >= maxs_1 || check._v_float[3] >= maxs_2 || check._v_float[4] <= mins_0 || check._v_float[5] <= mins_1 || check._v_float[6] <= mins_2) continue;
			if(!quake_SV.TestEntityPosition(check)) continue;
		}
		if(movetype != 3) (check._v_float[76] | 0) & ~512;
		var entorig = new Float32Array(check._v_float.buffer.slice(40,52));
		moved.push([entorig[0],entorig[1],entorig[2],check]);
		pusher._v_float[9] = 0;
		quake_SV.PushEntity(check,move);
		pusher._v_float[9] = 4;
		if(quake_SV.TestEntityPosition(check)) {
			if(check._v_float[33] == check._v_float[36]) continue;
			if(check._v_float[9] == 0 || check._v_float[9] == 1) {
				var value = check._v_float[36] = 0.0;
				check._v_float[33] = value;
				var value1 = check._v_float[37] = 0.0;
				check._v_float[34] = value1;
				check._v_float[38] = check._v_float[35];
				continue;
			}
			check._v_float[10] = entorig[0];
			check._v_float[11] = entorig[1];
			check._v_float[12] = entorig[2];
			quake_SV.LinkEdict(check,true);
			pusher._v_float[10] = pushorig[0];
			pusher._v_float[11] = pushorig[1];
			pusher._v_float[12] = pushorig[2];
			quake_SV.LinkEdict(pusher,false);
			var _g21 = pusher;
			_g21._v_float[7] = _g21._v_float[7] - movetime;
			if(pusher._v_int[45] != 0) {
				quake_PR._globals_int[28] = pusher.num;
				quake_PR._globals_int[29] = check.num;
				quake_PR.ExecuteProgram(pusher._v_int[45]);
			}
			var _g22 = 0;
			while(_g22 < moved.length) {
				var moved_edict = moved[_g22];
				++_g22;
				var ed = moved_edict[3];
				var value2 = moved_edict[0];
				ed._v_float[10] = value2;
				var value3 = moved_edict[1];
				ed._v_float[11] = value3;
				var value4 = moved_edict[2];
				ed._v_float[12] = value4;
				quake_SV.LinkEdict(ed,false);
			}
			return;
		}
	}
};
quake_SV.Physics_Pusher = function(ent) {
	var oldltime = ent._v_float[7];
	var thinktime = ent._v_float[46];
	var movetime;
	if(thinktime < oldltime + quake_Host.frametime) {
		movetime = thinktime - oldltime;
		if(movetime < 0.0) movetime = 0.0;
	} else movetime = quake_Host.frametime;
	if(movetime != 0.0) quake_SV.PushMove(ent,movetime);
	if(thinktime <= oldltime || thinktime > ent._v_float[7]) return;
	ent._v_float[46] = 0.0;
	quake_PR._globals_float[31] = quake_SV.server.time;
	quake_PR._globals_int[28] = ent.num;
	quake_PR._globals_int[29] = 0;
	quake_PR.ExecuteProgram(ent._v_int[44]);
};
quake_SV.CheckStuck = function(ent) {
	if(!quake_SV.TestEntityPosition(ent)) {
		ent._v_float[13] = ent._v_float[10];
		ent._v_float[14] = ent._v_float[11];
		ent._v_float[15] = ent._v_float[12];
		return;
	}
	var org = new Float32Array(ent._v_float.buffer.slice(40,52));
	ent._v_float[10] = ent._v_float[13];
	ent._v_float[11] = ent._v_float[14];
	ent._v_float[12] = ent._v_float[15];
	if(!quake_SV.TestEntityPosition(ent)) {
		quake_Console.DPrint("Unstuck.\n");
		quake_SV.LinkEdict(ent,true);
		return;
	}
	var _g = 0;
	while(_g < 18) {
		var z = _g++;
		var _g1 = -1;
		while(_g1 < 2) {
			var i = _g1++;
			var _g2 = -1;
			while(_g2 < 2) {
				var j = _g2++;
				ent._v_float[10] = org[0] + i;
				ent._v_float[11] = org[1] + j;
				ent._v_float[12] = org[2] + z;
				if(!quake_SV.TestEntityPosition(ent)) {
					quake_Console.DPrint("Unstuck.\n");
					quake_SV.LinkEdict(ent,true);
					return;
				}
			}
		}
	}
	ent._v_float.set(org,10);
	quake_Console.DPrint("player is stuck.\n");
};
quake_SV.CheckWater = function(ent) {
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[10];
	v[1] = ent._v_float[11];
	v[2] = ent._v_float[12] + ent._v_float[35] + 1.0;
	tmp = v;
	var point = tmp;
	ent._v_float[83] = 0.0;
	ent._v_float[84] = -1;
	var cont = quake_SV.PointContents(point);
	if(cont > -3) return false;
	ent._v_float[84] = cont;
	ent._v_float[83] = 1.0;
	point[2] = ent._v_float[12] + (ent._v_float[35] + ent._v_float[38]) * 0.5;
	cont = quake_SV.PointContents(point);
	if(cont <= -3) {
		ent._v_float[83] = 2.0;
		point[2] = ent._v_float[12] + ent._v_float[64];
		cont = quake_SV.PointContents(point);
		if(cont <= -3) ent._v_float[83] = 3.0;
	}
	return ent._v_float[83] > 1.0;
};
quake_SV.WallFriction = function(ent,tr) {
	var forward = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(new Float32Array(ent._v_float.buffer.slice(280,292)),forward);
	var normal = tr.plane.normal;
	var d = normal[0] * forward[0] + normal[1] * forward[1] + normal[2] * forward[2] + 0.5;
	if(d >= 0.0) return;
	d += 1.0;
	var i = normal[0] * ent._v_float[16] + normal[1] * ent._v_float[17] + normal[2] * ent._v_float[18];
	ent._v_float[16] = (ent._v_float[16] - normal[0] * i) * d;
	ent._v_float[17] = (ent._v_float[17] - normal[1] * i) * d;
};
quake_SV.TryUnstick = function(ent,oldvel) {
	var oldorg = new Float32Array(ent._v_float.buffer.slice(40,52));
	var tmp;
	var v = new Float32Array(3);
	v[0] = 2.0;
	v[1] = 0.0;
	v[2] = 0.0;
	tmp = v;
	var dir = tmp;
	var _g = 0;
	while(_g < 8) {
		var i = _g++;
		switch(i) {
		case 1:
			dir[0] = 0.0;
			dir[1] = 2.0;
			break;
		case 2:
			dir[0] = -2.0;
			dir[1] = 0.0;
			break;
		case 3:
			dir[0] = 0.0;
			dir[1] = -2.0;
			break;
		case 4:
			dir[0] = 2.0;
			dir[1] = 2.0;
			break;
		case 5:
			dir[0] = -2.0;
			dir[1] = 2.0;
			break;
		case 6:
			dir[0] = 2.0;
			dir[1] = -2.0;
			break;
		case 7:
			dir[0] = -2.0;
			dir[1] = -2.0;
			break;
		}
		quake_SV.PushEntity(ent,dir);
		ent._v_float[16] = oldvel[0];
		ent._v_float[17] = oldvel[1];
		ent._v_float[18] = 0.0;
		var clip = quake_SV.FlyMove(ent,0.1);
		if(Math.abs(oldorg[1] - ent._v_float[11]) > 4.0 || Math.abs(oldorg[0] - ent._v_float[10]) > 4.0) return clip;
		ent._v_float.set(oldorg,10);
	}
	ent._v_float.set(quake__$Vec_Vec_$Impl_$.origin,16);
	return 7;
};
quake_SV.WalkMove = function(ent) {
	var oldonground = (ent._v_float[76] | 0) & 512;
	var oldorg = new Float32Array(ent._v_float.buffer.slice(40,52));
	var oldvel = new Float32Array(ent._v_float.buffer.slice(64,76));
	var clip = quake_SV.FlyMove(ent,quake_Host.frametime);
	if((clip & 2) == 0) return;
	if(oldonground == 0 && ent._v_float[83] == 0.0) return;
	if(ent._v_float[8] != 3) return;
	if(quake_SV.nostep.value != 0) return;
	if(((quake_SV.player._v_float[76] | 0) & 2048) != 0) return;
	var nosteporg = new Float32Array(ent._v_float.buffer.slice(40,52));
	var nostepvel = new Float32Array(ent._v_float.buffer.slice(64,76));
	ent._v_float.set(oldorg,10);
	var tmp;
	var v = new Float32Array(3);
	v[0] = 0.0;
	v[1] = 0.0;
	v[2] = 18.0;
	tmp = v;
	quake_SV.PushEntity(ent,tmp);
	ent._v_float[16] = oldvel[0];
	ent._v_float[17] = oldvel[1];
	ent._v_float[18] = 0.0;
	clip = quake_SV.FlyMove(ent,quake_Host.frametime);
	if(clip != 0) {
		if(Math.abs(oldorg[1] - ent._v_float[11]) < 0.03125 && Math.abs(oldorg[0] - ent._v_float[10]) < 0.03125) clip = quake_SV.TryUnstick(ent,oldvel);
		if((clip & 2) != 0) quake_SV.WallFriction(ent,quake_SV.steptrace);
	}
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = 0.0;
	v1[1] = 0.0;
	v1[2] = oldvel[2] * quake_Host.frametime - 18.0;
	tmp1 = v1;
	var downtrace = quake_SV.PushEntity(ent,tmp1);
	if(downtrace.plane.normal[2] > 0.7) {
		if(ent._v_float[9] == 4) ent._v_int[47] = downtrace.ent.num;
		return;
	}
	ent._v_float.set(nosteporg,10);
	ent._v_float.set(nostepvel,16);
};
quake_SV.Physics_Client = function(ent) {
	if(!quake_SV.svs.clients[ent.num - 1].active) return;
	quake_PR._globals_float[31] = quake_SV.server.time;
	quake_PR._globals_int[28] = ent.num;
	quake_PR.ExecuteProgram(quake_PR._globals_int[84]);
	quake_SV.CheckVelocity(ent);
	var movetype = ent._v_float[8] | 0;
	if(movetype == 6 || movetype == 10) quake_SV.Physics_Toss(ent); else {
		if(!quake_SV.RunThink(ent)) return;
		switch(movetype) {
		case 0:
			break;
		case 3:
			if(!quake_SV.CheckWater(ent) && ((ent._v_float[76] | 0) & 2048) == 0) quake_SV.AddGravity(ent);
			quake_SV.CheckStuck(ent);
			quake_SV.WalkMove(ent);
			break;
		case 5:
			quake_SV.FlyMove(ent,quake_Host.frametime);
			break;
		case 8:
			var _g = ent;
			_g._v_float[10] = _g._v_float[10] + quake_Host.frametime * ent._v_float[16];
			var _g1 = ent;
			_g1._v_float[11] = _g1._v_float[11] + quake_Host.frametime * ent._v_float[17];
			var _g2 = ent;
			_g2._v_float[12] = _g2._v_float[12] + quake_Host.frametime * ent._v_float[18];
			break;
		default:
			quake_Sys.Error("SV.Physics_Client: bad movetype " + movetype);
		}
	}
	quake_SV.LinkEdict(ent,true);
	quake_PR._globals_float[31] = quake_SV.server.time;
	quake_PR._globals_int[28] = ent.num;
	quake_PR.ExecuteProgram(quake_PR._globals_int[85]);
};
quake_SV.Physics_Noclip = function(ent) {
	if(!quake_SV.RunThink(ent)) return;
	var _g = ent;
	_g._v_float[19] = _g._v_float[19] + quake_Host.frametime * ent._v_float[22];
	var _g1 = ent;
	_g1._v_float[20] = _g1._v_float[20] + quake_Host.frametime * ent._v_float[23];
	var _g2 = ent;
	_g2._v_float[21] = _g2._v_float[21] + quake_Host.frametime * ent._v_float[24];
	var _g3 = ent;
	_g3._v_float[10] = _g3._v_float[10] + quake_Host.frametime * ent._v_float[16];
	var _g4 = ent;
	_g4._v_float[11] = _g4._v_float[11] + quake_Host.frametime * ent._v_float[17];
	var _g5 = ent;
	_g5._v_float[12] = _g5._v_float[12] + quake_Host.frametime * ent._v_float[18];
	quake_SV.LinkEdict(ent,false);
};
quake_SV.CheckWaterTransition = function(ent) {
	var cont = quake_SV.PointContents(new Float32Array(ent._v_float.buffer.slice(40,52)));
	if(ent._v_float[84] == 0.0) {
		ent._v_float[84] = cont;
		ent._v_float[83] = 1.0;
		return;
	}
	if(cont <= -3) {
		if(ent._v_float[84] == -1) quake_SV.StartSound(ent,0,"misc/h2ohit1.wav",255,1.0);
		ent._v_float[84] = cont;
		ent._v_float[83] = 1.0;
		return;
	}
	if(ent._v_float[84] != -1) quake_SV.StartSound(ent,0,"misc/h2ohit1.wav",255,1.0);
	ent._v_float[84] = -1;
	ent._v_float[83] = cont;
};
quake_SV.Physics_Toss = function(ent) {
	if(!quake_SV.RunThink(ent)) return;
	if(((ent._v_float[76] | 0) & 512) != 0) return;
	quake_SV.CheckVelocity(ent);
	var movetype = ent._v_float[8];
	if(movetype != 5 && movetype != 9) quake_SV.AddGravity(ent);
	var _g = ent;
	_g._v_float[19] = _g._v_float[19] + quake_Host.frametime * ent._v_float[22];
	var _g1 = ent;
	_g1._v_float[20] = _g1._v_float[20] + quake_Host.frametime * ent._v_float[23];
	var _g2 = ent;
	_g2._v_float[21] = _g2._v_float[21] + quake_Host.frametime * ent._v_float[24];
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[16] * quake_Host.frametime;
	v[1] = ent._v_float[17] * quake_Host.frametime;
	v[2] = ent._v_float[18] * quake_Host.frametime;
	tmp = v;
	var trace = quake_SV.PushEntity(ent,tmp);
	if(trace.fraction == 1.0 || ent.free) return;
	var velocity = new Float32Array(3);
	quake_SV.ClipVelocity(new Float32Array(ent._v_float.buffer.slice(64,76)),trace.plane.normal,velocity,movetype == 10?1.5:1.0);
	ent._v_float.set(velocity,16);
	if(trace.plane.normal[2] > 0.7) {
		if(ent._v_float[18] < 60.0 || movetype != 10) {
			ent._v_int[47] = trace.ent.num;
			var tmp1;
			var value1 = ent._v_float[18] = 0.0;
			tmp1 = ent._v_float[17] = value1;
			var value = tmp1;
			ent._v_float[16] = value;
			var tmp2;
			var value3 = ent._v_float[24] = 0.0;
			tmp2 = ent._v_float[23] = value3;
			var value2 = tmp2;
			ent._v_float[22] = value2;
		}
	}
	quake_SV.CheckWaterTransition(ent);
};
quake_SV.Physics_Step = function(ent) {
	if(((ent._v_float[76] | 0) & 512 + 1 + 2) == 0) {
		var hitsound = ent._v_float[18] < quake_SV.gravity.value * -0.1;
		quake_SV.AddGravity(ent);
		quake_SV.CheckVelocity(ent);
		quake_SV.FlyMove(ent,quake_Host.frametime);
		quake_SV.LinkEdict(ent,true);
		if(hitsound && ((ent._v_float[76] | 0) & 512) != 0) quake_SV.StartSound(ent,0,"demon/dland2.wav",255,1.0);
	}
	quake_SV.RunThink(ent);
	quake_SV.CheckWaterTransition(ent);
};
quake_SV.Physics = function() {
	quake_PR._globals_int[28] = 0;
	quake_PR._globals_int[29] = 0;
	quake_PR._globals_float[31] = quake_SV.server.time;
	quake_PR.ExecuteProgram(quake_PR._globals_int[83]);
	var _g1 = 0;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		var ent = quake_SV.server.edicts[i];
		if(ent.free) continue;
		if(quake_PR._globals_float[33] != 0.0) quake_SV.LinkEdict(ent,true);
		if(i > 0 && i <= quake_SV.svs.maxclients) {
			quake_SV.Physics_Client(ent);
			continue;
		}
		var _g2 = ent._v_float[8];
		switch(_g2) {
		case 7:
			quake_SV.Physics_Pusher(ent);
			break;
		case 0:
			quake_SV.RunThink(ent);
			break;
		case 8:
			quake_SV.Physics_Noclip(ent);
			break;
		case 4:
			quake_SV.Physics_Step(ent);
			break;
		case 6:case 10:case 5:case 9:
			quake_SV.Physics_Toss(ent);
			break;
		default:
			quake_Sys.Error("SV.Physics: bad movetype " + (ent._v_float[8] | 0));
		}
	}
	if(quake_PR._globals_float[33] != 0.0) quake_PR._globals_float[33] = quake_PR._globals_float[33] - 1;
	quake_SV.server.time += quake_Host.frametime;
};
quake_SV.SetIdealPitch = function() {
	var ent = quake_SV.player;
	if(((ent._v_float[76] | 0) & 512) == 0) return;
	var angleval = ent._v_float[20] * (Math.PI / 180.0);
	var sinval = Math.sin(angleval);
	var cosval = Math.cos(angleval);
	var tmp;
	var v = new Float32Array(3);
	v[0] = 0.0;
	v[1] = 0.0;
	v[2] = ent._v_float[12] + ent._v_float[64];
	tmp = v;
	var top = tmp;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = 0.0;
	v1[1] = 0.0;
	v1[2] = top[2] - 160.0;
	tmp1 = v1;
	var bottom = tmp1;
	var z = [];
	var _g = 0;
	while(_g < 6) {
		var i = _g++;
		var v2 = bottom[0] = ent._v_float[10] + cosval * (i + 3) * 12.0;
		top[0] = v2;
		var v3 = bottom[1] = ent._v_float[11] + sinval * (i + 3) * 12.0;
		top[1] = v3;
		var tr = quake_SV.Move(top,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,bottom,1,ent);
		if(tr.allsolid || tr.fraction == 1.0) return;
		z[i] = top[2] - tr.fraction * 160.0;
	}
	var dir = 0.0;
	var steps = 0;
	var _g1 = 1;
	while(_g1 < 6) {
		var i1 = _g1++;
		var step = z[i1] - z[i1 - 1];
		if(step > -0.1 && step < 0.1) continue;
		if(dir != 0.0 && (step - dir > 0.1 || step - dir < -0.1)) return;
		steps++;
		dir = step;
	}
	if(dir == 0.0) {
		ent._v_float[73] = 0.0;
		return;
	}
	if(steps >= 2) ent._v_float[73] = -dir * quake_SV.idealpitchscale.value;
};
quake_SV.UserFriction = function() {
	var ent = quake_SV.player;
	var vel0 = ent._v_float[16];
	var vel1 = ent._v_float[17];
	var speed = Math.sqrt(vel0 * vel0 + vel1 * vel1);
	if(speed == 0.0) return;
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[10] + vel0 / speed * 16.0;
	v[1] = ent._v_float[11] + vel1 / speed * 16.0;
	v[2] = ent._v_float[12] + ent._v_float[35];
	tmp = v;
	var start = tmp;
	var friction = quake_SV.friction.value;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = start[0];
	v1[1] = start[1];
	v1[2] = start[2] - 34.0;
	tmp1 = v1;
	if(quake_SV.Move(start,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,tmp1,1,ent).fraction == 1.0) friction *= quake_SV.edgefriction.value;
	var newspeed = speed - quake_Host.frametime * (speed < quake_SV.stopspeed.value?quake_SV.stopspeed.value:speed) * friction;
	if(newspeed < 0.0) newspeed = 0.0;
	newspeed /= speed;
	var _g = ent;
	_g._v_float[16] = _g._v_float[16] * newspeed;
	var _g1 = ent;
	_g1._v_float[17] = _g1._v_float[17] * newspeed;
	var _g2 = ent;
	_g2._v_float[18] = _g2._v_float[18] * newspeed;
};
quake_SV.Accelerate = function(wishvel,air) {
	var ent = quake_SV.player;
	var wishdir = new Float32Array(wishvel);
	var wishspeed = quake__$Vec_Vec_$Impl_$.Normalize(wishdir);
	if(air && wishspeed > 30.0) wishspeed = 30.0;
	var addspeed = wishspeed - (ent._v_float[16] * wishdir[0] + ent._v_float[17] * wishdir[1] + ent._v_float[18] * wishdir[2]);
	if(addspeed <= 0.0) return;
	var accelspeed = quake_SV.accelerate.value * quake_Host.frametime * wishspeed;
	if(accelspeed > addspeed) accelspeed = addspeed;
	var _g = ent;
	_g._v_float[16] = _g._v_float[16] + accelspeed * wishdir[0];
	var _g1 = ent;
	_g1._v_float[17] = _g1._v_float[17] + accelspeed * wishdir[1];
	var _g2 = ent;
	_g2._v_float[18] = _g2._v_float[18] + accelspeed * wishdir[2];
};
quake_SV.WaterMove = function() {
	var ent = quake_SV.player;
	var cmd = quake_Host.client.cmd;
	var forward = new Float32Array(3);
	var right = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(new Float32Array(ent._v_float.buffer.slice(280,292)),forward,right);
	var wishvel_0 = forward[0] * cmd.forwardmove + right[0] * cmd.sidemove;
	var wishvel_1 = forward[1] * cmd.forwardmove + right[1] * cmd.sidemove;
	var wishvel_2 = forward[2] * cmd.forwardmove + right[2] * cmd.sidemove;
	if(cmd.forwardmove == 0.0 && cmd.sidemove == 0.0 && cmd.upmove == 0.0) wishvel_2 -= 60.0; else wishvel_2 += cmd.upmove;
	var wishspeed = Math.sqrt(wishvel_0 * wishvel_0 + wishvel_1 * wishvel_1 + wishvel_2 * wishvel_2);
	if(wishspeed > quake_SV.maxspeed.value) {
		var scale = quake_SV.maxspeed.value / wishspeed;
		wishvel_0 *= scale;
		wishvel_1 *= scale;
		wishvel_2 *= scale;
		wishspeed = quake_SV.maxspeed.value;
	}
	wishspeed *= 0.7;
	var speed = Math.sqrt(ent._v_float[16] * ent._v_float[16] + ent._v_float[17] * ent._v_float[17] + ent._v_float[18] * ent._v_float[18]);
	var newspeed;
	if(speed != 0.0) {
		newspeed = speed - quake_Host.frametime * speed * quake_SV.friction.value;
		if(newspeed < 0.0) newspeed = 0.0;
		var scale1 = newspeed / speed;
		var _g = ent;
		_g._v_float[16] = _g._v_float[16] * scale1;
		var _g1 = ent;
		_g1._v_float[17] = _g1._v_float[17] * scale1;
		var _g2 = ent;
		_g2._v_float[18] = _g2._v_float[18] * scale1;
	} else newspeed = 0.0;
	if(wishspeed == 0.0) return;
	var addspeed = wishspeed - newspeed;
	if(addspeed <= 0.0) return;
	var accelspeed = quake_SV.accelerate.value * wishspeed * quake_Host.frametime;
	if(accelspeed > addspeed) accelspeed = addspeed;
	var _g3 = ent;
	_g3._v_float[16] = _g3._v_float[16] + accelspeed * (wishvel_0 / wishspeed);
	var _g4 = ent;
	_g4._v_float[17] = _g4._v_float[17] + accelspeed * (wishvel_1 / wishspeed);
	var _g5 = ent;
	_g5._v_float[18] = _g5._v_float[18] + accelspeed * (wishvel_2 / wishspeed);
};
quake_SV.WaterJump = function() {
	var ent = quake_SV.player;
	if(quake_SV.server.time > ent._v_float[80] || ent._v_float[83] == 0.0) ent._v_float[80] = 0.0;
	ent._v_float[16] = ent._v_float[96];
	ent._v_float[17] = ent._v_float[97];
};
quake_SV.AirMove = function() {
	var ent = quake_SV.player;
	var cmd = quake_Host.client.cmd;
	var forward = new Float32Array(3);
	var right = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(new Float32Array(ent._v_float.buffer.slice(76,88)),forward,right);
	var fmove = cmd.forwardmove;
	var smove = cmd.sidemove;
	if(quake_SV.server.time < ent._v_float[80] && fmove < 0.0) fmove = 0.0;
	var tmp;
	var v = new Float32Array(3);
	v[0] = forward[0] * fmove + right[0] * smove;
	v[1] = forward[1] * fmove + right[1] * smove;
	v[2] = (ent._v_float[8] | 0) != 3?cmd.upmove:0.0;
	tmp = v;
	var wishvel = tmp;
	var wishdir = new Float32Array(wishvel);
	if(quake__$Vec_Vec_$Impl_$.Normalize(wishdir) > quake_SV.maxspeed.value) {
		wishvel[0] = wishdir[0] * quake_SV.maxspeed.value;
		wishvel[1] = wishdir[1] * quake_SV.maxspeed.value;
		wishvel[2] = wishdir[2] * quake_SV.maxspeed.value;
	}
	if(ent._v_float[8] == 8) ent._v_float.set(wishvel,16); else if(((ent._v_float[76] | 0) & 512) != 0) {
		quake_SV.UserFriction();
		quake_SV.Accelerate(wishvel,false);
	} else quake_SV.Accelerate(wishvel,true);
};
quake_SV.ClientThink = function() {
	var ent = quake_SV.player;
	if(ent._v_float[8] == 0) return;
	var punchangle = new Float32Array(ent._v_float.buffer.slice(100,112));
	var len = quake__$Vec_Vec_$Impl_$.Normalize(punchangle) - 10.0 * quake_Host.frametime;
	if(len < 0.0) len = 0.0;
	ent._v_float[25] = punchangle[0] * len;
	ent._v_float[26] = punchangle[1] * len;
	ent._v_float[27] = punchangle[2] * len;
	if(ent._v_float[48] <= 0.0) return;
	var value = quake_V.CalcRoll(new Float32Array(ent._v_float.buffer.slice(76,88)),new Float32Array(ent._v_float.buffer.slice(64,76))) * 4.0;
	ent._v_float[21] = value;
	if(ent._v_float[69] == 0.0) {
		ent._v_float[19] = (ent._v_float[70] + ent._v_float[25]) / -3.0;
		ent._v_float[20] = ent._v_float[71] + ent._v_float[26];
	}
	if(((ent._v_float[76] | 0) & 2048) != 0) quake_SV.WaterJump(); else if(ent._v_float[83] >= 2.0 && ent._v_float[8] != 8) quake_SV.WaterMove(); else quake_SV.AirMove();
};
quake_SV.ReadClientMove = function() {
	var client = quake_Host.client;
	client.ping_times[client.num_pings++ & 15] = quake_SV.server.time - quake_MSG.ReadFloat();
	var value = quake_MSG.ReadChar() * 1.40625;
	client.edict._v_float[70] = value;
	var value1 = quake_MSG.ReadChar() * 1.40625;
	client.edict._v_float[71] = value1;
	var value2 = quake_MSG.ReadChar() * 1.40625;
	client.edict._v_float[72] = value2;
	client.cmd.forwardmove = quake_MSG.ReadShort();
	client.cmd.sidemove = quake_MSG.ReadShort();
	client.cmd.upmove = quake_MSG.ReadShort();
	var i = quake_MSG.ReadByte();
	client.edict._v_float[65] = i & 1;
	client.edict._v_float[67] = (i & 2) >> 1;
	i = quake_MSG.ReadByte();
	if(i != 0) client.edict._v_float[68] = i;
};
quake_SV.ReadClientMessage = function() {
	var ret;
	while(true) {
		ret = quake_NET.GetMessage(quake_Host.client.netconnection);
		if(ret == -1) {
			console.log("SV.ReadClientMessage: NET.GetMessage failed\n");
			return false;
		}
		if(ret == 0) return true;
		quake_MSG.BeginReading();
		while(true) {
			if(!quake_Host.client.active) return false;
			if(quake_MSG.badread) {
				console.log("SV.ReadClientMessage: badread\n");
				return false;
			}
			var cmd = quake_MSG.ReadChar();
			if(cmd == -1) {
				ret = 1;
				break;
			}
			if(cmd == 1) continue;
			if(cmd == 4) {
				var s = quake_MSG.ReadString();
				var i = 0;
				while(i < quake_SV.readClientCmds.length) {
					if(s.substring(0,quake_SV.readClientCmds[i].length).toLowerCase() != quake_SV.readClientCmds[i]) {
						i++;
						continue;
					}
					quake_Cmd.ExecuteString(s,true);
					break;
				}
				if(i == quake_SV.readClientCmds.length) quake_Console.DPrint(quake_PR.GetString(quake_PR.netnames + (quake_Host.client.num << 5)) + " tried to " + s);
			} else if(cmd == 2) return false; else if(cmd == 3) quake_SV.ReadClientMove(); else {
				console.log("SV.ReadClientMessage: unknown command char\n");
				return false;
			}
		}
	}
	return false;
};
quake_SV.RunClients = function() {
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		quake_Host.client = quake_SV.svs.clients[i];
		if(!quake_Host.client.active) continue;
		quake_SV.player = quake_Host.client.edict;
		if(!quake_SV.ReadClientMessage()) {
			quake_Host.DropClient(false);
			continue;
		}
		if(!quake_Host.client.spawned) {
			quake_Host.client.cmd.forwardmove = 0.0;
			quake_Host.client.cmd.sidemove = 0.0;
			quake_Host.client.cmd.upmove = 0.0;
			continue;
		}
		quake_SV.ClientThink();
	}
};
quake_SV.InitBoxHull = function() {
	quake_SV.box_clipnodes = [];
	quake_SV.box_planes = [];
	quake_SV.box_hull = new quake_Hull();
	quake_SV.box_hull.clipnodes = quake_SV.box_clipnodes;
	quake_SV.box_hull.planes = quake_SV.box_planes;
	quake_SV.box_hull.firstclipnode = 0;
	quake_SV.box_hull.lastclipnode = 5;
	var _g = 0;
	while(_g < 6) {
		var i = _g++;
		var side = i & 1;
		var node = new quake_ClipNode();
		node.planenum = i;
		if(side == 0) node.child0 = -1; else node.child1 = -1;
		if(i != 5) {
			if(side == 0) node.child1 = i + 1; else node.child0 = i + 1;
		} else if(side == 0) node.child1 = -2; else node.child0 = -2;
		quake_SV.box_clipnodes.push(node);
		var plane = new quake_Plane();
		plane.type = i >> 1;
		plane.normal[i >> 1] = 1.0;
		plane.dist = 0.0;
		quake_SV.box_planes.push(plane);
	}
};
quake_SV.HullForEntity = function(ent,mins,maxs,offset) {
	if(ent._v_float[9] != 4) {
		quake_SV.box_planes[0].dist = ent._v_float[36] - mins[0];
		quake_SV.box_planes[1].dist = ent._v_float[33] - maxs[0];
		quake_SV.box_planes[2].dist = ent._v_float[37] - mins[1];
		quake_SV.box_planes[3].dist = ent._v_float[34] - maxs[1];
		quake_SV.box_planes[4].dist = ent._v_float[38] - mins[2];
		quake_SV.box_planes[5].dist = ent._v_float[35] - maxs[2];
		offset[0] = ent._v_float[10];
		offset[1] = ent._v_float[11];
		offset[2] = ent._v_float[12];
		return quake_SV.box_hull;
	}
	if(ent._v_float[8] != 7) quake_Sys.Error("SOLID_BSP without MOVETYPE_PUSH");
	var model = quake_SV.server.models[ent._v_float[0] | 0];
	if(model == null) quake_Sys.Error("MOVETYPE_PUSH with a non bsp model");
	if(model.type != 0) quake_Sys.Error("MOVETYPE_PUSH with a non bsp model");
	var size = maxs[0] - mins[0];
	var hull;
	if(size < 3.0) hull = model.hulls[0]; else if(size <= 32.0) hull = model.hulls[1]; else hull = model.hulls[2];
	offset[0] = hull.clip_mins[0] - mins[0] + ent._v_float[10];
	offset[1] = hull.clip_mins[1] - mins[1] + ent._v_float[11];
	offset[2] = hull.clip_mins[2] - mins[2] + ent._v_float[12];
	return hull;
};
quake_SV.CreateAreaNode = function(depth,mins,maxs) {
	var anode = new quake__$SV_AreaNode();
	quake_SV.areanodes.push(anode);
	anode.trigger_edicts = new quake_EdictLink();
	anode.trigger_edicts.prev = anode.trigger_edicts.next = anode.trigger_edicts;
	anode.solid_edicts = new quake_EdictLink();
	anode.solid_edicts.prev = anode.solid_edicts.next = anode.solid_edicts;
	if(depth == 4) {
		anode.axis = -1;
		anode.children = [];
		return anode;
	}
	anode.axis = maxs[0] - mins[0] > maxs[1] - mins[1]?0:1;
	anode.dist = 0.5 * (maxs[anode.axis] + mins[anode.axis]);
	var maxs1 = new Float32Array(maxs);
	var mins2 = new Float32Array(mins);
	var v = mins2[anode.axis] = anode.dist;
	maxs1[anode.axis] = v;
	anode.children = [quake_SV.CreateAreaNode(depth + 1,mins2,maxs),quake_SV.CreateAreaNode(depth + 1,mins,maxs1)];
	return anode;
};
quake_SV.UnlinkEdict = function(ent) {
	if(ent.area.prev != null) ent.area.prev.next = ent.area.next;
	if(ent.area.next != null) ent.area.next.prev = ent.area.prev;
	ent.area.prev = ent.area.next = null;
};
quake_SV.TouchLinks = function(ent,node) {
	var l = node.trigger_edicts.next;
	while(l != node.trigger_edicts) {
		var touch = l.ent;
		l = l.next;
		if(touch == ent) continue;
		if(touch._v_int[42] == 0 || touch._v_float[9] != 1) continue;
		if(ent._v_float[1] > touch._v_float[4] || ent._v_float[2] > touch._v_float[5] || ent._v_float[3] > touch._v_float[6] || ent._v_float[4] < touch._v_float[1] || ent._v_float[5] < touch._v_float[2] || ent._v_float[6] < touch._v_float[3]) continue;
		var old_self = quake_PR._globals_int[28];
		var old_other = quake_PR._globals_int[29];
		quake_PR._globals_int[28] = touch.num;
		quake_PR._globals_int[29] = ent.num;
		quake_PR._globals_float[31] = quake_SV.server.time;
		quake_PR.ExecuteProgram(touch._v_int[42]);
		quake_PR._globals_int[28] = old_self;
		quake_PR._globals_int[29] = old_other;
	}
	if(node.axis == -1) return;
	if(ent._v_float[4 + node.axis] > node.dist) quake_SV.TouchLinks(ent,node.children[0]);
	if(ent._v_float[1 + node.axis] < node.dist) quake_SV.TouchLinks(ent,node.children[1]);
};
quake_SV.FindTouchedLeafs = function(ent,node) {
	if(node.contents == -2) return;
	if(node.contents < 0) {
		if(ent.leafnums.length == 16) return;
		ent.leafnums.push(node.num - 1);
		return;
	}
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[1];
	v[1] = ent._v_float[2];
	v[2] = ent._v_float[3];
	tmp = v;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = ent._v_float[4];
	v1[1] = ent._v_float[5];
	v1[2] = ent._v_float[6];
	tmp1 = v1;
	var sides = quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide(tmp,tmp1,node.plane);
	if((sides & 1) != 0) quake_SV.FindTouchedLeafs(ent,node.child0);
	if((sides & 2) != 0) quake_SV.FindTouchedLeafs(ent,node.child1);
};
quake_SV.LinkEdict = function(ent,touch_triggers) {
	if(ent.free || ent == quake_SV.server.edicts[0]) return;
	quake_SV.UnlinkEdict(ent);
	ent._v_float[1] = ent._v_float[10] + ent._v_float[33] - 1.0;
	ent._v_float[2] = ent._v_float[11] + ent._v_float[34] - 1.0;
	ent._v_float[3] = ent._v_float[12] + ent._v_float[35];
	ent._v_float[4] = ent._v_float[10] + ent._v_float[36] + 1.0;
	ent._v_float[5] = ent._v_float[11] + ent._v_float[37] + 1.0;
	ent._v_float[6] = ent._v_float[12] + ent._v_float[38];
	if(((ent._v_float[76] | 0) & 256) != 0) {
		var _g = ent;
		_g._v_float[1] = _g._v_float[1] - 14.0;
		var _g1 = ent;
		_g1._v_float[2] = _g1._v_float[2] - 14.0;
		var _g2 = ent;
		_g2._v_float[4] = _g2._v_float[4] + 14.0;
		var _g3 = ent;
		_g3._v_float[5] = _g3._v_float[5] + 14.0;
	} else {
		var _g4 = ent;
		_g4._v_float[3] = _g4._v_float[3] - 1.0;
		var _g5 = ent;
		_g5._v_float[6] = _g5._v_float[6] + 1.0;
	}
	ent.leafnums = [];
	if(ent._v_float[0] != 0) quake_SV.FindTouchedLeafs(ent,quake_SV.server.worldmodel.nodes[0]);
	if(ent._v_float[9] == 0) return;
	var node = quake_SV.areanodes[0];
	while(true) {
		if(node.axis == -1) break;
		if(ent._v_float[1 + node.axis] > node.dist) node = node.children[0]; else if(ent._v_float[4 + node.axis] < node.dist) node = node.children[1]; else break;
	}
	var before = ent._v_float[9] == 1?node.trigger_edicts:node.solid_edicts;
	ent.area.next = before;
	ent.area.prev = before.prev;
	ent.area.prev.next = ent.area;
	ent.area.next.prev = ent.area;
	ent.area.ent = ent;
	if(touch_triggers) quake_SV.TouchLinks(ent,quake_SV.areanodes[0]);
};
quake_SV.HullPointContents = function(hull,num,p) {
	while(num >= 0) {
		if(num < hull.firstclipnode || num > hull.lastclipnode) quake_Sys.Error("SV.HullPointContents: bad node number");
		var node = hull.clipnodes[num];
		var plane = hull.planes[node.planenum];
		var d;
		if(plane.type <= 2) d = p[plane.type] - plane.dist; else d = plane.normal[0] * p[0] + plane.normal[1] * p[1] + plane.normal[2] * p[2] - plane.dist;
		if(d >= 0.0) num = node.child0; else num = node.child1;
	}
	return num;
};
quake_SV.PointContents = function(p) {
	var cont = quake_SV.HullPointContents(quake_SV.server.worldmodel.hulls[0],0,p);
	if(cont <= -9 && cont >= -14) return -3;
	return cont;
};
quake_SV.TestEntityPosition = function(ent) {
	var origin = new Float32Array(ent._v_float.buffer.slice(40,52));
	return quake_SV.Move(origin,new Float32Array(ent._v_float.buffer.slice(132,144)),new Float32Array(ent._v_float.buffer.slice(144,156)),origin,0,ent).startsolid;
};
quake_SV.RecursiveHullCheck = function(hull,num,p1f,p2f,p1,p2,trace) {
	if(num < 0) {
		if(num != -2) {
			trace.allsolid = false;
			if(num == -1) trace.inopen = true; else trace.inwater = true;
		} else trace.startsolid = true;
		return true;
	}
	if(num < hull.firstclipnode || num > hull.lastclipnode) quake_Sys.Error("SV.RecursiveHullCheck: bad node number");
	var node = hull.clipnodes[num];
	var plane = hull.planes[node.planenum];
	var t1;
	var t2;
	if(plane.type <= 2) {
		t1 = p1[plane.type] - plane.dist;
		t2 = p2[plane.type] - plane.dist;
	} else {
		t1 = plane.normal[0] * p1[0] + plane.normal[1] * p1[1] + plane.normal[2] * p1[2] - plane.dist;
		t2 = plane.normal[0] * p2[0] + plane.normal[1] * p2[1] + plane.normal[2] * p2[2] - plane.dist;
	}
	if(t1 >= 0.0 && t2 >= 0.0) return quake_SV.RecursiveHullCheck(hull,node.child0,p1f,p2f,p1,p2,trace);
	if(t1 < 0.0 && t2 < 0.0) return quake_SV.RecursiveHullCheck(hull,node.child1,p1f,p2f,p1,p2,trace);
	var frac = (t1 + (t1 < 0.0?0.03125:-0.03125)) / (t1 - t2);
	if(frac < 0.0) frac = 0.0; else if(frac > 1.0) frac = 1.0;
	var midf = p1f + (p2f - p1f) * frac;
	var tmp;
	var v = new Float32Array(3);
	v[0] = p1[0] + frac * (p2[0] - p1[0]);
	v[1] = p1[1] + frac * (p2[1] - p1[1]);
	v[2] = p1[2] + frac * (p2[2] - p1[2]);
	tmp = v;
	var mid = tmp;
	var side = t1 < 0.0;
	if(!quake_SV.RecursiveHullCheck(hull,side?node.child1:node.child0,p1f,midf,p1,mid,trace)) return false;
	if(quake_SV.HullPointContents(hull,side?node.child0:node.child1,mid) != -2) return quake_SV.RecursiveHullCheck(hull,side?node.child0:node.child1,midf,p2f,mid,p2,trace);
	if(trace.allsolid) return false;
	if(!side) {
		trace.plane.normal.set(plane.normal);
		trace.plane.dist = plane.dist;
	} else {
		var this1 = trace.plane.normal;
		this1[0] = -plane.normal[0];
		this1[1] = -plane.normal[1];
		this1[2] = -plane.normal[2];
		trace.plane.dist = -plane.dist;
	}
	while(quake_SV.HullPointContents(hull,hull.firstclipnode,mid) == -2) {
		frac -= 0.1;
		if(frac < 0.0) {
			trace.fraction = midf;
			trace.endpos.set(mid);
			quake_Console.DPrint("backup past 0\n");
			return false;
		}
		midf = p1f + (p2f - p1f) * frac;
		mid[0] = p1[0] + frac * (p2[0] - p1[0]);
		mid[1] = p1[1] + frac * (p2[1] - p1[1]);
		mid[2] = p1[2] + frac * (p2[2] - p1[2]);
	}
	trace.fraction = midf;
	trace.endpos.set(mid);
	return false;
};
quake_SV.ClipMoveToEntity = function(ent,start,mins,maxs,end) {
	var trace = new quake_Trace();
	trace.fraction = 1.0;
	trace.allsolid = true;
	trace.endpos.set(end);
	var offset = new Float32Array(3);
	var hull = quake_SV.HullForEntity(ent,mins,maxs,offset);
	var tmp;
	var v = new Float32Array(3);
	v[0] = start[0] - offset[0];
	v[1] = start[1] - offset[1];
	v[2] = start[2] - offset[2];
	tmp = v;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = end[0] - offset[0];
	v1[1] = end[1] - offset[1];
	v1[2] = end[2] - offset[2];
	tmp1 = v1;
	quake_SV.RecursiveHullCheck(hull,hull.firstclipnode,0.0,1.0,tmp,tmp1,trace);
	if(trace.fraction != 1.0) {
		trace.endpos[0] = trace.endpos[0] + offset[0];
		trace.endpos[1] = trace.endpos[1] + offset[1];
		trace.endpos[2] = trace.endpos[2] + offset[2];
	}
	if(trace.fraction < 1.0 || trace.startsolid) trace.ent = ent;
	return trace;
};
quake_SV.ClipToLinks = function(node,clip) {
	var l = node.solid_edicts.next;
	while(l != node.solid_edicts) {
		var touch = l.ent;
		l = l.next;
		var solid = touch._v_float[9];
		if(solid == 0 || touch == clip.passedict) continue;
		if(solid == 1) quake_Sys.Error("Trigger in clipping list");
		if(clip.type == 1 && solid != 4) continue;
		if(clip.boxmins[0] > touch._v_float[4] || clip.boxmins[1] > touch._v_float[5] || clip.boxmins[2] > touch._v_float[6] || clip.boxmaxs[0] < touch._v_float[1] || clip.boxmaxs[1] < touch._v_float[2] || clip.boxmaxs[2] < touch._v_float[3]) continue;
		if(clip.passedict != null) {
			if(clip.passedict._v_float[39] != 0.0 && touch._v_float[39] == 0.0) continue;
		}
		if(clip.trace.allsolid) return;
		if(clip.passedict != null) {
			if(quake_SV.server.edicts[touch._v_int[95]] == clip.passedict) continue;
			if(quake_SV.server.edicts[clip.passedict._v_int[95]] == touch) continue;
		}
		var trace;
		if(((touch._v_float[76] | 0) & 32) != 0) trace = quake_SV.ClipMoveToEntity(touch,clip.start,clip.mins2,clip.maxs2,clip.end); else trace = quake_SV.ClipMoveToEntity(touch,clip.start,clip.mins,clip.maxs,clip.end);
		if(trace.allsolid || trace.startsolid || trace.fraction < clip.trace.fraction) {
			trace.ent = touch;
			clip.trace = trace;
			if(trace.startsolid) clip.trace.startsolid = true;
		}
	}
	if(node.axis == -1) return;
	if(clip.boxmaxs[node.axis] > node.dist) quake_SV.ClipToLinks(node.children[0],clip);
	if(clip.boxmins[node.axis] < node.dist) quake_SV.ClipToLinks(node.children[1],clip);
};
quake_SV.Move = function(start,mins,maxs,end,type,passedict) {
	var clip = new quake__$SV_MoveClip();
	clip.trace = quake_SV.ClipMoveToEntity(quake_SV.server.edicts[0],start,mins,maxs,end);
	clip.start = start;
	clip.end = end;
	clip.mins = mins;
	clip.maxs = maxs;
	clip.type = type;
	clip.passedict = passedict;
	clip.boxmins = new Float32Array(3);
	clip.boxmaxs = new Float32Array(3);
	if(type == 2) {
		var tmp;
		var v = new Float32Array(3);
		v[0] = -15.0;
		v[1] = -15.0;
		v[2] = -15.0;
		tmp = v;
		clip.mins2 = tmp;
		var tmp1;
		var v1 = new Float32Array(3);
		v1[0] = 15.0;
		v1[1] = 15.0;
		v1[2] = 15.0;
		tmp1 = v1;
		clip.maxs2 = tmp1;
	} else {
		clip.mins2 = new Float32Array(mins);
		clip.maxs2 = new Float32Array(maxs);
	}
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		if(end[i] > start[i]) {
			clip.boxmins[i] = start[i] + clip.mins2[i] - 1.0;
			clip.boxmaxs[i] = end[i] + clip.maxs2[i] + 1.0;
			continue;
		}
		clip.boxmins[i] = end[i] + clip.mins2[i] - 1.0;
		clip.boxmaxs[i] = start[i] + clip.maxs2[i] + 1.0;
	}
	quake_SV.ClipToLinks(quake_SV.areanodes[0],clip);
	return clip.trace;
};
var quake__$SV_MoveClip = function() {
};
quake__$SV_MoveClip.__name__ = true;
var quake_Trace = function() {
	this.endpos = new Float32Array(3);
	this.fraction = 0.0;
	this.plane = new quake_Plane();
	this.inwater = false;
	this.inopen = false;
	this.startsolid = false;
	this.allsolid = false;
};
quake_Trace.__name__ = true;
var quake_Plane = function() {
	this.signbits = 0;
	this.dist = 0;
	this.normal = new Float32Array(3);
	this.type = 0;
};
quake_Plane.__name__ = true;
var quake__$Render_RefDef = function() {
	this.viewangles = new Float32Array(3);
	this.vieworg = new Float32Array(3);
	this.vrect = new quake__$Render_Rect();
};
quake__$Render_RefDef.__name__ = true;
var quake_Render = function() { };
quake_Render.__name__ = true;
quake_Render.SplitEntityOnNode = function(emins,emaxs,node) {
	if(node.contents == -2) return;
	if(node.contents < 0) {
		quake_Render.currententity.leafs.push(node.num - 1);
		return;
	}
	var sides = quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide(emins,emaxs,node.plane);
	if((sides & 1) != 0) quake_Render.SplitEntityOnNode(emins,emaxs,node.child0);
	if((sides & 2) != 0) quake_Render.SplitEntityOnNode(emins,emaxs,node.child1);
};
quake_Render.AnimateLight = function() {
	if(quake_Render.fullbright.value == 0) {
		var i = Math.floor(quake_CL.state.time * 10.0);
		var _g = 0;
		while(_g < 64) {
			var j = _g++;
			var style = quake_CL.lightstyle[j];
			if(style.length == 0) quake_Render.lightstylevalue[j] = 12; else quake_Render.lightstylevalue[j] = HxOverrides.cca(style,i % style.length) - 97;
		}
	} else {
		var _g1 = 0;
		while(_g1 < 64) {
			var j1 = _g1++;
			quake_Render.lightstylevalue[j1] = 12;
		}
	}
	quake_GL.Bind(0,quake_Render.lightstyle_texture);
	quake_GL.gl.texImage2D(3553,0,6406,64,1,0,6406,5121,quake_Render.lightstylevalue);
};
quake_Render.RenderDlights = function() {
	if(quake_Render.flashblend.value == 0) return;
	quake_Render.dlightframecount++;
	quake_GL.gl.enable(3042);
	var program = quake_GL.UseProgram("dlight");
	quake_GL.gl.bindBuffer(34962,quake_Render.dlightvecs);
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,0,0);
	var _g = 0;
	var _g1 = quake_CL.dlights;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		if(l.die < quake_CL.state.time || l.radius == 0.0) continue;
		var tmp;
		var tmp1;
		var v1 = new Float32Array(3);
		v1[0] = l.origin[0] - quake_Render.refdef.vieworg[0];
		v1[1] = l.origin[1] - quake_Render.refdef.vieworg[1];
		v1[2] = l.origin[2] - quake_Render.refdef.vieworg[2];
		tmp1 = v1;
		var v = tmp1;
		tmp = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
		if(tmp < l.radius * 0.35) {
			var a = l.radius * 0.0003;
			quake_V.blend[3] += a * (1.0 - quake_V.blend[3]);
			a /= quake_V.blend[3];
			quake_V.blend[0] = quake_V.blend[1] * (1.0 - a) + 255.0 * a;
			quake_V.blend[1] = quake_V.blend[1] * (1.0 - a) + 127.5 * a;
			quake_V.blend[2] *= 1.0 - a;
			continue;
		}
		quake_GL.gl.uniform3fv(program.uOrigin,l.origin);
		quake_GL.gl.uniform1f(program.uRadius,l.radius);
		quake_GL.gl.drawArrays(6,0,18);
	}
	quake_GL.gl.disable(3042);
};
quake_Render.MarkLights = function(light,bit,node) {
	while(true) {
		if(node.contents < 0) return;
		var splitplane = node.plane;
		var dist;
		if(splitplane.type < 3) dist = light.origin[splitplane.type] - splitplane.dist; else {
			var tmp;
			var v1 = light.origin;
			var v2 = splitplane.normal;
			tmp = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
			dist = tmp - splitplane.dist;
		}
		if(dist > light.radius) {
			node = node.child0;
			continue;
		}
		if(dist < -light.radius) {
			node = node.child1;
			continue;
		}
		var _g1 = 0;
		var _g = node.numfaces;
		while(_g1 < _g) {
			var i = _g1++;
			var surf = quake_CL.state.worldmodel.faces[node.firstface + i];
			if(surf.sky || surf.turbulent) continue;
			if(surf.dlightframe != quake_Render.dlightframecount + 1) {
				surf.dlightbits = 0;
				surf.dlightframe = quake_Render.dlightframecount + 1;
			}
			surf.dlightbits += bit;
		}
		if(node.child0.contents >= 0) quake_Render.MarkLights(light,bit,node.child0);
		if(node.child1.contents >= 0) quake_Render.MarkLights(light,bit,node.child1);
		break;
	}
};
quake_Render.PushDlights = function() {
	if(quake_Render.flashblend.value != 0) return;
	var _g = 0;
	while(_g < 1024) {
		var i = _g++;
		quake_Render.lightmap_modified[i] = 0;
	}
	var bit = 1;
	var _g1 = 0;
	var _g11 = quake_CL.dlights;
	while(_g1 < _g11.length) {
		var l = _g11[_g1];
		++_g1;
		if(l.die >= quake_CL.state.time && l.radius != 0.0) {
			quake_Render.MarkLights(l,bit,quake_CL.state.worldmodel.nodes[0]);
			var _g3 = 0;
			var _g2 = quake_CL.numvisedicts;
			while(_g3 < _g2) {
				var j = _g3++;
				var ent = quake_CL.visedicts[j];
				if(ent.model == null) continue;
				if(ent.model.type != 0 || !ent.model.submodel) continue;
				quake_Render.MarkLights(l,bit,quake_CL.state.worldmodel.nodes[ent.model.hulls[0].firstclipnode]);
			}
		}
		bit += bit;
	}
	var _g4 = 0;
	var _g12 = quake_CL.state.worldmodel.faces;
	while(_g4 < _g12.length) {
		var surf = _g12[_g4];
		++_g4;
		if(surf.dlightframe == quake_Render.dlightframecount) quake_Render.RemoveDynamicLights(surf); else if(surf.dlightframe == quake_Render.dlightframecount + 1) quake_Render.AddDynamicLights(surf);
	}
	quake_GL.Bind(0,quake_Render.dlightmap_texture);
	var start = null;
	var _g5 = 0;
	while(_g5 < 1024) {
		var i1 = _g5++;
		if(start == null && quake_Render.lightmap_modified[i1] != 0) start = i1; else if(start != null && quake_Render.lightmap_modified[i1] == 0) {
			quake_GL.gl.texSubImage2D(3553,0,0,start,1024,i1 - start,6406,5121,quake_Render.dlightmaps.subarray(start << 10,i1 << 10));
			start = null;
		}
	}
	if(start != null) quake_GL.gl.texSubImage2D(3553,0,0,start,1024,1024 - start,6406,5121,quake_Render.dlightmaps.subarray(start << 10,1048576));
	quake_Render.dlightframecount++;
};
quake_Render.RecursiveLightPoint = function(node,start,end) {
	if(node.contents < 0) return -1;
	var normal = node.plane.normal;
	var front = start[0] * normal[0] + start[1] * normal[1] + start[2] * normal[2] - node.plane.dist;
	var back = end[0] * normal[0] + end[1] * normal[1] + end[2] * normal[2] - node.plane.dist;
	var side = front < 0;
	if(back < 0 == side) return quake_Render.RecursiveLightPoint(side?node.child1:node.child0,start,end);
	var frac = front / (front - back);
	var tmp;
	var v = new Float32Array(3);
	v[0] = start[0] + (end[0] - start[0]) * frac;
	v[1] = start[1] + (end[1] - start[1]) * frac;
	v[2] = start[2] + (end[2] - start[2]) * frac;
	tmp = v;
	var mid = tmp;
	var r = quake_Render.RecursiveLightPoint(side?node.child1:node.child0,start,mid);
	if(r >= 0) return r;
	if(back < 0 == side) return -1;
	var _g1 = 0;
	var _g = node.numfaces;
	while(_g1 < _g) {
		var i = _g1++;
		var surf = quake_CL.state.worldmodel.faces[node.firstface + i];
		if(surf.sky || surf.turbulent) continue;
		var tex = quake_CL.state.worldmodel.texinfo[surf.texinfo];
		var tmp1;
		var tmp3;
		var tmp4;
		var a = tex.vecs[0];
		var v1 = new Float32Array(3);
		v1[0] = a[0];
		v1[1] = a[1];
		v1[2] = a[2];
		tmp4 = v1;
		var v2 = tmp4;
		tmp3 = mid[0] * v2[0] + mid[1] * v2[1] + mid[2] * v2[2];
		var x = tmp3 + tex.vecs[0][3];
		tmp1 = x | 0;
		var s = tmp1;
		var tmp2;
		var tmp5;
		var tmp6;
		var a1 = tex.vecs[1];
		var v3 = new Float32Array(3);
		v3[0] = a1[0];
		v3[1] = a1[1];
		v3[2] = a1[2];
		tmp6 = v3;
		var v21 = tmp6;
		tmp5 = mid[0] * v21[0] + mid[1] * v21[1] + mid[2] * v21[2];
		var x1 = tmp5 + tex.vecs[1][3];
		tmp2 = x1 | 0;
		var t = tmp2;
		if(s < surf.texturemins[0] || t < surf.texturemins[1]) continue;
		var ds = s - surf.texturemins[0];
		var dt = t - surf.texturemins[1];
		if(ds > surf.extents[0] || dt > surf.extents[1]) continue;
		if(surf.lightofs == 0) return 0;
		ds >>= 4;
		dt >>= 4;
		var lightmap = surf.lightofs;
		if(lightmap == 0) return 0;
		lightmap += dt * ((surf.extents[0] >> 4) + 1) + ds;
		r = 0;
		var size = ((surf.extents[0] >> 4) + 1) * ((surf.extents[1] >> 4) + 1);
		var _g3 = 0;
		var _g2 = surf.styles.length;
		while(_g3 < _g2) {
			var maps = _g3++;
			r += quake_CL.state.worldmodel.lightdata[lightmap] * quake_Render.lightstylevalue[surf.styles[maps]] * 22;
			lightmap += size;
		}
		return r >> 8;
	}
	return quake_Render.RecursiveLightPoint(side?node.child0:node.child1,mid,end);
};
quake_Render.LightPoint = function(p) {
	if(quake_CL.state.worldmodel.lightdata == null) return 255;
	var tmp;
	var v = new Float32Array(3);
	v[0] = p[0];
	v[1] = p[1];
	v[2] = p[2] - 2048.0;
	tmp = v;
	var r = quake_Render.RecursiveLightPoint(quake_CL.state.worldmodel.nodes[0],p,tmp);
	if(r == -1) return 0;
	return r;
};
quake_Render.CullBox = function(mins,maxs) {
	if(quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide(mins,maxs,quake_Render.frustum[0]) == 2) return true;
	if(quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide(mins,maxs,quake_Render.frustum[1]) == 2) return true;
	if(quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide(mins,maxs,quake_Render.frustum[2]) == 2) return true;
	if(quake__$Vec_Vec_$Impl_$.BoxOnPlaneSide(mins,maxs,quake_Render.frustum[3]) == 2) return true;
	return false;
};
quake_Render.DrawSpriteModel = function(e) {
	var program;
	if(e.model.oriented) {
		program = quake_GL.UseProgram("spriteOriented");
		quake_GL.gl.uniformMatrix3fv(program.uAngles,false,quake_GL.RotationMatrix(e.angles[0],e.angles[1] - 90.0,e.angles[2]));
	} else program = quake_GL.UseProgram("sprite");
	var num = e.frame;
	if(num >= e.model.numframes || num < 0) {
		quake_Console.DPrint("Render.DrawSpriteModel: no such frame " + num + "\n");
		num = 0;
	}
	var frame = e.model.frames[num];
	if(frame.group) {
		var time = quake_CL.state.time + e.syncbase;
		var num1 = frame.frames.length - 1;
		var fullinterval = frame.frames[num1].interval;
		var targettime = time - Math.floor(time / fullinterval) * fullinterval;
		var i = 0;
		while(i < num1) {
			if(frame.frames[i].interval > targettime) break;
			i++;
		}
		frame = frame.frames[i];
	}
	quake_GL.gl.uniform4f(program.uRect,frame.origin[0],frame.origin[1],frame.width,frame.height);
	quake_GL.gl.uniform3fv(program.uOrigin,e.origin);
	quake_GL.Bind(program.tTexture,frame.texturenum);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Render.DrawAliasModel = function(e) {
	var clmodel = e.model;
	var tmp;
	var v = new Float32Array(3);
	v[0] = e.origin[0] - clmodel.boundingradius;
	v[1] = e.origin[1] - clmodel.boundingradius;
	v[2] = e.origin[2] - clmodel.boundingradius;
	tmp = v;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = e.origin[0] + clmodel.boundingradius;
	v1[1] = e.origin[1] + clmodel.boundingradius;
	v1[2] = e.origin[2] + clmodel.boundingradius;
	tmp1 = v1;
	if(quake_Render.CullBox(tmp,tmp1)) return;
	var program;
	if(e.colormap != 0 && clmodel.player && quake_Render.nocolors.value == 0) {
		program = quake_GL.UseProgram("player");
		var top = (quake_CL.state.scores[e.colormap - 1].colors & 240) + 4;
		var bottom = ((quake_CL.state.scores[e.colormap - 1].colors & 15) << 4) + 4;
		if(top <= 127) top += 7;
		if(bottom <= 127) bottom += 7;
		top = quake_VID.d_8to24table[top];
		bottom = quake_VID.d_8to24table[bottom];
		quake_GL.gl.uniform3f(program.uTop,top & 255,top >> 8 & 255,top >> 16);
		quake_GL.gl.uniform3f(program.uBottom,bottom & 255,bottom >> 8 & 255,bottom >> 16);
	} else program = quake_GL.UseProgram("alias");
	quake_GL.gl.uniform3fv(program.uOrigin,e.origin);
	quake_GL.gl.uniformMatrix3fv(program.uAngles,false,quake_GL.RotationMatrix(e.angles[0],e.angles[1],e.angles[2]));
	var ambientlight = quake_Render.LightPoint(e.origin);
	var shadelight = ambientlight;
	if(e == quake_CL.state.viewent && ambientlight < 24.0) ambientlight = shadelight = 24;
	var _g = 0;
	var _g1 = quake_CL.dlights;
	while(_g < _g1.length) {
		var dl = _g1[_g];
		++_g;
		if(dl.die < quake_CL.state.time) continue;
		var tmp5;
		var tmp6;
		var v3 = new Float32Array(3);
		v3[0] = e.origin[0] - dl.origin[0];
		v3[1] = e.origin[1] - dl.origin[1];
		v3[2] = e.origin[1] - dl.origin[1];
		tmp6 = v3;
		var v2 = tmp6;
		tmp5 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]);
		var add = dl.radius - tmp5;
		if(add > 0) {
			ambientlight += add;
			shadelight += add;
		}
	}
	if(ambientlight > 128.0) ambientlight = 128.0;
	if(ambientlight + shadelight > 192.0) shadelight = 192.0 - ambientlight;
	if(e.num >= 1 && e.num <= quake_CL.state.maxclients && ambientlight < 8.0) ambientlight = shadelight = 8.0;
	quake_GL.gl.uniform1f(program.uAmbientLight,ambientlight * 0.0078125);
	quake_GL.gl.uniform1f(program.uShadeLight,shadelight * 0.0078125);
	var forward = new Float32Array(3);
	var right = new Float32Array(3);
	var up = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(e.angles,forward,right,up);
	var tmp2;
	var tmp7;
	var v4 = new Float32Array(3);
	v4[0] = -1.0;
	v4[1] = 0.0;
	v4[2] = 0.0;
	tmp7 = v4;
	var v11 = tmp7;
	tmp2 = v11[0] * forward[0] + v11[1] * forward[1] + v11[2] * forward[2];
	var tmp3;
	var tmp8;
	var v5 = new Float32Array(3);
	v5[0] = -1.0;
	v5[1] = 0.0;
	v5[2] = 0.0;
	tmp8 = v5;
	var v12 = tmp8;
	tmp3 = v12[0] * right[0] + v12[1] * right[1] + v12[2] * right[2];
	var tmp4;
	var tmp9;
	var v6 = new Float32Array(3);
	v6[0] = -1.0;
	v6[1] = 0.0;
	v6[2] = 0.0;
	tmp9 = v6;
	var v13 = tmp9;
	tmp4 = v13[0] * up[0] + v13[1] * up[1] + v13[2] * up[2];
	quake_GL.gl.uniform3fv(program.uLightVec,[tmp2,-tmp3,tmp4]);
	quake_Render.c_alias_polys += clmodel.numtris;
	var time = quake_CL.state.time + e.syncbase;
	var num = e.frame;
	if(num >= clmodel.numframes || num < 0) {
		quake_Console.DPrint("Render.DrawAliasModel: no such frame " + num + "\n");
		num = 0;
	}
	var frame = clmodel.frames[num];
	if(frame.group) {
		var num1 = frame.frames.length - 1;
		var fullinterval = frame.frames[num1].interval;
		var targettime = time - Math.floor(time / fullinterval) * fullinterval;
		var i = 0;
		while(i < num1) {
			if(frame.frames[i].interval > targettime) break;
			i++;
		}
		frame = frame.frames[i];
	}
	quake_GL.gl.bindBuffer(34962,clmodel.cmds);
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,24,frame.cmdofs);
	quake_GL.gl.vertexAttribPointer(program.aLightNormal,3,5126,false,24,frame.cmdofs + 12);
	quake_GL.gl.vertexAttribPointer(program.aTexCoord,2,5126,false,0,0);
	num = e.skinnum;
	if(num >= clmodel.numskins || num < 0) {
		quake_Console.DPrint("Render.DrawAliasModel: no such skin # " + num + "\n");
		num = 0;
	}
	var skin = clmodel.skins[num];
	if(skin.group) {
		num = skin.skins.length - 1;
		var fullinterval1 = skin.skins[num].interval;
		var targettime1 = time - Math.floor(time / fullinterval1) * fullinterval1;
		var i1 = 0;
		while(i1 < num) {
			if(skin.skins[i1].interval > targettime1) break;
			i1++;
		}
		skin = skin.skins[i1];
	}
	quake_GL.Bind(program.tTexture,skin.texturenum.texnum);
	if(clmodel.player) quake_GL.Bind(program.tPlayer,skin.playertexture);
	quake_GL.gl.drawArrays(4,0,clmodel.numtris * 3);
};
quake_Render.DrawEntitiesOnList = function() {
	if(quake_Render.drawentities.value == 0) return;
	var vis = quake_Render.novis.value != 0?quake_Mod_$Brush.novis:quake_Mod_$Brush.LeafPVS(quake_Render.viewleaf,quake_CL.state.worldmodel);
	var _g = 0;
	var _g1 = quake_CL.static_entities;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		quake_Render.currententity = e;
		if(quake_Render.currententity.model == null) continue;
		var j = 0;
		while(j < quake_Render.currententity.leafs.length) {
			var leaf = quake_Render.currententity.leafs[j];
			if(leaf < 0 || (vis[leaf >> 3] & 1 << (leaf & 7)) != 0) break;
			j++;
		}
		if(j == quake_Render.currententity.leafs.length) continue;
		var _g2 = quake_Render.currententity.model.type;
		switch(_g2) {
		case 2:
			quake_Render.DrawAliasModel(quake_Render.currententity);
			break;
		case 0:
			quake_Render.DrawBrushModel(quake_Render.currententity);
			break;
		default:
		}
	}
	var _g11 = 0;
	var _g3 = quake_CL.numvisedicts;
	while(_g11 < _g3) {
		var i = _g11++;
		quake_Render.currententity = quake_CL.visedicts[i];
		if(quake_Render.currententity.model == null) continue;
		var _g21 = quake_Render.currententity.model.type;
		switch(_g21) {
		case 2:
			quake_Render.DrawAliasModel(quake_Render.currententity);
			break;
		case 0:
			quake_Render.DrawBrushModel(quake_Render.currententity);
			break;
		default:
		}
	}
	quake_GL.gl.depthMask(false);
	quake_GL.gl.enable(3042);
	var _g4 = 0;
	var _g12 = quake_CL.static_entities;
	while(_g4 < _g12.length) {
		var e1 = _g12[_g4];
		++_g4;
		quake_Render.currententity = e1;
		if(quake_Render.currententity.model == null) continue;
		if(quake_Render.currententity.model.type == 1) quake_Render.DrawSpriteModel(quake_Render.currententity);
	}
	var _g13 = 0;
	var _g5 = quake_CL.numvisedicts;
	while(_g13 < _g5) {
		var i1 = _g13++;
		quake_Render.currententity = quake_CL.visedicts[i1];
		if(quake_Render.currententity.model == null) continue;
		if(quake_Render.currententity.model.type == 1) quake_Render.DrawSpriteModel(quake_Render.currententity);
	}
	quake_GL.gl.disable(3042);
	quake_GL.gl.depthMask(true);
};
quake_Render.DrawViewModel = function() {
	if(quake_Render.drawviewmodel.value == 0) return;
	if(quake_Chase.active.value != 0) return;
	if(quake_Render.drawentities.value == 0) return;
	if((quake_CL.state.items & quake_Def.it.invisibility) != 0) return;
	if(quake_CL.state.stats[0] <= 0) return;
	if(quake_CL.state.viewent.model == null) return;
	quake_GL.gl.depthRange(0.0,0.3);
	var ymax = 4.0 * Math.tan(quake_SCR.fov.value * 0.82 * Math.PI / 360.0);
	quake_Render.perspective[0] = 4.0 / (ymax * quake_Render.refdef.vrect.width / quake_Render.refdef.vrect.height);
	quake_Render.perspective[5] = 4.0 / ymax;
	var program = quake_GL.UseProgram("alias");
	quake_GL.gl.uniformMatrix4fv(program.uPerspective,false,quake_Render.perspective);
	quake_Render.DrawAliasModel(quake_CL.state.viewent);
	ymax = 4.0 * Math.tan(quake_Render.refdef.fov_y * Math.PI / 360.0);
	quake_Render.perspective[0] = 4.0 / (ymax * quake_Render.refdef.vrect.width / quake_Render.refdef.vrect.height);
	quake_Render.perspective[5] = 4.0 / ymax;
	program = quake_GL.UseProgram("alias");
	quake_GL.gl.uniformMatrix4fv(program.uPerspective,false,quake_Render.perspective);
	quake_GL.gl.depthRange(0.0,1.0);
};
quake_Render.PolyBlend = function() {
	if(quake_Render.polyblend.value == 0) return;
	if(quake_V.blend[3] == 0.0) return;
	var program = quake_GL.UseProgram("fill");
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	var vrect = quake_Render.refdef.vrect;
	quake_GL.gl.uniform4f(program.uRect,vrect.x,vrect.y,vrect.width,vrect.height);
	quake_GL.gl.uniform4fv(program.uColor,quake_V.blend);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Render.SetFrustum = function() {
	quake__$Vec_Vec_$Impl_$.RotatePointAroundVector(quake_Render.vup,quake_Render.vpn,-(90.0 - quake_Render.refdef.fov_x * 0.5),quake_Render.frustum[0].normal);
	quake__$Vec_Vec_$Impl_$.RotatePointAroundVector(quake_Render.vup,quake_Render.vpn,90.0 - quake_Render.refdef.fov_x * 0.5,quake_Render.frustum[1].normal);
	quake__$Vec_Vec_$Impl_$.RotatePointAroundVector(quake_Render.vright,quake_Render.vpn,90.0 - quake_Render.refdef.fov_y * 0.5,quake_Render.frustum[2].normal);
	quake__$Vec_Vec_$Impl_$.RotatePointAroundVector(quake_Render.vright,quake_Render.vpn,-(90.0 - quake_Render.refdef.fov_y * 0.5),quake_Render.frustum[3].normal);
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		var out = quake_Render.frustum[i];
		out.type = 5;
		var tmp;
		var v1 = quake_Render.refdef.vieworg;
		var v2 = out.normal;
		tmp = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
		out.dist = tmp;
		out.signbits = 0;
		if(out.normal[0] < 0.0) out.signbits = 1;
		if(out.normal[1] < 0.0) out.signbits += 2;
		if(out.normal[2] < 0.0) out.signbits += 4;
		if(out.normal[3] < 0.0) out.signbits += 8;
	}
};
quake_Render.Perspective = function() {
	var viewangles_0 = quake_Render.refdef.viewangles[0] * Math.PI / 180.0;
	var viewangles_1 = (quake_Render.refdef.viewangles[1] - 90.0) * Math.PI / -180.0;
	var viewangles_2 = quake_Render.refdef.viewangles[2] * Math.PI / -180.0;
	var sp = Math.sin(viewangles_0);
	var cp = Math.cos(viewangles_0);
	var sy = Math.sin(viewangles_1);
	var cy = Math.cos(viewangles_1);
	var sr = Math.sin(viewangles_2);
	var cr = Math.cos(viewangles_2);
	var viewMatrix = [cr * cy + sr * sp * sy,cp * sy,-sr * cy + cr * sp * sy,cr * -sy + sr * sp * cy,cp * cy,-sr * -sy + cr * sp * cy,sr * cp,-sp,cr * cp];
	if(quake_V.gamma.value < 0.5) quake_V.gamma.setValue(0.5); else if(quake_V.gamma.value > 1.0) quake_V.gamma.setValue(1.0);
	quake_GL.UnbindProgram();
	var _g = 0;
	var _g1 = quake_GL.programs;
	while(_g < _g1.length) {
		var program = _g1[_g];
		++_g;
		quake_GL.gl.useProgram(program.program);
		if(program.uViewOrigin != null) quake_GL.gl.uniform3fv(program.uViewOrigin,quake_Render.refdef.vieworg);
		if(program.uViewAngles != null) quake_GL.gl.uniformMatrix3fv(program.uViewAngles,false,viewMatrix);
		if(program.uPerspective != null) quake_GL.gl.uniformMatrix4fv(program.uPerspective,false,quake_Render.perspective);
		if(program.uGamma != null) quake_GL.gl.uniform1f(program.uGamma,quake_V.gamma.value);
	}
};
quake_Render.SetupGL = function() {
	if(quake_Render.dowarp) {
		quake_GL.gl.bindFramebuffer(36160,quake_Render.warpbuffer);
		quake_GL.gl.clear(16640);
		quake_GL.gl.viewport(0,0,quake_Render.warpwidth,quake_Render.warpheight);
	} else {
		var vrect = quake_Render.refdef.vrect;
		var pixelRatio = quake_SCR.devicePixelRatio;
		quake_GL.gl.viewport(vrect.x * pixelRatio | 0,(quake_VID.height - vrect.height - vrect.y) * pixelRatio | 0,vrect.width * pixelRatio | 0,vrect.height * pixelRatio | 0);
	}
	quake_Render.Perspective();
	quake_GL.gl.enable(2929);
};
quake_Render.RenderScene = function() {
	if(quake_CL.state.maxclients >= 2) quake_Render.fullbright.set("0");
	quake_Render.AnimateLight();
	quake__$Vec_Vec_$Impl_$.AngleVectors(quake_Render.refdef.viewangles,quake_Render.vpn,quake_Render.vright,quake_Render.vup);
	quake_Render.viewleaf = quake_Mod_$Brush.PointInLeaf(quake_Render.refdef.vieworg,quake_CL.state.worldmodel);
	quake_V.SetContentsColor(quake_Render.viewleaf.contents);
	quake_V.CalcBlend();
	quake_Render.dowarp = quake_Render.waterwarp.value != 0 && quake_Render.viewleaf.contents <= -3;
	quake_Render.SetFrustum();
	quake_Render.SetupGL();
	quake_Render.MarkLeaves();
	quake_GL.gl.enable(2884);
	quake_Render.DrawSkyBox();
	quake_Render.DrawViewModel();
	quake_Render.DrawWorld();
	quake_Render.DrawEntitiesOnList();
	quake_GL.gl.disable(2884);
	quake_Render.RenderDlights();
	quake_Render.DrawParticles();
};
quake_Render.RenderView = function() {
	quake_GL.gl.finish();
	var time1 = null;
	if(quake_Render.speeds.value != 0) time1 = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	quake_Render.c_brush_verts = 0;
	quake_Render.c_alias_polys = 0;
	quake_GL.gl.clear(16640);
	quake_Render.RenderScene();
	if(quake_Render.speeds.value != 0) {
		var time2 = Math.floor((new Date().getTime() * 0.001 - quake_Sys.oldtime - time1) * 1000.0);
		var c_brush_polys = quake_Render.c_brush_verts / 3;
		var c_alias_polys = quake_Render.c_alias_polys;
		var msg = (time2 >= 100?"":time2 >= 10?" ":"  ") + time2 + " ms  ";
		msg += (c_brush_polys >= 1000?"":c_brush_polys >= 100?" ":c_brush_polys >= 10?"  ":"   ") + c_brush_polys + " wpoly ";
		msg += (c_alias_polys >= 1000?"":c_alias_polys >= 100?" ":c_alias_polys >= 10?"  ":"   ") + c_alias_polys + " epoly\n";
		quake_Console.Print(msg);
	}
};
quake_Render.MakeBrushModelDisplayLists = function(m) {
	if(m.cmds != null) quake_GL.gl.deleteBuffer(m.cmds);
	var cmds = [];
	var styles_0 = 0.0;
	var styles_1 = 0.0;
	var styles_2 = 0.0;
	var styles_3 = 0.0;
	var verts = 0;
	m.chains = [];
	var _g1 = 0;
	var _g = m.textures.length;
	while(_g1 < _g) {
		var i = _g1++;
		var texture = m.textures[i];
		if(texture.sky || texture.turbulent) continue;
		var chain = [i,verts,0];
		var _g3 = 0;
		var _g2 = m.numfaces;
		while(_g3 < _g2) {
			var j = _g3++;
			var surf = m.faces[m.firstface + j];
			if(surf.texture != i) continue;
			styles_0 = styles_1 = styles_2 = styles_3 = 0.0;
			var _g4 = surf.styles.length;
			switch(_g4) {
			case 4:
				styles_3 = surf.styles[3] * 0.015625 + 0.0078125;
				break;
			case 3:
				styles_2 = surf.styles[2] * 0.015625 + 0.0078125;
				break;
			case 2:
				styles_1 = surf.styles[1] * 0.015625 + 0.0078125;
				break;
			case 1:
				styles_0 = surf.styles[0] * 0.015625 + 0.0078125;
				break;
			}
			chain[2] += surf.verts.length;
			var _g5 = 0;
			var _g41 = surf.verts.length;
			while(_g5 < _g41) {
				var k = _g5++;
				var vert = surf.verts[k];
				cmds.push(vert[0]);
				cmds.push(vert[1]);
				cmds.push(vert[2]);
				cmds.push(vert[3]);
				cmds.push(vert[4]);
				cmds.push(vert[5]);
				cmds.push(vert[6]);
				cmds.push(styles_0);
				cmds.push(styles_1);
				cmds.push(styles_2);
				cmds.push(styles_3);
			}
		}
		if(chain[2] != 0) {
			m.chains.push(chain);
			verts += chain[2];
		}
	}
	m.waterchain = verts * 44;
	verts = 0;
	var _g11 = 0;
	var _g6 = m.textures.length;
	while(_g11 < _g6) {
		var i1 = _g11++;
		var texture1 = m.textures[i1];
		if(!texture1.turbulent) continue;
		var chain1 = [i1,verts,0];
		var _g31 = 0;
		var _g21 = m.numfaces;
		while(_g31 < _g21) {
			var j1 = _g31++;
			var surf1 = m.faces[m.firstface + j1];
			if(surf1.texture != i1) continue;
			chain1[2] += surf1.verts.length;
			var _g51 = 0;
			var _g42 = surf1.verts.length;
			while(_g51 < _g42) {
				var k1 = _g51++;
				var vert1 = surf1.verts[k1];
				cmds.push(vert1[0]);
				cmds.push(vert1[1]);
				cmds.push(vert1[2]);
				cmds.push(vert1[3]);
				cmds.push(vert1[4]);
			}
		}
		if(chain1[2] != 0) {
			m.chains.push(chain1);
			verts += chain1[2];
		}
	}
	m.cmds = quake_GL.gl.createBuffer();
	quake_GL.gl.bindBuffer(34962,m.cmds);
	quake_GL.gl.bufferData(34962,new Float32Array(cmds),35044);
};
quake_Render.MakeWorldModelDisplayLists = function(m) {
	if(m.cmds != null) return;
	var cmds = [];
	var styles_0 = 0.0;
	var styles_1 = 0.0;
	var styles_2 = 0.0;
	var styles_3 = 0.0;
	var verts = 0;
	var _g1 = 0;
	var _g = m.textures.length;
	while(_g1 < _g) {
		var i = _g1++;
		var texture = m.textures[i];
		if(texture.sky || texture.turbulent) continue;
		var _g3 = 0;
		var _g2 = m.leafs.length;
		while(_g3 < _g2) {
			var j = _g3++;
			var leaf = m.leafs[j];
			var chain = [i,verts,0];
			var _g5 = 0;
			var _g4 = leaf.nummarksurfaces;
			while(_g5 < _g4) {
				var k = _g5++;
				var surf = m.faces[m.marksurfaces[leaf.firstmarksurface + k]];
				if(surf.texture != i) continue;
				styles_0 = styles_1 = styles_2 = styles_3 = 0.0;
				var _g6 = surf.styles.length;
				switch(_g6) {
				case 4:
					styles_3 = surf.styles[3] * 0.015625 + 0.0078125;
					styles_2 = surf.styles[2] * 0.015625 + 0.0078125;
					styles_1 = surf.styles[1] * 0.015625 + 0.0078125;
					styles_0 = surf.styles[0] * 0.015625 + 0.0078125;
					break;
				case 3:
					styles_2 = surf.styles[2] * 0.015625 + 0.0078125;
					styles_1 = surf.styles[1] * 0.015625 + 0.0078125;
					styles_0 = surf.styles[0] * 0.015625 + 0.0078125;
					break;
				case 2:
					styles_1 = surf.styles[1] * 0.015625 + 0.0078125;
					styles_0 = surf.styles[0] * 0.015625 + 0.0078125;
					break;
				case 1:
					styles_0 = surf.styles[0] * 0.015625 + 0.0078125;
					break;
				}
				chain[2] += surf.verts.length;
				var _g61 = 0;
				var _g7 = surf.verts;
				while(_g61 < _g7.length) {
					var vert = _g7[_g61];
					++_g61;
					cmds.push(vert[0]);
					cmds.push(vert[1]);
					cmds.push(vert[2]);
					cmds.push(vert[3]);
					cmds.push(vert[4]);
					cmds.push(vert[5]);
					cmds.push(vert[6]);
					cmds.push(styles_0);
					cmds.push(styles_1);
					cmds.push(styles_2);
					cmds.push(styles_3);
				}
			}
			if(chain[2] != 0) {
				leaf.cmds.push(chain);
				++leaf.skychain;
				++leaf.waterchain;
				verts += chain[2];
			}
		}
	}
	m.skychain = verts * 44;
	verts = 0;
	var _g11 = 0;
	var _g8 = m.textures.length;
	while(_g11 < _g8) {
		var i1 = _g11++;
		var texture1 = m.textures[i1];
		if(!texture1.sky) continue;
		var _g31 = 0;
		var _g21 = m.leafs.length;
		while(_g31 < _g21) {
			var j1 = _g31++;
			var leaf1 = m.leafs[j1];
			var chain1 = [verts,0];
			var _g51 = 0;
			var _g41 = leaf1.nummarksurfaces;
			while(_g51 < _g41) {
				var k1 = _g51++;
				var surf1 = m.faces[m.marksurfaces[leaf1.firstmarksurface + k1]];
				if(surf1.texture != i1) continue;
				chain1[1] += surf1.verts.length;
				var _g71 = 0;
				var _g62 = surf1.verts.length;
				while(_g71 < _g62) {
					var l = _g71++;
					var vert1 = surf1.verts[l];
					cmds.push(vert1[0]);
					cmds.push(vert1[1]);
					cmds.push(vert1[2]);
				}
			}
			if(chain1[1] != 0) {
				leaf1.cmds.push(chain1);
				++leaf1.waterchain;
				verts += chain1[1];
			}
		}
	}
	m.waterchain = m.skychain + verts * 12;
	verts = 0;
	var _g12 = 0;
	var _g9 = m.textures.length;
	while(_g12 < _g9) {
		var i2 = _g12++;
		var texture2 = m.textures[i2];
		if(!texture2.turbulent) continue;
		var _g32 = 0;
		var _g22 = m.leafs.length;
		while(_g32 < _g22) {
			var j2 = _g32++;
			var leaf2 = m.leafs[j2];
			var chain2 = [i2,verts,0];
			var _g52 = 0;
			var _g42 = leaf2.nummarksurfaces;
			while(_g52 < _g42) {
				var k2 = _g52++;
				var surf2 = m.faces[m.marksurfaces[leaf2.firstmarksurface + k2]];
				if(surf2.texture != i2) continue;
				chain2[2] += surf2.verts.length;
				var _g72 = 0;
				var _g63 = surf2.verts.length;
				while(_g72 < _g63) {
					var l1 = _g72++;
					var vert2 = surf2.verts[l1];
					cmds.push(vert2[0]);
					cmds.push(vert2[1]);
					cmds.push(vert2[2]);
					cmds.push(vert2[3]);
					cmds.push(vert2[4]);
				}
			}
			if(chain2[2] != 0) {
				leaf2.cmds.push(chain2);
				verts += chain2[2];
			}
		}
	}
	m.cmds = quake_GL.gl.createBuffer();
	quake_GL.gl.bindBuffer(34962,m.cmds);
	quake_GL.gl.bufferData(34962,new Float32Array(cmds),35044);
};
quake_Render.InitTextures = function() {
	var data = new Uint8Array(new ArrayBuffer(256));
	var _g = 0;
	while(_g < 8) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < 8) {
			var j = _g1++;
			data[(i << 4) + j] = data[136 + (i << 4) + j] = 255;
			data[8 + (i << 4) + j] = data[128 + (i << 4) + j] = 0;
		}
	}
	var tmp;
	var t = new quake_MTexture();
	t.name = "notexture";
	t.width = 16;
	t.height = 16;
	t.texturenum = quake_GL.gl.createTexture();
	tmp = t;
	quake_Render.notexture_mip = tmp;
	quake_GL.Bind(0,quake_Render.notexture_mip.texturenum);
	quake_GL.Upload(data,16,16);
	quake_Render.solidskytexture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.solidskytexture);
	quake_GL.gl.texParameteri(3553,10241,9729);
	quake_GL.gl.texParameteri(3553,10240,9729);
	quake_Render.alphaskytexture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.alphaskytexture);
	quake_GL.gl.texParameteri(3553,10241,9729);
	quake_GL.gl.texParameteri(3553,10240,9729);
	quake_Render.lightmap_texture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.lightmap_texture);
	quake_GL.gl.texParameteri(3553,10241,9729);
	quake_GL.gl.texParameteri(3553,10240,9729);
	quake_Render.dlightmap_texture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.dlightmap_texture);
	quake_GL.gl.texParameteri(3553,10241,9729);
	quake_GL.gl.texParameteri(3553,10240,9729);
	quake_Render.lightstyle_texture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.lightstyle_texture);
	quake_GL.gl.texParameteri(3553,10241,9728);
	quake_GL.gl.texParameteri(3553,10240,9728);
	quake_Render.fullbright_texture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.fullbright_texture);
	quake_GL.gl.texImage2D(3553,0,6408,1,1,0,6408,5121,new Uint8Array([255,0,0,0]));
	quake_GL.gl.texParameteri(3553,10241,9728);
	quake_GL.gl.texParameteri(3553,10240,9728);
	quake_Render.null_texture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.null_texture);
	quake_GL.gl.texImage2D(3553,0,6408,1,1,0,6408,5121,new Uint8Array([0,0,0,0]));
	quake_GL.gl.texParameteri(3553,10241,9728);
	quake_GL.gl.texParameteri(3553,10240,9728);
};
quake_Render.Init = function() {
	quake_Render.InitTextures();
	quake_Cmd.AddCommand("timerefresh",quake_Render.TimeRefresh_f);
	quake_Cmd.AddCommand("pointfile",quake_Render.ReadPointFile_f);
	quake_Render.waterwarp = quake_Cvar.RegisterVariable("r_waterwarp","1");
	quake_Render.fullbright = quake_Cvar.RegisterVariable("r_fullbright","0");
	quake_Render.drawentities = quake_Cvar.RegisterVariable("r_drawentities","1");
	quake_Render.drawviewmodel = quake_Cvar.RegisterVariable("r_drawviewmodel","1");
	quake_Render.novis = quake_Cvar.RegisterVariable("r_novis","0");
	quake_Render.speeds = quake_Cvar.RegisterVariable("r_speeds","0");
	quake_Render.polyblend = quake_Cvar.RegisterVariable("gl_polyblend","1");
	quake_Render.flashblend = quake_Cvar.RegisterVariable("gl_flashblend","0");
	quake_Render.nocolors = quake_Cvar.RegisterVariable("gl_nocolors","0");
	quake_Render.InitParticles();
	quake_GL.CreateProgram("alias",["uOrigin","uAngles","uViewOrigin","uViewAngles","uPerspective","uLightVec","uGamma","uAmbientLight","uShadeLight"],["aPoint","aLightNormal","aTexCoord"],["tTexture"]);
	quake_GL.CreateProgram("brush",["uOrigin","uAngles","uViewOrigin","uViewAngles","uPerspective","uGamma"],["aPoint","aTexCoord","aLightStyle"],["tTexture","tLightmap","tDlight","tLightStyle"]);
	quake_GL.CreateProgram("dlight",["uOrigin","uViewOrigin","uViewAngles","uPerspective","uRadius","uGamma"],["aPoint"],[]);
	quake_GL.CreateProgram("player",["uOrigin","uAngles","uViewOrigin","uViewAngles","uPerspective","uLightVec","uGamma","uAmbientLight","uShadeLight","uTop","uBottom"],["aPoint","aLightNormal","aTexCoord"],["tTexture","tPlayer"]);
	quake_GL.CreateProgram("sprite",["uRect","uOrigin","uViewOrigin","uViewAngles","uPerspective","uGamma"],["aPoint"],["tTexture"]);
	quake_GL.CreateProgram("spriteOriented",["uRect","uOrigin","uAngles","uViewOrigin","uViewAngles","uPerspective","uGamma"],["aPoint"],["tTexture"]);
	quake_GL.CreateProgram("turbulent",["uOrigin","uAngles","uViewOrigin","uViewAngles","uPerspective","uGamma","uTime"],["aPoint","aTexCoord"],["tTexture"]);
	quake_GL.CreateProgram("warp",["uRect","uOrtho","uTime"],["aPoint"],["tTexture"]);
	quake_Render.warpbuffer = quake_GL.gl.createFramebuffer();
	quake_Render.warptexture = quake_GL.gl.createTexture();
	quake_GL.Bind(0,quake_Render.warptexture);
	quake_GL.gl.texParameteri(3553,10241,9729);
	quake_GL.gl.texParameteri(3553,10240,9729);
	quake_GL.gl.texParameteri(3553,10242,33071);
	quake_GL.gl.texParameteri(3553,10243,33071);
	quake_Render.warprenderbuffer = quake_GL.gl.createRenderbuffer();
	quake_GL.gl.bindRenderbuffer(36161,quake_Render.warprenderbuffer);
	quake_GL.gl.renderbufferStorage(36161,33189,0,0);
	quake_GL.gl.bindRenderbuffer(36161,null);
	quake_GL.gl.bindFramebuffer(36160,quake_Render.warpbuffer);
	quake_GL.gl.framebufferTexture2D(36160,36064,3553,quake_Render.warptexture,0);
	quake_GL.gl.framebufferRenderbuffer(36160,36096,36161,quake_Render.warprenderbuffer);
	quake_GL.gl.bindFramebuffer(36160,null);
	quake_Render.dlightvecs = quake_GL.gl.createBuffer();
	quake_GL.gl.bindBuffer(34962,quake_Render.dlightvecs);
	quake_GL.gl.bufferData(34962,new Float32Array([0.0,-1.0,0.0,0.0,0.0,1.0,-0.382683,0.0,0.92388,-0.707107,0.0,0.707107,-0.92388,0.0,0.382683,-1.0,0.0,0.0,-0.92388,0.0,-0.382683,-0.707107,0.0,-0.707107,-0.382683,0.0,-0.92388,0.0,0.0,-1.0,0.382683,0.0,-0.92388,0.707107,0.0,-0.707107,0.92388,0.0,-0.382683,1.0,0.0,0.0,0.92388,0.0,0.382683,0.707107,0.0,0.707107,0.382683,0.0,0.92388,0.0,0.0,1.0]),35044);
	quake_Render.MakeSky();
};
quake_Render.NewMap = function() {
	var _g = 0;
	while(_g < 64) {
		var i = _g++;
		quake_Render.lightstylevalue[i] = 12;
	}
	quake_Render.ClearParticles();
	quake_Render.BuildLightmaps();
	var _g1 = 0;
	while(_g1 < 1048576) {
		var i1 = _g1++;
		quake_Render.dlightmaps[i1] = 0;
	}
	quake_GL.Bind(0,quake_Render.dlightmap_texture);
	quake_GL.gl.texImage2D(3553,0,6406,1024,1024,0,6406,5121,null);
};
quake_Render.TimeRefresh_f = function() {
	quake_GL.gl.finish();
	var start = new Date().getTime() * 0.001 - quake_Sys.oldtime;
	var _g = 0;
	while(_g < 128) {
		var i = _g++;
		quake_Render.refdef.viewangles[1] = i * 2.8125;
		quake_Render.RenderView();
	}
	quake_GL.gl.finish();
	var time = new Date().getTime() * 0.001 - quake_Sys.oldtime - start;
	quake_Console.Print(time.toFixed(6) + " seconds (" + (128.0 / time).toFixed(6) + " fps)\n");
};
quake_Render.InitParticles = function() {
	var numparticles;
	var i = quake_COM.CheckParm("-particles");
	if(i != null) {
		numparticles = quake_Q.atoi(quake_COM.argv[i + 1]);
		if(numparticles < 512) numparticles = 512;
	} else numparticles = 2048;
	var tmp;
	var _g = [];
	var _g1 = 0;
	while(_g1 < numparticles) {
		_g1++;
		_g.push(new quake__$Render_Particle());
	}
	tmp = _g;
	quake_Render.particles = tmp;
	quake_Render.avelocities = [];
	var _g11 = 0;
	while(_g11 < 162) {
		_g11++;
		var tmp1;
		var x = Math.random() * 2.56;
		var y = Math.random() * 2.56;
		var z = Math.random() * 2.56;
		var v = new Float32Array(3);
		v[0] = x;
		v[1] = y;
		v[2] = z;
		tmp1 = v;
		quake_Render.avelocities.push(tmp1);
	}
	quake_GL.CreateProgram("particle",["uOrigin","uViewOrigin","uViewAngles","uPerspective","uScale","uGamma","uColor"],["aPoint"],[]);
};
quake_Render.EntityParticles = function(ent) {
	var allocated = quake_Render.AllocParticles(162);
	var _g1 = 0;
	var _g = allocated.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = quake_Render.particles[allocated[i]];
		var angle = quake_CL.state.time * quake_Render.avelocities[i][0];
		var sy = Math.sin(angle);
		var cy = Math.cos(angle);
		var angle1 = quake_CL.state.time * quake_Render.avelocities[i][1];
		var sp = Math.sin(angle1);
		var cp = Math.cos(angle1);
		p.die = quake_CL.state.time + 0.01;
		p.color = 111;
		p.type = 4;
		var this1 = p.org;
		this1[0] = ent.origin[0] + quake_Render.avertexnormals[i * 3] * 64 + cp * cy * 16;
		this1[1] = ent.origin[1] + quake_Render.avertexnormals[i * 3 + 1] * 64 + cp * sy * 16;
		this1[2] = ent.origin[2] + quake_Render.avertexnormals[i * 3 + 2] * 64 - sp * 16;
	}
};
quake_Render.ClearParticles = function() {
	var _g = 0;
	var _g1 = quake_Render.particles;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		p.die = -1.0;
	}
};
quake_Render.ReadPointFile_f = function() {
	if(!quake_SV.server.active) return;
	var name = "maps/" + quake_PR.GetString(quake_PR._globals_int[34]) + ".pts";
	var f = quake_COM.LoadTextFile(name);
	if(f == null) {
		quake_Console.Print("couldn't open " + name + "\n");
		return;
	}
	quake_Console.Print("Reading " + name + "...\n");
	var f1 = f.split("\n");
	var c = 0;
	while(c < f1.length) {
		var org = f1[c].split(" ");
		if(org.length != 3) break;
		++c;
		var p = quake_Render.AllocParticles(1);
		if(p.length == 0) {
			quake_Console.Print("Not enough free particles\n");
			break;
		}
		var p1 = quake_Render.particles[p[0]];
		p1.type = 0;
		p1.die = 99999.0;
		p1.color = -c & 15;
		var this1 = p1.org;
		var x = quake_Q.atof(org[0]);
		var y = quake_Q.atof(org[1]);
		var z = quake_Q.atof(org[2]);
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
	}
	quake_Console.Print(c + " points read\n");
};
quake_Render.ParseParticleEffect = function() {
	var tmp;
	var x = quake_MSG.ReadShort() * 0.125;
	var y = quake_MSG.ReadShort() * 0.125;
	var z = quake_MSG.ReadShort() * 0.125;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	var org = tmp;
	var tmp1;
	var x1 = quake_MSG.ReadChar() * 0.0625;
	var y1 = quake_MSG.ReadChar() * 0.0625;
	var z1 = quake_MSG.ReadChar() * 0.0625;
	var v1 = new Float32Array(3);
	v1[0] = x1;
	v1[1] = y1;
	v1[2] = z1;
	tmp1 = v1;
	var dir = tmp1;
	var msgcount = quake_MSG.ReadByte();
	var color = quake_MSG.ReadByte();
	if(msgcount == 255) quake_Render.ParticleExplosion(org); else quake_Render.RunParticleEffect(org,dir,color,msgcount);
};
quake_Render.ParticleExplosion = function(org) {
	var allocated = quake_Render.AllocParticles(1024);
	var _g1 = 0;
	var _g = allocated.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = quake_Render.particles[allocated[i]];
		p.type = (i & 1) != 0?4:5;
		p.die = quake_CL.state.time + 5.0;
		p.color = quake_Render.ramp1[0];
		p.ramp = Math.floor(Math.random() * 4.0);
		var this1 = p.vel;
		var x = Math.random() * 512.0 - 256.0;
		var y = Math.random() * 512.0 - 256.0;
		var z = Math.random() * 512.0 - 256.0;
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
		var this2 = p.org;
		var x1 = org[0] + Math.random() * 32.0 - 16.0;
		var y1 = org[1] + Math.random() * 32.0 - 16.0;
		var z1 = org[2] + Math.random() * 32.0 - 16.0;
		this2[0] = x1;
		this2[1] = y1;
		this2[2] = z1;
	}
};
quake_Render.ParticleExplosion2 = function(org,colorStart,colorLength) {
	var allocated = quake_Render.AllocParticles(512);
	var colorMod = 0;
	var _g = 0;
	while(_g < allocated.length) {
		var idx = allocated[_g];
		++_g;
		var p = quake_Render.particles[idx];
		p.type = 6;
		p.die = quake_CL.state.time + 0.3;
		p.color = colorStart + colorMod++ % colorLength;
		var this1 = p.org;
		var x = org[0] + Math.random() * 32.0 - 16.0;
		var y = org[1] + Math.random() * 32.0 - 16.0;
		var z = org[2] + Math.random() * 32.0 - 16.0;
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
		var this2 = p.vel;
		var x1 = Math.random() * 512.0 - 256.0;
		var y1 = Math.random() * 512.0 - 256.0;
		var z1 = Math.random() * 512.0 - 256.0;
		this2[0] = x1;
		this2[1] = y1;
		this2[2] = z1;
	}
};
quake_Render.BlobExplosion = function(org) {
	var allocated = quake_Render.AllocParticles(1024);
	var _g1 = 0;
	var _g = allocated.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = quake_Render.particles[allocated[i]];
		p.die = quake_CL.state.time + 1.0 + Math.random() * 0.4;
		if((i & 1) != 0) {
			p.type = 6;
			p.color = 66 + Math.floor(Math.random() * 7.0);
		} else {
			p.type = 7;
			p.color = 150 + Math.floor(Math.random() * 7.0);
		}
		var this1 = p.org;
		var x = org[0] + Math.random() * 32.0 - 16.0;
		var y = org[1] + Math.random() * 32.0 - 16.0;
		var z = org[2] + Math.random() * 32.0 - 16.0;
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
		var this2 = p.vel;
		var x1 = Math.random() * 512.0 - 256.0;
		var y1 = Math.random() * 512.0 - 256.0;
		var z1 = Math.random() * 512.0 - 256.0;
		this2[0] = x1;
		this2[1] = y1;
		this2[2] = z1;
	}
};
quake_Render.RunParticleEffect = function(org,dir,color,count) {
	var allocated = quake_Render.AllocParticles(count);
	var _g = 0;
	while(_g < allocated.length) {
		var idx = allocated[_g];
		++_g;
		var p = quake_Render.particles[idx];
		p.type = 2;
		p.die = quake_CL.state.time + 0.6 * Math.random();
		p.color = (color & 248) + Math.floor(Math.random() * 8.0);
		var this1 = p.org;
		var x = org[0] + Math.random() * 16.0 - 8.0;
		var y = org[1] + Math.random() * 16.0 - 8.0;
		var z = org[2] + Math.random() * 16.0 - 8.0;
		this1[0] = x;
		this1[1] = y;
		this1[2] = z;
		var this2 = p.vel;
		this2[0] = dir[0] * 15.0;
		this2[1] = dir[1] * 15.0;
		this2[2] = dir[2] * 15.0;
	}
};
quake_Render.LavaSplash = function(org) {
	var allocated = quake_Render.AllocParticles(1024);
	var dir = new Float32Array(3);
	var k = 0;
	var _g = -16;
	while(_g < 16) {
		var i = _g++;
		var _g1 = -16;
		while(_g1 < 16) {
			var j = _g1++;
			if(k >= allocated.length) return;
			var p = quake_Render.particles[allocated[k++]];
			p.die = quake_CL.state.time + 2.0 + Math.random() * 0.64;
			p.color = 224 + Math.floor(Math.random() * 8.0);
			p.type = 2;
			var v = (j + Math.random()) * 8.0;
			dir[0] = v;
			var v1 = (i + Math.random()) * 8.0;
			dir[1] = v1;
			dir[2] = 256.0;
			var this1 = p.org;
			var z = org[2] + Math.random() * 64.0;
			this1[0] = org[0] + dir[0];
			this1[1] = org[1] + dir[1];
			this1[2] = z;
			quake__$Vec_Vec_$Impl_$.Normalize(dir);
			var vel = 50.0 + Math.random() * 64.0;
			var this2 = p.vel;
			this2[0] = dir[0] * vel;
			this2[1] = dir[1] * vel;
			this2[2] = dir[2] * vel;
		}
	}
};
quake_Render.TeleportSplash = function(org) {
	var allocated = quake_Render.AllocParticles(896);
	var i;
	var j;
	var k;
	var l = 0;
	var dir = new Float32Array(3);
	i = -16;
	while(i < 16) {
		j = -16;
		while(j < 16) {
			k = -24;
			while(k < 32) {
				if(l >= allocated.length) return;
				var p = quake_Render.particles[allocated[l++]];
				p.die = quake_CL.state.time + 0.2 + Math.random() * 0.16;
				p.color = 7 + Math.floor(Math.random() * 8.0);
				p.type = 2;
				dir[0] = j * 8.0;
				dir[1] = i * 8.0;
				dir[2] = k * 8.0;
				var this1 = p.org;
				var x = org[0] + i + Math.random() * 4.0;
				var y = org[1] + j + Math.random() * 4.0;
				var z = org[2] + k + Math.random() * 4.0;
				this1[0] = x;
				this1[1] = y;
				this1[2] = z;
				quake__$Vec_Vec_$Impl_$.Normalize(dir);
				var vel = 50.0 + Math.random() * 64.0;
				var this2 = p.vel;
				this2[0] = dir[0] * vel;
				this2[1] = dir[1] * vel;
				this2[2] = dir[2] * vel;
				k += 4;
			}
			j += 4;
		}
		i += 4;
	}
};
quake_Render.RocketTrail = function(start,end,type) {
	var tmp;
	var v = new Float32Array(3);
	v[0] = end[0] - start[0];
	v[1] = end[1] - start[1];
	v[2] = end[2] - start[2];
	tmp = v;
	var vec = tmp;
	var len = quake__$Vec_Vec_$Impl_$.Normalize(vec);
	if(len == 0.0) return;
	var allocated;
	if(type == 4) allocated = quake_Render.AllocParticles(Math.floor(len / 6.0)); else allocated = quake_Render.AllocParticles(Math.floor(len / 3.0));
	var _g = 0;
	while(_g < allocated.length) {
		var idx = allocated[_g];
		++_g;
		var p = quake_Render.particles[idx];
		p.vel.set(quake__$Vec_Vec_$Impl_$.origin);
		p.die = quake_CL.state.time + 2.0;
		switch(type) {
		case 0:case 1:
			p.ramp = Math.floor(Math.random() * 4.0) + (type << 1);
			p.color = quake_Render.ramp3[p.ramp | 0];
			p.type = 3;
			var this1 = p.org;
			var x = start[0] + Math.random() * 6.0 - 3.0;
			var y = start[1] + Math.random() * 6.0 - 3.0;
			var z = start[2] + Math.random() * 6.0 - 3.0;
			this1[0] = x;
			this1[1] = y;
			this1[2] = z;
			break;
		case 2:
			p.type = 1;
			p.color = 67 + Math.floor(Math.random() * 4.0);
			var this2 = p.org;
			var x1 = start[0] + Math.random() * 6.0 - 3.0;
			var y1 = start[1] + Math.random() * 6.0 - 3.0;
			var z1 = start[2] + Math.random() * 6.0 - 3.0;
			this2[0] = x1;
			this2[1] = y1;
			this2[2] = z1;
			break;
		case 3:case 5:
			p.die = quake_CL.state.time + 0.5;
			p.type = 0;
			if(type == 3) p.color = 52 + ((quake_Render.tracercount++ & 4) << 1); else p.color = 230 + ((quake_Render.tracercount++ & 4) << 1);
			p.org.set(start);
			if((quake_Render.tracercount & 1) != 0) {
				p.vel[0] = 30.0 * vec[1];
				p.vel[2] = -30. * vec[0];
			} else {
				p.vel[0] = -30. * vec[1];
				p.vel[2] = 30.0 * vec[0];
			}
			break;
		case 4:
			p.type = 1;
			p.color = 67 + Math.floor(Math.random() * 4.0);
			var this3 = p.org;
			var x2 = start[0] + Math.random() * 6.0 - 3.0;
			var y2 = start[1] + Math.random() * 6.0 - 3.0;
			var z2 = start[2] + Math.random() * 6.0 - 3.0;
			this3[0] = x2;
			this3[1] = y2;
			this3[2] = z2;
			break;
		case 6:
			p.color = 152 + Math.floor(Math.random() * 4.0);
			p.type = 0;
			p.die = quake_CL.state.time + 0.3;
			var this4 = p.org;
			var x3 = start[0] + Math.random() * 16.0 - 8.0;
			var y3 = start[1] + Math.random() * 16.0 - 8.0;
			var z3 = start[2] + Math.random() * 16.0 - 8.0;
			this4[0] = x3;
			this4[1] = y3;
			this4[2] = z3;
			break;
		}
		start[0] = start[0] + vec[0];
		start[1] = start[1] + vec[1];
		start[2] = start[2] + vec[2];
	}
};
quake_Render.DrawParticles = function() {
	var program = quake_GL.UseProgram("particle");
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.depthMask(false);
	quake_GL.gl.enable(3042);
	var _g = 0;
	var _g1 = quake_Render.particles;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(p.die < quake_CL.state.time) continue;
		var color = quake_VID.d_8to24table[p.color];
		quake_GL.gl.uniform3f(program.uColor,color & 255,color >> 8 & 255,color >> 16);
		quake_GL.gl.uniform3fv(program.uOrigin,p.org);
		var scale = (p.org[0] - quake_Render.refdef.vieworg[0]) * quake_Render.vpn[0] + (p.org[1] - quake_Render.refdef.vieworg[1]) * quake_Render.vpn[1] + (p.org[2] - quake_Render.refdef.vieworg[2]) * quake_Render.vpn[2];
		if(scale < 20.0) quake_GL.gl.uniform1f(program.uScale,1.08); else quake_GL.gl.uniform1f(program.uScale,1 + scale * 0.004);
		scale *= 1.27;
		quake_GL.gl.drawArrays(5,0,4);
	}
	quake_GL.gl.disable(3042);
	quake_GL.gl.depthMask(true);
};
quake_Render.AllocParticles = function(count) {
	var allocated = [];
	var _g1 = 0;
	var _g = quake_Render.particles.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(count == 0) return allocated;
		if(quake_Render.particles[i].die < quake_CL.state.time) {
			allocated.push(i);
			count--;
		}
	}
	return allocated;
};
quake_Render.AddDynamicLights = function(surf) {
	var smax = (surf.extents[0] >> 4) + 1;
	var tmax = (surf.extents[1] >> 4) + 1;
	var size = smax * tmax;
	var tex = quake_CL.state.worldmodel.texinfo[surf.texinfo];
	var impact = new Float32Array(3);
	var blocklights = [];
	var _g = 0;
	while(_g < size) {
		var i1 = _g++;
		blocklights[i1] = 0;
	}
	var _g1 = 0;
	while(_g1 < 32) {
		var i2 = _g1++;
		if((surf.dlightbits >>> i2 & 1) == 0) continue;
		var light = quake_CL.dlights[i2];
		var tmp;
		var v1 = light.origin;
		var v2 = surf.plane.normal;
		tmp = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
		var dist = tmp - surf.plane.dist;
		var rad = light.radius - Math.abs(dist);
		var minlight = light.minlight;
		if(rad < minlight) continue;
		minlight = rad - minlight;
		impact[0] = light.origin[0] - surf.plane.normal[0] * dist;
		impact[1] = light.origin[1] - surf.plane.normal[1] * dist;
		impact[2] = light.origin[2] - surf.plane.normal[2] * dist;
		var tmp1;
		var tmp3;
		var a = tex.vecs[0];
		var v = new Float32Array(3);
		v[0] = a[0];
		v[1] = a[1];
		v[2] = a[2];
		tmp3 = v;
		var v21 = tmp3;
		tmp1 = impact[0] * v21[0] + impact[1] * v21[1] + impact[2] * v21[2];
		var local0 = tmp1 + tex.vecs[0][3] - surf.texturemins[0];
		var tmp2;
		var tmp4;
		var a1 = tex.vecs[1];
		var v3 = new Float32Array(3);
		v3[0] = a1[0];
		v3[1] = a1[1];
		v3[2] = a1[2];
		tmp4 = v3;
		var v22 = tmp4;
		tmp2 = impact[0] * v22[0] + impact[1] * v22[1] + impact[2] * v22[2];
		var local1 = tmp2 + tex.vecs[1][3] - surf.texturemins[1];
		var _g11 = 0;
		while(_g11 < tmax) {
			var t = _g11++;
			var td = local1 - (t << 4);
			if(td < 0.0) td = -td;
			var td1 = Math.floor(td);
			var _g2 = 0;
			while(_g2 < smax) {
				var s = _g2++;
				var sd = local0 - (s << 4);
				if(sd < 0) sd = -sd;
				var sd1 = Math.floor(sd);
				if(sd1 > td1) dist = sd1 + (td1 >> 1); else dist = td1 + (sd1 >> 1);
				if(dist < minlight) blocklights[t * smax + s] += Math.floor((rad - dist) * 256.0);
			}
		}
	}
	var i = 0;
	var _g3 = 0;
	while(_g3 < tmax) {
		var t1 = _g3++;
		var idx = surf.light_t + t1;
		if(idx >= 1024) quake_Sys.Error("Funny lightmap_modified index: " + idx + " < 1024");
		quake_Render.lightmap_modified[idx] = 1;
		var dest = (idx << 10) + surf.light_s;
		var _g12 = 0;
		while(_g12 < smax) {
			var s1 = _g12++;
			var bl = blocklights[i++] >> 7;
			if(bl > 255) bl = 255;
			quake_Render.dlightmaps[dest + s1] = bl;
		}
	}
};
quake_Render.RemoveDynamicLights = function(surf) {
	var smax = (surf.extents[0] >> 4) + 1;
	var tmax = (surf.extents[1] >> 4) + 1;
	var _g = 0;
	while(_g < tmax) {
		var t = _g++;
		var idx = surf.light_t + t;
		if(idx >= 1024) quake_Sys.Error("Funny lightmap_modified index: " + idx + " < 1024");
		quake_Render.lightmap_modified[idx] = 1;
		var dest = (idx << 10) + surf.light_s;
		var _g1 = 0;
		while(_g1 < smax) {
			var s = _g1++;
			quake_Render.dlightmaps[dest + s] = 0;
		}
	}
};
quake_Render.BuildLightMap = function(surf) {
	var smax = (surf.extents[0] >> 4) + 1;
	var tmax = (surf.extents[1] >> 4) + 1;
	var lightmap = surf.lightofs;
	var maps = 0;
	while(maps < surf.styles.length) {
		var dest = (surf.light_t << 12) + (surf.light_s << 2) + maps;
		var _g = 0;
		while(_g < tmax) {
			_g++;
			var _g1 = 0;
			while(_g1 < smax) {
				var j = _g1++;
				quake_Render.lightmaps[dest + (j << 2)] = quake_Render.currentmodel.lightdata[lightmap + j];
			}
			lightmap += smax;
			dest += 4096;
		}
		maps++;
	}
	while(maps <= 3) {
		var dest1 = (surf.light_t << 12) + (surf.light_s << 2) + maps;
		var _g2 = 0;
		while(_g2 < tmax) {
			_g2++;
			var _g11 = 0;
			while(_g11 < smax) {
				var j1 = _g11++;
				quake_Render.lightmaps[dest1 + (j1 << 2)] = 0;
			}
			dest1 += 4096;
		}
		maps++;
	}
};
quake_Render.TextureAnimation = function(base) {
	var frame = 0;
	if(base.anim_base != null) {
		frame = base.anim_frame;
		base = quake_Render.currententity.model.textures[base.anim_base];
	}
	var anims = base.anims;
	if(anims == null) return base;
	if(quake_Render.currententity.frame != 0 && base.alternate_anims.length != 0) anims = base.alternate_anims;
	return quake_Render.currententity.model.textures[anims[(Math.floor(quake_CL.state.time * 5.0) + frame) % anims.length]];
};
quake_Render.DrawBrushModel = function(e) {
	var clmodel = e.model;
	if(clmodel.submodel) {
		var tmp;
		var v = new Float32Array(3);
		v[0] = e.origin[0] + clmodel.mins[0];
		v[1] = e.origin[1] + clmodel.mins[1];
		v[2] = e.origin[2] + clmodel.mins[2];
		tmp = v;
		var tmp1;
		var v1 = new Float32Array(3);
		v1[0] = e.origin[0] + clmodel.maxs[0];
		v1[1] = e.origin[1] + clmodel.maxs[1];
		v1[2] = e.origin[2] + clmodel.maxs[2];
		tmp1 = v1;
		if(quake_Render.CullBox(tmp,tmp1)) return;
	} else {
		var tmp2;
		var v2 = new Float32Array(3);
		v2[0] = e.origin[0] - clmodel.radius;
		v2[1] = e.origin[1] - clmodel.radius;
		v2[2] = e.origin[2] - clmodel.radius;
		tmp2 = v2;
		var tmp3;
		var v3 = new Float32Array(3);
		v3[0] = e.origin[0] + clmodel.radius;
		v3[1] = e.origin[1] + clmodel.radius;
		v3[2] = e.origin[2] + clmodel.radius;
		tmp3 = v3;
		if(quake_Render.CullBox(tmp2,tmp3)) return;
	}
	quake_GL.gl.bindBuffer(34962,clmodel.cmds);
	var viewMatrix = quake_GL.RotationMatrix(e.angles[0],e.angles[1],e.angles[2]);
	var program = quake_GL.UseProgram("brush");
	quake_GL.gl.uniform3fv(program.uOrigin,e.origin);
	quake_GL.gl.uniformMatrix3fv(program.uAngles,false,viewMatrix);
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,44,0);
	quake_GL.gl.vertexAttribPointer(program.aTexCoord,4,5126,false,44,12);
	quake_GL.gl.vertexAttribPointer(program.aLightStyle,4,5126,false,44,28);
	if(quake_Render.fullbright.value != 0 || clmodel.lightdata == null) quake_GL.Bind(program.tLightmap,quake_Render.fullbright_texture); else quake_GL.Bind(program.tLightmap,quake_Render.lightmap_texture);
	quake_GL.Bind(program.tDlight,quake_Render.flashblend.value == 0 && clmodel.submodel?quake_Render.dlightmap_texture:quake_Render.null_texture);
	quake_GL.Bind(program.tLightStyle,quake_Render.lightstyle_texture);
	var _g1 = 0;
	var _g = clmodel.chains.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chain = clmodel.chains[i];
		var texture = quake_Render.TextureAnimation(clmodel.textures[chain[0]]);
		if(texture.turbulent) continue;
		quake_Render.c_brush_verts += chain[2];
		quake_GL.Bind(program.tTexture,texture.texturenum);
		quake_GL.gl.drawArrays(4,chain[1],chain[2]);
	}
	program = quake_GL.UseProgram("turbulent");
	quake_GL.gl.uniform3f(program.uOrigin,0.0,0.0,0.0);
	quake_GL.gl.uniformMatrix3fv(program.uAngles,false,viewMatrix);
	quake_GL.gl.uniform1f(program.uTime,quake_Host.realtime % (Math.PI * 2.0));
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,20,e.model.waterchain);
	quake_GL.gl.vertexAttribPointer(program.aTexCoord,2,5126,false,20,e.model.waterchain + 12);
	var _g11 = 0;
	var _g2 = clmodel.chains.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var chain1 = clmodel.chains[i1];
		var texture1 = clmodel.textures[chain1[0]];
		if(!texture1.turbulent) continue;
		quake_Render.c_brush_verts += chain1[2];
		quake_GL.Bind(program.tTexture,texture1.texturenum);
		quake_GL.gl.drawArrays(4,chain1[1],chain1[2]);
	}
};
quake_Render.RecursiveWorldNode = function(node) {
	if(node.contents == -2) return;
	if(node.contents < 0) {
		if(node.markvisframe != quake_Render.visframecount) return;
		node.visframe = quake_Render.visframecount;
		if(node.skychain != node.waterchain) quake_Render.drawsky = true;
		return;
	}
	quake_Render.RecursiveWorldNode(node.child0);
	quake_Render.RecursiveWorldNode(node.child1);
};
quake_Render.DrawWorld = function() {
	var clmodel = quake_CL.state.worldmodel;
	quake_Render.currententity = quake_CL.entities[0];
	quake_GL.gl.bindBuffer(34962,clmodel.cmds);
	var program = quake_GL.UseProgram("brush");
	quake_GL.gl.uniform3f(program.uOrigin,0.0,0.0,0.0);
	quake_GL.gl.uniformMatrix3fv(program.uAngles,false,quake_GL.identity);
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,44,0);
	quake_GL.gl.vertexAttribPointer(program.aTexCoord,4,5126,false,44,12);
	quake_GL.gl.vertexAttribPointer(program.aLightStyle,4,5126,false,44,28);
	if(quake_Render.fullbright.value != 0 || clmodel.lightdata == null) quake_GL.Bind(program.tLightmap,quake_Render.fullbright_texture); else quake_GL.Bind(program.tLightmap,quake_Render.lightmap_texture);
	if(quake_Render.flashblend.value == 0) quake_GL.Bind(program.tDlight,quake_Render.dlightmap_texture); else quake_GL.Bind(program.tDlight,quake_Render.null_texture);
	quake_GL.Bind(program.tLightStyle,quake_Render.lightstyle_texture);
	var _g = 0;
	var _g1 = clmodel.leafs;
	while(_g < _g1.length) {
		var leaf = _g1[_g];
		++_g;
		if(leaf.visframe != quake_Render.visframecount || leaf.skychain == 0) continue;
		if(quake_Render.CullBox(leaf.mins,leaf.maxs)) continue;
		var _g3 = 0;
		var _g2 = leaf.skychain;
		while(_g3 < _g2) {
			var j = _g3++;
			var cmds = leaf.cmds[j];
			quake_Render.c_brush_verts += cmds[2];
			quake_GL.Bind(program.tTexture,quake_Render.TextureAnimation(clmodel.textures[cmds[0]]).texturenum);
			quake_GL.gl.drawArrays(4,cmds[1],cmds[2]);
		}
	}
	program = quake_GL.UseProgram("turbulent");
	quake_GL.gl.uniform3f(program.uOrigin,0.0,0.0,0.0);
	quake_GL.gl.uniformMatrix3fv(program.uAngles,false,quake_GL.identity);
	quake_GL.gl.uniform1f(program.uTime,quake_Host.realtime % (Math.PI * 2.0));
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,20,clmodel.waterchain);
	quake_GL.gl.vertexAttribPointer(program.aTexCoord,2,5126,false,20,clmodel.waterchain + 12);
	var _g4 = 0;
	var _g11 = clmodel.leafs;
	while(_g4 < _g11.length) {
		var leaf1 = _g11[_g4];
		++_g4;
		if(leaf1.visframe != quake_Render.visframecount || leaf1.waterchain == leaf1.cmds.length) continue;
		if(quake_Render.CullBox(leaf1.mins,leaf1.maxs)) continue;
		var _g31 = leaf1.waterchain;
		var _g21 = leaf1.cmds.length;
		while(_g31 < _g21) {
			var j1 = _g31++;
			var cmds1 = leaf1.cmds[j1];
			quake_Render.c_brush_verts += cmds1[2];
			quake_GL.Bind(program.tTexture,clmodel.textures[cmds1[0]].texturenum);
			quake_GL.gl.drawArrays(4,cmds1[1],cmds1[2]);
		}
	}
};
quake_Render.MarkLeaves = function() {
	if(quake_Render.oldviewleaf == quake_Render.viewleaf && quake_Render.novis.value == 0) return;
	++quake_Render.visframecount;
	quake_Render.oldviewleaf = quake_Render.viewleaf;
	var vis = quake_Render.novis.value != 0?quake_Mod_$Brush.novis:quake_Mod_$Brush.LeafPVS(quake_Render.viewleaf,quake_CL.state.worldmodel);
	var _g1 = 0;
	var _g = quake_CL.state.worldmodel.leafs.length;
	while(_g1 < _g) {
		var i = _g1++;
		if((vis[i >> 3] & 1 << (i & 7)) == 0) continue;
		var node = quake_CL.state.worldmodel.leafs[i + 1];
		while(node != null) {
			if(node.markvisframe == quake_Render.visframecount) break;
			node.markvisframe = quake_Render.visframecount;
			node = node.parent;
		}
	}
	while(true) {
		if(quake_Render.novis.value != 0) break;
		var leaf;
		if(quake_Render.viewleaf.contents <= -3) {
			var tmp;
			var v = new Float32Array(3);
			v[0] = quake_Render.refdef.vieworg[0];
			v[1] = quake_Render.refdef.vieworg[1];
			v[2] = quake_Render.refdef.vieworg[2] + 16.0;
			tmp = v;
			leaf = quake_Mod_$Brush.PointInLeaf(tmp,quake_CL.state.worldmodel);
			if(leaf.contents <= -3) break;
		} else {
			var tmp1;
			var v1 = new Float32Array(3);
			v1[0] = quake_Render.refdef.vieworg[0];
			v1[1] = quake_Render.refdef.vieworg[1];
			v1[2] = quake_Render.refdef.vieworg[2] - 16.0;
			tmp1 = v1;
			leaf = quake_Mod_$Brush.PointInLeaf(tmp1,quake_CL.state.worldmodel);
			if(leaf.contents > -3) break;
		}
		if(leaf == quake_Render.viewleaf) break;
		vis = quake_Mod_$Brush.LeafPVS(leaf,quake_CL.state.worldmodel);
		var _g11 = 0;
		var _g2 = quake_CL.state.worldmodel.leafs.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if((vis[i1 >> 3] & 1 << (i1 & 7)) == 0) continue;
			var node1 = quake_CL.state.worldmodel.leafs[i1 + 1];
			while(node1 != null) {
				if(node1.markvisframe == quake_Render.visframecount) break;
				node1.markvisframe = quake_Render.visframecount;
				node1 = node1.parent;
			}
		}
		break;
	}
	quake_Render.drawsky = false;
	quake_Render.RecursiveWorldNode(quake_CL.state.worldmodel.nodes[0]);
};
quake_Render.AllocBlock = function(surf) {
	var w = (surf.extents[0] >> 4) + 1;
	var h = (surf.extents[1] >> 4) + 1;
	var x = null;
	var y = null;
	var best = 1024;
	var _g1 = 0;
	var _g = 1024 - w;
	while(_g1 < _g) {
		var i = _g1++;
		var best2 = 0;
		var j = 0;
		while(j < w) {
			if(quake_Render.allocated[i + j] >= best) break;
			if(quake_Render.allocated[i + j] > best2) best2 = quake_Render.allocated[i + j];
			j++;
		}
		if(j == w) {
			x = i;
			y = best = best2;
		}
	}
	best += h;
	if(best > 1024) quake_Sys.Error("AllocBlock: full");
	var _g2 = 0;
	while(_g2 < w) {
		var i1 = _g2++;
		quake_Render.allocated[x + i1] = best;
	}
	surf.light_s = x;
	surf.light_t = y;
};
quake_Render.BuildSurfaceDisplayList = function(fa) {
	fa.verts = [];
	if(fa.numedges <= 2) return;
	var texinfo = quake_Render.currentmodel.texinfo[fa.texinfo];
	var texture = quake_Render.currentmodel.textures[texinfo.texture];
	var _g1 = 0;
	var _g = fa.numedges;
	while(_g1 < _g) {
		var i = _g1++;
		var index = quake_Render.currentmodel.surfedges[fa.firstedge + i];
		var vec;
		if(index > 0) vec = quake_Render.currentmodel.vertexes[quake_Render.currentmodel.edges[index][0]]; else vec = quake_Render.currentmodel.vertexes[quake_Render.currentmodel.edges[-index][1]];
		var vert = [vec[0],vec[1],vec[2]];
		if(!fa.sky) {
			var tmp;
			var tmp2;
			var a = texinfo.vecs[0];
			var v = new Float32Array(3);
			v[0] = a[0];
			v[1] = a[1];
			v[2] = a[2];
			tmp2 = v;
			var v2 = tmp2;
			tmp = vec[0] * v2[0] + vec[1] * v2[1] + vec[2] * v2[2];
			var s = tmp + texinfo.vecs[0][3];
			var tmp1;
			var tmp3;
			var a1 = texinfo.vecs[1];
			var v1 = new Float32Array(3);
			v1[0] = a1[0];
			v1[1] = a1[1];
			v1[2] = a1[2];
			tmp3 = v1;
			var v21 = tmp3;
			tmp1 = vec[0] * v21[0] + vec[1] * v21[1] + vec[2] * v21[2];
			var t = tmp1 + texinfo.vecs[1][3];
			vert[3] = s / texture.width;
			vert[4] = t / texture.height;
			if(!fa.turbulent) {
				vert[5] = (s - fa.texturemins[0] + (fa.light_s << 4) + 8.0) / 16384.0;
				vert[6] = (t - fa.texturemins[1] + (fa.light_t << 4) + 8.0) / 16384.0;
			}
		}
		if(i >= 3) {
			fa.verts.push(fa.verts[0]);
			fa.verts.push(fa.verts[fa.verts.length - 2]);
		}
		fa.verts.push(vert);
	}
};
quake_Render.BuildLightmaps = function() {
	quake_Render.allocated = [];
	var _g = 0;
	while(_g < 1024) {
		var i = _g++;
		quake_Render.allocated[i] = 0;
	}
	var _g1 = 1;
	var _g2 = quake_CL.state.model_precache.length;
	while(_g1 < _g2) {
		var i1 = _g1++;
		quake_Render.currentmodel = quake_CL.state.model_precache[i1];
		if(quake_Render.currentmodel.type != 0) continue;
		if(HxOverrides.cca(quake_Render.currentmodel.name,0) != 42) {
			var _g3 = 0;
			var _g21 = quake_Render.currentmodel.faces.length;
			while(_g3 < _g21) {
				var j = _g3++;
				var surf = quake_Render.currentmodel.faces[j];
				if(!surf.sky && !surf.turbulent) {
					quake_Render.AllocBlock(surf);
					if(quake_Render.currentmodel.lightdata != null) quake_Render.BuildLightMap(surf);
				}
				quake_Render.BuildSurfaceDisplayList(surf);
			}
		}
		if(i1 == 1) quake_Render.MakeWorldModelDisplayLists(quake_Render.currentmodel); else quake_Render.MakeBrushModelDisplayLists(quake_Render.currentmodel);
	}
	quake_GL.Bind(0,quake_Render.lightmap_texture);
	quake_GL.gl.texImage2D(3553,0,6408,1024,1024,0,6408,5121,quake_Render.lightmaps);
};
quake_Render.WarpScreen = function() {
	quake_GL.gl.finish();
	quake_GL.gl.bindFramebuffer(36160,null);
	quake_GL.gl.bindRenderbuffer(36161,null);
	var program = quake_GL.UseProgram("warp");
	var vrect = quake_Render.refdef.vrect;
	quake_GL.gl.uniform4f(program.uRect,vrect.x,vrect.y,vrect.width,vrect.height);
	quake_GL.gl.uniform1f(program.uTime,quake_Host.realtime % (Math.PI * 2.0));
	quake_GL.Bind(program.tTexture,quake_Render.warptexture);
	quake_GL.gl.clear(16384);
	quake_GL.gl.bindBuffer(34962,quake_GL.rect);
	quake_GL.gl.vertexAttribPointer(program.aPoint,2,5126,false,0,0);
	quake_GL.gl.drawArrays(5,0,4);
};
quake_Render.MakeSky = function() {
	var sin = [0.0,0.19509,0.382683,0.55557,0.707107,0.831470,0.92388,0.980785,1.0];
	var vecs = [];
	var i = 0;
	while(i < 7) {
		vecs = vecs.concat([0.0,0.0,1.0,sin[i + 2] * 0.19509,sin[6 - i] * 0.19509,0.980785,sin[i] * 0.19509,sin[8 - i] * 0.19509,0.980785]);
		var _g = 0;
		while(_g < 7) {
			var j = _g++;
			vecs = vecs.concat([sin[i] * sin[8 - j],sin[8 - i] * sin[8 - j],sin[j],sin[i] * sin[7 - j],sin[8 - i] * sin[7 - j],sin[j + 1],sin[i + 2] * sin[7 - j],sin[6 - i] * sin[7 - j],sin[j + 1],sin[i] * sin[8 - j],sin[8 - i] * sin[8 - j],sin[j],sin[i + 2] * sin[7 - j],sin[6 - i] * sin[7 - j],sin[j + 1],sin[i + 2] * sin[8 - j],sin[6 - i] * sin[8 - j],sin[j]]);
		}
		i += 2;
	}
	quake_GL.CreateProgram("sky",["uViewAngles","uPerspective","uScale","uGamma","uTime"],["aPoint"],["tSolid","tAlpha"]);
	quake_GL.CreateProgram("skyChain",["uViewOrigin","uViewAngles","uPerspective"],["aPoint"],[]);
	quake_Render.skyvecs = quake_GL.gl.createBuffer();
	quake_GL.gl.bindBuffer(34962,quake_Render.skyvecs);
	quake_GL.gl.bufferData(34962,new Float32Array(vecs),35044);
};
quake_Render.DrawSkyBox = function() {
	if(!quake_Render.drawsky) return;
	quake_GL.gl.colorMask(false,false,false,false);
	var clmodel = quake_CL.state.worldmodel;
	var program = quake_GL.UseProgram("skyChain");
	quake_GL.gl.bindBuffer(34962,clmodel.cmds);
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,12,clmodel.skychain);
	var _g1 = 0;
	var _g = clmodel.leafs.length;
	while(_g1 < _g) {
		var i = _g1++;
		var leaf = clmodel.leafs[i];
		if(leaf.visframe != quake_Render.visframecount || leaf.skychain == leaf.waterchain) continue;
		if(quake_Render.CullBox(leaf.mins,leaf.maxs)) continue;
		var _g3 = leaf.skychain;
		var _g2 = leaf.waterchain;
		while(_g3 < _g2) {
			var j = _g3++;
			var cmds = leaf.cmds[j];
			quake_GL.gl.drawArrays(4,cmds[0],cmds[1]);
		}
	}
	quake_GL.gl.colorMask(true,true,true,true);
	quake_GL.gl.depthFunc(516);
	quake_GL.gl.depthMask(false);
	quake_GL.gl.disable(2884);
	program = quake_GL.UseProgram("sky");
	quake_GL.gl.uniform2f(program.uTime,quake_Host.realtime * 0.125 % 1.0,quake_Host.realtime * 0.03125 % 1.0);
	quake_GL.Bind(program.tSolid,quake_Render.solidskytexture);
	quake_GL.Bind(program.tAlpha,quake_Render.alphaskytexture);
	quake_GL.gl.bindBuffer(34962,quake_Render.skyvecs);
	quake_GL.gl.vertexAttribPointer(program.aPoint,3,5126,false,12,0);
	quake_GL.gl.uniform3f(program.uScale,2.0,-2.0,1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,2.0,-2.0,-1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,2.0,2.0,1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,2.0,2.0,-1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,-2.0,-2.0,1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,-2.0,-2.0,-1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,-2.0,2.0,1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.uniform3f(program.uScale,-2.0,2.0,-1.0);
	quake_GL.gl.drawArrays(4,0,180);
	quake_GL.gl.enable(2884);
	quake_GL.gl.depthMask(true);
	quake_GL.gl.depthFunc(513);
};
quake_Render.InitSky = function(src) {
	var trans = new ArrayBuffer(65536);
	var trans32 = new Uint32Array(trans);
	var _g = 0;
	while(_g < 128) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < 128) {
			var j = _g1++;
			trans32[(i << 7) + j] = quake_COM.LittleLong(quake_VID.d_8to24table[src[(i << 8) + j + 128]] + -16777216);
		}
	}
	quake_GL.Bind(0,quake_Render.solidskytexture);
	quake_GL.gl.texImage2D(3553,0,6408,128,128,0,6408,5121,new Uint8Array(trans));
	quake_GL.gl.generateMipmap(3553);
	var _g2 = 0;
	while(_g2 < 128) {
		var i1 = _g2++;
		var _g11 = 0;
		while(_g11 < 128) {
			var j1 = _g11++;
			var p = (i1 << 8) + j1;
			if(src[p] != 0) trans32[(i1 << 7) + j1] = quake_COM.LittleLong(quake_VID.d_8to24table[src[p]] + -16777216); else trans32[(i1 << 7) + j1] = 0;
		}
	}
	quake_GL.Bind(0,quake_Render.alphaskytexture);
	quake_GL.gl.texImage2D(3553,0,6408,128,128,0,6408,5121,new Uint8Array(trans));
	quake_GL.gl.generateMipmap(3553);
};
var quake_PF = function() { };
quake_PF.__name__ = true;
quake_PF.VarString = function(first) {
	var out = "";
	var _g1 = first;
	var _g = quake_PF.argc;
	while(_g1 < _g) {
		var i = _g1++;
		out += quake_PR.GetString(quake_PR._globals_int[4 + i * 3]);
	}
	return out;
};
quake_PF.error = function() {
	quake_Console.Print("====SERVER ERROR in " + quake_PR.GetString(quake_PR.xfunction.name) + "\n" + quake_PF.VarString(0) + "\n");
	quake_ED.Print(quake_SV.server.edicts[quake_PR._globals_int[28]]);
	quake_Host.Error("Program error");
};
quake_PF.objerror = function() {
	quake_Console.Print("====OBJECT ERROR in " + quake_PR.GetString(quake_PR.xfunction.name) + "\n" + quake_PF.VarString(0) + "\n");
	quake_ED.Print(quake_SV.server.edicts[quake_PR._globals_int[28]]);
	quake_Host.Error("Program error");
};
quake_PF.makevectors = function() {
	var forward = new Float32Array(3);
	var right = new Float32Array(3);
	var up = new Float32Array(3);
	var tmp;
	var ofs = 4;
	var v = new Float32Array(3);
	v[0] = quake_PR._globals_float[ofs];
	v[1] = quake_PR._globals_float[ofs + 1];
	v[2] = quake_PR._globals_float[ofs + 2];
	tmp = v;
	quake__$Vec_Vec_$Impl_$.AngleVectors(tmp,forward,right,up);
	quake_PR._globals_float[59] = forward[0];
	quake_PR._globals_float[60] = forward[1];
	quake_PR._globals_float[61] = forward[2];
	quake_PR._globals_float[65] = right[0];
	quake_PR._globals_float[66] = right[1];
	quake_PR._globals_float[67] = right[2];
	quake_PR._globals_float[62] = up[0];
	quake_PR._globals_float[63] = up[1];
	quake_PR._globals_float[64] = up[2];
};
quake_PF.setorigin = function() {
	var e = quake_SV.server.edicts[quake_PR._globals_int[4]];
	e._v_float[10] = quake_PR._globals_float[7];
	e._v_float[11] = quake_PR._globals_float[7 + 1];
	e._v_float[12] = quake_PR._globals_float[7 + 2];
	quake_SV.LinkEdict(e,false);
};
quake_PF.SetMinMaxSize = function(e,min,max) {
	if(min[0] > max[0] || min[1] > max[1] || min[2] > max[2]) quake_PR.RunError("backwards mins/maxs");
	e._v_float.set(min,33);
	e._v_float.set(max,36);
	e._v_float[39] = max[0] - min[0];
	e._v_float[40] = max[1] - min[1];
	e._v_float[41] = max[2] - min[2];
	quake_SV.LinkEdict(e,false);
};
quake_PF.setsize = function() {
	var tmp;
	var ofs = 7;
	var v = new Float32Array(3);
	v[0] = quake_PR._globals_float[ofs];
	v[1] = quake_PR._globals_float[ofs + 1];
	v[2] = quake_PR._globals_float[ofs + 2];
	tmp = v;
	var tmp1;
	var ofs1 = 10;
	var v1 = new Float32Array(3);
	v1[0] = quake_PR._globals_float[ofs1];
	v1[1] = quake_PR._globals_float[ofs1 + 1];
	v1[2] = quake_PR._globals_float[ofs1 + 2];
	tmp1 = v1;
	quake_PF.SetMinMaxSize(quake_SV.server.edicts[quake_PR._globals_int[4]],tmp,tmp1);
};
quake_PF.setmodel = function() {
	var e = quake_SV.server.edicts[quake_PR._globals_int[4]];
	var m = quake_PR.GetString(quake_PR._globals_int[7]);
	var i = 0;
	while(i < quake_SV.server.model_precache.length) {
		if(quake_SV.server.model_precache[i] == m) break;
		i++;
	}
	if(i == quake_SV.server.model_precache.length) quake_PR.RunError("no precache: " + m + "\n");
	e._v_int[29] = quake_PR._globals_int[7];
	e._v_float[0] = i;
	var mod = quake_SV.server.models[i];
	if(mod != null) quake_PF.SetMinMaxSize(e,mod.mins,mod.maxs); else quake_PF.SetMinMaxSize(e,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin);
};
quake_PF.bprint = function() {
	quake_Host.BroadcastPrint(quake_PF.VarString(0));
};
quake_PF.sprint = function() {
	var entnum = quake_PR._globals_int[4];
	if(entnum <= 0 || entnum > quake_SV.svs.maxclients) {
		quake_Console.Print("tried to sprint to a non-client\n");
		return;
	}
	var client = quake_SV.svs.clients[entnum - 1];
	client.message.WriteByte(8);
	client.message.WriteString(quake_PF.VarString(1));
};
quake_PF.centerprint = function() {
	var entnum = quake_PR._globals_int[4];
	if(entnum <= 0 || entnum > quake_SV.svs.maxclients) {
		quake_Console.Print("tried to sprint to a non-client\n");
		return;
	}
	var client = quake_SV.svs.clients[entnum - 1];
	client.message.WriteByte(26);
	client.message.WriteString(quake_PF.VarString(1));
};
quake_PF.normalize = function() {
	var tmp;
	var ofs = 4;
	var v = new Float32Array(3);
	v[0] = quake_PR._globals_float[ofs];
	v[1] = quake_PR._globals_float[ofs + 1];
	v[2] = quake_PR._globals_float[ofs + 2];
	tmp = v;
	var newvalue = tmp;
	quake__$Vec_Vec_$Impl_$.Normalize(newvalue);
	quake_PR._globals_float[1] = newvalue[0];
	quake_PR._globals_float[1 + 1] = newvalue[1];
	quake_PR._globals_float[1 + 2] = newvalue[2];
};
quake_PF.vlen = function() {
	var f = Math.sqrt(quake_PR._globals_float[4] * quake_PR._globals_float[4] + quake_PR._globals_float[4 + 1] * quake_PR._globals_float[4 + 1] + quake_PR._globals_float[4 + 2] * quake_PR._globals_float[4 + 2]);
	quake_PR._globals_float[1] = f;
};
quake_PF.vectoyaw = function() {
	var value1 = quake_PR._globals_float[4];
	var value2 = quake_PR._globals_float[5];
	if(value1 == 0.0 && value2 == 0.0) {
		quake_PR._globals_float[1] = 0.0;
		return;
	}
	var tmp;
	var x = Math.atan2(value2,value1) * 180.0 / Math.PI;
	tmp = x | 0;
	var yaw = tmp;
	if(yaw < 0) yaw += 360;
	quake_PR._globals_float[1] = yaw;
};
quake_PF.vectoangles = function() {
	quake_PR._globals_float[1 + 2] = 0.0;
	var value1_0 = quake_PR._globals_float[4];
	var value1_1 = quake_PR._globals_float[5];
	var value1_2 = quake_PR._globals_float[6];
	if(value1_0 == 0.0 && value1_1 == 0.0) {
		if(value1_2 > 0.0) quake_PR._globals_float[1] = 90.0; else quake_PR._globals_float[1] = 270.0;
		quake_PR._globals_float[1 + 1] = 0.0;
		return;
	}
	var tmp;
	var x = Math.atan2(value1_1,value1_0) * 180.0 / Math.PI;
	tmp = x | 0;
	var yaw = tmp;
	if(yaw < 0) yaw += 360;
	var tmp1;
	var x1 = Math.atan2(value1_2,Math.sqrt(value1_0 * value1_0 + value1_1 * value1_1)) * 180.0 / Math.PI;
	tmp1 = x1 | 0;
	var pitch = tmp1;
	if(pitch < 0) pitch += 360;
	quake_PR._globals_float[1] = pitch;
	quake_PR._globals_float[1 + 1] = yaw;
};
quake_PF.random = function() {
	var f = Math.random();
	quake_PR._globals_float[1] = f;
};
quake_PF.particle = function() {
	var tmp;
	var ofs = 4;
	var v = new Float32Array(3);
	v[0] = quake_PR._globals_float[ofs];
	v[1] = quake_PR._globals_float[ofs + 1];
	v[2] = quake_PR._globals_float[ofs + 2];
	tmp = v;
	var tmp1;
	var ofs1 = 7;
	var v1 = new Float32Array(3);
	v1[0] = quake_PR._globals_float[ofs1];
	v1[1] = quake_PR._globals_float[ofs1 + 1];
	v1[2] = quake_PR._globals_float[ofs1 + 2];
	tmp1 = v1;
	quake_SV.StartParticle(tmp,tmp1,quake_PR._globals_float[10] | 0,quake_PR._globals_float[13] | 0);
};
quake_PF.ambientsound = function() {
	var samp = quake_PR.GetString(quake_PR._globals_int[7]);
	var i = 0;
	while(i < quake_SV.server.sound_precache.length) {
		if(quake_SV.server.sound_precache[i] == samp) break;
		i++;
	}
	if(i == quake_SV.server.sound_precache.length) {
		quake_Console.Print("no precache: " + samp + "\n");
		return;
	}
	var signon = quake_SV.server.signon;
	signon.WriteByte(29);
	signon.WriteShort(quake_PR._globals_float[4] * 8 | 0);
	signon.WriteShort(quake_PR._globals_float[5] * 8 | 0);
	signon.WriteShort(quake_PR._globals_float[6] * 8 | 0);
	signon.WriteByte(i);
	signon.WriteByte(quake_PR._globals_float[10] * 255 | 0);
	signon.WriteByte(quake_PR._globals_float[13] * 64 | 0);
};
quake_PF.sound = function() {
	quake_SV.StartSound(quake_SV.server.edicts[quake_PR._globals_int[4]],quake_PR._globals_float[7] | 0,quake_PR.GetString(quake_PR._globals_int[10]),quake_PR._globals_float[13] * 255 | 0,quake_PR._globals_float[16]);
};
quake_PF.breakstatement = function() {
	quake_Console.Print("break statement\n");
};
quake_PF.traceline = function() {
	var tmp;
	var v = new Float32Array(3);
	v[0] = quake_PR._globals_float[4];
	v[1] = quake_PR._globals_float[5];
	v[2] = quake_PR._globals_float[6];
	tmp = v;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = quake_PR._globals_float[7];
	v1[1] = quake_PR._globals_float[8];
	v1[2] = quake_PR._globals_float[9];
	tmp1 = v1;
	var trace = quake_SV.Move(tmp,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,tmp1,quake_PR._globals_float[10] | 0,quake_SV.server.edicts[quake_PR._globals_int[13]]);
	quake_PR._globals_float[68] = trace.allsolid?1.0:0.0;
	quake_PR._globals_float[69] = trace.startsolid?1.0:0.0;
	quake_PR._globals_float[70] = trace.fraction;
	quake_PR._globals_float[80] = trace.inwater?1.0:0.0;
	quake_PR._globals_float[79] = trace.inopen?1.0:0.0;
	quake_PR._globals_float[71] = trace.endpos[0];
	quake_PR._globals_float[72] = trace.endpos[1];
	quake_PR._globals_float[73] = trace.endpos[2];
	var plane = trace.plane;
	quake_PR._globals_float[74] = plane.normal[0];
	quake_PR._globals_float[75] = plane.normal[1];
	quake_PR._globals_float[76] = plane.normal[2];
	quake_PR._globals_float[77] = plane.dist;
	quake_PR._globals_int[78] = trace.ent != null?trace.ent.num:0;
};
quake_PF.newcheckclient = function(check) {
	if(check <= 0) check = 1; else if(check > quake_SV.svs.maxclients) check = quake_SV.svs.maxclients;
	var i = 1;
	if(check != quake_SV.svs.maxclients) i += check;
	var ent = null;
	while(true) {
		if(i == quake_SV.svs.maxclients + 1) i = 1;
		ent = quake_SV.server.edicts[i];
		if(i == check) break;
		if(ent.free) {
			i++;
			continue;
		}
		if(ent._v_float[48] <= 0.0 || ((ent._v_float[76] | 0) & 128) != 0) {
			i++;
			continue;
		}
		break;
	}
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[10] + ent._v_float[62];
	v[1] = ent._v_float[11] + ent._v_float[63];
	v[2] = ent._v_float[12] + ent._v_float[64];
	tmp = v;
	quake_PF.checkpvs = quake_Mod_$Brush.LeafPVS(quake_Mod_$Brush.PointInLeaf(tmp,quake_SV.server.worldmodel),quake_SV.server.worldmodel);
	return i;
};
quake_PF.checkclient = function() {
	if(quake_SV.server.time - quake_SV.server.lastchecktime >= 0.1) {
		quake_SV.server.lastcheck = quake_PF.newcheckclient(quake_SV.server.lastcheck);
		quake_SV.server.lastchecktime = quake_SV.server.time;
	}
	var ent = quake_SV.server.edicts[quake_SV.server.lastcheck];
	if(ent.free || ent._v_float[48] <= 0.0) {
		quake_PR._globals_int[1] = 0;
		return;
	}
	var self = quake_SV.server.edicts[quake_PR._globals_int[28]];
	var tmp;
	var v = new Float32Array(3);
	v[0] = self._v_float[10] + self._v_float[62];
	v[1] = self._v_float[11] + self._v_float[63];
	v[2] = self._v_float[12] + self._v_float[64];
	tmp = v;
	var l = quake_Mod_$Brush.PointInLeaf(tmp,quake_SV.server.worldmodel).num - 1;
	if(l < 0 || (quake_PF.checkpvs[l >> 3] & 1 << (l & 7)) == 0) {
		quake_PR._globals_int[1] = 0;
		return;
	}
	quake_PR._globals_int[1] = ent.num;
};
quake_PF.stuffcmd = function() {
	var entnum = quake_PR._globals_int[4];
	if(entnum <= 0 || entnum > quake_SV.svs.maxclients) quake_PR.RunError("Parm 0 not a client");
	var client = quake_SV.svs.clients[entnum - 1];
	client.message.WriteByte(9);
	client.message.WriteString(quake_PR.GetString(quake_PR._globals_int[7]));
};
quake_PF.localcmd = function() {
	quake_Cmd.text += quake_PR.GetString(quake_PR._globals_int[4]);
};
quake_PF.cvar = function() {
	var tmp;
	var name = quake_PR.GetString(quake_PR._globals_int[4]);
	var tmp1;
	var _this = quake_Cvar.vars;
	if(__map_reserved[name] != null) tmp1 = _this.getReserved(name); else tmp1 = _this.h[name];
	tmp = tmp1;
	var v = tmp;
	quake_PR._globals_float[1] = v != null?v.value:0.0;
};
quake_PF.cvar_set = function() {
	quake_Cvar.Set(quake_PR.GetString(quake_PR._globals_int[4]),quake_PR.GetString(quake_PR._globals_int[7]));
};
quake_PF.findradius = function() {
	var chain = 0;
	var org_0 = quake_PR._globals_float[4];
	var org_1 = quake_PR._globals_float[5];
	var org_2 = quake_PR._globals_float[6];
	var eorg = [];
	var rad = quake_PR._globals_float[7];
	var _g1 = 1;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		var ent = quake_SV.server.edicts[i];
		if(ent.free) continue;
		if(ent._v_float[9] == 0) continue;
		eorg[0] = org_0 - (ent._v_float[10] + (ent._v_float[33] + ent._v_float[36]) * 0.5);
		eorg[1] = org_1 - (ent._v_float[11] + (ent._v_float[34] + ent._v_float[37]) * 0.5);
		eorg[2] = org_2 - (ent._v_float[12] + (ent._v_float[35] + ent._v_float[38]) * 0.5);
		if(Math.sqrt(eorg[0] * eorg[0] + eorg[1] * eorg[1] + eorg[2] * eorg[2]) > rad) continue;
		ent._v_int[60] = chain;
		chain = i;
	}
	quake_PR._globals_int[1] = chain;
};
quake_PF.dprint = function() {
	quake_Console.DPrint(quake_PF.VarString(0));
};
quake_PF.ftos = function() {
	var v = quake_PR._globals_float[4];
	if(v == Math.floor(v)) quake_PR.TempString(v == null?"null":"" + v); else quake_PR.TempString(v.toFixed(1));
	quake_PR._globals_int[1] = quake_PR.string_temp;
};
quake_PF.fabs = function() {
	var f = Math.abs(quake_PR._globals_float[4]);
	quake_PR._globals_float[1] = f;
};
quake_PF.vtos = function() {
	quake_PR.TempString(quake_PR._globals_float[4].toFixed(1) + " " + quake_PR._globals_float[5].toFixed(1) + " " + quake_PR._globals_float[6].toFixed(1));
	quake_PR._globals_int[1] = quake_PR.string_temp;
};
quake_PF.Spawn = function() {
	var i = quake_ED.Alloc().num;
	quake_PR._globals_int[1] = i;
};
quake_PF.Remove = function() {
	quake_ED.Free(quake_SV.server.edicts[quake_PR._globals_int[4]]);
};
quake_PF.Find = function() {
	var e = quake_PR._globals_int[4];
	var f = quake_PR._globals_int[7];
	var s = quake_PR.GetString(quake_PR._globals_int[10]);
	var _g1 = e + 1;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var e1 = _g1++;
		var ed = quake_SV.server.edicts[e1];
		if(ed.free) continue;
		if(quake_PR.GetString(ed._v_int[f]) == s) {
			quake_PR._globals_int[1] = ed.num;
			return;
		}
	}
	quake_PR._globals_int[1] = 0;
};
quake_PF.MoveToGoal = function() {
	var ent = quake_SV.server.edicts[quake_PR._globals_int[28]];
	if(((ent._v_float[76] | 0) & 512 + 1 + 2) == 0) {
		quake_PR._globals_float[1] = 0.0;
		return;
	}
	var goal = quake_SV.server.edicts[ent._v_int[88]];
	var dist = quake_PR._globals_float[4];
	if(ent._v_int[75] != 0 && quake_SV.CloseEnough(ent,goal,dist)) return;
	if(Math.random() >= 0.75 || !quake_SV.StepDirection(ent,ent._v_float[85],dist)) quake_SV.NewChaseDir(ent,goal,dist);
};
quake_PF.precache_file = function() {
	quake_PR._globals_int[1] = quake_PR._globals_int[4];
};
quake_PF.precache_sound = function() {
	var s = quake_PR.GetString(quake_PR._globals_int[4]);
	quake_PR._globals_int[1] = quake_PR._globals_int[4];
	quake_PR.CheckEmptyString(s);
	var i = 0;
	while(i < quake_SV.server.sound_precache.length) {
		if(quake_SV.server.sound_precache[i] == s) return;
		i++;
	}
	quake_SV.server.sound_precache[i] = s;
};
quake_PF.precache_model = function() {
	if(!quake_SV.server.loading) quake_PR.RunError("Precache_*: Precache can only be done in spawn functions");
	var s = quake_PR.GetString(quake_PR._globals_int[4]);
	quake_PR._globals_int[1] = quake_PR._globals_int[4];
	quake_PR.CheckEmptyString(s);
	var i = 0;
	while(i < quake_SV.server.model_precache.length) {
		if(quake_SV.server.model_precache[i] == s) return;
		i++;
	}
	quake_SV.server.model_precache[i] = s;
	quake_SV.server.models[i] = quake_Mod.LoadModel(quake_Mod.FindName(s),true);
};
quake_PF.coredump = function() {
	quake_ED.PrintEdicts();
};
quake_PF.traceon = function() {
	quake_PR.trace = true;
};
quake_PF.traceoff = function() {
	quake_PR.trace = false;
};
quake_PF.eprint = function() {
	quake_ED.Print(quake_SV.server.edicts[quake_PR._globals_float[4] | 0]);
};
quake_PF.walkmove = function() {
	var ent = quake_SV.server.edicts[quake_PR._globals_int[28]];
	if(((ent._v_float[76] | 0) & 512 + 1 + 2) == 0) {
		quake_PR._globals_float[1] = 0.0;
		return;
	}
	var yaw = quake_PR._globals_float[4] * Math.PI / 180.0;
	var dist = quake_PR._globals_float[7];
	var oldf = quake_PR.xfunction;
	var tmp;
	var tmp1;
	var x = Math.cos(yaw) * dist;
	var y = Math.sin(yaw) * dist;
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = 0;
	tmp1 = v;
	var b = quake_SV.movestep(ent,tmp1,true);
	if(b) tmp = 1; else tmp = 0;
	quake_PR._globals_float[1] = tmp;
	quake_PR.xfunction = oldf;
	quake_PR._globals_int[28] = ent.num;
};
quake_PF.droptofloor = function() {
	var ent = quake_SV.server.edicts[quake_PR._globals_int[28]];
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[10];
	v[1] = ent._v_float[11];
	v[2] = ent._v_float[12] - 256.0;
	tmp = v;
	var trace = quake_SV.Move(new Float32Array(ent._v_float.buffer.slice(40,52)),new Float32Array(ent._v_float.buffer.slice(132,144)),new Float32Array(ent._v_float.buffer.slice(144,156)),tmp,0,ent);
	if(trace.fraction == 1.0 || trace.allsolid) {
		quake_PR._globals_float[1] = 0.0;
		return;
	}
	ent._v_float.set(trace.endpos,10);
	quake_SV.LinkEdict(ent,false);
	var v1 = ent._v_float[76] | 0 | 512;
	ent._v_float[76] = v1;
	ent._v_int[47] = trace.ent.num;
	quake_PR._globals_float[1] = 1.0;
};
quake_PF.lightstyle = function() {
	var style = quake_PR._globals_float[4] | 0;
	var val = quake_PR.GetString(quake_PR._globals_int[7]);
	quake_SV.server.lightstyles[style] = val;
	if(quake_SV.server.loading) return;
	var _g1 = 0;
	var _g = quake_SV.svs.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		var client = quake_SV.svs.clients[i];
		if(!client.active && !client.spawned) continue;
		client.message.WriteByte(12);
		client.message.WriteByte(style);
		client.message.WriteString(val);
	}
};
quake_PF.rint = function() {
	var f = quake_PR._globals_float[4];
	quake_PR._globals_float[1] = (f >= 0.0?f + 0.5:f - 0.5) | 0;
};
quake_PF.floor = function() {
	quake_PR._globals_float[1] = Math.floor(quake_PR._globals_float[4]);
};
quake_PF.ceil = function() {
	quake_PR._globals_float[1] = Math.ceil(quake_PR._globals_float[4]);
};
quake_PF.checkbottom = function() {
	var tmp;
	var b = quake_SV.CheckBottom(quake_SV.server.edicts[quake_PR._globals_int[4]]);
	if(b) tmp = 1; else tmp = 0;
	quake_PR._globals_float[1] = tmp;
};
quake_PF.pointcontents = function() {
	var tmp;
	var v = new Float32Array(3);
	v[0] = quake_PR._globals_float[4];
	v[1] = quake_PR._globals_float[5];
	v[2] = quake_PR._globals_float[6];
	tmp = v;
	quake_PR._globals_float[1] = quake_SV.PointContents(tmp);
};
quake_PF.nextent = function() {
	var _g1 = quake_PR._globals_int[4] + 1;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		if(!quake_SV.server.edicts[i].free) {
			quake_PR._globals_int[1] = i;
			return;
		}
	}
	quake_PR._globals_int[1] = 0;
};
quake_PF.aim = function() {
	var ent = quake_SV.server.edicts[quake_PR._globals_int[4]];
	var tmp;
	var v = new Float32Array(3);
	v[0] = ent._v_float[10];
	v[1] = ent._v_float[11];
	v[2] = ent._v_float[12] + 20.0;
	tmp = v;
	var start = tmp;
	var tmp1;
	var v1 = new Float32Array(3);
	v1[0] = quake_PR._globals_float[59];
	v1[1] = quake_PR._globals_float[60];
	v1[2] = quake_PR._globals_float[61];
	tmp1 = v1;
	var dir = tmp1;
	var tmp2;
	var v2 = new Float32Array(3);
	v2[0] = start[0] + 2048.0 * dir[0];
	v2[1] = start[1] + 2048.0 * dir[1];
	v2[2] = start[2] + 2048.0 * dir[2];
	tmp2 = v2;
	var end = tmp2;
	var tr = quake_SV.Move(start,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,end,0,ent);
	if(tr.ent != null) {
		var tmp3;
		if(tr.ent._v_float[59] == 2) {
			var tmp4;
			if(!(quake_Host.teamplay.value == 0)) tmp4 = ent._v_float[78] <= 0; else tmp4 = true;
			if(!tmp4) tmp3 = ent._v_float[78] != tr.ent._v_float[78]; else tmp3 = true;
		} else tmp3 = false;
		if(tmp3) {
			quake_PR._globals_float[1] = dir[0];
			quake_PR._globals_float[1 + 1] = dir[1];
			quake_PR._globals_float[1 + 2] = dir[2];
			return;
		}
	}
	var bestdir = new Float32Array(dir);
	var bestdist = quake_SV.aim.value;
	var bestent = null;
	var end1 = new Float32Array(3);
	var _g1 = 1;
	var _g = quake_SV.server.num_edicts;
	while(_g1 < _g) {
		var i = _g1++;
		var check = quake_SV.server.edicts[i];
		if(check._v_float[59] != 2) continue;
		if(check == ent) continue;
		if(quake_Host.teamplay.value != 0 && ent._v_float[78] > 0 && ent._v_float[78] == check._v_float[78]) continue;
		end1[0] = check._v_float[10] + 0.5 * (check._v_float[33] + check._v_float[36]);
		end1[1] = check._v_float[11] + 0.5 * (check._v_float[34] + check._v_float[37]);
		end1[2] = check._v_float[12] + 0.5 * (check._v_float[35] + check._v_float[38]);
		dir[0] = end1[0] - start[0];
		dir[1] = end1[1] - start[1];
		dir[2] = end1[2] - start[2];
		quake__$Vec_Vec_$Impl_$.Normalize(dir);
		var dist = dir[0] * bestdir[0] + dir[1] * bestdir[1] + dir[2] * bestdir[2];
		if(dist < bestdist) continue;
		tr = quake_SV.Move(start,quake__$Vec_Vec_$Impl_$.origin,quake__$Vec_Vec_$Impl_$.origin,end1,0,ent);
		if(tr.ent == check) {
			bestdist = dist;
			bestent = check;
		}
	}
	if(bestent != null) {
		dir[0] = bestent._v_float[10] - ent._v_float[10];
		dir[1] = bestent._v_float[11] - ent._v_float[11];
		dir[2] = bestent._v_float[12] - ent._v_float[12];
		var dist1 = dir[0] * bestdir[0] + dir[1] * bestdir[1] + dir[2] * bestdir[2];
		end1[0] = bestdir[0] * dist1;
		end1[1] = bestdir[1] * dist1;
		end1[2] = dir[2];
		quake__$Vec_Vec_$Impl_$.Normalize(end1);
		quake_PR._globals_float[1] = end1[0];
		quake_PR._globals_float[1 + 1] = end1[1];
		quake_PR._globals_float[1 + 2] = end1[2];
		return;
	}
	quake_PR._globals_float[1] = bestdir[0];
	quake_PR._globals_float[1 + 1] = bestdir[1];
	quake_PR._globals_float[1 + 2] = bestdir[2];
};
quake_PF.changeyaw = function() {
	var ent = quake_SV.server.edicts[quake_PR._globals_int[28]];
	var current = quake__$Vec_Vec_$Impl_$.Anglemod(ent._v_float[20]);
	var ideal = ent._v_float[85];
	if(current == ideal) return;
	var move = ideal - current;
	if(ideal > current) {
		if(move >= 180.0) move -= 360.0;
	} else if(move <= -180.0) move += 360.0;
	var speed = ent._v_float[86];
	if(move > 0.0) {
		if(move > speed) move = speed;
	} else if(move < -speed) move = -speed;
	var value = quake__$Vec_Vec_$Impl_$.Anglemod(current + move);
	ent._v_float[20] = value;
};
quake_PF.WriteDest = function() {
	var _g = quake_PR._globals_float[4] | 0;
	switch(_g) {
	case 0:
		return quake_SV.server.datagram;
	case 1:
		var entnum = quake_PR._globals_int[81];
		if(entnum <= 0 || entnum > quake_SV.svs.maxclients) quake_PR.RunError("WriteDest: not a client");
		return quake_SV.svs.clients[entnum - 1].message;
	case 2:
		return quake_SV.server.reliable_datagram;
	case 3:
		return quake_SV.server.signon;
	default:
		quake_PR.RunError("WriteDest: bad destination");
		return null;
	}
};
quake_PF.WriteByte = function() {
	quake_PF.WriteDest().WriteByte(quake_PR._globals_float[7] | 0);
};
quake_PF.WriteChar = function() {
	quake_PF.WriteDest().WriteChar(quake_PR._globals_float[7] | 0);
};
quake_PF.WriteShort = function() {
	quake_PF.WriteDest().WriteShort(quake_PR._globals_float[7] | 0);
};
quake_PF.WriteLong = function() {
	quake_PF.WriteDest().WriteLong(quake_PR._globals_float[7] | 0);
};
quake_PF.WriteAngle = function() {
	var _this = quake_PF.WriteDest();
	_this.WriteByte((quake_PR._globals_float[7] * 256 / 360 | 0) & 255);
};
quake_PF.WriteCoord = function() {
	var _this = quake_PF.WriteDest();
	_this.WriteShort(quake_PR._globals_float[7] * 8 | 0);
};
quake_PF.WriteString = function() {
	quake_PF.WriteDest().WriteString(quake_PR.GetString(quake_PR._globals_int[7]));
};
quake_PF.WriteEntity = function() {
	quake_PF.WriteDest().WriteShort(quake_PR._globals_int[7]);
};
quake_PF.makestatic = function() {
	var ent = quake_SV.server.edicts[quake_PR._globals_int[4]];
	var message = quake_SV.server.signon;
	message.WriteByte(20);
	message.WriteByte(quake_SV.ModelIndex(quake_PR.GetString(ent._v_int[29])));
	message.WriteByte(ent._v_float[30] | 0);
	message.WriteByte(ent._v_float[77] | 0);
	message.WriteByte(ent._v_float[31] | 0);
	message.WriteShort(ent._v_float[10] * 8 | 0);
	message.WriteByte((ent._v_float[19] * 256 / 360 | 0) & 255);
	message.WriteShort(ent._v_float[11] * 8 | 0);
	message.WriteByte((ent._v_float[20] * 256 / 360 | 0) & 255);
	message.WriteShort(ent._v_float[12] * 8 | 0);
	message.WriteByte((ent._v_float[21] * 256 / 360 | 0) & 255);
	quake_ED.Free(ent);
};
quake_PF.setspawnparms = function() {
	var i = quake_PR._globals_int[4];
	if(i <= 0 || i > quake_SV.svs.maxclients) quake_PR.RunError("Entity is not a client");
	var spawn_parms = quake_SV.svs.clients[i - 1].spawn_parms;
	var _g = 0;
	while(_g < 16) {
		var i1 = _g++;
		quake_PR._globals_float[43 + i1] = spawn_parms[i1];
	}
};
quake_PF.changelevel = function() {
	if(quake_SV.svs.changelevel_issued) return;
	quake_SV.svs.changelevel_issued = true;
	quake_Cmd.text += "changelevel " + quake_PR.GetString(quake_PR._globals_int[4]) + "\n";
};
quake_PF.Fixme = function() {
	quake_PR.RunError("unimplemented builtin");
};
var quake_PRDef = function(view,ofs) {
	this.type = view.getUint16(ofs,true);
	this.ofs = view.getUint16(ofs + 2,true);
	this.name = view.getUint32(ofs + 4,true);
};
quake_PRDef.__name__ = true;
var quake__$PR_PRFunction = function(view,ofs) {
	this.first_statement = view.getInt32(ofs,true);
	this.parm_start = view.getUint32(ofs + 4,true);
	this.locals = view.getUint32(ofs + 8,true);
	this.profile = view.getUint32(ofs + 12,true);
	this.name = view.getUint32(ofs + 16,true);
	this.file = view.getUint32(ofs + 20,true);
	this.numparms = view.getUint32(ofs + 24,true);
	this.parm_size = [view.getUint8(ofs + 28),view.getUint8(ofs + 29),view.getUint8(ofs + 30),view.getUint8(ofs + 31),view.getUint8(ofs + 32),view.getUint8(ofs + 33),view.getUint8(ofs + 34),view.getUint8(ofs + 35)];
};
quake__$PR_PRFunction.__name__ = true;
var quake__$PR_PRStatement = function(view,ofs) {
	this.op = view.getUint16(ofs,true);
	this.a = view.getInt16(ofs + 2,true);
	this.b = view.getInt16(ofs + 4,true);
	this.c = view.getInt16(ofs + 6,true);
};
quake__$PR_PRStatement.__name__ = true;
var quake__$Render_Rect = function() {
};
quake__$Render_Rect.__name__ = true;
var quake__$Render_Particle = function() {
	this.color = 0;
	this.vel = new Float32Array(3);
	this.org = new Float32Array(3);
	this.die = -1;
	this.ramp = 0;
	this.type = 0;
};
quake__$Render_Particle.__name__ = true;
var quake_Sfx = function(n) {
	this.name = n;
};
quake_Sfx.__name__ = true;
var quake__$SV_AreaNode = function() {
};
quake__$SV_AreaNode.__name__ = true;
var quake_Sbar = function() { };
quake_Sbar.__name__ = true;
quake_Sbar.Init = function() {
	quake_Sbar.nums = [[],[]];
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		quake_Sbar.nums[0][i] = new quake_DrawPic(quake_W.GetLumpName("NUM_" + i));
		quake_Sbar.nums[1][i] = new quake_DrawPic(quake_W.GetLumpName("ANUM_" + i));
	}
	quake_Sbar.nums[0][10] = new quake_DrawPic(quake_W.GetLumpName("NUM_MINUS"));
	quake_Sbar.nums[1][10] = new quake_DrawPic(quake_W.GetLumpName("ANUM_MINUS"));
	quake_Sbar.colon = new quake_DrawPic(quake_W.GetLumpName("NUM_COLON"));
	quake_Sbar.slash = new quake_DrawPic(quake_W.GetLumpName("NUM_SLASH"));
	quake_Sbar.weapons = [[new quake_DrawPic(quake_W.GetLumpName("INV_SHOTGUN")),new quake_DrawPic(quake_W.GetLumpName("INV_SSHOTGUN")),new quake_DrawPic(quake_W.GetLumpName("INV_NAILGUN")),new quake_DrawPic(quake_W.GetLumpName("INV_SNAILGUN")),new quake_DrawPic(quake_W.GetLumpName("INV_RLAUNCH")),new quake_DrawPic(quake_W.GetLumpName("INV_SRLAUNCH")),new quake_DrawPic(quake_W.GetLumpName("INV_LIGHTNG"))],[new quake_DrawPic(quake_W.GetLumpName("INV2_SHOTGUN")),new quake_DrawPic(quake_W.GetLumpName("INV2_SSHOTGUN")),new quake_DrawPic(quake_W.GetLumpName("INV2_NAILGUN")),new quake_DrawPic(quake_W.GetLumpName("INV2_SNAILGUN")),new quake_DrawPic(quake_W.GetLumpName("INV2_RLAUNCH")),new quake_DrawPic(quake_W.GetLumpName("INV2_SRLAUNCH")),new quake_DrawPic(quake_W.GetLumpName("INV2_LIGHTNG"))]];
	var _g1 = 0;
	while(_g1 < 5) {
		var i1 = _g1++;
		quake_Sbar.weapons.push([new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_SHOTGUN")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_SSHOTGUN")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_NAILGUN")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_SNAILGUN")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_RLAUNCH")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_SRLAUNCH")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i1 + 1) + "_LIGHTNG"))]);
	}
	quake_Sbar.ammo = [new quake_DrawPic(quake_W.GetLumpName("SB_SHELLS")),new quake_DrawPic(quake_W.GetLumpName("SB_NAILS")),new quake_DrawPic(quake_W.GetLumpName("SB_ROCKET")),new quake_DrawPic(quake_W.GetLumpName("SB_CELLS"))];
	quake_Sbar.armor = [new quake_DrawPic(quake_W.GetLumpName("SB_ARMOR1")),new quake_DrawPic(quake_W.GetLumpName("SB_ARMOR2")),new quake_DrawPic(quake_W.GetLumpName("SB_ARMOR3"))];
	quake_Sbar.items = [new quake_DrawPic(quake_W.GetLumpName("SB_KEY1")),new quake_DrawPic(quake_W.GetLumpName("SB_KEY2")),new quake_DrawPic(quake_W.GetLumpName("SB_INVIS")),new quake_DrawPic(quake_W.GetLumpName("SB_INVULN")),new quake_DrawPic(quake_W.GetLumpName("SB_SUIT")),new quake_DrawPic(quake_W.GetLumpName("SB_QUAD"))];
	quake_Sbar.sigil = [new quake_DrawPic(quake_W.GetLumpName("SB_SIGIL1")),new quake_DrawPic(quake_W.GetLumpName("SB_SIGIL2")),new quake_DrawPic(quake_W.GetLumpName("SB_SIGIL3")),new quake_DrawPic(quake_W.GetLumpName("SB_SIGIL4"))];
	quake_Sbar.faces = [];
	var _g2 = 0;
	while(_g2 < 5) {
		var i2 = _g2++;
		quake_Sbar.faces.push([new quake_DrawPic(quake_W.GetLumpName("FACE" + (5 - i2))),new quake_DrawPic(quake_W.GetLumpName("FACE_P" + (5 - i2)))]);
	}
	quake_Sbar.face_invis = new quake_DrawPic(quake_W.GetLumpName("FACE_INVIS"));
	quake_Sbar.face_invuln = new quake_DrawPic(quake_W.GetLumpName("FACE_INVUL2"));
	quake_Sbar.face_invis_invuln = new quake_DrawPic(quake_W.GetLumpName("FACE_INV2"));
	quake_Sbar.face_quad = new quake_DrawPic(quake_W.GetLumpName("FACE_QUAD"));
	quake_Cmd.AddCommand("+showscores",quake_Sbar.ShowScores);
	quake_Cmd.AddCommand("-showscores",quake_Sbar.DontShowScores);
	quake_Sbar.sbar = new quake_DrawPic(quake_W.GetLumpName("SBAR"));
	quake_Sbar.ibar = new quake_DrawPic(quake_W.GetLumpName("IBAR"));
	quake_Sbar.scorebar = new quake_DrawPic(quake_W.GetLumpName("SCOREBAR"));
	quake_Sbar.ranking = quake_Draw.CachePic("ranking");
	quake_Sbar.complete = quake_Draw.CachePic("complete");
	quake_Sbar.inter = quake_Draw.CachePic("inter");
	quake_Sbar.finale = quake_Draw.CachePic("finale");
	quake_Sbar.disc = new quake_DrawPic(quake_W.GetLumpName("DISC"));
	if(quake_COM.hipnotic) {
		quake_Sbar.h_weapons = [[new quake_DrawPic(quake_W.GetLumpName("INV_LASER")),new quake_DrawPic(quake_W.GetLumpName("INV_MJOLNIR")),new quake_DrawPic(quake_W.GetLumpName("INV_GREN_PROX")),new quake_DrawPic(quake_W.GetLumpName("INV_PROX_GREN")),new quake_DrawPic(quake_W.GetLumpName("INV_PROX"))],[new quake_DrawPic(quake_W.GetLumpName("INV2_LASER")),new quake_DrawPic(quake_W.GetLumpName("INV2_MJOLNIR")),new quake_DrawPic(quake_W.GetLumpName("INV2_GREN_PROX")),new quake_DrawPic(quake_W.GetLumpName("INV2_PROX_GREN")),new quake_DrawPic(quake_W.GetLumpName("INV2_PROX"))]];
		var _g3 = 0;
		while(_g3 < 5) {
			var i3 = _g3++;
			quake_Sbar.h_weapons.push([new quake_DrawPic(quake_W.GetLumpName("INVA" + (i3 + 1) + "_LASER")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i3 + 1) + "_MJOLNIR")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i3 + 1) + "_GREN_PROX")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i3 + 1) + "_PROX_GREN")),new quake_DrawPic(quake_W.GetLumpName("INVA" + (i3 + 1) + "_PROX"))]);
		}
		quake_Sbar.hipweapons = [quake_Def.hit.laser_cannon_bit,quake_Def.hit.mjolnir_bit,4,quake_Def.hit.proximity_gun_bit];
		quake_Sbar.h_items = [new quake_DrawPic(quake_W.GetLumpName("SB_WSUIT")),new quake_DrawPic(quake_W.GetLumpName("SB_ESHLD"))];
	}
	if(quake_COM.rogue) {
		quake_Sbar.r_invbar = [new quake_DrawPic(quake_W.GetLumpName("R_INVBAR1")),new quake_DrawPic(quake_W.GetLumpName("R_INVBAR2"))];
		quake_Sbar.r_weapons = [new quake_DrawPic(quake_W.GetLumpName("R_LAVA")),new quake_DrawPic(quake_W.GetLumpName("R_SUPERLAVA")),new quake_DrawPic(quake_W.GetLumpName("R_GREN")),new quake_DrawPic(quake_W.GetLumpName("R_MULTIROCK")),new quake_DrawPic(quake_W.GetLumpName("R_PLASMA"))];
		quake_Sbar.r_items = [new quake_DrawPic(quake_W.GetLumpName("R_SHIELD1")),new quake_DrawPic(quake_W.GetLumpName("R_AGRAV1"))];
		quake_Sbar.r_teambord = new quake_DrawPic(quake_W.GetLumpName("R_TEAMBORD"));
		quake_Sbar.r_ammo = [new quake_DrawPic(quake_W.GetLumpName("R_AMMOLAVA")),new quake_DrawPic(quake_W.GetLumpName("R_AMMOMULTI")),new quake_DrawPic(quake_W.GetLumpName("R_AMMOPLASMA"))];
	}
};
quake_Sbar.ShowScores = function() {
	quake_Sbar.showscores = true;
};
quake_Sbar.DontShowScores = function() {
	quake_Sbar.showscores = false;
};
quake_Sbar.DrawPic = function(x,y,pic) {
	if(quake_CL.state.gametype == 1) quake_Draw.Pic(x,y + quake_VID.height - 24,pic); else quake_Draw.Pic(x + (quake_VID.width >> 1) - 160,y + quake_VID.height - 24,pic);
};
quake_Sbar.DrawCharacter = function(x,y,num) {
	if(quake_CL.state.gametype == 1) quake_Draw.Character(x + 4,y + quake_VID.height - 24,num); else quake_Draw.Character(x + (quake_VID.width >> 1) - 156,y + quake_VID.height - 24,num);
};
quake_Sbar.DrawString = function(x,y,str) {
	if(quake_CL.state.gametype == 1) quake_Draw.String(x,y + quake_VID.height - 24,str); else quake_Draw.String(x + (quake_VID.width >> 1) - 160,y + quake_VID.height - 24,str);
};
quake_Sbar.DrawNum = function(x,y,num,digits,color) {
	var str = num == null?"null":"" + num;
	if(str.length > digits) str = str.substring(str.length - digits,str.length); else if(str.length < digits) x += (digits - str.length) * 24;
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var frame = HxOverrides.cca(str,i);
		quake_Sbar.DrawPic(x,y,quake_Sbar.nums[color][frame == 45?10:frame - 48]);
		x += 24;
	}
};
quake_Sbar.SortFrags = function() {
	quake_Sbar.scoreboardlines = 0;
	var _g1 = 0;
	var _g = quake_CL.state.maxclients;
	while(_g1 < _g) {
		var i = _g1++;
		if(quake_CL.state.scores[i].name.length != 0) quake_Sbar.fragsort[quake_Sbar.scoreboardlines++] = i;
	}
	var _g11 = 0;
	var _g2 = quake_Sbar.scoreboardlines;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var _g3 = 0;
		var _g21 = quake_Sbar.scoreboardlines - 1 - i1;
		while(_g3 < _g21) {
			var j = _g3++;
			if(quake_CL.state.scores[quake_Sbar.fragsort[j]].frags < quake_CL.state.scores[quake_Sbar.fragsort[j + 1]].frags) {
				var k = quake_Sbar.fragsort[j];
				quake_Sbar.fragsort[j] = quake_Sbar.fragsort[j + 1];
				quake_Sbar.fragsort[j + 1] = k;
			}
		}
	}
};
quake_Sbar.SoloScoreboard = function() {
	var str;
	quake_Sbar.DrawString(8,4,"Monsters:    /");
	str = Std.string(quake_CL.state.stats[14]);
	quake_Sbar.DrawString(104 - (str.length << 3),4,str);
	str = Std.string(quake_CL.state.stats[12]);
	quake_Sbar.DrawString(144 - (str.length << 3),4,str);
	quake_Sbar.DrawString(8,12,"Secrets :    /");
	str = Std.string(quake_CL.state.stats[13]);
	quake_Sbar.DrawString(104 - (str.length << 3),12,str);
	str = Std.string(quake_CL.state.stats[11]);
	quake_Sbar.DrawString(144 - (str.length << 3),12,str);
	var minutes = Math.floor(quake_CL.state.time / 60.0);
	var seconds = Math.floor(quake_CL.state.time - 60 * minutes);
	var tens = Math.floor(seconds / 10.0);
	str = Std.string(seconds - 10 * tens);
	quake_Sbar.DrawString(184,4,"Time :   :" + tens + str);
	str = minutes == null?"null":"" + minutes;
	quake_Sbar.DrawString(256 - (str.length << 3),4,str);
	quake_Sbar.DrawString(232 - (quake_CL.state.levelname.length << 2),12,quake_CL.state.levelname);
};
quake_Sbar.DrawInventory = function() {
	if(quake_COM.rogue) quake_Sbar.DrawPic(0,-24,quake_Sbar.r_invbar[quake_CL.state.stats[10] >= quake_Def.rit.lava_nailgun?0:1]); else quake_Sbar.DrawPic(0,-24,quake_Sbar.ibar);
	var flashon;
	var _g = 0;
	while(_g < 7) {
		var i = _g++;
		if((quake_CL.state.items & quake_Def.it.shotgun << i) == 0) continue;
		flashon = Math.floor((quake_CL.state.time - quake_CL.state.item_gettime[i]) * 10.0);
		if(flashon >= 10) flashon = quake_CL.state.stats[10] == quake_Def.it.shotgun << i?1:0; else flashon = flashon % 5 + 2;
		quake_Sbar.DrawPic(i * 24,-16,quake_Sbar.weapons[flashon][i]);
	}
	if(quake_COM.hipnotic) {
		var grenadeflashing = false;
		var _g1 = 0;
		while(_g1 < 4) {
			var i1 = _g1++;
			if((quake_CL.state.items & 1 << quake_Sbar.hipweapons[i1]) != 0) {
				flashon = Math.floor((quake_CL.state.time - quake_CL.state.item_gettime[i1]) * 10.0);
				if(flashon >= 10) flashon = quake_CL.state.stats[10] == 1 << quake_Sbar.hipweapons[i1]?1:0; else flashon = flashon % 5 + 2;
				if(i1 == 2) {
					if((quake_CL.state.items & quake_Def.hit.proximity_gun) != 0 && flashon != 0) {
						grenadeflashing = true;
						quake_Sbar.DrawPic(96,-16,quake_Sbar.h_weapons[flashon][2]);
					}
				} else if(i1 == 3) {
					if((quake_CL.state.items & quake_Def.it.grenade_launcher) != 0) {
						if(!grenadeflashing) quake_Sbar.DrawPic(96,-16,quake_Sbar.h_weapons[flashon][3]);
					} else quake_Sbar.DrawPic(96,-16,quake_Sbar.h_weapons[flashon][4]);
				} else quake_Sbar.DrawPic(176 + i1 * 24,-16,quake_Sbar.h_weapons[flashon][i1]);
			}
		}
	} else if(quake_COM.rogue) {
		if(quake_CL.state.stats[10] >= quake_Def.rit.lava_nailgun) {
			var _g2 = 0;
			while(_g2 < 5) {
				var i2 = _g2++;
				if(quake_CL.state.stats[10] == quake_Def.rit.lava_nailgun << i2) quake_Sbar.DrawPic((i2 + 2) * 24,-16,quake_Sbar.r_weapons[i2]);
			}
		}
	}
	var _g3 = 0;
	while(_g3 < 4) {
		var i3 = _g3++;
		var num = Std.string(quake_CL.state.stats[6 + i3]);
		var _g11 = num.length;
		switch(_g11) {
		case 1:
			quake_Sbar.DrawCharacter((6 * i3 + 3 << 3) - 2,-24,HxOverrides.cca(num,0) - 30);
			continue;
			break;
		case 2:
			quake_Sbar.DrawCharacter((6 * i3 + 2 << 3) - 2,-24,HxOverrides.cca(num,0) - 30);
			quake_Sbar.DrawCharacter((6 * i3 + 3 << 3) - 2,-24,HxOverrides.cca(num,1) - 30);
			continue;
			break;
		case 3:
			quake_Sbar.DrawCharacter((6 * i3 + 1 << 3) - 2,-24,HxOverrides.cca(num,0) - 30);
			quake_Sbar.DrawCharacter((6 * i3 + 2 << 3) - 2,-24,HxOverrides.cca(num,1) - 30);
			quake_Sbar.DrawCharacter((6 * i3 + 3 << 3) - 2,-24,HxOverrides.cca(num,2) - 30);
			break;
		}
	}
	if(quake_COM.hipnotic) {
		var _g4 = 2;
		while(_g4 < 6) {
			var i4 = _g4++;
			if((quake_CL.state.items & 1 << 17 + i4) != 0) quake_Sbar.DrawPic(192 + (i4 << 4),-16,quake_Sbar.items[i4]);
		}
		if((quake_CL.state.items & 16777216) != 0) quake_Sbar.DrawPic(288,-16,quake_Sbar.h_items[0]);
		if((quake_CL.state.items & 33554432) != 0) quake_Sbar.DrawPic(304,-16,quake_Sbar.h_items[1]);
	} else {
		var _g5 = 0;
		while(_g5 < 6) {
			var i5 = _g5++;
			if((quake_CL.state.items & 1 << 17 + i5) != 0) quake_Sbar.DrawPic(192 + (i5 << 4),-16,quake_Sbar.items[i5]);
		}
		if(quake_COM.rogue) {
			if((quake_CL.state.items & 536870912) != 0) quake_Sbar.DrawPic(288,-16,quake_Sbar.r_items[0]);
			if((quake_CL.state.items & 1073741824) != 0) quake_Sbar.DrawPic(304,-16,quake_Sbar.r_items[1]);
		} else {
			var _g6 = 0;
			while(_g6 < 4) {
				var i6 = _g6++;
				if((quake_CL.state.items >>> 28 + i6 & 1) != 0) quake_Sbar.DrawPic(288 + (i6 << 3),-16,quake_Sbar.sigil[i6]);
			}
		}
	}
};
quake_Sbar.DrawFrags = function() {
	quake_Sbar.SortFrags();
	var l = quake_Sbar.scoreboardlines <= 4?quake_Sbar.scoreboardlines:4;
	var x = 23;
	var xofs = quake_CL.state.gametype == 1?10:(quake_VID.width >> 1) - 150;
	var y = quake_VID.height - 47;
	var _g = 0;
	while(_g < l) {
		var i = _g++;
		var k = quake_Sbar.fragsort[i];
		var s = quake_CL.state.scores[k];
		if(s.name.length == 0) continue;
		quake_Draw.Fill(xofs + (x << 3),y,28,4,(s.colors & 240) + 8);
		quake_Draw.Fill(xofs + (x << 3),y + 4,28,3,((s.colors & 15) << 4) + 8);
		var num = s.frags == null?"null":"" + s.frags;
		quake_Sbar.DrawString((x - num.length << 3) + 36,-24,num);
		if(k == quake_CL.state.viewentity - 1) {
			quake_Sbar.DrawCharacter((x << 3) + 2,-24,16);
			quake_Sbar.DrawCharacter((x << 3) + 28,-24,17);
		}
		x += 4;
	}
};
quake_Sbar.DrawFace = function() {
	if(quake_COM.rogue && quake_CL.state.maxclients != 1 && quake_Host.teamplay.value >= 4 && quake_Host.teamplay.value <= 6) {
		var s = quake_CL.state.scores[quake_CL.state.viewentity - 1];
		var top = (s.colors & 240) + 8;
		var xofs = quake_CL.state.gametype == 1?113:(quake_VID.width >> 1) - 47;
		quake_Sbar.DrawPic(112,0,quake_Sbar.r_teambord);
		quake_Draw.Fill(xofs,quake_VID.height - 21,22,9,top);
		quake_Draw.Fill(xofs,quake_VID.height - 12,22,9,((s.colors & 15) << 4) + 8);
		var num = (top == 8?">>>":"   ") + s.frags;
		if(num.length > 3) num = num.substring(num.length - 3);
		if(top == 8) {
			quake_Sbar.DrawCharacter(109,3,HxOverrides.cca(num,0) - 30);
			quake_Sbar.DrawCharacter(116,3,HxOverrides.cca(num,1) - 30);
			quake_Sbar.DrawCharacter(123,3,HxOverrides.cca(num,2) - 30);
		} else {
			quake_Sbar.DrawCharacter(109,3,HxOverrides.cca(num,0));
			quake_Sbar.DrawCharacter(116,3,HxOverrides.cca(num,1));
			quake_Sbar.DrawCharacter(123,3,HxOverrides.cca(num,2));
		}
		return;
	}
	if((quake_CL.state.items & (quake_Def.it.invisibility | quake_Def.it.invulnerability)) == (quake_Def.it.invisibility | quake_Def.it.invulnerability)) {
		quake_Sbar.DrawPic(112,0,quake_Sbar.face_invis_invuln);
		return;
	}
	if((quake_CL.state.items & quake_Def.it.quad) != 0) {
		quake_Sbar.DrawPic(112,0,quake_Sbar.face_quad);
		return;
	}
	if((quake_CL.state.items & quake_Def.it.invisibility) != 0) {
		quake_Sbar.DrawPic(112,0,quake_Sbar.face_invis);
		return;
	}
	if((quake_CL.state.items & quake_Def.it.invulnerability) != 0) {
		quake_Sbar.DrawPic(112,0,quake_Sbar.face_invuln);
		return;
	}
	var f = quake_CL.state.stats[0] >= 100?4:quake_CL.state.stats[0] / 20 | 0;
	var anim = quake_CL.state.time <= quake_CL.state.faceanimtime?1:0;
	quake_Sbar.DrawPic(112,0,quake_Sbar.faces[f][anim]);
};
quake_Sbar.DrawSbar = function() {
	if(quake_SCR.con_current >= 200) return;
	if(quake_Sbar.lines > 24) {
		quake_Sbar.DrawInventory();
		if(quake_CL.state.maxclients != 1) quake_Sbar.DrawFrags();
	}
	if(quake_Sbar.showscores || quake_CL.state.stats[0] <= 0) {
		quake_Sbar.DrawPic(0,0,quake_Sbar.scorebar);
		quake_Sbar.SoloScoreboard();
		if(quake_CL.state.gametype == 1) quake_Sbar.DeathmatchOverlay();
		return;
	}
	if(quake_Sbar.lines == 0) return;
	quake_Sbar.DrawPic(0,0,quake_Sbar.sbar);
	if(quake_COM.hipnotic) {
		if((quake_CL.state.items & quake_Def.it.key1) != 0) quake_Sbar.DrawPic(209,3,quake_Sbar.items[0]);
		if((quake_CL.state.items & quake_Def.it.key2) != 0) quake_Sbar.DrawPic(209,12,quake_Sbar.items[1]);
	}
	var it = quake_COM.rogue?quake_Def.rit:quake_Def.it;
	if((quake_CL.state.items & quake_Def.it.invulnerability) != 0) {
		quake_Sbar.DrawNum(24,0,666,3,1);
		quake_Sbar.DrawPic(0,0,quake_Sbar.disc);
	} else {
		quake_Sbar.DrawNum(24,0,quake_CL.state.stats[4],3,quake_CL.state.stats[4] <= 25?1:0);
		if((quake_CL.state.items & it.armor3) != 0) quake_Sbar.DrawPic(0,0,quake_Sbar.armor[2]); else if((quake_CL.state.items & it.armor2) != 0) quake_Sbar.DrawPic(0,0,quake_Sbar.armor[1]); else if((quake_CL.state.items & it.armor1) != 0) quake_Sbar.DrawPic(0,0,quake_Sbar.armor[0]);
	}
	quake_Sbar.DrawFace();
	quake_Sbar.DrawNum(136,0,quake_CL.state.stats[0],3,quake_CL.state.stats[0] <= 25?1:0);
	if((quake_CL.state.items & it.shells) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.ammo[0]); else if((quake_CL.state.items & it.nails) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.ammo[1]); else if((quake_CL.state.items & it.rockets) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.ammo[2]); else if((quake_CL.state.items & it.cells) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.ammo[3]); else if(quake_COM.rogue) {
		if((quake_CL.state.items & quake_Def.rit.lava_nails) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.r_ammo[0]); else if((quake_CL.state.items & quake_Def.rit.plasma_ammo) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.r_ammo[1]); else if((quake_CL.state.items & quake_Def.rit.multi_rockets) != 0) quake_Sbar.DrawPic(224,0,quake_Sbar.r_ammo[2]);
	}
	quake_Sbar.DrawNum(248,0,quake_CL.state.stats[3],3,quake_CL.state.stats[3] <= 10?1:0);
	if(quake_VID.width >= 512 && quake_CL.state.gametype == 1) quake_Sbar.MiniDeathmatchOverlay();
};
quake_Sbar.IntermissionNumber = function(x,y,num) {
	var str = num == null?"null":"" + num;
	if(str.length > 3) str = str.substring(str.length - 3,str.length); else if(str.length < 3) x += (3 - str.length) * 24;
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var frame = HxOverrides.cca(str,i);
		quake_Draw.Pic(x,y,quake_Sbar.nums[0][frame == 45?10:frame - 48]);
		x += 24;
	}
};
quake_Sbar.DeathmatchOverlay = function() {
	quake_Draw.Pic(quake_VID.width - quake_Sbar.ranking.width >> 1,8,quake_Sbar.ranking);
	quake_Sbar.SortFrags();
	var x = (quake_VID.width >> 1) - 80;
	var y = 40;
	var _g1 = 0;
	var _g = quake_Sbar.scoreboardlines;
	while(_g1 < _g) {
		var i = _g1++;
		var s = quake_CL.state.scores[quake_Sbar.fragsort[i]];
		if(s.name.length == 0) continue;
		quake_Draw.Fill(x,y,40,4,(s.colors & 240) + 8);
		quake_Draw.Fill(x,y + 4,40,4,((s.colors & 15) << 4) + 8);
		var f = s.frags == null?"null":"" + s.frags;
		quake_Draw.String(x + 32 - (f.length << 3),y,f);
		if(quake_Sbar.fragsort[i] == quake_CL.state.viewentity - 1) quake_Draw.Character(x - 8,y,12);
		quake_Draw.String(x + 64,y,s.name);
		y += 10;
	}
};
quake_Sbar.MiniDeathmatchOverlay = function() {
	quake_Sbar.SortFrags();
	var l = quake_Sbar.scoreboardlines;
	var y = quake_VID.height - quake_Sbar.lines;
	var numlines = quake_Sbar.lines >> 3;
	var i = 0;
	while(i < l) {
		if(quake_Sbar.fragsort[i] == quake_CL.state.viewentity - 1) break;
		i++;
	}
	i = i == l?0:i - (numlines >> 1);
	if(i > l - numlines) i = l - numlines;
	if(i < 0) i = 0;
	while(i < l && y < quake_VID.height - 8) {
		var k = quake_Sbar.fragsort[i++];
		var s = quake_CL.state.scores[k];
		if(s.name.length == 0) continue;
		quake_Draw.Fill(324,y + 1,40,3,(s.colors & 240) + 8);
		quake_Draw.Fill(324,y + 4,40,4,((s.colors & 15) << 4) + 8);
		var num = s.frags == null?"null":"" + s.frags;
		quake_Draw.String(356 - (num.length << 3),y,num);
		if(k == quake_CL.state.viewentity - 1) {
			quake_Draw.Character(324,y,16);
			quake_Draw.Character(356,y,17);
		}
		quake_Draw.String(372,y,s.name);
		y += 8;
	}
};
quake_Sbar.IntermissionOverlay = function() {
	if(quake_CL.state.gametype == 1) {
		quake_Sbar.DeathmatchOverlay();
		return;
	}
	quake_Draw.Pic(64,24,quake_Sbar.complete);
	quake_Draw.Pic(0,56,quake_Sbar.inter);
	var dig = Math.floor(quake_CL.state.completed_time / 60.0);
	quake_Sbar.IntermissionNumber(160,64,dig);
	var num = Math.floor(quake_CL.state.completed_time - dig * 60);
	quake_Draw.Pic(234,64,quake_Sbar.colon);
	quake_Draw.Pic(246,64,quake_Sbar.nums[0][Math.floor(num / 10)]);
	quake_Draw.Pic(266,64,quake_Sbar.nums[0][Math.floor(num % 10)]);
	quake_Sbar.IntermissionNumber(160,104,quake_CL.state.stats[13]);
	quake_Draw.Pic(232,104,quake_Sbar.slash);
	quake_Sbar.IntermissionNumber(240,104,quake_CL.state.stats[11]);
	quake_Sbar.IntermissionNumber(160,144,quake_CL.state.stats[14]);
	quake_Draw.Pic(232,144,quake_Sbar.slash);
	quake_Sbar.IntermissionNumber(240,144,quake_CL.state.stats[12]);
};
var quake_Shaders = function() { };
quake_Shaders.__name__ = true;
var quake_V = function() { };
quake_V.__name__ = true;
quake_V.CalcRoll = function(angles,velocity) {
	var right = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(angles,null,right);
	var side = velocity[0] * right[0] + velocity[1] * right[1] + velocity[2] * right[2];
	var sign = side < 0?-1:1;
	side = Math.abs(side);
	if(side < quake_V.rollspeed.value) return side * sign * quake_V.rollangle.value / quake_V.rollspeed.value;
	return quake_V.rollangle.value * sign;
};
quake_V.CalcBob = function() {
	if(quake_V.bobcycle.value <= 0.0 || quake_V.bobcycle.value >= 1.0 || quake_V.bobup.value <= 0.0 || quake_V.bobup.value >= 1.0 || quake_V.bob.value == 0.0) return 0.0;
	var cycle = (quake_CL.state.time - (quake_CL.state.time / quake_V.bobcycle.value | 0) * quake_V.bobcycle.value) / quake_V.bobcycle.value;
	if(cycle < quake_V.bobup.value) cycle = Math.PI * cycle / quake_V.bobup.value; else cycle = Math.PI + Math.PI * (cycle - quake_V.bobup.value) / (1.0 - quake_V.bobup.value);
	var bob = Math.sqrt(quake_CL.state.velocity[0] * quake_CL.state.velocity[0] + quake_CL.state.velocity[1] * quake_CL.state.velocity[1]) * quake_V.bob.value;
	bob = bob * 0.3 + bob * 0.7 * Math.sin(cycle);
	if(bob > 4.0) bob = 4.0; else if(bob < -7.0) bob = -7.0;
	return bob;
};
quake_V.StartPitchDrift = function() {
	if(quake_CL.state.laststop == quake_CL.state.time) return;
	if(quake_CL.state.nodrift || quake_CL.state.pitchvel == 0.0) {
		quake_CL.state.pitchvel = quake_V.centerspeed.value;
		quake_CL.state.nodrift = false;
		quake_CL.state.driftmove = 0.0;
	}
};
quake_V.StopPitchDrift = function() {
	quake_CL.state.laststop = quake_CL.state.time;
	quake_CL.state.nodrift = true;
	quake_CL.state.pitchvel = 0.0;
};
quake_V.DriftPitch = function() {
	if(quake_Host.noclip_anglehack || !quake_CL.state.onground || quake_CL.cls.demoplayback) {
		quake_CL.state.driftmove = 0.0;
		quake_CL.state.pitchvel = 0.0;
		return;
	}
	if(quake_CL.state.nodrift) {
		if(Math.abs(quake_CL.state.cmd.forwardmove) < quake_CL.forwardspeed.value) quake_CL.state.driftmove = 0.0; else quake_CL.state.driftmove += quake_Host.frametime;
		if(quake_CL.state.driftmove > quake_V.centermove.value) quake_V.StartPitchDrift();
		return;
	}
	var delta = quake_CL.state.idealpitch - quake_CL.state.viewangles[0];
	if(delta == 0.0) {
		quake_CL.state.pitchvel = 0.0;
		return;
	}
	var move = quake_Host.frametime * quake_CL.state.pitchvel;
	quake_CL.state.pitchvel += quake_Host.frametime * quake_V.centerspeed.value;
	if(delta > 0) {
		if(move > delta) {
			quake_CL.state.pitchvel = 0.0;
			move = delta;
		}
		quake_CL.state.viewangles[0] = quake_CL.state.viewangles[0] + move;
	} else if(delta < 0) {
		if(move > -delta) {
			quake_CL.state.pitchvel = 0.0;
			move = -delta;
		}
		quake_CL.state.viewangles[0] = quake_CL.state.viewangles[0] - move;
	}
};
quake_V.ParseDamage = function() {
	var armor = quake_MSG.ReadByte();
	var blood = quake_MSG.ReadByte();
	var ent = quake_CL.entities[quake_CL.state.viewentity];
	var tmp;
	var x = quake_MSG.ReadShort() * 0.125 - ent.origin[0];
	var y = quake_MSG.ReadShort() * 0.125 - ent.origin[1];
	var z = quake_MSG.ReadShort() * 0.125 - ent.origin[2];
	var v = new Float32Array(3);
	v[0] = x;
	v[1] = y;
	v[2] = z;
	tmp = v;
	var from = tmp;
	quake__$Vec_Vec_$Impl_$.Normalize(from);
	var count = (blood + armor) * 0.5;
	if(count < 10.0) count = 10.0;
	quake_CL.state.faceanimtime = quake_CL.state.time + 0.2;
	var cshift = quake_CL.state.cshifts[1];
	cshift[3] += 3.0 * count;
	if(cshift[3] < 0.0) cshift[3] = 0.0; else if(cshift[3] > 150.0) cshift[3] = 150.0;
	if(armor > blood) {
		cshift[0] = 200.0;
		cshift[1] = cshift[2] = 100.0;
	} else if(armor != 0) {
		cshift[0] = 220.0;
		cshift[1] = cshift[2] = 50.0;
	} else {
		cshift[0] = 255.0;
		cshift[1] = cshift[2] = 0.0;
	}
	var forward = new Float32Array(3);
	var right = new Float32Array(3);
	quake__$Vec_Vec_$Impl_$.AngleVectors(ent.angles,forward,right);
	quake_V.dmg_roll = count * (from[0] * right[0] + from[1] * right[1] + from[2] * right[2]) * quake_V.kickroll.value;
	quake_V.dmg_pitch = count * (from[0] * forward[0] + from[1] * forward[1] + from[2] * forward[2]) * quake_V.kickpitch.value;
	quake_V.dmg_time = quake_V.kicktime.value;
};
quake_V.cshift_f = function() {
	var cshift = quake_V.cshift_empty;
	cshift[0] = quake_Q.atoi(quake_Cmd.argv[1]);
	cshift[1] = quake_Q.atoi(quake_Cmd.argv[2]);
	cshift[2] = quake_Q.atoi(quake_Cmd.argv[3]);
	cshift[3] = quake_Q.atoi(quake_Cmd.argv[4]);
};
quake_V.BonusFlash_f = function() {
	var cshift = quake_CL.state.cshifts[2];
	cshift[0] = 215.0;
	cshift[1] = 186.0;
	cshift[2] = 69.0;
	cshift[3] = 50.0;
};
quake_V.SetContentsColor = function(contents) {
	switch(contents) {
	case -1:case -2:
		quake_CL.state.cshifts[0] = quake_V.cshift_empty;
		break;
	case -5:
		quake_CL.state.cshifts[0] = quake_V.cshift_lava;
		break;
	case -4:
		quake_CL.state.cshifts[0] = quake_V.cshift_slime;
		break;
	default:
		quake_CL.state.cshifts[0] = quake_V.cshift_water;
	}
};
quake_V.CalcBlend = function() {
	var cshift = quake_CL.state.cshifts[3];
	if((quake_CL.state.items & quake_Def.it.quad) != 0) {
		cshift[0] = 0.0;
		cshift[1] = 0.0;
		cshift[2] = 255.0;
		cshift[3] = 30.0;
	} else if((quake_CL.state.items & quake_Def.it.suit) != 0) {
		cshift[0] = 0.0;
		cshift[1] = 255.0;
		cshift[2] = 0.0;
		cshift[3] = 20.0;
	} else if((quake_CL.state.items & quake_Def.it.invisibility) != 0) {
		cshift[0] = 100.0;
		cshift[1] = 100.0;
		cshift[2] = 100.0;
		cshift[3] = 100.0;
	} else if((quake_CL.state.items & quake_Def.it.invulnerability) != 0) {
		cshift[0] = 255.0;
		cshift[1] = 255.0;
		cshift[2] = 0.0;
		cshift[3] = 30.0;
	} else cshift[3] = 0.0;
	quake_CL.state.cshifts[1][3] -= quake_Host.frametime * 150.0;
	if(quake_CL.state.cshifts[1][3] < 0.0) quake_CL.state.cshifts[1][3] = 0.0;
	quake_CL.state.cshifts[2][3] -= quake_Host.frametime * 100.0;
	if(quake_CL.state.cshifts[2][3] < 0.0) quake_CL.state.cshifts[2][3] = 0.0;
	if(quake_V.cshiftpercent.value == 0) {
		quake_V.blend[0] = quake_V.blend[1] = quake_V.blend[2] = quake_V.blend[3] = 0.0;
		return;
	}
	var r = 0.0;
	var g = 0.0;
	var b = 0.0;
	var a = 0.0;
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		var cshift1 = quake_CL.state.cshifts[i];
		var a2 = cshift1[3] * quake_V.cshiftpercent.value / 25500.0;
		if(a2 == 0.0) continue;
		a = a + a2 * (1.0 - a);
		a2 = a2 / a;
		r = r * (1.0 - a2) + cshift1[0] * a2;
		g = g * (1.0 - a2) + cshift1[1] * a2;
		b = b * (1.0 - a2) + cshift1[2] * a2;
	}
	if(a > 1.0) a = 1.0; else if(a < 0.0) a = 0.0;
	quake_V.blend[0] = r;
	quake_V.blend[1] = g;
	quake_V.blend[2] = b;
	quake_V.blend[3] = a;
	if(quake_V.blend[3] > 1.0) quake_V.blend[3] = 1.0; else if(quake_V.blend[3] < 0.0) quake_V.blend[3] = 0.0;
};
quake_V.CalcIntermissionRefdef = function() {
	var ent = quake_CL.entities[quake_CL.state.viewentity];
	quake_Render.refdef.vieworg[0] = ent.origin[0];
	quake_Render.refdef.vieworg[1] = ent.origin[1];
	quake_Render.refdef.vieworg[2] = ent.origin[2];
	var v = ent.angles[0] + Math.sin(quake_CL.state.time * quake_V.ipitch_cycle.value) * quake_V.ipitch_level.value;
	quake_Render.refdef.viewangles[0] = v;
	var v1 = ent.angles[1] + Math.sin(quake_CL.state.time * quake_V.iyaw_cycle.value) * quake_V.iyaw_level.value;
	quake_Render.refdef.viewangles[1] = v1;
	var v2 = ent.angles[2] + Math.sin(quake_CL.state.time * quake_V.iroll_cycle.value) * quake_V.iroll_level.value;
	quake_Render.refdef.viewangles[2] = v2;
	quake_CL.state.viewent.model = null;
};
quake_V.CalcRefdef = function() {
	quake_V.DriftPitch();
	var ent = quake_CL.entities[quake_CL.state.viewentity];
	ent.angles[1] = quake_CL.state.viewangles[1];
	ent.angles[0] = -quake_CL.state.viewangles[0];
	var bob = quake_V.CalcBob();
	quake_Render.refdef.vieworg[0] = ent.origin[0] + 0.03125;
	quake_Render.refdef.vieworg[1] = ent.origin[1] + 0.03125;
	quake_Render.refdef.vieworg[2] = ent.origin[2] + quake_CL.state.viewheight + bob + 0.03125;
	quake_Render.refdef.viewangles[0] = quake_CL.state.viewangles[0];
	quake_Render.refdef.viewangles[1] = quake_CL.state.viewangles[1];
	var v = quake_CL.state.viewangles[2] + quake_V.CalcRoll(quake_CL.entities[quake_CL.state.viewentity].angles,quake_CL.state.velocity);
	quake_Render.refdef.viewangles[2] = v;
	if(quake_V.dmg_time > 0.0) {
		if(quake_V.kicktime.value != 0.0) {
			quake_Render.refdef.viewangles[2] = quake_Render.refdef.viewangles[2] + quake_V.dmg_time / quake_V.kicktime.value * quake_V.dmg_roll;
			quake_Render.refdef.viewangles[0] = quake_Render.refdef.viewangles[0] - quake_V.dmg_time / quake_V.kicktime.value * quake_V.dmg_pitch;
		}
		quake_V.dmg_time -= quake_Host.frametime;
	}
	if(quake_CL.state.stats[0] <= 0) quake_Render.refdef.viewangles[2] = 80.0;
	var ipitch = quake_V.idlescale.value * Math.sin(quake_CL.state.time * quake_V.ipitch_cycle.value) * quake_V.ipitch_level.value;
	var iyaw = quake_V.idlescale.value * Math.sin(quake_CL.state.time * quake_V.iyaw_cycle.value) * quake_V.iyaw_level.value;
	var iroll = quake_V.idlescale.value * Math.sin(quake_CL.state.time * quake_V.iroll_cycle.value) * quake_V.iroll_level.value;
	quake_Render.refdef.viewangles[0] = quake_Render.refdef.viewangles[0] + ipitch;
	quake_Render.refdef.viewangles[1] = quake_Render.refdef.viewangles[1] + iyaw;
	quake_Render.refdef.viewangles[2] = quake_Render.refdef.viewangles[2] + iroll;
	var forward = new Float32Array(3);
	var right = new Float32Array(3);
	var up = new Float32Array(3);
	var tmp;
	var v1 = new Float32Array(3);
	v1[0] = -ent.angles[0];
	v1[1] = ent.angles[1];
	v1[2] = ent.angles[2];
	tmp = v1;
	quake__$Vec_Vec_$Impl_$.AngleVectors(tmp,forward,right,up);
	quake_Render.refdef.vieworg[0] = quake_Render.refdef.vieworg[0] + (quake_V.ofsx.value * forward[0] + quake_V.ofsy.value * right[0] + quake_V.ofsz.value * up[0]);
	quake_Render.refdef.vieworg[1] = quake_Render.refdef.vieworg[1] + (quake_V.ofsx.value * forward[1] + quake_V.ofsy.value * right[1] + quake_V.ofsz.value * up[1]);
	quake_Render.refdef.vieworg[2] = quake_Render.refdef.vieworg[2] + (quake_V.ofsx.value * forward[2] + quake_V.ofsy.value * right[2] + quake_V.ofsz.value * up[2]);
	if(quake_Render.refdef.vieworg[0] < ent.origin[0] - 14.0) quake_Render.refdef.vieworg[0] = ent.origin[0] - 14.0; else if(quake_Render.refdef.vieworg[0] > ent.origin[0] + 14.0) quake_Render.refdef.vieworg[0] = ent.origin[0] + 14.0;
	if(quake_Render.refdef.vieworg[1] < ent.origin[1] - 14.0) quake_Render.refdef.vieworg[1] = ent.origin[1] - 14.0; else if(quake_Render.refdef.vieworg[1] > ent.origin[1] + 14.0) quake_Render.refdef.vieworg[1] = ent.origin[1] + 14.0;
	if(quake_Render.refdef.vieworg[2] < ent.origin[2] - 22.0) quake_Render.refdef.vieworg[2] = ent.origin[2] - 22.0; else if(quake_Render.refdef.vieworg[2] > ent.origin[2] + 30.0) quake_Render.refdef.vieworg[2] = ent.origin[2] + 30.0;
	var view = quake_CL.state.viewent;
	view.angles[0] = -quake_Render.refdef.viewangles[0] - ipitch;
	view.angles[1] = quake_Render.refdef.viewangles[1] - iyaw;
	view.angles[2] = quake_CL.state.viewangles[2] - iroll;
	view.origin[0] = ent.origin[0] + forward[0] * bob * 0.4;
	view.origin[1] = ent.origin[1] + forward[1] * bob * 0.4;
	view.origin[2] = ent.origin[2] + quake_CL.state.viewheight + forward[2] * bob * 0.4 + bob;
	var _g = quake_SCR.viewsize.value;
	switch(_g) {
	case 110:case 90:
		view.origin[2] = view.origin[2] + 1.0;
		break;
	case 100:
		view.origin[2] = view.origin[2] + 2.0;
		break;
	case 80:
		view.origin[2] = view.origin[2] + 0.5;
		break;
	}
	view.model = quake_CL.state.model_precache[quake_CL.state.stats[2]];
	view.frame = quake_CL.state.stats[5];
	quake_Render.refdef.viewangles[0] = quake_Render.refdef.viewangles[0] + quake_CL.state.punchangle[0];
	quake_Render.refdef.viewangles[1] = quake_Render.refdef.viewangles[1] + quake_CL.state.punchangle[1];
	quake_Render.refdef.viewangles[2] = quake_Render.refdef.viewangles[2] + quake_CL.state.punchangle[2];
	if(quake_CL.state.onground && ent.origin[2] - quake_V.oldz > 0.0) {
		var steptime = quake_CL.state.time - quake_CL.state.oldtime;
		if(steptime < 0.0) steptime = 0.0;
		quake_V.oldz += steptime * 80.0;
		if(quake_V.oldz > ent.origin[2]) quake_V.oldz = ent.origin[2]; else if(ent.origin[2] - quake_V.oldz > 12.0) quake_V.oldz = ent.origin[2] - 12.0;
		quake_Render.refdef.vieworg[2] = quake_Render.refdef.vieworg[2] + (quake_V.oldz - ent.origin[2]);
		view.origin[2] = view.origin[2] + (quake_V.oldz - ent.origin[2]);
	} else quake_V.oldz = ent.origin[2];
	if(quake_Chase.active.value != 0) quake_Chase.Update();
};
quake_V.RenderView = function() {
	if(quake_Console.forcedup) return;
	if(quake_CL.state.maxclients >= 2) {
		quake_V.ofsx.set("0");
		quake_V.ofsy.set("0");
		quake_V.ofsz.set("0");
	}
	if(quake_CL.state.intermission != 0) quake_V.CalcIntermissionRefdef(); else if(!quake_CL.state.paused) quake_V.CalcRefdef();
	quake_Render.PushDlights();
	quake_Render.RenderView();
};
quake_V.Init = function() {
	quake_Cmd.AddCommand("v_cshift",quake_V.cshift_f);
	quake_Cmd.AddCommand("bf",quake_V.BonusFlash_f);
	quake_Cmd.AddCommand("centerview",quake_V.StartPitchDrift);
	quake_V.centermove = quake_Cvar.RegisterVariable("v_centermove","0.15");
	quake_V.centerspeed = quake_Cvar.RegisterVariable("v_centerspeed","500");
	quake_V.iyaw_cycle = quake_Cvar.RegisterVariable("v_iyaw_cycle","2");
	quake_V.iroll_cycle = quake_Cvar.RegisterVariable("v_iroll_cycle","0.5");
	quake_V.ipitch_cycle = quake_Cvar.RegisterVariable("v_ipitch_cycle","1");
	quake_V.iyaw_level = quake_Cvar.RegisterVariable("v_iyaw_level","0.3");
	quake_V.iroll_level = quake_Cvar.RegisterVariable("v_iroll_level","0.1");
	quake_V.ipitch_level = quake_Cvar.RegisterVariable("v_ipitch_level","0.3");
	quake_V.idlescale = quake_Cvar.RegisterVariable("v_idlescale","0");
	quake_V.crosshair = quake_Cvar.RegisterVariable("crosshair","0",true);
	quake_V.crossx = quake_Cvar.RegisterVariable("cl_crossx","0");
	quake_V.crossy = quake_Cvar.RegisterVariable("cl_crossy","0");
	quake_V.cshiftpercent = quake_Cvar.RegisterVariable("gl_cshiftpercent","100");
	quake_V.ofsx = quake_Cvar.RegisterVariable("scr_ofsx","0");
	quake_V.ofsy = quake_Cvar.RegisterVariable("scr_ofsy","0");
	quake_V.ofsz = quake_Cvar.RegisterVariable("scr_ofsz","0");
	quake_V.rollspeed = quake_Cvar.RegisterVariable("cl_rollspeed","200");
	quake_V.rollangle = quake_Cvar.RegisterVariable("cl_rollangle","2.0");
	quake_V.bob = quake_Cvar.RegisterVariable("cl_bob","0.02");
	quake_V.bobcycle = quake_Cvar.RegisterVariable("cl_bobcycle","0.6");
	quake_V.bobup = quake_Cvar.RegisterVariable("cl_bobup","0.5");
	quake_V.kicktime = quake_Cvar.RegisterVariable("v_kicktime","0.5");
	quake_V.kickroll = quake_Cvar.RegisterVariable("v_kickroll","0.6");
	quake_V.kickpitch = quake_Cvar.RegisterVariable("v_kickpitch","0.6");
	quake_V.gamma = quake_Cvar.RegisterVariable("gamma","1",true);
};
var quake_W = function() { };
quake_W.__name__ = true;
quake_W.LoadWadFile = function(filename) {
	var base = quake_COM.LoadFile(filename);
	if(base == null) quake_Sys.Error("W.LoadWadFile: couldn't load " + filename);
	var view = new DataView(base);
	if(view.getUint32(0,true) != 843333975) quake_Sys.Error("Wad file " + filename + " doesn't have WAD2 id");
	var numlumps = view.getUint32(4,true);
	var infotableofs = view.getUint32(8,true);
	var _g = 0;
	while(_g < numlumps) {
		var i = _g++;
		var size = view.getUint32(infotableofs + 4,true);
		var lump = new ArrayBuffer(size);
		new Uint8Array(lump).set(new Uint8Array(base,view.getUint32(infotableofs,true),size));
		var k = quake_Q.memstr(new Uint8Array(base,infotableofs + 16,16)).toUpperCase();
		var _this = quake_W.lumps;
		if(__map_reserved[k] != null) _this.setReserved(k,lump); else _this.h[k] = lump;
		lump;
		infotableofs += 32;
	}
};
quake_W.GetLumpName = function(name) {
	var tmp;
	var _this = quake_W.lumps;
	if(__map_reserved[name] != null) tmp = _this.getReserved(name); else tmp = _this.h[name];
	var lump = tmp;
	if(lump == null) quake_Sys.Error("W.GetLumpName: " + name + " not found");
	return lump;
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
var __map_reserved = {}
quake_CL.temp_entities = [];
quake_CL.kbutton = { mlook : 0, klook : 1, left : 2, right : 3, forward : 4, back : 5, lookup : 6, lookdown : 7, moveleft : 8, moveright : 9, strafe : 10, speed : 11, 'use' : 12, jump : 13, attack : 14, moveup : 15, movedown : 16, num : 17};
quake_CL.kbuttons = [];
quake_CL.sendmovebuf = new quake_MSG(16);
quake_CL.cls = new quake__$CL_ClientStatic();
quake_CL.static_entities = [];
quake_CL.visedicts = [];
quake_CL.svc_strings = ["bad","nop","disconnect","updatestat","version","setview","sound","time","print","stufftext","setangle","serverinfo","lightstyle","updatename","updatefrags","clientdata","stopsound","updatecolors","particle","damage","spawnstatic","OBSOLETE spawnbinary","spawnbaseline","temp_entity","setpause","signonnum","centerprint","killedmonster","foundsecret","spawnstaticsound","intermission","finale","cdtrack","sellscreen","cutscene"];
quake_CL.lastmsg = 0.0;
quake_COM.argv = [];
quake_COM.standard_quake = true;
quake_COM.rogue = false;
quake_COM.hipnotic = false;
quake_COM.modified = false;
quake_COM.searchpaths = [];
quake_COM.localStorage = js_Browser.getLocalStorage();
quake_CRC.table = [0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920];
quake_Cmd.text = "";
quake_Cmd.argv = [];
quake_Cmd.functions = new haxe_ds_StringMap();
quake_Cmd.alias = new haxe_ds_StringMap();
quake_Cmd.wait = false;
quake_Console.backscroll = 0;
quake_Console.text = [];
quake_Console.current = 0;
quake_Cvar.vars = new haxe_ds_StringMap();
quake_Def.it = { shotgun : 1, super_shotgun : 2, nailgun : 4, super_nailgun : 8, grenade_launcher : 16, rocket_launcher : 32, lightning : 64, super_lightning : 128, shells : 256, nails : 512, rockets : 1024, cells : 2048, axe : 4096, armor1 : 8192, armor2 : 16384, armor3 : 32768, superhealth : 65536, key1 : 131072, key2 : 262144, invisibility : 524288, invulnerability : 1048576, suit : 2097152, quad : 4194304};
quake_Def.rit = { shells : 128, nails : 256, rockets : 512, cells : 1024, axe : 2048, lava_nailgun : 4096, lava_super_nailgun : 8192, multi_grenade : 16384, multi_rocket : 32768, plasma_gun : 65536, armor1 : 8388608, armor2 : 16777216, armor3 : 33554432, lava_nails : 67108864, plasma_ammo : 134217728, multi_rockets : 268435456, shield : 536870912, antigrav : 1073741824, superhealth : 2147483648};
quake_Def.hit = { proximity_gun_bit : 16, mjolnir_bit : 7, laser_cannon_bit : 23, proximity_gun : 65536, mjolnir : 128, laser_cannon : 8388608, wetsuit : 33554432, empathy_shields : 67108864};
quake_EdictVarOfs.__meta__ = { statics : { ammo_shells1 : { f : null}, ammo_nails1 : { f : null}, ammo_lava_nails : { f : null}, ammo_rockets1 : { f : null}, ammo_multi_rockets : { f : null}, ammo_cells1 : { f : null}, ammo_plasma : { f : null}, gravity : { f : null}, items2 : { f : null}}};
quake_GL.textures = [];
quake_GL.programs = [];
quake_GL.ortho = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.00001,0.0,-1.0,1.0,0.0,1.0];
quake_GL.identity = [1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0];
quake_GL.currenttextures = new haxe_ds_IntMap();
quake_Host.initialized = false;
quake_Host.noclip_anglehack = false;
quake_Host.framecount = 0;
quake_Host.timetotal = 0.0;
quake_Host.timecount = 0;
quake_Host.time3 = 0.0;
quake_Host.inerror = false;
quake_Host.isdown = false;
quake_IN.mouse_x = 0.0;
quake_IN.mouse_y = 0.0;
quake_IN.old_mouse_x = 0.0;
quake_IN.old_mouse_y = 0.0;
quake_IN.mouse_avail = false;
quake_Key.lines = [""];
quake_Key.edit_line = "";
quake_Key.history_line = 1;
quake_Key.bindings = [];
quake_Key.consolekeys = [];
quake_Key.shift = [];
quake_Key.down = [];
quake_Key.names = [{ name : "TAB", keynum : 9},{ name : "ENTER", keynum : 13},{ name : "ESCAPE", keynum : 27},{ name : "SPACE", keynum : 32},{ name : "BACKSPACE", keynum : 127},{ name : "UPARROW", keynum : 128},{ name : "DOWNARROW", keynum : 129},{ name : "LEFTARROW", keynum : 130},{ name : "RIGHTARROW", keynum : 131},{ name : "ALT", keynum : 132},{ name : "CTRL", keynum : 133},{ name : "SHIFT", keynum : 134},{ name : "F1", keynum : 135},{ name : "F2", keynum : 136},{ name : "F3", keynum : 137},{ name : "F4", keynum : 138},{ name : "F5", keynum : 139},{ name : "F6", keynum : 140},{ name : "F7", keynum : 141},{ name : "F8", keynum : 142},{ name : "F9", keynum : 143},{ name : "F10", keynum : 144},{ name : "F11", keynum : 145},{ name : "F12", keynum : 146},{ name : "INS", keynum : 147},{ name : "DEL", keynum : 148},{ name : "PGDN", keynum : 149},{ name : "PGUP", keynum : 150},{ name : "HOME", keynum : 151},{ name : "END", keynum : 152},{ name : "MOUSE1", keynum : 200},{ name : "MOUSE2", keynum : 201},{ name : "MOUSE3", keynum : 202},{ name : "PAUSE", keynum : 255},{ name : "MWHEELUP", keynum : 239},{ name : "MWHEELDOWN", keynum : 240},{ name : "SEMICOLON", keynum : 59}];
quake_Key.chat_buffer = "";
quake_Menu.state = 0;
quake_Menu.localStorage = js_Browser.getLocalStorage();
quake_Menu.entersound = false;
quake_Menu.main_cursor = 0;
quake_Menu.singleplayer_cursor = 0;
quake_Menu.load_cursor = 0;
quake_Menu.max_savegames = 12;
quake_Menu.filenames = [];
quake_Menu.loadable = [];
quake_Menu.removable = [];
quake_Menu.multiplayer_cursor = 0;
quake_Menu.multiplayer_cursor_table = [56,72,96,120,156];
quake_Menu.multiplayer_joinname = "";
quake_Menu.options_cursor = 0;
quake_Menu.bindnames = [["+attack","attack"],["impulse 10","change weapon"],["+jump","jump / swim up"],["+forward","walk forward"],["+back","backpedal"],["+left","turn left"],["+right","turn right"],["+speed","run"],["+moveleft","step left"],["+moveright","step right"],["+strafe","sidestep"],["+lookup","look up"],["+lookdown","look down"],["centerview","center view"],["+mlook","mouse look"],["+klook","keyboard look"],["+moveup","swim up"],["+movedown","swim down"]];
quake_Menu.keys_cursor = 0;
quake_Menu.quitMessage = [["  Are you gonna quit","  this game just like","   everything else?",""],[" Milord, methinks that","   thou art a lowly"," quitter. Is this true?",""],[" Do I need to bust your","  face open for trying","        to quit?",""],[" Man, I oughta smack you","   for trying to quit!","     Press Y to get","      smacked out."],[" Press Y to quit like a","   big loser in life.","  Press N to stay proud","    and successful!"],["   If you press Y to","  quit, I will summon","  Satan all over your","      hard drive!"],["  Um, Asmodeus dislikes"," his children trying to"," quit. Press Y to return","   to your Tinkertoys."],["  If you quit now, I'll","  throw a blanket-party","   for you next time!",""]];
quake_Mod.known = [];
quake_NET.activeSockets = [];
quake_NET.message = new quake_MSG(8192);
quake_NET.activeconnections = 0;
quake_NET_$Loop.localconnectpending = false;
quake_NET_$Loop.initialized = false;
quake_NET_$WEBS.available = false;
quake_NET_$WEBS.initialized = false;
quake_PR.localstack_size = 2048;
quake_PR.opnames = ["DONE","MUL_F","MUL_V","MUL_FV","MUL_VF","DIV","ADD_F","ADD_V","SUB_F","SUB_V","EQ_F","EQ_V","EQ_S","EQ_E","EQ_FNC","NE_F","NE_V","NE_S","NE_E","NE_FNC","LE","GE","LT","GT","INDIRECT","INDIRECT","INDIRECT","INDIRECT","INDIRECT","INDIRECT","ADDRESS","STORE_F","STORE_V","STORE_S","STORE_ENT","STORE_FLD","STORE_FNC","STOREP_F","STOREP_V","STOREP_S","STOREP_ENT","STOREP_FLD","STOREP_FNC","RETURN","NOT_F","NOT_V","NOT_S","NOT_ENT","NOT_FNC","IF","IFNOT","CALL0","CALL1","CALL2","CALL3","CALL4","CALL5","CALL6","CALL7","CALL8","STATE","GOTO","AND","OR","BITAND","BITOR"];
quake_VID.d_8to24table = new Uint32Array(new ArrayBuffer(1024));
quake_S.started = false;
quake_S.channels = [];
quake_S.static_channels = [];
quake_S.ambient_channels = [];
quake_S.listener_origin = new Float32Array(3);
quake_S.listener_forward = new Float32Array(3);
quake_S.listener_right = new Float32Array(3);
quake_S.listener_up = new Float32Array(3);
quake_S.known_sfx = [];
quake__$Vec_Vec_$Impl_$.origin = new Float32Array(3);
quake_SCR.con_current = 0;
quake_SCR.centertime_off = 0.0;
quake_SCR.recalc_refdef = false;
quake_SCR.disabled_for_loading = false;
quake_SCR.centerstring = [];
quake_SCR.count = 0;
quake_SCR.screenshot = false;
quake_SV.server = new quake__$SV_ServerState();
quake_SV.svs = new quake__$SV_ServerStatic();
quake_SV.clientdatagram = new quake_MSG(1024);
quake_SV.fatpvs = [];
quake_SV.readClientCmds = ["status","god","notarget","fly","name","noclip","say","say_team","tell","color","kill","pause","spawn","begin","prespawn","kick","ping","give","ban"];
quake_Render.dlightframecount = 0;
quake_Render.lightstylevalue = new Uint8Array(64);
quake_Render.visframecount = 0;
quake_Render.frustum = [new quake_Plane(),new quake_Plane(),new quake_Plane(),new quake_Plane()];
quake_Render.vup = new Float32Array(3);
quake_Render.vpn = new Float32Array(3);
quake_Render.vright = new Float32Array(3);
quake_Render.refdef = new quake__$Render_RefDef();
quake_Render.avertexnormals = new Float32Array([-0.525731,0.000000,0.850651,-0.442863,0.238856,0.864188,-0.295242,0.000000,0.955423,-0.309017,0.500000,0.809017,-0.162460,0.262866,0.951056,0.000000,0.000000,1.000000,0.000000,0.850651,0.525731,-0.147621,0.716567,0.681718,0.147621,0.716567,0.681718,0.000000,0.525731,0.850651,0.309017,0.500000,0.809017,0.525731,0.000000,0.850651,0.295242,0.000000,0.955423,0.442863,0.238856,0.864188,0.162460,0.262866,0.951056,-0.681718,0.147621,0.716567,-0.809017,0.309017,0.500000,-0.587785,0.425325,0.688191,-0.850651,0.525731,0.000000,-0.864188,0.442863,0.238856,-0.716567,0.681718,0.147621,-0.688191,0.587785,0.425325,-0.500000,0.809017,0.309017,-0.238856,0.864188,0.442863,-0.425325,0.688191,0.587785,-0.716567,0.681718,-0.147621,-0.500000,0.809017,-0.309017,-0.525731,0.850651,0.000000,0.000000,0.850651,-0.525731,-0.238856,0.864188,-0.442863,0.000000,0.955423,-0.295242,-0.262866,0.951056,-0.162460,0.000000,1.000000,0.000000,0.000000,0.955423,0.295242,-0.262866,0.951056,0.162460,0.238856,0.864188,0.442863,0.262866,0.951056,0.162460,0.500000,0.809017,0.309017,0.238856,0.864188,-0.442863,0.262866,0.951056,-0.162460,0.500000,0.809017,-0.309017,0.850651,0.525731,0.000000,0.716567,0.681718,0.147621,0.716567,0.681718,-0.147621,0.525731,0.850651,0.000000,0.425325,0.688191,0.587785,0.864188,0.442863,0.238856,0.688191,0.587785,0.425325,0.809017,0.309017,0.500000,0.681718,0.147621,0.716567,0.587785,0.425325,0.688191,0.955423,0.295242,0.000000,1.000000,0.000000,0.000000,0.951056,0.162460,0.262866,0.850651,-0.525731,0.000000,0.955423,-0.295242,0.000000,0.864188,-0.442863,0.238856,0.951056,-0.162460,0.262866,0.809017,-0.309017,0.500000,0.681718,-0.147621,0.716567,0.850651,0.000000,0.525731,0.864188,0.442863,-0.238856,0.809017,0.309017,-0.500000,0.951056,0.162460,-0.262866,0.525731,0.000000,-0.850651,0.681718,0.147621,-0.716567,0.681718,-0.147621,-0.716567,0.850651,0.000000,-0.525731,0.809017,-0.309017,-0.500000,0.864188,-0.442863,-0.238856,0.951056,-0.162460,-0.262866,0.147621,0.716567,-0.681718,0.309017,0.500000,-0.809017,0.425325,0.688191,-0.587785,0.442863,0.238856,-0.864188,0.587785,0.425325,-0.688191,0.688191,0.587785,-0.425325,-0.147621,0.716567,-0.681718,-0.309017,0.500000,-0.809017,0.000000,0.525731,-0.850651,-0.525731,0.000000,-0.850651,-0.442863,0.238856,-0.864188,-0.295242,0.000000,-0.955423,-0.162460,0.262866,-0.951056,0.000000,0.000000,-1.000000,0.295242,0.000000,-0.955423,0.162460,0.262866,-0.951056,-0.442863,-0.238856,-0.864188,-0.309017,-0.500000,-0.809017,-0.162460,-0.262866,-0.951056,0.000000,-0.850651,-0.525731,-0.147621,-0.716567,-0.681718,0.147621,-0.716567,-0.681718,0.000000,-0.525731,-0.850651,0.309017,-0.500000,-0.809017,0.442863,-0.238856,-0.864188,0.162460,-0.262866,-0.951056,0.238856,-0.864188,-0.442863,0.500000,-0.809017,-0.309017,0.425325,-0.688191,-0.587785,0.716567,-0.681718,-0.147621,0.688191,-0.587785,-0.425325,0.587785,-0.425325,-0.688191,0.000000,-0.955423,-0.295242,0.000000,-1.000000,0.000000,0.262866,-0.951056,-0.162460,0.000000,-0.850651,0.525731,0.000000,-0.955423,0.295242,0.238856,-0.864188,0.442863,0.262866,-0.951056,0.162460,0.500000,-0.809017,0.309017,0.716567,-0.681718,0.147621,0.525731,-0.850651,0.000000,-0.238856,-0.864188,-0.442863,-0.500000,-0.809017,-0.309017,-0.262866,-0.951056,-0.162460,-0.850651,-0.525731,0.000000,-0.716567,-0.681718,-0.147621,-0.716567,-0.681718,0.147621,-0.525731,-0.850651,0.000000,-0.500000,-0.809017,0.309017,-0.238856,-0.864188,0.442863,-0.262866,-0.951056,0.162460,-0.864188,-0.442863,0.238856,-0.809017,-0.309017,0.500000,-0.688191,-0.587785,0.425325,-0.681718,-0.147621,0.716567,-0.442863,-0.238856,0.864188,-0.587785,-0.425325,0.688191,-0.309017,-0.500000,0.809017,-0.147621,-0.716567,0.681718,-0.425325,-0.688191,0.587785,-0.162460,-0.262866,0.951056,0.442863,-0.238856,0.864188,0.162460,-0.262866,0.951056,0.309017,-0.500000,0.809017,0.147621,-0.716567,0.681718,0.000000,-0.525731,0.850651,0.425325,-0.688191,0.587785,0.587785,-0.425325,0.688191,0.688191,-0.587785,0.425325,-0.955423,0.295242,0.000000,-0.951056,0.162460,0.262866,-1.000000,0.000000,0.000000,-0.850651,0.000000,0.525731,-0.955423,-0.295242,0.000000,-0.951056,-0.162460,0.262866,-0.864188,0.442863,-0.238856,-0.951056,0.162460,-0.262866,-0.809017,0.309017,-0.500000,-0.864188,-0.442863,-0.238856,-0.951056,-0.162460,-0.262866,-0.809017,-0.309017,-0.500000,-0.681718,0.147621,-0.716567,-0.681718,-0.147621,-0.716567,-0.850651,0.000000,-0.525731,-0.688191,0.587785,-0.425325,-0.587785,0.425325,-0.688191,-0.425325,0.688191,-0.587785,-0.425325,-0.688191,-0.587785,-0.587785,-0.425325,-0.688191,-0.688191,-0.587785,-0.425325]);
quake_Render.perspective = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0001220777635353,-1.0,0.0,0.0,-8.0004883110541414,0.0];
quake_Render.ramp1 = [111,109,107,105,103,101,99,97];
quake_Render.ramp2 = [111,110,109,108,107,106,104,102];
quake_Render.ramp3 = [109,107,6,5,4,3];
quake_Render.tracercount = 0;
quake_Render.lightmap_modified = new Uint8Array(1024);
quake_Render.lightmaps = new Uint8Array(new ArrayBuffer(4194304));
quake_Render.dlightmaps = new Uint8Array(new ArrayBuffer(1048576));
quake_PF.builtin = [quake_PF.Fixme,quake_PF.makevectors,quake_PF.setorigin,quake_PF.setmodel,quake_PF.setsize,quake_PF.Fixme,quake_PF.breakstatement,quake_PF.random,quake_PF.sound,quake_PF.normalize,quake_PF.error,quake_PF.objerror,quake_PF.vlen,quake_PF.vectoyaw,quake_PF.Spawn,quake_PF.Remove,quake_PF.traceline,quake_PF.checkclient,quake_PF.Find,quake_PF.precache_sound,quake_PF.precache_model,quake_PF.stuffcmd,quake_PF.findradius,quake_PF.bprint,quake_PF.sprint,quake_PF.dprint,quake_PF.ftos,quake_PF.vtos,quake_PF.coredump,quake_PF.traceon,quake_PF.traceoff,quake_PF.eprint,quake_PF.walkmove,quake_PF.Fixme,quake_PF.droptofloor,quake_PF.lightstyle,quake_PF.rint,quake_PF.floor,quake_PF.ceil,quake_PF.Fixme,quake_PF.checkbottom,quake_PF.pointcontents,quake_PF.Fixme,quake_PF.fabs,quake_PF.aim,quake_PF.cvar,quake_PF.localcmd,quake_PF.nextent,quake_PF.particle,quake_PF.changeyaw,quake_PF.Fixme,quake_PF.vectoangles,quake_PF.WriteByte,quake_PF.WriteChar,quake_PF.WriteShort,quake_PF.WriteLong,quake_PF.WriteCoord,quake_PF.WriteAngle,quake_PF.WriteString,quake_PF.WriteEntity,quake_PF.Fixme,quake_PF.Fixme,quake_PF.Fixme,quake_PF.Fixme,quake_PF.Fixme,quake_PF.Fixme,quake_PF.Fixme,quake_PF.MoveToGoal,quake_PF.precache_file,quake_PF.makestatic,quake_PF.changelevel,quake_PF.Fixme,quake_PF.cvar_set,quake_PF.centerprint,quake_PF.ambientsound,quake_PF.precache_model,quake_PF.precache_sound,quake_PF.precache_file,quake_PF.setspawnparms];
quake_Sbar.fragsort = [];
quake_Sbar.showscores = false;
quake_Shaders.shaders = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = { vert : "uniform vec3 uOrigin;\nuniform mat3 uAngles;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nuniform vec3 uLightVec;\nattribute vec3 aPoint;\nattribute vec3 aLightNormal;\nattribute vec2 aTexCoord;\nvarying vec2 vTexCoord;\nvarying float vLightDot;\nvoid main(void)\n{\n    vec3 position = uViewAngles * (uAngles * aPoint.xyz + uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = aTexCoord;\n    vLightDot = dot(aLightNormal, uLightVec);\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform float uAmbientLight;\nuniform float uShadeLight;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvarying float vLightDot;\nvoid main(void)\n{\n    vec4 texture = texture2D(tTexture, vTexCoord);\n    gl_FragColor = vec4(texture.rgb * mix(1.0, vLightDot * uShadeLight + uAmbientLight, texture.a), 1.0);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.alias != null) _g.setReserved("alias",value); else _g.h["alias"] = value;
	}
	{
		var value1 = { vert : "uniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nuniform vec3 uScale;\nattribute vec3 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    vec3 position = uViewAngles * (aPoint * uScale * 18918.0);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = aPoint.xy * uScale.xy * 1.5;\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform vec2 uTime;\nuniform sampler2D tSolid;\nuniform sampler2D tAlpha;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    vec4 alpha = texture2D(tAlpha, vTexCoord + uTime.x);\n    gl_FragColor = vec4(mix(texture2D(tSolid, vTexCoord + uTime.y).rgb, alpha.rgb, alpha.a), 1.0);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.sky != null) _g.setReserved("sky",value1); else _g.h["sky"] = value1;
	}
	{
		var value2 = { vert : "uniform vec4 uRect;\nuniform mat4 uOrtho;\nattribute vec2 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_Position = uOrtho * vec4(uRect.xy + uRect.zw * aPoint.xy, 0.0, 1.0);\n    vTexCoord = aPoint;\n}\n", frag : "precision mediump float;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_FragColor = texture2D(tTexture, vTexCoord);\n}\n"};
		if(__map_reserved.pic != null) _g.setReserved("pic",value2); else _g.h["pic"] = value2;
	}
	{
		var value3 = { vert : "uniform vec4 uRect;\nuniform mat4 uOrtho;\nattribute vec2 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_Position = uOrtho * vec4(uRect.xy + uRect.zw * aPoint.xy, 0.0, 1.0);\n    vTexCoord = aPoint;\n}\n", frag : "precision mediump float;\nuniform vec3 uTop;\nuniform vec3 uBottom;\nuniform sampler2D tTexture;\nuniform sampler2D tTrans;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    vec4 texture = texture2D(tTexture, vTexCoord);\n    vec4 trans = texture2D(tTrans, vTexCoord);\n    gl_FragColor = vec4(mix(mix(texture.rgb, uTop * (1.0 / 191.25) * trans.x, trans.y), uBottom * (1.0 / 191.25) * trans.z, trans.w), texture.a);\n}\n"};
		if(__map_reserved.picTranslate != null) _g.setReserved("picTranslate",value3); else _g.h["picTranslate"] = value3;
	}
	{
		var value4 = { vert : "uniform vec4 uRect;\nuniform vec3 uOrigin;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nattribute vec2 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    vec2 point = uRect.xy + uRect.zw * aPoint;\n    vec3 position = vec3(point.x, 0.0, point.y) + uViewAngles * (uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = vec2(aPoint.x, -aPoint.y);\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_FragColor = texture2D(tTexture, vTexCoord);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.sprite != null) _g.setReserved("sprite",value4); else _g.h["sprite"] = value4;
	}
	{
		var value5 = { vert : "uniform vec3 uOrigin;\nuniform mat3 uAngles;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nattribute vec3 aPoint;\nattribute vec2 aTexCoord;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    vec3 position = uViewAngles * (uAngles * aPoint + uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = aTexCoord;\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform float uTime;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_FragColor = vec4(texture2D(tTexture, vTexCoord + vec2(sin(vTexCoord.t * 3.141593 + uTime), sin(vTexCoord.s * 3.141593 + uTime)) * 0.125).rgb, 1.0);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.turbulent != null) _g.setReserved("turbulent",value5); else _g.h["turbulent"] = value5;
	}
	{
		var value6 = { vert : "uniform vec4 uRect;\nuniform mat4 uOrtho;\nattribute vec2 aPoint;\nvoid main(void)\n{\n    gl_Position = uOrtho * vec4(uRect.xy + uRect.zw * aPoint, 0.0, 1.0);\n}\n", frag : "precision mediump float;\nuniform vec4 uColor;\nvoid main(void)\n{\n    gl_FragColor = vec4(uColor.rgb * (1.0 / 255.0), uColor.a);\n}\n"};
		if(__map_reserved.fill != null) _g.setReserved("fill",value6); else _g.h["fill"] = value6;
	}
	{
		var value7 = { vert : "uniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nattribute vec3 aPoint;\nvoid main(void)\n{\n    vec3 position = uViewAngles * (aPoint - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n}\n", frag : "precision mediump float;\nvoid main(void)\n{\n}\n"};
		if(__map_reserved.skyChain != null) _g.setReserved("skyChain",value7); else _g.h["skyChain"] = value7;
	}
	{
		var value8 = { vert : "uniform vec3 uOrigin;\nuniform mat3 uAngles;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nuniform vec3 uLightVec;\nattribute vec3 aPoint;\nattribute vec3 aLightNormal;\nattribute vec2 aTexCoord;\nvarying vec2 vTexCoord;\nvarying float vLightDot;\nvoid main(void)\n{\n    vec3 position = uViewAngles * (uAngles * aPoint.xyz + uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = aTexCoord;\n    vLightDot = dot(aLightNormal, uLightVec);\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform float uAmbientLight;\nuniform float uShadeLight;\nuniform vec3 uTop;\nuniform vec3 uBottom;\nuniform sampler2D tTexture;\nuniform sampler2D tPlayer;\nvarying vec2 vTexCoord;\nvarying float vLightDot;\nvoid main(void)\n{\n    vec4 texture = texture2D(tTexture, vTexCoord);\n    vec4 player = texture2D(tPlayer, vTexCoord);\n    gl_FragColor = vec4(\n        mix(mix(texture.rgb, uTop * (1.0 / 191.25) * player.x, player.y), uBottom * (1.0 / 191.25) * player.z, player.w)\n        * mix(1.0, vLightDot * uShadeLight + uAmbientLight, texture.a), 1.0);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.player != null) _g.setReserved("player",value8); else _g.h["player"] = value8;
	}
	{
		var value9 = { vert : "uniform vec4 uRect;\nuniform vec3 uOrigin;\nuniform mat3 uAngles;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nattribute vec2 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    vec2 point = uRect.xy + uRect.zw * aPoint;\n    vec3 position = uViewAngles * (uAngles * vec3(point.x, 0.0, point.y) + uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = vec2(aPoint.x, -aPoint.y);\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_FragColor = texture2D(tTexture, vTexCoord);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.spriteOriented != null) _g.setReserved("spriteOriented",value9); else _g.h["spriteOriented"] = value9;
	}
	{
		var value10 = { vert : "uniform vec2 uCharacter;\nuniform vec2 uDest;\nuniform mat4 uOrtho;\nattribute vec2 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_Position = uOrtho * vec4(aPoint * 8.0 + uDest, 0.0, 1.0);\n    vTexCoord = (aPoint + uCharacter) * 0.0625;\n}\n", frag : "precision mediump float;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_FragColor = texture2D(tTexture, vTexCoord);\n}\n"};
		if(__map_reserved.character != null) _g.setReserved("character",value10); else _g.h["character"] = value10;
	}
	{
		var value11 = { vert : "uniform vec3 uOrigin;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nuniform float uScale;\nattribute vec2 aPoint;\nvarying vec2 vCoord;\nvoid main(void)\n{\n    vec2 point = (aPoint - 0.5) * uScale;\n    vec3 position = vec3(point.x, 0.0, point.y) + uViewAngles * (uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vCoord = vec2(aPoint.x - 0.5, 0.5 - aPoint.y) * 2.0;\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform vec3 uColor;\nvarying vec2 vCoord;\nvoid main(void)\n{\n    gl_FragColor = vec4(uColor * (1.0 / 255.0), 1.0 - smoothstep(0.75, 1.0, length(vCoord)));\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}\n"};
		if(__map_reserved.particle != null) _g.setReserved("particle",value11); else _g.h["particle"] = value11;
	}
	{
		var value12 = { vert : "uniform vec3 uOrigin;\nuniform mat3 uAngles;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nattribute vec3 aPoint;\nattribute vec4 aTexCoord;\nattribute vec4 aLightStyle;\nvarying vec4 vTexCoord;\nvarying vec4 vLightStyle;\nvoid main(void)\n{\n    vec3 position = uViewAngles * (uAngles * aPoint + uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vTexCoord = aTexCoord;\n    vLightStyle = aLightStyle;\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nuniform sampler2D tTexture;\nuniform sampler2D tLightmap;\nuniform sampler2D tDlight;\nuniform sampler2D tLightStyle;\nvarying vec4 vTexCoord;\nvarying vec4 vLightStyle;\nvoid main(void)\n{\n    vec4 texture = texture2D(tTexture, vTexCoord.xy);\n    gl_FragColor = vec4(texture.rgb *\n        mix(1.0, dot(texture2D(tLightmap, vTexCoord.zw), vec4(\n            texture2D(tLightStyle, vec2(vLightStyle.x, 0.0)).a,\n            texture2D(tLightStyle, vec2(vLightStyle.y, 0.0)).a,\n            texture2D(tLightStyle, vec2(vLightStyle.z, 0.0)).a,\n            texture2D(tLightStyle, vec2(vLightStyle.w, 0.0)).a)\n        * 43.828125) + texture2D(tDlight, vTexCoord.zw).a, texture.a), 1.0);\n    gl_FragColor.r = pow(gl_FragColor.r, uGamma);\n    gl_FragColor.g = pow(gl_FragColor.g, uGamma);\n    gl_FragColor.b = pow(gl_FragColor.b, uGamma);\n}"};
		if(__map_reserved.brush != null) _g.setReserved("brush",value12); else _g.h["brush"] = value12;
	}
	{
		var value13 = { vert : "uniform vec3 uOrigin;\nuniform vec3 uViewOrigin;\nuniform mat3 uViewAngles;\nuniform mat4 uPerspective;\nuniform float uRadius;\nattribute vec3 aPoint;\nvarying float vAlpha;\nvoid main(void)\n{\n    vec3 position = aPoint * 0.35 * uRadius + uViewAngles * (uOrigin - uViewOrigin);\n    gl_Position = uPerspective * vec4(position.xz, -position.y, 1.0);\n    vAlpha = aPoint.y * -0.2;\n}\n", frag : "precision mediump float;\nuniform float uGamma;\nvarying float vAlpha;\nvoid main(void)\n{\n    gl_FragColor = vec4(pow(1.0, uGamma), pow(0.5, uGamma), 0.0, vAlpha);\n}\n"};
		if(__map_reserved.dlight != null) _g.setReserved("dlight",value13); else _g.h["dlight"] = value13;
	}
	{
		var value14 = { vert : "uniform vec4 uRect;\nuniform mat4 uOrtho;\nattribute vec2 aPoint;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_Position = uOrtho * vec4(uRect.x + uRect.z * aPoint.x, uRect.y + uRect.w * aPoint.y, 0.0, 1.0);\n    vTexCoord = vec2(aPoint.x, 1.0 - aPoint.y);\n}\n", frag : "precision mediump float;\nuniform float uTime;\nuniform sampler2D tTexture;\nvarying vec2 vTexCoord;\nvoid main(void)\n{\n    gl_FragColor = texture2D(tTexture, vTexCoord + vec2(sin(vTexCoord.t * 15.70796 + uTime) * 0.003125, sin(vTexCoord.s * 9.817477 + uTime) * 0.005));\n}\n"};
		if(__map_reserved.warp != null) _g.setReserved("warp",value14); else _g.h["warp"] = value14;
	}
	$r = _g;
	return $r;
}(this));
quake_V.cshift_empty = [130.0,80.0,50.0,0.0];
quake_V.cshift_water = [130.0,80.0,50.0,128.0];
quake_V.cshift_slime = [0.0,25.0,5.0,150.0];
quake_V.cshift_lava = [255.0,80.0,0.0,150.0];
quake_V.blend = [0.0,0.0,0.0,0.0];
quake_V.oldz = 0.0;
quake_V.dmg_time = 0.0;
quake_W.lumps = new haxe_ds_StringMap();
quake_Sys.main();
})();
