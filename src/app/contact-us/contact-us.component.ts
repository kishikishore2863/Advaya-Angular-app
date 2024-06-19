import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule,NgbDatepickerModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
 
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(10),this.numericValidator]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.contactForm.get('name')?.valueChanges.subscribe(value => {
      this.capitalizeName(value);
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
  
numericValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && !/^[6-9][0-9]*$/.test(value)) {
    return { numeric: true };
  }
  return null;
}

  

 


  onNameInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const key = event.key;

    // Allow control keys such as backspace, delete, arrow keys, etc.
    const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (controlKeys.includes(key)) {
      return;
    }

    // Prevent input if it is not a letter or space
    if (!/^[A-Za-z\s]$/.test(key)) {
      event.preventDefault();
    }
  }

  onPhoneNumberInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const key = event.key;

    // Allow control keys such as backspace, delete, arrow keys, etc.
    const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (controlKeys.includes(key)) {
      return;
    }

    // Prevent input if it is not a number
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

 onSubmit() {
  if (this.contactForm.valid) {
    const serviceID = 'service_s03ojwp';
    const templateID = 'template_gadr17o';
    const userID = 'I1cjHMspo_4Uxg7Tw';

    const templateParams = {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      PhoneNumber: this.contactForm.get('PhoneNumber')?.value,
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

  capitalizeName(value: string): void {
    if (value) {
      const words = value.split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      const capitalizedValue = capitalizedWords.join(' ');
      if (capitalizedValue !== value) {
        this.contactForm.get('name')?.setValue(capitalizedValue, { emitEvent: true});
      }
    }
  }
}