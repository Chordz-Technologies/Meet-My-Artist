export class product_model {
    pid!: number;
    pbrand!: string;
    pmodel!: string;
    pprice!: string;
    pimages!: number;
}

export class user_model {
    uid!: number;
    uname!: string;
    uemail!: string;
    uwhatsappno!: string;
    upassword!: string;
    uconfirmpassword!: string;
    uaddress!: string;
    ucity!: string;
    utypeartist!: any;
    utypeorganizer!: any;
    utypeuser!: any;
    uprofilephoto!: string;
    uregistrationdate!: string;
    userstatus!: string;
    usersubsdate!: string;
    ulikes!: string;
    uwishlist!: string;
    aprofilephoto!: File;
    afblink!: string;
    ainstalink!: string;
    awebsite!: string;
    alikes!: string;
    awishlist!: string;
    acategory!: string;
    asubcategory!: string;
    aworkexperience!: string;
    aspeciality!: string;
    alink1!: string;
    alink2!: string;
    alink3!: string;
    aphotos!: string;
    abookeddate!: string;
    artistsubsdate!: string;
    arequirements!: string;
    adescription!: string;
    artiststaus!: string;
    oprofilephoto!: File;
    obusinessname!: string;
    obusinesscategory!: string;
    ofacilities!: string;
    oinstalink!: string;
    ofblink!: string;
    owebsite!: string;
    ophotos!: string;
    olikes!: string;
    owishlist!: string;
    ofacilitesforartist!: string;
    odescription!: string;
    organizersubsdate!: string;
    organizerstatus!: string;
}

export class event_model {
    eid!: number;
    ename!: string;
    elocation!: string;
    egooglemap!: string;
    edate!: string;
    etime!: string;
    eposter!: string;
    orequirements!: string;
    erequirements!: number;
    artistequipwith!: string;
    facilitiesforartist!: string;
    uid!: number;
    uname!: string;
    obusinessname!: string;
}