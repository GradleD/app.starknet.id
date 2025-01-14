// Discount details to fill in case of a duplicate of this page
type FreeRenewalDiscount = {
  name: string;
  image: string;
  expiry: number;
  discountMailGroupId: string;
  offer: Discount;
};

export const freeRenewalDiscount: FreeRenewalDiscount = {
  name: "The Free Renewal",
  image: "/freeRenewal/freeRenewal.webp",
  expiry: 1727308799000, // timestamp in ms 25/09/2024 23:59:59
  discountMailGroupId: "106085143136961963",
  offer: {
    durationInDays: 90, // in days
    customMessage: "3 months free",
    discountId: "X", // No need
    price: BigInt(0),
    desc: "Get a free 3-months renewal for all your .STARK domains.",
    title: { desc: "Renew your domain", catch: "for FREE" },
    image: "/freeRenewal/freeRenewal.webp",
  },
};
