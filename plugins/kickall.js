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
cmd({
    pattern: "adds",
    desc: "Adds a number to the group, removing spaces and handling formats.",
    react: "➕",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    isGroup,
    sender,
    isOwner,
    groupMetadata,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);
        
        // Only the owner can use this command
        if (!isOwner) return reply(`❌ Only the group owner can use this command.`);
        
        // Extract the number from the command
        const phoneNumber = m.text.split(" ")[1]; // Get the phone number provided by the user
        
        if (!phoneNumber) return reply(`❌ Please provide a phone number. Example: *add +237xxxxxxxxx*`);

        // Remove spaces and handle the '+' sign at the beginning
        const formattedNumber = phoneNumber.replace(/\s+/g, '').replace(/^(\+)?(\d+)/, '$2'); // Remove spaces and handle the number format

        console.log(`Formatted number: ${formattedNumber}`);

        // Check if the number is valid (in this case, we check if it's at least 10 digits long)
        if (formattedNumber.length < 10) {
            return reply(`❌ The phone number seems to be invalid. Please provide a valid phone number.`);
        }

        // Add the number to the group
        await conn.groupParticipantsUpdate(from, [formattedNumber + '@c.us'], "add")
            .catch(err => {
                console.error(`⚠️ Failed to add ${formattedNumber}:`, err);
                return reply(`❌ An error occurred while trying to add the participant.`);
            });

        // Send success confirmation
        reply(`✅ Success! The number ${formattedNumber} has been added to the group.`);
    } catch (e) {
        console.error('Error while executing add:', e);
        reply('❌ An error occurred while executing the command.');
    }
});
