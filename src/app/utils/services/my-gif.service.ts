import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpService } from "../http/http.service";
import { GLOBAL_SETTINGS } from "@global-settings";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Firestore
} from '@angular/fire/firestore'
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { BehaviorSubject, from, Observable, switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MyGifService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/gifs/`;
  constructor(http: HttpClient, private storage: Storage, private fireStore: Firestore) {
    super(http)
  };


  getObservable(collection: any) {
    const subject = new BehaviorSubject<any[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: any[]) => {
      subject.next(val);
    });
    return subject;
  };

  getGifs$() {
    return new Observable((obs) => {
      const dbInstance = collection(this.fireStore, 'gifs');
      getDocs(dbInstance)
        .then((response) => {
          let result = [...response.docs.map((item) => {
            return { ...item.data(), id: item.id }
          })]
          obs.next(result)
        })
        .catch((err) => {
          obs.error(err)
        })
    })
  }

  createGifs$(value: any) {
    const dbInstance = collection(this.fireStore, 'gifs');
    return from(addDoc(dbInstance, value))
  }

  uploadFile$(fle: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, fle));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
