

let prompt = require('prompt-sync')();

const trips = [
    {
        id: 1,
        departure: "Safi",
        destination: "Youssoufia",
        departureTime: "07:30",
        arrivalTime: "08:30",
        price: 25,
        availableSeats: 50
    },
    {
        id: 2,
        departure: "Safi",
        destination: "Marrakech",
        departureTime: "08:00",
        arrivalTime: "10:30",
        price: 90,
        availableSeats: 50
    },
    {
        id: 3,
        departure: "Safi",
        destination: "Casablanca",
        departureTime: "09:00",
        arrivalTime: "13:00",
        price: 140,
        availableSeats: 50
    },
    {
        id: 4,
        departure: "Youssoufia",
        destination: "Marrakech",
        departureTime: "09:15",
        arrivalTime: "11:00",
        price: 65,
        availableSeats: 50
    },
    {
        id: 5,
        departure: "Youssoufia",
        destination: "Casablanca",
        departureTime: "10:00",
        arrivalTime: "13:30",
        price: 110,
        availableSeats: 50
    },
    {
        id: 6,
        departure: "Marrakech",
        destination: "Casablanca",
        departureTime: "11:30",
        arrivalTime: "14:30",
        price: 120,
        availableSeats: 50
    },
    {
        id: 7,
        departure: "Marrakech",
        destination: "Rabat",
        departureTime: "12:00",
        arrivalTime: "16:00",
        price: 150,
        availableSeats: 50
    },
    {
        id: 8,
        departure: "Casablanca",
        destination: "Rabat",
        departureTime: "14:00",
        arrivalTime: "15:15",
        price: 40,
        availableSeats: 50
    },
    {
        id: 9,
        departure: "Casablanca",
        destination: "Kenitra",
        departureTime: "15:00",
        arrivalTime: "16:45",
        price: 55,
        availableSeats: 50
    },
    {
        id: 10,
        departure: "Rabat",
        destination: "Kenitra",
        departureTime: "16:00",
        arrivalTime: "16:45",
        price: 30,
        availableSeats: 50
    },
    {
        id: 11,
        departure: "Rabat",
        destination: "Fes",
        departureTime: "17:00",
        arrivalTime: "19:30",
        price: 95,
        availableSeats: 50
    },
    {
        id: 12,
        departure: "Kenitra",
        destination: "Fes",
        departureTime: "17:30",
        arrivalTime: "20:00",
        price: 85,
        availableSeats: 50
    },
    {
        id: 13,
        departure: "Fes",
        destination: "Meknes",
        departureTime: "08:30",
        arrivalTime: "09:20",
        price: 35,
        availableSeats: 50
    },
    {
        id: 14,
        departure: "Fes",
        destination: "Oujda",
        departureTime: "10:00",
        arrivalTime: "13:30",
        price: 130,
        availableSeats: 50
    },
    {
        id: 15,
        departure: "Meknes",
        destination: "Rabat",
        departureTime: "11:00",
        arrivalTime: "13:30",
        price: 80,
        availableSeats: 50
    },
    {
        id: 16,
        departure: "Meknes",
        destination: "Casablanca",
        departureTime: "12:00",
        arrivalTime: "15:00",
        price: 105,
        availableSeats: 50
    },
    {
        id: 17,
        departure: "Casablanca",
        destination: "El Jadida",
        departureTime: "16:30",
        arrivalTime: "18:00",
        price: 50,
        availableSeats: 50
    },
    {
        id: 18,
        departure: "El Jadida",
        destination: "Safi",
        departureTime: "18:30",
        arrivalTime: "20:30",
        price: 60,
        availableSeats: 50
    },
    {
        id: 19,
        departure: "Marrakech",
        destination: "Agadir",
        departureTime: "15:00",
        arrivalTime: "18:30",
        price: 100,
        availableSeats: 50
    },
    {
        id: 20,
        departure: "Agadir",
        destination: "Safi",
        departureTime: "19:00",
        arrivalTime: "22:00",
        price: 95,
        availableSeats: 50
    }
];

