export const validateImage = (imageUrl: string | null) =>
  imageUrl?.includes("sprint") ? imageUrl : null;
