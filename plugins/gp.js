const config = require('../config'),
  { cmd, commands } = require('../command'),
  {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
  } = require('../lib/functions'),
  _0x235552 = {}
_0x235552.pattern = 'joinrequests'
_0x235552.desc = 'Get list of participants who requested to join the group'
_0x235552.react = '\uD83D\uDCCB'
_0x235552.category = 'group'
_0x235552.filename = __filename
cmd(
  _0x235552,
  async (
    _0x5b8b98,
    _0x579956,
    _0x26fb5a,
    { from: _0x471f27, q: _0x13019d, reply: _0x1c66c5, isGroup: _0x5e5a60 }
  ) => {
    if (!_0x5e5a60) {
      return _0x1c66c5('This command can only be used in a group chat.')
    }
    try {
      const _0x18ce02 = _0x471f27
      console.log(
        'Attempting to fetch pending requests for group: ' + _0x18ce02
      )
      const _0x3fc152 = await _0x5b8b98.groupRequestParticipantsList(_0x18ce02)
      console.log(_0x3fc152)
      if (_0x3fc152.length > 0) {
        let _0x5986d5 = 'Pending Requests to Join the Group:\n',
          _0x429d94 = []
        _0x3fc152.forEach((_0x29ca31) => {
          const _0xf143db = _0x29ca31.jid
          _0x5986d5 += '\uD83D\uDE3B @' + _0xf143db.split('@')[0] + '\n'
          _0x429d94.push(_0xf143db)
        })
        const _0x3eb907 = {
          text: _0x5986d5,
          mentions: _0x429d94,
        }
        await _0x5b8b98.sendMessage(_0x471f27, _0x3eb907)
      } else {
        _0x1c66c5('No pending requests to join the group.')
      }
    } catch (_0x30dcbb) {
      console.error('Error fetching participant requests: ' + _0x30dcbb.message)
      _0x1c66c5(
        '\u26A0️ An error occurred while fetching the pending requests. Please try again later.'
      )
    }
  }
)
const _0x485005 = {}
_0x485005.pattern = 'allreq'
_0x485005.desc = 'Approve or reject all join requests'
_0x485005.react = '\u2705'
_0x485005.category = 'group'
_0x485005.filename = __filename
cmd(
  _0x485005,
  async (
    _0x141765,
    _0x55b1c7,
    _0x3a5d66,
    { from: _0x5cdfa0, reply: _0x1ac75e, isGroup: _0xfdbc64 }
  ) => {
    if (!_0xfdbc64) {
      return _0x1ac75e('This command can only be used in a group chat.')
    }
    const _0x86a5dd = _0x3a5d66.body.includes('approve') ? 'approve' : 'reject'
    try {
      const _0x57546d = await _0x141765.groupRequestParticipantsList(_0x5cdfa0)
      if (_0x57546d.length === 0) {
        return _0x1ac75e('There are no pending requests to manage.')
      }
      let _0x1f8372 = 'Pending Requests to Join the Group:\n',
        _0x4ce291 = [],
        _0x2ae4e5 = []
      _0x57546d.forEach((_0x5067ae) => {
        const _0xe46222 = _0x5067ae.jid
        _0x1f8372 += '\uD83D\uDE3B @' + _0xe46222.split('@')[0] + '\n'
        _0x4ce291.push(_0xe46222)
        _0x2ae4e5.push(_0xe46222)
      })
      const _0xf67c12 = {
        text: _0x1f8372,
        mentions: _0x4ce291,
      }
      await _0x141765.sendMessage(_0x5cdfa0, _0xf67c12)
      const _0x104a29 = await _0x141765.groupRequestParticipantsUpdate(
        _0x5cdfa0,
        _0x2ae4e5,
        _0x86a5dd
      )
      console.log(_0x104a29)
      _0x1ac75e('Successfully ' + _0x86a5dd + 'ed all join requests.')
    } catch (_0x5cf8b4) {
      console.error('Error updating participant requests: ' + _0x5cf8b4.message)
      _0x1ac75e(
        '\u26A0️ An error occurred while processing the request. Please try again later.'
      )
    }
  }
)
const WA_DEFAULT_EPHEMERAL_24H = 86400,
  WA_DEFAULT_EPHEMERAL_7D = 604800,
  WA_DEFAULT_EPHEMERAL_90D = 7776000,
  _0x3bcce0 = {}
_0x3bcce0.pattern = 'ephemeral'
_0x3bcce0.react = '\uD83C\uDF2A️'
_0x3bcce0.alias = ['dm']
_0x3bcce0.desc = 'Turn on/off disappearing messages.'
_0x3bcce0.category = 'main'
_0x3bcce0.filename = __filename
cmd(
  _0x3bcce0,
  async (
    _0x14cd7d,
    _0x58de23,
    _0xeb5c8a,
    {
      from: _0x51d9fe,
      isGroup: _0x5d53ec,
      isAdmins: _0x35da72,
      args: _0x27e2a6,
    }
  ) => {
    if (!_0x5d53ec) {
      const _0x25db3b = { text: 'This command can only be used in groups.' }
      await _0x14cd7d.sendMessage(_0x51d9fe, _0x25db3b)
      return
    }
    if (!_0x35da72) {
      const _0x58971f = {
        text: 'Only admins can turn on/off ephemeral messages.',
      }
      await _0x14cd7d.sendMessage(_0x51d9fe, _0x58971f)
      return
    }
    const _0x29a0fd = _0x27e2a6[0]
    if (_0x29a0fd === 'on') {
      const _0x3f586d = _0x27e2a6[1]
      let _0x4b8ee8
      switch (_0x3f586d) {
        case '24h':
          _0x4b8ee8 = WA_DEFAULT_EPHEMERAL_24H
          break
        case '7d':
          _0x4b8ee8 = WA_DEFAULT_EPHEMERAL_7D
          break
        case '90d':
          _0x4b8ee8 = WA_DEFAULT_EPHEMERAL_90D
          break
        default:
          const _0x341f97 = {}
          ;(_0x341f97.text = 'Invalid duration! Use `24h`, `7d`, or `90d`.'),
            await _0x14cd7d.sendMessage(_0x51d9fe, _0x341f97)
          return
      }
      const _0x2e9123 = { disappearingMessagesInChat: _0x4b8ee8 }
      await _0x14cd7d.sendMessage(_0x51d9fe, _0x2e9123)
      const _0x105f7c = {
        text: 'ephemeral messages are now ON for ' + _0x3f586d + '.',
      }
      await _0x14cd7d.sendMessage(_0x51d9fe, _0x105f7c)
    } else {
      if (_0x29a0fd === 'off') {
        await _0x14cd7d.sendMessage(_0x51d9fe, _0x1ef878)
        const _0x16f3c3 = { text: 'ephemeral messages are now OFF.' }
        await _0x14cd7d.sendMessage(_0x51d9fe, _0x16f3c3)
      } else {
        const _0x59aa2c = {
          text: 'Please use `!ephemeral on <duration>` or `!ephemeral off`.',
        }
        await _0x14cd7d.sendMessage(_0x51d9fe, _0x59aa2c)
      }
    }
  }
)
const _0x592aaf = {}
_0x592aaf.pattern = 'senddm'
_0x592aaf.react = '\uD83C\uDF2A️'
_0x592aaf.alias = ['senddisappear']
_0x592aaf.desc = 'Send a disappearing message.'
_0x592aaf.category = 'main'
_0x592aaf.filename = __filename
cmd(
  _0x592aaf,
  async (
    _0x24e41a,
    _0x5331c4,
    _0x33e2ba,
    {
      from: _0x4f89ca,
      isGroup: _0x59f4d0,
      isAdmins: _0x152adb,
      args: _0x21fdac,
    }
  ) => {
    if (!_0x59f4d0) {
      const _0x46d092 = { text: 'This command can only be used in groups.' }
      await _0x24e41a.sendMessage(_0x4f89ca, _0x46d092)
      return
    }
    if (!_0x21fdac.length) {
      const _0x494d9a = { text: 'Please provide a message to send.' }
      await _0x24e41a.sendMessage(_0x4f89ca, _0x494d9a)
      return
    }
    const _0x5977da = _0x21fdac.join(' '),
      _0xc333ac = { text: _0x5977da },
      _0x1dd7eb = { ephemeralExpiration: WA_DEFAULT_EPHEMERAL_7D }
    await _0x24e41a.sendMessage(_0x4f89ca, _0xc333ac, _0x1dd7eb)
  }
)
const _0x4f6b5b = {};
_0x4f6b5b.pattern = 'mute';
_0x4f6b5b.react = '\uD83D\uDD07';
_0x4f6b5b.alias = ['close', 'f_mute'];
_0x4f6b5b.desc = 'Change to group settings to only admins can send messages.';
_0x4f6b5b.category = 'group';
_0x4f6b5b.use = '.mute';
_0x4f6b5b.filename = __filename;

