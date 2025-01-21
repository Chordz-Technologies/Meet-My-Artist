import { Component } from '@angular/core';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css'],
})
export class CareerPageComponent {
  positions = [
    {
      title: 'Music Teacher',
      specializations: ['Guitar', 'Keyboard'],
      locations: ['Pune', 'Mumbai', 'Nashik', 'Satara'],
      type: 'Full Time / Part Time',
      experience: 'Freshers',
    },
    {
      title: 'Singing Instructor',
      specializations: ['Classical', 'Western'],
      locations: ['Pune', 'Mumbai', 'Nashik', 'Satara'],
      type: 'Full Time / Part Time',
      experience: 'Freshers',
    },
    {
      title: 'Dancing Instructor',
      specializations: ['Classical', 'Western'],
      locations: ['Pune', 'Mumbai', 'Nashik', 'Satara'],
      type: 'Full Time / Part Time',
      experience: 'Freshers',
    },
    {
      title: 'Craft Teacher',
      specializations: ['Arts and Craft'],
      locations: ['Pune', 'Mumbai', 'Nashik', 'Satara'],
      type: 'Full Time / Part Time',
      experience: 'Freshers',
    },
    {
      title: 'Coding Teacher',
      specializations: ['Technical Subjects'],
      locations: ['Pune', 'Mumbai', 'Nashik', 'Satara'],
      type: 'Full Time / Part Time',
      experience: 'Freshers',
    },
  ];

  faqs = [
    {
      question: 'What is Jackson Beats?',
      answer:
        'Jackson Beats is a premier provider of professional music and dance educators, dedicated to enhancing the educational experience in both international and national schools.',
    },
    {
      question: 'What qualifications are required to join Jackson Beats?',
      answer:
        'We typically require a degree in Music, Dance, or related fields, along with professional teaching experience. A passion for fostering a love for the arts is essential.',
    },
    {
      question: 'Are there opportunities for part-time positions?',
      answer:
        'Yes, we offer both full-time and part-time opportunities based on the requirements of our partner schools.',
    },
    {
      question: 'How does Jackson Beats support its educators?',
      answer:
        'We provide training programs, resources, and a collaborative environment to help our educators excel in their roles.',
    },
    {
      question: 'What is the application process?',
      answer:
        'Our process includes submitting an application, portfolio review, teaching demonstration, and an interview with our recruitment team.',
    },
    {
      question: 'Do I need prior teaching experience?',
      answer:
        'While prior teaching experience is preferred, we welcome applications from candidates with strong expertise in music or dance and a willingness to learn.',
    },
    {
      question: 'Which locations are available for teaching?',
      answer:
        'We provide opportunities to teach in both international and national schools across cities like Pune, Mumbai, Nashik, and Satara.',
    },
  ];

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  toggleFaq(event: any) {
    const faqItem = event.currentTarget.parentElement;
    faqItem.classList.toggle('active');
  }

  generateWhatsAppLink(position: string): string {
    const phoneNumber = '917517311326'; // Replace with your WhatsApp number
    const message = `I am interested to apply for the position of ${encodeURIComponent(
      position
    )}.`;
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  }
}
