import { initializeApp, getApps } from "firebase/app";
import {
  Database,
  DataSnapshot,
  getDatabase,
  DatabaseReference,
  ref,
  get,
} from "firebase/database";
import { TrackInfo } from "../../types/TrackInfo";
import { TrackData } from "../../types/TracksData";
// import * as db from '@firebase/database';

export default class FirebaseService {
  readonly clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  initFirebaseApp(): void {
    try {
      if (getApps().length === 0) {
        initializeApp(this.clientCredentials);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  getFirebaseDB(): Database {
    const db = getDatabase();
    return db;
  }

  async getTrackInfoList(): Promise<TrackInfo[]> {
    const trackInfoList: TrackInfo[] = [];
    const db = this.getFirebaseDB();
    const trackInfoRef: DatabaseReference = ref(db, "tracks_info/");
    const snapshot: DataSnapshot = await get(trackInfoRef);

    snapshot.forEach((child: DataSnapshot) => {
      trackInfoList.push(child.val());
    });

    return trackInfoList.reverse();
  }

  async getTrackData(id: string): Promise<TrackData> {
    const db = this.getFirebaseDB();
    const trackDataRef: DatabaseReference = ref(db, "tracks_data/" + id);
    const snapshot: DataSnapshot = await get(trackDataRef);
    const trackData = snapshot.val() as TrackData;

    return trackData;
  }
}
