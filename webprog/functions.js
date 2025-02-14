//Kjører etter HTML laster inn. Kunne brukt forkortet versjon men denne er mer lesbar
$(document).ready(function () {

    let showTable = $("#showTable");
    if (!showTable.hasClass("d-none")){
        showTable.addClass("d-none");
    }
    // Dette gjør slik at tabellen er alltid gjemt for brukere som først åpner siden
});

// Hovedfunksjonen som kalles på når man trykker submit
function addBestilling() {

    let film = $("#selectFilm");
    let antall = $("#inputAntall");
    let fornavn = $("#inputFornavn");
    let etternavn = $("#inputEtternavn");
    let telefonNr = $("#inputTelefonNr");
    let epost = $("#inputEpost");

    let billett = {};

    let errors; //blir økt om en funksjon finner feil, sjekkes av en try/catch

    // ser etter felt som ikke er blitt fylt ut
    function validate(billettInput) {
        if (billettInput.val() === "Default"||
            billettInput.val() === ""       ||
            billettInput.val() === null     ||
            billettInput.val() === 0        ||
            billettInput.val() === "0" )
        {
            errors++;
            billettInput.addClass("is-invalid");
            /*  bootstrap 5 sitt valideringssystem. under hver input er det en
                <div class="invalid-feedback"> som gjemmes til vanlig, men vises
                om elementet over har klassen "is-invalid".
             */
        }
    }

    //validerer mottatte input og legger verdien inn i billett objektet
    function validateAndAdd(billettInput, name){
        validate(billettInput);
        billett[name] = billettInput.val();
    }

    //leter etter errors, stopper funksjonen om den finner feil
    try {
        errors = 0;

        validateAndAdd(film ,"film");
        validateAndAdd(antall,"antall");
        validateAndAdd(fornavn,"fornavn");
        validateAndAdd(etternavn,"etternavn");
        validateAndAdd(telefonNr,"telefonNr");
        validateAndAdd(epost,"epost");

        if (errors !== 0) {
            return new Error("Missing required input");
        }

    } catch (error) {
        console.error(error);
        return;
        // om den finner en manglende verdi, stopper den funksjonen før
        // verdiene kan sendes til serveren.
    }

    $.ajax({
        url: "/setBillett",
        type: "POST",
        data: JSON.stringify(billett), //Gjør billett objektet til JSON
        contentType: "application/json; charset=utf-8", //Sier til server at innholdet er JSON
        complete: function () {
            console.log(billett);
            updateBestilling();

            /*                                                                       ___
              ⬆ Dette måtte gjøres fordi jQuery tror at jeg sender "form data"     / __ \
            istedet for JSON selv om jeg ikke bruker <form> i HTML'en. Dette      |_| | |
            er antakeligvis bootstrap 5 sin class="form-control" som gjør dette,     / /
            men det er ikke dokumentert på nettsiden deres så vidt jeg kan se.      |_|
                                                                                    __
            *///                                                                   |_|

            // resetter feltene og feilmeldingene
            const resetValue = function(billettInput){
                billettInput.val("");
                billettInput.removeClass("is-invalid");
            }

            resetValue(film);
            resetValue(antall);
            resetValue(fornavn);
            resetValue(etternavn);
            resetValue(telefonNr);
            resetValue(epost);

            console.log("input process complete")
        }
    })
}

//fjern innholdet i tabellen via serveren, så kjør updateBestilling()
function slettBestillinger() {
    $.get("/slettBilletter", function (data) {
        console.log(data)
    }).done(function (){

    updateBestilling()
    })
}

function updateBestilling() {
    /*
    Denne funksjonen bruker en foreach loop for å sette verdiene i Billett
    arrayen inn i tableMid. Tabellen legges så inn i HTML'en i tre steg,
    med tableStart, tableMid og så tableEnd for end tags.
     */

    let arrayEmpty;

    $.get("/sjekkBilletterIsEmpty", function (bool) {
        //sjekkBilletterIsEmpty returnerer boolean
        console.log(bool)
        arrayEmpty = bool;

    }).done(function() {
        //pass på at resten av koden ikke kjører før denne er ferdig

        if (arrayEmpty) {
            $("#showTable").addClass("d-none");
            // om det ikke er noe innhold i biletter arrayen, så blir div'en
            // med tabellen og delete knappen gjemt.

        } else {
            let billettList;
            $.get("/getAllBilletter", function (data) {
                billettList = data;
                console.log("recieving list")
            }).done(function () {
                //pass på at resten av koden ikke kjører før denne er ferdig

                const tableStart = `
                      <table class="table w-auto ">
                        <thead>
                          <tr>
                            <th scope="col">Film      </th>
                            <th scope="col">Antall    </th>
                            <th scope="col">Fornavn   </th>
                            <th scope="col">Etternavn </th>
                            <th scope="col">Telefonnr </th>
                            <th scope="col">Epost     </th>
                          </tr> 
                        </thead>
                      <tbody>`;
                let tableMiddle = ""; //får innhold fra server
                const tableEnd = "</tbody></table>";


                for (let i = 0; i < billettList.length; i++) {
                    console.log("adding billett # " + (i + 1));

                    tableMiddle +=`
                      <tr> 
                        <td> ${billettList[i].film}      </td>
                        <td> ${billettList[i].antall}    </td>
                        <td> ${billettList[i].fornavn}   </td>
                        <td> ${billettList[i].etternavn} </td>
                        <td> ${billettList[i].telefonNr} </td>
                        <td> ${billettList[i].epost}     </td>
                      </tr>`;
                }

                let tableFull = tableStart + tableMiddle + tableEnd;


                // Pass på at tabellen kan synes
                $("#showTable").removeClass("d-none");

                // Sent tabell i html
                console.log(tableFull)
                $("#alleBilletter").html(tableFull);
            })
        }
    })
}