import { getVotingOptionImage } from '../config/voteOptions';

const normalizeNomineeName = (name) =>
  String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const splitNomineeName = (name) =>
  String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

export const getNomineePhoto = (name, categoryTitle = '') => {
  const votingOptionImage = getVotingOptionImage(categoryTitle, name);

  if (votingOptionImage) {
    return votingOptionImage;
  }

  const parts = normalizeNomineeName(name).split(' ').filter(Boolean);

  if (!parts.length) {
    return '';
  }

  const fileName = parts
    .map((part) => (part.length <= 3 ? part.toUpperCase() : `${part[0].toUpperCase()}${part.slice(1)}`))
    .join('_');

  return `/nominees/${fileName}.jpeg`;
};

export const getNomineeInitials = (name) => {
  const parts = splitNomineeName(name);

  if (!parts.length) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};
