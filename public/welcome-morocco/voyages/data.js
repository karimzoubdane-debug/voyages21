/* Welcome Morocco — travel data (single source of content).
   Each tour is an object; the page structure is rendered by render.js.
   Add a tour = add an entry here + a small page file (data-voyage). */
window.VOYAGES = {

  "maroc-circuit-imperial-cities": {
    mediaKey: "modal-circuit-imperial-cities",
    mapImage: "/welcome-morocco/assets/maps/imperial-cities.png",
    fallbackMedia: {
      images: [
        { url: "https://images.unsplash.com/photo-1553603229-5c1ead60e29e?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd86?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1575468130797-aa950b68aeec?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&q=80" }
      ]
    },
    whatsapp: "212673280009",
    eyebrow: "My Morocco · 2026 Tours",
    title: "Imperial Cities Tour",
    duration: "8 days / 7 nights",
    tag: "Morocco",
    cadran: [
      ["Departure", "Casablanca"],
      ["Arrival", "Marrakech"],
      ["Duration", "8 days / 7 nights"],
      ["Transport", "Touring vehicle"],
      ["Board", "Accommodation + breakfast"],
      ["Guide", "English-speaking + local guides"]
    ],
    price: "1,116 USD",
    intro: [
      "Morocco is a mosaic of imperial cities, each bearing the imprint of a different dynasty. This tour invites you to travel through them one by one: Casablanca and its mosque facing the Atlantic, Rabat the royal capital, Tangier the cosmopolitan, Meknes the elegant, Fes the mystical, and finally Marrakech the untamed.",
      "Eight days to read the history of Morocco in its stones, mosques, palaces and medinas. A journey through time as much as a journey through space."
    ],
    highlights: [
      "Rabat: Mohammed V Mausoleum and Hassan Tower",
      "Tangier: Kasbah and views over the Strait of Gibraltar",
      "Meknes: Moulay Ismail Mausoleum, jewel of the Alaouite dynasty",
      "Fes (UNESCO): Al Attarine Madrasa, tanneries, imperial souks",
      "Marrakech: Bahia Palace, Saadian Tombs, medina souks"
    ],
    days: [
      { num: "Day 1", title: "Casablanca — arrival",
        text: "Welcome at Mohammed V Airport. Visit of the Hassan II Mosque. Check-in at the hotel.",
        meta: [["Overnight", "Casablanca"]] },
      { num: "Day 2", title: "Casablanca – Rabat",
        text: "Drive to Rabat. Visit of the Mohammed V Mausoleum, the Hassan Tower, the Kasbah of the Oudayas and the Almohad ramparts.",
        meta: [["Overnight", "Rabat"]] },
      { num: "Day 3", title: "Rabat – Tangier",
        text: "Drive to Tangier via Asilah. Visit of the medina and the Kasbah of Tangier, with panoramic views over the Strait of Gibraltar.",
        meta: [["Overnight", "Tangier"]] },
      { num: "Day 4", title: "Tangier – Meknes",
        text: "Drive to Meknes. Visit of the imperial city: Bab Mansour, Moulay Ismail Mausoleum, Heri es-Souani granary. Excursion to the ruins of Volubilis (UNESCO Roman site).",
        meta: [["Overnight", "Meknes or Fes"]] },
      { num: "Day 5", title: "Fes — Imperial city (UNESCO)",
        text: "A day in the medina of Fes. Guided tour: Al Attarine Madrasa, Chouara tanneries, Kissaria, potters' quarter.",
        meta: [["Overnight", "Fes"], ["Guide", "local guide included"]] },
      { num: "Day 6", title: "Fes — free day / Azrou",
        text: "Free morning in Fes. Optional: excursion to Azrou and its cedar forest. Afternoon return to the medina.",
        meta: [["Overnight", "Fes"]] },
      { num: "Day 7", title: "Fes – Marrakech",
        text: "Drive to Marrakech via the Middle Atlas. Arrival in the evening. Discover Jemaa el-Fna.",
        meta: [["Overnight", "Marrakech"]] },
      { num: "Day 8", title: "Marrakech — sightseeing and departure",
        text: "Visit of the Bahia Palace, the Saadian Tombs and the Koutoubia. Free afternoon in the souks. Transfer to the airport.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Transport in an air-conditioned touring vehicle",
      "7 nights in hotels and riads",
      "Breakfast included every morning",
      "English-speaking guide for the tour",
      "Local guides for Fes and Meknes",
      "Visit of Volubilis included",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "International flights",
      "Lunches and dinners unless mentioned",
      "Entrance tickets not mentioned",
      "Tips and personal extras"
    ],
    hotels: [
      "Casablanca — 4★ hotel",
      "Rabat — 4★ hotel",
      "Tangier — 4★ hotel",
      "Fes — 4★ medina riad",
      "Marrakech — 4★ hotel"
    ],
    priceTable: {
      head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."],
      rows: [
        ["High season", "1 524 USD", "1 422 USD", "1 356 USD", "1 308 USD", "1 272 USD", "438 USD"],
        ["Low season", "1 290 USD", "1 236 USD", "1 182 USD", "1 140 USD", "1 116 USD", "385 USD"]
      ],
      note: "Price per person in 4★ hotels, full board. Conversion applied: 1 EUR = 1.20 USD."
    },
    children: "Children's rates on request",
    route: ["Casablanca", "Rabat", "Tangier", "Meknes", "Fes", "Marrakech"],
    dates: {
      line: "2026 departures on request, individual or group.",
      note: "Contact us for a personalised quote based on your dates."
    },
    cta: {
      title: "Six imperial cities, one single tour",
      text: "We design this journey tailor-made for groups or individuals — just as we have done since 2000."
    }
  },

  "maroc-circuit-best-morocco": {
    mediaKey: "modal-circuit-best-morocco",
    mapImage: "/welcome-morocco/assets/maps/best-morocco.png",
    fallbackMedia: {
      images: [
        { url: "https://images.unsplash.com/photo-1570637422729-f4b3fca84bea?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1553603229-5c1ead60e29e?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1597940610882-39d1a6d7e9c4?w=800&h=500&fit=crop&q=80" }
      ]
    },
    whatsapp: "212673280009",
    eyebrow: "My Morocco · 2026 Tours",
    title: "Best of Morocco — Cities, Heritage & Sahara",
    duration: "10 days / 9 nights",
    tag: "Morocco",
    cadran: [
      ["Departure", "Casablanca"],
      ["Arrival", "Marrakech"],
      ["Duration", "10 days / 9 nights"],
      ["Transport", "Touring vehicle"],
      ["Board", "Accommodation + breakfast"],
      ["Guide", "English-speaking + local guides"]
    ],
    price: "1,250 USD",
    intro: [
      "This tour is the quintessence of Morocco: ten days to experience every facet of an exceptionally rich country. From the Atlantic shores of Casablanca to the dunes of the Sahara, passing through blue Chefchaouen, the imperial medinas and the kasbah roads of the South.",
      "Ten stages, centuries of history, landscapes that renew themselves at every dawn. The best of Morocco, composed as a complete journey you won't regret."
    ],
    highlights: [
      "Hassan II Mosque in Casablanca, one of the largest in the world",
      "Chefchaouen, the blue city of the Moroccan Rif",
      "Fes (UNESCO): medina, tanneries, madrasas",
      "Merzouga — a night under a Berber tent facing Erg Chebbi",
      "Aït Ben Haddou (UNESCO) and the kasbah roads",
      "Marrakech: Bahia Palace, Saadian Tombs, souks"
    ],
    days: [
      { num: "Day 1", title: "Casablanca — arrival",
        text: "Welcome at the airport. Visit of the Hassan II Mosque. Check-in at the hotel.",
        meta: [["Overnight", "Casablanca"]] },
      { num: "Day 2", title: "Casablanca – Rabat",
        text: "Visit of the Mohammed V Mausoleum, the Hassan Tower and the Kasbah of the Oudayas. Coastal drive to the North.",
        meta: [["Overnight", "Rabat"]] },
      { num: "Day 3", title: "Rabat – Tangier – Caves of Hercules",
        text: "Drive to Tangier. Visit of the Caves of Hercules, Cape Spartel and the Kasbah of Tangier with views over the Strait.",
        meta: [["Overnight", "Tangier"]] },
      { num: "Day 4", title: "Tangier – Chefchaouen",
        text: "Drive to Chefchaouen, the blue city of the Rif. Discover the alleyways, fountains and squares of this unique medina.",
        meta: [["Overnight", "Chefchaouen"]] },
      { num: "Day 5", title: "Chefchaouen – Fes",
        text: "Drive via Ouazzane to Fes. Arrival and first exploration of the medina in the evening.",
        meta: [["Overnight", "Fes"]] },
      { num: "Day 6", title: "Fes — Imperial city (UNESCO)",
        text: "A full day in the medina of Fes: Bou Inania Madrasa, Chouara tanneries, Kissaria, Batha Museum.",
        meta: [["Overnight", "Fes"], ["Guide", "local guide included"]] },
      { num: "Day 7", title: "Fes – Sahara – Merzouga",
        text: "Long drive to the Sahara via Midelt. Arrival in Merzouga. Camel ride at sunset. Overnight in a Berber camp.",
        meta: [["Overnight", "Berber camp — Merzouga"]] },
      { num: "Day 8", title: "Merzouga – Ouarzazate – Aït Ben Haddou",
        text: "Sunrise over the dunes. Kasbah road to Ouarzazate. Visit of Aït Ben Haddou (UNESCO).",
        meta: [["Overnight", "Ouarzazate"]] },
      { num: "Day 9", title: "Ouarzazate – Marrakech",
        text: "Crossing of the Tichka pass. Arrival in Marrakech. Jemaa el-Fna Square in the evening.",
        meta: [["Overnight", "Marrakech"]] },
      { num: "Day 10", title: "Marrakech — sightseeing and departure",
        text: "Visit of the Bahia Palace, the Saadian Tombs and the Koutoubia. Transfer to the airport.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Transport in an air-conditioned touring vehicle",
      "9 nights in hotels, riads and a Berber camp",
      "Breakfast included every morning",
      "English-speaking guide for the tour",
      "Local guide for the medina of Fes",
      "Camel ride in Merzouga",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "International flights",
      "Lunches and dinners unless mentioned",
      "Entrance tickets not mentioned",
      "Tips and personal extras"
    ],
    hotels: [
      "Casablanca — 4★ hotel",
      "Rabat — 4★ hotel",
      "Tangier — 4★ hotel",
      "Chefchaouen — charming riad",
      "Fes — 4★ medina riad",
      "Merzouga — Berber tented camp",
      "Ouarzazate — 4★ hotel",
      "Marrakech — 4★ hotel"
    ],
    priceTable: {
      head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."],
      rows: [
        ["High season", "1 634 USD", "1 585 USD", "1 571 USD", "1 524 USD", "1 458 USD", "508 USD"],
        ["Low season", "1 392 USD", "1 354 USD", "1 344 USD", "1 306 USD", "1 250 USD", "372 USD"]
      ],
      note: "Price per person in 4★ hotels, full board. Conversion applied: 1 EUR = 1.20 USD."
    },
    children: "Children's rates on request",
    route: ["Casablanca", "Rabat", "Tangier", "Chefchaouen", "Fes", "Merzouga", "Ouarzazate", "Marrakech"],
    dates: {
      line: "2026 departures on request, individual or group.",
      note: "Contact us for a personalised quote based on your dates."
    },
    cta: {
      title: "The complete Morocco in 10 days",
      text: "Atlantic coasts, imperial cities, Sahara and kasbah roads — we compose this journey tailor-made for you, as we have since 2000."
    }
  },

  "maroc-circuit-discover-kingdom": {
    mediaKey: "modal-circuit-discover-kingdom",
    mapImage: "/welcome-morocco/assets/maps/discover-kingdom.png",
    fallbackMedia: {
      videoUrl: "/welcome-morocco/assets/discover-kingdom/morocco-cinematic-travel-video.mp4",
      images: [
        { url: "/welcome-morocco/assets/discover-kingdom/marrakech.jpg" },
        { url: "/welcome-morocco/assets/discover-kingdom/casablanca.jpg" },
        { url: "/welcome-morocco/assets/discover-kingdom/fez.jpg" },
        { url: "/welcome-morocco/assets/discover-kingdom/meknes.jpg" },
        { url: "/welcome-morocco/assets/discover-kingdom/volubilis.jpg" },
        { url: "/welcome-morocco/assets/discover-kingdom/merzouga.jpg" },
        { url: "/welcome-morocco/assets/discover-kingdom/ouarzazate.jpg" }
      ]
    },
    whatsapp: "212673280009",
    eyebrow: "My Morocco · 2026 Tours",
    title: "Discover the Kingdom",
    duration: "12 days / 11 nights",
    tag: "Morocco",
    cadran: [
      ["Departure", "Marrakech"],
      ["Arrival", "Marrakech"],
      ["Duration", "12 days / 11 nights"],
      ["Transport", "Touring vehicle"],
      ["Board", "Full board"],
      ["Guide", "Local guides depending on the stages"]
    ],
    price: "1,474 USD",
    intro: [
      "A complete tour to travel across the Kingdom in its broad sweep: Marrakech, Casablanca, Meknes, Fes, the heights of the Middle Atlas, the Merzouga Sahara, Ouarzazate, Agadir and back to Marrakech.",
      "Designed as a structured discovery of imperial, Saharan and Atlantic Morocco, this journey blends heritage, mountain landscapes, desert, the kasbah road and free time on the coast."
    ],
    highlights: [
      "Marrakech, Casablanca, Meknes and Fes",
      "Volubilis, Moulay Idriss and the imperial sites",
      "Ifrane and the Middle Atlas",
      "Sahara experience in Merzouga",
      "Todra Gorges, Dades Valley and Ouarzazate",
      "Agadir and the Atlantic coast"
    ],
    days: [
      { num: "Day 1", title: "Marrakech – Arrival",
        text: "Arrival at Marrakech-Menara Airport.<br>Meet and greet by our representative and assistance with arrival formalities.<br>Transfer to your hotel.<br>Depending on your arrival time, enjoy a first independent discovery of the Red City.<br>Dinner at the hotel.<br>Overnight stay in Marrakech." },
      { num: "Day 2", title: "Guided Tour of Marrakech",
        text: "After breakfast, depart for a comprehensive guided tour of Marrakech, the capital of the South and an imperial city with a rich heritage that gave its name to the Kingdom.<br>Visit the main attractions:<br>Koutoubia Mosque and its minaret<br>Bahia Palace<br>Menara Gardens<br>The historic city walls<br>The famous Jemaa El-Fna Square<br>Free lunch during the tour.<br>Return to the hotel in the late afternoon.<br>Dinner and overnight stay in Marrakech." },
      { num: "Day 3", title: "Marrakech – Casablanca",
        text: "After breakfast, depart via motorway to Casablanca.<br>Arrival in Casablanca and free lunch.<br>In the afternoon, enjoy a panoramic tour of the economic capital:<br>Mohammed V Square<br>Habous Quarter<br>Ain Diab Corniche<br>Exterior visit of Hassan II Mosque (interior visit optional)<br>Check-in at the hotel.<br>Dinner and overnight stay in Casablanca." },
      { num: "Day 4", title: "Casablanca – Fes",
        text: "Breakfast at the hotel.<br>Departure for Fes, the spiritual capital of the Kingdom.<br>En route, visit Meknes, the capital of Sultan Moulay Ismail, often referred to as the \"Versailles of Morocco\":<br>The city walls<br>El Hedim Square<br>Heri es-Souani (Moulay Ismail's granaries)<br>Free lunch.<br>In the afternoon, excursion to the Roman ruins of Volubilis and the holy town of Moulay Idriss.<br>Continue to Fes.<br>Dinner and overnight stay at the hotel in Fes." },
      { num: "Day 5", title: "Fes – City Tour",
        text: "After breakfast, spend the day discovering Fes, the spiritual capital of Morocco and one of the most prestigious cities in the Islamic world.<br>Visit the main landmarks:<br>Al Quaraouiyine University<br>Attarine Madrasa<br>Traditional artisan quarters<br>The famous tanneries<br>In the afternoon, continue with:<br>Royal Palace (exterior visit)<br>Jewish Quarter (Mellah)<br>The New City<br>Return to the hotel at the end of the day.<br>Dinner and overnight stay in Fes." },
      { num: "Day 6", title: "Fes – Merzouga",
        text: "Breakfast at the hotel.<br>Early departure for Merzouga, crossing:<br>Ifrane, known as the \"Switzerland of Morocco\"<br>Cedar forests of the Middle Atlas Mountains<br>Midelt (lunch break)<br>The Ziz Valley and its palm groves<br>Arrival in Merzouga in the late afternoon.<br>Accommodation in a hotel or desert camp at the gateway to the Sahara.<br>Dinner and overnight stay in Merzouga in a true desert atmosphere." },
      { num: "Day 7", title: "Merzouga – Ouarzazate",
        text: "Breakfast.<br>Departure for Ouarzazate via:<br>Erfoud<br>Todra Gorges (photo stop)<br>Dades Valley<br>The famous Route of a Thousand Kasbahs<br>Lunch en route.<br>Arrival in Ouarzazate, known as the \"Hollywood of Morocco.\"<br>Check-in at the hotel.<br>Dinner and overnight stay in Ouarzazate." },
      { num: "Day 8", title: "Ouarzazate – Agadir",
        text: "Breakfast at the hotel.<br>Exterior visit of Taourirt Kasbah and, subject to availability, the film studios.<br>Departure for Agadir along a spectacular road crossing the Anti-Atlas Mountains and traditional Berber villages.<br>Lunch en route.<br>Arrival in Agadir in the evening.<br>Check-in at the hotel.<br>Dinner and overnight stay in Agadir." },
      { num: "Day 9", title: "Agadir – Leisure Day",
        text: "Breakfast at the hotel.<br>Free day in Agadir to enjoy:<br>The beach<br>Hotel facilities<br>Optional excursions (Paradise Valley, El Had Souk, boat cruise, hammam, etc.)<br>Free lunch.<br>Dinner and overnight stay in Agadir." },
      { num: "Day 10", title: "Agadir – Marrakech",
        text: "Breakfast at the hotel.<br>Departure for Marrakech via motorway.<br>Arrival in Marrakech in the early or mid-afternoon.<br>Check-in at the hotel.<br>Free time for shopping or relaxation.<br>Dinner and overnight stay in Marrakech." },
      { num: "Day 11", title: "Marrakech – Leisure Day",
        text: "Breakfast at the hotel.<br>Free day in Marrakech for relaxation, shopping, or personal activities.<br>Optional excursions and activities:<br>Ourika Valley<br>Agafay Desert<br>Essaouira<br>Hammam, spa, or dinner show<br>Dinner and overnight stay in Marrakech." },
      { num: "Day 12", title: "Marrakech – Departure Transfer",
        text: "Breakfast at the hotel.<br>Depending on your flight schedule, transfer to Marrakech-Menara Airport.<br>Assistance with check-in formalities.<br>End of our services." }
    ],
    inclus: [
      "Accommodation in a double room with private bathroom in the hotels mentioned or similar",
      "Tourist tax and tourism promotion tax",
      "Transport with a private vehicle",
      "Local taxes and 20% VAT",
      "English-speaking local guide depending on the stages",
      "Assistance throughout the stay",
      "Two small bottles of mineral water per person per day during transfers",
      "All the services mentioned in the programme"
    ],
    exclus: [
      "Single supplement",
      "Extras and personal expenses",
      "Tips for guide, driver, restaurants and hotels",
      "Flight tickets",
      "Interior visit of the Hassan II Mosque",
      "Fantasia at Chez Ali in Marrakech",
      "All services not mentioned in the programme"
    ],
    hotels: [
      "Marrakech — 4★ hotel",
      "Casablanca — 4★ hotel",
      "Fes — 4★ hotel",
      "Merzouga — hotel or desert camp",
      "Ouarzazate — 4★ hotel",
      "Agadir — 4★ hotel"
    ],
    priceTable: {
      head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."],
      rows: [
        ["High season", "1 910 USD", "1 850 USD", "1 829 USD", "1 771 USD", "1 692 USD", "521 USD"],
        ["Low season", "1 650 USD", "1 602 USD", "1 588 USD", "1 540 USD", "1 474 USD", "425 USD"]
      ],
      note: "Price per person in 4★ hotels, full board. Conversion applied: 1 EUR = 1.20 USD."
    },
    children: "Children's rates on request",
    route: ["Marrakech", "Casablanca", "Meknes", "Volubilis", "Fes", "Merzouga", "Ouarzazate", "Agadir", "Marrakech"],
    dates: {
      line: "2026 departures on request, individual or group.",
      note: "Seasonality according to the 2026 Morocco tours grid."
    },
    cta: {
      title: "12 days to discover the Kingdom",
      text: "We design this tour for groups and individual travellers, with the same Voyages 21 service standard."
    }
  },

  "maroc-circuit-grand-discovery": {
    mediaKey: "modal-circuit-grand-discovery",
    mapImage: "/welcome-morocco/assets/maps/grand-discovery.png",
    fallbackMedia: {
      images: [
        { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1570637422729-f4b3fca84bea?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&h=500&fit=crop&q=80" }
      ]
    },
    whatsapp: "212673280009",
    eyebrow: "My Morocco · 2026 Tours",
    title: "Splendid Morocco — Grand Discovery",
    duration: "15 days / 14 nights",
    tag: "Morocco",
    cadran: [
      ["Departure", "Marrakech"],
      ["Arrival", "Marrakech"],
      ["Duration", "15 days / 14 nights"],
      ["Transport", "Touring vehicle"],
      ["Board", "Accommodation + breakfast"],
      ["Guide", "English-speaking + local guides"]
    ],
    price: "1,907 USD",
    intro: [
      "Fifteen days to discover Morocco in all its breadth. This grand tour takes you from the ochre palaces of Marrakech to the Atlantic seafront of Essaouira and Agadir, passing through the imperial medinas, the blue city of Chefchaouen, the endless dunes of Merzouga and the earthen kasbahs of the South.",
      "This is the journey for those who want to miss nothing: the great cities, the contrasting landscapes, the Sahara, the Atlantic and the age-old caravan roads. A grand tour that returns to its starting point, enriched by every stage travelled."
    ],
    highlights: [
      "Marrakech: Bahia Palace, Saadian Tombs, Jemaa el-Fna",
      "Casablanca: Hassan II Mosque facing the Atlantic",
      "Chefchaouen, the blue pearl of the Rif",
      "Fes (UNESCO): Bou Inania Madrasa, Chouara tanneries",
      "Merzouga — a night under a Berber tent facing Erg Chebbi",
      "Aït Ben Haddou (UNESCO) and the kasbah roads",
      "Essaouira: Skala de la Ville, medina and Atlantic port"
    ],
    days: [
      { num: "Day 1", title: "Marrakech — arrival",
        text: "Welcome at the airport. Visit of the Koutoubia and Jemaa el-Fna Square. Check-in at the hotel.",
        meta: [["Overnight", "Marrakech"]] },
      { num: "Day 2", title: "Marrakech — Bahia, Saadian Tombs, souks",
        text: "A day in the medina: Bahia Palace, Saadian Tombs, Ben Youssef Madrasa, souks and dye works.",
        meta: [["Overnight", "Marrakech"]] },
      { num: "Day 3", title: "Marrakech – Casablanca",
        text: "Drive to Casablanca. Visit of the Hassan II Mosque. Stroll along the Atlantic Corniche.",
        meta: [["Overnight", "Casablanca"]] },
      { num: "Day 4", title: "Casablanca – Rabat",
        text: "Drive to the capital. Mohammed V Mausoleum, Hassan Tower, Kasbah of the Oudayas, Almohad ramparts.",
        meta: [["Overnight", "Rabat"]] },
      { num: "Day 5", title: "Rabat – Meknes – Volubilis",
        text: "Drive to Meknes. Visit of Bab Mansour, Moulay Ismail Mausoleum, Heri es-Souani granary. Excursion to the Roman ruins of Volubilis (UNESCO).",
        meta: [["Overnight", "Meknes or Fes"]] },
      { num: "Day 6", title: "Fes — Imperial city (UNESCO)",
        text: "A day in the medina of Fes: Bou Inania Madrasa, Chouara tanneries, Kissaria, Batha Museum.",
        meta: [["Overnight", "Fes"], ["Guide", "local guide included"]] },
      { num: "Day 7", title: "Fes — free day",
        text: "A second day in Fes to explore at your own pace: souks, Al-Andalus quarter, fondouks, artisans' workshops.",
        meta: [["Overnight", "Fes"]] },
      { num: "Day 8", title: "Fes – Chefchaouen",
        text: "Drive to Chefchaouen, the blue city of the Rif. Arrival and discovery of the cobalt-blue alleyways.",
        meta: [["Overnight", "Chefchaouen"]] },
      { num: "Day 9", title: "Chefchaouen — day and drive",
        text: "Free morning in Chefchaouen. Lunch. Drive to Fes or the South according to the programme.",
        meta: [["Overnight", "Road heading South"]] },
      { num: "Day 10", title: "Desert road – Merzouga",
        text: "Long drive to the Sahara via Midelt. Arrival in Merzouga. Camel ride. Overnight in a Berber camp.",
        meta: [["Overnight", "Berber camp — Merzouga"]] },
      { num: "Day 11", title: "Merzouga – Ouarzazate",
        text: "Sunrise. Kasbah road: Rissani, Tinghir, Todra Gorges, Skoura, Ouarzazate.",
        meta: [["Overnight", "Ouarzazate"]] },
      { num: "Day 12", title: "Ouarzazate – Aït Ben Haddou – Marrakech",
        text: "Visit of Aït Ben Haddou (UNESCO). Crossing of the Tichka. Arrival in Marrakech in the evening.",
        meta: [["Overnight", "Marrakech"]] },
      { num: "Day 13", title: "Marrakech – Essaouira",
        text: "Drive to Essaouira. Visit of the Skala de la Ville, the fishing port and the UNESCO-listed medina.",
        meta: [["Overnight", "Essaouira"]] },
      { num: "Day 14", title: "Essaouira – Agadir",
        text: "Coastal drive to Agadir. Discover the bay, the Kasbah and the Atlantic corniche.",
        meta: [["Overnight", "Agadir"]] },
      { num: "Day 15", title: "Agadir – Marrakech — departure",
        text: "Return drive to Marrakech. Transfer to the airport for your return flight.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Transport in an air-conditioned touring vehicle",
      "14 nights in hotels, riads and a Berber camp",
      "Breakfast included every morning",
      "English-speaking guide for the entire tour",
      "Local guide for the medina of Fes",
      "Camel ride in Merzouga",
      "Visit of Volubilis included",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "International flights",
      "Lunches and dinners unless mentioned",
      "Entrance tickets not mentioned",
      "Tips and personal extras"
    ],
    hotels: [
      "Marrakech — 4★ hotel",
      "Casablanca — 4★ hotel",
      "Rabat — 4★ hotel",
      "Fes — 4★ medina riad",
      "Chefchaouen — charming riad",
      "Merzouga — Berber tented camp",
      "Ouarzazate — 4★ hotel",
      "Essaouira — medina riad",
      "Agadir — 4★ hotel"
    ],
    priceTable: {
      head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."],
      rows: [
        ["High season", "2 508 USD", "2 434 USD", "2 413 USD", "2 342 USD", "2 240 USD", "685 USD"],
        ["Low season", "2 124 USD", "2 064 USD", "2 050 USD", "1 992 USD", "1 907 USD", "534 USD"]
      ],
      note: "Price per person in 4★ hotels, full board. Conversion applied: 1 EUR = 1.20 USD."
    },
    children: "Children's rates on request",
    route: ["Marrakech", "Casablanca", "Rabat", "Meknes", "Fes", "Chefchaouen", "Merzouga", "Ouarzazate", "Essaouira", "Agadir", "Marrakech"],
    dates: {
      line: "2026 departures on request, individual or group.",
      note: "Contact us for a personalised quote based on your dates."
    },
    cta: {
      title: "15 days, the grand tour of Morocco",
      text: "From the imperial cities to the Atlantic, by way of the Sahara — we compose this journey tailor-made for you, as we have since 2000."
    }
  },

  "maroc-circuit-imperial-south": {
    mediaKey: "modal-circuit-imperial-south",
    mapImage: "/welcome-morocco/assets/maps/imperial-south.png",
    fallbackMedia: {
      images: [
        { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1570637422729-f4b3fca84bea?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1553603229-5c1ead60e29e?w=800&h=500&fit=crop&q=80" },
        { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&q=80" }
      ]
    },
    whatsapp: "212673280009",
    eyebrow: "My Morocco · 2026 Tours",
    title: "Imperial Cities & Southern Morocco",
    duration: "8 days / 7 nights",
    tag: "Morocco",
    cadran: [
      ["Departure", "Casablanca"],
      ["Arrival", "Marrakech"],
      ["Duration", "8 days / 7 nights"],
      ["Transport", "Touring vehicle"],
      ["Board", "Accommodation + breakfast"],
      ["Guide", "English-speaking + local UNESCO guide"]
    ],
    price: "1,117 USD",
    intro: [
      "From the immaculate white of Casablanca to the ochre dunes of Erg Chebbi, this tour leads you through the great chapters of Moroccan history. You will cross the imperial cities, lose yourself in the alleyways of the UNESCO-listed medina of Fes, and wake to the sound of the desert in Merzouga.",
      "The road then descends towards Aït Ben Haddou, a thousand-year-old earthen kasbah also inscribed as a World Heritage site, before ending its journey in the red gentleness of Marrakech. Eight days to touch Morocco in its greatest diversity — Atlantic coasts, imperial cities, Sahara and kasbah roads."
    ],
    highlights: [
      "The medina of Fes (UNESCO) and the Bou Inania Madrasa",
      "Chefchaouen, the blue city of the Rif",
      "The dunes of Erg Chebbi at Merzouga, a night under a Berber tent",
      "Aït Ben Haddou, a thousand-year-old UNESCO-listed kasbah",
      "The Bahia Palace and the Koutoubia in Marrakech"
    ],
    days: [
      { num: "Day 1", title: "Arrival in Casablanca",
        text: "Welcome at Mohammed V Airport. Visit of the Hassan II Mosque, one of the largest in the world. Check-in at the hotel.",
        meta: [["Overnight", "Casablanca"]] },
      { num: "Day 2", title: "Casablanca – Rabat – Chefchaouen",
        text: "Departure for Rabat, capital of the Kingdom. Visit of the Mohammed V Mausoleum and the Hassan Tower. Drive to Chefchaouen, the blue pearl of the Rif. Discover the alleyways in shades of indigo and cobalt.",
        meta: [["Overnight", "Chefchaouen"]] },
      { num: "Day 3", title: "Chefchaouen – Fes",
        text: "Free morning in Chefchaouen. Drive to Fes, the spiritual capital of Morocco. First discovery of the ramparts and the medina.",
        meta: [["Overnight", "Fes"]] },
      { num: "Day 4", title: "Fes — Imperial city (UNESCO)",
        text: "A full day in the medina of Fes, the largest medina in the world. Guided tour: Bou Inania Madrasa, Chouara tanneries, merchants' fondouk, Al-Andalus quarter.",
        meta: [["Overnight", "Fes"], ["Guide", "local guide included"]] },
      { num: "Day 5", title: "Fes – Desert road – Merzouga",
        text: "Early departure for the Sahara. Drive via Midelt and Errachidia. Arrival in Merzouga in the late afternoon. Camel ride at sunset. Overnight under a Berber tent.",
        meta: [["Overnight", "Berber camp — Merzouga"]] },
      { num: "Day 6", title: "Merzouga – Ouarzazate – Aït Ben Haddou",
        text: "Sunrise over the dunes in the morning light. Kasbah road to Ouarzazate. Visit of Aït Ben Haddou, a fortified village listed as a UNESCO World Heritage site.",
        meta: [["Overnight", "Ouarzazate"]] },
      { num: "Day 7", title: "Ouarzazate – Marrakech",
        text: "Crossing of the Tichka pass (2,260 m). Arrival in Marrakech. Discover Jemaa el-Fna Square and the souk.",
        meta: [["Overnight", "Marrakech"]] },
      { num: "Day 8", title: "Marrakech — sightseeing and departure",
        text: "Visit of the Bahia Palace and the Koutoubia. Free afternoon in the souks. Transfer to the airport according to your flight.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Transport in an air-conditioned touring vehicle",
      "7 nights in hotels and a Berber camp",
      "Breakfast included every morning",
      "English-speaking guide for the tour",
      "Local guide for the medina of Fes",
      "Camel ride in Merzouga",
      "Visits of the sites mentioned in the programme",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "International flights",
      "Lunches and dinners unless mentioned",
      "Museum entrances not mentioned",
      "Tips and personal extras"
    ],
    hotels: [
      "Casablanca — 4★ hotel",
      "Chefchaouen — charming riad",
      "Fes — 4★ medina riad",
      "Merzouga — Berber tented camp",
      "Ouarzazate — 4★ hotel",
      "Marrakech — 4★ hotel"
    ],
    priceTable: {
      head: ["Season", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Single suppl."],
      rows: [
        ["High season", "1 512 USD", "1 423 USD", "1 362 USD", "1 314 USD", "1 284 USD", "414 USD"],
        ["Low season", "1 314 USD", "1 231 USD", "1 182 USD", "1 140 USD", "1 117 USD", "372 USD"]
      ],
      note: "Price per person in 4★ hotels, full board. Conversion applied: 1 EUR = 1.20 USD."
    },
    children: "Children's rates on request",
    route: ["Casablanca", "Rabat", "Chefchaouen", "Fes", "Merzouga", "Aït Ben Haddou", "Ouarzazate", "Marrakech"],
    dates: {
      line: "2026 departures on request, individual or group.",
      note: "Contact us for a personalised quote based on your dates."
    },
    cta: {
      title: "8 days, two worlds — imperial cities and desert",
      text: "We design this tour tailor-made from Casablanca, for groups or individual travellers — with the same care since 2000."
    }
  },

  "maroc-merzouga": {
    whatsapp: "212673280009",
    eyebrow: "My Morocco · Guaranteed departure 2026",
    title: "Merzouga — Marrakech · Ouarzazate · Dades",
    duration: "Tour",
    tag: "Morocco",
    cadran: [
      ["Departure", "Marrakech"],
      ["Destination", "Merzouga — Erg Chebbi"],
      ["Stages", "Ouarzazate · Dades · Todra · Merzouga"],
      ["Transport", "Included — touring vehicle"],
      ["Board", "Accommodation + meals mentioned"],
      ["Departures", "Guaranteed every day in 2026"]
    ],
    price: "1,200 DH",
    intro: [
      "Somewhere beyond the High Atlas and the ochre earthen kasbahs, the dunes of Erg Chebbi rise from the plain like a promise of the world's edge. This tour takes you from Marrakech into the heart of the Moroccan Sahara, through landscapes that change at every bend.",
      "The road follows the Dades Gorges, suspended between pink cliffs and almond gardens. Further on, the Todra Gorges, dizzying chasms where the sun reaches only at certain hours. And finally Merzouga, its dunes glowing red at sunset, and a night in a Berber tent in the silence of the desert.",
      "A guaranteed departure every day, from Marrakech. Transport, accommodation and the meals mentioned are included — all that remains is to let Morocco surprise you."
    ],
    highlights: [
      "The Dades Gorges and the pink earthen kasbahs",
      "The Todra Gorges, spectacular chasms in the heart of the High Atlas",
      "The dunes of Erg Chebbi at Merzouga, at sunrise and sunset",
      "A night under a Berber tent at the edge of the dunes",
      "Camel ride included"
    ],
    days: [
      { num: "Day 1", title: "Marrakech – Ouarzazate – Dades",
        text: "Departure from Marrakech early in the morning. Drive to Ouarzazate via the Tichka pass (2,260 m). Visit of the Aït Ben Haddou kasbah (UNESCO-listed). Continue to the Dades Gorges. Check-in and overnight.",
        meta: [["Overnight", "Dades Gorges"]] },
      { num: "Day 2", title: "Dades – Todra Gorges – Merzouga",
        text: "After breakfast, visit of the Todra Gorges. Drive to Errachidia then Merzouga. Arrival at the dunes in the late afternoon. Camel ride at sunset. Overnight under a Berber tent.",
        meta: [["Meal", "breakfast"], ["Overnight", "Desert camp — Merzouga"]] },
      { num: "Day 3", title: "Merzouga – Return to Marrakech",
        text: "Sunrise over the dunes. Breakfast at the camp. Return drive to Marrakech. Arrival at the end of the day.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Transport in a touring vehicle (departure from Marrakech)",
      "Accommodation (2 nights: hotel + a night in a Berber tent)",
      "The meals mentioned in the programme",
      "Camel ride",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "Meals not mentioned",
      "Extras and drinks",
      "Tips for guides and drivers"
    ],
    hotels: ["Hotel en route (Dades or Todra)", "Berber tented camp — Merzouga"],
    priceTable: {
      head: ["Category", "Type", "Price / person"],
      rows: [
        ["Shared", "Standard", "1 200 DH"]
      ]
    },
    children: "Children's rates on request",
    route: ["Marrakech", "Ouarzazate", "Aït Ben Haddou", "Dades Gorges", "Todra Gorges", "Merzouga"],
    dates: {
      line: "Guaranteed departure every day in 2026, from Marrakech.",
      note: "Contact us for availability and group rates."
    },
    cta: {
      title: "Fancy discovering the Moroccan desert?",
      text: "We organise your tailor-made tour, to suit your dates and your group — just as we have done since 2000."
    }
  },

  "maroc-bin-el-ouidane": {
    whatsapp: "212673280009",
    eyebrow: "My Morocco · Nature weekend 2026",
    title: "Bin El Ouidane — Nature's divine beauty",
    duration: "2 days / 1 night",
    tag: "Morocco",
    cadran: [
      ["Departure", "Marrakech"],
      ["Destination", "Bin El Ouidane Lake"],
      ["Duration", "2 days / 1 night"],
      ["Transport", "Included"],
      ["Board", "Hotel + organised programme"],
      ["Next departures", "3–4 May · 10–11 May 2026"]
    ],
    price: "1,100 DH",
    intro: [
      "Two hours from Marrakech, nestled between the folds of the High Atlas, the Bin El Ouidane Lake is one of Morocco's most beautiful secrets. Its turquoise waters carve into the mountain, eagles glide in the silence, and time stretches to the scale of the landscape.",
      "This nature weekend is designed to unwind: an organised programme of visits, a hotel by the lake, transport arranged from Marrakech. Two days, one night, to remember that the most beautiful journey is sometimes the closest one."
    ],
    highlights: [
      "The Bin El Ouidane Lake, turquoise jewel of the High Atlas",
      "An organised programme of visits and nature activities",
      "A hotel by the lake",
      "Transport included from Marrakech",
      "A weekend accessible to all"
    ],
    days: [
      { num: "Day 1", title: "Marrakech – Bin El Ouidane",
        text: "Departure from Marrakech early in the morning. Drive to Azilal and Bin El Ouidane. Arrival at the lake, check-in at the hotel. Afternoon: an organised programme of visits and nature activities by the water. Evening and overnight at the lake.",
        meta: [["Overnight", "Bin El Ouidane"]] },
      { num: "Day 2", title: "Bin El Ouidane – Marrakech",
        text: "Breakfast at the hotel. Free morning by the lake. Departure after lunch, return to Marrakech in the late afternoon.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Round-trip transport from Marrakech",
      "1 night at a hotel by the lake",
      "An organised programme of visits",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "Meals not mentioned",
      "Optional water activities",
      "Extras"
    ],
    hotels: ["Hotel by the Bin El Ouidane Lake"],
    priceTable: {
      head: ["Category", "Type", "Price / person"],
      rows: [
        ["Double", "Standard", "1 100 DH"]
      ]
    },
    children: "Children's rates on request",
    route: ["Marrakech", "Azilal", "Bin El Ouidane", "Marrakech"],
    dates: {
      line: "Next departures: 3–4 May · 10–11 May 2026 · and other dates.",
      note: "Contact us for availability and group rates."
    },
    cta: {
      title: "Fancy a weekend in the heart of nature?",
      text: "We organise your tailor-made getaway, to suit your dates — just as we have done since 2000."
    }
  },

  "maroc-dakhla": {
    whatsapp: "212673280009",
    eyebrow: "My Morocco · Wini Bik — Dakhla 2026",
    title: "Dakhla — Wini Bik",
    duration: "4 days / 3 nights",
    tag: "Morocco",
    cadran: [
      ["Departure", "Casablanca"],
      ["Destination", "Dakhla, Atlantic Sahara"],
      ["Duration", "4 days / 3 nights"],
      ["Flights", "Included — round trip"],
      ["Board", "Hotel + excursions + transport"],
      ["Package", "All inclusive"]
    ],
    price: "5,500 DH",
    intro: [
      "Dakhla is a peninsula set between two infinities: the Sahara on one side, the Atlantic on the other. A 40-kilometre turquoise lagoon, swept by a steady wind that has made it the kitesurfing capital of the world — and a paradise for those who simply seek space, silence and light.",
      "This stay is all inclusive: flights, hotel, excursions and transport on site. Four days to discover the Dakhla lagoon from a boat, lose yourself in the pink dunes of Lassarga, or watch the kitesurfers streak across the water like birds. All in a light that the Atlantic makes incomparable.",
      "Wini Bik — literally \"I am with you\" — is the spirit of this journey: an off-the-beaten-track destination, organised with the care of Voyages 21 from Marrakech."
    ],
    highlights: [
      "The Dakhla lagoon, turquoise and windswept, between desert and ocean",
      "The pink dunes of Lassarga at sunset",
      "Organised excursions: lagoon, dunes, city",
      "Round-trip flights and transport on site included",
      "World kitesurfing capital and a paradise for board sports"
    ],
    days: [
      { num: "Day 1", title: "Casablanca – Dakhla",
        text: "Flight from Casablanca to Dakhla. Welcome at the airport and transfer to the hotel. Check-in and presentation of the stay. Free evening.",
        meta: [["Overnight", "Dakhla"]] },
      { num: "Day 2", title: "Dakhla — Lagoon and dunes excursion",
        text: "A day of excursion: a boat trip on the Dakhla lagoon, visit of the pink dunes of Lassarga. Sunset facing the Atlantic. Return to the hotel.",
        meta: [["Meal", "breakfast"], ["Overnight", "Dakhla"]] },
      { num: "Day 3", title: "Dakhla — City and free activities",
        text: "Morning: visit of the city of Dakhla, the fish market, the seafront. Free afternoon: beach, kitesurfing (optional), kayaking. Evening at the hotel.",
        meta: [["Meal", "breakfast"], ["Overnight", "Dakhla"]] },
      { num: "Day 4", title: "Dakhla – Casablanca",
        text: "Breakfast at the hotel. Transfer to the airport. Return flight to Casablanca. End of our services.",
        meta: [["Meal", "breakfast"]] }
    ],
    inclus: [
      "Round-trip flight Casablanca / Dakhla",
      "3 nights at a hotel in Dakhla",
      "Excursions (lagoon, Lassarga dunes)",
      "Airport / hotel transfers",
      "The assistance of Voyages 21"
    ],
    exclus: [
      "Optional water activities (kitesurfing, paddleboarding)",
      "Meals not mentioned",
      "Extras and drinks",
      "Tips"
    ],
    hotels: ["Hotel in Dakhla (3 nights)"],
    priceTable: {
      head: ["Category", "Type", "Price / person"],
      rows: [
        ["Double", "All inclusive", "5 500 DH"]
      ]
    },
    children: "Children's rates on request",
    route: ["Casablanca", "Dakhla", "Lagoon", "Lassarga", "Casablanca"],
    dates: {
      line: "Departures available in 2026 from Casablanca.",
      note: "Contact us for availability and group rates."
    },
    cta: {
      title: "Fancy discovering Dakhla?",
      text: "We organise your tailor-made stay, to suit your dates and your wishes — just as we have done since 2000."
    }
  }

};
