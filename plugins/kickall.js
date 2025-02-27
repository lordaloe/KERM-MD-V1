/*
_  ______   _____ _____ _____ _   _
| |/ / ___| |_   _| ____/___ | | | |
| ' / |  _    | | |  _|| |   | |_| |
| . \ |_| |   | | | |__| |___|  _  |
|_|\_\____|   |_| |_____\____|_| |_|

ANYWAY, YOU MUST GIVE CREDIT TO MY CODE WHEN COPY IT
CONTACT ME HERE +237656520674
YT: KermHackTools
Github: Kgtech-cmr
*/

const config = require('../config');
const { cmd, commands } = require('../command');

let stopKickall = false; // Variable to stop the execution of the kickall command

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "🧨",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isCmd,
    command,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);

        // Check if the user is an admin
        if (!isAdmins) return reply(`❌ Only group admins can use this command.`);

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to remove group members.`);

        stopKickall = false; // Reset the stop flag

        // Send warning message before execution
        reply(`⚠️ *Warning!* All non-admin members will be removed in *5 seconds*.\nTo cancel this operation, type *.stop*.`);
        
        // Countdown before execution with a chance to cancel
        for (let i = 5; i > 0; i--) {
            if (stopKickall) {
                return reply(`✅ *Operation canceled.* No members were removed.`);
            }
            await delay(1000); // Wait for 1 second
        }

        // Filter out non-admin members
        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => 
            !groupAdmins.includes(member.id) && member.id !== conn.user.jid
        );

        if (nonAdminParticipants.length === 0) {
            return reply(`✅ There are no non-admin members to remove.`);
        }

        // Remove non-admin members
        for (let participant of nonAdminParticipants) {
            if (stopKickall) {
                return reply(`✅ *Operation canceled.* Some members may not have been removed.`);
            }
            await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                .catch(err => console.error(`⚠️ Failed to remove ${participant.id}:`, err));
        }

        // Send success confirmation
        reply(`✅ *Success!* All non-admin members have been removed from the group.`);
    } catch (e) {
        console.error('Error while executing kickall:', e);
        reply('❌ An error occurred while executing the command.');
    }
});

// Command to stop kickall execution
cmd({
    pattern: "stop",
    desc: "Stops the kickall command.",
    react: "⏹️",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    stopKickall = true; // Set the stop flag to true
    reply(`✅ *Kickall operation has been canceled.*`);
});

cmd({
    pattern: "kick",
    desc: "Removes a participant by replying to or mentioning their message.",
    react: "🚪",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);
        
        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply(`❌ Only group admins or the owner can use this command.`);
        
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to remove group members.`);
        
        // Retrieve the target participant via a reply or a mention
        let target;
        if (quoted) {
            target = quoted.sender; // Use the sender of the quoted message
        } else if (mek.message && mek.message.mentionedJid && mek.message.mentionedJid.length > 0) {
            target = mek.message.mentionedJid[0]; // Use the first mentioned ID
        }
        
        if (!target) {
            return reply(`❌ Please mention or reply to the message of the participant to remove.`);
        }
        
        // Prevent kicking an admin or the bot itself
        if (groupAdmins.includes(target) || target === conn.user.jid) {
            return reply(`❌ You cannot remove an admin or the bot.`);
        }
        
        // Remove the participant from the group
        await conn.groupParticipantsUpdate(from, [target], "remove")
            .catch(err => {
                console.error(`⚠️ Failed to remove ${target}:`, err);
                return reply(`❌ An error occurred while trying to remove the participant.`);
            });
        
        // Send a confirmation message upon successful removal
        reply(`✅ Success! The participant has been removed from the group.`);
    } catch (e) {
        console.error('Error while executing kick:', e);
        reply('❌ An error occurred while executing the command.');
    }
});
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
