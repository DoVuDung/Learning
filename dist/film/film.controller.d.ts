import { FilmService } from "./film.service";
export declare class FilmController {
    private readonly filmService;
    constructor(filmService: FilmService);
    getAllFilms(): Promise<{
        film_id: number;
        title: string;
        description: string | null;
        release_year: number | null;
        language_id: number;
        rental_duration: number;
        rental_rate: import("@prisma/client/runtime/library").Decimal;
        length: number | null;
        replacement_cost: import("@prisma/client/runtime/library").Decimal;
        rating: import(".prisma/client").$Enums.MPAA_RATING | null;
        last_update: Date;
        special_features: string[];
    }[]>;
}
