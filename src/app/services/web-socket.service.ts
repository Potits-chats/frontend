import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher('29fdd82357f17b9e1f8e', {
      cluster: 'eu',
    });
  }

  subscribeToChannel(channelName: string, eventName: string, callback: (data: any) => void) {
    const channel = this.pusher.subscribe(channelName);
    channel.bind(eventName, callback);
  }
}
