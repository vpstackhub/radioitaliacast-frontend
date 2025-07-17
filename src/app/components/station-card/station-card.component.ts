import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Hls from 'hls.js';

@Component({
  selector: 'app-station-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.css']
})
export class StationCardComponent implements OnInit, OnDestroy {
  @Input() station: any;
  @Output() playEvent = new EventEmitter<string>();

  audio: HTMLAudioElement | null = null;
  isPlaying = false;
  logoSrc: string = '';
  isToggled = false;
  volume = 0.5;
  hls: Hls | null = null;

  vuLevel: number = 0;
  vuInterval: any;

  ngOnInit(): void {
    this.logoSrc = this.station.logo || 'https://via.placeholder.com/150?text=No+Logo';
  }

  ngOnDestroy(): void {
  this.hls?.destroy();
  this.hls = null;
  if (this.audio) {
    this.audio.pause();
    this.audio = null;
  }
  clearInterval(this.vuInterval);
}

togglePlay() {
  // Stop playback if already playing
  if (this.isPlaying) {
    this.audio?.pause();
    this.hls?.destroy();
    this.hls = null;
    clearInterval(this.vuInterval);
    this.isPlaying = false;
    return;
  }

  const isM3u8 = this.station.streamUrl.endsWith('.m3u8');

  // Create audio element only once
  if (!this.audio) {
    this.audio = document.createElement('audio');
    this.audio.volume = this.volume;
  }

  if (isM3u8 && Hls.isSupported()) {
    // Destroy any existing HLS instance
    if (this.hls) {
      this.hls.destroy();
    }

    this.hls = new Hls();
    this.hls.loadSource(this.station.streamUrl);
    this.hls.attachMedia(this.audio);

    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.audio?.play().catch(err => {
        console.error('🔴 Playback failed:', err);
      });
    });

  } else {
    // Fallback for MP3/OGG
    this.audio.src = this.station.streamUrl;
    this.audio.load();
    this.audio.play().catch(err => {
      console.error('🔴 Playback failed:', err);
    });
  }

  this.playEvent.emit(this.station.name);
  this.vuInterval = setInterval(() => this.generateVuLevel(), 200);
  this.isPlaying = true;
}

  generateVuLevel() {
  this.vuLevel = Math.floor(30 + Math.random() * 70);
}

  toggleSwitch() {
    this.isToggled = !this.isToggled;
  }

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



