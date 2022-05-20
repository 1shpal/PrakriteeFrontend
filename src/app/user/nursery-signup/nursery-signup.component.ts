import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { Nursury } from 'src/app/model/nursury';
import { NurseryownerService } from 'src/app/service/nurseryowner.service';

@Component({
  selector: 'app-nursery-signup',
  templateUrl: './nursery-signup.component.html',
  styleUrls: ['./nursery-signup.component.css']
})
export class NurserySignupComponent implements OnInit {
  nursery = new Nursury("", "", "", "", "", "", "", "", "", "");
  constructor(private nurseryService: NurseryownerService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    AOS.init();
  }

  public SignUp() {
    this.nurseryService.register(this.nursery).subscribe(data => {
      if (!data.message) {
        this.toaster.success("Signup Successfully.Check Your Inbox And Get Verified", "Success");
        this.router.navigate(['/']);
      }

    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");
        }
      }
    });
  }
}