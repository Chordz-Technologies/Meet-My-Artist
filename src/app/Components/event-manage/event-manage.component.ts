import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { event_model } from 'src/app/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-manage',
  templateUrl: './event-manage.component.html',
  styleUrls: ['./event-manage.component.css']
})
export class EventManageComponent implements OnInit {
  updateEventForm!: FormGroup;
  event_model: event_model = new event_model();
  uid!: number;
  eventId!: number;
  eventimageData: File | null | undefined;

  constructor(private fb: FormBuilder, private eventdata: ServiceService, private route: ActivatedRoute, private service: ServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Event form validators
    this.updateEventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventlocation: this.fb.control('', [Validators.required]),
      googlemaplocation: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^http\:\/\/|https\:\/\/|www\.google$/'),
      ]),
      eventDate: ['', [Validators.required]],
      eventTime: ['', [Validators.required]],
      requiredArtist: ['', [Validators.required]],
      facilityForArtist: ['', [Validators.required]],
      artistEquip: ['', [Validators.required]],
      option1: [''] // Assuming it's a checkbox
    });

    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Get uid from URL

      this.service.getEventById(this.eventId).subscribe({
        next: (res) => {
          this.fillFormToUpdate(res.events_details);
        },
        error: (err) => {
          console.error('Error getting event data:', err);
        }
      });
    });
  }

  fillFormToUpdate(event: any) {
    this.updateEventForm.patchValue({
      eventName: event.ename,
      eventlocation: event.elocation,
      googlemaplocation: event.egooglemap,
      eventDate: event.edate,
      eventTime: event.etime,
      requiredArtist: event.orequirements,
      facilityForArtist: event.facilitiesforartist,
      artistEquip: event.artistequipwith,
      option1: event.erequirements // Convert to boolean
    });

  }
  // for event image
  onImageSelected(event: any) {

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.eventimageData = fileList[0];
      console.log('Selected image:', this.eventimageData);
    } else {
      this.eventimageData = null; // Reset file if no file is selected
    }
  }

  updateEventdata() {
    const eventData = {
      ename: this.updateEventForm.value.eventName,
      elocation: this.updateEventForm.value.eventlocation,
      egooglemap: this.updateEventForm.value.googlemaplocation,
      edate: this.updateEventForm.value.eventDate,
      etime: this.updateEventForm.value.eventTime,
      orequirements: this.updateEventForm.value.requiredArtist,
      artistequipwith: this.updateEventForm.value.artistEquip,
      facilitiesforartist: this.updateEventForm.value.facilityForArtist,
      erequirements: this.updateEventForm.get('option1')?.value ? 1 : 0,
      eposter: this.eventimageData

    };
    let postData = { ...eventData };
    console.log(postData);

    if (
      !postData.ename ||
      !postData.elocation ||
      !postData.egooglemap ||
      !postData.edate ||
      !postData.etime ||
      // !postData.eposter ||
      !postData.orequirements ||
      !postData.artistequipwith ||
      !postData.facilitiesforartist
    ) {
      alert('Please fill all the fields');
      return;
    } else {
      // this.postImage()
      console.log("Before submitting the data is", eventData);
      // let formData2 = new FormData();
      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(eventData)) {
        console.log(key, value);

        formData.append(key, value)
      }

      this.eventdata.updateEvent(this.eventId, formData).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastr.success('Successfully updated!', 'Success');
          } else {
            this.toastr.error('Something went wrong.', 'Error');
          }
        },
        error: (err) => {
          console.error('Error updating event:', err);
        }
      });
    }

    // Reset the form after submitting
    this.updateEventForm.reset();
    this.router.navigate(['/']);
  }
}
