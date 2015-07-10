package quake;

import quake.Draw.DrawPic;
import quake.Def.ClientStat;

@:publicFields
class Sbar {
	static var nums:Array<Array<DrawPic>>;
	static var colon:DrawPic;
	static var slash:DrawPic;
	static var weapons:Array<Array<DrawPic>>;
	static var faces:Array<Array<DrawPic>>;
	static var h_weapons:Array<Array<DrawPic>>;
	static var r_invbar:Array<DrawPic>;
	static var r_weapons:Array<DrawPic>;
	static var r_items:Array<DrawPic>;
	static var r_ammo:Array<DrawPic>;
	static var sigil:Array<DrawPic>;
	static var items:Array<DrawPic>;
	static var ammo:Array<DrawPic>;
	static var armor:Array<DrawPic>;
	static var h_items:Array<DrawPic>;
	static var ibar:DrawPic;
	static var ranking:DrawPic;
	static var complete:DrawPic;
	static var inter:DrawPic;
	static var finale:DrawPic;
	static var disc:DrawPic;
	static var sbar:DrawPic;
	static var scorebar:DrawPic;
	static var r_teambord:DrawPic;
	static var face_invis_invuln:DrawPic;
	static var face_invis:DrawPic;
	static var face_invuln:DrawPic;
	static var face_quad:DrawPic;
	static var fragsort:Array<Int> = [];
	static var hipweapons:Array<Int>;
	static var lines:Int;
	static var scoreboardlines:Int;
	static var showscores = false;

	static inline function ShowScores() {
		Sbar.showscores = true;
	}

	static inline function DontShowScores() {
		Sbar.showscores = false;
	}

