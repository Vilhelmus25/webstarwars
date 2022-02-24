import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public readonly apiUrl: string = 'http://127.0.0.1:33333/';
  constructor() { }
}
