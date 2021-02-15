import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZoomMtg } from '@zoomus/websdk';
import { environment } from '../../environments/environment';
import { Meeting, ZoomResponse } from '../models/meeting.interface';
import { UserData } from '../models/user.interface';

const { zoomApiKey } = environment;

@Injectable()
export class ZoomService {
  private signatureEndpoint = ''; // Add your own signature endpoint here
  private leaveUrl = ''; // Trivial if using Zoom inside iframe
  constructor(
    private http: HttpClient,
  ) { }
  loadZoom() {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }
  async startMeeting(meeting: Meeting, user: UserData) {
    const { signature } = await this.getSignature(meeting.id);
    return this.initZoomMeeting(signature, meeting, user);
  }
  private getSignature(meetingNumber: string, role = 0) {
    return this.http.post<{ signature: string }>(this.signatureEndpoint, { meetingNumber, role }).toPromise();
  }
  private initZoomMeeting(signature: string, meeting: Meeting, user: UserData) {
    return new Promise<ZoomResponse>((resolve, reject) => {
      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        isSupportAV: true,
        success: (_: ZoomResponse) => {
          this.joinMeeting(signature, meeting, user)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        },
        error: (error: ZoomResponse) => reject(error)
      });
    });
  }
  private joinMeeting(signature: string, meeting: Meeting, user: UserData) {
    return new Promise<ZoomResponse>((resolve, reject) => {
      ZoomMtg.join({
        signature,
        meetingNumber: meeting.id,
        apiKey: zoomApiKey,
        userName: user.name,
        userEmail: user.email,
        passWord: meeting.passcode,
        success: (success: ZoomResponse) => {
          resolve(success);
        },
        error: (error: ZoomResponse) => reject(error)
      });
    });
  }
}