cmd(
  _0x4f6b5b,
  async (
    _0x193884,
    _0xdfb6a7,
    _0x35e852,
    {
      from: _0x5805b5,
      isGroup: _0x4a1a2e,
      sender: _0x5d8981,
      isOwner: _0x38f037,
      groupAdmins: _0x474af0,
      isBotAdmins: _0x4bb383,
      isAdmins: _0x33c86a,
      reply: _0x4be4af,
      pushname: _0x197397,
    }
  ) => {
    try {
      // Check if the command is used in a group
      if (!_0x4a1a2e) {
        return _0x4be4af('*❌ This command can only be used in groups.*');
      }

      // Check if the user is either the bot owner or a group admin
      if (!_0x38f037 && !_0x33c86a) {
        return _0x4be4af('*⚠️ Only group admins or the bot owner can use this command.*');
      }

      // Check if the bot is an admin
      if (!_0x4bb383) {
        return _0x4be4af('*⚠️ I need to be an admin to execute this command.*');
      }

      // Change group settings to "announcement" mode (only admins can send messages)
      await _0x193884.groupSettingUpdate(_0x5805b5, 'announcement');

      // Confirmation message
      const _0x5a8136 = {
        text: `*✅ The group has been closed by ${_0x197397}.* \uD83D\uDD07`,
      };
      await _0x193884.sendMessage(_0x5805b5, _0x5a8136, { quoted: _0xdfb6a7 });

    } catch (_0x3ea591) {
      console.log(_0x3ea591);
      _0x4be4af('*❌ An error occurred !*\n\n' + _0x3ea591);
    }
  }
);
const _0x87e572 = {};
_0x87e572.pattern = 'unmute';
_0x87e572.react = '\uD83D\uDD07';
_0x87e572.alias = ['open', 'f_unmute'];
_0x87e572.desc = 'Change group settings so all members can send messages.';
_0x87e572.category = 'group';
_0x87e572.use = '.unmute';
_0x87e572.filename = __filename;

cmd(
  _0x87e572,
  async (
    _0x97a574,
    _0x162fe0,
    _0x208e69,
    {
      from: _0x386502,
      isGroup: _0x2bc0e3,
      sender: _0x1bcd2,
      isOwner: _0x1a60a0,
      groupAdmins: _0x546444,
      isBotAdmins: _0x594032,
      isAdmins: _0x16d643,
      reply: _0x4f3966,
      pushname: _0x46fc7b,
    }
  ) => {
    try {
      // Check if the command is used in a group
      if (!_0x2bc0e3) {
        return _0x4f3966('*❌ This command can only be used in groups.*');
      }

      // Check if the user is either the bot owner or a group admin
      if (!_0x1a60a0 && !_0x16d643) {
        return _0x4f3966('*⚠️ Only group admins or the bot owner can use this command.*');
      }

      // Check if the bot is an admin
      if (!_0x594032) {
        return _0x4f3966('*⚠️ I need to be an admin to execute this command.*');
      }

      // Change group settings to "not_announcement" mode (all members can send messages)
      await _0x97a574.groupSettingUpdate(_0x386502, 'not_announcement');

      // Confirmation message
      const _0x1c80a9 = {
        text: `*✅ The group has been opened by ${_0x46fc7b}.* \uD83D\uDD07`,
      };
      await _0x97a574.sendMessage(_0x386502, _0x1c80a9, { quoted: _0x162fe0 });

    } catch (_0x5cb581) {
      console.log(_0x5cb581);
      _0x4f3966('*❌ An error occurred !*\n\n' + _0x5cb581);
    }
  }
);
const _0x2bff43 = {};
_0x2bff43.pattern = 'lockgc';
_0x2bff43.react = '\uD83D\uDD12';
_0x2bff43.alias = ['lockgsettings'];
_0x2bff43.desc = 'Restrict group settings so only admins can edit group info.';
_0x2bff43.category = 'group';
_0x2bff43.use = '.lockgs';
_0x2bff43.filename = __filename;

cmd(
  _0x2bff43,
  async (
    _0x39af62,
    _0x574944,
    _0x34e279,
    {
      from: _0x53bab2,
      isGroup: _0x1367d8,
      sender: _0x25f74c,
      isOwner: _0x31d1e4,
      isBotAdmins: _0x33709e,
      isAdmins: _0x558673,
      reply: _0x3f003e,
      pushname: _0x4c512a,
    }
  ) => {
    try {
      // Check if the command is used in a group
      if (!_0x1367d8) {
        return _0x3f003e('*❌ This command can only be used in groups.*');
      }

      // Check if the user is either the bot owner or a group admin
      if (!_0x31d1e4 && !_0x558673) {
        return _0x3f003e('*⚠️ Only group admins or the bot owner can use this command.*');
      }

      // Check if the bot is an admin
      if (!_0x33709e) {
        return _0x3f003e('*⚠️ I need to be an admin to execute this command.*');
      }

      // Lock group settings (only admins can edit group info)
      await _0x39af62.groupSettingUpdate(_0x53bab2, 'locked');

      // Confirmation message
      const _0x1bf42a = {
        text: `*✅ Group settings locked by ${_0x4c512a}.* 🔒`,
      };
      await _0x39af62.sendMessage(_0x53bab2, _0x1bf42a, { quoted: _0x574944 });

    } catch (_0x1cffcd) {
      console.log(_0x1cffcd);
      _0x3f003e('*❌ An error occurred !*\n\n' + _0x1cffcd);
    }
  }
);
const _0x285abb = {};
_0x285abb.pattern = 'unlockgc';
_0x285abb.react = '\uD83D\uDD13';
_0x285abb.alias = ['unlockgsettings'];
_0x285abb.desc = 'Allow all members to edit group info.';
_0x285abb.category = 'group';
_0x285abb.use = '.unlockgs';
_0x285abb.filename = __filename;

