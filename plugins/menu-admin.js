import fs from 'fs';

let handler = async (message, { conn, usedPrefix }) => {
  let quotedMsg = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧",
        jpegThumbnail: fs.readFileSync('./icone/admin.png'),
        vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let menuText = `
╔═══════════════✠═══════════════╗
║         🚀 𝙈𝙀𝙉𝙐 𝘼𝘿𝙈𝙄𝙉 🚀         
╚═══════════════✠═══════════════╝

           𝗖𝗢𝗠𝗔𝗡𝗗𝗜 𝗔𝗗𝗠𝗜𝗡  
╭━━━━━━━━━━━━━━━━━━━╮  
┃ ⚡ ${_0xeb2cc9}𝗣𝗥𝗢𝗠𝗨𝗢𝗩𝗜 / 𝗣  
┃ ⚡ ${_0xeb2cc9}𝗥𝗘𝗧𝗥𝗢𝗖𝗘𝗗𝗜 / 𝗥  
┃ ⚡ ${_0xeb2cc9}𝗪𝗔𝗥𝗡 / 𝗨𝗡𝗪𝗔𝗥𝗡  
┃ ⚡ ${_0xeb2cc9}𝗠𝗨𝗧𝗔 / 𝗦𝗠𝗨𝗧𝗔  
┃ ⚡ ${_0xeb2cc9}𝗠𝗨𝗧𝗘𝗟𝗜𝗦𝗧  
┃ ⚡ ${_0xeb2cc9}𝗛𝗜𝗗𝗘𝗧𝗔𝗚  
┃ ⚡ ${_0xeb2cc9}𝗧𝗔𝗚𝗔𝗟𝗟  
┃ ⚡ ${_0xeb2cc9}𝗔𝗣𝗘𝗥𝗧𝗢 / 𝗖𝗛𝗜𝗨𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗦𝗘𝗧𝗪𝗘𝗟𝗖𝗢𝗠𝗘  
┃ ⚡ ${_0xeb2cc9}𝗦𝗘𝗧𝗕𝗬𝗘  
┃ ⚡ ${_0xeb2cc9}𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜  
┃ ⚡ ${_0xeb2cc9}𝗟𝗜𝗦𝗧𝗔𝗡𝗨𝗠 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗣𝗨𝗟𝗜𝗭𝗜𝗔 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗥𝗜𝗠𝗢𝗭𝗜𝗢𝗡𝗘 𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜  
┃ ⚡ ${_0xeb2cc9}𝗦𝗜𝗠  
┃ ⚡ ${_0xeb2cc9}𝗔𝗗𝗠𝗜𝗡𝗦  
┃ ⚡ ${_0xeb2cc9}𝗙𝗥𝗘𝗘𝗭𝗘 @  
┃ ⚡ ${_0xeb2cc9}𝗜𝗦𝗣𝗘𝗭𝗜𝗢𝗡𝗔 (𝗟𝗜𝗡𝗞)  
┃ ⚡ ${_0xeb2cc9}𝗧𝗢𝗣 (10,50,100)  
┃ ⚡ ${_0xeb2cc9}𝗧𝗢𝗣𝗦𝗘𝗫𝗬  
┃ ⚡ ${_0xeb2cc9}𝗣𝗜𝗖 @  
┃ ⚡ ${_0xeb2cc9}𝗣𝗜𝗖𝗚𝗥𝗨𝗣𝗣𝗢  
┃ ⚡ ${_0xeb2cc9}𝗡𝗢𝗠𝗘 <𝗧𝗘𝗦𝗧𝗢>  
┃ ⚡ ${_0xeb2cc9}𝗕𝗜𝗢 <𝗧𝗘𝗦𝗧𝗢>  
┃ ⚡ ${_0xeb2cc9}𝗟𝗜𝗡𝗞𝗤𝗥  
╰━━━━━━━━━━━━━━━━━━━╯  

🔥𝔏𝔢𝔵𝔦𝔬𝔫🔥
`.trim();

  await conn.sendMessage(
    message.chat,
    {
      text: menuText,
      footer: 'Scegli un menu:',
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
        { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
        { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
        { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
      ],
      headerType: 1
    },
    { quoted: quotedMsg }
  );
};

handler.help = ["menuadmin", "menu", "menuowner", "menusicurezza", "menugruppo"];
handler.tags = ["menuadmin"];
handler.command = /^(menuadmin|menu|menuowner|menusicurezza|menugruppo|menuadm|admin)$/i;

export default handler;
