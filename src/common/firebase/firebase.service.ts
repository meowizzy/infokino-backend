import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class FirebaseService {
    private readonly storage: admin.storage.Storage;
    constructor() {
        const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
        const serviceAccountConfig = {
            type: process.env.FIREBASE_TYPE,
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: privateKey,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: process.env.FIREBASE_AUTH_URI,
            token_uri: process.env.FIREBASE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
            universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountConfig as admin.ServiceAccount),
            storageBucket: 'infokino-image-storage.appspot.com',
        });

        this.storage = admin.storage();
    }

    getStorageInstance(): admin.storage.Storage {
        return this.storage;
    }

    getStorageBucket() {
        return this.getStorageInstance().bucket();
    }
}