cmd(
  _0x285abb,
  async (
    _0x6860b1,
    _0x2820ba,
    _0x564bc5,
    {
      from: _0x545898,
      isGroup: _0x20af29,
      sender: _0x317e0a,
      isOwner: _0x2c6d55,
      isBotAdmins: _0x3fa063,
      isAdmins: _0x431ede,
      reply: _0x4fa538,
      pushname: _0x421718,
    }
  ) => {
    try {
      // Check if the command is used in a group
      if (!_0x20af29) {
        return _0x4fa538('*❌ This command can only be used in groups.*');
      }

      // Check if the user is either the bot owner or a group admin
      if (!_0x2c6d55 && !_0x431ede) {
        return _0x4fa538('*⚠️ Only group admins or the bot owner can use this command.*');
      }

      // Check if the bot is an admin
      if (!_0x3fa063) {
        return _0x4fa538('*⚠️ I need to be an admin to execute this command.*');
      }

      // Unlock group settings (allow all members to edit group info)
      await _0x6860b1.groupSettingUpdate(_0x545898, 'unlocked');

      // Confirmation message
      const _0x2ac39f = {
        text: `*✅ Group settings unlocked by ${_0x421718}.* 🔓`,
      };
      await _0x6860b1.sendMessage(_0x545898, _0x2ac39f, { quoted: _0x2820ba });

    } catch (_0x5ccce6) {
      console.log(_0x5ccce6);
      _0x4fa538('*❌ An error occurred !*\n\n' + _0x5ccce6);
    }
  }
);
const leaveCommand = {}
leaveCommand.pattern = 'leave'
leaveCommand.react = '\uD83D\uDD13'
leaveCommand.alias = ['left', 'kickme', 'f_leave', 'f_left', 'f-left']
leaveCommand.desc = 'To leave from the group'
leaveCommand.category = 'group'
leaveCommand.use = '.leave'
leaveCommand.filename = __filename
cmd(
  leaveCommand,
  async (
    _0x276fea,
    _0x52f709,
    _0x3039f8,
    {
      from: _0x2d0c4c,
      isGroup: _0x170c69,
      isOwner: _0x55fcd9,
      reply: _0x2b5862,
    }
  ) => {
    try {
      const _0x28aa31 = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg
      if (!_0x170c69) {
        return _0x2b5862('*\u274C This command can only be used in a group!*')
      }
      if (!_0x55fcd9) {
        return _0x2b5862('*\u274C Only the bot owner can use this command!*')
      }
      await _0x276fea.sendMessage(
        _0x2d0c4c,
        { text: '*Good Bye All* \uD83D\uDC4B\uD83C\uDFFB' },
        { quoted: _0x52f709 }
      )
      await _0x276fea.groupLeave(_0x2d0c4c)
    } catch (_0x58b77c) {
      await _0x276fea.sendMessage(_0x2d0c4c, {
        react: {
          text: '\u274C',
          key: _0x52f709.key,
        },
      })
      console.log(_0x58b77c)
      _0x2b5862('\u274C *An error occurred !!*\n\n' + _0x58b77c)
    }
  }
)
const _0x293215 = {};
_0x293215.pattern = 'updategname';
_0x293215.react = '\uD83D\uDD13';
_0x293215.alias = ['upgname', 'gname'];
_0x293215.desc = 'Change the group name.';
_0x293215.category = 'group';
_0x293215.use = '.updategname';
_0x293215.filename = __filename;

cmd(
  _0x293215,
  async (
    _0x3cc9bb,
    _0x13253d,
    _0x196e66,
    {
      from: _0x343dd4,
      isGroup: _0xf83eb5,
      sender: _0x50478f,
      isAdmins: _0x163a9a,
      isBotAdmins: _0x3f6f99,
      reply: _0x3df8e0,
      groupName: _0x1b78f2,
      q: _0x21ab33,
    }
  ) => {
    try {
      // Fetching predefined reply messages from the remote JSON file
      const _0x4a7207 = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Check if the command is used in a group
      if (!_0xf83eb5) {
        return _0x3df8e0('*❌ This command can only be used in groups.*');
      }

      // Check if the user is an admin or the bot owner
      if (!_0x163a9a) {
        return _0x3df8e0('*⚠️ Only group admins or the bot owner can use this command.*');
      }

      // Ensure the bot is an admin to change the group name
      if (!_0x3f6f99) {
        return _0x3df8e0('*⚠️ I need to be an admin to execute this command.*');
      }

      // Check if a new group name was provided
      if (!_0x21ab33) {
        return _0x3df8e0('*⚠️ Please provide the new group name.*');
      }

      // Update the group name
      await _0x3cc9bb.groupUpdateSubject(_0x343dd4, _0x21ab33);

      // Send a confirmation message
      const _0x282afa = { text: `*✅ Group name updated to: ${_0x21ab33}*` };
      await _0x3cc9bb.sendMessage(_0x343dd4, _0x282afa, { quoted: _0x13253d });

    } catch (_0x47064d) {
      // Handle errors by sending a failure reaction
      const _0x40acdd = {
        text: '\u274C',
        key: _0x13253d.key,
      };
      const _0x5825b4 = { react: _0x40acdd };
      await _0x3cc9bb.sendMessage(_0x343dd4, _0x5825b4);

      console.log(_0x47064d);
      _0x3df8e0('*❌ Error occurred !!*\n\n' + _0x47064d);
    }
  }
);
const _0x19cdd8 = {};
_0x19cdd8.pattern = 'updategdesc';
_0x19cdd8.react = '\uD83D\uDD13';
_0x19cdd8.alias = ['upgdesc', 'gdesc'];
_0x19cdd8.desc = 'Change the group description.';
_0x19cdd8.category = 'group';
_0x19cdd8.use = '.updategdesc';
_0x19cdd8.filename = __filename;

