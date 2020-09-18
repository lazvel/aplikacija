import * as Validator from 'class-validator';
import { ArticleFeatureComponentDto } from './article.feature.component.dto';

export class AddArticleDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 128)
    name: string;

    categoryId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10, 255)
    excerpt: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(64, 10000)
    description: string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    price: number;

    @Validator.IsArray()
    @Validator.ValidateNested({
        always: true,
    })
    features: ArticleFeatureComponentDto[];
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