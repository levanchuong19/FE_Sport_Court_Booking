export interface Court {
  courtType: string;
  courtName: string;
  description: string;
  manager_id: string;
  prices: [
    {
      priceType: string;
      price: number;
    }
  ];
  images: [
    {
      id: string;
      imageUrl: string;
    }
  ];

  businessLocationId: string;
  yearBuild: number;
  length: number;
  width: number;
  maxPlayers: number;
}