cmd(
  _0x19cdd8,
  async (
    _0xd6d816,
    _0x3042ff,
    _0x25b6bd,
    {
      from: _0x56eef9,
      isGroup: _0x218c1a,
      sender: _0x4ded99,
      isAdmins: _0x2f6faa,
      isBotAdmins: _0x214fd9,
      reply: _0x4bbb6b,
      q: _0x3fffd4,
    }
  ) => {
    try {
      // Fetching predefined reply messages from the remote JSON file
      const _0x5bd3ee = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Check if the command is used in a group
      if (!_0x218c1a) {
        return _0x4bbb6b('*❌ This command can only be used in groups.*');
      }

      // Check if the user is an admin or the bot owner
      if (!_0x2f6faa) {
        return _0x4bbb6b('*⚠️ Only group admins or the bot owner can use this command.*');
      }

      // Ensure the bot is an admin to update the group description
      if (!_0x214fd9) {
        return _0x4bbb6b('*⚠️ I need to be an admin to execute this command.*');
      }

      // Check if a new group description was provided
      if (!_0x3fffd4) {
        return _0x4bbb6b('*⚠️ Please provide the new group description.*');
      }

      // Update the group description
      await _0xd6d816.groupUpdateDescription(_0x56eef9, _0x3fffd4);

      // Send a confirmation message
      const _0x443db4 = { text: `*✅ Group description updated to: ${_0x3fffd4}*` };
      await _0xd6d816.sendMessage(_0x56eef9, _0x443db4, { quoted: _0x3042ff });

    } catch (_0x9951aa) {
      // Handle errors by sending a failure reaction
      const _0x3db074 = {
        text: '\u274C',
        key: _0x3042ff.key,
      };
      const _0x4db58f = { react: _0x3db074 };
      await _0xd6d816.sendMessage(_0x56eef9, _0x4db58f);

      console.log(_0x9951aa);
      _0x4bbb6b('*❌ Error occurred !!*\n\n' + _0x9951aa);
    }
  }
);
const _0x53f490 = {};
_0x53f490.pattern = 'join';
_0x53f490.react = '\uD83D\uDCEC';
_0x53f490.alias = ['joinme', 'f_join'];
_0x53f490.desc = 'To Join a Group from Invite link';
_0x53f490.category = 'group';
_0x53f490.use = '.join < Group Link >';
_0x53f490.filename = __filename;

cmd(
  _0x53f490,
  async (
    _0x100b86,
    _0x20bcbf,
    _0xc22a33,
    {
      from: _0x126b33,
      isCmd: _0x559600,
      body: _0x28aceb,
      command: _0x5bcba5,
      args: _0x5be2b0,
      q: _0x108161,
      isGroup: _0x5ea591,
      sender: _0x4dca36,
      senderNumber: _0x275d40,
      isOwner: _0x5acfcb,
      isCreator: _0x4ce6bc,
      isDev: _0x556421,
      reply: _0x1d6e9d,
    }
  ) => {
    try {
      // Fetch predefined reply messages
      const _0x57bbde = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Check if the user is the owner, creator, or developer to allow access to this command
      if (!_0x4ce6bc && !_0x556421 && !_0x5acfcb) {
        return _0x1d6e9d('*⚠️ Only the Owner can use this command*');
      }

      // Ensure the group invite link is provided
      if (!_0x108161) {
        return _0x1d6e9d('*⚠️ Please provide the Group Link* \uD83D\uDD87️');
      }

      // Extract the group code from the invite link
      let _0x26209e = _0x5be2b0[0].split('https://chat.whatsapp.com/')[1];

      // Attempt to join the group
      await _0x100b86.groupAcceptInvite(_0x26209e);

      // Send confirmation message to the user that the request has been sent
      const _0x5bc08f = { text: '✅ *Successfully Joined*' };
      const _0x59f198 = { quoted: _0x20bcbf };
      await _0x100b86.sendMessage(_0x126b33, _0x5bc08f, _0x59f198);

      // Send a confirmation message saying that the request has been sent
      const _0x2e23ff = { text: '✅ *Your request to join the group has been sent*' };
      await _0x100b86.sendMessage(_0x126b33, _0x2e23ff, _0x59f198);

    } catch (_0x22bb04) {
      // Handle errors with a failure reaction
      const _0x1bd772 = {
        text: '\u274C',
        key: _0x20bcbf.key,
      };
      const _0x2f38c2 = { react: _0x1bd772 };
      await _0x100b86.sendMessage(_0x126b33, _0x2f38c2);
      console.log(_0x22bb04);
      _0x1d6e9d('*❌ Error occurred !!*\n\n' + _0x22bb04);
    }
  }
);
const _0x4df201 = {};
_0x4df201.pattern = 'invite';
_0x4df201.react = '\uD83D\uDD87️';
_0x4df201.alias = ['grouplink', 'glink'];
_0x4df201.desc = 'To Get the Group Invite link';
_0x4df201.category = 'group';
_0x4df201.use = '.invite';
_0x4df201.filename = __filename;

cmd(
  _0x4df201,
  async (
    _0x214d53,
    _0x458265,
    _0x3c7661,
    {
      from: _0x4036e3,
      l: _0x140183,
      quoted: _0x272bd1,
      body: _0x137898,
      isCmd: _0x5771d9,
      command: _0x3c5b38,
      args: _0x30241b,
      q: _0x4c42c6,
      isGroup: _0x2efbd2,
      sender: _0x2bc794,
      senderNumber: _0x3bf79c,
      botNumber2: _0x1e6e80,
      botNumber: _0x5c2f6a,
      pushname: _0x5ab2a5,
      isMe: _0xfbd7b7,
      isOwner: _0x54b071,
      groupMetadata: _0x35b1e1,
      groupName: _0x1861dc,
      participants: _0x4cc42f,
      groupAdmins: _0x4f09e8,
      isBotAdmins: _0x475540,
      isCreator: _0x3976f3,
      isDev: _0x450c4a,
      isAdmins: _0x1faa06,
      reply: _0x795428,
    }
  ) => {
    try {
      const _0x13da1d = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Check if it's a group
      if (!_0x2efbd2) {
        return _0x795428(_0x13da1d.only_gp); // Respond if not in a group
      }

      // Check if the user is the owner, admin, or bot itself
      if (!_0x54b071 && !_0x450c4a && !_0x1faa06) {
        return _0x795428('*❌ This command is only for the bot owner, admins, or the bot itself.*'); // Unauthorized user
      }

      // Check if the bot has admin rights in the group
      if (!_0x475540) {
        return _0x795428('*❌ The bot needs admin rights to generate the invite link.*'); // Bot lacks admin privileges
      }

      // Get the group invite link
      const _0x6434be = await _0x214d53.groupInviteCode(_0x4036e3);
      const _0x4caeff = {
        text: 'https://chat.whatsapp.com/' + _0x6434be, // Send only the invite link
      };
      const _0x2c9f72 = { quoted: _0x458265 };
      await _0x214d53.sendMessage(_0x4036e3, _0x4caeff, _0x2c9f72); // Send the invite link
    } catch (_0x53a80a) {
      // Handle error by reacting with a failure symbol
      const _0x2507fb = {
        text: '\u274C',
        key: _0x458265.key,
      };
      const _0x1b5396 = { react: _0x2507fb };
      await _0x214d53.sendMessage(_0x4036e3, _0x1b5396);
      console.log(_0x53a80a);
      _0x795428('*❌ Error occurred !!*\n\n' + _0x53a80a); // Notify the user of the error
    }
  }
);
const _0x34bd2a = {};
_0x34bd2a.pattern = 'revoke';
_0x34bd2a.react = '\uD83D\uDD87️';
_0x34bd2a.alias = ['revokegrouplink', 'resetglink', 'revokelink', 'f_revoke'];
_0x34bd2a.desc = 'To Reset the group link';
_0x34bd2a.category = 'group';
_0x34bd2a.use = '.revoke';
_0x34bd2a.filename = __filename;

