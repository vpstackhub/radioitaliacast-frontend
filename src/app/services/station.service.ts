import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from  '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/stations`);
  }  
}
