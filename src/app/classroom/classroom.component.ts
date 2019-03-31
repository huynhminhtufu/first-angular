import { Component, OnInit } from "@angular/core";
import { ClassroomService } from "@app/classroom.service";
import { IClassroom } from "@app/models/classroom.model";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-classroom",
  templateUrl: "./classroom.component.html",
  styleUrls: ["./classroom.component.scss"]
})
export class ClassroomComponent implements OnInit {
  classroomData: any;
  addNewFormDisplay = false;
  addNewForm: FormGroup;

  constructor(
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addNewForm = this.formBuilder.group({
      id: ["", [Validators.required, Validators.maxLength(5)]],
      name: ["", Validators.required],
      teacher: ["", Validators.required],
      amount: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ]
    });

    this.classroomService.getClassrooms().subscribe(data => {
      console.log("Get list: ", data);

      this.classroomData = data;
    });
  }

  toggleAddNew() {
    this.addNewFormDisplay = !this.addNewFormDisplay;
  }

  onAddSubmit() {
    console.log("Form value: ", this.addNewForm.value);

    this.classroomService
      .addClassroom({
        id: this.addNewForm.value.id,
        name: this.addNewForm.value.name,
        teacher: this.addNewForm.value.teacher,
        amount: this.addNewForm.value.amount
      })
      .subscribe(data => {
        if (data) {
          this.classroomData.push(data);

          console.log("Added: ", data);

          this.addNewForm.reset();
        }
      });
  }

  onDetails(index: number) {
    this.classroomService
      .getClassroomByID(this.classroomData[index].id)
      .subscribe(data => {
        console.log("Print details: ", data);
      });
  }

  onEdit(index: number) {
    const classroom: IClassroom = {
      id: this.classroomData[index].id,
      name: "New name",
      teacher: "New name",
      amount: 10
    };

    this.classroomService.updateClassroom(classroom).subscribe(data => {
      console.log("Updated: ", data);

      this.classroomData[index] = data;
    });
  }

  onDelete(index: number) {
    this.classroomService
      .deleteClassroom(this.classroomData[index].id)
      .subscribe(() => {
        console.log("Deleted: ", this.classroomData[index]);

        this.classroomData = this.classroomData.filter(
          item => item !== this.classroomData[index]
        );
      });
  }
}
