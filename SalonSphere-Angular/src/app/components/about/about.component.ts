import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddshopService } from '../services/addshopservice/addshop.service';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent { 

  
  data!: FormArray<any>;

  addServiceForm: FormGroup = new FormGroup({
  serviceList: new FormArray([this.getServiceFields()]),
});

constructor(private addservice:AddshopService
){}

getServiceFields(): FormGroup {
  return new FormGroup({
    shopId:new FormControl(localStorage.getItem('shopId')),
    serviceName: new FormControl(""),
    servicePrice: new FormControl(""),
    serviceDuration: new FormControl(""),
  });
}

serviceListArray() {
  this.data =  this.addServiceForm.get("serviceList") as FormArray;
  return this.data;
}

addService() {
  this.serviceListArray().push(this.getServiceFields());
}

removeService(i: number) {
  this.serviceListArray().removeAt(i);
}

getFormData() {

  this.addservice.addservice(this.data.value).subscribe((data:any)=>
  {
    console.log(data);
  })

}


}