function AfficherTrajets(trips) {
    console.log("======TRAJETS DISPONIBLES======");
    if (trips.length === 0) {
        console.log("Aucun trajet disponible pour le moment.");
        return;
    }
    for (let i = 0; i < trips.length; i++) {
        console.log("#", trips[i].id, trips[i].departure, "->", trips[i].destination);
        console.log("Depart :", trips[i].departureTime);
        console.log("Arrivée :", trips[i].arrivalTime);
        console.log("Prix : ", trips[i].price, "DH");
        console.log("Places disponibles : ", trips[i].availableSeats);
        console.log("    ------------------     ");
    }
}
let tickets = [];
function rechercherTrajetsId(trips, id) {
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            return trips[i];
        }
    }
    return null;
}
function trajetExiste(trips) {
    return trips != null;
}

function placeDisponible(trajet) {
    return trajet.availableSeats > 0;
}
function trouverPlaceLibre(tripId) {
    for(let num = 1; num <= 50; num++){
        let place = false;
        for(let i = 0; i < tickets.length; i++){
            if(tickets[i].tripId === tripId && tickets[i].seatNumber === num){
                place = true;
                break;
            }
        }
        if(!place){
            return num;
        }
    }
    return -1;
}
function genererIdTicket() {
    let newId = 0;
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id > newId) {
            newId = tickets[i].id;
        }
    }
    return newId + 1;
}
function creerTicket(trips, tripId, passengerName) {
    let trajet = rechercherTrajetsId(trips, tripId);
    let id = genererIdTicket();
    let seatNumber =trouverPlaceLibre(tripId);
if(seatNumber===-1){
    return null;
}

    let ticket = {
        id: id,
        passengerName: passengerName,
        tripId: tripId,
        seatNumber: seatNumber,
        price: trajet.price
    };
    return ticket;

}
function diminuerPlace(trajet) {
    trajet.availableSeats--;
}

function augmenterPlace(trajetId, trips) {
    let trajet = rechercherTrajetsId(trips, trajetId);
    if (trajet) {
        trajet.availableSeats++;
    }
}

function ajouterTicket(ticket) {
    tickets.push(ticket);
}

function acheterTicket(trips, passengerName, tripId) {

    let trajet = rechercherTrajetsId(trips, tripId);
    if (!trajetExiste(trajet)) {
        console.log("Trajet introuvable.");
        return;
    }
    if (!placeDisponible(trajet)) {
        console.log("Train complet.");
        return;
    }
    let ticket = creerTicket(trips, tripId, passengerName);
    diminuerPlace(trajet);
    ajouterTicket(ticket);
    console.log("Ticket acheté avec succès.");
    afficherTicket(ticket);
}
function afficherTicket(ticket) {
    let trajet = rechercherTrajetsId(trips, ticket.tripId);
    console.log("Ticket #" + ticket.id);
    console.log("Passager : " + ticket.passengerName);
    console.log("Trajet : " + trajet.departure, "--->" + trajet.destination);
    console.log("Place : " + ticket.seatNumber);
    console.log("Prix : " + ticket.price + " DH");
}
function afficherTicketTous() {
    console.log("======TICKETS DISPONIBLES======");
    if (tickets.length === 0) {
        console.log("Aucun ticket disponible pour le moment.");
        return;
    }
    for (let i = 0; i < tickets.length; i++) {
        afficherTicket(tickets[i]);
    }

}
function rechercherTicketParId(ticketId) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id === ticketId) {
            return tickets[i];
        }
    }
    return null;
}

function supprimerTicket(ticketId) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id === ticketId) {
            tickets.splice(i, 1);
            return;
        }
    }
}


function annulerTicket(trips, ticketId) {

    let ticket = rechercherTicketParId(ticketId);

    if (ticket === null) {
        console.log("Ticket introuvable.");
        return;
    }
    let tripId = ticket.tripId;
    supprimerTicket(ticketId);
     augmenterPlace(tripId, trips);
    console.log("Ticket annulé avec succès.");
}

