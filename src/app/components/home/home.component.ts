import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationService } from '../../services/station.service';
import { StationCardComponent } from '../station-card/station-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StationCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stations: any[] = [];
  nowPlaying: string | null = null;

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe((data: any[]) => {
      this.stations = data;
      console.log("✅ STATIONS LOADED:", this.stations);  
    });
  }
  

  updateNowPlaying(stationName: string) {
    this.nowPlaying = stationName;
  }
}

