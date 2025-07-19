// Plugin by 𝔏𝔢𝔵𝔦𝔬𝔫 — Stile DOX
import axios from 'axios';
import { downloadProfilePicture } from '../lib/utils.js';

const API_KEY = "65137657dba81669f2b1ebc2a2ff3dc3";

function formatDate(date) {
  return new Date(date).toLocaleString('it-IT', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

function label(text) {
  return [...text].map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 120211);
    if (code >= 97 && code <= 122) return String.fromCharCode(code + 120245);
    return c;
  }).join('');
}

function sanitizeNumber(input) {
  const cleaned = input.replace(/\D/g, '');
  return (cleaned.startsWith('39') ? cleaned : '39' + cleaned) + '@s.whatsapp.net';
}

async function getNumberInfo(phoneNumber) {
  try {
    const url = `http://apilayer.net/api/validate?access_key=${API_KEY}&number=${phoneNumber}`;
    const { data } = await axios.get(url);
    return data.valid ? data : null;
  } catch {
    return null;
  }
}

async function getIPLocation() {
  try {
    const { data } = await axios.get('http://ip-api.com/json/');
    return data;
  } catch {
    return null;
  }
}

async function getWhatsAppPresence(conn, jid) {
  try {
    const presence = await conn.getPresence(jid);
    return {
      composing: "✍️ Sta scrivendo...",
      recording: "🎙️ Sta registrando...",
      online: "🟢 Online"
    }[presence] || "❌ Non disponibile";
  } catch {
    return "❌ Non disponibile";
  }
}

let handler = async (m, { conn, args, command }) => {
  if (!args[0]) throw '❌ Usa: .stalk +393456789012';

  const jid = sanitizeNumber(args[0]);
  const [user] = await conn.onWhatsApp(jid);
  if (!user?.exists) throw '❌ Numero non registrato su WhatsApp.';

  const userId = user.jid;
  const [
    name,
    profilePicUrl,
    status,
    presence,
    numberInfo,
    ipInfo
  ] = await Promise.all([
    conn.getName(userId),
    downloadProfilePicture(userId, conn).catch(() => null),
    conn.fetchStatus(userId).catch(() => null),
    getWhatsAppPresence(conn, userId),
    getNumberInfo(args[0].replace(/\D/g, '')),
    getIPLocation()
  ]);

  let commonGroups = [];
  for (let chatId in conn.chats) {
    const chat = conn.chats[chatId];
    if (chat?.participants?.includes(userId)) {
      commonGroups.push(chat.subject || chatId);
    }
  }

  const statusText = status?.status || 'Nessuna bio';
  const statusTime = status?.setAt ? formatDate(status.setAt) : 'N/D';

  const ipFlag = ipInfo?.countryCode
    ? String.fromCodePoint(...[...ipInfo.countryCode].map(c => 127397 + c.charCodeAt()))
    : '';

  const locationMap = ipInfo
    ? `https://www.google.com/maps?q=${ipInfo.lat},${ipInfo.lon}`
    : 'N/D';

  const localTime = ipInfo?.timezone
    ? new Date().toLocaleString("it-IT", { timeZone: ipInfo.timezone })
    : 'N/D';

  const caption = `
╭━━━━━〔 𝙇𝙀𝙓𝙄𝙊𝙉 〕━━━━━╮
┃ 👤 *${label('Nome')}:* ${name}
┃ ☎️ *${label('Numero')}:* wa.me/${userId.split('@')[0]}
┃ 📝 *${label('Bio')}:* ${statusText}
┃ 🕒 *${label('Ultima modifica')}:* ${statusTime}
┃ 📡 *${label('Presenza')}:* ${presence}
┃
┃ 🌍 *${label('Nazione')}:* ${numberInfo?.country_name || 'N/D'} ${ipFlag}
┃ 🔢 *${label('Prefisso')}:* ${numberInfo?.country_prefix || 'N/D'}
┃ 🔤 *${label('Codice paese')}:* ${numberInfo?.country_code || 'N/D'}
┃ 📶 *${label('Operatore')}:* ${numberInfo?.carrier || 'N/D'}
┃ 📱 *${label('Tipo linea')}:* ${numberInfo?.line_type || 'N/D'}
┃
┃ 🧭 *${label('Fuso orario')}:* ${ipInfo?.timezone || 'N/D'}
┃ 🕓 *${label('Ora locale')}:* ${localTime}
┃ 🏙️ *${label('Località')}:* ${ipInfo?.city || 'N/D'}, ${ipInfo?.regionName || 'N/D'}
┃ 🧠 *${label('ISP')}:* ${ipInfo?.isp || 'N/D'}
┃ 🗺️ *${label('Mappa')}:* ${locationMap}
┃
┃ 👥 *${label('Gruppi comuni')}:* ${commonGroups.length}
┃ 🌐 *${label('IP Rilevato')}:* ${ipInfo?.query || 'N/D'}
┃
┃ 📸 *${label('Foto profilo')}:* ${profilePicUrl ? 'Disponibile' : 'Non disponibile'}
╰━━━━━━━━━━━━━━━━━━━━━━╯
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      buttons: profilePicUrl
        ? [{ buttonId: `.fotoprofilo ${userId}`, buttonText: { displayText: '📸 Mostra Immagine' }, type: 1 }]
        : [],
      footer: 'Made By 𝔏𝔢𝔵𝔦𝔬𝔫',
      headerType: 1,
    },
    { quoted: m }
  );
};

handler.help = ['stalk <numero>'];
handler.tags = ['info'];
handler.command = /^(stalk)$/i;

export default handler;