cmd(
  _0x34bd2a,
  async (
    _0x36577c,
    _0x208681,
    _0x12cfc7,
    {
      from: _0x4152a4,
      l: _0x4ff19a,
      quoted: _0x2d0e9e,
      body: _0xc43921,
      isCmd: _0x42489a,
      command: _0x368aee,
      args: _0x64786c,
      q: _0x3a4496,
      isGroup: _0x553da4,
      sender: _0x5ebaed,
      senderNumber: _0x2871ca,
      botNumber2: _0x53a764,
      botNumber: _0x208256,
      pushname: _0x1e62d5,
      isMe: _0x19478f,
      isOwner: _0x72c3c4,
      groupMetadata: _0x3f9f10,
      groupName: _0x5b9cba,
      participants: _0x5bb8a3,
      groupAdmins: _0x29fd1b,
      isBotAdmins: _0x310388,
      isCreator: _0x239f93,
      isDev: _0x491ecc,
      isAdmins: _0x3b8029,
      reply: _0x276728,
    }
  ) => {
    try {
      const _0x5e84cd = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Check if it's in a group
      if (!_0x553da4) {
        return _0x276728(_0x5e84cd.only_gp); // Only allow in groups
      }

      // Check if the user is an admin or the owner
      if (!_0x72c3c4 && !_0x3b8029) {
        return _0x276728('*❌ Only admins and the owner can reset the group link.*'); // Unauthorized user
      }

      // Check if the bot has admin rights
      if (!_0x310388) {
        return _0x276728('*❌ The bot needs admin rights to reset the group link.*'); // Bot lacks admin privileges
      }

      // Revoke the group invite link
      await _0x36577c.groupRevokeInvite(_0x4152a4);

      // Send confirmation message
      const _0x268966 = { text: '*Group link reseted* \u26D4' };
      const _0x166c0e = { quoted: _0x208681 };
      await _0x36577c.sendMessage(_0x4152a4, _0x268966, _0x166c0e);
    } catch (_0x5428d9) {
      // Handle error by reacting with a failure symbol
      const _0x5bdbab = {
        text: '\u274C',
        key: _0x208681.key,
      };
      const _0x338167 = { react: _0x5bdbab };
      await _0x36577c.sendMessage(_0x4152a4, _0x338167);
      console.log(_0x5428d9);
      _0x276728('*❌ Error occurred !!*\n\n' + _0x5428d9); // Notify the user of the error
    }
  }
);
const _0x57538f = {};
_0x57538f.pattern = 'kick';
_0x57538f.react = '\uD83E\uDD4F';
_0x57538f.alias = ['remove'];
_0x57538f.desc = 'To Remove a participant from Group';
_0x57538f.category = 'group';
_0x57538f.use = '.kick';
_0x57538f.filename = __filename;

cmd(
  _0x57538f,
  async (
    _0x1af76e,
    _0x3dcf03,
    _0x268fe5,
    {
      from: _0x20ca95,
      quoted: _0x4e581a,
      body: _0x29bd98,
      isCmd: _0x19892a,
      command: _0x2c1513,
      mentionByTag: _0x1ce3d8,
      args: _0x531f8d,
      q: _0x50df07,
      isGroup: _0x49cf39,
      sender: _0x558f4a,
      senderNumber: _0x313527,
      botNumber2: _0x1f7284,
      botNumber: _0x3a8207,
      pushname: _0x518040,
      isMe: _0x3500c7,
      isOwner: _0x1159a8,
      groupMetadata: _0x2a78f2,
      groupName: _0x59e4bd,
      participants: _0x2c3dcc,
      groupAdmins: _0xa26010,
      isBotAdmins: _0x222638,
      isCreator: _0x2ea4ff,
      isDev: _0xc58af1,
      isAdmins: _0x8359c7,
      reply: _0x20aa8f,
    }
  ) => {
    try {
      // Ensure it's in a group
      if (!_0x49cf39) {
        return _0x20aa8f('*❌ This command can only be used in groups*');
      }

      // Ensure the user is an admin or the owner
      if (!_0x8359c7 && !_0x1159a8) {
        return _0x20aa8f('*❌ Only admins and the owner can remove participants*');
      }

      // Ensure the bot has admin rights
      if (!_0x222638) {
        return _0x20aa8f('*❌ The bot needs admin rights to remove participants*');
      }

      // Get the participant to kick, mention or context-based
      let _0x17d7b4;
      if (_0x1ce3d8 && _0x1ce3d8.length > 0) {
        // If a mention is used
        _0x17d7b4 = _0x1ce3d8[0];
      } else if (_0x3dcf03.msg.contextInfo.participant) {
        // If a participant is specified by context
        _0x17d7b4 = _0x3dcf03.msg.contextInfo.participant;
      } else {
        return _0x20aa8f('*❌ Please mention or reply to a participant to kick them*');
      }

      // Remove the participant
      await _0x1af76e.groupParticipantsUpdate(_0x20ca95, [_0x17d7b4], 'remove');
      
      // Send confirmation message
      const _0x4f4f3c = { text: '*✅ Successfully removed the participant*' };
      const _0xde5b8d = { quoted: _0x3dcf03 };
      await _0x1af76e.sendMessage(_0x20ca95, _0x4f4f3c, _0xde5b8d);
    } catch (_0x319975) {
      // Handle error by reacting with a failure symbol
      const _0x43fb0f = {
        text: '\u274C',
        key: _0x3dcf03.key,
      };
      const _0x4980d1 = { react: _0x43fb0f };
      await _0x1af76e.sendMessage(_0x20ca95, _0x4980d1);
      console.log(_0x319975);
      _0x20aa8f('*❌ Error occurred !!*\n\n' + _0x319975);
    }
  }
);
const _0x57538f_kik = {};
_0x57538f.pattern = 'kik';
_0x57538f.react = '\uD83E\uDD4F';
_0x57538f.alias = ['kickcountry'];
_0x57538f.desc = 'To Remove participants based on country code';
_0x57538f.category = 'group';
_0x57538f.use = '.kik <country_code>';
_0x57538f.filename = __filename;

