import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from '../models/meeting.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit, OnDestroy {
  activeMeeting!: Meeting;
  url = '';
  private meetings: Meeting[] = [
    { name: 'meeting1', id: '8679862495', passcode: '714420' },
    { name: 'meeting2', id: '7397912788', passcode: '587083' },
    { name: 'meeting3', id: '3864949432', passcode: '600059' },
  ];
  private destroy = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(
      ({ meeting }) => this.validateMeeting(meeting)
    );
  }
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
  private validateMeeting(meetingName: string) {
    const meeting = this.meetings.find(meeting => meeting.name === meetingName);
    return meeting
      ? this.setMeetingUrl(meeting)
      : this.router.navigateByUrl('/home');
  }
  private setMeetingUrl(meeting: Meeting) {
    this.activeMeeting = meeting;
    this.url = `/zoom/${ meeting.id }/${ meeting.passcode }`;
  }
}
