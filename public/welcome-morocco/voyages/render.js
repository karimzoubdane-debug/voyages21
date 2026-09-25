/* Voyages21 — moteur de rendu unique des pages voyage.
   Structure centralisée + localisation (fr/ar). Le contenu vient de data.js ;
   les médias (vidéo/photos) de la médiathèque en ligne (/api/media).
   Pour une page en arabe : data.voyage.lang = "ar" et la coquille <html dir="rtl" lang="ar">. */
(function () {
    var slug = document.body.getAttribute("data-voyage");
    var baseVoyage = (window.VOYAGES || {})[slug];
    var app = document.getElementById("app");
    if (!baseVoyage) { app.innerHTML = '<p style="padding:2rem;text-align:center">Trip not found.</p>'; return; }

    function preferredLang() {
        var q = new URLSearchParams(window.location.search).get("lang");
        if (q === "zh" || q === "en") return q;
        try {
            var stored = localStorage.getItem("welcomeChinaLang");
            if (stored === "zh" || stored === "en") return stored;
        } catch (e) {}
        return "en";
    }

    var SHARED_MOROCCO = {
        en: {
            eyebrow: "Morocco · Circuits 2026",
            tag: "Morocco",
            cadranLabels: { depart: "Departure", arrival: "Arrival", duration: "Duration", transport: "Transport", board: "Board", guide: "Guide" },
            seasonHigh: "High season", seasonLow: "Low season",
            priceNote: "Price per person in 4-star hotels, full board. Applied conversion: 1 EUR = 1.20 USD.",
            children: "Children rates on request",
            dates: { line: "2026 departures on request, for individuals or groups.", note: "Contact us for a personalized quote according to your dates." },
            inclus: [
                "Air-conditioned tourist vehicle transportation",
                "Accommodation according to the program",
                "Breakfasts included each morning",
                "Local guides according to the program",
                "Voyages 21 assistance"
            ],
            exclus: [
                "International flights",
                "Lunches and dinners unless mentioned",
                "Entrance tickets unless mentioned",
                "Tips and personal extras"
            ]
        },
        zh: {
            eyebrow: "摩洛哥 · 2026 线路",
            tag: "摩洛哥",
            cadranLabels: { depart: "出发", arrival: "抵达", duration: "行程时长", transport: "交通", board: "餐食", guide: "导游" },
            seasonHigh: "旺季", seasonLow: "淡季",
            priceNote: "价格为每人价格，四星酒店，全膳。汇率按 1 欧元 = 1.20 美元换算。",
            children: "儿童价格请咨询",
            dates: { line: "2026 年可按需出发，适合个人或团队。", note: "请联系我们，根据您的日期定制报价。" },
            inclus: [
                "空调旅游车辆交通",
                "按行程安排住宿",
                "每日早餐",
                "按行程安排当地导游",
                "Voyages 21 全程协助"
            ],
            exclus: [
                "国际机票",
                "未注明的午餐和晚餐",
                "未注明的门票",
                "小费及个人消费"
            ]
        }
    };

    var PRODUCT_TRANSLATIONS = {
        "maroc-circuit-imperial-south": {
            en: {
                eyebrow: SHARED_MOROCCO.en.eyebrow, title: "Imperial Cities & Southern Morocco", duration: "8 days / 7 nights", tag: SHARED_MOROCCO.en.tag,
                cadran: [["Departure", "Casablanca"], ["Arrival", "Marrakech"], ["Duration", "8 days / 7 nights"], ["Transport", "Tourist vehicle"], ["Board", "Accommodation + breakfasts"], ["Guide", "Arabic-speaking guide + UNESCO local guide"]],
                intro: ["From Casablanca to the ochre dunes of Erg Chebbi, this circuit crosses the great chapters of Moroccan history: imperial cities, the UNESCO medina of Fez, Chefchaouen and the Sahara of Merzouga.", "The route then descends toward Ait Ben Haddou, a UNESCO-listed earthen kasbah, before ending in the red softness of Marrakech. Eight days through Atlantic coastlines, imperial cities, Sahara and kasbah roads."],
                highlights: ["Fez medina (UNESCO) and Bou Inania Madrasa", "Chefchaouen, the blue city of the Rif", "Erg Chebbi dunes in Merzouga, overnight in a Berber camp", "Ait Ben Haddou, UNESCO-listed ancient kasbah", "Bahia Palace and Koutoubia in Marrakech"],
                days: [
                    { num: "Day 1", title: "Arrival in Casablanca", text: "Welcome at Mohammed V Airport. Visit Hassan II Mosque, one of the largest mosques in the world. Check-in at the hotel.", meta: [["Night", "Casablanca"]] },
                    { num: "Day 2", title: "Casablanca – Rabat – Chefchaouen", text: "Departure to Rabat, the capital of the Kingdom. Visit Mohammed V Mausoleum and Hassan Tower. Continue to Chefchaouen, the blue pearl of the Rif.", meta: [["Night", "Chefchaouen"]] },
                    { num: "Day 3", title: "Chefchaouen – Fez", text: "Free morning in Chefchaouen. Drive to Fez, the spiritual capital of Morocco. First discovery of the city walls and medina.", meta: [["Night", "Fez"]] },
                    { num: "Day 4", title: "Fez — Imperial city (UNESCO)", text: "Full day in Fez medina with guided visits: Bou Inania Madrasa, Chouara tanneries, merchants fondouk and Al-Andalus quarter.", meta: [["Night", "Fez"], ["Guide", "local included"]] },
                    { num: "Day 5", title: "Fez – Desert road – Merzouga", text: "Early departure toward the Sahara via Midelt and Errachidia. Arrival in Merzouga late afternoon. Camel ride at sunset. Overnight in a Berber camp.", meta: [["Night", "Berber camp — Merzouga"]] },
                    { num: "Day 6", title: "Merzouga – Ouarzazate – Ait Ben Haddou", text: "Sunrise over the dunes. Kasbah road toward Ouarzazate. Visit Ait Ben Haddou, UNESCO-listed fortified village.", meta: [["Night", "Ouarzazate"]] },
                    { num: "Day 7", title: "Ouarzazate – Marrakech", text: "Cross the Tichka Pass. Arrival in Marrakech. Discovery of Jemaa el-Fna square and the souks.", meta: [["Night", "Marrakech"]] },
                    { num: "Day 8", title: "Marrakech — Visit and departure", text: "Visit Bahia Palace and Koutoubia. Free afternoon in the souks. Airport transfer according to your flight.", meta: [["Meals", "breakfast"]] }
                ],
                priceTable: { head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."], rows: [["High season", "1 512 USD", "1 423 USD", "1 362 USD", "1 314 USD", "1 284 USD", "414 USD"], ["Low season", "1 314 USD", "1 231 USD", "1 182 USD", "1 140 USD", "1 117 USD", "372 USD"]], note: SHARED_MOROCCO.en.priceNote },
                inclus: SHARED_MOROCCO.en.inclus, exclus: SHARED_MOROCCO.en.exclus, children: SHARED_MOROCCO.en.children, dates: SHARED_MOROCCO.en.dates,
                cta: { title: "8 days: imperial cities and desert", text: "We design this circuit from Casablanca for groups or individual travelers, with the same care since 2000." }
            },
            zh: {
                eyebrow: SHARED_MOROCCO.zh.eyebrow, title: "摩洛哥皇城与南部沙漠", duration: "8 天 / 7 晚", tag: SHARED_MOROCCO.zh.tag,
                cadran: [["出发", "卡萨布兰卡"], ["抵达", "马拉喀什"], ["行程时长", "8 天 / 7 晚"], ["交通", "旅游车辆"], ["餐食", "住宿 + 早餐"], ["导游", "阿语导游 + UNESCO 当地导游"]],
                intro: ["从卡萨布兰卡到厄尔格切比的赭色沙丘，本线路带您穿越摩洛哥历史的重要篇章：皇城、UNESCO 非斯麦地那、舍夫沙万以及梅尔祖卡撒哈拉。", "随后线路前往阿伊特本哈杜，这座泥土古堡被列入世界遗产，最后抵达红城马拉喀什。8 天体验大西洋海岸、皇城、撒哈拉和古堡之路。"],
                highlights: ["非斯麦地那（UNESCO）与布伊纳尼亚神学院", "舍夫沙万，里夫山脉的蓝色之城", "梅尔祖卡厄尔格切比沙丘，入住柏柏尔营地", "阿伊特本哈杜，UNESCO 古堡村", "马拉喀什巴伊亚宫与库图比亚清真寺"],
                days: [
                    { num: "第 1 天", title: "抵达卡萨布兰卡", text: "抵达穆罕默德五世机场后接机。参观哈桑二世清真寺，世界著名大型清真寺之一。入住酒店。", meta: [["夜宿", "卡萨布兰卡"]] },
                    { num: "第 2 天", title: "卡萨布兰卡 – 拉巴特 – 舍夫沙万", text: "前往摩洛哥首都拉巴特，参观穆罕默德五世陵墓和哈桑塔。继续前往里夫山脉的蓝色小城舍夫沙万。", meta: [["夜宿", "舍夫沙万"]] },
                    { num: "第 3 天", title: "舍夫沙万 – 非斯", text: "上午在舍夫沙万自由活动。随后前往摩洛哥精神之都非斯，初步游览城墙和麦地那。", meta: [["夜宿", "非斯"]] },
                    { num: "第 4 天", title: "非斯 — 皇城（UNESCO）", text: "全天游览非斯麦地那：布伊纳尼亚神学院、乔瓦拉皮革染坊、商旅客栈和安达卢斯街区。", meta: [["夜宿", "非斯"], ["导游", "含当地导游"]] },
                    { num: "第 5 天", title: "非斯 – 沙漠之路 – 梅尔祖卡", text: "清晨出发，经米德勒特和拉希迪耶前往撒哈拉。傍晚抵达梅尔祖卡，日落时骑骆驼，夜宿柏柏尔营地。", meta: [["夜宿", "柏柏尔营地 — 梅尔祖卡"]] },
                    { num: "第 6 天", title: "梅尔祖卡 – 瓦尔扎扎特 – 阿伊特本哈杜", text: "欣赏沙丘日出，沿古堡之路前往瓦尔扎扎特。参观 UNESCO 世界遗产阿伊特本哈杜。", meta: [["夜宿", "瓦尔扎扎特"]] },
                    { num: "第 7 天", title: "瓦尔扎扎特 – 马拉喀什", text: "翻越提什卡山口，抵达马拉喀什，游览杰马夫纳广场和传统市场。", meta: [["夜宿", "马拉喀什"]] },
                    { num: "第 8 天", title: "马拉喀什 — 游览与离境", text: "参观巴伊亚宫和库图比亚清真寺。下午在市场自由活动，按航班时间送机。", meta: [["餐食", "早餐"]] }
                ],
                priceTable: { head: ["季节", "20人团", "25人团", "30人团", "35人团", "40人团", "单房差"], rows: [["旺季", "1 512 USD", "1 423 USD", "1 362 USD", "1 314 USD", "1 284 USD", "414 USD"], ["淡季", "1 314 USD", "1 231 USD", "1 182 USD", "1 140 USD", "1 117 USD", "372 USD"]], note: SHARED_MOROCCO.zh.priceNote },
                inclus: SHARED_MOROCCO.zh.inclus, exclus: SHARED_MOROCCO.zh.exclus, children: SHARED_MOROCCO.zh.children, dates: SHARED_MOROCCO.zh.dates,
                cta: { title: "8 天：皇城与沙漠", text: "我们为团队和个人客人定制从卡萨布兰卡出发的线路，自 2000 年以来始终保持同样服务标准。" }
            }
        },
        "maroc-circuit-imperial-cities": {
            en: {
                eyebrow: SHARED_MOROCCO.en.eyebrow, title: "Imperial Cities Tour", duration: "8 days / 7 nights", tag: SHARED_MOROCCO.en.tag,
                cadran: [["Departure", "Casablanca"], ["Arrival", "Marrakech"], ["Duration", "8 days / 7 nights"], ["Transport", "Tourist vehicle"], ["Board", "Accommodation + breakfasts"], ["Guide", "Arabic-speaking guide + local guides"]],
                intro: ["Morocco is a mosaic of imperial cities, each carrying the memory of a dynasty. This tour crosses Casablanca, Rabat, Tangier, Meknes, Fez and Marrakech.", "Eight days to read Moroccan history through mosques, palaces, gates and medinas."],
                highlights: ["Rabat: Mohammed V Mausoleum and Hassan Tower", "Tangier: Kasbah and view over the Strait of Gibraltar", "Meknes: Moulay Ismail Mausoleum", "Fez (UNESCO): Al Attarine Madrasa, tanneries and souks", "Marrakech: Bahia Palace, Saadian Tombs and medina souks"],
                days: [
                    { num: "Day 1", title: "Casablanca — arrival", text: "Welcome at Mohammed V Airport. Visit Hassan II Mosque. Check-in at the hotel.", meta: [["Night", "Casablanca"]] },
                    { num: "Day 2", title: "Casablanca – Rabat", text: "Drive to Rabat. Visit Mohammed V Mausoleum, Hassan Tower, Oudayas Kasbah and Almohad ramparts.", meta: [["Night", "Rabat"]] },
                    { num: "Day 3", title: "Rabat – Tangier", text: "Drive to Tangier via Asilah. Visit the medina and Tangier Kasbah with panoramic views over the Strait of Gibraltar.", meta: [["Night", "Tangier"]] },
                    { num: "Day 4", title: "Tangier – Meknes", text: "Drive to Meknes. Visit Bab Mansour, Moulay Ismail Mausoleum and Heri es-Souani granaries. Excursion to the Roman ruins of Volubilis.", meta: [["Night", "Meknes or Fez"]] },
                    { num: "Day 5", title: "Fez — Imperial city (UNESCO)", text: "Full day in Fez medina: Al Attarine Madrasa, Chouara tanneries, Kissaria and potters quarter.", meta: [["Night", "Fez"], ["Guide", "local included"]] },
                    { num: "Day 6", title: "Fez — free day / Azrou", text: "Free morning in Fez. Optional excursion to Azrou and its cedar forest. Afternoon return to the medina.", meta: [["Night", "Fez"]] },
                    { num: "Day 7", title: "Fez – Marrakech", text: "Drive to Marrakech through the Middle Atlas. Evening arrival and discovery of Jemaa el-Fna.", meta: [["Night", "Marrakech"]] },
                    { num: "Day 8", title: "Marrakech — visit and departure", text: "Visit Bahia Palace, Saadian Tombs and Koutoubia. Free afternoon in the souks. Airport transfer.", meta: [["Meals", "breakfast"]] }
                ],
                priceTable: { head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."], rows: [["High season", "1 524 USD", "1 422 USD", "1 356 USD", "1 308 USD", "1 272 USD", "438 USD"], ["Low season", "1 290 USD", "1 236 USD", "1 182 USD", "1 140 USD", "1 116 USD", "385 USD"]], note: SHARED_MOROCCO.en.priceNote },
                inclus: SHARED_MOROCCO.en.inclus, exclus: SHARED_MOROCCO.en.exclus, children: SHARED_MOROCCO.en.children, dates: SHARED_MOROCCO.en.dates, cta: { title: "Six imperial cities, one journey", text: "We design this trip for groups or individuals, as we have done since 2000." }
            },
            zh: {
                eyebrow: SHARED_MOROCCO.zh.eyebrow, title: "摩洛哥皇城之旅", duration: "8 天 / 7 晚", tag: SHARED_MOROCCO.zh.tag,
                cadran: [["出发", "卡萨布兰卡"], ["抵达", "马拉喀什"], ["行程时长", "8 天 / 7 晚"], ["交通", "旅游车辆"], ["餐食", "住宿 + 早餐"], ["导游", "阿语导游 + 当地导游"]],
                intro: ["摩洛哥由多座皇城组成，每一座城市都承载着不同王朝的记忆。本线路连接卡萨布兰卡、拉巴特、丹吉尔、梅克内斯、非斯和马拉喀什。", "8 天通过清真寺、宫殿、城门与麦地那阅读摩洛哥历史。"],
                highlights: ["拉巴特：穆罕默德五世陵墓与哈桑塔", "丹吉尔：古堡与直布罗陀海峡景观", "梅克内斯：穆莱伊斯梅尔陵", "非斯（UNESCO）：阿塔林神学院、皮革染坊与市场", "马拉喀什：巴伊亚宫、萨阿德王朝陵墓与麦地那市场"],
                days: [
                    { num: "第 1 天", title: "抵达卡萨布兰卡", text: "抵达穆罕默德五世机场后接机。参观哈桑二世清真寺，入住酒店。", meta: [["夜宿", "卡萨布兰卡"]] },
                    { num: "第 2 天", title: "卡萨布兰卡 – 拉巴特", text: "前往拉巴特，参观穆罕默德五世陵墓、哈桑塔、乌达雅古堡和阿尔摩哈德城墙。", meta: [["夜宿", "拉巴特"]] },
                    { num: "第 3 天", title: "拉巴特 – 丹吉尔", text: "经艾西拉前往丹吉尔。游览麦地那和丹吉尔古堡，欣赏直布罗陀海峡全景。", meta: [["夜宿", "丹吉尔"]] },
                    { num: "第 4 天", title: "丹吉尔 – 梅克内斯", text: "前往梅克内斯，参观曼苏尔门、穆莱伊斯梅尔陵和赫里苏阿尼粮仓，并游览罗马遗址沃吕比利斯。", meta: [["夜宿", "梅克内斯或非斯"]] },
                    { num: "第 5 天", title: "非斯 — 皇城（UNESCO）", text: "全天游览非斯麦地那：阿塔林神学院、乔瓦拉皮革染坊、传统市场和陶器区。", meta: [["夜宿", "非斯"], ["导游", "含当地导游"]] },
                    { num: "第 6 天", title: "非斯 — 自由活动 / 阿兹鲁", text: "上午在非斯自由活动。可选前往阿兹鲁和雪松林，下午返回麦地那。", meta: [["夜宿", "非斯"]] },
                    { num: "第 7 天", title: "非斯 – 马拉喀什", text: "经中阿特拉斯前往马拉喀什，傍晚抵达并游览杰马夫纳广场。", meta: [["夜宿", "马拉喀什"]] },
                    { num: "第 8 天", title: "马拉喀什 — 游览与离境", text: "参观巴伊亚宫、萨阿德王朝陵墓和库图比亚清真寺。下午自由活动，随后送机。", meta: [["餐食", "早餐"]] }
                ],
                priceTable: { head: ["季节", "20人团", "25人团", "30人团", "35人团", "40人团", "单房差"], rows: [["旺季", "1 524 USD", "1 422 USD", "1 356 USD", "1 308 USD", "1 272 USD", "438 USD"], ["淡季", "1 290 USD", "1 236 USD", "1 182 USD", "1 140 USD", "1 116 USD", "385 USD"]], note: SHARED_MOROCCO.zh.priceNote },
                inclus: SHARED_MOROCCO.zh.inclus, exclus: SHARED_MOROCCO.zh.exclus, children: SHARED_MOROCCO.zh.children, dates: SHARED_MOROCCO.zh.dates, cta: { title: "六座皇城，一条线路", text: "我们为团队和个人客人定制此行程，自 2000 年以来一直如此。" }
            }
        },
        "maroc-circuit-best-morocco": {
            en: {
                eyebrow: SHARED_MOROCCO.en.eyebrow, title: "Best of Morocco — Cities, Heritage & Sahara", duration: "10 days / 9 nights", tag: SHARED_MOROCCO.en.tag,
                cadran: [["Departure", "Casablanca"], ["Arrival", "Marrakech"], ["Duration", "10 days / 9 nights"], ["Transport", "Tourist vehicle"], ["Board", "Accommodation + breakfasts"], ["Guide", "Arabic-speaking guide + local guides"]],
                intro: ["This circuit is the essence of Morocco: ten days to experience Casablanca, Rabat, Tangier, Chefchaouen, Fez, the Sahara of Merzouga, Ouarzazate and Marrakech.", "A complete journey from Atlantic shores to desert dunes, through imperial medinas and southern kasbah roads."],
                highlights: ["Hassan II Mosque in Casablanca", "Chefchaouen, the blue city of the Moroccan Rif", "Fez (UNESCO): medina, tanneries and madrasas", "Merzouga: overnight in a Berber camp facing Erg Chebbi", "Ait Ben Haddou (UNESCO) and kasbah roads", "Marrakech: Bahia Palace, Saadian Tombs and souks"],
                days: [
                    { num: "Day 1", title: "Casablanca — arrival", text: "Airport welcome. Visit Hassan II Mosque. Check-in at the hotel.", meta: [["Night", "Casablanca"]] },
                    { num: "Day 2", title: "Casablanca – Rabat", text: "Visit Mohammed V Mausoleum, Hassan Tower and Oudayas Kasbah. Coastal road toward the North.", meta: [["Night", "Rabat"]] },
                    { num: "Day 3", title: "Rabat – Tangier – Hercules Caves", text: "Drive to Tangier. Visit Hercules Caves, Cape Spartel and Tangier Kasbah with views over the Strait.", meta: [["Night", "Tangier"]] },
                    { num: "Day 4", title: "Tangier – Chefchaouen", text: "Drive to Chefchaouen, the blue city of the Rif. Discover lanes, fountains and squares of this unique medina.", meta: [["Night", "Chefchaouen"]] },
                    { num: "Day 5", title: "Chefchaouen – Fez", text: "Drive via Ouazzane to Fez. Arrival and first evening exploration of the medina.", meta: [["Night", "Fez"]] },
                    { num: "Day 6", title: "Fez — Imperial city (UNESCO)", text: "Full day in Fez medina: Bou Inania Madrasa, Chouara tanneries, Kissaria and Batha Museum.", meta: [["Night", "Fez"], ["Guide", "local included"]] },
                    { num: "Day 7", title: "Fez – Sahara – Merzouga", text: "Long road to the Sahara via Midelt. Arrival in Merzouga. Camel ride at sunset and overnight in a Berber camp.", meta: [["Night", "Berber camp — Merzouga"]] },
                    { num: "Day 8", title: "Merzouga – Ouarzazate – Ait Ben Haddou", text: "Sunrise over the dunes. Kasbah road to Ouarzazate. Visit Ait Ben Haddou (UNESCO).", meta: [["Night", "Ouarzazate"]] },
                    { num: "Day 9", title: "Ouarzazate – Marrakech", text: "Cross the Tichka Pass. Arrival in Marrakech. Evening at Jemaa el-Fna square.", meta: [["Night", "Marrakech"]] },
                    { num: "Day 10", title: "Marrakech — visit and departure", text: "Visit Bahia Palace, Saadian Tombs and Koutoubia. Airport transfer.", meta: [["Meals", "breakfast"]] }
                ],
                priceTable: { head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."], rows: [["High season", "1 634 USD", "1 585 USD", "1 571 USD", "1 524 USD", "1 458 USD", "508 USD"], ["Low season", "1 392 USD", "1 354 USD", "1 344 USD", "1 306 USD", "1 250 USD", "372 USD"]], note: SHARED_MOROCCO.en.priceNote },
                inclus: SHARED_MOROCCO.en.inclus, exclus: SHARED_MOROCCO.en.exclus, children: SHARED_MOROCCO.en.children, dates: SHARED_MOROCCO.en.dates, cta: { title: "The complete Morocco in 10 days", text: "Atlantic coast, imperial cities, Sahara and kasbah roads, designed tailor-made since 2000." }
            },
            zh: {
                eyebrow: SHARED_MOROCCO.zh.eyebrow, title: "摩洛哥精华 — 城市、文化遗产与撒哈拉", duration: "10 天 / 9 晚", tag: SHARED_MOROCCO.zh.tag,
                cadran: [["出发", "卡萨布兰卡"], ["抵达", "马拉喀什"], ["行程时长", "10 天 / 9 晚"], ["交通", "旅游车辆"], ["餐食", "住宿 + 早餐"], ["导游", "阿语导游 + 当地导游"]],
                intro: ["这条线路是摩洛哥精华：10 天体验卡萨布兰卡、拉巴特、丹吉尔、舍夫沙万、非斯、梅尔祖卡撒哈拉、瓦尔扎扎特和马拉喀什。", "从大西洋海岸到沙漠沙丘，穿越皇城麦地那与南部古堡之路。"],
                highlights: ["卡萨布兰卡哈桑二世清真寺", "舍夫沙万，摩洛哥里夫山脉蓝城", "非斯（UNESCO）：麦地那、皮革染坊与神学院", "梅尔祖卡：面对厄尔格切比沙丘夜宿柏柏尔营地", "阿伊特本哈杜（UNESCO）与古堡之路", "马拉喀什：巴伊亚宫、萨阿德王朝陵墓与市场"],
                days: [
                    { num: "第 1 天", title: "抵达卡萨布兰卡", text: "机场接机。参观哈桑二世清真寺，入住酒店。", meta: [["夜宿", "卡萨布兰卡"]] },
                    { num: "第 2 天", title: "卡萨布兰卡 – 拉巴特", text: "参观穆罕默德五世陵墓、哈桑塔和乌达雅古堡，沿海岸公路向北。", meta: [["夜宿", "拉巴特"]] },
                    { num: "第 3 天", title: "拉巴特 – 丹吉尔 – 赫拉克勒斯洞", text: "前往丹吉尔，参观赫拉克勒斯洞、斯帕特尔角和丹吉尔古堡。", meta: [["夜宿", "丹吉尔"]] },
                    { num: "第 4 天", title: "丹吉尔 – 舍夫沙万", text: "前往里夫山脉蓝城舍夫沙万，游览独特麦地那的街巷、喷泉与广场。", meta: [["夜宿", "舍夫沙万"]] },
                    { num: "第 5 天", title: "舍夫沙万 – 非斯", text: "经瓦赞前往非斯，抵达后傍晚初步探索麦地那。", meta: [["夜宿", "非斯"]] },
                    { num: "第 6 天", title: "非斯 — 皇城（UNESCO）", text: "全天游览非斯麦地那：布伊纳尼亚神学院、乔瓦拉皮革染坊、传统市场和巴塔博物馆。", meta: [["夜宿", "非斯"], ["导游", "含当地导游"]] },
                    { num: "第 7 天", title: "非斯 – 撒哈拉 – 梅尔祖卡", text: "经米德勒特长途前往撒哈拉。抵达梅尔祖卡，日落骑骆驼，夜宿柏柏尔营地。", meta: [["夜宿", "柏柏尔营地 — 梅尔祖卡"]] },
                    { num: "第 8 天", title: "梅尔祖卡 – 瓦尔扎扎特 – 阿伊特本哈杜", text: "欣赏沙丘日出，沿古堡之路前往瓦尔扎扎特，参观阿伊特本哈杜（UNESCO）。", meta: [["夜宿", "瓦尔扎扎特"]] },
                    { num: "第 9 天", title: "瓦尔扎扎特 – 马拉喀什", text: "翻越提什卡山口，抵达马拉喀什，傍晚游览杰马夫纳广场。", meta: [["夜宿", "马拉喀什"]] },
                    { num: "第 10 天", title: "马拉喀什 — 游览与离境", text: "参观巴伊亚宫、萨阿德王朝陵墓和库图比亚清真寺，随后送机。", meta: [["餐食", "早餐"]] }
                ],
                priceTable: { head: ["季节", "20人团", "25人团", "30人团", "35人团", "40人团", "单房差"], rows: [["旺季", "1 634 USD", "1 585 USD", "1 571 USD", "1 524 USD", "1 458 USD", "508 USD"], ["淡季", "1 392 USD", "1 354 USD", "1 344 USD", "1 306 USD", "1 250 USD", "372 USD"]], note: SHARED_MOROCCO.zh.priceNote },
                inclus: SHARED_MOROCCO.zh.inclus, exclus: SHARED_MOROCCO.zh.exclus, children: SHARED_MOROCCO.zh.children, dates: SHARED_MOROCCO.zh.dates, cta: { title: "10 天完整体验摩洛哥", text: "大西洋海岸、皇城、撒哈拉与古堡之路，自 2000 年以来为您定制。" }
            }
        },
        "maroc-circuit-discover-kingdom": {
            en: {
                eyebrow: SHARED_MOROCCO.en.eyebrow, duration: "12 days / 11 nights", tag: SHARED_MOROCCO.en.tag,
                cadran: [["Departure", "Marrakech"], ["Arrival", "Marrakech"], ["Duration", "12 days / 11 nights"], ["Transport", "Tourist vehicle"], ["Board", "Full board"], ["Guide", "Local guides according to stages"]],
                intro: ["A complete circuit across the Kingdom: Marrakech, Casablanca, Meknes, Fez, the Middle Atlas, Merzouga Sahara, Ouarzazate, Agadir and back to Marrakech.", "Designed as a structured discovery of imperial, Saharan and Atlantic Morocco, combining heritage, mountains, desert, kasbah roads and free time on the coast."],
                highlights: ["Marrakech, Casablanca, Meknes and Fez", "Volubilis, Moulay Idriss and imperial sites", "Ifrane and the Middle Atlas", "Sahara experience in Merzouga", "Todra Gorges, Dades Valley and Ouarzazate", "Agadir and the Atlantic coast"],
                inclus: ["Accommodation in double room with private bathroom in mentioned or similar hotels", "Tourist taxes and promotion taxes", "Private vehicle transportation", "Local taxes and 20% VAT", "English-speaking or Chinese-speaking local guide according to stages", "Assistance throughout the stay", "Two small bottles of mineral water per person per day during transfers", "All services mentioned in the program"],
                exclus: ["Single supplement", "Extras and personal expenses", "Tips for guide, driver, restaurants and hotels", "Air tickets", "Interior visit of Hassan II Mosque", "Fantasia Chez Ali in Marrakech", "All services not mentioned in the program"],
                priceTable: { head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."], rows: [["High season", "1 910 USD", "1 850 USD", "1 829 USD", "1 771 USD", "1 692 USD", "521 USD"], ["Low season", "1 650 USD", "1 602 USD", "1 588 USD", "1 540 USD", "1 474 USD", "425 USD"]], note: SHARED_MOROCCO.en.priceNote },
                children: SHARED_MOROCCO.en.children, dates: { line: "2026 departures on request, for individuals or groups.", note: "Seasonality according to the Morocco circuits 2026 price grid." }, cta: { title: "12 days to discover the Kingdom", text: "We design this circuit for groups and individual travelers with the Voyages 21 service logic." }
            },
            zh: {
                eyebrow: SHARED_MOROCCO.zh.eyebrow, title: "探索摩洛哥王国", duration: "12 天 / 11 晚", tag: SHARED_MOROCCO.zh.tag,
                cadran: [["出发", "马拉喀什"], ["抵达", "马拉喀什"], ["行程时长", "12 天 / 11 晚"], ["交通", "旅游车辆"], ["餐食", "全膳"], ["导游", "按行程安排当地导游"]],
                intro: ["一条完整穿越摩洛哥王国的线路：马拉喀什、卡萨布兰卡、梅克内斯、非斯、中阿特拉斯、梅尔祖卡撒哈拉、瓦尔扎扎特、阿加迪尔，最后返回马拉喀什。", "线路结合皇城文化、山地风光、沙漠、古堡之路以及大西洋海岸自由时光。"],
                highlights: ["马拉喀什、卡萨布兰卡、梅克内斯与非斯", "沃吕比利斯、穆莱伊德里斯和皇城遗迹", "伊夫兰与中阿特拉斯", "梅尔祖卡撒哈拉体验", "托德拉峡谷、达德斯谷与瓦尔扎扎特", "阿加迪尔与大西洋海岸"],
                days: [
                    { num: "第 1 天", title: "抵达马拉喀什", text: "抵达马拉喀什梅纳拉机场。代表接机并协助入境手续。送往酒店。根据抵达时间，可自由初步探索红城。酒店晚餐，夜宿马拉喀什。" },
                    { num: "第 2 天", title: "马拉喀什导览", text: "早餐后，全面游览马拉喀什：库图比亚清真寺、巴伊亚宫、梅纳拉花园、古城墙和杰马夫纳广场。午餐自理。傍晚返回酒店，晚餐并夜宿马拉喀什。" },
                    { num: "第 3 天", title: "马拉喀什 – 卡萨布兰卡", text: "早餐后经高速前往卡萨布兰卡。抵达后午餐自理。下午游览穆罕默德五世广场、哈布斯区、艾因迪亚布海滨大道，并外观哈桑二世清真寺（内部参观可选）。入住酒店，晚餐并夜宿卡萨布兰卡。" },
                    { num: "第 4 天", title: "卡萨布兰卡 – 非斯", text: "早餐后前往非斯。途中参观梅克内斯：城墙、赫迪姆广场、穆莱伊斯梅尔粮仓。午餐自理。下午游览沃吕比利斯罗马遗址和圣城穆莱伊德里斯。继续前往非斯，晚餐并夜宿。" },
                    { num: "第 5 天", title: "非斯城市游览", text: "早餐后全天游览非斯：卡鲁因大学、阿塔林神学院、传统手工艺区和皮革染坊。下午参观王宫外观、犹太区和新城。返回酒店，晚餐并夜宿非斯。" },
                    { num: "第 6 天", title: "非斯 – 梅尔祖卡", text: "早餐后清晨出发，经伊夫兰、中阿特拉斯雪松林、米德勒特和齐兹谷前往梅尔祖卡。傍晚抵达撒哈拉门户，入住酒店或沙漠营地，晚餐并夜宿。" },
                    { num: "第 7 天", title: "梅尔祖卡 – 瓦尔扎扎特", text: "早餐后经厄尔富德、托德拉峡谷、达德斯谷和千座古堡之路前往瓦尔扎扎特。途中午餐。抵达后入住酒店，晚餐并夜宿。", },
                    { num: "第 8 天", title: "瓦尔扎扎特 – 阿加迪尔", text: "早餐后外观陶里尔特古堡，并视情况参观电影拍摄基地。穿越反阿特拉斯山脉和柏柏尔村庄前往阿加迪尔。途中午餐，晚上抵达，入住酒店，晚餐并夜宿。" },
                    { num: "第 9 天", title: "阿加迪尔自由日", text: "早餐后在阿加迪尔自由活动，可享受海滩、酒店设施或可选活动（天堂谷、El Had 市场、游船、传统浴等）。午餐自理，晚餐并夜宿阿加迪尔。" },
                    { num: "第 10 天", title: "阿加迪尔 – 马拉喀什", text: "早餐后经高速返回马拉喀什。下午抵达并入住酒店。自由购物或休息。晚餐并夜宿马拉喀什。" },
                    { num: "第 11 天", title: "马拉喀什自由日", text: "早餐后全天自由活动，可休息、购物或参加可选活动：乌里卡谷、阿加菲沙漠、索维拉、传统浴、SPA 或晚餐秀。晚餐并夜宿马拉喀什。" },
                    { num: "第 12 天", title: "马拉喀什送机", text: "早餐后根据航班时间送往马拉喀什梅纳拉机场，并协助办理登机手续。服务结束。" }
                ],
                inclus: ["双人间住宿，私人浴室，入住所列或同级酒店", "城市税及旅游推广税", "私人车辆交通", "当地税费及 20% 增值税", "按行程安排英文或中文当地导游", "全程协助", "行车期间每人每天两小瓶矿泉水", "行程中注明的全部服务"],
                exclus: ["单房差", "个人消费及额外费用", "导游、司机、餐厅和酒店小费", "机票", "哈桑二世清真寺内部参观", "马拉喀什 Chez Ali 幻想秀", "所有未在行程中注明的服务"],
                priceTable: { head: ["季节", "20人团", "25人团", "30人团", "35人团", "40人团", "单房差"], rows: [["旺季", "1 910 USD", "1 850 USD", "1 829 USD", "1 771 USD", "1 692 USD", "521 USD"], ["淡季", "1 650 USD", "1 602 USD", "1 588 USD", "1 540 USD", "1 474 USD", "425 USD"]], note: SHARED_MOROCCO.zh.priceNote },
                children: SHARED_MOROCCO.zh.children, dates: { line: "2026 年可按需出发，适合个人或团队。", note: "季节价格按 2026 摩洛哥线路价格表执行。" }, cta: { title: "12 天探索摩洛哥王国", text: "我们为团队和个人客人设计此线路，延续 Voyages 21 的服务逻辑。" }
            }
        },
        "maroc-circuit-grand-discovery": {
            en: {
                eyebrow: SHARED_MOROCCO.en.eyebrow, title: "Splendid Morocco — Grand Discovery", duration: "15 days / 14 nights", tag: SHARED_MOROCCO.en.tag,
                cadran: [["Departure", "Marrakech"], ["Arrival", "Marrakech"], ["Duration", "15 days / 14 nights"], ["Transport", "Tourist vehicle"], ["Board", "Accommodation + breakfasts"], ["Guide", "Arabic-speaking guide + local guides"]],
                intro: ["Fifteen days to discover Morocco in its full breadth: Marrakech, Casablanca, Rabat, Meknes, Fez, Chefchaouen, Merzouga, Ouarzazate, Essaouira and Agadir.", "A grand loop through imperial medinas, the blue city, Sahara dunes, southern kasbahs and Atlantic coastline."],
                highlights: ["Marrakech: Bahia Palace, Saadian Tombs, Jemaa el-Fna", "Casablanca: Hassan II Mosque facing the Atlantic", "Chefchaouen, the blue pearl of the Rif", "Fez (UNESCO): Bou Inania Madrasa and Chouara tanneries", "Merzouga: overnight Berber camp facing Erg Chebbi", "Ait Ben Haddou (UNESCO) and kasbah roads", "Essaouira: city walls, medina and Atlantic port"],
                days: [
                    { num: "Day 1", title: "Marrakech — arrival", text: "Airport welcome. Visit Koutoubia and Jemaa el-Fna square. Check-in at the hotel.", meta: [["Night", "Marrakech"]] },
                    { num: "Day 2", title: "Marrakech — Bahia, Saadians, souks", text: "Day in the medina: Bahia Palace, Saadian Tombs, Ben Youssef Madrasa, souks and dyeing quarters.", meta: [["Night", "Marrakech"]] },
                    { num: "Day 3", title: "Marrakech – Casablanca", text: "Drive to Casablanca. Visit Hassan II Mosque and the Atlantic Corniche.", meta: [["Night", "Casablanca"]] },
                    { num: "Day 4", title: "Casablanca – Rabat", text: "Drive to the capital. Mohammed V Mausoleum, Hassan Tower, Oudayas Kasbah and Almohad ramparts.", meta: [["Night", "Rabat"]] },
                    { num: "Day 5", title: "Rabat – Meknes – Volubilis", text: "Meknes visit: Bab Mansour, Moulay Ismail Mausoleum and Heri es-Souani. Excursion to Volubilis Roman ruins.", meta: [["Night", "Meknes or Fez"]] },
                    { num: "Day 6", title: "Fez — Imperial city (UNESCO)", text: "Day in Fez medina: Bou Inania Madrasa, Chouara tanneries, Kissaria and Batha Museum.", meta: [["Night", "Fez"], ["Guide", "local included"]] },
                    { num: "Day 7", title: "Fez — free day", text: "Second day in Fez to explore souks, Al-Andalus quarter, fondouks and craft workshops.", meta: [["Night", "Fez"]] },
                    { num: "Day 8", title: "Fez – Chefchaouen", text: "Drive to Chefchaouen, the blue city of the Rif. Discover cobalt-blue lanes.", meta: [["Night", "Chefchaouen"]] },
                    { num: "Day 9", title: "Chefchaouen — free time and road", text: "Free morning in Chefchaouen. Lunch, then road toward Fez or the South according to program.", meta: [["Night", "Road toward the South"]] },
                    { num: "Day 10", title: "Desert road – Merzouga", text: "Long road to the Sahara via Midelt. Arrival in Merzouga, camel ride and overnight in Berber camp.", meta: [["Night", "Berber camp — Merzouga"]] },
                    { num: "Day 11", title: "Merzouga – Ouarzazate", text: "Sunrise. Kasbah road via Rissani, Tinghir, Todra Gorges, Skoura and Ouarzazate.", meta: [["Night", "Ouarzazate"]] },
                    { num: "Day 12", title: "Ouarzazate – Ait Ben Haddou – Marrakech", text: "Visit Ait Ben Haddou (UNESCO). Cross Tichka Pass. Arrival in Marrakech in the evening.", meta: [["Night", "Marrakech"]] },
                    { num: "Day 13", title: "Marrakech – Essaouira", text: "Drive to Essaouira. Visit city walls, fishing port and UNESCO medina.", meta: [["Night", "Essaouira"]] },
                    { num: "Day 14", title: "Essaouira – Agadir", text: "Coastal road to Agadir. Discover the bay, kasbah and Atlantic corniche.", meta: [["Night", "Agadir"]] },
                    { num: "Day 15", title: "Agadir – Marrakech — departure", text: "Return road to Marrakech. Airport transfer according to your flight.", meta: [["Meals", "breakfast"]] }
                ],
                priceTable: { head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."], rows: [["High season", "2 508 USD", "2 434 USD", "2 413 USD", "2 342 USD", "2 240 USD", "685 USD"], ["Low season", "2 124 USD", "2 064 USD", "2 050 USD", "1 992 USD", "1 907 USD", "534 USD"]], note: SHARED_MOROCCO.en.priceNote },
                inclus: SHARED_MOROCCO.en.inclus, exclus: SHARED_MOROCCO.en.exclus, children: SHARED_MOROCCO.en.children, dates: SHARED_MOROCCO.en.dates, cta: { title: "15 days, the grand tour of Morocco", text: "From imperial cities to the Atlantic, through the Sahara, crafted tailor-made since 2000." }
            },
            zh: {
                eyebrow: SHARED_MOROCCO.zh.eyebrow, title: "壮丽摩洛哥 — 深度大环线", duration: "15 天 / 14 晚", tag: SHARED_MOROCCO.zh.tag,
                cadran: [["出发", "马拉喀什"], ["抵达", "马拉喀什"], ["行程时长", "15 天 / 14 晚"], ["交通", "旅游车辆"], ["餐食", "住宿 + 早餐"], ["导游", "阿语导游 + 当地导游"]],
                intro: ["15 天完整发现摩洛哥：马拉喀什、卡萨布兰卡、拉巴特、梅克内斯、非斯、舍夫沙万、梅尔祖卡、瓦尔扎扎特、索维拉和阿加迪尔。", "一条大环线，穿越皇城麦地那、蓝城、撒哈拉沙丘、南部古堡和大西洋海岸。"],
                highlights: ["马拉喀什：巴伊亚宫、萨阿德王朝陵墓、杰马夫纳广场", "卡萨布兰卡：面向大西洋的哈桑二世清真寺", "舍夫沙万，里夫山脉蓝色明珠", "非斯（UNESCO）：布伊纳尼亚神学院与乔瓦拉皮革染坊", "梅尔祖卡：面向厄尔格切比夜宿柏柏尔营地", "阿伊特本哈杜（UNESCO）与古堡之路", "索维拉：城墙、麦地那与大西洋港口"],
                days: [
                    { num: "第 1 天", title: "抵达马拉喀什", text: "机场接机。参观库图比亚清真寺和杰马夫纳广场，入住酒店。", meta: [["夜宿", "马拉喀什"]] },
                    { num: "第 2 天", title: "马拉喀什 — 巴伊亚、王陵与市场", text: "全天游览麦地那：巴伊亚宫、萨阿德王朝陵墓、本优素福神学院、市场和染坊。", meta: [["夜宿", "马拉喀什"]] },
                    { num: "第 3 天", title: "马拉喀什 – 卡萨布兰卡", text: "前往卡萨布兰卡，参观哈桑二世清真寺和大西洋海滨大道。", meta: [["夜宿", "卡萨布兰卡"]] },
                    { num: "第 4 天", title: "卡萨布兰卡 – 拉巴特", text: "前往首都拉巴特，参观穆罕默德五世陵墓、哈桑塔、乌达雅古堡和城墙。", meta: [["夜宿", "拉巴特"]] },
                    { num: "第 5 天", title: "拉巴特 – 梅克内斯 – 沃吕比利斯", text: "参观梅克内斯：曼苏尔门、穆莱伊斯梅尔陵、赫里苏阿尼粮仓，并游览沃吕比利斯罗马遗址。", meta: [["夜宿", "梅克内斯或非斯"]] },
                    { num: "第 6 天", title: "非斯 — 皇城（UNESCO）", text: "全天游览非斯麦地那：布伊纳尼亚神学院、乔瓦拉皮革染坊、传统市场和巴塔博物馆。", meta: [["夜宿", "非斯"], ["导游", "含当地导游"]] },
                    { num: "第 7 天", title: "非斯自由日", text: "第二天在非斯探索市场、安达卢斯区、商旅客栈和手工艺作坊。", meta: [["夜宿", "非斯"]] },
                    { num: "第 8 天", title: "非斯 – 舍夫沙万", text: "前往里夫山脉蓝城舍夫沙万，游览钴蓝色街巷。", meta: [["夜宿", "舍夫沙万"]] },
                    { num: "第 9 天", title: "舍夫沙万自由活动与行车", text: "上午在舍夫沙万自由活动。午餐后按行程前往非斯或南部方向。", meta: [["夜宿", "前往南部途中"]] },
                    { num: "第 10 天", title: "沙漠之路 – 梅尔祖卡", text: "经米德勒特长途前往撒哈拉。抵达梅尔祖卡，骑骆驼并夜宿柏柏尔营地。", meta: [["夜宿", "柏柏尔营地 — 梅尔祖卡"]] },
                    { num: "第 11 天", title: "梅尔祖卡 – 瓦尔扎扎特", text: "欣赏日出。沿古堡之路经里萨尼、廷吉尔、托德拉峡谷、斯库拉前往瓦尔扎扎特。", meta: [["夜宿", "瓦尔扎扎特"]] },
                    { num: "第 12 天", title: "瓦尔扎扎特 – 阿伊特本哈杜 – 马拉喀什", text: "参观阿伊特本哈杜（UNESCO），翻越提什卡山口，傍晚抵达马拉喀什。", meta: [["夜宿", "马拉喀什"]] },
                    { num: "第 13 天", title: "马拉喀什 – 索维拉", text: "前往索维拉，参观城墙、渔港和 UNESCO 麦地那。", meta: [["夜宿", "索维拉"]] },
                    { num: "第 14 天", title: "索维拉 – 阿加迪尔", text: "沿海公路前往阿加迪尔，游览海湾、古堡和大西洋海滨大道。", meta: [["夜宿", "阿加迪尔"]] },
                    { num: "第 15 天", title: "阿加迪尔 – 马拉喀什 — 离境", text: "返回马拉喀什，根据航班时间送机。", meta: [["餐食", "早餐"]] }
                ],
                priceTable: { head: ["季节", "20人团", "25人团", "30人团", "35人团", "40人团", "单房差"], rows: [["旺季", "2 508 USD", "2 434 USD", "2 413 USD", "2 342 USD", "2 240 USD", "685 USD"], ["淡季", "2 124 USD", "2 064 USD", "2 050 USD", "1 992 USD", "1 907 USD", "534 USD"]], note: SHARED_MOROCCO.zh.priceNote },
                inclus: SHARED_MOROCCO.zh.inclus, exclus: SHARED_MOROCCO.zh.exclus, children: SHARED_MOROCCO.zh.children, dates: SHARED_MOROCCO.zh.dates, cta: { title: "15 天摩洛哥深度大环线", text: "从皇城到大西洋，途经撒哈拉，自 2000 年以来为您定制。" }
            }
        }
    };

    function mergeVoyage(base, lang) {
        var local = (PRODUCT_TRANSLATIONS[slug] && PRODUCT_TRANSLATIONS[slug][lang]) || {};
        var t = Object.assign({}, local, (base.translations && base.translations[lang]) || {});
        var merged = {};
        Object.keys(base).forEach(function (k) { merged[k] = base[k]; });
        Object.keys(t).forEach(function (k) { merged[k] = t[k]; });
        merged.lang = lang;
        return merged;
    }

    var currentLang = preferredLang();
    var v = mergeVoyage(baseVoyage, currentLang);

    var WHATSAPP = v.whatsapp || "212673280009";
    var TITLE = v.title;
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.documentElement.dir = "ltr";
    document.title = TITLE + " — WelcomeChina";

    var LABELS = {
        fr: {
            back: "‹ Retour à la brochure", soundOn: "Activer le son", soundOff: "Couper le son",
            from: "À partir de", quote: "Contact WeChat", quoteWa: "Contact WeChat",
            seeVideo: "Voir la vidéo", trust: "Sur mesure · Voyages 21, depuis 2000",
            why: "Pourquoi vous allez adorer ce voyage", itinDays: "Itinéraire jour par jour", itin: "Itinéraire",
            included: "Ce qui est inclus", includes: "Notre tarif comprend", excludes: "Notre tarif ne comprend pas",
            accommodation: "Hébergement", mapTitle: "L'itinéraire en un coup d'œil", datesPrices: "Dates & prix",
            childPrices: "Tarifs enfants :", photos: "photos", videoSoon: "Vidéo bientôt disponible", openLink: "Ouvrir le lien",
            tabWhy: "Le voyage", tabItin: "Itinéraire", tabIncl: "Inclus", tabHotel: "Hébergement", tabMap: "Carte", tabDates: "Dates & prix",
            askText: function (t, l) { return "Bonjour, je suis intéressé(e) par le voyage « " + t + " »" + (l ? " (" + l + ")" : "") + ". Pouvez-vous me faire une proposition ?"; }
        },
        en: {
            back: "‹ Back to brochure", soundOn: "Enable sound", soundOff: "Mute",
            from: "From", quote: "Contact WeChat", quoteWa: "Contact WeChat",
            seeVideo: "Watch the video", trust: "Tailor-made travel · Voyages 21, since 2000",
            why: "Why you will love this trip", itinDays: "Day-by-day itinerary", itin: "Itinerary",
            included: "What is included", includes: "Our price includes", excludes: "Our price does not include",
            accommodation: "Accommodation", mapTitle: "Route at a glance", datesPrices: "Dates & prices",
            childPrices: "Children prices:", photos: "photos", videoSoon: "Video coming soon", openLink: "Open link",
            tabWhy: "Trip", tabItin: "Itinerary", tabIncl: "Included", tabHotel: "Hotels", tabMap: "Route", tabDates: "Dates & prices",
            askText: function (t, l) { return "Hello, I am interested in the trip \"" + t + "\"" + (l ? " (" + l + ")" : "") + ". Could you send me an offer?"; }
        },
        zh: {
            back: "‹ 返回手册", soundOn: "开启声音", soundOff: "静音",
            from: "起价", quote: "微信联系", quoteWa: "微信联系",
            seeVideo: "观看视频", trust: "定制旅行 · Voyages 21，自 2000 年起",
            why: "为什么选择这条线路", itinDays: "每日行程", itin: "行程",
            included: "费用包含", includes: "报价包含", excludes: "报价不含",
            accommodation: "住宿", mapTitle: "线路一览", datesPrices: "日期与价格",
            childPrices: "儿童价格：", photos: "张照片", videoSoon: "视频即将上线", openLink: "打开链接",
            tabWhy: "线路", tabItin: "行程", tabIncl: "包含", tabHotel: "住宿", tabMap: "路线", tabDates: "日期与价格",
            askText: function (t, l) { return "您好，我对“" + t + "”线路感兴趣" + (l ? "（" + l + "）" : "") + "，请给我一份报价。"; }
        },
        ar: {
            back: "‹ العودة إلى الكتيّب", soundOn: "تشغيل الصوت", soundOff: "كتم الصوت",
            from: "ابتداءً من", quote: "WeChat", quoteWa: "WeChat",
            seeVideo: "شاهد الفيديو", trust: "رحلة على المقاس · Voyages 21 منذ 2000",
            why: "لماذا ستحبّون هذه الرحلة", itinDays: "البرنامج يوماً بيوم", itin: "البرنامج",
            included: "ما يشمله العرض", includes: "يشمل سعرنا", excludes: "لا يشمل سعرنا",
            accommodation: "الإقامة", mapTitle: "مسار الرحلة", datesPrices: "التواريخ والأسعار",
            childPrices: "أسعار الأطفال:", photos: "صور", videoSoon: "الفيديو متوفّر قريباً", openLink: "افتح الرابط",
            tabWhy: "الرحلة", tabItin: "البرنامج", tabIncl: "المشمول", tabHotel: "الإقامة", tabMap: "الخريطة", tabDates: "التواريخ",
            askText: function (t, l) { return "السلام عليكم، أنا مهتمّ برحلة « " + t + " »" + (l ? " (" + l + ")" : "") + ". هل يمكنكم تقديم عرض؟"; }
        }
    };
    var L = LABELS[currentLang] || LABELS.en;

    // En arabe (RTL), un nombre composé "17 200" est réordonné en "200 17" par l'algorithme
    // bidirectionnel. On isole chaque suite de chiffres dans un span LTR pour la lire correctement.
    function bidiNum(s) {
        if (v.lang !== "ar" || s == null) return s;
        return String(s).replace(/(\d[\d ]*\d|\d)/g, '<span dir="ltr" style="unicode-bidi:isolate">$1</span>');
    }

    var cadran = (v.cadran || []).map(function (r) {
        return '<div class="cadran-row"><span class="k">' + r[0] + '</span><span class="v">' + bidiNum(r[1]) + '</span></div>';
    }).join("");

    var intro = (v.intro || []).map(function (p) { return "<p>" + p + "</p>"; }).join("");
    var highlights = (v.highlights || []).map(function (h) { return "<li>" + h + "</li>"; }).join("");

    var days = (v.days || []).map(function (d, i) {
        var meta = (d.meta || []).map(function (m) { return "<span><b>" + m[0] + " :</b> " + m[1] + "</span>"; }).join("");
        if (d.opt) meta += '<span class="opt">' + d.opt + "</span>";
        var topt = d.titleOpt ? ' <span class="opt">' + d.titleOpt + "</span>" : "";
        return '<div class="day' + (i === 0 ? " open" : "") + '">'
            + '<button class="day-head" onclick="toggleDay(this)"><span class="day-num">' + d.num + '</span>'
            + '<span class="day-title">' + d.title + topt + '</span><span class="day-chev"></span></button>'
            + '<div class="day-body"><div class="day-body-inner">' + d.text
            + (meta ? '<div class="day-meta">' + meta + "</div>" : "") + "</div></div></div>";
    }).join("");

    var inc = (v.inclus || []).map(function (x) { return "<li>" + x + "</li>"; }).join("");
    var exc = (v.exclus || []).map(function (x) { return "<li>" + x + "</li>"; }).join("");
    var route = (v.route || v.programme || []).map(function (s, i) {
        return (i ? '<span class="sep">—</span>' : "") + '<span class="stop">' + s + "</span>";
    }).join("");
    var mapVisual = v.mapImage ? '<figure class="route-map"><img src="' + v.mapImage + '" alt="' + L.mapTitle + ' - ' + v.title + '" loading="lazy"></figure>' : "";
    var dates = v.dates || {};
    var cta = v.cta || {};

    var hotelsHtml = (v.hotels && v.hotels.length)
        ? '<ul class="hotels">' + v.hotels.map(function (h) { return "<li>" + h + "</li>"; }).join("") + "</ul>"
        : (v.hebergement ? '<div class="stay">' + v.hebergement + "</div>" : "");
    var priceHtml = "";
    if (v.priceTable) {
        priceHtml = '<div class="ptable-wrap"><table class="ptable" dir="ltr"><thead><tr>' + v.priceTable.head.map(function (h) { return "<th>" + h + "</th>"; }).join("")
            + "</tr></thead><tbody>" + v.priceTable.rows.map(function (r) {
                return "<tr>" + r.map(function (c, i) { return i === 0 ? "<th>" + c + "</th>" : '<td>' + bidiNum(c) + "</td>"; }).join("") + "</tr>";
            }).join("") + "</tbody></table></div>"
            + (v.priceTable.note ? '<p class="note">' + bidiNum(v.priceTable.note) + "</p>" : "");
    }
    var childrenHtml = v.children ? '<p class="note"><b>' + L.childPrices + "</b> " + bidiNum(v.children) + "</p>" : "";
    var datesListHtml = (v.datesList && v.datesList.length)
        ? '<div class="datechips">' + v.datesList.map(function (x) { return "<span>" + bidiNum(x) + "</span>"; }).join("") + "</div>"
        : "";
    var inclusBlock = '<div class="incbox in"><h3>' + L.includes + '</h3><ul class="ticks">' + inc + "</ul></div>";
    if (exc) inclusBlock = '<div class="twocol">' + inclusBlock + '<div class="incbox out"><h3>' + L.excludes + '</h3><ul class="ticks">' + exc + "</ul></div></div>";
    var itinTitle = (v.days && v.days.length) ? L.itinDays : L.itin;
    var itinBody = (v.days && v.days.length) ? days
        : ((v.programme && v.programme.length) ? '<ol class="steps">' + v.programme.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "");

    app.innerHTML =
        '<div class="topbar"><div class="topbar-inner"><a href="/welcome-morocco/">' + L.back + '</a><span class="brand">WelcomeChina</span><div class="lang-switch" role="group" aria-label="Language"><button class="lang-btn' + (currentLang === "en" ? " active" : "") + '" onclick="setVoyageLang(\'en\')">English</button><button class="lang-btn' + (currentLang === "zh" ? " active" : "") + '" onclick="setVoyageLang(\'zh\')">中文</button></div></div></div>'
        + '<div class="page">'
        + (v.eyebrow ? '<div class="eyebrow">' + v.eyebrow + "</div>" : "")
        + '<h1 class="voyage-title">' + v.title + (v.duration ? ' <span class="dur-badge">' + v.duration + "</span>" : "") + "</h1>"
        + '<div class="hero-row">'
        + '<div class="media-col"><div class="media-main" id="hero">'
        + (v.tag ? '<span class="media-tag">' + v.tag + "</span>" : "")
        + '<video id="heroVideo" muted loop playsinline autoplay preload="auto"></video>'
        + '<button class="sound-toggle" id="soundBtn" onclick="toggleSound()">' + L.soundOn + '</button>'
        + '</div><div class="thumbs" id="thumbs" style="display:none"></div></div>'
        + '<aside class="cadran">' + cadran
        + '<div class="cadran-price">' + L.from + ' <b>' + bidiNum(v.price || "—") + "</b></div>"
        + '<button class="btn btn-gold full" onclick="ask(\'\')">' + L.quote + '</button>'
        + '<button class="btn btn-gold full" id="voirVideo" style="display:none;background:transparent;color:var(--forest);border:1px solid var(--gold);margin-top:.5rem">' + L.seeVideo + '</button>'
        + '<div class="cadran-note">' + L.trust + '</div>'
        + "</aside></div>"
        + '<nav class="tabs"><a href="#apercu" class="active">' + L.tabWhy + '</a><a href="#itineraire">' + L.tabItin + '</a><a href="#inclus">' + L.tabIncl + '</a><a href="#hebergement">' + L.tabHotel + '</a><a href="#carte">' + L.tabMap + '</a><a href="#dates">' + L.tabDates + '</a></nav>'
        + '<section id="apercu"><h2 class="sec-title">' + L.why + '</h2><div class="lead">' + intro + '</div><ul class="highlights">' + highlights + "</ul></section>"
        + '<section id="itineraire"><h2 class="sec-title">' + itinTitle + "</h2>" + itinBody + "</section>"
        + '<section id="inclus"><h2 class="sec-title">' + L.included + "</h2>" + inclusBlock + "</section>"
        + '<section id="hebergement"><h2 class="sec-title">' + L.accommodation + "</h2>" + hotelsHtml + "</section>"
        + '<section id="carte"><h2 class="sec-title">' + L.mapTitle + '</h2>' + mapVisual + '<div class="route">' + route + "</div></section>"
        + '<section id="dates"><h2 class="sec-title">' + L.datesPrices + "</h2>" + (dates.line ? '<div class="stay">' + bidiNum(dates.line) + "</div>" : "") + datesListHtml + priceHtml + childrenHtml + (dates.note ? '<p class="note">' + bidiNum(dates.note) + "</p>" : "") + "</section>"
        + '<div class="cta-final"><h3>' + (cta.title || "") + "</h3><p>" + (cta.text || "") + '</p><button class="btn btn-gold" onclick="ask(\'\')">' + L.quoteWa + '</button></div>'
        + "</div>"
        + '<div class="vmodal" id="vmodal" onclick="if(event.target===this)closeVideo()"><div class="box"><button class="close" onclick="closeVideo()">×</button><div class="ratio" id="vframe"></div></div></div>'
        + '<div class="wechat-modal" id="wechatModal" onclick="if(event.target===this)closeWechat()"><div class="wechat-box"><button class="wechat-close" onclick="closeWechat()">×</button><img src="/welcome-morocco/assets/wechat-qr.jpeg" alt="Voyages 21 WeChat QR code"></div></div>'
        + '<div class="gallery" id="gallery" onclick="if(event.target===this)closeGallery()"><div class="gbox"><button class="gallery-close" onclick="closeGallery()">×</button><div class="gallery-inner" id="galleryInner"></div></div></div>';

    // ===== Médias en ligne + comportements =====
    var hero = document.getElementById("heroVideo");
    var heroBox = document.getElementById("hero");
    var voirVideoBtn = document.getElementById("voirVideo");
    var thumbsBox = document.getElementById("thumbs");
    var PHOTOS = [];

    function playHero() {
        if (!hero) return;
        hero.muted = true;
        var p = hero.play();
        if (p && p.catch) p.catch(function () {
            var once = function () { hero.removeEventListener("canplay", once); hero.muted = true; hero.play().catch(function () {}); };
            hero.addEventListener("canplay", once);
        });
    }
    function buildThumbs(images) {
        PHOTOS = (images || []).map(function (it) { return it && it.url; }).filter(Boolean);
        thumbsBox.innerHTML = "";
        if (!PHOTOS.length) { thumbsBox.style.display = "none"; return; }
        thumbsBox.style.display = "";
        var max = 4, n = Math.min(PHOTOS.length, max);
        for (var i = 0; i < n; i++) {
            var d = document.createElement("div");
            d.className = "thumb";
            d.style.backgroundImage = "url('" + PHOTOS[i] + "')";
            (function (idx) { d.onclick = function () { openGallery(idx); }; })(i);
            if (i === max - 1 && PHOTOS.length > max) {
                var more = document.createElement("div");
                more.className = "more";
                more.textContent = "+" + (PHOTOS.length - max + 1) + " " + L.photos;
                d.appendChild(more);
            }
            thumbsBox.appendChild(d);
        }
    }
    function applyMedia(rec) {
        var hasOnlineMedia = rec && (rec.videoUrl || rec.videoLink || (rec.images && rec.images.length));
        rec = hasOnlineMedia ? rec : (v.fallbackMedia || {});
        if (rec.videoUrl && hero) {
            if (rec.images && rec.images[0] && rec.images[0].url) hero.setAttribute("poster", rec.images[0].url);
            hero.src = rec.videoUrl;
            playHero();
        } else {
            if (hero) hero.style.display = "none";
            var bg = (rec.images && rec.images[0] && rec.images[0].url) ? rec.images[0].url : null;
            if (bg && heroBox) heroBox.style.backgroundImage = "url('" + bg + "')";
            var st = document.getElementById("soundBtn"); if (st) st.style.display = "none";
        }
        if (voirVideoBtn) {
            if (rec.videoLink) { voirVideoBtn.style.display = ""; voirVideoBtn.onclick = function () { openVideo(rec.videoLink); }; }
            else { voirVideoBtn.style.display = "none"; }
        }
        buildThumbs(rec.images);
    }
    fetch("/api/media", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (m) { applyMedia(m && m[v.mediaKey]); })
        .catch(function () { applyMedia(v.fallbackMedia); });

    window.toggleSound = function () {
        if (!hero) return;
        hero.muted = !hero.muted;
        var b = document.getElementById("soundBtn");
        if (b) b.textContent = hero.muted ? L.soundOn : L.soundOff;
        if (!hero.muted) hero.play().catch(function () {});
    };
    window.toggleDay = function (btn) { btn.parentElement.classList.toggle("open"); };

    var links = Array.prototype.slice.call(document.querySelectorAll(".tabs a"));
    links.forEach(function (a) {
        a.addEventListener("click", function (e) {
            e.preventDefault();
            var t = document.querySelector(a.getAttribute("href"));
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 52, behavior: "smooth" });
        });
    });
    window.addEventListener("scroll", function () {
        var y = window.scrollY + 90, cur = links[0];
        links.forEach(function (a) { var t = document.querySelector(a.getAttribute("href")); if (t && t.offsetTop <= y) cur = a; });
        links.forEach(function (a) { a.classList.toggle("active", a === cur); });
    });

    function extractYouTubeId(u) {
        u = String(u || "").trim();
        if (/^[A-Za-z0-9_-]{11}$/.test(u)) return u;
        var m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
        return m ? m[1] : "";
    }
    function buildLinkEmbed(value) {
        value = String(value || "").trim();
        if (!value) return "";
        if (/^data:video\//i.test(value) || /\.(mp4|webm|ogg)(\?|$)/i.test(value)) return '<video src="' + value + '" controls autoplay playsinline></video>';
        var vm = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
        if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] + '?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        var yt = extractYouTubeId(value);
        if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        return '<div class="video-soon"><strong>' + L.videoSoon + '</strong><a href="' + value + '" target="_blank" rel="noopener">' + L.openLink + "</a></div>";
    }
    function showModal(html) {
        document.getElementById("vframe").innerHTML = html;
        document.getElementById("vmodal").classList.add("active");
        document.body.style.overflow = "hidden";
    }
    window.openVideo = function (link) { showModal(buildLinkEmbed(link)); };
    window.closeVideo = function () {
        document.getElementById("vframe").innerHTML = "";
        document.getElementById("vmodal").classList.remove("active");
        document.body.style.overflow = "";
    };
    window.openGallery = function (idx) {
        if (!PHOTOS.length) return;
        var inner = document.getElementById("galleryInner");
        inner.innerHTML = PHOTOS.map(function (u) { return '<img src="' + u + '" alt="" loading="lazy">'; }).join("");
        document.getElementById("gallery").classList.add("active");
        document.body.style.overflow = "hidden";
        setTimeout(function () { var imgs = inner.querySelectorAll("img"); if (imgs[idx]) imgs[idx].scrollIntoView(); }, 30);
    };
    window.closeGallery = function () {
        document.getElementById("gallery").classList.remove("active");
        document.getElementById("galleryInner").innerHTML = "";
        document.body.style.overflow = "";
    };
    window.openWechat = function () {
        document.getElementById("wechatModal").classList.add("active");
        document.body.style.overflow = "hidden";
    };
    window.closeWechat = function () {
        document.getElementById("wechatModal").classList.remove("active");
        document.body.style.overflow = "";
    };
    window.setVoyageLang = function (lang) {
        try { localStorage.setItem("welcomeChinaLang", lang); } catch (e) {}
        var url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.location.href = url.toString();
    };
    window.ask = function (label) {
        window.openWechat();
    };
})();