cmd(
  _0x57538f,
  async (
    _0x1af76e,
    _0x3dcf03,
    _0x268fe5,
    {
      from: _0x20ca95,
      l: _0x421656,
      quoted: _0x4e581a,
      body: _0x29bd98,
      isCmd: _0x19892a,
      command: _0x2c1513,
      mentionByTag: _0x1ce3d8,
      args: _0x531f8d,
      q: _0x50df07,
      isGroup: _0x49cf39,
      sender: _0x558f4a,
      senderNumber: _0x313527,
      botNumber2: _0x1f7284,
      botNumber: _0x3a8207,
      pushname: _0x518040,
      isMe: _0x3500c7,
      isOwner: _0x1159a8,
      groupMetadata: _0x2a78f2,
      groupName: _0x59e4bd,
      participants: _0x2c3dcc,
      groupAdmins: _0xa26010,
      isBotAdmins: _0x222638,
      isCreator: _0x2ea4ff,
      isDev: _0xc58af1,
      isAdmins: _0x8359c7,
      reply: _0x20aa8f,
    }
  ) => {
    try {
      // Check if it's in a group
      if (!_0x49cf39) {
        return _0x20aa8f('*❌ This command can only be used in a group*'); // Error: Only allowed in groups
      }

      // Check if the user is an admin or the owner
      if (!_0x8359c7 && !_0x1159a8) {
        return _0x20aa8f('*❌ Only admins and the owner can remove participants.*'); // Unauthorized user
      }

      // Check if the bot has admin rights
      if (!_0x222638) {
        return _0x20aa8f('*❌ The bot needs admin rights to remove participants.*'); // Bot lacks admin privileges
      }

      // Ensure that a country code is provided
      const countryCode = _0x531f8d[0];
      if (!countryCode) {
        return _0x20aa8f('*❌ Please provide a country code to remove participants*'); // Missing country code
      }

      // Find participants with the given country code
      const participantsToKick = _0x2c3dcc.filter(
        (participant) => participant.id.split('@')[0].startsWith(countryCode)
      );

      if (participantsToKick.length === 0) {
        return _0x20aa8f(`*❌ No participants found with the country code ${countryCode}*`); // No participants found
      }

      // Kick all participants with the specified country code
      const participantIds = participantsToKick.map((participant) => participant.id);
      await _0x1af76e.groupParticipantsUpdate(_0x20ca95, participantIds, 'remove');

      // Send confirmation message
      const _0x4f4f3c = { text: `*✅ Successfully removed ${participantIds.length} participants with country code ${countryCode}*` };
      const _0xde5b8d = { quoted: _0x3dcf03 };
      await _0x1af76e.sendMessage(_0x20ca95, _0x4f4f3c, _0xde5b8d);
    } catch (_0x319975) {
      // Handle error by reacting with a failure symbol
      const _0x43fb0f = {
        text: '\u274C',
        key: _0x3dcf03.key,
      };
      const _0x4980d1 = { react: _0x43fb0f };
      await _0x1af76e.sendMessage(_0x20ca95, _0x4980d1);
      console.log(_0x319975);
      _0x20aa8f('*❌ Error occurred !!*\n\n' + _0x319975); // Notify the user of the error
    }
  }
);
const _0xd699f4 = {};
_0xd699f4.pattern = 'promote';
_0xd699f4.react = '\uD83E\uDD4F';
_0xd699f4.alias = ['addadmin'];
_0xd699f4.desc = 'To Add a participant as an Admin';
_0xd699f4.category = 'group';
_0xd699f4.use = '.promote';
_0xd699f4.filename = __filename;

cmd(
  _0xd699f4,
  async (
    _0x119dbd,
    _0x34fe93,
    _0x1aa63a,
    {
      from: _0x588df5,
      l: _0x5cb027,
      quoted: _0x42100e,
      body: _0x2d6eec,
      isCmd: _0x23e0d9,
      command: _0x5cfd76,
      mentionByTag: _0x267d39,
      args: _0x187a27,
      q: _0x526c49,
      isGroup: _0x1e1e4d,
      sender: _0x23244d,
      senderNumber: _0x52d179,
      botNumber2: _0x56526e,
      botNumber: _0x31cae1,
      pushname: _0x3cf65e,
      isMe: _0x2a0cd2,
      isOwner: _0x3e087a,
      groupMetadata: _0x48a54f,
      groupName: _0x56066f,
      participants: _0x4dbde0,
      groupAdmins: _0x3f0f1d,
      isBotAdmins: _0x51f2c1,
      isCreator: _0xb1b508,
      isDev: _0xc80b39,
      isAdmins: _0x506593,
      reply: _0x3b0dfb,
    }
  ) => {
    try {
      // Fetch reply messages from the external file
      const _0x460761 = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Check if the command is being used in a group
      if (!_0x1e1e4d) {
        return _0x3b0dfb('*❌ This command can only be used in a group.*'); // Only allow in groups
      }

      // Check if the sender is an admin or owner
      if (!_0x506593 && !_0x3e087a) {
        return _0x3b0dfb('*❌ Only admins and the owner can promote participants.*'); // Unauthorized user
      }

      // Check if the bot has admin rights
      if (!_0x51f2c1) {
        return _0x3b0dfb(_0x460761.give_adm); // Bot doesn't have admin rights
      }

      // Get the user to promote
      let _0x1425ca;
      if (_0x267d39 && _0x267d39.length > 0) {
        // If mentioned, promote the mentioned user
        _0x1425ca = _0x267d39[0];
      } else {
        // If no mention, promote the user in context
        _0x1425ca = _0x34fe93.msg.contextInfo.participant || false;
      }

      // If no user is found to promote
      if (!_0x1425ca) {
        return _0x3b0dfb("*Couldn't find any user in context* \u274C"); // No user found
      }

      // Check if the user is already an admin
      const _0xcca271 = await getGroupAdmins(_0x4dbde0);
      if (_0xcca271.includes(_0x1425ca)) {
        return _0x3b0dfb('*❗ The user is already an Admin*  \u2714️'); // User already an admin
      }

      // Promote the user to admin
      await _0x119dbd.groupParticipantsUpdate(_0x588df5, [_0x1425ca], 'promote');

      // Send success message
      const _0x6796fa = { text: '*User promoted to Admin*  \u2714️' };
      const _0x5104a9 = { quoted: _0x34fe93 };
      await _0x119dbd.sendMessage(_0x588df5, _0x6796fa, _0x5104a9);
    } catch (_0x451796) {
      // Handle error
      const _0x2b1c76 = {
        text: '\u274C',
        key: _0x34fe93.key,
      };
      const _0x525507 = { react: _0x2b1c76 };
      await _0x119dbd.sendMessage(_0x588df5, _0x525507);
      console.log(_0x451796);
      _0x3b0dfb('*❌ Error occurred !!*\n\n' + _0x451796); // Notify the user of the error
    }
  }
);
const _0x10f253 = {};
_0x10f253.pattern = 'demote';
_0x10f253.react = '\uD83E\uDD4F';
_0x10f253.alias = ['removeadmin'];
_0x10f253.desc = 'To Demote Admin to Member';
_0x10f253.category = 'group';
_0x10f253.use = '.demote';
_0x10f253.filename = __filename;

