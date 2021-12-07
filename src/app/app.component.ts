import { Component } from '@angular/core';
declare let $: any;
import { CalendarOptions } from '@fullcalendar/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addEventForm: FormGroup;
  submitted = false;
  //Add user form actions
  get f() { return this.addEventForm.controls; }
  
 onSubmit() {
  
  this.submitted = true;
  // stop here if form is invalid and reset the validations
  // this.addEventForm.get('title');
  // this.addEventForm.get('title');
  if (this.addEventForm.invalid) {
      return;
  }
}
constructor(private formBuilder: FormBuilder){}
  title = 'angularadmintemplates';
  calendarOptions: CalendarOptions;
  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2020-11-05' },
      { title: 'event 2', date: '2020-06-30' }
    ]
  };
  this.addEventForm = this.formBuilder.group({
    title: ['', [Validators.required]]
    });
}
handleDateClick(arg) {
  $("#myModal").modal('show');
  $(".modal-title").text("");
  $(".modal-title").text("Add Event at : "+arg.dateStr);
    
}
hideForm(){
  $('#myModal').modal('hide');
  this.addEventForm.patchValue({ title : ""});
  this.addEventForm.get('title').clearValidators();
  this.addEventForm.get('title').updateValueAndValidity();
  }
}