	static function Init() {
		Sbar.nums = [[], []];
		for (i in 0...10) {
			Sbar.nums[0][i] = Draw.PicFromWad('NUM_' + i);
			Sbar.nums[1][i] = Draw.PicFromWad('ANUM_' + i);
		}
		Sbar.nums[0][10] = Draw.PicFromWad('NUM_MINUS');
		Sbar.nums[1][10] = Draw.PicFromWad('ANUM_MINUS');
		Sbar.colon = Draw.PicFromWad('NUM_COLON');
		Sbar.slash = Draw.PicFromWad('NUM_SLASH');

		Sbar.weapons = [
			[
				Draw.PicFromWad('INV_SHOTGUN'),
				Draw.PicFromWad('INV_SSHOTGUN'),
				Draw.PicFromWad('INV_NAILGUN'),
				Draw.PicFromWad('INV_SNAILGUN'),
				Draw.PicFromWad('INV_RLAUNCH'),
				Draw.PicFromWad('INV_SRLAUNCH'),
				Draw.PicFromWad('INV_LIGHTNG')
			],
			[
				Draw.PicFromWad('INV2_SHOTGUN'),
				Draw.PicFromWad('INV2_SSHOTGUN'),
				Draw.PicFromWad('INV2_NAILGUN'),
				Draw.PicFromWad('INV2_SNAILGUN'),
				Draw.PicFromWad('INV2_RLAUNCH'),
				Draw.PicFromWad('INV2_SRLAUNCH'),
				Draw.PicFromWad('INV2_LIGHTNG')
			]
		];
		for (i in 0...5) {
			Sbar.weapons[2 + i] = [
				Draw.PicFromWad('INVA' + (i + 1) + '_SHOTGUN'),
				Draw.PicFromWad('INVA' + (i + 1) + '_SSHOTGUN'),
				Draw.PicFromWad('INVA' + (i + 1) + '_NAILGUN'),
				Draw.PicFromWad('INVA' + (i + 1) + '_SNAILGUN'),
				Draw.PicFromWad('INVA' + (i + 1) + '_RLAUNCH'),
				Draw.PicFromWad('INVA' + (i + 1) + '_SRLAUNCH'),
				Draw.PicFromWad('INVA' + (i + 1) + '_LIGHTNG')
			];
		}

		Sbar.ammo = [
			Draw.PicFromWad('SB_SHELLS'),
			Draw.PicFromWad('SB_NAILS'),
			Draw.PicFromWad('SB_ROCKET'),
			Draw.PicFromWad('SB_CELLS')
		];

		Sbar.armor = [
			Draw.PicFromWad('SB_ARMOR1'),
			Draw.PicFromWad('SB_ARMOR2'),
			Draw.PicFromWad('SB_ARMOR3')
		];

		Sbar.items = [
			Draw.PicFromWad('SB_KEY1'),
			Draw.PicFromWad('SB_KEY2'),
			Draw.PicFromWad('SB_INVIS'),
			Draw.PicFromWad('SB_INVULN'),
			Draw.PicFromWad('SB_SUIT'),
			Draw.PicFromWad('SB_QUAD')
		];

		Sbar.sigil = [
			Draw.PicFromWad('SB_SIGIL1'),
			Draw.PicFromWad('SB_SIGIL2'),
			Draw.PicFromWad('SB_SIGIL3'),
			Draw.PicFromWad('SB_SIGIL4')
		];

		Sbar.faces = [];
		for (i in 0...5) {
			Sbar.faces[i] = [
				Draw.PicFromWad('FACE' + (5 - i)),
				Draw.PicFromWad('FACE_P' + (5 - i))
			];
		}
		Sbar.face_invis = Draw.PicFromWad('FACE_INVIS');
		Sbar.face_invuln = Draw.PicFromWad('FACE_INVUL2');
		Sbar.face_invis_invuln = Draw.PicFromWad('FACE_INV2');
		Sbar.face_quad = Draw.PicFromWad('FACE_QUAD');

		Cmd.AddCommand('+showscores', Sbar.ShowScores);
		Cmd.AddCommand('-showscores', Sbar.DontShowScores);

		Sbar.sbar = Draw.PicFromWad('SBAR');
		Sbar.ibar = Draw.PicFromWad('IBAR');
		Sbar.scorebar = Draw.PicFromWad('SCOREBAR');

		Sbar.ranking = Draw.CachePic('ranking');
		Sbar.complete = Draw.CachePic('complete');
		Sbar.inter = Draw.CachePic('inter');
		Sbar.finale = Draw.CachePic('finale');

		Sbar.disc = Draw.PicFromWad('DISC');

		if (COM.hipnotic) {
			Sbar.h_weapons = [[
				Draw.PicFromWad('INV_LASER'),
				Draw.PicFromWad('INV_MJOLNIR'),
				Draw.PicFromWad('INV_GREN_PROX'),
				Draw.PicFromWad('INV_PROX_GREN'),
				Draw.PicFromWad('INV_PROX')
			],
			[
				Draw.PicFromWad('INV2_LASER'),
				Draw.PicFromWad('INV2_MJOLNIR'),
				Draw.PicFromWad('INV2_GREN_PROX'),
				Draw.PicFromWad('INV2_PROX_GREN'),
				Draw.PicFromWad('INV2_PROX')
			]];
			for (i in 0...5) {
				Sbar.h_weapons[2 + i] = [
					Draw.PicFromWad('INVA' + (i + 1) + '_LASER'),
					Draw.PicFromWad('INVA' + (i + 1) + '_MJOLNIR'),
					Draw.PicFromWad('INVA' + (i + 1) + '_GREN_PROX'),
					Draw.PicFromWad('INVA' + (i + 1) + '_PROX_GREN'),
					Draw.PicFromWad('INVA' + (i + 1) + '_PROX')
				];
			}
			Sbar.hipweapons = [Def.hit.laser_cannon_bit, Def.hit.mjolnir_bit, 4, Def.hit.proximity_gun_bit];
			Sbar.h_items = [
				Draw.PicFromWad('SB_WSUIT'),
				Draw.PicFromWad('SB_ESHLD')
			];
		}
		else if (COM.rogue) {
			Sbar.r_invbar = [
				Draw.PicFromWad('R_INVBAR1'),
				Draw.PicFromWad('R_INVBAR2')
			];
			Sbar.r_weapons = [
				Draw.PicFromWad('R_LAVA'),
				Draw.PicFromWad('R_SUPERLAVA'),
				Draw.PicFromWad('R_GREN'),
				Draw.PicFromWad('R_MULTIROCK'),
				Draw.PicFromWad('R_PLASMA')
			];
			Sbar.r_items = [
				Draw.PicFromWad('R_SHIELD1'),
				Draw.PicFromWad('R_AGRAV1')
			];
			Sbar.r_teambord = Draw.PicFromWad('R_TEAMBORD');
			Sbar.r_ammo = [
				Draw.PicFromWad('R_AMMOLAVA'),
				Draw.PicFromWad('R_AMMOMULTI'),
				Draw.PicFromWad('R_AMMOPLASMA')
			];
		}
	}