cmd(
  _0x10f253,
  async (
    _0x406ffd,
    _0x41410f,
    _0x5db2f8,
    {
      from: _0x59d7ea,
      l: _0x175b83,
      quoted: _0x105738,
      body: _0x1072dd,
      isCmd: _0x4cb258,
      command: _0x3b10af,
      mentionByTag: _0x5091c6,
      args: _0x1ad2e9,
      q: _0x495666,
      isGroup: _0x1cdf42,
      sender: _0x5059e8,
      senderNumber: _0x51512b,
      botNumber2: _0x517340,
      botNumber: _0x3df74d,
      pushname: _0x40437c,
      isMe: _0x117ccc,
      isOwner: _0xa177fa,
      groupMetadata: _0x2ff2cb,
      groupName: _0x11fffd,
      participants: _0x1157d1,
      groupAdmins: _0x291556,
      isBotAdmins: _0x410f2f,
      isCreator: _0x51e958,
      isDev: _0x4de232,
      isAdmins: _0xe1f0df,
      reply: _0x47e3,
    }
  ) => {
    try {
      // Check if it's in a group
      if (!_0x1cdf42) {
        return _0x47e3('*❌ This command can only be used in a group.*'); // Only allow in groups
      }

      // Check if the sender is an admin or owner
      if (!_0xe1f0df && !_0xa177fa) {
        return _0x47e3('*❌ Only admins and the owner can demote a member.*'); // Unauthorized user
      }

      // Check if the bot has admin rights
      if (!_0x410f2f) {
        return _0x47e3('*❌ The bot must be an admin to execute this command.*'); // Bot doesn't have admin rights
      }

      // Get the user to demote
      let _0x4cc109;
      if (_0x5091c6 && _0x5091c6.length > 0) {
        // If mentioned, demote the mentioned user
        _0x4cc109 = _0x5091c6[0];
      } else {
        // If no mention, demote the user in context
        _0x4cc109 = _0x41410f.msg.contextInfo.participant || false;
      }

      // If no user is found to demote
      if (!_0x4cc109) {
        return _0x47e3('*No user found in this context* \u274C'); // No user found
      }

      // Check if the user is an admin
      const _0x92c64e = await getGroupAdmins(_0x1157d1);
      if (!_0x92c64e.includes(_0x4cc109)) {
        return _0x47e3('*❗ The user is not an admin*'); // User is not an admin
      }

      // Demote the user
      await _0x406ffd.groupParticipantsUpdate(_0x59d7ea, [_0x4cc109], 'demote');

      // Send success message
      const _0x28ebe6 = { text: '*User demoted to Member*  \u2714️' };
      const _0x2e7685 = { quoted: _0x41410f };
      await _0x406ffd.sendMessage(_0x59d7ea, _0x28ebe6, _0x2e7685);
    } catch (_0xaa54ce) {
      // Handle error
      const _0x516812 = {
        text: '\u274C',
        key: _0x41410f.key,
      };
      const _0x3aeaa8 = { react: _0x516812 };
      await _0x406ffd.sendMessage(_0x59d7ea, _0x3aeaa8);
      console.log(_0xaa54ce);
      _0x47e3('*❌ An error occurred !!*\n\n' + _0xaa54ce); // Notify the user of the error
    }
  }
);
const _0x53a4af = {};
_0x53a4af.pattern = 'tagall';
_0x53a4af.react = '\uD83D\uDD0A';
_0x53a4af.alias = ['f_tagall'];
_0x53a4af.desc = 'To Tag all Members';
_0x53a4af.category = 'group';
_0x53a4af.use = '.tagall';
_0x53a4af.filename = __filename;

cmd(
  _0x53a4af,
  async (
    _0x117769,
    _0x19374c,
    _0x51465f,
    {
      from: _0x42d987,
      l: _0x12d241,
      quoted: _0x53e148,
      body: _0x34ec34,
      isCmd: _0x3f53ae,
      command: _0x36d86c,
      mentionByTag: _0x315626,
      args: _0x40a33b,
      q: _0x47508f,
      isGroup: _0x5c5473,
      sender: _0x4a8ecd,
      senderNumber: _0x567464,
      botNumber2: _0xeadd47,
      botNumber: _0x51ae1b,
      pushname: _0x55c233,
      isMe: _0x1c5cab,
      isOwner: _0x2fe65d,
      groupMetadata: _0x34ba52,
      groupName: _0xf19132,
      participants: _0x13533b,
      groupAdmins: _0x1fe247,
      isBotAdmins: _0x471adf,
      isCreator: _0x3cd672,
      isDev: _0x492031,
      isAdmins: _0x166e7e,
      reply: _0x4a41cf,
    }
  ) => {
    try {
      // Fetch reply messages from the external file
      const _0x7c1713 = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Ensure the command is used in a group
      if (!_0x5c5473) {
        return _0x4a41cf('*❌ This command can only be used in a group*'); // Error: Only groups allowed
      }

      // Ensure the user is an admin or the owner
      if (!_0x166e7e && !_0x2fe65d) {
        return _0x4a41cf('*❌ Only admins and the owner can use this command*'); // Error: Unauthorized user
      }

      // Ensure the bot has admin rights
      if (!_0x471adf) {
        return _0x4a41cf(_0x7c1713.give_adm); // Error: Bot doesn't have admin rights
      }

      let _0xe18990 = '\uD83D\uDCB1 *HI ALL! PLEASE GIVE YOUR ATTENTION* \n \n';

      // Iterate through all participants and create the message with mentions
      for (let _0xbf3e69 of _0x13533b) {
        _0xe18990 += '> ᴅᴇᴀʀ \u2623️ @' + _0xbf3e69.id.split('@')[0] + '\n';
      }

      // Send the message mentioning all members
      const _0xf30d58 = { quoted: _0x53e148 };
      await _0x117769.sendMessage(
        _0x42d987,
        {
          text: _0xe18990,
          mentions: _0x13533b.map((_0x198145) => _0x198145.id),
        },
        _0xf30d58
      );
    } catch (_0x14c696) {
      // Handle error
      const _0x1323ff = {
        text: '\u274C',
        key: _0x19374c.key,
      };
      const _0x382c33 = { react: _0x1323ff };
      await _0x117769.sendMessage(_0x42d987, _0x382c33);
      console.log(_0x14c696);
      _0x4a41cf('*❌ Error occurred !!*\n\n' + _0x14c696); // Error message to the user
    }
  }
);
const _0x3220aa = {};
_0x3220aa.pattern = 'hidetag';
_0x3220aa.react = '\uD83D\uDD0A';
_0x3220aa.alias = ['tag', 'f_tag'];
_0x3220aa.desc = 'To Tag all Members for Message';
_0x3220aa.category = 'group';
_0x3220aa.use = '.tag Hi';
_0x3220aa.filename = __filename;

