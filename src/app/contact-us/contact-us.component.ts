import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  notification:any;
  toggle(event: Event) {
    const targetElement = event.target as HTMLElement;
    const panel = targetElement.nextElementSibling;

    if (panel && panel.classList.contains('panel')) {
      panel.classList.toggle('active');
    }
  }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  

  // get name() {
  //   return this.contactForm.get('name');
  // }

  // get email() {
  //   return this.contactForm.get('email');
  // }
  // get PhoneNumber() {
  //   return this.contactForm.get('PhoneNumber');
  // }

  // get message() {
  //   return this.contactForm.get('message');
  // }

  // onSubmit() {
  //   if (this.contactForm.valid) {
  //     console.log('Form Submitted!', this.contactForm.value);
  //     // Handle form submission
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  // get nameControl() { return this.contactForm.get('name'); }
  // get emailControl() { return this.contactForm.get('email'); }
  // get phoneControl() { return this.contactForm.get('phone'); }
  // get messageControl() { return this.contactForm.get('message'); }

  sendEmail() {
    if (this.contactForm.valid) {
      const serviceID = 'service_s03ojwp';
      const templateID = 'template_gadr17o';
      const userID = 'I1cjHMspo_4Uxg7Tw';

      const templateParams = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
        message: this.contactForm.get('message')?.value
      };
     
      emailjs.send(serviceID, templateID, templateParams, userID)
        .then((response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          // this.showSuccess()
          
        }, (error) => {
          console.log('FAILED...', error);
        });
    }
  }
}
