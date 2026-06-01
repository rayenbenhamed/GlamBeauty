export const categories = [
  "Makeup",
  "Hair Coloring",
  "Hair Treatments",
  "Face Care",
  "Hands and Feet",
  "Hair Removal",
  "Nails",
  "Eyelashes",
  "Piercing"
];

export const services = [
  {
    id: "1",
    name: "Professional Makeup",
    category: "Makeup",
    duration: "60 min",
    price: 120,
    description: "High-definition glam tailored to your features."
  },
  {
    id: "2",
    name: "Bridal Makeup",
    category: "Makeup",
    duration: "90 min",
    price: 240,
    description: "Radiant bridal artistry with premium skin prep."
  },
  {
    id: "3",
    name: "Balayage",
    category: "Hair Coloring",
    duration: "150 min",
    price: 220,
    description: "Sunlit balayage for dimension and glow."
  },
  {
    id: "4",
    name: "Caviar Treatment",
    category: "Hair Treatments",
    duration: "75 min",
    price: 160,
    description: "Deep nourishment and silky restoration."
  }
];

export const packs = [
  {
    id: "pack-1",
    name: "Pack Bride",
    price: 520,
    description: "Makeup, hair styling, nails, and spa glow ritual.",
    services: ["Bridal Makeup", "Balayage", "Gel Nails"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  },
  {
    id: "pack-2",
    name: "Pack Glam",
    price: 340,
    description: "Event glam with lashes, nails, and signature blowout.",
    services: ["Professional Makeup", "Lash Extensions"],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
  },
  {
    id: "pack-3",
    name: "Pack Relax",
    price: 280,
    description: "Facial, manicure, pedicure, and scalp therapy.",
    services: ["Advanced Facial Care", "Manicure", "Pedicure"],
    image: "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5"
  }
];

export const promotions = [
  {
    id: "promo-1",
    title: "Golden Hour", 
    description: "15% off balayage and gloss treatments.",
    discount: "15%",
    dates: "May 1 - Jun 30"
  },
  {
    id: "promo-2",
    title: "Bride to Be",
    description: "Complimentary lash lift with bridal package.",
    discount: "Free add-on",
    dates: "All season"
  }
];

export const estheticians = [
  {
    id: "esth-1",
    name: "Lina Armand",
    specialty: "Bridal Makeup",
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
  },
  {
    id: "esth-2",
    name: "Yara Haddad",
    specialty: "Skin Care",
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  },
  {
    id: "esth-3",
    name: "Nadia Elmi",
    specialty: "Hair Color",
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5"
  }
];

export const galleryItems = [
  {
    id: "g1",
    title: "Pearl Blonde",
    category: "Hair",
    before: "https://images.unsplash.com/photo-1519741497674-611481863552",
    after: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  },
  {
    id: "g2",
    title: "Rose Bridal",
    category: "Makeup",
    before: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
    after: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
  },
  {
    id: "g3",
    title: "Velvet Nails",
    category: "Nails",
    before: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    after: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
  }
];

export const reviews = [
  {
    id: "r1",
    name: "Sarah M.",
    rating: 5,
    quote: "The most elegant bridal look I could imagine."
  },
  {
    id: "r2",
    name: "Imen T.",
    rating: 5,
    quote: "Every visit feels like a luxurious escape."
  }
];

export const blogPosts = [
  {
    id: "b1",
    title: "Glamour for Summer Nights",
    excerpt: "Discover the luminous palette for warm evenings.",
    date: "May 2026"
  },
  {
    id: "b2",
    title: "The Art of Balayage",
    excerpt: "Our colorists reveal the secret to depth and shine.",
    date: "April 2026"
  }
];
