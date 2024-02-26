import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Services/service.service';
import { user_model } from '../../model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-registration-form',
  templateUrl: './update-registration-form.component.html',
  styleUrls: ['./update-registration-form.component.css']
})
export class UpdateRegistrationFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: ServiceService, private fb: FormBuilder, private toastr: ToastrService) { }

  userForm!: FormGroup;
  artistForm!: FormGroup;
  organizerForm!: FormGroup;
  userIdToUpdate!: number;
  showUserRadioButton: boolean = true;
  showArtistRadioButton: boolean = true;
  showOrganizerRadioButton: boolean = true;

  ngOnInit(): void {
    //user form validators
    this.userForm = this.fb.group(
      {
        firstName: this.fb.control('', [Validators.required]),
        email: this.fb.control(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        wnumber: this.fb.control('', [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[0-9]*'),
        ]),
        address: this.fb.control({ value: '', disabled: true }, [Validators.required]),
        city: this.fb.control('', [Validators.required]),
        options: this.fb.control('', [Validators.required]),
      });

    //artist form validators
    this.artistForm = this.fb.group({
      wexp: this.fb.control('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      video_one: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      video_two: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      video_three: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      artist_facebook: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      artist_instagram: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      artist_website: this.fb.control('', [
        Validators.required,
        Validators.pattern('https://.*'),
      ]),
      artist_profile: this.fb.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      artist_photos: this.fb.control('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      speciality: this.fb.control('', [Validators.required]),
      requirement: this.fb.control('', [Validators.required]),
      artist_description: this.fb.control('', [Validators.required]),
    });

    //organizer form validators

    this.organizerForm = this.fb.group({
      business_name: this.fb.control('', [Validators.required]),
      organizer_description: this.fb.control('', [Validators.required]),
      organizer_facebook: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      organizer_instagram: this.fb.control('', [
        Validators.required,
        Validators.pattern('/^(ftp|http|https)://[^ "]+$/'),
      ]),
      organizer_website: this.fb.control('', [
        Validators.required,
        Validators.pattern('https://.*'),
      ]),
      o_speciality: this.fb.control('', [Validators.required]),
      o_facility: this.fb.control('', [Validators.required]),
      o_profile: this.fb.control('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      o_photos: this.fb.control('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });

    // Initially disable all forms
    this.userForm.disable();
    this.artistForm.disable();
    this.organizerForm.disable();

    this.route.params.subscribe(val => {
      this.userIdToUpdate = val['uid'];
      this.service.getUserDetailsByID(this.userIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res.user_details);

            const fetchedData = {
              utypeartist: res.user_details.utypeartist,
              utypeuser: res.user_details.utypeuser,
              utypeorganizer: res.user_details.utypeorganizer
            };

            // Based on fetched data, update visibility of radio buttons
            this.showUserRadioButton = fetchedData.utypeartist !== 1 && fetchedData.utypeorganizer !== 1;
            this.showArtistRadioButton = fetchedData.utypeartist !== 0;
            this.showOrganizerRadioButton = fetchedData.utypeorganizer !== 0;
          },
          error: (err) => {
            console.log(err);
          }
        })
    })
  }

  fillFormToUpdate(user: user_model) {
    if (user.utypeartist === 1) {
      this.artistForm.enable();
      this.userForm.enable();
      this.organizerForm.disable();

      this.artistForm.setValue({
        // Fill artist form values here
        wexp: user.aworkexperience,
        video_one: user.alink1,
        video_two: user.alink2,
        video_three: user.alink2,
        artist_facebook: user.afblink,
        artist_instagram: user.ainstalink,
        artist_website: user.awebsite,
        artist_profile: user.aprofilephoto,
        artist_photos: user.aphotos,
        speciality: user.aspeciality,
        requirement: user.arequirements,
        artist_description: user.adescription
      });

      this.userForm.setValue({
        // Fill user form values here
        firstName: user.uname,
        email: user.uemail,
        wnumber: user.uwhatsappno,
        address: user.uaddress,
        city: user.ucity,
        options: '2'
      });
    } else if (user.utypeorganizer === 1) {
      this.organizerForm.enable();
      this.userForm.enable();
      this.artistForm.disable();

      this.organizerForm.setValue({
        // Fill organizer form values here
        business_name: user.obusinessname,
        organizer_description: user.odescription,
        organizer_facebook: user.ofblink,
        organizer_instagram: user.oinstalink,
        organizer_website: user.owebsite,
        o_speciality: user.ofacilities,
        o_facility: user.ofacilitesforartist,
        o_profile: user.oprofilephoto,
        o_photos: user.ophotos
      });

      this.userForm.setValue({
        // Fill user form values here
        firstName: user.uname,
        email: user.uemail,
        wnumber: user.uwhatsappno,
        address: user.uaddress,
        city: user.ucity,
        options: '1'
      });
    } else {
      this.userForm.enable();
      this.artistForm.enable();
      this.organizerForm.enable();

      this.userForm.setValue({
        // Fill user form values here
        firstName: user.uname,
        email: user.uemail,
        wnumber: user.uwhatsappno,
        address: user.uaddress,
        city: user.ucity,
        options: '3'
      });
    }
  }

  upDate() {
    // Extract user data
    const userData = {
      uname: this.userForm.value.firstName,
      uemail: this.userForm.value.email,
      uwhatsappno: this.userForm.value.wnumber,
      uaddress: this.userForm.value.address,
      ucity: this.userForm.value.city,
      utypeartist: this.userForm.value.options === '2' ? 1 : 0,
      utypeorganizer: this.userForm.value.options === '1' ? 1 : 0,
      utypeuser: this.userForm.value.options === '3' ? 1 : 0,
    };

    // Extract artist data 
    const artistData = {
      aworkexperience: this.artistForm.value.wexp || '',
      alink1: this.artistForm.value.video_one || '',
      alink2: this.artistForm.value.video_two || '',
      alink3: this.artistForm.value.video_three || '',
      afblink: this.artistForm.value.artist_facebook || '',
      ainstalink: this.artistForm.value.artist_instagram || '',
      awebsite: this.artistForm.value.artist_website || '',
      aspeciality: this.artistForm.value.speciality || '',
      arequirements: this.artistForm.value.requirement || '',
      adescription: this.artistForm.value.artist_description || '',
      aprofilephoto: this.artistForm.value.artist_profile || '',
      // aphotos: this.artistForm.value.artist_photos || '',
    };

    // Extract organizer data
    const organizerData = {
      obusinessname: this.organizerForm.value.business_name || '',
      odescription: this.organizerForm.value.organizer_description || '',
      ofblink: this.organizerForm.value.organizer_facebook || '',
      oinstalink: this.organizerForm.value.organizer_instagram || '',
      owebsite: this.organizerForm.value.organizer_website || '',
      ofacilities: this.organizerForm.value.o_speciality || '',
      ofacilitesforartist: this.organizerForm.value.o_facility || '',
      // ophotos: this.organizerForm.value.o_photos || '',
      oprofilephoto: this.organizerForm.value.o_profile || '',
    };

    let updateData = { ...userData, ...artistData, ...organizerData };

    if (userData.utypeartist) {
      updateData = { ...updateData, ...artistData };
      if (!updateData.aworkexperience ||
        !updateData.alink1 ||
        !updateData.alink2 ||
        !updateData.alink3 ||
        !updateData.afblink ||
        !updateData.ainstalink ||
        !updateData.aspeciality ||
        !updateData.arequirements ||
        !updateData.adescription) {
        this.toastr.error('Please fill all the field.', 'Error');
        return;

      }
    } else if (userData.utypeorganizer) {
      updateData = { ...updateData, ...organizerData };
      if (
        !updateData.obusinessname ||
        !updateData.odescription ||
        !updateData.ofblink ||
        !updateData.oinstalink ||
        !updateData.owebsite ||
        !updateData.ofacilities ||
        !updateData.ofacilitesforartist ||
        // !updateData.ophotos ||
        !updateData.oprofilephoto
      ) {
        this.toastr.error('Please fill all the field.', 'Error');
        return;
      }
    }

    // Combine all data into one object

    if (
      !updateData.uname ||
      !updateData.uemail ||
      !updateData.uwhatsappno ||
      !updateData.uaddress ||
      !updateData.ucity ||
      !(updateData.utypeorganizer + '') ||
      !(updateData.utypeuser + '')

    ) {
      this.toastr.error('Please fill all the field.', 'Error');
      return;
    } else {
      this.service.updatedata(this.userIdToUpdate, updateData).subscribe((res) => {
        console.log(res)
        if (res.status === 'success') {
          this.toastr.success('Successfully updated!', 'Success');
        } else {
          this.toastr.error('Something went wrong.', 'Error');
        }
      });
    }
    // Reset the form after submitting
    this.userForm.reset();
    this.artistForm.reset();
    this.organizerForm.reset();
    this.router.navigate(['/']);
  }

  selected: string = 'none';

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 10) {
      this.artistPhotos.setErrors({ maxlength: true });
    } else {
      this.artistPhotos.setErrors(null);
    }
  }
  onFileChange2(event: any) {
    const files = event.target.files;
    if (files.length > 10) {
      this.OrgPhotos.setErrors({ maxlength: true });
    } else {
      this.OrgPhotos.setErrors(null);
    }
  }

  get FirstName(): FormControl {
    return this.userForm.get('firstName') as FormControl;
  }
  get Email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }
  get Wnumber(): FormControl {
    return this.userForm.get('wnumber') as FormControl;
  }
  get Address(): FormControl {
    return this.userForm.get('address') as FormControl;
  }
  get City(): FormControl {
    return this.userForm.get('city') as FormControl;
  }
  get Password(): FormControl {
    return this.userForm.get('password') as FormControl;
  }
  get Cpassword(): FormControl {
    return this.userForm.get('cpassword') as FormControl;
  }
  get Options(): FormControl {
    return this.userForm.get('options') as FormControl;
  }
  get Experience(): FormControl {
    return this.artistForm.get('wexp') as FormControl;
  }
  get Speciality(): FormControl {
    return this.artistForm.get('speciality') as FormControl;
  }
  get artistProfile(): FormControl {
    return this.artistForm.get('artist_profile') as FormControl;
  }
  get artistPhotos(): FormControl {
    return this.artistForm.get('artist_photos') as FormControl;
  }
  get aVideo1(): FormControl {
    return this.artistForm.get('video_one') as FormControl;
  }
  get aVideo2(): FormControl {
    return this.artistForm.get('video_two') as FormControl;
  }
  get aVideo3(): FormControl {
    return this.artistForm.get('video_three') as FormControl;
  }
  get linkFacebook(): FormControl {
    return this.artistForm.get('artist_facebook') as FormControl;
  }
  get linkInstagram(): FormControl {
    return this.artistForm.get('artist_instagram') as FormControl;
  }
  get linkWebsite(): FormControl {
    return this.artistForm.get('artist_website') as FormControl;
  }
  get Requirements(): FormControl {
    return this.artistForm.get('requirement') as FormControl;
  }
  get artistDescription(): FormControl {
    return this.artistForm.get('artist_description') as FormControl;
  }
  get BusinessName(): FormControl {
    return this.organizerForm.get('business_name') as FormControl;
  }
  get OrgSpeciality(): FormControl {
    return this.organizerForm.get('o_speciality') as FormControl;
  }
  get OrgProfile(): FormControl {
    return this.organizerForm.get('o_profile') as FormControl;
  }
  get OrgPhotos(): FormControl {
    return this.organizerForm.get('o_photos') as FormControl;
  }
  get OrgFacbook(): FormControl {
    return this.organizerForm.get('organizer_facebook') as FormControl;
  }
  get OrgInstagram(): FormControl {
    return this.organizerForm.get('organizer_instagram') as FormControl;
  }
  get OrgWebsite(): FormControl {
    return this.organizerForm.get('organizer_website') as FormControl;
  }
  get Orgfacility(): FormControl {
    return this.organizerForm.get('o_facility') as FormControl;
  }
  get OrgDescription(): FormControl {
    return this.organizerForm.get('organizer_description') as FormControl;
  }
}
