let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'))

let handler = async (m, { conn }) => {
    if (!m.quoted) throw '𝐑𝐢𝐬𝐩𝐨𝐧𝐝𝐢 𝐚 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐯𝐢𝐬𝐮𝐚𝐥𝐢𝐳𝐳𝐚𝐛𝐢𝐥𝐞 𝐮𝐧𝐚 𝐬𝐨𝐥𝐚 𝐯𝐨𝐥𝐭𝐚¹'
    if (m.quoted.mtype !== 'viewOnceMessageV2') throw '𝐍𝐨𝐧 𝐞̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐯𝐢𝐬𝐮𝐚𝐥𝐢𝐳𝐳𝐚𝐛𝐢𝐥𝐞 𝐮𝐧𝐚 𝐬𝐨𝐥𝐚 𝐯𝐨𝐥𝐭𝐚¹'
    
    let msg = m.quoted.message
    let viewOnceType = Object.keys(msg)[0]
    let innerMsg = msg[viewOnceType]

    let type = Object.keys(innerMsg)[0]
    let contentType = type === 'imageMessage' ? 'image'
                    : type === 'videoMessage' ? 'video'
                    : type === 'audioMessage' ? 'audio'
                    : null

    if (!contentType) throw '𝐐𝐮𝐞𝐬𝐭𝐨 𝐭𝐢𝐩𝐨 𝐝𝐢 𝐦𝐞𝐝𝐢𝐚 𝐧𝐨𝐧 𝐞̀ 𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐚𝐭𝐨¹'

    let stream = await downloadContentFromMessage(innerMsg[type], contentType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }

    if (contentType === 'video') {
        return conn.sendFile(m.chat, buffer, 'media.mp4', innerMsg[type].caption || '', m)
    } else if (contentType === 'image') {
        return conn.sendFile(m.chat, buffer, 'media.jpg', innerMsg[type].caption || '', m)
    } else if (contentType === 'audio') {
        return conn.sendFile(m.chat, buffer, 'voice.opus', '', m, { mimetype: 'audio/ogg; codecs=opus', ptt: true })
    }
}

handler.help = ['readvo']
handler.tags = ['tools']
handler.command = ['readviewonce', 'nocap', 'rivela', 'readvo'] 

export default handler