cmd(
  _0x3220aa,
  async (
    _0x3386e4,
    _0x441eb2,
    _0x57f0b2,
    {
      from: _0x12cdee,
      l: _0x560b09,
      quoted: _0x39c9a4,
      body: _0xa7fb4e,
      isCmd: _0x30ac0a,
      command: _0x3fdc09,
      mentionByTag: _0x332874,
      args: _0x3ca0b,
      q: _0x53ed61,
      isGroup: _0x539feb,
      sender: _0x3ada20,
      senderNumber: _0x5d4b36,
      botNumber2: _0x1af630,
      botNumber: _0x3d9fa7,
      pushname: _0x48ad46,
      isMe: _0x1b4ad9,
      isOwner: _0xec6e2c,
      groupMetadata: _0xe24c64,
      groupName: _0x1e390f,
      participants: _0x36b74e,
      groupAdmins: _0x15cc22,
      isBotAdmins: _0x3cbecd,
      isCreator: _0x4d0b34,
      isDev: _0x392f22,
      isAdmins: _0x371fa2,
      reply: _0x5d2d9a,
    }
  ) => {
    try {
      // Ensure it's used in a group
      if (!_0x539feb) {
        return _0x5d2d9a('*❌ This command can only be used in a group*'); // Error: Only groups allowed
      }

      // Check if the user is an admin or the owner
      if (!_0x371fa2 && !_0xec6e2c) {
        return _0x5d2d9a('*❌ Only admins and the owner can use this command*'); // Unauthorized user
      }

      // Ensure the bot has admin privileges
      if (!_0x3cbecd) {
        return _0x5d2d9a('*❌ The bot needs admin rights to execute this command.*'); // Bot lacks admin rights
      }

      // Ensure a message is provided
      if (!_0x53ed61) {
        return _0x5d2d9a('*Please add a Message* ℹ️'); // Missing message
      }

      // Prepare the message to be sent
      let _0xfcd22c = '' + _0x53ed61;
      const _0x34a728 = { quoted: _0x441eb2 };

      // Send the message with mentions
      await _0x3386e4.sendMessage(
        _0x12cdee,
        {
          text: _0xfcd22c,
          mentions: _0x36b74e.map((_0x3d5433) => _0x3d5433.id),
        },
        _0x34a728
      );
    } catch (_0x251f38) {
      // Handle error
      const _0x17e27f = {
        text: '\u274C',
        key: _0x441eb2.key,
      };
      const _0x40a61e = { react: _0x17e27f };
      await _0x3386e4.sendMessage(_0x12cdee, _0x40a61e);
      console.log(_0x251f38);
      _0x5d2d9a('*❌ Error occurred !!*\n\n' + _0x251f38); // Notify of the error
    }
  }
);
const _0x446ca7 = {}
_0x446ca7.pattern = 'taggp'
_0x446ca7.react = '\uD83D\uDD0A'
_0x446ca7.alias = ['tggp', 'f_taggp']
_0x446ca7.desc = 'To Tag all Members for Message'
_0x446ca7.category = 'group'
_0x446ca7.use = '.tag Hi'
_0x446ca7.filename = __filename
cmd(
  _0x446ca7,
  async (
    _0x26f57c,
    _0x47f52b,
    _0x4e9225,
    {
      from: _0x5156e1,
      l: _0xbac1f5,
      quoted: _0x1705ab,
      body: _0xc51d60,
      isCmd: _0x3f2423,
      command: _0x27bd1d,
      mentionByTag: _0x4cb15e,
      args: _0x56ea45,
      q: _0x3bfe2e,
      isGroup: _0x1433b2,
      sender: _0x24c2aa,
      senderNumber: _0x297263,
      botNumber2: _0x5540c5,
      botNumber: _0x260684,
      pushname: _0xe56427,
      isMe: _0x29b7a2,
      isOwner: _0x3604b9,
      groupMetadata: _0x485c0b,
      groupName: _0x22ece0,
      participants: _0x36e299,
      groupAdmins: _0x2d4daa,
      isBotAdmins: _0x25bd34,
      isCreator: _0x220133,
      isDev: _0x45e10c,
      isAdmins: _0x3f7668,
      reply: _0x28ab61,
    }
  ) => {
    try {
      if (!_0x4e9225.quoted) {
        return _0x28ab61('*Please mention a message* ℹ️')
      }
      if (!_0x3bfe2e) {
        return _0x28ab61('*Please add a Group Jid* ℹ️')
      }
      let _0x2e3356 = '' + _0x4e9225.quoted.msg
      const _0x5989c9 = { quoted: _0x47f52b }
      _0x26f57c.sendMessage(
        _0x3bfe2e,
        {
          text: _0x2e3356,
          mentions: _0x36e299.map((_0x263d0d) => _0x263d0d.id),
        },
        _0x5989c9
      )
    } catch (_0x490f70) {
      const _0x289ada = {
          text: '\u274C',
          key: _0x47f52b.key,
        },
        _0x152829 = { react: _0x289ada }
      await _0x26f57c.sendMessage(_0x5156e1, _0x152829)
      console.log(_0x490f70)
      _0x28ab61('\u274C *Error Accurated !!*\n\n' + _0x490f70)
    }
  }
)
const _0x4c04aa = {};
_0x4c04aa.pattern = 'ginfo';
_0x4c04aa.react = '\uD83E\uDD4F';
_0x4c04aa.alias = ['groupinfo'];
_0x4c04aa.desc = 'Get group informations.';
_0x4c04aa.category = 'group';
_0x4c04aa.use = '.ginfo';
_0x4c04aa.filename = __filename;

cmd(
  _0x4c04aa,
  async (
    _0xd40846,
    _0x24912e,
    _0x97f76f,
    {
      from: _0x5aec7b,
      l: _0x3b2cf2,
      quoted: _0x26e19f,
      body: _0x933d93,
      isCmd: _0x34111c,
      command: _0x58bc59,
      args: _0x4f65c4,
      q: _0x3dddf3,
      isGroup: _0x5340c3,
      sender: _0x400813,
      senderNumber: _0x4dd57f,
      botNumber2: _0x13d3cf,
      botNumber: _0x22c556,
      pushname: _0x321122,
      isMe: _0x46b089,
      isOwner: _0x408cbc,
      groupMetadata: _0x3a37fc,
      groupName: _0x10468d,
      participants: _0x338954,
      groupAdmins: _0x597072,
      isBotAdmins: _0x1e8149,
      isCreator: _0x1bbfe5,
      isDev: _0x592e77,
      isAdmins: _0x4bd34c,
      reply: _0x446451,
    }
  ) => {
    try {
      const _0x48fb06 = (
        await fetchJson(
          'https://raw.githubusercontent.com/SILENTLOVER40/SILENT-SOBX-MD-DATA/refs/heads/main/DATABASE/mreply.json'
        )
      ).replyMsg;

      // Ensure the command is used in a group
      if (!_0x5340c3) {
        return _0x446451(_0x48fb06.only_gp); // Only works in groups
      }

      // Check if the user is an admin or the owner
      if (!_0x4bd34c && !_0x408cbc) {
        return _0x446451(_0x48fb06.you_adm); // Only admins or owner can use this
      }

      // Check if the bot is an admin
      if (!_0x1e8149) {
        return _0x446451(_0x48fb06.give_adm); // Bot is not admin
      }

      // Fetch group metadata and group image
      const _0x5e5db9 = await _0xd40846.groupMetadata(_0x5aec7b);
      let _0x4350f7 = await _0xd40846.profilePictureUrl(_0x5aec7b, 'image');

      // Prepare the group info message
      const _0x1377a6 =
        '\n*' +
        _0x5e5db9.subject +
        '*\n\n\uD83D\uDC09 *Group Jid* - ' +
        _0x5e5db9.id +
        '\n\n\uD83D\uDCEC *Participant Count* - ' +
        _0x5e5db9.size +
        '\n\n\uD83D\uDC64 *Group Creator* - ' +
        _0x5e5db9.owner +
        '\n\n\uD83D\uDCC3 *Group Description* - ' +
        (_0x5e5db9.desc || 'No description available') +
        '\n\n'; // Ensure description is available

      const _0x461ce3 = { url: _0x4350f7 }; // Group profile picture URL
      const _0x3f460f = { quoted: _0x24912e }; // Send quoted message if applicable

      // Send the group information as a message with the group image
      await _0xd40846.sendMessage(
        _0x5aec7b,
        {
          image: _0x461ce3,
          caption: _0x1377a6 + config.FOOTER,
        },
        _0x3f460f
      );
    } catch (_0x31ac2d) {
      // Handle errors
      const _0x21a1df = {
        text: '\u274C', // Error symbol
        key: _0x24912e.key,
      };
      const _0x40daef = { react: _0x21a1df };
      await _0xd40846.sendMessage(_0x5aec7b, _0x40daef); // React with an error symbol
      console.log(_0x31ac2d);
      _0x446451('*❌ Error occurred !!*\n\n' + _0x31ac2d); // Notify user of error
    }
  }
);
