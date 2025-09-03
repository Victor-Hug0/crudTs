import Database from "better-sqlite3";
import path from "path";

export default class DatabeseConnection {
    private static instance: Database.Database;

    public static getInstance(): Database.Database {
        if (!DatabeseConnection.instance) {
            const dbPath = path.join(process.cwd(), 'database.sqlite');
            DatabeseConnection.instance = new Database(dbPath);

            this.initializeTables();
        }

        return DatabeseConnection.instance;
    }

    private static initializeTables(): void {
        const db = DatabeseConnection.instance;

        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now','localtime')),
                updated_at TEXT DEFAULT (datetime('now','localtime'))
            )    
        `)
    }

    public static closeConnection(): void {
        if (DatabeseConnection.instance) {
            DatabeseConnection.instance.close();
        }
    }
}
