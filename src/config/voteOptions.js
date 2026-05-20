export const votingCategories = [
  {
    title: 'Favorite Food',
    slug: 'food',
    options: [
      { label: 'Pizza', image: '/nominees/food/pizza.jpg' },
      { label: 'Burger', image: '/nominees/food/burger.jpg' },
      { label: 'Fries', image: '/nominees/food/fries.jpg' },
      { label: 'Shawarma', image: '/nominees/food/shawarma.jpg' }
    ]
  },
  {
    title: 'Favorite Color',
    slug: 'colors',
    options: [
      { label: 'Blue', image: '/nominees/colors/blue.jpg' },
      { label: 'Black', image: '/nominees/colors/black.jpg' },
      { label: 'Red', image: '/nominees/colors/red.jpg' },
      { label: 'Purple', image: '/nominees/colors/purple.jpg' }
    ]
  },
  {
    title: 'Favorite Pet',
    slug: 'pet',
    options: [
      { label: 'Dog', image: '/nominees/pet/dog.jpg' },
      { label: 'Cat', image: '/nominees/pet/cat.jpg' },
      { label: 'Bunny', image: '/nominees/pet/bunny.jpg' },
      { label: 'Parrot', image: '/nominees/pet/parrot.jpg' }
    ]
  },
  {
    title: 'Favorite Drink',
    slug: 'drink',
    options: [
      { label: 'Coke', image: '/nominees/drink/coke.jpg' },
      { label: 'Fanta', image: '/nominees/drink/fanta.jpg' },
      { label: 'Tea', image: '/nominees/drink/tea.jpg' },
      { label: 'Smoothie', image: '/nominees/drink/smoothie.jpg' }
    ]
  },
  {
    title: 'Favorite Social App',
    slug: 'social_media',
    options: [
      { label: 'TikTok', image: '/nominees/social_media/tiktok.jpg' },
      { label: 'Instagram', image: '/nominees/social_media/instagram.jpg' },
      { label: 'X (Twitter)', image: '/nominees/social_media/x.jpg' },
      { label: 'Snapchat', image: '/nominees/social_media/snapchat.jpg' }
    ]
  }
];

const normalizeKey = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const optionLookupByCategory = votingCategories.reduce((categoryMap, category) => {
  const optionMap = category.options.reduce((map, option) => {
    map.set(normalizeKey(option.label), option);
    return map;
  }, new Map());

  categoryMap.set(normalizeKey(category.title), {
    ...category,
    optionMap
  });

  return categoryMap;
}, new Map());

const globalOptionLookup = votingCategories.reduce((map, category) => {
  category.options.forEach((option) => {
    map.set(normalizeKey(option.label), option);
  });

  return map;
}, new Map());

globalOptionLookup.set('x', { label: 'X (Twitter)', image: '/nominees/social_media/x.jpg' });
globalOptionLookup.set('twitter', {
  label: 'X (Twitter)',
  image: '/nominees/social_media/x.jpg'
});

export const getVotingOptionConfig = (categoryTitle, optionLabel) => {
  const normalizedOption = normalizeKey(optionLabel);
  const category = optionLookupByCategory.get(normalizeKey(categoryTitle));

  return category?.optionMap.get(normalizedOption) || globalOptionLookup.get(normalizedOption) || null;
};

export const getVotingOptionImage = (categoryTitle, optionLabel) =>
  getVotingOptionConfig(categoryTitle, optionLabel)?.image || '';
