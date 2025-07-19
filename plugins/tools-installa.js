import os from 'os';
import util from 'util';
import sizeFormatter from 'human-readable';
import MessageType from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

const ims = './bb.jpg';

let handler = async (m, { conn, usedPrefix }) => {
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groups = chats.filter(([id]) => id.endsWith('@g.us'));
  const used = process.memoryUsage();
  const { restrict } = global.db.data.settings[conn.user.jid] || {};
  const { autoread } = global.opts;

  let old = performance.now();
  let neww = performance.now();
  let speed = (neww - old).toFixed(4);

  let prova = {
    key: { 
      participants: "0@s.whatsapp.net", 
      remoteJid: "status@broadcast", 
      fromMe: false, 
      id: "Halo" 
    },
    message: { 
      orderMessage: { 
        text: ' 🔮',
        itemCount: 2023,
        status: 1,
        surface: 1,
        message: ' 🔮',
        vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=15395490858:+1 (539) 549-0858
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let info = `
══════ •⊰✦⊱• ═════
SUCAAAA IL BOT È PRIVATOO
══════ •⊰✦⊱• ══════
`.trim();

  conn.reply(m.chat, info, prova, m, {
    contextInfo: { 
      externalAdReply: { 
        mediaUrl: null, 
        mediaType: 1, 
        description: null, 
        title: '𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓',
        body: 'lexi',         
        previewType: 0, 
        thumbnail: fs.readFileSync("./Menu2.jpg"),
        sourceUrl: `whawha`
      }
    }
  });
};

handler.help = ['infobot', 'speed'];
handler.tags = ['info', 'tools'];
handler.rowner = true
handler.command = /^(scarica|installa|git|instalarbot)$/i;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
