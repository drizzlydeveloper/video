require('dayjs/locale/tr')
require("dayjs").extend(require('dayjs/plugin/timezone'))
require("dayjs").extend(require('dayjs/plugin/utc'))
require("dayjs").locale('tr')
let pages, array = {}

module.exports.Connection = async function Connection(server) {
    function ConnectionStatus(Status, Detail) { this.Status = Status, this.Detail = Detail }
    server.listen(process.env.PORT || 5550, async function (err) {
        if (err) array.website = new ConnectionStatus("Not Connected", `Host: unknown - Port: unknown`)
        array.website = new ConnectionStatus("Connected", `Host: ${process.env.PORT ? config.host : config.localhost}`)
    })
    setTimeout(async () => console.table(array), 1500)
}

module.exports.pages = pages = {
    function: async function func(app) {
        app.use((req, res, next) => {
            if (req.hostname !== "localhost" && req.headers['fly-forwarded-proto'] !== "https")
                return res.redirect("https://video.drizzlydeveloper.xyz")
            else next()
        })
        app.get(["/", "/search/:search", "/watch/:videoid"], require("./Index.js"))
        app.post(["/", "/search/*", "/watch/*", "/listen"], require("./Index.js"))
        app.use(async function (req, res) { return res.status(404).render("error") })
    }
}

module.exports.day = async function Day(date, time, time_data) {
    return new Promise((resolve) => { 
        let module = require("dayjs")
        let data;
        let day = time_data ? module(time_data).tz('Asia/Istanbul') : module().tz('Asia/Istanbul')
        return date == "true" && time == "true" ? resolve(day.format("DD MMMM YYYY HH.mm.ss")) :
        date == "true" && time == "false" ? resolve(day.format("DD MMMM YYYY")) :
        date == "false" && time == "true" ? resolve(day.format("HH.mm.ss")) :
        data = resolve(day.format(f1))  
    })
}

module.exports.translate = async function Translate(toLang, text) {
    let module = require('translate-google')
    return new Promise(async (resolve) => {
        resolve(toLang && text ? module(text, { to: toLang }).then((res) => res).catch((err) => err) : null)
    })
}