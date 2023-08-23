import { Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';
import { environment } from 'src/env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private API_URL = environment.root;
  private url = 'api/upload/';

  constructor(
    private snackBarService: SnackBarService
  ) { }

  uploadFile(file: File, type: string, id: string) {
  console.log("🚀 ~ file: upload.service.ts:18 ~ UploadService ~ uploadFile ~ file:", file)

    return new Promise((resolve, reject) => {

      let snackBarRef = this.snackBarService.loading()

      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      // const tokenstorege = this.authService.getToken();

      formData.append('archivo', file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            this.snackBarService.show('SUCCESS', 'Archivo subido con éxito', 1500)
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            this.snackBarService.show('DANGER', xhr.response,5000)
            console.log("🚀 ~ file: upload-file.service.ts ~ line 31 ~ UploadFileService ~ returnnewPromise ~ xhr.response", xhr)
            reject(xhr.response);
          }
        }
      };


      const url = `${this.API_URL}${this.url}${type}/${id}`

      xhr.open('PUT', url, true);
      // xhr.setRequestHeader('Authorization', 'Bearer ' + tokenstorege);
      xhr.send(formData);
    });

  }
}
