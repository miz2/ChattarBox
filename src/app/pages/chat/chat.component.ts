import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';
import { Ichat } from '../../interface/chat-response';
import { DatePipe } from '@angular/common';
import { DeleteModalComponent } from '../../layout/delete-modal/delete-modal.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe,DeleteModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
chat() {
throw new Error('Method not implemented.');
}
  private auth = inject(AuthService);
  private chat_service = inject(ChatService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  chats=signal<Ichat[]>([])
  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.onListChat(); // Call on component initialization
  }

  async logOut() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue);
    this.chat_service
      .chatMessage(formValue)
      .then((res) => {
        console.log(res);
        this.chatForm.reset();
        this.onListChat(); 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onListChat() {
    this.chat_service
      .listChat()
      .then((res:Ichat[]|null) => {
        console.log(res);
        if(res!=null){
          this.chats.set(res);
        }
        else{
          console.log("no messages found");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  openDropDown(msg:Ichat){
    console.log(msg);
    this.chat_service.selectedChats(msg)
  }
}
