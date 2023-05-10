export interface NewsArticle {
    id: number;
    title: string;
    author: string;
    category: string;
    image: string;
    description: string;
    isFeatured: boolean;
    published: Date;
}

export enum Categories {
    AKTUALITET = "Aktualitet",
    POLITIKE = "Politike",
    KULTURE = "Kulture",
    EKONOMI = "Ekonomi",
    RAJONI = "Rajoni",
    SPORT = "Sport",
    SHOWBIZ = "Showbiz",
}