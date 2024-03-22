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
  userType = localStorage.getItem('userType');
  user_model: user_model = new user_model();
  artist_categories: any[] = [];
  selectedCategory: any;
  subcategories: string[] = [];
  selectedSubcategory: string = '';
  organizer_categories: any[] = [];
  showPassword: boolean = false;
  showCPassword: boolean = false;
  // images upload

  images: any[] = [];

  profileimageData: File | null | undefined;
  org_profileimageData: File | null | undefined;


  ngOnInit(): void {
    this.artist_categorylist();
    this.organizer_categorylist();
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
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        cpassword: this.fb.control('', [Validators.required]),
        options: this.fb.control('', [Validators.required]),
      });

    //artist form validators
    this.artistForm = this.fb.group({
      wexp: this.fb.control('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      category: '',
      subcategory: '',
      video_one: '',
      video_two: '',
      video_three: '',
      artist_facebook: '',
      artist_instagram: '',
      artist_website: '',
      // artist_profile: this.fb.control('', [
      //   Validators.required,
      //   Validators.minLength(1),
      // ]),
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
      organizer_category: '',
      organizer_description: this.fb.control('', [Validators.required]),
      organizer_facebook: '',
      organizer_instagram: '',
      organizer_website: '',
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

      //this.selectedCategory =  user.acategory;
      this.artistForm.patchValue({
        // Fill artist form values here
        wexp: user.aworkexperience,
        category: user.acategory,
        subcategory: user.asubcategory,
        video_one: user.alink1,
        video_two: user.alink2,
        video_three: user.alink2,
        artist_facebook: user.afblink,
        artist_instagram: user.ainstalink,
        artist_website: user.awebsite,
        speciality: user.aspeciality,
        requirement: user.arequirements,
        artist_description: user.adescription
      });
      this.selectCategory(user.acategory);

      this.userForm.setValue({
        // Fill user form values here
        firstName: user.uname,
        email: user.uemail,
        wnumber: user.uwhatsappno,
        address: user.uaddress,
        city: user.ucity,
        password: user.upassword,
        cpassword: user.uconfirmpassword,
        options: '2'
      });
    } else if (user.utypeorganizer === 1) {
      this.organizerForm.enable();
      this.userForm.enable();
      this.artistForm.disable();

      this.organizerForm.setValue({
        // Fill organizer form values here
        business_name: user.obusinessname,
        organizer_category: user.obusinesscategory,
        organizer_description: user.odescription,
        organizer_facebook: user.ofblink,
        organizer_instagram: user.oinstalink,
        organizer_website: user.owebsite,
        o_speciality: user.ofacilities,
        o_facility: user.ofacilitesforartist,
      });

      this.userForm.setValue({
        // Fill user form values here
        firstName: user.uname,
        email: user.uemail,
        wnumber: user.uwhatsappno,
        address: user.uaddress,
        city: user.ucity,
        password: user.upassword,
        cpassword: user.uconfirmpassword,
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
        password: user.upassword,
        cpassword: user.uconfirmpassword,
        options: '3'
      });
    }
  }

  onImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.profileimageData = fileList[0];
      // console.log('Selected image:', this.profileimageData);
    } else {
      this.profileimageData = null; // Reset file if no file is selected
    }
  }

  onorganizerImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.org_profileimageData = fileList[0];
      // console.log('Selected image:', this.org_profileimageData);
    } else {
      this.org_profileimageData = null; // Reset file if no file is selected
    }
  }

  upDate() {
    this.postImages();
    // Extract user data
    const userData = {
      uname: this.userForm.value.firstName,
      uemail: this.userForm.value.email,
      uwhatsappno: this.userForm.value.wnumber,
      uaddress: this.userForm.value.address,
      ucity: this.userForm.value.city,
      upassword: this.userForm.value.password,
      uconfirmpassword: this.userForm.value.cpassword,
      utypeartist: this.userForm.value.options === '2' ? 1 : 0,
      utypeorganizer: this.userForm.value.options === '1' ? 1 : 0,
      utypeuser: this.userForm.value.options === '3' ? 1 : 0,
    };

    // Extract artist data 
    const artistData = {
      aworkexperience: this.artistForm.value.wexp || '',
      acategory: this.artistForm.value.category || '', // Include selected category
      asubcategory: this.artistForm.value.subcategory || '', // Include selected subcategory
      alink1: this.artistForm.value.video_one || '',
      alink2: this.artistForm.value.video_two || '',
      alink3: this.artistForm.value.video_three || '',
      afblink: this.artistForm.value.artist_facebook || '',
      ainstalink: this.artistForm.value.artist_instagram || '',
      awebsite: this.artistForm.value.artist_website || '',
      aspeciality: this.artistForm.value.speciality || '',
      arequirements: this.artistForm.value.requirement || '',
      adescription: this.artistForm.value.artist_description || '',
      ...(this.profileimageData ? { aprofilephoto: this.profileimageData } : {})      // aphotos: this.artistForm.value.artist_photos || '',
    };
    // this.postImages()
    // this.postProfileImage()

    // Extract organizer data
    const organizerData = {
      obusinessname: this.organizerForm.value.business_name || '',
      obusinesscategory: this.organizerForm.value.organizer_category || '', // Include selected organizer category
      odescription: this.organizerForm.value.organizer_description || '',
      ofblink: this.organizerForm.value.organizer_facebook || '',
      oinstalink: this.organizerForm.value.organizer_instagram || '',
      owebsite: this.organizerForm.value.organizer_website || '',
      ofacilities: this.organizerForm.value.o_speciality || '',
      ofacilitesforartist: this.organizerForm.value.o_facility || '',
      ...(this.org_profileimageData ? { oprofilephoto: this.org_profileimageData } : {})
      // ophotos: this.organizerForm.value.o_photos || '',
    };


    let updateData = { ...userData, ...artistData, ...organizerData };

    if (userData.utypeartist) {
      updateData = { ...updateData, ...artistData };
      if (!updateData.aworkexperience ||
        // !updateData.alink1 ||
        // !updateData.alink2 ||
        // !updateData.alink3 ||
        // !updateData.afblink ||
        // !updateData.ainstalink ||
        !updateData.aspeciality ||
        !updateData.arequirements ||
        // !updateData.aprofilephoto ||
        !updateData.adescription) {
        this.toastr.error('Please fill all the field.', 'Error');
        return;
      }
      this.navigateToArtistHome();

    } else if (userData.utypeorganizer) {
      updateData = { ...updateData, ...organizerData };
      if (
        !updateData.obusinessname ||
        !updateData.obusinesscategory ||
        !updateData.odescription ||
        // !updateData.ofblink ||
        // !updateData.oinstalink ||
        // !updateData.owebsite ||
        !updateData.ofacilities ||
        !updateData.ofacilitesforartist
        // !updateData.oprofilephoto
        // !updateData.ophotos ||
        // !updateData.oprofilephoto
      ) {
        this.toastr.error('Please fill all the field.', 'Error');
        return;
      }
      this.navigateToHome();
    }
    else if (userData.utypeuser) {
      // Redirect to home page
      this.navigateToHome();
    }

    // Combine all data into one object

    if (
      !updateData.uname ||
      !updateData.uemail ||
      !updateData.uwhatsappno ||
      !updateData.uaddress ||
      !updateData.ucity ||
      !updateData.upassword ||
      !updateData.uconfirmpassword ||
      !(updateData.utypeorganizer + '') ||
      !(updateData.utypeuser + '')

    ) {
      this.toastr.error('Please fill all the field.', 'Error');
      return;

    }
    else {
      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(updateData)) {
        formData.append(key, value)
      }
      this.service.updatedata(this.userIdToUpdate, formData).subscribe((res) => {
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
  }

  private navigateToArtistHome() {
    this.router.navigate(['/artistsHome']);
  }

  private navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToProfile() {
    if (this.userType === 'artist') {
      this.router.navigate(['/artistProfile', this.userIdToUpdate]);
    } else if (this.userType === 'organizer') {
      this.router.navigate(['/organizerProfile', this.userIdToUpdate]);
    }
  }

  //  select category
  artist_categorylist() {
    this.service.allArtistCategoriesFilter().subscribe((res: any) => {
      this.artist_categories = res.all_categories;
    });
  }
  selectCategory(category: any) {
    // Get the selected category
    const selectedCategory = this.artist_categories.find(cat => cat.cname === category);
    if (selectedCategory) {
      // Update the subcategories based on the selected category
      this.subcategories = selectedCategory.scname || [];
    }
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

  // onFileChange(event: any) {
  //   const files = event.target.files;
  //   if (files.length > 10) {
  //     // this.artistPhotos.setErrors({ maxlength: true });
  //   } else {
  //     // this.artistPhotos.setErrors(null);
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


  // images upload for artist
  onFilesSelected(event: any) {
    const files: FileList = event.target.files;

    if (files) {
      this.images = [];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          this.convertToBase64(file);
        }
      }
    }
    this.images = event.target.files;
    const files1 = event.target.files;
    if (files.length > 10) {
      this.OrgPhotos.setErrors({ maxlength: true });
    } else {
      this.OrgPhotos.setErrors(null);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        let imgBase64 = event.target.result.split(',')[1]; // Extract base64 data after comma
        // Check if this.images is an array before pushing to it
        if (Array.isArray(this.images)) {
          this.images.push(imgBase64);
        } else {
          this.images = [imgBase64]; // If not an array, initialize it as an array with the first image
        }
      }
    };
    reader.readAsDataURL(file);
  }

  postImages() {
    const imageData: any = {
      userid: this.userIdToUpdate
    };

    this.images.forEach((image, index) => {
      imageData[`image${index + 1}`] = image;
    });
    this.service.postUserImages(imageData).subscribe(
      (response => {
        // console.log('Images uploaded successfully:', response);
        // this.toastr.success('Images uploaded successfully!', 'Success');
        if (response && response.status === 'success') {
          // console.log('File paths:', response.saved_file_paths);
          // this.toastr.success('Successfully uploaded photos!', 'Success');
          if (response.saved_file_paths && Object.keys(response.saved_file_paths).length > 0) {
            // Do something with the file paths object
          } else {
            console.log('No file paths returned from the server.');
          }
        } else {
          console.error('Server returned an error:', response.message);
        }
      }),
      (error => {
        console.error('Error uploading images:', error);
      })
    );
  }
}
// // for profile image
// // onProfileImageSelected(event: any) {
// //   const file: File | null = event.target.files[0];
// //   if (file) {
// //     this.profileImageconvertToBase64(file);
// //   }
// // }

// // profileImageconvertToBase64(file: File) {
// //   const reader = new FileReader();
// //   reader.onload = (event) => {
// //     if (event.target && typeof event.target.result === 'string') {
// //       this.profileimageData = event.target.result.split(',')[1]; // Extract base64 data after comma
// //     }
// //   };
// //   reader.readAsDataURL(file);
// // }

// postProfileImage() {
//   if (!this.profileimageData) {
//     console.error('No image data available.');
//     return;
//   }

//   const imageData: any = {
//     userid: this.userIdToUpdate,
//     photo: this.profileimageData
//   };

//   // Post imageData object containing image data to the server
//   this.service.postUserProfileImage(imageData).subscribe(
//     (response => {
//       console.log('Image uploaded successfully:', response);
//       this.toastr.success('Image uploaded successfully!', 'Success');
//       // Handle response as needed
//     }),
//     (error => {
//       console.error('Error uploading image:', error);
//     })
//   );
// }
// // ////////////////////////////////////////////////////////////////////

