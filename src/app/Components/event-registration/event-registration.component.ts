import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  createEventForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    //user form validators
    this.createEventForm = this.fb.group(
      {
        eventName: this.fb.control('', [Validators.required]),
        // eventlocation: this.fb.control('', [Validators.required]),
        eventlocation: this.fb.control('', [
          Validators.required,
          Validators.pattern('/^http\:\/\/|https\:\/\/|www\.google$/'),
        ]),
        eventDate: this.fb.control('', [Validators.required]),
        eventTime: this.fb.control('', [Validators.required]),
        requiredArtist: this.fb.control('', [Validators.required]),
        facilityForArtist: this.fb.control('', [Validators.required]),
        artistEquip: this.fb.control('', [Validators.required]),
        imageUpload: this.fb.control('', [
          Validators.required,
          Validators.maxLength(1),
        ]),
      })
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  postEventdata() {
    const userId = this.getUserId();

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    const eventData = {
      ename: this.createEventForm.value.eventName,
      elocation: this.createEventForm.value.eventlocation,
      edate: this.createEventForm.value.eventDate,
      etime: this.createEventForm.value.eventTime,
      eposter: this.createEventForm.value.imageUpload,
      orequirements: this.createEventForm.value.requiredArtist,
      artistequipwith: this.createEventForm.value.artistEquip,
      facilitiesforartist: this.createEventForm.value.facilityForArtist,
      uid: userId // Add userId to eventData
    };
    let postData = { ...eventData };
    console.log(postData);

    if (
      !postData.ename ||
      !postData.elocation ||
      !postData.edate ||
      !postData.etime ||
      !postData.eposter ||
      !postData.orequirements ||
      !postData.artistequipwith ||
      !postData.facilitiesforartist
    ) {
      alert('Please fill all the fields');
      return;
    } else {
      this.service.postEvent(postData).subscribe((res) => {
        console.log(res)
        if (res.status === 'success') {
          alert('successfully added');
        } else {
          alert('something went wrong');
        }
      });
    }
    // Reset the form after submitting
    this.createEventForm.reset();
  }

  get EventName(): FormControl {
    return this.createEventForm.get('eventName') as FormControl;
  }
  get EventLocation(): FormControl {
    return this.createEventForm.get('eventlocation') as FormControl;
  }
  get EventDate(): FormControl {
    return this.createEventForm.get('eventDate') as FormControl;
  }
  get EventTime(): FormControl {
    return this.createEventForm.get('eventTime') as FormControl;
  }
  get RequiredArtist(): FormControl {
    return this.createEventForm.get('requiredArtist') as FormControl;
  }
  get FacilityForArtist(): FormControl {
    return this.createEventForm.get('facilityForArtist') as FormControl;
  }
  get ArtistEquip(): FormControl {
    return this.createEventForm.get('artistEquip') as FormControl;
  }
  get EventPoster(): FormControl {
    return this.createEventForm.get('imageUpload') as FormControl;
  }
}
