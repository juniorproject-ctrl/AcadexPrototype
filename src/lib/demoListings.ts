export type ListingCondition = 'New' | 'Like New' | 'Good' | 'Fair';
export type ListingCategory =
  | 'Textbooks'
  | 'Electronics'
  | 'Study Materials'
  | 'Supplies'
  | 'Lab Equipment';

export type DemoListing = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  condition: ListingCondition;
  category: ListingCategory;
  image: string;
  seller: string;
  location: string;
  description?: string;
  createdAt: string;
  isUserListing?: boolean;
};

const LISTINGS_KEY = 'acadex_user_listings';

export const listingCategories: ListingCategory[] = [
  'Textbooks',
  'Electronics',
  'Study Materials',
  'Supplies',
  'Lab Equipment',
];

export const listingConditions: ListingCondition[] = ['New', 'Like New', 'Good', 'Fair'];

export const seedListings: DemoListing[] = [
  {
    id: 'seed-1',
    title: 'Calculus Early Transcendentals',
    subtitle: 'Stewart, 8th Edition',
    price: 120,
    condition: 'Good',
    category: 'Textbooks',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    seller: 'Talia Radwan',
    location: 'Sharjah',
    createdAt: '2026-04-20T09:30:00.000Z',
  },
  {
    id: 'seed-2',
    title: 'TI-84 Plus CE Graphing Calculator',
    subtitle: 'Texas Instruments',
    price: 550,
    condition: 'Like New',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    seller: 'Yasmeen Bilal',
    location: 'Dubai',
    createdAt: '2026-04-21T11:00:00.000Z',
  },
  {
    id: 'seed-3',
    title: 'Organic Chemistry Past Papers Bundle',
    subtitle: '5 years with model answers',
    price: 70,
    condition: 'Like New',
    category: 'Study Materials',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    seller: 'Sara Al Marzooqi',
    location: 'Al Ain',
    createdAt: '2026-04-22T13:10:00.000Z',
  },
  {
    id: 'seed-4',
    title: 'MacBook Air M1',
    subtitle: '256GB, 8GB RAM',
    price: 2000,
    condition: 'Good',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    seller: 'Jasem Fesal',
    location: 'Abu Dhabi',
    createdAt: '2026-04-19T14:15:00.000Z',
  },
  {
    id: 'seed-5',
    title: 'Engineering Drawing Kit',
    subtitle: 'Compass, triangles, templates',
    price: 95,
    condition: 'New',
    category: 'Supplies',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    seller: 'Omar Khalid',
    location: 'Dubai',
    createdAt: '2026-04-18T08:00:00.000Z',
  },
  {
    id: 'seed-6',
    title: 'Biology Lab Coat and Goggles',
    subtitle: 'Medium size, used one semester',
    price: 80,
    condition: 'Good',
    category: 'Lab Equipment',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80',
    seller: 'Noor Ahmed',
    location: 'Ajman',
    createdAt: '2026-04-17T10:45:00.000Z',
  },
  {
    id: 'seed-7',
    title: 'Physics for Scientists and Engineers',
    subtitle: 'Serway, 10th Edition',
    price: 140,
    condition: 'Good',
    category: 'Textbooks',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    seller: 'Lina Hassan',
    location: 'Dubai',
    createdAt: '2026-04-16T09:20:00.000Z',
  },
  {
    id: 'seed-8',
    title: 'iPad Air 5 with Apple Pencil',
    subtitle: '64GB, Space Gray',
    price: 2400,
    condition: 'Like New',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    seller: 'Maryam Saeed',
    location: 'Abu Dhabi',
    createdAt: '2026-04-15T15:45:00.000Z',
  },
  {
    id: 'seed-9',
    title: 'IELTS Preparation Notes',
    subtitle: 'Writing and speaking templates',
    price: 45,
    condition: 'New',
    category: 'Study Materials',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80',
    seller: 'Hind Al Nuaimi',
    location: 'Al Ain',
    createdAt: '2026-04-14T10:05:00.000Z',
  },
  {
    id: 'seed-10',
    title: 'Artist Marker Set',
    subtitle: '48 colors, barely used',
    price: 110,
    condition: 'Like New',
    category: 'Supplies',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
    seller: 'Dana Issa',
    location: 'Sharjah',
    createdAt: '2026-04-13T12:30:00.000Z',
  },
  {
    id: 'seed-11',
    title: 'Chemistry Molecular Model Kit',
    subtitle: 'Organic chemistry practice set',
    price: 65,
    condition: 'Good',
    category: 'Lab Equipment',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=900&q=80',
    seller: 'Rashid Kareem',
    location: 'Fujairah',
    createdAt: '2026-04-12T14:00:00.000Z',
  },
  {
    id: 'seed-12',
    title: 'Introduction to Algorithms',
    subtitle: 'CLRS, 4th Edition',
    price: 180,
    condition: 'Good',
    category: 'Textbooks',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    seller: 'Ahmed Tariq',
    location: 'Dubai',
    createdAt: '2026-04-11T08:50:00.000Z',
  },
  {
    id: 'seed-13',
    title: 'Sony WH-1000XM4 Headphones',
    subtitle: 'Noise cancelling, black',
    price: 600,
    condition: 'Good',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    seller: 'Fatima Al Kaabi',
    location: 'Abu Dhabi',
    createdAt: '2026-04-10T17:10:00.000Z',
  },
  {
    id: 'seed-14',
    title: 'Business Statistics Summary Pack',
    subtitle: 'Solved examples and formula sheet',
    price: 35,
    condition: 'New',
    category: 'Study Materials',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
    seller: 'Salma Noor',
    location: 'Ras Al Khaimah',
    createdAt: '2026-04-09T11:35:00.000Z',
  },
  {
    id: 'seed-15',
    title: 'Architecture Cutting Mat',
    subtitle: 'A2 size with metal ruler set',
    price: 75,
    condition: 'Like New',
    category: 'Supplies',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    seller: 'Rania Youssef',
    location: 'Sharjah',
    createdAt: '2026-04-08T13:25:00.000Z',
  },
  {
    id: 'seed-16',
    title: 'Digital Multimeter',
    subtitle: 'Engineering lab approved',
    price: 90,
    condition: 'New',
    category: 'Lab Equipment',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=80',
    seller: 'Mohammed Nasser',
    location: 'Dubai',
    createdAt: '2026-04-07T16:40:00.000Z',
  },
  {
    id: 'seed-17',
    title: 'Human Anatomy Atlas',
    subtitle: 'Color edition with notes',
    price: 150,
    condition: 'Like New',
    category: 'Textbooks',
    image: 'https://images.unsplash.com/photo-1472173148041-00294f0814a2?auto=format&fit=crop&w=900&q=80',
    seller: 'Noura Salem',
    location: 'Al Ain',
    createdAt: '2026-04-06T10:10:00.000Z',
  },
  {
    id: 'seed-18',
    title: 'Dell 27-inch 4K Monitor',
    subtitle: 'Great for design and coding',
    price: 1300,
    condition: 'Fair',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=900&q=80',
    seller: 'Khaled Jamal',
    location: 'Abu Dhabi',
    createdAt: '2026-04-05T09:55:00.000Z',
  },
  {
    id: 'seed-19',
    title: 'MCAT Revision Flashcards',
    subtitle: 'Biology, chemistry, physics sections',
    price: 85,
    condition: 'Good',
    category: 'Study Materials',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
    seller: 'Alya Rahman',
    location: 'Dubai',
    createdAt: '2026-04-04T15:15:00.000Z',
  },
  {
    id: 'seed-20',
    title: 'Scientific Calculator Casio FX-991EX',
    subtitle: 'Approved for engineering courses',
    price: 95,
    condition: 'New',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80',
    seller: 'Yousef Hamdan',
    location: 'Ajman',
    createdAt: '2026-04-03T18:05:00.000Z',
  },
  {
    id: 'seed-21',
    title: 'Mechanical Drawing Pencils Set',
    subtitle: '0.3, 0.5, and 0.7 with refills',
    price: 40,
    condition: 'Like New',
    category: 'Supplies',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    seller: 'Saeed Ali',
    location: 'Sharjah',
    createdAt: '2026-04-02T12:00:00.000Z',
  },
  {
    id: 'seed-22',
    title: 'Microscope Slide Set',
    subtitle: 'Prepared biology samples',
    price: 70,
    condition: 'Good',
    category: 'Lab Equipment',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    seller: 'Iman Farouk',
    location: 'Dubai',
    createdAt: '2026-04-01T11:15:00.000Z',
  },
  {
    id: 'seed-23',
    title: 'Linear Algebra Workbook',
    subtitle: 'Solved university exercises',
    price: 55,
    condition: 'Good',
    category: 'Textbooks',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
    seller: 'Hessa Omar',
    location: 'Abu Dhabi',
    createdAt: '2026-03-31T08:35:00.000Z',
  },
  {
    id: 'seed-24',
    title: 'Kindle Paperwhite',
    subtitle: '11th generation, 8GB',
    price: 320,
    condition: 'Like New',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    seller: 'Reem Zaki',
    location: 'Dubai',
    createdAt: '2026-03-30T14:45:00.000Z',
  },
];

export function getBadgeClasses(condition: ListingCondition) {
  switch (condition) {
    case 'New':
      return 'bg-blue-100 text-blue-700';
    case 'Like New':
      return 'bg-green-100 text-green-700';
    case 'Good':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-red-100 text-red-700';
  }
}

export function getUserListings() {
  const raw = localStorage.getItem(LISTINGS_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as DemoListing[];
  } catch {
    return [];
  }
}

export function saveUserListing(listing: DemoListing) {
  const existing = getUserListings();
  localStorage.setItem(LISTINGS_KEY, JSON.stringify([listing, ...existing]));
}

export function getAllListings() {
  return [...getUserListings(), ...seedListings].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}
