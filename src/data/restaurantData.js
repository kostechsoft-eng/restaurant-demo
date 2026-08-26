export const cuisines = [
  ['Mocktails', 'https://www.baghonerestaurant.com/images/cusine/cusine_1.webp'],
  ['Chinese', 'https://www.baghonerestaurant.com/images/cusine/cusine_2.webp'],
  ['Tandoor', 'https://www.baghonerestaurant.com/images/cusine/cusine_3.webp'],
  ['Continental', 'https://www.baghonerestaurant.com/images/cusine/cusine_4.webp'],
  ['Mexican', 'https://www.baghonerestaurant.com/images/cusine/cusine_5.webp'],
  ['Indian', 'https://www.baghonerestaurant.com/images/cusine/cusine_6.webp'],
].map(([name, image]) => ({ name, image }))

export const foodCategories = ['Dinner & Dessert', 'Mexican', 'Ice Shakes', 'Beverages', 'Delicious Food', 'Desserts']

export const menuCategories = [...cuisines.map(({ name, image }) => ({ name, image })),
  ...['Dinner & Dessert', 'Ice Shakes', 'Beverages', 'Desserts'].map((name, index) => ({
    name,
    image: cuisines[(index + 2) % cuisines.length].image,
  })),
]

export const contactInfo = {
  address: 'Opp. Swaminarayan School, Hathijan, Mahemdabad Road, Ahmedabad, Gujarat 382445',
  phonePrimary: '+91 79297 55 440',
  phoneSecondary: '+91 76000 90 440',
  phonePrimaryHref: 'tel:+917929755440',
  phoneSecondaryHref: 'tel:+917600090440',
  whatsappNumber: '917600090440',
  whatsappUrl: `https://wa.me/917600090440?text=${encodeURIComponent('Hello Bagh-One Restaurant, I would like to enquire about a reservation/event booking.')}`,
  instagramUrl: 'https://www.instagram.com/baghoneofficial/',
  facebookUrl: 'https://www.facebook.com/share/1KyQ1neR3J/',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bagh-One+Restaurant+Hathijan+Ahmedabad+Gujarat+382445',
  mapEmbedUrl: 'https://www.google.com/maps?q=Bagh-One+Restaurant+Hathijan+Ahmedabad+Gujarat+382445&output=embed',
}

export const galleryImages = [1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19].map((number) => ({
  id: number,
  src: `https://www.baghonerestaurant.com/images/gallery/gallery${number}.webp`,
  alt: `Bagh-One restaurant gallery view ${number}`,
}))

const localMenuImages = [
  '/images/menu/menu-1.webp',
  '/images/menu/menu-2.webp',
  '/images/menu/menu-3.webp',
  '/images/menu/menu-4.webp',
  '/images/menu/menu-5.webp',
]

export const services = [
  'Birthday Parties',
  'Wedding Anniversary',
  'Ring Ceremonies',
  'Business Conferences',
  'Corporate Events',
  'Dinner Parties',
  'Candle Light Dinner',
].map((title, index) => ({
  title,
  image: `https://www.baghonerestaurant.com/images/service/service_${index + 1}.webp`,
  fallbackImage: localMenuImages[index % localMenuImages.length],
}))

export const testimonials = [
  {
    name: 'Paraschandra Dave', location: 'Customer',
    review: "One of the best outdoor ambiences in Ahmedabad. Dinner seating is available beside the swimming pool, with a garden waiting area and kids' play area. Food delivery is quick, and the food quality was good.",
  },
  {
    name: 'Bharti Panjwani', location: 'Customer',
    review: 'A wonderful choice for a perfect dinner date or an evening with family and friends. This place will take your heart away with its breathtaking poolside view.',
  },
  {
    name: 'GHULAM MOHD Kabir', location: 'Customer',
    review: 'Fantastic food and service in a warm, comfortable and enjoyable restaurant. The team serves delicious food with heart, while maintaining a beautiful ambience and hygienic surroundings.',
  },
  {
    name: 'Hardik Gajjar', location: 'Ahmedabad',
    review: 'An awesome place with quality food, great service and a unique concept. A must-visit with friends and family.',
  },
  {
    name: 'Sapan Patel', location: 'Ahmedabad',
    review: 'The ambience is good, the staff is wonderful and the service they provide is excellent. The food quality and taste are also very good.',
  },
]
