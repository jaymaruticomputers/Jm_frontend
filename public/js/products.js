/* ============================================================
   JM COMPUTERS — Product Catalog & Renderer
   --------------------------------------------------------------
   Each shop page contains:
     <div class="shop-grid" data-category="<key>"></div>
   This file renders the 25 product cards for that category.
   Brands, models and prices below are realistic placeholders for
   the Indian market; swap them for actual SKUs when you have them.
   ============================================================ */
(function(){

  /* ---------- Image pools (rotated by index per category) ---------- */
  const POOLS = {
    headphones:[
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80'
    ],
    mousepad:[
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1615663249857-2db568d3ad8b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=600&q=80'
    ],
    pc:[
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591489630369-ed3859c46a32?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1622957461168-202193fff44d?auto=format&fit=crop&w=600&q=80'
    ],
    chair:[
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611174266060-0c8eea1fb39c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610465299993-e6675c9f9efa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80'
    ],
    controller:[
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1612801799158-23dd56f036ce?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&w=600&q=80'
    ],
    webcam:[
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591808216268-ce0b82787efe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1574721042829-9aabac4ec4f4?auto=format&fit=crop&w=600&q=80'
    ],
    microphone:[
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610041317877-522f2a78f1b1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1612278675615-7b093b07772d?auto=format&fit=crop&w=600&q=80'
    ],
    elgato:[
      'https://images.unsplash.com/photo-1633113088029-fa023f4a4bee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1622957461168-202193fff44d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80'
    ],
    cpu:[
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=600&q=80'
    ],
    mobo:[
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=600&q=80'
    ],
    gpu:[
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80'
    ],
    ram:[
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
    ],
    storage:[
      'https://images.unsplash.com/photo-1602837441984-25f4d4329ee3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600348712270-5a9563d228f0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80'
    ],
    cabinet:[
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591489630369-ed3859c46a32?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1622957461168-202193fff44d?auto=format&fit=crop&w=600&q=80'
    ],
    cooler:[
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80'
    ],
    psu:[
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606918801954-d46d46d3360a?auto=format&fit=crop&w=600&q=80'
    ],
    monitor:[
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=600&q=80'
    ]
  };

  /* ---------- Catalogs ----------
     Item format: [name, sale_price_inr, mrp_inr, discount_pct, img_pool_idx, out_of_stock?]
  ---------------------------------- */
  const CATALOG = {

    'gaming-headphones': { pool:'headphones', items:[
      ['HYPERX Cloud III Wireless Gaming Headset (Black/Red) (DTS Headphone:X)', 9999, 14999, 33, 0],
      ['HYPERX Cloud Stinger 2 Wired Gaming Headset (Black)', 2599, 3299, 21, 1],
      ['LOGITECH G435 Lightspeed Wireless Gaming Headset (Black) (40h Battery)', 4999, 8995, 44, 2],
      ['LOGITECH G733 Lightspeed Wireless RGB Gaming Headset (Black)', 11999, 16995, 29, 3],
      ['RAZER BlackShark V2 X Wired Gaming Headset (Black)', 3999, 5499, 27, 4],
      ['RAZER BlackShark V2 Pro 2023 Wireless Gaming Headset (Black)', 15999, 22999, 30, 0],
      ['CORSAIR HS80 RGB Wireless Premium Gaming Headset (Carbon)', 17999, 24999, 28, 1],
      ['CORSAIR HS55 Stereo Wired Gaming Headset (Carbon)', 4499, 6999, 36, 2],
      ['STEELSERIES Arctis Nova 7 Wireless Multi-Platform Gaming Headset', 14999, 19999, 25, 3],
      ['ASUS ROG Delta S Wired USB-C Gaming Headset (Black)', 16999, 19999, 15, 4, 1],
      ['COSMIC BYTE GS410 Wired Gaming Headphone (Black/Red)', 999, 1499, 33, 0],
      ['COSMIC BYTE Equinox Borealis 7.1 Wired Gaming Headset (Black)', 1799, 2499, 28, 1],
      ['REDRAGON Zeus H510 7.1 Surround Wired Gaming Headset (Black)', 1899, 3499, 46, 2],
      ['REDRAGON Pandora H350 RGB Wired Gaming Headset (Black)', 1599, 2999, 47, 3],
      ['SENNHEISER HD 599 Open-back Audiophile Headphones (Ivory)', 12999, 19999, 35, 4],
      ['SENNHEISER GSP 600 Closed-back Pro Gaming Headset', 19999, 24999, 20, 0],
      ['HYPERX Cloud Alpha S Wired 7.1 Gaming Headset (Black/Blue)', 8499, 13499, 37, 1],
      ['HYPERX Cloud Earbuds II True Wireless (Black)', 2999, 4999, 40, 2],
      ['JBL Quantum 100 Wired Over-Ear Gaming Headset (Black)', 1799, 3999, 55, 3],
      ['JBL Quantum 400 USB Wired Surround Gaming Headset (Black)', 5999, 9999, 40, 4],
      ['BOYA BY-HP1 Studio Monitor Headphones (Black)', 1799, 2999, 40, 0],
      ['SONY INZONE H5 Wireless Gaming Headset (White)', 14999, 17999, 16, 1],
      ['EVOFOX Hellfox Wireless Gaming Headset with ANC (Black)', 4999, 7999, 37, 2],
      ['AULA S605 RGB Wired Gaming Headset (Black)', 1499, 2499, 40, 3],
      ['RAZER Kraken V3 X Wired Gaming Headset (Black)', 4499, 6999, 35, 4]
    ]},

    'gaming-mousepad': { pool:'mousepad', items:[
      ['LOGITECH G840 XL Cloth Gaming Mouse Pad (Black) (900 x 400 x 3 mm)', 3499, 5495, 36, 0],
      ['LOGITECH G740 Large Thick Cloth Gaming Mouse Pad (Black)', 1999, 2995, 33, 1],
      ['LOGITECH G440 Hard Polymer Gaming Mouse Pad (Black)', 1799, 2495, 28, 2],
      ['RAZER Goliathus Extended Chroma RGB Gaming Mouse Pad (Black) (XXL)', 5999, 9999, 40, 3],
      ['RAZER Gigantus V2 Soft Gaming Mouse Pad (Black) (XXL)', 3499, 5499, 36, 0],
      ['RAZER Goliathus Mobile Stealth Edition Mouse Pad (Black) (Small)', 999, 1499, 33, 1],
      ['HYPERX Fury S Pro Gaming Mouse Pad (Black) (Extra Large)', 2499, 3499, 28, 2],
      ['HYPERX Pulsefire Mat RGB Gaming Mouse Pad (Black) (Extended)', 4999, 7999, 37, 3],
      ['CORSAIR MM350 Pro Premium Spill-Proof Cloth Gaming Mouse Pad (Black)', 2999, 4499, 33, 0],
      ['CORSAIR MM700 RGB Extended Cloth Mouse Pad (Black) (3XL)', 5499, 8499, 35, 1],
      ['STEELSERIES QcK Heavy Gaming Mouse Pad (Black) (Medium)', 1499, 2199, 31, 2],
      ['STEELSERIES QcK Edge XL Cloth Gaming Mouse Pad (Black)', 1899, 2999, 36, 3],
      ['COSMIC BYTE Hyperwarp RGB Gaming Mouse Pad (Black) (900x400)', 1499, 2499, 40, 0],
      ['COSMIC BYTE Cygnus Speed Cloth Gaming Mouse Pad (Black) (Large)', 799, 1299, 38, 1],
      ['REDRAGON Capricorn P012 RGB Gaming Mouse Pad (Black)', 1199, 1999, 40, 2],
      ['REDRAGON Aquarius P018 Stitched-Edge Mouse Pad (Black) (XL)', 1499, 2299, 34, 3],
      ['ASUS ROG Sheath Extended Gaming Mouse Pad (Black/Red) (900x440)', 3999, 5999, 33, 0],
      ['ASUS ROG Strix Slice Hard Surface Mouse Pad (Black)', 2299, 3499, 34, 1],
      ['MSI Agility GD30 Pro Premium Cloth Gaming Mouse Pad (Black)', 1799, 2799, 35, 2],
      ['GLORIOUS XL Heavy Cloth Stitched Edge Mouse Pad (Black)', 2999, 4499, 33, 3],
      ['AULA F-X3 RGB Gaming Mouse Pad (Black) (800x300)', 999, 1799, 44, 0],
      ['EVOFOX Lightning Pro RGB Mouse Pad (Black) (XL)', 1299, 1999, 35, 1],
      ['ANT ESPORTS MP380 RGB Soft Gaming Mouse Pad (Black) (Large)', 999, 1599, 37, 2],
      ['ZEBRONICS ZEB-RGB Mat Light-Up Gaming Mouse Pad (Black)', 799, 1299, 38, 3],
      ['RAPOO V1L Wired Charging Wireless Mouse Pad (Black) (10W Qi)', 2499, 3999, 37, 0]
    ]},

    'gaming-pc': { pool:'pc', items:[
      ['JM Entry Gaming PC – Ryzen 5 5600 + RTX 4060 8GB + 16GB DDR4 + 512GB NVMe', 64999, 79999, 18, 0],
      ['JM Entry Gaming PC – Intel i5-12400F + RTX 4060 8GB + 16GB DDR4 + 1TB NVMe', 69999, 84999, 17, 1],
      ['JM Pro Gaming PC – Ryzen 5 7600 + RTX 4060 Ti 8GB + 32GB DDR5 + 1TB NVMe', 89999, 109999, 18, 2],
      ['JM Pro Gaming PC – Intel i5-13400F + RTX 4060 Ti 8GB + 32GB DDR5 + 1TB NVMe', 94999, 114999, 17, 3],
      ['JM Plus Gaming PC – Ryzen 7 5800X3D + RTX 4070 12GB + 32GB DDR4 + 1TB NVMe', 109999, 129999, 15, 4],
      ['JM Plus Gaming PC – Intel i5-14400F + RTX 4070 Super 12GB + 32GB DDR5 + 1TB NVMe', 119999, 139999, 14, 0],
      ['JM Ultra Gaming PC – Ryzen 7 7800X3D + RTX 4070 Super 12GB + 32GB DDR5 + 2TB NVMe', 144999, 169999, 15, 1],
      ['JM Ultra Gaming PC – Intel i7-14700K + RTX 4070 Ti Super 16GB + 32GB DDR5 + 2TB NVMe', 169999, 199999, 15, 2],
      ['JM Elite Gaming PC – Ryzen 7 7800X3D + RTX 4080 Super 16GB + 64GB DDR5 + 2TB NVMe', 219999, 259999, 15, 3],
      ['JM Elite Gaming PC – Intel i7-14700K + RTX 4080 Super 16GB + 64GB DDR5 + 2TB NVMe', 234999, 274999, 15, 4],
      ['JM Apex Gaming PC – Ryzen 9 7950X3D + RTX 4090 24GB + 64GB DDR5 + 4TB NVMe', 339999, 389999, 13, 0],
      ['JM Apex Gaming PC – Intel i9-14900K + RTX 4090 24GB + 64GB DDR5 + 4TB NVMe', 349999, 399999, 12, 1],
      ['JM Compact ITX Gaming PC – Ryzen 7 7700 + RTX 4070 12GB (Mini ITX Case)', 154999, 179999, 14, 2],
      ['JM Stealth Black Gaming PC – Intel i5-13400F + RTX 4060 Ti 8GB + RGB Build', 99999, 119999, 17, 3],
      ['JM AIO Gaming PC – Ryzen 5 7600 + RTX 4060 Ti + Liquid Cooled (RGB White)', 104999, 124999, 16, 4],
      ['JM Frost Gaming PC – Intel i7-13700K + RTX 4070 Super + White Build', 159999, 184999, 14, 0],
      ['JM Streamer Gaming PC – Ryzen 9 7900X + RTX 4070 Ti Super + Capture Ready', 189999, 219999, 14, 1],
      ['JM Esports Gaming PC – Ryzen 5 5600 + RTX 3060 12GB + 16GB DDR4 + 480GB SSD', 54999, 67999, 19, 2],
      ['JM Esports Plus Gaming PC – Intel i3-13100F + RTX 4060 8GB + 16GB DDR4', 59999, 72999, 18, 3],
      ['JM Budget Gaming PC – Ryzen 5 4600G + 16GB DDR4 + 512GB NVMe (APU Build)', 32999, 39999, 18, 4],
      ['JM 1440p Gaming PC – Ryzen 7 7700 + RTX 4070 Ti 12GB + 32GB DDR5 + 1TB NVMe', 134999, 159999, 16, 0],
      ['JM 4K Gaming PC – Intel i7-14700K + RTX 4080 16GB + 32GB DDR5 + 2TB NVMe', 199999, 229999, 13, 1],
      ['JM RGB Showcase PC – Ryzen 7 7800X3D + RTX 4070 Super + Tempered Glass Case', 139999, 164999, 15, 2],
      ['JM Silent Gaming PC – Ryzen 5 7600 + RTX 4060 + Noctua Cooling (Low Noise)', 84999, 99999, 15, 3],
      ['JM Workstation Gaming PC – Ryzen 9 7950X + RTX 4080 Super + 128GB DDR5', 289999, 329999, 12, 4]
    ]},

    'gaming-chair': { pool:'chair', items:[
      ['COSMIC BYTE Apollo Multi-Function Ergonomic Gaming Chair (Black/Red)', 11999, 17999, 33, 0],
      ['COSMIC BYTE Citadel Ergonomic Gaming Chair (Black/Blue)', 13999, 19999, 30, 1],
      ['GREEN SOUL Beast Series Gaming Chair (Black/Red) (Premium PU Leather)', 18999, 26999, 30, 2],
      ['GREEN SOUL Monster Ultimate Series Gaming Chair (Black/Grey)', 24999, 34999, 29, 3],
      ['GREEN SOUL Vision Multi Functional Ergonomic Office Chair (Black)', 22999, 31999, 28, 0],
      ['CELLBELL Transformer C100 Gaming Chair with Footrest (Black/Red)', 12999, 18999, 32, 1],
      ['CELLBELL Strider X2 High-Back Gaming Chair (Black)', 14999, 21999, 32, 2],
      ['DROGO Multi-Purpose Ergonomic Gaming Chair (Black/Red)', 9999, 14999, 33, 3],
      ['EVOFOX Echo Pro Ergonomic Gaming Chair with Massager (Black)', 16999, 24999, 32, 0],
      ['EVOFOX Tank Series Gaming Chair (Black/Carbon Fibre)', 21999, 29999, 27, 1],
      ['AKRACING Master Pro Premium Gaming Chair (Black) (Real Leather)', 79999, 99999, 20, 2, 1],
      ['AKRACING Core Series EX Gaming Chair (Black/Blue)', 39999, 54999, 27, 3],
      ['ANDA SEAT Kaiser 3 XL Premium Gaming Chair (Black) (Magnetic Headrest)', 49999, 67999, 26, 0],
      ['ANDA SEAT Phantom 3 Pro Hybrid Gaming Chair (Carbon Black)', 44999, 59999, 25, 1],
      ['SECRETLAB TITAN Evo 2022 Gaming Chair (Stealth Black) (Regular)', 64999, 79999, 19, 2],
      ['ASUS ROG Chariot RGB Core Gaming Chair (Black)', 34999, 44999, 22, 3],
      ['MSI MAG CH130 X Gaming Chair (Black/Carbon)', 18999, 26999, 30, 0],
      ['REDGEAR Comet X RGB Ergonomic Gaming Chair (Black/Red)', 14999, 21999, 32, 1],
      ['ANT ESPORTS 8077 Royale Gaming Chair (Black/Red)', 12999, 17999, 28, 2],
      ['ANT ESPORTS Carbon Frost Premium Gaming Chair (White/Carbon)', 16999, 23999, 29, 3],
      ['DURIAN Atom Mid-Back Computer Chair (Black) (Mesh)', 7999, 11999, 33, 0],
      ['SAVYA HOME Apex Crown Office Executive Chair (Black) (Lumbar)', 9999, 14999, 33, 1],
      ['NILKAMAL Hawk High-Back Mesh Office Chair (Black/Grey)', 6999, 9999, 30, 2],
      ['REKART Multi-Functional Ergonomic Gaming Chair (White/Pink)', 12999, 18999, 32, 3],
      ['SECRETLAB OMEGA 2020 Series Gaming Chair (Stealth) — Refurbished', 39999, 54999, 27, 0]
    ]},

    'controllers': { pool:'controller', items:[
      ['MICROSOFT Xbox Wireless Controller — Carbon Black (Series X|S)', 4499, 5990, 25, 0],
      ['MICROSOFT Xbox Wireless Controller — Robot White (Series X|S)', 4499, 5990, 25, 1],
      ['MICROSOFT Xbox Wireless Controller — Pulse Red (Series X|S)', 4699, 5990, 22, 2],
      ['MICROSOFT Xbox Elite Wireless Controller Series 2 (Black)', 13999, 17990, 22, 3],
      ['MICROSOFT Xbox Elite Wireless Controller Series 2 Core (White)', 9999, 13990, 29, 0],
      ['SONY DualSense Wireless Controller — Midnight Black (PS5)', 5499, 6990, 21, 1],
      ['SONY DualSense Wireless Controller — Cosmic Red (PS5)', 5999, 7490, 20, 2],
      ['SONY DualSense Edge Pro Wireless Controller (White) (PS5)', 22499, 27990, 20, 3],
      ['SONY DualShock 4 Wireless Controller — Jet Black (PS4)', 3999, 5290, 24, 0],
      ['LOGITECH F310 Wired USB Gamepad (Black)', 1495, 1995, 25, 1],
      ['LOGITECH F710 Wireless USB Gamepad (Black)', 3499, 4495, 22, 2],
      ['LOGITECH G29 Driving Force Racing Wheel + Pedals (PS5/PS4/PC)', 28999, 36999, 22, 3],
      ['LOGITECH G920 Driving Force Racing Wheel + Pedals (Xbox/PC)', 26999, 33999, 21, 0],
      ['LOGITECH G923 TRUEFORCE Racing Wheel (PS5/PS4/PC)', 38999, 47999, 19, 1],
      ['THRUSTMASTER T128 Force Feedback Racing Wheel (PS5/PS4/PC)', 16999, 21999, 23, 2],
      ['REDGEAR Pro Series Wireless Gamepad (Black) (PC/PS3)', 2199, 2999, 27, 3],
      ['REDGEAR Cosmo 7 Wireless Gamepad (Black) (PC)', 2499, 3499, 29, 0],
      ['COSMIC BYTE Ares Wired Gamepad (Black) (PC/PS3/Android)', 1199, 1799, 33, 1],
      ['COSMIC BYTE C3070W Wireless Gamepad (Black) (PC/Android)', 1799, 2799, 36, 2],
      ['EVOFOX Elite Play Wireless Gamepad (Black)', 1599, 2499, 36, 3],
      ['EVOFOX Mars Wired Vibration Gamepad (Black)', 999, 1499, 33, 0],
      ['ANT ESPORTS GP100 Pro Wired Gamepad (Black) (PC/PS3)', 1199, 1799, 33, 1],
      ['8BITDO Pro 2 Bluetooth Controller (Black) (Switch/PC/Android)', 5999, 7999, 25, 2],
      ['NINTENDO Switch Pro Controller (Black) — Genuine', 6999, 8499, 18, 3, 1],
      ['MICROSOFT Xbox Adaptive Controller (White) — Accessibility', 9999, 11990, 17, 0]
    ]},

    'webcam': { pool:'webcam', items:[
      ['LOGITECH C920 HD Pro Full HD 1080p Webcam (Black)', 6499, 8995, 28, 0],
      ['LOGITECH C922 Pro Stream Full HD 1080p Webcam (Black)', 8999, 12995, 31, 1],
      ['LOGITECH BRIO 100 Full HD 1080p Webcam (Off White)', 3499, 4995, 30, 2],
      ['LOGITECH BRIO 300 Full HD 1080p Webcam (Graphite) (USB-C)', 6999, 9495, 26, 3],
      ['LOGITECH BRIO 500 Full HD 1080p Webcam (Graphite) (Show Mode)', 14999, 19995, 25, 0],
      ['LOGITECH BRIO 4K Ultra HD Pro Webcam (Black) (HDR)', 18999, 24995, 24, 1],
      ['LOGITECH MX BRIO 705 4K Premium Webcam (Graphite) (AI)', 27999, 35995, 22, 2],
      ['LOGITECH StreamCam Full HD 1080p Webcam (Graphite) (USB-C)', 12999, 16995, 24, 3],
      ['LOGITECH C270 HD 720p Webcam (Black)', 2299, 2895, 21, 0],
      ['LOGITECH C310 HD 720p Webcam (Black)', 2999, 3995, 25, 1],
      ['RAZER Kiyo Pro Full HD 1080p Streaming Webcam (Black) (HDR)', 16999, 22999, 26, 2],
      ['RAZER Kiyo X Full HD 1080p Streaming Webcam (Black)', 6999, 9999, 30, 3],
      ['ASUS ROG Eye S Full HD 1080p 60fps Streaming Webcam', 11999, 15990, 25, 0],
      ['MICROSOFT LifeCam HD-3000 Webcam (Black)', 2799, 3990, 30, 1],
      ['MICROSOFT Modern Webcam Full HD 1080p (Black)', 5999, 7990, 25, 2],
      ['LENOVO 300 FHD Webcam with Privacy Shutter (Black)', 2499, 3299, 24, 3],
      ['LENOVO 510 FHD Webcam (Cloud Grey)', 4999, 6499, 23, 0],
      ['HP 320 FHD Webcam with Noise Cancelling Mic (Black)', 3499, 4499, 22, 1],
      ['HP 960 4K Streaming Webcam (Black) (Auto Frame)', 16999, 21999, 23, 2],
      ['DELL Pro 4K Ultra HD Webcam WB7022 (Black) (AI Auto Frame)', 22999, 28999, 21, 3],
      ['BOYA BY-DV-CW1 Full HD 1080p USB Webcam', 2999, 4499, 33, 0],
      ['COSMIC BYTE CB-CW003 Full HD Webcam with Mic (Black)', 1999, 2999, 33, 1],
      ['ZEBRONICS ZEB-Crisp Pro Full HD 1080p Webcam (Black)', 2299, 3299, 30, 2],
      ['ANT ESPORTS Stream 1080P Full HD Streaming Webcam', 2999, 4499, 33, 3],
      ['INSTA360 LINK 4K AI-Tracking PTZ Webcam (Black)', 24999, 31999, 22, 0]
    ]},

    'microphones': { pool:'microphone', items:[
      ['BLUE Yeti USB Condenser Microphone (Blackout)', 12999, 16995, 23, 0],
      ['BLUE Yeti X Professional USB Microphone (Black) (HD Meter)', 18999, 24995, 24, 1],
      ['BLUE Yeti Nano Premium Compact USB Mic (Shadow Grey)', 9999, 12995, 23, 2],
      ['BLUE Snowball iCE Plug & Play USB Microphone (White)', 5999, 7995, 25, 3],
      ['HYPERX QuadCast S RGB USB Condenser Microphone (Black)', 15999, 21999, 27, 0],
      ['HYPERX QuadCast Standalone USB Microphone (Black/Red)', 12999, 17999, 28, 1],
      ['HYPERX SoloCast USB Condenser Microphone (Black)', 5999, 8499, 29, 2],
      ['RAZER Seiren V2 X USB Condenser Microphone (Black)', 8999, 11999, 25, 3],
      ['RAZER Seiren V3 Mini Ultra-Compact Streaming Mic (Black)', 4999, 6999, 29, 0],
      ['RAZER Seiren Mini Ultra-Compact USB Streaming Mic (Black)', 4499, 5999, 25, 1],
      ['SHURE MV7 Dynamic USB/XLR Podcast Microphone (Black)', 27999, 34999, 20, 2],
      ['SHURE SM7B Cardioid Dynamic Broadcast Microphone (Black)', 36999, 44999, 18, 3],
      ['SHURE MV5 Digital Condenser Microphone (Black) (USB / Lightning)', 11999, 14999, 20, 0],
      ['AUDIO-TECHNICA AT2020USB+ Cardioid USB Microphone (Black)', 12999, 17999, 28, 1],
      ['AUDIO-TECHNICA AT2020 XLR Cardioid Condenser Microphone', 9999, 13999, 29, 2],
      ['RODE NT-USB Mini Studio-Quality USB Microphone (Black)', 9999, 13999, 29, 3],
      ['RODE PodMic Dynamic Broadcast XLR Microphone (Black)', 12999, 16999, 24, 0],
      ['RODE NT1 5th Gen Studio Condenser Microphone (Silver) (USB/XLR)', 22999, 27999, 18, 1],
      ['MAONO PD400X Dynamic USB/XLR Podcast Microphone (Black)', 11999, 16999, 29, 2],
      ['MAONO AU-PM422 USB Condenser Microphone Kit (Black)', 4999, 7999, 38, 3],
      ['BOYA BY-PM700 USB Condenser Microphone (Black)', 2499, 3999, 38, 0],
      ['BOYA BY-MM1 Pro Cardioid Shotgun Microphone (Black)', 3499, 4999, 30, 1],
      ['BOYA BY-M1 Lavalier Lapel Microphone (Black)', 599, 999, 40, 2],
      ['ZEBRONICS ZEB-Stream X1 USB Streaming Microphone Kit', 1999, 2999, 33, 3],
      ['EVOFOX Vlogger USB Condenser Microphone (Black)', 1499, 2499, 40, 0]
    ]},

    'elgato': { pool:'elgato', items:[
      ['ELGATO Stream Deck MK.2 (15 LCD Keys) (Black)', 17999, 22999, 22, 0],
      ['ELGATO Stream Deck XL (32 LCD Keys) (Black)', 28999, 36999, 22, 1],
      ['ELGATO Stream Deck Mini (6 LCD Keys) (Black)', 9999, 12999, 23, 2],
      ['ELGATO Stream Deck Plus (8 Keys + 4 Dials + Touchstrip) (Black)', 27999, 34999, 20, 3],
      ['ELGATO Stream Deck Pedal (3 Programmable Pedals) (Black)', 11999, 15999, 25, 0],
      ['ELGATO HD60 X External Capture Card (1080p60 HDR / 4K60 Pass-through)', 18999, 23999, 21, 1],
      ['ELGATO HD60 S+ External Capture Card (1080p60 HDR / 4K60 Pass-through)', 16999, 21999, 23, 2],
      ['ELGATO 4K60 Pro MK.2 Internal Capture Card (PCIe)', 32999, 41999, 21, 3],
      ['ELGATO 4K X 4K144 HDR10 Internal Capture Card (PCIe)', 39999, 49999, 20, 0],
      ['ELGATO Cam Link 4K USB Capture Device (HDMI to USB-A)', 14999, 18999, 21, 1],
      ['ELGATO Cam Link Pro PCIe 4-Channel Capture Card', 29999, 37999, 21, 2],
      ['ELGATO Facecam Pro 4K60 Ultra HD Streaming Webcam', 32999, 41999, 21, 3],
      ['ELGATO Facecam Premium Full HD 1080p60 Webcam', 17999, 22999, 22, 0],
      ['ELGATO Facecam MK.2 Full HD 1080p60 Webcam', 14999, 18999, 21, 1],
      ['ELGATO Wave:3 Premium USB Condenser Microphone (Black)', 17999, 22999, 22, 2],
      ['ELGATO Wave:1 USB Condenser Microphone (Black)', 13999, 17999, 22, 3],
      ['ELGATO Wave DX Dynamic XLR Broadcast Microphone (Black)', 11999, 15999, 25, 0],
      ['ELGATO Wave Mic Arm LP Low-Profile Premium Boom Arm', 11999, 15999, 25, 1],
      ['ELGATO Key Light Air LED Panel (Adjustable Tone) (Pair Compatible)', 16999, 21999, 23, 2],
      ['ELGATO Key Light Premium Studio LED Panel (Pair Compatible)', 27999, 35999, 22, 3],
      ['ELGATO Key Light Mini Portable Rechargeable LED Panel', 9999, 12999, 23, 0],
      ['ELGATO Ring Light Premium 17" Dimmable LED Ring Light', 21999, 27999, 21, 1],
      ['ELGATO Green Screen MT Mountable Pull-Up Chroma Key (1.78 m)', 19999, 24999, 20, 2],
      ['ELGATO Green Screen Wide Pull-Up Chroma Key (1.8 m)', 17999, 22999, 22, 3],
      ['ELGATO Multi Mount Master Mount Studio Pole + Accessories', 8999, 11999, 25, 0]
    ]},

    'streaming-pc': { pool:'pc', items:[
      ['JM Streaming Starter PC – Ryzen 5 7600 + RTX 4060 + 32GB DDR5 + Capture Ready', 89999, 109999, 18, 0],
      ['JM Streaming Pro PC – Intel i7-13700K + RTX 4060 Ti + 32GB DDR5 + 1TB NVMe', 119999, 139999, 14, 1],
      ['JM Streaming Plus PC – Ryzen 7 7800X3D + RTX 4070 Super + 64GB DDR5', 159999, 184999, 14, 2],
      ['JM Streaming Elite PC – Intel i9-14900K + RTX 4070 Ti Super + 64GB DDR5', 199999, 229999, 13, 3],
      ['JM Apex Streamer PC – Ryzen 9 7950X + RTX 4080 Super + 128GB DDR5', 289999, 329999, 12, 4],
      ['JM Compact Streamer PC – Ryzen 7 7700 + RTX 4070 (Mini ITX White)', 154999, 179999, 14, 0],
      ['JM Dual-Monitor Streamer PC – i7-14700K + RTX 4070 Super + 4 Display Output', 169999, 199999, 15, 1],
      ['JM AIO Streamer PC – Ryzen 9 7900X + RTX 4070 Ti + 360mm AIO Liquid Cool', 184999, 214999, 14, 2],
      ['JM Twitch Pro PC – Ryzen 7 7700X + RTX 4070 + Elgato Capture Pre-Installed', 154999, 179999, 14, 3],
      ['JM YouTube Creator PC – Intel i7-13700K + RTX 4070 Super + 2TB NVMe', 169999, 199999, 15, 4],
      ['JM Simulator + Stream PC – Ryzen 7 7800X3D + RTX 4070 Ti + 32GB DDR5', 179999, 209999, 14, 0],
      ['JM Frost Streamer PC – Intel i5-13400F + RTX 4060 Ti + White RGB Build', 109999, 129999, 15, 1],
      ['JM Stealth Streamer PC – Ryzen 5 7600 + RTX 4060 + Black RGB Build', 89999, 109999, 18, 2],
      ['JM Console-Style Stream PC – Ryzen 5 5600X + RTX 4060 + 16GB DDR4', 74999, 89999, 17, 3],
      ['JM Couch Stream Mini PC – Ryzen 5 5600G + 32GB DDR4 + 500GB NVMe', 49999, 59999, 17, 4],
      ['JM Esports + Stream PC – i5-14400F + RTX 4060 Ti + 144Hz Ready', 99999, 119999, 17, 0],
      ['JM Pro Caster PC – Intel i9-13900K + RTX 4070 Ti + Dual XLR Mic Ready', 199999, 229999, 13, 1],
      ['JM Co-Stream Duo PC – Ryzen 9 7900X + RTX 4070 Super + Dual Cam Input', 184999, 214999, 14, 2],
      ['JM Encoder Pro Stream PC – Intel i7-13700K + 64GB DDR5 + NVENC Ready', 164999, 194999, 15, 3],
      ['JM Studio Stream PC – Ryzen 9 7950X + RTX 4080 + Stream Deck Bundle', 254999, 289999, 12, 4],
      ['JM Mobile Stream PC – Ryzen 5 7600 + RTX 4060 + Mini Tower', 79999, 94999, 16, 0],
      ['JM Backup Stream PC – Ryzen 5 5600 + RTX 4060 + 16GB DDR4 (Failover)', 64999, 79999, 19, 1],
      ['JM Workstation + Stream PC – Threadripper 7960X + RTX 4080 Super', 419999, 489999, 14, 2],
      ['JM Vlog + Stream PC – Ryzen 7 7800X3D + RTX 4070 + Davinci Optimised', 154999, 179999, 14, 3],
      ['JM AAA Stream PC – Intel i9-14900K + RTX 4090 24GB + 64GB DDR5 + 4TB NVMe', 349999, 399999, 12, 4]
    ]},

    'processor': { pool:'cpu', items:[
      ['AMD Ryzen 5 5600 Desktop Processor (6 Core / 12 Thread / AM4)', 9999, 14990, 33, 0],
      ['AMD Ryzen 5 5600X Desktop Processor (6C/12T / 4.6 GHz Boost)', 12999, 17990, 28, 1],
      ['AMD Ryzen 5 7600 Desktop Processor (6C/12T / AM5 / DDR5)', 18999, 23990, 21, 2],
      ['AMD Ryzen 5 7600X Desktop Processor (6C/12T / 5.3 GHz Boost)', 22999, 27990, 18, 3],
      ['AMD Ryzen 7 5800X3D Desktop Processor (8C/16T / 3D V-Cache)', 22999, 31990, 28, 0],
      ['AMD Ryzen 7 7700 Desktop Processor (8C/16T / AM5)', 26999, 33990, 21, 1],
      ['AMD Ryzen 7 7700X Desktop Processor (8C/16T / 5.4 GHz Boost)', 28999, 35990, 19, 2],
      ['AMD Ryzen 7 7800X3D Desktop Processor (8C/16T / 3D V-Cache / AM5)', 36999, 44990, 18, 3],
      ['AMD Ryzen 9 7900X Desktop Processor (12C/24T / 5.6 GHz Boost)', 42999, 53990, 20, 0],
      ['AMD Ryzen 9 7950X Desktop Processor (16C/32T / 5.7 GHz Boost)', 54999, 67990, 19, 1],
      ['AMD Ryzen 9 7950X3D Desktop Processor (16C/32T / 3D V-Cache)', 64999, 79990, 19, 2],
      ['AMD Ryzen 9 9950X Desktop Processor (16C/32T / Zen 5 / AM5)', 69999, 84990, 18, 3],
      ['INTEL Core i3-13100F Desktop Processor (4C/8T / LGA 1700)', 8999, 11990, 25, 0],
      ['INTEL Core i5-12400F Desktop Processor (6C/12T / 4.4 GHz Boost)', 14999, 19990, 25, 1],
      ['INTEL Core i5-13400F Desktop Processor (10C/16T / 4.6 GHz Boost)', 17999, 23990, 25, 2],
      ['INTEL Core i5-14400F Desktop Processor (10C/16T / 4.7 GHz Boost)', 19999, 25990, 23, 3],
      ['INTEL Core i5-14600K Desktop Processor (14C/20T / 5.3 GHz Boost)', 28999, 35990, 19, 0],
      ['INTEL Core i7-13700K Desktop Processor (16C/24T / 5.4 GHz Boost)', 36999, 44990, 18, 1],
      ['INTEL Core i7-14700K Desktop Processor (20C/28T / 5.6 GHz Boost)', 41999, 49990, 16, 2],
      ['INTEL Core i9-13900K Desktop Processor (24C/32T / 5.8 GHz Boost)', 54999, 64990, 15, 3],
      ['INTEL Core i9-14900K Desktop Processor (24C/32T / 6.0 GHz Boost)', 59999, 69990, 14, 0],
      ['INTEL Core Ultra 7 265K Desktop Processor (20C / Arrow Lake / LGA 1851)', 44999, 54990, 18, 1],
      ['INTEL Core Ultra 9 285K Desktop Processor (24C / Arrow Lake / LGA 1851)', 64999, 79990, 19, 2],
      ['AMD Ryzen 5 8600G Desktop Processor with Radeon 760M (APU / AM5)', 21999, 26990, 18, 3, 1],
      ['AMD Ryzen 7 8700G Desktop Processor with Radeon 780M (APU / AM5)', 32999, 39990, 18, 0]
    ]},

    'motherboard': { pool:'mobo', items:[
      ['MSI PRO B650-S WiFi AMD AM5 ATX Motherboard (DDR5 / PCIe 5.0)', 17999, 22990, 22, 0],
      ['MSI MAG B650 Tomahawk WiFi AMD AM5 ATX Motherboard', 21999, 27990, 21, 1],
      ['MSI MPG X670E Carbon WiFi AMD AM5 ATX Motherboard', 39999, 49990, 20, 2],
      ['MSI MAG B760 Tomahawk WiFi DDR5 Intel LGA 1700 ATX Motherboard', 18999, 23990, 21, 3],
      ['MSI PRO Z790-P WiFi Intel LGA 1700 ATX Motherboard (DDR5)', 22999, 28990, 21, 0],
      ['MSI MEG Z790 ACE Intel LGA 1700 E-ATX Motherboard', 64999, 79990, 19, 1],
      ['ASUS PRIME B650-PLUS AMD AM5 ATX Motherboard (DDR5)', 18999, 23990, 21, 2],
      ['ASUS TUF GAMING B650-PLUS WiFi AMD AM5 ATX Motherboard', 22999, 28990, 21, 3],
      ['ASUS ROG STRIX B650E-F GAMING WiFi AMD AM5 ATX Motherboard', 28999, 35990, 19, 0],
      ['ASUS ROG STRIX X670E-E GAMING WiFi AMD AM5 ATX Motherboard', 42999, 52990, 19, 1],
      ['ASUS PRIME B760-PLUS D4 Intel LGA 1700 ATX Motherboard (DDR4)', 14999, 18990, 21, 2],
      ['ASUS TUF GAMING Z790-PLUS WiFi DDR5 Intel LGA 1700 ATX Motherboard', 26999, 32990, 18, 3],
      ['ASUS ROG MAXIMUS Z790 HERO Intel LGA 1700 ATX Motherboard', 64999, 79990, 19, 0],
      ['GIGABYTE B650 AORUS Elite AX AMD AM5 ATX Motherboard (DDR5)', 21999, 26990, 19, 1],
      ['GIGABYTE X670 AORUS Elite AX AMD AM5 ATX Motherboard', 31999, 39990, 20, 2],
      ['GIGABYTE B760 GAMING X AX DDR4 Intel LGA 1700 ATX Motherboard', 14999, 18990, 21, 3],
      ['GIGABYTE Z790 AORUS Elite AX Intel LGA 1700 ATX Motherboard (DDR5)', 26999, 32990, 18, 0],
      ['ASROCK B650M PG Lightning WiFi AMD AM5 mATX Motherboard', 16999, 21990, 23, 1],
      ['ASROCK X670E Taichi AMD AM5 E-ATX Motherboard (DDR5)', 49999, 59990, 17, 2],
      ['ASROCK B760M Steel Legend WiFi Intel LGA 1700 mATX Motherboard', 16999, 21990, 23, 3],
      ['ASROCK Z790 Steel Legend WiFi Intel LGA 1700 ATX Motherboard', 24999, 30990, 19, 0],
      ['ASUS PRIME H610M-K D4 Intel LGA 1700 mATX Motherboard (Budget Build)', 7999, 10990, 27, 1],
      ['MSI PRO A620M-E AMD AM5 mATX Motherboard (DDR5 / Budget)', 9999, 12990, 23, 2],
      ['GIGABYTE B650M K AMD AM5 mATX Motherboard (DDR5 / Compact)', 13999, 17990, 22, 3],
      ['ASUS ROG STRIX Z790-I GAMING WiFi Mini-ITX Intel LGA 1700 Motherboard', 39999, 49990, 20, 0]
    ]},

    'nvidia-graphics-card': { pool:'gpu', items:[
      ['MSI GeForce RTX 4060 Ventus 2X Black OC 8GB GDDR6 (PCIe 4.0)', 31999, 39990, 20, 0],
      ['MSI GeForce RTX 4060 Ti Gaming X 8GB GDDR6 (Twin Fan)', 41999, 49990, 16, 1],
      ['MSI GeForce RTX 4070 Super Ventus 3X OC 12GB GDDR6X', 64999, 74990, 13, 2],
      ['MSI GeForce RTX 4070 Ti Super Gaming Trio 16GB GDDR6X', 89999, 104990, 14, 3],
      ['MSI GeForce RTX 4080 Super 16GB Gaming X Slim 16GB GDDR6X', 124999, 149990, 17, 0],
      ['MSI GeForce RTX 4090 Suprim Liquid X 24GB GDDR6X (AIO Hybrid)', 234999, 269990, 13, 1],
      ['ASUS DUAL GeForce RTX 4060 OC 8GB GDDR6', 32999, 39990, 18, 2],
      ['ASUS TUF GAMING GeForce RTX 4070 Super 12GB GDDR6X OC', 67999, 79990, 15, 3],
      ['ASUS ROG STRIX GeForce RTX 4080 Super White OC 16GB GDDR6X', 134999, 159990, 16, 0],
      ['ASUS ROG STRIX GeForce RTX 4090 OC 24GB GDDR6X', 244999, 279990, 12, 1],
      ['GIGABYTE GeForce RTX 4060 Eagle OC 8GB GDDR6', 31999, 39990, 20, 2],
      ['GIGABYTE GeForce RTX 4060 Ti Gaming OC 16GB GDDR6', 49999, 58990, 15, 3],
      ['GIGABYTE GeForce RTX 4070 Windforce OC 12GB GDDR6X', 62999, 73990, 14, 0],
      ['GIGABYTE AORUS GeForce RTX 4080 Super Master 16GB GDDR6X', 134999, 159990, 16, 1],
      ['ZOTAC GAMING GeForce RTX 4060 Twin Edge OC 8GB GDDR6 (Compact)', 30999, 38990, 20, 2],
      ['ZOTAC GAMING GeForce RTX 4070 Super Twin Edge OC 12GB GDDR6X', 62999, 73990, 14, 3],
      ['ZOTAC GAMING GeForce RTX 4080 Super AMP Extreme AIRO 16GB', 129999, 154990, 16, 0],
      ['INNO3D GeForce RTX 4060 Twin X2 OC 8GB GDDR6', 30999, 38990, 20, 1],
      ['INNO3D GeForce RTX 4070 Super Twin X2 12GB GDDR6X', 62999, 73990, 14, 2],
      ['PALIT GeForce RTX 4060 Dual OC 8GB GDDR6', 30999, 38990, 20, 3],
      ['PALIT GeForce RTX 4070 Ti Super GameRock OC 16GB GDDR6X', 92999, 109990, 15, 0],
      ['NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X', 239999, 274990, 13, 1, 1],
      ['MSI GeForce RTX 3060 Ventus 2X 12GB GDDR6 (Last Stock)', 26999, 32990, 18, 2],
      ['ASUS DUAL GeForce RTX 3060 Ti OC 8GB GDDR6X (Last Stock)', 32999, 39990, 18, 3],
      ['ZOTAC GAMING GeForce RTX 4060 Ti Twin Edge OC 16GB GDDR6', 48999, 57990, 15, 0]
    ]},

    'amd-graphics-card': { pool:'gpu', items:[
      ['SAPPHIRE PULSE Radeon RX 7600 8GB GDDR6 (PCIe 4.0)', 25999, 31990, 19, 0],
      ['SAPPHIRE NITRO+ Radeon RX 7700 XT 12GB GDDR6', 46999, 54990, 15, 1],
      ['SAPPHIRE NITRO+ Radeon RX 7800 XT 16GB GDDR6', 56999, 67990, 16, 2],
      ['SAPPHIRE NITRO+ Radeon RX 7900 XT 20GB GDDR6 (3-Fan)', 79999, 92990, 14, 3],
      ['SAPPHIRE NITRO+ Radeon RX 7900 XTX Vapor-X 24GB GDDR6', 99999, 117990, 15, 0],
      ['POWERCOLOR Hellhound Radeon RX 7600 8GB GDDR6', 25999, 31990, 19, 1],
      ['POWERCOLOR Hellhound Radeon RX 7700 XT 12GB GDDR6', 44999, 52990, 15, 2],
      ['POWERCOLOR Red Devil Radeon RX 7800 XT 16GB GDDR6', 58999, 69990, 16, 3],
      ['POWERCOLOR Red Devil Radeon RX 7900 XTX 24GB GDDR6 (Limited)', 104999, 122990, 15, 0],
      ['XFX Speedster SWFT 210 Radeon RX 7600 8GB GDDR6', 24999, 30990, 19, 1],
      ['XFX Speedster MERC 310 Radeon RX 7900 XT 20GB GDDR6', 79999, 92990, 14, 2],
      ['XFX Speedster MERC 310 Radeon RX 7900 XTX Black Edition 24GB', 99999, 117990, 15, 3],
      ['ASROCK Taichi Radeon RX 7900 XTX 24GB GDDR6 OC (3-Slot)', 104999, 122990, 15, 0],
      ['ASROCK Steel Legend Radeon RX 7700 XT 12GB GDDR6 OC', 45999, 53990, 15, 1],
      ['MSI Radeon RX 7700 XT Gaming X Trio 12GB GDDR6', 46999, 54990, 15, 2],
      ['MSI Radeon RX 7800 XT Gaming Trio Classic 16GB GDDR6', 57999, 68990, 16, 3],
      ['MSI Radeon RX 7900 XTX Gaming Trio Classic 24GB GDDR6', 99999, 117990, 15, 0],
      ['ASUS DUAL Radeon RX 7600 V2 OC 8GB GDDR6', 25999, 31990, 19, 1],
      ['ASUS TUF GAMING Radeon RX 7900 XT 20GB GDDR6 OC', 84999, 99990, 15, 2],
      ['GIGABYTE Radeon RX 7600 Gaming OC 8GB GDDR6', 25999, 31990, 19, 3],
      ['GIGABYTE AORUS Radeon RX 7900 XTX Elite 24GB GDDR6', 104999, 122990, 15, 0],
      ['SAPPHIRE PULSE Radeon RX 9070 XT 16GB GDDR6 (RDNA 4)', 74999, 89990, 17, 1],
      ['POWERCOLOR Red Devil Radeon RX 9070 16GB GDDR6 (RDNA 4)', 64999, 78990, 18, 2],
      ['XFX Speedster Radeon RX 9070 XT 16GB GDDR6 (RDNA 4)', 74999, 89990, 17, 3],
      ['ASUS DUAL Radeon RX 6750 XT OC 12GB GDDR6 (Last Stock)', 32999, 41990, 21, 0, 1]
    ]},

    'ram': { pool:'ram', items:[
      ['CORSAIR Vengeance LPX 16GB (2x8GB) DDR4 3200MHz CL16 (Black)', 3499, 4990, 30, 0],
      ['CORSAIR Vengeance LPX 32GB (2x16GB) DDR4 3600MHz CL18 (Black)', 6999, 9490, 26, 1],
      ['CORSAIR Vengeance RGB Pro 32GB (2x16GB) DDR4 3600MHz CL18', 8999, 11990, 25, 2],
      ['CORSAIR Vengeance 32GB (2x16GB) DDR5 6000MHz CL36 (Black)', 11999, 14990, 20, 0],
      ['CORSAIR Vengeance RGB 32GB (2x16GB) DDR5 6400MHz CL32 (White)', 13999, 17990, 22, 1],
      ['CORSAIR Dominator Platinum RGB 64GB (2x32GB) DDR5 6000MHz CL30', 28999, 36990, 22, 2],
      ['G.SKILL TridentZ RGB 32GB (2x16GB) DDR4 3600MHz CL18 (Black)', 7999, 10490, 24, 0],
      ['G.SKILL TridentZ5 RGB 32GB (2x16GB) DDR5 6400MHz CL32 (Black/Silver)', 13999, 17990, 22, 1],
      ['G.SKILL TridentZ5 Neo RGB 32GB (2x16GB) DDR5 6000MHz CL30 (EXPO)', 12999, 16990, 24, 2],
      ['G.SKILL Ripjaws S5 32GB (2x16GB) DDR5 5600MHz CL36 (Black)', 9999, 12990, 23, 0],
      ['G.SKILL TridentZ5 RGB 64GB (2x32GB) DDR5 6400MHz CL32', 27999, 35990, 22, 1],
      ['KINGSTON FURY Beast 16GB (2x8GB) DDR4 3200MHz CL16 (Black)', 3299, 4690, 30, 2],
      ['KINGSTON FURY Beast 32GB (2x16GB) DDR4 3600MHz CL18 (Black)', 6699, 9190, 27, 0],
      ['KINGSTON FURY Beast RGB 32GB (2x16GB) DDR5 6000MHz CL36 (Black)', 11499, 14490, 21, 1],
      ['KINGSTON FURY Renegade RGB 32GB (2x16GB) DDR5 6400MHz CL32 (Silver)', 13499, 16990, 21, 2],
      ['CRUCIAL Ballistix 16GB (2x8GB) DDR4 3200MHz CL16 (Black)', 3199, 4490, 29, 0],
      ['CRUCIAL Pro 32GB (2x16GB) DDR5 5600MHz CL46 (Black)', 8999, 11490, 22, 1],
      ['ADATA XPG Lancer RGB 32GB (2x16GB) DDR5 6000MHz CL30 (Black)', 11499, 14490, 21, 2],
      ['ADATA XPG Hunter 16GB DDR4 3200MHz CL16 (Single Module / Grey)', 1999, 2990, 33, 0],
      ['TEAMGROUP T-Force Delta RGB 32GB (2x16GB) DDR5 6000MHz CL30 (White)', 12499, 15990, 22, 1],
      ['TEAMGROUP T-Force Vulcan Z 16GB (2x8GB) DDR4 3200MHz CL16 (Grey)', 3299, 4690, 30, 2],
      ['LEXAR ARES RGB 32GB (2x16GB) DDR5 6400MHz CL32 (White)', 11999, 14990, 20, 0],
      ['CORSAIR Vengeance 64GB (2x32GB) DDR5 6000MHz CL40 (Black)', 22999, 28990, 21, 1],
      ['G.SKILL TridentZ5 Royal Neo RGB 32GB (2x16GB) DDR5 8000MHz CL36 (Gold)', 24999, 31990, 22, 2, 1],
      ['CORSAIR Dominator Titanium RGB 64GB (2x32GB) DDR5 6600MHz CL32 (White)', 31999, 39990, 20, 0]
    ]},

    'storage': { pool:'storage', items:[
      ['SAMSUNG 990 Pro 1TB M.2 NVMe Gen 4 SSD (7450 MB/s Read)', 9499, 12990, 27, 0],
      ['SAMSUNG 990 Pro 2TB M.2 NVMe Gen 4 SSD (with Heatsink)', 18499, 24990, 26, 1],
      ['SAMSUNG 980 Pro 1TB M.2 NVMe Gen 4 SSD (7000 MB/s Read)', 8499, 11990, 29, 2],
      ['SAMSUNG 870 EVO 1TB 2.5" SATA SSD (560 MB/s)', 6999, 9990, 30, 0],
      ['SAMSUNG 870 EVO 2TB 2.5" SATA SSD', 13999, 18990, 26, 1],
      ['WD BLACK SN850X 1TB M.2 NVMe Gen 4 SSD (7300 MB/s)', 8999, 11990, 25, 2],
      ['WD BLACK SN850X 2TB M.2 NVMe Gen 4 SSD (with Heatsink)', 17499, 22990, 24, 0],
      ['WD BLACK SN770 1TB M.2 NVMe Gen 4 SSD (5150 MB/s)', 6499, 8990, 28, 1],
      ['WD BLUE SN580 1TB M.2 NVMe Gen 4 SSD (4150 MB/s)', 5499, 7490, 27, 2],
      ['CRUCIAL T705 1TB M.2 NVMe Gen 5 SSD (14500 MB/s) (Heatsink)', 13999, 17990, 22, 0],
      ['CRUCIAL T700 2TB M.2 NVMe Gen 5 SSD (12400 MB/s)', 21999, 27990, 21, 1],
      ['CRUCIAL P3 Plus 1TB M.2 NVMe Gen 4 SSD (5000 MB/s)', 5999, 7990, 25, 2],
      ['KINGSTON KC3000 1TB M.2 NVMe Gen 4 SSD (7000 MB/s)', 7999, 10990, 27, 0],
      ['KINGSTON NV2 1TB M.2 NVMe Gen 4 SSD (3500 MB/s)', 5499, 6990, 21, 1],
      ['KINGSTON A400 480GB 2.5" SATA SSD', 2899, 3990, 27, 2],
      ['ADATA XPG GAMMIX S70 Blade 1TB M.2 NVMe Gen 4 SSD (7400 MB/s)', 7499, 9990, 25, 0],
      ['SEAGATE Barracuda 2TB 3.5" SATA HDD (7200 RPM)', 4799, 6499, 26, 1],
      ['SEAGATE Barracuda 4TB 3.5" SATA HDD (5400 RPM)', 8499, 11990, 29, 2],
      ['SEAGATE IronWolf Pro 8TB NAS HDD (7200 RPM / CMR)', 21999, 28990, 24, 0],
      ['WESTERN DIGITAL Blue 1TB 3.5" SATA HDD (7200 RPM)', 3299, 4490, 27, 1],
      ['WESTERN DIGITAL Black 4TB 3.5" Gaming HDD (7200 RPM / 256MB)', 12999, 16990, 24, 2],
      ['SEAGATE FireCuda 530 1TB M.2 NVMe Gen 4 SSD (7300 MB/s)', 9999, 13990, 29, 0],
      ['SAMSUNG T7 Shield 1TB USB 3.2 Portable SSD (Black) (Rugged)', 8499, 10990, 23, 1],
      ['CRUCIAL X9 Pro 2TB USB 3.2 Gen 2 Portable SSD (1050 MB/s)', 11999, 14990, 20, 2],
      ['WD BLUE SA510 1TB 2.5" SATA SSD (560 MB/s)', 5499, 7490, 27, 0]
    ]},

    'cabinet': { pool:'cabinet', items:[
      ['NZXT H5 Flow Compact Mid-Tower ATX Cabinet (Black) (Mesh Front)', 8999, 11990, 25, 0],
      ['NZXT H7 Flow Mid-Tower ATX Cabinet (White) (Tempered Glass)', 13999, 17990, 22, 1],
      ['NZXT H9 Flow Dual-Chamber Mid-Tower ATX (Black) (Mesh)', 16999, 21990, 23, 2],
      ['CORSAIR 4000D Airflow Mid-Tower ATX Cabinet (Black) (Mesh)', 9999, 12990, 23, 3],
      ['CORSAIR 5000D Airflow Mid-Tower ATX Cabinet (White)', 14999, 18990, 21, 0],
      ['CORSAIR iCUE 7000X RGB Full-Tower E-ATX (Black) (4 RGB Fans)', 32999, 39990, 18, 1],
      ['LIAN LI O11 Dynamic EVO Mid-Tower ATX Cabinet (White)', 16999, 21990, 23, 2],
      ['LIAN LI O11 Dynamic Mini Mid-Tower mATX/ATX (Snow White)', 13999, 17990, 22, 3],
      ['LIAN LI LANCOOL 216 RGB Mid-Tower ATX Cabinet (Black) (Mesh)', 11999, 15490, 23, 0],
      ['PHANTEKS Eclipse G500A Performance Mid-Tower ATX (Black) (3 Fans)', 12999, 15990, 19, 1],
      ['PHANTEKS NV5 Premium Showcase Mid-Tower ATX (White)', 17999, 22990, 22, 2],
      ['COOLER MASTER MasterBox NR200P Mini-ITX Cabinet (Black)', 9499, 11990, 21, 3],
      ['COOLER MASTER HAF 700 EVO Full-Tower E-ATX (Black) (RGB Fans)', 39999, 49990, 20, 0],
      ['COOLER MASTER MasterBox TD500 Mesh V2 ATX (Black) (3 ARGB Fans)', 8999, 11490, 22, 1],
      ['ANTEC P10 Flux Silent Mid-Tower ATX Cabinet (Black) (5 Fans)', 8999, 11490, 22, 2],
      ['ANTEC NX410 Mid-Tower ATX Cabinet (Black) (Mesh / Tempered Glass)', 5999, 7990, 25, 3],
      ['ANT ESPORTS Crystal X1 ARGB Mid-Tower ATX (White) (4 ARGB Fans)', 5499, 7490, 27, 0],
      ['ANT ESPORTS ICE-280TG ARGB Mid-Tower ATX (Black) (4 Fans)', 4999, 6990, 29, 1],
      ['COSMIC BYTE CB-T2 RGB Mid-Tower ATX Cabinet (Black) (3 ARGB Fans)', 3999, 5990, 33, 2],
      ['COSMIC BYTE Stryker Mid-Tower ATX (White) (Mesh / 4 ARGB Fans)', 4499, 6490, 31, 3],
      ['MSI MAG Forge 320R AIRFLOW Mid-Tower ATX (Black) (4 ARGB)', 5999, 7990, 25, 0],
      ['MSI MPG GUNGNIR 110R Mid-Tower ATX (Black) (4 ARGB Fans)', 7999, 10490, 24, 1],
      ['DEEPCOOL CH560 Digital Mid-Tower ATX (Black) (CPU Temp Display)', 8499, 10990, 23, 2],
      ['DEEPCOOL CC560 V2 Mid-Tower ATX (White) (4 Fans / Tempered Glass)', 5999, 7990, 25, 3],
      ['FRACTAL DESIGN North Mid-Tower ATX (Charcoal Black) (Wood Front)', 14999, 18990, 21, 0]
    ]},

    'cpu-cooler': { pool:'cooler', items:[
      ['COOLER MASTER Hyper 212 Black Edition CPU Air Cooler (Single Tower)', 2999, 4290, 30, 0],
      ['COOLER MASTER Hyper 212 RGB Black Edition CPU Air Cooler', 3499, 4990, 30, 1],
      ['COOLER MASTER MasterLiquid 240L Core ARGB AIO Liquid Cooler', 7999, 10490, 24, 2],
      ['COOLER MASTER MasterLiquid 360L Core ARGB AIO Liquid Cooler', 9999, 12990, 23, 0],
      ['NZXT KRAKEN 240 RGB AIO Liquid CPU Cooler (Black) (LCD)', 17999, 22990, 22, 1],
      ['NZXT KRAKEN 360 RGB AIO Liquid CPU Cooler (Black) (LCD)', 22999, 28990, 21, 2],
      ['NZXT KRAKEN Elite 360 RGB AIO Liquid CPU Cooler (LCD HD)', 31999, 39990, 20, 0],
      ['ARCTIC Liquid Freezer III 240 ARGB AIO Liquid Cooler (Black)', 8999, 11490, 22, 1],
      ['ARCTIC Liquid Freezer III 360 ARGB AIO Liquid Cooler (Black)', 11999, 15490, 23, 2],
      ['ARCTIC Freezer 36 A-RGB Dual Tower Air Cooler', 4499, 5990, 25, 0],
      ['NOCTUA NH-D15 chromax.black Dual Tower CPU Air Cooler', 11999, 14490, 17, 1],
      ['NOCTUA NH-U12A Premium Single Tower CPU Air Cooler', 9999, 11990, 17, 2],
      ['NOCTUA NH-L9i-17xx Low-Profile Air Cooler (LGA 1700)', 5499, 6990, 21, 0],
      ['DEEPCOOL LT720 360mm ARGB AIO Liquid Cooler (Black)', 10999, 13990, 21, 1],
      ['DEEPCOOL AK620 Digital Dual Tower Air Cooler (Black) (CPU Temp)', 6999, 8990, 22, 2],
      ['DEEPCOOL AK400 Single Tower Air Cooler (Black)', 2999, 3990, 25, 0],
      ['THERMALRIGHT Peerless Assassin 120 SE Dual Tower CPU Cooler', 3499, 4490, 22, 1],
      ['THERMALRIGHT Phantom Spirit 120 EVO Dual Tower CPU Air Cooler', 3999, 4990, 20, 2],
      ['CORSAIR iCUE H150i ELITE LCD XT 360mm AIO Liquid Cooler', 24999, 31990, 22, 0],
      ['CORSAIR iCUE H100x RGB ELITE 240mm AIO Liquid Cooler', 11999, 14990, 20, 1],
      ['MSI MAG CoreLiquid M360 ARGB AIO Liquid Cooler (LCD Block)', 14999, 18990, 21, 2],
      ['MSI MAG CoreLiquid 240R V2 ARGB AIO Liquid Cooler', 7999, 10490, 24, 0],
      ['LIAN LI Galahad II Trinity Performance 360mm ARGB AIO Cooler', 13999, 17490, 20, 1],
      ['COSMIC BYTE Coldforge 240 ARGB AIO Liquid Cooler (Black)', 4499, 5990, 25, 2],
      ['ANT ESPORTS ICE-580TX 240mm ARGB AIO Liquid Cooler (White)', 4999, 6490, 23, 0]
    ]},

    'power-supply': { pool:'psu', items:[
      ['CORSAIR RM650e 650W 80+ Gold Fully Modular Power Supply (Black)', 7999, 10490, 24, 0],
      ['CORSAIR RM750e 750W 80+ Gold Fully Modular Power Supply (Black)', 9499, 11990, 21, 1],
      ['CORSAIR RM850x 850W 80+ Gold Fully Modular Power Supply (Black) (ATX 3.0)', 13999, 17490, 20, 2],
      ['CORSAIR HX1000i 1000W 80+ Platinum Fully Modular PSU (iCUE)', 21999, 26990, 19, 0],
      ['CORSAIR AX1600i 1600W 80+ Titanium Fully Modular PSU (Digital)', 49999, 58990, 15, 1],
      ['MSI MPG A850G PCIE5 850W 80+ Gold Fully Modular PSU (ATX 3.0)', 12999, 15990, 19, 2],
      ['MSI MPG A1000G PCIE5 1000W 80+ Gold Fully Modular PSU', 15999, 19490, 18, 0],
      ['MSI MAG A650BN 650W 80+ Bronze Non-Modular PSU', 4499, 5990, 25, 1],
      ['ASUS ROG STRIX 850W Gold Aura Edition Fully Modular PSU', 14999, 18490, 19, 2],
      ['ASUS ROG LOKI SFX-L 1000W 80+ Platinum Fully Modular PSU', 24999, 29990, 17, 0],
      ['ASUS TUF GAMING 750W 80+ Gold Fully Modular PSU (ATX 3.0)', 9499, 11990, 21, 1],
      ['COOLER MASTER MWE Gold 750 V2 Fully Modular 80+ Gold PSU', 7999, 9990, 20, 2],
      ['COOLER MASTER V850 Platinum SFX 850W Modular PSU (Black)', 17999, 21990, 18, 0],
      ['COOLER MASTER GX III Gold 850W ATX 3.0 Fully Modular PSU', 9999, 12490, 20, 1],
      ['SEASONIC FOCUS GX-850 ATX 3.0 850W 80+ Gold Modular PSU', 12999, 15990, 19, 2],
      ['SEASONIC PRIME TX-1000 1000W 80+ Titanium Fully Modular PSU', 32999, 39990, 18, 0],
      ['SEASONIC FOCUS GX-650 ATX 3.0 650W 80+ Gold Modular PSU', 9999, 12490, 20, 1],
      ['THERMALTAKE Toughpower GF3 850W 80+ Gold ATX 3.0 PSU', 11999, 14490, 17, 2],
      ['THERMALTAKE Smart BX1 RGB 650W 80+ Bronze Non-Modular PSU', 4299, 5490, 22, 0],
      ['ANTEC HCG850 EC 850W 80+ Gold Modular PSU', 9499, 11990, 21, 1],
      ['BE QUIET! Pure Power 12 M 850W 80+ Gold Modular PSU', 11999, 14490, 17, 2],
      ['ANT ESPORTS FP650B 650W 80+ Bronze Non-Modular PSU', 3499, 4490, 22, 0],
      ['COSMIC BYTE Polaris 750W 80+ Bronze Semi-Modular PSU', 4499, 5990, 25, 1],
      ['DEEPCOOL PX1000G ATX 3.0 1000W 80+ Gold Fully Modular PSU', 14999, 18490, 19, 2, 1],
      ['EVGA SuperNOVA 850 G7 80+ Gold Fully Modular PSU', 13999, 17490, 20, 0]
    ]},

    'monitor': { pool:'monitor', items:[
      ['LG UltraGear 27GP850-B 27" 1440p IPS 180Hz 1ms Gaming Monitor', 27999, 34990, 20, 0],
      ['LG UltraGear 32GS95UE-B 32" 4K OLED 240Hz Dual-Hz Gaming Monitor', 134999, 159990, 16, 1],
      ['LG 27UP650-W 27" 4K UHD IPS HDR400 Creator Monitor', 29999, 36990, 19, 2],
      ['LG 34WQ75C-B 34" UltraWide QHD Curved IPS HDR Monitor', 49999, 59990, 17, 3],
      ['SAMSUNG Odyssey G7 LS28BG700 28" 4K IPS 144Hz Gaming Monitor', 49999, 59990, 17, 4],
      ['SAMSUNG Odyssey G9 LS49AG950 49" DQHD 240Hz QLED Curved Monitor', 109999, 134990, 19, 0],
      ['SAMSUNG Odyssey OLED G8 G80SD 32" 4K QD-OLED 240Hz Gaming Monitor', 124999, 149990, 17, 1],
      ['SAMSUNG ViewFinity S8 S80UA 32" 4K IPS Professional Monitor', 49999, 62990, 21, 2],
      ['BENQ MOBIUZ EX2710S 27" FHD IPS 165Hz 1ms HDR Gaming Monitor', 19999, 24990, 20, 3],
      ['BENQ MOBIUZ EX3210U 32" 4K IPS 144Hz HDR600 Gaming Monitor', 84999, 99990, 15, 4],
      ['BENQ PD2725U 27" 4K IPS Designer Monitor (Thunderbolt 3)', 79999, 94990, 16, 0],
      ['ASUS ROG Swift OLED PG27AQDM 27" QHD OLED 240Hz Gaming Monitor', 99999, 119990, 17, 1],
      ['ASUS ROG Swift PG32UQX 32" 4K Mini-LED 144Hz HDR1400 G-SYNC Ultimate', 274999, 329990, 17, 2],
      ['ASUS TUF Gaming VG27AQ 27" QHD IPS 165Hz 1ms G-SYNC Compatible', 26999, 33990, 21, 3],
      ['ACER Predator X27U 27" QHD OLED 240Hz Gaming Monitor', 84999, 99990, 15, 4],
      ['ACER Nitro XV272U 27" QHD IPS 170Hz HDR400 Gaming Monitor', 24999, 31490, 21, 0],
      ['MSI MAG 274QRF QD E2 27" QHD Rapid IPS 180Hz Gaming Monitor', 27999, 34990, 20, 1],
      ['MSI MPG 491CQP QD-OLED 49" DQHD QD-OLED 144Hz Curved Monitor', 119999, 144990, 17, 2],
      ['AOC 24G2SP 24" FHD IPS 165Hz 1ms G-SYNC Compatible Gaming Monitor', 11999, 15990, 25, 3],
      ['AOC AG274QXM 27" QHD Mini-LED 170Hz HDR1000 Gaming Monitor', 49999, 62990, 21, 4],
      ['GIGABYTE M27Q X 27" QHD SuperSpeed IPS 240Hz Gaming Monitor', 33999, 42990, 21, 0],
      ['GIGABYTE AORUS FO48U 48" 4K OLED 120Hz HDMI 2.1 Gaming Monitor', 119999, 144990, 17, 1],
      ['VIEWSONIC ELITE XG270QG 27" QHD Nano IPS 165Hz G-SYNC Monitor', 49999, 62990, 21, 2],
      ['DELL Alienware AW3423DWF 34" QD-OLED UltraWide 165Hz Curved', 94999, 114990, 17, 3],
      ['DELL UltraSharp U2723QE 27" 4K IPS Black USB-C Hub Monitor', 59999, 74990, 20, 4]
    ]},

    'wifi-adapter': { pool:'mobo', items:[
      ['TP-LINK Archer T2U Plus AC600 High Gain Wireless Dual Band USB Adapter', 899, 1399, 36, 0],
      ['TP-LINK Archer T3U Plus AC1300 MU-MIMO Wireless USB Adapter', 1899, 2799, 32, 1],
      ['TP-LINK Archer TX20U Plus AX1800 Wi-Fi 6 USB 3.0 Adapter (Dual Band)', 3299, 4699, 30, 2],
      ['TP-LINK Archer T9UH AC1900 High Gain Wireless Dual Band USB Adapter', 3799, 5199, 27, 3],
      ['TP-LINK TL-WN725N 150 Mbps Wireless N Nano USB Adapter (Black)', 499, 799, 38, 4],
      ['TP-LINK TL-WN823N 300 Mbps Mini Wireless N USB Adapter (Black)', 699, 1099, 36, 0],
      ['TP-LINK Archer TX50E AX3000 Dual Band Wi-Fi 6 PCIe Adapter (BT 5.0)', 4499, 5999, 25, 1],
      ['TP-LINK Archer T6E AC1300 Wireless Dual Band PCIe Adapter', 2799, 3999, 30, 2],
      ['D-LINK DWA-185 AC1200 MU-MIMO Wi-Fi USB 3.0 Adapter (Dual Band)', 1699, 2499, 32, 3],
      ['D-LINK DWA-X1850 AX1800 Wi-Fi 6 USB 3.0 Adapter (Dual Band)', 3499, 4799, 27, 4],
      ['D-LINK DWA-548 Wireless N300 Desktop PCIe Adapter (2.4 GHz)', 1299, 1899, 32, 0],
      ['NETGEAR Nighthawk A7000 AC1900 Wi-Fi USB 3.0 Adapter (Dual Band)', 6499, 8499, 24, 1],
      ['NETGEAR A6150 AC1200 Wi-Fi USB 2.0 Mini Adapter (Dual Band)', 2499, 3499, 29, 2],
      ['ASUS USB-AC68 AC1900 Dual Band USB 3.0 Wi-Fi Adapter', 6999, 8999, 22, 3],
      ['ASUS USB-AX56 AX1800 Wi-Fi 6 Dual Band USB Adapter (with Cradle)', 5299, 6999, 24, 4],
      ['ASUS PCE-AX58BT AX3000 Wi-Fi 6 PCIe Card (Bluetooth 5.0)', 4799, 6499, 26, 0],
      ['ASUS PCE-AC88 AC3100 Dual Band 4x4 Wi-Fi PCIe Adapter', 12999, 15999, 18, 1, 1],
      ['MERCUSYS MU6H AC650 High Gain Wireless USB Adapter (Dual Band)', 599, 899, 33, 2],
      ['MERCUSYS MA30H AC1300 High Gain Wireless USB Adapter (Dual Band)', 1199, 1799, 33, 3],
      ['TENDA U12 AC1300 Wireless Dual Band USB 3.0 Adapter (Black)', 1499, 2199, 31, 4],
      ['TENDA U10 AC650 Mini Wireless Dual Band USB Adapter', 799, 1199, 33, 0],
      ['iBALL Baton iB-WUA300NM 300 Mbps Wireless N USB Adapter', 449, 699, 35, 1],
      ['ZEBRONICS ZEB-USB300WF1 300 Mbps Wireless N USB Adapter (Black)', 499, 799, 37, 2],
      ['EDIMAX EW-7822UAC AC1200 Dual Band Wi-Fi USB Adapter (Black)', 2499, 3499, 28, 3],
      ['EDIMAX EW-7833UAC AC1750 Dual Band Wi-Fi USB 3.0 Adapter', 3499, 4799, 27, 4]
    ]},

    'network-switch': { pool:'cabinet', items:[
      ['TP-LINK TL-SG105 5-Port Gigabit Desktop Switch (Metal, Unmanaged)', 999, 1399, 28, 0],
      ['TP-LINK TL-SG108 8-Port Gigabit Desktop Switch (Metal, Unmanaged)', 1599, 2199, 27, 1],
      ['TP-LINK TL-SG116 16-Port Gigabit Desktop Switch (Metal, Unmanaged)', 4499, 5999, 25, 2],
      ['TP-LINK TL-SG108E 8-Port Gigabit Easy Smart Managed Switch', 2599, 3499, 25, 3],
      ['TP-LINK TL-SG116E 16-Port Gigabit Easy Smart Managed Switch', 6499, 8499, 23, 0],
      ['TP-LINK TL-SG108PE 8-Port Gigabit Easy Smart PoE+ Switch (4x PoE)', 5499, 6999, 21, 1],
      ['TP-LINK TL-SG1024 24-Port Gigabit Rackmount Unmanaged Switch', 8999, 11999, 25, 2],
      ['TP-LINK TL-SG1218MP 16-Port Gigabit PoE+ Rackmount Switch (250W)', 17999, 22999, 21, 3],
      ['TP-LINK TL-SF1005D 5-Port 10/100 Fast Ethernet Desktop Switch', 499, 749, 33, 0],
      ['TP-LINK TL-SF1008D 8-Port 10/100 Fast Ethernet Desktop Switch', 699, 999, 30, 1],
      ['D-LINK DGS-1005A 5-Port Gigabit Desktop Switch (Unmanaged)', 949, 1399, 32, 2],
      ['D-LINK DGS-1008A 8-Port Gigabit Desktop Switch (Unmanaged)', 1499, 2199, 31, 3],
      ['D-LINK DGS-1024A 24-Port Gigabit Rackmount Switch (Unmanaged)', 8499, 11499, 26, 0],
      ['D-LINK DES-1008A 8-Port 10/100 Fast Ethernet Switch (Plastic)', 549, 799, 31, 1],
      ['NETGEAR GS305 5-Port Gigabit Desktop Switch (Metal, Unmanaged)', 1199, 1699, 29, 2],
      ['NETGEAR GS308 8-Port Gigabit Desktop Switch (Metal, Unmanaged)', 1899, 2599, 26, 3],
      ['NETGEAR GS108Ev3 8-Port Gigabit Smart Managed Plus Switch', 3499, 4499, 22, 0],
      ['NETGEAR GS108PE 8-Port Gigabit PoE+ Smart Managed Plus Switch', 6999, 8999, 22, 1],
      ['CISCO SG110-24 24-Port Gigabit Unmanaged Rackmount Switch', 14999, 18999, 21, 2, 1],
      ['CISCO CBS250-8T-D 8-Port Gigabit Smart Managed Switch', 11999, 14999, 20, 3],
      ['MIKROTIK CRS112-8P-4S-IN 8-Port Gigabit PoE Cloud Router Switch', 18999, 23999, 20, 0],
      ['UBIQUITI UniFi USW-Lite-8-PoE 8-Port Managed Gigabit PoE+ Switch', 14999, 17999, 16, 1],
      ['UBIQUITI UniFi Switch Flex Mini 5-Port Gigabit Managed', 4499, 5499, 18, 2],
      ['MERCUSYS MS108G 8-Port Gigabit Desktop Switch (Plastic, Unmanaged)', 1299, 1899, 31, 3],
      ['TENDA TEG1008P-EI 8-Port Gigabit PoE+ Desktop Switch (96W)', 6999, 8999, 22, 0]
    ]},

    'router': { pool:'cabinet', items:[
      ['TP-LINK Archer C20 AC750 Wireless Dual Band Router (4 Antenna)', 1499, 1999, 25, 0],
      ['TP-LINK Archer C6 AC1200 Wireless MU-MIMO Gigabit Router (4 Antenna)', 2299, 2999, 23, 1],
      ['TP-LINK Archer A9 AC1900 MU-MIMO Wireless Gigabit Router (3 Antenna)', 4499, 5999, 25, 2],
      ['TP-LINK Archer AX10 AX1500 Wi-Fi 6 Gigabit Router (4 Antenna)', 4999, 6499, 23, 3],
      ['TP-LINK Archer AX23 AX1800 Dual Band Wi-Fi 6 Router (OFDMA, MU-MIMO)', 5999, 7999, 25, 0],
      ['TP-LINK Archer AX73 AX5400 Dual Band Wi-Fi 6 Gigabit Router (6 Antenna)', 13999, 17999, 22, 1],
      ['TP-LINK Archer AX90 AX6600 Tri-Band Wi-Fi 6 Gigabit Router', 21999, 27999, 21, 2],
      ['TP-LINK Deco X20 AX1800 Whole Home Mesh Wi-Fi 6 System (2-Pack)', 14999, 19999, 25, 3],
      ['TP-LINK Deco X60 AX3000 Mesh Wi-Fi 6 System (3-Pack, 540 sq.m)', 27999, 34999, 20, 0],
      ['D-LINK DIR-825 AC1200 Dual Band Wireless Gigabit Router (4 Antenna)', 3299, 4499, 26, 1],
      ['D-LINK DIR-X1860 AX1800 Wi-Fi 6 Dual Band Gigabit Router', 6999, 8999, 22, 2],
      ['D-LINK DIR-X5460 AX5400 Wi-Fi 6 Dual Band Gigabit Gaming Router', 16999, 21999, 22, 3],
      ['NETGEAR Nighthawk R7000 AC1900 Smart Wi-Fi Gigabit Router', 12999, 16999, 23, 0, 1],
      ['NETGEAR Nighthawk RAX50 AX5400 Wi-Fi 6 Dual Band Gigabit Router', 17999, 22999, 21, 1],
      ['NETGEAR Orbi RBK752 AX4200 Tri-Band Mesh Wi-Fi 6 System (2-Pack)', 38999, 47999, 18, 2],
      ['ASUS RT-AX55 AX1800 Wi-Fi 6 Dual Band Gigabit Router (AiMesh Ready)', 7999, 9999, 20, 3],
      ['ASUS RT-AX86U AX5700 Wi-Fi 6 Dual Band Gaming Router (2.5G WAN)', 22999, 27999, 17, 0],
      ['ASUS ZenWiFi AX XT8 AX6600 Tri-Band Wi-Fi 6 Mesh System (2-Pack)', 38999, 46999, 17, 1],
      ['ASUS ROG Rapture GT-AX11000 Tri-Band Wi-Fi 6 Gaming Router', 44999, 54999, 18, 2],
      ['MIKROTIK hAP ac2 Dual-Band Wireless Gigabit Router (5x Gigabit)', 6499, 7999, 18, 3],
      ['MIKROTIK hEX RB750Gr3 5-Port Gigabit Router (RouterOS L4)', 5499, 6999, 21, 0],
      ['UBIQUITI UniFi Dream Router (Wi-Fi 6, IDS/IPS, 4x Gigabit)', 24999, 29999, 16, 1],
      ['MERCUSYS MR70X AX1800 Wi-Fi 6 Dual Band Gigabit Router (4 Antenna)', 4499, 5999, 25, 2],
      ['TENDA AC10 AC1200 Dual Band Wireless Gigabit Router (4 Antenna)', 1899, 2599, 26, 3],
      ['iBALL Baton iB-WRA300N3GT 300M MIMO Wireless N Router (3 Antenna)', 999, 1599, 37, 0]
    ]},

    'lan-card': { pool:'mobo', items:[
      ['TP-LINK TG-3468 Gigabit PCI Express Network Adapter (Low Profile)', 599, 899, 33, 0],
      ['TP-LINK TG-3269 32-bit Gigabit PCI Network Adapter', 549, 799, 31, 1],
      ['TP-LINK TX201 2.5 Gigabit PCI Express Network Adapter (Realtek)', 1999, 2799, 28, 2],
      ['TP-LINK TX401 10 Gigabit PCIe Network Adapter (Heatsink, AQC107)', 6499, 8499, 23, 3],
      ['TP-LINK UE300 USB 3.0 to Gigabit Ethernet Network Adapter', 1299, 1799, 27, 4],
      ['TP-LINK UE306 USB 3.0 to Gigabit Ethernet + 3-Port USB 3.0 Hub', 2199, 2999, 26, 0],
      ['TP-LINK UE330 USB 3.0 to Gigabit Ethernet + 3-Port USB Hub (Aluminium)', 2499, 3299, 24, 1],
      ['D-LINK DGE-528T 10/100/1000 Gigabit PCI Network Adapter', 549, 799, 31, 2],
      ['D-LINK DGE-560T Gigabit PCI Express Network Adapter (Low Profile)', 999, 1499, 33, 3],
      ['INTEL I225-T1 2.5 GbE Single-Port PCIe Network Adapter (OEM)', 3499, 4499, 22, 4],
      ['INTEL I350-T2V2 Dual-Port Gigabit Server PCIe Adapter', 8999, 11499, 21, 0],
      ['INTEL X550-T2 10GbE Dual-Port RJ45 Server PCIe Adapter', 27999, 33999, 17, 1, 1],
      ['INTEL X710-DA2 10G SFP+ Dual-Port Server PCIe Adapter', 32999, 39999, 17, 2],
      ['INTEL I210-T1 Single-Port Gigabit Server PCIe Adapter (OEM)', 4499, 5999, 25, 3],
      ['ASUS XG-C100C 10G Base-T Single-Port PCIe Network Card (AQC107)', 9499, 11999, 20, 4],
      ['ASUS XG-C100F 10G SFP+ Single-Port PCIe Network Card', 12999, 15999, 18, 0],
      ['STARTECH ST1000SPEXI Gigabit PCIe Network Card (Intel I210)', 4999, 6499, 23, 1],
      ['STARTECH ST2000SPEXI Dual-Port Gigabit PCIe Network Card', 8999, 11499, 21, 2],
      ['STARTECH PEX10000SFP 10G SFP+ Open-SFP+ PCIe NIC', 11999, 14999, 20, 3],
      ['EDIMAX EN-9320TX-E V2 10GbE PCIe Network Adapter (RJ45)', 9999, 12499, 20, 4],
      ['UGREEN USB 3.0 to Gigabit Ethernet Adapter (Aluminium, Driver-Free)', 999, 1499, 33, 0],
      ['UGREEN USB-C to Gigabit Ethernet Adapter (Type-C, Driver-Free)', 1199, 1699, 29, 1],
      ['ANKER USB-C to Gigabit Ethernet Adapter (PowerExpand+, Black)', 1499, 1999, 25, 2],
      ['CABLE MATTERS USB 3.0 to 2.5G Ethernet Adapter (Realtek 8156)', 2499, 3199, 22, 3],
      ['ZEBRONICS ZEB-LC1000 Gigabit Ethernet PCI LAN Card (Realtek 8169)', 449, 699, 35, 4]
    ]},

    'docking-station': { pool:'mobo', items:[
      ['DELL WD19S 130W USB-C Docking Station (Dual 4K, 90W PD)', 16999, 21999, 22, 0],
      ['DELL WD19TBS 180W Thunderbolt 3 Docking Station (Dual 4K)', 24999, 32999, 24, 1],
      ['DELL WD22TB4 Thunderbolt 4 Docking Station (Dual 4K, 130W PD)', 36999, 44999, 17, 2],
      ['DELL UD22 USB-C Universal Docking Station (Dual 4K, 96W PD)', 18999, 23999, 20, 3],
      ['HP USB-C G5 Essential Docking Station (Dual 4K, 90W)', 14999, 18999, 21, 4],
      ['HP Thunderbolt G4 Dock 280W (Dual 4K, USB4, RJ45)', 38999, 46999, 17, 0],
      ['HP USB-C/A Universal Dock G2 (Dual 4K, 100W PD)', 17999, 22999, 21, 1],
      ['LENOVO ThinkPad Universal USB-C Dock 90W (Dual 4K)', 16999, 21999, 22, 2],
      ['LENOVO ThinkPad Universal Thunderbolt 4 Dock 135W (Dual 4K)', 31999, 39999, 20, 3],
      ['LENOVO ThinkPad USB-C Smart Cable Dock 65W (Dual 4K)', 11999, 14999, 20, 4],
      ['ANKER 575 USB-C Docking Station (13-in-1, Dual 4K, 100W PD)', 12999, 16999, 23, 0],
      ['ANKER 777 Apex Thunderbolt 4 Docking Station (12-in-1, 90W PD)', 24999, 29999, 16, 1],
      ['ANKER PowerExpand 12-in-1 Thunderbolt 3 Docking Station (85W)', 21999, 26999, 18, 2],
      ['CALDIGIT TS4 Thunderbolt 4 Dock (18-in-1, 98W PD, 2.5G LAN)', 39999, 47999, 16, 3, 1],
      ['CALDIGIT TS3 Plus Thunderbolt 3 Dock (15-in-1, 87W PD)', 32999, 39999, 17, 4],
      ['UGREEN Revodok Pro 209 USB-C Docking Station (9-in-1, Triple Display)', 8999, 11999, 25, 0],
      ['UGREEN Revodok 12-in-1 USB-C Docking Station (Triple 4K, 100W PD)', 10999, 14999, 26, 1],
      ['BELKIN Connect Pro Thunderbolt 4 Dock Core (90W PD, Dual 4K)', 27999, 34999, 20, 2],
      ['BELKIN Connect Pro Thunderbolt 4 Dock (12-in-1, 96W PD)', 32999, 39999, 17, 3],
      ['PLUGABLE TBT4-UDZ Thunderbolt 4 Docking Station (96W, Quad 4K)', 36999, 44999, 17, 4],
      ['PLUGABLE UD-6950Z USB-C Triple-Display Docking Station (60W PD)', 12999, 16499, 21, 0],
      ['KENSINGTON SD5700T Thunderbolt 4 Dual 4K Docking Station (90W)', 33999, 41999, 19, 1],
      ['SATECHI USB-C Multimedia Adapter M1 (8-in-1, 100W PD, Dual 4K)', 9999, 12999, 23, 2],
      ['HYPERDRIVE GEN2 12-in-1 USB-C Hub Docking Station (4K HDMI)', 8999, 11999, 25, 3],
      ['TARGUS DOCK190 USB-C Universal Quad 4K Docking Station (100W PD)', 21999, 26999, 18, 4]
    ]}

  };

  /* ---------- Build-PC catalogs ----------
     Each build page is a list of 25 pre-configured PC variants
     for a specific creative discipline.
  ------------------------------------------- */
  const BUILD_DEFS = {
    'build-game-dev':           {prefix:'Game Dev PC',           focus:'Unity / Unreal / Blender'},
    'build-streaming-simulator':{prefix:'Stream + Sim PC',       focus:'OBS / iRacing / MSFS'},
    'build-music-production':   {prefix:'Music Production PC',   focus:'FL Studio / Ableton / Pro Tools'},
    'build-video-editing':      {prefix:'Video Editing PC',      focus:'Premiere / DaVinci / Final Cut'},
    'build-layout-3d':          {prefix:'Layout & 3D PC',        focus:'Maya / 3ds Max / Blender'},
    'build-architectural':      {prefix:'Architectural PC',      focus:'Revit / AutoCAD / Lumion'},
    'build-3d-modelling':       {prefix:'3D Modelling PC',       focus:'ZBrush / Blender / Substance'},
    'build-vfx':                {prefix:'VFX Animation PC',      focus:'Houdini / Nuke / Maya'},
    'build-compositing':        {prefix:'Compositing PC',        focus:'Nuke / Fusion / After Effects'},
    'build-graphic-design':     {prefix:'Graphic Design PC',     focus:'Photoshop / Illustrator / InDesign'},
    'build-corporate':          {prefix:'Corporate PC',          focus:'Office / Teams / SAP / Excel'}
  };

  const BUILD_TIERS = [
    // [tier, cpu, gpu, ram, storage, price, mrp, disc, imgIdx]
    ['Entry',       'Ryzen 5 5600',     'RTX 4060 8GB',         '16GB DDR4', '512GB NVMe', 59999, 72990, 18, 0],
    ['Entry',       'Intel i5-12400F',  'RTX 4060 8GB',         '16GB DDR4', '1TB NVMe',   62999, 75990, 17, 1],
    ['Entry+',      'Ryzen 5 7600',     'RTX 4060 Ti 8GB',      '16GB DDR5', '1TB NVMe',   74999, 89990, 17, 2],
    ['Standard',    'Intel i5-13400F',  'RTX 4060 Ti 16GB',     '32GB DDR4', '1TB NVMe',   89999, 104990, 14, 3],
    ['Standard',    'Ryzen 7 5800X',    'RTX 4070 12GB',        '32GB DDR4', '1TB NVMe',   99999, 119990, 17, 4],
    ['Standard+',   'Ryzen 7 7700X',    'RTX 4070 12GB',        '32GB DDR5', '1TB NVMe',  109999, 129990, 15, 0],
    ['Pro',         'Intel i5-14400F',  'RTX 4070 Super 12GB',  '32GB DDR5', '1TB NVMe',  119999, 139990, 14, 1],
    ['Pro',         'Ryzen 7 7800X3D',  'RTX 4070 Super 12GB',  '32GB DDR5', '2TB NVMe',  139999, 164990, 15, 2],
    ['Pro+',        'Intel i7-13700K',  'RTX 4070 Ti Super 16GB','32GB DDR5','2TB NVMe',  159999, 184990, 14, 3],
    ['Pro+',        'Ryzen 9 7900X',    'RTX 4070 Ti Super 16GB','64GB DDR5','2TB NVMe',  174999, 199990, 13, 4],
    ['Elite',       'Intel i7-14700K',  'RTX 4080 Super 16GB',  '64GB DDR5', '2TB NVMe',  214999, 249990, 14, 0],
    ['Elite',       'Ryzen 9 7950X',    'RTX 4080 Super 16GB',  '64GB DDR5', '2TB NVMe',  229999, 264990, 13, 1],
    ['Elite+',      'Intel i9-13900K',  'RTX 4080 16GB',        '64GB DDR5', '4TB NVMe',  239999, 274990, 13, 2],
    ['Apex',        'Ryzen 9 7950X3D',  'RTX 4090 24GB',        '64GB DDR5', '4TB NVMe',  339999, 389990, 13, 3],
    ['Apex',        'Intel i9-14900K',  'RTX 4090 24GB',        '64GB DDR5', '4TB NVMe',  349999, 399990, 12, 4],
    ['Workstation', 'Ryzen 9 7950X',    'RTX 4080 Super 16GB',  '128GB DDR5','4TB NVMe',  289999, 329990, 12, 0],
    ['Workstation', 'Threadripper 7960X','RTX 4080 Super 16GB', '128GB DDR5','4TB NVMe',  419999, 489990, 14, 1],
    ['Workstation+','Threadripper 7970X','RTX 4090 24GB',       '128GB DDR5','4TB NVMe',  549999, 629990, 13, 2],
    ['Studio',      'Ryzen 7 7800X3D',  'RTX 4070 Ti 12GB',     '32GB DDR5', '2TB NVMe',  149999, 174990, 14, 3],
    ['Studio',      'Intel i7-14700K',  'RTX 4070 Ti Super 16GB','32GB DDR5','2TB NVMe',  159999, 184990, 14, 4],
    ['Compact ITX', 'Ryzen 7 7700',     'RTX 4070 12GB',        '32GB DDR5', '2TB NVMe',  144999, 169990, 15, 0],
    ['White Build', 'Intel i5-13400F',  'RTX 4060 Ti 8GB',      '32GB DDR5', '1TB NVMe',  104999, 124990, 16, 1],
    ['RGB Build',   'Ryzen 7 7700X',    'RTX 4070 Super 12GB',  '32GB DDR5', '1TB NVMe',  124999, 144990, 14, 2],
    ['Silent Build','Ryzen 5 7600',     'RTX 4060 Ti 8GB',      '32GB DDR5', '1TB NVMe',   94999, 114990, 17, 3],
    ['AIO Liquid',  'Ryzen 9 7900X',    'RTX 4070 Ti 12GB',     '64GB DDR5', '2TB NVMe',  184999, 214990, 14, 4]
  ];

  Object.keys(BUILD_DEFS).forEach(key=>{
    const def = BUILD_DEFS[key];
    CATALOG[key] = { pool:'pc', items: BUILD_TIERS.map(t=>[
      `${def.prefix} – ${t[0]} – ${t[1]} + ${t[2]} + ${t[3]} + ${t[4]} (${def.focus})`,
      t[5], t[6], t[7], t[8]
    ])};
  });

  // Monitor sub-pages all share the master monitor catalog
  ['monitors-by-size','monitors-by-panel','monitors-by-refresh-rate','monitors-by-resolution','monitors-by-brand']
    .forEach(k=>{ CATALOG[k] = CATALOG.monitor; });

  /* ---------- Renderer ---------- */
  function inr(n){ return n.toLocaleString('en-IN'); }
  function esc(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

  function render(){
    const grids = document.querySelectorAll('.shop-grid[data-category]');
    grids.forEach(grid=>{
      // Skip if author already inlined cards (e.g. gaming-mouse, gaming-keyboard)
      if (grid.children.length) return;
      const cat  = grid.dataset.category;
      const data = CATALOG[cat];
      if (!data) return;
      const pool = POOLS[data.pool] || [];

      const html = data.items.map(item=>{
        const [name, price, mrp, disc, imgIdx, oos] = item;
        const img = pool[(imgIdx || 0) % pool.length] || '';
        const oosBadge = oos ? '<span class="oos">Out of stock</span>' : '';
        const cta = oos
          ? '<span class="cta disabled"><i class="fa-solid fa-ban"></i> Out of stock</span>'
          : `<a class="cta" href="https://wa.me/918308310019?text=${encodeURIComponent('Hi JM COMPUTERS, I want to buy the '+name+'.')}" target="_blank" rel="noopener"><i class="fa-solid fa-cart-shopping"></i> Add to cart</a>`;
        return `<article class="shop-card">
          <div class="img" style="background-image:url('${img}')">
            <span class="disc">-${disc}%</span>
            ${oosBadge}
          </div>
          <div class="body">
            <h3 class="name">${esc(name)}</h3>
            <div class="prices"><span class="price">Rs. ${inr(price)}</span><span class="mrp">Rs. ${inr(mrp)}</span></div>
            ${cta}
          </div>
        </article>`;
      }).join('');

      grid.innerHTML = html;

      // Update product count in the shop-sec toolbar
      const section = grid.closest('.shop-sec');
      const countEl = section && section.querySelector('.cat-count');
      if (countEl) countEl.textContent = data.items.length + ' products';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