function saisirNombre(message) {
    let valeur;
    do {
        valeur = prompt(message).trim();
        if (valeur === "") {
            console.log("Erreur: Vous devez entrer une valeur.");
        } else if (isNaN(valeur)) {
            console.log("Erreur: Vous devez entrer un nombre.");
            valeur = "";
        }
    } while (valeur === "");
    return Number(valeur);
}
function saisirTexte(message) {
    let valeur;
    do {
        valeur = prompt(message).trim();
        if (valeur === "") {
            console.log("Erreur: Vous devez entrer une valeur.");
        }
    } while (valeur === "");
    return valeur.toUpperCase();
}
function rechercherTicket() {
    let nom = saisirTexte("Nom du passager : ");
    let ticketsTrouves = [];
    let compteur = 0;
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].passengerName === nom) {
            ticketsTrouves[compteur] = tickets[i];
            compteur++;
        }
    }

    if (compteur === 0) {
        console.log("Aucun ticket trouvé pour " + nom);
        return;
    }

    console.log("\n--- Tickets de " + nom + " ---");

    for (let i = 0; i < compteur; i++) {
        afficherTicket(ticketsTrouves[i]);
    }
}
function filtrerTrajets() {
    let ville = saisirTexte("Ville de départ : ");
    let trajetsTrouves = [];
    let compteur = 0;
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].departure.toUpperCase() === ville) {
            trajetsTrouves[compteur] = trips[i];
            compteur++;
        }
    }
    if (compteur === 0) {
        console.log("Aucun trajet trouvé au départ de " + ville);
        return;
    }
    console.log("Résultat :");
    for (let i = 0; i < compteur; i++) {
        let t = trajetsTrouves[i];
        console.log(t.departure + " -->" + t.destination + ":" + t.price + " DH");
    }
}
function trierTrajets() {
    for (let i = 0; i < trips.length - 1; i++) {
        for (let j = 0; j < trips.length - 1 - i; j++) {
            if (trips[j].price > trips[j + 1].price) {
                let temp = trips[j];
                trips[j] = trips[j + 1];
                trips[j + 1] = temp;
            }
        }
    }
    console.log("--- Trajets triés par prix croissant ---");
    for (let i = 0; i < trips.length; i++) {
        let t = trips[i];
        console.log(t.departure + " --> " + t.destination + " : " + t.price + " DH");
    }
}

function afficherStatistiques() {
    console.log("========== STATISTIQUES ==========");
    console.log("1. Nombre total de tickets vendus : " + tickets.length);
    //2 
    let revenuTotal = 0;
    for (let i = 0; i < tickets.length; i++) {
        revenuTotal = revenuTotal + tickets[i].price;
    }
    console.log("2. Revenu total : " + revenuTotal + " DH");
}
function lancerApplication() {
    let choix;

    do {

        console.log("\n============================================================");
        console.log("                     RAILWAY MANAGER                           ");
        console.log("\n============================================================");

        console.log("1. Afficher les trajets");
        console.log("2. Acheter un ticket");
        console.log("3. Afficher les tickets");
        console.log("4. Annuler un ticket");
        console.log("5. Rechercher un ticket");
        console.log("6. Filtrer les trajets");
        console.log("7. Trier les trajets");
         console.log("8. Afficher Statistique");
        console.log("0. Quitter");
        choix = saisirNombre("Votre choix : ");
        switch (choix) {
            case 1:
                AfficherTrajets(trips);
                break;
            case 2:
                let nom = saisirTexte("Entrez le nom du passager : ");
                let idTrajet = saisirNombre("Entrez l'ID du trajet : ");
                acheterTicket(trips, nom, idTrajet);
                break;
            case 3:
                afficherTicketTous();
                break;
            case 4:
                let idAnnuler = saisirNombre("Entrez l'ID du ticket à annuler : ");
                annulerTicket(trips, idAnnuler);
                break;
            case 5:
                rechercherTicket();
                break;
            case 6:
                filtrerTrajets();
                break;
            case 7:
                trierTrajets();
                break;
            case 8:
                afficherStatistiques();
                break;
            case 0:
                console.log("  Au revoir !   ");
                break;

            default:
                console.log("\nChoix invalide. Veuillez entrer un nombre entre 1 et 7 OU 0 pour quiter.");
        }

    } while (choix !== 0);
}
lancerApplication();