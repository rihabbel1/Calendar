import { Component } from '@angular/core';
declare let $: any;
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addEventForm: FormGroup;
  eventdate:string;
  successdata:any;
  submitted = false;
  _url='http://localhost/Shargtoon/appointement.php';

  //Add user form actions
  get f() { return this.addEventForm.controls; }
  
 onSubmit() {
  
  this.submitted = true;

  this.addEventForm.get('title');
  this.addEventForm.get('title');
  if (this.addEventForm.invalid) {
      return;
  }

if(this.submitted)
{
  // Initialize Params Object
  var myFormData = new FormData();

  // Begin assigning parameters
 
     myFormData.append('title', this.addEventForm.value.title);
     myFormData.append('startdate', this.eventdate);
 
   //post request
   return this.http.post(this._url, myFormData).subscribe((res: Response) => {
    $("#myModal").modal("show");
    this.successdata = res;
       
    });
     

}
}
constructor(private formBuilder: FormBuilder, private http: HttpClient){}
  title = 'angularadmintemplates';
  calendarOptions: CalendarOptions;
  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2021-12-06' },
      { title: 'event 2', date: '2021-12-07' }
    ]
  };
  this.addEventForm = this.formBuilder.group({
    title: ['']
    });
}

// to import the clicked date
handleDateClick(arg) {
  $("#myModal").modal('show');
  $(".modal-title, .eventstarttitle").text("");
  $(".modal-title").text("Add Event at : "+arg.dateStr);
  $(".eventstarttitle").text(arg.dateStr);

 
    
}
//close btn
hideForm(){
  $('#myModal').modal('hide');
  this.addEventForm.patchValue({ title : ""});
  this.addEventForm.get('title').clearValidators();
  this.addEventForm.get('title').updateValueAndValidity();
  }
}
