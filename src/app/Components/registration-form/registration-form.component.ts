import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ServiceService } from 'src/app/Services/service.service';
import { user_model } from '../../model';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  userForm!: FormGroup;
  artistForm!: FormGroup;
  organizerForm!: FormGroup;
  user_model: user_model = new user_model();

  artist_categories: any[] = [];
  selectedCategory: any;
  subcategories: string[] = [];
  selectedSubcategory: string = '';
  organizer_categories: any[] = [];
  showPassword: boolean = false;
  showCPassword: boolean = false;

  // images upload

  // images: string[] = [];
  profileimageData: File | null | undefined;
  org_profileimageData: File | null | undefined;


  constructor(private service: ServiceService, private fb: FormBuilder, private toastr: ToastrService, public sanitizer: DomSanitizer) { }

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
        address: this.fb.control('', [Validators.required]),
        city: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        cpassword: this.fb.control('', [Validators.required]),
        options: this.fb.control('', [Validators.required]),
      },
      { Validators: this.passwordMatchValidator }
    );

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

      // artist_photos: this.fb.control('', [
      //   Validators.required,
      //   Validators.maxLength(10),
      // ]),
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
      // o_profile: this.fb.control('', [
      //   Validators.required,
      //   Validators.maxLength(1),
      // ]),
      // o_photos: this.fb.control('', [
      //   Validators.required,
      //   Validators.maxLength(10),
      // ]),
    });

    // artist category function calling
    this.artist_categorylist();
    this.organizer_categorylist();
  }


  // for profile image
  onImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.profileimageData = fileList[0];
    } else {
      this.profileimageData = null; // Reset file if no file is selected
    }
  }

  onorganizerImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.org_profileimageData = fileList[0];
    } else {
      this.org_profileimageData = null; // Reset file if no file is selected
    }
  }

  postdata() {
    // Extract user data
    const currentDate = new Date();

    // Format date to YYYY-MM-DD
    const formattedDate = currentDate.getFullYear() + '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + currentDate.getDate()).slice(-2);


    const userData = {
      uname: this.userForm.value.firstName,
      uemail: this.userForm.value.email,
      uwhatsappno: this.userForm.value.wnumber,
      uaddress: this.userForm.value.address,
      ucity: this.userForm.value.city,
      upassword: this.userForm.value.password,
      uconfirmpassword: this.userForm.value.cpassword,

      userstatus: "Trial",
      uregistrationdate: formattedDate,
      utypeartist: this.userForm.value.options === '2' ? 1 : 0,
      utypeorganizer: this.userForm.value.options === '1' ? 1 : 0,
      utypeuser: this.userForm.value.options === '3' ? 1 : 0,
    };


    // Extract artist data 
    const artistData = {
      aworkexperience: this.artistForm.value.wexp || '',
      acategory: this.user_model.acategory || '', // Include selected category
      asubcategory: this.user_model.asubcategory || '', // Include selected subcategory
      alink1: this.artistForm.value.video_one || '',
      alink2: this.artistForm.value.video_two || '',
      alink3: this.artistForm.value.video_three || '',
      afblink: this.artistForm.value.artist_facebook || '',
      ainstalink: this.artistForm.value.artist_instagram || '',
      awebsite: this.artistForm.value.artist_website || '',
      aspeciality: this.artistForm.value.speciality || '',
      arequirements: this.artistForm.value.requirement || '',
      adescription: this.artistForm.value.artist_description || '',
      artiststatus: "Trial",
      aprofilephoto: this.profileimageData || ''
      // aprofilephoto: this.artistForm.value.artist_profile || '',
      // aphotos: this.artistForm.value.artist_photos || '',
    };

    // Extract organizer data
    const organizerData = {
      obusinessname: this.organizerForm.value.business_name || '',
      obusinesscategory: this.user_model.obusinesscategory || '', // Include selected organizer category
      odescription: this.organizerForm.value.organizer_description || '',
      ofblink: this.organizerForm.value.organizer_facebook || '',
      oinstalink: this.organizerForm.value.organizer_instagram || '',
      owebsite: this.organizerForm.value.organizer_website || '',
      ofacilities: this.organizerForm.value.o_speciality || '',
      ofacilitesforartist: this.organizerForm.value.o_facility || '',
      organizerstatus: "Trial",
      oprofilephoto: this.org_profileimageData || null
      // ophotos: this.organizerForm.value.o_photos || '',
      // oprofilephoto: this.organizerForm.value.o_profile || '',
    };

    let postData = { ...userData, ...artistData, ...organizerData };

    if (userData.utypeartist) {
      postData = { ...postData, ...artistData };
      if (!postData.aworkexperience ||
        !postData.acategory ||
        !postData.asubcategory ||
        !postData.alink1 ||
        !postData.alink2 ||
        !postData.alink3 ||
        !postData.afblink ||
        !postData.ainstalink ||
        !postData.aspeciality ||
        !postData.arequirements ||
        !postData.adescription
        // !postData.aprofilephoto
        // !postData.aphotos
      ) {
        this.toastr.error('Please fill all the field.', 'Error');
        return;
      }
    } else if (userData.utypeorganizer) {
      postData = { ...postData, ...organizerData };
      if (
        !postData.obusinessname ||
        !postData.odescription ||
        !postData.ofblink ||
        !postData.oinstalink ||
        !postData.owebsite ||
        !postData.ofacilities ||
        !postData.ofacilitesforartist 
        // !postData.oprofilephoto
      ) {
        this.toastr.error('Please fill all the field.', 'Error');
        return;
      }
    }

    // Combine all data into one object

    if (
      !postData.uname ||
      !postData.uemail ||
      !postData.uwhatsappno ||
      !postData.uaddress ||
      !postData.ucity ||
      (postData.upassword && postData.uconfirmpassword && postData.upassword !== postData.uconfirmpassword) || !(postData.utypeartist + '') ||
      !(postData.utypeorganizer + '') ||
      !(postData.utypeuser + '')

    ) {
      if (postData.upassword && postData.uconfirmpassword && postData.upassword !== postData.uconfirmpassword) {
        this.toastr.error('Please enter password and confirm password same', 'Error');
        return;
      }
      this.toastr.error('Please fill all the field.', 'Error');
      return;
    } else {
      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(postData)) {
        if (key === 'oprofilephoto' && (value === null || value === undefined)) {
          // Handle null or undefined case
          formData.append(key, ''); // You can append an empty string or handle it based on your backend requirements
        } else {
          formData.append(key, value);
        }
      }

      this.service.postdata(formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastr.success('Successfully registered!', 'Success');
        } else {
          this.toastr.error('Something went wrong.', 'Error');
        }
      });
    }

    // Reset the form after submitting
    this.userForm.reset();
    this.artistForm.reset();
    this.organizerForm.reset();
  }

  //  select category
  artist_categorylist() {
    this.service.allArtistCategoriesFilter().subscribe((res: any) => {
      this.artist_categories = res.all_categories;
    });
  }
  selectCategory(category: any) {
    this.selectedCategory = category;
    this.subcategories = category.scname;
    this.user_model.acategory = category.cname;
    this.user_model.asubcategory = '';
  }

  selectSubcategory(subcategory: string) {
    this.selectedSubcategory = subcategory;
    this.user_model.asubcategory = subcategory;
  }
  selected: string = 'none';

  organizer_categorylist() {
    this.service.allOrganizerCategoriesFilter().subscribe((res: any) => {
      this.organizer_categories = res.all_bcategories;
    });
  }

  selectOCategory(category: any) {
    this.selectedCategory = category;
    this.user_model.obusinesscategory = category.businesscategory;
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'cpassword') {
      this.showCPassword = !this.showCPassword;
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const Password = control.get('password')?.value;
    const Cpassword = control.get('cpassword')?.value;

    return Password === Cpassword ? null : { mismatch: true };
  }

  // onFileChange(event: any) {
  //   const files = event.target.files;
  //   if (files.length > 10) {
  //     this.artistPhotos.setErrors({ maxlength: true });
  //   } else {
  //     this.artistPhotos.setErrors(null);
  //   }
  // }
  // onFileChange2(event: any) {
  //   const files = event.target.files;
  //   if (files.length > 10) {
  //     this.OrgPhotos.setErrors({ maxlength: true });
  //   } else {
  //     this.OrgPhotos.setErrors(null);
  //   }
  // }

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
  // get artistProfile(): FormControl {
  //   return this.artistForm.get('artist_profile') as FormControl;
  // }
  // get artistPhotos(): FormControl {
  //   return this.artistForm.get('artist_photos') as FormControl;
  // }
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
  // get OrgProfile(): FormControl {
  //   return this.organizerForm.get('o_profile') as FormControl;
  // }
  // get OrgPhotos(): FormControl {
  //   return this.organizerForm.get('o_photos') as FormControl;
  // }
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
