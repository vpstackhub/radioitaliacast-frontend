import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-station-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.css']
})
export class StationCardComponent implements OnInit {
  @Input() station: any;
  @Output() playEvent = new EventEmitter<string>(); 
  audio: HTMLAudioElement | null = null;
  isPlaying = false;
  logoSrc: string = '';

  ngOnInit(): void {
    this.logoSrc = this.station.logo;
  }

  togglePlay() {
    if (!this.audio) {
      this.audio = new Audio(this.station.streamUrl);
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
      this.playEvent.emit(this.station.name); 
    }

    this.isPlaying = !this.isPlaying;
  }

  onLogoError(): void {
    switch (this.station.name) {
      case 'Radio Italia':
        this.logoSrc = 'https://www.radioitalia.it/apple-touch-icon.png';
        break;
      case 'RTL 102.5':
        this.logoSrc = 'https://www.rtl.it/static/logos/rtl_logo_512.png';
        break;
      case 'Radio 105':
        this.logoSrc = 'https://www.105.net/res/img/logo-105.png';
        break;
      case 'Radio Kiss Kiss':
        this.logoSrc = 'https://www.kisskiss.it/wp-content/uploads/2021/11/favicon.png';
        break;
      case 'Rai Radio 1':
        this.logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/RaiRadio1-logo.png';
        break;
      default:
        this.logoSrc = 'https://via.placeholder.com/150?text=No+Logo';
    }
  }
}


