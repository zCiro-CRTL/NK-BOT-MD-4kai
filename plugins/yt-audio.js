/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`Que desea buscar en Youtube?, Ejemplo de uso: \n\n${Prefijo + command} mtc s3rl`)
	let name = await conn.getName(m.sender)
	let mcarga = m.reply(`_Procesando, ${name} por favor espere..._`)
	await mcarga
	let playtext = encodeURIComponent(text)
try {
	let myapidl = await fetchJson(`https://latam-api.vercel.app/api/ytplay?apikey=${MyApiKey}&q=${playtext}`)
	let ytthumb = await getBuffer(myapidl.logo)
	await conn.sendMessage(m.chat, {text: `π Resultado encontrado para: ${text}\nβοΈ Titulo: ${myapidl.titulo}\nβ³ Duracion: 1:23 ββββββββββββββ ${myapidl.duracion}\nπ Vistas: ${myapidl.vistas}\nπ Autor: ${myapidl.autor}\nπ DescripciΓ³n: ${myapidl.descripcion}\nβοΈ URL: ${myapidl.link}\n\n\`\`\`Enviando audio, espere...\`\`\``}, {quoted: m })
	conn.sendMessage(m.chat, { audio: { url: myapidl.descarga }, mimetype: 'audio/mpeg', fileName: `${myapidl.titulo}.mp3`, contextInfo:{"externalAdReply":{"title": `${myapidl.titulo}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": ytthumb,"sourceUrl": myapidl.descarga }} }, { quoted: m }).catch(e=>{m.reply(`[ ! ] Ocurrio un error inesperado... u.u`)})
} catch (e) {
m.reply(`[ ! ] Error, vuelva a intentarlo mas tarde...`)
}
}

handler.help = ['audio <texto>']
handler.tags = ['servicio']
handler.command = /^audio$/i
handler.limit = true

export default handler
