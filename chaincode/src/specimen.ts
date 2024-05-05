import { Object, Property } from 'fabric-contract-api';

export type SpecimenStatus =
    | 'EXTRACTED'
    | 'ORDERED'
    | 'ACCESSIONING'
    | 'GROSSING'
    | 'PROCESSING'
    | 'DIAGNOSTIC'
    | 'INFORMED';

@Object()
export class Specimen {
    @Property()
    public id: string;

    // The specimen name
    @Property()
    public name: string;

    // Identifier assigned by the collector
    @Property()
    public label: string;

    // Method used to perform collection (e.g. biopsy, cytology, aspiration, etc.)
    @Property()
    public method: string;

    // Collection time
    @Property()
    public collectionTime: number;

    // Who collected the specimen
    @Property()
    public collector: string;

    // The patient the specimen comes from
    @Property()
    public patientId: string;

    // The status of the specimen
    @Property()
    public status: SpecimenStatus;

    // The person who currently holds the specimen
    @Property()
    public owner: string;

    // The order number associated with the specimen
    @Property()
    public orderNumber?: string;

    // Identifier assigned by the lab
    @Property()
    public caseNumber?: string;

    // The time when specimen is received by the laboratory
    @Property()
    public receivedTime?: number;
}