	static function DrawPic(x, y, pic) {
		if (CL.state.gametype == 1)
			Draw.Pic(x, y + VID.height - 24, pic);
		else
			Draw.Pic(x + (VID.width >> 1) - 160, y + VID.height - 24, pic);
	}

	static function DrawCharacter(x, y, num) {
		if (CL.state.gametype == 1)
			Draw.Character(x + 4, y + VID.height - 24, num);
		else
			Draw.Character(x + (VID.width >> 1) - 156, y + VID.height - 24, num);
	}

	static function DrawString(x:Int, y:Int, str:String):Void {
		if (CL.state.gametype == 1)
			Draw.String(x, y + VID.height - 24, str);
		else
			Draw.String(x + (VID.width >> 1) - 160, y + VID.height - 24, str);
	}

	static function DrawNum(x:Int, y:Int, num:Int, digits:Int, color:Int):Void {
		var str = Std.string(num);
		if (str.length > digits)
			str = str.substring(str.length - digits, str.length);
		else if (str.length < digits)
			x += (digits - str.length) * 24;
		for (i in 0...str.length) {
			var frame = str.charCodeAt(i);
			Sbar.DrawPic(x, y, Sbar.nums[color][frame == 45 ? 10 : frame - 48]);
			x += 24;
		}
	}

	static function SortFrags() {
		Sbar.scoreboardlines = 0;
		for (i in 0...CL.state.maxclients) {
			if (CL.state.scores[i].name.length != 0)
				Sbar.fragsort[Sbar.scoreboardlines++] = i;
		}
		for (i in 0...Sbar.scoreboardlines) {
			for (j in 0...(Sbar.scoreboardlines - 1 - i)) {
				if (CL.state.scores[Sbar.fragsort[j]].frags < CL.state.scores[Sbar.fragsort[j + 1]].frags) {
					var k = Sbar.fragsort[j];
					Sbar.fragsort[j] = Sbar.fragsort[j + 1];
					Sbar.fragsort[j + 1] = k;
				}
			}
		}
	}

	static function SoloScoreboard() {
		var str;

		Sbar.DrawString(8, 4, 'Monsters:    /');
		str = Std.string(CL.state.stats[ClientStat.monsters]);
		Sbar.DrawString(104 - (str.length << 3), 4, str);
		str = Std.string(CL.state.stats[ClientStat.totalmonsters]);
		Sbar.DrawString(144 - (str.length << 3), 4, str);

		Sbar.DrawString(8, 12, 'Secrets :    /');
		str = Std.string(CL.state.stats[ClientStat.secrets]);
		Sbar.DrawString(104 - (str.length << 3), 12, str);
		str = Std.string(CL.state.stats[ClientStat.totalsecrets]);
		Sbar.DrawString(144 - (str.length << 3), 12, str);

		var minutes = Math.floor(CL.state.time / 60.0);
		var seconds = Math.floor(CL.state.time - 60 * minutes);
		var tens = Math.floor(seconds / 10.0);
		str = Std.string((seconds - 10 * tens));
		Sbar.DrawString(184, 4, 'Time :   :' + tens + str);
		str = Std.string(minutes);
		Sbar.DrawString(256 - (str.length << 3), 4, str);

		Sbar.DrawString(232 - (CL.state.levelname.length << 2), 12, CL.state.levelname);
	}

