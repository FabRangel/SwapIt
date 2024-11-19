import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadImage(file: File, path: string): Promise<string> {
    const ref = this.storage.ref(path);
    await ref.put(file);
    return await ref.getDownloadURL().toPromise();
  }
}