import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-station-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.css']
})
export class StationCardComponent implements OnInit {
  @Input() station: any;
  @Output() playEvent = new EventEmitter<string>(); 

  audio: HTMLAudioElement | null = null;
  isPlaying = false;
  logoSrc: string = '';
  isToggled = false;  

  ngOnInit(): void {
    this.logoSrc = this.station.logo || 'https://via.placeholder.com/150?text=No+Logo';
  }  

  togglePlay() {
    if (!this.audio) {
      this.audio = new Audio(this.station.streamUrl);
      this.audio.volume = this.volume;
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
      this.playEvent.emit(this.station.name); 
    }

    this.isPlaying = !this.isPlaying;
  }

  toggleSwitch() {
    this.isToggled = !this.isToggled;
  }
  volume = 0.5;

adjustVolume() {
  if (this.audio) {
    this.audio.volume = this.volume;
  }
}
  onLogoError(): void {
    switch (this.station.name) {
      case 'Radio Italia':
        this.logoSrc = 'https://th.bing.com/th/id/OIP.bV39zibs5JCc2YHqQcr2fgHaEw?w=312&h=200&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2';
        break;
      case 'RTL 102.5':
        this.logoSrc = 'https://th.bing.com/th/id/OIP.G9bScaxMOelIzA0geu940AHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2';
        break;
      case 'Radio 105':
        this.logoSrc = 'https://th.bing.com/th/id/OIP.dTcT_S2yRGBeGNnwEUA40gAAAA?w=245&h=254&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2';
        break;
      case 'Radio Kiss Kiss':
        this.logoSrc = 'https://th.bing.com/th/id/OIP.KekJjU7kc2uXfUlXa_R9EwHaF3?w=280&h=222&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2';
        break;
      case 'Rai Radio 1':
        this.logoSrc = 'https://th.bing.com/th/id/OIP.wfIFmhn35RYXjeLq499otgHaCi?w=350&h=120&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2';
        break;
      default:
        this.logoSrc = 'https://via.placeholder.com/150?text=No+Logo';
    }
  }
}