	static function DrawInventory() {
		if (COM.rogue)
			Sbar.DrawPic(0, -24, Sbar.r_invbar[CL.state.stats[ClientStat.activeweapon] >= Def.rit.lava_nailgun ? 0 : 1]);
		else
			Sbar.DrawPic(0, -24, Sbar.ibar);

		var flashon;
		for (i in 0...7) {
			if ((CL.state.items & (Def.it.shotgun << i)) == 0)
				continue;
			flashon = Math.floor((CL.state.time - CL.state.item_gettime[i]) * 10.0);
			if (flashon >= 10)
				flashon = CL.state.stats[ClientStat.activeweapon] == (Def.it.shotgun << i) ? 1 : 0;
			else
				flashon = (flashon % 5) + 2;
			Sbar.DrawPic(i * 24, -16, Sbar.weapons[flashon][i]);
		}
		if (COM.hipnotic) {
			var grenadeflashing = false;
			for (i in 0...4) {
				if ((CL.state.items & (1 << Sbar.hipweapons[i])) != 0) {
					flashon = Math.floor((CL.state.time - CL.state.item_gettime[i]) * 10.0);
					if (flashon >= 10)
						flashon = CL.state.stats[ClientStat.activeweapon] == (1 << Sbar.hipweapons[i]) ? 1 : 0;
					else
						flashon = (flashon % 5) + 2;

					if (i == 2) {
						if (((CL.state.items & Def.hit.proximity_gun) != 0) && (flashon != 0)) {
							grenadeflashing = true;
							Sbar.DrawPic(96, -16, Sbar.h_weapons[flashon][2]);
						}
					}
					else if (i == 3) {
						if ((CL.state.items & Def.it.grenade_launcher) != 0) {
							if (!grenadeflashing)
								Sbar.DrawPic(96, -16, Sbar.h_weapons[flashon][3]);
						}
						else
							Sbar.DrawPic(96, -16, Sbar.h_weapons[flashon][4]);
					}
					else
						Sbar.DrawPic(176 + i * 24, -16, Sbar.h_weapons[flashon][i]);
				}
			}
		}
		else if (COM.rogue) {
			if (CL.state.stats[ClientStat.activeweapon] >= Def.rit.lava_nailgun) {
				for (i in 0...5) {
					if (CL.state.stats[ClientStat.activeweapon] == (Def.rit.lava_nailgun << i))
						Sbar.DrawPic((i + 2) * 24, -16, Sbar.r_weapons[i]);
				}
			}
		}

		for (i in 0...4) {
			var num = Std.string(CL.state.stats[ClientStat.shells + i]);
			switch (num.length) {
			case 1:
				Sbar.DrawCharacter(((6 * i + 3) << 3) - 2, -24, num.charCodeAt(0) - 30);
				continue;
			case 2:
				Sbar.DrawCharacter(((6 * i + 2) << 3) - 2, -24, num.charCodeAt(0) - 30);
				Sbar.DrawCharacter(((6 * i + 3) << 3) - 2, -24, num.charCodeAt(1) - 30);
				continue;
			case 3:
				Sbar.DrawCharacter(((6 * i + 1) << 3) - 2, -24, num.charCodeAt(0) - 30);
				Sbar.DrawCharacter(((6 * i + 2) << 3) - 2, -24, num.charCodeAt(1) - 30);
				Sbar.DrawCharacter(((6 * i + 3) << 3) - 2, -24, num.charCodeAt(2) - 30);
			}
		}

		if (COM.hipnotic) {
			for (i in 2...6) {
				if ((CL.state.items & (1 << (17 + i))) != 0)
					Sbar.DrawPic(192 + (i << 4), -16, Sbar.items[i]);
			}
			if ((CL.state.items & 16777216) != 0)
				Sbar.DrawPic(288, -16, Sbar.h_items[0]);
			if ((CL.state.items & 33554432) != 0)
				Sbar.DrawPic(304, -16, Sbar.h_items[1]);
		}
		else
		{
			for (i in 0...6) {
				if ((CL.state.items & (1 << (17 + i))) != 0)
					Sbar.DrawPic(192 + (i << 4), -16, Sbar.items[i]);
			}
			if (COM.rogue) {
				if ((CL.state.items & 536870912) != 0)
					Sbar.DrawPic(288, -16, Sbar.r_items[0]);
				if ((CL.state.items & 1073741824) != 0)
					Sbar.DrawPic(304, -16, Sbar.r_items[1]);
			}
			else
			{
				for (i in 0...4) {
					if (((CL.state.items >>> (28 + i)) & 1) != 0)
						Sbar.DrawPic(288 + (i << 3), -16, Sbar.sigil[i]);
				}
			}
		}
	}

