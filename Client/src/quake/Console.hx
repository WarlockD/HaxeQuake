package quake;

@:publicFields
private class ConsoleEntry {
    var text:String;
    var time:Float;
    inline function new(s, t) {
        text = s;
        time = t;
    }
}

@:expose("Con")
@:publicFields
class Console {
    static var debuglog:Bool;
    static var backscroll = 0;
    static var current = 0;
    static var vislines:Int;
    static var text:Array<ConsoleEntry> = [];
    static var sfx_talk:Dynamic;
    static var notifytime:Cvar;
    static var forcedup:Bool;

    static function ToggleConsole_f():Void {
        SCR.EndLoadingPlaque();
        if (Key.dest.value == Key.dest.console) {
            if ((untyped CL).cls.state != (untyped CL).active.connected) {
                (untyped M).Menu_Main_f();
                return;
            }
            Key.dest.value = Key.dest.game;
            Key.edit_line = '';
            Key.history_line = Key.lines.length;
            return;
        }
        Key.dest.value = Key.dest.console;
    }

    static function Clear_f():Void {
        backscroll = 0;
        current = 0;
        text = [];
    }

    static function ClearNotify():Void {
        var i = text.length - 4;
        for (i in (i < 0 ? 0 : i)...text.length)
            text[i].time = 0.0;
    }

    static function MessageMode_f():Void {
        Key.dest.value = Key.dest.message;
        Key.team_message = false;
    }

    static function MessageMode2_f():Void {
        Key.dest.value = Key.dest.message;
        Key.team_message = true;
    }

    static function Init():Void {
        debuglog = (COM.CheckParm('-condebug') != null);
        if (debuglog)
            COM.WriteTextFile('qconsole.log', '');
        Print('Console initialized.\n');

        notifytime = Cvar.RegisterVariable('con_notifytime', '3');
        Cmd.AddCommand('toggleconsole', ToggleConsole_f);
        Cmd.AddCommand('messagemode', MessageMode_f);
        Cmd.AddCommand('messagemode2', MessageMode2_f);
        Cmd.AddCommand('clear', Clear_f);
    }

    static function Print(msg:String):Void {
        if (debuglog) {
            var data:String = COM.LoadTextFile('qconsole.log');
            if (data != null) {
                data += msg;
                if (data.length >= 32768)
                    data = data.substring(data.length - 16384);
                COM.WriteTextFile('qconsole.log', data);
            }
        }

        backscroll = 0;

        var mask = 0;
        if (msg.charCodeAt(0) <= 2) {
            mask = 128;
            if (msg.charCodeAt(0) == 1)
                S.LocalSound(sfx_talk);
            msg = msg.substring(1);
        }
        for (i in 0...msg.length) {
            if (text[current] == null)
                text[current] = new ConsoleEntry("", (untyped Host).realtime);
            if (msg.charCodeAt(i) == 10) {
                if (text.length >= 1024) {
                    text = text.slice(-512);
                    current = text.length;
                } else {
                    current++;
                }
                continue;
            }
            text[current].text += String.fromCharCode(msg.charCodeAt(i) + mask);
        }
    }

    static function DPrint(msg:String):Void {
        if ((untyped Host).developer.value != 0)
            Print(msg);
    }

    static function DrawInput():Void {
        if ((Key.dest.value != Key.dest.console) && (forcedup != true))
            return;
        var text = ']' + Key.edit_line + String.fromCharCode(10 + (Std.int((untyped Host).realtime * 4.0) & 1));
        var width = (VID.width >> 3) - 2;
        if (text.length >= width)
            text = text.substring(1 + text.length - width);
        Draw.String(8, vislines - 16, text);
    }

    static function DrawNotify():Void {
        var width = (VID.width >> 3) - 2;
        var i = text.length - 4, v = 0;
        for (i in (i < 0 ? 0 : i)...text.length) {
            if (((untyped Host).realtime - text[i].time) > notifytime.value)
                continue;
            Draw.String(8, v, text[i].text.substring(0, width));
            v += 8;
        }
        if (Key.dest.value == Key.dest.message)
            Draw.String(8, v, 'say: ' + Key.chat_buffer + String.fromCharCode(10 + (Std.int((untyped Host).realtime * 4.0) & 1)));
    }

    static function DrawConsole(lines:Int):Void {
        if (lines <= 0)
            return;
        lines = Math.floor(lines * VID.height * 0.005);
        Draw.ConsoleBackground(lines);
        vislines = lines;
        var width = (VID.width >> 3) - 2;
        var y = lines - 16;
        var i = text.length - 1 - backscroll;
        while (i >= 0) {
            if (text[i].text.length == 0)
                y -= 8;
            else
                y -= Math.ceil(text[i].text.length / width) << 3;
            --i;
            if (y <= 0)
                break;
        }
        for (i in (i + 1)...(text.length - backscroll)) {
            var txt = text[i].text;
            var rows = Math.ceil(txt.length / width);
            if (rows == 0) {
                y += 8;
                continue;
            }
            for (j in 0...rows) {
                Draw.String(8, y, txt.substr(j * width, width));
                y += 8;
            }
        }
        DrawInput();
    }
}