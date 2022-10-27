import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/api.service';
import { IssueModel } from './user.issue.components.model';

@Component({
  selector: 'app-user-issue',
  templateUrl: './user-issue.component.html',
  styleUrls: ['./user-issue.component.css']
})
export class UserIssueComponent implements OnInit {

  public formValue !: FormGroup;
              data !:any;
              showAdd !: boolean;
              showUpdate !: boolean;
             IssueObj:IssueModel =  new IssueModel()
            
              
  constructor(private formBuilder : FormBuilder,
              private http : HttpClient,
              private apiService : ApiService,
              ) { }

  ngOnInit(): void {
   this.formValue = this.formBuilder.group({
    name: [''],
    emailid : [''],
    mobileno : [''],
    issue : ['']
   })
   this.getData()
 
  }


  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }
  issue_Form(){
    this.apiService.postIssue({name: this.formValue.value.name,
                               emailid:this.formValue.value.emailid,
                               mobileno:this.formValue.value.mobileno,
                               issue: this.formValue.value.issue})
    .subscribe((res:any)=>{
      console.log(res)
      alert("Employee Added..")
      this.formValue.reset()
      this.getData()
    },
    err=>{
      console.log(err)
      console.log("Error")
    })
  }

  getData(){
    this.apiService.getIssue().subscribe(res=>{
      this.data = res;
      console.log(this.data)
    })
  }
  
  deleteData(row:any){
    this.apiService.deleteIssue(row._id).subscribe(res=>{
      alert("deleted..")
      console.log(res) 
      this.getData()
    },
    err=>{
      alert("can't delete ra...")
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    
    this.IssueObj._id = row._id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['emailid'].setValue(row.emailid);
    this.formValue.controls['mobileno'].setValue(row.mobileno);
    this.formValue.controls['issue'].setValue(row.issue);
    
  }

  updateData(){
    
    this.IssueObj.name = this.formValue.value.name;
    this.IssueObj.emailid = this.formValue.value.emailid;
    this.IssueObj.mobileno = this.formValue.value.mobileno;
    this.IssueObj.issue = this.formValue.value.issue;

    this.apiService.updateIssue(this.IssueObj,this.IssueObj._id)
    .subscribe(res=>{
      console.log(res)
      alert("update Successfully....")
      this.formValue.reset()
      this.getData()
    },
    err=>{
      alert("can't update ra...")
    })
  }

}