	static function DrawFrags() {
		Sbar.SortFrags();
		var l = Sbar.scoreboardlines <= 4 ? Sbar.scoreboardlines : 4;
		var x = 23;
		var xofs = CL.state.gametype == 1 ? 10 : (VID.width >> 1) - 150;
		var y = VID.height - 47;
		for (i in 0...l) {
			var k = Sbar.fragsort[i];
			var s = CL.state.scores[k];
			if (s.name.length == 0)
				continue;
			Draw.Fill(xofs + (x << 3), y, 28, 4, (s.colors & 0xf0) + 8);
			Draw.Fill(xofs + (x << 3), y + 4, 28, 3, ((s.colors & 0xf) << 4) + 8);
			var num = Std.string(s.frags);
			Sbar.DrawString(((x - num.length) << 3) + 36, -24, num);
			if (k == (CL.state.viewentity - 1)) {
				Sbar.DrawCharacter((x << 3) + 2, -24, 16);
				Sbar.DrawCharacter((x << 3) + 28, -24, 17);
			}
			x += 4;
		}
	}

	static function DrawFace() {
		if ((COM.rogue) && (CL.state.maxclients != 1) && (Host.teamplay.value >= 4) && (Host.teamplay.value <= 6)) {
			var s = CL.state.scores[CL.state.viewentity - 1];
			var top = (s.colors & 0xf0) + 8;
			var xofs = CL.state.gametype == 1 ? 113 : (VID.width >> 1) - 47;
			Sbar.DrawPic(112, 0, Sbar.r_teambord);
			Draw.Fill(xofs, VID.height - 21, 22, 9, top);
			Draw.Fill(xofs, VID.height - 12, 22, 9, ((s.colors & 0xf) << 4) + 8);
			var num = (top == 8 ? '\076\076\076' : '   ') + s.frags;
			if (num.length > 3)
				num = num.substring(num.length - 3);
			if (top == 8) {
				Sbar.DrawCharacter(109, 3, num.charCodeAt(0) - 30);
				Sbar.DrawCharacter(116, 3, num.charCodeAt(1) - 30);
				Sbar.DrawCharacter(123, 3, num.charCodeAt(2) - 30);
			}
			else
			{
				Sbar.DrawCharacter(109, 3, num.charCodeAt(0));
				Sbar.DrawCharacter(116, 3, num.charCodeAt(1));
				Sbar.DrawCharacter(123, 3, num.charCodeAt(2));
			}
			return;
		}

		if ((CL.state.items & (Def.it.invisibility + Def.it.invulnerability)) == (Def.it.invisibility + Def.it.invulnerability)) {
			Sbar.DrawPic(112, 0, Sbar.face_invis_invuln);
			return;
		}
		if ((CL.state.items & Def.it.quad) != 0) {
			Sbar.DrawPic(112, 0, Sbar.face_quad);
			return;
		}
		if ((CL.state.items & Def.it.invisibility) != 0) {
			Sbar.DrawPic(112, 0, Sbar.face_invis);
			return;
		}
		if ((CL.state.items & Def.it.invulnerability) != 0) {
			Sbar.DrawPic(112, 0, Sbar.face_invuln);
			return;
		}
		Sbar.DrawPic(112, 0, Sbar.faces[CL.state.stats[ClientStat.health] >= 100.0 ? 4 : Math.floor(CL.state.stats[ClientStat.health] / 20.0)][CL.state.time <= CL.state.faceanimtime ? 1 : 0]);
	}

