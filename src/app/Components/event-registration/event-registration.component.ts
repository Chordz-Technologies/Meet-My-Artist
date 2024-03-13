import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  createEventForm!: FormGroup;
  userFullName: string = ""; // Variable to store user's full name
  businessName: string = ""; // Variable to store business name
  eventimageData: File | null | undefined;
  constructor(private fb: FormBuilder, private service: ServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.getUserDetails();
    //user form validators
    this.createEventForm = this.fb.group(
      {
        eventName: this.fb.control('', [Validators.required]),
        eventlocation: this.fb.control('', [Validators.required]),
        googlemaplocation: this.fb.control('', [
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

  // get user details
  getUserDetails() {
    const userIdString = this.getUserId();
    if (!userIdString) {
      return;
    }
    const userId = parseInt(userIdString, 10); // Convert string to number

    // Call your service to fetch user details
    this.service.getUserDetailsByID(userId).subscribe((res: any) => {
      if (res.status === 'success') {
        this.userFullName = res.user_details.uname; // Store user's full name
        this.businessName = res.user_details.obusinessname; // Store business name
      } else {
        console.error('Failed to fetch user details');
      }
    });
  }

  // for event image
  onImageSelected(event: any) {

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.eventimageData = fileList[0];
    } else {
      this.eventimageData = null; // Reset file if no file is selected
    }
  }

  postEventdata() {
    const userId = this.getUserId();
    if (!userId) {
      return;
    }

    const eventData = {
      ename: this.createEventForm.value.eventName,
      elocation: this.createEventForm.value.eventlocation,
      egooglemap: this.createEventForm.value.googlemaplocation,
      edate: this.createEventForm.value.eventDate,
      etime: this.createEventForm.value.eventTime,

      orequirements: this.createEventForm.value.requiredArtist,
      artistequipwith: this.createEventForm.value.artistEquip,
      facilitiesforartist: this.createEventForm.value.facilityForArtist,
      ...(this.eventimageData ? { eposter: this.eventimageData } : {}),
      uid: userId, // Add userId to eventData
      // uname:userId,
      // obusinessname:userId
      uname: this.userFullName, // Add user's full name
      obusinessname: this.businessName || this.userFullName // Use businessName if not null or blank, otherwise use userFullName
    };
    let postData = { ...eventData };

    if (
      !postData.ename ||
      !postData.elocation ||
      // !postData.egooglemap ||
      !postData.edate ||
      !postData.etime ||
      // !postData.eposter ||
      !postData.orequirements ||
      !postData.artistequipwith ||
      !postData.facilitiesforartist
    ) {
      this.toastr.error('Please fill all the field.', 'Error');
      return;
    } else {
      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(postData)) {
        formData.append(key, value)
      }
      this.service.postEvent(formData).subscribe((res) => {
        console.log(res)
        if (res.status === 'success') {
          this.toastr.success('Successfully create event!', 'Success');
        } else {
          this.toastr.error('Something went wrong.', 'Error');
        }
      });
    }
    // Reset the form after submitting
    this.createEventForm.reset();
    this.router.navigate(['/']);
  }

  get EventName(): FormControl {
    return this.createEventForm.get('eventName') as FormControl;
  }
  get EventLocation(): FormControl {
    return this.createEventForm.get('eventlocation') as FormControl;
  }
  get GoogleLocation(): FormControl {
    return this.createEventForm.get('googlemaplocation') as FormControl;
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
  // get EventPoster(): FormControl {
  //   return this.createEventForm.get('imageUpload') as FormControl;
  // }  
}
