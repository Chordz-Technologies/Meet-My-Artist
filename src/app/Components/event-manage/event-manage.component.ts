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

  constructor(private fb: FormBuilder, private eventdata: ServiceService, private route: ActivatedRoute, private service: ServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Event form validators
    this.updateEventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventlocation: ['', [
        Validators.required,
        Validators.pattern(/^http\:\/\/|https\:\/\/|www\.google$/)
      ]],
      eventDate: ['', [Validators.required]],
      eventTime: ['', [Validators.required]],
      requiredArtist: ['', [Validators.required]],
      facilityForArtist: ['', [Validators.required]],
      artistEquip: ['', [Validators.required]],
      option1: [false, [Validators.required]] // Assuming it's a checkbox
    });

    this.route.params.subscribe(params => {
      this.uid = +params['uid']; // Get uid from URL

      // Get the eid using uid
      this.service.getEventIdByUserId(this.uid).subscribe({
        next: (res: any) => {
          if (res && res.event_data && res.event_data.length > 0) {
            this.eventId = res.event_data[0].eid;
            this.fetchEventData();
          } else {
            console.error('No event data found for the user');
          }
        },
        error: (err) => {
          console.error('Error getting event data:', err);
        }
      });
    });
  }

  fetchEventData() {
    if (this.eventId === undefined) {
      console.error('Event ID is undefined');
      return;
    }

    // Call your service method to fetch event data using this.eventId
    this.service.getEventById(this.eventId).subscribe({
      next: (res) => {
        this.fillFormToUpdate(res.events_details);
      },
      error: (err) => {
        console.error('Error getting event data:', err);
      }
    });
  }

  fillFormToUpdate(event: any) {
    this.updateEventForm.patchValue({
      eventName: event.ename,
      eventlocation: event.elocation,
      eventDate: event.edate,
      eventTime: event.etime,
      requiredArtist: event.orequirements,
      facilityForArtist: event.facilitiesforartist,
      artistEquip: event.artistequipwith,
      option1: !!event.erequirements // Convert to boolean
    });
  }

  updateEventdata() {
    const eventData = {
      ename: this.updateEventForm.value.eventName,
      elocation: this.updateEventForm.value.eventlocation,
      edate: this.updateEventForm.value.eventDate,
      etime: this.updateEventForm.value.eventTime,
      orequirements: this.updateEventForm.value.requiredArtist,
      artistequipwith: this.updateEventForm.value.artistEquip,
      facilitiesforartist: this.updateEventForm.value.facilityForArtist,
      erequirements: this.updateEventForm.value.option1 ? 1 : 0
    };

    this.eventdata.updateEvent(this.eventId, eventData).subscribe({
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

    // Reset the form after submitting
    this.updateEventForm.reset();
    this.router.navigate(['/']);
  }

  // Getters for form controls
  get eventName(): FormControl {
    return this.updateEventForm.get('eventName') as FormControl;
  }

  get eventlocation(): FormControl {
    return this.updateEventForm.get('eventlocation') as FormControl;
  }

  get eventDate(): FormControl {
    return this.updateEventForm.get('eventDate') as FormControl;
  }

  get eventTime(): FormControl {
    return this.updateEventForm.get('eventTime') as FormControl;
  }

  get requiredArtist(): FormControl {
    return this.updateEventForm.get('requiredArtist') as FormControl;
  }

  get facilityForArtist(): FormControl {
    return this.updateEventForm.get('facilityForArtist') as FormControl;
  }

  get artistEquip(): FormControl {
    return this.updateEventForm.get('artistEquip') as FormControl;
  }

  get option1(): FormControl {
    return this.updateEventForm.get('option1') as FormControl;
  }
}