	static function DrawSbar() {
		if (SCR.con_current >= 200)
			return;

		if (Sbar.lines > 24) {
			Sbar.DrawInventory();
			if (CL.state.maxclients != 1)
				Sbar.DrawFrags();
		}

		if ((Sbar.showscores) || (CL.state.stats[ClientStat.health] <= 0)) {
			Sbar.DrawPic(0, 0, Sbar.scorebar);
			Sbar.SoloScoreboard();
			if (CL.state.gametype == 1)
				Sbar.DeathmatchOverlay();
			return;
		}

		if (Sbar.lines == 0)
			return;

		Sbar.DrawPic(0, 0, Sbar.sbar);

		if (COM.hipnotic) {
			if ((CL.state.items & Def.it.key1) != 0)
				Sbar.DrawPic(209, 3, Sbar.items[0]);
			if ((CL.state.items & Def.it.key2) != 0)
				Sbar.DrawPic(209, 12, Sbar.items[1]);
		}

		var it = (COM.rogue) ? cast Def.rit : Def.it;

		if ((CL.state.items & Def.it.invulnerability) != 0) {
			Sbar.DrawNum(24, 0, 666, 3, 1);
			Sbar.DrawPic(0, 0, Sbar.disc);
		}
		else
		{
			Sbar.DrawNum(24, 0, CL.state.stats[ClientStat.armor], 3, CL.state.stats[ClientStat.armor] <= 25 ? 1 : 0);
			if ((CL.state.items & it.armor3) != 0)
				Sbar.DrawPic(0, 0, Sbar.armor[2]);
			else if ((CL.state.items & it.armor2) != 0)
				Sbar.DrawPic(0, 0, Sbar.armor[1]);
			else if ((CL.state.items & it.armor1) != 0)
				Sbar.DrawPic(0, 0, Sbar.armor[0]);
		}

		Sbar.DrawFace();

		Sbar.DrawNum(136, 0, CL.state.stats[ClientStat.health], 3, CL.state.stats[ClientStat.health] <= 25 ? 1 : 0);

		if ((CL.state.items & it.shells) != 0)
			Sbar.DrawPic(224, 0, Sbar.ammo[0]);
		else if ((CL.state.items & it.nails) != 0)
			Sbar.DrawPic(224, 0, Sbar.ammo[1]);
		else if ((CL.state.items & it.rockets) != 0)
			Sbar.DrawPic(224, 0, Sbar.ammo[2]);
		else if ((CL.state.items & it.cells) != 0)
			Sbar.DrawPic(224, 0, Sbar.ammo[3]);
		else if (COM.rogue) {
			if ((CL.state.items & Def.rit.lava_nails) != 0)
				Sbar.DrawPic(224, 0, Sbar.r_ammo[0]);
			else if ((CL.state.items & Def.rit.plasma_ammo) != 0)
				Sbar.DrawPic(224, 0, Sbar.r_ammo[1]);
			else if ((CL.state.items & Def.rit.multi_rockets) != 0)
				Sbar.DrawPic(224, 0, Sbar.r_ammo[2]);
		}
		Sbar.DrawNum(248, 0, CL.state.stats[ClientStat.ammo], 3, CL.state.stats[ClientStat.ammo] <= 10 ? 1 : 0);

		if ((VID.width >= 512) && (CL.state.gametype == 1))
			Sbar.MiniDeathmatchOverlay();
	}

