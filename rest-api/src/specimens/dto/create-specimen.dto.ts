import { IsDateString, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

export enum CollectionMethod {
    Biopsy = 'Biopsy',
    Autopsy = 'Autopsy',
    Cytology = 'Cytology',
    Aspiration = 'Aspiration',
    Puncture = 'Puncture',
    Scraping = 'Scraping',
}

export class CreateSpecimenDto {
    // The specimen name
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    // Identifier assigned by the collector
    @IsNotEmpty()
    @MaxLength(255)
    label: string;

    // Method used to perform collection (e.g. biopsy, cytology, aspiration, etc.)
    @IsNotEmpty()
    @IsEnum(CollectionMethod)
    method: CollectionMethod;

    // Collection time
    @IsNotEmpty()
    @IsDateString()
    collectionTime: string;

    // Who collected the specimen
    @IsNotEmpty()
    @MaxLength(255)
    collector: string;

    // The patient the specimen comes from
    @IsNotEmpty()
    @MaxLength(255)
    patientId: string;

    // The person who currently holds the specimen
    @IsNotEmpty()
    @MaxLength(255)
    owner: string;
}
