import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  toggle(event: Event) {
    const targetElement = event.target as HTMLElement;
    const panel = targetElement.nextElementSibling;

    if (panel && panel.classList.contains('panel')) {
      panel.classList.toggle('active');
    }
  }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }
  get PhoneNumber() {
    return this.contactForm.get('PhoneNumber');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      // Handle form submission
    } else {
      console.log('Form is invalid');
    }
  }
}
