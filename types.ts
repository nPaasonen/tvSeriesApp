interface Show {
    name: string;
    image?: {
      medium?: string;
      original?: string;
    };
    rating?: {
      average: number;
    };
    summary?: string;
  }

  export default Show