const mariadb = require('mariadb')
const config = require('./connection')

//add a User with some starting parameters
async function AddUser(data) {
    try {
        const query = `INSERT INTO DatabaseProjectWork.Cliente(Username, Mail, Nome, Cognome, Password,PuntiFedelta, DataDiNascita) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            data.username,
            data.email,
            data.name,
            data.lastName,
            data.password,
            data.fidelityPoints,
            data.dateOfBirth
        ];

        // Esegui la query
        const result = await DoQuery(params, query);

        return result; // Torna il risultato della query

    } catch (error) {
        // Log dell'errore
        console.error('Errore nell\'inserimento del cliente:', error);
        throw error; // Rilancia l'errore
    }
}

//try to log in give a mail, psw and other parameters
async function TryToLog(data) {
    //console.log("dbinteraction : " + data.Username)
    try {
        return DoQuery([data.Username, data.Password], `SELECT Username, Mail, Nome, Cognome, DataDiNascita FROM Cliente WHERE Username=? AND Password=?`)
    }
    catch (error) {
        throw new Error(error)
    }
}

//add a Viaggio given CittàDiPartenza, CittàDiArrivo, Prezzo, PuntiAccumulati=0, NrPartecipanti
async function AddViaggio(data) {
    const orarioPartenza = data.tratte[0].departureTime.substring(11, 16)
    const OrarioArrivo = data.tratte[data.tratte.length - 1].arrivalTime.substring(11, 16)
   console.log(data)
    try {
        const result = await DoQuery(
            [data.Cliente, data.CittaDiPartenza, data.CittaDiArrivo, data.Prezzo, data.NrPartecipanti, data.PuntiAccumulati, data.GiornoPartenza, orarioPartenza, OrarioArrivo],
            `INSERT INTO DatabaseProjectWork.Viaggio (Cliente, CittaDiPartenza, CittaDiArrivo, Prezzo, NrPartecipanti, PuntiAccumulati, DataPartenza, OrarioPartenza, OrarioArrivo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        const viaggioId = result.insertId;

        await AddTratta(viaggioId, data.tratte);

        return true;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

async function AddViaggioAereo(data) {
    const orarioPartenza = data.OrarioPartenza.substring(11, 16)
    const OrarioArrivo = data.OrarioArrivo.substring(11, 16)
   console.log(data)
    try {
        const result = await DoQuery(
            [data.Cliente, data.CittaDiPartenza, data.CittaDiArrivo, data.Prezzo, data.NrPartecipanti, data.PuntiAccumulati, data.GiornoPartenza, orarioPartenza, OrarioArrivo],
            `INSERT INTO DatabaseProjectWork.Viaggio (Cliente, CittaDiPartenza, CittaDiArrivo, Prezzo, NrPartecipanti, PuntiAccumulati, DataPartenza, OrarioPartenza, OrarioArrivo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        const viaggioId = result.insertId;

        await AddTratta(viaggioId, data.tratte);

        return true;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

//dynamically add tratte give a viaggio
async function AddTratta(viaggioId, tratte) {
    try {
        let prog = 0;

        console.dir(tratte)
        for (const tratta of tratte) {
            await DoQuery(
                [
                    viaggioId,
                    prog++,
                    tratta.origin,
                    tratta.destination,
                    tratta.departureTime.substring(11,16),
                    tratta.arrivalTime.substring(11,16),
                    tratta.train.description,
                    'treno'
                ],
                `INSERT INTO DatabaseProjectWork.Tratta (
                    Viaggio,
                    Id,
                    CittaDiPartenza,
                    CittaDiArrivo,
                    OrarioPartenza,
                    OrarioArrivo,
                    CodiceMezzo,
                    Mezzo
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            );
        }

        return true;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

//fetching all viaggi given a User Username
async function FetchAllViaggiGivenUser(data) {
    try {
        return await DoQuery(
            [data.UsernameCliente],
            `
            SELECT CittaDiPartenza, CittaDiArrivo, DataPartenza, Id, NrPartecipanti, OrarioPartenza, OrarioArrivo
            FROM Viaggio join Cliente on Viaggio.Cliente = Cliente.Username
            WHERE Cliente.Username = ?
            `
        )
    } catch (error) {
        throw new Error(error.message || error);
    }
}

//fetch all tratte given a viaggio.id
async function FetchTratteGivenViaggio(data) {
    console.log(`IdViaggio ${data.IdViaggio}`)
    try {
        return await DoQuery(
          [data.IdViaggio],
          `
            SELECT Tratta.Id, Tratta.Viaggio, Tratta.CodiceMezzo, Tratta.CittaDiPartenza, Tratta.CittaDiArrivo, Tratta.OrarioPartenza, Tratta.OrarioArrivo 
            FROM Tratta join Viaggio on Tratta.Viaggio = Viaggio.Id
            WHERE Viaggio.Id = ?
            `
        );
    } catch (error) {
        throw new Error(error.message || error);
    }
}

//fetch a Viaggio given its starting and ending cities
async function FetchViaggioGivenPartenzaArrivoUtente(data) {
    try {
        return await DoQuery(
            [data.CittaDiPartenza, data.CittaDiArrivo],
            `
            SELECT Viaggio.Id
            FROM Viaggio
            WHERE Viaggio.CittaDiPartenza = ? AND Viaggio.CittaDiArrivo = ?
            `
        )
    } catch (error) {
        throw new Error(error.message || error);
    }
}

//core of every query, it enstablish a connection with the db and allows to do queries
const DoQuery = async (params, query) => {
    const pool = mariadb.createPool({
        host: "10.100.200.7",
        //host : "127.0.0.1",
        user: "classe5f",
        password: "classe5f!",
        database: "DatabaseProjectWork",
        trace: true,
    });



    let connection;
    try {
        // Ottieni una connessione dal pool
        connection = await pool.getConnection();

        // Esegui la query con i parametri
        const result = await connection.query(query, params);

        console.log(result); // Log del risultato

        return result; // Restituisci il risultato della query

    } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw error; // Rilancia l'errore
    } finally {
        // Chiudi la connessione e il pool, anche in caso di errore
        if (connection) {
            connection.end();
        }
        pool.end();
    }
};


//export of various methods from this file to others
module.exports = {
    TryToLog: TryToLog,
    AddUser: AddUser,
    AddViaggio: AddViaggio,
    FetchAllViaggiGivenUser: FetchAllViaggiGivenUser,
    FetchTratteGivenViaggio: FetchTratteGivenViaggio,
    FetchViaggioGivenPartenzaArrivoUtente: FetchViaggioGivenPartenzaArrivoUtente,
    AddViaggioAereo: AddViaggioAereo
}