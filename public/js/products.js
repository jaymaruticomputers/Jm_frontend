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

    'build-3d-modelling': { pool:'pc', items:[
      ["( AMD Ryzen 5 7500F / Nvidia RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 76185, 95254, 20, "/eh-images/build-3d-modelling/1.png"],
      ["( Intel i7 14700KF / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Maya Rendering", 240849, 253853, 5, "/eh-images/build-3d-modelling/2.png"],
      ["( Intel Core i5 12400 / 32GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For V-Ray CPU Rendering", 38702, 46669, 17, "/eh-images/build-3d-modelling/3.png"],
      ["( Intel i5 12400 / 32GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For Corona Rendering", 76055, 88819, 14, "/eh-images/build-3d-modelling/4.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for 3Ds Max Rendering", 54908, 72499, 24, "/eh-images/build-3d-modelling/5.png"],
      ["( Intel i3 12100F / NVIDIA RTX 3050 8GB / 16GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For V-Ray GPU Rendering", 50430, 62799, 20, "/eh-images/build-3d-modelling/6.jpg"],
      ["( Intel i3 12100F / NVIDIA GTX 1650 4GB / 16GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For V-Ray GPU Rendering", 41147, 52889, 22, "/eh-images/build-3d-modelling/7.webp"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for Octane Rendering", 482218, 689635, 30, "/eh-images/build-3d-modelling/8.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 3050 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 240GB 2.5 SATA SSD ) Custom PC Build for Corona Rendering", 149733, 176399, 15, "/eh-images/build-3d-modelling/9.png"],
      ["( Intel Core Ultra 5 225 / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 93419, 109706, 15, "/eh-images/build-3d-modelling/10.png"],
      ["( Intel Core Ultra 5 245KF / NVIDIA RTX 3050 6GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 144244, 174361, 17, "/eh-images/build-3d-modelling/11.webp"],
      ["( Intel Core Ultra 7 265KF / NVIDIA RTX 3050 6GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 206848, 237196, 13, "/eh-images/build-3d-modelling/12.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 3050 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GM M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 163328, 184399, 11, "/eh-images/build-3d-modelling/13.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5050 8GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 214698, 224108, 4, "/eh-images/build-3d-modelling/14.png"],
      ["( Intel i5 14600KF / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for 3Ds Max Rendering", 136479, 169062, 19, "/eh-images/build-3d-modelling/15.png"]
    ]},

    'build-architectural': { pool:'pc', items:[
      ["(Ishaque Soge- proprietor)", 79000, 79000, 0, "/eh-images/build-architectural/1.webp"],
      ["Custom PC Product - Ramanath Baliga", 144649, 100000, 0, "/eh-images/build-architectural/2.jpg"],
      ["( Intel i5 14400 / 16GB RAM DDR4 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for Auto-CAD Rendering", 33989, 53699, 37, "/eh-images/build-architectural/3.png"],
      ["( Intel Core i5 12400 / 32GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For V-Ray CPU Rendering", 38702, 46669, 17, "/eh-images/build-architectural/4.png"],
      ["( Intel i5 12400 / 32GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For Corona Rendering", 76055, 88819, 14, "/eh-images/build-architectural/5.png"],
      ["( Intel i5 14400F / Nvidia RTX 5060 Ti 16GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Lumion", 177455, 201213, 12, "/eh-images/build-architectural/6.png"],
      ["( Intel i5 12400F / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Lumion", 178968, 108527, 0, "/eh-images/build-architectural/7.png"],
      ["( Intel i5 14600KF / NVIDIA RTX 3050 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Sketchup Rendering", 83328, 98796, 16, "/eh-images/build-architectural/8.png"],
      ["( Intel i3 12100F / NVIDIA RTX 3050 8GB / 16GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For V-Ray GPU Rendering", 50430, 62799, 20, "/eh-images/build-architectural/9.jpg"],
      ["( Intel i3 12100F / NVIDIA GTX 1650 4GB / 16GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For V-Ray GPU Rendering", 41147, 52889, 22, "/eh-images/build-architectural/10.webp"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for Octane Rendering", 482218, 689635, 30, "/eh-images/build-architectural/11.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 3050 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 240GB 2.5 SATA SSD ) Custom PC Build for Corona Rendering", 149733, 176399, 15, "/eh-images/build-architectural/12.png"],
      ["( Intel Core Ultra 5 225 / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 93419, 109706, 15, "/eh-images/build-architectural/13.png"],
      ["( Intel Core Ultra 5 245KF / NVIDIA RTX 3050 6GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 144244, 174361, 17, "/eh-images/build-architectural/14.webp"],
      ["( Intel Core Ultra 7 265KF / NVIDIA RTX 3050 6GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for Corona Rendering", 206848, 237196, 13, "/eh-images/build-architectural/15.png"]
    ]},

    'build-compositing': { pool:'pc', items:[
      ["( Intel i7 14700F / NVIDIA RTX 5060 Ti 16GB / 64GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD / 250GB 2.5 SATA SSD ) Custom PC Build for After Effects Rendering", 239800, 267424, 10, "/eh-images/build-compositing/1.png"],
      ["( AMD Ryzen 9 9900X / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For After Effects Rendering", 255319, 268158, 5, "/eh-images/build-compositing/2.png"],
      ["( Intel i5 14400 / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For After Effects Rendering", 67159, 83889, 20, "/eh-images/build-compositing/3.png"],
      ["( Intel i5 14600KF / NVIDIA RTX 5060 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For After Effects Rendering", 167079, 168023, 1, "/eh-images/build-compositing/4.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 5060 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for After Effects Rendering", 163214, 196639, 17, "/eh-images/build-compositing/5.png"],
      ["( Intel i5 14600KF / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD / 250GB 2.5 SATA SSD ) Custom PC Build For After Effects Rendering", 124375, 134753, 8, "/eh-images/build-compositing/6.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 5090 32GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for After Effects Rendering", 513997, 529799, 3, "/eh-images/build-compositing/7.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for After Effects Rendering", 266614, 286287, 7, "/eh-images/build-compositing/8.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 5090 32GB / 192GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME SSD ) Custom PC Build For After Effects Rendering", 556492, 689799, 19, "/eh-images/build-compositing/9.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for After Effects Rendering", 40256, 62369, 35, "/eh-images/build-compositing/10.png"],
      ["( Intel i5 14400 / 16GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For After Effects Rendering", 61109, 72948, 16, "/eh-images/build-compositing/11.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5070 Ti 16GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for After Effects Rendering", 296653, 330132, 10, "/eh-images/build-compositing/12.png"],
      ["( AMD Ryzen 9 9900X / NVIDIA RTX 5070 Ti 16GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build for After Effects Rendering", 276258, 309737, 11, "/eh-images/build-compositing/13.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For After Effects Rendering", 40458, 97258, 58, "/eh-images/build-compositing/14.png"]
    ]},

    'build-game-dev': { pool:'pc', items:[
      ["( AMD Ryzen 5 7600X / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Game Development", 195977, 154887, 0, "/eh-images/build-game-dev/1.png"],
      ["( AMD Ryzen 9 9950X / AMD RADEON RX 7900 XTX 24GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Game Development", 398373, 493313, 19, "/eh-images/build-game-dev/2.jpg"],
      ["( AMD Ryzen 9 9900X / AMD Radeon RX 7900 XTX 24GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Game Development", 359888, 377775, 5, "/eh-images/build-game-dev/3.png"],
      ["( AMD Ryzen 5 9600X / AMD RADEON RX 7700X XT 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Game Development", 145909, 159979, 9, "/eh-images/build-game-dev/4.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5090 32GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Game Development", 574843, 546852, 0, "/eh-images/build-game-dev/5.png"],
      ["(AMD Ryzen 9 9900X / NVIDIA RTX 5070 Ti 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 327758, 361237, 9, "/eh-images/build-game-dev/6.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 6GB / 16GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For Blender Rendering", 34174, 64219, 47, "/eh-images/build-game-dev/7.png"],
      ["( Intel i5 14400 / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 67159, 83264, 19, "/eh-images/build-game-dev/8.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 292043, 325522, 10, "/eh-images/build-game-dev/9.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 517795, 796944, 35, "/eh-images/build-game-dev/10.png"],
      ["( Intel i5 14400F / NVIDIA RTX 3060 12GB / 32GB RAM DDR5 / 1TB M.2 NVME SSD ) Custom PC Build For Blender Rendering", 78254, 102349, 24, "/eh-images/build-game-dev/11.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 54908, 65499, 16, "/eh-images/build-game-dev/12.png"],
      ["( AMD Ryzen 5 8500G / 16GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For Blender Rendering", 55194, 71590, 23, "/eh-images/build-game-dev/13.png"],
      ["( AMD Ryzen 9 9900X / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 253288, 281753, 10, "/eh-images/build-game-dev/14.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Blender Rendering", 126813, 135487, 6, "/eh-images/build-game-dev/15.png"]
    ]},

    'build-graphic-design': { pool:'pc', items:[
      ["( AMD Ryzen 5 8500G / 16GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For Photo Editing", 58244, 76206, 24, "/eh-images/build-graphic-design/1.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5050 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Photo Editing", 232508, 248773, 7, "/eh-images/build-graphic-design/2.png"],
      ["( AMD Ryzen 9 9950X / 64GB RAM DDR5 / NVIDIA RTX 4070 12GB / 1TB NVME Gen4 SSD / 500GB NVME Gen4 SSD ) Custom PC Build For Photo Editing", 196244, 217549, 10, "/eh-images/build-graphic-design/3.png"],
      ["( AMD Ryzen 5 5600GT / 8GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For Photo Editing", 27405, 44753, 39, "/eh-images/build-graphic-design/4.png"],
      ["( Intel i7 14700K / NVIDIA RTX 3050 8GB / 64GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD / 250GB 2.5 SATA SSD ) Custom PC Build For Photo Editing", 209020, 220259, 5, "/eh-images/build-graphic-design/5.png"],
      ["( Intel i5 14600K / NVIDIA RTX 3050 6GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Photo Editing", 126374, 142143, 11, "/eh-images/build-graphic-design/6.png"],
      ["( AMD Ryzen 5 5600G / NVIDIA GTX 1650 4GB / 16GB RAM DDR4 / 500GB M.2 NVME SSD ) Custom PC Build For Davinci Video Editing", 45882, 58183, 21, "/eh-images/build-graphic-design/7.webp"],
      ["( Intel i9 14900K / NVIDIA RTX 5050 8GB / 64GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD / 250GB 2.5 SATA SSD ) Custom PC Build For Adobe Video Editing", 219224, 225487, 3, "/eh-images/build-graphic-design/8.png"],
      ["( AMD Ryzen 5 7500F / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Davinci Video Editing", 191238, 150148, 0, "/eh-images/build-graphic-design/9.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD) Custom PC Build For Davinci Video Editing", 397668, 431147, 8, "/eh-images/build-graphic-design/10.png"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 / 500GB M.2 NVME SSD ) Custom PC Build For Davinci Video Editing", 261278, 294757, 11, "/eh-images/build-graphic-design/11.png"],
      ["( Intel i9 14900K / NVIDIA RTX 5080 16GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 320169, 418369, 23, "/eh-images/build-graphic-design/12.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 3050 6GB / 32GB RAM DDR5 / 500GB NVME Gen4 SSD / 240GB 2.5 SATA SSD ) Custom PC Build For Adobe Video Editing", 78790, 102550, 23, "/eh-images/build-graphic-design/13.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 3050 6GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 240GB 2.5 SATA SSD ) Custom PC Build For Adobe Video Editing", 78599, 93699, 16, "/eh-images/build-graphic-design/14.png"],
      ["( AMD Ryzen 9 9900X / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Davinci Video Editing", 393078, 426557, 8, "/eh-images/build-graphic-design/15.png"]
    ]},

    'build-music-production': { pool:'pc', items:[
      ["( Intel i5 14400 / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Music Production", 87254, 100485, 13, "/eh-images/build-music-production/1.png"],
      ["( AMD Ryzen 7 9700X / RTX 3050 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Music Production", 152955, 183788, 17, "/eh-images/build-music-production/2.png"],
      ["( AMD Ryzen 9 9900X / AMD Radeon RX 9060 XT 8GB / 64GB RAM DDR5 / 1TB NVME Gen4 SSD ) Custom PC Build For Music Production", 230989, 238815, 3, "/eh-images/build-music-production/3.png"],
      ["( AMD Ryzen 5 5600GT / 16GB RAM DDR4 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Music Production", 52438, 86177, 39, "/eh-images/build-music-production/4.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5090 32GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD) Custom PC Build For Davinci Video Editing", 532343, 689999, 23, "/eh-images/build-music-production/5.png"],
      ["( AMD Ryzen 5 7500F / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Davinci Video Editing", 191238, 150148, 0, "/eh-images/build-music-production/6.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 5060 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen5 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 210586, 235432, 11, "/eh-images/build-music-production/7.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen5 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 281313, 283425, 1, "/eh-images/build-music-production/8.jpg"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 5070 Ti 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen5 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 315384, 330254, 5, "/eh-images/build-music-production/9.png"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 / 500GB M.2 NVME SSD ) Custom PC Build For Adobe Video Editing", 261278, 294757, 11, "/eh-images/build-music-production/10.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 396428, 429907, 8, "/eh-images/build-music-production/11.png"],
      ["( Intel i7 14700F / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 246540, 279467, 12, "/eh-images/build-music-production/12.png"],
      ["( Intel i5 14600K / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 233195, 247775, 6, "/eh-images/build-music-production/13.png"],
      ["( AMD Ryzen 9 9950X / 64GB RAM DDR5 / NVIDIA RTX 4070 12GB / 1TB NVME Gen4 SSD / 500GB NVME Gen4 SSD ) Custom PC Build For Photo Editing", 196244, 217549, 10, "/eh-images/build-music-production/14.png"],
      ["( AMD Ryzen 5 5600GT / 8GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For Photo Editing", 27405, 44753, 39, "/eh-images/build-music-production/15.png"]
    ]},

    'build-streaming-simulator': { pool:'pc', items:[
      ["( AMD Ryzen 5 7500F / NVIDIA RTX 5060 8GB / 16GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 100419, 122587, 18, "/eh-images/build-streaming-simulator/1.png"],
      ["( AMD Ryzen 7 9800X3D / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 390741, 414868, 6, "/eh-images/build-streaming-simulator/2.png"],
      ["( AMD Ryzen 7 9850X3D / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 695609, 720307, 3, "/eh-images/build-streaming-simulator/3.png"],
      ["( AMD Ryzen 7 9800X3D / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 341032, 374511, 9, "/eh-images/build-streaming-simulator/4.png"],
      ["( AMD Ryzen 7 9800X3D / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 507173, 493654, 0, "/eh-images/build-streaming-simulator/5.jpg"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 405869, 430259, 6, "/eh-images/build-streaming-simulator/6.png"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 315688, 348325, 9, "/eh-images/build-streaming-simulator/7.png"],
      ["( Intel Core Ultra 7 265KF / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 326878, 360357, 9, "/eh-images/build-streaming-simulator/8.webp"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5080 16GB / 32GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 304579, 335242, 9, "/eh-images/build-streaming-simulator/9.jpg"],
      ["( AMD Ryzen 7 7700X / NVIDIA RTX 5070 Ti 16GB / 32GB RAM DDR5 / 1TB M.2 NVMe Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 225594, 265339, 15, "/eh-images/build-streaming-simulator/10.png"],
      ["( Intel Core Ultra 5 245KF / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 161847, 197930, 18, "/eh-images/build-streaming-simulator/11.png"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 177675, 201684, 12, "/eh-images/build-streaming-simulator/12.webp"],
      ["( AMD Ryzen 5 7600 / NVIDIA RTX 5060 TI 16GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 138719, 152475, 9, "/eh-images/build-streaming-simulator/13.png"],
      ["( AMD Ryzen 5 7500F / NVIDIA RTX 5050 8GB / 16GB DDR5 RAM / 500GB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 88338, 92025, 4, "/eh-images/build-streaming-simulator/14.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 5060 Ti 16GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build ( For Flight Simulator & Racing Simulators )", 151134, 196903, 23, "/eh-images/build-streaming-simulator/15.jpg"]
    ]},

    'build-vfx': { pool:'pc', items:[
      ["( AMD Ryzen 5 7600X / NVIDIA RTX 3050 8GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 118019, 149598, 21, "/eh-images/build-vfx/1.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 126813, 160238, 21, "/eh-images/build-vfx/2.png"],
      ["( AMD Ryzen 5 7600 / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 95635, 111560, 14, "/eh-images/build-vfx/3.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 397023, 430502, 8, "/eh-images/build-vfx/4.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 286053, 319532, 10, "/eh-images/build-vfx/5.png"],
      ["( AMD Ryzen 9 9900X / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 265658, 299137, 11, "/eh-images/build-vfx/6.png"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 236519, 249223, 5, "/eh-images/build-vfx/7.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 53483, 65839, 19, "/eh-images/build-vfx/8.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5090 32GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 534982, 645819, 17, "/eh-images/build-vfx/9.png"],
      ["( AMD Ryzen 9 9900X / NVIDIA RTX 5080 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 262209, 281981, 7, "/eh-images/build-vfx/10.png"],
      ["( AMD Ryzen 5 8500G / 16GB RAM DDR5 / 240GB 2.5 SATA SSD ) Custom PC Build For Cinema 4D Rendering", 55194, 69882, 21, "/eh-images/build-vfx/11.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 4090 24GB / 128GB RAM DDR5 / 1TB M.2 NVME SSD ) Custom PC Build For Cinema 4D Rendering", 374566, 409183, 8, "/eh-images/build-vfx/12.png"],
      ["( Intel i5 12400F / NVIDIA RTX 3050 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Cinema 4D Rendering", 54908, 69882, 21, "/eh-images/build-vfx/13.png"],
      ["( Intel i5 14600KF / NVIDIA RTX 5060 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Houdini Rendering", 167079, 189147, 12, "/eh-images/build-vfx/14.png"],
      ["( Intel i9 14900K / NVIDIA RTX 5070 Ti 16GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Houdini Rendering", 285013, 318492, 11, "/eh-images/build-vfx/15.webp"]
    ]},

    'build-video-editing': { pool:'pc', items:[
      ["( Intel i5 14400 / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD / 240GB 2.5 SATA SSD ) Custom PC Build for Adobe Video Editing", 73159, 100824, 27, "/eh-images/build-video-editing/1.png"],
      ["( AMD Ryzen 5 5600 / NVIDIA RTX 5060 8GB / 16GB RAM DDR4 / 500GB NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 85469, 118878, 28, "/eh-images/build-video-editing/2.png"],
      ["( AMD Ryzen 7 9700X / AMD Radeon RX 9060 XT 8GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 212055, 221444, 4, "/eh-images/build-video-editing/3.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5090 32GB / 96GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD) Custom PC Build For Davinci Video Editing", 532343, 689999, 23, "/eh-images/build-video-editing/4.png"],
      ["( AMD Ryzen 5 7500F / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Davinci Video Editing", 191238, 150148, 0, "/eh-images/build-video-editing/5.png"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 5060 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen5 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 210586, 235432, 11, "/eh-images/build-video-editing/6.png"],
      ["( AMD Ryzen 9 9950X / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen5 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 281313, 283425, 1, "/eh-images/build-video-editing/7.jpg"],
      ["( Intel Core Ultra 9 285K / NVIDIA RTX 5070 Ti 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen5 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build", 315384, 330254, 5, "/eh-images/build-video-editing/8.png"],
      ["( AMD Ryzen 5 9600X / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 224155, 236363, 5, "/eh-images/build-video-editing/9.png"],
      ["( AMD Ryzen 7 9700X / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 / 500GB M.2 NVME SSD ) Custom PC Build For Adobe Video Editing", 261278, 294757, 11, "/eh-images/build-video-editing/10.png"],
      ["( Intel i9 14900KF / NVIDIA RTX 5080 16GB / 128GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD / 500GB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 396428, 429907, 8, "/eh-images/build-video-editing/11.png"],
      ["( Intel i7 14700F / NVIDIA RTX 5070 Ti 16GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 246540, 279467, 12, "/eh-images/build-video-editing/12.png"],
      ["( Intel i5 14600K / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD ) Custom PC Build For Adobe Video Editing", 233195, 247775, 6, "/eh-images/build-video-editing/13.png"],
      ["( AMD Ryzen 9 9950X / 64GB RAM DDR5 / NVIDIA RTX 4070 12GB / 1TB NVME Gen4 SSD / 500GB NVME Gen4 SSD ) Custom PC Build For Photo Editing", 196244, 217549, 10, "/eh-images/build-video-editing/14.png"],
      ["( AMD Ryzen 5 5600GT / 8GB RAM DDR4 / 240GB 2.5 SATA SSD ) Custom PC Build For Photo Editing", 27405, 44753, 39, "/eh-images/build-video-editing/15.png"]
    ]},

    'gaming-keyboard': { pool:'headphones', items:[
      ["RAPOO V500 Pro Mechanical Full Size Gaming Keyboard (Yellow/Blue)", 2887, 5699, 49, "/eh-images/gaming-keyboard/rapoo-v500-pro.webp"],
      ["RAZER DeathStalker V2 Wired Mechanical Gaming Keyboard (Low Profile Optical Red Switch)", 15595, 29999, 48, "/eh-images/gaming-keyboard/razer-deathstalker-v2.webp"],
      ["CORSAIR K60 Pro SE RGB Full Size Mechanical Wired Gaming Keyboard (Black)", 7899, 10999, 28, "/eh-images/gaming-keyboard/corsair-k60-pro-se.jpg"],
      ["CORSAIR K70 Pro RGB Full Size Mechanical Wired Gaming Keyboard (Black, Cherry MX Brown)", 14799, 15999, 8, "/eh-images/gaming-keyboard/corsair-k70-pro-brown.jpg"],
      ["RAZER Huntsman Mini 60% RGB Optical Gaming Keyboard (Purple Switch)", 5799, 14999, 61, "/eh-images/gaming-keyboard/razer-huntsman-mini.jpg"],
      ["COSMIC BYTE CB-GK-16 Firefly Tenkeyless Mechanical Wired Gaming Keyboard (Black, Blue Switch)", 2049, 2599, 21, "/eh-images/gaming-keyboard/cosmic-byte-gk16-firefly.jpg"],
      ["COSMIC BYTE CB-GK-18 Firefly Tenkeyless Mechanical Wired Gaming Keyboard (Black, Red Switch)", 2049, 2599, 21, "/eh-images/gaming-keyboard/cosmic-byte-gk18-firefly.jpg"],
      ["HYPERX Alloy MKW100 RGB Full Size Mechanical Gaming Keyboard (Black, Linear Red Switch)", 5283, 9600, 45, "/eh-images/gaming-keyboard/hyperx-mkw100.jpg"],
      ["HYPERX Alloy Origins 60% RGB Mechanical Gaming Keyboard (Black, Aqua Tactile Switch)", 6074, 9999, 39, "/eh-images/gaming-keyboard/hyperx-origins-60-aqua.jpg"],
      ["HYPERX Alloy Origins Core TKL Mechanical Gaming Keyboard (Aqua Switches)", 6425, 11035, 42, "/eh-images/gaming-keyboard/hyperx-origins-core-tkl-aqua.webp"],
      ["HYPERX Alloy Origins Core TKL Mechanical Wired Gaming Keyboard (Blue Switches)", 4684, 11035, 58, "/eh-images/gaming-keyboard/hyperx-origins-core-tkl-blue.webp"],
      ["HYPERX Alloy Origins Full Size RGB Mechanical Gaming Keyboard (HyperX Red Linear Switch)", 6758, 12337, 45, "/eh-images/gaming-keyboard/hyperx-origins-red.webp"],
      ["REDRAGON Shiva K512 Full Size Membrane Wired Gaming Keyboard (White)", 1989, 2590, 23, "/eh-images/gaming-keyboard/redragon-shiva-k512-white.jpg"],
      ["COSMIC BYTE CB-GK-02 Corona Full Size Membrane Wired Gaming Keyboard (Black)", 1058, 1725, 39, "/eh-images/gaming-keyboard/cosmic-byte-gk02-corona.jpg"],
      ["COSMIC BYTE CB-GK-23 Artemis 60% Mechanical Wired Gaming Keyboard (Black, Outemu Blue Switch)", 1919, 3899, 51, "/eh-images/gaming-keyboard/cosmic-byte-gk23-artemis.jpg"]
    ]},

    'gaming-mouse': { pool:'headphones', items:[
      ["COOLER MASTER MM311 Wireless Gaming Mouse (Black)", 2730, 3999, 32, "/eh-images/gaming-mouse/coolermaster-mm311.png"],
      ["LOGITECH G203 Lightsync Wired Ambidextrous Gaming Mouse (910-005790)", 1595, 2345, 32, "/eh-images/gaming-mouse/logitech-g203.webp"],
      ["RAPOO V16 Wired Ambidextrous Gaming Mouse", 299, 1499, 80, "/eh-images/gaming-mouse/rapoo-v16.webp"],
      ["RAPOO VT200 Wired/Wireless Ergonomic Gaming Mouse", 1893, 3899, 51, "/eh-images/gaming-mouse/rapoo-vt200.webp"],
      ["RAPOO VT30 Wired Ergonomic Gaming Mouse", 1741, 2999, 42, "/eh-images/gaming-mouse/rapoo-vt30.webp"],
      ["RAZER Viper V2 Pro Hyperspeed Wireless Ergonomic Gaming Mouse", 7999, 17999, 56, "/eh-images/gaming-mouse/razer-viper-v2-pro.webp"],
      ["COSMIC BYTE Kilonova 3335IC Wireless + Wired Ergonomic Gaming Mouse", 1999, 3899, 49, "/eh-images/gaming-mouse/cosmicbyte-kilonova.jpg"],
      ["HYPERX Pulsefire Haste 2 Wireless + Bluetooth Ambidextrous Gaming Mouse (White)", 3543, 9087, 61, "/eh-images/gaming-mouse/hyperx-haste2-bt-white.jpg"],
      ["LOGITECH G Pro X Superlight Wireless Gaming Mouse (Black)", 7399, 13595, 46, "/eh-images/gaming-mouse/logitech-gpro-superlight.jpg"],
      ["HYPERX Pulsefire Haste 2 Wireless Ambidextrous Gaming Mouse (Black)", 3173, 9087, 65, "/eh-images/gaming-mouse/hyperx-haste2-black.jpg"],
      ["RAZER DeathAdder V3 Wired Ergonomic Gaming Mouse (Black)", 4145, 7899, 48, "/eh-images/gaming-mouse/razer-deathadder-v3.webp"],
      ["ANT ESPORTS GM610 Crystal Wired Ambidextrous RGB Gaming Mouse (White)", 697, 1999, 65, "/eh-images/gaming-mouse/ant-gm610-white.jpg"],
      ["RAZER DeathAdder V3 Pro Wireless Ergonomic Gaming Mouse (Black)", 9485, 29999, 68, "/eh-images/gaming-mouse/razer-deathadder-v3-pro.webp"],
      ["RAZER Viper V3 Pro Wireless Ambidextrous Gaming Mouse (Black)", 14195, 16725, 15, "/eh-images/gaming-mouse/razer-viper-v3-pro-black.jpg"],
      ["RAZER Viper V3 Pro Wireless Ambidextrous Gaming Mouse (White)", 12999, 16725, 22, "/eh-images/gaming-mouse/razer-viper-v3-pro-white.jpg"]
    ]},

    'gaming-headphones': { pool:'headphones', items:[
      ['HYPERX Cloud Stinger Core Gaming Headphone (Black) (PlayStation)', 1000, 4499, 78, '/headphones/eh-01-hyperx-cloud-stinger-core.jpg'],
      ['HYPERX Cloud Alpha S Gaming Headphone (Blue)', 8923, 11199, 20, '/headphones/eh-02-hyperx-cloud-alpha-s-blue.jpg'],
      ['HYPERX Cloud Core Wireless Stereo Gaming Headphone (Black) (PC / PS5 / PS4)', 4232, 9999, 58, '/headphones/eh-03-hyperx-cloud-core-wireless.png'],
      ['RAZER BlackShark V2 X Wired 3.5mm Jack Gaming Headphone (Black) (PlayStation)', 5315, 8649, 39, '/headphones/eh-04-razer-blackshark-v2x-black.jpg'],
      ['RAZER BlackShark V2 X Wired 7.1 Surround Gaming Headphone (Green) (PC / Mac / PS4 / Xbox)', 4495, 7999, 44, '/headphones/eh-05-razer-blackshark-v2x-71-green.webp'],
      ['HYPERX Cirro Buds Pro True Wireless Earbuds (Blue)', 4254, 10387, 59, '/headphones/eh-06-hyperx-cirro-buds-pro-blue.webp'],
      ['HYPERX Cirro Buds Pro True Wireless Earbuds (Black)', 4254, 10387, 59, '/headphones/eh-07-hyperx-cirro-buds-pro-black.webp'],
      ['HYPERX Cirro Buds Pro True Wireless Earbuds (Tan)', 4254, 10387, 59, '/headphones/eh-08-hyperx-cirro-buds-pro-tan.webp'],
      ['RAZER BlackShark V2 Pro 2023 Edition Wireless 7.1 Surround Gaming Headphone (Black)', 22495, 22999, 2, '/headphones/eh-09-razer-blackshark-v2-pro-black.webp'],
      ['RAZER BlackShark V2 Pro 2023 Edition Wireless 7.1 Surround Gaming Headphone (White)', 15453, 22999, 33, '/headphones/eh-10-razer-blackshark-v2-pro-white.webp'],
      ['RAZER BlackShark V2 X Wired 7.1 Surround Gaming Headphone (White) (PC / Mac / PS4 / Xbox)', 5245, 7999, 34, '/headphones/eh-14-razer-blackshark-v2x-71-white.jpg'],
      ['CORSAIR HS80 RGB USB Wireless Gaming Headphone (Carbon)', 15779, 23999, 34, '/headphones/eh-16-corsair-hs80-wireless.jpg'],
      ['RAZER Hammerhead True Wireless X Gaming Earbuds (Black)', 1899, 7499, 75, '/headphones/eh-17-razer-hammerhead-tws-x.jpg'],
      ['HYPERX Cloud Earbuds Gaming Earphones (Red)', 3331, 5000, 33, '/headphones/eh-18-hyperx-cloud-earbuds-red.jpg'],
      ['RAZER Kraken Kitty V2 RGB Wired Gaming Headphone (Black)', 9739, 16629, 41, '/headphones/eh-19-razer-kraken-kitty-v2.webp']
    ]},

    'gaming-mousepad': { pool:'mousepad', items:[
      ["COOLER MASTER MP511 XXL Black Mousepad", 2975, 5999, 50, "/eh-images/gaming-mousepad/coolermaster-mp511-xxl.jpg"],
      ["RAPOO V10 Wireless Charging Large Black Mousepad", 2193, 3499, 37, "/eh-images/gaming-mousepad/rapoo-v10-wireless.jpg"],
      ["RAZER Goliathus Chroma Medium Soft Black Mousepad", 3695, 3899, 5, "/eh-images/gaming-mousepad/razer-goliathus-chroma-medium.webp"],
      ["HYPERX Pulsefire Mat Gaming Mousepad (2XL)", 4055, 5599, 28, "/eh-images/gaming-mousepad/hyperx-pulsefire-mat-2xl.webp"],
      ["RAZER Goliathus Chroma RGB Quartz Soft Extended Gaming Mousepad", 4299, 6499, 34, "/eh-images/gaming-mousepad/razer-goliathus-chroma-quartz.webp"],
      ["ANT ESPORTS MP290 Large Black Mousepad", 324, 599, 46, "/eh-images/gaming-mousepad/ant-esports-mp290.webp"],
      ["COSMIC BYTE Dwarf Mousepad (Speed)", 299, 499, 40, "/eh-images/gaming-mousepad/cosmicbyte-dwarf-speed.jpg"],
      ["REDRAGON Capricorn PO12 Large Black Mousepad", 194, 499, 61, "/eh-images/gaming-mousepad/redragon-capricorn-po12.jpg"],
      ["REDRAGON Pisces P016 Black Mousepad", 169, 499, 66, "/eh-images/gaming-mousepad/redragon-pisces-p016.jpg"],
      ["COSMIC BYTE Dwarf Mousepad (Control)", 299, 499, 40, "/eh-images/gaming-mousepad/cosmicbyte-dwarf-control.jpg"],
      ["CLAW SLIDE Waterproof RGB Large Mousepad (Black)", 1199, 1699, 29, "/eh-images/gaming-mousepad/claw-slide-rgb.jpg"],
      ["GAMDIAS NYX P1 Extended Extra Large Black Mousepad", 399, 1760, 77, "/eh-images/gaming-mousepad/gamdias-nyx-p1.webp"],
      ["GLORIOUS Large Gaming Mousepad (Black)", 999, 1099, 9, "/eh-images/gaming-mousepad/glorious-large.webp"],
      ["RAZER Goliathus Extended Chroma Mercury Mousepad", 5226, 6999, 25, "/eh-images/gaming-mousepad/razer-goliathus-extended-mercury.jpg"],
      ["RAZER Goliathus Chroma Mercury Soft Gaming Mouse Pad (Extended)", 5226, 8624, 39, "/eh-images/gaming-mousepad/razer-goliathus-mercury-soft.webp"]
    ]},

    'gaming-pc': { pool:'pc', items:[
      ["(Intel i5 14400F / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 80015, 97999, 18, "/eh-images/gaming-pc/aa4.png"],
      ["(AMD Ryzen 5 7600 / NVIDIA RTX 5060 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD)", 71736, 92457, 22, "/eh-images/gaming-pc/aa1.png"],
      ["(Intel Core Ultra 5 225F / NVIDIA RTX 5060 TI 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD)", 99102, 162964, 39, "/eh-images/gaming-pc/aa7.png"],
      ["(AMD Ryzen 5 7600X / NVIDIA RTX 5060 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 85999, 98999, 13, "/eh-images/gaming-pc/aa2.png"],
      ["(Intel Core Ultra 5 225F / NVIDIA RTX 5060 TI 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 126517, 185684, 32, "/eh-images/gaming-pc/aa8.jpg"],
      ["(AMD Ryzen 5 7600 / NVIDIA RTX 5060 Ti 16GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD)", 138719, 197797, 30, "/eh-images/gaming-pc/aa7.png"],
      ["(Intel Core Ultra 5 225F / NVIDIA RTX 5060 Ti 16GB / 32GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD)", 133102, 197819, 33, "/eh-images/gaming-pc/aa7.png"],
      ["(AMD Ryzen 5 7600X / NVIDIA RTX 5060 TI 8GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 131286, 183888, 29, "/eh-images/gaming-pc/aa8.jpg"],
      ["(AMD Ryzen 5 7600 / NVIDIA RTX 5060 TI 8GB / 16GB RAM DDR5 / 500GB M.2 NVME Gen4 SSD)", 104719, 158369, 34, "/eh-images/gaming-pc/aa7.png"],
      ["(Intel Core Ultra 5 225F / NVIDIA RTX 5060 Ti 16GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 143517, 201184, 29, "/eh-images/gaming-pc/aa8.jpg"],
      ["(AMD Ryzen 5 9600X / NVIDIA RTX 5060 Ti 16GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 151134, 201684, 25, "/eh-images/gaming-pc/aa8.jpg"],
      ["(Intel Core Ultra 5 245KF / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 161847, 206107, 21, "/eh-images/gaming-pc/aa19.png"],
      ["(Intel Core Ultra 5 245KF / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 167219, 245384, 32, "/eh-images/gaming-pc/aa20.png"],
      ["(AMD Ryzen 7 7700X / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 173194, 201007, 14, "/eh-images/gaming-pc/aa19.png"],
      ["(AMD Ryzen 7 9700X / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB M.2 NVME Gen4 SSD)", 177675, 237839, 25, "/eh-images/gaming-pc/aa20.png"]
    ]},

    'gaming-chair': { pool:'chair', items:[
      ["CYBEART Apex Series Signature Edition Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-signature.webp"],
      ["CYBEART Apex Series Vintage Gaming Chair", 37500, 44999, 17, "/eh-images/gaming-chair/apex-vintage.webp"],
      ["CYBEART Apex Series Forest Camo Gaming Chair", 32994, 49999, 34, "/eh-images/gaming-chair/apex-forest-camo.webp"],
      ["CYBEART Apex Series Arancio Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-arancio.webp"],
      ["CYBEART Apex Series Velocity 1.0 Gaming Chair", 34999, 49999, 30, "/eh-images/gaming-chair/apex-velocity.webp"],
      ["COOLER MASTER Caliber R3 Gaming Chair (Purple-Black)", 23495, 23495, 0, "/eh-images/gaming-chair/cm-caliber-r3-purple.webp"],
      ["COOLER MASTER Caliber R3 Gaming Chair (Black)", 23495, 23495, 0, "/eh-images/gaming-chair/cm-caliber-r3-black.webp"],
      ["CYBEART Apex Series Marine Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-marine.webp"],
      ["CYBEART Apex Series Pretty Pink Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-pretty-pink.webp"],
      ["CYBEART Mumbai Indians (Limited Edition) Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-mumbai-indians.webp"],
      ["CYBEART Gujarat Titans (Limited Edition) Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-gujarat-titans.webp"],
      ["CYBEART Apex Series Arctic White Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-arctic-white.webp"],
      ["CYBEART Apex Series X11 Gray Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-x11-gray.webp"],
      ["CYBEART Apex Series Ghost Edition Gaming Chair", 34999, 44999, 22, "/eh-images/gaming-chair/apex-ghost.webp"],
      ["CORSAIR T1 Race 2018 Gaming Chair (Black-Yellow)", 22000, 34000, 35, "/eh-images/gaming-chair/corsair-t1-race-yellow.jpg"]
    ]},

    'controllers': { pool:'controller', items:[
      ["COSMIC BYTE Ares Wired Controller (White)", 969, 1399, 31, "/eh-images/controllers/cosmicbyte-ares-wired-white.jpg"],
      ["COSMIC BYTE C3070W Nebula 2.4G Wireless Gamepad (Camo Red)", 1200, 2466, 51, "/eh-images/controllers/cosmicbyte-c3070w-camo-red.jpg"],
      ["COSMIC BYTE C3070W Nebula 2.4G Wireless Gamepad (Camo Blue)", 1200, 2466, 51, "/eh-images/controllers/cosmicbyte-c3070w-camo-blue.jpg"],
      ["COSMIC BYTE Ares Wired Black Controller (Black)", 969, 1500, 35, "/eh-images/controllers/cosmicbyte-ares-wired-black.jpg"],
      ["ANT ESPORTS GP325 Wireless Gamepad", 999, 2466, 59, "/eh-images/controllers/ant-gp325-wireless.webp"],
      ["ANT ESPORTS MG15 Super Cube Wireless Mobile Gaming Controller", 2220, 3699, 40, "/eh-images/controllers/ant-mg15-supercube.webp"],
      ["COSMIC BYTE C3070W Nebula 2.4G Wireless Gamepad (Camo Black)", 1200, 2299, 48, "/eh-images/controllers/cosmicbyte-c3070w-camo-black.jpg"],
      ["CLAW Shoot Wireless Gamepad Controller for PC (2.4Ghz + USB)", 1113, 1790, 38, "/eh-images/controllers/claw-shoot-wireless-pc.jpg"],
      ["HyperX Clutch Gladiate - Wired Controller", 2954, 4799, 38, "/eh-images/controllers/hyperx-clutch-gladiate.jpg"],
      ["CLAW Shoot Wired USB Gamepad Controller for PC", 1490, 2366, 37, "/eh-images/controllers/claw-shoot-wired-pc.jpg"],
      ["Razer Wolverine V2 Wired Gamepad For Xbox Series X", 9997, 11999, 17, "/eh-images/controllers/razer-wolverine-v2.webp"],
      ["CLAW Shoot Wireless Bluetooth Mobile Gamepad Controller (With Mobile Holder)", 2490, 2999, 17, "/eh-images/controllers/claw-shoot-wireless-bt-mobile.jpg"],
      ["ANT ESPORTS GP310R Wireless Gamepad", 1898, 2999, 37, "/eh-images/controllers/ant-gp310r-wireless.jpg"],
      ["COSMIC BYTE C3070W Nebula 2.4G Wireless Gamepad (Black)", 1375, 2466, 44, "/eh-images/controllers/cosmicbyte-c3070w-black.jpg"],
      ["COSMIC BYTE Ares Pro Tri-Mode Wireless Controller PC, iOS (Black)", 1985, 4499, 56, "/eh-images/controllers/cosmicbyte-ares-pro-trimode-black.jpg"]
    ]},

    'webcam': { pool:'webcam', items:[
      ["LOGITECH C920 HD Pro Webcam (Black)", 9499, 10699, 11, "/eh-images/webcam/logitech-c920-black.jpg"],
      ["AVERMEDIA PW310P Full HD Webcam (Black)", 7495, 14699, 49, "/eh-images/webcam/avermedia-pw310p.webp"],
      ["AVERMEDIA PW313D FHD Dual Webcam", 18995, 25699, 26, "/eh-images/webcam/avermedia-pw313d.webp"],
      ["AVERMEDIA PW515 4K UHD Webcam (Black)", 23895, 34998, 32, "/eh-images/webcam/avermedia-pw515.webp"],
      ["ANT ESPORTS StreamCam 120 Webcam", 1655, 3749, 56, "/eh-images/webcam/ant-streamcam-120.webp"],
      ["LOGITECH C920 HD Pro Webcam", 8500, 9999, 15, "/eh-images/webcam/logitech-c920-pro.jpg"],
      ["LOGITECH C922 Pro Webcam", 10395, 12995, 20, "/eh-images/webcam/logitech-c922-pro.jpg"],
      ["LOGITECH C270 Webcam", 1990, 4995, 60, "/eh-images/webcam/logitech-c270.jpg"],
      ["RAZER Kiyo Pro USB Camera with Adaptive Light Sensor", 9000, 14999, 40, "/eh-images/webcam/razer-kiyo-pro.jpg"],
      ["ASUS ROG Eye S FHD Webcam", 7104, 9999, 29, "/eh-images/webcam/asus-rog-eye-s.jpg"],
      ["ASUS C3 Full HD Webcam", 4387, 11900, 63, "/eh-images/webcam/asus-c3.jpg"],
      ["ASUS ROG Eye 1080P 60fps USB Webcam", 6016, 7220, 17, "/eh-images/webcam/asus-rog-eye.jpg"],
      ["REDRAGON GW800 1080P Webcam with Built-in Dual Microphone", 2520, 3990, 37, "/eh-images/webcam/redragon-gw800.jpg"],
      ["LOGITECH Brio 500 Full HD Webcam (White)", 10899, 14699, 26, "/eh-images/webcam/logitech-brio-500-white.jpg"],
      ["LOGITECH C615 Portable Full HD Webcam", 4250, 7495, 43, "/eh-images/webcam/logitech-c615.webp"]
    ]},

    'microphones': { pool:'microphone', items:[
      ["FIFINE K050 Mini Gooseneck USB Microphone", 1155, 2115, 45, "/eh-images/microphones/fifine-k050.webp"],
      ["FIFINE K670B USB Microphone", 3169, 6169, 49, "/eh-images/microphones/fifine-k670b.webp"],
      ["FIFINE K690 Studio Recording USB Microphone", 4321, 9549, 55, "/eh-images/microphones/fifine-k690.webp"],
      ["FiFine K678 - Studio Recording USB Microphone", 4175, 9999, 58, "/eh-images/microphones/fifine-k678.webp"],
      ["FIFINE K651 USB Computer Microphone Kit", 4230, 4230, 0, "/eh-images/microphones/fifine-k651.webp"],
      ["FIFINE K669B USB Microphone Condenser", 1549, 6999, 78, "/eh-images/microphones/fifine-k669b.webp"],
      ["FIFINE T669 USB Microphone Condenser Kit", 4089, 6381, 36, "/eh-images/microphones/fifine-t669.webp"],
      ["FIFINE T683 USB Microphone Kit", 5289, 6289, 16, "/eh-images/microphones/fifine-t683.webp"],
      ["FIFINE K730 USB Condenser Microphone", 1950, 3109, 37, "/eh-images/microphones/fifine-k730.webp"],
      ["FIFINE K683B USB Desktop Microphone (With Desk Stand)", 3890, 4911, 21, "/eh-images/microphones/fifine-k683b.webp"],
      ["FIFINE T732 USB Microphone Kit", 3169, 4169, 24, "/eh-images/microphones/fifine-t732.webp"],
      ["FIFINE Ampligame A6V USB Gaming Microphone (Black)", 2122, 3957, 46, "/eh-images/microphones/fifine-a6v-black.webp"],
      ["FIFINE K036 Wireless Handheld Microphone", 6349, 7349, 14, "/eh-images/microphones/fifine-k036.webp"],
      ["FIFINE T730 USB Microphone Kit", 3450, 3851, 10, "/eh-images/microphones/fifine-t730.webp"],
      ["FIFINE K052 Gooseneck USB Microphone", 2003, 3003, 33, "/eh-images/microphones/fifine-k052.webp"]
    ]},

    'elgato': { pool:'elgato', items:[
      ["ELGATO XLR Microphone Cable", 2169, 3375, 36, "/eh-images/elgato/xlr-mic-cable.jpg"],
      ["ELGATO Wave Neo Microphone", 8098, 16000, 49, "/eh-images/elgato/wave-neo-mic.jpg"],
      ["ELGATO Chat Link Pro Audio Capture Device", 2134, 3000, 29, "/eh-images/elgato/chat-link-pro.jpg"],
      ["ELGATO Stream Deck Neo Controller (White)", 10815, 15750, 31, "/eh-images/elgato/stream-deck-neo-white.jpg"],
      ["ELGATO 4K Pro Game Capture Card", 29845, 51000, 41, "/eh-images/elgato/4k-pro-capture.webp"],
      ["ELGATO Stream Deck MK.2 Studio Controller (Purple)", 11499, 21250, 46, "/eh-images/elgato/stream-deck-mk2-purple.jpg"],
      ["ELGATO Stream Deck + Controller (Black)", 22495, 27839, 19, "/eh-images/elgato/stream-deck-plus-black.jpg"],
      ["ELGATO Neo Game Capture", 11139, 18999, 41, "/eh-images/elgato/neo-game-capture.webp"],
      ["ELGATO 4K Cam Link", 11387, 15990, 29, "/eh-images/elgato/4k-cam-link.jpg"],
      ["CORSAIR PBT Double Shot Pro Keycap Mod Kit (Elgato Blue)", 2525, 3800, 34, "/eh-images/elgato/corsair-keycap-elgato-blue.jpg"],
      ["ELGATO Green Screen Extra Large Black Mousepad", 2799, 6999, 60, "/eh-images/elgato/green-screen-mousepad.jpg"],
      ["ELGATO Game Capture HD60 Pro", 19095, 19999, 5, "/eh-images/elgato/game-capture-hd60-pro.webp"],
      ["ELGATO HD60S Game Capture", 13600, 18999, 28, "/eh-images/elgato/hd60s-game-capture.jpg"],
      ["ELGATO HD60S+ Capture Card", 18500, 27790, 33, "/eh-images/elgato/hd60s-plus-capture.jpg"],
      ["ELGATO Green Screen Collapsible Chroma Key Panel", 17599, 22100, 20, "/eh-images/elgato/green-screen-chroma-panel.jpg"]
    ]},

    'streaming-pc': { pool:'pc', items:[
      ["(Intel i7 14700K / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB SSD)", 262160, 276314, 5, "/eh-images/streaming-pc/st24.png"],
      ["(AMD Ryzen 7 7700X / NVIDIA RTX 5060 Ti 16GB / 32GB RAM DDR5 / 500GB SSD)", 192105, 218930, 12, "/eh-images/streaming-pc/st5.png"],
      ["(AMD Ryzen 5 8500G / 16GB RAM DDR5 / 500GB SSD)", 63837, 75545, 15, "/eh-images/streaming-pc/ms2.png"],
      ["(Intel i5 14400F / AMD Radeon RX 9060 XT 8GB / 32GB RAM DDR5 / 500GB SSD)", 128975, 149839, 14, "/eh-images/streaming-pc/st3.png"],
      ["(Intel i7 14700KF / NVIDIA RTX 4070 Ti 12GB / 64GB RAM DDR5 / 1TB SSD)", 178320, 209499, 15, "/eh-images/streaming-pc/s732.png"],
      ["(Intel i7 14700K / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB SSD)", 256660, 272089, 6, "/eh-images/streaming-pc/st23.png"],
      ["(AMD Ryzen 9 9900X / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB SSD)", 257249, 276088, 7, "/eh-images/streaming-pc/st18.png"],
      ["(AMD Ryzen 9 9900X / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB SSD)", 253749, 353432, 28, "/eh-images/streaming-pc/st17.png"],
      ["(Intel i7 14700F / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB SSD)", 232995, 250724, 7, "/eh-images/streaming-pc/st20.png"],
      ["(Intel i7 14700F / NVIDIA RTX 5070 12GB / 32GB RAM DDR5 / 1TB SSD)", 198940, 228238, 13, "/eh-images/streaming-pc/st19.png"],
      ["(AMD Ryzen 7 9700X / NVIDIA RTX 5070 12GB / 64GB RAM DDR5 / 1TB SSD)", 231250, 249939, 7, "/eh-images/streaming-pc/st14.png"],
      ["(Intel i9 14900K / AMD Radeon RX 9060 XT 8GB / 64GB RAM DDR5 / 1TB SSD)", 242170, 251269, 4, "/eh-images/streaming-pc/ms20.png"],
      ["(AMD Ryzen 7 7700X / AMD Radeon RX 9060 XT 8GB / 32GB RAM DDR5 / 500GB SSD)", 167520, 186085, 10, "/eh-images/streaming-pc/ms13.png"],
      ["(AMD Ryzen 5 7600X / NVIDIA RTX 5050 8GB / 32GB RAM DDR5 / 500GB SSD)", 131038, 139110, 6, "/eh-images/streaming-pc/ms9.png"],
      ["(AMD Ryzen 5 5600GT / 16GB RAM DDR4 / 240GB SATA SSD)", 53748, 60258, 11, "/eh-images/streaming-pc/ms1.png"]
    ]},

    'processor': { pool:'cpu', items:[
      ["AMD Ryzen 7 5700G 5th Generation Processor", 20445, 54000, 62, "/eh-images/processor/ryzen7-5700g.webp"],
      ["AMD Ryzen 9 7950X 7th Generation Processor", 52295, 79999, 35, "/eh-images/processor/ryzen9-7950x.webp"],
      ["AMD Ryzen 5 3500 3rd Generation Processor", 12399, 19999, 38, "/eh-images/processor/ryzen5-3500.jpg"],
      ["AMD Ryzen 5 4600G 4th Generation Processor", 9499, 20850, 54, "/eh-images/processor/ryzen5-4600g.jpg"],
      ["AMD Ryzen 7 8700G Processor", 28898, 42246, 32, "/eh-images/processor/ryzen7-8700g.webp"],
      ["AMD Ryzen 7 5700 5th Generation Desktop Processor", 12445, 19500, 36, "/eh-images/processor/ryzen7-5700.webp"],
      ["AMD Ryzen 9 5900XT 5th Generation Processor", 31295, 59000, 47, "/eh-images/processor/ryzen9-5900xt.webp"],
      ["AMD Ryzen 7 5800XT 5th Generation Processor", 24845, 42000, 41, "/eh-images/processor/ryzen7-5800xt.webp"],
      ["INTEL Core I9 14900 14th Generation Processor", 50935, 66246, 23, "/eh-images/processor/intel-i9-14900.webp"],
      ["INTEL Core i7 13700 13th Generation Processor", 31440, 39999, 21, "/eh-images/processor/intel-i7-13700.webp"],
      ["INTEL Core i3 10100 10th Generation Processor", 7395, 12749, 42, "/eh-images/processor/intel-i3-10100.webp"],
      ["INTEL Core i5 10400 10th Generation Processor", 15745, 16875, 7, "/eh-images/processor/intel-i5-10400.jpg"],
      ["INTEL Core i5 10400F 10th Generation Processor", 10295, 10295, 0, "/eh-images/processor/intel-i5-10400f.jpg"],
      ["AMD Ryzen Threadripper PRO 5955WX Workstation 5th Generation Processor", 98355, 149699, 34, "/eh-images/processor/ryzen-tr-5955wx.webp"],
      ["AMD Ryzen 5 3600 3rd Generation Processor", 8775, 25200, 65, "/eh-images/processor/ryzen5-3600.webp"]
    ]},

    'motherboard': { pool:'mobo', items:[
      ["ASUS TUF Gaming B650 Plus DDR5 AMD Motherboard", 21299, 39999, 47, "/eh-images/motherboard/asus-tuf-b650-plus.jpg"],
      ["GIGABYTE Z790 UD DDR5 Intel Motherboard", 21845, 25999, 16, "/eh-images/motherboard/gigabyte-z790-ud.webp"],
      ["MSI Pro B760M-P DDR4 Intel Motherboard", 11297, 15599, 28, "/eh-images/motherboard/msi-pro-b760m-p-ddr4.webp"],
      ["ASUS Prime B760M-A DDR5 Intel Motherboard", 13491, 19999, 33, "/eh-images/motherboard/asus-prime-b760m-a-ddr5.webp"],
      ["MSI MPG B760I Edge Wifi DDR5 Intel Motherboard", 23145, 29999, 23, "/eh-images/motherboard/msi-mpg-b760i-edge.webp"],
      ["MSI Pro B650M-P DDR5 AMD Motherboard", 10645, 16999, 37, "/eh-images/motherboard/msi-pro-b650m-p.webp"],
      ["GIGABYTE B760M DS3H DDR5 Intel Motherboard", 11848, 16699, 29, "/eh-images/motherboard/gigabyte-b760m-ds3h.webp"],
      ["MSI Pro B650M-A Wifi DDR5 AMD Motherboard", 14095, 25000, 44, "/eh-images/motherboard/msi-pro-b650m-a-wifi.webp"],
      ["ASUS EX-B760M-V5 DDR4 Intel Motherboard", 9576, 15999, 40, "/eh-images/motherboard/asus-ex-b760m-v5-ddr4.webp"],
      ["MSI MPG B650 Edge Wifi DDR5 AMD Motherboard", 24848, 49999, 50, "/eh-images/motherboard/msi-mpg-b650-edge.webp"],
      ["MSI Pro B760M-P DDR5 Intel Motherboard", 11748, 23999, 51, "/eh-images/motherboard/msi-pro-b760m-p-ddr5.webp"],
      ["GIGABYTE B760M Aorus Pro AX DDR5 Intel Motherboard", 19405, 35999, 46, "/eh-images/motherboard/gigabyte-b760m-aorus-pro-ax.jpg"],
      ["MSI Z790 Gaming Plus Wifi DDR5 Intel Motherboard", 23598, 44999, 48, "/eh-images/motherboard/msi-z790-gaming-plus.webp"],
      ["MSI Pro B760M-E DDR5 Intel Motherboard", 8905, 16466, 46, "/eh-images/motherboard/msi-pro-b760m-e.webp"],
      ["MSI Pro B650M-B DDR5 AMD Motherboard", 8433, 14246, 41, "/eh-images/motherboard/msi-pro-b650m-b.webp"]
    ]},

    'nvidia-graphics-card': { pool:'gpu', items:[
      ["ZOTAC Gaming GeForce RTX 3080 Ti Trinity 12GB", 104500, 162999, 36, "/eh-images/nvidia-graphics-card/zotac-rtx-3080ti.jpg"],
      ["COLORFUL GeForce RTX 4070 Ti NB EX-V Battle AX Gaming 12GB", 65000, 84500, 23, "/eh-images/nvidia-graphics-card/colorful-rtx-4070ti.webp"],
      ["ZOTAC Gaming GeForce RTX 4060 Solo OC 8GB", 23000, 39999, 42, "/eh-images/nvidia-graphics-card/zotac-rtx-4060-solo.webp"],
      ["GIGABYTE GeForce RTX 4060 Ti Gaming OC 8GB", 41755, 59999, 30, "/eh-images/nvidia-graphics-card/gigabyte-rtx-4060ti-gaming.jpg"],
      ["MSI GeForce RTX 4070 Ti Super Ventus 3X OC 16GB", 73000, 116699, 37, "/eh-images/nvidia-graphics-card/msi-rtx-4070ti-super.webp"],
      ["MSI GeForce RTX 4070 Super Ventus 2X OC White 12GB", 61595, 85699, 28, "/eh-images/nvidia-graphics-card/msi-rtx-4070-super-white.png"],
      ["COLORFUL GeForce RTX 4070 Ti Super NB EX 16GB", 73000, 124879, 42, "/eh-images/nvidia-graphics-card/colorful-rtx-4070ti-super.webp"],
      ["MSI GeForce RTX 4070 Super Ventus 2X OC 12GB", 57595, 86599, 33, "/eh-images/nvidia-graphics-card/msi-rtx-4070-super.webp"],
      ["GIGABYTE GeForce RTX 4060 Ti Aero OC 8GB", 46599, 59999, 22, "/eh-images/nvidia-graphics-card/gigabyte-rtx-4060ti-aero.webp"],
      ["ZOTAC Gaming GeForce RTX 4060 Ti Twin Edge OC White 8GB", 40899, 52500, 22, "/eh-images/nvidia-graphics-card/zotac-rtx-4060ti-white.webp"],
      ["GIGABYTE GeForce RTX 4060 Ti Eagle OC 8GB", 41095, 59999, 32, "/eh-images/nvidia-graphics-card/gigabyte-rtx-4060ti-eagle-oc.jpg"],
      ["COLORFUL GeForce RTX 4060 Ti NB Duo V Battle AX 8GB", 34999, 46699, 25, "/eh-images/nvidia-graphics-card/colorful-rtx-4060ti-duo.webp"],
      ["GIGABYTE GeForce RTX 4060 Ti Eagle 8GB", 39999, 59999, 33, "/eh-images/nvidia-graphics-card/gigabyte-rtx-4060ti-eagle.webp"],
      ["GIGABYTE GeForce RTX 3050 WindForce OC V2 8GB", 30945, 30945, 0, "/eh-images/nvidia-graphics-card/gigabyte-rtx-3050-windforce.webp"],
      ["COLORFUL GeForce RTX 4060 NB Duo 8GB", 28444, 36699, 22, "/eh-images/nvidia-graphics-card/colorful-rtx-4060-duo.webp"]
    ]},

    'amd-graphics-card': { pool:'gpu', items:[
      ["ASUS Dual Radeon RX 7600 OC Edition 8GB AMD Graphic Card", 25599, 47999, 47, "/eh-images/amd-graphics-card/asus-dual-rx7600-oc-8gb.webp"],
      ["SAPPHIRE Radeon RX 7700 XT Nitro+ Gaming OC 12GB AMD Graphic Card", 45870, 66999, 32, "/eh-images/amd-graphics-card/sapphire-rx7700xt-nitro-12gb.webp"],
      ["SAPPHIRE Radeon Pulse RX 7900 XT 20GB AMD Graphic Card", 73105, 109985, 34, "/eh-images/amd-graphics-card/sapphire-pulse-rx7900xt-20gb.webp"],
      ["SAPPHIRE Radeon Pulse RX 7900 XTX 24GB AMD Graphic Card", 109245, 130000, 16, "/eh-images/amd-graphics-card/sapphire-pulse-rx7900xtx-24gb.webp"],
      ["SAPPHIRE Radeon Pulse RX 7600 XT 16GB AMD Graphic Card", 29500, 39699, 26, "/eh-images/amd-graphics-card/sapphire-pulse-rx7600xt-16gb.webp"],
      ["SAPPHIRE Radeon Pulse RX 7600 8GB AMD Graphic Card", 22995, 36624, 37, "/eh-images/amd-graphics-card/sapphire-pulse-rx7600-8gb.jpg"],
      ["SAPPHIRE Nitro+ AMD Radeon RX 7900 XTX Gaming 24GB AMD Graphic Card", 102994, 129999, 21, "/eh-images/amd-graphics-card/sapphire-nitro-rx7900xtx-24gb.webp"],
      ["SAPPHIRE Pulse Radeon RX 7700 XT 12GB AMD Graphic Card", 42799, 56899, 25, "/eh-images/amd-graphics-card/sapphire-pulse-rx7700xt-12gb.jpg"],
      ["ASUS TUF Gaming Radeon RX 7900 XTX OC Edition 24GB AMD Graphic Card", 90999, 149999, 39, "/eh-images/amd-graphics-card/asus-tuf-rx7900xtx-24gb.webp"],
      ["ASUS ROG Strix Radeon RX 560 V2 4GB AMD Graphic Card", 8995, 25999, 65, "/eh-images/amd-graphics-card/asus-rog-strix-rx560-4gb.webp"],
      ["ASUS Dual Radeon RX 7700 XT OC Edition 12GB AMD Graphic Card", 40495, 56246, 28, "/eh-images/amd-graphics-card/asus-dual-rx7700xt-12gb.webp"],
      ["ASUS Dual Radeon RX 7800 XT OC Edition 16GB AMD Graphic Card", 47095, 69666, 32, "/eh-images/amd-graphics-card/asus-dual-rx7800xt-16gb.webp"],
      ["ASROCK Radeon RX 7900 XT Phantom Gaming OC 20GB AMD Graphic Card", 57000, 90000, 37, "/eh-images/amd-graphics-card/asrock-rx7900xt-phantom-20gb.webp"],
      ["ASROCK Radeon RX 7900 XTX Phantom Gaming OC 24GB AMD Graphic Card", 92895, 110000, 16, "/eh-images/amd-graphics-card/asrock-rx7900xtx-phantom-24gb.webp"],
      ["ASROCK Radeon RX 7900 XTX OC 24GB AMD Graphic Card", 92604, 149999, 38, "/eh-images/amd-graphics-card/asrock-rx7900xtx-taichi-24gb.jpg"]
    ]},

    'ram': { pool:'ram', items:[
      ["CORSAIR Vengeance RGB Pro 8GB (8GBx1) 3600MHz DDR4 RAM (CL18)", 6150, 8990, 32, "/eh-images/ram/corsair-vengeance-rgb-pro-8gb.jpg"],
      ["G.SKILL Ripjaws 32GB (32GBx1) 3200MHz DDR4 Laptop RAM (CL22)", 6105, 8699, 30, "/eh-images/ram/gskill-ripjaws-32gb-laptop.webp"],
      ["ADATA XPG Spectrix D50 RGB 16GB (8GBx2) 3200MHz DDR4 RAM White (CL16)", 9150, 13500, 32, "/eh-images/ram/adata-spectrix-d50-16gb-white.jpg"],
      ["ADATA XPG Spectrix D50 RGB 8GB (8GBx1) 3200MHz DDR4 RAM (CL16)", 1999, 6999, 71, "/eh-images/ram/adata-spectrix-d50-8gb.jpg"],
      ["TEAMGROUP T-Force Delta RGB 8GB (8GBx1) 3200MHz DDR4 RAM White (CL16)", 1959, 8280, 76, "/eh-images/ram/teamgroup-delta-8gb-white.png"],
      ["TEAMGROUP T-Force Delta RGB 16GB (16GBx1) 3200MHz DDR4 RAM White (CL16)", 3575, 13601, 74, "/eh-images/ram/teamgroup-delta-16gb-white.png"],
      ["ADATA XPG Gammix D20 32GB (32GBx1) 3200MHz DDR4 RAM (CL16)", 6899, 14999, 54, "/eh-images/ram/adata-gammix-d20-32gb.jpg"],
      ["ADATA XPG Spectrix D60G RGB 16GB (8GBx2) 3200MHz DDR4 RAM (CL16)", 8970, 15000, 40, "/eh-images/ram/adata-spectrix-d60g-16gb.jpg"],
      ["KINGSTON Fury Beast 8GB (8GBx1) 3200MHz DDR4 RAM Black (CL16)", 5125, 8000, 36, "/eh-images/ram/kingston-fury-beast-8gb.webp"],
      ["CRUCIAL 8GB (8GBx1) 3200MHz DDR4 Laptop RAM (CL22)", 7499, 7499, 0, "/eh-images/ram/crucial-8gb-laptop.webp"],
      ["CORSAIR Dominator Platinum RGB 32GB (16GBx2) 7000MHz DDR5 RAM (CL34)", 17996, 26555, 32, "/eh-images/ram/corsair-dominator-platinum-32gb-ddr5.webp"],
      ["TEAMGROUP T-Force Delta RGB 8GB (8GBx1) 3200MHz DDR4 RAM Black (CL16)", 6500, 8280, 21, "/eh-images/ram/teamgroup-delta-8gb-black.jpg"],
      ["CRUCIAL 4GB (4GBx1) 2666MHz DDR4 Laptop RAM (CL19)", 1540, 4999, 69, "/eh-images/ram/crucial-4gb-laptop.webp"],
      ["CRUCIAL 16GB (16GBx1) 3200MHz DDR4 Laptop RAM (CL22)", 13235, 13235, 0, "/eh-images/ram/crucial-16gb-laptop.jpg"],
      ["ADATA 32GB (32GBx1) 5600MHz SO-DIMM DDR5 Laptop RAM (CL46)", 36075, 36075, 0, "/eh-images/ram/adata-32gb-sodimm-ddr5.png"]
    ]},

    'storage': { pool:'storage', items:[
      ["ADATA XPG Gammix S5 256GB M.2 NVMe Gen3 Solid State Drive (SSD)", 1905, 6500, 71, "/eh-images/storage/adata-gammix-s5-256.webp"],
      ["ADATA XPG SX6000 Pro 256GB M.2 NVMe Gen3 Solid State Drive (SSD)", 4000, 8999, 56, "/eh-images/storage/adata-sx6000-pro-256.webp"],
      ["WESTERN DIGITAL Green 120GB 2.5 SATA Gen 3 Internal Solid State Drive (SSD)", 2050, 3100, 34, "/eh-images/storage/wd-green-120-sata.webp"],
      ["TEAM GROUP T-Force Vulcan Z 256GB 2.5 SATA SATA 3 Solid State Drive (SSD)", 2015, 2999, 33, "/eh-images/storage/teamgroup-vulcanz-256.webp"],
      ["WESTERN DIGITAL Green 240GB M.2 SATA SATA 3 Solid State Drive (SSD)", 2299, 4300, 47, "/eh-images/storage/wd-green-240-m2.jpg"],
      ["SAMSUNG 980 1TB M.2 NVME Gen3 Internal Solid State Drive (SSD)", 13000, 16199, 20, "/eh-images/storage/samsung-980-1tb.webp"],
      ["TEAMGROUP MP33 Pro 1TB M.2 NVME Gen3 Solid State Drive (SSD)", 5199, 11125, 53, "/eh-images/storage/teamgroup-mp33-pro-1tb.gif"],
      ["ADATA XPG Gammix S11 Pro 256GB M.2 NVMe Gen3 Solid State Drive (SSD)", 2595, 8000, 68, "/eh-images/storage/adata-s11-pro-256.jpg"],
      ["TEAM GROUP T-Force Vulcan Z 1TB 2.5 SATA SATA 3 Solid State Drive (SSD)", 17498, 17498, 0, "/eh-images/storage/teamgroup-vulcanz-1tb.webp"],
      ["KINGSTON A400 240GB 2.5 SATA SATA 3 Internal Solid State Drive (SSD)", 6075, 6075, 0, "/eh-images/storage/kingston-a400-240.webp"],
      ["ANT ESPORTS 690 Neo Pro 256GB M.2 NVMe Gen3 Solid State Drive (SSD)", 2899, 6499, 55, "/eh-images/storage/ant-690-neo-pro-256.webp"],
      ["WESTERN DIGITAL Blue SA510 500GB 2.5 SATA SATA 3 Solid State Drive (SSD)", 8463, 11900, 29, "/eh-images/storage/wd-blue-sa510-500.webp"],
      ["CORSAIR MP600 Pro NH 1TB M.2 NVME Gen4 Solid State Drive (SSD)", 16715, 19999, 16, "/eh-images/storage/corsair-mp600-pro-nh-1tb.webp"],
      ["CORSAIR MP600 Pro LPX 1TB M.2 NVME Gen4 Solid State Drive (SSD)", 15555, 25999, 40, "/eh-images/storage/corsair-mp600-pro-lpx-1tb.webp"],
      ["ADATA Legend 710 1TB M.2 NVME Gen3 Internal Solid State Drive (SSD)", 16755, 19999, 16, "/eh-images/storage/adata-legend-710-1tb.webp"]
    ]},

    'cabinet': { pool:'cabinet', items:[
      ["LIAN LI O11 Dynamic EATX Mid Tower Cabinet (White)", 13299, 16999, 22, "/eh-images/cabinet/lianli-o11-white.jpg"],
      ["COOLER MASTER Masterbox TD500 Mesh EATX Mid Tower Cabinet (White)", 7999, 13000, 38, "/eh-images/cabinet/cm-td500-white.jpg"],
      ["GAMDIAS Argus E4 Elite ATX Mid Tower Cabinet (White)", 3844, 5049, 24, "/eh-images/cabinet/gamdias-argus-e4-white.webp"],
      ["CORSAIR iCUE 5000X RGB ATX Mid Tower Cabinet (Black)", 15499, 19500, 21, "/eh-images/cabinet/corsair-5000x-black.jpg"],
      ["CORSAIR iCUE 7000X RGB ATX Full Tower Cabinet (Black)", 29695, 39000, 24, "/eh-images/cabinet/corsair-7000x-black.webp"],
      ["COOLER MASTER CMP 520 ATX ARGB Mid Tower Cabinet (Black)", 5015, 6499, 23, "/eh-images/cabinet/cm-cmp520-black.jpg"],
      ["ANT ESPORTS 690 Air ARGB ATX Mid Tower Cabinet (White)", 6494, 10299, 37, "/eh-images/cabinet/ant-690-air-white.webp"],
      ["MSI MAG Forge 111R ARGB ATX Mid Tower Cabinet (Black)", 2999, 5949, 50, "/eh-images/cabinet/msi-forge-111r-black.jpg"],
      ["ANT ESPORTS ICE-320TG RGB ATX Mid Tower Cabinet (Black)", 2891, 5999, 52, "/eh-images/cabinet/ant-ice320tg-black.jpg"],
      ["ANT ESPORTS Graffiti ATX Mid Tower Cabinet (Black)", 4295, 8099, 47, "/eh-images/cabinet/ant-graffiti-black.webp"],
      ["ANT ESPORTS ICE-4000 RGB Mesh ATX Mid Tower Cabinet (Black)", 5195, 7599, 32, "/eh-images/cabinet/ant-ice4000-black.webp"],
      ["ANT ESPORTS 250 Air RGB ATX Mid Tower Cabinet (Black)", 2800, 7000, 60, "/eh-images/cabinet/ant-250-air-black.webp"],
      ["ANT ESPORTS SX5 ARGB ATX Mid Tower Cabinet (Black)", 3375, 5199, 35, "/eh-images/cabinet/ant-sx5-black.webp"],
      ["ANT ESPORTS 200 Air Mini Mesh MATX Mini Tower Cabinet (White)", 3066, 6999, 56, "/eh-images/cabinet/ant-200-air-white.webp"],
      ["CORSAIR 3000D RGB Airflow ATX Mid Tower Cabinet (Black)", 8395, 13999, 40, "/eh-images/cabinet/corsair-3000d-black.webp"]
    ]},

    'cpu-cooler': { pool:'cooler', items:[
      ["DEEPCOOL LT360 Vision ARGB 360mm CPU Liquid Cooler (Black)", 16499, 22237, 26, "/eh-images/cpu-cooler/deepcool-lt360-vision.jpg"],
      ["ANT ESPORTS ICEStorm 360 ARGB 360mm AIO Liquid Cooler (Black)", 5850, 5850, 0, "/eh-images/cpu-cooler/ant-esports-icestorm-360.webp"],
      ["DEEPCOOL LM360 V2 ARGB 360mm CPU Liquid Cooler (Black)", 10525, 14999, 30, "/eh-images/cpu-cooler/deepcool-lm360-v2.jpg"],
      ["DEEPCOOL LD240 ARGB 240mm CPU Liquid Cooler (Black)", 6213, 10314, 40, "/eh-images/cpu-cooler/deepcool-ld240.jpg"],
      ["DEEPCOOL LM240 ARGB 240mm CPU Liquid Cooler (Black)", 9250, 10999, 16, "/eh-images/cpu-cooler/deepcool-lm240.webp"],
      ["DEEPCOOL AG400 ARGB Single Tower CPU Air Cooler (White)", 2041, 3389, 40, "/eh-images/cpu-cooler/deepcool-ag400.jpg"],
      ["DEEPCOOL AG400 Plus Single Tower CPU Air Cooler (Black)", 2615, 4342, 40, "/eh-images/cpu-cooler/deepcool-ag400-plus.jpg"],
      ["DEEPCOOL AG500 Single Tower CPU Air Cooler (Black)", 2510, 3199, 22, "/eh-images/cpu-cooler/deepcool-ag500.jpg"],
      ["DEEPCOOL AG620 Dual Tower CPU Air Cooler (Black)", 3867, 5999, 36, "/eh-images/cpu-cooler/deepcool-ag620.jpg"],
      ["DEEPCOOL AK400 Single Tower CPU Air Cooler (Black)", 2488, 4130, 40, "/eh-images/cpu-cooler/deepcool-ak400.jpg"],
      ["DEEPCOOL AK400 Zero Dark Single Tower CPU Air Cooler (Black)", 3257, 4299, 24, "/eh-images/cpu-cooler/deepcool-ak400-zero-dark.jpg"],
      ["DEEPCOOL AK400 Digital Single Tower CPU Air Cooler with ARGB LED Strips", 3732, 4999, 25, "/eh-images/cpu-cooler/deepcool-ak400-digital.jpg"],
      ["DEEPCOOL AK500 Single Tower CPU Air Cooler (Black)", 4071, 6799, 40, "/eh-images/cpu-cooler/deepcool-ak500.jpg"],
      ["DEEPCOOL AK500 Digital Single Tower CPU Air Cooler with Status Display", 5499, 5499, 0, "/eh-images/cpu-cooler/deepcool-ak500-digital.jpg"],
      ["MSI MAG CoreLiquid A13 240 ARGB 240mm CPU Liquid Cooler", 5390, 5390, 0, "/eh-images/cpu-cooler/msi-mag-coreliquid-a13-240.jpg"],
      ["MSI MAG CoreLiquid A13 360 ARGB 360mm CPU Liquid Cooler", 6770, 6770, 0, "/eh-images/cpu-cooler/msi-mag-coreliquid-a13-360.jpg"],
      ["MSI MAG CoreLiquid I240 ARGB 240mm CPU Liquid Cooler (Black)", 8499, 8499, 0, "/eh-images/cpu-cooler/msi-mag-coreliquid-i240.jpg"],
      ["MSI MAG CoreLiquid I360 ARGB 360mm CPU Liquid Cooler (Black)", 12397, 15799, 22, "/eh-images/cpu-cooler/msi-mag-coreliquid-i360.jpg"],
      ["MSI MAG CoreLiquid E240 ARGB 240mm CPU Liquid Cooler (Black)", 7994, 12999, 39, "/eh-images/cpu-cooler/msi-mag-coreliquid-e240.jpg"],
      ["LIAN LI Galahad 360 ARGB 360mm CPU Liquid Cooler (Black)", 10499, 10876, 3, "/eh-images/cpu-cooler/lianli-galahad-360-black.jpg"],
      ["COOLER MASTER Hyper T20 Single Tower CPU Air Cooler (Black)", 1055, 1299, 19, "/eh-images/cpu-cooler/coolermaster-hyper-t20.webp"],
      ["COOLER MASTER ML360 illusion ARGB 360mm CPU Liquid Cooler (Black)", 11495, 11495, 0, "/eh-images/cpu-cooler/coolermaster-ml360-illusion.webp"],
      ["LIAN LI Galahad 360 ARGB 360mm CPU Liquid Cooler With Uni Fan SL Edition", 12000, 14338, 16, "/eh-images/cpu-cooler/lianli-galahad-360-sl.jpg"],
      ["ANTEC Frigus Air 400 ARGB 120mm Single Tower CPU Air Cooler (Black)", 2639, 4700, 44, "/eh-images/cpu-cooler/antec-frigus-air-400.webp"],
      ["COOLER MASTER Hyper 212 Halo ARGB Single Tower CPU Air Cooler (White)", 3398, 4999, 32, "/eh-images/cpu-cooler/coolermaster-hyper-212-halo-white.webp"],
      ["COOLER MASTER MasterLiquid PL360 Flux Edition ARGB 360mm CPU Liquid Cooler (White)", 14685, 26999, 46, "/eh-images/cpu-cooler/coolermaster-pl360-flux-white.webp"],
      ["MSI MAG CoreLiquid C360 ARGB 360mm CPU Liquid Cooler", 6000, 9148, 34, "/eh-images/cpu-cooler/msi-mag-coreliquid-c360.webp"],
      ["DEEPCOOL INFINITY LT720 ARGB 360mm CPU Liquid Cooler (Black)", 8405, 15999, 47, "/eh-images/cpu-cooler/deepcool-lt720-black.webp"],
      ["MSI MAG CoreLiquid M240 AIO Liquid Cooler (Black)", 6399, 7194, 11, "/eh-images/cpu-cooler/msi-mag-coreliquid-m240.jpg"],
      ["MSI MAG CoreLiquid M360 ARGB AIO Liquid Cooler (Black)", 8408, 9248, 9, "/eh-images/cpu-cooler/msi-mag-coreliquid-m360.webp"],
      ["ANTEC T120 RGB 120mm Single Tower CPU Air Cooler (Black)", 750, 923, 19, "/eh-images/cpu-cooler/antec-t120-rgb.webp"],
      ["ANTEC A400i Neon RGB Lighting Single Tower Air Cooler (Black)", 1495, 1547, 3, "/eh-images/cpu-cooler/antec-a400i-neon.jpg"],
      ["THERMALTAKE TH240 ARGB 240mm CPU Liquid Cooler (Black)", 5718, 12590, 55, "/eh-images/cpu-cooler/thermaltake-th240.webp"],
      ["LIAN LI Galahad 360 ARGB 360mm CPU Liquid Cooler (White)", 11499, 11499, 0, "/eh-images/cpu-cooler/lianli-galahad-360-white.jpg"]
    ]},

    'power-supply': { pool:'psu', items:[
      ["ANT ESPORTS FP750B 750W 80+ Bronze Non Modular ATX 2.0 Power Supply", 4345, 8299, 48, "/eh-images/power-supply/ant-fp750b.jpg"],
      ["ASUS ROG Loki SFX-L 750W 80 + Platinum Fully Modular ITX 3.0 Power Supply", 15185, 17899, 15, "/eh-images/power-supply/asus-loki-750.webp"],
      ["MSI MPG A1000G 1000W 80 + Gold Fully Modular ATX 3.0 Power Supply", 14798, 18000, 18, "/eh-images/power-supply/msi-a1000g.webp"],
      ["Deepcool PX1000P ATX 3.0 80+ Platinum Fully Modular PSU (1000W)", 15674, 29599, 47, "/eh-images/power-supply/deepcool-px1000p.webp"],
      ["Deepcool PX1300P ATX 3.0 80+ Platinum Fully Modular PSU (1300W)", 20444, 39599, 48, "/eh-images/power-supply/deepcool-px1300p.jpg"],
      ["DEEPCOOL PL650D 650W ATX 3.0 80+ Bronze Non Modular Power Supply", 4596, 7499, 39, "/eh-images/power-supply/deepcool-pl650d.webp"],
      ["NZXT C1000 80+ Gold Fully Modular Power Supply (1000 W)", 12999, 20999, 38, "/eh-images/power-supply/nzxt-c1000.webp"],
      ["ANT ESPORTS FP550B 550W 80+ Bronze Non Modular ATX 2.0 Power Supply", 3395, 5699, 40, "/eh-images/power-supply/ant-fp550b.webp"],
      ["NZXT C750 750W 80 + Gold Fully Modular ATX 2.0 Power Supply", 7350, 10999, 33, "/eh-images/power-supply/nzxt-c750.jpg"],
      ["ANTEC NE1300G MATX 1300W 80+ Gold Fully Modular ATX 3.0 Power Supply", 17985, 21499, 16, "/eh-images/power-supply/antec-ne1300g.webp"],
      ["NZXT C1500 1500W 80+ Platinum Fully Modular ATX 3.1 Power Supply", 29898, 39699, 25, "/eh-images/power-supply/nzxt-c1500.jpg"],
      ["ANTEC CSK 750H 750W 80+ Bronze Fully Modular ATX 2.0 Power Supply", 5595, 7899, 29, "/eh-images/power-supply/antec-csk750h.webp"],
      ["ANTEC NE850G M 850W Black 80 + Gold Fully Modular ATX 2.0 Power Supply", 7999, 12456, 36, "/eh-images/power-supply/antec-ne850g-m.jpg"],
      ["ANTEC NE1000G 1000W 80+ Gold Fully Modular ATX 3.0 Power Supply (White)", 15715, 19366, 19, "/eh-images/power-supply/antec-ne1000g-white.webp"],
      ["ANTEC NE850G M 850W 80+ Gold Fully Modular ATX 3.0 Power Supply", 9999, 20647, 52, "/eh-images/power-supply/antec-ne850g-m-atx3.jpg"]
    ]},

    'monitor': { pool:'monitor', items:[
      ["MSI Pro MP242C 24 Inch FHD 75Hz VA Panel 98% SRGB 1ms AMD Free Sync Professional Business Monitor", 9278, 13548, 32, "/eh-images/monitor/msi-mp242c.webp"],
      ["ACER EB321HQU 32 Inch QHD 60Hz IPS Panel 104% SRGB 4MS IPS Gaming Monitor", 14199, 35999, 61, "/eh-images/monitor/acer-eb321hqu.jpg"],
      ["ACER Aopen 20CH1Q 19.5 Inch FHD 60Hz TN Panel 99% SRGB 5MS Gaming Monitor", 5519, 79999, 93, "/eh-images/monitor/acer-aopen-20ch1q.jpg"],
      ["VIEWSONIC VA2406-H 24 Inch FHD 75Hz VA Panel 104% SRGB 1MS AMD Freesync Gaming Monitor", 5650, 17100, 67, "/eh-images/monitor/viewsonic-va2406h.jpg"],
      ["LG 27MP450-B 27 Inch FHD 75Hz IPS Panel 72% SRGB 5MS AMD Free Sync IPS Business Monitor", 10494, 16999, 38, "/eh-images/monitor/lg-27mp450b.webp"],
      ["SAMSUNG Odyssey G6 LS27DG600SWXXL 27 Inch QHD 360Hz OLED", 80965, 116435, 30, "/eh-images/monitor/samsung-odyssey-g6.png"],
      ["VIEWSONIC VX2758A-2K-PRO-3 27 Inch QHD 240Hz IPS Panel", 20995, 36000, 42, "/eh-images/monitor/viewsonic-vx2758a.webp"],
      ["LG UltraGear 27GN60R-B 27 Inch FHD 144Hz IPS Panel", 15798, 19999, 21, "/eh-images/monitor/lg-27gn60rb.webp"],
      ["ACER UT222Q 21.5 Inch FHD 75Hz IPS Panel", 18299, 33000, 45, "/eh-images/monitor/acer-ut222q.png"],
      ["VIEWSONIC VX2276-SMHD 27 Inch FHD 75Hz IPS Panel", 15598, 19800, 21, "/eh-images/monitor/viewsonic-vx2276.webp"],
      ["VIEWSONIC TD2230 22 Inch FHD 60Hz IPS Panel", 24894, 35000, 29, "/eh-images/monitor/viewsonic-td2230.webp"],
      ["BENQ RD240Q 24 Inch QHD 60Hz IPS Panel", 30498, 42500, 28, "/eh-images/monitor/benq-rd240q.webp"],
      ["LG UltraGear 27GN650-B 27 Inch FHD 144Hz IPS Panel", 12000, 32499, 63, "/eh-images/monitor/lg-27gn650b.jpg"],
      ["LG UltraGear 27GP850-B 27 Inch QHD 165Hz IPS Panel", 31999, 40000, 20, "/eh-images/monitor/lg-27gp850b.webp"],
      ["LG 27QN600-B 27 Inch 2K 75Hz IPS Panel", 20895, 28769, 27, "/eh-images/monitor/lg-27qn600b.png"]
    ]},

    'wifi-adapter': { pool:'mobo', items:[
      ["TPLink TL-WN725N 150Mbps Wireless N Nano USB Adapter", 510, 999, 49, "/eh-images/wifi-adapter/tl-wn725n.jpg"],
      ["TPLink Archer T600U Nano AC600 Nano Wireless USB Adapter", 1128, 1200, 6, "/eh-images/wifi-adapter/archer-t600u-nano.jpg"],
      ["TPLink Archer T2UB Nano AC600 Wi-Fi Bluetooth 4.2 USB Adapter", 1145, 1699, 33, "/eh-images/wifi-adapter/archer-t2ub-nano.png"],
      ["TPLink Archer T2U Nano AC600 Nano Wireless USB Adapter", 1070, 1599, 33, "/eh-images/wifi-adapter/archer-t2u-nano.jpg"],
      ["TPLink Archer T2U AC600 Wireless Dual Band USB Adapter", 999, 1599, 38, "/eh-images/wifi-adapter/archer-t2u.jpg"],
      ["TPLink Archer T3U AC1300 Mini Wireless MU-MIMO USB Adapter", 1845, 2499, 26, "/eh-images/wifi-adapter/archer-t3u.jpg"],
      ["TPLink Archer T3U Nano AC1300 Wireless MU-MIMO USB Adapter", 1399, 2199, 36, "/eh-images/wifi-adapter/archer-t3u-nano.jpg"],
      ["TPLink TL-WN821N 300Mbps Wireless N USB Adapter", 699, 1499, 53, "/eh-images/wifi-adapter/tl-wn821n.jpg"],
      ["TPLink TL-WN823N 300Mbps Mini Wireless N USB Adapter", 723, 1399, 48, "/eh-images/wifi-adapter/tl-wn823n.jpg"]
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
      ["TPLink Archer C6 AC1200 Wireless MU-MIMO Gigabit Router", 2497, 4999, 50, "/eh-images/router/archer-c6.jpg"],
      ["TPLink Archer C3150 AC3150 Wireless MU-MIMO Gigabit Router", 11466, 17999, 36, "/eh-images/router/archer-c3150.jpg"],
      ["TPLink Archer C80 AC1900 Wireless MU-MIMO Wi-Fi Router", 2999, 5999, 50, "/eh-images/router/archer-c80.jpg"],
      ["TPLink Archer C7 AC1750 Wireless Dual Band Gigabit Router", 4249, 10999, 61, "/eh-images/router/archer-c7.jpg"],
      ["TPLink Archer C60 AC1350 Wireless Dual Band Router", 2126, 4599, 54, "/eh-images/router/archer-c60.jpg"],
      ["TPLink Archer C5 AC1200 Wireless Dual Band Gigabit Router", 3635, 6999, 48, "/eh-images/router/archer-c5.jpg"],
      ["TPLink Archer C64 AC1200 Wireless MU-MIMO WiFi Router", 2399, 4799, 50, "/eh-images/router/archer-c64.jpg"],
      ["TPLink Archer C6U AC1200 Wireless MU-MIMO Gigabit Router", 2497, 5199, 52, "/eh-images/router/archer-c6u.jpg"],
      ["TPLink Archer C20 AC750 Wireless Dual Band Router", 1806, 2399, 25, "/eh-images/router/archer-c20.jpg"],
      ["TPLink Archer C50 AC1200 Wireless Dual Band Router", 1738, 2699, 36, "/eh-images/router/archer-c50.jpg"],
      ["TPLink Archer C54 AC1200 Dual Band Wi-Fi Router", 1709, 3499, 51, "/eh-images/router/archer-c54.jpg"],
      ["TPLink Archer C24 AC750 Dual-Band Wi-Fi Router", 1695, 2499, 32, "/eh-images/router/archer-c24.jpg"],
      ["TPLink TL-MR100 300 Mbps Wireless N 4G LTE Router", 3499, 6999, 50, "/eh-images/router/mr100.jpg"],
      ["TPLink Archer MR400 AC1200 Wireless Dual Band 4G LTE Router", 5974, 12999, 54, "/eh-images/router/archer-mr400.jpg"],
      ["TPLink Archer MR600 4G+ Cat6 AC1200 Wireless Dual Band Gigabit Router", 8999, 13999, 36, "/eh-images/router/archer-mr600.jpg"]
    ]},

    'lan-card': { pool:'mobo', items:[
      ["TP-Link UE330 USB 3.0 3-Port Hub & Gigabit Ethernet Adapter 2 in 1 USB Adapter", 1599, 2399, 33, "/eh-images/lan-card/ue330.jpg"],
      ["TP-Link UE300 USB 3.0 to Gigabit Ethernet Network Adapter", 999, 1899, 47, "/eh-images/lan-card/ue300.jpg"],
      ["TP-Link UE306 USB 3.0 to Gigabit Ethernet Network Adapter", 1099, 1899, 42, "/eh-images/lan-card/ue306.jpg"],
      ["TP-Link UE200 USB 2.0 to 100Mbps Ethernet Network Adapter", 799, 1399, 43, "/eh-images/lan-card/ue200.jpg"]
    ]},

    'docking-station': { pool:'mobo', items:[
      ["ANT ESPORTS AEC810 8-In-1 USB Type-C Docking Station", 841, 2399, 65, "/eh-images/docking-station/ant-aec810.webp"],
      ["ANT ESPORTS AEC210 USB Type C Docking Station With HDMI And VGA Port", 757, 1699, 55, "/eh-images/docking-station/ant-aec210.webp"],
      ["ANT ESPORTS AEC1310 13-In-1 USB Type C Docking Station With HDMI And VGA Port", 2550, 5299, 52, "/eh-images/docking-station/ant-aec1310.webp"],
      ["RAZER USB-C Dock 11-Port Adapter", 9753, 32825, 70, "/eh-images/docking-station/razer-usbc-dock.jpg"],
      ["ANT ESPORTS Dock 5 RGB Cooling and Charging Station for Sony PS5", 2200, 4999, 56, "/eh-images/docking-station/ant-dock5-rgb-ps5.webp"]
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
    'build-architectural':      {prefix:'Architectural PC',      focus:'Revit / AutoCAD / Lumion'},
    'build-3d-modelling':       {prefix:'3D Modelling PC',       focus:'ZBrush / Blender / Substance'},
    'build-vfx':                {prefix:'VFX Animation PC',      focus:'Houdini / Nuke / Maya'},
    'build-compositing':        {prefix:'Compositing PC',        focus:'Nuke / Fusion / After Effects'},
    'build-graphic-design':     {prefix:'Graphic Design PC',     focus:'Photoshop / Illustrator / InDesign'},
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
    if (CATALOG[key]) return; // real data wins
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
        const img = (typeof imgIdx === 'string') ? imgIdx : (pool[(imgIdx || 0) % pool.length] || '');
        const oosBadge = oos ? '<span class="oos">Out of stock</span>' : '';
        const cta = oos
          ? '<span class="cta disabled"><i class="fa-solid fa-ban"></i> Out of stock</span>'
          : `<a class="cta" href="https://wa.me/919166660201?text=${encodeURIComponent('Hi JM COMPUTERS, I want to get in touch about the '+name+'.')}" target="_blank" rel="noopener"><i class="fa-solid fa-comment-dots"></i> Get in touch</a>`;
        return `<article class="shop-card">
          <div class="img" style="background-image:url('${img}')">
            ${oosBadge}
          </div>
          <div class="body">
            <h3 class="name">${esc(name)}</h3>
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
