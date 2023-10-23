import { Injectable } from '@angular/core';
import { AbstractStorageService } from "./abstract-storage.service";
import { JwtResponse } from "../interface/response/jwt-response.interface";

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService extends AbstractStorageService<JwtResponse> {
  protected readonly keyName = 'JWT';

}
