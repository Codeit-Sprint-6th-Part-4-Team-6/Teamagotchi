export const validateImage = (imageUrl: string | null) =>
  imageUrl?.includes("sprint") ||
  imageUrl?.includes("googleusercontent") ||
  imageUrl?.includes("kakaocdn")
    ? imageUrl
    : null;
