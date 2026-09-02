
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase usando el fallback o .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kduevgbrnffmmijdmvox.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_e8WkqQQMeAmmQ3X2jHWUig_Fy5DnULD";
const supabase = createClient(supabaseUrl, supabaseKey);

// Extraer data simulada de los strings en data.ts 
// (Para simplificar la migración en Node, copiamos los arrays críticos aquí temporalmente para inyectarlos)

const MACBOOKS = [
  { slug: "macbook-pro-13-m1-2020-256gb", model: "MacBook Pro 13\"", chip: "M1 2020", ram: "16GB", storage: "256GB SSD", price: "S/ 2,299", stock: 8, screen: "Pantalla Retina de 13.3\"", ports: "2 puertos Thunderbolt / USB 4", image: "/mac/macbook13-m12020.png" },
  { slug: "macbook-pro-16-m1-2021-512gb", model: "MacBook Pro 16\"", chip: "M1 2021", ram: "16GB", storage: "512GB SSD", price: "S/ 3,299", stock: 3, screen: "Liquid Retina XDR de 16.2\"", battery: "Hasta 21 horas de batería", ports: "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3", image: "/mac/macbook16-m12021-512.png" },
  { slug: "macbook-pro-16-m3-2024-36gb-1tb", model: "MacBook Pro 16\"", chip: "M3 2024", ram: "36GB", storage: "1TB SSD", price: "S/ 6,999", stock: 2, screen: "Liquid Retina XDR de 16.2\"", battery: "Hasta 22 horas de batería", ports: "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3", image: "/mac/macbook16-m32024-1.png" },
];

const IPHONES = [
  { slug: "iphone-13-128gb", model: "iPhone 13", chip: "A15 Bionic", ram: "4GB", storage: "128GB", screen: "6.1\" Super Retina XDR", battery: "Hasta 19 horas de video", camera: "Sistema de dos cámaras de 12 MP", price: "S/ 2,999", stock: 6, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80" },
  { slug: "iphone-15-pro-max-256gb", model: "iPhone 15 Pro Max", chip: "A17 Pro", ram: "8GB", storage: "256GB", screen: "6.7\" ProMotion 120Hz", battery: "Hasta 29 horas de video", camera: "Sistema de cámaras Pro de 48 MP con Teleobjetivo 5x", extra: "Titanio", price: "S/ 5,999", stock: 9, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80" },
  { slug: "iphone-17-pro-max-256gb", model: "iPhone 17 Pro Max", chip: "A19 Pro", ram: "12GB", storage: "256GB", screen: "6.9\" ProMotion 120Hz", battery: "Hasta 35 horas de video", camera: "Sistema de cámaras Pro ultra avanzado", extra: "Titanio", price: "S/ 7,199", stock: 2, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80" }
];

const IPADS = [
  { slug: "ipad-9th-gen-64gb", model: "iPad (9.ª generación)", chip: "A13 Bionic", storage: "64GB", screen: "10.2\" Retina", battery: "Hasta 10 horas de uso", camera: "Cámara frontal ultra gran angular de 12 MP", ports: "Conector Lightning", price: "S/ 1,499", stock: 7, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80" },
  { slug: "ipad-pro-12-9-m2-256gb", model: "iPad Pro 12.9\"", chip: "M2", storage: "256GB", screen: "12.9\" Liquid Retina XDR", battery: "Hasta 10 horas de uso", camera: "Sistema de cámaras Pro de 12 MP y LiDAR", ports: "Conector USB-C (Thunderbolt / USB 4)", extra: "Chip M2", price: "S/ 5,499", stock: 1, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80" }
];

const WATCHES = [
  { slug: "apple-watch-ultra-2", model: "Apple Watch Ultra 2", chip: "S9 SiP", size: "49mm", screen: "Pantalla Retina siempre activa (3000 nits)", battery: "Hasta 36 horas", waterResistance: "Resistencia al agua de 100m, buceo hasta 40m", extra: "Titanio", price: "S/ 3,499", stock: 2, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80" }
];

const AIRPODS = [
  { slug: "airpods-pro-2nd-gen", model: "AirPods Pro (2.ª gen)", chip: "Chip H2", audio: "Cancelación Activa de Ruido", battery: "Hasta 30h con estuche", connectivity: "Bluetooth 5.3", extra: "USB-C", price: "S/ 1,199", stock: 6, image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=800&q=80" }
];

const ACCESSORIES = [
  { slug: "apple-pencil-2", model: "Apple Pencil (2.ª gen)", type: "Stylus", compatibility: "iPad Pro, iPad Air, iPad mini", features: "Carga magnética, doble toque", connectivity: "Bluetooth", price: "S/ 599", stock: 7, image: "https://images.unsplash.com/photo-1590825316499-c2921df12117?auto=format&fit=crop&w=800&q=80" },
  { slug: "magic-keyboard-ipad-pro", model: "Magic Keyboard", type: "Teclado", compatibility: "iPad Pro 11\" y iPad Air", features: "Trackpad integrado, teclas retroiluminadas", connectivity: "Smart Connector", extra: "Para iPad", price: "S/ 1,299", stock: 1, image: "https://images.unsplash.com/photo-1590825316499-c2921df12117?auto=format&fit=crop&w=800&q=80" }
];

async function migrateData() {
  console.log("Iniciando migración a Supabase...");
  
  // Format items for Supabase schema
  const formatItem = (item, category) => ({
    model: item.model,
    slug: item.slug,
    category: category,
    price: item.price,
    stock: item.stock,
    type: item.type || '',
    compatibility: item.compatibility || '',
    features: item.features || item.audio || '',
    connectivity: item.connectivity || item.ports || '',
    screen: item.screen || item.size || '',
    processor: item.chip || '',
    storage: item.storage || '',
    memory: item.ram || '',
    camera: item.camera || '',
    battery: item.battery || '',
    extra: item.extra || item.waterResistance || '',
    image: item.image
  });

  const allProducts = [
    ...MACBOOKS.map(i => formatItem(i, 'mac')),
    ...IPHONES.map(i => formatItem(i, 'iphone')),
    ...IPADS.map(i => formatItem(i, 'ipad')),
    ...WATCHES.map(i => formatItem(i, 'watch')),
    ...AIRPODS.map(i => formatItem(i, 'airpods')),
    ...ACCESSORIES.map(i => formatItem(i, 'accesorios'))
  ];

  for (const product of allProducts) {
    // Check if exists first to avoid duplicates
    const { data: existing } = await supabase
      .from('products')
      .select('slug')
      .eq('slug', product.slug)
      .single();
      
    if (!existing) {
      const { error } = await supabase.from('products').insert([product]);
      if (error) {
        console.error(`Error insertando ${product.slug}:`, error.message);
      } else {
        console.log(`✅ Insertado: ${product.model}`);
      }
    } else {
      console.log(`⏩ Saltado (ya existe): ${product.model}`);
    }
  }
  console.log("¡Migración terminada!");
}

migrateData();
