export class AddArticleDto {
    name: string;
    categoryId: number;
    excerpt: string;
    description: string;
    price: number;
    features: {
        featureId: number;
        value: string;
    }[];
}

/*
{
    "name": "ACME SSD HD11 1TB",
    "categoryId": 5,
    "excerpt": "Kratak opis proizvoda",
    "description": "Neki malo veci opis proizvoda",
    "price": 57.68,
    "features": [
        {"featuerId": 1, "value": "1TB"},
        {"featuerId": 3, "value": "SSD"}
    ]
}

*/