const methods = ['Biopsy', 'Autopsy', 'Cytology', 'Aspiration', 'Puncture', 'Scraping'];
const names = ['Skin of external ear', 'Skin', 'Adenoids', 'Abdomen', 'Heart'];
const collectors = [
    'Practitioner/collector-1',
    'Practitioner/collector-2',
    'Practitioner/collector-3',
    'Practitioner/collector-4',
    'Practitioner/collector-5',
];
const patients = [
    'Patient/alice',
    'Patient/bob',
    'Patient/dave',
    'Patient/michel',
    'Patient/martha',
];
const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

function createRandomSpecimen(id) {
    const specimenName = names[Math.floor(Math.random() * names.length)];
    const specimenLabel = labels[Math.floor(Math.random() * labels.length)];
    const collectionMethod = methods[Math.floor(Math.random() * methods.length)];
    const collectionTime = new Date().getTime().toString()
    const collector = collectors[Math.floor(Math.random() * collectors.length)];
    const patientId = patients[Math.floor(Math.random() * patients.length)];
    const owner = 'User1@org1.example.com';

    return {
        id,
        specimenName,
        specimenLabel,
        collectionMethod,
        collectionTime,
        patientId,
        collector,
        owner,
    };
}

module.exports =  { createRandomSpecimen };