	static function IntermissionNumber(x:Int, y:Int, num:Int):Void {
		var str = Std.string(num);
		if (str.length > 3)
			str = str.substring(str.length - 3, str.length);
		else if (str.length < 3)
			x += (3 - str.length) * 24;
		for (i in 0...str.length) {
			var frame = str.charCodeAt(i);
			Draw.Pic(x, y, Sbar.nums[0][frame == 45 ? 10 : frame - 48]);
			x += 24;
		}
	}

	static function DeathmatchOverlay() {
		Draw.Pic((VID.width - Sbar.ranking.width) >> 1, 8, Sbar.ranking);
		Sbar.SortFrags();

		var x = (VID.width >> 1) - 80, y = 40;
		for (i in 0...Sbar.scoreboardlines) {
			var s = CL.state.scores[Sbar.fragsort[i]];
			if (s.name.length == 0)
				continue;
			Draw.Fill(x, y, 40, 4, (s.colors & 0xf0) + 8);
			Draw.Fill(x, y + 4, 40, 4, ((s.colors & 0xf) << 4) + 8);
			var f = Std.string(s.frags);
			Draw.String(x + 32 - (f.length << 3), y, f);
			if (Sbar.fragsort[i] == (CL.state.viewentity - 1))
				Draw.Character(x - 8, y, 12);
			Draw.String(x + 64, y, s.name);
			y += 10;
		}
	}

	static function MiniDeathmatchOverlay():Void {
		Sbar.SortFrags();
		var l = Sbar.scoreboardlines;
		var y = VID.height - Sbar.lines;
		var numlines = Sbar.lines >> 3;
		var i;

		for (ii in 0...l) {
			i = ii;
			if (Sbar.fragsort[i] == (CL.state.viewentity - 1))
				break;
		}

		i = (i == l) ? 0 : i - (numlines >> 1);
		if (i > (l - numlines))
			i = l - numlines;
		if (i < 0)
			i = 0;

		while ((i < l) && (y < (VID.height - 8))) {
			var k = Sbar.fragsort[i++];
			var s = CL.state.scores[k];
			if (s.name.length == 0)
				continue;
			Draw.Fill(324, y + 1, 40, 3, (s.colors & 0xf0) + 8);
			Draw.Fill(324, y + 4, 40, 4, ((s.colors & 0xf) << 4) + 8);
			var num = Std.string(s.frags);
			Draw.String(356 - (num.length << 3), y, num);
			if (k == (CL.state.viewentity - 1)) {
				Draw.Character(324, y, 16);
				Draw.Character(356, y, 17);
			}
			Draw.String(372, y, s.name);
			y += 8;
		}
	}

	static function IntermissionOverlay():Void {
		if (CL.state.gametype == 1) {
			Sbar.DeathmatchOverlay();
			return;
		}
		Draw.Pic(64, 24, Sbar.complete);
		Draw.Pic(0, 56, Sbar.inter);

		var dig = Math.floor(CL.state.completed_time / 60.0);
		Sbar.IntermissionNumber(160, 64, dig);
		var num = Math.floor(CL.state.completed_time - dig * 60);
		Draw.Pic(234, 64, Sbar.colon);
		Draw.Pic(246, 64, Sbar.nums[0][Math.floor(num / 10)]);
		Draw.Pic(266, 64, Sbar.nums[0][Math.floor(num % 10)]);

		Sbar.IntermissionNumber(160, 104, CL.state.stats[ClientStat.secrets]);
		Draw.Pic(232, 104, Sbar.slash);
		Sbar.IntermissionNumber(240, 104, CL.state.stats[ClientStat.totalsecrets]);

		Sbar.IntermissionNumber(160, 144, CL.state.stats[ClientStat.monsters]);
		Draw.Pic(232, 144, Sbar.slash);
		Sbar.IntermissionNumber(240, 144, CL.state.stats[ClientStat.totalmonsters]);
	}

	static function FinaleOverlay() {
		Draw.Pic((VID.width - Sbar.finale.width) >> 1, 16, Sbar.finale);
	}
}
